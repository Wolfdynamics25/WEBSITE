const Footer = () => (
  <footer data-testid="site-footer" className="relative border-t border-tac-100/10 bg-tac-950">
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-7">
          <div className="flex items-center gap-4">
            <img
              src="/assets/wolf-logo-light.png"
              alt="Wolfdynamics Systems"
              className="h-12 md:h-14 w-auto"
            />
            <span className="h-8 w-px bg-tac-100/25" />
            <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-amber-warn leading-tight">
              Pvt. Ltd.<br/>Defence-Grade
            </span>
          </div>
          <p className="mt-8 font-display text-2xl md:text-3xl text-tac-100 max-w-md leading-tight">
            FAST AS FLIGHT. <span className="text-amber-warn">SIMPLE AS BOAT.</span>
          </p>
        </div>

        <div className="md:col-span-5">
          <span className="mono-label" style={{ color: "#4F8BE0" }}>CONTACT</span>
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
        <span className="mono-label">MADE IN INDIA · DUAL-USE</span>
      </div>
    </div>
  </footer>
);

export default Footer;
