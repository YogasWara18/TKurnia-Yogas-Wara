"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Github } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "Website Redesign",
    description:
      "A complete redesign focusing on modern aesthetics and improved user experience with seamless animations.",
    image: "/modern-website-design-dark-ui-interface-minimalist.jpg",
    tags: ["Design", "Branding", "Development"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Brand Identity",
    description:
      "Comprehensive brand identity system including logo, colors, typography, and brand guidelines.",
    image: "/brand-identity-design-dark-minimalist-logo.jpg",
    tags: ["Branding", "Design", "Marketing"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Development",
    description:
      "Full-stack web application built with modern technologies and best practices for optimal performance.",
    image: "/development-code-editor-dark-theme-minimal.jpg",
    tags: ["Development", "React", "Node.js"],
    liveUrl: "#",
    githubUrl: "#",
  },
]

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      const titleLines = titleRef.current?.querySelectorAll(".title-line")
      if (titleLines && titleLines.length > 0) {
        gsap.fromTo(
          Array.from(titleLines),
          { y: 80, clipPath: "inset(100% 0% 0% 0%)" },
          {
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        )
      }

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll(".project-card")
      if (cards && cards.length > 0) {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
            }
          )

          const img = card.querySelector(".project-image")
          if (img) {
            gsap.to(img, {
              y: -30,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            })
          }
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div ref={titleRef} className="mb-20">
          <div className="overflow-hidden">
            <h2 className="title-line text-5xl md:text-6xl lg:text-7xl font-bold">Selected</h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="title-line text-5xl md:text-6xl lg:text-7xl font-bold text-primary/60 italic">
              Projects
            </h2>
          </div>
        </div>

        {/* Project cards */}
        <div ref={cardsRef} className="space-y-24">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`project-card grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`relative overflow-hidden rounded-3xl bg-card ${
                  index % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <div className="aspect-4/3 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="project-image w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                {/* Hover overlay */}
                <a
                  href={project.liveUrl}
                  className="absolute inset-0 bg-primary/0 hover:bg-primary/10 transition-all duration-500 flex items-center justify-center opacity-0 hover:opacity-100"
                >
                  <span className="px-6 py-3 bg-foreground text-background rounded-full font-medium">
                    View Project
                  </span>
                </a>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
                <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium mb-4 block">
                  Project 0{index + 1}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-secondary text-sm text-muted-foreground rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6">
                  <a
                    href={project.liveUrl}
                    className="group flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors duration-300"
                  >
                    View Details
                    <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <a
                    href={project.githubUrl}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    <Github className="w-5 h-5" />
                    Source
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}