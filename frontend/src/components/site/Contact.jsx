import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin } from "lucide-react";
import api, { formatApiErrorDetail } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const interests = [
  { value: "investor", label: "Investor" },
  { value: "partner", label: "Strategic Partner" },
  { value: "customer", label: "Customer / Operator" },
  { value: "media", label: "Media / Press" },
  { value: "career", label: "Career" },
  { value: "other", label: "Other" },
];

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    interest: "investor",
    message: "",
  });
  const [busy, setBusy] = useState(false);

  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target ? e.target.value : e }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Name, email and message are required");
      return;
    }
    setBusy(true);
    try {
      await api.post("/contact", form);
      toast.success("Message received. We will respond within 48 hours.");
      setForm({ name: "", email: "", organization: "", interest: "investor", message: "" });
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail) || "Unable to submit right now.");
    } finally {
      setBusy(false);
    }
  };

  const inputClass = "bg-tac-900 border-tac-100/20 rounded-none focus-visible:ring-amber-warn focus-visible:ring-1 focus-visible:ring-offset-0 text-tac-100 h-11";
  const labelClass = "font-mono text-[10px] tracking-[0.24em] uppercase text-tac-200";

  return (
    <section id="contact" data-testid="contact-section" className="relative py-28 md:py-40 border-t border-tac-100/10 overflow-hidden">
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
          <div className="md:col-span-5 reveal">
            <h2 className="font-display text-tac-100 text-4xl md:text-5xl lg:text-[72px] leading-[1.02]">
              LET'S BUILD THE<br />
              <span className="text-amber-warn">COAST OF TOMORROW.</span>
            </h2>

            <div className="mt-10 space-y-8">
              <div>
                <div className="mono-label mb-3 flex items-center gap-2">
                  <Mail size={12} strokeWidth={1.5} />
                  <span>Direct · Email</span>
                </div>
                <a
                  href="mailto:info@wolfdynamics.in"
                  data-testid="contact-email-link"
                  className="inline-block font-display text-xl md:text-3xl text-tac-100 hover:text-amber-warn transition-colors duration-300 leading-none break-all"
                >
                  info@wolfdynamics.in
                </a>
              </div>
              <div>
                <div className="mono-label mb-3 flex items-center gap-2">
                  <MapPin size={12} strokeWidth={1.5} />
                  <span>Base of Operations</span>
                </div>
                <p className="font-display text-xl md:text-2xl text-tac-100 leading-none">
                  KARNATAKA · INDIA
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 reveal">
            <form
              onSubmit={submit}
              data-testid="contact-form"
              className="relative border border-tac-100/15 bg-tac-850 p-8 md:p-10 space-y-5"
            >
              <span className="crosshair tl" />
              <span className="crosshair tr" />
              <span className="crosshair bl" />
              <span className="crosshair br" />

              <div className="flex items-center gap-3 pb-4 border-b border-tac-100/10 mb-4">
                <span className="w-1.5 h-1.5 bg-amber-warn rounded-full animate-blink" />
                <span className="mono-label" style={{ color: "#E87722" }}>SECURE CHANNEL · OPEN</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="c-name" className={labelClass}>Name</Label>
                  <Input id="c-name" data-testid="contact-name-input" value={form.name} onChange={upd("name")} required className={inputClass} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-email" className={labelClass}>Email</Label>
                  <Input id="c-email" data-testid="contact-email-input" type="email" value={form.email} onChange={upd("email")} required className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="c-org" className={labelClass}>Organization</Label>
                  <Input id="c-org" data-testid="contact-organization-input" value={form.organization} onChange={upd("organization")} className={inputClass} />
                </div>
                <div className="space-y-2">
                  <Label className={labelClass}>I am a</Label>
                  <Select value={form.interest} onValueChange={(v) => setForm((f) => ({ ...f, interest: v }))}>
                    <SelectTrigger data-testid="contact-interest-trigger" className={inputClass + " justify-between"}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-tac-850 border-tac-100/20 rounded-none">
                      {interests.map((i) => (
                        <SelectItem
                          key={i.value}
                          value={i.value}
                          data-testid={`contact-interest-${i.value}`}
                          className="rounded-none focus:bg-amber-warn/10 focus:text-tac-100"
                        >
                          {i.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="c-msg" className={labelClass}>Message</Label>
                <Textarea
                  id="c-msg"
                  data-testid="contact-message-input"
                  value={form.message}
                  onChange={upd("message")}
                  required
                  rows={5}
                  className="bg-tac-900 border-tac-100/20 rounded-none focus-visible:ring-amber-warn focus-visible:ring-1 focus-visible:ring-offset-0 text-tac-100 min-h-32"
                  placeholder="Tell us why you're reaching out."
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                <span className="mono-label" style={{ letterSpacing: "0.14em" }}>
                  Response within 48 hours · Treated confidentially
                </span>
                <button
                  type="submit"
                  disabled={busy}
                  data-testid="contact-submit-button"
                  className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-amber-warn text-tac-900 hover:bg-tac-100 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-300"
                >
                  <span className="font-mono text-[11px] tracking-[0.24em] uppercase font-medium">
                    {busy ? "Transmitting…" : "Send Inquiry"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
