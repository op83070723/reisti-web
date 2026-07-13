#!/usr/bin/env bash
# 重新產生字體子集（只保留網站實際用到的字元）。
# 何時要跑：修改了 ja.js / en.js / products.js 或版面文字、加入新漢字之後。
# 需求：pip3 install --user fonttools brotli
set -euo pipefail
cd "$(dirname "$0")/.."

SRC="src/assets/fonts/GenYoGothic2JP-otf"
OUT="src/assets/fonts/subset"
TMP="$(mktemp)"
mkdir -p "$OUT"

# 1) 從原始碼收集所有用到的可見字元
python3 - "$TMP" <<'PY'
import glob, sys
chars=set()
for p in glob.glob('src/**/*.vue',recursive=True)+glob.glob('src/**/*.js',recursive=True)+['index.html']:
    try: chars|=set(open(p,encoding='utf-8').read())
    except: pass
chars={c for c in chars if ord(c)>=0x20 and ord(c)!=0x7f}
open(sys.argv[1],'w',encoding='utf-8').write(''.join(sorted(chars)))
print('唯一字元數:',len(chars))
PY

# 2) 對每個字重子集成 woff2（ASCII + 平/片假名 + 標點 + 全形 一律保留以策安全）
UNI="U+0020-007E,U+3000-303F,U+3040-30FF,U+FF00-FFEF,U+2010-2027,U+2190-2199,U+2605-2606,U+2039-203A"
# 500(M) は配信対象外（main.css 参照）。復活させる場合は "M:500" を戻し、OTF を再取得する
for pair in "R:400" "B:700" "H:900"; do
  w="${pair%%:*}"; num="${pair##*:}"
  python3 -m fontTools.subset "$SRC/GenYoGothic2JP-$w.otf" \
    --output-file="$OUT/GenYoGothic2JP-$num.woff2" --flavor=woff2 \
    --text-file="$TMP" --unicodes="$UNI" --layout-features='*' --no-hinting
done

rm -f "$TMP"
echo "完成，輸出於 $OUT ："
ls -lh "$OUT"/*.woff2 | awk '{print "  ", $9, $5}'
