// Mock data for Cacao Dunes. Prices in AED; `price` is for the 4-piece size.

export const categories = [
  { id: 'all', en: 'All', ar: 'الكل' },
  { id: 'pralines', en: 'Pralines', ar: 'برالين' },
  { id: 'truffles', en: 'Truffles', ar: 'ترافل' },
  { id: 'bars', en: 'Bars', ar: 'ألواح' },
  { id: 'dates', en: 'Dates & Chocolate', ar: 'تمر وشوكولاتة' },
  { id: 'giftboxes', en: 'Gift Boxes', ar: 'علب الهدايا' },
  { id: 'sugarfree', en: 'Sugar-Free', ar: 'خالٍ من السكر' },
]

export const flavors = [
  { id: 'saffron', en: 'Saffron', ar: 'زعفران', color: '#E8A33D' },
  { id: 'cardamom', en: 'Cardamom', ar: 'هيل', color: '#9DB37A' },
  { id: 'pistachio', en: 'Pistachio', ar: 'فستق', color: '#A8C276' },
  { id: 'rose', en: 'Rose', ar: 'ورد', color: '#E59AAE' },
  { id: 'camel', en: 'Camel Milk', ar: 'حليب النوق', color: '#E9D6B8' },
  { id: 'seasalt', en: 'Sea Salt Caramel', ar: 'كراميل بملح البحر', color: '#C98B4A' },
]

export const sizes = [
  { pieces: 4, multiplier: 1 },
  { pieces: 9, multiplier: 2.1 },
  { pieces: 16, multiplier: 3.6 },
  { pieces: 25, multiplier: 5.4 },
]

export const priceFor = (product, pieces = 4) => {
  const s = sizes.find((x) => x.pieces === pieces) || sizes[0]
  return Math.round(product.price * s.multiplier)
}

