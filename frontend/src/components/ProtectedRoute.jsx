import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const LoadingScreen = () => (
  <div data-testid="auth-loading" className="min-h-screen flex items-center justify-center bg-tac-900">
    <div className="flex items-center gap-3">
      <span className="w-2 h-2 bg-amber-warn rounded-full animate-blink" />
      <span className="font-mono text-[11px] tracking-[0.24em] uppercase text-tac-200">Verifying credentials…</span>
    </div>
  </div>
);

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user === null) return <LoadingScreen />;
  if (user === false) return <Navigate to="/login" replace state={{ from: location }} />;
  if (roles && roles.length && !roles.includes(user.role)) {
    // if pending, send to pending screen; else redirect home
    if (user.role === "pending") return <Navigate to="/pending" replace />;
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
