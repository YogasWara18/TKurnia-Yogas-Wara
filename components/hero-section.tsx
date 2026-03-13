"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// SplitText dengan style modern splash
function SplitText({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");

  return (
    <span className={`${className} text-center sm:text-left block`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span
            className="inline-block hero-word"
            style={{
              animation: `revealSplash 1.2s cubic-bezier(0.77, 0, 0.175, 1) ${i * 0.1}s forwards`,
              transform: "translateY(100%) rotate(5deg)",
              opacity: 0,
              marginRight: "0.25rem",
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

// Typing Animation Component
function TypingRole() {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = ["Frontend Developer", "Web Developer", "WordPress Developer"];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setDisplayText(
        isDeleting
          ? fullText.substring(0, displayText.length - 1)
          : fullText.substring(0, displayText.length + 1),
      );

      setTypingSpeed(isDeleting ? 80 : 150);

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, roles, typingSpeed]);

  return (
    <div className="flex justify-center md:justify-start w-full">
      <div className="inline-flex items-center h-8 md:h-10">
        <span className="text-lg sm:text-xl md:text-2xl font-light tracking-wide whitespace-nowrap">
          <span className="bg-gradient-to-r from-lime-500 to-yellow-500 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
            {displayText}
          </span>
          <span className="ml-1 inline-block w-0.5 h-5 md:h-6 bg-gradient-to-b from-lime-500 to-yellow-500 animate-pulse align-middle" />
        </span>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const mobileImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(heroRef.current, { opacity: 0 });
      gsap.set(subtitleRef.current, {
        y: 40,
        opacity: 0,
        filter: "blur(10px)",
      });
      gsap.set(ctaRef.current?.children || [], {
        y: 30,
        opacity: 0,
        scale: 0.95,
      });
      gsap.set([imageRef.current, mobileImageRef.current], {
        scale: 1.1,
        opacity: 0,
        filter: "blur(20px)",
      });

      // Master timeline dengan style splash
      const tl = gsap.timeline({
        defaults: { ease: "power4.inOut" },
        onStart: () => {
          if (particlesRef.current) {
            gsap.to(particlesRef.current.children, {
              opacity: 0.5,
              scale: 1,
              stagger: 0.02,
              duration: 1.5,
            });
          }
        },
      });

      // Fade in hero
      tl.to(heroRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      })

        // Subtitle reveal
        .to(
          subtitleRef.current,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
          },
          0.4,
        )

        // CTA buttons
        .to(
          ctaRef.current?.children || [],
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: "back.out(1.7)",
          },
          0.8,
        )

        // Image reveal untuk desktop dan mobile
        .to(
          [imageRef.current, mobileImageRef.current],
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.8,
            ease: "power4.out",
          },
          0.2,
        )

        // Parallax untuk desktop image
        .to(
          imageRef.current,
          {
            y: 40,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.5,
            },
          },
          0,
        )

        // Scroll indicator fade
        .to(
          ".scroll-indicator",
          {
            opacity: 0,
            y: 20,
            ease: "power2.out",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom 80%",
              scrub: 1,
            },
          },
          0,
        );
    }, heroRef);

    // Particle animation
    if (particlesRef.current) {
      const particles = particlesRef.current.children;
      gsap.to(particles, {
        y: -150,
        rotation: 360,
        opacity: 0,
        duration: 3,
        stagger: {
          amount: 2,
          from: "random",
        },
        ease: "power2.out",
        repeat: -1,
      });
    }

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative pt-20 md:pt-24 lg:pt-28 min-h-screen flex items-center overflow-hidden bg-background"
      style={{ opacity: 0 }}
    >
      {/* Particle Background dengan warna green yellow */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? "#84cc16" : "#eab308",
              opacity: 0.2,
              animation: `float-particle 10s linear infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs dengan warna green yellow */}
      <div className="absolute top-20 left-20 w-[30rem] h-[30rem] bg-lime-500/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-20 w-[25rem] h-[25rem] bg-yellow-500/10 rounded-full blur-3xl animate-float" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-lime-500/5 rounded-full blur-3xl animate-pulse-glow"
        style={{ animationDelay: "2s" }}
      />

      {/* Grid Overlay dengan warna green yellow subtle */}
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

      {/* Subtle gradient overlay dengan green yellow */}
      <div className="absolute inset-0 bg-gradient-to-br from-lime-500/5 via-transparent to-transparent" />

      {/* Light leak effect dengan green yellow */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-yellow-500/10 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-lime-500/10 to-transparent blur-3xl" />

      <div className="container relative z-10">
        <div
          ref={contentRef}
          className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-24 items-center min-h-screen py-20"
        >
          {/* Mobile Image - Tampil di atas untuk mobile */}
          <div
            ref={mobileImageRef}
            className="relative block lg:hidden w-full max-w-sm mx-auto mb-8"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-lime-500/20">
              <img
                src="/hero.jpg"
                alt="Portrait"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            </div>

            {/* Decorative elements untuk mobile dengan green yellow */}
            <div className="absolute -bottom-3 -left-3 w-12 h-12 border border-lime-500/20 rounded-lg" />
            <div className="absolute -top-3 -right-3 w-12 h-12 border border-yellow-500/20 rounded-lg" />
          </div>

          {/* Left Content - Center alignment di mobile dengan padding kiri */}
          <div className="text-center lg:text-left space-y-8 max-w-xl mx-auto lg:mx-0 lg:pl-12 xl:pl-16">
            {/* Title - center di mobile */}
            <div ref={titleRef} className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
                <SplitText text="Hello, I'm" />
              </h1>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
                <SplitText text="T. KURNIA YOGAS WARA" />
              </h1>

              {/* Typing Animation Role */}
              <TypingRole />
            </div>

            {/* Description - center di mobile */}
            <p
              ref={subtitleRef}
              className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              Crafting responsive, accessible, and performant web experiences
              with modern technologies. Focused on creating interfaces that
              blend technical excellence with aesthetic precision.
            </p>

            {/* CTA Buttons - center di mobile dengan padding kiri konsisten */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <a
                href="#projects"
                className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-lime-500 to-yellow-500 text-background rounded-full font-medium overflow-hidden transition-all duration-500 text-center hover:shadow-2xl hover:shadow-lime-500/40 hover:scale-105 active:scale-95"
              >
                {/* Multiple layer background untuk efek depth */}
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-lime-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.3),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Shine effect yang lebih dramatis */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] skew-x-12 group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />

                {/* Pulse ring effect */}
                <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-lime-500 to-yellow-500 opacity-0 group-hover:opacity-30 blur-md group-hover:animate-pulse" />

                {/* Bouncing dots di background */}
                <span
                  className="absolute top-1/2 left-1/4 w-1 h-1 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 animate-bounce-slow"
                  style={{ animationDelay: "0s" }}
                />
                <span
                  className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 animate-bounce-slow"
                  style={{ animationDelay: "0.2s" }}
                />
                <span
                  className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 animate-bounce-slow"
                  style={{ animationDelay: "0.4s" }}
                />

                {/* Text container dengan efek */}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="relative">
                    View Projects
                    {/* Glow effect pada text */}
                    <span className="absolute -inset-1 bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </span>

                  {/* Icon dengan multiple animasi */}
                  <svg
                    className="w-4 h-4 group-hover:translate-x-2 group-hover:-translate-y-1 group-hover:rotate-12 transition-all duration-500 ease-out"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>

                {/* Sparkle effects di pojok */}
                <span
                  className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-ping"
                  style={{ animationDuration: "1s" }}
                />
                <span
                  className="absolute bottom-1 right-1 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-ping"
                  style={{ animationDuration: "1.2s", animationDelay: "0.2s" }}
                />
              </a>

              <a
                href="https://drive.google.com/file/d/15Lx-mFTr7dHeXZJjUBDJ5eMqP-p9nM_L/view?usp=sharing"
                className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-lime-500/30 text-foreground/80 rounded-full font-medium hover:bg-lime-500/5 hover:border-lime-500/60 transition-all duration-500 text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
              </a>
            </div>
          </div>

          {/* Desktop Right Image - Hidden di mobile */}
          <div ref={imageRef} className="relative hidden lg:block">
            <div className="relative aspect-[4/5] max-w-xl ml-auto">
              <div className="relative w-full h-full overflow-hidden rounded-2xl border border-lime-500/20">
                <img
                  src="/hero.jpg"
                  alt="Portrait"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              </div>

              {/* Decorative elements dengan green yellow */}
              <div className="absolute -bottom-4 -left-4 w-20 h-20 border border-lime-500/20 rounded-lg" />
              <div className="absolute -top-4 -right-4 w-20 h-20 border border-yellow-500/20 rounded-lg" />

              {/* Edge accents dengan green yellow */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-lime-500/20 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-yellow-500/20 rounded-br-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator dengan green yellow */}
      <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs tracking-[0.3em] text-lime-500/40 font-light">
            SCROLL
          </span>
          <div className="relative">
            <div className="w-4 h-7 border border-lime-500/20 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-gradient-to-b from-lime-500 to-yellow-500 rounded-full animate-scroll" />
            </div>
            <div className="absolute -inset-1 bg-lime-500/10 rounded-full blur-md opacity-50" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes revealSplash {
          0% {
            transform: translateY(100%) rotate(5deg);
            opacity: 0;
            filter: blur(10px);
          }
          100% {
            transform: translateY(0) rotate(0);
            opacity: 1;
            filter: blur(0px);
          }
        }

        @keyframes float-particle {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.3;
          }
          80% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-120px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes scroll {
          0%,
          100% {
            transform: translateY(4px);
            opacity: 1;
          }
          50% {
            transform: translateY(12px);
            opacity: 0.2;
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-scroll {
          animation: scroll 2.5s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .hero-word {
          will-change: transform, opacity, filter;
        }
      `}</style>
    </section>
  );
}
