import { Plane, Radar } from "lucide-react";

const products = [
  {
    icon: Plane,
    code: "PRODUCT · P1",
    title: "WING-IN-GROUND PLATFORM",
    line: "EAGS — Autonomous · Electric · Coastal Cargo",
    body: "A new class of unmanned maritime vehicle that cruises within meters of the sea surface — engineered for high-frequency, medium-payload coastal freight and dual-use defence logistics.",
    image: "/assets/hero-render.jpg",
  },
  {
    icon: Radar,
    code: "PRODUCT · P2",
    title: "AUGMENTED IR EMITTER",
    line: "For Target Drones & Decoys",
    body: "Compact infrared signature emitter engineered to augment target drones and decoy platforms — enabling realistic training scenarios and effective countermeasure deployment.",
    image: null,
  },
];

const Products = () => (
  <section id="products" data-testid="products-section" className="relative py-28 md:py-40 border-t border-tac-100/10 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
      <div className="flex items-center gap-4 mb-12">
        <span className="eyebrow">§ 03 · Products</span>
        <span className="h-px flex-1 max-w-32 bg-tac-100/15" />
      </div>

      <div className="mb-14 reveal">
        <h2 className="font-display text-tac-100 text-4xl md:text-5xl lg:text-[72px] leading-[1.02] max-w-4xl">
          THE <span className="text-amber-warn">PORTFOLIO.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 reveal">
        {products.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={p.title}
              data-testid={`product-${idx === 0 ? "wig-platform" : "ir-emitter"}`}
              className="relative border border-tac-100/15 bg-tac-850 group hover:border-amber-warn transition-colors duration-500 overflow-hidden flex flex-col"
            >
              <span className="crosshair tl" />
              <span className="crosshair tr" />
              <span className="crosshair bl" />
              <span className="crosshair br" />

              {/* Media area */}
              {p.image ? (
                <div className="relative overflow-hidden bg-tac-800 aspect-[16/10]">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(6,16,36,0.15) 0%, rgba(6,16,36,0) 40%, rgba(6,16,36,0.65) 100%)" }} />
                </div>
              ) : (
                <div className="relative overflow-hidden bg-tac-800 aspect-[16/10] flex items-center justify-center">
                  {/* Abstract IR emitter visualisation */}
                  <svg viewBox="0 0 400 260" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient id="ir-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#4F8BE0" stopOpacity="0.9" />
                        <stop offset="60%" stopColor="#4F8BE0" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#4F8BE0" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    {/* Concentric heat rings */}
                    <circle cx="200" cy="130" r="110" stroke="rgba(79,139,224,0.15)" strokeWidth="1" fill="none" />
                    <circle cx="200" cy="130" r="82" stroke="rgba(79,139,224,0.25)" strokeWidth="1" fill="none" />
                    <circle cx="200" cy="130" r="54" stroke="rgba(79,139,224,0.4)" strokeWidth="1" fill="none" />
                    <circle cx="200" cy="130" r="30" fill="url(#ir-glow)" />
                    <circle cx="200" cy="130" r="6" fill="#4F8BE0" />
                    {/* Crosshair */}
                    <line x1="200" y1="30" x2="200" y2="70" stroke="rgba(180,191,209,0.5)" strokeWidth="1" />
                    <line x1="200" y1="190" x2="200" y2="230" stroke="rgba(180,191,209,0.5)" strokeWidth="1" />
                    <line x1="80" y1="130" x2="120" y2="130" stroke="rgba(180,191,209,0.5)" strokeWidth="1" />
                    <line x1="280" y1="130" x2="320" y2="130" stroke="rgba(180,191,209,0.5)" strokeWidth="1" />
                    {/* Small target ticks */}
                    <text x="20" y="20" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="rgba(180,191,209,0.6)">IR · SIG</text>
                    <text x="330" y="20" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="rgba(79,139,224,0.9)">ACTIVE</text>
                    <text x="20" y="248" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="rgba(180,191,209,0.6)">λ · 3–5 µm</text>
                    <text x="325" y="248" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="rgba(180,191,209,0.6)">TGT · SIM</text>
                  </svg>
                </div>
              )}

              {/* Text block */}
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="mono-label" style={{ color: "#4F8BE0" }}>{p.code}</span>
                  <Icon className="text-tac-100 group-hover:text-amber-warn transition-colors duration-300" size={20} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-tac-100 text-2xl md:text-3xl leading-tight mb-2">{p.title}</h3>
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-amber-warn mb-4">{p.line}</p>
                <p className="text-tac-200 leading-[1.65] text-[14.5px]">{p.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Products;
