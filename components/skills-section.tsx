"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const skills = [
  { name: "React", color: "border-cyan-500/30 hover:border-cyan-500" },
  { name: "Next.js", color: "border-zinc-500/30 hover:border-zinc-400" },
  { name: "TypeScript", color: "border-blue-500/30 hover:border-blue-500" },
  { name: "Tailwind CSS", color: "border-teal-500/30 hover:border-teal-500" },
  { name: "GSAP", color: "border-green-500/30 hover:border-green-500" },
  { name: "JavaScript", color: "border-yellow-500/30 hover:border-yellow-500" },
  { name: "HTML5", color: "border-orange-500/30 hover:border-orange-500" },
  { name: "CSS3", color: "border-purple-500/30 hover:border-purple-500" },
  { name: "Node.js", color: "border-green-600/30 hover:border-green-600" },
  { name: "Git", color: "border-red-500/30 hover:border-red-500" },
  { name: "Figma", color: "border-pink-500/30 hover:border-pink-500" },
  { name: "REST APIs", color: "border-indigo-500/30 hover:border-indigo-500" },
]

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      const titleLines = titleRef.current?.querySelectorAll(".title-line")
      if (titleLines && titleLines.length > 0) {
        gsap.fromTo(
          Array.from(titleLines),
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
        )
      }

      // Skill items animation
      const skillItems = skillsRef.current?.querySelectorAll(".skill-item")
      if (skillItems && skillItems.length > 0) {
        gsap.fromTo(
          Array.from(skillItems),
          { y: 40, opacity: 0, scale: 0.9 },
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
        )
      }
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
              className={`skill-item px-8 py-4 bg-card/50 backdrop-blur-sm rounded-full border ${skill.color} transition-all duration-500 cursor-default hover:scale-105`}
            >
              <span className="font-medium text-foreground tracking-wide">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}