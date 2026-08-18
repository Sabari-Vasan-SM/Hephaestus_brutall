import { createFileRoute } from "@tanstack/react-router";

const CONTENT: Record<string, { title: string; body: string[] }> = {
  about: {
    title: "About.",
    body: [
      "BRUTAL. is an independent label making heavyweight everyday pieces in runs of 300 or fewer.",
      "We design in Bangalore, cut and sew in Tiruppur, and ship worldwide.",
    ],
  },
  contact: {
    title: "Contact.",
    body: ["Email hello@brutal.store — we reply within one working day.", "Studio visits by appointment only."],
  },
  faq: {
    title: "FAQ.",
    body: [
      "Sizing: everything runs oversized. Take your usual size for a boxy fit, one down for regular.",
      "Restocks: limited pieces are not restocked. Sign up for drop alerts instead.",
    ],
  },
  shipping: {
    title: "Shipping.",
    body: ["Free shipping over ₹4,999. Metro delivery in 48 hours, rest of India in 4–6 days.", "Express delivery is ₹199."],
  },
  returns: {
    title: "Returns.",
    body: ["14-day returns on unworn items with tags attached.", "Refunds land within 5 working days of pickup."],
  },
  privacy: {
    title: "Privacy.",
    body: ["We store only what's needed to fulfil your order.", "We never sell your data."],
  },
  terms: {
    title: "Terms.",
    body: ["By shopping with BRUTAL. you agree to our sale, shipping and returns policies.", "Prices include all taxes."],
  },
};

export const Route = createFileRoute("/info/$slug")({
  head: ({ params }) => {
    const page = CONTENT[params.slug];
    const title = `${page?.title.replace(".", "") ?? "Information"} — BRUTAL.`;
    const description = page?.body[0] ?? "Information about shopping with BRUTAL.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: InfoPage,
});

function InfoPage() {
  const { slug } = Route.useParams();
  const page = CONTENT[slug];

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-[clamp(2.6rem,10vw,5rem)]">{page?.title ?? "Information."}</h1>
      <div className="mt-8 space-y-4 border-[3px] border-foreground p-6 brutal-shadow-sm">
        {(page?.body ?? ["This page is coming soon."]).map((p) => (
          <p key={p} className="text-sm leading-relaxed text-muted-foreground">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
