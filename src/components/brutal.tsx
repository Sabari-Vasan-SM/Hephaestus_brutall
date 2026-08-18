import { cva, type VariantProps } from "class-variance-authority";
import { Star } from "lucide-react";
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 border-[3px] border-foreground font-bold uppercase tracking-[0.08em] disabled:opacity-40 disabled:pointer-events-none select-none",
  {
    variants: {
      variant: {
        solid: "bg-foreground text-background brutal-shadow-sm press",
        zap: "bg-zap text-foreground brutal-shadow-sm press",
        flare: "bg-flare text-background brutal-shadow-sm press",
        outline: "bg-background text-foreground brutal-shadow-sm press",
        ghost: "bg-transparent border-transparent shadow-none hover:bg-muted",
      },
      size: {
        sm: "px-3 py-2 text-[0.7rem]",
        md: "px-5 py-3 text-xs",
        lg: "px-7 py-4 text-sm",
        icon: "h-11 w-11 p-0",
      },
      full: { true: "w-full", false: "" },
    },
    defaultVariants: { variant: "solid", size: "md", full: false },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, full, ...props }, ref) => (
    <button ref={ref} className={cn(buttonStyles({ variant, size, full }), className)} {...props} />
  ),
);
Button.displayName = "Button";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full border-[3px] border-foreground bg-background px-4 py-3 text-sm font-medium placeholder:text-muted-foreground focus:outline-none focus-visible:outline-3",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string | undefined;
  error?: string | undefined;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="label-xs mb-2 block">{label}</span>
      {children}
      {error ? (
        <span className="mt-1 block text-[0.7rem] font-bold uppercase text-destructive">
          {error}
        </span>
      ) : hint ? (
        <span className="mt-1 block text-[0.7rem] text-muted-foreground">{hint}</span>
      ) : null}
    </label>
  );
}

const badgeStyles = cva("inline-block border-2 border-foreground px-2 py-1 label-xs leading-none", {
  variants: {
    tone: {
      zap: "bg-zap text-foreground",
      flare: "bg-flare text-background",
      ink: "bg-foreground text-background",
      paper: "bg-background text-foreground",
    },
  },
  defaultVariants: { tone: "ink" },
});

export function Badge({
  children,
  tone,
  className,
}: { children: ReactNode; className?: string } & VariantProps<typeof badgeStyles>) {
  return <span className={cn(badgeStyles({ tone }), className)}>{children}</span>;
}

export function badgeTone(label: string) {
  if (label === "SALE") return "flare" as const;
  if (label === "NEW") return "zap" as const;
  if (label === "LIMITED") return "ink" as const;
  return "paper" as const;
}

export function Rating({
  value,
  count,
  size = 14,
}: {
  value: number;
  count?: number;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rated ${value} out of 5`}>
      <span className="flex" aria-hidden>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            width={size}
            height={size}
            strokeWidth={2.5}
            className={
              i <= Math.round(value) ? "fill-zap text-foreground" : "text-muted-foreground"
            }
          />
        ))}
      </span>
      <span className="text-[0.7rem] font-bold">{value.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-[0.7rem] text-muted-foreground">({count})</span>
      )}
    </div>
  );
}

export function SectionTitle({ children, kicker }: { children: ReactNode; kicker?: string }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {kicker && (
          <span className="label-xs mb-3 inline-block bg-foreground px-2 py-1 text-background">
            {kicker}
          </span>
        )}
        <h2 className="text-[clamp(2.5rem,8vw,5rem)]">{children}</h2>
      </div>
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse border-[3px] border-foreground bg-muted", className)} />;
}
