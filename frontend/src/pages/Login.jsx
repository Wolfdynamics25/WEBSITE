import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AuthShell from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const { user, login, formatError } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user && user.role) {
      const dest = location.state?.from?.pathname
        || (user.role === "admin" ? "/admin" : user.role === "pending" ? "/pending" : "/portal");
      nav(dest, { replace: true });
    }
  }, [user, nav, location.state]);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      const u = await login(email.trim(), password);
      const dest = location.state?.from?.pathname
        || (u.role === "admin" ? "/admin" : u.role === "pending" ? "/pending" : "/portal");
      nav(dest, { replace: true });
    } catch (e) {
      setErr(formatError(e.response?.data?.detail) || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthShell
      title={<>SECURE<br/><span className="text-amber-warn">SIGN IN.</span></>}
      subtitle="AUTH · JWT · EMAIL & PASSWORD"
      footer={
        <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-tac-300">
          No account?{" "}
          <Link to="/register" data-testid="link-register" className="text-amber-warn hover:underline">Request access</Link>
        </span>
      }
    >
      <form onSubmit={submit} data-testid="login-form" className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="l-email" className="font-mono text-[10px] tracking-[0.24em] uppercase text-tac-200">Email</Label>
          <Input
            id="l-email"
            data-testid="login-email-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-tac-900 border-tac-100/20 rounded-none focus-visible:ring-amber-warn focus-visible:ring-1 focus-visible:ring-offset-0 text-tac-100 h-11"
            placeholder="you@company.com"
            autoComplete="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="l-pw" className="font-mono text-[10px] tracking-[0.24em] uppercase text-tac-200">Password</Label>
          <Input
            id="l-pw"
            data-testid="login-password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-tac-900 border-tac-100/20 rounded-none focus-visible:ring-amber-warn focus-visible:ring-1 focus-visible:ring-offset-0 text-tac-100 h-11"
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </div>

        {err && (
          <div data-testid="login-error" className="border border-signal-red/60 bg-signal-red/10 text-tac-100 text-sm px-4 py-3 font-mono tracking-wide">
            {err}
          </div>
        )}

        <button
          type="submit"
          disabled={busy}
          data-testid="login-submit"
          className="w-full inline-flex items-center justify-center gap-3 px-5 py-3 bg-amber-warn text-tac-900 hover:bg-tac-100 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-300"
        >
          <span className="font-mono text-[11px] tracking-[0.24em] uppercase font-medium">
            {busy ? "Authenticating…" : "Sign in"}
          </span>
        </button>
      </form>
    </AuthShell>
  );
};

export default Login;
