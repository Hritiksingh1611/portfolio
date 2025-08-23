"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code, Database, Brain, Cloud } from "lucide-react";

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const stats = [
    { number: "2+", label: "Years Experience", icon: Code },
    { number: "15+", label: "Projects Completed", icon: Database },
    { number: "5+", label: "ETL Pipelines Built", icon: Brain },
    { number: "3+", label: "Cloud Platforms", icon: Cloud },
  ];

  return (
    <section id="about" className="py-20 px-4 pt-24 relative overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-slate-900 transition-all duration-500" ref={ref}>
      {/* Database Schema Background */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <svg className="w-full h-full" viewBox="0 0 800 600" fill="none">
          {/* Schema Tables */}
          <g>
            <rect x="50" y="50" width="120" height="80" rx="8" fill="currentColor" className="text-blue-600 dark:text-blue-400" opacity="0.3">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite" />
            </rect>
            <rect x="250" y="100" width="120" height="80" rx="8" fill="currentColor" className="text-purple-600 dark:text-purple-400" opacity="0.3">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="5s" repeatCount="indefinite" />
            </rect>
            <rect x="450" y="80" width="120" height="80" rx="8" fill="currentColor" className="text-green-600 dark:text-green-400" opacity="0.3">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3.5s" repeatCount="indefinite" />
            </rect>
            <rect x="650" y="120" width="120" height="80" rx="8" fill="currentColor" className="text-orange-600 dark:text-orange-400" opacity="0.3">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="4.5s" repeatCount="indefinite" />
            </rect>
          </g>
          
          {/* Connection Lines */}
          <g stroke="currentColor" strokeWidth="2" className="text-neutral-400 dark:text-neutral-600" opacity="0.4">
            <line x1="170" y1="90" x2="250" y2="140">
              <animate attributeName="stroke-dasharray" values="0,100;100,0;0,100" dur="6s" repeatCount="indefinite" />
            </line>
            <line x1="370" y1="140" x2="450" y2="120">
              <animate attributeName="stroke-dasharray" values="0,100;100,0;0,100" dur="5s" repeatCount="indefinite" />
            </line>
            <line x1="570" y1="120" x2="650" y2="160">
              <animate attributeName="stroke-dasharray" values="0,100;100,0;0,100" dur="7s" repeatCount="indefinite" />
            </line>
          </g>

          {/* Data Flow Particles */}
          <g>
            <circle r="3" fill="currentColor" className="text-blue-500 dark:text-blue-400" opacity="0.7">
              <animateMotion dur="8s" repeatCount="indefinite" path="M50,90 Q200,50 370,140 T650,160" />
            </circle>
            <circle r="2" fill="currentColor" className="text-purple-500 dark:text-purple-400" opacity="0.6">
              <animateMotion dur="10s" repeatCount="indefinite" path="M170,90 Q300,200 570,120" />
            </circle>
            <circle r="2.5" fill="currentColor" className="text-green-500 dark:text-green-400" opacity="0.8">
              <animateMotion dur="12s" repeatCount="indefinite" path="M250,140 Q400,80 650,160" />
            </circle>
          </g>
        </svg>
      </div>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">About</span> Me
          </h2>
          <p className="text-xl text-slate-800 dark:text-neutral-300 max-w-3xl mx-auto">
            Transforming raw data into actionable insights and intelligent solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              Hi there! I&apos;m Hritik Singh 👋
            </h3>
            <p className="text-slate-700 dark:text-neutral-300 text-lg leading-relaxed">
              I&apos;m a passionate Data Engineer with 2+ years of experience in designing and implementing 
              scalable ETL pipelines and data solutions. Currently working at Workmates Core2cloud Solutions Limited, 
              I specialize in modern data stack technologies and cloud-based data warehousing.
            </p>
            <p className="text-slate-700 dark:text-neutral-300 text-lg leading-relaxed">
              My expertise includes building efficient data pipelines using Python, SQL, and modern tools like 
              AWS Glue, Snowflake, and Azure Data Factory. I have hands-on experience with AWS and Azure cloud services 
              and have successfully delivered multiple data engineering projects for enterprise clients.
            </p>
            <p className="text-slate-700 dark:text-neutral-300 text-lg leading-relaxed">
              I hold a Master&apos;s degree in Computer Application (MCA) from Techno India University with 8.64 CGPA 
              and continuously expand my skills in emerging data technologies and best practices.
            </p>
            
            <div className="flex flex-wrap gap-3 mt-6">
              {["ETL Development", "Data Warehousing", "Cloud Computing", "Database Management"].map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-700"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-white dark:bg-neutral-800 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm">
              <h4 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-6">Quick Facts</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-800 dark:text-neutral-400">Location</span>
                  <span className="text-neutral-800 dark:text-neutral-200 font-medium">Kolkata, India 🇮🇳</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-800 dark:text-neutral-400">Experience</span>
                  <span className="text-neutral-800 dark:text-neutral-200 font-medium">2+ Years</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-800 dark:text-neutral-400">Current Role</span>
                  <span className="text-neutral-800 dark:text-neutral-200 font-medium">Associate Data Engineer</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-800 dark:text-neutral-400">Education</span>
                  <span className="text-neutral-800 dark:text-neutral-200 font-medium">MCA (8.64 CGPA)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-800 dark:text-neutral-400">Availability</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">Open to Opportunities</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map(({ number, label, icon: Icon }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              className="text-center p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:shadow-md dark:hover:bg-neutral-700 transition-all duration-300 group"
            >
              <Icon size={32} className="mx-auto mb-3 text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-300" />
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">{number}</div>
              <div className="text-slate-800 dark:text-neutral-400 text-sm">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
