import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStore } from "@/lib/store";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Save, Sparkles, Image as ImageIcon } from "lucide-react";
import { BRANDS, type Badge, type ProductCategory } from "@/lib/data";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p7 from "@/assets/p7.jpg";
import p8 from "@/assets/p8.jpg";

export const Route = createFileRoute("/superadmin/products/new")({
  head: () => ({
    meta: [
      { title: "New Product — BRUTAL. Super Admin" },
      { name: "description", content: "Create and publish a new product to the catalog." },
    ],
  }),
  component: NewProductPage,
});

const presetImages = [
  { label: "Oversized Tee (p1)", src: p1 },
  { label: "Cargo Pants (p2)", src: p2 },
  { label: "Zap Hoodie (p3)", src: p3 },
  { label: "Slab Sneaker (p4)", src: p4 },
  { label: "Bucket Hat (p5)", src: p5 },
  { label: "Heavy Tote (p6)", src: p6 },
  { label: "Trucker Jacket (p7)", src: p7 },
  { label: "Rect Shades (p8)", src: p8 },
];

const availableBadges: Badge[] = ["NEW", "SALE", "BESTSELLER", "LIMITED", "HOT", "EXCLUSIVE"];

function NewProductPage() {
  const { addProduct } = useStore();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState<string>("BRUTAL. LABS");
  const [sku, setSku] = useState("BRT-NEW-" + Math.floor(100 + Math.random() * 900));
  const [category, setCategory] = useState<ProductCategory>("men");
  const [categoryLabel, setCategoryLabel] = useState("T-Shirts");
  const [subcategory, setSubcategory] = useState("Heavyweight Tops");
  const [subtitle, setSubtitle] = useState("Black / Unisex");
  const [price, setPrice] = useState<number>(2499);
  const [compareAt, setCompareAt] = useState<number | undefined>(2999);
  const [stock, setStock] = useState<number>(30);
  const [image, setImage] = useState<string>(p1);
  const [gallery, setGallery] = useState<string[]>([p1, p7, p3]);
  const [badges, setBadges] = useState<Badge[]>(["NEW"]);
  const [sizes, setSizes] = useState("S, M, L, XL");
  const [colors, setColors] = useState("Black, Bone, Concrete");
  const [shortDescription, setShortDescription] = useState(
    "Heavyweight street silhouette crafted with architectural proportions.",
  );
  const [description, setDescription] = useState(
    "Constructed from ultra-heavyweight combed organic cotton with reinforced seam stitching. Garment dyed and pre-shrunk for an enduring structured silhouette.",
  );
  const [materials, setMaterials] = useState(
    "100% combed organic cotton\n280 GSM heavyweight jersey\nGarment dyed in Tiruppur",
  );
  const [status, setStatus] = useState<"active" | "draft">("active");
  const [featured, setFeatured] = useState(true);
  const [trending, setTrending] = useState(false);
  const [newArrival, setNewArrival] = useState(true);

  const toggleBadge = (b: Badge) => {
    setBadges((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("MISSING NAME", { description: "Please provide a valid product name." });
      return;
    }

    const sizesArr = sizes
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const colorsArr = colors
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);
    const materialsArr = materials
      .split("\n")
      .map((m) => m.trim())
      .filter(Boolean);

    const newProd = addProduct({
      name: name.trim(),
      brand,
      sku: sku.trim(),
      category,
      categoryLabel: categoryLabel.trim() || "Apparel",
      subcategory: subcategory.trim() || "General",
      subtitle: subtitle.trim(),
      price: Number(price),
      compareAt: compareAt ? Number(compareAt) : undefined,
      stock: Number(stock),
      image,
      gallery,
      badges,
      sizes: sizesArr.length > 0 ? sizesArr : ["One Size"],
      colors: colorsArr.length > 0 ? colorsArr : ["Black"],
      shortDescription: shortDescription.trim(),
      description: description.trim(),
      materials: materialsArr.length > 0 ? materialsArr : ["100% Cotton"],
      status,
      featured,
      trending,
      newArrival,
    });

    toast.success("PRODUCT CREATED", {
      description: `${newProd.name} added to ${status === "active" ? "live catalog" : "drafts"}.`,
    });
    navigate({ to: "/superadmin/products" });
  };

  return (
    <AdminLayout
      title="CREATE NEW PRODUCT"
      subtitle="Register a new piece into the store inventory."
      action={
        <Link
          to="/superadmin/products"
          className="flex items-center gap-2 border-[2px] border-foreground bg-background px-4 py-2 text-xs font-bold uppercase press hover:bg-smoke"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>BACK TO CATALOG</span>
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          {/* Main Product Info */}
          <div className="space-y-6">
            {/* General Info Box */}
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow">
              <h2 className="font-display text-lg font-black uppercase mb-4 border-b-[2px] border-foreground pb-2">
                BASIC ATTRIBUTES
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="label-xs block mb-1">PRODUCT TITLE *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Acid Wash Architectural Hoodie"
                    className="w-full border-[2px] border-foreground bg-smoke/40 p-3 text-sm font-bold uppercase focus:bg-background focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-xs block mb-1">BRAND / LABEL</label>
                    <select
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full border-[2px] border-foreground bg-smoke/40 p-3 text-xs font-bold uppercase"
                    >
                      {BRANDS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="label-xs block mb-1">SKU (STOCK KEEPING UNIT) *</label>
                    <input
                      type="text"
                      required
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      className="w-full border-[2px] border-foreground bg-smoke/40 p-3 text-xs font-mono font-bold uppercase"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="label-xs block mb-1">PRIMARY CATEGORY</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as ProductCategory)}
                      className="w-full border-[2px] border-foreground bg-smoke/40 p-3 text-xs font-bold uppercase"
                    >
                      <option value="men">MEN</option>
                      <option value="women">WOMEN</option>
                      <option value="accessories">ACCESSORIES</option>
                      <option value="footwear">FOOTWEAR</option>
                      <option value="headwear">HEADWEAR</option>
                    </select>
                  </div>

                  <div>
                    <label className="label-xs block mb-1">CATEGORY LABEL</label>
                    <input
                      type="text"
                      value={categoryLabel}
                      onChange={(e) => setCategoryLabel(e.target.value)}
                      placeholder="e.g. Outerwear"
                      className="w-full border-[2px] border-foreground bg-smoke/40 p-3 text-xs font-bold uppercase"
                    />
                  </div>

                  <div>
                    <label className="label-xs block mb-1">SUBTITLE</label>
                    <input
                      type="text"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="e.g. Black / Unisex"
                      className="w-full border-[2px] border-foreground bg-smoke/40 p-3 text-xs font-bold uppercase"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing and Stock */}
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow">
              <h2 className="font-display text-lg font-black uppercase mb-4 border-b-[2px] border-foreground pb-2">
                PRICING & INVENTORY
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="label-xs block mb-1">PRICE (₹ INR) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full border-[2px] border-foreground bg-smoke/40 p-3 text-sm font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="label-xs block mb-1">COMPARE AT (STRIKE-THROUGH ₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={compareAt ?? ""}
                    onChange={(e) => setCompareAt(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="Optional"
                    className="w-full border-[2px] border-foreground bg-smoke/40 p-3 text-sm font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="label-xs block mb-1">INITIAL STOCK UNITS *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full border-[2px] border-foreground bg-smoke/40 p-3 text-sm font-mono font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Description & Materials */}
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-4">
              <h2 className="font-display text-lg font-black uppercase mb-4 border-b-[2px] border-foreground pb-2">
                DESCRIPTION & TECHNICAL SPECIFICATIONS
              </h2>

              <div>
                <label className="label-xs block mb-1">SHORT SUMMARY</label>
                <input
                  type="text"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full border-[2px] border-foreground bg-smoke/40 p-3 text-xs font-bold"
                />
              </div>

              <div>
                <label className="label-xs block mb-1">FULL DESCRIPTION</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border-[2px] border-foreground bg-smoke/40 p-3 text-xs font-sans"
                />
              </div>

              <div>
                <label className="label-xs block mb-1">MATERIALS & DETAILS (1 PER LINE)</label>
                <textarea
                  rows={3}
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  className="w-full border-[2px] border-foreground bg-smoke/40 p-3 text-xs font-mono"
                />
              </div>
            </div>

            {/* Variants */}
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow">
              <h2 className="font-display text-lg font-black uppercase mb-4 border-b-[2px] border-foreground pb-2">
                VARIANTS (SIZES & COLORS)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-xs block mb-1">AVAILABLE SIZES (COMMA SEPARATED)</label>
                  <input
                    type="text"
                    value={sizes}
                    onChange={(e) => setSizes(e.target.value)}
                    placeholder="S, M, L, XL"
                    className="w-full border-[2px] border-foreground bg-smoke/40 p-3 text-xs font-bold uppercase"
                  />
                </div>

                <div>
                  <label className="label-xs block mb-1">AVAILABLE COLORS (COMMA SEPARATED)</label>
                  <input
                    type="text"
                    value={colors}
                    onChange={(e) => setColors(e.target.value)}
                    placeholder="Black, Olive, Bone"
                    className="w-full border-[2px] border-foreground bg-smoke/40 p-3 text-xs font-bold uppercase"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Settings & Media */}
          <div className="space-y-6">
            {/* Status & Placement */}
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-4">
              <h3 className="font-display text-sm font-black uppercase border-b-[2px] border-foreground pb-2">
                PUBLISH STATUS
              </h3>

              <div>
                <label className="label-xs block mb-1">CATALOG VISIBILITY</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "active" | "draft")}
                  className="w-full border-[2px] border-foreground bg-zap p-3 text-xs font-black uppercase"
                >
                  <option value="active">ACTIVE (PUBLIC ON STORE)</option>
                  <option value="draft">DRAFT (HIDDEN FROM SHOP)</option>
                </select>
              </div>

              <div className="space-y-2 pt-2 border-t border-zinc-200">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="h-4 w-4 accent-foreground"
                  />
                  <span className="text-xs font-bold uppercase">FEATURED ON HOMEPAGE</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={trending}
                    onChange={(e) => setTrending(e.target.checked)}
                    className="h-4 w-4 accent-foreground"
                  />
                  <span className="text-xs font-bold uppercase">TRENDING RADAR</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newArrival}
                    onChange={(e) => setNewArrival(e.target.checked)}
                    className="h-4 w-4 accent-foreground"
                  />
                  <span className="text-xs font-bold uppercase">NEW ARRIVAL BADGE</span>
                </label>
              </div>
            </div>

            {/* Badges */}
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow">
              <h3 className="font-display text-sm font-black uppercase border-b-[2px] border-foreground pb-2 mb-3">
                PRODUCT BADGES
              </h3>
              <div className="flex flex-wrap gap-2">
                {availableBadges.map((b) => {
                  const active = badges.includes(b);
                  return (
                    <button
                      key={b}
                      type="button"
                      onClick={() => toggleBadge(b)}
                      className={`border-[2px] px-3 py-1.5 text-xs font-black uppercase press ${
                        active
                          ? "border-foreground bg-foreground text-background"
                          : "border-foreground bg-smoke text-foreground hover:bg-zap"
                      }`}
                    >
                      {b}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Media Selector */}
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-4">
              <h3 className="font-display text-sm font-black uppercase border-b-[2px] border-foreground pb-2">
                PRODUCT IMAGERY
              </h3>

              <div className="border-[2px] border-foreground p-2 bg-smoke/50 text-center">
                <img src={image} alt="Preview" className="h-48 w-full object-cover border border-foreground mb-2" />
                <span className="label-xs text-muted-foreground">PRIMARY COVER IMAGE</span>
              </div>

              <div>
                <label className="label-xs block mb-2">CHOOSE FROM PRESETS</label>
                <div className="grid grid-cols-4 gap-2">
                  {presetImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setImage(img.src);
                        setGallery([img.src, p7, p3]);
                      }}
                      className={`border-[2px] p-0.5 press ${
                        image === img.src ? "border-flare ring-2 ring-flare" : "border-foreground"
                      }`}
                    >
                      <img src={img.src} alt={img.label} className="h-12 w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 border-[3px] border-foreground bg-zap py-4 text-sm font-black uppercase press brutal-shadow"
            >
              <Save className="h-5 w-5" />
              <span>SAVE & PUBLISH PRODUCT</span>
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
