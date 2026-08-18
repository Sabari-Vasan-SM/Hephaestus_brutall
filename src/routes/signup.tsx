import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
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
    name: z.string().trim().min(2, "Enter your name").max(100),
    email: z.string().trim().email("Enter a valid email").max(255),
    password: z.string().min(6, "At least 6 characters").max(72),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  });

function Signup() {
  const { signIn } = useStore();
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: "", email: "", password: "", confirm: "" });
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
      signIn({ name: parsed.data.name, email: parsed.data.email });
      setLoading(false);
      toast.success("YOU'RE IN");
      navigate({ to: "/account" });
    }, 500);
  };

  return (
    <div className="mx-auto grid max-w-md px-4 py-14 sm:px-6">
      <h1 className="text-[clamp(2.5rem,10vw,4.5rem)]">
        Join
        <br />
        the
        <br />
        <span className="bg-zap px-2">drop.</span>
      </h1>

      <form
        onSubmit={submit}
        className="mt-8 space-y-4 border-[3px] border-foreground p-6 brutal-shadow"
      >
        <Field label="NAME" error={errors["name"]}>
          <Input
            autoComplete="name"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          />
        </Field>
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
            autoComplete="new-password"
            value={values.password}
            onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
          />
        </Field>
        <Field label="CONFIRM PASSWORD" error={errors["confirm"]}>
          <Input
            type="password"
            autoComplete="new-password"
            value={values.confirm}
            onChange={(e) => setValues((v) => ({ ...v, confirm: e.target.value }))}
          />
        </Field>
        <Button type="submit" variant="flare" size="lg" full disabled={loading}>
          {loading ? "CREATING…" : "Create account"}{" "}
          <ArrowRight width={16} height={16} strokeWidth={3} />
        </Button>
        <p className="label-xs pt-2 text-muted-foreground">
          ALREADY A MEMBER?{" "}
          <Link to="/login" className="text-flare underline">
            SIGN IN
          </Link>
        </p>
      </form>
    </div>
  );
}
