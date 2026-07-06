import HomeView     from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import FamilyDetail from '../views/FamilyDetail.vue'
import AboutView    from '../views/AboutView.vue'
import OemView      from '../views/OemView.vue'
import ContactView  from '../views/ContactView.vue'

export const DEFAULT_DESC = 'REISTI 公式サイト。台湾で約30年の実績を持つ工具ブランド。充電マルチドリルビット・コバルトドリル・ハイス／超硬ホールソーを自社製造。OEMも対応。'

/* 各ページの title / description は App.vue の useHead が meta から読み取り、
   SSG 時に静的 HTML へ焼き込まれる（製品ページは FamilyDetail 内の useHead が上書き） */
export const routes = [
  { path: '/',                         name: 'home',     component: HomeView,
    meta: { title: 'REISTI｜台湾発のプロ向けドリルビット・ホールソー', desc: DEFAULT_DESC } },
  { path: '/products',                 name: 'products', component: ProductsView,
    meta: { title: '製品一覧｜REISTI', desc: 'REISTI の製品一覧。ドリルビット・ホールソーなどプロ仕様の切削工具をご紹介します。' } },
  { path: '/products/:category/:slug', name: 'family',   component: FamilyDetail },
  { path: '/about',                    name: 'about',    component: AboutView,
    meta: { title: '会社概要｜REISTI', desc: '瑞士釘（REISTI）の会社概要。台湾で約30年、金物・工具卸売業界を牽引してきた工具ブランドです。' } },
  { path: '/oem',                      name: 'oem',      component: OemView,
    meta: { title: 'OEM・PB供給｜REISTI', desc: 'REISTI の OEM・プライベートブランド供給。台湾の製造ネットワークで高品質な工具をお届けします。' } },
  { path: '/contact',                  name: 'contact',  component: ContactView,
    meta: { title: 'お問い合わせ｜REISTI', desc: 'REISTI へのお問い合わせ・見積依頼はこちら。' } },
  // Legacy redirects
  { path: '/products/concrete-drill/:slug', redirect: '/products' },
  { path: '/products/step-drill/:slug',     redirect: '/products' },
  { path: '/products/hole-saw/bi',          redirect: '/products/hole-saw/hss' },
  { path: '/products/sds-plus',             redirect: '/products' },
  { path: '/products/hex-shank',            redirect: '/products' },
]
