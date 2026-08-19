import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, MapPin, Plus, ShieldCheck, CreditCard, Smartphone, Banknote } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button, Field, Input } from "@/components/brutal";
import { OrderSummary } from "@/routes/cart";
import { inr } from "@/lib/format";
import { useStore } from "@/lib/store";
import { z } from "zod";
import { type Address } from "@/lib/data";

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
    .min(8, "Enter a valid phone number")
    .max(20),
  fullName: z.string().trim().min(2, "Enter your full name").max(100),
  address: z.string().trim().min(5, "Enter your address").max(200),
  city: z.string().trim().min(2, "Enter your city").max(80),
  state: z.string().trim().min(2, "Enter your state").max(80),
  postalCode: z
    .string()
    .trim()
    .regex(/^[0-9]{5,6}$/, "Enter a valid 5-6 digit postal code"),
  country: z.string().trim().min(2).max(80),
});

const DELIVERY = [
  { id: "STANDARD", title: "STANDARD COURIER", note: "3–5 business days via BlueDart", cost: 0 },
  { id: "EXPRESS", title: "AIR EXPRESS PRIORITY", note: "1–2 business days via Delhivery Air", cost: 199 },
];

const PAYMENTS: { id: "CARD" | "UPI" | "COD" | "DEMO"; title: string; note: string; icon: string }[] = [
  { id: "CARD", title: "CREDIT / DEBIT CARD", note: "Visa, Mastercard, Amex, RuPay", icon: "card" },
  { id: "UPI", title: "INSTANT UPI / QR", note: "GPay, PhonePe, Paytm, Cred", icon: "upi" },
  { id: "COD", title: "CASH ON DELIVERY", note: "Pay cash or UPI at your doorstep", icon: "cod" },
  { id: "DEMO", title: "1-CLICK DEMO SIMULATION", note: "Instant sandbox test authorization", icon: "demo" },
];

