"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { Mail, MapPin, Phone, Send, Github, Linkedin, CheckCircle, AlertCircle } from "lucide-react";

const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const contactInfo = [
  { icon: Mail, label: "Email", value: "hritiksingh1611@gmail.com", href: "mailto:hritiksingh1611@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91-9123964918", href: "tel:+919123964918" },
  { icon: MapPin, label: "Location", value: "Kolkata, India 🇮🇳", href: "#" },
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/Hritiksingh1611" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/hritik-singh-304450206" },
  { icon: XIcon, label: "X", href: "https://x.com/Hritik1611" },
];

const inputClass =
  "w-full px-4 py-3 bg-white/80 dark:bg-slate-900/60 border border-neutral-200 dark:border-white/10 rounded-xl text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all duration-200 text-sm font-sans";

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/xwpnkeob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="bg-[#f8fafc] dark:bg-[#030712] py-24 px-6 relative z-10 overflow-hidden"
    >
      <div className="absolute bottom-0 right-0 w-96 h-96 orb orb-violet opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-violet-500 tracking-[0.2em] uppercase shrink-0">05 — Get In Touch</span>
            <div className="h-px flex-1 bg-neutral-200 dark:bg-white/10" />
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl text-neutral-900 dark:text-white leading-tight">
            Let&apos;s Build <span className="text-gradient-vivid">Together</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.55 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
              Open for Data Engineering opportunities, ETL pipeline architecture consulting, or technical collaborations. Feel free to reach out directly.
            </p>

            <div className="space-y-3">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-3.5 rounded-xl px-4 py-3.5 glass border border-neutral-200/80 dark:border-white/10 hover:border-violet-500/40 hover:bg-violet-500/5 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-violet-500/15 border border-violet-500/30 flex items-center justify-center shrink-0 text-violet-500">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">{label}</p>
                    <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-violet-600 dark:group-hover:text-white transition-colors">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-widest font-mono mb-3">Connect Online</p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-3 rounded-xl glass border border-neutral-200/80 dark:border-white/10 text-neutral-600 dark:text-neutral-300 hover:text-violet-600 dark:hover:text-white hover:border-violet-500/40 hover:bg-violet-500/10 transition-all duration-200"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.55 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={onSubmit}
              className="glass rounded-2xl p-7 border border-neutral-200/80 dark:border-white/10 space-y-4"
            >
              <h3 className="font-display font-bold text-neutral-900 dark:text-white text-lg mb-2">Send a Message</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-neutral-500 dark:text-neutral-400 font-mono uppercase tracking-wider block mb-1.5">Name *</label>
                  <input type="text" name="name" value={form.name} onChange={onChange} required placeholder="Your Name" className={inputClass} />
                </div>
                <div>
                  <label className="text-xs text-neutral-500 dark:text-neutral-400 font-mono uppercase tracking-wider block mb-1.5">Email *</label>
                  <input type="email" name="email" value={form.email} onChange={onChange} required placeholder="you@email.com" className={inputClass} />
                </div>
              </div>

              <div>
                <label className="text-xs text-neutral-500 dark:text-neutral-400 font-mono uppercase tracking-wider block mb-1.5">Subject *</label>
                <input type="text" name="subject" value={form.subject} onChange={onChange} required placeholder="Project Opportunity / Hello" className={inputClass} />
              </div>

              <div>
                <label className="text-xs text-neutral-500 dark:text-neutral-400 font-mono uppercase tracking-wider block mb-1.5">Message *</label>
                <textarea name="message" value={form.message} onChange={onChange} required rows={4} placeholder="Describe your data engineering needs or project..." className={`${inputClass} resize-none`} />
              </div>

              {status !== "idle" && (
                <div
                  className={`flex items-center gap-2 text-sm px-4 py-3 rounded-xl border ${
                    status === "success"
                      ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                      : "bg-rose-500/15 border-rose-500/30 text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {status === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                  {status === "success"
                    ? "Message sent successfully! I'll get back to you shortly."
                    : "Failed to send message. Please try emailing me directly."}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 btn-primary rounded-xl font-semibold text-sm disabled:opacity-50"
              >
                {submitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send size={15} /> Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
