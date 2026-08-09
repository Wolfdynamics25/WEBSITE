import { Waves, Cpu, BatteryCharging, Anchor, ShieldCheck, Radio } from "lucide-react";

const capabilities = [
  { icon: Waves, tag: "AERO · 01", title: "GROUND EFFECT" },
  { icon: Cpu, tag: "AUTO · 02", title: "AUTONOMY" },
  { icon: BatteryCharging, tag: "PROP · 03", title: "ELECTRIC PROPULSION" },
  { icon: Anchor, tag: "OPS · 04", title: "RUNWAY-INDEPENDENT" },
  { icon: ShieldCheck, tag: "SAFE · 05", title: "SEA-STATE READY" },
  { icon: Radio, tag: "C2 · 06", title: "THREE-PLANE COMMS" },
];

const Capabilities = () => (
  <section id="capabilities" data-testid="capabilities-section" className="relative py-28 md:py-40 border-t border-tac-100/10 bg-tac-850">
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      <div className="flex items-center gap-4 mb-12">
        <span className="eyebrow">§ 02 · Capabilities</span>
        <span className="h-px flex-1 max-w-32 bg-tac-100/15" />
      </div>

      <div className="mb-16 reveal">
        <h2 className="font-display text-tac-100 text-4xl md:text-5xl lg:text-[72px] leading-[1.02] max-w-4xl">
          A NEW CLASS OF <span className="text-amber-warn">MARITIME VEHICLE.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-tac-100/8 border border-tac-100/12 reveal">
        {capabilities.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.title}
              data-testid={`capability-${c.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="relative bg-tac-900 p-8 md:p-12 group hover:bg-tac-850 transition-colors duration-500 min-h-[220px] flex flex-col justify-between"
            >
              <span className="crosshair tl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="crosshair tr opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="crosshair bl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="crosshair br opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center justify-between">
                <Icon className="text-amber-warn" size={24} strokeWidth={1.5} />
                <span className="mono-label" style={{ color: "#E87722" }}>{c.tag}</span>
              </div>
              <h3 className="font-display text-tac-100 text-2xl md:text-3xl leading-none mt-8">{c.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Capabilities;
