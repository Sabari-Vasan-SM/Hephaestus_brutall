import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { toast } from "sonner";
import { ShieldCheck, KeyRound, Lock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/superadmin/login")({
  head: () => ({
    meta: [
      { title: "Super Admin Login — BRUTAL. Command Center" },
      { name: "description", content: "Administrator authentication portal for BRUTAL. storefront." },
    ],
  }),
  component: SuperAdminLoginPage,
});

function SuperAdminLoginPage() {
  const { adminLogin, adminSession } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@brutal.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (adminSession?.loggedIn) {
      navigate({ to: "/superadmin" });
    }
  }, [adminSession, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const res = adminLogin(email, password);
      setLoading(false);

      if (res.ok) {
        toast.success("ACCESS GRANTED", { description: "Welcome to BRUTAL. Command Center." });
        navigate({ to: "/superadmin" });
      } else {
        toast.error("ACCESS DENIED", { description: res.message });
      }
    }, 400);
  };

  const handleFillDemo = () => {
    setEmail("admin@brutal.com");
    setPassword("admin123");
    toast.info("DEMO CREDENTIALS LOADED", { description: "admin@brutal.com / admin123" });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#111111] px-4 py-12 text-white">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 opacity-15 pointer-events-none grid-paper" />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand Monogram */}
        <div className="mb-6 text-center">
          <Link to="/" className="inline-block font-display text-4xl font-black tracking-tight text-white">
            BRUTAL<span className="text-flare">.</span>
          </Link>
          <div className="mt-2 inline-flex items-center gap-1.5 border border-zinc-700 bg-zinc-900 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest text-zap">
            <Lock className="h-3 w-3" />
            SUPER ADMIN ACCESS
          </div>
        </div>

        {/* Login Box */}
        <div className="border-[3px] border-white bg-black p-8 brutal-shadow shadow-[8px_8px_0px_0px_rgba(212,255,0,1)]">
          <h2 className="font-display text-2xl font-black uppercase tracking-tight">OPERATOR LOGIN</h2>
          <p className="mt-1 text-xs text-zinc-400">Enter authenticated operator credentials to control the store.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="label-xs block text-zinc-300 mb-1.5">OPERATOR EMAIL</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@brutal.com"
                className="w-full border-[2px] border-white bg-zinc-950 px-4 py-3 text-sm text-white focus:bg-black focus:outline-none focus:ring-2 focus:ring-zap font-mono"
              />
            </div>

            <div>
              <label className="label-xs block text-zinc-300 mb-1.5">PASSPHRASE</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border-[2px] border-white bg-zinc-950 px-4 py-3 text-sm text-white focus:bg-black focus:outline-none focus:ring-2 focus:ring-zap font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 border-[3px] border-black bg-zap py-3.5 text-xs font-black uppercase text-black press brutal-shadow-sm disabled:opacity-50"
            >
              {loading ? (
                "AUTHENTICATING..."
              ) : (
                <>
                  <span>AUTHENTICATE & ENTER</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials helper */}
          <div className="mt-6 border-t border-zinc-800 pt-5">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Demo Credentials:</span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="flex items-center gap-1 text-[0.7rem] font-bold uppercase text-zap underline hover:text-white"
              >
                <KeyRound className="h-3 w-3" />
                Auto-Fill Demo
              </button>
            </div>
            <div className="mt-2 rounded bg-zinc-900/90 p-2.5 font-mono text-[0.75rem] text-zinc-300 border border-zinc-800">
              <p>Email: <span className="text-white font-bold">admin@brutal.com</span></p>
              <p>Pass: <span className="text-white font-bold">admin123</span></p>
            </div>
          </div>
        </div>

        {/* Back to storefront link */}
        <div className="mt-6 text-center">
          <Link to="/" className="label-xs text-zinc-400 hover:text-zap underline">
            ← BACK TO PUBLIC STOREFRONT
          </Link>
        </div>
      </div>
    </div>
  );
}
