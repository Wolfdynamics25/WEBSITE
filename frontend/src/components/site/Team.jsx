const team = [
  { name: "Ishaan Prakash", role: "Co-founder · Engineering & Autonomy", locus: "Aerodynamics · Aircraft Design · Controls" },
  { name: "Jaishik Kotian", role: "Co-founder · Systems & Operations", locus: "Unmanned Systems · Integration · Deployment" },
  { name: "Air Marshal Kanakaraj (Retd.)", role: "Technical Advisor", locus: "Manufacturing · Airworthiness · Regulatory" },
  { name: "Shaswat Sinha", role: "Business & Mentorship", locus: "Marine Aviation Ecosystem · Growth Strategy" },
];

const Team = () => (
  <section id="team" data-testid="team-section" className="relative py-32 md:py-40 border-t border-cyan-accent/10">
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-4 reveal">
          <span className="eyebrow">06 · Team</span>
          <h2 className="mt-4 font-serif text-white text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight">
            Deep-tech
            <span className="block italic text-ocean-200">operators.</span>
          </h2>
          <p className="mt-6 text-ocean-200 leading-relaxed">
            A compact core team backed by senior advisors across aerospace, defence
            and marine aviation.
          </p>
        </div>

        <div className="md:col-span-8 reveal">
          <div className="border border-cyan-accent/15 divide-y divide-cyan-accent/10">
            {team.map((t, idx) => (
              <div
                key={t.name}
                data-testid={`team-member-${idx}`}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 px-6 md:px-8 py-8 hover:bg-ocean-900/60 transition-colors duration-300 group"
              >
                <span className="md:col-span-1 font-mono text-[10px] tracking-[0.24em] text-cyan-accent">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="md:col-span-5 font-serif text-white text-2xl md:text-3xl">{t.name}</span>
                <span className="md:col-span-3 font-mono text-[11px] tracking-[0.14em] uppercase text-ocean-200 self-center">{t.role}</span>
                <span className="md:col-span-3 text-ocean-200 text-sm self-center">{t.locus}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Team;
