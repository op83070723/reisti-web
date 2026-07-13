// api/contact.js の入力検証・防濫用チェックのテスト。
// send を注入するため実メール送信は発生しない（Resend には一切接続しない）。
// 実行：npm test（node --test test/）
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createHandler } from '../api/contact.js'

function makeRes() {
  return {
    statusCode: null,
    body: null,
    status(c) { this.statusCode = c; return this },
    json(b) { this.body = b; return this },
  }
}

function makeReq(body, { method = 'POST', headers = {} } = {}) {
  return {
    method,
    headers: { 'content-type': 'application/json', ...headers },
    body,
  }
}

const VALID = { company: 'ACME株式会社', name: '山田太郎', email: 'taro@example.co.jp', message: 'お見積もりをお願いします。\n数量は後日連絡します。' }

function run(body, opts) {
  const sent = []
  const handler = createHandler({ send: async p => { sent.push(p) } })
  const res = makeRes()
  return handler(makeReq(body, opts), res).then(() => ({ res, sent }))
}

test('GET は 405', async () => {
  const { res } = await run(VALID, { method: 'GET' })
  assert.equal(res.statusCode, 405)
})

test('Content-Type が JSON 以外は 415', async () => {
  const { res, sent } = await run(VALID, { headers: { 'content-type': 'text/plain' } })
  assert.equal(res.statusCode, 415)
  assert.equal(sent.length, 0)
})

test('許可外の Origin は 403', async () => {
  const { res } = await run(VALID, { headers: { origin: 'https://evil.example.com' } })
  assert.equal(res.statusCode, 403)
})

test('本番 Origin は許可', async () => {
  const { res } = await run(VALID, { headers: { origin: 'https://www.reisti.com' } })
  assert.equal(res.statusCode, 200)
})

test('自デプロイの preview Origin（Host 一致）と localhost は許可', async () => {
  const self = await run(VALID, { headers: { origin: 'https://reisti-web-abc123.vercel.app', host: 'reisti-web-abc123.vercel.app' } })
  assert.equal(self.res.statusCode, 200)
  const local = await run(VALID, { headers: { origin: 'http://localhost:5173' } })
  assert.equal(local.res.statusCode, 200)
})

test('第三者の *.vercel.app Origin（Host 不一致）は 403', async () => {
  const { res } = await run(VALID, { headers: { origin: 'https://attacker-site.vercel.app', host: 'www.reisti.com' } })
  assert.equal(res.statusCode, 403)
})

test('Content-Length 超過は 413', async () => {
  const { res } = await run(VALID, { headers: { 'content-length': String(1024 * 1024) } })
  assert.equal(res.statusCode, 413)
})

test('文字列 body が過大なら 413', async () => {
  const { res } = await run('x'.repeat(33 * 1024))
  assert.equal(res.statusCode, 413)
})

test('解析済みオブジェクトが過大でも 413（Content-Length なし＝chunked/圧縮の想定）', async () => {
  const { res, sent } = await run({ ...VALID, junk: 'x'.repeat(33 * 1024) })
  assert.equal(res.statusCode, 413)
  assert.equal(sent.length, 0)
})

test('多バイト：日本語 5000 字の message（約15KB）は正当として通る', async () => {
  const { res } = await run({ ...VALID, message: 'あ'.repeat(5000) })
  assert.equal(res.statusCode, 200)
})

test('壊れた JSON 文字列は 400', async () => {
  const { res } = await run('{not json')
  assert.equal(res.statusCode, 400)
})

test('必須欄位の欠落は 400', async () => {
  const { res } = await run({ ...VALID, company: '' })
  assert.equal(res.statusCode, 400)
})

test('空白のみの必須欄位は 400（trim 後判定）', async () => {
  const { res } = await run({ ...VALID, name: '   ' })
  assert.equal(res.statusCode, 400)
})

test('email 形式不正は 400', async () => {
  for (const email of ['not-an-email', 'a b@c.d', 'a@b']) {
    const { res } = await run({ ...VALID, email })
    assert.equal(res.statusCode, 400, email)
  }
})

test('1 行フィールドの改行・制御文字は 400（件名インジェクション防止）', async () => {
  const { res } = await run({ ...VALID, name: '山田\r\nBcc: spam@example.com' })
  assert.equal(res.statusCode, 400)
})

test('message の改行・タブは許可、その他の制御文字は 400', async () => {
  const ok = await run({ ...VALID, message: '行1\n行2\tタブ' })
  assert.equal(ok.res.statusCode, 200)
  const ng = await run({ ...VALID, message: 'x\u0007y' })
  assert.equal(ng.res.statusCode, 400)
})

test('type が allowlist 外は 400', async () => {
  const { res } = await run({ ...VALID, type: 'OEM / プライベートブランド' })
  assert.equal(res.statusCode, 400)
})

test('型違い（配列など）は 400', async () => {
  const { res } = await run({ ...VALID, phone: ['x'] })
  assert.equal(res.statusCode, 400)
})

test('長さ上限超過は 400、境界値は通る', async () => {
  const over = await run({ ...VALID, message: 'x'.repeat(5001) })
  assert.equal(over.res.statusCode, 400)
  const edge = await run({ ...VALID, message: 'x'.repeat(5000) })
  assert.equal(edge.res.statusCode, 200)
})

test('honeypot は 200 を返しつつ送信しない', async () => {
  const { res, sent } = await run({ ...VALID, hp: 'bot' })
  assert.equal(res.statusCode, 200)
  assert.equal(sent.length, 0)
})

test('送信プロバイダ失敗時は 500・内部詳細を漏らさない', async (t) => {
  t.mock.method(console, 'error', () => {}) // ハンドラ内の console.error を黙らせて CI 出力を汚さない
  const handler = createHandler({ send: async () => { throw new Error('Missing API key. Secret detail.') } })
  const res = makeRes()
  await handler(makeReq(VALID), res)
  assert.equal(res.statusCode, 500)
  assert.equal(res.body.error, 'send failed')
})

test('正常系：200、send は 1 回、件名は日本語ラベル、replyTo は送信者', async () => {
  const { res, sent } = await run({ ...VALID, type: 'oem', product: 'ハイスホールソー', qty: '1000' })
  assert.equal(res.statusCode, 200)
  assert.equal(sent.length, 1)
  const mail = sent[0]
  assert.ok(mail.subject.includes('【OEM / プライベートブランド】'), mail.subject)
  assert.equal(mail.replyTo, VALID.email)
  assert.ok(mail.html.includes('ハイスホールソー'))
})

test('HTML エスケープ：本文へのタグ混入は無害化される', async () => {
  const { sent } = await run({ ...VALID, message: '<script>alert(1)</script>' })
  assert.equal(sent.length, 1)
  assert.ok(!sent[0].html.includes('<script>alert(1)'))
  assert.ok(sent[0].html.includes('&lt;script&gt;'))
})
