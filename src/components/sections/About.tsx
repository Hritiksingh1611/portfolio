"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { MapPin, GraduationCap, Briefcase, Zap } from "lucide-react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" as const },
  }),
};

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 px-4 relative z-10 overflow-hidden"
    >
      {/* faint orb */}
      <div className="absolute top-0 right-0 w-96 h-96 orb orb-purple opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="section-label">Who I am</p>
          <h2 className="font-display font-black text-4xl md:text-6xl text-white leading-none">
            About <span className="text-gradient-vivid">Me</span>
          </h2>
        </motion.div>

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">

          {/* Bio card — spans 2 cols */}
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
            className="lg:col-span-2 glass rounded-2xl p-7 border border-neutral-200/70 dark:border-white/[0.08]"
          >
            <h3 className="font-display font-bold text-xl text-white mb-4">
              Hi, I&apos;m Hritik 👋
            </h3>
            <p className="text-neutral-400 leading-relaxed mb-4">
              A passionate <span className="text-indigo-400 font-medium">Data Engineer</span> with 2+ years of experience designing and implementing scalable ETL pipelines and data solutions. Currently at <span className="text-white font-medium">Workmates Core2cloud Solutions Limited</span>, specializing in modern data stack technologies and cloud-based data warehousing.
            </p>
            <p className="text-neutral-400 leading-relaxed">
              I thrive at the intersection of data engineering and cloud computing — building efficient pipelines with Python, SQL, AWS Glue, GCP, and Snowflake, delivering data-driven insights for enterprise clients.
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              {["ETL Development", "Data Warehousing", "Cloud Computing", "Database Management"].map((s) => (
                <span key={s} className="skill-pill text-xs">{s}</span>
              ))}
            </div>
          </motion.div>

          {/* Quick facts card */}
          <motion.div
            custom={1} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
            className="glass rounded-2xl p-7 border border-neutral-200/70 dark:border-white/[0.08] flex flex-col gap-4"
          >
            <h3 className="font-display font-bold text-lg text-white">Quick Facts</h3>
            <div className="space-y-3 text-sm">
              {[
                { icon: MapPin,        label: "Location",     value: "Kolkata, India 🇮🇳" },
                { icon: Briefcase,     label: "Role",         value: "Assoc. Data Engineer" },
                { icon: GraduationCap, label: "Education",    value: "MCA — 8.64 CGPA" },
                { icon: Zap,           label: "Status",       value: "Currently Working" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <Icon size={14} className="text-indigo-400 shrink-0" />
                  <span className="text-neutral-500">{label}</span>
                  <span className="ml-auto text-neutral-300 font-medium text-right">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stat: Experience */}
          <motion.div
            custom={2} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
            className="glass rounded-2xl p-7 border border-indigo-500/20 bg-indigo-500/5 flex flex-col justify-between"
          >
            <p className="text-neutral-500 text-sm font-medium">Years of Experience</p>
            <div>
              <p className="font-display font-black text-6xl text-white leading-none">
                <AnimatedCounter target={2} suffix="+" />
              </p>
              <p className="text-indigo-400 text-sm mt-1">in Data Engineering</p>
            </div>
          </motion.div>

          {/* Stat: Projects */}
          <motion.div
            custom={3} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
            className="glass rounded-2xl p-7 border border-purple-500/20 bg-purple-500/5 flex flex-col justify-between"
          >
            <p className="text-neutral-500 text-sm font-medium">Projects Delivered</p>
            <div>
              <p className="font-display font-black text-6xl text-white leading-none">
                <AnimatedCounter target={15} suffix="+" />
              </p>
              <p className="text-purple-400 text-sm mt-1">across data & web</p>
            </div>
          </motion.div>

          {/* Stat: Cloud platforms */}
          <motion.div
            custom={4} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
            className="glass rounded-2xl p-7 border border-pink-500/20 bg-pink-500/5 flex flex-col justify-between"
          >
            <p className="text-neutral-500 text-sm font-medium">Cloud Platforms</p>
            <div>
              <p className="font-display font-black text-6xl text-white leading-none">
                <AnimatedCounter target={3} suffix="+" />
              </p>
              <p className="text-pink-400 text-sm mt-1">AWS · GCP · Azure</p>
            </div>
          </motion.div>

          {/* Currently learning card */}
          <motion.div
            custom={5} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
            className="md:col-span-2 lg:col-span-3 glass rounded-2xl p-7 border border-neutral-200/70 dark:border-white/[0.08]"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center shrink-0">
                <Zap size={18} className="text-indigo-400" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white mb-1">Always learning, always building</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Currently diving deep into <span className="text-indigo-400">Large Language Models</span>, <span className="text-purple-400">Edge Computing</span>, and <span className="text-pink-400">Advanced MLOps</span> practices. Technology evolves rapidly — so do I.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
