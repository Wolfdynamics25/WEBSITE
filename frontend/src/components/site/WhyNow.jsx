const points = [
  {
    tag: "GLOBAL · 01",
    title: "WIG craft, re-emerging",
    body: "A global resurgence of Wing-in-Ground technology is underway — driven by mature autonomy stacks, modern composites, and electric propulsion readiness that were unavailable to earlier generations.",
  },
  {
    tag: "INDIA · 02",
    title: "Sagarmala 2.0 & the Blue Economy",
    body: "India's coastal infrastructure vision explicitly calls for multimodal port connectivity, non-major port throughput and island connectivity. Policy tailwinds meet a real, unmet operational need.",
  },
  {
    tag: "READINESS · 03",
    title: "The physics is validated",
    body: "Ground-effect lift enhancement has been experimentally demonstrated in lab conditions. The programme has moved past concept — architecture, mission profile and preliminary configuration studies are in progress.",
  },
];

const WhyNow = () => (
  <section id="why-now" data-testid="whynow-section" className="relative py-32 md:py-40 border-t border-cyan-accent/10">
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-4 reveal">
          <span className="eyebrow">04 · Why Now</span>
          <h2 className="mt-4 font-serif text-white text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight">
            The window is
            <span className="block italic text-ocean-200">open.</span>
          </h2>
          <p className="mt-6 text-ocean-200 leading-relaxed">
            Technology maturity, market pull, and national priorities are converging.
            EAGS is India's shot at building this category — from here.
          </p>
        </div>

        <div className="md:col-span-8 space-y-px bg-cyan-accent/15 border border-cyan-accent/15 reveal">
          {points.map((p) => (
            <div key={p.tag} className="bg-ocean-950 p-8 md:p-10 flex flex-col md:flex-row gap-6 md:gap-10 hover:bg-ocean-900 transition-colors duration-500">
              <div className="md:w-32 shrink-0">
                <span className="font-mono text-[10px] tracking-[0.24em] text-cyan-accent">{p.tag}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-white text-2xl md:text-3xl mb-3">{p.title}</h3>
                <p className="text-ocean-200 leading-relaxed">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhyNow;
