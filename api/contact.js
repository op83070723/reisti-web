import { Resend } from 'resend'

function esc(str = '') {
  return String(str).replace(/[&<>"']/g, s =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s])
  )
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })

  let body = {}
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {}) }
  catch { return res.status(400).json({ ok: false, error: 'Invalid JSON' }) }

  const { company, name, email, phone, type, product, qty, message, hp } = body

  if (hp) return res.status(200).json({ ok: true })
  if (!company || !name || !email || !message)
    return res.status(400).json({ ok: false, error: 'company, name, email, message are required' })

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from:    process.env.MAIL_FROM || 'REISTI <noreply@reisti.org>',
      to:      process.env.MAIL_TO   || 'chenytbiz@reisti.org',
      replyTo: email,
      subject: `【お問い合わせ】${name}（${company}）`,
      html: `
        <div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px">
          <h2 style="color:#18181b">REISTI お問い合わせ</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 12px;background:#f4f4f5;font-weight:600;width:160px">会社名</td><td style="padding:8px 12px;border-bottom:1px solid #e4e4e7">${esc(company)}</td></tr>
            <tr><td style="padding:8px 12px;background:#f4f4f5;font-weight:600">氏名</td><td style="padding:8px 12px;border-bottom:1px solid #e4e4e7">${esc(name)}</td></tr>
            <tr><td style="padding:8px 12px;background:#f4f4f5;font-weight:600">メール</td><td style="padding:8px 12px;border-bottom:1px solid #e4e4e7">${esc(email)}</td></tr>
            ${phone   ? `<tr><td style="padding:8px 12px;background:#f4f4f5;font-weight:600">電話</td><td style="padding:8px 12px;border-bottom:1px solid #e4e4e7">${esc(phone)}</td></tr>` : ''}
            ${type    ? `<tr><td style="padding:8px 12px;background:#f4f4f5;font-weight:600">種別</td><td style="padding:8px 12px;border-bottom:1px solid #e4e4e7">${esc(type)}</td></tr>` : ''}
            ${product ? `<tr><td style="padding:8px 12px;background:#f4f4f5;font-weight:600">関心製品</td><td style="padding:8px 12px;border-bottom:1px solid #e4e4e7">${esc(product)}</td></tr>` : ''}
            ${qty     ? `<tr><td style="padding:8px 12px;background:#f4f4f5;font-weight:600">数量目安</td><td style="padding:8px 12px;border-bottom:1px solid #e4e4e7">${esc(qty)}</td></tr>` : ''}
          </table>
          <h3 style="color:#18181b;margin-top:20px">ご用件</h3>
          <pre style="white-space:pre-wrap;background:#f4f4f5;padding:12px 16px;border-radius:8px;font-size:14px">${esc(message)}</pre>
        </div>
      `.trim(),
    })
    if (error) throw error
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ ok: false, error: err.message || 'send failed' })
  }
}
