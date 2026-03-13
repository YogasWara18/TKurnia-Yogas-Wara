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
          scrolled ? "py-2 md:py-3" : "bg-transparent py-4 md:py-5"
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

        {/* Container dengan desain menarik - di atas dan ada jarak dengan hero */}
        <div className="container px-4 md:px-6 mt-2 md:mt-3">
          <div className="relative rounded-2xl bg-gradient-to-br from-lime-500/5 to-yellow-500/5 backdrop-blur-md border border-lime-500/10 shadow-lg shadow-lime-500/5 px-4 md:px-6 py-3 md:py-4">
            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-lime-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex items-center justify-between relative z-10">
              {/* Logo dengan gambar */}
              <a
                ref={logoRef}
                href="#"
                className="relative group flex items-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-lime-500/20 to-yellow-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-150" />
                <div className="relative flex items-center gap-2">
                  <Image
                    src="/logo.png"
                    alt="Yogas Wara"
                    width={170}
                    height={170}
                    className="w-15 h-15 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </a>

              {/* Desktop Links dengan desain lebih menarik */}
              <div
                ref={linksRef}
                className="hidden md:flex items-center gap-1 lg:gap-2"
              >
                {navLinks.map((link, index) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="nav-link relative px-3 lg:px-4 py-2 text-xs lg:text-sm tracking-[0.2em] text-muted-foreground/80 hover:text-lime-500 transition-all duration-300 font-medium rounded-full group overflow-hidden"
                  >
                    {/* Background animation */}
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-lime-500 to-yellow-500 opacity-0 group-hover:opacity-10 scale-0 group-hover:scale-100 transition-all duration-500 ease-out" />

                    {/* Shine effect */}
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />

                    {/* Glow effect on hover */}
                    <span className="absolute -inset-1 rounded-full bg-lime-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Text dengan efek */}
                    <span className="relative z-10 flex items-center justify-center gap-1">
                      {link.label}
                      {/* Dot indicator yang muncul di hover */}
                      <span className="w-1 h-1 rounded-full bg-lime-500 scale-0 group-hover:scale-100 transition-transform duration-300 delay-150" />
                    </span>

                    {/* Underline effect dengan animasi */}
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-lime-500 to-yellow-500 group-hover:w-1/2 transition-all duration-500 ease-out" />
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-lime-500 group-hover:w-1/2 transition-all duration-500 delay-100 ease-out" />
                  </a>
                ))}
              </div>

              {/* Desktop Actions */}
              <div className="hidden md:flex items-center gap-3">
                {/* Contact Button dengan desain premium */}
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
                className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-lime-500/10 to-yellow-500/10 border border-lime-500/30 hover:border-lime-500/60 transition-all duration-300 group"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-lime-500/20 to-yellow-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                {menuOpen ? (
                  <X className="w-5 h-5 text-lime-500 relative z-10" />
                ) : (
                  <Menu className="w-5 h-5 text-lime-500 relative z-10" />
                )}
              </button>
            </div>
          </div>
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
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-lime-500/20 to-yellow-500/20 blur-xl rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
              <Image
                src="/logo.png"
                alt="Yogas Wara"
                width={100}
                height={100}
                className="w-20 h-20 object-contain relative z-10"
              />
            </div>

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
