"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { MapPin, GraduationCap, Briefcase, Zap } from "lucide-react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const steps = 50;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  {
    value: 2, suffix: "+",
    label: "Years in data engineering",
    from: "from-violet-500", to: "to-indigo-500",
  },
  {
    value: 15, suffix: "+",
    label: "Production pipelines delivered",
    from: "from-pink-500", to: "to-rose-500",
  },
  {
    value: 3, suffix: "",
    label: "Cloud platforms — AWS · GCP · Azure",
    from: "from-cyan-500", to: "to-blue-500",
  },
];

const facts = [
  { icon: MapPin,        text: "Kolkata, India 🇮🇳" },
  { icon: Briefcase,     text: "Workmates Core2cloud Solutions" },
  { icon: GraduationCap, text: "MCA — 8.64 CGPA" },
  { icon: Zap,           text: "Always shipping something new" },
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section id="about" ref={ref} className="py-24 px-4 relative z-10 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 orb orb-violet opacity-15 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 orb orb-pink opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-700 tracking-[0.25em] uppercase shrink-0">01 — About</span>
            <div className="h-px flex-1 bg-neutral-200 dark:bg-white/[0.05]" />
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl text-neutral-900 dark:text-white leading-none">
            About <span className="text-gradient-vivid">Me</span>
          </h2>
        </motion.div>

        {/* Two-column editorial layout */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start">

          {/* ── LEFT COLUMN ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-7"
          >
            {/* Bio */}
            <div className="space-y-4">
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-[15px]">
                A passionate <span className="text-violet-600 dark:text-violet-400 font-semibold">Data Engineer</span> with 2+ years of experience designing scalable ETL pipelines and cloud-native data solutions. I turn raw, chaotic data into clean, reliable, and actionable infrastructure.
              </p>
              <p className="text-neutral-500 leading-relaxed text-[15px]">
                Currently at <span className="text-neutral-800 dark:text-neutral-200 font-semibold">Workmates Core2cloud Solutions Limited</span>, I specialize in the modern data stack — Python, SQL, AWS Glue, GCP, Snowflake, and Apache Airflow — delivering enterprise-grade data systems.
              </p>
            </div>

            {/* Current role card */}
            <div className="glass rounded-2xl p-5 border border-neutral-200/70 dark:border-white/[0.08] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-black text-base shrink-0 select-none">
                HS
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest">Current Position</p>
                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 truncate">Data Engineer</p>
                <p className="text-xs text-neutral-500 truncate">Workmates Core2cloud Solutions Ltd.</p>
              </div>
              <span className="flex items-center gap-1.5 text-[10px] text-emerald-500 font-mono uppercase tracking-wider shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </span>
            </div>

            {/* Quick facts */}
            <div className="space-y-2.5">
              {facts.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm">
                  <div className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
                    <Icon size={13} className="text-violet-500" />
                  </div>
                  <span className="text-neutral-600 dark:text-neutral-400">{text}</span>
                </div>
              ))}
            </div>

            {/* Skill tags */}
            <div className="flex flex-wrap gap-2">
              {["ETL Development", "Data Warehousing", "Cloud Computing", "Data Modeling", "Pipeline Architecture"].map((s) => (
                <span key={s} className="skill-pill text-xs">{s}</span>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN: Giant stats ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            {stats.map(({ value, suffix, label, from, to }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="glass rounded-2xl p-7 border border-neutral-200/70 dark:border-white/[0.08] overflow-hidden relative group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${from} ${to} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none`}
                />
                <div className={`font-display font-black text-8xl leading-none bg-gradient-to-r ${from} ${to} bg-clip-text text-transparent select-none`}>
                  <AnimatedCounter target={value} suffix={suffix} />
                </div>
                <p className="text-neutral-500 text-sm mt-2 leading-snug">{label}</p>
              </motion.div>
            ))}

            {/* Currently learning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.62, duration: 0.5 }}
              className="glass rounded-2xl p-5 border border-violet-500/20 bg-violet-500/5"
            >
              <p className="text-[10px] text-violet-500 font-mono uppercase tracking-widest mb-2.5">Currently exploring</p>
              <div className="flex flex-wrap gap-2">
                {["LLM Integration", "Real-time Streaming", "MLOps Workflows"].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs rounded-full bg-white/5 dark:bg-white/[0.04] border border-neutral-200/70 dark:border-white/[0.08] text-neutral-500 dark:text-neutral-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
