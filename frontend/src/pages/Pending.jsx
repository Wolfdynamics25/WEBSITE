import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AuthShell from "@/components/auth/AuthShell";

const Pending = () => {
  const { user, logout } = useAuth();

  return (
    <AuthShell
      title={<>UNDER<br/><span className="text-amber-warn">REVIEW.</span></>}
      subtitle="STATUS · PENDING APPROVAL"
      footer={
        <button
          onClick={logout}
          data-testid="pending-logout"
          className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-tac-300 hover:text-amber-warn"
        >
          Sign out
        </button>
      }
    >
      <div className="space-y-6">
        <div className="border-l-2 border-amber-warn pl-5">
          <p className="font-display text-tac-100 text-xl leading-tight">
            YOUR ACCESS REQUEST HAS BEEN QUEUED.
          </p>
        </div>
        <div className="border border-tac-100/12 divide-y divide-tac-100/10">
          {user && (
            <>
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="mono-label">Account</span>
                <span className="font-display text-tac-100">{user.name}</span>
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="mono-label">Email</span>
                <span className="font-mono text-[13px] text-tac-100">{user.email}</span>
              </div>
              {user.organization && (
                <div className="px-4 py-3 flex items-center justify-between">
                  <span className="mono-label">Organization</span>
                  <span className="font-display text-tac-100">{user.organization}</span>
                </div>
              )}
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="mono-label">Status</span>
                <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-amber-warn">Pending</span>
              </div>
            </>
          )}
        </div>
        <p className="text-tac-200 text-sm leading-[1.65]">
          An administrator will review and confirm your access shortly. You'll be notified at
          the email above.
        </p>
        <Link
          to="/"
          data-testid="pending-back-home"
          className="inline-flex items-center gap-2 mono-label hover:text-amber-warn transition-colors"
        >
          <span>← Back to site</span>
        </Link>
      </div>
    </AuthShell>
  );
};

export default Pending;
