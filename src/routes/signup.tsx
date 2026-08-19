import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button, Field, Input } from "@/components/brutal";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create Account — BRUTAL." },
      {
        name: "description",
        content: "Join the drop. Create a BRUTAL. account for early access to limited runs.",
      },
      { property: "og:title", content: "Create Account — BRUTAL." },
      { property: "og:description", content: "Join the drop and get early access." },
    ],
  }),
  component: Signup,
});

const schema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name").max(100),
    email: z.string().trim().email("Enter a valid email address").max(255),
    phone: z.string().trim().min(8, "Enter a valid phone number").max(20),
    password: z.string().min(6, "Password must be at least 6 characters").max(72),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  });

function Signup() {
  const { registerCustomer } = useStore();
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const i of parsed.error.issues) next[String(i.path[0])] = i.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setLoading(true);

    window.setTimeout(() => {
      const res = registerCustomer({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        password: parsed.data.password,
      });
      setLoading(false);

      if (res.ok) {
        toast.success("ACCOUNT CREATED", { description: "Welcome to BRUTAL. Collective" });
        navigate({ to: "/account" });
      } else {
        toast.error("REGISTRATION FAILED", { description: res.message });
      }
    }, 450);
  };

  return (
    <div className="mx-auto grid max-w-md px-4 py-14 sm:px-6">
      <header className="mb-6">
        <span className="label-xs bg-foreground px-2 py-1 text-background">COLLECTIVE REGISTRATION</span>
        <h1 className="mt-4 text-[clamp(2.5rem,10vw,4.5rem)] font-display font-black uppercase leading-[0.9] tracking-tight">
          Join
          <br />
          the
          <br />
          <span className="bg-zap px-2">drop.</span>
        </h1>
        <p className="mt-3 text-xs text-muted-foreground">Access private archival streetwear releases.</p>
      </header>

      <form
        onSubmit={submit}
        className="space-y-4 border-[3px] border-foreground bg-background p-6 brutal-shadow"
      >
        <Field label="FULL NAME *" error={errors["name"]}>
          <Input
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            className="text-xs font-bold"
          />
        </Field>
        <Field label="EMAIL ADDRESS *" error={errors["email"]}>
          <Input
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            className="text-xs font-bold"
          />
        </Field>
        <Field label="PHONE NUMBER *" error={errors["phone"]}>
          <Input
            type="tel"
            required
            autoComplete="tel"
            placeholder="+91 98765 43210"
            value={values.phone}
            onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
            className="text-xs font-bold"
          />
        </Field>
        <Field label="PASSWORD *" error={errors["password"]}>
          <Input
            type="password"
            required
            autoComplete="new-password"
            value={values.password}
            onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
            className="text-xs font-mono"
          />
        </Field>
        <Field label="CONFIRM PASSWORD *" error={errors["confirm"]}>
          <Input
            type="password"
            required
            autoComplete="new-password"
            value={values.confirm}
            onChange={(e) => setValues((v) => ({ ...v, confirm: e.target.value }))}
            className="text-xs font-mono"
          />
        </Field>

        <Button type="submit" variant="flare" size="lg" full disabled={loading} className="text-xs font-black uppercase text-white hover:bg-black py-4">
          {loading ? "REGISTERING…" : "CREATE ACCOUNT"}{" "}
          <ArrowRight width={16} height={16} strokeWidth={3} />
        </Button>

        <p className="label-xs pt-2 text-muted-foreground text-center">
          ALREADY A MEMBER?{" "}
          <Link to="/login" className="text-flare underline font-black">
            SIGN IN
          </Link>
        </p>
      </form>
    </div>
  );
}

