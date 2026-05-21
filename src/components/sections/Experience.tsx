"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { getAssetPath } from "@/lib/assets";

const experiences = [
  {
    id: 1,
    title: "Associate Data Engineer",
    company: "Workmates Core2cloud Solutions Ltd.",
    location: "Kolkata, India",
    duration: "Dec 2023 — Present",
    type: "Full-time",
    typeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    description:
      "Building robust ETL pipelines and data solutions for enterprise clients using modern data stack technologies — AWS Glue, Redshift, S3, and more.",
    achievements: [
      "Designed scalable ETL pipelines using AWS Glue & Data Pipeline Services",
      "Built Redshift + S3 data warehouse for large-scale storage and analytics",
      "Optimized data processing workflows — 40% reduction in execution time",
      "Implemented real-time data quality checks and monitoring systems",
    ],
    tech: ["Python", "SQL", "AWS Glue", "Redshift", "DMS", "S3", "Lambda", "QuickSight"],
    accent: "#6366f1",
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Computer Software Solution LLC",
    location: "Colorado, USA (Remote)",
    duration: "Apr 2022 — Nov 2023",
    type: "Remote",
    typeColor: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    description:
      "Developed reviewProbe Jobs — an end-to-end job searching and posting platform, focusing on full-stack development and user experience.",
    achievements: [
      "Built complete job portal with authentication and job management",
      "Developed RESTful APIs for posting and application management",
      "Integrated payment systems and user notification features",
      "Optimized application performance and database queries",
    ],
    tech: ["React", "Node.js", "MongoDB", "Express.js", "JavaScript", "CSS"],
    accent: "#a855f7",
  },
  {
    id: 3,
    title: "Master's in Computer Application",
    company: "Techno India University",
    location: "Kolkata, India",
    duration: "2018 — 2022",
    type: "Education",
    typeColor: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    description:
      "Comprehensive coursework in computer science fundamentals, data structures, algorithms, and specialization in data engineering and analytics.",
    achievements: [
      "Graduated with 8.64 CGPA",
      "Completed projects in data mining and machine learning",
      "Developed web applications and database management systems",
    ],
    tech: ["C++", "Java", "Python", "MySQL", "Data Structures", "Algorithms"],
    accent: "#ec4899",
  },
];

const certifications = [
  { name: "GCP Professional Data Engineer",      issuer: "Google Cloud", year: "2026", image: "/gcp-professional-data-engineer-certification.png", credlyUrl: "https://www.credly.com/badges/1b899ddc-af10-401c-8571-1e6587578686/public_url" },
  { name: "AWS Associate Data Engineer",         issuer: "Amazon AWS",   year: "2024", image: "/aws-certified-data-engineer-associate (3).png",     credlyUrl: "https://www.credly.com/badges/25563f35-bb02-45e8-9705-e092548f22f4/public_url" },
  { name: "AWS Machine Learning Engineer",       issuer: "Amazon AWS",   year: "2024", image: "/aws-certified-machine-learning-engineer-associate (1).png", credlyUrl: "https://www.credly.com/badges/71f85288-9704-48e7-8a73-5ecc26d5f813/public_url" },
  { name: "GitHub Foundations",                  issuer: "GitHub",       year: "2024", image: "/github-foundations (3).png",                         credlyUrl: "https://www.credly.com/badges/fb008a64-c426-4203-87d5-f84ea7e12cbb/public_url" },
  { name: "GCP Associate Cloud Engineer",        issuer: "Google Cloud", year: "2025", image: "/associate-cloud-engineer-certification (3).png",     credlyUrl: "https://www.credly.com/badges/03b452c6-a3dd-49ad-9b19-32652d17eb81/public_url" },
  { name: "AWS Certified AI Practitioner",       issuer: "Amazon AWS",   year: "2025", image: "/aws-certified-ai-practitioner (1).png",              credlyUrl: "https://www.credly.com/badges/4d4163cb-bd43-45a4-acc1-2813a83a0041/public_url" },
];

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="experience" ref={ref} className="py-24 px-4 relative z-10 overflow-hidden">
      <div className="absolute top-1/4 right-0 w-80 h-80 orb orb-purple opacity-15 pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="section-label">My journey</p>
          <h2 className="font-display font-black text-4xl md:text-6xl text-white leading-none">
            Experience &amp; <span className="text-gradient-vivid">Achievements</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 opacity-40" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.55, ease: "easeOut" }}
                className="relative pl-16"
              >
                {/* Timeline node */}
                <div
                  className="absolute left-4 top-6 w-4 h-4 rounded-full border-2 border-neutral-900"
                  style={{ background: exp.accent, boxShadow: `0 0 12px ${exp.accent}80` }}
                />

                <div className="glass rounded-2xl p-6 border border-neutral-200/70 dark:border-white/[0.08] hover:border-white/16 transition-all duration-300">
                  {/* Header row */}
                  <div className="flex flex-wrap items-start gap-3 mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-white text-lg leading-tight">{exp.title}</h3>
                      <p className="text-indigo-400 font-medium text-sm mt-0.5">{exp.company}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${exp.typeColor}`}>
                      {exp.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-neutral-500 mb-4">
                    <span className="flex items-center gap-1"><Calendar size={12} />{exp.duration}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} />{exp.location}</span>
                  </div>

                  <p className="text-neutral-400 text-sm leading-relaxed mb-4">{exp.description}</p>

                  <ul className="space-y-1.5 mb-5">
                    {exp.achievements.map((a) => (
                      <li key={a} className="flex items-start gap-2 text-sm text-neutral-400">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white/6 border border-white/10 text-neutral-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.55 }}
          className="mt-24"
        >
          <p className="section-label mb-4">Credentials</p>
          <h3 className="font-display font-bold text-2xl text-white mb-10">
            Certifications
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <motion.a
                key={cert.name}
                href={cert.credlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.08 }}
                whileHover={{ scale: 1.02, y: -3 }}
                className="glass rounded-xl p-4 border border-neutral-200/70 dark:border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300 group flex items-center gap-4"
              >
                {/* Badge image */}
                <div className="relative w-16 h-16 rounded-xl bg-white/5 border border-white/10 overflow-hidden shrink-0">
                  <Image
                    src={getAssetPath(cert.image)}
                    alt={cert.name}
                    fill
                    sizes="64px"
                    className="object-contain p-1"
                    unoptimized
                    onError={() => {}}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm leading-snug group-hover:text-indigo-300 transition-colors line-clamp-2">
                    {cert.name}
                  </p>
                  <p className="text-neutral-500 text-xs mt-0.5">{cert.issuer} · {cert.year}</p>
                  <span className="text-indigo-400 text-xs flex items-center gap-0.5 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    Verify <ArrowUpRight size={11} />
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
