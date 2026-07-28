export const CATEGORIES = [
  {
    slug: 'drill-bit',
    name: { ja: 'ドリルビット', en: 'Drill Bits' },
    lead: { ja: 'コバルト / マルチ対応', en: 'Cobalt / Multi-Material' },
  },
  {
    slug: 'hole-saw',
    name: { ja: 'ホールソー', en: 'Hole Saws' },
    lead: { ja: 'ハイス（HSS）/ 超硬（TCT）', en: 'HSS / Carbide-Tipped (TCT)' },
  },
]

/* ---- カタログ PDF（全製品共通） ---- */
export const CATALOG_PDF = '/pdf/REISTI_製品カタログ_2026.pdf'
const DOC_CATALOG = {
  label: { ja: '製品カタログ 2026', en: 'Product Catalogue 2026' },
  note: {
    ja: '最新の仕様・使用条件は各製品の取扱説明書をご確認ください。',
    en: 'Refer to each product manual for the latest specifications and operating limits.',
  },
  file: CATALOG_PDF,
}

/* ---- 取扱説明書に記載された用途材料・条件（説明書にない相対評価は付けない） ---- */
const NO_LIMIT = { ja: '—', en: '—' }
const S_MULTI = [
  { name: { ja: '薄鉄板', en: 'Thin Sheet Steel' }, condition: { ja: 't3.0mm以下', en: 't ≤ 3.0mm' } },
  { name: { ja: 'アルミ', en: 'Aluminium' }, condition: NO_LIMIT },
  { name: { ja: 'コンクリート・モルタル・ブロック・レンガ・ALC', en: 'Concrete, Mortar, Block, Brick, ALC' }, condition: NO_LIMIT },
  { name: { ja: '陶器タイル・石膏ボード・木材・プラスチック', en: 'Ceramic Tile, Gypsum Board, Wood, Plastic' }, condition: NO_LIMIT },
]

const S_COBALT = [
  { name: { ja: 'ステンレス・鉄・アルミ・その他難削材', en: 'Stainless Steel, Iron, Aluminium, Other Hard-to-Cut Materials' }, condition: NO_LIMIT },
  { name: { ja: 'プラスチック・木材', en: 'Plastic, Wood' }, condition: NO_LIMIT },
]

const S_HOLE_HSS = [
  { name: { ja: 'ステンレス板', en: 'Stainless Steel Sheet' }, condition: { ja: 't1.0mm以下', en: 't ≤ 1.0mm' } },
  { name: { ja: '鉄板', en: 'Steel Sheet' }, condition: { ja: 't3.0mm以下', en: 't ≤ 3.0mm' } },
  { name: { ja: 'アルミ板', en: 'Aluminium Sheet' }, condition: { ja: 't3.0mm以下', en: 't ≤ 3.0mm' } },
  { name: { ja: '木材・合板・石膏ボード・塩ビ板・アクリル板', en: 'Wood, Plywood, Gypsum Board, PVC Sheet, Acrylic Sheet' }, condition: NO_LIMIT },
]

const S_HOLE_TCT = [
  { name: { ja: 'ステンレス板', en: 'Stainless Steel Sheet' }, condition: { ja: 't10.0mm以下', en: 't ≤ 10.0mm' } },
  { name: { ja: '鋼板', en: 'Steel Plate' }, condition: { ja: 'HB200以下', en: 'HB ≤ 200' } },
  { name: { ja: 'アルミ板', en: 'Aluminium Sheet' }, condition: { ja: 't5.0mm以下', en: 't ≤ 5.0mm' } },
  { name: { ja: '金属パイプ材・FRP', en: 'Metal Pipe, FRP' }, condition: NO_LIMIT },
]

const S_STEP_STD = [
  { name: { ja: '薄板鉄',     en: 'Sheet Steel'  }, level: 3 },
  { name: { ja: 'アルミ',     en: 'Aluminium'    }, level: 3 },
  { name: { ja: '樹脂',       en: 'Plastic'      }, level: 3 },
  { name: { ja: 'ステンレス', en: 'Stainless'    }, level: 2 },
  { name: { ja: '銅・真鍮',   en: 'Copper/Brass' }, level: 3 },
]

const S_STEP_TIALN = [
  { name: { ja: '薄板鉄',     en: 'Sheet Steel'  }, level: 3 },
  { name: { ja: 'アルミ',     en: 'Aluminium'    }, level: 3 },
  { name: { ja: '樹脂',       en: 'Plastic'      }, level: 3 },
  { name: { ja: 'ステンレス', en: 'Stainless'    }, level: 3 },
  { name: { ja: '銅・真鍮',   en: 'Copper/Brass' }, level: 3 },
]

const S_PIPE = [
  { name: { ja: 'PVCパイプ',    en: 'PVC Pipe'       }, level: 3 },
  { name: { ja: '銅管',         en: 'Copper Pipe'    }, level: 3 },
  { name: { ja: 'アルミパイプ', en: 'Aluminium Pipe' }, level: 3 },
  { name: { ja: '木材',         en: 'Wood'           }, level: 2 },
  { name: { ja: '薄板鉄',       en: 'Thin Steel'     }, level: 1 },
]

