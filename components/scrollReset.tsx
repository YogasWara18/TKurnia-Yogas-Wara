"use client";

import { useEffect, useRef } from "react";

export default function ScrollReset() {
  const hasResetRef = useRef(false);

  useEffect(() => {
    // Cegah multiple reset
    if (hasResetRef.current) return;
    
    // Deteksi jika ini adalah initial load atau refresh
    const isInitialLoad = !sessionStorage.getItem('hasLoaded');
    
    if (isInitialLoad) {
      // Set flag bahwa halaman sudah load
      sessionStorage.setItem('hasLoaded', 'true');
      
      // Reset scroll dengan performa optimal
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant'
        });
        
        // Hapus hash dari URL
        if (window.location.hash && history.replaceState) {
          history.replaceState(null, '', window.location.pathname);
        }
      });
      
      hasResetRef.current = true;
    }

    // Nonaktifkan scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Cleanup
    return () => {
      // Reset flag saat component unmount
      sessionStorage.removeItem('hasLoaded');
      
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
      }
    };
  }, []);

  return null;
}