/* v-reveal：スクロール漸入（往復で再生する）。
   - クラス付与はブラウザ掛載後のみ → 静的 HTML / JS 無効環境では常に表示（SEO 影響ゼロ）
   - prefers-reduced-motion では何もしない
   - 初期ビューポート内の要素はアニメーションしない（ファーストビューのチラつき防止）
   - ビューポートから出たら reveal-in を外す → 再進入で毎回アニメーション */
let io

const observer = () => {
  if (!io) {
    io = new IntersectionObserver(
      entries => {
        for (const e of entries) e.target.classList.toggle('reveal-in', e.isIntersecting)
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' },
    )
  }
  return io
}

export default {
  mounted(el) {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return
    el.classList.add('reveal-init')
    observer().observe(el)
  },
  unmounted(el) {
    io?.unobserve(el)
  },
  getSSRProps: () => ({}),
}
