import { Waves, Cpu, BatteryCharging, Anchor, ShieldCheck, Radio } from "lucide-react";

const capabilities = [
  {
    icon: Waves,
    tag: "AERO · 01",
    title: "Ground Effect",
    body: "Cruises within meters of the sea surface, exploiting aerodynamic ground effect for a step-change in lift-to-drag efficiency versus conventional aircraft.",
  },
  {
    icon: Cpu,
    tag: "AUTO · 02",
    title: "Autonomy",
    body: "Purpose-built autonomy stack for maritime environments — obstacle avoidance, weather-aware routing, and resilient command & control across multiple communication planes.",
  },
  {
    icon: BatteryCharging,
    tag: "PROP · 03",
    title: "Electric Propulsion",
    body: "Hybrid-electric powertrain designed for low emissions and low operating cost — enabling high-frequency, scalable coastal operations.",
  },
  {
    icon: Anchor,
    tag: "OPS · 04",
    title: "Runway-Independent",
    body: "Auto-docks on temporary pontoons. Operates non-major ports and remote coastlines with minimal fixed infrastructure.",
  },
  {
    icon: ShieldCheck,
    tag: "SAFE · 05",
    title: "Sea-State Ready",
    body: "Designed for Sea-State 4 with a target of 250+ operational days annually — dependable across the working year, not just the calm months.",
  },
  {
    icon: Radio,
    tag: "C2 · 06",
    title: "Three-Plane Comms",
    body: "Redundant links — L-band backbone, LEO broadband, and broadcast safety — architected so a communications loss never becomes a hazard.",
  },
];

const Capabilities = () => (
  <section id="capabilities" data-testid="capabilities-section" className="relative py-32 md:py-40 border-t border-cyan-accent/10">
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 reveal">
        <div>
          <span className="eyebrow">02 · Capabilities</span>
          <h2 className="mt-4 font-serif text-white text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            A new class of maritime vehicle.
          </h2>
        </div>
        <p className="max-w-md text-ocean-200 leading-relaxed">
          Novel application of known physics. Modern autonomy. Marine-grade engineering.
          Built to move medium-payload cargo — quickly, cleanly, and reliably.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-cyan-accent/15 border border-cyan-accent/15 reveal">
        {capabilities.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.title}
              data-testid={`capability-${c.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="relative bg-ocean-950 p-8 md:p-10 group hover:bg-ocean-900 transition-colors duration-500"
            >
              <span className="tele-bracket tl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="tele-bracket tr opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="tele-bracket bl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="tele-bracket br opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center justify-between mb-8">
                <Icon className="text-cyan-accent" size={22} strokeWidth={1.25} />
                <span className="font-mono text-[10px] tracking-[0.24em] text-ocean-200/70">{c.tag}</span>
              </div>
              <h3 className="font-serif text-white text-2xl md:text-3xl mb-4">{c.title}</h3>
              <p className="text-ocean-200 leading-relaxed text-[15px]">{c.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Capabilities;
