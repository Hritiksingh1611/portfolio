"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";

type Category = "all" | "data" | "analytics" | "web";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  category: Exclude<Category, "all">;
  status: "Production" | "Live" | "Ongoing";
  github: string;
  demo?: string;
  highlights: string[];
  gradient: string;
  icon: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "AWS Data Pipeline System",
    description: "Comprehensive ETL pipelines using AWS Glue and Redshift for enterprise data processing — automated ingestion from multiple sources with robust error handling.",
    tags: ["AWS Glue", "Redshift", "Python", "SQL", "S3"],
    category: "data",
    status: "Production",
    github: "https://github.com/Hritiksingh1611/aws-etl-pipeline",
    highlights: ["Processes 100 GB+ of data daily", "40% improvement in processing speed", "Automated data quality validation"],
    gradient: "from-indigo-600/20 to-blue-600/10",
    icon: "⚡",
  },
  {
    id: 2,
    title: "Power BI Dashboard Suite",
    description: "Interactive business intelligence dashboards using Power BI — automated reports enabling stakeholder decision-making with real-time drill-down analytics.",
    tags: ["Power BI", "SQL", "Azure", "DAX", "Data Modeling"],
    category: "analytics",
    status: "Production",
    github: "https://github.com/Hritiksingh1611/powerbi-dashboards",
    highlights: ["Real-time data visualization", "Automated reports for 50+ stakeholders", "Interactive drill-down capabilities"],
    gradient: "from-yellow-600/15 to-orange-600/10",
    icon: "📊",
  },
  {
    id: 3,
    title: "Data Warehouse Architecture",
    description: "Modern data warehouse built on Snowflake and Azure Synapse — scalable architecture for enterprise data storage, analytics, and cost-optimized cloud storage.",
    tags: ["Snowflake", "Azure Synapse", "SQL", "Data Modeling", "ETL"],
    category: "data",
    status: "Production",
    github: "https://github.com/Hritiksingh1611/data-warehouse",
    highlights: ["Scalable warehouse design", "60% query performance improvement", "Cost-effective cloud storage"],
    gradient: "from-cyan-600/15 to-teal-600/10",
    icon: "🏗️",
  },
  {
    id: 4,
    title: "Automated Data Quality Framework",
    description: "Comprehensive data quality framework with automated validation rules, anomaly detection, and real-time alerting using Python and SQL.",
    tags: ["Python", "SQL", "Data Validation", "Automation", "Monitoring"],
    category: "data",
    status: "Production",
    github: "https://github.com/Hritiksingh1611/data-quality",
    highlights: ["Automated quality checks", "Real-time anomaly detection", "85% reduction in data errors"],
    gradient: "from-emerald-600/15 to-green-600/10",
    icon: "🛡️",
  },
  {
    id: 5,
    title: "reviewProbe Jobs Platform",
    description: "End-to-end job searching and posting platform with user auth, job management, and payment integration — built with modern full-stack technologies.",
    tags: ["React", "Node.js", "MongoDB", "Express.js", "JavaScript"],
    category: "web",
    status: "Live",
    github: "https://github.com/Hritiksingh1611/reviewprobe-jobs",
    highlights: ["Complete job portal functionality", "User authentication & authorization", "Payment system integration"],
    gradient: "from-purple-600/15 to-pink-600/10",
    icon: "💼",
  },
  {
    id: 6,
    title: "Portfolio Website",
    description: "This site — built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion. Dark-first, Gen Z aesthetic with performance-first architecture.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "web",
    status: "Live",
    github: "https://github.com/Hritiksingh1611/portfolio",
    demo: "https://hritiksingh-portfolio.vercel.app",
    highlights: ["Dark-first Gen Z design", "Smooth Framer Motion animations", "Optimized for Core Web Vitals"],
    gradient: "from-indigo-600/20 to-purple-600/10",
    icon: "🚀",
  },
];

const filters: { key: Category; label: string }[] = [
  { key: "all",       label: "All Projects" },
  { key: "data",      label: "Data Engineering" },
  { key: "analytics", label: "Analytics" },
  { key: "web",       label: "Web Dev" },
];

const statusColors: Record<Project["status"], string> = {
  Production: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Live:       "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Ongoing:    "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [active, setActive] = useState<Category>("all");

  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" ref={ref} className="py-24 px-4 relative z-10 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 orb orb-pink opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="section-label">What I&apos;ve built</p>
          <h2 className="font-display font-black text-4xl md:text-6xl text-white leading-none">
            Featured <span className="text-gradient-vivid">Projects</span>
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

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 gap-5">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
              className="glass rounded-2xl overflow-hidden border border-neutral-200/70 dark:border-white/[0.08] hover:border-white/16 transition-all duration-300 group flex flex-col"
            >
              {/* Visual header */}
              <div className={`relative h-32 bg-gradient-to-br ${project.gradient} flex items-center justify-between px-6 overflow-hidden`}>
                <span className="text-5xl select-none">{project.icon}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColors[project.status]}`}>
                    {project.status}
                  </span>
                </div>
                {/* Subtle grid overlay */}
                <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display font-bold text-white text-lg mb-2 group-hover:text-indigo-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-4">{project.description}</p>

                {/* Highlights */}
                <ul className="space-y-1 mb-5">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs text-neutral-500">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-indigo-500 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                  {project.tags.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white/6 border border-white/10 text-neutral-400">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2.5 pt-2 border-t border-white/8">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/8"
                  >
                    <Github size={14} />
                    Code
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors px-3 py-2 rounded-lg hover:bg-indigo-500/10"
                    >
                      <ArrowUpRight size={14} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-neutral-500 text-sm mb-4">More projects on GitHub</p>
          <motion.a
            href="https://github.com/Hritiksingh1611"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-ghost text-sm font-semibold"
          >
            <Github size={16} />
            View GitHub Profile
            <ArrowUpRight size={14} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
