# AGENTS.md — REISTI 官網開發守則

寫給所有在此 repo 工作的 AI agent 與開發者。本檔記載「不寫下來就會踩雷」的專案約定，
是實際踩過坑之後的紀錄，不是官樣文章。**動手前先讀完，改動涉及哪節就重讀哪節。**
最後更新：2026-07-22。

## 0. 專案概觀

- REISTI（瑞士釘株式会社）：日本 B2B 鑽頭／洞鋸品牌官網。母體是台灣公司「瑞士釘」
  （使用者父親的公司，金物・工具批發，30 年實績）；2025 年使用者在日本設立 REISTI 法人。
- 技術棧：Vue 3（`<script setup>`）＋ vue-router ＋ **vite-ssg（SSG 預渲染）** ＋ Tailwind CSS 3 ＋ @unhead/vue。
- 部署：Vercel。push 到 `main` 即自動部署 https://www.reisti.com 。serverless function 只有 `api/contact.js`。
- 語言：日文為主；英文字串存在，但英文版策略未定（見 §14）。

## 1. 指令與環境

| 指令 | 內容 |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | `scripts/generate-sitemap.mjs` → `vite-ssg build`（11 頁）→ 複製 `dist/404/index.html` 為 `dist/404.html` |
| `npm test` | `node --test 'test/**/*.test.mjs'`（目前 32 案例，必須全綠） |

- Node：`engines` 為 **24.x**（對齊 Vercel 設定）。本機若用 nvm 22 會出 `EBADENGINE` 警告，屬預期；正式驗證建議 `nvm use 24`。
- packageManager：`npm@11.16.0`。
- **不要擅自引入新依賴**；認為需要時先回報說明理由，不要先裝。

## 2. 檔案地圖

- `src/views/` — 各頁面：`HomeView`、`ProductsView`、`FamilyDetail`（產品詳頁，最複雜）、`OemView`、`AboutView`、`ContactView`、`PrivacyView`、`NotFoundView`
- `src/components/` — `Header`、`Footer`、`ProductGallery`（輪播圖庫）、`ProductScroller`（首頁橫捲產品帶）、`SuitabilityMatrix`（適合素材表）、`FloatingContact`（浮動 CTA）、`CountUp`
- `src/data/products.js` — **單一資料來源**：`FAMILIES`（產品家族＋variants＋規格表＋圖庫路徑）、`CATEGORIES`。路由、sitemap、JSON-LD 都從這裡導出
- `src/i18n/` — `ja.js`（主）、`en.js`、`index.js`（`useI18n`、`t()`、`tField()`）
- `src/utils/track.js` — 轉換事件（見 §8）
- `src/directives/reveal.js` — 進場動畫 directive（`v-reveal`）
- `api/contact.js` — 表單 API（見 §6）；測試在 `test/contact-api.test.mjs`
- `scripts/` — `generate-sitemap.mjs`（build 自動跑）、`subset-fonts.sh`（手動跑，見 §4）
- `public/products/` — 產品圖（見 §5）；`public/pdf/` — 型錄與說明書
- `print-assets/qr/` — 包裝印刷用 QR（不會部署到網站）；維護流程見該目錄的 `README.md`
- `incoming/` — **gitignored** 原始素材備份，程式碼不可引用

## 3. SSG 架構（本 repo 最大的坑）

- vite-ssg 預渲染、`dirStyle: 'nested'`、**沒有 SPA fallback**：路由必須列在
  `vite.config.js` 的 `includedRoutes`，否則該頁線上直接 404。產品頁路由由 `FAMILIES`
  自動導出——新增產品只要加 data；但新增**非產品頁**必須手動加 `includedRoutes`。
- **所有元件程式碼必須 SSR-safe**：setup 頂層不可碰 `window`／`document`／`navigator`／
  `localStorage`。瀏覽器 API 一律放 `onMounted` 或事件 handler 內，或加
  `typeof window !== 'undefined'` 守衛。違反時 build 會炸或預渲染出錯頁。
- **讀 URL query 必須在 `onMounted` 內**：靜態 HTML 是無 query 烤出來的，setup 直接讀
  會 hydration mismatch。範本：`ContactView.vue` 的預填邏輯。
- meta 一律用 `useHead()`（@unhead/vue）：會烤進靜態 HTML，並隨語言切換 reactive 更新。
  頁面級 og 以 `property` 鍵覆寫 `App.vue` 的全站預設。
- `/404` 由 catch-all route 渲染，build 時複製為 `dist/404.html`（Vercel 慣例）。

## 4. 字體（改文案必看）

