import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { useStore } from "@/lib/store";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  LayoutTemplate,
  Save,
  RotateCcw,
  ExternalLink,
  Sparkles,
  Zap,
  Image as ImageIcon,
  Type,
  ListPlus,
  Trash2,
  Plus,
  Layers,
  Flame,
  MessageSquare,
  Globe,
  Share2,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p7 from "@/assets/p7.jpg";

export const Route = createFileRoute("/superadmin/page-editor")({
  head: () => ({
    meta: [
      { title: "Visual Page Editor & CMS — BRUTAL. Super Admin" },
      {
        name: "description",
        content: "Live CMS page editor to customize homepage hero, scrolling text, offers, manifesto, and footer.",
      },
    ],
  }),
  component: AdminPageEditor,
});

const presetHeroImages = [
  { label: "Classic Brutal Model (Hero)", src: heroImg },
  { label: "Null Heavy Tee (p1)", src: p1 },
  { label: "Cargo Pants Silhouette (p2)", src: p2 },
  { label: "Zap Neon Hoodie (p3)", src: p3 },
  { label: "Trucker Jacket (p7)", src: p7 },
];

type SectionTab = "HERO" | "MARQUEE" | "OFFERS" | "CATALOG_SECTIONS" | "MANIFESTO" | "FOOTER";