// `art` drives the SVG illustration: shape, shell color, topping/accent, decoration pattern
export const products = [
  {
    id: 'saffron-pearl',
    name: { en: 'Saffron Pearl Praline', ar: 'برالين لؤلؤة الزعفران' },
    category: 'pralines',
    flavors: ['saffron'],
    price: 48,
    rating: 4.9,
    reviews: 312,
    art: { shape: 'dome', shell: '#3B2015', accent: '#E8A33D', pattern: 'threads' },
    description: {
      en: 'A glossy 70% Ecuadorian dark shell around a silky ganache steeped overnight with Iranian Negin saffron. Finished with real saffron threads.',
      ar: 'قشرة لامعة من الشوكولاتة الداكنة الإكوادورية ٧٠٪ تحتضن غاناش حريرياً منقوعاً طوال الليل بزعفران نيجين الإيراني، ومزينة بخيوط زعفران حقيقية.',
    },
    ingredients: { en: 'Dark chocolate (cocoa mass, sugar, cocoa butter), fresh cream, saffron, invert sugar, butter.', ar: 'شوكولاتة داكنة (كتلة الكاكاو، سكر، زبدة الكاكاو)، كريمة طازجة، زعفران، سكر محول، زبدة.' },
    allergens: ['milk', 'soy'],
    tag: 'bestseller',
  },
  {
    id: 'cardamom-qahwa',
    name: { en: 'Cardamom Qahwa Truffle', ar: 'ترافل القهوة بالهيل' },
    category: 'truffles',
    flavors: ['cardamom'],
    price: 44,
    rating: 4.8,
    reviews: 268,
    art: { shape: 'truffle', shell: '#4A2A1A', accent: '#C9A26B', pattern: 'dust' },
    description: {
      en: 'Inspired by the Emirati welcome cup: Arabic coffee and green cardamom ganache, rolled by hand and dusted in cocoa.',
      ar: 'مستوحاة من فنجان الضيافة الإماراتي: غاناش القهوة العربية والهيل الأخضر، ملفوف يدوياً ومغطى بالكاكاو.',
    },
    ingredients: { en: 'Dark chocolate, cream, Arabic coffee, green cardamom, cocoa powder.', ar: 'شوكولاتة داكنة، كريمة، قهوة عربية، هيل أخضر، مسحوق الكاكاو.' },
    allergens: ['milk', 'soy'],
    tag: 'signature',
  },
  {
    id: 'pistachio-kunafa',
    name: { en: 'Pistachio Kunafa Bar', ar: 'لوح الكنافة بالفستق' },
    category: 'bars',
    flavors: ['pistachio'],
    price: 39,
    rating: 4.9,
    reviews: 541,
    art: { shape: 'bar', shell: '#3E2216', accent: '#A8C276', pattern: 'grid' },
    description: {
      en: 'Thick milk chocolate filled with toasted kunafa pastry and creamy Aleppo pistachio. Crisp, nutty and impossible to share.',
      ar: 'شوكولاتة بالحليب سميكة محشوة بعجينة الكنافة المحمصة وكريمة الفستق الحلبي. مقرمشة وغنية ويصعب مشاركتها.',
    },
    ingredients: { en: 'Milk chocolate, pistachio paste, kataifi pastry, butter, tahini.', ar: 'شوكولاتة بالحليب، معجون الفستق، عجينة الكنافة، زبدة، طحينة.' },
    allergens: ['milk', 'nuts', 'gluten', 'sesame'],
    tag: 'bestseller',
  },
  {
    id: 'rose-taif',
    name: { en: 'Taif Rose Heart', ar: 'قلب ورد الطائف' },
    category: 'pralines',
    flavors: ['rose'],
    price: 52,
    rating: 4.7,
    reviews: 189,
    art: { shape: 'heart', shell: '#7A2E3A', accent: '#E59AAE', pattern: 'petals' },
    description: {
      en: 'A creamy white chocolate heart hand-painted with a dark chocolate rose, filled with delicate Taif rose and raspberry ganache.',
      ar: 'قلب من الشوكولاتة البيضاء الكريمية مرسوم يدوياً بوردة من الشوكولاتة الداكنة، ومحشو بغاناش رقيق من ورد الطائف والتوت.',
    },
    ingredients: { en: 'White chocolate, dark chocolate, cream, rose water, raspberry, cocoa butter.', ar: 'شوكولاتة بيضاء، شوكولاتة داكنة، كريمة، ماء ورد، توت، زبدة كاكاو.' },
    allergens: ['milk', 'soy'],
    tag: 'new',
  },
  {
    id: 'camel-milk-caramel',
    name: { en: 'Camel Milk Caramel Square', ar: 'مربع كراميل حليب النوق' },
    category: 'pralines',
    flavors: ['camel', 'seasalt'],
    price: 46,
    rating: 4.8,
    reviews: 224,
    art: { shape: 'square', shell: '#8A5A3A', accent: '#E9D6B8', pattern: 'swirl' },
    description: {
      en: 'Camel-milk chocolate from the UAE wrapped around a slow-cooked caramel with a whisper of Abu Dhabi sea salt.',
      ar: 'شوكولاتة حليب النوق من الإمارات تغلّف كراميلاً مطهواً ببطء مع لمسة من ملح بحر أبوظبي.',
    },
    ingredients: { en: 'Camel milk chocolate, sugar, cream, butter, sea salt.', ar: 'شوكولاتة حليب النوق، سكر، كريمة، زبدة، ملح البحر.' },
    allergens: ['milk'],
    tag: 'local',
  },
  {
    id: 'sea-salt-dune',
    name: { en: 'Sea Salt Dune Caramel', ar: 'كراميل الكثبان بملح البحر' },
    category: 'pralines',
    flavors: ['seasalt'],
    price: 42,
    rating: 4.9,
    reviews: 402,
    art: { shape: 'dome', shell: '#2E1810', accent: '#C98B4A', pattern: 'dune' },
    description: {
      en: 'A dune-shaped dark shell holding liquid salted caramel. Gold-dusted ripples mirror the sands of Liwa.',
      ar: 'قشرة داكنة على شكل كثيب تحتضن كراميلاً مملحاً سائلاً، وتعكس تموجاتها الذهبية رمال ليوا.',
    },
    ingredients: { en: 'Dark chocolate, sugar, cream, butter, fleur de sel, edible gold.', ar: 'شوكولاتة داكنة، سكر، كريمة، زبدة، زهرة الملح، ذهب صالح للأكل.' },
    allergens: ['milk', 'soy'],
    tag: 'signature',
  },
  {
    id: 'medjool-almond',
    name: { en: 'Medjool Almond Date', ar: 'تمر مجدول باللوز' },
    category: 'dates',
    flavors: ['cardamom'],
    price: 36,
    rating: 4.8,
    reviews: 356,
    art: { shape: 'date', shell: '#3A1F12', accent: '#D9B37C', pattern: 'drizzle' },
    description: {
      en: 'Plump Al Ain Medjool dates stuffed with roasted almond and cardamom, dipped in 64% dark chocolate.',
      ar: 'تمور مجدول من العين محشوة باللوز المحمص والهيل، ومغموسة في شوكولاتة داكنة ٦٤٪.',
    },
    ingredients: { en: 'Medjool dates, almonds, dark chocolate, cardamom.', ar: 'تمر مجدول، لوز، شوكولاتة داكنة، هيل.' },
    allergens: ['nuts', 'soy'],
    tag: 'local',
  },
  {
    id: 'saffron-khalas',
    name: { en: 'Saffron Khalas Date', ar: 'تمر خلاص بالزعفران' },
    category: 'dates',
    flavors: ['saffron', 'pistachio'],
    price: 40,
    rating: 4.7,
    reviews: 141,
    art: { shape: 'date', shell: '#5A3420', accent: '#E8A33D', pattern: 'threads' },
    description: {
      en: 'Honeyed Khalas dates filled with saffron-pistachio cream and half-dipped in white chocolate.',
      ar: 'تمور خلاص عسلية محشوة بكريمة الزعفران والفستق ومغموسة جزئياً في الشوكولاتة البيضاء.',
    },
    ingredients: { en: 'Khalas dates, white chocolate, pistachio, saffron, milk powder.', ar: 'تمر خلاص، شوكولاتة بيضاء، فستق، زعفران، حليب مجفف.' },
    allergens: ['milk', 'nuts'],
  },
  {
    id: 'rose-pistachio-truffle',
    name: { en: 'Rose & Pistachio Truffle', ar: 'ترافل الورد والفستق' },
    category: 'truffles',
    flavors: ['rose', 'pistachio'],
    price: 46,
    rating: 4.8,
    reviews: 207,
    art: { shape: 'truffle', shell: '#F0E2CF', accent: '#A8C276', pattern: 'crumble' },
    description: {
      en: 'White chocolate truffle infused with rose water, rolled in crushed Iranian pistachio and dried rose petals.',
      ar: 'ترافل بالشوكولاتة البيضاء بنكهة ماء الورد، ملفوف بالفستق الإيراني المجروش وبتلات الورد المجففة.',
    },
    ingredients: { en: 'White chocolate, cream, rose water, pistachio, rose petals.', ar: 'شوكولاتة بيضاء، كريمة، ماء ورد، فستق، بتلات ورد.' },
    allergens: ['milk', 'nuts'],
  },
  {
    id: 'grand-cru-72',
    name: { en: 'Grand Cru 72% Bar', ar: 'لوح جراند كرو ٧٢٪' },
    category: 'bars',
    flavors: ['seasalt'],
    price: 34,
    rating: 4.6,
    reviews: 118,
    art: { shape: 'bar', shell: '#24130B', accent: '#D4A24C', pattern: 'grid' },
    description: {
      en: 'Single-origin Venezuelan cacao, conched for 72 hours. Notes of red fruit, toasted bread and a long cocoa finish.',
      ar: 'كاكاو فنزويلي أحادي المصدر، مُعالج لمدة ٧٢ ساعة. نكهات الفاكهة الحمراء والخبز المحمص ونهاية كاكاو طويلة.',
    },
    ingredients: { en: 'Cocoa beans, cane sugar, cocoa butter.', ar: 'حبوب الكاكاو، سكر القصب، زبدة الكاكاو.' },
    allergens: [],
  },
  {
    id: 'camel-milk-bar',
    name: { en: 'Camel Milk & Honey Bar', ar: 'لوح حليب النوق والعسل' },
    category: 'bars',
    flavors: ['camel'],
    price: 32,
    rating: 4.7,
    reviews: 176,
    art: { shape: 'bar', shell: '#9A6A45', accent: '#F2C96B', pattern: 'grid' },
    description: {
      en: 'Creamy camel-milk chocolate with crunchy Sidr honeycomb from the Hajar mountains.',
      ar: 'شوكولاتة كريمية بحليب النوق مع قرص عسل السدر المقرمش من جبال الحجر.',
    },
    ingredients: { en: 'Camel milk chocolate, Sidr honey, sugar, bicarbonate.', ar: 'شوكولاتة حليب النوق، عسل سدر، سكر، بيكربونات.' },
    allergens: ['milk'],
    tag: 'local',
  },
  {
    id: 'sf-cardamom-dark',
    name: { en: 'Sugar-Free Cardamom Dark', ar: 'داكنة بالهيل خالية من السكر' },
    category: 'sugarfree',
    flavors: ['cardamom'],
    price: 44,
    rating: 4.5,
    reviews: 92,
    art: { shape: 'square', shell: '#2A1A11', accent: '#9DB37A', pattern: 'dots' },
    description: {
      en: 'Sweetened only with monk fruit and erythritol. Deep 80% cacao lifted by fragrant green cardamom.',
      ar: 'محلاة فقط بفاكهة الراهب والإريثريتول. كاكاو عميق ٨٠٪ مع رائحة الهيل الأخضر.',
    },
    ingredients: { en: 'Cocoa mass, erythritol, cocoa butter, monk fruit extract, cardamom.', ar: 'كتلة الكاكاو، إريثريتول، زبدة الكاكاو، مستخلص فاكهة الراهب، هيل.' },
    allergens: [],
  },
  {
    id: 'sf-pistachio-praline',
    name: { en: 'Sugar-Free Pistachio Praline', ar: 'برالين الفستق الخالي من السكر' },
    category: 'sugarfree',
    flavors: ['pistachio'],
    price: 50,
    rating: 4.6,
    reviews: 71,
    art: { shape: 'dome', shell: '#3A2418', accent: '#A8C276', pattern: 'crumble' },
    description: {
      en: 'Roasted pistachio praliné with no added sugar, enrobed in a sugar-free 70% shell.',
      ar: 'برالين الفستق المحمص بدون سكر مضاف، مغلف بقشرة ٧٠٪ خالية من السكر.',
    },
    ingredients: { en: 'Pistachios, cocoa mass, maltitol, cocoa butter, stevia.', ar: 'فستق، كتلة الكاكاو، مالتيتول، زبدة الكاكاو، ستيفيا.' },
    allergens: ['nuts'],
  },
  {
    id: 'sf-rose-truffle',
    name: { en: 'Sugar-Free Rose Truffle', ar: 'ترافل الورد الخالي من السكر' },
    category: 'sugarfree',
    flavors: ['rose'],
    price: 46,
    rating: 4.4,
    reviews: 58,
    art: { shape: 'truffle', shell: '#5B2A2E', accent: '#E59AAE', pattern: 'dust' },
    description: {
      en: 'Velvety dark truffle with rose and a hint of hibiscus. No added sugar, all of the romance.',
      ar: 'ترافل داكن مخملي بالورد ولمسة من الكركديه. بدون سكر مضاف، وبكل الرومانسية.',
    },
    ingredients: { en: 'Cocoa mass, cream, erythritol, rose water, hibiscus.', ar: 'كتلة الكاكاو، كريمة، إريثريتول، ماء ورد، كركديه.' },
    allergens: ['milk'],
  },
  {
    id: 'royal-majlis-box',
    name: { en: 'The Royal Majlis Box', ar: 'علبة المجلس الملكي' },
    category: 'giftboxes',
    flavors: ['saffron', 'cardamom', 'pistachio', 'rose'],
    price: 120,
    rating: 5.0,
    reviews: 287,
    art: { shape: 'box', shell: '#2A1A11', accent: '#D4A24C', pattern: 'ribbon' },
    description: {
      en: 'Our grand assortment in a hand-stitched leather box with gold foil. The gift for those who have everything.',
      ar: 'تشكيلتنا الكبرى في علبة جلدية مخيطة يدوياً بنقوش ذهبية. هدية لمن يملك كل شيء.',
    },
    ingredients: { en: 'Assorted chocolates; see individual pieces for ingredients.', ar: 'تشكيلة شوكولاتة؛ راجع كل قطعة لمعرفة مكوناتها.' },
    allergens: ['milk', 'nuts', 'soy', 'gluten'],
    tag: 'bestseller',
  },
  {
    id: 'desert-bloom-box',
    name: { en: 'Desert Bloom Gift Box', ar: 'علبة زهرة الصحراء' },
    category: 'giftboxes',
    flavors: ['rose', 'camel', 'seasalt'],
    price: 98,
    rating: 4.9,
    reviews: 164,
    art: { shape: 'box', shell: '#E8C9C0', accent: '#C98B7A', pattern: 'ribbon' },
    description: {
      en: 'A blush-pink keepsake box of rose, camel-milk and salted caramel pralines with a pressed desert flower.',
      ar: 'علبة تذكارية وردية من برالين الورد وحليب النوق والكراميل المملح مع زهرة صحراوية مجففة.',
    },
    ingredients: { en: 'Assorted chocolates; see individual pieces for ingredients.', ar: 'تشكيلة شوكولاتة؛ راجع كل قطعة لمعرفة مكوناتها.' },
    allergens: ['milk', 'soy'],
    tag: 'new',
  },
  {
    id: 'pistachio-praline-gold',
    name: { en: 'Golden Pistachio Praline', ar: 'برالين الفستق الذهبي' },
    category: 'pralines',
    flavors: ['pistachio'],
    price: 48,
    rating: 4.8,
    reviews: 233,
    art: { shape: 'square', shell: '#4A2A1A', accent: '#A8C276', pattern: 'gold' },
    description: {
      en: 'Crisp pistachio praliné with feuilletine, crowned with a fleck of 24-karat gold leaf.',
      ar: 'برالين الفستق المقرمش مع الفويتين، متوج بورقة ذهب عيار ٢٤.',
    },
    ingredients: { en: 'Milk chocolate, pistachio, feuilletine, gold leaf.', ar: 'شوكولاتة بالحليب، فستق، فويتين، ورق ذهب.' },
    allergens: ['milk', 'nuts', 'gluten'],
  },
  {
    id: 'oud-truffle',
    name: { en: 'Smoked Oud Truffle', ar: 'ترافل العود المدخن' },
    category: 'truffles',
    flavors: ['saffron'],
    price: 54,
    rating: 4.7,
    reviews: 96,
    art: { shape: 'truffle', shell: '#1E100A', accent: '#D4A24C', pattern: 'gold' },
    description: {
      en: 'Cream gently smoked over agarwood, folded into dark ganache with saffron. Mysterious and unforgettable.',
      ar: 'كريمة مدخنة بلطف على خشب العود، ممزوجة بغاناش داكن مع الزعفران. غامضة ولا تُنسى.',
    },
    ingredients: { en: 'Dark chocolate, oud-smoked cream, saffron, cocoa powder, gold dust.', ar: 'شوكولاتة داكنة، كريمة مدخنة بالعود، زعفران، مسحوق الكاكاو، غبار ذهبي.' },
    allergens: ['milk', 'soy'],
    tag: 'signature',
  },
]

