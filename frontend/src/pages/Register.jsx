import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AuthShell from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Register = () => {
  const { user, register, formatError } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", organization: "", password: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user && user.role) nav(user.role === "pending" ? "/pending" : "/portal", { replace: true });
  }, [user, nav]);

  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (form.password.length < 8) {
      setErr("Password must be at least 8 characters");
      return;
    }
    setBusy(true);
    try {
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        organization: form.organization.trim() || undefined,
        password: form.password,
      });
      nav("/pending", { replace: true });
    } catch (e) {
      setErr(formatError(e.response?.data?.detail) || "Registration failed");
    } finally {
      setBusy(false);
    }
  };

  const inputClass = "bg-tac-900 border-tac-100/20 rounded-none focus-visible:ring-amber-warn focus-visible:ring-1 focus-visible:ring-offset-0 text-tac-100 h-11";
  const labelClass = "font-mono text-[10px] tracking-[0.24em] uppercase text-tac-200";

  return (
    <AuthShell
      title={<>REQUEST<br/><span className="text-amber-warn">ACCESS.</span></>}
      subtitle="INVITE + MANUAL APPROVAL"
      footer={
        <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-tac-300">
          Already have access?{" "}
          <Link to="/login" data-testid="link-login" className="text-amber-warn hover:underline">Sign in</Link>
        </span>
      }
    >
      <form onSubmit={submit} data-testid="register-form" className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="r-name" className={labelClass}>Full Name</Label>
          <Input id="r-name" data-testid="register-name-input" value={form.name} onChange={upd("name")} required className={inputClass} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="r-email" className={labelClass}>Email</Label>
          <Input id="r-email" data-testid="register-email-input" type="email" value={form.email} onChange={upd("email")} required className={inputClass} autoComplete="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="r-org" className={labelClass}>Organization</Label>
          <Input id="r-org" data-testid="register-org-input" value={form.organization} onChange={upd("organization")} className={inputClass} placeholder="Optional" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="r-pw" className={labelClass}>Password · min 8 chars</Label>
          <Input id="r-pw" data-testid="register-password-input" type="password" value={form.password} onChange={upd("password")} required className={inputClass} autoComplete="new-password" />
        </div>

        {err && (
          <div data-testid="register-error" className="border border-signal-red/60 bg-signal-red/10 text-tac-100 text-sm px-4 py-3 font-mono tracking-wide">
            {err}
          </div>
        )}

        <button
          type="submit"
          disabled={busy}
          data-testid="register-submit"
          className="w-full inline-flex items-center justify-center gap-3 px-5 py-3 bg-amber-warn text-tac-900 hover:bg-tac-100 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-300"
        >
          <span className="font-mono text-[11px] tracking-[0.24em] uppercase font-medium">
            {busy ? "Submitting…" : "Submit for review"}
          </span>
        </button>

        <p className="mono-label text-tac-300" style={{ letterSpacing: "0.14em" }}>
          Your request will be reviewed by an administrator before access is granted.
        </p>
      </form>
    </AuthShell>
  );
};

export default Register;
