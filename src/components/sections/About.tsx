"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { MapPin, GraduationCap, Briefcase, Award, CheckCircle2, ShieldCheck, Database, Cloud, Cpu, BarChart3 } from "lucide-react";
import { getAssetPath } from "@/lib/assets";

const competencies = [
  {
    title: "Data Engineering",
    icon: Database,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    items: ["ETL/ELT Pipelines", "Data Migration & CDC", "Data Warehousing", "Schema Design & Modeling", "Data Quality & Validation"],
  },
  {
    title: "Cloud Infrastructure",
    icon: Cloud,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    items: ["AWS Glue & Redshift", "AWS DMS & S3", "Lambda, Athena & Kinesis", "GCP BigQuery & Cloud SQL", "Dataproc & OpenSearch"],
  },
  {
    title: "Data Processing & Engine",
    icon: Cpu,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    items: ["PySpark & Glue Streaming", "Apache Kafka & Flink", "Apache Airflow", "Python & SQL", "Scala & Pandas"],
  },
  {
    title: "Databases & BI Tools",
    icon: BarChart3,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    items: ["PostgreSQL, MySQL, MariaDB", "SQL Server, Oracle, Redis", "MongoDB & DynamoDB", "Amazon QuickSight & Power BI", "Docker, CI/CD & Linux"],
  },
];

const educationList = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Techno India University",
    duration: "Aug 2022 — Jul 2024",
    cgpa: "8.64 CGPA",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Techno Main Saltlake",
    duration: "Aug 2019 — Jul 2022",
    cgpa: "9.34 CGPA",
  },
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="about" ref={ref} className="py-24 px-6 relative z-10 overflow-hidden">
      {/* Ambient background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 orb orb-violet opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 orb orb-cyan opacity-15 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-violet-500 tracking-[0.2em] uppercase shrink-0">01 — About &amp; Competencies</span>
            <div className="h-px flex-1 bg-neutral-200 dark:bg-white/10" />
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl text-neutral-900 dark:text-white leading-tight">
            Engineering <span className="text-gradient-vivid">Data Solutions</span>
          </h2>
        </motion.div>

        {/* Bio Spotlight with Portrait Photo */}
        <div className="grid lg:grid-cols-[280px_1fr_300px] gap-8 mb-16 items-stretch">
          
          {/* ── Portrait Photograph Spotlight Card ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="glass rounded-2xl p-4 border border-violet-500/30 flex flex-col items-center justify-between text-center relative overflow-hidden group shadow-xl"
          >
            <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 ring-2 ring-violet-500/40">
              <Image
                src={getAssetPath("/profile.jpg")}
                alt="Hritik Singh - Data Engineer"
                fill
                sizes="280px"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <p className="text-white font-display font-bold text-base leading-tight">Hritik Singh</p>
                <p className="text-violet-300 font-mono text-xs">Data Engineer @ Core2Cloud</p>
              </div>
            </div>

            <div className="w-full flex items-center justify-between px-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
              <span className="flex items-center gap-1"><MapPin size={12} className="text-violet-500" /> Kolkata</span>
              <span className="flex items-center gap-1 text-emerald-500 font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active</span>
            </div>
          </motion.div>

          {/* Main Bio Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="glass rounded-2xl p-7 border border-neutral-200/80 dark:border-white/10 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <p className="text-neutral-800 dark:text-neutral-200 text-base leading-relaxed">
                I am a <span className="text-violet-600 dark:text-violet-400 font-semibold">Data Engineer with 3+ years of experience</span> designing, scaling, and maintaining production ETL/ELT data pipelines, CDC workflows, database migrations, and enterprise cloud data platforms across <span className="text-violet-600 dark:text-violet-400 font-semibold">AWS and GCP</span>.
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                Currently at <span className="font-semibold text-neutral-900 dark:text-white">Workmates Core2Cloud</span>, I lead data integration initiatives—building SAP OData API pipelines, multi-schema RDS CDC migrations, automated RDS MariaDB to S3 archival systems, and cost-monitoring analytics platforms on Amazon Redshift and QuickSight.
              </p>
            </div>

            {/* Quick Highlights Pill Row */}
            <div className="flex flex-wrap gap-2.5 mt-6 pt-6 border-t border-neutral-200 dark:border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-300 bg-violet-500/10 px-3 py-1.5 rounded-lg border border-violet-500/20">
                <Briefcase size={13} className="text-violet-500" /> Workmates Core2Cloud
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-300 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                <ShieldCheck size={13} className="text-emerald-500" /> AWS &amp; GCP Certified
              </div>
            </div>
          </motion.div>

          {/* Award Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="glass rounded-2xl p-6 border border-violet-500/30 bg-gradient-to-br from-violet-500/10 via-transparent to-pink-500/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-violet-600 text-white flex items-center justify-center mb-4 shadow-lg shadow-violet-500/30">
                <Award size={24} />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-violet-500 font-bold block mb-1">
                RECOGNITION &amp; AWARD
              </span>
              <h3 className="font-display font-extrabold text-neutral-900 dark:text-white text-lg leading-tight mb-2">
                Customer Engagement Champion
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Awarded by the Database Team at <span className="font-semibold text-neutral-800 dark:text-neutral-200">Workmates Core2Cloud</span> for delivering high-impact zero-downtime migrations &amp; optimized pipeline performance.
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-violet-500/20 flex items-center gap-2 text-xs font-mono text-violet-600 dark:text-violet-300 font-semibold">
              <CheckCircle2 size={14} /> Database Team Excellence
            </div>
          </motion.div>
        </div>

        {/* Core Competencies Grid */}
        <div className="mb-16">
          <h3 className="font-display font-extrabold text-2xl text-neutral-900 dark:text-white mb-6">
            Core Competencies &amp; Expertise
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {competencies.map((comp, i) => (
              <motion.div
                key={comp.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.45 }}
                className="glass rounded-xl p-5 border border-neutral-200/80 dark:border-white/10 hover:border-violet-500/30 transition-all duration-300 flex flex-col"
              >
                <div className={`w-10 h-10 rounded-lg ${comp.bg} ${comp.color} flex items-center justify-center mb-3`}>
                  <comp.icon size={20} />
                </div>
                <h4 className="font-display font-bold text-neutral-900 dark:text-white text-base mb-3">{comp.title}</h4>
                <ul className="space-y-2 mt-auto">
                  {comp.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div>
          <h3 className="font-display font-extrabold text-2xl text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
            <GraduationCap className="text-violet-500" size={24} /> Education
          </h3>

          <div className="grid sm:grid-cols-2 gap-5">
            {educationList.map((edu, i) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.45 }}
                className="glass rounded-xl p-5 border border-neutral-200/80 dark:border-white/10 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-display font-bold text-neutral-900 dark:text-white text-base">{edu.degree}</h4>
                  <p className="text-xs text-violet-600 dark:text-violet-400 font-medium mt-0.5">{edu.institution}</p>
                  <p className="text-xs text-neutral-500 mt-1 font-mono">{edu.duration}</p>
                </div>
                <span className="px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-xs border border-emerald-500/30">
                  {edu.cgpa}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
