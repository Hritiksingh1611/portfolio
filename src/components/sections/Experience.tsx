"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, MapPin, ExternalLink, Award, TrendingUp } from "lucide-react";

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences = [
    {
      id: 1,
      title: "Data Engineer",
      company: "Tata Consultancy Services",
      location: "New Delhi, India",
      duration: "September 2022 - Present",
      type: "Full-time",
      description: "Developing robust ETL pipelines and data solutions for enterprise clients using modern data stack technologies. Working with Azure cloud services and implementing best practices in data engineering.",
      achievements: [
        "Designed and implemented scalable ETL pipelines using Azure Data Factory",
        "Built data warehousing solutions using Snowflake and Azure Synapse",
        "Optimized data processing workflows reducing execution time by 30%",
        "Collaborated with cross-functional teams to deliver data-driven insights",
        "Implemented data quality checks and monitoring systems"
      ],
      technologies: ["Python", "SQL", "Azure Data Factory", "Snowflake", "DBT", "Power BI"],
      logo: "💼"
    },
    {
      id: 2,
      title: "Data Analyst Intern",
      company: "Fidelity International",
      location: "Bangalore, India", 
      duration: "February 2022 - August 2022",
      type: "Internship",
      description: "Worked on data analysis projects and automation scripts. Gained hands-on experience with data visualization tools and statistical analysis techniques.",
      achievements: [
        "Developed automated reporting dashboards using Power BI",
        "Created data analysis scripts in Python for business intelligence",
        "Performed statistical analysis on financial datasets",
        "Collaborated with senior analysts on market research projects",
        "Improved data processing efficiency through automation"
      ],
      technologies: ["Python", "SQL", "Power BI", "Excel", "Pandas", "NumPy"],
      logo: "📊"
    },
    {
      id: 3,
      title: "Bachelor's in Computer Science Engineering",
      company: "Galgotias University",
      location: "Greater Noida, India",
      duration: "2018 - 2022",
      type: "Education",
      description: "Completed comprehensive coursework in computer science fundamentals, data structures, algorithms, and specialized in data engineering and analytics.",
      achievements: [
        "Graduated with strong foundation in programming and database systems",
        "Completed projects in data mining and machine learning",
        "Participated in coding competitions and technical events",
        "Developed web applications and database management systems",
        "Gained expertise in multiple programming languages and frameworks"
      ],
      technologies: ["C++", "Java", "Python", "MySQL", "Data Structures", "Algorithms"],
      logo: "🎓"
    }
  ];

  const certifications = [
    {
      name: "Microsoft Azure Fundamentals",
      issuer: "Microsoft",
      year: "2023",
      credentialId: "AZ-900-2023"
    },
    {
      name: "Snowflake SnowPro Core Certification",
      issuer: "Snowflake",
      year: "2023", 
      credentialId: "SNOWPRO-CORE-2023"
    },
    {
      name: "Python Programming Certification",
      issuer: "HackerRank",
      year: "2022",
      credentialId: "PYTHON-2022"
    },
    {
      name: "SQL Advanced Certification",
      issuer: "HackerRank",
      year: "2022",
      credentialId: "SQL-ADV-2022"
    }
  ];

  return (
    <section id="experience" className="py-20 px-4 pt-24" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            Experience & Achievements
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            My journey through the world of data engineering and AI
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline Node */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transform -translate-x-1/2 border-4 border-slate-900 z-10">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-ping opacity-20"></div>
              </div>

              {/* Experience Card */}
              <div className={`ml-16 md:ml-0 md:w-5/12 ${index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass-effect p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{exp.logo}</span>
                      <div>
                        <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                        <p className="text-blue-300 font-medium">{exp.company}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      exp.type === "Full-time" 
                        ? "bg-green-500/20 text-green-300 border border-green-500/30"
                        : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    }`}>
                      {exp.type}
                    </span>
                  </div>

                  {/* Duration & Location */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {exp.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      {exp.location}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                      <Award size={14} />
                      Key Achievements:
                    </h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                          <TrendingUp size={12} className="text-green-400 mt-1 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded border border-blue-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold gradient-text text-center mb-12">
            Certifications & Credentials
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                className="glass-effect p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
                      {cert.name}
                    </h4>
                    <p className="text-blue-300 font-medium">{cert.issuer}</p>
                  </div>
                  <span className="text-2xl">🏆</span>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>Issued: {cert.year}</span>
                  <span className="font-mono text-xs">ID: {cert.credentialId}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <div className="glass-effect p-8 rounded-2xl border border-white/10 max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Ready for the Next Challenge
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              I&apos;m always looking for opportunities to grow, learn, and contribute to 
              innovative projects that make a real impact. Let&apos;s discuss how we can work together!
            </p>
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              Download Resume
              <ExternalLink size={18} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
