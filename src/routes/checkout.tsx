import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button, Field, Input } from "@/components/brutal";
import { OrderSummary } from "@/routes/cart";
import { inr } from "@/lib/format";
import { useStore } from "@/lib/store";
import { z } from "zod";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — BRUTAL." },
      {
        name: "description",
        content: "Complete your BRUTAL. order: shipping, delivery speed and payment.",
      },
      { property: "og:title", content: "Checkout — BRUTAL." },
      { property: "og:description", content: "Complete your order." },
    ],
  }),
  component: Checkout,
});

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s]{8,15}$/, "Enter a valid phone number"),
  fullName: z.string().trim().min(2, "Enter your full name").max(100),
  address: z.string().trim().min(5, "Enter your address").max(200),
  city: z.string().trim().min(2, "Enter your city").max(80),
  state: z.string().trim().min(2, "Enter your state").max(80),
  postalCode: z
    .string()
    .trim()
    .regex(/^[0-9]{5,6}$/, "Enter a valid postal code"),
  country: z.string().trim().min(2).max(80),
});

const DELIVERY = [
  { id: "STANDARD", title: "STANDARD DELIVERY", note: "4–6 business days", cost: 0 },
  { id: "EXPRESS", title: "EXPRESS DELIVERY", note: "1–2 business days", cost: 199 },
];

const PAYMENTS = [
  { id: "UPI", title: "UPI", note: "GPay, PhonePe, Paytm" },
  { id: "CARD", title: "CREDIT / DEBIT CARD", note: "Visa, Mastercard, Rupay" },
  { id: "NETBANKING", title: "NET BANKING", note: "All major banks" },
  { id: "COD", title: "CASH ON DELIVERY", note: "₹49 handling fee" },
];

