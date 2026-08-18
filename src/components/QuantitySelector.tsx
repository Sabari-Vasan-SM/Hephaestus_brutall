import { Minus, Plus } from "lucide-react";

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 10,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="inline-flex items-stretch border-[3px] border-foreground">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="px-3 py-2 transition-colors hover:bg-zap disabled:opacity-30"
      >
        <Minus width={14} height={14} strokeWidth={3} />
      </button>
      <span className="grid w-10 place-items-center border-x-[3px] border-foreground font-display text-sm font-black">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="px-3 py-2 transition-colors hover:bg-zap disabled:opacity-30"
      >
        <Plus width={14} height={14} strokeWidth={3} />
      </button>
    </div>
  );
}
