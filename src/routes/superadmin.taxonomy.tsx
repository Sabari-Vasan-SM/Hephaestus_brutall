import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStore } from "@/lib/store";
import { useState } from "react";
import { toast } from "sonner";
import {
  Tag,
  Plus,
  Trash2,
  FolderTree,
  Bookmark,
  Layers,
  Sparkles,
  CheckCircle,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/brutal";
import p1 from "@/assets/p1.jpg";

export const Route = createFileRoute("/superadmin/taxonomy")({
  head: () => ({
    meta: [
      { title: "Taxonomy & Dropdowns — BRUTAL. Super Admin" },
      {
        name: "description",
        content: "Manage dynamic brands, categories, labels, and dropdown items directly from the UI.",
      },
    ],
  }),
  component: AdminTaxonomyPage,
});

type TabType = "BRANDS" | "CATEGORIES" | "LABELS" | "SUBTITLES" | "BADGES";

export function AdminTaxonomyPage() {
  const {
    brands,
    categories,
    categoryLabels,
    subtitlePresets,
    badges,
    addBrand,
    deleteBrand,
    addCategory,
    deleteCategory,
    addCategoryLabel,
    deleteCategoryLabel,
    addSubtitlePreset,
    deleteSubtitlePreset,
    addBadge,
    deleteBadge,
    products,
  } = useStore();

  const [activeTab, setActiveTab] = useState<TabType>("BRANDS");

  // Inputs for adding new items
  const [newBrandInput, setNewBrandInput] = useState("");
  const [newLabelInput, setNewLabelInput] = useState("");
  const [newSubtitleInput, setNewSubtitleInput] = useState("");
  const [newBadgeInput, setNewBadgeInput] = useState("");

  // New Category Form State
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [catTitle, setCatTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [catDesc, setCatDesc] = useState("");
  const [catImage, setCatImage] = useState(p1);

  // BRAND HANDLERS
  const handleAddBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrandInput.trim()) return;
    addBrand(newBrandInput.trim());
    toast.success("BRAND ADDED", { description: `${newBrandInput.trim()} is now available in all product dropdowns.` });
    setNewBrandInput("");
  };

  const handleDeleteBrand = (brandName: string) => {
    const usageCount = products.filter((p) => p.brand === brandName).length;
    if (
      usageCount > 0 &&
      !window.confirm(
        `Warning: ${usageCount} product(s) are currently tagged with "${brandName}". Are you sure you want to remove it from dropdowns?`,
      )
    ) {
      return;
    }
    deleteBrand(brandName);
    toast.info("BRAND REMOVED", { description: `${brandName} deleted from dropdown options.` });
  };

  // CATEGORY HANDLERS
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catTitle.trim() || !catSlug.trim()) {
      toast.error("MISSING FIELDS", { description: "Please enter category title and slug." });
      return;
    }
    addCategory({
      title: catTitle.trim(),
      slug: catSlug.trim().toLowerCase().replace(/\s+/g, "-"),
      desc: catDesc.trim() || "Archival collection and silhouettes.",
      image: catImage,
    });
    toast.success("PRIMARY CATEGORY ADDED", {
      description: `${catTitle.trim()} is now active across store catalog and filters.`,
    });
    setCatTitle("");
    setCatSlug("");
    setCatDesc("");
    setShowCategoryModal(false);
  };

  const handleDeleteCategory = (slug: string, title: string) => {
    const usageCount = products.filter((p) => p.category === slug).length;
    if (
      usageCount > 0 &&
      !window.confirm(
        `Warning: ${usageCount} product(s) are in category "${title}". Are you sure you want to remove this category?`,
      )
    ) {
      return;
    }
    deleteCategory(slug);
    toast.info("CATEGORY REMOVED", { description: `${title} deleted from store dropdowns.` });
  };

  // LABEL HANDLERS
  const handleAddLabel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabelInput.trim()) return;
    addCategoryLabel(newLabelInput.trim());
    toast.success("CATEGORY LABEL ADDED", { description: newLabelInput.trim() });
    setNewLabelInput("");
  };

  const handleDeleteLabel = (label: string) => {
    deleteCategoryLabel(label);
    toast.info("LABEL REMOVED", { description: label });
  };

  // SUBTITLE HANDLERS
  const handleAddSubtitle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubtitleInput.trim()) return;
    addSubtitlePreset(newSubtitleInput.trim());
    toast.success("SUBTITLE PRESET ADDED", { description: newSubtitleInput.trim() });
    setNewSubtitleInput("");
  };

  const handleDeleteSubtitle = (subtitle: string) => {
    deleteSubtitlePreset(subtitle);
    toast.info("SUBTITLE PRESET REMOVED", { description: subtitle });
  };

  // BADGE HANDLERS
  const handleAddBadge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBadgeInput.trim()) return;
    addBadge(newBadgeInput.trim().toUpperCase());
    toast.success("BADGE ADDED", { description: newBadgeInput.trim().toUpperCase() });
    setNewBadgeInput("");
  };

  const handleDeleteBadge = (badge: string) => {
    deleteBadge(badge);
    toast.info("BADGE REMOVED", { description: badge });
  };

  return (
    <AdminLayout
      title="DROPDOWNS & TAXONOMY MANAGER"
      subtitle="Add, customize, or delete Brands, Categories, Labels, Subtitles, and Badges directly in the UI."
      action={
        <Link
          to="/superadmin/products/new"
          className="flex items-center gap-2 border-[2px] border-foreground bg-zap px-4 py-2 text-xs font-black uppercase press hover:bg-foreground hover:text-white"
        >
          <Plus className="h-4 w-4" />
          <span>CREATE PRODUCT WITH NEW DROPDOWNS</span>
        </Link>
      }
    >
      <div className="space-y-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b-[3px] border-foreground pb-4">
          {[
            { id: "BRANDS", label: `BRANDS / LABELS (${brands.length})`, icon: Tag },
            { id: "CATEGORIES", label: `PRIMARY CATEGORIES (${categories.length})`, icon: FolderTree },
            { id: "LABELS", label: `CATEGORY LABELS (${categoryLabels.length})`, icon: Layers },
            { id: "SUBTITLES", label: `SUBTITLE PRESETS (${subtitlePresets.length})`, icon: Bookmark },
            { id: "BADGES", label: `PRODUCT BADGES (${badges.length})`, icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`label-xs flex items-center gap-2 border-[2px] border-foreground px-4 py-3 font-black uppercase transition-colors press ${
                  isCurrent ? "bg-foreground text-background brutal-shadow-sm" : "bg-background hover:bg-zap"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* TAB 1: BRANDS */}
        {/* ======================================================== */}
        {activeTab === "BRANDS" && (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
            {/* Brands List */}
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-6">
              <div className="flex items-center justify-between border-b-[2px] border-foreground pb-3">
                <div>
                  <h2 className="font-display text-xl font-black uppercase">STORE BRANDS & LABELS</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    These appear in the Brand dropdown in Product Creation and Catalog Filters.
                  </p>
                </div>
                <span className="label-xs bg-foreground px-2.5 py-1 text-background font-mono">
                  {brands.length} LABELS
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {brands.map((brandName) => {
                  const count = products.filter((p) => p.brand === brandName).length;
                  return (
                    <div
                      key={brandName}
                      className="flex items-center justify-between border-[2px] border-foreground p-4 bg-smoke/40 hover:bg-white transition-colors"
                    >
                      <div>
                        <p className="font-display text-sm font-black uppercase">{brandName}</p>
                        <p className="font-mono text-[0.65rem] text-muted-foreground mt-0.5">
                          {count} active piece{count === 1 ? "" : "s"}
                        </p>
                      </div>

                      <button
                        type="button"
                        aria-label={`Delete brand ${brandName}`}
                        onClick={() => handleDeleteBrand(brandName)}
                        className="border border-foreground p-1.5 hover:bg-destructive hover:text-white transition-colors press"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Add Brand Box */}
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-4 lg:sticky lg:top-24">
              <h3 className="label-xs font-black uppercase border-b-[2px] border-foreground pb-2 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                ADD NEW BRAND / LABEL
              </h3>

              <form onSubmit={handleAddBrand} className="space-y-3">
                <div>
                  <label className="label-xs block mb-1">BRAND NAME *</label>
                  <input
                    type="text"
                    required
                    value={newBrandInput}
                    onChange={(e) => setNewBrandInput(e.target.value)}
                    placeholder="e.g. CYBER ARCHIVE, KAIJU WEAR"
                    className="w-full border-[2px] border-foreground p-2.5 text-xs font-bold uppercase focus:outline-none focus:bg-zap/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full border-[2px] border-foreground bg-zap py-3 text-xs font-black uppercase press hover:bg-foreground hover:text-white"
                >
                  + ADD BRAND TO DROPDOWN
                </button>
              </form>

              <div className="border border-zinc-200 p-3 bg-smoke/60 text-[0.7rem] text-muted-foreground">
                <p className="font-bold text-foreground mb-1">💡 Real-time synchronization</p>
                Any brand added here is immediately selectable when creating or editing products, without refreshing.
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: PRIMARY CATEGORIES */}
        {/* ======================================================== */}
        {activeTab === "CATEGORIES" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b-[2px] border-foreground pb-4">
              <div>
                <h2 className="font-display text-xl font-black uppercase">PRIMARY PRODUCT CATEGORIES</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Main store collections powering the navigation menu, shop filters, and catalog sections.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCategoryModal(true)}
                className="label-xs flex items-center gap-2 border-[2px] border-foreground bg-zap px-4 py-2.5 font-black uppercase press hover:bg-foreground hover:text-white"
              >
                <Plus className="h-4 w-4" />
                <span>+ ADD NEW CATEGORY</span>
              </button>
            </div>

            {/* Category Cards Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat) => {
                const count = products.filter((p) => p.category === cat.slug).length;
                return (
                  <div
                    key={cat.slug}
                    className="border-[3px] border-foreground bg-background p-5 brutal-shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="font-mono text-[0.65rem] uppercase border border-foreground px-1.5 py-0.5 bg-smoke">
                            SLUG: {cat.slug}
                          </span>
                          <h3 className="font-display text-lg font-black uppercase mt-1">{cat.title.replace("\n", " ")}</h3>
                        </div>
                        <button
                          type="button"
                          aria-label={`Delete category ${cat.title}`}
                          onClick={() => handleDeleteCategory(cat.slug, cat.title)}
                          className="border border-foreground p-1.5 hover:bg-destructive hover:text-white transition-colors press"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {cat.desc && <p className="text-xs text-muted-foreground mt-2">{cat.desc}</p>}
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-200 flex items-center justify-between text-xs">
                      <span className="font-bold">{count} piece{count === 1 ? "" : "s"} in catalog</span>
                      <Link
                        to="/shop"
                        search={{ category: cat.slug }}
                        className="label-xs flex items-center gap-1 font-bold underline hover:text-flare"
                      >
                        <span>VIEW IN STORE</span>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal for Creating Category */}
            {showCategoryModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                <div className="w-full max-w-md border-[3px] border-foreground bg-background p-6 brutal-shadow-lg animate-pop space-y-4">
                  <h3 className="font-display text-xl font-black uppercase border-b-[2px] border-foreground pb-2">
                    ADD NEW PRIMARY CATEGORY
                  </h3>

                  <form onSubmit={handleAddCategory} className="space-y-4">
                    <div>
                      <label className="label-xs block mb-1">CATEGORY DISPLAY TITLE *</label>
                      <input
                        type="text"
                        required
                        value={catTitle}
                        onChange={(e) => {
                          setCatTitle(e.target.value);
                          if (!catSlug) setCatSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
                        }}
                        placeholder="e.g. Outerwear, Denim, Footwear"
                        className="w-full border-[2px] border-foreground p-2.5 text-xs font-bold uppercase"
                      />
                    </div>

                    <div>
                      <label className="label-xs block mb-1">URL SLUG (IDENTIFIER) *</label>
                      <input
                        type="text"
                        required
                        value={catSlug}
                        onChange={(e) => setCatSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                        placeholder="e.g. outerwear"
                        className="w-full border-[2px] border-foreground p-2.5 text-xs font-mono font-bold lowercase"
                      />
                    </div>

                    <div>
                      <label className="label-xs block mb-1">SHORT DESCRIPTION</label>
                      <textarea
                        rows={2}
                        value={catDesc}
                        onChange={(e) => setCatDesc(e.target.value)}
                        placeholder="e.g. Heavyweight architectural outerwear and coats."
                        className="w-full border-[2px] border-foreground p-2.5 text-xs font-sans"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        className="flex-1 border-[2px] border-foreground bg-zap py-3 text-xs font-black uppercase press hover:bg-foreground hover:text-white"
                      >
                        SAVE & PUBLISH CATEGORY
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCategoryModal(false)}
                        className="border-[2px] border-foreground bg-smoke px-4 py-3 text-xs font-bold uppercase press"
                      >
                        CANCEL
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: CATEGORY LABELS (Subcategories) */}
        {/* ======================================================== */}
        {activeTab === "LABELS" && (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-6">
              <div className="flex items-center justify-between border-b-[2px] border-foreground pb-3">
                <div>
                  <h2 className="font-display text-xl font-black uppercase">CATEGORY LABELS (SUBCATEGORIES)</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Predefined garment types shown in product card pills and specification tags.
                  </p>
                </div>
                <span className="label-xs bg-foreground px-2.5 py-1 text-background font-mono">
                  {categoryLabels.length} LABELS
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {categoryLabels.map((lbl) => (
                  <div
                    key={lbl}
                    className="flex items-center gap-2 border-[2px] border-foreground bg-smoke/40 px-3 py-2 text-xs font-bold uppercase"
                  >
                    <span>{lbl}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteLabel(lbl)}
                      className="text-zinc-400 hover:text-destructive transition-colors ml-1"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Add Label Form */}
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-4 lg:sticky lg:top-24">
              <h3 className="label-xs font-black uppercase border-b-[2px] border-foreground pb-2 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                ADD NEW CATEGORY LABEL
              </h3>

              <form onSubmit={handleAddLabel} className="space-y-3">
                <div>
                  <label className="label-xs block mb-1">LABEL NAME *</label>
                  <input
                    type="text"
                    required
                    value={newLabelInput}
                    onChange={(e) => setNewLabelInput(e.target.value)}
                    placeholder="e.g. Leather Jackets, Tactical Pants"
                    className="w-full border-[2px] border-foreground p-2.5 text-xs font-bold uppercase focus:outline-none focus:bg-zap/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full border-[2px] border-foreground bg-zap py-3 text-xs font-black uppercase press hover:bg-foreground hover:text-white"
                >
                  + ADD LABEL TO PRESETS
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: SUBTITLE PRESETS */}
        {/* ======================================================== */}
        {activeTab === "SUBTITLES" && (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-6">
              <div className="flex items-center justify-between border-b-[2px] border-foreground pb-3">
                <div>
                  <h2 className="font-display text-xl font-black uppercase">SUBTITLE PRESETS & FABRIC CUTS</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Predefined secondary descriptions (e.g. GSM weight, silhouette cut, drape).
                  </p>
                </div>
                <span className="label-xs bg-foreground px-2.5 py-1 text-background font-mono">
                  {subtitlePresets.length} PRESETS
                </span>
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2">
                {subtitlePresets.map((sub) => (
                  <div
                    key={sub}
                    className="flex items-center justify-between border-[2px] border-foreground bg-smoke/40 p-3 text-xs font-mono font-bold"
                  >
                    <span className="truncate pr-2">{sub}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteSubtitle(sub)}
                      className="text-zinc-400 hover:text-destructive transition-colors shrink-0"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Add Subtitle Form */}
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-4 lg:sticky lg:top-24">
              <h3 className="label-xs font-black uppercase border-b-[2px] border-foreground pb-2 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                ADD SUBTITLE PRESET
              </h3>

              <form onSubmit={handleAddSubtitle} className="space-y-3">
                <div>
                  <label className="label-xs block mb-1">SUBTITLE TEXT *</label>
                  <input
                    type="text"
                    required
                    value={newSubtitleInput}
                    onChange={(e) => setNewSubtitleInput(e.target.value)}
                    placeholder="e.g. Washed Charcoal / 380 GSM"
                    className="w-full border-[2px] border-foreground p-2.5 text-xs font-mono focus:outline-none focus:bg-zap/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full border-[2px] border-foreground bg-zap py-3 text-xs font-black uppercase press hover:bg-foreground hover:text-white"
                >
                  + ADD SUBTITLE PRESET
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: BADGES */}
        {/* ======================================================== */}
        {activeTab === "BADGES" && (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-6">
              <div className="flex items-center justify-between border-b-[2px] border-foreground pb-3">
                <div>
                  <h2 className="font-display text-xl font-black uppercase">PRODUCT BADGES & TAGS</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Visual badges attached to product cards and PDP headers.
                  </p>
                </div>
                <span className="label-xs bg-foreground px-2.5 py-1 text-background font-mono">
                  {badges.length} BADGES
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                {badges.map((b) => (
                  <div
                    key={b}
                    className="flex items-center gap-2 border-[2px] border-foreground bg-white p-2 brutal-shadow-sm"
                  >
                    <span className="label-xs font-black px-2 py-0.5 bg-zap">{b}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteBadge(b)}
                      className="text-zinc-400 hover:text-destructive transition-colors ml-1"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Add Badge Form */}
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-4 lg:sticky lg:top-24">
              <h3 className="label-xs font-black uppercase border-b-[2px] border-foreground pb-2 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                ADD PRODUCT BADGE
              </h3>

              <form onSubmit={handleAddBadge} className="space-y-3">
                <div>
                  <label className="label-xs block mb-1">BADGE TEXT *</label>
                  <input
                    type="text"
                    required
                    value={newBadgeInput}
                    onChange={(e) => setNewBadgeInput(e.target.value.toUpperCase())}
                    placeholder="e.g. ARCHIVE, RESTOCKED, FINAL RUN"
                    className="w-full border-[2px] border-foreground p-2.5 text-xs font-black uppercase focus:outline-none focus:bg-zap/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full border-[2px] border-foreground bg-zap py-3 text-xs font-black uppercase press hover:bg-foreground hover:text-white"
                >
                  + ADD BADGE TO PRESETS
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
