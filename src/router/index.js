import HomeView     from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import FamilyDetail from '../views/FamilyDetail.vue'
import AboutView    from '../views/AboutView.vue'
import OemView      from '../views/OemView.vue'
import ContactView  from '../views/ContactView.vue'
import PrivacyView  from '../views/PrivacyView.vue'
import NotFoundView from '../views/NotFoundView.vue'

export const SITE = 'https://www.reisti.com'
export const DEFAULT_DESC = 'REISTI公式サイト。ドリルビット・ホールソーを自社製造し、既製品の大量発注とOEM／PB供給に対応。台湾の母体企業が約30年にわたり培った工具の知見を、日本市場へ展開しています。'

/* 各ページの title / description は App.vue の useHead が meta から読み取り、
   SSG 時に静的 HTML へ焼き込まれる（製品ページは FamilyDetail 内の useHead が上書き） */
export const routes = [
  { path: '/',                         name: 'home',     component: HomeView,
    meta: { title: 'ドリルビット・ホールソーの製造・OEM供給｜台湾発の工具ブランドREISTI', desc: DEFAULT_DESC } },
  { path: '/products',                 name: 'products', component: ProductsView,
    meta: { title: 'ドリルビット・ホールソー 製品一覧｜REISTI', desc: 'ステンレス・コンクリート・タイルなどの穴あけに対応する、REISTIのドリルビット・ホールソー。仕様、対応材料、サイズをご案内します。' } },
  { path: '/products/:category/:slug', name: 'family',   component: FamilyDetail },
  { path: '/about',                    name: 'about',    component: AboutView,
    meta: { title: '会社概要｜REISTI', desc: '瑞士釘株式会社（REISTI）の会社概要。台湾の母体企業が長年培ってきたREISTIブランドで、2025年に日本市場への本格展開を開始しました。' } },
  { path: '/oem',                      name: 'oem',      component: OemView,
    meta: { title: '工具OEM／PB供給｜台湾・中国の工場ネットワーク｜REISTI', desc: 'ドリルビット、ホールソーなど工具のOEM・プライベートブランド供給。自社工場と台湾・中国の協力工場ネットワークを活かし、仕様、包装、数量に応じた製造体制をご提案します。' } },
  { path: '/contact',                  name: 'contact',  component: ContactView,
    meta: { title: 'お問い合わせ｜REISTI', desc: 'REISTI へのお問い合わせ・見積依頼はこちら。' } },
  { path: '/privacy',                  name: 'privacy',  component: PrivacyView,
    meta: { title: 'プライバシーポリシー｜REISTI', desc: 'REISTI（瑞士釘株式会社）のプライバシーポリシー。取得する個人情報、利用目的、外部サービスの利用についてご案内します。' } },
  // Legacy redirects（サーバー側は vercel.json の redirects が対応。ここはクライアント遷移用）
  { path: '/products/concrete-drill/:slug', redirect: '/products' },
  { path: '/products/step-drill/:slug',     redirect: '/products' },
  { path: '/products/hole-saw/bi',          redirect: '/products/hole-saw/hss' },
  { path: '/products/sds-plus',             redirect: '/products' },
  { path: '/products/hex-shank',            redirect: '/products' },
  // 404（SSG は /404 を dist/404.html に書き出し、Vercel が未知パスに対して配信する）
  { path: '/:pathMatch(.*)*',          name: 'notfound', component: NotFoundView,
    meta: { title: 'ページが見つかりません｜REISTI', desc: 'お探しのページは見つかりませんでした。' } },
]
