"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code2, Zap, GitBranch, Palette, Network } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const skills = [
  {
    name: "React",
    color: "border-cyan-500/30 hover:border-cyan-500",
    icon: <Code2 className="w-5 h-5 text-cyan-400" />,
  },
  {
    name: "Next.js",
    color: "border-zinc-500/30 hover:border-zinc-400",
    icon: (
      <svg className="w-5 h-5 fill-zinc-300" viewBox="0 0 180 180">
        <path d="M90 0C40.2 0 0 40.2 0 90s40.2 90 90 90 90-40.2 90-90S139.8 0 90 0zm0 150c-33.1 0-60-26.9-60-60s26.9-60 60-60 60 26.9 60 60-26.9 60-60 60z" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    color: "border-blue-500/30 hover:border-blue-500",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 200 200" fill="none">
        <rect width="200" height="200" rx="40" fill="#3178c6" />
        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-bold text-white"
          fontSize="100"
        >
          TS
        </text>
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    color: "border-teal-500/30 hover:border-teal-500",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#06b6d4">
        <path d="M12 0C6.477 0 2 4.477 2 10c0 4.237 2.636 7.855 6.356 9.312-.088-.471-.17-.955-.202-1.43-.076-1.211.554-2.366 1.904-2.682 1.35-.316 2.726.233 3.34 1.672.368.838.88 1.432 1.664 1.902.784.47 1.82.546 2.78.202.96-.344 1.764-1.076 2.246-1.964.482-.888.647-1.984.495-3.076-.19-1.349-.844-2.56-1.762-3.434-.918-.875-2.16-1.432-3.464-1.584 1.075-1.213 1.734-2.868 1.734-4.686 0-3.866-3.134-7-7-7zm0 3c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4z" />
      </svg>
    ),
  },
  {
    name: "GSAP",
    color: "border-green-500/30 hover:border-green-500",
    icon: <Zap className="w-5 h-5 text-green-400" />,
  },
  {
    name: "JavaScript",
    color: "border-yellow-500/30 hover:border-yellow-500",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 100 100" fill="#f7df1e">
        <rect width="100" height="100" fill="#f7df1e" />
        <text x="50" y="65" textAnchor="middle" className="font-bold text-black" fontSize="50">
          JS
        </text>
      </svg>
    ),
  },
  {
    name: "HTML5",
    color: "border-orange-500/30 hover:border-orange-500",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#e34c26">
        <path d="M3 3h18v18H3V3zm15.5 12.5h-11l.5-5.5h10l-.5 5.5zm-1-8h-9l1-4.5h7l-1 4.5z" />
      </svg>
    ),
  },
  {
    name: "CSS3",
    color: "border-purple-500/30 hover:border-purple-500",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1572b6">
        <path d="M3 3h18v18H3V3zm13.5 12.5h-11l.5-5.5h10l-.5 5.5zm-1-8h-9l1-4.5h7l-1 4.5z" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    color: "border-green-600/30 hover:border-green-600",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#68a063">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6h1.5V7zm3 0h-1.5v6H15V7z" />
      </svg>
    ),
  },
  {
    name: "Git",
    color: "border-red-500/30 hover:border-red-500",
    icon: <GitBranch className="w-5 h-5 text-red-400" />,
  },
  {
    name: "Figma",
    color: "border-pink-500/30 hover:border-pink-500",
    icon: <Palette className="w-5 h-5 text-pink-400" />,
  },
  {
    name: "REST APIs",
    color: "border-indigo-500/30 hover:border-indigo-500",
    icon: <Network className="w-5 h-5 text-indigo-400" />,
  },
]

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current?.querySelectorAll(".title-line"),
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
        },
      )

      const skillItems = skillsRef.current?.querySelectorAll(".skill-item")
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
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="py-32 px-6 bg-secondary/20 relative">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="text-center mb-20">
          <div className="overflow-hidden">
            <span className="title-line inline-block text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium mb-4">
              CREATIVE SOLUTIONS
            </span>
          </div>
          <div className="overflow-hidden">
            <h2 className="title-line text-4xl md:text-5xl lg:text-6xl font-bold">SERVICES</h2>
          </div>
        </div>

        <div ref={skillsRef} className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className={`skill-item px-6 py-4 bg-card/50 backdrop-blur-sm rounded-full border ${skill.color} transition-all duration-500 cursor-default hover:scale-105 flex items-center gap-3`}
            >
              <div className="flex-shrink-0">{skill.icon}</div>
              <span className="font-medium text-foreground tracking-wide">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
