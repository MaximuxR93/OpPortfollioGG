import { useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";

export function CursorGlow() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 120, damping: 18 });
  const y = useSpring(0, { stiffness: 120, damping: 18 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      ref={cursorRef}
      className="pointer-events-none fixed z-50 hidden md:block"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
    >
      <div className="h-6 w-6 rounded-full bg-cyan-400/20 blur-sm ring-1 ring-cyan-400/40" />
      <div className="absolute inset-0 h-6 w-6 rounded-full bg-cyan-300/10 blur-xl" />
    </motion.div>
  );
}
