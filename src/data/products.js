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
const DOC_CATALOG = { label: { ja: '製品カタログ 2026', en: 'Product Catalogue 2026' }, file: CATALOG_PDF }

/* ---- Suitability presets (level: 3=best / 2=good / 1=possible) ---- */
const S_MULTI = [
  { name: { ja: 'コンクリート',   en: 'Concrete'        }, level: 3 },
  { name: { ja: 'ブロック・レンガ', en: 'Block / Brick'  }, level: 3 },
  { name: { ja: 'モルタル',       en: 'Mortar'          }, level: 3 },
  { name: { ja: '石膏ボード',     en: 'Gypsum Board'    }, level: 3 },
  { name: { ja: '陶器タイル',     en: 'Ceramic Tile'    }, level: 2 },
  { name: { ja: '薄鉄板',         en: 'Thin Sheet Steel' }, level: 2 },
]

const S_COBALT = [
  { name: { ja: 'ステンレス', en: 'Stainless Steel'  }, level: 3 },
  { name: { ja: '鉄・鋼材',   en: 'Steel / Iron'     }, level: 3 },
  { name: { ja: 'アルミ',     en: 'Aluminium'        }, level: 3 },
  { name: { ja: '銅・真鍮',   en: 'Copper / Brass'   }, level: 3 },
  { name: { ja: '木材',       en: 'Wood'             }, level: 2 },
]

const S_HOLE_HSS = [
  { name: { ja: '薄鉄板',   en: 'Thin Sheet Steel' }, level: 3 },
  { name: { ja: 'アルミ板', en: 'Aluminium Sheet'  }, level: 3 },
  { name: { ja: '塩ビ板',   en: 'PVC Sheet'        }, level: 3 },
  { name: { ja: '木材',     en: 'Wood'             }, level: 3 },
  { name: { ja: '合板',     en: 'Plywood'          }, level: 3 },
]

