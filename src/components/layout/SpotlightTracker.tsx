"use client";

import { useEffect } from "react";

export function SpotlightTracker() {
  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      document.querySelectorAll<HTMLElement>(".spotlight-card").forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return null;
}