export const allergenLabels = {
  milk: { en: 'Milk', ar: 'حليب' },
  nuts: { en: 'Tree nuts', ar: 'مكسرات' },
  soy: { en: 'Soy', ar: 'صويا' },
  gluten: { en: 'Gluten', ar: 'غلوتين' },
  sesame: { en: 'Sesame', ar: 'سمسم' },
}

export const tagLabels = {
  bestseller: { en: 'Bestseller', ar: 'الأكثر مبيعاً' },
  signature: { en: 'Signature', ar: 'توقيعنا' },
  new: { en: 'New', ar: 'جديد' },
  local: { en: 'UAE Local', ar: 'محلي' },
}

export const chocolateOfTheDay = [
  { productId: 'saffron-pearl', note: { en: 'Opens with honeyed saffron, then a slow melt of dark cocoa and dried apricot. Pair with Karak chai.', ar: 'تبدأ بالزعفران العسلي، ثم ذوبان بطيء للكاكاو الداكن والمشمش المجفف. تُقدَّم مع شاي الكرك.' } },
  { productId: 'cardamom-qahwa', note: { en: 'Roasted coffee up front, green cardamom in the middle, a bittersweet finish that lingers like a majlis evening.', ar: 'قهوة محمصة في البداية، ثم الهيل الأخضر، ونهاية حلوة مُرّة تدوم كأمسية في المجلس.' } },
  { productId: 'sea-salt-dune', note: { en: 'Snap, then a rush of buttery caramel. The salt arrives last, like a sea breeze on the Corniche.', ar: 'قرمشة، ثم اندفاع الكراميل الزبدي. يصل الملح أخيراً كنسمة بحر على الكورنيش.' } },
  { productId: 'rose-taif', note: { en: 'Bright raspberry, soft Taif rose and a creamy ruby finish. Best enjoyed slightly chilled.', ar: 'توت منعش، ورد طائفي ناعم ونهاية كريمية من الروبي. ألذ عندما تكون باردة قليلاً.' } },
  { productId: 'camel-milk-caramel', note: { en: 'Malty camel-milk sweetness meets deep caramel and a crunch of sea salt. Pure Emirati comfort.', ar: 'حلاوة حليب النوق تلتقي بالكراميل العميق وقرمشة ملح البحر. راحة إماراتية خالصة.' } },
  { productId: 'pistachio-kunafa', note: { en: 'Crackling kunafa, then a wave of pistachio cream. Texture lovers, this is your piece.', ar: 'كنافة مقرمشة ثم موجة من كريمة الفستق. لعشاق القوام، هذه قطعتكم.' } },
  { productId: 'oud-truffle', note: { en: 'Smoke and spice rise first, then saffron warmth and a long dark finish. A truffle for the evening.', ar: 'يرتفع الدخان والتوابل أولاً، ثم دفء الزعفران ونهاية داكنة طويلة. ترافل للمساء.' } },
]

