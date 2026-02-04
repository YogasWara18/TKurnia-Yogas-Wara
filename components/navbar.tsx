"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const navLinks = [
  { href: "#about", label: "ABOUT" },
  { href: "#skills", label: "SKILLS" },
  { href: "#projects", label: "PROJECTS" },
  { href: "#contact", label: "CONTACT" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2 }
    );

    const links = linksRef.current?.querySelectorAll("a");
    if (links && links.length > 0) {
      tl.fromTo(
        Array.from(links),
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        0.5
      );
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg py-4 border-b border-border/50"
          : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img src="/logo.png" alt="Logo" className="w-20" />
        </a>

        {/* Desktop Links */}
        <div ref={linksRef} className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-xs tracking-[0.15em] font-medium relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Contact Button (Desktop) */}
        <a
          href="#contact"
          className="hidden md:inline-block px-6 py-2.5 bg-foreground text-background rounded-full text-xs tracking-wider font-medium hover:bg-primary transition-all duration-500"
        >
          CONTACT
        </a>

        {/* Hamburger Button (Mobile/Tablet) */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="w-6 h-0.5 bg-foreground"></span>
          <span className="w-6 h-0.5 bg-foreground"></span>
          <span className="w-6 h-0.5 bg-foreground"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg px-6 py-4 flex flex-col gap-4 border-t border-border/50">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium"
              onClick={() => setMenuOpen(false)} // close menu after click
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            className="px-6 py-2 bg-foreground text-background rounded-full text-sm tracking-wider font-medium hover:bg-primary transition-all duration-500 text-center"
            onClick={() => setMenuOpen(false)}
          >
            CONTACT
          </a>
        </div>
      )}
    </nav>
  );
}