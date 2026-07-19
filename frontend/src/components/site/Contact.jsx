import { Mail, ArrowUpRight } from "lucide-react";

const Contact = () => (
  <section id="contact" data-testid="contact-section" className="relative py-32 md:py-40 border-t border-cyan-accent/10">
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
        <div className="md:col-span-5 reveal">
          <span className="eyebrow">05 · Contact</span>
          <h2 className="mt-4 font-serif text-white text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight">
            Let's build the
            <span className="block italic text-ocean-200">coast of tomorrow.</span>
          </h2>
          <p className="mt-6 text-ocean-200 leading-relaxed text-lg max-w-md">
            Investors, potential operators, defence partners and press — write to us
            directly. We read and respond personally.
          </p>
        </div>

        <div className="md:col-span-7 reveal">
          <a
            href="mailto:info@wolfdynamics.in"
            data-testid="contact-email-link"
            className="group relative block border border-cyan-accent/20 bg-ocean-900/40 backdrop-blur-sm p-8 md:p-12 hover:border-cyan-accent/60 transition-colors duration-500"
          >
            <span className="tele-bracket tl" />
            <span className="tele-bracket tr" />
            <span className="tele-bracket bl" />
            <span className="tele-bracket br" />

            <div className="flex items-center gap-3 pb-6 border-b border-cyan-accent/10">
              <Mail className="text-cyan-accent" size={16} strokeWidth={1.25} />
              <span className="font-mono text-[11px] tracking-[0.24em] uppercase text-cyan-accent">Direct · Email</span>
            </div>

            <div className="mt-8 flex items-start justify-between gap-6">
              <div>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ocean-200/70">Write to</span>
                <p className="mt-3 font-serif text-white text-3xl md:text-5xl leading-tight break-all">
                  info@wolfdynamics.in
                </p>
              </div>
              <ArrowUpRight
                className="text-ocean-100 shrink-0 mt-2 group-hover:text-cyan-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500"
                size={28}
                strokeWidth={1.25}
              />
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-cyan-accent/10">
              <div>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-cyan-accent">Based in</span>
                <p className="mt-2 font-serif text-white text-xl">Karnataka, India</p>
              </div>
              <div>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-cyan-accent">Response Time</span>
                <p className="mt-2 font-serif text-white text-xl">Within 2 business days</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