export const boxSizes = [
  { slots: 4, cols: 2, price: 15, en: 'Petite', ar: 'صغيرة' },
  { slots: 9, cols: 3, price: 25, en: 'Classic', ar: 'كلاسيكية' },
  { slots: 16, cols: 4, price: 35, en: 'Grand', ar: 'كبيرة' },
  { slots: 25, cols: 5, price: 45, en: 'Royal', ar: 'ملكية' },
]

export const ribbons = [
  { id: 'gold', en: 'Gold', ar: 'ذهبي', color: '#D4A24C' },
  { id: 'rose', en: 'Rose Gold', ar: 'ذهبي وردي', color: '#C98B7A' },
  { id: 'burgundy', en: 'Burgundy', ar: 'عنابي', color: '#7A2E3A' },
  { id: 'emerald', en: 'Emerald', ar: 'زمردي', color: '#1F6B52' },
  { id: 'ivory', en: 'Ivory', ar: 'عاجي', color: '#F2E6D0' },
]

export const deliveryAreas = [
  { id: 'saadiyat', en: 'Saadiyat Island', ar: 'جزيرة السعديات', fee: 15, eta: '45–60' },
  { id: 'yas', en: 'Yas Island', ar: 'جزيرة ياس', fee: 15, eta: '45–60' },
  { id: 'reem', en: 'Al Reem Island', ar: 'جزيرة الريم', fee: 10, eta: '30–45' },
  { id: 'khalifa', en: 'Khalifa City', ar: 'مدينة خليفة', fee: 20, eta: '60–75' },
  { id: 'corniche', en: 'Corniche', ar: 'الكورنيش', fee: 10, eta: '30–45' },
  { id: 'raha', en: 'Al Raha', ar: 'الراحة', fee: 15, eta: '45–60' },
]

