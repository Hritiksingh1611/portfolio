"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Github, Linkedin, Mail, Download, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { getAssetPath } from "@/lib/assets";

// Custom X (Twitter) Icon Component
const XIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  
  const profileImagePath = getAssetPath('/profile.png');
  
  // Preload the image for faster loading (use browser Image constructor; avoid conflict with next/image import)
  useEffect(() => {
    const img = typeof window !== 'undefined' ? new window.Image() : null;
    if (img) {
      img.onload = () => setImgLoaded(true);
      img.onerror = () => setImgError(true);
      img.src = profileImagePath;
    }
  }, [profileImagePath]);
  const roles = [
    "Data Engineer",
    "ETL Developer", 
    "Data Analyst",
    "Python Developer",
    "Backend Developer",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative z-10 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-slate-900 transition-all duration-500"
    >
      {/* Simplified background for better performance - reduced on mobile */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {/* Static background pattern - hidden on mobile */}
        <div className="hidden md:block absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-10 left-10 text-xs font-mono text-blue-500">
            01100100 01100001 01110100 01100001
          </div>
          <div className="absolute top-20 right-20 text-xs font-mono text-purple-500">
            01101110 01100101 01100101 01110010
          </div>
          <div className="absolute bottom-20 left-20 text-xs font-mono text-green-500">
            01110000 01101001 01110000 01100101
          </div>
        </div>
      </div>
      
  <div className="container mx-auto px-6 py-20 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_minmax(0,1fr)] gap-8 lg:gap-10 items-center max-w-5xl mx-auto">
          
          {/* Left Column: Profile Image & Social */}
          <motion.div 
            initial={{ opacity: 0, x: -18 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center lg:items-start space-y-5 w-full max-w-sm mx-auto"
          >
            {/* Profile Image */}
            <div className="relative group">
              {/* Gradient border - simplified on mobile */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 rounded-full opacity-30 md:group-hover:opacity-50 transition duration-300 md:blur-sm" />
              <div className="relative w-60 h-60 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[21rem] lg:h-[21rem] rounded-full overflow-hidden bg-white dark:bg-slate-900 border-2 md:border-4 border-white/50 dark:border-slate-700/50 shadow-xl md:shadow-2xl md:backdrop-blur-sm select-none">
                {!imgError && imgLoaded ? (
                    <Image
                      src={profileImagePath}
                      alt="Hritik Singh - Data Engineer"
                      fill
                      priority
                      sizes="(max-width: 768px) 16rem, (max-width: 1024px) 20rem, 21rem"
                      className="object-cover select-none pointer-events-none"
                      draggable={false}
                      style={{ objectFit: 'cover' }}
                      unoptimized
                    />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 text-white select-none">
                    <span className="text-5xl sm:text-6xl md:text-6xl font-bold">HS</span>
                  </div>
                )}
              </div>
              
              {/* Enhanced status indicator - simplified on mobile */}
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 md:border-4 border-white dark:border-slate-900 shadow-lg">
                <div className="absolute inset-1 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 md:w-2 md:h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <motion.a
                aria-label="GitHub profile"
                href="https://github.com/Hritiksingh1611"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-xl shadow-lg transition-all duration-300 group"
              >
                <Github size={24} className="text-neutral-100 dark:text-neutral-900 group-hover:text-white dark:group-hover:text-black" />
              </motion.a>
              
              <motion.a
                aria-label="LinkedIn profile"
                href="https://linkedin.com/in/hritik-singh-304450206"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-xl shadow-lg transition-all duration-300 group"
              >
                <Linkedin size={24} className="text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300" />
              </motion.a>
              
              <motion.a
                aria-label="Twitter (X) profile"
                href="https://x.com/Hritik1611"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-sky-50 dark:bg-sky-950/50 hover:bg-sky-100 dark:hover:bg-sky-900/50 rounded-xl shadow-lg transition-all duration-300 group"
              >
                <XIcon size={24} className="text-sky-600 dark:text-sky-400 group-hover:text-sky-700 dark:group-hover:text-sky-300" />
              </motion.a>
              
              <motion.a
                aria-label="Send email"
                href="mailto:hritik16.work@gmail.com"
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-red-50 dark:bg-red-950/50 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-xl shadow-lg transition-all duration-300 group"
              >
                <Mail size={24} className="text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300" />
              </motion.a>
            </div>

            {/* Quick Info */}
            <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-800 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Kolkata, West Bengal, India</span>
              </div>
              {/* <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Available for hire</span>
              </div> */}
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 18 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.55 }}
            className="space-y-6 flex flex-col justify-center h-full text-center lg:text-left items-center lg:items-start lg:pl-2"
          >
            {/* Main heading */}
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight whitespace-nowrap">
                  Hritik <span className="hero-name-gradient">Singh</span>
                </h1>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-lg md:text-xl text-slate-700 dark:text-neutral-300 font-medium"
              >
                I&apos;m a{" "}
                <span className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {roles[currentRole]}
                </span>
              </motion.p>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="text-base md:text-lg text-slate-600 dark:text-neutral-300 leading-relaxed max-w-lg"
            >
              Passionate about building scalable data pipelines, implementing ML solutions, and transforming raw data into actionable insights. I specialize in modern data engineering practices with Python, cloud platforms, and distributed systems.
            </motion.p>

            {/* Tech stack pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-wrap gap-2.5"
            >
              {["SQL", "PySpark", "ETL/ELT", "Datawarehouse", "Datalake", "Data Visualization"].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + i * 0.1, duration: 0.4 }}
                  className="px-3.5 py-1.5 bg-slate-100/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 rounded-full text-xs md:text-sm font-medium hover:bg-slate-200/70 dark:hover:bg-slate-700/70 transition-colors cursor-default backdrop-blur-sm border border-slate-200/40 dark:border-slate-700/40"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <motion.a
                href="#contact"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-9 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-semibold shadow-md shadow-blue-500/25 transition-all duration-300 text-center backdrop-blur-sm text-sm md:text-base"
              >
                Let&apos;s Connect
              </motion.a>
              
              <motion.a
                href={getAssetPath('/resume.pdf')}
                download="Hritik_Singh_Resume.pdf"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-9 py-4 bg-white/80 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/70 hover:border-slate-300/70 dark:hover:border-slate-600/70 text-slate-700 dark:text-slate-300 rounded-lg font-semibold shadow-md transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm text-sm md:text-base"
              >
                <Download size={20} />
                Download Resume
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={() => {
              const about = document.getElementById('about');
              if (about) about.scrollIntoView({ behavior: 'smooth' });
            }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="p-3 bg-white/20 dark:bg-slate-800/50 backdrop-blur-sm rounded-full hover:bg-white/30 dark:hover:bg-slate-700/50 transition-all duration-300 border border-white/20 dark:border-slate-700/50"
          >
            <ChevronDown size={24} className="text-slate-800 dark:text-slate-400" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
