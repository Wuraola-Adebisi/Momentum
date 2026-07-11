// src/hooks/useIsMobile.ts
import { useEffect, useState } from "react";

/**
 * Tracks whether the viewport is at or below Tailwind's `md` breakpoint
 * (768px), the same breakpoint the rest of the app uses to switch from
 * the mobile bottom tab bar to the sidebar. Used by the Kanban board to
 * decide between drag-and-drop (desktop) and a tap-to-open status picker
 * (mobile).
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}