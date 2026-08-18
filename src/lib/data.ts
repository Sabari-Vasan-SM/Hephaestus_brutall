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

export type Badge = "NEW" | "SALE" | "BESTSELLER" | "LIMITED";

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
  category: "men" | "women" | "accessories" | "footwear";
  categoryLabel: string;
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
  materials: string[];
  reviews: Review[];
};

const R = (id: string, name: string, rating: number, body: string, date: string): Review => ({
  id,
  name,
  rating,
  body,
  date,
});

export const products: Product[] = [
  {
    id: "oversized-tee-001",
    name: "Null Oversized Tee",
    category: "men",
    categoryLabel: "T-Shirts",
    subtitle: "Black / Unisex",
    price: 1999,
    compareAt: 2499,
    rating: 4.7,
    reviewCount: 128,
    image: p1,
    gallery: [p1, p7, p3],
    badges: ["BESTSELLER", "SALE"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Bone"],
    description:
      "A 280 GSM boxy tee cut deliberately wide through the body with dropped shoulders. Garment dyed, pre-shrunk and built to hold its shape after the hundredth wash.",
    materials: ["100% combed organic cotton", "280 GSM heavyweight jersey", "Garment dyed in Tiruppur"],
    reviews: [
      R("r1", "Ananya K.", 5, "The weight of this tee is unreal. It hangs exactly like the photos.", "12 JAN 2026"),
      R("r2", "Rehan M.", 4, "Sizing runs big, which is the point. Went true to size and it's perfect.", "03 FEB 2026"),
    ],
  },
  {
    id: "cargo-pant-002",
    name: "Grid Wide Cargo",
    category: "men",
    categoryLabel: "Bottoms",
    subtitle: "Washed Black / Unisex",
    price: 3499,
    rating: 4.5,
    reviewCount: 64,
    image: p2,
    gallery: [p2, p1, p4],
    badges: ["NEW"],
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Washed Black", "Concrete"],
    description:
      "Wide-leg cargo cut from rigid cotton twill with bellow pockets and a stiff waistband that softens with wear. Deliberately architectural.",
    materials: ["98% cotton twill, 2% elastane", "Enzyme washed", "YKK hardware"],
    reviews: [R("r3", "Dev S.", 5, "Fits enormous in the best way. Pockets actually usable.", "22 FEB 2026")],
  },
  {
    id: "hoodie-003",
    name: "Zap Boxy Hoodie",
    category: "women",
    categoryLabel: "Outerwear",
    subtitle: "Electric Yellow / Unisex",
    price: 4299,
    compareAt: 5299,
    rating: 4.9,
    reviewCount: 212,
    image: p3,
    gallery: [p3, p1, p6],
    badges: ["LIMITED", "SALE"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Electric Yellow", "Black"],
    description:
      "Our loudest piece. A 450 GSM loopback hoodie with a squared hem, double-lined hood and zero branding on the outside. 300 units only.",
    materials: ["450 GSM French terry", "Ribbed cuffs and hem", "Limited run of 300"],
    reviews: [
      R("r4", "Meera J.", 5, "Bought it for the colour, kept it for the fit.", "01 MAR 2026"),
      R("r5", "Tanvi R.", 5, "Heavy, structured, genuinely premium.", "09 MAR 2026"),
    ],
  },
  {
    id: "sneaker-004",
    name: "Slab Runner",
    category: "footwear",
    categoryLabel: "Sneakers",
    subtitle: "Black / White",
    price: 6999,
    rating: 4.4,
    reviewCount: 89,
    image: p4,
    gallery: [p4, p2, p8],
    badges: ["BESTSELLER"],
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["Black / White"],
    description:
      "A chunky low-profile runner on a sculpted EVA slab sole. Leather upper, reinforced toe box, no swoosh energy required.",
    materials: ["Full grain leather upper", "Compression moulded EVA midsole", "Rubber outsole"],
    reviews: [R("r6", "Karan V.", 4, "Comfortable straight out of the box.", "18 JAN 2026")],
  },
  {
    id: "bucket-005",
    name: "Blackout Bucket Hat",
    category: "accessories",
    categoryLabel: "Headwear",
    subtitle: "Black / One Size",
    price: 1299,
    compareAt: 1699,
    rating: 4.2,
    reviewCount: 41,
    image: p5,
    gallery: [p5, p8, p6],
    badges: ["SALE"],
    sizes: ["One Size"],
    colors: ["Black"],
    description: "Structured cotton canvas bucket with a stiffened brim that holds its angle. Quietly aggressive.",
    materials: ["Heavy cotton canvas", "Cotton twill lining"],
    reviews: [R("r7", "Ishan P.", 4, "Brim keeps its shape, which is rare.", "27 FEB 2026")],
  },
  {
    id: "tote-006",
    name: "Everyday Heavy Tote",
    category: "accessories",
    categoryLabel: "Bags",
    subtitle: "Bone / Black Straps",
    price: 1799,
    rating: 4.6,
    reviewCount: 73,
    image: p6,
    gallery: [p6, p5, p1],
    badges: ["NEW"],
    sizes: ["One Size"],
    colors: ["Bone"],
    description: "18oz canvas tote with leather straps, an internal zip pocket and a flat base that actually stands up.",
    materials: ["18oz cotton canvas", "Vegetable tanned leather straps"],
    reviews: [R("r8", "Sara D.", 5, "Carries a laptop, gym kit and groceries. Unbothered.", "14 FEB 2026")],
  },
  {
    id: "denim-007",
    name: "Concrete Denim Jacket",
    category: "women",
    categoryLabel: "Outerwear",
    subtitle: "Washed Black / Unisex",
    price: 5499,
    compareAt: 6999,
    rating: 4.8,
    reviewCount: 96,
    image: p7,
    gallery: [p7, p2, p4],
    badges: ["SALE", "LIMITED"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Washed Black"],
    description: "A boxy trucker in 13oz rigid denim, overdyed black and stonewashed once so it fades on your terms.",
    materials: ["13oz Japanese denim", "Overdyed and stonewashed", "Antique silver hardware"],
    reviews: [R("r9", "Nikhil B.", 5, "The fade after a month is exactly what I wanted.", "05 MAR 2026")],
  },
  {
    id: "shades-008",
    name: "Cut Rectangle Shades",
    category: "accessories",
    categoryLabel: "Eyewear",
    subtitle: "Black / UV400",
    price: 2299,
    rating: 4.3,
    reviewCount: 52,
    image: p8,
    gallery: [p8, p5, p6],
    badges: ["NEW"],
    sizes: ["One Size"],
    colors: ["Black"],
    description: "Sharp rectangular acetate frames with flat UV400 lenses. Deliberately severe.",
    materials: ["Italian acetate frame", "UV400 polarised lens", "Spring steel hinges"],
    reviews: [R("r10", "Aarav T.", 4, "Sharp shape, no wobble.", "20 FEB 2026")],
  },
];

export const categories = [
  { slug: "men", title: "MEN", image: catMen, count: products.filter((p) => p.category === "men").length },
  { slug: "women", title: "WOMEN", image: catWomen, count: products.filter((p) => p.category === "women").length },
  {
    slug: "accessories",
    title: "ACCESS-\nORIES",
    image: catAcc,
    count: products.filter((p) => p.category === "accessories").length,
  },
  { slug: "footwear", title: "FOOT-\nWEAR", image: p4, count: products.filter((p) => p.category === "footwear").length },
];

export const allSizes = ["XS", "S", "M", "L", "XL", "28", "30", "32", "34", "36", "6", "7", "8", "9", "10", "11", "One Size"];
export const allColors = Array.from(new Set(products.flatMap((p) => p.colors)));

export const trendingSearches = ["Oversized tee", "Cargo", "Hoodie", "Sneakers", "Tote"];

export const coupons: Record<string, { type: "percent" | "flat"; value: number }> = {
  BRUTAL10: { type: "percent", value: 10 },
  DROP500: { type: "flat", value: 500 },
};

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}