function Checkout() {
  const { cartLines, totals, placeOrder, state, addAddress } = useStore();
  const navigate = useNavigate();

  const user = state.user;
  const savedAddresses = user?.addresses ?? [];

  // Default address if available
  const defaultAddr = savedAddresses[user?.defaultAddressIndex ?? 0];

  const [useSavedAddress, setUseSavedAddress] = useState(savedAddresses.length > 0);
  const [selectedAddrIndex, setSelectedAddrIndex] = useState(0);

  const [values, setValues] = useState({
    email: user?.email ?? "alex@example.com",
    phone: user?.phone ?? "+91 98765 43210",
    fullName: defaultAddr?.fullName ?? user?.name ?? "Alex Thorne",
    address: defaultAddr?.address ?? "Flat 402, Brutal Towers, 12th Main Road",
    city: defaultAddr?.city ?? "Bengaluru",
    state: defaultAddr?.state ?? "Karnataka",
    postalCode: defaultAddr?.postalCode ?? "560038",
    country: defaultAddr?.country ?? "India",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [delivery, setDelivery] = useState("STANDARD");
  const [payment, setPayment] = useState<"CARD" | "UPI" | "COD" | "DEMO">("CARD");
  const [saveAddressToAccount, setSaveAddressToAccount] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const deliveryCost = DELIVERY.find((d) => d.id === delivery)?.cost ?? 0;
  const grand = totals.total + deliveryCost;

  const field = (k: keyof typeof values) => ({
    value: values[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues((v) => ({ ...v, [k]: e.target.value })),
  });

  const handleSelectSaved = (index: number) => {
    setSelectedAddrIndex(index);
    const addr = savedAddresses[index];
    if (addr) {
      setValues((prev) => ({
        ...prev,
        fullName: addr.fullName,
        address: addr.address,
        city: addr.city,
        state: addr.state,
        postalCode: addr.postalCode,
        country: addr.country,
      }));
    }
  };

  if (cartLines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <div className="border-[3px] border-foreground bg-background p-12 brutal-shadow max-w-md mx-auto">
          <h1 className="font-display text-3xl font-black uppercase">BAG IS EMPTY</h1>
          <p className="mt-2 text-xs text-muted-foreground">
            You don't have any items in your bag to checkout.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              to="/shop"
              search={{}}
              className="label-xs inline-flex border-[3px] border-foreground bg-zap px-6 py-4 press brutal-shadow-sm font-black"
            >
              BROWSE CATALOG
            </Link>
          </div>
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
      toast.error("CHECK FORM DETAILS", { description: "Please complete required shipping fields." });
      return;
    }
    setErrors({});
    setSubmitting(true);

    const shippingAddress: Address = {
      fullName: parsed.data.fullName,
      address: parsed.data.address,
      city: parsed.data.city,
      state: parsed.data.state,
      postalCode: parsed.data.postalCode,
      country: parsed.data.country,
    };

    if (user && saveAddressToAccount && !useSavedAddress) {
      addAddress(shippingAddress);
    }

    window.setTimeout(() => {
      const order = placeOrder({
        customerName: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        address: shippingAddress,
        delivery,
        paymentMethod: payment,
      });

      setSubmitting(false);
      toast.success("ORDER CONFIRMED & DISPATCHED", {
        description: `Order #${order.id} placed successfully. Stock decremented.`,
      });
      navigate({ to: "/order/$orderId", params: { orderId: order.id } });
    }, 600);
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10">
      <header className="mb-8 border-b-[3px] border-foreground pb-4">
        <span className="label-xs bg-foreground px-2 py-1 text-background">CHECKOUT</span>
        <h1 className="mt-4 text-[clamp(2.8rem,9vw,5.5rem)] font-display font-black uppercase leading-[0.9] tracking-tight">
          Secure
          <br />
          dispatch.
        </h1>
      </header>

      <form onSubmit={submit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
        <div className="space-y-6">
          {/* Contact Information */}
          <fieldset className="border-[3px] border-foreground bg-background p-6 brutal-shadow-sm">
            <legend className="label-xs bg-foreground px-3 py-1 font-black text-background uppercase">
              1. CONTACT DETAILS
            </legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="EMAIL FOR DISPATCH NOTIFICATIONS *" error={errors["email"]}>
                <Input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="alex@example.com"
                  {...field("email")}
                />
              </Field>
              <Field label="PHONE NUMBER (FOR COURIER TRACKING) *" error={errors["phone"]}>
                <Input
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                  {...field("phone")}
                />
              </Field>
            </div>
          </fieldset>

          {/* Shipping Address */}
          <fieldset className="border-[3px] border-foreground bg-background p-6 brutal-shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <legend className="label-xs bg-foreground px-3 py-1 font-black text-background uppercase">
                2. SHIPPING DESTINATION
              </legend>
              {savedAddresses.length > 0 && (
                <button
                  type="button"
                  onClick={() => setUseSavedAddress(!useSavedAddress)}
                  className="label-xs text-xs underline font-bold hover:text-flare"
                >
                  {useSavedAddress ? "+ Enter a new address" : "← Use saved address"}
                </button>
              )}
            </div>

            {/* Saved Address Cards */}
            {useSavedAddress && savedAddresses.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2 pt-2">
                {savedAddresses.map((addr, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelectSaved(idx)}
                    className={`cursor-pointer border-[2px] p-4 transition-colors ${
                      selectedAddrIndex === idx
                        ? "border-foreground bg-zap brutal-shadow-sm"
                        : "border-zinc-300 bg-smoke/40 hover:border-foreground"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-display text-xs font-black uppercase">{addr.fullName}</p>
                      {selectedAddrIndex === idx && <CheckCircle2 className="h-4 w-4" />}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{addr.address}</p>
                    <p className="mt-1 font-mono text-[0.7rem] font-bold">
                      {addr.city}, {addr.state} — {addr.postalCode}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 pt-2">
                <div className="sm:col-span-2">
                  <Field label="RECIPIENT FULL NAME *" error={errors["fullName"]}>
                    <Input autoComplete="name" {...field("fullName")} />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="STREET ADDRESS / BUILDING / SUITE *" error={errors["address"]}>
                    <Input autoComplete="street-address" {...field("address")} />
                  </Field>
                </div>
                <Field label="CITY *" error={errors["city"]}>
                  <Input autoComplete="address-level2" {...field("city")} />
                </Field>
                <Field label="STATE *" error={errors["state"]}>
                  <Input autoComplete="address-level1" {...field("state")} />
                </Field>
                <Field label="POSTAL CODE / PINCODE *" error={errors["postalCode"]}>
                  <Input inputMode="numeric" autoComplete="postal-code" {...field("postalCode")} />
                </Field>
                <Field label="COUNTRY *" error={errors["country"]}>
                  <Input autoComplete="country-name" {...field("country")} />
                </Field>
              </div>
            )}
          </fieldset>

          {/* Delivery Method */}
          <fieldset className="border-[3px] border-foreground bg-background p-6 brutal-shadow-sm">
            <legend className="label-xs bg-foreground px-3 py-1 font-black text-background uppercase">
              3. DELIVERY SPEED
            </legend>
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

          {/* Payment Method */}
          <fieldset className="border-[3px] border-foreground bg-background p-6 brutal-shadow-sm">
            <legend className="label-xs bg-foreground px-3 py-1 font-black text-background uppercase">
              4. PAYMENT AUTHORIZATION
            </legend>
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

        {/* Sticky Summary & Order Confirmation */}
        <div className="space-y-4 lg:sticky lg:top-24">
          <OrderSummary />

          <div className="border-[3px] border-foreground bg-background p-5 brutal-shadow-sm space-y-2">
            <div className="flex items-baseline justify-between text-xs">
              <span className="label-xs text-muted-foreground">DELIVERY SELECTION</span>
              <span className="font-bold">{deliveryCost === 0 ? "FREE" : inr(deliveryCost)}</span>
            </div>
            <div className="flex items-baseline justify-between border-t-[2px] border-foreground pt-3">
              <span className="label-xs font-black">PAYABLE GRAND TOTAL</span>
              <span className="font-display text-3xl font-black">{inr(grand)}</span>
            </div>
          </div>

          <Button
            type="submit"
            variant="flare"
            size="lg"
            full
            disabled={submitting}
            className="text-xs font-black uppercase text-white hover:bg-black py-5 press brutal-shadow"
          >
            {submitting ? "AUTHORIZING ORDER…" : "AUTHORIZE & PLACE ORDER"}{" "}
            <ArrowRight width={16} height={16} strokeWidth={3} />
          </Button>

          <div className="border border-zinc-300 p-3 bg-smoke/40 text-[0.7rem] text-muted-foreground text-center">
            <p className="flex items-center justify-center gap-1 font-bold text-foreground mb-0.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
              100% ENCRYPTED SIMULATION
            </p>
            Instant real-time stock deduction and order timeline generated.
          </div>
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
        (checked ? "bg-zap brutal-shadow-sm" : "bg-background hover:bg-smoke")
      }
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="sr-only" />
      <span
        aria-hidden
        className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center border-[2px] border-foreground bg-background"
      >
        {checked && <span className="h-2.5 w-2.5 bg-flare" />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-xs font-black uppercase">{title}</span>
        <span className="block text-[0.7rem] text-muted-foreground">{note}</span>
      </span>
      {right && <span className="label-xs font-mono font-bold">{right}</span>}
    </label>
  );
}

