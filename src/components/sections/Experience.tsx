"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, MapPin, ArrowUpRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { getAssetPath } from "@/lib/assets";

const experiences = [
  {
    id: 1,
    title: "Data Engineer",
    company: "Workmates Core2Cloud",
    location: "Kolkata, India",
    duration: "Dec 2023 — Present",
    type: "Full-time",
    typeColor: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    description:
      "Leading scalable ETL/ELT pipeline engineering, SAP OData integrations, multi-database CDC migrations, and cloud data warehousing across AWS and GCP.",
    achievements: [
      "Designed & maintained scalable ETL/ELT pipelines using AWS Glue, PySpark, Python, and SQL into Amazon Redshift.",
      "Developed end-to-end SAP data integration pipeline using OData APIs and AWS Glue into Redshift.",
      "Built centralized DW integrating SAP, MoEngage, GA4, and GCP Cloud SQL into Redshift for executive analytics.",
      "Migrated & centralized 5+ PostgreSQL RDS databases using AWS DMS with Change Data Capture (CDC) workflows.",
      "Developed SQL Server to Redshift CDC pipelines for continuous data replication and Power BI reporting.",
      "Implemented zero-downtime database migration & ELT workflows using AWS DMS and automated scheduling.",
      "Performed data quality checks, source-to-target validation, schema validation, and SQL optimization.",
      "Built automated RDS MariaDB to S3 archival & serverless cloud cost monitoring using Lambda, Athena, CloudFormation, and QuickSight.",
    ],
    tech: ["AWS Glue", "PySpark", "Amazon Redshift", "AWS DMS (CDC)", "SAP OData", "GCP Cloud SQL", "Python", "SQL", "Athena", "QuickSight", "CloudFormation"],
    accent: "#7c3aed",
  },
  {
    id: 2,
    title: "Application Developer",
    company: "Computer Software Solution LLC",
    location: "Colorado, USA (Remote)",
    duration: "Aug 2022 — Dec 2023",
    type: "Full-time / Remote",
    typeColor: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    description:
      "Developed and maintained full-stack Angular web applications, Android applications, RESTful APIs, and MongoDB database flows.",
    achievements: [
      "Developed and maintained Angular web applications and Android applications using REST APIs and MongoDB.",
      "Troubleshot database, API, and application performance issues and collaborated with engineering teams using Git.",
      "Implemented robust user authentication, data management flows, and application query optimization.",
    ],
    tech: ["Angular", "Android", "REST APIs", "Node.js", "MongoDB", "JavaScript", "Git"],
    accent: "#38bdf8",
  },
];

const certifications = [
  { name: "AWS Certified Data Engineer - Associate", issuer: "Amazon AWS", year: "2024", image: "/aws-certified-data-engineer-associate (3).png", credlyUrl: "https://www.credly.com/badges/25563f35-bb02-45e8-9705-e092548f22f4/public_url" },
  { name: "GCP Professional Data Engineer", issuer: "Google Cloud", year: "2026", image: "/gcp-professional-data-engineer-certification.png", credlyUrl: "https://www.credly.com/badges/1b899ddc-af10-401c-8571-1e6587578686/public_url" },
  { name: "AWS Certified Machine Learning Engineer", issuer: "Amazon AWS", year: "2024", image: "/aws-certified-machine-learning-engineer-associate (1).png", credlyUrl: "https://www.credly.com/badges/71f85288-9704-48e7-8a73-5ecc26d5f813/public_url" },
  { name: "AWS Certified AI Practitioner", issuer: "Amazon AWS", year: "2025", image: "/aws-certified-ai-practitioner (1).png", credlyUrl: "https://www.credly.com/badges/4d4163cb-bd43-45a4-acc1-2813a83a0041/public_url" },
  { name: "GCP Associate Cloud Engineer", issuer: "Google Cloud", year: "2025", image: "/associate-cloud-engineer-certification (3).png", credlyUrl: "https://www.credly.com/badges/03b452c6-a3dd-49ad-9b19-32652d17eb81/public_url" },
  { name: "GitHub Foundations", issuer: "GitHub", year: "2024", image: "/github-foundations (3).png", credlyUrl: "https://www.credly.com/badges/fb008a64-c426-4203-87d5-f84ea7e12cbb/public_url" },
];

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="experience" ref={ref} className="py-24 px-6 relative z-10 overflow-hidden">
      <div className="absolute top-1/4 right-0 w-80 h-80 orb orb-violet opacity-15 pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-violet-500 tracking-[0.2em] uppercase shrink-0">03 — Career &amp; Certifications</span>
            <div className="h-px flex-1 bg-neutral-200 dark:bg-white/10" />
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl text-neutral-900 dark:text-white leading-tight">
            Professional <span className="text-gradient-vivid">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative mb-24">
          {/* Vertical Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500 via-cyan-500 to-emerald-500 opacity-40" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.55 }}
                className="relative pl-16"
              >
                {/* Timeline node */}
                <div
                  className="absolute left-4 top-6 w-4 h-4 rounded-full border-2 border-white dark:border-[#030712]"
                  style={{ background: exp.accent, boxShadow: `0 0 14px ${exp.accent}aa` }}
                />

                <div className="glass rounded-2xl p-7 border border-neutral-200/80 dark:border-white/10 hover:border-violet-500/30 transition-all duration-300">
                  {/* Title Bar */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-display font-black text-neutral-900 dark:text-white text-xl">{exp.title}</h3>
                      <p className="text-violet-600 dark:text-violet-400 font-semibold text-sm mt-0.5">{exp.company}</p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${exp.typeColor}`}>
                      {exp.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-4">
                    <span className="flex items-center gap-1.5"><Calendar size={13} />{exp.duration}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={13} />{exp.location}</span>
                  </div>

                  <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed mb-4">{exp.description}</p>

                  {/* Bullet achievements */}
                  <ul className="space-y-2 mb-6">
                    {exp.achievements.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5 text-xs md:text-sm text-neutral-600 dark:text-neutral-300">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-200 dark:border-white/10">
                    {exp.tech.map((t) => (
                      <span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-500/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.55 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-violet-500 font-bold block mb-1">
                VERIFIED CREDENTIALS
              </span>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl text-neutral-900 dark:text-white">
                Professional Certifications
              </h3>
            </div>
            <ShieldCheck size={28} className="text-violet-500 hidden sm:block" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((cert, i) => (
              <motion.a
                key={cert.name}
                href={cert.credlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.08 }}
                whileHover={{ scale: 1.02, y: -3 }}
                className="glass rounded-xl p-4 border border-neutral-200/80 dark:border-white/10 hover:border-violet-500/40 transition-all duration-300 group flex items-center gap-4"
              >
                {/* Badge Image */}
                <div className="relative w-14 h-14 rounded-xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 overflow-hidden shrink-0">
                  <Image
                    src={getAssetPath(cert.image)}
                    alt={cert.name}
                    fill
                    sizes="56px"
                    className="object-contain p-1"
                    unoptimized
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-neutral-900 dark:text-white font-bold text-xs leading-snug group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors line-clamp-2">
                    {cert.name}
                  </p>
                  <p className="text-neutral-500 text-[11px] font-mono mt-0.5">{cert.issuer} · {cert.year}</p>
                  <span className="text-violet-500 text-[11px] font-mono flex items-center gap-0.5 mt-1 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Verify Badge <ArrowUpRight size={12} />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
