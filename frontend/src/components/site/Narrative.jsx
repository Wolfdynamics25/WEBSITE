const Narrative = () => (
  <section id="narrative" data-testid="narrative-section" className="relative py-28 md:py-40 border-t border-tac-100/10">
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      <div className="flex items-center gap-4 mb-12">
        <span className="eyebrow">§ 01 · The Gap</span>
        <span className="h-px flex-1 max-w-32 bg-tac-100/15" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-7 reveal">
          <h2 className="font-display text-tac-100 text-4xl md:text-6xl lg:text-[80px] leading-[1.02] tracking-[-0.005em]">
            BOATS ARE TOO SLOW.
            <span className="block text-tac-300">AVIATION IS TOO EXPENSIVE.</span>
            <span className="block text-amber-warn">THE SEA HAS BEEN WAITING.</span>
          </h2>
        </div>
        <div className="md:col-span-5 md:pt-6 space-y-6 reveal">
          <p className="text-tac-200 text-lg leading-[1.65]">
            India has one of the world's longest coastlines and a growing appetite for
            coastal logistics — yet second-layer distribution remains operationally broken.
          </p>
          <p className="text-tac-200 text-lg leading-[1.65]">
            A clear mid-segment gap exists between conventional vessels and aviation:
            no scalable, high-frequency, low-infrastructure system for medium-payload
            coastal freight.
          </p>
          <div className="border-l-2 border-amber-warn pl-5 mt-8">
            <p className="font-display text-tac-100 text-xl leading-tight">
              EAGS — AN ELECTRIC AUTONOMOUS GROUND-EFFECT SHUTTLE — IS ENGINEERED TO CLOSE IT.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Narrative;
