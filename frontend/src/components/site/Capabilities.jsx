import { Waves, Cpu, BatteryCharging, Anchor, ShieldCheck, Radio } from "lucide-react";

const capabilities = [
  { icon: Waves, tag: "AERO · 01", title: "GROUND EFFECT", body: "Cruises within meters of the sea surface, exploiting aerodynamic ground effect for a step-change in lift-to-drag efficiency versus conventional aircraft." },
  { icon: Cpu, tag: "AUTO · 02", title: "AUTONOMY", body: "Purpose-built autonomy stack for maritime environments — obstacle avoidance, weather-aware routing, and resilient command & control across multiple communication planes." },
  { icon: BatteryCharging, tag: "PROP · 03", title: "ELECTRIC PROPULSION", body: "Hybrid-electric powertrain designed for low emissions and low operating cost — enabling high-frequency, scalable coastal operations." },
  { icon: Anchor, tag: "OPS · 04", title: "RUNWAY-INDEPENDENT", body: "Auto-docks on temporary pontoons. Operates non-major ports and remote coastlines with minimal fixed infrastructure." },
  { icon: ShieldCheck, tag: "SAFE · 05", title: "SEA-STATE READY", body: "Designed for Sea-State 4 with a target of 250+ operational days annually — dependable across the working year, not just the calm months." },
  { icon: Radio, tag: "C2 · 06", title: "THREE-PLANE COMMS", body: "Redundant links — L-band backbone, LEO broadband, and broadcast safety — architected so a communications loss never becomes a hazard." },
];

const Capabilities = () => (
  <section id="capabilities" data-testid="capabilities-section" className="relative py-28 md:py-40 border-t border-tac-100/10 bg-tac-850">
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      <div className="flex items-center gap-4 mb-12">
        <span className="eyebrow">§ 02 · Capabilities</span>
        <span className="h-px flex-1 max-w-32 bg-tac-100/15" />
      </div>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 reveal">
        <h2 className="font-display text-tac-100 text-4xl md:text-5xl lg:text-[72px] leading-[1.02] max-w-3xl">
          A NEW CLASS OF <span className="text-amber-warn">MARITIME VEHICLE.</span>
        </h2>
        <p className="max-w-md text-tac-200 leading-[1.65]">
          Novel application of known physics. Modern autonomy. Marine-grade engineering.
          Built to move medium-payload cargo — quickly, cleanly, and reliably.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-tac-100/8 border border-tac-100/12 reveal">
        {capabilities.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.title}
              data-testid={`capability-${c.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="relative bg-tac-900 p-8 md:p-10 group hover:bg-tac-850 transition-colors duration-500"
            >
              <span className="crosshair tl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="crosshair tr opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="crosshair bl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="crosshair br opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center justify-between mb-8">
                <Icon className="text-amber-warn" size={22} strokeWidth={1.5} />
                <span className="mono-label" style={{ color: "#E87722" }}>{c.tag}</span>
              </div>
              <h3 className="font-display text-tac-100 text-2xl md:text-3xl mb-4 leading-none">{c.title}</h3>
              <p className="text-tac-200 leading-[1.65] text-[15px]">{c.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Capabilities;
