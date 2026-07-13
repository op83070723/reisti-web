/* 変換イベント計測（Vercel Analytics のカスタムイベント）。
   個人情報（氏名・メール・電話・本文）は絶対に送らない——製品名・種別・サイズのみ。
   SSG レンダリング時は no-op（window が無い）。計測失敗でも UI は一切妨げない */
export function track(name, props = {}) {
  if (typeof window === 'undefined') return
  import('@vercel/analytics').then(m => m.track(name, props)).catch(() => {})
}
