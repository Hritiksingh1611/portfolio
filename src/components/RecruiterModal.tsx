"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Award, CheckCircle2, Download, Mail, Phone, MapPin, Briefcase, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { getAssetPath } from "@/lib/assets";

interface RecruiterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RecruiterModal({ isOpen, onClose }: RecruiterModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[2500] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-3xl glass rounded-2xl border border-violet-500/30 p-6 sm:p-8 z-10 shadow-2xl overflow-hidden bg-slate-950/95 text-white max-h-[90vh] overflow-y-auto"
        >
          {/* Top Bar Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-violet-400 font-bold uppercase tracking-widest">
                RECRUITER EXECUTIVE SUMMARY · 1-PAGE QUICK SCAN
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Candidate Profile Brief */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6 p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shrink-0 ring-2 ring-violet-500/50">
              <Image
                src={getAssetPath("/profile.jpg")}
                alt="Hritik Singh"
                width={80}
                height={80}
                className="object-cover object-top w-full h-full"
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h2 className="font-display font-black text-2xl text-white">Hritik Singh</h2>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                  3+ Yrs Exp
                </span>
              </div>
              <p className="text-sm font-semibold text-violet-300 mb-2">Data Engineer @ Workmates Core2Cloud</p>
              
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1"><MapPin size={12} className="text-violet-400" /> Kolkata, India</span>
                <a href="mailto:hritiksingh1611@gmail.com" className="flex items-center gap-1 hover:text-violet-300"><Mail size={12} className="text-violet-400" /> hritiksingh1611@gmail.com</a>
                <span className="flex items-center gap-1"><Phone size={12} className="text-violet-400" /> +91-9123964918</span>
              </div>
            </div>

            <a
              href={getAssetPath("/resume.pdf")}
              download="Hritik_Singh_Data_Engineer_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold shrink-0"
            >
              <Download size={14} /> Download PDF
            </a>
          </div>

          {/* Impact Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { num: "3+ Years", label: "ETL & CDC Experience" },
              { num: "6 Certs", label: "AWS & GCP Cloud" },
              { num: "15+ Jobs", label: "Production Glue/DMS" },
              { num: "8.64 CGPA", label: "MCA Master Degree" },
            ].map(({ num, label }) => (
              <div key={label} className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                <div className="font-display font-black text-lg text-violet-300">{num}</div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5 uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>

          {/* Core Tech Competencies */}
          <div className="mb-6">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Briefcase size={14} className="text-violet-400" /> Core Tech Stack &amp; Tools
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {["AWS Glue", "PySpark", "Amazon Redshift", "AWS DMS CDC", "SAP OData", "GCP Cloud SQL", "GCP BigQuery", "Python", "SQL", "Apache Airflow", "AWS Lambda", "Athena", "QuickSight", "Docker", "Git"].map((tech) => (
                <span key={tech} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-slate-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications Quick Grid */}
          <div className="mb-6">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-400" /> Verified Cloud Credentials
            </h4>
            <div className="grid sm:grid-cols-2 gap-2 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span className="truncate">GCP Professional Data Engineer</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span className="truncate">AWS Certified Data Engineer - Associate</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span className="truncate">AWS Certified Machine Learning Engineer</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span className="truncate">GCP Associate Cloud Engineer</span>
              </div>
            </div>
          </div>

          {/* Key Achievements */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-slate-300 flex items-start gap-3">
            <Award size={18} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block mb-0.5">Award: Customer Engagement Champion</span>
              <span>Awarded Database Champion @ Workmates Core2Cloud for outstanding delivery on SAP integration &amp; DMS CDC migration pipelines.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
