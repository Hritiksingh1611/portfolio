"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

type Category = "all" | "data" | "cloud" | "languages" | "tools";

interface Skill {
  name: string;
  level: "expert" | "advanced" | "proficient";
  category: Category;
}

const skills: Skill[] = [
  // Data Engineering
  { name: "AWS Glue",          level: "expert",    category: "data" },
  { name: "AWS Redshift",      level: "expert",    category: "data" },
  { name: "AWS DMS",           level: "advanced",  category: "data" },
  { name: "Snowflake",         level: "advanced",  category: "data" },
  { name: "Apache Airflow",    level: "advanced",  category: "data" },
  { name: "Azure Data Factory",level: "proficient",category: "data" },
  { name: "ETL / ELT",         level: "expert",    category: "data" },
  { name: "Data Warehousing",  level: "expert",    category: "data" },
  // Cloud
  { name: "AWS",               level: "expert",    category: "cloud" },
  { name: "Google Cloud",      level: "advanced",  category: "cloud" },
  { name: "Microsoft Azure",   level: "advanced",  category: "cloud" },
  { name: "AWS S3",            level: "expert",    category: "cloud" },
  { name: "AWS Lambda",        level: "advanced",  category: "cloud" },
  { name: "AWS QuickSight",    level: "advanced",  category: "cloud" },
  // Languages
  { name: "Python",            level: "expert",    category: "languages" },
  { name: "SQL",               level: "expert",    category: "languages" },
  { name: "PySpark",           level: "advanced",  category: "languages" },
  { name: "Shell Scripting",   level: "advanced",  category: "languages" },
  { name: "JavaScript",        level: "proficient",category: "languages" },
  { name: "R",                 level: "proficient",category: "languages" },
  // Tools & Frameworks
  { name: "Pandas",            level: "expert",    category: "tools" },
  { name: "NumPy",             level: "expert",    category: "tools" },
  { name: "Power BI",          level: "expert",    category: "tools" },
  { name: "PostgreSQL",        level: "expert",    category: "tools" },
  { name: "MySQL",             level: "advanced",  category: "tools" },
  { name: "MongoDB",           level: "proficient",category: "tools" },
  { name: "FastAPI",           level: "advanced",  category: "tools" },
  { name: "Docker",            level: "proficient",category: "tools" },
  { name: "Git / GitHub",      level: "expert",    category: "tools" },
  { name: "Streamlit",         level: "advanced",  category: "tools" },
];

const filters: { key: Category | "all"; label: string }[] = [
  { key: "all",       label: "All" },
  { key: "data",      label: "Data Engineering" },
  { key: "cloud",     label: "Cloud" },
  { key: "languages", label: "Languages" },
  { key: "tools",     label: "Tools & DBs" },
];

const levelConfig = {
  expert:    { label: "Expert",    color: "border-indigo-500/50 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-400/70" },
  advanced:  { label: "Advanced",  color: "border-purple-500/40 bg-purple-500/8 text-purple-300 hover:bg-purple-500/18 hover:border-purple-400/60" },
  proficient:{ label: "Proficient",color: "border-white/15 bg-white/5 text-neutral-400 hover:bg-white/10 hover:border-white/25" },
};

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [active, setActive] = useState<Category | "all">("all");

  const filtered = active === "all" ? skills : skills.filter((s) => s.category === active);

  return (
    <section
      id="skills"
      ref={ref}
      className="py-24 px-4 relative z-10 overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-96 h-96 orb orb-blue opacity-15 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="section-label">What I work with</p>
          <h2 className="font-display font-black text-4xl md:text-6xl text-white leading-none">
            Skills &amp; <span className="text-gradient-vivid">Expertise</span>
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                active === key
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                  : "glass text-neutral-400 hover:text-neutral-200 hover:bg-white/8 border border-neutral-200/70 dark:border-white/[0.08]"
              }`}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex flex-wrap gap-4 mb-8 text-xs text-neutral-500"
        >
          {Object.entries(levelConfig).map(([key, { label, color }]) => (
            <span key={key} className={`skill-pill ${color} text-[11px]`}>{label}</span>
          ))}
        </motion.div>

        {/* Skill pills grid */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-wrap gap-2.5"
        >
          {filtered.map((skill, i) => (
            <motion.span
              key={skill.name}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border cursor-default transition-all duration-200 ${levelConfig[skill.level].color}`}
            >
              {skill.name}
            </motion.span>
          ))}
        </motion.div>

        {/* Bottom card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 glass rounded-2xl p-7 border border-neutral-200/70 dark:border-white/[0.08] flex flex-col md:flex-row gap-6 items-start md:items-center"
        >
          <div className="flex-1">
            <h3 className="font-display font-bold text-white text-xl mb-2">Always evolving</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Currently exploring <span className="text-indigo-400">LLM integrations</span>, <span className="text-purple-400">real-time streaming</span> with Kafka, and advanced <span className="text-pink-400">MLOps</span> workflows. The data landscape never stands still — and neither do I.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <div className="text-center">
              <div className="font-display font-black text-3xl text-white">5+</div>
              <div className="text-xs text-neutral-500 mt-0.5">Certifications</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <div className="font-display font-black text-3xl text-white">30+</div>
              <div className="text-xs text-neutral-500 mt-0.5">Technologies</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
