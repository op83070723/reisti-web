import { Resend } from 'resend'

function esc(str = '') {
  return String(str).replace(/[&<>"']/g, s =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s])
  )
}

// 上限は ContactView.vue の maxlength と一致させること
const LIMITS = { company: 100, name: 100, email: 254, phone: 50, type: 50, product: 100, qty: 50, message: 5000 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// type は ContactView.vue の TYPE_CODES と共通のコード。メール表示用ラベルへここで変換する
const TYPE_LABELS = {
  oem: 'OEM / プライベートブランド',
  bulk: '既製品の大量発注',
  sample: 'サンプル依頼',
  catalog: 'カタログ・技術資料',
  other: 'その他',
}
// 正当な最大ケース（message 5000 字の日本語 ≈ 15KB）に余裕を持たせつつ濫用を遮断する
const MAX_BODY_BYTES = 32 * 1024
// message 以外は 1 行フィールド：改行を含む制御文字を拒否（メール件名などへの混入防止）
const CONTROL_RE = /[\u0000-\u001F\u007F]/
// message は改行・タブのみ許可
const MESSAGE_CONTROL_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/

function originAllowed(origin, host) {
  if (!origin) return true // Origin ヘッダは補助チェック：無い場合（非ブラウザ等）は他の防御に任せる
  try {
    const { hostname, protocol } = new URL(origin)
    if (hostname === 'localhost' || hostname === '127.0.0.1') return true
    if (hostname === 'www.reisti.com' || hostname === 'reisti.com') return protocol === 'https:'
    // 自デプロイ（preview 含む）のみ許可：*.vercel.app 全体を許可すると第三者のデプロイも通ってしまう
    return protocol === 'https:' && !!host && hostname === String(host).toLowerCase()
  } catch {
    return false
  }
}

// send を注入可能にしてテストから実送信なしで検証できるようにする（既定は Resend）
export function createHandler({ send } = {}) {
  return async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })

    const contentType = String(req.headers?.['content-type'] || '')
    if (!contentType.includes('application/json'))
      return res.status(415).json({ ok: false, error: 'unsupported content type' })

    if (!originAllowed(req.headers?.origin, req.headers?.host))
      return res.status(403).json({ ok: false, error: 'forbidden origin' })

    // Content-Length は早期リジェクト用。ただし chunked／圧縮では偽装・省略できるため、
    // 解析後の実バイト数（UTF-8）でも必ず検証する
    if (Number(req.headers?.['content-length'] || 0) > MAX_BODY_BYTES)
      return res.status(413).json({ ok: false, error: 'payload too large' })

    let body = {}
    try {
      if (typeof req.body === 'string') {
        if (Buffer.byteLength(req.body, 'utf8') > MAX_BODY_BYTES)
          return res.status(413).json({ ok: false, error: 'payload too large' })
        body = JSON.parse(req.body)
      } else {
        body = req.body || {}
      }
    } catch { return res.status(400).json({ ok: false, error: 'Invalid JSON' }) }

    if (Buffer.byteLength(JSON.stringify(body), 'utf8') > MAX_BODY_BYTES)
      return res.status(413).json({ ok: false, error: 'payload too large' })

    if (body.hp) return res.status(200).json({ ok: true })

    for (const [field, max] of Object.entries(LIMITS)) {
      const v = body[field]
      if (v == null) continue
      if (typeof v !== 'string' || v.length > max)
        return res.status(400).json({ ok: false, error: `invalid ${field}` })
      const re = field === 'message' ? MESSAGE_CONTROL_RE : CONTROL_RE
      if (re.test(v))
        return res.status(400).json({ ok: false, error: `invalid ${field}` })
    }

    const pick = f => (typeof body[f] === 'string' ? body[f].trim() : '')
    const company = pick('company'), name = pick('name'), email = pick('email'), phone = pick('phone')
    const type = pick('type'), product = pick('product'), qty = pick('qty'), message = pick('message')

    if (!company || !name || !email || !message)
      return res.status(400).json({ ok: false, error: 'company, name, email, message are required' })
    if (!EMAIL_RE.test(email))
      return res.status(400).json({ ok: false, error: 'invalid email' })
    if (type && !(type in TYPE_LABELS))
      return res.status(400).json({ ok: false, error: 'invalid type' })

    const typeLabel = TYPE_LABELS[type] || 'お問い合わせ'

    try {
      await send({
        from:    process.env.MAIL_FROM || 'noreply@reisti.org',
        to:      process.env.MAIL_TO   || 'chenytbiz@reisti.org',
        replyTo: email,
        subject: `【${typeLabel}】${name}（${company}）`,
        html: `
          <div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px">
            <h2 style="color:#18181b">REISTI お問い合わせ</h2>
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr><td style="padding:8px 12px;background:#f4f4f5;font-weight:600;width:160px">会社名</td><td style="padding:8px 12px;border-bottom:1px solid #e4e4e7">${esc(company)}</td></tr>
              <tr><td style="padding:8px 12px;background:#f4f4f5;font-weight:600">氏名</td><td style="padding:8px 12px;border-bottom:1px solid #e4e4e7">${esc(name)}</td></tr>
              <tr><td style="padding:8px 12px;background:#f4f4f5;font-weight:600">メール</td><td style="padding:8px 12px;border-bottom:1px solid #e4e4e7">${esc(email)}</td></tr>
              ${phone   ? `<tr><td style="padding:8px 12px;background:#f4f4f5;font-weight:600">電話</td><td style="padding:8px 12px;border-bottom:1px solid #e4e4e7">${esc(phone)}</td></tr>` : ''}
              ${type    ? `<tr><td style="padding:8px 12px;background:#f4f4f5;font-weight:600">種別</td><td style="padding:8px 12px;border-bottom:1px solid #e4e4e7">${esc(typeLabel)}</td></tr>` : ''}
              ${product ? `<tr><td style="padding:8px 12px;background:#f4f4f5;font-weight:600">関心製品</td><td style="padding:8px 12px;border-bottom:1px solid #e4e4e7">${esc(product)}</td></tr>` : ''}
              ${qty     ? `<tr><td style="padding:8px 12px;background:#f4f4f5;font-weight:600">数量目安</td><td style="padding:8px 12px;border-bottom:1px solid #e4e4e7">${esc(qty)}</td></tr>` : ''}
            </table>
            <h3 style="color:#18181b;margin-top:20px">ご用件</h3>
            <pre style="white-space:pre-wrap;background:#f4f4f5;padding:12px 16px;border-radius:8px;font-size:14px">${esc(message)}</pre>
          </div>
        `.trim(),
      })
      return res.status(200).json({ ok: true })
    } catch (err) {
      console.error(err)
      // 内部エラーの詳細はログのみ。クライアントへは固定メッセージを返す
      return res.status(500).json({ ok: false, error: 'send failed' })
    }
  }
}

async function defaultSend(payload) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { error } = await resend.emails.send(payload)
  if (error) throw error
}

export default createHandler({ send: defaultSend })