/* =====================================================================
   規格表データ（製品カタログ 2026 準拠）
   JAN = 4580842 + 6桁。size は表示用文字列（末尾ゼロ保持のため）。
   ===================================================================== */

/* ---- 充電マルチドリルビット（3.0〜12.7mm・20サイズ） ---- */
const SPEC_MULTI = [
  { code: 'RP0300090', size: '3.0',  overall: 90,  effective: 45, jan: '4580842140035' },
  { code: 'RP0320090', size: '3.2',  overall: 90,  effective: 45, jan: '4580842140042' },
  { code: 'RP0340090', size: '3.4',  overall: 90,  effective: 45, jan: '4580842140059' },
  { code: 'RP0350090', size: '3.5',  overall: 90,  effective: 45, jan: '4580842140066' },
  { code: 'RP0380095', size: '3.8',  overall: 95,  effective: 50, jan: '4580842140073' },
  { code: 'RP0400095', size: '4.0',  overall: 95,  effective: 50, jan: '4580842140080' },
  { code: 'RP0430095', size: '4.3',  overall: 95,  effective: 50, jan: '4580842140097' },
  { code: 'RP0450095', size: '4.5',  overall: 95,  effective: 50, jan: '4580842140103' },
  { code: 'RP0480095', size: '4.8',  overall: 95,  effective: 50, jan: '4580842140110' },
  { code: 'RP0500095', size: '5.0',  overall: 95,  effective: 50, jan: '4580842140127' },
  { code: 'RP0530110', size: '5.3',  overall: 110, effective: 60, jan: '4580842140264' },
  { code: 'RP0550110', size: '5.5',  overall: 110, effective: 60, jan: '4580842140134' },
  { code: 'RP0600110', size: '6.0',  overall: 110, effective: 60, jan: '4580842140141' },
  { code: 'RP0640110', size: '6.4',  overall: 110, effective: 60, jan: '4580842140158' },
  { code: 'RP0650110', size: '6.5',  overall: 110, effective: 60, jan: '4580842140165' },
  { code: 'RP0800125', size: '8.0',  overall: 125, effective: 80, jan: '4580842140196' },
  { code: 'RP0850125', size: '8.5',  overall: 125, effective: 80, jan: '4580842140202' },
  { code: 'RP1050125', size: '10.5', overall: 125, effective: 80, jan: null },
  { code: 'RP1250125', size: '12.5', overall: 125, effective: 80, jan: '4580842140240' },
  { code: 'RP1270125', size: '12.7', overall: 125, effective: 80, jan: '4580842140257' },
]

/* ---- 六角軸コバルトドリル（1.5〜13.0mm・27サイズ） ---- */
const SPEC_COBALT = [
  { code: 'RC0150065', size: '1.5',  overall: 65,  effective: 17,  jan: '4580842141018' },
  { code: 'RC0200075', size: '2.0',  overall: 75,  effective: 27,  jan: '4580842141025' },
  { code: 'RC0250075', size: '2.5',  overall: 75,  effective: 27,  jan: '4580842141032' },
  { code: 'RC0280075', size: '2.8',  overall: 75,  effective: 27,  jan: '4580842141049' },
  { code: 'RC0300075', size: '3.0',  overall: 75,  effective: 27,  jan: '4580842141056' },
  { code: 'RC0320075', size: '3.2',  overall: 75,  effective: 27,  jan: '4580842141063' },
  { code: 'RC0350080', size: '3.5',  overall: 80,  effective: 32,  jan: '4580842141094' },
  { code: 'RC0400090', size: '4.0',  overall: 90,  effective: 42,  jan: '4580842141131' },
  { code: 'RC0420090', size: '4.2',  overall: 90,  effective: 42,  jan: '4580842141148' },
  { code: 'RC0450090', size: '4.5',  overall: 90,  effective: 42,  jan: '4580842141155' },
  { code: 'RC0480090', size: '4.8',  overall: 90,  effective: 42,  jan: '4580842141162' },
  { code: 'RC0500090', size: '5.0',  overall: 90,  effective: 42,  jan: '4580842141179' },
  { code: 'RC0550090', size: '5.5',  overall: 90,  effective: 42,  jan: '4580842141193' },
  { code: 'RC0600090', size: '6.0',  overall: 90,  effective: 42,  jan: '4580842141209' },
  { code: 'RC0650100', size: '6.5',  overall: 100, effective: 52,  jan: '4580842141223' },
  { code: 'RC0700109', size: '7.0',  overall: 109, effective: 69,  jan: '4580842141247' },
  { code: 'RC0750109', size: '7.5',  overall: 109, effective: 69,  jan: '4580842141254' },
  { code: 'RC0800117', size: '8.0',  overall: 117, effective: 75,  jan: '4580842141261' },
  { code: 'RC0900125', size: '9.0',  overall: 125, effective: 81,  jan: '4580842141285' },
  { code: 'RC0950125', size: '9.5',  overall: 125, effective: 81,  jan: '4580842141292' },
  { code: 'RC1000133', size: '10.0', overall: 133, effective: 87,  jan: '4580842141308' },
  { code: 'RC1050133', size: '10.5', overall: 133, effective: 87,  jan: '4580842141315' },
  { code: 'RC1100142', size: '11.0', overall: 142, effective: 94,  jan: '4580842141322' },
  { code: 'RC1200151', size: '12.0', overall: 151, effective: 101, jan: '4580842141339' },
  { code: 'RC1250151', size: '12.5', overall: 151, effective: 101, jan: '4580842141346' },
  { code: 'RC1270151', size: '12.7', overall: 151, effective: 101, jan: '4580842141353' },
  { code: 'RC1300151', size: '13.0', overall: 151, effective: 101, jan: '4580842141360' },
]

