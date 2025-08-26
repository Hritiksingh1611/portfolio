"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function FloatingContacts() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    console.log('FloatingContacts component mounted');
    
    const handleScroll = () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const contactRect = contactSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Hide button when contact section is significantly visible (more than 25% of contact section is visible)
        const contactSectionHeight = contactRect.height;
        const visibleHeight = Math.min(contactRect.bottom, windowHeight) - Math.max(contactRect.top, 0);
        const visibilityRatio = visibleHeight / contactSectionHeight;
        
        console.log('Scroll check - visibility ratio:', visibilityRatio, 'isVisible:', visibilityRatio <= 0.25);
        
        if (visibilityRatio > 0.25 && contactRect.top < windowHeight) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
    };

    // Add a small delay before checking initial state to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      handleScroll();
    }, 1000);

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isVisible) return null;

  console.log('FloatingContacts rendering, isVisible:', isVisible);

  return (
    <motion.button
      onClick={scrollToContact}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 20 }}
      aria-label="Go to contact section"
    >
      <MessageCircle size={20} className="md:hidden" />
      <MessageCircle size={24} className="hidden md:block" />
    </motion.button>
  );
}
