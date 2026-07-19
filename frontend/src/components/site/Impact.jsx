const impacts = [
  { code: "SDG 07", title: "AFFORDABLE & CLEAN ENERGY", body: "Efficient electric propulsion, engineered to lower the energy cost of coastal freight." },
  { code: "SDG 11", title: "SUSTAINABLE COMMUNITIES", body: "Reliable connectivity for coastal, island and fishing communities historically underserved by conventional logistics." },
  { code: "SDG 13", title: "CLIMATE ACTION", body: "Meaningful emissions reduction versus diesel-driven maritime alternatives." },
  { code: "SDG 14", title: "LIFE BELOW WATER", body: "Lower marine pollution footprint through electrified operations." },
];

const outcomes = [
  { k: "Healthcare access", v: "From hours to minutes for time-critical delivery" },
  { k: "Fisher livelihoods", v: "Faster movement of perishable catch, less spoilage" },
  { k: "Port throughput", v: "Uplift potential for non-major coastal ports" },
  { k: "Regional jobs", v: "Skilled and indirect employment across pilot corridor" },
];

const Impact = () => (
  <section id="impact" data-testid="impact-section" className="relative py-28 md:py-40 border-t border-tac-100/10 bg-tac-850 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
      <div className="flex items-center gap-4 mb-12">
        <span className="eyebrow">§ 04 · Impact</span>
        <span className="h-px flex-1 max-w-32 bg-tac-100/15" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-16 reveal">
        <h2 className="md:col-span-8 font-display text-tac-100 text-4xl md:text-5xl lg:text-[72px] leading-[1.02]">
          BEYOND A VEHICLE —<br />
          <span className="text-amber-warn">A COASTAL TRANSPORT LAYER.</span>
        </h2>
        <p className="md:col-span-4 self-end text-tac-200 leading-[1.65]">
          EAGS is designed to serve India's Blue Economy: cleaner, faster, more equitable
          movement along our coasts and islands.
        </p>
      </div>

      {/* Side-by-side: image + outcomes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-16 reveal">
        <div className="lg:col-span-7 relative">
          <div className="absolute -top-6 left-0 mono-label" style={{ color: "#E87722" }}>FIG. 03 · REMOTE COASTAL DEPLOYMENT</div>
          <div className="relative overflow-hidden bg-tac-800 aspect-[4/3]">
            <img
              src="/assets/ops-4.jpg"
              alt="EAGS approaching a pontoon in a remote coastal location"
              className="w-full h-full object-cover"
              data-testid="impact-image"
            />
          </div>
          <span className="crosshair tl" />
          <span className="crosshair tr" />
          <span className="crosshair bl" />
          <span className="crosshair br" />
        </div>

        <div className="lg:col-span-5 border border-tac-100/12 divide-y divide-tac-100/10 bg-tac-900 self-stretch">
          {outcomes.map((o, i) => (
            <div key={o.k} className="px-6 py-6 md:py-7">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="mono-label" style={{ color: "#E87722" }}>{String(i + 1).padStart(2, "0")}</span>
                <span className="mono-label">{o.k}</span>
              </div>
              <p className="font-display text-tac-100 text-xl md:text-2xl leading-tight">{o.v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SDG cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 reveal">
        {impacts.map((i) => (
          <div
            key={i.code}
            data-testid={`impact-${i.code.toLowerCase().replace(/\s+/g, '-')}`}
            className="relative border border-tac-100/12 p-6 bg-tac-900 group hover:border-amber-warn transition-colors duration-500"
          >
            <span className="mono-label" style={{ color: "#E87722" }}>{i.code}</span>
            <h3 className="font-display text-tac-100 text-lg md:text-xl mt-4 mb-3 leading-tight">{i.title}</h3>
            <p className="text-tac-200 text-sm leading-[1.65]">{i.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Impact;
