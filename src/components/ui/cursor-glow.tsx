import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CursorGlow() {
  const [visible, setVisible] = useState(false);
  const x = useSpring(-200, { stiffness: 320, damping: 32, mass: 0.4 });
  const y = useSpring(-200, { stiffness: 320, damping: 32, mass: 0.4 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!e.isTrusted) return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };

    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[1] hidden md:block"
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
    >
      <div
        className="h-72 w-72 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, rgba(6, 182, 212, 0.03) 45%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
