# REISTI 說明書與印刷 QR 維護

## 永久不變的 QR 目標

- RH：`https://www.reisti.com/products/hole-saw/hss#manual`
- RHC：`https://www.reisti.com/products/hole-saw/tct#manual`

QR 連的是產品頁，不是 PDF。只要正式網域、產品路徑與 `id="manual"` 保持不變，日後更新 PDF
不需要重印 QR。這兩個網址已用 ECC Q、至少 4 modules 留白的 SVG／PNG 實際解碼驗證。

## 日後更新 PDF：只做這套流程

1. 用新版 PDF 覆蓋 `public/pdf/` 內對應的**同名檔案**；不要改檔名、不要加 `v2` 或日期。
2. 執行 `npm test`；固定網址、PDF 格式、QR 母檔或快取規則被誤改時會直接失敗。
3. 執行 `npm run build`，確認正式 SSG 建置成功。
4. push 並等待 Vercel 部署後，以 `curl -I` 確認 PDF 為 `200`、`Content-Type: application/pdf`，
   且 `Cache-Control: public, max-age=0, must-revalidate`。
5. 用 iPhone 與 Android 各掃一次包裝 QR，確認會到正確產品頁並能開啟新版 PDF。

固定 PDF 檔名：

- `reisti-rp-hex-multi-drill-bit-manual.pdf`
- `reisti-rc-hex-cobalt-drill-manual.pdf`
- `reisti-rh-hss-bimetal-hole-saw-manual.pdf`
- `reisti-rhc-tct-carbide-hole-saw-manual.pdf`

## 真的要改產品網址時

這不是一般網站改版，而是印刷資產變更。必須先取得使用者明確同意，再同步更新產品路由、QR、
自動測試與包裝版面；重新輸出 SVG／至少 1200px PNG，實際解碼後才能送印。
