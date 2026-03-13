"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X, Github, Linkedin, Instagram } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { href: "#about", label: "ABOUT" },
  { href: "#skills", label: "SKILLS" },
  { href: "#projects", label: "PROJECTS" },
  { href: "#contact", label: "CONTACT" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);

      // Calculate scroll progress for gradient effect
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = (winScroll / height) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);

    // Particle animation
    if (particlesRef.current) {
      const particles = particlesRef.current.children;
      gsap.to(particles, {
        y: -100,
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

    // Entrance animation
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      navRef.current,
      { y: -100, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, delay: 0.2 },
    );

    tl.fromTo(
      logoRef.current,
      { scale: 0.8, opacity: 0, rotate: -5 },
      { scale: 1, opacity: 1, rotate: 0, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.6",
    );

    const links = linksRef.current?.querySelectorAll(".nav-link");
    if (links && links.length > 0) {
      tl.fromTo(
        Array.from(links),
        { y: -30, opacity: 0, filter: "blur(5px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: {
            amount: 0.6,
            from: "start",
          },
          ease: "power3.out",
        },
        "-=0.4",
      );
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        {
          y: -20,
          opacity: 0,
          scale: 0.95,
          filter: "blur(5px)",
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.4,
          ease: "power3.out",
        },
      );

      // Animate mobile links
      const mobileLinks =
        mobileMenuRef.current?.querySelectorAll(".mobile-nav-link");
      if (mobileLinks) {
        gsap.fromTo(
          Array.from(mobileLinks),
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.2,
          },
        );
      }

      // Prevent scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "py-2 md:py-3 border-b border-lime-500/20"
            : "bg-transparent py-4 md:py-2"
        }`}
        style={{
          background: scrolled
            ? `linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(20, 20, 20, 0.98) 100%)`
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        {/* Particle background untuk navbar */}
        <div
          ref={particlesRef}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                backgroundColor: i % 2 === 0 ? "#84cc16" : "#eab308",
                opacity: 0.2,
              }}
            />
          ))}
        </div>

        {/* Gradient border bottom saat scroll */}
        {scrolled && (
          <div
            className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-lime-500 to-transparent"
            style={{
              width: `${scrollProgress}%`,
              transition: "width 0.3s ease",
            }}
          />
        )}

        <div className="container flex items-center justify-between px-4 md:px-6">
          {/* Logo with glow effect */}
          <a
            ref={logoRef}
            href="#"
            className="relative group p-2 md:p-4" // Padding di semua sisi
          >
            <div className="absolute inset-0 bg-gradient-to-r from-lime-500/20 to-yellow-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <Image
              src="/logo.png"
              alt="Yogas Wara"
              width={100}
              height={40}
              className="relative w-20 md:w-24 h-auto transition-transform duration-500 group-hover:scale-110"
            />
          </a>

          {/* Desktop Links */}
          <div
            ref={linksRef}
            className="hidden md:flex items-center gap-6 lg:gap-8"
          >
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-xs lg:text-sm tracking-[0.2em] text-muted-foreground/80 hover:text-lime-500 transition-colors duration-300 font-medium relative group"
              >
                <span className="relative">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-lime-500 to-yellow-500 group-hover:w-full transition-all duration-500" />
                </span>
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Contact Button */}
            <a
              href="#contact"
              className="relative group px-5 py-2 bg-gradient-to-r from-lime-500 to-yellow-500 text-background rounded-full text-xs font-medium overflow-hidden hover:shadow-lg hover:shadow-lime-500/25 transition-all duration-500"
            >
              <span className="relative z-10 flex items-center gap-2">
                CONTACT
                <span className="w-1 h-1 bg-background rounded-full group-hover:scale-150 transition-transform duration-500" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </a>
          </div>

          {/* Hamburger Button (Mobile/Tablet) */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full border border-lime-500/30 hover:border-lime-500/60 transition-all duration-300 group"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="absolute inset-0 bg-lime-500/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
            {menuOpen ? (
              <X className="w-5 h-5 text-lime-500" />
            ) : (
              <Menu className="w-5 h-5 text-lime-500" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div ref={mobileMenuRef} className="fixed inset-0 top-0 z-40 md:hidden">
          {/* Backdrop dengan efek gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/98 to-background/95 backdrop-blur-xl"
            onClick={() => setMenuOpen(false)}
          />

          {/* Particle background untuk mobile menu */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  backgroundColor: i % 2 === 0 ? "#84cc16" : "#eab308",
                  opacity: 0.1,
                  animation: `float-particle 8s linear infinite`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>

          {/* Menu content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center gap-8 p-8">
            {/* Logo di mobile menu */}
            <Image
              src="/logo.png"
              alt="Yogas Wara"
              width={120}
              height={48}
              className="w-24 h-auto mb-4 opacity-80"
            />

            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className="mobile-nav-link group relative text-3xl font-bold text-muted-foreground/60 hover:text-lime-500 transition-colors duration-300"
                onClick={() => setMenuOpen(false)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="relative">
                  {link.label}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-lime-500 to-yellow-500 group-hover:w-full transition-all duration-500" />
                </span>
              </a>
            ))}

            <a
              href="#contact"
              className="mobile-nav-link group relative mt-8 px-10 py-4 bg-gradient-to-r from-lime-500 to-yellow-500 text-background rounded-full text-lg font-medium overflow-hidden hover:shadow-lg hover:shadow-lime-500/25 transition-all duration-500"
              onClick={() => setMenuOpen(false)}
            >
              <span className="relative z-10 flex items-center gap-2">
                CONTACT ME
                <span className="w-2 h-2 bg-background rounded-full group-hover:scale-150 transition-transform duration-500" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </a>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float-particle {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.1;
          }
          80% {
            opacity: 0.1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