function Checkout() {
  const { cartLines, totals, placeOrder, state } = useStore();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: state.user?.email ?? "",
    phone: "",
    fullName: state.user?.name ?? "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [delivery, setDelivery] = useState("STANDARD");
  const [payment, setPayment] = useState("UPI");
  const [submitting, setSubmitting] = useState(false);

  const deliveryCost = DELIVERY.find((d) => d.id === delivery)?.cost ?? 0;
  const codFee = payment === "COD" ? 49 : 0;
  const grand = totals.total + deliveryCost + codFee;

  const field = (k: keyof typeof values) => ({
    value: values[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues((v) => ({ ...v, [k]: e.target.value })),
  });

  if (cartLines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-[clamp(2.5rem,9vw,5rem)]">Nothing to pay for.</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Your cart is empty, so checkout is on hold.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            to="/shop"
            search={{}}
            className="label-xs inline-flex border-[3px] border-foreground bg-zap px-6 py-4 press brutal-shadow-sm"
          >
            BROWSE THE DROP
          </Link>
        </div>
      </div>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      toast.error("CHECK THE FORM", { description: "Some fields need fixing." });
      return;
    }
    setErrors({});
    setSubmitting(true);
    window.setTimeout(() => {
      const order = placeOrder({
        email: parsed.data.email,
        address: {
          fullName: parsed.data.fullName,
          address: parsed.data.address,
          city: parsed.data.city,
          state: parsed.data.state,
          postalCode: parsed.data.postalCode,
          country: parsed.data.country,
        },
        delivery,
        payment,
      });
      setSubmitting(false);
      toast.success("ORDER PLACED", { description: order.id });
      navigate({ to: "/order/$orderId", params: { orderId: order.id } });
    }, 700);
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10">
      <h1 className="text-[clamp(2.8rem,10vw,6rem)]">
        Check
        <br />
        out.
      </h1>

      <form onSubmit={submit} className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
        <div className="space-y-6">
          <fieldset className="border-[3px] border-foreground p-5 brutal-shadow-sm">
            <legend className="label-xs bg-foreground px-2 py-1 text-background">
              CONTACT INFORMATION
            </legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="EMAIL" error={errors["email"]}>
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  {...field("email")}
                />
              </Field>
              <Field label="PHONE" error={errors["phone"]}>
                <Input
                  type="tel"
                  autoComplete="tel"
                  placeholder="98765 43210"
                  {...field("phone")}
                />
              </Field>
            </div>
          </fieldset>

          <fieldset className="border-[3px] border-foreground p-5 brutal-shadow-sm">
            <legend className="label-xs bg-foreground px-2 py-1 text-background">
              SHIPPING ADDRESS
            </legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="FULL NAME" error={errors["fullName"]}>
                  <Input autoComplete="name" {...field("fullName")} />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="ADDRESS" error={errors["address"]}>
                  <Input autoComplete="street-address" {...field("address")} />
                </Field>
              </div>
              <Field label="CITY" error={errors["city"]}>
                <Input autoComplete="address-level2" {...field("city")} />
              </Field>
              <Field label="STATE" error={errors["state"]}>
                <Input autoComplete="address-level1" {...field("state")} />
              </Field>
              <Field label="POSTAL CODE" error={errors["postalCode"]}>
                <Input inputMode="numeric" autoComplete="postal-code" {...field("postalCode")} />
              </Field>
              <Field label="COUNTRY" error={errors["country"]}>
                <Input autoComplete="country-name" {...field("country")} />
              </Field>
            </div>
          </fieldset>

          <fieldset className="border-[3px] border-foreground p-5 brutal-shadow-sm">
            <legend className="label-xs bg-foreground px-2 py-1 text-background">DELIVERY</legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {DELIVERY.map((d) => (
                <Choice
                  key={d.id}
                  name="delivery"
                  checked={delivery === d.id}
                  onChange={() => setDelivery(d.id)}
                  title={d.title}
                  note={d.note}
                  right={d.cost === 0 ? "FREE" : inr(d.cost)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="border-[3px] border-foreground p-5 brutal-shadow-sm">
            <legend className="label-xs bg-foreground px-2 py-1 text-background">PAYMENT</legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {PAYMENTS.map((p) => (
                <Choice
                  key={p.id}
                  name="payment"
                  checked={payment === p.id}
                  onChange={() => setPayment(p.id)}
                  title={p.title}
                  note={p.note}
                />
              ))}
            </div>
          </fieldset>
        </div>

        <div className="space-y-4 lg:sticky lg:top-24">
          <OrderSummary />
          <div className="border-[3px] border-foreground p-5">
            <div className="flex items-baseline justify-between">
              <span className="label-xs">DELIVERY</span>
              <span className="font-bold">{deliveryCost === 0 ? "FREE" : inr(deliveryCost)}</span>
            </div>
            {codFee > 0 && (
              <div className="mt-2 flex items-baseline justify-between">
                <span className="label-xs">COD FEE</span>
                <span className="font-bold">{inr(codFee)}</span>
              </div>
            )}
            <div className="mt-4 flex items-baseline justify-between border-t-[3px] border-foreground pt-4">
              <span className="label-xs">PAY NOW</span>
              <span className="font-display text-3xl font-black">{inr(grand)}</span>
            </div>
          </div>
          <Button type="submit" variant="flare" size="lg" full disabled={submitting}>
            {submitting ? "PLACING ORDER…" : "Place order"}{" "}
            <ArrowRight width={16} height={16} strokeWidth={3} />
          </Button>
        </div>
      </form>
    </div>
  );
}

function Choice({
  name,
  checked,
  onChange,
  title,
  note,
  right,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  note: string;
  right?: string;
}) {
  return (
    <label
      className={
        "flex cursor-pointer items-start gap-3 border-[3px] border-foreground p-4 transition-colors " +
        (checked ? "bg-zap" : "hover:bg-muted")
      }
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="sr-only" />
      <span
        aria-hidden
        className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center border-[3px] border-foreground bg-background"
      >
        {checked && <span className="h-2 w-2 bg-flare" />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-sm font-black uppercase">{title}</span>
        <span className="block text-xs text-muted-foreground">{note}</span>
      </span>
      {right && <span className="label-xs">{right}</span>}
    </label>
  );
}
