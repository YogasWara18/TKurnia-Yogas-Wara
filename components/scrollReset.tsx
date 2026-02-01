"use client";
import { useEffect } from "react";

export default function scrollReset() {
  useEffect(() => {
    // Jika ada hash di URL, hapus
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }

    // Matikan scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Paksa scroll ke atas
    window.scrollTo(0, 0);
  }, []);

  return null;
}