"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { ExternalLink, Github, Play, Code2, Database, Brain, Smartphone, BarChart3 } from "lucide-react";

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeFilter, setActiveFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "Enterprise ETL Pipeline System",
      description: "Built comprehensive ETL pipelines using Azure Data Factory and Snowflake for enterprise data processing. Automated data ingestion from multiple sources with robust error handling and monitoring.",
      image: "/api/placeholder/600/400",
      tags: ["Azure Data Factory", "Snowflake", "Python", "SQL", "DBT"],
      category: "data",
      status: "Production",
      github: "https://github.com/Hritiksingh1611/etl-pipeline",
      demo: "#",
      highlights: [
        "Processes 100GB+ of data daily",
        "95% reduction in manual data processing",
        "Automated data quality validation"
      ]
    },
    {
      id: 2,
      title: "Power BI Dashboard Suite",
      description: "Developed interactive business intelligence dashboards using Power BI for data visualization and analytics. Created automated reports for stakeholder decision-making.",
      image: "/api/placeholder/600/400", 
      tags: ["Power BI", "SQL", "Azure", "DAX", "Data Modeling"],
      category: "analytics",
      status: "Production",
      github: "https://github.com/Hritiksingh1611/powerbi-dashboards",
      demo: "#",
      highlights: [
        "Real-time data visualization",
        "Automated reporting for 50+ stakeholders",
        "Interactive drill-down capabilities"
      ]
    },
    {
      id: 3,
      title: "Data Warehouse Architecture",
      description: "Designed and implemented modern data warehouse solutions using Snowflake and Azure Synapse. Built scalable architecture for enterprise data storage and analytics.",
      image: "/api/placeholder/600/400",
      tags: ["Snowflake", "Azure Synapse", "SQL", "Data Modeling", "ETL"],
      category: "data", 
      status: "Production",
      github: "https://github.com/Hritiksingh1611/data-warehouse",
      demo: "#",
      highlights: [
        "Scalable data warehouse design",
        "Optimized query performance by 60%",
        "Cost-effective cloud storage solution"
      ]
    },
    {
      id: 4,
      title: "Automated Data Quality Framework",
      description: "Created comprehensive data quality framework with automated validation rules, anomaly detection, and alerting systems using Python and SQL.",
      image: "/api/placeholder/600/400",
      tags: ["Python", "SQL", "Data Validation", "Automation", "Monitoring"],
      category: "data",
      status: "Production", 
      github: "https://github.com/Hritiksingh1611/data-quality",
      demo: "#",
      highlights: [
        "Automated data quality checks",
        "Real-time anomaly detection",
        "Reduced data errors by 85%"
      ]
    },
    {
      id: 5,
      title: "Portfolio Website",
      description: "Modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features dark/light mode, smooth animations, and optimized performance.",
      image: "/api/placeholder/600/400",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Framer Motion"],
      category: "web",
      status: "Live",
      github: "https://github.com/Hritiksingh1611/portfolio",
      demo: "https://hritiksingh-portfolio.vercel.app",
      highlights: [
        "Modern responsive design",
        "Dark/Light theme support", 
        "Optimized performance"
      ]
    },
    {
      id: 6,
      title: "Database Management Scripts",
      description: "Collection of SQL scripts and Python utilities for database administration, maintenance, and optimization across multiple database platforms.",
      image: "/api/placeholder/600/400",
      tags: ["SQL", "Python", "PostgreSQL", "MySQL", "Database Admin"],
      category: "data",
      status: "Ongoing",
      github: "https://github.com/Hritiksingh1611/database-scripts", 
      demo: "#",
      highlights: [
        "Automated database maintenance",
        "Performance optimization scripts",
        "Cross-platform compatibility"
      ]
    }
  ];

  const filters = [
    { key: "all", label: "All Projects", icon: Code2 },
    { key: "analytics", label: "Analytics", icon: BarChart3 },
    { key: "data", label: "Data Engineering", icon: Database },
    { key: "web", label: "Web Development", icon: ExternalLink },
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 px-4 pt-24 relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-slate-900 transition-all duration-500" ref={ref}>
      {/* Code Repository Background */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1000 800" fill="none" style={{ pointerEvents: 'none' }}>
          {/* Code Blocks */}
          <g>
            <rect x="100" y="100" width="200" height="120" rx="12" fill="currentColor" className="text-blue-600 dark:text-blue-400" opacity="0.3">
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="5s" repeatCount="indefinite" />
            </rect>
            <rect x="350" y="180" width="150" height="100" rx="12" fill="currentColor" className="text-green-600 dark:text-green-400" opacity="0.3">
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" />
            </rect>
            <rect x="550" y="120" width="180" height="140" rx="12" fill="currentColor" className="text-purple-600 dark:text-purple-400" opacity="0.3">
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="6s" repeatCount="indefinite" />
            </rect>
            <rect x="780" y="160" width="160" height="110" rx="12" fill="currentColor" className="text-orange-600 dark:text-orange-400" opacity="0.3">
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4.5s" repeatCount="indefinite" />
            </rect>
          </g>
          
          {/* Git Branches */}
          <g stroke="currentColor" strokeWidth="2" className="text-neutral-400 dark:text-neutral-600" opacity="0.4">
            <path d="M200,220 Q300,250 350,230">
              <animate attributeName="stroke-dasharray" values="0,150;150,0;0,150" dur="8s" repeatCount="indefinite" />
            </path>
            <path d="M500,230 Q550,200 550,180">
              <animate attributeName="stroke-dasharray" values="0,100;100,0;0,100" dur="6s" repeatCount="indefinite" />
            </path>
            <path d="M730,190 Q780,180 780,190">
              <animate attributeName="stroke-dasharray" values="0,80;80,0;0,80" dur="7s" repeatCount="indefinite" />
            </path>
          </g>
          
          {/* Commit Dots */}
          <g>
            <circle cx="200" cy="220" r="6" fill="currentColor" className="text-blue-500 dark:text-blue-400">
              <animate attributeName="r" values="6;10;6" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="425" cy="230" r="6" fill="currentColor" className="text-green-500 dark:text-green-400">
              <animate attributeName="r" values="6;10;6" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="640" cy="190" r="6" fill="currentColor" className="text-purple-500 dark:text-purple-400">
              <animate attributeName="r" values="6;10;6" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="860" cy="215" r="6" fill="currentColor" className="text-orange-500 dark:text-orange-400">
              <animate attributeName="r" values="6;10;6" dur="4.5s" repeatCount="indefinite" />
            </circle>
          </g>
          
          {/* Code Lines */}
          <g stroke="currentColor" strokeWidth="1" className="text-neutral-300 dark:text-neutral-700" opacity="0.6">
            <line x1="120" y1="130" x2="280" y2="130" />
            <line x1="120" y1="145" x2="250" y2="145" />
            <line x1="120" y1="160" x2="270" y2="160" />
            <line x1="370" y1="200" x2="480" y2="200" />
            <line x1="370" y1="215" x2="450" y2="215" />
            <line x1="570" y1="140" x2="710" y2="140" />
            <line x1="570" y1="155" x2="680" y2="155" />
            <line x1="570" y1="170" x2="720" y2="170" />
          </g>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Featured</span> Projects
          </h2>
          <p className="text-xl text-slate-600 dark:text-neutral-300 max-w-3xl mx-auto">
            From data engineering solutions to web applications - here&apos;s what I&apos;ve been building
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12 relative z-10"
        >
          {filters.map(({ key, label, icon: Icon }) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                console.log('Filter clicked:', key);
                setActiveFilter(key);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer pointer-events-auto ${
                activeFilter === key
                  ? "btn-accent text-white shadow-lg"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
            >
              <Icon size={18} />
              {label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid lg:grid-cols-2 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-effect rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-600/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-20">
                    {project.category === "ai" && <Brain />}
                    {project.category === "data" && <Database />}
                    {project.category === "web" && <Code2 />}
                    {project.category === "iot" && <Smartphone />}
                  </div>
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    project.status === "Production" 
                      ? "bg-green-500/20 text-green-300 border border-green-500/30"
                      : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Key Achievements:</h4>
                  <ul className="space-y-1">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 text-white rounded-lg hover:bg-gray-600/50 transition-all duration-300"
                  >
                    <Github size={16} />
                    Code
                  </motion.a>
                  
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  >
                    <Play size={16} />
                    Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="glass-effect p-8 rounded-2xl border border-white/10 max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Interested in Collaborating?
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              I&apos;m always excited to work on innovative projects that push the boundaries of 
              data engineering and AI. Let&apos;s build something amazing together!
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              Let&apos;s Connect
              <ExternalLink size={18} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
