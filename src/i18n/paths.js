// query/hash と静的リソースを維持し、既にローカライズされた URL の二重 prefix を防ぐ。
export function localizePath(to, locale) {
  if (typeof to === 'object' && to !== null) {
    return { ...to, path: localizePath(to.path, locale) }
  }
  if (typeof to !== 'string' || !to.startsWith('/') || to.startsWith('//')) return to
  const [, path, suffix] = to.match(/^([^?#]*)([\s\S]*)$/)
  if (/^\/(?:pdf|assets)\//.test(path) || /\.[a-z0-9]+$/i.test(path)) return to
  const base = path.replace(/^\/en(?=\/|$)/, '') || '/'
  return (locale === 'en' ? (base === '/' ? '/en' : `/en${base}`) : base) + suffix
}
