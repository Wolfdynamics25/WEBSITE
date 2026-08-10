const outcomes = [
  { k: "Healthcare access", v: "HOURS TO MINUTES" },
  { k: "Fisher livelihoods", v: "LESS SPOILAGE, FASTER MOVEMENT" },
  { k: "Port throughput", v: "UPLIFT FOR NON-MAJOR PORTS" },
  { k: "Regional jobs", v: "SKILLED EMPLOYMENT · PILOT CORRIDOR" },
];

const Impact = () => (
  <section id="impact" data-testid="impact-section" className="relative py-28 md:py-40 border-t border-tac-100/10 bg-tac-850 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
      <div className="flex items-center gap-4 mb-12">
        <span className="eyebrow">§ 04 · Impact</span>
        <span className="h-px flex-1 max-w-32 bg-tac-100/15" />
      </div>

      <div className="mb-16 reveal">
        <h2 className="font-display text-tac-100 text-4xl md:text-5xl lg:text-[72px] leading-[1.02] max-w-4xl">
          BEYOND A VEHICLE —<br />
          <span className="text-amber-warn">A COASTAL TRANSPORT LAYER.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 reveal">
        <div className="lg:col-span-7 relative">
          <div className="absolute -top-6 left-0 mono-label" style={{ color: "#4F8BE0" }}>FIG. 03 · REMOTE COASTAL DEPLOYMENT</div>
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
            <div key={o.k} className="px-6 py-6 md:py-7" data-testid={`impact-outcome-${i}`}>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="mono-label" style={{ color: "#4F8BE0" }}>{String(i + 1).padStart(2, "0")}</span>
                <span className="mono-label">{o.k}</span>
              </div>
              <p className="font-display text-tac-100 text-xl md:text-2xl leading-tight">{o.v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Impact;
