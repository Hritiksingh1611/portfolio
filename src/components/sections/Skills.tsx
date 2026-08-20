"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { Cloud, Cpu, Terminal, BarChart2, Sparkles, type LucideIcon } from "lucide-react";

type SkillCategory = "all" | "cloud" | "processing" | "languages" | "bi";

interface SkillItem {
  name: string;
  category: Exclude<SkillCategory, "all">;
  level: "Expert" | "Advanced" | "Proficient";
  highlight?: boolean;
}

const skillItems: SkillItem[] = [
  // Cloud & Warehousing
  { name: "AWS Glue", category: "cloud", level: "Expert", highlight: true },
  { name: "Amazon Redshift", category: "cloud", level: "Expert", highlight: true },
  { name: "AWS DMS (CDC)", category: "cloud", level: "Expert", highlight: true },
  { name: "AWS S3 & Athena", category: "cloud", level: "Expert", highlight: true },
  { name: "AWS Lambda & Kinesis", category: "cloud", level: "Advanced" },
  { name: "GCP BigQuery", category: "cloud", level: "Advanced", highlight: true },
  { name: "GCP Cloud SQL", category: "cloud", level: "Advanced" },
  { name: "GCP Dataproc", category: "cloud", level: "Proficient" },
  { name: "OpenSearch & CloudFormation", category: "cloud", level: "Proficient" },

  // Processing & Orchestration
  { name: "PySpark", category: "processing", level: "Expert", highlight: true },
  { name: "Apache Airflow", category: "processing", level: "Expert", highlight: true },
  { name: "Apache Kafka", category: "processing", level: "Advanced", highlight: true },
  { name: "Apache Flink", category: "processing", level: "Advanced" },
  { name: "AWS Glue Streaming", category: "processing", level: "Expert" },

  // Languages & Databases
  { name: "Python", category: "languages", level: "Expert", highlight: true },
  { name: "SQL (PostgreSQL / Redshift / MySQL)", category: "languages", level: "Expert", highlight: true },
  { name: "Scala", category: "languages", level: "Proficient" },
  { name: "Pandas & NumPy", category: "languages", level: "Expert" },
  { name: "PostgreSQL & MariaDB", category: "languages", level: "Expert" },
  { name: "MongoDB & DynamoDB", category: "languages", level: "Advanced" },
  { name: "Redis & Oracle", category: "languages", level: "Proficient" },

  // BI & Tools
  { name: "Amazon QuickSight", category: "bi", level: "Expert", highlight: true },
  { name: "Power BI", category: "bi", level: "Expert", highlight: true },
  { name: "Looker", category: "bi", level: "Advanced" },
  { name: "Docker & Linux", category: "bi", level: "Advanced" },
  { name: "Git & CI/CD Pipelines", category: "bi", level: "Expert" },
];

const categoryTabs: { key: SkillCategory; label: string; icon: LucideIcon }[] = [
  { key: "all", label: "All Skills", icon: Sparkles },
  { key: "cloud", label: "Cloud & Data Warehouse", icon: Cloud },
  { key: "processing", label: "Processing & Orchestration", icon: Cpu },
  { key: "languages", label: "Languages & Databases", icon: Terminal },
  { key: "bi", label: "BI Analytics & Tools", icon: BarChart2 },
];

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [activeTab, setActiveTab] = useState<SkillCategory>("all");

  const filtered = activeTab === "all" ? skillItems : skillItems.filter((s) => s.category === activeTab);

  return (
    <section id="skills" ref={ref} className="py-24 px-6 relative z-10 overflow-hidden bg-slate-50/50 dark:bg-[#060a12]">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 orb orb-violet opacity-15 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 orb orb-cyan opacity-15 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-violet-500 tracking-[0.2em] uppercase shrink-0">02 — Technical Matrix</span>
            <div className="h-px flex-1 bg-neutral-200 dark:bg-white/10" />
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl text-neutral-900 dark:text-white leading-tight">
            Tech <span className="text-gradient-vivid">Stack &amp; Architecture</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base max-w-xl mt-2">
            3+ years hands-on experience building production data systems across AWS, GCP, PySpark, Airflow, and Redshift.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex flex-wrap gap-2.5 mb-10"
        >
          {categoryTabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 ${
                activeTab === key
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30 scale-105"
                  : "glass text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/10 border border-neutral-200 dark:border-white/10"
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.04, duration: 0.35 }}
              className={`glass rounded-xl p-4 border transition-all duration-300 flex items-center justify-between group ${
                skill.highlight
                  ? "border-violet-500/40 bg-violet-500/10 dark:bg-violet-500/15"
                  : "border-neutral-200/80 dark:border-white/10 hover:border-violet-500/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${skill.highlight ? "bg-violet-500 animate-pulse" : "bg-cyan-500"}`} />
                <span className="font-display font-semibold text-neutral-900 dark:text-white text-sm group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                  {skill.name}
                </span>
              </div>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                  skill.level === "Expert"
                    ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                    : skill.level === "Advanced"
                    ? "bg-violet-500/20 text-violet-600 dark:text-violet-300 border border-violet-500/30"
                    : "bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30"
                }`}
              >
                {skill.level}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