export const timeSlots = ['10:00 – 12:00', '12:00 – 14:00', '14:00 – 16:00', '16:00 – 18:00', '18:00 – 20:00', '20:00 – 22:00']

export const boutiques = [
  {
    id: 'maryah',
    name: { en: 'Al Maryah Island Atelier', ar: 'أتيليه جزيرة الماريه' },
    address: { en: 'The Galleria, Level 1, Al Maryah Island', ar: 'ذا غاليريا، الطابق ١، جزيرة الماريه' },
    hours: { en: 'Daily 10:00 – 23:00', ar: 'يومياً ١٠:٠٠ – ٢٣:٠٠' },
    phone: '+971 2 555 0101',
    flagship: true,
    pos: { x: 58, y: 38 },
  },
  {
    id: 'saadiyat',
    name: { en: 'Saadiyat Cultural Boutique', ar: 'بوتيك السعديات الثقافي' },
    address: { en: 'Manarat Al Saadiyat, Cultural District', ar: 'منارة السعديات، المنطقة الثقافية' },
    hours: { en: 'Sat–Thu 10:00 – 22:00 · Fri 14:00 – 22:00', ar: 'السبت–الخميس ١٠:٠٠ – ٢٢:٠٠ · الجمعة ١٤:٠٠ – ٢٢:٠٠' },
    phone: '+971 2 555 0202',
    pos: { x: 48, y: 18 },
  },
  {
    id: 'yas',
    name: { en: 'Yas Mall Salon', ar: 'صالون ياس مول' },
    address: { en: 'Yas Mall, Ground Floor, near Entrance 2', ar: 'ياس مول، الطابق الأرضي، بالقرب من المدخل ٢' },
    hours: { en: 'Daily 10:00 – 24:00', ar: 'يومياً ١٠:٠٠ – ٢٤:٠٠' },
    phone: '+971 2 555 0303',
    pos: { x: 82, y: 30 },
  },
  {
    id: 'corniche',
    name: { en: 'Corniche Kiosk', ar: 'كشك الكورنيش' },
    address: { en: 'Corniche Beach, Gate 3', ar: 'شاطئ الكورنيش، البوابة ٣' },
    hours: { en: 'Daily 16:00 – 24:00', ar: 'يومياً ١٦:٠٠ – ٢٤:٠٠' },
    phone: '+971 2 555 0404',
    pos: { x: 34, y: 52 },
  },
]

