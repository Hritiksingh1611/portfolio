"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download, Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { useState, useEffect, Fragment } from "react";
import { getAssetPath } from "@/lib/assets";

const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const roles = ["Data Engineer", "ETL Developer", "Cloud Architect", "Data Analyst", "Python Developer"];

function TypewriterRole() {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = roles[idx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && shown.length < target.length)
      t = setTimeout(() => setShown(target.slice(0, shown.length + 1)), 60);
    else if (!deleting && shown.length === target.length)
      t = setTimeout(() => setDeleting(true), 2400);
    else if (deleting && shown.length > 0)
      t = setTimeout(() => setShown(shown.slice(0, -1)), 30);
    else { setDeleting(false); setIdx((i) => (i + 1) % roles.length); }
    return () => clearTimeout(t);
  }, [shown, deleting, idx]);

  return (
    <span className="text-violet-600 dark:text-violet-400 font-mono">
      {shown}
      <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>_</motion.span>
    </span>
  );
}

/* ── Animated ETL Pipeline ── */
interface PipelineStage {
  id: string;
  label: string;
  sub: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  glowColor: string;
  delay: number;
}

const pipelineStages: PipelineStage[] = [
  { id: "src",  label: "SOURCE", sub: "raw data",  borderColor: "border-blue-500/40",    bgColor: "bg-blue-500/10",    textColor: "text-blue-700 dark:text-blue-400",     glowColor: "rgba(59,130,246,0.35)",  delay: 0    },
  { id: "ext",  label: "INGEST", sub: "extract",   borderColor: "border-cyan-500/40",    bgColor: "bg-cyan-500/10",    textColor: "text-cyan-700 dark:text-cyan-400",     glowColor: "rgba(34,211,238,0.3)",   delay: 0.5  },
  { id: "xfm",  label: "XFORM",  sub: "transform", borderColor: "border-violet-500/60",  bgColor: "bg-violet-500/20",  textColor: "text-violet-700 dark:text-violet-300", glowColor: "rgba(124,58,237,0.5)",   delay: 1.0  },
  { id: "ld",   label: "LOAD",   sub: "persist",   borderColor: "border-pink-500/40",    bgColor: "bg-pink-500/10",    textColor: "text-pink-700 dark:text-pink-400",     glowColor: "rgba(236,72,153,0.3)",   delay: 1.5  },
  { id: "dwh",  label: "SERVE",  sub: "analytics", borderColor: "border-emerald-500/40", bgColor: "bg-emerald-500/10", textColor: "text-emerald-700 dark:text-emerald-400", glowColor: "rgba(52,211,153,0.3)",  delay: 2.0  },
];

