"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useSpring, useTransform, type SpringOptions } from "framer-motion";
import { cn } from "@/lib/utils";

type SpotlightProps = {
  className?: string;
  size?: number;
  springOptions?: SpringOptions;
};

export function Spotlight({
  className,
  size = 360,
  springOptions = { stiffness: 260, damping: 30, mass: 0.5 },
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);

  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!event.isTrusted || !containerRef.current?.parentElement) return;
      const { left, top } = containerRef.current.parentElement.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
      setIsHovered(true);
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    const leave = () => setIsHovered(false);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", leave);
    };
  }, [handleMouseMove]);

  return (
    <motion.div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute rounded-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops),transparent_75%)] blur-2xl transition-opacity duration-300",
        "from-cyan-300/15 via-cyan-400/5 to-transparent",
        isHovered ? "opacity-100" : "opacity-0",
        className,
      )}
      style={{
        width: size,
        height: size,
        left: spotlightLeft,
        top: spotlightTop,
      }}
    />
  );
}
