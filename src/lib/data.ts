import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p7 from "@/assets/p7.jpg";
import p8 from "@/assets/p8.jpg";
import catMen from "@/assets/cat-men.jpg";
import catWomen from "@/assets/cat-women.jpg";
import catAcc from "@/assets/cat-acc.jpg";

export type Badge = "NEW" | "SALE" | "BESTSELLER" | "LIMITED" | "HOT" | "EXCLUSIVE";

export type ProductCategory = "men" | "women" | "accessories" | "footwear" | "headwear";

export type Review = {
  id: string;
  name: string;
  rating: number;
  date: string;
  body: string;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  sku: string;
  category: ProductCategory;
  categoryLabel: string;
  subcategory: string;
  subtitle: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  badges: Badge[];
  sizes: string[];
  colors: string[];
  description: string;
  shortDescription: string;
  materials: string[];
  reviews: Review[];
  stock: number;
  status: "active" | "draft";
  featured: boolean;
  trending: boolean;
  newArrival: boolean;
  createdAt: string;
};

export type Address = {
  id?: string;
  fullName: string;
  phone?: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
};

export type OrderStatus =
  | "PLACED"
  | "CONFIRMED"
  | "PACKED"
  | "SHIPPED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED"
  | "RETURNED";

export type TimelineEvent = {
  status: OrderStatus;
  timestamp: string;
  title: string;
  note?: string;
};

export type OrderItem = {
  productId: string;
  name: string;
  image: string;
  size: string;
  color: string;
  qty: number;
  price: number;
  sku: string;
};

export type Order = {
  id: string;
  date: string;
  customerName: string;
  email: string;
  phone: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  couponCode?: string;
  total: number;
  status: OrderStatus;
  paymentMethod: "CARD" | "UPI" | "COD" | "DEMO";
  paymentStatus: "PAID" | "PENDING" | "REFUNDED";
  address: Address;
  delivery: string;
  eta: string;
  timeline: TimelineEvent[];
};

export type InventoryLog = {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  type: "PURCHASE" | "RESTOCK" | "ADJUSTMENT" | "CANCEL_RESTORE";
  qtyChange: number;
  newStock: number;
  date: string;
  note: string;
};

export type CustomerUser = {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  addresses: Address[];
  defaultAddressIndex: number;
  createdAt: string;
};

export type Coupon = {
  id: string;
  code: string;
  type: "percent" | "flat";
  value: number;
  minOrder: number;
  status: "active" | "expired";
  usageCount: number;
};

export type StoreSettings = {
  storeName: string;
  tagline: string;
  announcement: string;
  announcementActive: boolean;
  freeShippingThreshold: number;
  standardShippingFee: number;
  expressShippingFee: number;
  supportEmail: string;
  supportPhone: string;
  currency: string;
};

export const BRANDS = [
  "BRUTAL. LABS",
  "HEPHAESTUS",
  "VOID ARCHIVE",
  "NEO-TOKYO",
  "RAW CUTS",
  "CHROME ZERO",
] as const;

const R = (id: string, name: string, rating: number, body: string, date: string): Review => ({
  id,
  name,
  rating,
  body,
  date,
});

