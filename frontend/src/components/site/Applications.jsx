import { Ship, MapPin, Factory, LifeBuoy, Crosshair, Radar } from "lucide-react";

const apps = [
  { icon: Ship, code: "APP · A1", title: "Coastal Cargo", body: "Non-major to major port ferry lines. High-frequency medium-payload freight across working coasts." },
  { icon: MapPin, code: "APP · A2", title: "Island Connectivity", body: "Lakshadweep, Andaman & Nicobar and remote island communities. Faster, more frequent lifelines." },
  { icon: Factory, code: "APP · A3", title: "Offshore Energy", body: "Rapid crew spares, tools and time-critical logistics for offshore rigs and wind farms." },
  { icon: LifeBuoy, code: "APP · A4", title: "Disaster Relief", body: "Rapid coastal deployment when runways and roads are compromised — medical aid, essential supplies." },
  { icon: Crosshair, code: "APP · A5", title: "Defence & Naval Logistics", body: "Low-signature, distributed autonomous logistics — ship-to-shore and ship-to-ship resupply." },
  { icon: Radar, code: "APP · A6", title: "Maritime Surveillance", body: "Persistent, low-altitude autonomous platform for coastal monitoring and environmental patrol." },
];

const Applications = () => (
  <section id="applications" data-testid="applications-section" className="relative py-32 md:py-40 border-t border-cyan-accent/10 overflow-hidden">
    {/* faint grid backdrop */}
    <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" aria-hidden="true" />

    <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
      <div className="mb-16 reveal">
        <span className="eyebrow">03 · Applications</span>
        <h2 className="mt-4 font-serif text-white text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight max-w-3xl">
          One platform. Many missions.
        </h2>
        <p className="mt-6 max-w-2xl text-ocean-200 leading-relaxed">
          EAGS is a dual-use maritime mobility platform — designed from day one for both
          civilian coastal logistics and strategic operations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 reveal">
        {apps.map((a) => {
          const Icon = a.icon;
          return (
            <div
              key={a.title}
              data-testid={`application-${a.title.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`}
              className="relative border border-cyan-accent/15 p-8 group hover:border-cyan-accent/60 transition-colors duration-500 bg-ocean-950/60 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] tracking-[0.24em] text-cyan-accent">{a.code}</span>
                <Icon className="text-ocean-100 group-hover:text-cyan-accent transition-colors duration-300" size={18} strokeWidth={1.25} />
              </div>
              <h3 className="font-serif text-white text-2xl md:text-3xl mb-3">{a.title}</h3>
              <p className="text-ocean-200 leading-relaxed text-[15px]">{a.body}</p>
              <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-cyan-accent transition-[width] duration-700" />
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Applications;
