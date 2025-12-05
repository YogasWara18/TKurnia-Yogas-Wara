"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = footerRef.current?.querySelectorAll(".footer-item")
      if (items && items.length > 0) {
        gsap.fromTo(
          Array.from(items),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 95%",
            },
          }
        )
      }
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="py-12 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo */}
          <div className="footer-item">
            <a href="#" className="text-xl font-bold tracking-tight">
              PORTO<span className="text-muted-foreground">///</span>O
            </a>
          </div>

          {/* Main Links */}
          <div className="footer-item">
            <h4 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">Main</h4>
            <div className="space-y-3">
              <a href="#" className="block text-sm hover:text-primary transition-colors duration-300">
                Home
              </a>
              <a href="#about" className="block text-sm hover:text-primary transition-colors duration-300">
                About
              </a>
              <a href="#skills" className="block text-sm hover:text-primary transition-colors duration-300">
                Services
              </a>
              <a href="#projects" className="block text-sm hover:text-primary transition-colors duration-300">
                Projects
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="footer-item">
            <h4 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="#contact" className="block text-sm hover:text-primary transition-colors duration-300">
                Contact
              </a>
              <a href="#" className="block text-sm hover:text-primary transition-colors duration-300">
                Terms & Conditions
              </a>
              <a href="#" className="block text-sm hover:text-primary transition-colors duration-300">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-item pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            ©{new Date().getFullYear()} Portfolio. All Rights Reserved.
          </p>
          <p className="text-muted-foreground text-sm">Built with Next.js & GSAP</p>
        </div>
      </div>
    </footer>
  )
}