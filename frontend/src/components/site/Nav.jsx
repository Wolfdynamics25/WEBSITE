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
    { href: "#team", label: "Team" },
  ];

  return (
    <header
      data-testid="site-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-ocean-950/80 backdrop-blur-xl border-b border-cyan-accent/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a
          href="#top"
          data-testid="nav-logo"
          className="flex items-center gap-3 group"
        >
          <svg width="26" height="26" viewBox="0 0 40 40" fill="none" className="text-cyan-accent">
            <path d="M4 26 L20 12 L36 26" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M4 32 L36 32" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
            <circle cx="20" cy="26" r="1.5" fill="currentColor"/>
          </svg>
          <div className="flex flex-col leading-tight">
            <span className="font-mono text-[10px] tracking-[0.24em] text-cyan-accent uppercase">Wolfdynamics</span>
            <span className="font-serif text-sm text-ocean-100">Systems</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="font-mono text-[11px] tracking-[0.2em] uppercase text-ocean-200 hover:text-cyan-accent transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          data-testid="nav-cta-contact"
          className="group relative inline-flex items-center gap-2 px-4 py-2 border border-cyan-accent/40 hover:border-cyan-accent hover:bg-cyan-accent/5 transition-colors duration-300"
        >
          <span className="w-1.5 h-1.5 bg-cyan-accent rounded-full animate-blink"></span>
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-ocean-100">Contact</span>
        </a>
      </div>
    </header>
  );
};

export default Nav;
