import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
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
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(6, "At least 6 characters").max(72),
});

function Login() {
  const { signIn } = useStore();
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
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
      signIn({ name: parsed.data.email.split("@")[0] ?? "Member", email: parsed.data.email });
      setLoading(false);
      toast.success("WELCOME BACK");
      navigate({ to: "/account" });
    }, 500);
  };

  return (
    <div className="mx-auto grid max-w-md px-4 py-14 sm:px-6">
      <h1 className="text-[clamp(2.5rem,10vw,4.5rem)]">
        Welcome
        <br />
        back.
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">Sign in to continue.</p>

      <form
        onSubmit={submit}
        className="mt-8 space-y-4 border-[3px] border-foreground p-6 brutal-shadow"
      >
        <Field label="EMAIL" error={errors["email"]}>
          <Input
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          />
        </Field>
        <Field label="PASSWORD" error={errors["password"]}>
          <Input
            type="password"
            autoComplete="current-password"
            value={values.password}
            onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
          />
        </Field>
        <button
          type="button"
          className="label-xs underline"
          onClick={() =>
            toast("PASSWORD RESET", { description: "Reset links are not available in this demo." })
          }
        >
          FORGOT PASSWORD?
        </button>
        <Button type="submit" variant="flare" size="lg" full disabled={loading}>
          {loading ? "SIGNING IN…" : "Sign in"}{" "}
          <ArrowRight width={16} height={16} strokeWidth={3} />
        </Button>
        <div className="grid gap-2 pt-2">
          {["CONTINUE WITH GOOGLE", "CONTINUE WITH APPLE"].map((l) => (
            <Button
              key={l}
              type="button"
              variant="outline"
              onClick={() =>
                toast("SOCIAL SIGN-IN", { description: "Not connected in this demo." })
              }
            >
              {l}
            </Button>
          ))}
        </div>
        <p className="label-xs pt-2 text-muted-foreground">
          NEW HERE?{" "}
          <Link to="/signup" className="text-flare underline">
            CREATE ACCOUNT
          </Link>
        </p>
      </form>
    </div>
  );
}
