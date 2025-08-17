"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { Code, Database, Cloud, Settings, BarChart3 } from "lucide-react";

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [activeCategory, setActiveCategory] = useState("programming");

  const skillCategories = {
    programming: {
      title: "Programming Languages",
      icon: Code,
      skills: [
        { name: "Python", level: 95, description: "Primary language for data engineering and automation" },
        { name: "SQL", level: 92, description: "Advanced database queries and optimization" },
        { name: "JavaScript", level: 80, description: "Frontend development and automation" },
        { name: "C++", level: 75, description: "System programming and algorithms" },
        { name: "R", level: 70, description: "Statistical analysis and data science" },
        { name: "Shell Scripting", level: 85, description: "Linux automation and deployment" }
      ]
    },
    data: {
      title: "Data Engineering",
      icon: Database,
      skills: [
        { name: "Snowflake", level: 90, description: "Cloud data warehouse and analytics" },
        { name: "Azure Data Factory", level: 88, description: "ETL/ELT pipeline orchestration" },
        { name: "DBT", level: 85, description: "Data transformation and modeling" },
        { name: "Apache Airflow", level: 82, description: "Workflow management and scheduling" },
        { name: "SSIS", level: 80, description: "SQL Server Integration Services" },
        { name: "Power BI", level: 88, description: "Business intelligence and visualization" }
      ]
    },
    database: {
      title: "Databases",
      icon: Database,
      skills: [
        { name: "PostgreSQL", level: 90, description: "Advanced relational database management" },
        { name: "MySQL", level: 88, description: "Database design and optimization" },
        { name: "SQL Server", level: 85, description: "Enterprise database solutions" },
        { name: "MongoDB", level: 75, description: "NoSQL document database" },
        { name: "Oracle", level: 70, description: "Enterprise database systems" },
        { name: "Redis", level: 72, description: "In-memory data structure store" }
      ]
    },
    cloud: {
      title: "Cloud & DevOps",
      icon: Cloud,
      skills: [
        { name: "Microsoft Azure", level: 88, description: "Cloud services and data solutions" },
        { name: "Azure Synapse", level: 85, description: "Analytics service and data integration" },
        { name: "Azure Blob Storage", level: 82, description: "Cloud object storage solutions" },
        { name: "Docker", level: 80, description: "Containerization and deployment" },
        { name: "Git/GitHub", level: 90, description: "Version control and collaboration" },
        { name: "Azure DevOps", level: 78, description: "CI/CD and project management" }
      ]
    },
    frameworks: {
      title: "Frameworks & Libraries",
      icon: Settings,
      skills: [
        { name: "Pandas", level: 92, description: "Data manipulation and analysis" },
        { name: "NumPy", level: 88, description: "Numerical computing and arrays" },
        { name: "Matplotlib/Seaborn", level: 85, description: "Data visualization libraries" },
        { name: "FastAPI", level: 82, description: "Modern API development framework" },
        { name: "Streamlit", level: 80, description: "Data apps and dashboards" },
        { name: "Apache Spark", level: 75, description: "Big data processing framework" }
      ]
    },
    analytics: {
      title: "Analytics & Tools",
      icon: BarChart3,
      skills: [
        { name: "ETL Development", level: 95, description: "Extract, Transform, Load processes" },
        { name: "Data Warehousing", level: 90, description: "Data modeling and architecture" },
        { name: "Statistical Analysis", level: 85, description: "Data insights and reporting" },
        { name: "Data Validation", level: 88, description: "Quality assurance and testing" },
        { name: "Performance Optimization", level: 82, description: "Query and pipeline tuning" },
        { name: "Documentation", level: 90, description: "Technical writing and process docs" }
      ]
    }
  };

  return (
    <section id="skills" className="py-20 px-4 pt-24 relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-slate-900 transition-all duration-500" ref={ref}>
      {/* Network Grid Background */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1000 800" fill="none" style={{ pointerEvents: 'none' }}>
          {/* Grid Pattern */}
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1" className="text-blue-500 dark:text-blue-400" opacity="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Technology Nodes */}
          <g>
            <circle cx="200" cy="150" r="8" fill="currentColor" className="text-blue-600 dark:text-blue-400" opacity="0.6">
              <animate attributeName="r" values="8;12;8" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="400" cy="200" r="8" fill="currentColor" className="text-purple-600 dark:text-purple-400" opacity="0.6">
              <animate attributeName="r" values="8;12;8" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="600" cy="300" r="8" fill="currentColor" className="text-green-600 dark:text-green-400" opacity="0.6">
              <animate attributeName="r" values="8;12;8" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="800" cy="250" r="8" fill="currentColor" className="text-orange-600 dark:text-orange-400" opacity="0.6">
              <animate attributeName="r" values="8;12;8" dur="4.5s" repeatCount="indefinite" />
            </circle>
          </g>
          
          {/* Skill Connection Lines */}
          <g stroke="currentColor" strokeWidth="2" className="text-neutral-400 dark:text-neutral-600" opacity="0.3">
            <line x1="200" y1="150" x2="400" y2="200">
              <animate attributeName="stroke-dasharray" values="0,200;200,0;0,200" dur="8s" repeatCount="indefinite" />
            </line>
            <line x1="400" y1="200" x2="600" y2="300">
              <animate attributeName="stroke-dasharray" values="0,200;200,0;0,200" dur="6s" repeatCount="indefinite" />
            </line>
            <line x1="600" y1="300" x2="800" y2="250">
              <animate attributeName="stroke-dasharray" values="0,200;200,0;0,200" dur="7s" repeatCount="indefinite" />
            </line>
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
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Skills</span> & Expertise
          </h2>
          <p className="text-xl text-slate-600 dark:text-neutral-300 max-w-3xl mx-auto">
            A comprehensive toolkit for building modern data solutions
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12 relative z-10"
        >
          {Object.entries(skillCategories).map(([key, category]) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  console.log('Skills category clicked:', key);
                  setActiveCategory(key);
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer pointer-events-auto ${
                  activeCategory === key
                    ? "btn-accent text-white shadow-lg"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
              >
                <Icon size={18} />
                <span className="hidden sm:inline">{category.title}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {skillCategories[activeCategory as keyof typeof skillCategories].skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-effect p-6 rounded-xl hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-300">
                  {skill.name}
                </h3>
                <span className="text-sm text-slate-600 dark:text-neutral-400">{skill.level}%</span>
              </div>
              
              <div className="mb-3">
                <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                  />
                </div>
              </div>
              
              <p className="text-slate-600 dark:text-neutral-400 text-sm">{skill.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="glass-effect p-8 rounded-2xl border border-white/10 dark:border-neutral-700/50 max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              Always Learning, Always Growing
            </h3>
            <p className="text-slate-600 dark:text-neutral-300 text-lg leading-relaxed">
              Technology evolves rapidly, and so do I. I&apos;m constantly exploring new tools, 
              frameworks, and methodologies to stay at the forefront of data engineering and AI. 
              Currently diving deep into Large Language Models, Edge Computing, and Advanced MLOps practices.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
