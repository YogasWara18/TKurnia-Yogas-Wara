"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Jack Daniel’s - Modern Frontend Animation Build",
    description:
      "This website is built using Next.js for its fast and scalable React architecture, combined with GSAP for smooth, interactive animations. Styling is handled with TailwindCSS for responsiveness and consistency, while JavaScript and additional components deliver an elegant, modern, and extensible UI/UX experience.",
    video: "/video.mp4",
    tags: [
      "Design", 
      "Animation", 
      "Development", 
      "Branding", 
      "Responsive", 
      "Next.js", 
      "React", 
      "JavaScript", 
      "TailwindCSS", 
      "GSAP",
      "Vercel"],
    liveUrl: "https://jackdaniels-green.vercel.app/",
    githubUrl: "https://github.com/YogasWara18/jackDaniels",
  },
  {
    title: "Palm Hotel – Modern Build with Next.js & Cloud Integration",
    description:
      "The Palm Hotel website was developed using Next.js for performance and scalability, combined with TailwindCSS for responsive and consistent styling. The authentication system is managed with Auth.js, while Google Cloud and Neon are used for the backend and database infrastructure. Payment integration is handled through Midtrans, and the entire project was smoothly deployed using Vercel. This combination of technologies results in a modern, secure, and user friendly website.",
    video: "/video2.mp4",
    tags: [
      "Branding",
      "Design",
      "Marketing",
      "Development",
      "Payment",
      "Database",
      "Responsive",
      "Cloud",
      "Authentication",
      "Next.js",
      "React",
      "TypeScript",
      "TailwindCSS",
      "Vercel",
    ],
    liveUrl: "https://palm-hotel-apss.vercel.app/",
    githubUrl: "https://github.com/YogasWara18/Palm-Hotel",
  },
  {
    title: "Design Nature Interior - Full Frontend Build with Next.js",
    description:
      "This website is built using Next.js for its robust React framework, ensuring high performance and scalability. TailwindCSS is utilized for responsive and consistent styling across all devices. The site features smooth animations powered by GSAP, enhancing user engagement and interactivity. Deployed on Vercel, this project showcases a modern, elegant, and user-friendly interface for an interior design business.",    
    video: "/video3.mp4",
    tags: [
      "Design",
      "Animation",
      "Development",
      "Branding",
      "Responsive",
      "Next.js",
      "React",
      "TypeScript",
      "TailwindCSS",
    ],
    liveUrl: "https://design-nature-interior.vercel.app/",
    githubUrl: "https://github.com/YogasWara18/nature",
  }
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      const titleLines = titleRef.current?.querySelectorAll(".title-line");
      if (titleLines && titleLines.length > 0) {
        gsap.fromTo(
          titleLines,
          { y: 100, opacity: 0, scale: 0.95, clipPath: "inset(100% 0% 0% 0%)" },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );
      }

      const cards = cardsRef.current?.querySelectorAll(".project-card");
      cards?.forEach((card, index) => {
        const isEven = index % 2 === 0;

        gsap.fromTo(
          card,
          {
            x: isEven ? -100 : 100,
            y: 60,
            opacity: 0,
            rotationY: isEven ? 15 : -15,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            rotationY: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
          }
        );

        const videoContainer = card.querySelector(".video-container");
        const video = card.querySelector(".project-video");

        gsap.fromTo(
          videoContainer,
          {
            clipPath: "inset(20% 20% 20% 20%)",
            opacity: 0,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
          }
        );

        gsap.to(video, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });

        card.addEventListener("mouseenter", () => {
          gsap.to(videoContainer, {
            duration: 0.6,
            ease: "power2.out",
            boxShadow: "0 30px 60px rgba(168, 85, 247, 0.3)",
          });
          gsap.to(video, {
            duration: 0.6,
            ease: "power2.out",
            scale: 1.08,
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(videoContainer, {
            duration: 0.6,
            ease: "power2.out",
            boxShadow: "0 0px 0px rgba(168, 85, 247, 0)",
          });
          gsap.to(video, {
            duration: 0.6,
            ease: "power2.out",
            scale: 1,
          });
        });

        const contentElements = card.querySelectorAll(".content-animate");
        gsap.fromTo(
          contentElements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
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
      id="projects"
      className="py-32 px-6 relative overflow-hidden bg-checkerboard"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div ref={titleRef} className="mb-20">
          <div className="overflow-hidden">
            <h2 className="title-line text-5xl md:text-6xl lg:text-7xl font-bold">
              Web Development
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="title-line text-5xl md:text-6xl lg:text-7xl font-bold text-primary/60 italic">
              Showcase
            </h2>
          </div>
        </div>

        <div ref={cardsRef} className="space-y-24">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`project-card grid md:grid-cols-2 gap-12 items-center perspective`}
            >
              {/* Video */}
              <div
                className={`relative overflow-hidden rounded-3xl bg-card ${
                  index % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <div className="video-container relative aspect-4/3 overflow-hidden bg-black">
                  <video
                    src={project.video || "/placeholder.mp4"}
                    className="project-video w-full h-full object-contain transition-transform duration-500"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
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
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
                <span className="content-animate text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium mb-4 block">
                  My Project{index + 1}
                </span>
                <h3 className="content-animate text-3xl md:text-4xl font-bold mb-4">
                  {project.title}
                </h3>
                <p className="content-animate text-muted-foreground text-lg leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="content-animate flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-secondary text-sm text-muted-foreground rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="content-animate flex items-center gap-6">
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
  );
}
