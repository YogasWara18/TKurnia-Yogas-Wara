"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Utility SplitText untuk animasi per kata
function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => {
        // Jika kata adalah "|", beri class khusus text-white
        if (word === "|") {
          return (
            <span
              key={i}
              className="inline-block hero-word text-white mx-2"
            >
              {word}
            </span>
          )
        }
        // Kata biasa tetap pakai class hero-word untuk animasi GSAP
        return (
          <span
            key={i}
            className="inline-block hero-word mr-2"
          >
            {word}
          </span>
        )
      })}
    </span>
  )
}

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

      // Label
      tl.fromTo(
        labelRef.current,
        { y: 20, opacity: 0, letterSpacing: "0.5em" },
        { y: 0, opacity: 1, letterSpacing: "0.3em", duration: 1 },
        0.2
      )

      // Animasi per kata
      const words = headingRef.current?.querySelectorAll(".hero-word")
      if (words) {
        tl.fromTo(
          words,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.15 },
          0.4
        )
      }

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2 },
        1
      )

      // CTA
      tl.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1 },
        1.3
      )

      // Image
      tl.fromTo(
        imageRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" },
        0.6
      )

      // Parallax scroll untuk image
      gsap.to(imageRef.current, {
        y: 100,
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
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center px-6 pt-24 pb-20 overflow-hidden bg-checkerboard"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Mobile/Tablet Image */}
          <div className="relative block lg:hidden mb-10">
            <div className="relative aspect-3/4 w-full max-w-md mx-auto overflow-hidden rounded-2xl">
              <img
                src="/hero.jpg"
                alt="Developer Portrait"
                className="w-full h-full object-cover hover:grayscale transition-all duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
            </div>
          </div>

          {/* Left content */}
          <div className="relative z-10">
            <div ref={labelRef} className="mb-6">
              <span className="inline-block text-xs tracking-[0.3em] uppercase text-gray-400 font-semibold">
                My Portfolio
              </span>
            </div>

            <div ref={headingRef} className="mb-6 space-y-4">
              <div className="overflow-hidden">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                  <SplitText
                    text="Hello  I'm"
                    className="text-white italic font-light"
                  />
                </h1>
              </div>
              <div className="overflow-hidden">
                <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold tracking-tight leading-[1.2]">
                  <SplitText text="T. KURNIA YOGAS WARA" />
                </h1>
              </div>
              <div className="overflow-hidden">
                <h2 className="text-2xl md:text-4xl lg:text-3xl tracking-tight leading-[1.2] text-gray-300 italic font-light">
                  <SplitText
                    text="FRONTEND WEB DEVELOPER | WEB DESIGN | WEB DEVELOPER"
                    className="text-primary/70 italic font-light"
                  />
                </h2>
              </div>
            </div>

            <p
              ref={subtitleRef}
              className="text-sm md:text-base text-muted-foreground max-w-md leading-relaxed mb-8"
            >
              With over a year of experience, I specialize in designing
              responsive, accessible, and innovative web interfaces. Driven by
              creativity, passion, and curiosity, I consistently deliver user
              focused solutions while maintaining high standards of performance
              and scalability.
            </p>

            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <a
                href="#projects"
                className="group w-full sm:w-auto px-8 py-4 bg-foreground text-background rounded-full font-medium transition-all duration-500 hover:bg-primary hover:scale-105 text-center"
              >
                View My Work
              </a>
              <a
                href="https://drive.google.com/file/d/1CFhR0Cx5x8e3SNkXW0b4OO-PO06okhQg/view?usp=sharing"
                className="w-full sm:w-auto px-8 py-4 border border-border rounded-full font-medium hover:bg-secondary transition-all duration-500 text-center"
              >
                View My Resume
              </a>
            </div>
          </div>

          {/* Right image (Desktop only) */}
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
  );
}
