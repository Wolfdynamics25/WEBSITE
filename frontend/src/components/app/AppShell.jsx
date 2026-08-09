import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";

const AppShell = ({ title, subtitle, children, actions }) => {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const doLogout = async () => {
    await logout();
    nav("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-tac-900 relative">
      <div className="grain-overlay" aria-hidden="true" />

      {/* App header */}
      <header data-testid="app-header" className="sticky top-0 z-40 bg-tac-950/85 backdrop-blur-xl border-b border-tac-100/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link to="/" data-testid="app-back-home" className="flex items-center gap-3">
            <img src="/assets/wolf-logo-light.png" alt="Wolfdynamics" className="h-8 w-auto" />
            <span className="h-4 w-px bg-tac-100/25 hidden sm:block" />
            <span className="hidden sm:inline-block font-mono text-[9px] tracking-[0.32em] uppercase text-amber-warn">
              {user?.role === "admin" ? "Admin Console" : "Partner Portal"}
            </span>
          </Link>
          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden md:flex items-center gap-2 font-mono text-[10.5px] tracking-[0.22em] uppercase text-tac-200">
                <span className="w-1.5 h-1.5 bg-od-green rounded-full" />
                <span>{user.email}</span>
                <span className="text-amber-warn">· {user.role}</span>
              </div>
            )}
            <button
              onClick={doLogout}
              data-testid="app-logout"
              className="inline-flex items-center gap-2 px-3 py-2 border border-tac-100/20 hover:border-amber-warn hover:text-amber-warn font-mono text-[10.5px] tracking-[0.22em] uppercase transition-colors"
            >
              <LogOut size={12} strokeWidth={1.5} />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="relative">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="eyebrow">{subtitle}</span>
            <span className="h-px flex-1 max-w-32 bg-tac-100/15" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <h1 className="font-display text-tac-100 text-4xl md:text-5xl lg:text-6xl leading-[1.02]">
              {title}
            </h1>
            {actions}
          </div>

          {children}
        </div>
      </main>
    </div>
  );
};

export default AppShell;