export const initialProducts: Product[] = [
  {
    id: "oversized-tee-001",
    name: "Null Oversized Heavy Tee",
    brand: "BRUTAL. LABS",
    sku: "BRT-TEE-001",
    category: "men",
    categoryLabel: "T-Shirts",
    subcategory: "Heavyweight Tops",
    subtitle: "Washed Black / 280 GSM",
    price: 1999,
    compareAt: 2499,
    rating: 4.8,
    reviewCount: 128,
    image: p1,
    gallery: [p1, p7, p3],
    badges: ["BESTSELLER", "SALE"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Bone", "Vintage Gray"],
    description:
      "A 280 GSM boxy tee cut deliberately wide through the body with dropped shoulders. Garment dyed, pre-shrunk, and engineered to hold its structure wash after wash.",
    shortDescription: "Ultra-heavyweight 280 GSM boxy tee with dropped shoulders and raw drape.",
    materials: ["100% combed organic cotton", "280 GSM heavyweight jersey", "Garment dyed in Tiruppur"],
    reviews: [
      R("r1", "Ananya K.", 5, "The weight of this tee is unreal. It hangs exactly like the photos.", "12 JAN 2026"),
      R("r2", "Rehan M.", 5, "Sizing runs big, which is the point. Went true to size and it's perfect.", "03 FEB 2026"),
      R("r3", "Vikram P.", 4, "Pure quality. Thick neckline that doesn't bacon-neck.", "19 FEB 2026"),
    ],
    stock: 45,
    status: "active",
    featured: true,
    trending: true,
    newArrival: false,
    createdAt: "2026-01-10T10:00:00Z",
  },
  {
    id: "cargo-pant-002",
    name: "Grid Architectural Cargo",
    brand: "HEPHAESTUS",
    sku: "HEP-CRG-002",
    category: "men",
    categoryLabel: "Bottoms",
    subcategory: "Tactical Pants",
    subtitle: "Washed Black / Relaxed Fit",
    price: 3499,
    compareAt: 4199,
    rating: 4.6,
    reviewCount: 64,
    image: p2,
    gallery: [p2, p1, p4],
    badges: ["NEW"],
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Washed Black", "Concrete", "Olive Drab"],
    description:
      "Wide-leg cargo trousers cut from rigid 340 GSM cotton twill with modular bellow pockets and a stiff waistband that breaks in with wear.",
    shortDescription: "340 GSM rigid twill wide cargo with modular deep bellows.",
    materials: ["98% cotton twill, 2% elastane", "Enzyme washed finish", "Heavy-duty YKK hardware"],
    reviews: [
      R("r4", "Dev S.", 5, "Fits enormous in the best way. Pockets actually usable.", "22 FEB 2026"),
      R("r5", "Arjun N.", 4, "Sturdy fabric. Doesn't lose shape after washing.", "02 MAR 2026"),
    ],
    stock: 28,
    status: "active",
    featured: true,
    trending: true,
    newArrival: true,
    createdAt: "2026-01-15T12:00:00Z",
  },
  {
    id: "hoodie-003",
    name: "Zap 450GSM Boxy Hoodie",
    brand: "BRUTAL. LABS",
    sku: "BRT-HD-003",
    category: "women",
    categoryLabel: "Outerwear",
    subcategory: "Hoodies",
    subtitle: "Electric Zap Yellow / Unisex",
    price: 4299,
    compareAt: 5299,
    rating: 4.9,
    reviewCount: 212,
    image: p3,
    gallery: [p3, p1, p6],
    badges: ["LIMITED", "SALE"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Electric Yellow", "Black", "Acid Pink"],
    description:
      "Our loudest staple piece. A 450 GSM French loopback hoodie with a squared raw hem, double-lined crossover hood, and zero external branding. Ultra-limited drop.",
    shortDescription: "450 GSM loopback cotton fleece with double-lined structure hood.",
    materials: ["450 GSM French terry cotton", "Ribbed side gussets and cuffs", "Limited run of 300 units"],
    reviews: [
      R("r6", "Meera J.", 5, "Bought it for the colour, kept it for the immaculate fit.", "01 MAR 2026"),
      R("r7", "Tanvi R.", 5, "Heavy, structured, genuinely luxury grade.", "09 MAR 2026"),
    ],
    stock: 12,
    status: "active",
    featured: true,
    trending: true,
    newArrival: false,
    createdAt: "2026-01-18T14:30:00Z",
  },
  {
    id: "sneaker-004",
    name: "Slab Low-Cut Runner",
    brand: "CHROME ZERO",
    sku: "CHZ-SNK-004",
    category: "footwear",
    categoryLabel: "Sneakers",
    subcategory: "Low Tops",
    subtitle: "Monochrome / Chunky Sole",
    price: 6999,
    compareAt: 8499,
    rating: 4.7,
    reviewCount: 89,
    image: p4,
    gallery: [p4, p2, p8],
    badges: ["BESTSELLER"],
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["Black / White", "All Black", "Bone White"],
    description:
      "A chunky low-profile silhouette sculpted on a thick dual-density EVA slab sole. Full-grain calfskin leather upper with reinforced stitch detailing.",
    shortDescription: "Sculpted EVA slab sole sneaker in premium matte full-grain leather.",
    materials: ["Full grain leather upper", "Compression moulded EVA midsole", "High-traction vulcanised rubber outsole"],
    reviews: [
      R("r8", "Karan V.", 5, "Comfortable straight out of the box. Insane silhouette.", "18 JAN 2026"),
      R("r9", "Kabir S.", 4, "Heavy sole with great cushioning.", "28 FEB 2026"),
    ],
    stock: 18,
    status: "active",
    featured: true,
    trending: false,
    newArrival: false,
    createdAt: "2026-01-20T09:00:00Z",
  },
  {
    id: "bucket-005",
    name: "Blackout Structured Bucket",
    brand: "VOID ARCHIVE",
    sku: "VOD-BCK-005",
    category: "headwear",
    categoryLabel: "Headwear",
    subcategory: "Hats",
    subtitle: "Pitch Black / One Size",
    price: 1299,
    compareAt: 1699,
    rating: 4.3,
    reviewCount: 41,
    image: p5,
    gallery: [p5, p8, p6],
    badges: ["SALE"],
    sizes: ["One Size"],
    colors: ["Black", "Concrete"],
    description:
      "Structured heavy cotton canvas bucket hat with a stiffened edge brim designed to hold its aggressive angle in all weather.",
    shortDescription: "Structured heavy cotton canvas bucket with stiffened angled brim.",
    materials: ["100% heavy cotton canvas", "Moisture-wicking cotton sweatband"],
    reviews: [R("r10", "Ishan P.", 4, "Brim keeps its shape, which is rare in buckets.", "27 FEB 2026")],
    stock: 50,
    status: "active",
    featured: false,
    trending: false,
    newArrival: false,
    createdAt: "2026-01-22T11:00:00Z",
  },
  {
    id: "tote-006",
    name: "18oz Utility Heavy Tote",
    brand: "RAW CUTS",
    sku: "RAW-TOT-006",
    category: "accessories",
    categoryLabel: "Bags",
    subcategory: "Totes",
    subtitle: "Bone Canvas / Black Leather",
    price: 1799,
    compareAt: 2199,
    rating: 4.8,
    reviewCount: 73,
    image: p6,
    gallery: [p6, p5, p1],
    badges: ["NEW"],
    sizes: ["One Size"],
    colors: ["Bone", "Black"],
    description:
      "Heavyweight 18oz duck canvas tote featuring full-grain vegetable-tanned leather straps, reinforced rivet stress points, and an internal secure zipped compartment.",
    shortDescription: "18oz duck canvas tote with bridle leather straps and internal zip sleeve.",
    materials: ["18oz military-spec cotton canvas", "Vegetable tanned leather handles", "Matte black brass rivets"],
    reviews: [R("r11", "Sara D.", 5, "Carries a laptop, gym kit, and groceries without breaking a sweat.", "14 FEB 2026")],
    stock: 35,
    status: "active",
    featured: true,
    trending: true,
    newArrival: true,
    createdAt: "2026-01-25T16:00:00Z",
  },
  {
    id: "denim-007",
    name: "Concrete 13oz Trucker Jacket",
    brand: "NEO-TOKYO",
    sku: "NEO-JKT-007",
    category: "women",
    categoryLabel: "Outerwear",
    subcategory: "Jackets",
    subtitle: "Washed Concrete / Boxy Cut",
    price: 5499,
    compareAt: 6999,
    rating: 4.9,
    reviewCount: 96,
    image: p7,
    gallery: [p7, p2, p4],
    badges: ["SALE", "LIMITED"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Washed Black", "Concrete Blue"],
    description:
      "A boxy, cropped trucker jacket crafted in rigid 13oz Japanese selvedge denim, sulfur-overdyed and stonewashed for an authentic aged industrial finish.",
    shortDescription: "13oz Japanese rigid denim trucker jacket with custom antique hardware.",
    materials: ["13oz Japanese raw selvedge denim", "Sulfur overdyed and stonewashed", "Antique silver engraved shank buttons"],
    reviews: [R("r12", "Nikhil B.", 5, "The fade after a month of wear is crazy good.", "05 MAR 2026")],
    stock: 8,
    status: "active",
    featured: true,
    trending: true,
    newArrival: false,
    createdAt: "2026-01-28T18:00:00Z",
  },
  {
    id: "shades-008",
    name: "Sharp Cut Geometric Shades",
    brand: "CHROME ZERO",
    sku: "CHZ-SUN-008",
    category: "accessories",
    categoryLabel: "Eyewear",
    subcategory: "Sunglasses",
    subtitle: "Gloss Black / Polarized",
    price: 2299,
    compareAt: 2899,
    rating: 4.5,
    reviewCount: 52,
    image: p8,
    gallery: [p8, p5, p6],
    badges: ["NEW"],
    sizes: ["One Size"],
    colors: ["Black", "Tortoise", "Acid Neon"],
    description:
      "Sharp, low-profile rectangular acetate frames housing flat UV400 polarized lenses. Minimalist industrial silhouette with five-barrel German hinges.",
    shortDescription: "Handmade Italian acetate rectangular sunglasses with UV400 polarized lenses.",
    materials: ["Italian custom Mazzucchelli acetate", "Category 3 polarized lenses", "5-barrel stainless steel hinges"],
    reviews: [R("r13", "Aarav T.", 5, "Sharp severe shape, zero wobble.", "20 FEB 2026")],
    stock: 60,
    status: "active",
    featured: false,
    trending: true,
    newArrival: true,
    createdAt: "2026-02-01T10:00:00Z",
  },
  {
    id: "acid-vest-009",
    name: "Modular Tactical Utility Vest",
    brand: "HEPHAESTUS",
    sku: "HEP-VST-009",
    category: "men",
    categoryLabel: "Outerwear",
    subcategory: "Vests",
    subtitle: "Matte Black / Cordura",
    price: 3899,
    compareAt: 4799,
    rating: 4.7,
    reviewCount: 38,
    image: p2,
    gallery: [p2, p7, p1],
    badges: ["LIMITED", "HOT"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Matte Black", "Camo Olive"],
    description:
      "Technical layering vest built with 500D Cordura nylon. Equipped with 6 multi-depth 3D pockets, quick-release Cobra buckles, and MOLLE webbing.",
    shortDescription: "500D Cordura tactical vest with 6 3D utility cargo compartments.",
    materials: ["500D Cordura ballistic nylon", "Quick-release aluminum buckles", "Breathable 3D spacer mesh lining"],
    reviews: [R("r14", "Rohan G.", 5, "Elevates every basic hoodie or tee underneath.", "10 FEB 2026")],
    stock: 15,
    status: "active",
    featured: true,
    trending: false,
    newArrival: true,
    createdAt: "2026-02-03T12:00:00Z",
  },
  {
    id: "graphic-tee-010",
    name: "Neo-Tokyo Raw Graphic Tee",
    brand: "NEO-TOKYO",
    sku: "NEO-TEE-010",
    category: "men",
    categoryLabel: "T-Shirts",
    subcategory: "Graphic Tees",
    subtitle: "Distressed White / Screenprint",
    price: 2199,
    compareAt: 2699,
    rating: 4.8,
    reviewCount: 94,
    image: p1,
    gallery: [p1, p3, p7],
    badges: ["BESTSELLER"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Distressed White", "Faded Black"],
    description:
      "Vintage-washed graphic t-shirt featuring high-density puff and screen-printed cyber-brutalist typography. Relaxed drop-shoulder drape with distressed hems.",
    shortDescription: "260 GSM vintage-washed graphic tee with puff-print brutalist typography.",
    materials: ["100% ring-spun cotton", "High-density plastisol screenprint", "Distressed neck and hem ribbing"],
    reviews: [R("r15", "Pooja M.", 5, "Graphic doesn't crack or fade. Incredible fit.", "15 FEB 2026")],
    stock: 40,
    status: "active",
    featured: true,
    trending: true,
    newArrival: false,
    createdAt: "2026-02-05T14:00:00Z",
  },
  {
    id: "track-pant-011",
    name: "Wide Panel Parachute Pant",
    brand: "RAW CUTS",
    sku: "RAW-PNT-011",
    category: "women",
    categoryLabel: "Bottoms",
    subcategory: "Pants",
    subtitle: "Silver Gray / Ultra Light",
    price: 3299,
    compareAt: 3999,
    rating: 4.6,
    reviewCount: 57,
    image: p7,
    gallery: [p7, p2, p3],
    badges: ["NEW"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Silver Gray", "Pitch Black", "Zap Neon"],
    description:
      "Voluminous parachute trousers crafted in ultra-lightweight water-repellent crinkle nylon. Features bungee cord cinching at waist and ankles.",
    shortDescription: "Ultra-lightweight crinkle nylon parachute pants with adjustable toggles.",
    materials: ["100% crinkle nylon taffeta", "DWR water-resistant coating", "Military toggle hardware"],
    reviews: [R("r16", "Tara K.", 5, "So breezy and comfortable. Fits amazing with chunky sneakers.", "18 FEB 2026")],
    stock: 22,
    status: "active",
    featured: false,
    trending: true,
    newArrival: true,
    createdAt: "2026-02-08T11:00:00Z",
  },
  {
    id: "beanie-012",
    name: "Chunky Rib Watch Cap",
    brand: "VOID ARCHIVE",
    sku: "VOD-CAP-012",
    category: "headwear",
    categoryLabel: "Headwear",
    subcategory: "Beanies",
    subtitle: "Zap Yellow / Heavy Knit",
    price: 999,
    compareAt: 1499,
    rating: 4.4,
    reviewCount: 31,
    image: p5,
    gallery: [p5, p3, p6],
    badges: ["SALE"],
    sizes: ["One Size"],
    colors: ["Zap Yellow", "Black", "Charcoal"],
    description:
      "Fisherman style short watch cap knitted from thick merino wool blend. Snug fit with a double-folded cuff.",
    shortDescription: "Chunky 7-gauge knit fisherman beanie in bright zap yellow.",
    materials: ["50% Merino Wool, 50% Recycled Acrylic", "Double-fold heavy rib knit"],
    reviews: [R("r17", "Neil C.", 4, "Keeps its elasticity and keeps your head warm.", "21 FEB 2026")],
    stock: 65,
    status: "active",
    featured: false,
    trending: false,
    newArrival: false,
    createdAt: "2026-02-10T10:00:00Z",
  },
  {
    id: "leather-belt-013",
    name: "Industrial D-Ring Webbing Belt",
    brand: "CHROME ZERO",
    sku: "CHZ-BLT-013",
    category: "accessories",
    categoryLabel: "Accessories",
    subcategory: "Belts",
    subtitle: "Heavy Webbing / 130cm",
    price: 1199,
    compareAt: 1599,
    rating: 4.7,
    reviewCount: 46,
    image: p8,
    gallery: [p8, p6, p5],
    badges: ["HOT"],
    sizes: ["One Size (130cm)"],
    colors: ["Black / Chrome", "Yellow / Black"],
    description:
      "Extra-long 38mm industrial webbing belt with laser-engraved steel double D-rings and rubberized tip.",
    shortDescription: "Heavyweight 38mm industrial webbing belt with steel D-ring buckle.",
    materials: ["High-density nylon webbing", "Powder-coated carbon steel hardware"],
    reviews: [R("r18", "Sameer A.", 5, "Long enough to hang down the thigh. Looks sick.", "23 FEB 2026")],
    stock: 42,
    status: "active",
    featured: false,
    trending: true,
    newArrival: false,
    createdAt: "2026-02-12T15:00:00Z",
  },
  {
    id: "bomber-jacket-014",
    name: "MA-1 Reversible Brutal Bomber",
    brand: "BRUTAL. LABS",
    sku: "BRT-BMB-014",
    category: "men",
    categoryLabel: "Outerwear",
    subcategory: "Jackets",
    subtitle: "Black / Emergency Orange",
    price: 6499,
    compareAt: 7999,
    rating: 5.0,
    reviewCount: 110,
    image: p7,
    gallery: [p7, p1, p2],
    badges: ["BESTSELLER", "EXCLUSIVE"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black / Orange", "Sage Green / Orange"],
    description:
      "Oversized heavyweight bomber jacket insulated with 200g synthetic thermal fill. Fully reversible with flight nylon shell and emergency orange inner.",
    shortDescription: "Heavy insulated flight nylon MA-1 bomber with reversible construction.",
    materials: ["Flight-grade water-resistant nylon", "200g polyfill insulation", "Ribbed knit collar, cuffs, and hem"],
    reviews: [R("r19", "Varun K.", 5, "Warm enough for actual winter. Looks incredible in person.", "25 FEB 2026")],
    stock: 14,
    status: "active",
    featured: true,
    trending: true,
    newArrival: true,
    createdAt: "2026-02-14T09:00:00Z",
  },
  {
    id: "cargo-skirt-015",
    name: "Modular Asymmetrical Cargo Maxi Skirt",
    brand: "RAW CUTS",
    sku: "RAW-SKT-015",
    category: "women",
    categoryLabel: "Bottoms",
    subcategory: "Skirts",
    subtitle: "Onyx Black / Cotton Twill",
    price: 3699,
    compareAt: 4499,
    rating: 4.8,
    reviewCount: 68,
    image: p3,
    gallery: [p3, p7, p2],
    badges: ["HOT", "NEW"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Onyx Black", "Sand Khaki"],
    description:
      "Dramatic floor-length cargo skirt featuring an asymmetrical front slit, twin bellows, and an integrated grosgrain belt.",
    shortDescription: "Floor-length tactical cargo skirt with deep side slit and belt.",
    materials: ["100% structured cotton twill", "Enzyme pre-washed", "YKK front zipper"],
    reviews: [R("r20", "Divya M.", 5, "Statement piece of the season. 10/10.", "02 MAR 2026")],
    stock: 19,
    status: "active",
    featured: true,
    trending: true,
    newArrival: true,
    createdAt: "2026-02-16T13:00:00Z",
  },
  {
    id: "combat-boots-016",
    name: "Monolith Chunky Combat Boots",
    brand: "HEPHAESTUS",
    sku: "HEP-BOT-016",
    category: "footwear",
    categoryLabel: "Footwear",
    subcategory: "Boots",
    subtitle: "Matte Black Leather / Lug Sole",
    price: 8499,
    compareAt: 9999,
    rating: 4.9,
    reviewCount: 42,
    image: p4,
    gallery: [p4, p8, p2],
    badges: ["LIMITED", "BESTSELLER"],
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["Matte Black"],
    description:
      "High-top combat boot built upon a 55mm exaggerated cleated lug sole. Side zipper entry with speed hooks and waterproof gusseted tongue.",
    shortDescription: "55mm cleated platform sole boots in full-grain cowhide leather.",
    materials: ["Full grain oiled cowhide leather", "Vibram-inspired cleated rubber sole", "YKK side-zip entry"],
    reviews: [R("r21", "Aryan D.", 5, "Unbeatable presence. Solid build quality.", "04 MAR 2026")],
    stock: 9,
    status: "active",
    featured: true,
    trending: false,
    newArrival: false,
    createdAt: "2026-02-18T16:00:00Z",
  },
  {
    id: "crossbody-bag-017",
    name: "Rigid Crossbody Holster Bag",
    brand: "VOID ARCHIVE",
    sku: "VOD-BAG-017",
    category: "accessories",
    categoryLabel: "Accessories",
    subcategory: "Bags",
    subtitle: "Black / Ballistic Nylon",
    price: 2499,
    compareAt: 2999,
    rating: 4.6,
    reviewCount: 50,
    image: p6,
    gallery: [p6, p8, p5],
    badges: ["NEW"],
    sizes: ["One Size"],
    colors: ["Black", "Reflective Silver"],
    description:
      "Compact chest and crossbody holster bag engineered for hands-free daily carry. Includes quick-draw phone holster and FIDLOCK magnetic buckle.",
    shortDescription: "Waterproof ballistic nylon chest rig with magnetic quick release.",
    materials: ["1000D Ballistic Nylon", "Waterproof Aquaguard zippers", "FIDLOCK magnetic fastener"],
    reviews: [R("r22", "Kunal R.", 5, "Perfect for keys, phone, wallet, and passport.", "06 MAR 2026")],
    stock: 30,
    status: "active",
    featured: false,
    trending: true,
    newArrival: true,
    createdAt: "2026-02-20T11:00:00Z",
  },
  {
    id: "longsleeve-tee-018",
    name: "Thermal Waffle Knit Longsleeve",
    brand: "BRUTAL. LABS",
    sku: "BRT-LGS-018",
    category: "men",
    categoryLabel: "T-Shirts",
    subcategory: "Long Sleeves",
    subtitle: "Chalk Bone / 320 GSM",
    price: 2499,
    compareAt: 2999,
    rating: 4.7,
    reviewCount: 39,
    image: p1,
    gallery: [p1, p6, p3],
    badges: ["SALE"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Chalk Bone", "Washed Olive", "Black"],
    description:
      "Heavy 320 GSM waffle thermal shirt with elongated cuffs and raw serged hems. Tailored for layering under t-shirts or jackets.",
    shortDescription: "320 GSM waffle thermal knit shirt with thumbholes and elongated cuffs.",
    materials: ["100% organic thermal cotton", "Pre-shrunk enzyme wash", "Reinforced flatlock stitching"],
    reviews: [R("r23", "Alok B.", 5, "The texture is superb. Great warmth for layering.", "08 MAR 2026")],
    stock: 33,
    status: "active",
    featured: false,
    trending: false,
    newArrival: false,
    createdAt: "2026-02-22T14:00:00Z",
  },
  {
    id: "knit-sweater-019",
    name: "Deconstructed Distressed Knit",
    brand: "NEO-TOKYO",
    sku: "NEO-KNT-019",
    category: "women",
    categoryLabel: "Outerwear",
    subcategory: "Sweaters",
    subtitle: "Charcoal Fade / Mohair Blend",
    price: 4999,
    compareAt: 5999,
    rating: 4.9,
    reviewCount: 82,
    image: p3,
    gallery: [p3, p7, p1],
    badges: ["LIMITED", "HOT"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Charcoal Fade", "Acid Green Fade"],
    description:
      "Loose-gauge deconstructed sweater crafted in a soft mohair blend. Features laddered distressing and raw-edge roll hems.",
    shortDescription: "Mohair blend distressed loose-gauge knit sweater with drop shoulders.",
    materials: ["40% Mohair, 30% Wool, 30% Polyamide", "Hand-distressed ladder detail"],
    reviews: [R("r24", "Simran V.", 5, "Incredibly soft, zero itch. Beautiful drape.", "10 MAR 2026")],
    stock: 11,
    status: "active",
    featured: true,
    trending: true,
    newArrival: true,
    createdAt: "2026-02-25T17:00:00Z",
  },
  {
    id: "slide-sandal-020",
    name: "Padded Platform Recovery Slide",
    brand: "CHROME ZERO",
    sku: "CHZ-SLD-020",
    category: "footwear",
    categoryLabel: "Footwear",
    subcategory: "Slides",
    subtitle: "Pitch Black / Cloud EVA",
    price: 2799,
    compareAt: 3499,
    rating: 4.6,
    reviewCount: 61,
    image: p4,
    gallery: [p4, p5, p8],
    badges: ["SALE"],
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["Pitch Black", "Bone White", "Zap Neon"],
    description:
      "Chunky seamless slide molded entirely from high-rebound Cloud EVA foam. Features anatomical footbed and brutalist squared toe geometry.",
    shortDescription: "High-rebound Cloud EVA platform slide with squared toe silhouette.",
    materials: ["100% injection-molded Cloud EVA", "Waterproof and antimicrobial"],
    reviews: [R("r25", "Manish K.", 5, "Like walking on clouds. Looks futuristic.", "12 MAR 2026")],
    stock: 55,
    status: "active",
    featured: false,
    trending: true,
    newArrival: false,
    createdAt: "2026-02-28T10:00:00Z",
  },
  {
    id: "draft-jacket-021",
    name: "Prototype Experimental Trench",
    brand: "HEPHAESTUS",
    sku: "HEP-TRN-021",
    category: "men",
    categoryLabel: "Outerwear",
    subcategory: "Coats",
    subtitle: "Draft Concept / In Review",
    price: 8999,
    rating: 5.0,
    reviewCount: 0,
    image: p7,
    gallery: [p7, p2],
    badges: ["EXCLUSIVE"],
    sizes: ["M", "L"],
    colors: ["Raw Black"],
    description:
      "Experimental floor-length structured trench coat with magnetic storm flaps. Hidden in draft mode for testing admin visibility.",
    shortDescription: "Draft prototype trench coat with magnetic storm flaps.",
    materials: ["Technical waterproof gabardine", "FIDLOCK storm closure"],
    reviews: [],
    stock: 5,
    status: "draft",
    featured: false,
    trending: false,
    newArrival: false,
    createdAt: "2026-03-01T12:00:00Z",
  },
];

export const categories: { slug: ProductCategory; title: string; image: string; count?: number }[] = [
  { slug: "men", title: "MEN", image: catMen },
  { slug: "women", title: "WOMEN", image: catWomen },
  { slug: "accessories", title: "ACCESS-\nORIES", image: catAcc },
  { slug: "footwear", title: "FOOT-\nWEAR", image: p4 },
  { slug: "headwear", title: "HEAD-\nWEAR", image: p5 },
];

export const allSizes = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "28",
  "30",
  "32",
  "34",
  "36",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "One Size",
];

export const allColors = [
  "Black",
  "Bone",
  "Washed Black",
  "Concrete",
  "Electric Yellow",
  "Olive Drab",
  "Silver Gray",
  "Charcoal",
  "Distressed White",
  "Zap Neon",
];

export const trendingSearches = ["Oversized tee", "Cargo", "Hoodie", "Sneakers", "Tote", "Vest", "Boots"];

export const initialCoupons: Coupon[] = [
  { id: "c1", code: "BRUTAL10", type: "percent", value: 10, minOrder: 1000, status: "active", usageCount: 42 },
  { id: "c2", code: "DROP500", type: "flat", value: 500, minOrder: 3000, status: "active", usageCount: 18 },
  { id: "c3", code: "FIRSTBUY", type: "percent", value: 15, minOrder: 2000, status: "active", usageCount: 89 },
  { id: "c4", code: "VIP20", type: "percent", value: 20, minOrder: 5000, status: "active", usageCount: 12 },
];

export const initialCustomers: CustomerUser[] = [
  {
    id: "usr-001",
    name: "Alex Thorne",
    email: "alex@example.com",
    password: "password123",
    phone: "+91 98765 43210",
    addresses: [
      {
        id: "addr-1",
        fullName: "Alex Thorne",
        phone: "+91 98765 43210",
        address: "Flat 402, Brutal Towers, 12th Main Road, Indiranagar",
        city: "Bengaluru",
        state: "Karnataka",
        postalCode: "560038",
        country: "India",
        isDefault: true,
      },
      {
        id: "addr-2",
        fullName: "Alex Thorne (Studio)",
        phone: "+91 98765 43211",
        address: "Design Lab 8B, Tech Park, Koramangala",
        city: "Bengaluru",
        state: "Karnataka",
        postalCode: "560095",
        country: "India",
        isDefault: false,
      },
    ],
    defaultAddressIndex: 0,
    createdAt: "2026-01-12T10:00:00Z",
  },
  {
    id: "usr-002",
    name: "Maya Chen",
    email: "maya@example.com",
    password: "password123",
    phone: "+91 98123 45678",
    addresses: [
      {
        id: "addr-3",
        fullName: "Maya Chen",
        phone: "+91 98123 45678",
        address: "A-14, Bandra West, Off Linking Road",
        city: "Mumbai",
        state: "Maharashtra",
        postalCode: "400050",
        country: "India",
        isDefault: true,
      },
    ],
    defaultAddressIndex: 0,
    createdAt: "2026-01-20T14:30:00Z",
  },
  {
    id: "usr-003",
    name: "Dev Sharma",
    email: "dev@example.com",
    password: "password123",
    phone: "+91 99887 76655",
    addresses: [
      {
        id: "addr-4",
        fullName: "Dev Sharma",
        phone: "+91 99887 76655",
        address: "House 24, Hauz Khas Village",
        city: "New Delhi",
        state: "Delhi",
        postalCode: "110016",
        country: "India",
        isDefault: true,
      },
    ],
    defaultAddressIndex: 0,
    createdAt: "2026-02-01T09:15:00Z",
  },
];

export const initialOrders: Order[] = [
  {
    id: "BRT-849201",
    date: "18 FEB 2026",
    customerName: "Alex Thorne",
    email: "alex@example.com",
    phone: "+91 98765 43210",
    items: [
      {
        productId: "oversized-tee-001",
        name: "Null Oversized Heavy Tee",
        image: p1,
        size: "L",
        color: "Black",
        qty: 2,
        price: 1999,
        sku: "BRT-TEE-001",
      },
      {
        productId: "bucket-005",
        name: "Blackout Structured Bucket",
        image: p5,
        size: "One Size",
        color: "Black",
        qty: 1,
        price: 1299,
        sku: "VOD-BCK-005",
      },
    ],
    subtotal: 5297,
    shipping: 0,
    discount: 529,
    couponCode: "BRUTAL10",
    total: 4768,
    status: "DELIVERED",
    paymentMethod: "CARD",
    paymentStatus: "PAID",
    address: initialCustomers[0].addresses[0],
    delivery: "STANDARD",
    eta: "22 FEB 2026",
    timeline: [
      { status: "PLACED", timestamp: "18 FEB 2026 10:15 AM", title: "Order Placed", note: "Paid via Visa ending in 4242" },
      { status: "CONFIRMED", timestamp: "18 FEB 2026 11:00 AM", title: "Order Confirmed", note: "Inventory allocated" },
      { status: "PACKED", timestamp: "19 FEB 2026 02:30 PM", title: "Packed at Central Hub", note: "Box ID #BRT-BX-99" },
      { status: "SHIPPED", timestamp: "20 FEB 2026 09:00 AM", title: "Shipped via BlueDart", note: "Tracking #BLU8982310" },
      { status: "OUT_FOR_DELIVERY", timestamp: "22 FEB 2026 08:30 AM", title: "Out for Delivery", note: "Courier Rider Assigned" },
      { status: "DELIVERED", timestamp: "22 FEB 2026 02:45 PM", title: "Delivered", note: "Handed to customer" },
    ],
  },
  {
    id: "BRT-730194",
    date: "19 FEB 2026",
    customerName: "Maya Chen",
    email: "maya@example.com",
    phone: "+91 98123 45678",
    items: [
      {
        productId: "hoodie-003",
        name: "Zap 450GSM Boxy Hoodie",
        image: p3,
        size: "M",
        color: "Electric Yellow",
        qty: 1,
        price: 4299,
        sku: "BRT-HD-003",
      },
    ],
    subtotal: 4299,
    shipping: 149,
    discount: 0,
    total: 4448,
    status: "SHIPPED",
    paymentMethod: "UPI",
    paymentStatus: "PAID",
    address: initialCustomers[1].addresses[0],
    delivery: "EXPRESS",
    eta: "21 FEB 2026",
    timeline: [
      { status: "PLACED", timestamp: "19 FEB 2026 04:20 PM", title: "Order Placed", note: "Paid via UPI" },
      { status: "CONFIRMED", timestamp: "19 FEB 2026 05:00 PM", title: "Order Confirmed", note: "Express priority queue" },
      { status: "PACKED", timestamp: "20 FEB 2026 10:00 AM", title: "Packed", note: "Dispatched from warehouse" },
      { status: "SHIPPED", timestamp: "20 FEB 2026 01:15 PM", title: "Shipped via Delhivery Air", note: "AWB #DLV7789012" },
    ],
  },
  {
    id: "BRT-918230",
    date: "20 FEB 2026",
    customerName: "Dev Sharma",
    email: "dev@example.com",
    phone: "+91 99887 76655",
    items: [
      {
        productId: "sneaker-004",
        name: "Slab Low-Cut Runner",
        image: p4,
        size: "9",
        color: "Black / White",
        qty: 1,
        price: 6999,
        sku: "CHZ-SNK-004",
      },
    ],
    subtotal: 6999,
    shipping: 0,
    discount: 500,
    couponCode: "DROP500",
    total: 6499,
    status: "CONFIRMED",
    paymentMethod: "CARD",
    paymentStatus: "PAID",
    address: initialCustomers[2].addresses[0],
    delivery: "STANDARD",
    eta: "25 FEB 2026",
    timeline: [
      { status: "PLACED", timestamp: "20 FEB 2026 11:30 AM", title: "Order Placed", note: "Paid via Mastercard" },
      { status: "CONFIRMED", timestamp: "20 FEB 2026 12:00 PM", title: "Order Confirmed", note: "Sent to picking team" },
    ],
  },
];

export const initialInventoryLogs: InventoryLog[] = [
  {
    id: "log-1",
    productId: "oversized-tee-001",
    productName: "Null Oversized Heavy Tee",
    sku: "BRT-TEE-001",
    type: "RESTOCK",
    qtyChange: 50,
    newStock: 50,
    date: "2026-01-10 10:00 AM",
    note: "Initial production batch received from Tiruppur",
  },
  {
    id: "log-2",
    productId: "oversized-tee-001",
    productName: "Null Oversized Heavy Tee",
    sku: "BRT-TEE-001",
    type: "PURCHASE",
    qtyChange: -2,
    newStock: 48,
    date: "2026-02-18 10:15 AM",
    note: "Order #BRT-849201 placed by Alex Thorne",
  },
  {
    id: "log-3",
    productId: "hoodie-003",
    productName: "Zap 450GSM Boxy Hoodie",
    sku: "BRT-HD-003",
    type: "RESTOCK",
    qtyChange: 20,
    newStock: 20,
    date: "2026-01-18 02:00 PM",
    note: "Limited edition drop stock load",
  },
  {
    id: "log-4",
    productId: "hoodie-003",
    productName: "Zap 450GSM Boxy Hoodie",
    sku: "BRT-HD-003",
    type: "PURCHASE",
    qtyChange: -1,
    newStock: 19,
    date: "2026-02-19 04:20 PM",
    note: "Order #BRT-730194 placed by Maya Chen",
  },
];

export const initialStoreSettings: StoreSettings = {
  storeName: "BRUTAL.",
  tagline: "Streetwear With No Rules",
  announcement: "FREE DOMESTIC SHIPPING OVER ₹4,999 • USE CODE 'BRUTAL10' FOR 10% OFF",
  announcementActive: true,
  freeShippingThreshold: 4999,
  standardShippingFee: 149,
  expressShippingFee: 299,
  supportEmail: "concierge@brutal-label.com",
  supportPhone: "+91 80 4920 1100",
  currency: "₹",
};

export const products = initialProducts;
export function getProduct(id: string): Product | undefined {
  return initialProducts.find((p) => p.id === id);
}


