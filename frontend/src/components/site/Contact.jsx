import { Mail, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" data-testid="contact-section" className="relative py-28 md:py-40 border-t border-tac-100/10 overflow-hidden">
      {/* Tactical grid backdrop */}
      <div className="absolute inset-0 tac-grid opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
        background: "radial-gradient(700px 380px at 50% 50%, rgba(232, 119, 34, 0.08), transparent 70%)"
      }} />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        <div className="flex items-center gap-4 mb-12">
          <span className="eyebrow">§ 05 · Contact</span>
          <span className="h-px flex-1 max-w-32 bg-tac-100/15" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-6 reveal">
            <h2 className="font-display text-tac-100 text-4xl md:text-5xl lg:text-[72px] leading-[1.02]">
              LET'S BUILD THE<br />
              <span className="text-amber-warn">COAST OF TOMORROW.</span>
            </h2>
            <p className="mt-6 text-tac-200 leading-[1.65] max-w-md">
              Investors, potential operators, defence partners and press — we would love to hear
              from you. Reach out and we will respond personally.
            </p>
          </div>

          <div className="md:col-span-6 reveal">
            <div className="relative border border-tac-100/15 bg-tac-850 p-8 md:p-10">
              <span className="crosshair tl" />
              <span className="crosshair tr" />
              <span className="crosshair bl" />
              <span className="crosshair br" />

              <div className="flex items-center gap-3 pb-5 mb-6 border-b border-tac-100/10">
                <span className="w-1.5 h-1.5 bg-amber-warn rounded-full animate-blink" />
                <span className="mono-label" style={{ color: "#E87722" }}>SECURE CHANNEL · OPEN</span>
              </div>

              <div className="space-y-8">
                <div>
                  <div className="mono-label mb-3 flex items-center gap-2">
                    <Mail size={12} strokeWidth={1.5} />
                    <span>Direct · Email</span>
                  </div>
                  <a
                    href="mailto:info@wolfdynamics.in"
                    data-testid="contact-email-link"
                    className="inline-block font-display text-2xl md:text-4xl lg:text-5xl text-tac-100 hover:text-amber-warn transition-colors duration-300 leading-none break-all"
                  >
                    info@wolfdynamics.in
                  </a>
                </div>

                <div>
                  <div className="mono-label mb-3 flex items-center gap-2">
                    <MapPin size={12} strokeWidth={1.5} />
                    <span>Base of Operations</span>
                  </div>
                  <p className="font-display text-2xl md:text-3xl text-tac-100 leading-none">
                    KARNATAKA · INDIA
                  </p>
                </div>

                <div className="pt-6 border-t border-tac-100/10">
                  <p className="mono-label text-tac-300 leading-[1.7]" style={{ letterSpacing: "0.12em" }}>
                    We respond within 48 hours to serious inquiries. All communication
                    is treated as confidential.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
