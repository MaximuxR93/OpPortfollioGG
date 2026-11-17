import { useCallback, useRef } from "react";

export function useFullPageScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  const jumpTo = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return { containerRef, jumpTo };
}
