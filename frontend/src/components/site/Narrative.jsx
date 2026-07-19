const SectionLabel = ({ index, label, testid }) => (
  <div className="flex items-center gap-4 mb-8" data-testid={testid}>
    <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-cyan-accent">
      {index} · {label}
    </span>
    <span className="h-px flex-1 bg-cyan-accent/20 max-w-24" />
  </div>
);

const Narrative = () => (
  <section id="narrative" data-testid="narrative-section" className="relative py-32 md:py-40 border-t border-cyan-accent/10">
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      <SectionLabel index="01" label="The Gap" testid="narrative-label" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-7 reveal">
          <h2 className="font-serif text-white text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
            Boats are too slow.
            <span className="block italic text-ocean-200">Aviation is too expensive.</span>
            <span className="block">The sea has been waiting.</span>
          </h2>
        </div>
        <div className="md:col-span-5 md:pt-6 space-y-6 reveal">
          <p className="text-ocean-200 text-lg leading-relaxed">
            India has one of the world's longest coastlines and a growing appetite for
            coastal logistics — yet second-layer distribution remains operationally broken.
          </p>
          <p className="text-ocean-200 text-lg leading-relaxed">
            A clear mid-segment gap exists between conventional vessels and aviation:
            no scalable, high-frequency, low-infrastructure system for medium-payload
            coastal freight.
          </p>
          <div className="border-l-2 border-cyan-accent/60 pl-5 mt-8">
            <p className="font-serif italic text-white text-xl leading-snug">
              EAGS — an Electric Autonomous Ground-effect Shuttle — is engineered to close it.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Narrative;