/* ---- ハイスホールソー（口径15〜65mm・33サイズ／有効長23mm） ---- */
const SHANK_HEX  = { ja: '6.35mm 六角軸', en: '6.35mm hex' }
const SHANK_STR  = { ja: '10mm ストレート', en: '10mm straight' }
const SPEC_HSS = [
  { code: 'RH015', size: '15', shank: SHANK_HEX, jan: '4580842142015' },
  { code: 'RH016', size: '16', shank: SHANK_HEX, jan: '4580842142022' },
  { code: 'RH017', size: '17', shank: SHANK_HEX, jan: '4580842142039' },
  { code: 'RH018', size: '18', shank: SHANK_HEX, jan: '4580842142046' },
  { code: 'RH019', size: '19', shank: SHANK_HEX, jan: '4580842142053' },
  { code: 'RH020', size: '20', shank: SHANK_HEX, jan: '4580842142060' },
  { code: 'RH021', size: '21', shank: SHANK_HEX, jan: '4580842142077' },
  { code: 'RH022', size: '22', shank: SHANK_HEX, jan: '4580842142084' },
  { code: 'RH023', size: '23', shank: SHANK_HEX, jan: '4580842142091' },
  { code: 'RH024', size: '24', shank: SHANK_HEX, jan: '4580842142107' },
  { code: 'RH025', size: '25', shank: SHANK_HEX, jan: '4580842142114' },
  { code: 'RH026', size: '26', shank: SHANK_HEX, jan: '4580842142121' },
  { code: 'RH027', size: '27', shank: SHANK_HEX, jan: '4580842142138' },
  { code: 'RH028', size: '28', shank: SHANK_HEX, jan: '4580842142145' },
  { code: 'RH030', size: '30', shank: SHANK_HEX, jan: '4580842142169' },
  { code: 'RH031', size: '31', shank: SHANK_HEX, jan: '4580842142176' },
  { code: 'RH032', size: '32', shank: SHANK_HEX, jan: '4580842142183' },
  { code: 'RH033', size: '33', shank: SHANK_HEX, jan: '4580842142190' },
  { code: 'RH034', size: '34', shank: SHANK_HEX, jan: '4580842142206' },
  { code: 'RH035', size: '35', shank: SHANK_HEX, jan: '4580842142213' },
  { code: 'RH036', size: '36', shank: SHANK_HEX, jan: '4580842142220' },
  { code: 'RH038', size: '38', shank: SHANK_HEX, jan: '4580842142244' },
  { code: 'RH040', size: '40', shank: SHANK_HEX, jan: '4580842142268' },
  { code: 'RH042', size: '42', shank: SHANK_HEX, jan: '4580842142282' },
  { code: 'RH043', size: '43', shank: SHANK_HEX, jan: '4580842142299' },
  { code: 'RH045', size: '45', shank: SHANK_HEX, jan: '4580842142312' },
  { code: 'RH046', size: '46', shank: SHANK_STR, jan: '4580842142329' },
  { code: 'RH048', size: '48', shank: SHANK_STR, jan: '4580842142343' },
  { code: 'RH050', size: '50', shank: SHANK_STR, jan: '4580842142367' },
  { code: 'RH052', size: '52', shank: SHANK_STR, jan: '4580842142381' },
  { code: 'RH055', size: '55', shank: SHANK_STR, jan: '4580842142411' },
  { code: 'RH060', size: '60', shank: SHANK_STR, jan: '4580842142466' },
  { code: 'RH065', size: '65', shank: SHANK_STR, jan: '4580842142510' },
]