// Occasion dates for 2026–2027 (Islamic dates are approximate)
export const occasions = [
  {
    id: 'national-day',
    icon: 'flag',
    name: { en: 'UAE National Day', ar: 'اليوم الوطني الإماراتي' },
    date: '2026-12-02T00:00:00',
    blurb: { en: 'Celebrate Eid Al Etihad with boxes in red, green, white and black, filled with local camel-milk and date creations.', ar: 'احتفل بعيد الاتحاد بعلب بألوان العلم مليئة بإبداعات حليب النوق والتمر المحلية.' },
    palette: ['#1F6B52', '#C0392B', '#F5E9D7'],
    products: ['camel-milk-caramel', 'medjool-almond', 'camel-milk-bar', 'royal-majlis-box'],
  },
  {
    id: 'ramadan',
    icon: 'moon',
    name: { en: 'Ramadan', ar: 'رمضان' },
    date: '2027-02-08T00:00:00',
    blurb: { en: 'Iftar trays of stuffed dates and cardamom truffles, delivered before sunset across Abu Dhabi.', ar: 'صواني إفطار من التمر المحشو وترافل الهيل، تصل قبل الغروب في جميع أنحاء أبوظبي.' },
    palette: ['#2A1A11', '#D4A24C', '#4B3A6B'],
    products: ['medjool-almond', 'saffron-khalas', 'cardamom-qahwa', 'royal-majlis-box'],
  },
  {
    id: 'eid',
    icon: 'sparkles',
    name: { en: 'Eid Al Fitr', ar: 'عيد الفطر' },
    date: '2027-03-10T00:00:00',
    blurb: { en: 'Eidiya-worthy gift boxes with saffron pralines and gold-leaf pistachio, wrapped for family visits.', ar: 'علب هدايا تليق بالعيدية مع برالين الزعفران والفستق بورق الذهب، مغلفة لزيارات العائلة.' },
    palette: ['#D4A24C', '#F5E9D7', '#1F6B52'],
    products: ['saffron-pearl', 'pistachio-praline-gold', 'desert-bloom-box', 'royal-majlis-box'],
  },
  {
    id: 'weddings',
    icon: 'heart',
    name: { en: 'Weddings', ar: 'الأعراس' },
    blurb: { en: 'Bespoke favours, monogrammed pralines and towering displays for your big day. Consultations at Al Maryah.', ar: 'توزيعات مخصصة وبرالين بالأحرف الأولى وعروض شاهقة ليومكم الكبير. استشارات في الماريه.' },
    palette: ['#F2E6D0', '#C98B7A', '#D4A24C'],
    products: ['rose-taif', 'rose-pistachio-truffle', 'desert-bloom-box', 'pistachio-praline-gold'],
  },
  {
    id: 'birthdays',
    icon: 'cake',
    name: { en: 'Birthdays', ar: 'أعياد الميلاد' },
    blurb: { en: 'Playful mixed boxes, a personalised bar with their name, and same-day delivery for last-minute heroes.', ar: 'علب متنوعة مرحة، ولوح مخصص باسمهم، وتوصيل في نفس اليوم لأبطال اللحظة الأخيرة.' },
    palette: ['#E59AAE', '#D4A24C', '#A8C276'],
    products: ['pistachio-kunafa', 'sea-salt-dune', 'rose-taif', 'camel-milk-bar'],
  },
  {
    id: 'corporate',
    icon: 'briefcase',
    name: { en: 'Corporate Gifts', ar: 'هدايا الشركات' },
    blurb: { en: 'Logo-embossed boxes, bulk pricing from 50 units and white-glove delivery to offices across the UAE.', ar: 'علب مزينة بالشعار، وأسعار خاصة للكميات من ٥٠ وحدة، وتوصيل فاخر إلى المكاتب في الإمارات.' },
    palette: ['#2A1A11', '#D4A24C', '#8A6A50'],
    products: ['royal-majlis-box', 'grand-cru-72', 'oud-truffle', 'sf-cardamom-dark'],
  },
]

