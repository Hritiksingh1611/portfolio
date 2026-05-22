"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { Mail, MapPin, Send, Github, Linkedin, CheckCircle, AlertCircle } from "lucide-react";

const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const contactInfo = [
  { icon: Mail,   label: "Email",    value: "hritik16.work@gmail.com", href: "mailto:hritik16.work@gmail.com" },
  { icon: MapPin, label: "Location", value: "Kolkata, India",           href: "#" },
];

const socials = [
  { icon: Github,   label: "GitHub",   href: "https://github.com/Hritiksingh1611" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/hritik-singh-304450206" },
  { icon: XIcon,    label: "X",        href: "https://x.com/Hritik1611" },
];

const inputClass =
  "w-full px-4 py-3 bg-neutral-100/60 dark:bg-white/[0.05] border border-neutral-200 dark:border-white/[0.09] rounded-xl text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-700 focus:outline-none focus:border-violet-500/60 dark:focus:border-violet-500/50 focus:bg-white dark:focus:bg-white/[0.08] transition-all duration-200 text-sm";

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
      className="bg-[#f9f9fc] dark:bg-[#0c0c1a] py-24 px-4 relative z-10 overflow-hidden"
    >
      {/* Ambient orbs */}
      <div className="absolute bottom-0 right-0 w-96 h-96 orb orb-violet opacity-10 dark:opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-64 h-64 orb orb-pink opacity-8 pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-700 tracking-[0.25em] uppercase shrink-0">05 — Contact</span>
            <div className="h-px flex-1 bg-neutral-200 dark:bg-white/[0.05]" />
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl text-neutral-900 dark:text-white leading-none">
            Let&apos;s <span className="text-gradient-vivid">Connect</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left — 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.55, ease: "easeOut" }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <p className="text-neutral-500 text-sm leading-relaxed">
              Whether you have a project in mind, want to discuss opportunities, or just want to say hello — I&apos;m always open to connecting with fellow builders.
            </p>

            {/* Contact methods */}
            <div className="space-y-3">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 border border-neutral-200 dark:border-white/[0.07] bg-neutral-50 dark:bg-white/[0.03] hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-violet-500 dark:text-violet-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-600 uppercase tracking-wider font-mono">{label}</p>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Socials */}
            <div>
              <p className="text-[10px] text-neutral-400 dark:text-neutral-700 uppercase tracking-widest font-mono mb-3">Find me online</p>
              <div className="flex gap-2.5">
                {socials.map(({ icon: Icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.92 }}
                    className="p-2.5 rounded-xl border border-neutral-200 dark:border-white/[0.07] bg-neutral-50 dark:bg-white/[0.03] text-neutral-500 dark:text-neutral-600 hover:text-neutral-900 dark:hover:text-white hover:border-violet-500/30 transition-all duration-200"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Card */}
            <div className="rounded-xl p-4 border border-violet-500/20 bg-violet-500/5">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                <span className="text-violet-600 dark:text-violet-400 text-sm font-semibold">Let&apos;s build together</span>
              </div>
              <p className="text-neutral-500 text-xs leading-relaxed">
                Have an interesting project or just want to talk data &amp; tech? I&apos;m always happy to connect.
              </p>
            </div>
          </motion.div>

          {/* Right form — 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.55, ease: "easeOut" }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={onSubmit}
              className="rounded-2xl p-6 border border-neutral-200 dark:border-white/[0.07] bg-neutral-50/50 dark:bg-white/[0.02] space-y-4"
            >
              <h3 className="font-display font-bold text-neutral-900 dark:text-white text-lg mb-2">Send a message</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] text-neutral-500 dark:text-neutral-600 font-mono uppercase tracking-wider block mb-1.5">Name *</label>
                  <input type="text" name="name" value={form.name} onChange={onChange} required placeholder="Your name" className={inputClass} />
                </div>
                <div>
                  <label className="text-[11px] text-neutral-500 dark:text-neutral-600 font-mono uppercase tracking-wider block mb-1.5">Email *</label>
                  <input type="email" name="email" value={form.email} onChange={onChange} required placeholder="you@email.com" className={inputClass} />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-neutral-500 dark:text-neutral-600 font-mono uppercase tracking-wider block mb-1.5">Subject *</label>
                <input type="text" name="subject" value={form.subject} onChange={onChange} required placeholder="What is this about?" className={inputClass} />
              </div>

              <div>
                <label className="text-[11px] text-neutral-500 dark:text-neutral-600 font-mono uppercase tracking-wider block mb-1.5">Message *</label>
                <textarea name="message" value={form.message} onChange={onChange} required rows={5} placeholder="Tell me about your project or idea..." className={`${inputClass} resize-none`} />
              </div>

              {status !== "idle" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-2 text-sm px-4 py-3 rounded-xl border ${
                    status === "success"
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                      : "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
                  }`}
                >
                  {status === "success" ? <CheckCircle size={15} /> : <AlertCircle size={15} />}
                  {status === "success"
                    ? "Message sent! I'll get back to you soon."
                    : "Something went wrong. Try again or email me directly."}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: submitting ? 1 : 1.02 }}
                whileTap={{ scale: submitting ? 1 : 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-3.5 btn-primary rounded-xl font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
