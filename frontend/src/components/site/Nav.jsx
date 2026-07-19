import { useEffect, useState } from "react";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#capabilities", label: "Capabilities" },
    { href: "#applications", label: "Applications" },
    { href: "#impact", label: "Impact" },
    { href: "#contact", label: "Contact" },
  ];

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
          {/* Wolf-mark: sharp shield/wing motif */}
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none" className="text-amber-warn">
            <path d="M4 8 L20 4 L36 8 L36 20 L20 34 L4 20 Z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
            <path d="M12 18 L20 12 L28 18" stroke="currentColor" strokeWidth="1.2" fill="none"/>
            <path d="M12 22 L28 22" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
          </svg>
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg tracking-[0.02em] text-tac-100">WOLFDYNAMICS</span>
            <span className="font-mono text-[9px] tracking-[0.32em] text-amber-warn mt-0.5">SYSTEMS · DEFENCE-GRADE</span>
          </div>
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
        </nav>
      </div>
    </header>
  );
};

export default Nav;
