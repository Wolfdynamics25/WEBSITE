const Footer = () => (
  <footer data-testid="site-footer" className="relative border-t border-tac-100/10 bg-tac-950">
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-7">
          <div className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 40 40" fill="none" className="text-amber-warn">
              <path d="M4 8 L20 4 L36 8 L36 20 L20 34 L4 20 Z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
              <path d="M12 18 L20 12 L28 18" stroke="currentColor" strokeWidth="1.2" fill="none"/>
              <path d="M12 22 L28 22" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
            </svg>
            <div className="flex flex-col leading-none">
              <span className="font-display text-xl tracking-[0.02em] text-tac-100">WOLFDYNAMICS SYSTEMS</span>
              <span className="font-mono text-[9px] tracking-[0.32em] text-amber-warn mt-1">PVT. LTD. · DEFENCE-GRADE</span>
            </div>
          </div>
          <p className="mt-8 font-display text-2xl md:text-3xl text-tac-100 max-w-md leading-tight">
            FAST AS FLIGHT. <span className="text-amber-warn">SIMPLE AS BOAT.</span>
          </p>
          <p className="mt-4 text-tac-300 text-sm max-w-md leading-[1.65]">
            Building India's coastal logistics future — an autonomous, electric, ground-effect
            maritime mobility platform.
          </p>
        </div>

        <div className="md:col-span-5">
          <span className="mono-label" style={{ color: "#E87722" }}>CONTACT</span>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href="mailto:info@wolfdynamics.in"
                data-testid="footer-email"
                className="font-display text-tac-100 text-xl md:text-2xl hover:text-amber-warn transition-colors duration-300 break-all"
              >
                info@wolfdynamics.in
              </a>
            </li>
            <li className="font-display text-tac-200 text-lg">KARNATAKA · INDIA</li>
          </ul>
        </div>
      </div>

      <div className="mt-14 pt-6 border-t border-tac-100/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <span className="mono-label">© {new Date().getFullYear()} WOLFDYNAMIC SYSTEMS PVT. LTD.</span>
        <span className="mono-label">MADE IN INDIA · BLUE ECONOMY · DUAL-USE</span>
      </div>
    </div>
  </footer>
);

export default Footer;
