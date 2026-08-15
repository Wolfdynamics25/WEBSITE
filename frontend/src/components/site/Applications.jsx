import { Ship, MapPin, Factory, LifeBuoy, Crosshair, Radar } from "lucide-react";

const apps = [
  { icon: Ship, code: "APP · A1", title: "COASTAL CARGO" },
  { icon: MapPin, code: "APP · A2", title: "ISLAND CONNECTIVITY" },
  { icon: Factory, code: "APP · A3", title: "OFFSHORE ENERGY" },
  { icon: LifeBuoy, code: "APP · A4", title: "DISASTER RELIEF" },
  { icon: Crosshair, code: "APP · A5", title: "DEFENCE & NAVAL LOGISTICS" },
  { icon: Radar, code: "APP · A6", title: "MARITIME SURVEILLANCE" },
];

const Applications = () => (
  <section id="applications" data-testid="applications-section" className="relative py-28 md:py-40 border-t border-tac-100/10 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
      <div className="flex items-center gap-4 mb-12">
        <span className="eyebrow">§ 04 · Applications</span>
        <span className="h-px flex-1 max-w-32 bg-tac-100/15" />
      </div>

      <div className="mb-14 reveal">
        <h2 className="font-display text-tac-100 text-4xl md:text-5xl lg:text-[72px] leading-[1.02] max-w-4xl">
          ONE PLATFORM. <span className="text-amber-warn">MANY MISSIONS.</span>
        </h2>
      </div>

      {/* Featured Ops image */}
      <div className="relative mb-12 reveal">
        <div className="absolute -top-6 left-0 mono-label" style={{ color: "#4F8BE0" }}>FIG. 02 · FRP PONTOON PORT · CARGO OPS</div>
        <div className="absolute -top-6 right-0 mono-label">CONFIG · UNMANNED · 500 KG</div>
        <div className="relative overflow-hidden bg-tac-800 aspect-[16/9] md:aspect-[21/8]">
          <img
            src="/assets/ops-3.jpg"
            alt="EAGS docked at FRP Pontoon Port with cargo being loaded"
            className="w-full h-full object-cover"
            data-testid="applications-hero-image"
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(10,14,12,0.15) 0%, rgba(10,14,12,0) 30%, rgba(10,14,12,0) 70%, rgba(10,14,12,0.55) 100%)" }} />
        </div>
        <span className="crosshair tl" />
        <span className="crosshair tr" />
        <span className="crosshair bl" />
        <span className="crosshair br" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 reveal">
        {apps.map((a) => {
          const Icon = a.icon;
          return (
            <div
              key={a.title}
              data-testid={`application-${a.title.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`}
              className="relative border border-tac-100/12 px-6 py-5 md:px-7 md:py-6 group hover:border-amber-warn transition-colors duration-500 bg-tac-850 flex flex-col justify-between gap-4"
            >
              <div className="flex items-center justify-between">
                <span className="mono-label" style={{ color: "#4F8BE0" }}>{a.code}</span>
                <Icon className="text-tac-100 group-hover:text-amber-warn transition-colors duration-300" size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-tac-100 text-xl md:text-2xl leading-tight">{a.title}</h3>
              <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-amber-warn transition-[width] duration-700" />
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Applications;
