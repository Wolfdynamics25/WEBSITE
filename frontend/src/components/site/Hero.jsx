const Hero = () => {
  return (
    <section id="top" data-testid="hero-section" className="relative pt-24 md:pt-28 pb-16 overflow-hidden">
      {/* tactical grid backdrop */}
      <div className="absolute inset-0 tac-grid opacity-60 pointer-events-none" aria-hidden="true" />

      {/* radial glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
        background: "radial-gradient(900px 400px at 70% 20%, rgba(79, 139, 224, 0.10), transparent 60%), radial-gradient(700px 400px at 20% 80%, rgba(143, 166, 199, 0.08), transparent 60%)"
      }} />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        {/* Classification bar */}
        <div className="flex flex-wrap items-center gap-4 mb-10 pt-8 reveal">
          <span className="stamp" data-testid="hero-status-label">
            <span className="w-1.5 h-1.5 bg-amber-warn rounded-full animate-blink" />
            Programme · In Development
          </span>
          <span className="mono-label">SECTOR · MARITIME DEFENCE · DUAL-USE</span>
          <span className="hidden md:inline-block h-px flex-1 max-w-24 bg-tac-100/15" />
          <span className="mono-label">ORIGIN · KARNATAKA · IN</span>
        </div>

        {/* Headline */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-end">
          <div className="md:col-span-8 reveal">
            <h1 data-testid="hero-headline" className="font-display text-tac-100 text-[46px] leading-[0.92] sm:text-6xl md:text-[86px] lg:text-[120px] tracking-[-0.005em]">
              INDIA'S FIRST
              <span className="block text-amber-warn">UNMANNED WING-IN-GROUND</span>
              <span className="block">CARGO VEHICLE.</span>
            </h1>
          </div>
          <div className="md:col-span-4 md:pb-6 reveal">
            <div className="border-l-2 border-amber-warn pl-5 mb-8">
              <p className="font-display text-tac-100 text-xl md:text-2xl leading-tight">
                FAST AS FLIGHT.<br />
                <span className="text-amber-warn">SIMPLE AS BOAT.</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                data-testid="hero-cta-primary"
                className="group inline-flex items-center gap-3 px-5 py-3 bg-amber-warn text-tac-900 hover:bg-tac-100 transition-colors duration-300"
              >
                <span className="font-mono text-[11px] tracking-[0.24em] uppercase font-medium">Get in touch</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform duration-300">
                  <path d="M5 12h14M13 5l7 7-7 7"/>
                </svg>
              </a>
              <a
                href="#capabilities"
                data-testid="hero-cta-secondary"
                className="inline-flex items-center gap-3 px-5 py-3 border border-tac-100/25 hover:border-amber-warn hover:text-amber-warn transition-colors duration-300"
              >
                <span className="font-mono text-[11px] tracking-[0.24em] uppercase">Capabilities</span>
              </a>
            </div>
          </div>
        </div>

        {/* Product image */}
        <div className="mt-14 md:mt-20 relative reveal">
          <div className="absolute -top-6 left-0 mono-label" style={{ color: "#4F8BE0" }}>FIG. 01 · EAGS · SEA TRIAL RENDER</div>
          <div className="absolute -top-6 right-0 mono-label">TIMESTAMP · REV. 08</div>

          <div className="relative overflow-hidden bg-tac-800 aspect-[21/9]">
            <img
              src="/assets/hero-render.jpg"
              alt="EAGS — Electric Autonomous Ground-effect Shuttle over water"
              className="w-full h-full object-cover"
              data-testid="hero-image"
            />
            {/* Vignette + tactical overlays */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(10,14,12,0.35) 0%, rgba(10,14,12,0) 30%, rgba(10,14,12,0) 70%, rgba(10,14,12,0.5) 100%)" }} />
            {/* Target reticle */}
            <div className="absolute top-6 right-6 pointer-events-none">
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none" className="text-amber-warn/80">
                <circle cx="26" cy="26" r="18" stroke="currentColor" strokeWidth="0.8" fill="none"/>
                <path d="M26 4 L26 14 M26 38 L26 48 M4 26 L14 26 M38 26 L48 26" stroke="currentColor" strokeWidth="0.8"/>
                <circle cx="26" cy="26" r="1.5" fill="currentColor"/>
              </svg>
            </div>
            {/* Bottom stat overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-tac-100">
              <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-tac-100/80">
                LAT · 12.9141° N   ·   LON · 74.8560° E   ·   ALT · 3M AGL
              </div>
              <div className="hidden md:block font-mono text-[10px] tracking-[0.28em] uppercase text-amber-warn/90">TRACKING</div>
            </div>
          </div>

          <span className="crosshair tl" />
          <span className="crosshair tr" />
          <span className="crosshair bl" />
          <span className="crosshair br" />
        </div>

        {/* Spec strip */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 border border-tac-100/12 reveal" data-testid="hero-telemetry">
          {[
            { l: "Class", v: "AUTONOMOUS WIG" },
            { l: "Propulsion", v: "ELECTRIC" },
            { l: "Payload", v: "500–1000 KG" },
            { l: "Infra", v: "RUNWAY-INDEPENDENT" },
          ].map((s, i) => (
            <div key={s.l} className={`p-6 md:p-8 ${i > 0 ? "md:border-l md:border-tac-100/12" : ""} ${i > 1 ? "border-t md:border-t-0 border-tac-100/12" : ""} ${i === 1 ? "border-t md:border-t-0 border-tac-100/12" : ""}`}>
              <div className="mono-label mb-2" style={{ color: "#4F8BE0" }}>{`SPEC · 0${i + 1}`}</div>
              <div className="mono-label mb-3">{s.l}</div>
              <div className="font-display text-2xl md:text-3xl text-tac-100 leading-none">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
