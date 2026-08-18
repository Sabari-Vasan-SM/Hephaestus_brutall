import { Link } from "@tanstack/react-router";
import { Heart, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge, Rating, badgeTone } from "@/components/brutal";
import type { Product } from "@/lib/data";
import { discountPct, inr } from "@/lib/format";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProductCard({ product, layout = "grid" }: { product: Product; layout?: "grid" | "list" }) {
  const { addToCart, toggleWishlist, inWishlist } = useStore();
  const [beat, setBeat] = useState(false);
  const saved = inWishlist(product.id);
  const off = discountPct(product.price, product.compareAt);

  const quickAdd = () => {
    addToCart(product, product.sizes[Math.min(2, product.sizes.length - 1)] ?? "One Size", product.colors[0] ?? "Black");
    toast.success("ADDED TO CART", { description: `${product.name} — ${product.colors[0] ?? ""}` });
  };

  const wish = () => {
    toggleWishlist(product.id);
    setBeat(true);
    window.setTimeout(() => setBeat(false), 400);
    toast(saved ? "REMOVED FROM WISHLIST" : "SAVED TO WISHLIST", { description: product.name });
  };

  return (
    <article
      className={cn(
        "group relative flex border-[3px] border-foreground bg-background brutal-shadow-sm transition-transform duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:brutal-shadow",
        layout === "list" ? "flex-row" : "flex-col",
      )}
    >
      <Link
        to="/product/$productId"
        params={{ productId: product.id }}
        className={cn(
          "relative block shrink-0 overflow-hidden border-foreground bg-muted",
          layout === "list" ? "w-32 border-r-[3px] sm:w-48" : "border-b-[3px]",
        )}
      >
        <img
          src={product.image}
          alt={product.name}
          width={800}
          height={800}
          loading="lazy"
          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 flex flex-col items-start gap-1">
          {product.badges.map((b) => (
            <Badge key={b} tone={badgeTone(b)}>
              {b}
            </Badge>
          ))}
        </span>
      </Link>

      <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <span className="label-xs text-muted-foreground">{product.categoryLabel}</span>
            <h3 className="mt-1 truncate text-base sm:text-lg">
              <Link to="/product/$productId" params={{ productId: product.id }} className="hover:underline">
                {product.name}
              </Link>
            </h3>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">{product.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={wish}
            aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={saved}
            className="shrink-0 border-2 border-foreground p-1.5 transition-colors hover:bg-zap"
          >
            <Heart
              width={16}
              height={16}
              strokeWidth={2.5}
              className={cn(saved && "fill-flare text-flare", beat && "animate-heart")}
            />
          </button>
        </div>

        <div className="mt-3">
          <Rating value={product.rating} count={product.reviewCount} />
        </div>

        <div className="mt-3 flex flex-wrap items-baseline gap-2">
          <span className="font-display text-xl font-black">{inr(product.price)}</span>
          {product.compareAt && (
            <>
              <span className="text-xs text-muted-foreground line-through">{inr(product.compareAt)}</span>
              <span className="label-xs bg-flare px-1.5 py-0.5 text-background">{off}% OFF</span>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={quickAdd}
          className="mt-4 flex w-full items-center justify-between border-[3px] border-foreground bg-background px-3 py-2.5 text-[0.7rem] font-bold uppercase tracking-[0.1em] transition-colors hover:bg-zap"
        >
          Add to cart <Plus width={14} height={14} strokeWidth={3} />
        </button>
      </div>
    </article>
  );
}
