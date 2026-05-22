"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

type SkillTag = { name: string; highlight?: boolean };

const tracks: { id: number; dir: "ltr" | "rtl"; dur: number; skills: SkillTag[] }[] = [
  {
    id: 1,
    dir: "ltr",
    dur: 32,
    skills: [
      { name: "AWS Glue", highlight: true },
      { name: "Redshift" },
      { name: "Apache Airflow", highlight: true },
      { name: "Snowflake", highlight: true },
      { name: "AWS DMS" },
      { name: "ETL / ELT", highlight: true },
      { name: "Data Warehousing" },
      { name: "Azure Data Factory" },
      { name: "PySpark", highlight: true },
      { name: "AWS S3" },
    ],
  },
  {
    id: 2,
    dir: "rtl",
    dur: 24,
    skills: [
      { name: "AWS", highlight: true },
      { name: "Google Cloud Platform" },
      { name: "Microsoft Azure" },
      { name: "Power BI", highlight: true },
      { name: "AWS Lambda" },
      { name: "AWS QuickSight" },
      { name: "Shell Scripting" },
      { name: "R" },
      { name: "AWS S3" },
    ],
  },
  {
    id: 3,
    dir: "ltr",
    dur: 40,
    skills: [
      { name: "Python", highlight: true },
      { name: "SQL", highlight: true },
      { name: "Pandas" },
      { name: "NumPy" },
      { name: "FastAPI" },
      { name: "PostgreSQL", highlight: true },
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "Docker" },
      { name: "Git / GitHub" },
      { name: "Streamlit" },
      { name: "JavaScript" },
    ],
  },
];

const counters = [
  { num: "30+", label: "Technologies",   color: "text-violet-600 dark:text-violet-400" },
  { num: "5+",  label: "Certifications", color: "text-pink-600 dark:text-pink-400" },
  { num: "3",   label: "Cloud Platforms",color: "text-cyan-600 dark:text-cyan-400" },
  { num: "2+",  label: "Years Exp.",     color: "text-indigo-600 dark:text-indigo-400" },
];

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section id="skills" ref={ref} className="py-24 relative z-10 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 orb orb-violet opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-64 h-64 orb orb-cyan opacity-10 pointer-events-none" />

      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-700 tracking-[0.25em] uppercase shrink-0">02 — Skills</span>
            <div className="h-px flex-1 bg-neutral-200 dark:bg-white/[0.05]" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-10">
            <h2 className="font-display font-black text-4xl md:text-6xl text-neutral-900 dark:text-white leading-none">
              Tech <span className="text-gradient-vivid">Stack</span>
            </h2>
            <p className="text-neutral-500 dark:text-neutral-500 text-sm max-w-xs md:mb-1.5 leading-relaxed">
              2+ years building with these tools — expert in data engineering, cloud platforms, and analytics.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Marquee tracks */}
      <div className="relative">
        {/* Side fade masks */}
        <div
          className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--bg), transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--bg), transparent)" }}
        />

        <div className="space-y-3">
          {tracks.map((track, ti) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, x: track.dir === "ltr" ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: ti * 0.12 + 0.2, duration: 0.7, ease: "easeOut" }}
              className="overflow-hidden marquee-wrap py-1"
            >
              <div
                className={`marquee-track ${track.dir === "rtl" ? "animate-marquee-rev" : "animate-marquee"}`}
                style={{ animationDuration: `${track.dur}s` }}
              >
                {[...track.skills, ...track.skills].map((skill, i) => (
                  <span
                    key={i}
                    className={`inline-flex items-center px-4 py-2.5 mx-1.5 rounded-xl text-sm font-medium border whitespace-nowrap ${
                      skill.highlight
                        ? "bg-violet-500/10 dark:bg-violet-500/20 border-violet-500/40 dark:border-violet-500/60 text-violet-600 dark:text-violet-300"
                        : "bg-white/60 dark:bg-white/[0.05] border-neutral-200 dark:border-white/[0.10] text-neutral-600 dark:text-neutral-400"
                    }`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom stats + learning */}
      <div className="max-w-6xl mx-auto px-4 mt-14 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {counters.map(({ num, label, color }) => (
            <div key={label} className="glass rounded-2xl p-5 border border-neutral-200/70 dark:border-white/[0.08] text-center">
              <div className={`font-display font-black text-3xl ${color}`}>{num}</div>
              <div className="text-xs text-neutral-500 mt-1">{label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="glass rounded-2xl px-6 py-4 border border-neutral-200/70 dark:border-white/[0.08] flex flex-wrap items-center gap-3"
        >
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest shrink-0">Currently exploring</span>
          {["LLM Integration", "Real-time Streaming (Kafka)", "Advanced MLOps"].map((t) => (
            <span key={t} className="px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 border border-violet-500/30 text-violet-600 dark:text-violet-400">
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
