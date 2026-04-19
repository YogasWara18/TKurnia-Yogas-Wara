"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function SplashScreen() {
  const splashRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const curtainLinesLeftRef = useRef<(HTMLDivElement | null)[]>([]);
  const curtainLinesRightRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // === 1. Matikan scroll saat splash aktif ===
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "pan-x pan-y"; // mencegah scroll paksa

    const tl = gsap.timeline({
      defaults: { ease: "power4.inOut" },
    });

    // === 2. Set initial state ===
    gsap.set([leftCurtainRef.current, rightCurtainRef.current], { x: 0 });
    gsap.set(logoRef.current, {
      scale: 0.8,
      opacity: 0,
      filter: "blur(10px)",
      willChange: "transform, opacity, filter",
    });
    gsap.set(textRef.current, {
      y: 20,
      opacity: 0,
      filter: "blur(5px)",
      willChange: "transform, opacity, filter",
    });

    // === 3. Animasi partikel dengan GSAP (bukan CSS infinite) ===
    let particleAnim: gsap.core.Tween | null = null;
    if (particlesRef.current) {
      const particles = Array.from(particlesRef.current.children) as HTMLElement[];
      particleAnim = gsap.to(particles, {
        y: -120,
        rotation: 360,
        opacity: 0,
        duration: 2.5,
        stagger: { amount: 1.2, from: "random" },
        ease: "power2.out",
        repeat: -1,
        repeatDelay: 0.5,
        modifiers: {
          y: (y) => `-=${Math.random() * 40}px`, // variasi acak
        },
      });
    }

    // === 4. Timeline utama (lebih ringan, tanpa delay berlebihan) ===
    tl.to(logoRef.current, {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.9,
      ease: "back.out(1.4)",
    })
      .to(
        textRef.current,
        {
          y: 0,
          opacity: 0.7,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .to({}, { duration: 0.6 }) // hold lebih singkat
      .to(
        leftCurtainRef.current,
        { x: "-100%", duration: 1.2, ease: "power4.inOut" },
        "+=0.2"
      )
      .to(
        rightCurtainRef.current,
        { x: "100%", duration: 1.2, ease: "power4.inOut" },
        "<"
      )
      .to(
        logoRef.current,
        {
          scale: 0.4,
          opacity: 0,
          filter: "blur(15px)",
          duration: 0.8,
          ease: "power3.in",
        },
        "-=0.7"
      )
      .to(
        textRef.current,
        {
          y: -15,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.6,
          ease: "power3.in",
        },
        "-=0.5"
      )
      .to(
        splashRef.current,
        {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.6,
          ease: "power3.out",
          onComplete: () => {
            document.body.style.overflow = "";
            document.body.style.touchAction = "";
            // Hentikan semua animasi partikel & garis curtain
            if (particleAnim) particleAnim.kill();
            // Hapus animasi CSS manual pada garis curtain
            curtainLinesLeftRef.current.forEach((line) => {
              if (line) line.style.animation = "none";
            });
            curtainLinesRightRef.current.forEach((line) => {
              if (line) line.style.animation = "none";
            });
          },
        },
        "-=0.3"
      );

    // === 5. Cleanup total ===
    return () => {
      tl.kill();
      if (particleAnim) particleAnim.kill();
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      // Matikan semua animasi CSS yang tersisa
      curtainLinesLeftRef.current.forEach((line) => {
        if (line) line.style.animation = "none";
      });
      curtainLinesRightRef.current.forEach((line) => {
        if (line) line.style.animation = "none";
      });
    };
  }, []);

  return (
    <div
      ref={splashRef}
      className="splash-screen fixed inset-0 z-[9999] flex items-center justify-center bg-background overflow-hidden"
    >
      {/* === Partikel (20 butir, di-random posisi & warna) === */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? "#84cc16" : "#eab308",
              opacity: 0.4,
              willChange: "transform, opacity",
            }}
          />
        ))}
      </div>

      {/* === Gradient orbs (lebih hemat dengan blur rendah) === */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-lime-500/10 rounded-full blur-2xl animate-pulse-glow" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-yellow-500/15 rounded-full blur-2xl animate-float" />
      <div
        className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-lime-500/15 rounded-full blur-2xl animate-float"
        style={{ animationDelay: "1s" }}
      />

      {/* === Grid overlay dengan pseudo-element (ringan) === */}
      <div className="absolute inset-0 opacity-10 bg-grid-pattern pointer-events-none" />

      {/* === Main content === */}
      <div className="relative z-10 text-center">
        <div ref={logoRef} className="mb-8 will-change-transform">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-lime-500/20 to-yellow-500/20 blur-2xl opacity-50" />
            <Image
              src="/logo.png"
              alt="Logo"
              width={240}
              height={240}
              className="relative drop-shadow-xl animate-float-slow will-change-transform"
              priority
              loading="eager"
            />
          </div>
        </div>

        <div ref={textRef}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 bg-lime-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
            <div className="w-2 h-2 bg-lime-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
          </div>
          <span className="text-sm tracking-[0.3em] text-lime-500/70 font-light">
            LOADING EXPERIENCE
          </span>
        </div>

        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-lime-500/30 to-transparent" />
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-t from-transparent via-yellow-500/30 to-transparent" />
      </div>

      {/* === Left Curtain === */}
      <div
        ref={leftCurtainRef}
        className="curtain-left fixed left-0 top-0 h-full w-1/2 bg-gradient-to-r from-background via-background to-lime-500/5 z-40 will-change-transform"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-lime-500/10 via-transparent to-transparent" />
        {[...Array(4)].map((_, i) => (
          <div
            key={`left-line-${i}`}
            ref={(el) => { curtainLinesLeftRef.current[i] = el; }}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-lime-500/40 to-transparent"
            style={{
              top: `${20 + i * 20}%`,
              transform: `rotate(${i * 5}deg)`,
              animation: `slide ${2 + i}s linear infinite`,
              willChange: "transform",
            }}
          />
        ))}
      </div>

      {/* === Right Curtain === */}
      <div
        ref={rightCurtainRef}
        className="curtain-right fixed right-0 top-0 h-full w-1/2 bg-gradient-to-l from-background via-background to-yellow-500/5 z-40 will-change-transform"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent" />
        {[...Array(4)].map((_, i) => (
          <div
            key={`right-line-${i}`}
            ref={(el) => { curtainLinesRightRef.current[i] = el; }}
            className="absolute w-full h-px bg-gradient-to-l from-transparent via-yellow-500/40 to-transparent"
            style={{
              top: `${20 + i * 20}%`,
              transform: `rotate(${-i * 5}deg)`,
              animation: `slide-reverse ${2 + i}s linear infinite`,
              willChange: "transform",
            }}
          />
        ))}
      </div>

      {/* === Edge accents === */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 border-t-2 border-l-2 border-r-2 border-lime-500/20 rounded-t-full" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-24 border-b-2 border-l-2 border-r-2 border-yellow-500/20 rounded-b-full" />

      <style jsx global>{`
        @keyframes float-particle {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        @keyframes slide {
          0% { transform: translateX(-100%) rotate(5deg); }
          100% { transform: translateX(100%) rotate(5deg); }
        }
        @keyframes slide-reverse {
          0% { transform: translateX(100%) rotate(-5deg); }
          100% { transform: translateX(-100%) rotate(-5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.01); }
        }
        .animate-float-slow {
          animation: float-slow 5s ease-in-out infinite;
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(132, 204, 22, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(234, 179, 8, 0.08) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .will-change-transform {
          will-change: transform;
        }
      `}</style>
    </div>
  );
}