"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

      // Label reveal
      tl.fromTo(labelRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.2)

      const lines = headingRef.current?.querySelectorAll(".hero-line")
      if (lines) {
        tl.fromTo(
          lines,
          { y: 100, clipPath: "inset(100% 0% 0% 0%)" },
          {
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            stagger: 0.1,
          },
          0.4,
        )
      }

      // Subtitle slide up
      tl.fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 1)

      // CTA fade in
      tl.fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 1.2)

      tl.fromTo(
        imageRef.current,
        { scale: 1.15, clipPath: "inset(100% 0% 0% 0%)" },
        {
          scale: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power3.out",
        },
        0.6,
      )

      gsap.to(imageRef.current, {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center px-6 pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="relative z-10">
            <div ref={labelRef} className="mb-8">
              <span className="inline-block text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium">
                My Portofolio
              </span>
            </div>

            <div ref={headingRef} className="mb-8">
              <div className="overflow-hidden">
                <h1 className="hero-line text-5xl md:text-6xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                  HELLO! <span className="text-primary/70 italic font-light">I&apos;M </span>
                </h1>
              </div>
              <div className="overflow-hidden">
                <h1 className="hero-line text-5xl md:text-6xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
                  T. KURNIA YOGAS WARA
                </h1>
              </div>
              <div className="overflow-hidden">
                <h1 className="hero-line text-5xl md:text-4xl lg:text-7xltracking-tight leading-[1.1] text-primary/60 italic font-light">
                  FRONTEND WEB DEVELOPER
                </h1>
              </div>
            </div>

            <p ref={subtitleRef} className="text-base text-muted-foreground max-w-md leading-relaxed mb-10">
              With over a year of experience, I specialize in designing responsive, accessible, and innovative web interfaces. Driven by creativity, passion, and curiosity, I consistently deliver user‑focused solutions while maintaining high standards of performance and scalability. My relentless drive to explore new possibilities ensures continuous growth and the ability to adapt to emerging technologies.
            </p>

            <div ref={ctaRef} className="flex items-center gap-4">
              <a
                href="#projects"
                className="group px-8 py-4 bg-foreground text-background rounded-full font-medium transition-all duration-500 hover:bg-primary hover:scale-105"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-8 py-4 border border-border rounded-full font-medium hover:bg-secondary transition-all duration-500"
              >
                View My Resume
              </a>
            </div>
          </div>

          {/* Right image */}
          <div ref={imageRef} className="relative hidden lg:block">
            <div className="relative aspect-3/4 w-full max-w-lg ml-auto overflow-hidden rounded-3xl">
              <img
                src="/hero.jpg"
                alt="Developer Portrait"
                className="w-full h-full object-cover hover:grayscale transition-all duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-foreground rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
