"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, ArrowUp, Github, Linkedin, Instagram } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in animation
      gsap.fromTo(
        contentRef.current,
        {
          y: 30,
          opacity: 0,
          filter: "blur(5px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            end: "bottom bottom",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Animate decorative elements
      const decorations =
        footerRef.current?.querySelectorAll(".footer-decoration");
      if (decorations) {
        gsap.to(decorations, {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.2,
        });
      }
    }, footerRef);

    // Particle animation (20 butir, gaya trend)
    if (particlesRef.current) {
      const particles = particlesRef.current.children;
      gsap.to(particles, {
        y: -200,
        rotation: 360,
        opacity: 0,
        duration: 5,
        stagger: { amount: 2, from: "random" },
        ease: "power1.out",
        repeat: -1,
        repeatDelay: 1.5,
      });
    }

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-12 px-6 overflow-hidden bg-gradient-to-br from-slate-950 via-background to-slate-950 border-t border-lime-500/10"
    >
      {/* Particle Background (20 butir) */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? "#84cc16" : "#eab308",
              opacity: 0.25,
              willChange: "transform",
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs - sama seperti about */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-lime-500/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-lime-500/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(132, 204, 22, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(234, 179, 8, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-lime-500/5 via-transparent to-transparent" />

      {/* Light leak effect */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-yellow-500/10 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-lime-500/10 to-transparent blur-3xl" />

      {/* Decorative lines dengan green yellow */}
      <div className="footer-decoration absolute top-0 left-1/4 w-px h-20 bg-gradient-to-b from-transparent via-lime-500/30 to-transparent" />
      <div className="footer-decoration absolute bottom-0 right-1/4 w-px h-20 bg-gradient-to-t from-transparent via-yellow-500/30 to-transparent" />

      <div ref={contentRef} className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main content */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-lime-500/20 to-yellow-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Image
                src="/logo.png"
                alt="YOGAS Logo"
                width={320}
                height={108}
                className="relative h-10 md:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            {/* Copyright dengan heart */}
            <p className="text-xs md:text-sm text-muted-foreground/60 flex items-center gap-2 flex-wrap justify-center">
              <span>© {year}.</span>
              <span>All Rights Reserved By</span>
              <Link
                href="https://www.linkedin.com/in/t-kurnia-yogas-wara-604b64338/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative font-semibold text-lime-500 hover:text-yellow-500 transition-colors duration-300 inline-flex items-center gap-1"
              >
                <span className="relative">
                  T. Kurnia Yogas Wara
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-lime-500 to-yellow-500 group-hover:w-full transition-all duration-300" />
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Back to top button dengan green yellow (glassmorphism) */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-lime-500/10 to-yellow-500/10 backdrop-blur-md border border-lime-500/30 flex items-center justify-center group hover:from-lime-500/20 hover:to-yellow-500/20 hover:scale-110 transition-all duration-300 z-50 shadow-lg hover:shadow-lime-500/20"
        aria-label="Back to top"
      >
        <ArrowUp className="w-4 h-4 md:w-5 md:h-5 text-lime-500 group-hover:-translate-y-1 transition-transform duration-300" />
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping bg-lime-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </button>

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.2; filter: blur(60px); }
          50% { opacity: 0.4; filter: blur(80px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </footer>
  );
}