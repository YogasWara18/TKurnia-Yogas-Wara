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

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power4.inOut" },
    });

    // Initial state
    gsap.set([leftCurtainRef.current, rightCurtainRef.current], {
      x: 0,
    });
    
    gsap.set(logoRef.current, {
      scale: 0.8,
      opacity: 0,
      filter: "blur(10px)",
    });

    gsap.set(textRef.current, {
      y: 20,
      opacity: 0,
      filter: "blur(5px)",
    });

    // Logo reveal animation
    tl.to(logoRef.current, {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "back.out(1.7)",
    })
    // Text reveal
    .to(textRef.current, {
      y: 0,
      opacity: 0.7,
      filter: "blur(0px)",
      duration: 1,
      ease: "power3.out",
    }, "-=0.6")
    // Hold for a moment
    .to({}, { duration: 0.8 })
    // Animate curtains with parallax effect
    .to(leftCurtainRef.current, {
      x: "-100%",
      duration: 1.5,
      ease: "power4.inOut",
    }, "+=0.2")
    .to(rightCurtainRef.current, {
      x: "100%",
      duration: 1.5,
      ease: "power4.inOut",
    }, "<")
    // Logo exit animation
    .to(logoRef.current, {
      scale: 0.5,
      opacity: 0,
      filter: "blur(20px)",
      duration: 1,
      ease: "power3.in",
    }, "-=0.8")
    .to(textRef.current, {
      y: -20,
      opacity: 0,
      filter: "blur(10px)",
      duration: 0.8,
      ease: "power3.in",
    }, "-=0.6")
    // Fade out splash screen
    .to(splashRef.current, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.8,
      ease: "power3.out",
      onComplete: () => {
        // Enable scroll on body
        document.body.style.overflow = "auto";
      },
    }, "-=0.4");

    // Particle animation
    if (particlesRef.current) {
      const particles = particlesRef.current.children;
      gsap.to(particles, {
        y: -100,
        rotation: 360,
        opacity: 0,
        duration: 2,
        stagger: {
          amount: 1.5,
          from: "random",
        },
        ease: "power2.out",
        repeat: -1,
      });
    }

    // Disable scroll during splash screen
    document.body.style.overflow = "hidden";

    return () => {
      tl.kill();
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      ref={splashRef}
      className="splash-screen fixed inset-0 z-[9999] flex items-center justify-center bg-background overflow-hidden"
    >
      {/* Animated particles background dengan warna green yellow */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none"
      >
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? '#84cc16' : '#eab308',
              opacity: 0.3,
              animationDelay: `${Math.random() * 2}s`,
              animation: `float-particle ${3 + Math.random() * 4}s linear infinite`,
            }}
          />
        ))}
      </div>

      {/* Gradient orbs dengan warna green yellow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-lime-500/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-lime-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />

      {/* Grid overlay dengan warna green yellow */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(132, 204, 22, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(234, 179, 8, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center perspective">
        {/* Logo container */}
        <div ref={logoRef} className="mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-lime-500/30 to-yellow-500/30 blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-1000" />
            <Image
              src="/logo.png"
              alt="Logo"
              width={280}
              height={280}
              className="relative drop-shadow-2xl animate-float-slow"
              priority
            />
          </div>
        </div>

        {/* Loading text */}
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

        {/* Decorative lines */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-lime-500/30 to-transparent" />
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-t from-transparent via-yellow-500/30 to-transparent" />
      </div>

      {/* Left Curtain dengan efek gradient green yellow */}
      <div
        ref={leftCurtainRef}
        className="curtain-left fixed left-0 top-0 h-full w-1/2 bg-gradient-to-r from-background via-background to-lime-500/5 z-40"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-lime-500/10 via-transparent to-transparent" />
        
        {/* Animated pattern dengan green yellow */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-px bg-gradient-to-r from-transparent via-lime-500/30 to-transparent"
              style={{
                top: `${20 + i * 15}%`,
                transform: `rotate(${i * 5}deg)`,
                animation: `slide ${3 + i}s linear infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Right Curtain dengan efek gradient green yellow */}
      <div
        ref={rightCurtainRef}
        className="curtain-right fixed right-0 top-0 h-full w-1/2 bg-gradient-to-l from-background via-background to-yellow-500/5 z-40"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent" />
        
        {/* Animated pattern dengan green yellow */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-px bg-gradient-to-l from-transparent via-yellow-500/30 to-transparent"
              style={{
                top: `${20 + i * 15}%`,
                transform: `rotate(${-i * 5}deg)`,
                animation: `slide-reverse ${3 + i}s linear infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Edge accents dengan green yellow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 border-t-2 border-l-2 border-r-2 border-lime-500/20 rounded-t-full" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 border-b-2 border-l-2 border-r-2 border-yellow-500/20 rounded-b-full" />

      <style jsx>{`
        @keyframes float-particle {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes slide {
          0% {
            transform: translateX(-100%) rotate(5deg);
          }
          100% {
            transform: translateX(100%) rotate(5deg);
          }
        }
        
        @keyframes slide-reverse {
          0% {
            transform: translateX(100%) rotate(-5deg);
          }
          100% {
            transform: translateX(-100%) rotate(-5deg);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.02);
          }
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .perspective {
          perspective: 2000px;
        }
      `}</style>
    </div>
  );
}