function ETLPipeline() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2500);
    return () => clearInterval(id);
  }, []);

  const activeIdx = tick % pipelineStages.length;

  return (
    <div className="w-full select-none">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-mono text-neutral-500 dark:text-neutral-700 uppercase tracking-wider">pipeline · live</span>
        </div>
        <span className="text-[9px] font-mono text-neutral-400 dark:text-neutral-800">ETL / ELT</span>
      </div>

      <div className="flex items-center">
        {pipelineStages.map((stage, i) => (
          <Fragment key={stage.id}>
            <motion.div
              animate={
                i === activeIdx
                  ? { boxShadow: [`0 0 0px ${stage.glowColor}`, `0 0 12px ${stage.glowColor}`, `0 0 0px ${stage.glowColor}`], opacity: 1 }
                  : { opacity: [0.45, 0.7, 0.45], boxShadow: "none" }
              }
              transition={{ duration: i === activeIdx ? 1.2 : 2.4, repeat: Infinity, delay: i === activeIdx ? 0 : stage.delay * 0.3 }}
              className={`flex flex-col items-center gap-0.5 shrink-0 rounded-lg border ${stage.borderColor} ${stage.bgColor} px-2 py-1.5 min-w-[44px]`}
            >
              <span className={`text-[8px] font-mono font-bold ${stage.textColor}`}>{stage.label}</span>
              <span className="text-[7px] text-neutral-500 dark:text-neutral-700 font-mono leading-none">{stage.sub}</span>
            </motion.div>

            {i < pipelineStages.length - 1 && (
              <div className="flex-1 mx-1 relative flex items-center">
                <div className="pipeline-line w-full" style={{ opacity: i <= activeIdx ? 0.9 : 0.25 }} />
              </div>
            )}
          </Fragment>
        ))}
      </div>

      <div className="mt-3 h-px bg-neutral-200 dark:bg-white/[0.04] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500"
          animate={{ width: `${(activeIdx / (pipelineStages.length - 1)) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-between mt-1 px-0.5">
        <span className="text-[7px] font-mono text-neutral-400 dark:text-neutral-800">raw ingestion</span>
        <span className="text-[7px] font-mono text-neutral-400 dark:text-neutral-800">production ready</span>
      </div>
    </div>
  );
}

const socials = [
  { href: "https://github.com/Hritiksingh1611",             icon: Github,   label: "GitHub" },
  { href: "https://linkedin.com/in/hritik-singh-304450206", icon: Linkedin, label: "LinkedIn" },
  { href: "https://x.com/Hritik1611",                       icon: XIcon,    label: "X" },
  { href: "mailto:hritik16.work@gmail.com",                 icon: Mail,     label: "Email" },
];

const techPills = ["Python", "AWS", "Clickhouse", "GCP", "Airflow", "SQL", "PySpark", "Power BI"];

const ticker = [
  "Python", "·", "SQL", "·", "AWS Glue", "·", "Redshift", "·",
  "Clickhouse", "·", "Power BI", "·", "PySpark", "·", "ETL / ELT", "·",
  "GCP", "·", "Apache Airflow", "·", "Data Warehousing", "·", "FastAPI", "·",
  "PostgreSQL", "·", "Pandas", "·", "Docker", "·",
];

export default function Hero() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="home"
      className="relative min-h-screen bg-[#f9f9fc] dark:bg-[#09090b] flex flex-col overflow-hidden"
    >
      {/* Dot grid */}
      <div className="hero-dot-grid absolute inset-0 -z-10 pointer-events-none" />

      {/* Ambient orbs */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="animate-blob  orb orb-violet w-[500px] h-[500px] -top-40 -left-40 opacity-25 dark:opacity-60" />
        <div className="animate-blob2 orb orb-pink   w-[350px] h-[350px] bottom-0  -right-20 opacity-20 dark:opacity-60" />
      </div>

      {/* Nav spacer */}
      <div className="h-20 shrink-0" />

      {/* ── Main layout ── */}
      <div className="flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-14 py-6">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 xl:gap-16 items-center">

            {/* ─── LEFT: Text content ─── */}
            <div className="flex flex-col">

              {/* Mobile photo — hidden on lg+ */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex lg:hidden justify-center mb-7"
              >
                <div className="relative">
                  <div className="absolute inset-[-12px] rounded-full border border-dashed border-violet-500/30 animate-spin-slow pointer-events-none" />
                  {/* w-40 h-40 = 160px — large enough to show face clearly */}
                  <div className="relative w-40 h-40 rounded-full overflow-hidden ring-2 ring-violet-500/50 ring-offset-4 ring-offset-[#f9f9fc] dark:ring-offset-[#09090b]">
                    {!imgError ? (
                      <Image
                        src={getAssetPath("/profile.png")}
                        alt="Hritik Singh"
                        fill
                        sizes="160px"
                        className="object-cover"
                        style={{ objectPosition: "center 8%" }}
                        onError={() => setImgError(true)}
                        priority
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-violet-700 to-indigo-700 flex items-center justify-center">
                        <span className="text-white font-display font-black text-3xl">HS</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Location badge */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="flex items-center gap-2 mb-6 w-fit"
              >
                <span className="w-2 h-2 rounded-full bg-violet-500" />
                <span className="text-xs font-mono text-neutral-500 tracking-wider">
                  DATA ENGINEER · KOLKATA, INDIA
                </span>
              </motion.div>

              {/* Name */}
              <div className="mb-4">
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display font-extrabold text-neutral-900 dark:text-white leading-[0.9] tracking-tight"
                    style={{ fontSize: "clamp(2.6rem, 5.5vw, 5.2rem)" }}
                  >
                    Hritik Singh.
                  </motion.h1>
                </div>
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display font-extrabold leading-[0.9] tracking-tight hero-name-gradient"
                    style={{ fontSize: "clamp(2.6rem, 5.5vw, 5.2rem)" }}
                  >
                    Data Engineer.
                  </motion.div>
                </div>
              </div>

              {/* Typewriter role */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.42, duration: 0.4 }}
                className="flex items-center gap-2 text-sm mb-4"
              >
                <span className="font-mono text-neutral-500 dark:text-neutral-700">{"Currently working as"}</span>
                <TypewriterRole />
              </motion.div>

              {/* Bio */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.4 }}
                className="text-neutral-500 text-[14px] leading-relaxed mb-5 max-w-[440px]"
              >
                2+ years shipping data pipelines &amp; cloud infrastructure at{" "}
                <span className="text-neutral-700 dark:text-neutral-300 font-medium">Workmates Core2cloud</span>.
                {" "}Building on AWS Glue, Redshift, GCP &amp; Clickhouse — from raw ingestion to production dashboards.
              </motion.p>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.4 }}
                className="flex items-center gap-6 sm:gap-8 mb-5 pb-5 border-b border-neutral-200 dark:border-white/[0.06] lg:mb-7 lg:pb-7"
              >
                {[
                  { num: "2+",  label: "Years" },
                  { num: "15+", label: "Pipelines" },
                  { num: "3",   label: "Clouds" },
                  { num: "6+",  label: "Certs" },
                ].map(({ num, label }) => (
                  <div key={label} className="text-center">
                    <div className="font-display font-black text-xl text-neutral-900 dark:text-white leading-none">{num}</div>
                    <div className="text-[10px] text-neutral-400 dark:text-neutral-700 mt-1 font-mono uppercase tracking-wider">{label}</div>
                  </div>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.4 }}
                className="flex flex-wrap gap-3 mb-6"
              >
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm"
                >
                  Let&apos;s Talk <ArrowUpRight size={14} />
                </motion.a>
                <motion.a
                  href="/resume.pdf"
                  download="Hritik_Singh_Resume.pdf"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-ghost inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm"
                >
                  <Download size={13} /> Resume
                </motion.a>
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85, duration: 0.4 }}
                className="flex items-center gap-2"
              >
                <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-800 uppercase tracking-widest">Find me —</span>
                {socials.map(({ href, icon: Icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg border border-neutral-200 dark:border-white/[0.07] text-neutral-600 dark:text-neutral-700 hover:text-violet-700 dark:hover:text-white hover:border-violet-400 dark:hover:border-violet-500/40 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-all duration-200"
                  >
                    <Icon size={15} />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* ─── RIGHT: Photo + Pipeline ─── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex flex-col items-center gap-5"
            >
              {/* Photo */}
              <div className="relative">
                <div className="absolute inset-[-20px] rounded-full border border-dashed border-violet-500/30 animate-spin-slow pointer-events-none" />
                <div className="absolute inset-[-6px] rounded-full border border-violet-500/20 dark:border-violet-500/30 pointer-events-none" />

                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  className="relative w-64 h-64 rounded-full overflow-hidden cursor-pointer ring-2 ring-violet-500/50 ring-offset-[6px] ring-offset-[#f9f9fc] dark:ring-offset-[#09090b]"
                >
                  {!imgError ? (
                    <Image
                      src={getAssetPath("/profile.png")}
                      alt="Hritik Singh"
                      fill
                      sizes="256px"
                      className="object-cover object-top"
                      onError={() => setImgError(true)}
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-violet-700 to-indigo-700 flex items-center justify-center">
                      <span className="text-white font-display font-black text-5xl">HS</span>
                    </div>
                  )}
                </motion.div>

                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#09090b] border border-violet-500/20 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                  <span className="text-violet-600 dark:text-violet-400 text-[10px] font-mono">Hritik Singh</span>
                </div>
              </div>

              {/* Name card */}
              <div className="mt-2 text-center">
                <p className="text-neutral-900 dark:text-white font-semibold text-sm tracking-tight">Hritik Singh</p>
                <p className="text-neutral-500 dark:text-neutral-600 text-xs font-mono mt-0.5">Data Engineer @ Core2cloud</p>
              </div>

              {/* Tech pills */}
              <div className="flex flex-wrap justify-center gap-1.5 max-w-[280px]">
                {techPills.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.06 }}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono text-neutral-500 dark:text-neutral-600 border border-neutral-200 dark:border-white/[0.07] bg-neutral-100/60 dark:bg-white/[0.02] cursor-default hover:text-violet-700 dark:hover:text-neutral-300 hover:border-violet-300 dark:hover:border-violet-500/40 transition-colors"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              {/* Animated ETL Pipeline */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="w-full px-3 py-3 rounded-xl border border-neutral-200/80 dark:border-white/[0.06] bg-neutral-50 dark:bg-white/[0.02]"
              >
                <ETLPipeline />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── Tech ticker ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="border-t border-neutral-200 dark:border-white/[0.05] overflow-hidden marquee-wrap shrink-0 bg-neutral-50/80 dark:bg-transparent"
        style={{ background: undefined }}
      >
        <div className="marquee-track animate-marquee py-2.5">
          {[...ticker, ...ticker].map((item, i) => (
            <span
              key={i}
              className={`px-3 text-[10px] font-mono tracking-widest whitespace-nowrap ${
                item === "·" ? "text-violet-400/40 dark:text-violet-500/20" : "text-neutral-400 dark:text-neutral-800"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