export const seasonal = {
  title: { en: 'The Eid Al Etihad Collection', ar: 'مجموعة عيد الاتحاد' },
  subtitle: {
    en: 'Limited-edition pralines celebrating 55 years of the Union: camel milk, Al Ain dates and Liwa sea salt.',
    ar: 'برالين بإصدار محدود احتفالاً بـ ٥٥ عاماً على الاتحاد: حليب النوق وتمور العين وملح ليوا.',
  },
}

export const stats = [
  { value: 48250, en: 'chocolates handmade this month', ar: 'قطعة شوكولاتة صُنعت يدوياً هذا الشهر' },
  { value: 12400, en: 'happy customers', ar: 'عميل سعيد', suffix: '+' },
  { value: 8900, en: 'gift boxes delivered across the UAE', ar: 'علبة هدايا وُصّلت في الإمارات' },
]

export const user = {
  name: 'Mariam Al Mansoori',
  email: 'mariam@example.ae',
  memberSince: '2023',
  points: 2340,
  tiers: [
    { id: 'cocoa', en: 'Cocoa', ar: 'كاكاو', min: 0 },
    { id: 'gold', en: 'Gold', ar: 'ذهبي', min: 1500 },
    { id: 'royal', en: 'Royal', ar: 'ملكي', min: 4000 },
  ],
  addresses: [
    { id: 1, label: { en: 'Home', ar: 'المنزل' }, line: { en: 'Villa 14, Saadiyat Beach District', ar: 'فيلا ١٤، حي شاطئ السعديات' } },
    { id: 2, label: { en: 'Office', ar: 'المكتب' }, line: { en: 'ADGM Square, Tower 2, Al Maryah Island', ar: 'ساحة سوق أبوظبي العالمي، البرج ٢، جزيرة الماريه' } },
  ],
}

export const pastOrders = [
  { id: 'CD-20481', date: '2026-10-18', status: 'delivered', items: [{ productId: 'saffron-pearl', pieces: 9, qty: 1 }, { productId: 'pistachio-kunafa', pieces: 4, qty: 2 }] },
  { id: 'CD-19877', date: '2026-09-02', status: 'delivered', items: [{ productId: 'royal-majlis-box', pieces: 16, qty: 1 }] },
  { id: 'CD-19102', date: '2026-07-21', status: 'picked', items: [{ productId: 'medjool-almond', pieces: 16, qty: 1 }, { productId: 'rose-taif', pieces: 4, qty: 1 }] },
]

export const VAT_RATE = 0.05
export const getProduct = (id) => products.find((p) => p.id === id)