/* ---- 超硬ホールソー（口径14〜65mm・28サイズ／有効長20mm） ---- */
const SPEC_TCT = [
  { code: 'RHC014', size: '14', shank: SHANK_STR, jan: '4580842143012' },
  { code: 'RHC015', size: '15', shank: SHANK_STR, jan: '4580842143029' },
  { code: 'RHC016', size: '16', shank: SHANK_STR, jan: '4580842143036' },
  { code: 'RHC018', size: '18', shank: SHANK_STR, jan: '4580842143050' },
  { code: 'RHC019', size: '19', shank: SHANK_STR, jan: '4580842143067' },
  { code: 'RHC021', size: '21', shank: SHANK_STR, jan: '4580842143081' },
  { code: 'RHC022', size: '22', shank: SHANK_STR, jan: '4580842143098' },
  { code: 'RHC023', size: '23', shank: SHANK_STR, jan: '4580842143104' },
  { code: 'RHC025', size: '25', shank: SHANK_STR, jan: '4580842143128' },
  { code: 'RHC027', size: '27', shank: SHANK_STR, jan: '4580842143142' },
  { code: 'RHC028', size: '28', shank: SHANK_STR, jan: '4580842143159' },
  { code: 'RHC030', size: '30', shank: SHANK_STR, jan: '4580842143173' },
  { code: 'RHC032', size: '32', shank: SHANK_STR, jan: '4580842143197' },
  { code: 'RHC033', size: '33', shank: SHANK_STR, jan: '4580842143203' },
  { code: 'RHC034', size: '34', shank: SHANK_STR, jan: '4580842143210' },
  { code: 'RHC035', size: '35', shank: SHANK_STR, jan: '4580842143227' },
  { code: 'RHC036', size: '36', shank: SHANK_STR, jan: '4580842143234' },
  { code: 'RHC038', size: '38', shank: SHANK_STR, jan: '4580842143258' },
  { code: 'RHC040', size: '40', shank: SHANK_STR, jan: '4580842143272' },
  { code: 'RHC042', size: '42', shank: SHANK_STR, jan: '4580842143296' },
  { code: 'RHC043', size: '43', shank: SHANK_STR, jan: '4580842143302' },
  { code: 'RHC045', size: '45', shank: SHANK_STR, jan: '4580842143326' },
  { code: 'RHC048', size: '48', shank: SHANK_STR, jan: '4580842143357' },
  { code: 'RHC050', size: '50', shank: SHANK_STR, jan: '4580842143371' },
  { code: 'RHC053', size: '53', shank: SHANK_STR, jan: '4580842143401' },
  { code: 'RHC055', size: '55', shank: SHANK_STR, jan: '4580842143425' },
  { code: 'RHC060', size: '60', shank: SHANK_STR, jan: '4580842143470' },
  { code: 'RHC065', size: '65', shank: SHANK_STR, jan: '4580842143524' },
]

