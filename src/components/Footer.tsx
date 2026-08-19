import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button, Input } from "@/components/brutal";
import { useStore } from "@/lib/store";

const shopLinks = [
  { label: "SHOP ALL", to: "/shop" as const, search: {} },
  { label: "MEN", to: "/shop" as const, search: { category: "men" } },
  { label: "WOMEN", to: "/shop" as const, search: { category: "women" } },
  { label: "ACCESSORIES", to: "/shop" as const, search: { category: "accessories" } },
  { label: "SALE", to: "/shop" as const, search: { sale: true } },
];

const infoLinks = ["ABOUT", "CONTACT", "FAQ", "SHIPPING", "RETURNS", "PRIVACY", "TERMS"];

export function Footer() {
  const { homeConfig, state } = useStore();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const footer = homeConfig.footer;

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError("Enter a valid email");
      return;
    }
    setError("");
    setEmail("");
    toast.success("YOU'RE ON THE LIST", { description: "Drop alerts incoming." });
  };

  return (
    <footer className="border-t-[3px] border-foreground bg-foreground text-background">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-10">
        <div>
          <span className="font-display text-4xl font-black tracking-tight">{state.settings.storeName || "BRUTAL."}</span>
          <h2 className="mt-6 text-[clamp(1.8rem,5vw,2.8rem)] leading-[0.95] text-zap whitespace-pre-line">
            {footer.tagline}
          </h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {footer.socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer noopener"
                className="label-xs border-2 border-background px-3 py-2 transition-colors hover:bg-zap hover:text-foreground font-black"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Shop" className="space-y-3">
          <h3 className="label-xs text-zap">SHOP</h3>
          {shopLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              search={l.search}
              className="block text-sm font-bold uppercase tracking-wide hover:text-zap"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="space-y-3">
          <h3 className="label-xs text-zap">INFO & ADMIN</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-1">
            {infoLinks.map((l) => (
              <Link
                key={l}
                to="/info/$slug"
                params={{ slug: l.toLowerCase() }}
                className="text-sm font-bold uppercase hover:text-zap"
              >
                {l}
              </Link>
            ))}
            <Link
              to="/superadmin"
              className="text-sm font-black uppercase text-zap underline hover:text-white"
            >
              SUPER ADMIN →
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t-[3px] border-background/40">
        <form
          onSubmit={subscribe}
          className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:px-10"
        >
          <div className="lg:w-1/3 space-y-1">
            <h3 className="text-[clamp(1.6rem,4vw,2.4rem)] text-background uppercase font-black leading-tight">
              {footer.newsletterTitle || "Get the drop."}
            </h3>
            {footer.newsletterText && (
              <p className="text-xs text-background/70 font-mono">{footer.newsletterText}</p>
            )}
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:flex-1">
            <div className="flex-1">
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <Input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOU@EMAIL.COM"
                className="border-background bg-foreground text-background placeholder:text-background/50"
                aria-invalid={!!error}
              />
              {error && <p className="mt-1 text-[0.7rem] font-bold uppercase text-zap">{error}</p>}
            </div>
            <Button type="submit" variant="zap" size="lg">
              Subscribe <ArrowRight width={16} height={16} strokeWidth={3} />
            </Button>
          </div>
        </form>
      </div>

      <div className="border-t-[3px] border-background/40 px-4 py-5 text-center sm:px-6 lg:px-10">
        <p className="label-xs text-background/60 uppercase font-mono font-bold">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
