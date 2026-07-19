const Footer = () => (
  <footer data-testid="site-footer" className="relative border-t border-cyan-accent/10 bg-ocean-950">
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-7">
          <div className="flex items-center gap-3">
            <svg width="26" height="26" viewBox="0 0 40 40" fill="none" className="text-cyan-accent">
              <path d="M4 26 L20 12 L36 26" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M4 32 L36 32" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
              <circle cx="20" cy="26" r="1.5" fill="currentColor"/>
            </svg>
            <div className="flex flex-col leading-tight">
              <span className="font-mono text-[10px] tracking-[0.24em] text-cyan-accent uppercase">Wolfdynamics</span>
              <span className="font-serif text-lg text-white">Systems Pvt. Ltd.</span>
            </div>
          </div>
          <p className="mt-6 font-serif italic text-2xl text-ocean-100 max-w-md leading-tight">
            Fast as flight. Simple as boat.
          </p>
          <p className="mt-4 text-ocean-200 text-sm max-w-md leading-relaxed">
            Building India's coastal logistics future — an autonomous, electric, ground-effect
            maritime mobility platform.
          </p>
        </div>

        <div className="md:col-span-5">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-cyan-accent">Contact</span>
          <ul className="mt-4 space-y-2 text-ocean-200">
            <li>
              <a
                href="mailto:info@wolfdynamics.in"
                data-testid="footer-email"
                className="hover:text-cyan-accent transition-colors duration-300"
              >
                info@wolfdynamics.in
              </a>
            </li>
            <li>Karnataka, India</li>
          </ul>
        </div>
      </div>

      <div className="mt-14 pt-6 border-t border-cyan-accent/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-ocean-200/70">
          © {new Date().getFullYear()} Wolfdynamic Systems Pvt. Ltd. All rights reserved.
        </span>
        <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-ocean-200/70">
          Made in India · Blue Economy
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
