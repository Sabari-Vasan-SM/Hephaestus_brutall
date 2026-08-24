import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { useStore } from "@/lib/store";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ArrowLeft, Save, Trash2, Eye, ExternalLink } from "lucide-react";
import { BRANDS, type Badge, type ProductCategory } from "@/lib/data";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p7 from "@/assets/p7.jpg";
import p8 from "@/assets/p8.jpg";

export const Route = createFileRoute("/superadmin/products/$productId/edit")({
  head: () => ({
    meta: [
      { title: "Edit Product — BRUTAL. Super Admin" },
      { name: "description", content: "Modify product specifications, pricing, stock, and media." },
    ],
  }),
  component: EditProductPage,
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

function EditProductPage() {
  const { productId } = Route.useParams();
  const {
    getProduct,
    updateProduct,
    deleteProduct,
    brands,
    categories,
    categoryLabels,
    subtitlePresets,
    badges: storeBadges,
    addBrand,
    addCategory,
  } = useStore();
  const navigate = useNavigate();

  const product = getProduct(productId);

  const [name, setName] = useState(product?.name ?? "");
  const [brand, setBrand] = useState(product?.brand ?? (brands[0] || "BRUTAL. LABS"));
  const [sku, setSku] = useState(product?.sku ?? "");
  const [category, setCategory] = useState<string>(product?.category ?? (categories[0]?.slug || "men"));
  const [categoryLabel, setCategoryLabel] = useState(product?.categoryLabel ?? "");
  const [subcategory, setSubcategory] = useState(product?.subcategory ?? "");
  const [subtitle, setSubtitle] = useState(product?.subtitle ?? "");
  const [price, setPrice] = useState<number>(product?.price ?? 0);
  const [compareAt, setCompareAt] = useState<number | undefined>(product?.compareAt);
  const [stock, setStock] = useState<number>(product?.stock ?? 0);
  const [image, setImage] = useState<string>(product?.image ?? p1);
  const [badges, setBadges] = useState<Badge[]>(product?.badges ?? []);
  const [sizes, setSizes] = useState(product?.sizes.join(", ") ?? "S, M, L, XL");
  const [colors, setColors] = useState(product?.colors.join(", ") ?? "Black");
  const [shortDescription, setShortDescription] = useState(product?.shortDescription ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [materials, setMaterials] = useState(product?.materials.join("\n") ?? "");
  const [status, setStatus] = useState<"active" | "draft">(product?.status ?? "active");
  const [featured, setFeatured] = useState(product?.featured ?? false);
  const [trending, setTrending] = useState(product?.trending ?? false);
  const [newArrival, setNewArrival] = useState(product?.newArrival ?? false);

  // Inline Quick Add Modals
  const [inlineBrandOpen, setInlineBrandOpen] = useState(false);
  const [inlineBrandInput, setInlineBrandInput] = useState("");
  const [inlineCatOpen, setInlineCatOpen] = useState(false);
  const [inlineCatTitle, setInlineCatTitle] = useState("");
  const [inlineCatSlug, setInlineCatSlug] = useState("");

  const handleQuickAddBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlineBrandInput.trim()) return;
    addBrand(inlineBrandInput.trim());
    setBrand(inlineBrandInput.trim());
    toast.success("BRAND ADDED & SELECTED", { description: inlineBrandInput.trim() });
    setInlineBrandInput("");
    setInlineBrandOpen(false);
  };

  const handleQuickAddCat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlineCatTitle.trim()) return;
    const slug = (inlineCatSlug.trim() || inlineCatTitle.trim()).toLowerCase().replace(/\s+/g, "-");
    addCategory({
      title: inlineCatTitle.trim(),
      slug,
      image: p1,
    });
    setCategory(slug);
    toast.success("CATEGORY ADDED & SELECTED", { description: inlineCatTitle.trim() });
    setInlineCatTitle("");
    setInlineCatSlug("");
    setInlineCatOpen(false);
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setBrand(product.brand);
      setSku(product.sku);
      setCategory(product.category);
      setCategoryLabel(product.categoryLabel);
      setSubcategory(product.subcategory);
      setSubtitle(product.subtitle);
      setPrice(product.price);
      setCompareAt(product.compareAt);
      setStock(product.stock);
      setImage(product.image);
      setBadges(product.badges);
      setSizes(product.sizes.join(", "));
      setColors(product.colors.join(", "));
      setShortDescription(product.shortDescription);
      setDescription(product.description);
      setMaterials(product.materials.join("\n"));
      setStatus(product.status);
      setFeatured(product.featured);
      setTrending(product.trending);
      setNewArrival(product.newArrival);
    }
  }, [product]);

  if (!product) {
    return (
      <AdminLayout title="PRODUCT NOT FOUND">
        <div className="border-[3px] border-foreground bg-background p-12 text-center brutal-shadow">
          <h2 className="font-display text-2xl font-black uppercase">PRODUCT ID NOT FOUND</h2>
          <p className="mt-2 text-sm text-muted-foreground">The product requested does not exist or has been deleted.</p>
          <div className="mt-6">
            <Link
              to="/superadmin/products"
              className="border-[2px] border-foreground bg-zap px-6 py-3 font-bold uppercase press brutal-shadow-sm text-xs"
            >
              RETURN TO PRODUCTS
            </Link>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const toggleBadge = (b: Badge) => {
    setBadges((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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

    updateProduct(product.id, {
      name: name.trim(),
      brand,
      sku: sku.trim(),
      category,
      categoryLabel: categoryLabel.trim(),
      subcategory: subcategory.trim(),
      subtitle: subtitle.trim(),
      price: Number(price),
      compareAt: compareAt ? Number(compareAt) : undefined,
      stock: Number(stock),
      image,
      badges,
      sizes: sizesArr,
      colors: colorsArr,
      shortDescription: shortDescription.trim(),
      description: description.trim(),
      materials: materialsArr,
      status,
      featured,
      trending,
      newArrival,
    });

    toast.success("PRODUCT UPDATED", { description: `${name} saved successfully.` });
    navigate({ to: "/superadmin/products" });
  };

  const handleDelete = () => {
    if (window.confirm(`Delete "${product.name}" permanently?`)) {
      deleteProduct(product.id);
      toast.success("PRODUCT REMOVED", { description: `${product.name} deleted.` });
      navigate({ to: "/superadmin/products" });
    }
  };

  return (
    <AdminLayout
      title={`EDIT PRODUCT: ${product.name}`}
      subtitle={`SKU: ${product.sku} • ID: ${product.id}`}
      action={
        <div className="flex items-center gap-2">
          <Link
            to="/superadmin/taxonomy"
            className="flex items-center gap-1.5 border-[2px] border-foreground bg-zap px-3 py-2 text-xs font-black uppercase press hover:bg-foreground hover:text-white"
          >
            <span>MANAGE ALL DROPDOWNS</span>
          </Link>
          <Link
            to="/product/$productId"
            params={{ productId: product.id }}
            target="_blank"
            className="flex items-center gap-1.5 border-[2px] border-foreground bg-background px-3 py-2 text-xs font-bold uppercase press hover:bg-smoke"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">LIVE PDP</span>
          </Link>
          <Link
            to="/superadmin/products"
            className="flex items-center gap-1.5 border-[2px] border-foreground bg-background px-3 py-2 text-xs font-bold uppercase press hover:bg-smoke"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">BACK</span>
          </Link>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          {/* Main Info */}
          <div className="space-y-6">
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-4">
              <h2 className="font-display text-lg font-black uppercase border-b-[2px] border-foreground pb-2">
                BASIC ATTRIBUTES
              </h2>

              <div>
                <label className="label-xs block mb-1">PRODUCT TITLE *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-[2px] border-foreground bg-smoke/40 p-3 text-sm font-bold uppercase focus:bg-background focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="label-xs">BRAND / LABEL *</label>
                    <button
                      type="button"
                      onClick={() => setInlineBrandOpen(!inlineBrandOpen)}
                      className="text-[0.65rem] font-bold text-flare underline hover:text-foreground"
                    >
                      {inlineBrandOpen ? "Cancel" : "+ Add Brand"}
                    </button>
                  </div>

                  {inlineBrandOpen ? (
                    <div className="flex gap-1.5 mb-2">
                      <input
                        type="text"
                        placeholder="New brand name"
                        value={inlineBrandInput}
                        onChange={(e) => setInlineBrandInput(e.target.value)}
                        className="flex-1 border-[2px] border-foreground p-2 text-xs font-bold uppercase bg-zap/20"
                      />
                      <button
                        type="button"
                        onClick={handleQuickAddBrand}
                        className="border-[2px] border-foreground bg-foreground text-background px-3 text-xs font-black uppercase"
                      >
                        SAVE
                      </button>
                    </div>
                  ) : null}

                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full border-[2px] border-foreground bg-smoke/40 p-3 text-xs font-bold uppercase"
                  >
                    {brands.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label-xs block mb-1">SKU *</label>
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
                  <div className="flex items-center justify-between mb-1">
                    <label className="label-xs">PRIMARY CATEGORY</label>
                    <button
                      type="button"
                      onClick={() => setInlineCatOpen(!inlineCatOpen)}
                      className="text-[0.65rem] font-bold text-flare underline hover:text-foreground"
                    >
                      {inlineCatOpen ? "Cancel" : "+ Add Category"}
                    </button>
                  </div>

                  {inlineCatOpen ? (
                    <div className="flex gap-1.5 mb-2">
                      <input
                        type="text"
                        placeholder="Category title"
                        value={inlineCatTitle}
                        onChange={(e) => setInlineCatTitle(e.target.value)}
                        className="flex-1 border-[2px] border-foreground p-2 text-xs font-bold uppercase bg-zap/20"
                      />
                      <button
                        type="button"
                        onClick={handleQuickAddCat}
                        className="border-[2px] border-foreground bg-foreground text-background px-3 text-xs font-black uppercase"
                      >
                        SAVE
                      </button>
                    </div>
                  ) : null}

                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border-[2px] border-foreground bg-smoke/40 p-3 text-xs font-bold uppercase"
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.title.replace("\n", " ")}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label-xs block mb-1">CATEGORY LABEL</label>
                  <input
                    type="text"
                    list="edit-category-labels-list"
                    value={categoryLabel}
                    onChange={(e) => setCategoryLabel(e.target.value)}
                    placeholder="e.g. Outerwear"
                    className="w-full border-[2px] border-foreground bg-smoke/40 p-3 text-xs font-bold uppercase"
                  />
                  <datalist id="edit-category-labels-list">
                    {categoryLabels.map((lbl) => (
                      <option key={lbl} value={lbl} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="label-xs block mb-1">SUBTITLE SPECIFICATION</label>
                  <input
                    type="text"
                    list="edit-subtitle-presets-list"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="e.g. Black / Unisex"
                    className="w-full border-[2px] border-foreground bg-smoke/40 p-3 text-xs font-bold uppercase"
                  />
                  <datalist id="edit-subtitle-presets-list">
                    {subtitlePresets.map((sub) => (
                      <option key={sub} value={sub} />
                    ))}
                  </datalist>
                </div>
              </div>
            </div>

            {/* Pricing and Stock */}
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow">
              <h2 className="font-display text-lg font-black uppercase mb-4 border-b-[2px] border-foreground pb-2">
                PRICING & STOCK
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
                  <label className="label-xs block mb-1">CURRENT STOCK UNITS *</label>
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

            {/* Description */}
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-4">
              <h2 className="font-display text-lg font-black uppercase mb-4 border-b-[2px] border-foreground pb-2">
                DESCRIPTIONS & MATERIALS
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
                <label className="label-xs block mb-1">DETAILED DESCRIPTION</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border-[2px] border-foreground bg-smoke/40 p-3 text-xs font-sans"
                />
              </div>

              <div>
                <label className="label-xs block mb-1">MATERIALS (1 PER LINE)</label>
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
                VARIANTS
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-xs block mb-1">SIZES (COMMA SEPARATED)</label>
                  <input
                    type="text"
                    value={sizes}
                    onChange={(e) => setSizes(e.target.value)}
                    className="w-full border-[2px] border-foreground bg-smoke/40 p-3 text-xs font-bold uppercase"
                  />
                </div>

                <div>
                  <label className="label-xs block mb-1">COLORS (COMMA SEPARATED)</label>
                  <input
                    type="text"
                    value={colors}
                    onChange={(e) => setColors(e.target.value)}
                    className="w-full border-[2px] border-foreground bg-smoke/40 p-3 text-xs font-bold uppercase"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-4">
              <h3 className="font-display text-sm font-black uppercase border-b-[2px] border-foreground pb-2">
                PUBLISH STATUS
              </h3>

              <div>
                <label className="label-xs block mb-1">VISIBILITY</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "active" | "draft")}
                  className={`w-full border-[2px] border-foreground p-3 text-xs font-black uppercase ${
                    status === "active" ? "bg-zap" : "bg-smoke"
                  }`}
                >
                  <option value="active">ACTIVE (PUBLIC)</option>
                  <option value="draft">DRAFT (HIDDEN)</option>
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
                  <span className="text-xs font-bold uppercase">FEATURED ON HOME</span>
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
                BADGES
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

            {/* Imagery & Upload */}
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-4">
              <ImageUploader
                value={image}
                onChange={(newImg) => {
                  setImage(newImg);
                  setGallery([newImg, p7, p3]);
                }}
                label="PRODUCT COVER IMAGE"
                presetImages={presetImages}
              />
            </div>

            {/* Save and Delete Actions */}
            <div className="space-y-2">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 border-[3px] border-foreground bg-zap py-4 text-sm font-black uppercase press brutal-shadow"
              >
                <Save className="h-5 w-5" />
                <span>SAVE CHANGES</span>
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="flex w-full items-center justify-center gap-2 border-[2px] border-destructive bg-destructive/10 py-3 text-xs font-black uppercase text-destructive press hover:bg-destructive hover:text-white"
              >
                <Trash2 className="h-4 w-4" />
                <span>DELETE PRODUCT</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