/* ===== REISTI ブランド製品（自社工場製造） ===== */
export const FAMILIES = [
  /* ---- ドリルビット ---- */
  {
    category: 'drill-bit',
    family: 'multi-drill',
    brand: 'reisti',
    name: { ja: '充電マルチドリルビット', en: 'Hex Multi Drill Bit' },
    card: {
      ja: '異素材もビット交換不要。コンクリートも回転モードで。',
      en: 'No bit changes across mixed materials; drills concrete in rotation mode.',
    },
    cardImage: '/products/scroller/multi.webp',
    intro: {
      ja: '異なる材料が重なる場所でもビット交換不要。回転・インパクトの両モードで使用できる多用途ドリルビット。',
      en: 'A multi-purpose bit for overlapping materials without bit changes, supporting both rotation and impact operation.',
    },
    variants: [
      {
        slug: 'multi',
        label: { ja: '標準', en: 'Standard' },
        hero: '/products/multi-1.webp',
        gallery: [
          {
            src: '/products/multi-1.webp', width: 1600, height: 1200,
            alt: { ja: 'REISTI 充電マルチドリルビット4サイズの製品全景', en: 'Four sizes of REISTI hex multi drill bits' },
          },
          {
            src: '/products/multi-2.webp', width: 1600, height: 900,
            alt: { ja: '充電マルチドリルビットの超硬チップと非対称刃先', en: 'Carbide tips and asymmetric cutting edges on REISTI hex multi drill bits' },
          },
          {
            src: '/products/multi-3.webp', width: 1600, height: 900,
            alt: { ja: 'REISTIのサイズ刻印と6.35mm六角軸シャンク', en: 'REISTI size markings and 6.35 mm hex shanks' },
          },
          {
            src: '/products/multi-4.webp', width: 1600, height: 900, locales: ['ja'],
            alt: { ja: '充電マルチドリルビットをインパクトドライバーへワンタッチ装着', en: 'One-touch installation of a hex multi drill bit in an impact driver' },
          },
          {
            src: '/products/multi-5.webp', width: 1600, height: 900,
            alt: { ja: '充電マルチドリルビットの超硬チップ先端', en: 'Close-up of the carbide tip on a REISTI hex multi drill bit' },
          },
        ],
        detail: {
          ja: '異なる材料が重なる場所でも、ビットを交換せずに1本で穴あけを進められる多用途タイプです。超硬チップ＋非対称刃先で食いつきが良く、6.35mm六角軸によりインパクトドライバーへワンタッチ装着できます。回転・インパクトのどちらでも使用できます。振動ドリルの振動モード、ハンマードリルおよび逆回転では使用しないでください。',
          en: 'A multi-purpose bit that drills through overlapping materials without bit changes. Its carbide tip and asymmetric cutting edge bite cleanly, while the 6.35mm hex shank attaches to impact drivers in one touch. Both rotation and impact operation are supported. Do not use a vibration drill in vibration mode, a hammer drill, or reverse rotation.',
        },
        features: [
          { ja: 'インパクトドライバー対応：6.35mm六角軸シャンク採用で、充電インパクトドライバーにワンタッチで装着可能。', en: 'Impact driver ready: 6.35mm hex shank attaches one-touch to cordless impact drivers.' },
          { ja: '超硬チップ＋非対称刃先：食いつきが良く、薄鉄板・コンクリート・ブロックへの穴あけスピードが向上。', en: 'Carbide tip + asymmetric edge: positive bite and faster drilling in thin steel, concrete, and block.' },
          { ja: '高耐久仕様：耐摩耗性に優れた超硬チップを採用し、長寿命を実現。', en: 'High durability: wear-resistant carbide tip for extended tool life.' },
        ],
        materials: { ja: '薄鉄板（t3.0mm以下）・アルミ・コンクリート・モルタル・ブロック・レンガ・ALC・陶器タイル・石膏ボード・木材・プラスチック', en: 'Thin sheet steel (t ≤ 3.0mm), aluminium, concrete, mortar, block, brick, ALC, ceramic tile, gypsum board, wood, plastic' },
        shank:     { ja: '6.35mm 六角シャンク', en: '6.35mm hex shank' },
        tools:     { ja: 'インパクトドライバー・充電ドリル（9.6V以上）・電気ドリル（400W以下）・振動ドリル（回転モード）', en: 'Impact drivers, cordless drills (9.6V+), electric drills (up to 400W), vibration drills (rotation mode)' },
        driveBadges: [{ type: 'rotation' }, { type: 'impact' }],
        sizeNote:  { ja: '刃先径 3.0〜12.7mm・全20サイズ', en: 'Ø3.0–12.7mm · 20 sizes' },
        specCols: ['code', 'size', 'overall', 'effective', 'jan'],
        suitability: S_MULTI,
        specs: SPEC_MULTI,
      },
    ],
    manual: '/pdf/reisti-rp-hex-multi-drill-bit-manual.pdf',
    docs: [DOC_CATALOG],
  },
  {
    category: 'drill-bit',
    family: 'cobalt-drill',
    brand: 'reisti',
    name: { ja: '六角軸コバルトドリル', en: 'Hex Cobalt Drill Bit' },
    card: {
      ja: 'M35コバルトハイス鋼で、ステンレス・難削材に。',
      en: 'M35 cobalt HSS for stainless steel and hard-to-cut materials.',
    },
    cardImage: '/products/scroller/cobalt.webp',
    intro: {
      ja: 'コバルトハイス鋼 M35（HSS-Co5／JIS SKH55 相当）を採用。ステンレス鋼・難削材の穴あけに対応。',
      en: 'M35 cobalt HSS (HSS-Co5 / JIS SKH55 equivalent) for drilling stainless steel and hard-to-cut materials.',
    },
    variants: [
      {
        slug: 'cobalt',
        label: { ja: '標準', en: 'Standard' },
        hero: '/products/cobalt-1.webp',
        gallery: [
          {
            src: '/products/cobalt-1.webp', width: 1600, height: 1200,
            alt: { ja: 'REISTI 六角軸コバルトドリル4サイズの製品全景', en: 'Four sizes of REISTI hex cobalt drill bits' },
          },
          {
            src: '/products/cobalt-2.webp', width: 1600, height: 900,
            alt: { ja: '六角軸コバルトドリルの先端角135°・X型シンニング刃先', en: '135-degree split point with X-type thinning on REISTI hex cobalt drill bits' },
          },
          {
            src: '/products/cobalt-3.webp', width: 1600, height: 900,
            alt: { ja: 'REISTIのサイズ刻印と6.35mm六角軸シャンク', en: 'REISTI size markings and 6.35 mm hex shanks on hex cobalt drill bits' },
          },
          {
            src: '/products/cobalt-4.webp', width: 1600, height: 900, locales: ['ja'],
            alt: { ja: '六角軸コバルトドリルをインパクトドライバーへワンタッチ装着', en: 'One-touch installation of a cobalt drill bit in an impact driver' },
          },
          {
            src: '/products/cobalt-5.webp', width: 1600, height: 900,
            alt: { ja: 'インパクトドライバーに装着したコバルトドリルの刃先', en: 'Close-up of a cobalt drill cutting edge mounted in an impact driver' },
          },
        ],
        detail: {
          ja: 'コバルトハイス鋼 M35（HSS-Co5／JIS SKH55 相当）を採用し、ステンレス鋼や難削材の穴あけに対応します。刃部と六角軸を一体成形した削り出し構造でブレ・折れに強く、先端角135°・X型シンニング加工によりセンターポンチなしでも正確な穴あけが可能です。回転・インパクトのどちらでも使用できます。振動ドリルの振動モードおよびハンマードリルでは使用しないでください。',
          en: 'Made from M35 cobalt HSS (HSS-Co5 / JIS SKH55 equivalent) for drilling stainless steel and hard-to-cut materials. The cutting section and hex shank are machined as one piece for resistance to runout and breakage, while the 135-degree split point with X-type thinning starts accurately without a centre punch. Both rotation and impact operation are supported. Do not use a vibration drill in vibration mode or a hammer drill.',
        },
        features: [
          { ja: 'コバルトハイス鋼 M35：HSS-Co5／JIS SKH55 相当。耐熱性・耐摩耗性に優れ、ステンレス鋼や難削材に対応。', en: 'M35 cobalt HSS: HSS-Co5 / JIS SKH55 equivalent, with heat and wear resistance for stainless steel and hard-to-cut materials.' },
          { ja: '削り出し一体構造：刃部と六角軸を一体成形し、接合部がなくブレ・折れに強い。', en: 'One-piece machined construction: the cutting section and hex shank are formed together for resistance to runout and breakage.' },
          { ja: '先端角135°・X型シンニング加工：食いつきが良く、センターポンチ不要で正確な穴あけが可能。', en: '135-degree split point with X-type thinning: clean starting and accurate drilling without a centre punch.' },
          { ja: 'インパクトドライバー対応：6.35mm六角軸シャンク採用で、充電インパクトドライバーにワンタッチで装着可能。', en: 'Impact driver ready: 6.35mm hex shank, one-touch attachment.' },
        ],
        materials: { ja: 'ステンレス・鉄・アルミ・その他難削材・プラスチック・木材', en: 'Stainless steel, iron, aluminium, other hard-to-cut materials, plastic, wood' },
        shank:     { ja: '6.35mm 六角軸', en: '6.35mm hex shank' },
        tools:     { ja: 'インパクトドライバー・充電ドリル（9.6V以上）・電気ドリル・振動ドリル（回転モード）', en: 'Impact drivers, cordless drills (9.6V+), electric drills, vibration drills (rotation mode)' },
        driveBadges: [{ type: 'rotation' }, { type: 'impact' }],
        sizeNote:  { ja: '刃先径 1.5〜13.0mm・全27サイズ', en: 'Ø1.5–13.0mm · 27 sizes' },
        specCols: ['code', 'size', 'overall', 'effective', 'jan'],
        suitability: S_COBALT,
        specs: SPEC_COBALT,
      },
    ],
    manual: '/pdf/reisti-rc-hex-cobalt-drill-manual.pdf',
    docs: [DOC_CATALOG],
  },

  /* ---- ホールソー ---- */
  {
    category: 'hole-saw',
    family: 'hss',
    brand: 'reisti',
    name: { ja: 'ハイスホールソー', en: 'HSS Bimetal Hole Saw' },
    card: {
      ja: 'バイメタル刃＋ツバ無し設計。狭所・壁際にも。',
      en: 'Bimetal teeth and flange-free design for tight spaces and wall edges.',
    },
    cardImage: '/products/scroller/hss.webp',
    intro: {
      ja: '高速度鋼（H.S.S.）の刃先と柔軟なバックボーンを組み合わせた、ツバ無し設計のバイメタルホールソー。',
      en: 'A flange-free bimetal hole saw combining high-speed steel (H.S.S.) teeth with a flexible backbone.',
    },
    variants: [
      {
        slug: 'hss',
        label: { ja: '標準', en: 'Standard' },
        hero: '/products/hss-1.webp',
        gallery: [
          {
            src: '/products/hss-1.webp', width: 1600, height: 1200,
            alt: { ja: 'REISTI ハイスホールソー3サイズの製品全景', en: 'Three sizes of REISTI HSS bimetal hole saws' },
          },
          {
            src: '/products/hss-2.webp', width: 1600, height: 900,
            alt: { ja: 'ハイスホールソーのバイメタル刃と段付きチタンコーティングセンタードリル', en: 'Bimetal teeth and stepped titanium-coated centre drills on REISTI HSS bimetal hole saws' },
          },
          {
            src: '/products/hss-3.webp', width: 1600, height: 900, locales: ['ja'],
            alt: { ja: '45mm以下のハイスホールソーをインパクトドライバーへワンタッチ装着', en: 'One-touch installation of an HSS hole saw up to 45 mm in an impact driver' },
          },
        ],
        detail: {
          ja: '高速度鋼（H.S.S.）の刃先と柔軟なバックボーンを組み合わせたバイメタル構造です。ツバ無し設計で壁際や狭所でも扱いやすく、段付き・チタンコーティングセンタードリルが貫通時の衝撃を緩和します。全サイズにカステルスプリングを標準装備。口径45mm以下は回転・インパクトのどちらでも使用でき、インパクトドライバーで金属板に穿孔する場合は18V以下・3,000rpm以下を推奨します。',
          en: 'Bimetal construction combines high-speed steel teeth with a flexible backbone. The flange-free body works near walls and in tight spaces, while the stepped titanium-coated centre drill reduces breakthrough impact. A Castel spring is standard on every size. Sizes up to 45mm support both rotation and impact operation; when drilling metal sheet with an impact driver, 18V or less and 3,000rpm or less are recommended.',
        },
        features: [
          { ja: 'バイメタル構造：高速度鋼（H.S.S.）の刃先と柔軟なバックボーンを組み合わせた構造。', en: 'Bimetal construction: high-speed steel (H.S.S.) teeth combined with a flexible backbone.' },
          { ja: 'ツバ無し設計：壁際や狭所でも作業しやすく、貫通作業が可能な構造。', en: 'Flange-free design: easy to use near walls and in confined spaces, with through-cut capability.' },
          { ja: '段付き・チタンコーティングセンタードリル：貫通時の衝撃を緩和し、刃先の破損を防止。耐摩耗性も向上。', en: 'Stepped titanium-coated centre drill: reduces breakthrough impact, helps prevent tooth damage, and improves wear resistance.' },
          { ja: 'カステルスプリング標準装備：全サイズに装備し、抜けカスの取り出しを容易にします。', en: 'Castel spring supplied as standard: fitted to every size for easier slug removal.' },
        ],
        materials: { ja: 'ステンレス板（t1.0mm以下）・鉄板／アルミ板（t3.0mm以下）・木材・合板・石膏ボード・塩ビ板・アクリル板', en: 'Stainless steel sheet (t ≤ 1.0mm), steel and aluminium sheet (t ≤ 3.0mm), wood, plywood, gypsum board, PVC sheet, acrylic sheet' },
        shank:     { ja: '6.35mm六角シャンク（口径15〜45mm）／10mmストレートシャンク（46mm以上）', en: '6.35mm hex shank (Ø15–45mm) / 10mm straight shank (Ø46mm+)' },
        tools:     { ja: 'インパクトドライバー（口径45mm以下）・充電ドリル・電気ドリル（回転専用・回転モード）・振動ドリル（回転モード）', en: 'Impact drivers (Ø45mm and below), cordless drills, electric drills (rotation only), vibration drills (rotation mode)' },
        driveBadges: [
          { type: 'rotation' },
          { type: 'impact', condition: { ja: '口径45mm以下', en: 'Ø45mm and below' } },
        ],
        sizeNote:  { ja: '口径 15〜65mm・全33サイズ／有効長 23mm', en: 'Ø15–65mm · 33 sizes / effective length 23mm' },
        specCols: ['code', 'size', 'shank', 'jan'],
        suitability: S_HOLE_HSS,
        specs: SPEC_HSS,
      },
    ],
    manual: '/pdf/reisti-rh-hss-bimetal-hole-saw-manual.pdf',
    docs: [DOC_CATALOG],
  },
  {
    category: 'hole-saw',
    family: 'tct',
    brand: 'reisti',
    name: { ja: '超硬ホールソー', en: 'TCT Carbide Hole Saw' },
    card: {
      ja: 'トリプル超硬刃でステンレス板・FRPに。',
      en: 'Triple carbide teeth for stainless steel sheet and FRP.',
    },
    cardImage: '/products/scroller/tct.webp',
    intro: {
      ja: 'トリプル刃・超硬チップ採用。ステンレス板・FRPなど難削材の精密穴あけに。',
      en: 'Triple-blade carbide tips for precision holes in stainless sheet, FRP, and other hard materials.',
    },
    variants: [
      {
        slug: 'tct',
        label: { ja: '標準', en: 'Standard' },
        hero: '/products/tct-1.webp',
        gallery: [
          {
            src: '/products/tct-1.webp', width: 1600, height: 1200,
            alt: { ja: 'REISTI 超硬ホールソー3サイズの製品全景', en: 'Three sizes of REISTI carbide-tipped hole saws' },
          },
          {
            src: '/products/tct-2.webp', width: 1600, height: 900,
            alt: { ja: '超硬ホールソーのトリプル刃と段付きチタンコーティングセンタードリル', en: 'Triple carbide teeth and stepped titanium-coated centre drills on REISTI TCT carbide hole saws' },
          },
          {
            src: '/products/tct-3.webp', width: 1600, height: 900,
            alt: { ja: '電気ドリルに装着したREISTI超硬ホールソー', en: 'REISTI carbide-tipped hole saw mounted in an electric drill' },
          },
        ],
        detail: {
          ja: '外刃・中刃・内刃の3種類からなるトリプル刃と超硬チップにより、ステンレス板・FRPなどの難削材に対応します。ツバ無し設計は薄板・精密加工に適し、段付き・チタンコーティングセンタードリルが貫通時の衝撃を緩和。全サイズにカステルスプリングを標準装備しています。必ず回転モードで使用し、インパクトドライバー・振動モード・ハンマードリルは使用しないでください。',
          en: 'Three carbide tooth profiles—outer, centre, and inner—handle difficult materials such as stainless steel sheet and FRP. The flange-free body suits thin-sheet precision work, while the stepped titanium-coated centre drill reduces breakthrough impact. A Castel spring is standard on every size. Use in rotation mode only; impact drivers, vibration mode, and hammer drills are not permitted.',
        },
        features: [
          { ja: 'トリプル刃・超硬チップ：外刃・中刃・内刃の3種類の刃形で高速穿孔と高耐久を実現。', en: 'Triple carbide teeth: outer, centre, and inner tooth profiles for fast drilling and durability.' },
          { ja: '段付き・チタンコーティングセンタードリル：貫通時の衝撃を緩和し、刃先の破損を防止。耐摩耗性も向上。', en: 'Stepped titanium-coated centre drill: reduces breakthrough impact, helps prevent tooth damage, and improves wear resistance.' },
          { ja: 'カステルスプリング標準装備：全サイズに装備し、抜けカスの取り出しを容易にします。', en: 'Castel spring supplied as standard: fitted to every size for easier slug removal.' },
          { ja: 'ツバ無し設計：薄板・精密加工に適した構造。', en: 'Flange-free design: suited to thin-sheet precision work.' },
        ],
        materials: { ja: 'ステンレス板（t10.0mm以下）・鋼板（HB200以下）・アルミ板（t5.0mm以下）・金属パイプ材・FRP', en: 'Stainless steel sheet (t ≤ 10.0mm), steel plate (HB ≤ 200), aluminium sheet (t ≤ 5.0mm), metal pipe, FRP' },
        shank:     { ja: '10mm ストレートシャンク', en: '10mm straight shank' },
        tools:     { ja: '電気ドリル（回転専用・回転モード）・充電ドリル（回転モード）・ボール盤', en: 'Electric drills (rotation only), cordless drills (rotation mode), drill presses' },
        driveBadges: [{ type: 'rotation', only: true }],
        sizeNote:  { ja: '口径 14〜65mm・全28サイズ／有効長 20mm', en: 'Ø14–65mm · 28 sizes / effective length 20mm' },
        specCols: ['code', 'size', 'shank', 'jan'],
        suitability: S_HOLE_TCT,
        specs: SPEC_TCT,
      },
    ],
    manual: '/pdf/reisti-rhc-tct-carbide-hole-saw-manual.pdf',
    docs: [DOC_CATALOG],
  },
]

