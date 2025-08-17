"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingElements() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const [floatingElements, setFloatingElements] = useState<Array<{
    id: number;
    size: number;
    initialX: number;
    initialY: number;
    color: string;
  }>>([]);

  useEffect(() => {
    // Set client-side flag
    setIsClient(true);
    
    // Generate floating elements only on client
    const elements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      initialX: Math.random() * (window?.innerWidth || 1000),
      initialY: Math.random() * (window?.innerHeight || 1000),
      color: [
        'bg-blue-500/20',
        'bg-purple-500/20',
        'bg-pink-500/20',
        'bg-green-500/20',
        'bg-yellow-500/20',
      ][Math.floor(Math.random() * 5)],
    }));
    
    setFloatingElements(elements);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [isClient]);

  // Don't render anything on server side
  if (!isClient) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-green-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-2000" />

      {/* Floating Particles */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute rounded-full ${element.color} backdrop-blur-sm`}
          style={{
            width: element.size,
            height: element.size,
          }}
          initial={{
            x: element.initialX,
            y: element.initialY,
          }}
          animate={{
            x: [
              element.initialX,
              element.initialX + (element.id % 2 === 0 ? 100 : -100),
              element.initialX,
            ],
            y: [
              element.initialY,
              element.initialY + (element.id % 3 === 0 ? 100 : -100),
              element.initialY,
            ],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 10 + element.id * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Mouse Follower */}
      <motion.div
        className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-sm"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
        }}
      />

      {/* Geometric Shapes */}
      <motion.div
        className="absolute top-20 right-20 w-4 h-4 border border-blue-500/30 transform rotate-45"
        animate={{
          rotate: [45, 225, 45],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 left-20 w-6 h-6 border border-purple-500/30 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/2 right-10 w-3 h-3 bg-pink-500/30 transform rotate-45"
        animate={{
          rotate: [45, 405, 45],
          y: [-20, 20, -20],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated Lines */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.path
          d="M 100 100 Q 200 50 300 100 T 500 100"
          stroke="rgba(59, 130, 246, 0.1)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.path
          d="M 600 200 Q 700 150 800 200 T 1000 200"
          stroke="rgba(147, 51, 234, 0.1)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </svg>

      {/* Code-like Elements */}
      <motion.div
        className="absolute top-32 left-32 font-mono text-xs text-blue-400/20"
        animate={{
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {"{ data: 'engineering' }"}
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-32 font-mono text-xs text-purple-400/20"
        animate={{
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      >
        {"const ai = () => future()"}
      </motion.div>

      <motion.div
        className="absolute top-2/3 left-16 font-mono text-xs text-green-400/20"
        animate={{
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      >
        {"ml.predict(success)"}
      </motion.div>
    </div>
  );
}
