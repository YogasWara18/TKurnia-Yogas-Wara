"use client";
import { useLayoutEffect } from "react";

export default function ScrollReset() {
  useLayoutEffect(() => {
    // Hapus hash dari URL jika ada
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }

    // Matikan scroll restoration bawaan browser
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Paksa scroll ke atas saat halaman dimount
    window.scrollTo(0, 0);

    // Tambahkan handler untuk refresh
    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    };
  }, []);

  return null;
}
