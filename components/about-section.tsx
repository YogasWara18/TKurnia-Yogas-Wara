"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Label animation
      tl.fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      // Title lines with clip-path reveal
      const titleLines = titleRef.current?.querySelectorAll(".title-line");
      if (titleLines) {
        tl.fromTo(
          Array.from(titleLines),
          { y: 80, clipPath: "inset(100% 0% 0% 0%)" },
          {
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            stagger: 0.12,
            ease: "power4.out",
          },
          "-=0.4"
        );
      }

      // Text paragraph animation
      tl.fromTo(
        textRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );

      // Stats stagger in
      const statItems = statsRef.current?.querySelectorAll(".stat-item");
      if (statItems) {
        tl.fromTo(
          Array.from(statItems),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.3"
        );
      }

      gsap.fromTo(
        imageRef.current,
        { y: 100, scale: 1.1, clipPath: "inset(100% 0% 0% 0%)" },
        {
          y: 0,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
          },
        }
      );

      // Image parallax on scroll
      gsap.to(imageRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      const counters = statsRef.current?.querySelectorAll(".stat-number");
      counters?.forEach((counter) => {
        const target = Number.parseInt(
          counter.getAttribute("data-value") || "0"
        );
        gsap.fromTo(
          counter,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-32 px-6 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div ref={imageRef} className="relative">
            <div className="aspect-4/5 rounded-3xl overflow-hidden">
              <img
                src="/minimalist-workspace-desk-setup-keyboard-mouse-dar.jpg"
                alt="About Me"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <span
              ref={labelRef}
              className="inline-block text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium mb-6"
            >
              About Me
            </span>

            <div ref={titleRef} className="mb-8">
              <div className="overflow-hidden">
                <h2 className="title-line text-4xl md:text-5xl font-bold leading-[1.1]">
                  Crafting Digital
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="title-line text-4xl md:text-5xl font-bold leading-[1.1] text-primary/60 italic">
                  Experiences
                </h2>
              </div>
            </div>

            <p
              ref={textRef}
              className="text-muted-foreground text-lg leading-relaxed mb-10"
            >
              I&apos;m a passionate frontend developer with a keen eye for
              design. With years of experience building modern web applications,
              I focus on creating seamless user experiences that combine
              beautiful aesthetics with powerful functionality.
            </p>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-8">
              <div className="stat-item">
                <span
                  className="stat-number text-4xl md:text-5xl font-bold"
                  data-value="5"
                >
                  0
                </span>
                <span className="text-4xl md:text-5xl font-bold">+</span>
                <p className="text-muted-foreground text-sm mt-2">
                  Years Experience
                </p>
              </div>
              <div className="stat-item">
                <span
                  className="stat-number text-4xl md:text-5xl font-bold"
                  data-value="50"
                >
                  0
                </span>
                <span className="text-4xl md:text-5xl font-bold">+</span>
                <p className="text-muted-foreground text-sm mt-2">
                  Projects Completed
                </p>
              </div>
              <div className="stat-item">
                <span
                  className="stat-number text-4xl md:text-5xl font-bold"
                  data-value="30"
                >
                  0
                </span>
                <span className="text-4xl md:text-5xl font-bold">+</span>
                <p className="text-muted-foreground text-sm mt-2">
                  Happy Clients
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
