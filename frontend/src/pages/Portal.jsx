import { useEffect, useState } from "react";
import AppShell from "@/components/app/AppShell";
import api, { formatApiErrorDetail } from "@/lib/api";
import { Calendar, FileText, Lock } from "lucide-react";

const Portal = () => {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/portal/updates");
        setData(data);
      } catch (e) {
        setErr(formatApiErrorDetail(e.response?.data?.detail) || "Unable to load portal");
      }
    })();
  }, []);

  return (
    <AppShell
      subtitle="PARTNER PORTAL · PROGRAMME UPDATES"
      title={<>PROGRAMME <span className="text-amber-warn">BRIEFING.</span></>}
    >
      {err && (
        <div className="border border-signal-red/60 bg-signal-red/10 text-tac-100 px-4 py-3 mb-6 font-mono text-sm">
          {err}
        </div>
      )}

      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4" data-testid="portal-updates">
            {data.updates.map((u) => (
              <div key={u.id} data-testid={`update-${u.id}`} className="border border-tac-100/12 bg-tac-850 p-6 md:p-8 group hover:border-amber-warn transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar size={12} strokeWidth={1.5} className="text-amber-warn" />
                  <span className="mono-label" style={{ color: "#E87722" }}>{u.date}</span>
                </div>
                <h3 className="font-display text-tac-100 text-2xl md:text-3xl leading-tight mb-3">{u.title}</h3>
                <p className="text-tac-200 leading-[1.65]">{u.summary}</p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="border border-tac-100/12 bg-tac-850 p-6">
              <span className="mono-label" style={{ color: "#E87722" }}>DOCUMENTS</span>
              <ul className="mt-4 space-y-3" data-testid="portal-documents">
                {data.documents.map((d) => (
                  <li key={d.id} className="flex items-start gap-3">
                    <FileText size={16} strokeWidth={1.5} className="text-amber-warn mt-1 shrink-0" />
                    <div className="flex-1">
                      <div className="font-display text-tac-100 leading-tight">{d.title}</div>
                      <div className="mono-label mt-1">
                        {d.available ? d.type : (<><Lock size={10} className="inline mr-1" strokeWidth={1.5} /> {d.note}</>)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-tac-100/12 bg-tac-850 p-6">
              <span className="mono-label" style={{ color: "#E87722" }}>NEED SOMETHING SPECIFIC?</span>
              <p className="mt-3 text-tac-200 text-sm leading-[1.65]">
                Reach us directly for detailed briefings, references and technical Q&amp;A.
              </p>
              <a
                href="mailto:info@wolfdynamics.in"
                data-testid="portal-contact-email"
                className="mt-4 inline-block font-display text-tac-100 hover:text-amber-warn text-lg leading-tight break-all"
              >
                info@wolfdynamics.in
              </a>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
};

export default Portal;
