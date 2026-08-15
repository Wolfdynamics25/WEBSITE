const Impact = () => (
  <section id="impact" data-testid="impact-section" className="relative py-28 md:py-40 border-t border-tac-100/10 bg-tac-850 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
      <div className="flex items-center gap-4 mb-12">
        <span className="eyebrow">§ 05 · Impact</span>
        <span className="h-px flex-1 max-w-32 bg-tac-100/15" />
      </div>

      <div className="mb-16 reveal">
        <h2 className="font-display text-tac-100 text-4xl md:text-5xl lg:text-[72px] leading-[1.02] max-w-4xl">
          BEYOND A VEHICLE —<br />
          <span className="text-amber-warn">A COASTAL TRANSPORT LAYER.</span>
        </h2>
      </div>

      <div className="relative reveal">
        <div className="absolute -top-6 left-0 mono-label" style={{ color: "#4F8BE0" }}>FIG. 03 · REMOTE COASTAL DEPLOYMENT</div>
        <div className="relative overflow-hidden bg-tac-800 aspect-[16/9] md:aspect-[21/8]">
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
    </div>
  </section>
);

export default Impact;
