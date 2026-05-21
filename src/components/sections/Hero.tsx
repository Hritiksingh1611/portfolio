"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Download, ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useState, useEffect, useRef, type ReactNode } from "react";
import { getAssetPath } from "@/lib/assets";

/* ── X icon ── */
const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

/* ── Char-by-char reveal ── */
function CharReveal({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  return (
    <span aria-label={text} className={className} style={{ display: "block", overflow: "hidden" }}>
      <span style={{ display: "block" }}>
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: delay + i * 0.055,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ display: "inline-block" }}
          >
            {char === " " ? " " : char}
          </motion.span>
        ))}
      </span>
    </span>
  );
}

/* ── Typewriter ── */
const roles = ["Data Engineer", "ETL Developer", "Data Analyst", "Python Developer", "Backend Developer"];

function TypewriterRole() {
  const [idx, setIdx]         = useState(0);
  const [shown, setShown]     = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = roles[idx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && shown.length < target.length) {
      t = setTimeout(() => setShown(target.slice(0, shown.length + 1)), 68);
    } else if (!deleting && shown.length === target.length) {
      t = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && shown.length > 0) {
      t = setTimeout(() => setShown(shown.slice(0, -1)), 38);
    } else {
      setDeleting(false);
      setIdx((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(t);
  }, [shown, deleting, idx]);

  return (
    <span className="text-gradient-vivid font-bold">
      {shown}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="text-indigo-400 dark:text-indigo-300"
      >
        |
      </motion.span>
    </span>
  );
}

/* ── Magnetic button ── */
function MagneticLink({
  href,
  children,
  className,
  download,
}: {
  href: string;
  children: ReactNode;
  className: string;
  download?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 280, damping: 18 });
  const sy = useSpring(my, { stiffness: 280, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r  = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.38);
    my.set((e.clientY - (r.top  + r.height / 2)) * 0.38);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
    >
      {children}
    </motion.a>
  );
}

/* ── Socials ── */
const socials = [
  { href: "https://github.com/Hritiksingh1611",            icon: Github,   label: "GitHub" },
  { href: "https://linkedin.com/in/hritik-singh-304450206", icon: Linkedin, label: "LinkedIn" },
  { href: "https://x.com/Hritik1611",                       icon: XIcon,    label: "X" },
  { href: "mailto:hritik16.work@gmail.com",                  icon: Mail,     label: "Email" },
];

const techPills = ["Python", "SQL", "AWS Glue", "Redshift", "PySpark", "Snowflake", "Power BI", "ETL/ELT"];

/* ── Hero ── */
export default function Hero() {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* ── Aurora background ── */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* blob 1 — indigo, top-left */}
        <div className="animate-blob  orb orb-blue   w-[700px] h-[700px] -top-48 -left-48" />
        {/* blob 2 — purple, right */}
        <div className="animate-blob2 orb orb-purple w-[600px] h-[600px] top-1/4 -right-32" />
        {/* blob 3 — pink, bottom */}
        <div className="animate-blob3 orb orb-pink   w-[500px] h-[500px] bottom-0 left-1/4" />
        {/* grid overlay */}
        <div className="absolute inset-0 grid-bg opacity-60" />
      </div>

      <div className="container mx-auto px-6 pt-28 pb-20 max-w-6xl flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

        {/* ── Image — right on desktop ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex-shrink-0 order-first lg:order-last"
        >
          {/* outer glow ring — spins */}
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-spin-slow opacity-70 blur-[3px]" />
          {/* static ring */}
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-25" />

          <div className="relative w-52 h-52 sm:w-64 sm:h-64 lg:w-[21rem] lg:h-[21rem] rounded-full overflow-hidden border-4 border-white/10 dark:border-white/5 shadow-2xl">
            {!imgError ? (
              <Image
                src={getAssetPath("/profile.png")}
                alt="Hritik Singh"
                fill
                priority
                sizes="(max-width:640px) 208px,(max-width:1024px) 256px,336px"
                className="object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
                <span className="font-display font-black text-5xl">HS</span>
              </div>
            )}
          </div>

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.4 }}
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white dark:bg-neutral-950 text-emerald-600 dark:text-emerald-400 text-xs font-semibold px-4 py-2 rounded-full border border-emerald-200 dark:border-emerald-500/30 shadow-lg whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Available to collaborate
          </motion.div>
        </motion.div>

        {/* ── Text content ── */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-7 flex-1">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="section-label">Data Engineer &amp; Cloud Specialist</span>
          </motion.div>

          {/* Name — char reveal */}
          <div className="font-display font-black leading-none tracking-tight">
            <CharReveal
              text="Hritik"
              delay={0.25}
              className="text-[clamp(4rem,10vw,7rem)] text-neutral-900 dark:text-white"
            />
            <CharReveal
              text="Singh"
              delay={0.5}
              className="text-[clamp(4rem,10vw,7rem)] hero-name-gradient"
            />
          </div>

          {/* Typewriter */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="text-xl md:text-2xl text-neutral-700 dark:text-neutral-400 font-medium min-h-[2rem]"
          >
            I build as a&nbsp;
            <TypewriterRole />
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-lg"
          >
            Passionate about building scalable data pipelines and transforming raw data into actionable insights. Specializing in AWS, GCP, and modern data stack.
          </motion.p>

          {/* Tech pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.35, duration: 0.5 }}
            className="flex flex-wrap gap-2 justify-center lg:justify-start"
          >
            {techPills.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + i * 0.06 }}
                className="skill-pill text-xs"
              >
                {t}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <MagneticLink href="#contact" className="btn-primary px-9 py-3.5 rounded-xl font-semibold text-sm text-center">
              Let&apos;s Connect
            </MagneticLink>
            <MagneticLink
              href="/resume.pdf"
              download="Hritik_Singh_Resume.pdf"
              className="btn-ghost px-9 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Download size={15} />
              Download Resume
            </MagneticLink>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.75, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            {socials.map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 rounded-xl glass border border-neutral-200/60 dark:border-white/8 text-neutral-500 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
              >
                <Icon size={17} />
              </motion.a>
            ))}
            <span className="text-xs text-neutral-400 dark:text-neutral-600 ml-1">Kolkata, India</span>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-neutral-400 dark:text-neutral-600 hover:text-indigo-500 transition-colors group"
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.button>
    </section>
  );
}
