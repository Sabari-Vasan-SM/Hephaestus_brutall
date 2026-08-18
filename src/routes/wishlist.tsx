import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — BRUTAL." },
      { name: "description", content: "Everything you've saved from the BRUTAL. drop, in one place." },
      { property: "og:title", content: "Your Wishlist — BRUTAL." },
      { property: "og:description", content: "Everything you've saved from the drop." },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { state } = useStore();
  const saved = products.filter((p) => state.wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10">
      <h1 className="text-[clamp(2.8rem,10vw,6rem)]">
        Your
        <br />
        wishlist.
      </h1>
      {saved.length === 0 ? (
        <div className="mt-10 border-[3px] border-foreground p-12 text-center brutal-shadow">
          <h2 className="text-3xl">Nothing saved.</h2>
          <p className="mt-2 text-sm text-muted-foreground">Tap the heart on anything you like.</p>
          <div className="mt-6 flex justify-center">
            <Link to="/shop" search={{}} className="label-xs border-[3px] border-foreground bg-zap px-6 py-4 press brutal-shadow-sm">
              BROWSE THE DROP
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {saved.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