- 字體是**子集化**的 woff2（`src/assets/fonts/subset/`，只有 400／700／900 三檔），
  只包含跑腳本當下原始碼裡實際出現過的字元。
- **改了 `ja.js`／`en.js`／`products.js` 或任何版面文字、加了新漢字之後，必須重跑
  `bash scripts/subset-fonts.sh`**（需 `pip3 install --user fonttools brotli`），
  否則新字元會 fallback 成系統字體，視覺上跟品牌字體混排、很難察覺。
- font-weight **500 已移除**（`font-medium` 會回退 400）。不要新增依賴 500 的樣式；
  要復活 500 見 `subset-fonts.sh` 內的日文註解。

## 5. 圖片規範

- 產品照：`public/products/{family}-{n}.webp`（family = multi／cobalt／hss／tct），
  長邊 1600px。`{family}-1` 是 hero；gallery 陣列定義在 `src/data/products.js`，每項包含
  `src`／`width`／`height`／日英 `alt`，有日文烙字的圖片另以 `locales: ['ja']` 限制顯示。
- **og:image／twitter:image／sitemap 的圖必須是 JPG 或 PNG**——多數社群爬蟲不支援 WebP。
  所以每個 hero 另備瘦身版 `{family}-1.jpg`，`FamilyDetail.vue` 與 `generate-sitemap.mjs`
  都用 `.replace(/\.webp$/, '.jpg')` 指過去。JSON-LD 的 `image` 可以用 WebP。
- `public/products/reisti-*.png`（4 張舊圖，共 1.34MB）是**刻意保留**的：外部舊分享連結
  與 og 快取還指著它們。不要刪；預計數月後確認流量歸零再清。
- 首頁 scroller 去背圖：`public/products/scroller/*.webp`，1200×1200、主體填充率統一 84%。
  換圖時要維持這兩個規格，否則四張圖視覺大小不一。
- 新增 `<img>` 一律帶 `width`／`height`（防 CLS）；非首屏加 `loading="lazy" decoding="async"`；
  首屏主圖用 `fetchpriority="high"`。
- 用 sharp 批次處理圖片的陷阱：**pipeline 中 resize 永遠先於 extend 執行（與呼叫順序無關）**。
  要分段 `.toBuffer()` 串接，並在每段後 assert 實際輸出尺寸——這裡吃過一次「整批圖被裁壞
  還部署上線」的虧。

## 5.1 取扱説明書 PDF／印刷 QR（永久 URL）

- 包裝上的 QR **只連產品頁的 `#manual`，不直連 PDF**。已送印的兩個永久網址：
  - RH：`https://www.reisti.com/products/hole-saw/hss#manual`
  - RHC：`https://www.reisti.com/products/hole-saw/tct#manual`
- 上述網域、產品路徑與 `FamilyDetail.vue` 的 `id="manual"` 視為**印刷契約**。未經使用者明確同意
  不得改名、redirect 到別處或移除；要改就代表必須重生 QR、實機解碼並重新印刷包裝。
- 四份 PDF 的公開檔名永久固定。更新說明書時直接以新版 PDF **覆蓋同名檔案**，不要加
  `v2`、日期或 hash，也不要改 `products.js` 的 `manual`：
  - `public/pdf/reisti-rp-hex-multi-drill-bit-manual.pdf`
  - `public/pdf/reisti-rc-hex-cobalt-drill-manual.pdf`
  - `public/pdf/reisti-rh-hss-bimetal-hole-saw-manual.pdf`
  - `public/pdf/reisti-rhc-tct-carbide-hole-saw-manual.pdf`
- `vercel.json` 對 `/pdf/*.pdf` 明訂 `public, max-age=0, must-revalidate`，避免瀏覽器長期沿用舊版。
  不得把 PDF 納入 `immutable` 或長效 `max-age`；部署後要 `curl -I` 實測線上 header。
- `test/manual-assets.test.mjs` 鎖定路由、PDF 檔名、`#manual` 契約、快取 header 與印刷 QR 的
  SHA-256。**PDF 內容 hash 刻意不鎖**，所以正常覆蓋新版 PDF 不需修改測試。
- `print-assets/qr/` 內的 SVG／PNG 是已驗證的印刷母檔，不要為了壓縮或改名而重生。
  舊日文檔名的 RH／RHC PDF 也先保留，避免既有外部連結失效。

## 6. Contact API（`api/contact.js`）＋表單

- `createHandler({ send })` 是測試用的 DI 接縫（default export = `createHandler()`）。
  **改 API 必須維持這個結構**，`test/contact-api.test.mjs` 全部依賴注入的假 send。
