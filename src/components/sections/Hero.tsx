"use client";

import { motion } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail, Download, MapPin, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { getAssetPath } from "@/lib/assets";

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  
  const profileImagePath = getAssetPath('/profile.jpg');
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
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-slate-900 transition-all duration-500"
    >
      {/* Database/Data themed background */}
      <div className="absolute inset-0">
        {/* Database nodes pattern */}
        <div className="absolute inset-0">
          {/* Main data flow lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10 dark:opacity-20" viewBox="0 0 1000 600">
            {/* Horizontal data flow lines */}
            <line x1="0" y1="150" x2="1000" y2="150" stroke="url(#gradient1)" strokeWidth="2" strokeDasharray="5,5">
              <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite"/>
            </line>
            <line x1="0" y1="300" x2="1000" y2="300" stroke="url(#gradient2)" strokeWidth="2" strokeDasharray="8,4">
              <animate attributeName="stroke-dashoffset" values="0;12" dur="3s" repeatCount="indefinite"/>
            </line>
            <line x1="0" y1="450" x2="1000" y2="450" stroke="url(#gradient3)" strokeWidth="2" strokeDasharray="6,6">
              <animate attributeName="stroke-dashoffset" values="0;12" dur="2.5s" repeatCount="indefinite"/>
            </line>
            
            {/* Vertical connections */}
            <line x1="200" y1="0" x2="200" y2="600" stroke="url(#gradient1)" strokeWidth="1" strokeDasharray="3,3" opacity="0.5"/>
            <line x1="500" y1="0" x2="500" y2="600" stroke="url(#gradient2)" strokeWidth="1" strokeDasharray="3,3" opacity="0.5"/>
            <line x1="800" y1="0" x2="800" y2="600" stroke="url(#gradient3)" strokeWidth="1" strokeDasharray="3,3" opacity="0.5"/>
            
            {/* Database nodes */}
            <circle cx="200" cy="150" r="8" fill="rgba(59,130,246,0.6)">
              <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="500" cy="300" r="10" fill="rgba(168,85,247,0.6)">
              <animate attributeName="r" values="10;14;10" dur="2.5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="800" cy="450" r="6" fill="rgba(34,197,94,0.6)">
              <animate attributeName="r" values="6;10;6" dur="1.8s" repeatCount="indefinite"/>
            </circle>
            
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(59,130,246,0.8)"/>
                <stop offset="100%" stopColor="rgba(59,130,246,0.2)"/>
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(168,85,247,0.8)"/>
                <stop offset="100%" stopColor="rgba(168,85,247,0.2)"/>
              </linearGradient>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(34,197,94,0.8)"/>
                <stop offset="100%" stopColor="rgba(34,197,94,0.2)"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Binary code rain effect */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-10 left-10 text-xs font-mono text-blue-500 animate-pulse">
            01100100 01100001 01110100 01100001<br/>
            01100101 01101110 01100111 01101001
          </div>
          <div className="absolute top-20 right-20 text-xs font-mono text-purple-500 animate-pulse delay-1000">
            01101110 01100101 01100101 01110010<br/>
            01110000 01101001 01110000 01100101
          </div>
          <div className="absolute bottom-20 left-20 text-xs font-mono text-green-500 animate-pulse delay-500">
            01101100 01101001 01101110 01100101<br/>
            01100100 01100001 01110100 01100001
          </div>
        </div>
        
        {/* Floating data elements */}
        <div className="absolute top-20 left-20 w-24 h-24 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-lg blur-xl animate-pulse border border-blue-400/20" />
        <div className="absolute bottom-32 right-32 w-32 h-32 bg-gradient-to-r from-purple-400/10 to-green-400/10 rounded-lg blur-xl animate-pulse delay-1000 border border-purple-400/20" />
        <div className="absolute top-1/2 left-16 w-20 h-20 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-lg blur-xl animate-pulse delay-500 border border-green-400/20" />
        
        {/* Grid pattern with data theme */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)]" />
      </div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          
          {/* Left Column: Profile Image & Social */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start space-y-6"
          >
            {/* Profile Image */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full opacity-75 group-hover:opacity-100 transition duration-500 blur-lg animate-pulse" />
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 rounded-full opacity-50 group-hover:opacity-75 transition duration-300 blur-sm" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden bg-white dark:bg-slate-900 border-4 border-white/50 dark:border-slate-700/50 shadow-2xl backdrop-blur-sm select-none">
                {!imgError ? (
                  <div className="relative w-full h-full">
                    {!imgLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 text-white z-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                      </div>
                    )}
                    {/* Using regular img tag for better compatibility */}
                    <img
                      src={profileImagePath}
                      alt="Hritik Singh - Data Engineer"
                      className="w-full h-full object-cover select-none pointer-events-none"
                      onError={() => {
                        console.error('Image failed to load');
                        setImgError(true);
                      }}
                      onLoad={() => {
                        setImgLoaded(true);
                      }}
                      draggable={false}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 text-white select-none">
                    <span className="text-6xl md:text-7xl font-bold">HS</span>
                  </div>
                )}
              </div>
              
              {/* Enhanced status indicator */}
              <div className="absolute bottom-6 right-6 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg">
                <div className="w-full h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-ping opacity-75" />
                <div className="absolute inset-1 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <motion.a
                href="https://github.com/Hritiksingh1611"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-xl shadow-lg transition-all duration-300 group"
              >
                <Github size={24} className="text-neutral-100 dark:text-neutral-900 group-hover:text-white dark:group-hover:text-black" />
              </motion.a>
              
              <motion.a
                href="https://linkedin.com/in/hritik-singh-304450206"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-xl shadow-lg transition-all duration-300 group"
              >
                <Linkedin size={24} className="text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300" />
              </motion.a>
              
              <motion.a
                href="mailto:hritiksingh1611@gmail.com"
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-red-50 dark:bg-red-950/50 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-xl shadow-lg transition-all duration-300 group"
              >
                <Mail size={24} className="text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300" />
              </motion.a>
            </div>

            {/* Quick Info */}
            <div className="flex flex-col sm:flex-row gap-4 text-sm text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Kolkata, West Bengal, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Available for hire</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Main heading */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white leading-tight">
                  Hritik
                  <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Singh
                  </span>
                </h1>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-xl md:text-2xl text-slate-600 dark:text-neutral-300"
              >
                I&apos;m a{" "}
                <span className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {roles[currentRole]}
                </span>
              </motion.p>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-lg text-slate-600 dark:text-neutral-300 leading-relaxed max-w-xl"
            >
              Passionate about building scalable data pipelines, implementing ML solutions, 
              and transforming raw data into actionable insights. I specialize in modern 
              data engineering practices with Python, cloud platforms, and distributed systems.
            </motion.p>

            {/* Tech stack pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              {["Python", "Apache Kafka", "AWS", "Docker", "PostgreSQL", "Apache Spark"].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + i * 0.1, duration: 0.4 }}
                  className="px-4 py-2 bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-colors cursor-default backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.a
                href="#contact"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 transition-all duration-300 text-center backdrop-blur-sm"
              >
                Let&apos;s Connect
              </motion.a>
              
              <motion.a
                href={getAssetPath('/resume.pdf')}
                download
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white/80 dark:bg-slate-800/80 border-2 border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300/80 dark:hover:border-slate-600/80 text-slate-700 dark:text-slate-300 rounded-xl font-semibold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <Download size={20} />
                Resume
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
            <ChevronDown size={24} className="text-slate-600 dark:text-slate-400" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
