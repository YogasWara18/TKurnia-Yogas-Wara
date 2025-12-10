"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    name: "HTML5",
    color: "border-orange-500/30 hover:border-orange-500",
    icon: "/html.png",
  },
  {
    name: "CSS3",
    color: "border-blue-500/30 hover:border-blue-500",
    icon: "/css.png",
  },
  {
    name: "JavaScript",
    color: "border-yellow-500/30 hover:border-yellow-500",
    icon: "/javaScript.png",
  },
  {
    name: "TypeScript",
    color: "border-blue-500/30 hover:border-blue-500",
    icon: "/typeScript.png",
  },
  {
    name: "React",
    color: "border-cyan-500/30 hover:border-cyan-500",
    icon: "/react.png",
  },
  {
    name: "Next.js",
    color: "border-zinc-500/30 hover:border-zinc-400",
    icon: "/next.js.png",
  },
  {
    name: "Bootstrap",
    color: "border-purple-500/30 hover:border-purple-500",
    icon: "/bootstrap.png",
  },

  {
    name: "Tailwind CSS",
    color: "border-teal-500/30 hover:border-teal-500",
    icon: "/tailwind.png",
  },
  {
    name: "GSAP",
    color: "border-green-500/30 hover:border-green-500",
    icon: "/gsap.png",
  },

  {
    name: "Node.js",
    color: "border-green-600/30 hover:border-green-600",
    icon: "/nodejs.png",
  },
  {
    name: "Git",
    color: "border-red-500/30 hover:border-red-500",
    icon: "/git.png",
  },
  {
    name: "GitHub",
    color: "border-zinc-500/30 hover:border-zinc-400",
    icon: "/github.jpg",
  },
  {
    name: "Figma",
    color: "border-pink-500/30 hover:border-pink-500",
    icon: "/figma.png",
  },
  {
    name: "Canva",
    color: "border-blue-500/30 hover:border-blue-500",
    icon: "/canva.png",
  },
  {
    name: "REST API",
    color: "border-indigo-500/30 hover:border-indigo-500",
    icon: "/api.png",
  },
   {
    name: "PosgreSQL",
    color: "border-indigo-500/30 hover:border-indigo-500",
    icon: "/posgressql.png",
  },
   {
    name: "Vercel",
    color: "border-zinc-500/30 hover:border-zinc-400",
    icon: "/vercel.png",
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      const titleLines = titleRef.current?.querySelectorAll(".title-line");
      if (titleLines && titleLines.length > 0) {
        gsap.fromTo(
          titleLines,
          { y: 60, opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
          {
            y: 0,
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );
      }

      // Skills animation
      const skillItems = skillsRef.current?.querySelectorAll(".skill-item");
      if (skillItems && skillItems.length > 0) {
        gsap.fromTo(
          skillItems,
          {
            y: 40,
            opacity: 0,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-32 px-6 bg-secondary/20 relative bg-checkerboard"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-20">
          <div className="overflow-hidden">
            <span className="title-line inline-block text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium mb-4">
              Tech Stack
            </span>
          </div>
          <div className="overflow-hidden">
            <h2 className="title-line text-4xl md:text-5xl lg:text-6xl font-bold">
              Skills & Expertise

            </h2>
          </div>
        </div>

        {/* Skills */}
        <div
          ref={skillsRef}
          className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto"
        >
          {skills.map((skill) => (
            <div
              key={skill.name}
              className={`skill-item group px-6 py-4 bg-card/50 backdrop-blur-sm rounded-full border ${skill.color} transition-all duration-500 cursor-default hover:scale-105 flex items-center gap-3`}
            >
              {/* gambar */}
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-10 h-7 object-contain transition-transform duration-500 group-hover:scale-110"
              />
              {/* teks */}
              <span className="font-medium text-foreground tracking-wide transition-colors duration-500 group-hover:text-gray-400 mr-5">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