- 驗證順序（有先後意義，不要調換）：非 POST 405 → Content-Type 非 JSON 415 →
  Origin 檢查 403 → Content-Length 413 → 解析後 `Buffer.byteLength` > 32KB 413 →
  honeypot（`hp` 欄位非空 → **假裝成功回 200**，不給 bot 訊號）→ 型別／長度／控制字元 400 →
  必填 400 → email 格式 400 → type 白名單 400 → 寄信。
- Origin 邏輯：無 Origin 放行（非瀏覽器交給其他防線）；localhost 放行；
  `www.reisti.com`／`reisti.com` 需 https；其餘只允許 **hostname 與請求 Host 一致**
  （自家 preview 部署可用；不可放寬成 `*.vercel.app`——那會放行任何人的部署）。
- `LIMITS = { company: 100, name: 100, email: 254, phone: 50, type: 50, product: 100, qty: 50, message: 5000 }`
  ——**必須與 `ContactView.vue` 各欄位的 `maxlength` 一致**，改一邊就要同步另一邊。
- type 是語言無關代碼：`oem`／`bulk`／`sample`／`catalog`／`other`。改動要同步三處：
  `ContactView.vue` 的 `TYPE_CODES`、i18n 的 `contact.types`（以 index 對應）、API 的 `TYPE_LABELS`。
- 錯誤回應不可洩內部細節：寄信失敗一律回 `'send failed'`，細節只進 `console.error`。
- **嚴禁 in-memory rate limit**（serverless 實例不共享記憶體，是假防護、過審查不過生產）。
  durable 方案（Turnstile／Upstash／Vercel WAF）是已知待辦，等使用者開 Cloudflare 帳號。
- 寄信走 Resend，寄件域 `send.reisti.org`。`RESEND_API_KEY` 只在 Vercel env——本機無法
  實測寄信，行為驗證靠測試注入 send。
- 已知現實：會收到人類手填的營業 spam（來源是法人番号公表サイト等名錄），honeypot 擋不了，屬預期。

## 7. 詢價預填協定

- 全站 CTA 連到 `/contact?type=<代碼>&product=<品名>&qty=<數量>`，type 用 §6 的代碼。
- `ContactView` 在 `onMounted` 讀 query 預填（原因見 §3）。vue-router 會把空格編碼成 `+`，正常現象。
- 規格表的逐尺寸詢價把尺寸帶進 product（如 `充電マルチドリルビット Ø3.4mm`）。
- 新增 CTA 沿用此協定，並照 §8 加 track。

## 8. 追蹤事件（`src/utils/track.js`）

- `track()` 動態 import `@vercel/analytics`（SSR-safe），失敗靜默。
- **事件屬性嚴禁任何個資**——姓名、email、電話、留言內容都不行。只允許：產品名、type 代碼、尺寸、位置標記。
- 既有事件：`cta_click`（location／product）、`form_start`（無屬性，focusin 一次性）、`form_success`（type）。
- Vercel custom events 需 Pro 方案；Hobby 下是無害 no-op，程式碼不需要分支處理。

## 9. 文案事實（審查時不要「修正」這些）

- **「30年の実績」＝台灣母體「瑞士釘」；「2025年」＝日本法人設立。兩者並存不是矛盾**，
  全站以「母体」表述，會社概要頁有母体列。任何審查認為年份不一致時，答案是本段。
- REISTI 品牌產品＝4 支自家工廠產品（充電マルチドリルビット、六角軸コバルトドリル、
  バイメタルホールソー、超硬ホールソー）。**step drill 與 pipe saw 是 OEM 專用品**，
  不得掛 REISTI 品牌敘述、不得出現在品牌產品列表。
- `products.js` 的 `materials` 是「**可加工**材料」（對象物），不是產品本身的材質。
- 文案語氣：日文 B2B 商用敬體。程式碼註解慣例：日文、寫「為什麼」不寫「做了什麼」。

## 10. 設計系統與 a11y

- 品牌色：桃紅。**互動元素用 `pink-600`（hover `pink-700`）**——`pink-500` 配白字對比
  不到 AA；純裝飾（底色、小標）可用 `pink-500`。
- 白底上的文字最淺 `zinc-500`（`zinc-400` 對比 2.56:1，不及格）。
- 觸控目標 ≥24px：視覺可以小，但用 padding 撐大可點範圍（`ProductGallery` 的箭頭為 40×40px）。
- `ProductGallery.vue` **刻意不自動輪播**：產品比較應由使用者以箭頭、縮圖或滑動手動切換。
  其他元件若使用自動輪播，最低仍須尊重 `prefers-reduced-motion`、hover 暫停、鍵盤 focus 暫停，
  並提供可持續生效的停止控制。