/* ===== OEM 取扱製品（提携工場製造・REISTIブランドなし） ===== */
export const OEM_FAMILIES = [
  {
    family: 'step-drill',
    brand: 'oem',
    name: { ja: 'ステップドリル', en: 'Step Drill' },
    intro: {
      ja: '薄板のバリ少ない拡孔に。標準タイプ。',
      en: 'Clean step-drilling in thin sheet materials with minimal burr.',
    },
    variants: [
      {
        slug: 'std',
        label: { ja: '標準', en: 'Standard' },
        hero: null,
        gallery: [],
        detail: {
          ja: `段付き刃でセンタードリル不要。薄板鉄・アルミ・樹脂の拡孔や面取りに。二枚刃切刃でスムーズに切削、バリを抑制。
適合電動機：電気ドリル（低速推奨）`,
          en: `No center drill needed. For step-drilling and chamfering in sheet steel, aluminium, and plastic. Twin-flute cutting for smooth, low-burr results.
Compatible tools: Electric drills (low speed recommended)`,
        },
        suitability: S_STEP_STD,
        popularSizes: ['4-12', '4-20'],
        specs: [],
      },
    ],
  },
  {
    family: 'step-tialn',
    brand: 'oem',
    name: { ja: 'ステップドリル TiAlN', en: 'Step Drill (TiAlN Coated)' },
    intro: {
      ja: '耐熱性・耐摩耗性に優れた TiAlN コーティング。',
      en: 'TiAlN coating for superior heat and wear resistance.',
    },
    variants: [
      {
        slug: 'tialn',
        label: { ja: 'TiAlN', en: 'TiAlN' },
        hero: null,
        gallery: [],
        detail: {
          ja: `TiAlN コーティングにより高温下でも耐摩耗性を発揮。ステンレスなど難削材でも安定した切削が可能。
適合電動機：電気ドリル（低速推奨）`,
          en: `TiAlN coating maintains hardness at high temperatures. Stable cutting even in difficult materials like stainless steel.
Compatible tools: Electric drills (low speed recommended)`,
        },
        suitability: S_STEP_TIALN,
        popularSizes: ['4-22', '6-30'],
        specs: [],
      },
    ],
  },
  {
    family: 'pipe-saw',
    brand: 'oem',
    name: { ja: 'パイプソー', en: 'Pipe Saw' },
    intro: {
      ja: 'PVC・銅管・アルミパイプの切断に。',
      en: 'For cutting PVC, copper, and aluminium pipes.',
    },
    variants: [
      {
        slug: 'pipe',
        label: { ja: '標準', en: 'Standard' },
        hero: null,
        gallery: [],
        detail: {
          ja: `PVC管・銅管・アルミパイプの切断に特化した鋸刃。素早くバリの少ない切断面を実現。DIY・設備工事の現場で活躍。
適合電動機：往復鋸（レシプロソー） / 手動`,
          en: `Blade optimized for cutting PVC, copper, and aluminium pipes. Fast, clean cuts with minimal burr for DIY and installation work.
Compatible tools: Reciprocating saws / Manual use`,
        },
        suitability: S_PIPE,
        popularSizes: [],
        specs: [],
      },
    ],
  },
]

export function findFamily(categorySlug, slugOrFamily) {
  const families = FAMILIES.filter(f => f.category === categorySlug)
  for (const f of families) {
    if (f.family === slugOrFamily) return { family: f, variant: f.variants[0] }
    const v = f.variants.find(v => v.slug === slugOrFamily)
    if (v) return { family: f, variant: v }
  }
  return null
}
