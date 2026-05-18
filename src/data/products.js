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

/* ---- Suitability presets (level: 3=best / 2=good / 1=possible) ---- */
const S_MULTI = [
  { name: { ja: '木材・合板',   en: 'Wood / Plywood'   }, level: 3 },
  { name: { ja: '樹脂・PVC',   en: 'Plastic / PVC'    }, level: 3 },
  { name: { ja: '石膏ボード',  en: 'Gypsum Board'     }, level: 3 },
  { name: { ja: '薄板アルミ',  en: 'Thin Aluminium'   }, level: 2 },
  { name: { ja: '薄板鉄',      en: 'Sheet Steel'      }, level: 2 },
]

const S_COBALT = [
  { name: { ja: '鉄・鋼材',   en: 'Steel / Iron'     }, level: 3 },
  { name: { ja: 'ステンレス', en: 'Stainless Steel'  }, level: 3 },
  { name: { ja: 'アルミ',     en: 'Aluminium'        }, level: 3 },
  { name: { ja: '鋳鉄',       en: 'Cast Iron'        }, level: 2 },
  { name: { ja: '銅・真鍮',   en: 'Copper / Brass'   }, level: 3 },
]

const S_HOLE_HSS = [
  { name: { ja: '薄板鉄',       en: 'Sheet Steel'   }, level: 2 },
  { name: { ja: 'ステンレス',   en: 'Stainless'     }, level: 2 },
  { name: { ja: '非鉄金属',     en: 'Non-Ferrous'   }, level: 3 },
  { name: { ja: '木材',         en: 'Wood'          }, level: 3 },
  { name: { ja: '樹脂',         en: 'Plastic'       }, level: 3 },
  { name: { ja: '石膏ボード',   en: 'Gypsum Board'  }, level: 3 },
  { name: { ja: 'サイディング', en: 'Siding'        }, level: 3 },
]