- `FamilyDetail.vue` 規格表最後一個 `<th>` 的 `relative` 是 iOS Safari 防橫向溢出修正：
  讓其中絕對定位的 `sr-only` 留在表格捲動容器內。移除會讓四個產品頁的 document 寬於 viewport，
  Safari 可縮小到右側大片空白；`test/product-page-layout.test.mjs` 會防止回歸。
- 規格表的橫向捲動提示只在手機、且表格確實溢出時，等規格區進入畫面才顯示；動畫 3 次、
  5 秒或首次操作後消失，並尊重 `prefers-reduced-motion`。不要改成自動捲動表格或無限動畫。
- 風格：Apple 式極簡——大量留白、zinc 灰階、rounded-xl、細邊框。不要引入重陰影、漸層。
- 既有頁面的 aria-label 多數仍是日文 only；`ProductGallery` 已走 i18n。英文版路由策略見 §14。

## 11. SEO／結構化資料

- sitemap 由 `scripts/generate-sitemap.mjs` 從 `FAMILIES` 導出，build 自動執行、產物
  `public/sitemap.xml` 進版控。**不要加 `lastmod`**——除非 data 有真實的 updatedAt 欄位
  （Google 明言 lastmod 必須可信，拿 build 時間充數會被無視甚至降權）。
- JSON-LD：各產品頁 `Product`（含 `url`／`category`／`additionalProperty`×3：用途材料・
  シャンク・適合電動機）＋ `BreadcrumbList`；全站 `WebSite`。
- **不得**把 `materials` 映射到 schema.org 的 `material`（原因見 §9）。
- **family 層級的 `Product` 不得放單一 `gtin13`**（一個 family 有 33 種尺寸變體）。
  正確做法是 `ProductGroup`＋`hasVariant`——那是獨立的資料建模工程（§14），不要當小修帶進來。

## 12. vercel.json

- 內容：全站 security headers ＋ 三條資源規則（PDF 每次 revalidate；`/assets/` immutable；
  圖片 86400＋stale-while-revalidate）。**規則順序有意義**，新增規則想清楚插哪裡。
- 改 headers 後，部署完要 `curl -I` 實測線上回應，不能只看檔案。

## 13. 完成的定義（宣稱完成前必讀）

- **最低證據**：`npm test` 全綠輸出 ＋ `npm run build` 成功 ＋ grep `dist/` 產物確認
  變更真的進了預渲染 HTML。「改好了、應該可以」不算完成。
- **版面／視覺變更**：headless Chrome 截圖驗證，至少桌機（1280）＋窄版（900 或 mobile）兩個寬度：
  `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --screenshot=out.png --window-size=1280,1100 <URL>`
- **行為驗證技巧**：`--virtual-time-budget=10000 --dump-dom` 可快轉計時器（驗輪播、延遲載入）；
  `--force-prefers-reduced-motion` 可驗減少動態行為。
- **部署後線上驗證**：新資源 200＋正確 content-type、舊資源 404、og／sitemap／headers 用 curl 實測。
- **commit**：使用者自己 push（→ Vercel 自動部署）。agent 被要求 commit 時**一律 `git add -A`**
  （`commit -am` 帶不到新增檔案——本 repo 曾差點因此把 24 張圖漏在本機），commit 前
  `git status` 確認沒有 `??` 殘留。commit 保持單一主題。
- **diff 自審**：不帶無關改動、不留 debug 碼、註解照 §9 的慣例。
- 本 repo 採**執行者／審查者分離**：實作後由另一個 AI 獨立審查。寫程式時假設你的 diff
  會被逐行檢查——不確定的取捨寫在 commit message 或回報裡，不要靜默決定。

## 14. 已知待辦（不要重做、也不要「順手」做）

這些是**刻意還沒做**的，各有前置條件，未經使用者同意不要動手：

- Turnstile ＋ durable rate limit — 等使用者開 Cloudflare 帳號
- 英文版（獨立 URL＋hreflang，或隱藏 EN 切換）— 等使用者確認海外客群策略
- `ProductGroup`＋`hasVariant`＋GTIN 結構化資料 — 獨立建模工程
- 認證頁／案例頁／產品 FAQ／Blog — 等使用者提供素材
- critical CSS 內嵌 — 中型工程，PageSpeed render-blocking 的主因
- DMARC record（reisti.org）— 使用者的 DNS 待辦（建議 `p=none` 監控起步）
- 舊 `reisti-*.png` 清理 — 等外部流量歸零（§5）