export function AdminPageEditor() {
  const { homeConfig, updateHomeConfig, resetHomeConfig, state, updateSettings } = useStore();

  const [activeTab, setActiveTab] = useState<SectionTab>("HERO");

  // Local form states initialized from store homeConfig
  const [heroBadge1, setHeroBadge1] = useState(homeConfig.hero.badge1);
  const [heroBadge2, setHeroBadge2] = useState(homeConfig.hero.badge2);
  const [headingLine1, setHeadingLine1] = useState(homeConfig.hero.headingLine1);
  const [headingLine2, setHeadingLine2] = useState(homeConfig.hero.headingLine2);
  const [headingHighlight, setHeadingHighlight] = useState(homeConfig.hero.headingHighlight);
  const [heroDesc, setHeroDesc] = useState(homeConfig.hero.description);
  const [ctaPrimaryText, setCtaPrimaryText] = useState(homeConfig.hero.ctaPrimaryText);
  const [ctaPrimaryLink, setCtaPrimaryLink] = useState(homeConfig.hero.ctaPrimaryLink);
  const [ctaSecondaryText, setCtaSecondaryText] = useState(homeConfig.hero.ctaSecondaryText);
  const [ctaSecondaryLink, setCtaSecondaryLink] = useState(homeConfig.hero.ctaSecondaryLink);
  const [heroStats, setHeroStats] = useState(homeConfig.hero.stats);
  const [heroImage, setHeroImage] = useState(homeConfig.hero.image || heroImg);
  const [customImageUrl, setCustomImageUrl] = useState("");
  const [sticker1, setSticker1] = useState(homeConfig.hero.sticker1);
  const [sticker2, setSticker2] = useState(homeConfig.hero.sticker2);
  const [sticker3, setSticker3] = useState(homeConfig.hero.sticker3);

  // Marquee
  const [marqueeTop, setMarqueeTop] = useState<string[]>(homeConfig.marqueeTop);
  const [newTopMarqueeInput, setNewTopMarqueeInput] = useState("");
  const [marqueeBottom, setMarqueeBottom] = useState<string[]>(homeConfig.marqueeBottom);
  const [newBottomMarqueeInput, setNewBottomMarqueeInput] = useState("");

  // Offers / Announcement
  const [announcementActive, setAnnouncementActive] = useState(state.settings.announcementActive);
  const [announcementText, setAnnouncementText] = useState(state.settings.announcement);

  // Sections
  const [featuredKicker, setFeaturedKicker] = useState(homeConfig.featuredKicker);
  const [featuredTitle, setFeaturedTitle] = useState(homeConfig.featuredTitle);
  const [trendingKicker, setTrendingKicker] = useState(homeConfig.trendingKicker);
  const [trendingTitle, setTrendingTitle] = useState(homeConfig.trendingTitle);

  // Manifesto
  const [manifestoHeading, setManifestoHeading] = useState(homeConfig.manifestoHeading);
  const [manifestoPillars, setManifestoPillars] = useState(homeConfig.manifestoPillars);

  // Footer
  const [footerTagline, setFooterTagline] = useState(homeConfig.footer.tagline);
  const [footerCopyright, setFooterCopyright] = useState(homeConfig.footer.copyright);
  const [newsletterTitle, setNewsletterTitle] = useState(homeConfig.footer.newsletterTitle);
  const [newsletterText, setNewsletterText] = useState(homeConfig.footer.newsletterText);
  const [socials, setSocials] = useState(homeConfig.footer.socials);
  const [newSocialLabel, setNewSocialLabel] = useState("");
  const [newSocialUrl, setNewSocialUrl] = useState("");

  // Sync state when store config changes
  useEffect(() => {
    setHeroBadge1(homeConfig.hero.badge1);
    setHeroBadge2(homeConfig.hero.badge2);
    setHeadingLine1(homeConfig.hero.headingLine1);
    setHeadingLine2(homeConfig.hero.headingLine2);
    setHeadingHighlight(homeConfig.hero.headingHighlight);
    setHeroDesc(homeConfig.hero.description);
    setCtaPrimaryText(homeConfig.hero.ctaPrimaryText);
    setCtaPrimaryLink(homeConfig.hero.ctaPrimaryLink);
    setCtaSecondaryText(homeConfig.hero.ctaSecondaryText);
    setCtaSecondaryLink(homeConfig.hero.ctaSecondaryLink);
    setHeroStats(homeConfig.hero.stats);
    setHeroImage(homeConfig.hero.image || heroImg);
    setSticker1(homeConfig.hero.sticker1);
    setSticker2(homeConfig.hero.sticker2);
    setSticker3(homeConfig.hero.sticker3);
    setMarqueeTop(homeConfig.marqueeTop);
    setMarqueeBottom(homeConfig.marqueeBottom);
    setFeaturedKicker(homeConfig.featuredKicker);
    setFeaturedTitle(homeConfig.featuredTitle);
    setTrendingKicker(homeConfig.trendingKicker);
    setTrendingTitle(homeConfig.trendingTitle);
    setManifestoHeading(homeConfig.manifestoHeading);
    setManifestoPillars(homeConfig.manifestoPillars);
    setFooterTagline(homeConfig.footer.tagline);
    setFooterCopyright(homeConfig.footer.copyright);
    setNewsletterTitle(homeConfig.footer.newsletterTitle);
    setNewsletterText(homeConfig.footer.newsletterText);
    setSocials(homeConfig.footer.socials);
    setAnnouncementActive(state.settings.announcementActive);
    setAnnouncementText(state.settings.announcement);
  }, [homeConfig, state.settings]);

  // SAVE ALL
  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    updateHomeConfig({
      hero: {
        badge1: heroBadge1.trim(),
        badge2: heroBadge2.trim(),
        headingLine1: headingLine1.trim(),
        headingLine2: headingLine2.trim(),
        headingHighlight: headingHighlight.trim(),
        description: heroDesc.trim(),
        ctaPrimaryText: ctaPrimaryText.trim(),
        ctaPrimaryLink: ctaPrimaryLink.trim(),
        ctaSecondaryText: ctaSecondaryText.trim(),
        ctaSecondaryLink: ctaSecondaryLink.trim(),
        stats: heroStats,
        image: customImageUrl.trim() ? customImageUrl.trim() : heroImage,
        sticker1: sticker1.trim(),
        sticker2: sticker2.trim(),
        sticker3: sticker3.trim(),
      },
      marqueeTop: marqueeTop.filter(Boolean),
      marqueeBottom: marqueeBottom.filter(Boolean),
      featuredKicker: featuredKicker.trim(),
      featuredTitle: featuredTitle.trim(),
      trendingKicker: trendingKicker.trim(),
      trendingTitle: trendingTitle.trim(),
      manifestoHeading: manifestoHeading.trim(),
      manifestoPillars: manifestoPillars.filter((p) => p.title.trim()),
      footer: {
        tagline: footerTagline.trim(),
        copyright: footerCopyright.trim(),
        newsletterTitle: newsletterTitle.trim(),
        newsletterText: newsletterText.trim(),
        socials: socials.filter((s) => s.label.trim()),
      },
    });

    updateSettings({
      announcementActive,
      announcement: announcementText.trim(),
    });

    toast.success("HOMEPAGE CUSTOMIZATIONS SAVED", {
      description: "All content, images, scrolling text, offers, and footer are live on the storefront.",
    });
  };

  const handleReset = () => {
    if (window.confirm("Reset all homepage content, hero banners, and footer back to default template?")) {
      resetHomeConfig();
      toast.info("HOMEPAGE RESET", { description: "Factory home content restored." });
    }
  };

  return (
    <AdminLayout
      title="PAGE EDITOR & CMS"
      subtitle="Customize your homepage screen, hero banners, scrolling marquee, flash offers, and footer in real-time."
      action={
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 border-[2px] border-foreground bg-background px-3 py-2 text-xs font-bold uppercase press hover:bg-smoke"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>RESET DEFAULTS</span>
          </button>
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-1.5 border-[2px] border-foreground bg-background px-3 py-2 text-xs font-bold uppercase press hover:bg-smoke"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>VIEW LIVE STOREFRONT</span>
          </Link>
          <button
            type="button"
            onClick={() => handleSave()}
            className="flex items-center gap-2 border-[2px] border-foreground bg-zap px-5 py-2 text-xs font-black uppercase press hover:bg-foreground hover:text-white"
          >
            <Save className="h-4 w-4" />
            <span>SAVE ALL CHANGES</span>
          </button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b-[3px] border-foreground pb-4">
          {[
            { id: "HERO", label: "1. HERO BANNER & STATS", icon: Sparkles },
            { id: "MARQUEE", label: "2. SCROLLING MARQUEE", icon: Type },
            { id: "OFFERS", label: "3. OFFERS & FLASH BAR", icon: Zap },
            { id: "CATALOG_SECTIONS", label: "4. SECTION TITLES", icon: Layers },
            { id: "MANIFESTO", label: "5. BRAND MANIFESTO", icon: MessageSquare },
            { id: "FOOTER", label: "6. FOOTER & SOCIALS", icon: Globe },
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as SectionTab)}
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
        {/* TAB 1: HERO BANNER & STATS */}
        {/* ======================================================== */}
        {activeTab === "HERO" && (
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
            <div className="space-y-6">
              {/* Headings & Badges */}
              <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-4">
                <h3 className="font-display text-lg font-black uppercase border-b-[2px] border-foreground pb-2">
                  HERO HEADINGS & BADGES
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-xs block mb-1">BADGE 1 (ACCENT YELLOW)</label>
                    <input
                      type="text"
                      value={heroBadge1}
                      onChange={(e) => setHeroBadge1(e.target.value)}
                      placeholder="e.g. DROP 04 / SS26"
                      className="w-full border-[2px] border-foreground bg-smoke/40 p-2.5 text-xs font-bold uppercase"
                    />
                  </div>
                  <div>
                    <label className="label-xs block mb-1">BADGE 2 (FLARE ORANGE)</label>
                    <input
                      type="text"
                      value={heroBadge2}
                      onChange={(e) => setHeroBadge2(e.target.value)}
                      placeholder="e.g. PIECES LIVE"
                      className="w-full border-[2px] border-foreground bg-smoke/40 p-2.5 text-xs font-bold uppercase"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="label-xs block mb-1">HEADING LINE 1</label>
                    <input
                      type="text"
                      value={headingLine1}
                      onChange={(e) => setHeadingLine1(e.target.value)}
                      placeholder="e.g. New"
                      className="w-full border-[2px] border-foreground bg-smoke/40 p-2.5 text-sm font-display font-black"
                    />
                  </div>
                  <div>
                    <label className="label-xs block mb-1">HEADING LINE 2</label>
                    <input
                      type="text"
                      value={headingLine2}
                      onChange={(e) => setHeadingLine2(e.target.value)}
                      placeholder="e.g. Season."
                      className="w-full border-[2px] border-foreground bg-smoke/40 p-2.5 text-sm font-display font-black"
                    />
                  </div>
                  <div>
                    <label className="label-xs block mb-1">HIGHLIGHT INK BOX</label>
                    <input
                      type="text"
                      value={headingHighlight}
                      onChange={(e) => setHeadingHighlight(e.target.value)}
                      placeholder="e.g. No rules."
                      className="w-full border-[2px] border-foreground bg-foreground text-background p-2.5 text-sm font-display font-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="label-xs block mb-1">HERO SUBTITLE DESCRIPTION</label>
                  <textarea
                    rows={3}
                    value={heroDesc}
                    onChange={(e) => setHeroDesc(e.target.value)}
                    placeholder="Describe your brand narrative..."
                    className="w-full border-[2px] border-foreground bg-smoke/40 p-2.5 text-xs font-sans"
                  />
                </div>
              </div>

              {/* Call to Actions & Links */}
              <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-4">
                <h3 className="font-display text-lg font-black uppercase border-b-[2px] border-foreground pb-2">
                  CALL TO ACTION BUTTONS
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2 border-[2px] border-foreground p-3 bg-smoke/30">
                    <span className="label-xs font-bold text-flare block">PRIMARY CTA BUTTON</span>
                    <input
                      type="text"
                      value={ctaPrimaryText}
                      onChange={(e) => setCtaPrimaryText(e.target.value)}
                      placeholder="e.g. SHOP NEW DROP"
                      className="w-full border-[2px] border-foreground p-2 text-xs font-bold uppercase"
                    />
                    <input
                      type="text"
                      value={ctaPrimaryLink}
                      onChange={(e) => setCtaPrimaryLink(e.target.value)}
                      placeholder="e.g. /shop"
                      className="w-full border-[2px] border-foreground p-2 text-xs font-mono"
                    />
                  </div>

                  <div className="space-y-2 border-[2px] border-foreground p-3 bg-smoke/30">
                    <span className="label-xs font-bold block">SECONDARY CTA BUTTON</span>
                    <input
                      type="text"
                      value={ctaSecondaryText}
                      onChange={(e) => setCtaSecondaryText(e.target.value)}
                      placeholder="e.g. EXPLORE ALL PIECES"
                      className="w-full border-[2px] border-foreground p-2 text-xs font-bold uppercase"
                    />
                    <input
                      type="text"
                      value={ctaSecondaryLink}
                      onChange={(e) => setCtaSecondaryLink(e.target.value)}
                      placeholder="e.g. /shop"
                      className="w-full border-[2px] border-foreground p-2 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Stat Counters */}
              <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-4">
                <h3 className="font-display text-lg font-black uppercase border-b-[2px] border-foreground pb-2">
                  HERO STAT COUNTERS
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {heroStats.map((stat, idx) => (
                    <div key={idx} className="border-[2px] border-foreground p-3 space-y-2 bg-smoke/40">
                      <label className="label-xs block text-muted-foreground">STAT #{idx + 1}</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => {
                          const updated = [...heroStats];
                          updated[idx] = { ...updated[idx]!, value: e.target.value };
                          setHeroStats(updated);
                        }}
                        placeholder="e.g. 300, 4.8★"
                        className="w-full border-[2px] border-foreground p-2 text-sm font-display font-black uppercase"
                      />
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                          const updated = [...heroStats];
                          updated[idx] = { ...updated[idx]!, label: e.target.value };
                          setHeroStats(updated);
                        }}
                        placeholder="e.g. UNITS / DROP"
                        className="w-full border-[2px] border-foreground p-2 text-[0.65rem] font-bold uppercase"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hero Image & Stickers Sidebar */}
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-6 lg:sticky lg:top-24">
              <h3 className="font-display text-lg font-black uppercase border-b-[2px] border-foreground pb-2 flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                HERO SHOWCASE IMAGE
              </h3>

              <div className="space-y-4">
                <div className="relative">
                  <ImageUploader
                    value={customImageUrl.trim() ? customImageUrl : heroImage}
                    onChange={(newImg) => {
                      setHeroImage(newImg);
                      setCustomImageUrl("");
                    }}
                    label="HERO COVER IMAGE"
                    presetImages={presetHeroImages}
                  />
                  {sticker1 && (
                    <span className="absolute left-2 top-8 label-xs border-2 border-foreground bg-background px-2 py-0.5 font-black z-10 pointer-events-none">
                      {sticker1}
                    </span>
                  )}
                  {sticker2 && (
                    <span className="absolute bottom-24 left-2 label-xs border-2 border-foreground bg-zap px-2 py-0.5 font-black z-10 pointer-events-none">
                      {sticker2}
                    </span>
                  )}
                  {sticker3 && (
                    <span className="absolute right-2 top-8 label-xs border-2 border-foreground bg-foreground text-background px-2 py-0.5 font-black z-10 pointer-events-none">
                      {sticker3}
                    </span>
                  )}
                </div>

                <div className="space-y-2 border-t-[2px] border-foreground pt-3">
                  <label className="label-xs block">FLOATING STICKER LABELS</label>
                  <input
                    type="text"
                    value={sticker1}
                    onChange={(e) => setSticker1(e.target.value)}
                    placeholder="Sticker 1 (Top Left)"
                    className="w-full border-[2px] border-foreground p-2 text-xs font-bold uppercase"
                  />
                  <input
                    type="text"
                    value={sticker2}
                    onChange={(e) => setSticker2(e.target.value)}
                    placeholder="Sticker 2 (Bottom Left)"
                    className="w-full border-[2px] border-foreground p-2 text-xs font-bold uppercase bg-zap/20"
                  />
                  <input
                    type="text"
                    value={sticker3}
                    onChange={(e) => setSticker3(e.target.value)}
                    placeholder="Sticker 3 (Top Right)"
                    className="w-full border-[2px] border-foreground p-2 text-xs font-bold uppercase bg-foreground text-background"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: SCROLLING MARQUEE */}
        {/* ======================================================== */}
        {activeTab === "MARQUEE" && (
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Top Marquee */}
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-4">
              <h3 className="font-display text-lg font-black uppercase border-b-[2px] border-foreground pb-2 flex items-center justify-between">
                <span>TOP SCROLLING BAR</span>
                <span className="label-xs bg-zap px-2 py-0.5 font-mono">{marqueeTop.length} PHRASES</span>
              </h3>

              <div className="space-y-2">
                {marqueeTop.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 border-[2px] border-foreground p-2 bg-smoke/40">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const next = [...marqueeTop];
                        next[idx] = e.target.value;
                        setMarqueeTop(next);
                      }}
                      className="flex-1 bg-transparent text-xs font-mono font-bold uppercase focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setMarqueeTop(marqueeTop.filter((_, i) => i !== idx))}
                      className="text-zinc-400 hover:text-destructive p-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={newTopMarqueeInput}
                  onChange={(e) => setNewTopMarqueeInput(e.target.value)}
                  placeholder="New phrase (e.g. 100% RAW COTTON)"
                  className="flex-1 border-[2px] border-foreground p-2 text-xs font-bold uppercase"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!newTopMarqueeInput.trim()) return;
                    setMarqueeTop([...marqueeTop, newTopMarqueeInput.trim().toUpperCase()]);
                    setNewTopMarqueeInput("");
                  }}
                  className="border-[2px] border-foreground bg-zap px-4 text-xs font-black uppercase press"
                >
                  + ADD
                </button>
              </div>
            </div>

            {/* Bottom Marquee */}
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-4">
              <h3 className="font-display text-lg font-black uppercase border-b-[2px] border-foreground pb-2 flex items-center justify-between">
                <span>BOTTOM SCROLLING BAR</span>
                <span className="label-xs bg-foreground text-background px-2 py-0.5 font-mono">{marqueeBottom.length} PHRASES</span>
              </h3>

              <div className="space-y-2">
                {marqueeBottom.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 border-[2px] border-foreground p-2 bg-smoke/40">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const next = [...marqueeBottom];
                        next[idx] = e.target.value;
                        setMarqueeBottom(next);
                      }}
                      className="flex-1 bg-transparent text-xs font-mono font-bold uppercase focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setMarqueeBottom(marqueeBottom.filter((_, i) => i !== idx))}
                      className="text-zinc-400 hover:text-destructive p-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={newBottomMarqueeInput}
                  onChange={(e) => setNewBottomMarqueeInput(e.target.value)}
                  placeholder="New phrase (e.g. 24/7 SUPPORT)"
                  className="flex-1 border-[2px] border-foreground p-2 text-xs font-bold uppercase"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!newBottomMarqueeInput.trim()) return;
                    setMarqueeBottom([...marqueeBottom, newBottomMarqueeInput.trim().toUpperCase()]);
                    setNewBottomMarqueeInput("");
                  }}
                  className="border-[2px] border-foreground bg-zap px-4 text-xs font-black uppercase press"
                >
                  + ADD
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: OFFERS & FLASH PROMO BAR */}
        {/* ======================================================== */}
        {activeTab === "OFFERS" && (
          <div className="max-w-2xl border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-6">
            <h3 className="font-display text-lg font-black uppercase border-b-[2px] border-foreground pb-2 flex items-center gap-2">
              <Zap className="h-4 w-4 text-flare" />
              FLASH PROMO & ANNOUNCEMENT BAR
            </h3>

            <div className="flex items-center justify-between border-[2px] border-foreground p-4 bg-smoke/40">
              <div>
                <p className="font-bold text-xs uppercase">SHOW FLASH PROMO BANNER ON HOME</p>
                <p className="text-[0.7rem] text-muted-foreground">Visible directly below the hero section.</p>
              </div>
              <input
                type="checkbox"
                checked={announcementActive}
                onChange={(e) => setAnnouncementActive(e.target.checked)}
                className="h-5 w-5 accent-foreground cursor-pointer"
              />
            </div>

            <div>
              <label className="label-xs block mb-1">ANNOUNCEMENT TEXT *</label>
              <textarea
                rows={3}
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                placeholder="e.g. FREE DOMESTIC SHIPPING OVER ₹4,999 • USE CODE 'BRUTAL10' FOR 10% OFF"
                className="w-full border-[2px] border-foreground p-3 text-xs font-mono font-bold uppercase"
              />
            </div>

            <div className="border border-zinc-200 p-3 bg-zap/20 text-[0.7rem] text-foreground">
              <p className="font-bold mb-0.5">⚡ Instant Preview</p>
              <p className="font-mono">{announcementText}</p>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: CATALOG SECTION HEADINGS */}
        {/* ======================================================== */}
        {activeTab === "CATALOG_SECTIONS" && (
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-4">
              <h3 className="font-display text-lg font-black uppercase border-b-[2px] border-foreground pb-2">
                FEATURED DROPS SECTION
              </h3>
              <div>
                <label className="label-xs block mb-1">SECTION KICKER</label>
                <input
                  type="text"
                  value={featuredKicker}
                  onChange={(e) => setFeaturedKicker(e.target.value)}
                  placeholder="e.g. FEATURED PICKS"
                  className="w-full border-[2px] border-foreground p-2.5 text-xs font-bold uppercase"
                />
              </div>
              <div>
                <label className="label-xs block mb-1">MAIN TITLE</label>
                <input
                  type="text"
                  value={featuredTitle}
                  onChange={(e) => setFeaturedTitle(e.target.value)}
                  placeholder="e.g. The drop."
                  className="w-full border-[2px] border-foreground p-2.5 text-sm font-display font-black uppercase"
                />
              </div>
            </div>

            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-4">
              <h3 className="font-display text-lg font-black uppercase border-b-[2px] border-foreground pb-2">
                TRENDING RADAR SECTION
              </h3>
              <div>
                <label className="label-xs block mb-1">SECTION KICKER</label>
                <input
                  type="text"
                  value={trendingKicker}
                  onChange={(e) => setTrendingKicker(e.target.value)}
                  placeholder="e.g. HIGH DEMAND"
                  className="w-full border-[2px] border-foreground p-2.5 text-xs font-bold uppercase"
                />
              </div>
              <div>
                <label className="label-xs block mb-1">MAIN TITLE</label>
                <input
                  type="text"
                  value={trendingTitle}
                  onChange={(e) => setTrendingTitle(e.target.value)}
                  placeholder="e.g. TRENDING RIGHT NOW"
                  className="w-full border-[2px] border-foreground p-2.5 text-sm font-display font-black uppercase"
                />
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: BRAND MANIFESTO */}
        {/* ======================================================== */}
        {activeTab === "MANIFESTO" && (
          <div className="space-y-6">
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-4 max-w-xl">
              <h3 className="font-display text-lg font-black uppercase border-b-[2px] border-foreground pb-2">
                MANIFESTO BIG HEADING
              </h3>
              <div>
                <label className="label-xs block mb-1">HEADING TEXT (SUPPORTS LINE BREAKS)</label>
                <textarea
                  rows={2}
                  value={manifestoHeading}
                  onChange={(e) => setManifestoHeading(e.target.value)}
                  placeholder="e.g. Built&#10;different."
                  className="w-full border-[2px] border-foreground p-2.5 text-base font-display font-black uppercase"
                />
              </div>
            </div>

            {/* Pillar Cards */}
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-4">
              <div className="flex items-center justify-between border-b-[2px] border-foreground pb-2">
                <h3 className="font-display text-lg font-black uppercase">BRAND PILLARS & VALUES</h3>
                <button
                  type="button"
                  onClick={() =>
                    setManifestoPillars([
                      ...manifestoPillars,
                      { title: "NEW PILLAR", desc: "Description of your brand value." },
                    ])
                  }
                  className="label-xs flex items-center gap-1 border-[2px] border-foreground bg-zap px-3 py-1 font-black uppercase press"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>+ ADD PILLAR</span>
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {manifestoPillars.map((p, idx) => (
                  <div key={idx} className="border-[2px] border-foreground p-4 bg-smoke/40 space-y-3 relative">
                    <button
                      type="button"
                      onClick={() => setManifestoPillars(manifestoPillars.filter((_, i) => i !== idx))}
                      className="absolute top-2 right-2 text-zinc-400 hover:text-destructive p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div>
                      <label className="label-xs block mb-1">PILLAR TITLE</label>
                      <input
                        type="text"
                        value={p.title}
                        onChange={(e) => {
                          const updated = [...manifestoPillars];
                          updated[idx] = { ...updated[idx]!, title: e.target.value };
                          setManifestoPillars(updated);
                        }}
                        className="w-full border-[2px] border-foreground p-2 text-xs font-display font-black uppercase"
                      />
                    </div>
                    <div>
                      <label className="label-xs block mb-1">DESCRIPTION</label>
                      <textarea
                        rows={3}
                        value={p.desc}
                        onChange={(e) => {
                          const updated = [...manifestoPillars];
                          updated[idx] = { ...updated[idx]!, desc: e.target.value };
                          setManifestoPillars(updated);
                        }}
                        className="w-full border-[2px] border-foreground p-2 text-xs font-sans"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: FOOTER & SOCIALS */}
        {/* ======================================================== */}
        {activeTab === "FOOTER" && (
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-4">
              <h3 className="font-display text-lg font-black uppercase border-b-[2px] border-foreground pb-2">
                FOOTER BRANDING & NEWSLETTER
              </h3>

              <div>
                <label className="label-xs block mb-1">LARGE FOOTER TAGLINE</label>
                <textarea
                  rows={4}
                  value={footerTagline}
                  onChange={(e) => setFooterTagline(e.target.value)}
                  placeholder="e.g. We make&#10;everyday&#10;objects&#10;less boring."
                  className="w-full border-[2px] border-foreground p-2.5 text-sm font-display font-black text-zap bg-foreground"
                />
              </div>

              <div>
                <label className="label-xs block mb-1">NEWSLETTER TITLE</label>
                <input
                  type="text"
                  value={newsletterTitle}
                  onChange={(e) => setNewsletterTitle(e.target.value)}
                  placeholder="e.g. GET THE DROP."
                  className="w-full border-[2px] border-foreground p-2.5 text-xs font-bold uppercase"
                />
              </div>

              <div>
                <label className="label-xs block mb-1">NEWSLETTER SUBTEXT</label>
                <input
                  type="text"
                  value={newsletterText}
                  onChange={(e) => setNewsletterText(e.target.value)}
                  placeholder="e.g. Secret codes 2h before limited runs."
                  className="w-full border-[2px] border-foreground p-2.5 text-xs font-sans"
                />
              </div>

              <div>
                <label className="label-xs block mb-1">COPYRIGHT TEXT</label>
                <input
                  type="text"
                  value={footerCopyright}
                  onChange={(e) => setFooterCopyright(e.target.value)}
                  placeholder="e.g. © 2026 BRUTAL. ALL RIGHTS RESERVED."
                  className="w-full border-[2px] border-foreground p-2.5 text-xs font-mono uppercase"
                />
              </div>
            </div>

            {/* Social Links Manager */}
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-4">
              <h3 className="font-display text-lg font-black uppercase border-b-[2px] border-foreground pb-2 flex items-center justify-between">
                <span>SOCIAL MEDIA HANDLES</span>
                <span className="label-xs bg-zap px-2 py-0.5 font-mono">{socials.length} LINKS</span>
              </h3>

              <div className="space-y-2">
                {socials.map((s, idx) => (
                  <div key={idx} className="flex items-center gap-2 border-[2px] border-foreground p-2 bg-smoke/40">
                    <input
                      type="text"
                      value={s.label}
                      onChange={(e) => {
                        const updated = [...socials];
                        updated[idx] = { ...updated[idx]!, label: e.target.value.toUpperCase() };
                        setSocials(updated);
                      }}
                      placeholder="LABEL (e.g. INSTAGRAM)"
                      className="w-28 border border-foreground p-1 text-xs font-bold uppercase"
                    />
                    <input
                      type="url"
                      value={s.url}
                      onChange={(e) => {
                        const updated = [...socials];
                        updated[idx] = { ...updated[idx]!, url: e.target.value };
                        setSocials(updated);
                      }}
                      placeholder="https://..."
                      className="flex-1 border border-foreground p-1 text-xs font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setSocials(socials.filter((_, i) => i !== idx))}
                      className="text-zinc-400 hover:text-destructive p-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-zinc-200 pt-3">
                <span className="label-xs font-bold block">+ ADD NEW SOCIAL LINK</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSocialLabel}
                    onChange={(e) => setNewSocialLabel(e.target.value)}
                    placeholder="e.g. DISCORD"
                    className="w-28 border-[2px] border-foreground p-2 text-xs font-bold uppercase"
                  />
                  <input
                    type="url"
                    value={newSocialUrl}
                    onChange={(e) => setNewSocialUrl(e.target.value)}
                    placeholder="https://discord.gg/..."
                    className="flex-1 border-[2px] border-foreground p-2 text-xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newSocialLabel.trim() || !newSocialUrl.trim()) return;
                      setSocials([
                        ...socials,
                        { label: newSocialLabel.trim().toUpperCase(), url: newSocialUrl.trim() },
                      ]);
                      setNewSocialLabel("");
                      setNewSocialUrl("");
                    }}
                    className="border-[2px] border-foreground bg-zap px-3 text-xs font-black uppercase press"
                  >
                    ADD
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Save Button at bottom */}
        <div className="flex justify-end pt-4 border-t-[3px] border-foreground">
          <button
            type="button"
            onClick={() => handleSave()}
            className="flex items-center gap-2 border-[3px] border-foreground bg-zap px-8 py-4 text-sm font-black uppercase press hover:bg-foreground hover:text-white brutal-shadow"
          >
            <Save className="h-5 w-5" />
            <span>SAVE ALL HOMEPAGE CHANGES</span>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
