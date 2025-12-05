"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

const navLinks = [
  { href: "#about", label: "ABOUT" },
  { href: "#skills", label: "SERVICES" },
  { href: "#projects", label: "PROJECTS" },
  { href: "#contact", label: "CONTACT" },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    tl.fromTo(navRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.2 })

    // Staggered link reveal
    const links = linksRef.current?.querySelectorAll("a")
    if (links && links.length > 0) {
      tl.fromTo(
        Array.from(links),
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        0.5
      )
    }

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-lg py-4 border-b border-border/50" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-xl font-bold tracking-tight">
          PORTO<span className="text-muted-foreground">///</span>O
        </a>

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

        <a
          href="#contact"
          className="px-6 py-2.5 bg-foreground text-background rounded-full text-xs tracking-wider font-medium hover:bg-primary transition-all duration-500"
        >
          CONTACT
        </a>
      </div>
    </nav>
  )
}