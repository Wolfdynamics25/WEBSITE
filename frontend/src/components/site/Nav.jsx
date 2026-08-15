import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { LogIn, LayoutDashboard } from "lucide-react";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#capabilities", label: "Capabilities" },
    { href: "#products", label: "Products" },
    { href: "#applications", label: "Applications" },
    { href: "#impact", label: "Impact" },
    { href: "#contact", label: "Contact" },
  ];

  const portalDest = user && user.role === "admin"
    ? "/admin"
    : user && user.role && user.role !== "pending"
    ? "/portal"
    : user && user.role === "pending"
    ? "/pending"
    : null;

  return (
    <header
      data-testid="site-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-tac-900/85 backdrop-blur-xl border-b border-tac-100/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" data-testid="nav-logo" className="flex items-center gap-3">
          <img
            src="/assets/wolf-logo-light.png"
            alt="Wolfdynamics Systems"
            className="h-9 md:h-10 w-auto"
          />
          <span className="hidden sm:inline-block h-4 w-px bg-tac-100/25" />
          <span className="hidden sm:inline-block font-mono text-[9px] tracking-[0.32em] uppercase text-amber-warn">Systems · Defence-Grade</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="font-mono text-[10.5px] tracking-[0.24em] uppercase text-tac-200 hover:text-amber-warn transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
          {portalDest ? (
            <Link
              to={portalDest}
              data-testid="nav-portal"
              className="inline-flex items-center gap-2 px-3 py-2 border border-amber-warn/50 text-amber-warn hover:bg-amber-warn hover:text-tac-900 font-mono text-[10.5px] tracking-[0.22em] uppercase transition-colors duration-300"
            >
              <LayoutDashboard size={12} strokeWidth={1.5} />
              <span>{user.role === "admin" ? "Admin" : user.role === "pending" ? "Status" : "Portal"}</span>
            </Link>
          ) : (
            <Link
              to="/login"
              data-testid="nav-signin"
              className="inline-flex items-center gap-2 px-3 py-2 border border-tac-100/25 hover:border-amber-warn hover:text-amber-warn font-mono text-[10.5px] tracking-[0.22em] uppercase transition-colors duration-300"
            >
              <LogIn size={12} strokeWidth={1.5} />
              <span>Sign in</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Nav;
