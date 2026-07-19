const impacts = [
  { code: "SDG 7", title: "Affordable & Clean Energy", body: "Efficient electric propulsion, engineered to lower the energy cost of coastal freight." },
  { code: "SDG 11", title: "Sustainable Communities", body: "Reliable connectivity for coastal, island and fishing communities historically underserved by conventional logistics." },
  { code: "SDG 13", title: "Climate Action", body: "Meaningful emissions reduction versus diesel-driven maritime alternatives." },
  { code: "SDG 14", title: "Life Below Water", body: "Lower marine pollution footprint through electrified operations." },
];

const outcomes = [
  { k: "Healthcare access", v: "From hours to minutes for time-critical delivery" },
  { k: "Fisher livelihoods", v: "Faster movement of perishable catch, less spoilage" },
  { k: "Port throughput", v: "Uplift potential for non-major coastal ports" },
  { k: "Regional jobs", v: "Skilled and indirect employment across the pilot corridor" },
];

const Impact = () => (
  <section id="impact" data-testid="impact-section" className="relative py-32 md:py-40 border-t border-cyan-accent/10 overflow-hidden">
    {/* deep gradient background */}
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 opacity-70" style={{
        background: "radial-gradient(700px 380px at 15% 40%, rgba(0, 94, 122, 0.35), transparent 60%), radial-gradient(600px 340px at 85% 65%, rgba(0, 229, 255, 0.08), transparent 60%)"
      }} />
    </div>

    <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
      <div className="max-w-3xl reveal">
        <span className="eyebrow">04 · Impact</span>
        <h2 className="mt-4 font-serif text-white text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
          Beyond a vehicle —
          <span className="block italic text-ocean-200">a coastal transport layer.</span>
        </h2>
        <p className="mt-6 text-ocean-200 leading-relaxed text-lg">
          EAGS is designed to serve India's Blue Economy: cleaner, faster, more equitable
          movement along our coasts and islands.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 reveal">
        {impacts.map((i) => (
          <div key={i.code} data-testid={`impact-${i.code.toLowerCase().replace(/\s+/g, '-')}`} className="relative border border-cyan-accent/15 p-6 bg-ocean-950/70 backdrop-blur-sm group hover:border-cyan-accent/60 transition-colors duration-500">
            <span className="font-mono text-[10px] tracking-[0.24em] text-cyan-accent">{i.code}</span>
            <h3 className="font-serif text-white text-xl md:text-2xl mt-4 mb-3">{i.title}</h3>
            <p className="text-ocean-200 text-sm leading-relaxed">{i.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 border border-cyan-accent/15 divide-y divide-cyan-accent/10 reveal">
        {outcomes.map((o) => (
          <div key={o.k} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 px-6 md:px-10 py-6 hover:bg-ocean-900/60 transition-colors duration-300">
            <span className="md:col-span-4 font-mono text-[11px] tracking-[0.24em] uppercase text-cyan-accent self-center">{o.k}</span>
            <span className="md:col-span-8 font-serif text-white text-xl md:text-2xl">{o.v}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Impact;
