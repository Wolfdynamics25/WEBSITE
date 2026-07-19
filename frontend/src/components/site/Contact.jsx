import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
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

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

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
  const [submitting, setSubmitting] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target ? e.target.value : e }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in name, email and message.");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message received. We'll be in touch.");
      setForm({ name: "", email: "", organization: "", interest: "investor", message: "" });
    } catch (err) {
      const msg = err?.response?.data?.detail || "Something went wrong. Please try again.";
      toast.error(typeof msg === "string" ? msg : "Unable to submit right now.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="relative py-32 md:py-40 border-t border-cyan-accent/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-5 reveal">
            <span className="eyebrow">07 · Contact</span>
            <h2 className="mt-4 font-serif text-white text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight">
              Let's build the
              <span className="block italic text-ocean-200">coast of tomorrow.</span>
            </h2>
            <p className="mt-6 text-ocean-200 leading-relaxed">
              Investors, potential operators, defence partners and press — we'd love to hear
              from you. Reach out and we will respond personally.
            </p>

            <div className="mt-10 space-y-6">
              <div>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-cyan-accent">Direct</span>
                <a
                  href="mailto:info@wolfdynamics.in"
                  data-testid="contact-email-link"
                  className="mt-2 block font-serif text-2xl md:text-3xl text-white hover:text-cyan-accent transition-colors duration-300"
                >
                  info@wolfdynamics.in
                </a>
              </div>
              <div>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-cyan-accent">Based in</span>
                <p className="mt-2 font-serif text-2xl md:text-3xl text-white">Karnataka, India</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 reveal">
            <form
              onSubmit={submit}
              data-testid="contact-form"
              className="relative border border-cyan-accent/20 bg-ocean-900/40 backdrop-blur-sm p-6 md:p-10 space-y-6"
            >
              <span className="tele-bracket tl" />
              <span className="tele-bracket tr" />
              <span className="tele-bracket bl" />
              <span className="tele-bracket br" />

              <div className="flex items-center gap-3 pb-4 border-b border-cyan-accent/10">
                <span className="w-1.5 h-1.5 bg-cyan-accent rounded-full animate-blink" />
                <span className="font-mono text-[11px] tracking-[0.24em] uppercase text-cyan-accent">Inquiry · Secure Channel</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="c-name" className="font-mono text-[10px] tracking-[0.24em] uppercase text-ocean-200">Name</Label>
                  <Input
                    id="c-name"
                    data-testid="contact-name-input"
                    value={form.name}
                    onChange={update("name")}
                    className="bg-ocean-950 border-cyan-accent/20 rounded-none focus-visible:ring-cyan-accent focus-visible:ring-1 focus-visible:ring-offset-0 text-white h-11"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-email" className="font-mono text-[10px] tracking-[0.24em] uppercase text-ocean-200">Email</Label>
                  <Input
                    id="c-email"
                    data-testid="contact-email-input"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    className="bg-ocean-950 border-cyan-accent/20 rounded-none focus-visible:ring-cyan-accent focus-visible:ring-1 focus-visible:ring-offset-0 text-white h-11"
                    placeholder="you@company.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="c-org" className="font-mono text-[10px] tracking-[0.24em] uppercase text-ocean-200">Organization</Label>
                  <Input
                    id="c-org"
                    data-testid="contact-organization-input"
                    value={form.organization}
                    onChange={update("organization")}
                    className="bg-ocean-950 border-cyan-accent/20 rounded-none focus-visible:ring-cyan-accent focus-visible:ring-1 focus-visible:ring-offset-0 text-white h-11"
                    placeholder="Company / Institution"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-mono text-[10px] tracking-[0.24em] uppercase text-ocean-200">I am a</Label>
                  <Select
                    value={form.interest}
                    onValueChange={(v) => setForm((f) => ({ ...f, interest: v }))}
                  >
                    <SelectTrigger
                      data-testid="contact-interest-trigger"
                      className="bg-ocean-950 border-cyan-accent/20 rounded-none focus:ring-cyan-accent focus:ring-1 focus:ring-offset-0 text-white h-11"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-ocean-900 border-cyan-accent/20 rounded-none">
                      {interests.map((i) => (
                        <SelectItem
                          key={i.value}
                          value={i.value}
                          data-testid={`contact-interest-option-${i.value}`}
                          className="rounded-none focus:bg-cyan-accent/10 focus:text-white"
                        >
                          {i.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="c-msg" className="font-mono text-[10px] tracking-[0.24em] uppercase text-ocean-200">Message</Label>
                <Textarea
                  id="c-msg"
                  data-testid="contact-message-input"
                  value={form.message}
                  onChange={update("message")}
                  className="bg-ocean-950 border-cyan-accent/20 rounded-none focus-visible:ring-cyan-accent focus-visible:ring-1 focus-visible:ring-offset-0 text-white min-h-32"
                  placeholder="Tell us a bit about why you're reaching out."
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-ocean-200/60">
                  We respect your privacy · No spam.
                </span>
                <button
                  type="submit"
                  disabled={submitting}
                  data-testid="contact-submit-button"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-3 bg-cyan-accent text-ocean-950 hover:bg-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-300"
                >
                  <span className="font-mono text-[11px] tracking-[0.24em] uppercase font-medium">
                    {submitting ? "Transmitting…" : "Send Inquiry"}
                  </span>
                  {!submitting && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform duration-300">
                      <path d="M5 12h14M13 5l7 7-7 7"/>
                    </svg>
                  )}
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
