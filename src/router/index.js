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
    meta: { locale: 'ja', title: 'ドリルビット・ホールソーの製造・OEM供給｜台湾発の工具ブランドREISTI', desc: DEFAULT_DESC } },
  { path: '/products',                 name: 'products', component: ProductsView,
    meta: { locale: 'ja', title: 'ドリルビット・ホールソー 製品一覧｜REISTI', desc: 'ステンレス・コンクリート・タイルなどの穴あけに対応する、REISTIのドリルビット・ホールソー。仕様、対応材料、サイズをご案内します。' } },
  { path: '/products/:category/:slug', name: 'family',   component: FamilyDetail,
    meta: { locale: 'ja', title: '製品情報｜REISTI', desc: DEFAULT_DESC } },
  { path: '/about',                    name: 'about',    component: AboutView,
    meta: { locale: 'ja', title: '会社概要｜REISTI', desc: '瑞士釘株式会社（REISTI）の会社概要。台湾の母体企業が長年培ってきたREISTIブランドで、2025年に日本市場への本格展開を開始しました。' } },
  { path: '/oem',                      name: 'oem',      component: OemView,
    meta: { locale: 'ja', title: '工具OEM／PB供給｜台湾・中国の工場ネットワーク｜REISTI', desc: 'ドリルビット、ホールソーなど工具のOEM・プライベートブランド供給。自社工場と台湾・中国の協力工場ネットワークを活かし、仕様、包装、数量に応じた製造体制をご提案します。' } },
  { path: '/contact',                  name: 'contact',  component: ContactView,
    meta: { locale: 'ja', title: 'お問い合わせ｜REISTI', desc: 'REISTI へのお問い合わせ・見積依頼はこちら。' } },
  { path: '/privacy',                  name: 'privacy',  component: PrivacyView,
    meta: { locale: 'ja', title: 'プライバシーポリシー｜REISTI', desc: 'REISTI（瑞士釘株式会社）のプライバシーポリシー。取得する個人情報、利用目的、外部サービスの利用についてご案内します。' } },
  { path: '/en', name: 'en-home', component: HomeView,
    meta: { locale: 'en', title: 'Drill Bit & Hole Saw Manufacturer | OEM & Private Label | REISTI', desc: 'Cobalt and carbide-tipped drill bits, bi-metal and TCT hole saws from our own factory in China. OEM, private label, and custom specs. MOQ 1,000 pcs per size, FOB Shanghai.' } },
  { path: '/en/products', name: 'en-products', component: ProductsView,
    meta: { locale: 'en', title: 'Drill Bits & Hole Saws for OEM & Wholesale | REISTI', desc: 'Product range for OEM and wholesale: M35 cobalt drill bits, carbide-tipped multi-material drill bits, bi-metal hole saws, and carbide-tipped (TCT) hole saws.' } },
  { path: '/en/products/:category/:slug', name: 'en-family', component: FamilyDetail,
    meta: { locale: 'en', title: 'Drill Bits & Hole Saws | REISTI', desc: 'Drill bits and hole saws for OEM and private label supply.' } },
  { path: '/en/about', name: 'en-about', component: AboutView,
    meta: { locale: 'en', title: 'About REISTI | Drill Bit & Hole Saw Manufacturer', desc: 'REISTI Co., Ltd. is the Japan-based company behind the REISTI tool brand, backed by a Taiwan parent company with nearly 30 years in the hardware trade and its own factory in China.' } },
  { path: '/en/oem', name: 'en-oem', component: OemView,
    meta: { locale: 'en', title: 'OEM & Private Label Drill Bits and Hole Saws | REISTI', desc: 'OEM and private label supply of drill bits and hole saws. Custom specifications, laser marking, and packaging. MOQ 1,000 pcs per size, FOB Shanghai, lead time 45–60 days.' } },
  { path: '/en/contact', name: 'en-contact', component: ContactView,
    meta: { locale: 'en', title: 'Contact & Request a Quote | REISTI', desc: 'Request a quotation for OEM, private label, or bulk orders of drill bits and hole saws. We reply within 2 business days.' } },
  { path: '/en/privacy', name: 'en-privacy', component: PrivacyView,
    meta: { locale: 'en', title: 'Privacy Policy | REISTI', desc: 'Privacy policy of REISTI Co., Ltd.: the personal information we collect, how we use it, and the external services we rely on.' } },
  // Legacy redirects（サーバー側は vercel.json の redirects が対応。ここはクライアント遷移用）
  { path: '/products/concrete-drill/:slug', redirect: '/products',
    meta: { locale: 'ja', title: 'REISTI｜公式サイト', desc: DEFAULT_DESC } },
  { path: '/products/step-drill/:slug',     redirect: '/products',
    meta: { locale: 'ja', title: 'REISTI｜公式サイト', desc: DEFAULT_DESC } },
  { path: '/products/hole-saw/bi',          redirect: '/products/hole-saw/hss',
    meta: { locale: 'ja', title: 'REISTI｜公式サイト', desc: DEFAULT_DESC } },
  { path: '/products/sds-plus',             redirect: '/products',
    meta: { locale: 'ja', title: 'REISTI｜公式サイト', desc: DEFAULT_DESC } },
  { path: '/products/hex-shank',            redirect: '/products',
    meta: { locale: 'ja', title: 'REISTI｜公式サイト', desc: DEFAULT_DESC } },
  // 404（SSG は /404 を dist/404.html に書き出し、Vercel が未知パスに対して配信する）
  { path: '/:pathMatch(.*)*',          name: 'notfound', component: NotFoundView,
    meta: { locale: 'ja', title: 'ページが見つかりません｜REISTI', desc: 'お探しのページは見つかりませんでした。' } },
]
