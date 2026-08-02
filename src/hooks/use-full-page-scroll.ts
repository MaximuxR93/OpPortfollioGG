import { useEffect, useRef } from "react";

const SECTIONS = ["hero", "about", "skills", "experience", "projects", "resume", "credentials", "contact"];
const COOLDOWN = 950;

export function useFullPageScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const current = useRef(0);
  const locked = useRef(false);
  const touchStartY = useRef(0);

  const goTo = (index: number) => {
    if (index < 0 || index >= SECTIONS.length) return;
    if (!containerRef.current) return;
    current.current = index;
    locked.current = true;

    const target = containerRef.current.querySelector<HTMLElement>(`#${SECTIONS[index]}`);
    if (target) {
      containerRef.current.scrollTo({ top: target.offsetTop, behavior: "smooth" });
    }
    setTimeout(() => { locked.current = false; }, COOLDOWN);
  };

  const jumpTo = (id: string) => {
    const idx = SECTIONS.indexOf(id);
    if (idx !== -1) goTo(idx);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (locked.current) return;
      if (e.deltaY > 0) goTo(current.current + 1);
      else goTo(current.current - 1);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (locked.current) return;
      const diff = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 30) return;
      if (diff > 0) goTo(current.current + 1);
      else goTo(current.current - 1);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (locked.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); goTo(current.current + 1); }
      if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); goTo(current.current - 1); }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return { containerRef, jumpTo };
}
