"use client"

import { useEffect, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface GSAPProviderProps {
  children: ReactNode
}

export default function GSAPProvider({ children }: GSAPProviderProps) {
  useEffect(() => {
    let isMounted = true;
    let refreshTimer: NodeJS.Timeout;

    // Single refresh dengan debounce
    const refresh = () => {
      if (!isMounted) return;
      
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    // Refresh saat semua konten loaded
    if (document.readyState === 'complete') {
      refresh();
    } else {
      window.addEventListener('load', refresh, { once: true });
    }

    // Debounced resize handler
    const handleResize = () => {
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(refresh, 150);
    };

    window.addEventListener('resize', handleResize);

    // Config untuk performa
    gsap.config({ autoSleep: 60, force3D: true });

    // Cleanup
    return () => {
      isMounted = false;
      clearTimeout(refreshTimer);
      window.removeEventListener('load', refresh);
      window.removeEventListener('resize', handleResize);
      
      // Kill semua triggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}