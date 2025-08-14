"use client";

import { motion } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail, Download } from "lucide-react";
import { useState, useEffect } from "react";

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const roles = [
    "Data Engineer",
    "ETL Developer", 
    "Data Analyst",
    "Python Developer",
    "Backend Developer"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Professional Background Elements */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neutral-400/20 rounded-full"
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-20 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-gradient block">Hritik</span>
            <span className="text-neutral-900 dark:text-neutral-100 block">Singh</span>
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-8 max-w-3xl mx-auto"
        >
          <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 mb-6">
            I&apos;m a{" "}
            <motion.span
              key={currentRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="accent-gradient font-semibold"
            >
              {roles[currentRole]}
            </motion.span>
          </p>
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Passionate Data Engineer with 2+ years of experience specializing in ETL pipelines, 
            data warehousing, and cloud technologies. Expert in Python, SQL, and modern data stack.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-wrap gap-3 justify-center mb-12 max-w-3xl mx-auto"
        >
          {["Python", "SQL", "Azure", "Snowflake", "DBT", "Airflow"].map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
              className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full text-sm font-medium border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-300"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-wrap gap-4 justify-center mb-16"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-accent px-8 py-3 rounded-full font-semibold transition-all duration-300"
          >
            Get In Touch
          </motion.a>
          
          <motion.a
            href="/resume.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-transparent border-2 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-300 flex items-center gap-2"
          >
            <Download size={18} />
            Resume
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex gap-6 justify-center mb-16"
        >
          {[
            { icon: Github, href: "https://github.com/Hritiksingh1611", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com/in/hritik-singh1611", label: "LinkedIn" },
            { icon: Mail, href: "mailto:hritiksingh1611@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-300 group"
              aria-label={label}
            >
              <Icon size={20} className="text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors duration-300" />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-pointer"
            onClick={() => {
              const aboutSection = document.getElementById('about');
              if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
              }
            }}
          >
            <ChevronDown size={24} className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors duration-300" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
