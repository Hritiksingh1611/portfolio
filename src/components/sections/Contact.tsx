"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, CheckCircle, AlertCircle } from "lucide-react";

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "hritik16.work@gmail.com",
      href: "mailto:hritik16.work@gmail.com",
      description: "Best way to reach me"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9123964918",
      href: "tel:+919123964918",
      description: "Available 9 AM - 8 PM IST"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "India",
      href: "#",
      description: "Just for consulting"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/hritiksingh",
      color: "hover:text-gray-300"
    },
    {
      icon: Linkedin,
      label: "LinkedIn", 
      href: "https://linkedin.com/in/hritiksingh",
      color: "hover:text-blue-400"
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://twitter.com/hritiksingh",
      color: "hover:text-sky-400"
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 pt-24 relative overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-slate-900 transition-all duration-500" ref={ref}>
      {/* Communication Network Background */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1000 600" fill="none">
          {/* Network Nodes */}
          <g>
            <circle cx="200" cy="150" r="20" fill="currentColor" className="text-blue-600 dark:text-blue-400" opacity="0.4">
              <animate attributeName="r" values="20;30;20" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="500" cy="100" r="15" fill="currentColor" className="text-green-600 dark:text-green-400" opacity="0.4">
              <animate attributeName="r" values="15;25;15" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="800" cy="200" r="18" fill="currentColor" className="text-purple-600 dark:text-purple-400" opacity="0.4">
              <animate attributeName="r" values="18;28;18" dur="4.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="300" cy="350" r="22" fill="currentColor" className="text-orange-600 dark:text-orange-400" opacity="0.4">
              <animate attributeName="r" values="22;32;22" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="700" cy="400" r="16" fill="currentColor" className="text-red-600 dark:text-red-400" opacity="0.4">
              <animate attributeName="r" values="16;26;16" dur="5s" repeatCount="indefinite" />
            </circle>
          </g>
          
          {/* Connection Lines */}
          <g stroke="currentColor" strokeWidth="2" className="text-neutral-400 dark:text-neutral-600" opacity="0.3">
            <line x1="200" y1="150" x2="500" y2="100">
              <animate attributeName="stroke-dasharray" values="0,300;300,0;0,300" dur="6s" repeatCount="indefinite" />
            </line>
            <line x1="500" y1="100" x2="800" y2="200">
              <animate attributeName="stroke-dasharray" values="0,300;300,0;0,300" dur="7s" repeatCount="indefinite" />
            </line>
            <line x1="200" y1="150" x2="300" y2="350">
              <animate attributeName="stroke-dasharray" values="0,200;200,0;0,200" dur="5s" repeatCount="indefinite" />
            </line>
            <line x1="300" y1="350" x2="700" y2="400">
              <animate attributeName="stroke-dasharray" values="0,400;400,0;0,400" dur="8s" repeatCount="indefinite" />
            </line>
            <line x1="800" y1="200" x2="700" y2="400">
              <animate attributeName="stroke-dasharray" values="0,200;200,0;0,200" dur="6.5s" repeatCount="indefinite" />
            </line>
          </g>
          
          {/* Message Packets */}
          <g>
            <circle r="4" fill="currentColor" className="text-blue-500 dark:text-blue-400" opacity="0.8">
              <animateMotion dur="6s" repeatCount="indefinite" path="M200,150 L500,100 L800,200" />
            </circle>
            <circle r="3" fill="currentColor" className="text-green-500 dark:text-green-400" opacity="0.7">
              <animateMotion dur="8s" repeatCount="indefinite" path="M300,350 L700,400 L800,200" />
            </circle>
            <circle r="3.5" fill="currentColor" className="text-purple-500 dark:text-purple-400" opacity="0.9">
              <animateMotion dur="10s" repeatCount="indefinite" path="M200,150 L300,350 L700,400" />
            </circle>
          </g>
          
          {/* Signal Waves */}
          <g stroke="currentColor" strokeWidth="1" fill="none" className="text-neutral-300 dark:text-neutral-700" opacity="0.5">
            <circle cx="200" cy="150" r="40">
              <animate attributeName="r" values="20;60;20" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="500" cy="100" r="35">
              <animate attributeName="r" values="15;55;15" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="800" cy="200" r="45">
              <animate attributeName="r" values="18;65;18" dur="3.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="3.5s" repeatCount="indefinite" />
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
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Let&apos;s</span> Connect
          </h2>
          <p className="text-xl text-slate-800 dark:text-neutral-300 max-w-3xl mx-auto">
            Ready to collaborate on your next big data project? I&apos;d love to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Get in Touch</h3>
              <p className="text-slate-800 dark:text-gray-300 text-lg leading-relaxed mb-8">
                Whether you have a project in mind, want to discuss opportunities, 
                or just want to say hello, I&apos;m always excited to connect with 
                fellow tech enthusiasts and potential collaborators.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map(({ icon: Icon, label, value, href, description }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 p-4 glass-effect rounded-xl hover:bg-white/10 dark:hover:bg-white/10 hover:bg-slate-100/80 transition-all duration-300 group bg-white/90 dark:bg-transparent border border-slate-200/50 dark:border-white/10"
                >
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                    <Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-300">
                      {label}
                    </p>
                    <p className="text-slate-700 dark:text-gray-300">{value}</p>
                    <p className="text-sm text-slate-600 dark:text-gray-400">{description}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map(({ icon: Icon, label, href, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 glass-effect rounded-xl ${color} transition-all duration-300 group`}
                    aria-label={label}
                  >
                    <Icon size={24} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="glass-effect p-6 rounded-xl border border-green-500/30 bg-white/90 dark:bg-transparent"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-600 dark:text-green-300 font-semibold">Available for Work</span>
              </div>
              <p className="text-slate-700 dark:text-gray-300 text-sm">
                Currently open to new opportunities and exciting projects. 
                Let&apos;s build something amazing together!
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="glass-effect p-8 rounded-2xl border border-white/10 dark:border-white/10 border-slate-200/50 bg-white/90 dark:bg-transparent">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send a Message</h3>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 bg-slate-50 border border-white/10 dark:border-white/10 border-slate-300 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 bg-slate-50 border border-white/10 dark:border-white/10 border-slate-300 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project or inquiry..."
                  />
                </div>

                {/* Submit Status */}
                {submitStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-2 p-3 rounded-lg ${
                      submitStatus === 'success' 
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}
                  >
                    {submitStatus === 'success' ? (
                      <>
                        <CheckCircle size={16} />
                        Message sent successfully! I&apos;ll get back to you soon.
                      </>
                    ) : (
                      <>
                        <AlertCircle size={16} />
                        Something went wrong. Please try again or contact me directly.
                      </>
                    )}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Thank You Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="glass-effect p-8 rounded-2xl border border-white/10 dark:border-white/10 border-slate-200/50 max-w-3xl mx-auto bg-white/90 dark:bg-transparent">
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              Thank You for Visiting! 🚀
            </h3>
            <p className="text-slate-800 dark:text-gray-300 text-lg leading-relaxed">
              I appreciate you taking the time to learn about my work. Whether you&apos;re 
              looking to collaborate on a project, discuss opportunities, or just connect 
              with a fellow data enthusiast, I&apos;m always excited to meet new people in the tech community.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
