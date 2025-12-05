"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail, MessageCircle, Linkedin, Github, Instagram, ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  { icon: Mail, label: "Email", href: "mailto:hello@example.com" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/1234567890" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
]

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const iconsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      })

      // Title lines animate up with clip-path reveal
      const titleLines = titleRef.current?.querySelectorAll(".title-line")
      if (titleLines) {
        tl.fromTo(
          Array.from(titleLines),
          { y: 100, clipPath: "inset(100% 0% 0% 0%)" },
          {
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            stagger: 0.15,
            ease: "power4.out",
          },
        )
      }

      // Subtitle fades in
      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5",
      )

      // CTA button slides up
      tl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.4",
      )

      // Social icons
      const socialIcons = iconsRef.current?.querySelectorAll(".social-icon")
      if (socialIcons) {
        tl.fromTo(
          Array.from(socialIcons),
          { y: 40, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.3",
        )
      }

      // Hover effects
      const icons = iconsRef.current?.querySelectorAll(".social-icon")

      const handleMouseMove = (e: MouseEvent, icon: Element) => {
        const rect = icon.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        gsap.to(icon, {
          x: x * 0.35,
          y: y * 0.35,
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out",
        })
      }

      const handleMouseLeave = (icon: Element) => {
        gsap.to(icon, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.4)",
        })
      }

      icons?.forEach((icon) => {
        icon.addEventListener("mousemove", (e) => handleMouseMove(e as MouseEvent, icon))
        icon.addEventListener("mouseleave", () => handleMouseLeave(icon))
      })

      return () => {
        ctx.revert()
        icons?.forEach((icon) => {
          icon.removeEventListener("mousemove", (e) => handleMouseMove(e as MouseEvent, icon))
          icon.removeEventListener("mouseleave", () => handleMouseLeave(icon))
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 px-6 bg-secondary/20 relative overflow-hidden"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Title */}
        <div ref={titleRef} className="mb-8">
          <div className="overflow-hidden">
            <h2 className="title-line text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1]">
              Let&apos;s Discuss
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="title-line text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-muted-foreground">
              Your Ideas
            </h2>
          </div>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-md mx-auto"
        >
          Have a project in mind? I&apos;d love to hear about it. Drop me a message and let&apos;s
          create something amazing.
        </p>

        {/* CTA Button */}
        <div ref={ctaRef} className="mb-16">
          <a
            href="mailto:hello@example.com"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-medium transition-all duration-500 hover:bg-primary hover:scale-105"
          >
            Get in Touch
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>

        {/* Social icons */}
        <div ref={iconsRef} className="flex items-center justify-center gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="social-icon p-4 bg-card rounded-full border border-border transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-background"
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}