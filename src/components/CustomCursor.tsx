"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted]     = useState(false);
  const [hovering, setHovering]   = useState(false);
  const [clicking, setClicking]   = useState(false);
  const [isTouch, setIsTouch]     = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Inner dot — snappy
  const dotX = useSpring(rawX, { stiffness: 800, damping: 40 });
  const dotY = useSpring(rawY, { stiffness: 800, damping: 40 });

  // Outer glow — laggy
  const glowX = useSpring(rawX, { stiffness: 200, damping: 28 });
  const glowY = useSpring(rawY, { stiffness: 200, damping: 28 });

  useEffect(() => {
    setMounted(true);
    // Detect touch device — skip cursor on touch
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    // Hide native cursor via a class on body
    document.body.classList.add("cursor-none-custom");

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [role='button'], input, textarea, select, label"));
    };

    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      document.body.classList.remove("cursor-none-custom");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [rawX, rawY]);

  if (!mounted || isTouch) return null;

  return (
    <>
      {/* Outer glow ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width:   hovering ? 56 : clicking ? 28 : 40,
            height:  hovering ? 56 : clicking ? 28 : 40,
            opacity: hovering ? 0.5 : 0.25,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="rounded-full border border-indigo-400"
          style={{
            boxShadow: hovering
              ? "0 0 16px rgba(99,102,241,0.6), 0 0 32px rgba(99,102,241,0.3)"
              : "0 0 8px rgba(99,102,241,0.3)",
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width:  hovering ? 6 : clicking ? 10 : 8,
            height: hovering ? 6 : clicking ? 10 : 8,
            background: hovering
              ? "rgba(168,85,247,1)"
              : "rgba(99,102,241,1)",
          }}
          transition={{ duration: 0.15 }}
          className="rounded-full"
          style={{ boxShadow: "0 0 6px rgba(99,102,241,0.8)" }}
        />
      </motion.div>
    </>
  );
}
