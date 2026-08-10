import { Link } from "react-router-dom";

const AuthShell = ({ title, subtitle, children, footer }) => (
  <div className="min-h-screen bg-tac-900 relative overflow-hidden">
    <div className="grain-overlay" aria-hidden="true" />
    <div className="absolute inset-0 tac-grid opacity-40 pointer-events-none" aria-hidden="true" />
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
      background: "radial-gradient(600px 340px at 25% 25%, rgba(79, 139, 224, 0.10), transparent 60%), radial-gradient(600px 340px at 80% 80%, rgba(143, 166, 199, 0.08), transparent 60%)"
    }} />

    <div className="relative max-w-md mx-auto px-6 pt-16 pb-24">
      <Link to="/" className="inline-flex items-center gap-3 mb-14" data-testid="auth-back-home">
        <img src="/assets/wolf-logo-light.png" alt="Wolfdynamics" className="h-9 w-auto" />
        <span className="h-4 w-px bg-tac-100/25" />
        <span className="font-mono text-[9px] tracking-[0.32em] uppercase text-amber-warn">Defence-Grade</span>
      </Link>

      <div className="relative border border-tac-100/15 bg-tac-850 p-8 md:p-10">
        <span className="crosshair tl" />
        <span className="crosshair tr" />
        <span className="crosshair bl" />
        <span className="crosshair br" />

        <div className="flex items-center gap-3 pb-5 mb-8 border-b border-tac-100/10">
          <span className="w-1.5 h-1.5 bg-amber-warn rounded-full animate-blink" />
          <span className="mono-label" style={{ color: "#4F8BE0" }}>{subtitle}</span>
        </div>

        <h1 className="font-display text-tac-100 text-3xl md:text-4xl leading-[1.02] mb-8">
          {title}
        </h1>

        {children}
      </div>

      {footer && <div className="mt-8 text-center">{footer}</div>}
    </div>
  </div>
);

export default AuthShell;
