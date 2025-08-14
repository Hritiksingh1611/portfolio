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
    <section id="about" className="py-20 px-4 pt-24 bg-neutral-50 dark:bg-neutral-900/50" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">About</span> Me
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
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
            <h3 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
              Hi there! I&apos;m Hritik Singh 👋
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed">
              I&apos;m a passionate Data Engineer with 2+ years of experience in designing and implementing 
              scalable ETL pipelines and data solutions. Currently working at Tata Consultancy Services, 
              I specialize in modern data stack technologies and cloud-based data warehousing.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed">
              My expertise includes building efficient data pipelines using Python, SQL, and modern tools like 
              DBT, Airflow, and Snowflake. I have hands-on experience with Azure cloud services and have 
              successfully delivered multiple data engineering projects for enterprise clients.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed">
              I hold a Bachelor&apos;s degree in Computer Science Engineering from Galgotias University and 
              continuously expand my skills in emerging data technologies and best practices.
            </p>
            
            <div className="flex flex-wrap gap-3 mt-6">
              {["ETL Development", "Data Warehousing", "Cloud Computing", "Database Management"].map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className="px-3 py-1 text-sm bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full border border-primary-200 dark:border-primary-700"
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
                  <span className="text-neutral-600 dark:text-neutral-400">Location</span>
                  <span className="text-neutral-800 dark:text-neutral-200 font-medium">New Delhi, India 🇮🇳</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600 dark:text-neutral-400">Experience</span>
                  <span className="text-neutral-800 dark:text-neutral-200 font-medium">2+ Years</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600 dark:text-neutral-400">Current Role</span>
                  <span className="text-neutral-800 dark:text-neutral-200 font-medium">Data Engineer at TCS</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600 dark:text-neutral-400">Education</span>
                  <span className="text-neutral-800 dark:text-neutral-200 font-medium">B.Tech CSE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600 dark:text-neutral-400">Availability</span>
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
              <div className="text-neutral-600 dark:text-neutral-400 text-sm">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
