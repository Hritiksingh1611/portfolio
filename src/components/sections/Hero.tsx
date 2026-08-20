"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download, Github, Linkedin, Mail, ArrowUpRight, Terminal, Play, CheckCircle2 } from "lucide-react";
import { useState, useEffect, Fragment } from "react";
import { getAssetPath } from "@/lib/assets";

const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const roles = ["Data Engineer (3+ Yrs)", "AWS & GCP Certified", "PySpark & Glue Expert", "CDC & ETL Architect", "Data Pipeline Lead"];

function TypewriterRole() {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = roles[idx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && shown.length < target.length)
      t = setTimeout(() => setShown(target.slice(0, shown.length + 1)), 50);
    else if (!deleting && shown.length === target.length)
      t = setTimeout(() => setDeleting(true), 2200);
    else if (deleting && shown.length > 0)
      t = setTimeout(() => setShown(shown.slice(0, -1)), 25);
    else { setDeleting(false); setIdx((i) => (i + 1) % roles.length); }
    return () => clearTimeout(t);
  }, [shown, deleting, idx]);

  return (
    <span className="text-violet-600 dark:text-violet-400 font-mono font-semibold">
      {shown}
      <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>_</motion.span>
    </span>
  );
}

/* ── Interactive Code Switcher Widget ── */
const codeSnippets = {
  pyspark: {
    title: "AWS Glue PySpark Job",
    lang: "python",
    code: `from awsglue.transforms import *
from awsglue.context import GlueContext

glueContext = GlueContext(SparkContext.getOrCreate())
# Extract SAP OData & RDS Stream
dyf_sap = glueContext.create_dynamic_frame.from_options(
    connection_type="s3", connection_options={"paths": ["s3://sap-raw-ingest/"]}
)
# Transform & Enrich CDC
df_transformed = dyf_sap.toDF().filter("status = 'VALIDATED'") \\
    .withColumn("processed_at", current_timestamp())

# Load into Amazon Redshift Warehouse
glueContext.write_dynamic_frame.from_options(
    frame=DynamicFrame.fromDF(df_transformed, glueContext, "df"),
    connection_type="redshift", connection_options={"dbtable": "curated_analytics"}
)`
  },
  sql: {
    title: "Redshift CDC Transformation SQL",
    lang: "sql",
    code: `-- Change Data Capture (CDC) Real-Time Merge
MERGE INTO dwh_sales.fact_orders AS target
USING stg_cdc.sales_updates AS source
ON target.order_id = source.order_id
WHEN MATCHED AND source.op = 'U' THEN
  UPDATE SET status = source.status, updated_at = GETDATE()
WHEN NOT MATCHED AND source.op = 'I' THEN
  INSERT (order_id, customer_id, amount, status)
  VALUES (source.order_id, source.customer_id, source.amount, source.status);`
  },
  airflow: {
    title: "Airflow Orchestration DAG",
    lang: "python",
    code: `@dag(schedule_interval="@hourly", catchup=False)
def sap_redshift_etl():
    extract_sap = GlueJobOperator(job_name="sap_odata_extract")
    run_dms_cdc  = DMSStartTaskOperator(task_arn=DMS_TASK_ARN)
    data_quality = PythonOperator(task_id="source_to_target_val")
    
    extract_sap >> run_dms_cdc >> data_quality`
  }
};