const S_HOLE_TCT = [
  { name: { ja: 'ALC',               en: 'ALC'           }, level: 3 },
  { name: { ja: '窯業系サイディング', en: 'Fiber-Cement'  }, level: 3 },
  { name: { ja: '合板・木質ボード',   en: 'Plywood'       }, level: 2 },
  { name: { ja: 'FRP',               en: 'FRP'           }, level: 2 },
  { name: { ja: '薄物コンクリート',   en: 'Thin Concrete' }, level: 1 },
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

/* ===== REISTI ブランド製品（自社工場製造） ===== */
export const FAMILIES = [
  /* ---- ドリルビット ---- */
  {
    category: 'drill-bit',
    family: 'multi-drill',
    brand: 'reisti',
    name: { ja: '充電マルチドリルビット', en: 'Cordless Multi Drill Bit' },
    intro: {
      ja: '充電工具対応の六角軸。木材・樹脂・薄板金属をこれ一本で。',
      en: 'Hex shank for cordless tools. Wood, plastic, and thin metal in one bit.',
    },
    variants: [
      {
        slug: 'multi',
        label: { ja: '標準', en: 'Standard' },
        hero: '/products/hex-635.png',
        gallery: ['/products/hex-635.png'],
        detail: {
          ja: `充電インパクトドライバー・ドリルドライバーにワンタッチ装着。木材・合板・樹脂・石膏ボードから薄板金属まで幅広く対応するマルチ仕様。DIYから軽作業まで一本で完結。
適合電動機：充電インパクトドライバー / ドリルドライバー`,
          en: `Quick-attach hex shank for cordless impact drivers and drill drivers. Multi-material performance across wood, plywood, plastic, gypsum board, and thin metal.
Compatible tools: Cordless impact drivers / Drill drivers`,
        },
        suitability: S_MULTI,
        popularSizes: ['3', '4', '5', '6', '8', '10'],
        specs: [],
      },
    ],
  },
  {
    category: 'drill-bit',
    family: 'cobalt-drill',
    brand: 'reisti',
    name: { ja: '六角軸コバルトドリル', en: 'Hex Shank Cobalt Drill' },
    intro: {
      ja: 'コバルト鋼（M35）による高耐熱・高耐摩耗。ステンレス・硬鋼に。',
      en: 'Cobalt steel (M35) for superior heat and wear resistance. Ideal for stainless and hard steel.',
    },
    variants: [
      {
        slug: 'cobalt',
        label: { ja: '標準', en: 'Standard' },
        hero: '/products/M35.png',
        gallery: ['/products/M35.png'],
        detail: {
          ja: `コバルト5%添加（M35）により切削熱に強く、長寿命を実現。ステンレス・高張力鋼・鋳鉄など難削材でも安定した穿孔が可能。六角軸で充電工具にも対応。
適合電動機：充電ドリルドライバー / 電気ドリル（低速推奨）`,
          en: `5% cobalt (M35) alloy delivers superior heat and wear resistance for longer tool life. Stable drilling in stainless steel, high-tensile steel, and cast iron. Hex shank compatible with cordless tools.
Compatible tools: Cordless drill drivers / Electric drills (low speed recommended)`,
        },
        suitability: S_COBALT,
        popularSizes: ['3.0', '4.0', '5.0', '6.0', '8.0', '10.0'],
        specs: [],
      },
    ],
  },

  /* ---- ホールソー ---- */
  {
    category: 'hole-saw',
    family: 'hss',
    brand: 'reisti',
    name: { ja: 'ハイスホールソー', en: 'HSS Hole Saw' },
    intro: {
      ja: 'ハイス（HSS）刃で幅広い素材に対応。汎用性の高いホールソー。',
      en: 'HSS teeth for versatile cutting across metal, wood, and plastic.',
    },
    variants: [
      {
        slug: 'hss',
        label: { ja: '標準', en: 'Standard' },
        hero: '/products/holesaw-bi.png',
        gallery: ['/products/holesaw-bi.png'],
        detail: {
          ja: `ハイス（HSS）刃を採用した汎用ホールソー。サイディング・石膏ボード・FRP・合板・塩ビ材などのほか薄板金属にも対応。効率的なチップポケットで厚板・深穴もスムーズ。
適合電動機：電気ドリル / 振動ドリル（回転モード）`,
          en: `HSS-tooth hole saw for multi-material cutting. Handles siding, gypsum board, FRP, plywood, PVC, and thin sheet metal. Efficient chip pockets for smooth deep cuts.
Compatible tools: Electric drills / Drill drivers (rotation mode)`,
        },
        suitability: S_HOLE_HSS,
        popularSizes: ['25', '35', '50', '65'],
        specs: [],
      },
    ],
  },
  {
    category: 'hole-saw',
    family: 'tct',
    brand: 'reisti',
    name: { ja: '超硬ホールソー', en: 'Carbide-Tipped Hole Saw' },
    intro: {
      ja: '硬質材に強い超硬チップ刃。ALC・窯業系サイディングに。',
      en: 'Carbide-tipped for hard and abrasive materials. Excels in ALC and fiber-cement siding.',
    },
    variants: [
      {
        slug: 'tct',
        label: { ja: '標準', en: 'Standard' },
        hero: '/products/holesaw-tct.png',
        gallery: ['/products/holesaw-tct.png'],
        detail: {
          ja: `ALC・窯業系サイディング・繊維強化ボードなど硬質下地に。高耐久の超硬チップで欠けを抑え、スピーディに穿孔。繰り返し使用にも耐える長寿命設計。
適合電動機：電気ドリル / 振動ドリル（回転モード）`,
          en: `For ALC, fiber-cement siding, and fiber-reinforced boards. High-durability carbide tips resist chipping and drill quickly. Long-life design for repeated use.
Compatible tools: Electric drills / Hammer drills (rotation mode)`,
        },
        suitability: S_HOLE_TCT,
        popularSizes: ['32', '45', '65'],
        specs: [],
      },
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
        hero: '/images/step/main.jpg',
        gallery: ['/images/step/main.jpg'],
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
        hero: '/images/step-tialn/main.jpg',
        gallery: ['/images/step-tialn/main.jpg'],
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
        hero: '/images/pipe-saw/main.jpg',
        gallery: ['/images/pipe-saw/main.jpg'],
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
