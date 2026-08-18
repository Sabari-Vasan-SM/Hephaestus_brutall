const DEFAULT = [
  "NEW DROP",
  "LIMITED EDITION",
  "FREE SHIPPING OVER ₹4,999",
  "BRUTAL.",
  "NO RULES",
  "MADE IN INDIA",
];

export function Marquee({
  items = DEFAULT,
  invert = false,
}: {
  items?: string[];
  invert?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div
      className={
        "overflow-hidden border-y-[3px] border-foreground py-3 " +
        (invert ? "bg-zap text-foreground" : "bg-foreground text-background")
      }
    >
      <div className="flex w-max animate-marquee">
        {row.map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="font-display text-sm font-black uppercase tracking-[0.2em] sm:text-base">
              {item}
            </span>
            <span className="mx-6 text-flare" aria-hidden>
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
