"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { ArrowUpRight, Github, Database, Server, Briefcase, Globe, Cpu, Cloud, type LucideIcon } from "lucide-react";

type Category = "all" | "data" | "cloud" | "web";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  category: Exclude<Category, "all">;
  status: "Production" | "Live" | "Completed";
  github: string;
  demo?: string;
  highlights: string[];
  gradient: string;
  icon: LucideIcon;
  iconColor: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "SAP OData & Redshift Integration Pipeline",
    description: "End-to-end SAP data integration using OData APIs and AWS Glue to extract SAP records, execute transformation & quality checks, and load curated data into Amazon Redshift.",
    tags: ["AWS Glue", "PySpark", "Amazon Redshift", "SAP OData", "Python"],
    category: "data",
    status: "Production",
    github: "https://github.com/Hritiksingh1611/aws-etl-pipeline",
    highlights: ["Automated SAP OData extraction", "Curated schema transformations", "Zero data loss validation"],
    gradient: "from-violet-600/25 to-indigo-600/10",
    icon: Database,
    iconColor: "text-violet-500",
  },
  {
    id: 2,
    title: "Multi-Database DMS CDC Migration System",
    description: "Centralized Change Data Capture (CDC) pipelines using AWS DMS to replicate 5+ PostgreSQL RDS and SQL Server databases into Amazon Redshift for continuous analytics.",
    tags: ["AWS DMS", "PostgreSQL", "SQL Server", "Amazon Redshift", "CDC"],
    category: "data",
    status: "Production",
    github: "https://github.com/Hritiksingh1611/data-warehouse",
    highlights: ["Zero-downtime database replication", "Multi-schema CDC workflows", "Power BI downstream feed"],
    gradient: "from-cyan-600/25 to-blue-600/10",
    icon: Server,
    iconColor: "text-cyan-500",
  },
  {
    id: 3,
    title: "S3 Database Archival & Cost Analytics",
    description: "Automated RDS MariaDB to Amazon S3 archival pipelines paired with serverless cloud cost monitoring using Lambda, Athena, CloudFormation, and Amazon QuickSight.",
    tags: ["AWS Lambda", "Athena", "S3", "QuickSight", "CloudFormation"],
    category: "cloud",
    status: "Production",
    github: "https://github.com/Hritiksingh1611/data-quality",
    highlights: ["Automated MariaDB to S3 archiving", "Serverless Athena query engine", "QuickSight cost dashboards"],
    gradient: "from-emerald-600/25 to-teal-600/10",
    icon: Cloud,
    iconColor: "text-emerald-500",
  },
  {
    id: 4,
    title: "Enterprise Centralized Data Warehouse",
    description: "Unified analytics warehouse integrating disparate data sources — SAP, MoEngage, GA4, and GCP Cloud SQL — into Redshift for executive reporting.",
    tags: ["GCP Cloud SQL", "GA4", "MoEngage", "Amazon Redshift", "SQL"],
    category: "data",
    status: "Production",
    github: "https://github.com/Hritiksingh1611/powerbi-dashboards",
    highlights: ["Multi-source data unification", "GCP & AWS cross-cloud pipeline", "Executive KPI dashboards"],
    gradient: "from-pink-600/25 to-purple-600/10",
    icon: Cpu,
    iconColor: "text-pink-500",
  },
  {
    id: 5,
    title: "reviewProbe Jobs Platform",
    description: "Full-stack job portal platform featuring authentication, job searching, posting management, and payment gateway integration.",
    tags: ["React", "Node.js", "MongoDB", "Express.js", "REST APIs"],
    category: "web",
    status: "Live",
    github: "https://github.com/Hritiksingh1611/reviewprobe-jobs",
    highlights: ["Complete job portal application", "Secure REST API architecture", "MongoDB database management"],
    gradient: "from-amber-600/25 to-orange-600/10",
    icon: Briefcase,
    iconColor: "text-amber-500",
  },
  {
    id: 6,
    title: "Interactive Data Engineer Portfolio",
    description: "Next.js 15 static portfolio website featuring live ETL node animation, interactive PySpark code terminal, and dark-first high-tech UI.",
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "web",
    status: "Live",
    github: "https://github.com/Hritiksingh1611/portfolio",
    demo: "https://hritiksingh1611.github.io/portfolio/",
    highlights: ["Live ETL node flow simulator", "Interactive code terminal playground", "Core Web Vitals optimized"],
    gradient: "from-indigo-600/25 to-violet-600/10",
    icon: Globe,
    iconColor: "text-indigo-500",
  },
];

const filters: { key: Category; label: string }[] = [
  { key: "all",   label: "All Projects" },
  { key: "data",  label: "Data & CDC Pipelines" },
  { key: "cloud", label: "Cloud & Archival" },
  { key: "web",   label: "Web Development" },
];

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [active, setActive] = useState<Category>("all");

  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" ref={ref} className="py-24 px-6 relative z-10 overflow-hidden bg-slate-50/50 dark:bg-[#030712]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-violet-500 tracking-[0.2em] uppercase shrink-0">04 — Featured Works</span>
            <div className="h-px flex-1 bg-neutral-200 dark:bg-white/10" />
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl text-neutral-900 dark:text-white leading-tight">
            Featured <span className="text-gradient-vivid">Projects &amp; Solutions</span>
          </h2>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex flex-wrap gap-2.5 mb-10"
        >
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 ${
                active === key
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30 scale-105"
                  : "glass text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/10 border border-neutral-200 dark:border-white/10"
              }`}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Bento Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="glass bento-card rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-white/10 flex flex-col justify-between group"
            >
              {/* Header Visual */}
              <div className={`relative h-28 bg-gradient-to-br ${project.gradient} p-5 flex items-center justify-between`}>
                <div className="w-12 h-12 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg">
                  <project.icon size={22} className={project.iconColor} />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  {project.status}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-display font-bold text-neutral-900 dark:text-white text-base mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <ul className="space-y-1.5 mb-5">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                        <span className="w-1 h-1 rounded-full bg-violet-500 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-400">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-3 border-t border-neutral-200 dark:border-white/10">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-mono font-semibold text-neutral-600 dark:text-neutral-300 hover:text-violet-600 dark:hover:text-white transition-colors"
                    >
                      <Github size={14} /> Code Repo
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-mono font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 transition-colors ml-auto"
                      >
                        Live Site <ArrowUpRight size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* GitHub CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/Hritiksingh1611"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
          >
            <Github size={16} /> Explore All Repositories on GitHub <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