const S_HOLE_TCT = [
  { name: { ja: 'ステンレス板', en: 'Stainless Sheet' }, level: 3 },
  { name: { ja: '鉄板',         en: 'Steel Plate'     }, level: 3 },
  { name: { ja: '銅板',         en: 'Copper Sheet'    }, level: 3 },
  { name: { ja: 'アルミ板',     en: 'Aluminium Sheet' }, level: 3 },
  { name: { ja: 'FRP',          en: 'FRP'             }, level: 3 },
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
    name: { ja: '充電マルチドリルビット', en: 'Cordless Multi Drill Bit' },
    intro: {
      ja: '超硬チップ＋6.35mm六角軸。薄鉄板からコンクリート・タイルまでこれ一本で。',
      en: 'Carbide tip with 6.35mm hex shank. From thin steel to concrete and tile — one bit does it all.',
    },
    variants: [
      {
        slug: 'multi',
        label: { ja: '標準', en: 'Standard' },
        hero: '/products/reisti-cordless-multi-drill-bit.png',
        gallery: ['/products/reisti-cordless-multi-drill-bit.png'],
        detail: {
          ja: '6.35mm六角軸シャンク採用で、充電インパクトドライバーにワンタッチ装着。超硬チップ＋非対称刃先により食いつきが良く、薄鉄板・コンクリート・ブロックへの穴あけスピードが向上。耐摩耗性に優れた超硬チップで長寿命を実現した高耐久仕様です。',
          en: 'One-touch attachment to cordless impact drivers via 6.35mm hex shank. Carbide tip with asymmetric cutting edge bites fast into thin steel, concrete, and block. Wear-resistant carbide delivers long service life.',
        },
        features: [
          { ja: 'インパクトドライバー対応：6.35mm六角軸シャンク採用で、充電インパクトドライバーにワンタッチで装着可能。', en: 'Impact driver ready: 6.35mm hex shank attaches one-touch to cordless impact drivers.' },
          { ja: '超硬チップ＋非対称刃先：食いつきが良く、薄鉄板・コンクリート・ブロックへの穴あけスピードが向上。', en: 'Carbide tip + asymmetric edge: positive bite and faster drilling in thin steel, concrete, and block.' },
          { ja: '高耐久仕様：耐摩耗性に優れた超硬チップを採用し、長寿命を実現。', en: 'High durability: wear-resistant carbide tip for extended tool life.' },
        ],
        materials: { ja: '薄鉄板・コンクリート・モルタル・ブロック・レンガ・石膏ボード・陶器タイル', en: 'Thin sheet steel, concrete, mortar, block, brick, gypsum board, ceramic tile' },
        shank:     { ja: '6.35mm 六角シャンク', en: '6.35mm hex shank' },
        tools:     { ja: 'インパクトドライバー・充電ドリル（9.6V以上）・電気ドリル（400W以下）', en: 'Impact drivers, cordless drills (9.6V+), electric drills (up to 400W)' },
        sizeNote:  { ja: '刃先径 3.0〜12.7mm・全20サイズ', en: 'Ø3.0–12.7mm · 20 sizes' },
        specCols: ['code', 'size', 'overall', 'effective', 'jan'],
        suitability: S_MULTI,
        popularSizes: ['6.0', '8.0'],
        specs: SPEC_MULTI,
      },
    ],
    docs: [DOC_CATALOG],
  },
  {
    category: 'drill-bit',
    family: 'cobalt-drill',
    brand: 'reisti',
    name: { ja: '六角軸コバルトドリル', en: 'Hex Shank Cobalt Drill' },
    intro: {
      ja: 'コバルトハイス（HSS-Co）採用。ステンレス鋼・難削材の穴あけに。',
      en: 'Cobalt HSS (HSS-Co) for drilling stainless steel and hard-to-cut materials.',
    },
    variants: [
      {
        slug: 'cobalt',
        label: { ja: '標準', en: 'Standard' },
        hero: '/products/reisti-hex-cobalt-drill.png',
        gallery: ['/products/reisti-hex-cobalt-drill.png'],
        detail: {
          ja: 'ステンレス鋼や難削材の加工に最適なコバルトハイス（HSSCO）を採用。耐熱性・耐摩耗性に優れた高級ハイス鋼で長寿命を実現。精密研磨仕上げにより食いつきが良く、センターポンチ不要で正確な位置への穴あけが可能です。',
          en: 'Cobalt HSS (HSSCO) optimized for stainless steel and difficult materials. Premium high-speed steel with superior heat and wear resistance for long life. Precision-ground point bites cleanly — no center punch needed for accurate positioning.',
        },
        features: [
          { ja: 'コバルトハイス（HSSCO）採用：ステンレス鋼や難削材の加工に最適。耐熱性・耐摩耗性に優れた高級ハイス鋼で長寿命を実現。', en: 'Cobalt HSS (HSSCO): ideal for stainless and difficult materials. Superior heat/wear resistance for long tool life.' },
          { ja: '精密研磨仕上げ：食いつきが良く、センターポンチ不要で正確な位置への穴あけが可能。', en: 'Precision-ground finish: clean bite, accurate positioning without a center punch.' },
          { ja: 'インパクトドライバー対応：6.35mm六角軸シャンク採用で、充電インパクトドライバーにワンタッチで装着可能。', en: 'Impact driver ready: 6.35mm hex shank, one-touch attachment.' },
        ],
        materials: { ja: 'ステンレス・鋼・鉄・アルミ・木材・その他難削材', en: 'Stainless steel, steel, iron, aluminium, wood, other hard-to-cut materials' },
        shank:     { ja: '6.35mm 六角軸', en: '6.35mm hex shank' },
        tools:     { ja: 'インパクトドライバー・充電ドリル（9.6V以上）・電気ドリル（400W以下）', en: 'Impact drivers, cordless drills (9.6V+), electric drills (up to 400W)' },
        sizeNote:  { ja: '刃先径 1.5〜13.0mm・全27サイズ', en: 'Ø1.5–13.0mm · 27 sizes' },
        specCols: ['code', 'size', 'overall', 'effective', 'jan'],
        suitability: S_COBALT,
        popularSizes: ['3.2', '4.2', '5.0', '6.5'],
        specs: SPEC_COBALT,
      },
    ],
    docs: [DOC_CATALOG],
  },

  /* ---- ホールソー ---- */
  {
    category: 'hole-saw',
    family: 'hss',
    brand: 'reisti',
    name: { ja: 'ハイスホールソー', en: 'HSS Hole Saw' },
    intro: {
      ja: 'バイメタル構造（H.S.S.）のツバ無しホールソー。電気工事・配管工事の定番サイズを全ラインナップ。',
      en: 'Flange-free bimetal (H.S.S.) hole saw. Full lineup of standard sizes for electrical and plumbing work.',
    },
    variants: [
      {
        slug: 'hss',
        label: { ja: '標準', en: 'Standard' },
        hero: '/products/reisti-hss-bimetal-hole-saw.png',
        gallery: ['/products/reisti-hss-bimetal-hole-saw.png'],
        detail: {
          ja: '高速度鋼（H.S.S.）の刃先と柔軟なバックボーンを組み合わせたバイメタル構造。ツバ無し設計でスペースが限られた作業環境でも使いやすく、薄鉄板・アルミ・塩ビ・木材など幅広い材料に対応します。電気工事・配管工事の定番サイズを全33サイズラインナップ。',
          en: 'Bimetal construction pairs an H.S.S. cutting edge with a flexible backbone. Flange-free design works in tight spaces, cutting thin steel, aluminium, PVC, and wood. Full 33-size lineup covering standard electrical and plumbing diameters.',
        },
        features: [
          { ja: 'バイメタル構造（H.S.S.）：高速度鋼の刃先と柔軟なバックボーンの組み合わせ。', en: 'Bimetal (H.S.S.): high-speed steel edge with a flexible backbone.' },
          { ja: 'ツバ無し設計：スペースが限られた作業環境でも使いやすい。', en: 'Flange-free design: easy to use even in confined workspaces.' },
          { ja: '電気工事・配管工事の定番サイズを全ラインナップ。', en: 'Complete lineup of standard sizes for electrical and plumbing work.' },
          { ja: '薄鉄板・アルミ・PVC・木材など幅広い材料に対応。', en: 'Cuts a wide range of materials: thin steel, aluminium, PVC, wood.' },
        ],
        materials: { ja: '薄鉄板・アルミ板・塩ビ板・木材・合板', en: 'Thin sheet steel, aluminium sheet, PVC sheet, wood, plywood' },
        shank:     { ja: '6.35mm六角シャンク（口径15〜45mm）／10mmストレートシャンク（46mm以上）', en: '6.35mm hex shank (Ø15–45mm) / 10mm straight shank (Ø46mm+)' },
        tools:     { ja: 'インパクトドライバー・充電ドリル・電気ドリル（回転専用）', en: 'Impact drivers, cordless drills, electric drills (rotation only)' },
        sizeNote:  { ja: '口径 15〜65mm・全33サイズ／有効長 23mm', en: 'Ø15–65mm · 33 sizes / effective length 23mm' },
        specCols: ['code', 'size', 'shank', 'jan'],
        suitability: S_HOLE_HSS,
        popularSizes: ['21', '27', '33'],
        specs: SPEC_HSS,
      },
    ],
    docs: [
      DOC_CATALOG,
      { label: { ja: '取扱説明書', en: 'Instruction Manual' }, file: '/pdf/REISTI_ハイスホールソー_取扱説明書.pdf' },
    ],
  },
  {
    category: 'hole-saw',
    family: 'tct',
    brand: 'reisti',
    name: { ja: '超硬ホールソー', en: 'Carbide-Tipped Hole Saw' },
    intro: {
      ja: 'トリプル刃・超硬チップ採用。ステンレス板・FRPなど難削材の精密穴あけに。',
      en: 'Triple-blade carbide tips for precision holes in stainless sheet, FRP, and other hard materials.',
    },
    variants: [
      {
        slug: 'tct',
        label: { ja: '標準', en: 'Standard' },
        hero: '/products/reisti-tct-carbide-hole-saw.png',
        gallery: ['/products/reisti-tct-carbide-hole-saw.png'],
        detail: {
          ja: 'トリプル刃・超硬チップ採用で、ステンレス板・FRPなどの難削材にも対応。10mmストレート軸はボール盤・電動ドリルに対応し、ツバ無し設計は薄板・精密加工に適した構造。高精度な穴あけが必要な金属加工・設備工事に最適です。',
          en: 'Triple-blade carbide tips handle stainless sheet, FRP, and other difficult materials. 10mm straight shank fits drill presses and electric drills; flange-free design suits thin-sheet precision work. Ideal for metalworking and equipment installation requiring accurate holes.',
        },
        features: [
          { ja: 'トリプル刃・超硬チップ採用：ステンレス板・FRPなどの難削材も対応。', en: 'Triple-blade carbide tips: cuts stainless sheet, FRP, and other hard materials.' },
          { ja: '10mmストレート軸：ボール盤・電動ドリルに対応。', en: '10mm straight shank: fits drill presses and electric drills.' },
          { ja: 'ツバ無し設計：薄板・精密加工に適した構造。', en: 'Flange-free design: suited to thin-sheet precision work.' },
          { ja: '高精度な穴あけが必要な金属加工・設備工事に最適。', en: 'Ideal for metalworking and equipment installation requiring precision holes.' },
        ],
        materials: { ja: 'ステンレス板・鉄板・銅板・アルミ板・FRP', en: 'Stainless sheet, steel plate, copper sheet, aluminium sheet, FRP' },
        shank:     { ja: '10mm ストレートシャンク', en: '10mm straight shank' },
        tools:     { ja: '充電ドリル・電気ドリル（回転専用）・ボール盤', en: 'Cordless drills, electric drills (rotation only), drill presses' },
        sizeNote:  { ja: '口径 14〜65mm・全28サイズ／有効長 20mm', en: 'Ø14–65mm · 28 sizes / effective length 20mm' },
        specCols: ['code', 'size', 'shank', 'jan'],
        suitability: S_HOLE_TCT,
        popularSizes: ['21', '27', '33'],
        specs: SPEC_TCT,
      },
    ],
    docs: [
      DOC_CATALOG,
      { label: { ja: '取扱説明書', en: 'Instruction Manual' }, file: '/pdf/REISTI_超硬ホールソー_取扱説明書.pdf' },
    ],
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
