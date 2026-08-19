import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, UserCheck, KeyRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button, Field, Input } from "@/components/brutal";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — BRUTAL." },
      {
        name: "description",
        content: "Sign in to your BRUTAL. account to track orders and saved pieces.",
      },
      { property: "og:title", content: "Sign In — BRUTAL." },
      { property: "og:description", content: "Sign in to your BRUTAL. account." },
    ],
  }),
  component: Login,
});

const schema = z.object({
  email: z.string().trim().email("Enter a valid email address").max(255),
  password: z.string().min(1, "Enter your password"),
});

function Login() {
  const { loginCustomer, state } = useStore();
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "alex@example.com", password: "password123" });
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
      const res = loginCustomer(parsed.data.email, parsed.data.password);
      setLoading(false);

      if (res.ok) {
        toast.success("WELCOME BACK", { description: `Signed in as ${res.user?.name}` });
        navigate({ to: "/account" });
      } else {
        toast.error("SIGN IN FAILED", { description: res.message });
      }
    }, 400);
  };

  const handleSelectDemoUser = (email: string) => {
    setValues({ email, password: "password123" });
    toast.info("DEMO PROFILE LOADED", { description: email });
  };

  return (
    <div className="mx-auto grid max-w-md px-4 py-14 sm:px-6">
      <header className="mb-6">
        <span className="label-xs bg-foreground px-2 py-1 text-background">MEMBERSHIP</span>
        <h1 className="mt-4 text-[clamp(2.5rem,10vw,4.5rem)] font-display font-black uppercase leading-[0.9] tracking-tight">
          Welcome
          <br />
          back.
        </h1>
        <p className="mt-3 text-xs text-muted-foreground">Sign in to track live drops and dispatches.</p>
      </header>

      <form
        onSubmit={submit}
        className="space-y-4 border-[3px] border-foreground bg-background p-6 brutal-shadow"
      >
        <Field label="EMAIL ADDRESS" error={errors["email"]}>
          <Input
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            className="text-xs font-bold"
          />
        </Field>
        <Field label="PASSWORD" error={errors["password"]}>
          <Input
            type="password"
            required
            autoComplete="current-password"
            value={values.password}
            onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
            className="text-xs font-mono"
          />
        </Field>

        <Button type="submit" variant="flare" size="lg" full disabled={loading} className="text-xs font-black uppercase text-white hover:bg-black py-4">
          {loading ? "AUTHENTICATING…" : "SIGN IN"}{" "}
          <ArrowRight width={16} height={16} strokeWidth={3} />
        </Button>

        {/* 1-Click Demo Profiles */}
        <div className="border-t border-zinc-200 pt-4 space-y-2">
          <span className="label-xs text-muted-foreground block flex items-center gap-1.5">
            <KeyRound className="h-3 w-3" />
            1-CLICK DEMO CLIENT PROFILES:
          </span>
          <div className="grid grid-cols-3 gap-1.5 text-center">
            {state.customers.slice(0, 3).map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => handleSelectDemoUser(c.email)}
                className="border border-foreground bg-smoke/80 py-1.5 text-[0.65rem] font-bold uppercase hover:bg-zap press truncate px-1"
              >
                {c.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        <p className="label-xs pt-2 text-muted-foreground text-center">
          NEW TO BRUTAL.?{" "}
          <Link to="/signup" className="text-flare underline font-black">
            CREATE ACCOUNT
          </Link>
        </p>
      </form>
    </div>
  );
}