function CodeTerminalWidget() {
  const [activeTab, setActiveTab] = useState<"pyspark" | "sql" | "airflow">("pyspark");
  const [isRunning, setIsRunning] = useState(false);
  const [executed, setExecuted] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setExecuted(false);
    setTimeout(() => {
      setIsRunning(false);
      setExecuted(true);
    }, 900);
  };

  return (
    <div className="terminal-window h-[300px] sm:h-[310px] w-full min-w-0 flex flex-col justify-between overflow-hidden border border-violet-500/20 dark:border-white/10 shadow-2xl rounded-xl">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 bg-neutral-900/90 border-b border-white/10 select-none shrink-0 w-full min-w-0">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 overflow-hidden">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/80 shrink-0" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80 shrink-0" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80 shrink-0" />
          <span className="ml-1.5 sm:ml-2 text-[11px] sm:text-xs font-mono text-neutral-400 flex items-center gap-1.5 truncate min-w-0">
            <Terminal size={12} className="text-violet-400 shrink-0" />
            <span className="truncate">{codeSnippets[activeTab].title}</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 ml-1">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1 text-[10px] sm:text-[11px] font-mono px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-violet-600 hover:bg-violet-500 text-white transition-all duration-150 disabled:opacity-50"
          >
            <Play size={9} className={isRunning ? "animate-spin" : ""} />
            {isRunning ? "Running..." : "Run Test"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-neutral-950 border-b border-white/5 px-1.5 sm:px-2 pt-1 gap-1 shrink-0 w-full min-w-0">
        {(["pyspark", "sql", "airflow"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setExecuted(false); }}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-mono rounded-t transition-all ${
              activeTab === tab
                ? "bg-[#090d16] text-violet-300 border-t-2 border-violet-500 font-semibold"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Code Area — Clean scrollable viewport without forcing width expansion */}
      <div className="p-3 sm:p-4 text-[11px] sm:text-xs font-mono text-neutral-300 overflow-y-auto overflow-x-auto leading-relaxed flex-1 w-full min-w-0">
        <pre className="text-slate-300 whitespace-pre-wrap break-words">
          <code>{codeSnippets[activeTab].code}</code>
        </pre>
      </div>

      {/* Live Output Simulation Status Bar */}
      <div className={`px-3 sm:px-4 py-1.5 sm:py-2 border-t text-[10px] sm:text-[11px] font-mono flex items-center justify-between shrink-0 transition-colors w-full min-w-0 overflow-hidden ${
        executed
          ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-400"
          : "bg-neutral-950/60 border-white/5 text-neutral-500"
      }`}>
        <span className="flex items-center gap-1.5 truncate min-w-0 mr-1.5">
          <CheckCircle2 size={11} className={executed ? "text-emerald-400 shrink-0" : "text-neutral-600 shrink-0"} />
          <span className="truncate">
            {executed
              ? "Executed — 100k records in 1.4s (Zero Errors)"
              : "AWS Glue 4.0 · PySpark 3.3 · Redshift 2.1"}
          </span>
        </span>
        <span className={`shrink-0 ${executed ? "text-emerald-500/80 font-semibold" : "text-neutral-600"}`}>
          {executed ? "Status 200" : "Ready"}
        </span>
      </div>
    </div>
  );
}

/* ── ETL Pipeline Flow Visualizer — 100% Fit, Zero Scrollbar ── */
const pipelineStages = [
  { id: "src", label: "SOURCES", sub: "SAP / RDS", color: "text-blue-400", border: "border-blue-500/40", bg: "bg-blue-500/10" },
  { id: "ing", label: "INGEST",  sub: "DMS / CDC",  color: "text-cyan-400", border: "border-cyan-500/40", bg: "bg-cyan-500/10" },
  { id: "xfm", label: "COMPUTE", sub: "PySpark",   color: "text-violet-400", border: "border-violet-500/60", bg: "bg-violet-500/20" },
  { id: "ld",  label: "WAREHOUSE",sub: "Redshift", color: "text-pink-400", border: "border-pink-500/40", bg: "bg-pink-500/10" },
  { id: "bi",  label: "SERVE",   sub: "QuickSight",color: "text-emerald-400", border: "border-emerald-500/40", bg: "bg-emerald-500/10" },
];

function ETLPipeline() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveIdx((prev) => (prev + 1) % pipelineStages.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full min-w-0 select-none p-3 sm:p-4 rounded-xl border border-neutral-200/80 dark:border-white/[0.08] bg-white/60 dark:bg-slate-900/60 backdrop-blur-md">
      <div className="flex items-center justify-between mb-3 px-0.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="text-[9px] sm:text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-semibold truncate">
            LIVE DATA ARCHITECTURE · FLOW
          </span>
        </div>
        <span className="text-[9px] sm:text-[10px] font-mono text-violet-500 dark:text-violet-400 font-semibold shrink-0 ml-1">AWS + GCP</span>
      </div>

      {/* Stage Flow Row — Padded to prevent clipping active glows */}
      <div className="flex items-center justify-between w-full min-w-0 py-1.5 px-0.5">
        {pipelineStages.map((stage, i) => (
          <Fragment key={stage.id}>
            <div
              className={`flex flex-col items-center gap-0.5 rounded-lg border ${stage.border} ${stage.bg} px-1.5 sm:px-2.5 py-1.5 sm:py-2 transition-all duration-300 shrink-0 ${
                i === activeIdx
                  ? "ring-2 ring-violet-500/60 shadow-[0_0_14px_rgba(124,58,237,0.5)] opacity-100 bg-violet-500/25 border-violet-400"
                  : "opacity-65"
              }`}
            >
              <span className={`text-[8px] sm:text-[9px] font-mono font-bold ${stage.color}`}>{stage.label}</span>
              <span className="text-[7px] sm:text-[8px] text-neutral-500 dark:text-neutral-400 font-mono text-center">{stage.sub}</span>
            </div>

            {i < pipelineStages.length - 1 && (
              <div className="flex-1 mx-0.5 sm:mx-1.5 relative flex items-center min-w-[6px]">
                <div className="pipeline-line w-full" style={{ opacity: i <= activeIdx ? 1 : 0.25 }} />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

const socials = [
  { href: "https://github.com/Hritiksingh1611",             icon: Github,   label: "GitHub" },
  { href: "https://linkedin.com/in/hritik-singh-304450206", icon: Linkedin, label: "LinkedIn" },
  { href: "https://x.com/Hritik1611",                       icon: XIcon,    label: "X" },
  { href: "mailto:hritiksingh1611@gmail.com",               icon: Mail,     label: "Email" },
];

export default function Hero() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="home"
      className="relative min-h-screen bg-[#f8fafc] dark:bg-[#030712] flex flex-col justify-between overflow-hidden"
    >
      {/* Background Grids & Ambient Orbs */}
      <div className="cyber-grid absolute inset-0 -z-10 pointer-events-none" />
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="animate-blob orb orb-violet w-[550px] h-[550px] -top-32 -left-32 opacity-30 dark:opacity-60" />
        <div className="animate-blob2 orb orb-cyan w-[400px] h-[400px] top-1/2 -right-24 opacity-25 dark:opacity-50" />
      </div>

      {/* Nav Spacer */}
      <div className="h-20 shrink-0" />

      {/* Main Content Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8 flex-1 flex items-center">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 sm:gap-12 xl:gap-16 items-center w-full min-w-0">

          {/* ── LEFT: Profile & Bio ── */}
          <div className="flex flex-col min-w-0">

            {/* Profile Avatar Badge & Availability */}
            <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6 flex-wrap sm:flex-nowrap">
              {/* Professional Photo Avatar */}
              <div className="relative group shrink-0">
                <div className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-600 animate-spin-slow opacity-85 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-full overflow-hidden ring-2 ring-violet-500/50 ring-offset-2 ring-offset-[#f8fafc] dark:ring-offset-[#030712] shadow-xl">
                  {!imgError ? (
                    <Image
                      src={getAssetPath("/profile.jpg")}
                      alt="Hritik Singh"
                      width={80}
                      height={80}
                      className="object-cover object-top w-full h-full"
                      onError={() => setImgError(true)}
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-violet-700 to-indigo-700 flex items-center justify-center text-white font-black text-xl">
                      HS
                    </div>
                  )}
                </div>
              </div>

              {/* Status Tag */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-1 min-w-0"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300 w-fit shadow-sm max-w-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-wide uppercase truncate">
                    DATA ENGINEER · 3+ YRS EXP
                  </span>
                </div>
                <span className="text-[11px] sm:text-xs font-mono text-neutral-500 dark:text-neutral-400 truncate">
                  Workmates Core2Cloud · Kolkata, India 🇮🇳
                </span>
              </motion.div>
            </div>

            {/* Name Heading */}
            <div className="mb-4 min-w-0">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="font-display font-black text-neutral-900 dark:text-white leading-[0.92] tracking-tight text-4xl sm:text-6xl lg:text-7xl"
              >
                Hritik Singh.
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="font-display font-extrabold hero-name-gradient tracking-tight text-3xl sm:text-5xl lg:text-6xl mt-2"
              >
                Data Engineer.
              </motion.div>
            </div>

            {/* Role Switcher */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="flex items-center gap-2 text-xs sm:text-sm mb-5 min-w-0"
            >
              <span className="font-mono text-neutral-500 dark:text-neutral-400 shrink-0">Specialization:</span>
              <TypewriterRole />
            </motion.div>

            {/* Brief Bio */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="text-neutral-600 dark:text-neutral-300 text-xs sm:text-base leading-relaxed mb-6 max-w-xl"
            >
              Data Engineer with <span className="font-semibold text-neutral-900 dark:text-white">3+ years of experience</span> designing scalable <span className="text-violet-600 dark:text-violet-400 font-medium">ETL/ELT pipelines</span>, CDC workflows, and cloud data platforms across <span className="text-violet-600 dark:text-violet-400 font-medium">AWS &amp; GCP</span>. Specialized in AWS Glue, PySpark, Redshift, SAP OData integration, and real-time CDC.
            </motion.p>

            {/* Impact Metrics Row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="grid grid-cols-4 gap-2 sm:gap-3 py-3.5 sm:py-4 my-2 border-y border-neutral-200 dark:border-white/10 max-w-lg"
            >
              {[
                { num: "3+", label: "Years Exp." },
                { num: "15+", label: "Pipelines" },
                { num: "6+", label: "Certs" },
                { num: "40%", label: "Faster ETL" },
              ].map(({ num, label }) => (
                <div key={label} className="text-center">
                  <div className="font-display font-black text-lg sm:text-2xl text-neutral-900 dark:text-white leading-none">{num}</div>
                  <div className="text-[9px] sm:text-[10px] text-neutral-500 dark:text-neutral-400 mt-1 font-mono uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </motion.div>

            {/* Call to Actions & Resume Download */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex flex-wrap items-center gap-3 my-5 sm:my-6"
            >
              <a
                href="#contact"
                className="btn-primary inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm"
              >
                Let&apos;s Connect <ArrowUpRight size={15} />
              </a>

              {/* Direct Resume Download Button */}
              <a
                href={getAssetPath("/resume.pdf")}
                download="Hritik_Singh_Data_Engineer_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm border-violet-500/30 hover:bg-violet-500/10 text-violet-600 dark:text-violet-300"
              >
                <Download size={14} /> Download Resume
              </a>
            </motion.div>

            {/* Social Channels */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="flex items-center gap-3"
            >
              <span className="text-[11px] sm:text-xs font-mono text-neutral-400 uppercase tracking-wider">Socials —</span>
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 sm:p-2.5 rounded-xl border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-400 hover:text-violet-600 dark:hover:text-white hover:border-violet-500/40 hover:bg-violet-500/10 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </motion.div>

          </div>

          {/* ── RIGHT: Interactive Code & Pipeline Widget ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="flex flex-col gap-4 sm:gap-5 w-full min-w-0 overflow-hidden"
          >
            {/* Live Interactive Code Terminal */}
            <CodeTerminalWidget />

            {/* Animated ETL Architecture Widget */}
            <ETLPipeline />
          </motion.div>

        </div>
      </div>

      {/* Bottom Spacer */}
      <div className="h-6" />
    </section>
  );
}
