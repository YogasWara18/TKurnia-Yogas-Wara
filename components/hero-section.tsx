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
          : fullText.substring(0, displayText.length + 1)
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
    <div className="flex justify-center lg:justify-start w-full">
      <div className="inline-flex items-center h-8 md:h-10">
        <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-wide whitespace-nowrap">
          <span className="bg-gradient-to-r from-lime-500 to-yellow-500 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
            {displayText}
          </span>
          <span className="ml-1 inline-block w-0.5 h-4 md:h-5 lg:h-6 bg-gradient-to-b from-lime-500 to-yellow-500 animate-pulse align-middle" />
        </span>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const mobileImageRef = useRef<HTMLDivElement>(null);
  const nameFirstRef = useRef<HTMLHeadingElement>(null);
  const nameLastRef = useRef<HTMLHeadingElement>(null);

  // ========== MUSIK MP3 ==========
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
    if (!hasInteracted) setHasInteracted(true);
  };

  const startAudio = () => {
    if (!hasInteracted && audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch((err) => console.log("Audio play failed:", err));
    }
  };

  // Interaksi pertama pengguna (klik di mana saja)
  useEffect(() => {
    const handleFirstInteraction = () => {
      startAudio();
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("touchstart", handleFirstInteraction);
    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [hasInteracted]);

  // ========== GSAP ANIMATIONS ==========
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(heroRef.current, { opacity: 0 });
      gsap.set(subtitleRef.current, { y: 40, opacity: 0, filter: "blur(10px)" });
      gsap.set(ctaRef.current?.children || [], { y: 30, opacity: 0, scale: 0.95 });
      gsap.set([imageRef.current, mobileImageRef.current], { scale: 1.1, opacity: 0, filter: "blur(20px)" });
      gsap.set([nameFirstRef.current, nameLastRef.current], { y: 20, opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power4.inOut" },
        onStart: () => {
          if (particlesRef.current) {
            gsap.to(particlesRef.current.children, { opacity: 0.5, scale: 1, stagger: 0.02, duration: 1.5 });
          }
        },
      });

      tl.to(heroRef.current, { opacity: 1, duration: 0.8, ease: "power2.out" })
        .to(nameFirstRef.current, { y: 0, opacity: 1, duration: 0.8 }, 0.2)
        .to(nameLastRef.current, { y: 0, opacity: 1, duration: 0.8 }, 0.3)
        .to(subtitleRef.current, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }, 0.4)
        .to(ctaRef.current?.children || [], { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: "back.out(1.7)" }, 0.8)
        .to([imageRef.current, mobileImageRef.current], { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.8, ease: "power4.out" }, 0.2)
        .to(imageRef.current, { y: 40, ease: "none", scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.5 } }, 0)
        .to(".scroll-indicator", { opacity: 0, y: 20, ease: "power2.out", scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom 80%", scrub: 1 } }, 0);
    }, heroRef);

    if (particlesRef.current) {
      const particles = particlesRef.current.children;
      gsap.to(particles, { y: -150, rotation: 360, opacity: 0, duration: 3, stagger: { amount: 2, from: "random" }, ease: "power2.out", repeat: -1 });
    }

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative pt-20 sm:pt-24 md:pt-28 lg:pt-32 xl:pt-36 min-h-screen flex items-center overflow-hidden bg-background" style={{ opacity: 0 }}>
      {/* Audio MP3 - Ganti src dengan file musik Anda */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/music/Crawling.mp3" type="audio/mpeg" />
        {/* Fallback jika file tidak ditemukan */}
        Your browser does not support the audio element.
      </audio>

      {/* Tombol Play/Pause Musik (di kiri bawah agar tidak tabrakan dengan upscale) */}
      <button
        onClick={toggleAudio}
        className="fixed bottom-6 left-6 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-lime-500/10 to-yellow-500/10 backdrop-blur-md border border-lime-500/30 flex items-center justify-center group hover:from-lime-500/20 hover:to-yellow-500/20 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-lime-500/20"
        aria-label="Toggle music"
      >
        {isPlaying ? (
          // Icon pause (two vertical bars) + equalizer animation
          <div className="relative flex items-center justify-center gap-[2px]">
            <div className="w-[2px] h-3 bg-lime-400 rounded-full animate-equalizer" style={{ animationDelay: "0s" }} />
            <div className="w-[2px] h-4 bg-lime-400 rounded-full animate-equalizer" style={{ animationDelay: "0.2s" }} />
            <div className="w-[2px] h-2 bg-lime-400 rounded-full animate-equalizer" style={{ animationDelay: "0.4s" }} />
          </div>
        ) : (
          // Icon play (triangle)
          <svg className="w-3 h-3 md:w-4 md:h-4 text-lime-400 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3z" />
          </svg>
        )}
        {/* Tooltip label */}
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] text-lime-400/70 bg-black/50 px-2 py-0.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          {isPlaying ? "Pause" : "Play"}
        </span>
        {/* Ping effect saat hover */}
        <span className="absolute inset-0 rounded-full animate-ping bg-lime-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </button>

      {/* Particle Background */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 rounded-full" style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            backgroundColor: i % 2 === 0 ? "#84cc16" : "#eab308",
            opacity: 0.2,
            animation: `float-particle 10s linear infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }} />
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-[30rem] h-[30rem] bg-lime-500/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-20 w-[25rem] h-[25rem] bg-yellow-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-lime-500/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(rgba(132,204,22,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(234,179,8,0.03) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-lime-500/5 via-transparent to-transparent" />

      {/* Light leak effect */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-yellow-500/10 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-lime-500/10 to-transparent blur-3xl" />

      <div className="container relative z-10 px-4 sm:px-6 md:px-8 mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24 items-center min-h-screen py-12 sm:py-16 md:py-20">
          {/* Mobile Image */}
          <div ref={mobileImageRef} className="relative block lg:hidden w-full max-w-[280px] sm:max-w-sm md:max-w-md mx-auto mb-6 sm:mb-8 md:mb-10">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-lime-500/20 shadow-xl backdrop-blur-sm">
              <img src="/hero.jpg" alt="Portrait" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            </div>
            <div className="absolute -bottom-3 -left-3 w-10 h-10 sm:w-12 sm:h-12 border border-lime-500/20 rounded-lg" />
            <div className="absolute -top-3 -right-3 w-10 h-10 sm:w-12 sm:h-12 border border-yellow-500/20 rounded-lg" />
          </div>

          {/* Left Content */}
          <div className="text-center lg:text-left space-y-4 sm:space-y-5 md:space-y-6 max-w-2xl mx-auto lg:mx-0 px-2 sm:px-4 lg:px-0">
            <div>
              <h1 ref={nameFirstRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight text-foreground">Hello, I'm</h1>
              <h1 ref={nameLastRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight mt-1 sm:mt-2 bg-gradient-to-r from-lime-400 via-yellow-400 to-lime-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">T. Kurnia Yogas Wara</h1>
            </div>
            <TypingRole />
            <p ref={subtitleRef} className="text-sm sm:text-base md:text-lg text-muted-foreground/80 leading-relaxed max-w-md mx-auto lg:mx-0">
              I specialize in developing responsive, accessible, and high performance web applications using cutting edge technologies. My approach combines technical excellence with a keen eye for design, ensuring every project delivers a seamless user experience and meets the highest standards of quality.
            </p>
            <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-4">
              <a href="#projects" className="group relative px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-lime-500 to-yellow-500 rounded-full font-semibold text-background shadow-lg hover:shadow-lime-500/30 transition-all duration-300 hover:scale-105 active:scale-95 text-sm sm:text-base">
                <span className="flex items-center gap-2">View Projects<svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></span>
              </a>
              <a href="https://drive.google.com/file/d/15Lx-mFTr7dHeXZJjUBDJ5eMqP-p9nM_L/view?usp=sharing" className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 border border-lime-500/40 rounded-full font-semibold text-foreground/80 hover:bg-lime-500/5 hover:border-lime-500 transition-all duration-300 text-sm sm:text-base" target="_blank" rel="noopener noreferrer">View Resume</a>
            </div>
          </div>

          {/* Desktop Image */}
          <div ref={imageRef} className="relative hidden lg:block">
            <div className="relative aspect-[4/5] max-w-md xl:max-w-lg 2xl:max-w-xl ml-auto">
              <div className="relative w-full h-full overflow-hidden rounded-2xl border border-lime-500/20 shadow-2xl backdrop-blur-sm">
                <img src="/hero.jpg" alt="Portrait" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 sm:w-20 h-16 sm:h-20 border border-lime-500/20 rounded-lg" />
              <div className="absolute -top-4 -right-4 w-16 sm:w-20 h-16 sm:h-20 border border-yellow-500/20 rounded-lg" />
              <div className="absolute top-0 left-0 w-10 h-10 sm:w-12 sm:h-12 border-t-2 border-l-2 border-lime-500/20 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-10 h-10 sm:w-12 sm:h-12 border-b-2 border-r-2 border-yellow-500/20 rounded-br-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-5 sm:bottom-6 md:bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 sm:gap-3">
          <span className="text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-lime-500/40 font-light">SCROLL</span>
          <div className="relative">
            <div className="w-3 h-5 sm:w-4 sm:h-6 md:h-7 border border-lime-500/20 rounded-full flex justify-center">
              <div className="w-0.5 h-1 sm:w-1 sm:h-1.5 md:h-2 bg-gradient-to-b from-lime-500 to-yellow-500 rounded-full animate-scroll mt-1" />
            </div>
            <div className="absolute -inset-1 bg-lime-500/10 rounded-full blur-md opacity-50" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes revealSplash {
          0% { transform: translateY(100%) rotate(5deg); opacity: 0; filter: blur(10px); }
          100% { transform: translateY(0) rotate(0); opacity: 1; filter: blur(0px); }
        }
        @keyframes float-particle {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          20% { opacity: 0.3; }
          80% { opacity: 0.3; }
          100% { transform: translateY(-120px) rotate(360deg); opacity: 0; }
        }
        @keyframes scroll {
          0%,100% { transform: translateY(4px); opacity: 1; }
          50% { transform: translateY(12px); opacity: 0.2; }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse-glow {
          0%,100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-scroll { animation: scroll 2.5s ease-in-out infinite; }
        .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
        .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .hero-word { will-change: transform, opacity, filter; }
      `}</style>
    </section>
  );
}