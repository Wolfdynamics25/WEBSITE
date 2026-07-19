import WigSilhouette from "@/components/site/WigSilhouette";

const Hero = () => {
  return (
    <section id="top" data-testid="hero-section" className="relative min-h-[100svh] overflow-hidden hero-horizon">
      {/* grid backdrop */}
      <div className="absolute inset-0 grid-lines opacity-40" aria-hidden="true" />

      {/* horizon line */}
      <div className="absolute left-0 right-0 top-[70%] h-px bg-gradient-to-r from-transparent via-cyan-accent/30 to-transparent" />

      {/* sweeping radar bar */}
      <div className="absolute inset-x-0 top-[70%] h-px overflow-hidden">
        <div className="h-full w-1/3 radar-sweep animate-sweep" />
      </div>

      {/* WIG craft silhouette */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
        <div className="w-full max-w-6xl px-8 mb-24 md:mb-32 opacity-90 animate-glide">
          <WigSilhouette />
        </div>
      </div>

      {/* content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-40 md:pt-48">
        <div className="max-w-4xl reveal">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-2 bg-signal-orange rounded-full animate-blink" />
            <span className="eyebrow" data-testid="hero-status-label">Status · In Development · Launching Soon</span>
          </div>

          <h1 className="font-serif text-white text-[42px] leading-[1.02] sm:text-6xl md:text-7xl lg:text-[92px] tracking-tight" data-testid="hero-headline">
            India's first
            <span className="block italic text-ocean-100/95">Wing-in-Ground</span>
            <span className="block">cargo vehicle.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg md:text-xl text-ocean-200 leading-relaxed" data-testid="hero-subhead">
            Autonomous. Electric. Runway-independent. A new maritime mobility class
            engineered for India's 11,000&nbsp;km coastline — fast as flight, simple as boat.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              data-testid="hero-cta-primary"
              className="group inline-flex items-center gap-3 px-6 py-3 bg-cyan-accent text-ocean-950 hover:bg-white transition-colors duration-300"
            >
              <span className="font-mono text-[11px] tracking-[0.24em] uppercase font-medium">Request Briefing</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform duration-300">
                <path d="M5 12h14M13 5l7 7-7 7"/>
              </svg>
            </a>
            <a
              href="#capabilities"
              data-testid="hero-cta-secondary"
              className="inline-flex items-center gap-3 px-6 py-3 border border-cyan-accent/40 hover:border-cyan-accent text-ocean-100 hover:bg-cyan-accent/5 transition-colors duration-300"
            >
              <span className="font-mono text-[11px] tracking-[0.24em] uppercase">Explore Capabilities</span>
            </a>
          </div>
        </div>

        {/* Telemetry strip */}
        <div className="mt-24 md:mt-32 border-t border-cyan-accent/15 pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 reveal" data-testid="hero-telemetry">
          {[
            { l: "Class", v: "Autonomous WIG" },
            { l: "Propulsion", v: "Electric" },
            { l: "Payload Class", v: "500–1000 kg" },
            { l: "Infra", v: "Runway-Independent" },
          ].map((s) => (
            <div key={s.l} className="flex flex-col gap-1">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ocean-200/70">{s.l}</span>
              <span className="font-serif text-xl md:text-2xl text-white">{s.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ocean-200">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-cyan-accent to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
