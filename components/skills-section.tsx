"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "HTML5", icon: "/html.png", category: "Frontend" },
  { name: "CSS3", icon: "/css.png", category: "Frontend" },
  { name: "JavaScript", icon: "/javaScript.png", category: "Frontend" },
  { name: "TypeScript", icon: "/typeScript.png", category: "Frontend" },
  { name: "React", icon: "/react.png", category: "Frontend" },
  { name: "Next.js", icon: "/next.js.png", category: "Frontend" },
  { name: "Tailwind CSS", icon: "/tailwind.png", category: "Frontend" },
  { name: "Bootstrap", icon: "/bootstrap.png", category: "Frontend" },
  { name: "Node.js", icon: "/nodejs.png", category: "Backend" },
  { name: "PostgreSQL", icon: "/posgressql.png", category: "Backend" },
  { name: "REST API", icon: "/api.png", category: "Backend" },
  { name: "Git", icon: "/git.png", category: "Tools" },
  { name: "GitHub", icon: "/github.jpg", category: "Tools" },
  { name: "Vercel", icon: "/vercel.png", category: "DevOps" },
  { name: "Figma", icon: "/figma.png", category: "Design" },
  { name: "WordPress", icon: "/Wordpress.png", category: "CMS" },
  { name: "Elementor Pro", icon: "/Elementor.png", category: "CMS" },
  { name: "Yoast SEO", icon: "/YoastSEO.png", category: "CMS" },
  { name: "GSAP", icon: "/gsap.png", category: "Animation" },
];

const categories = [...new Set(skills.map((s) => s.category))];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline utama dengan timing yang sama seperti about section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Title reveal - sama seperti about section
      tl.fromTo(
        titleRef.current,
        {
          y: 40,
          opacity: 0,
          filter: "blur(10px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
        },
      );

      // Skills stagger dengan efek back.out - sama seperti about section
      const skillItems = skillsRef.current?.querySelectorAll(".skill-item");
      if (skillItems) {
        tl.fromTo(
          skillItems,
          {
            y: 30,
            opacity: 0,
            scale: 0.95,
            filter: "blur(5px)",
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.05,
            ease: "back.out(1.7)",
          },
          "-=0.4",
        );
      }
    }, sectionRef);

    // Particle animation - sama seperti hero dan about section
    if (particlesRef.current) {
      const particles = particlesRef.current.children;
      gsap.to(particles, {
        y: -150,
        rotation: 360,
        opacity: 0,
        duration: 3,
        stagger: {
          amount: 2,
          from: "random",
        },
        ease: "power2.out",
        repeat: -1,
      });
    }

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen py-32 overflow-hidden bg-background"
    >
      {/* Particle Background - sama seperti about section */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? "#84cc16" : "#eab308",
              opacity: 0.2,
              animation: `float-particle 10s linear infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs - sama seperti about section */}
      <div className="absolute top-20 left-20 w-[30rem] h-[30rem] bg-lime-500/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-20 w-[25rem] h-[25rem] bg-yellow-500/10 rounded-full blur-3xl animate-float" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-lime-500/5 rounded-full blur-3xl animate-pulse-glow"
        style={{ animationDelay: "2s" }}
      />

      {/* Grid Overlay - sama seperti about section */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(132, 204, 22, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(234, 179, 8, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Subtle gradient overlay - sama seperti about section */}
      <div className="absolute inset-0 bg-gradient-to-br from-lime-500/5 via-transparent to-transparent" />

      {/* Light leak effect - sama seperti about section */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-yellow-500/10 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-lime-500/10 to-transparent blur-3xl" />

      <div className="container relative z-10">
        {/* Title dengan posisi tengah */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-sm font-medium tracking-wider bg-gradient-to-r from-lime-500 to-yellow-500 bg-clip-text text-transparent">
            EXPERTISE
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mt-3">
            Skills & Technologies
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-lime-500 to-yellow-500 rounded-full mx-auto mt-4" />
        </div>

        {/* Skills by category - dengan posisi tengah dan jarak proporsional */}
        <div ref={skillsRef} className="space-y-10 max-w-4xl mx-auto">
          {categories.map((category, index) => (
            <div key={category} className="text-center">
              <h3
                className={`text-lg font-medium mb-5 ${
                  index % 2 === 0 ? "text-lime-500" : "text-yellow-500"
                }`}
              >
                {category}
              </h3>

              <div className="flex flex-wrap justify-center gap-3">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill, skillIndex) => (
                    <div
                      key={skill.name}
                      className={`skill-item group flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-500 cursor-default border ${
                        skillIndex % 2 === 0
                          ? "bg-lime-500/5 hover:bg-lime-500/10 border-lime-500/20"
                          : "bg-yellow-500/5 hover:bg-yellow-500/10 border-yellow-500/20"
                      }`}
                    >
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-5 h-5 object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                      <span
                        className={`text-sm font-medium ${
                          skillIndex % 2 === 0
                            ? "text-lime-500"
                            : "text-yellow-500"
                        }`}
                      >
                        {skill.name}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats dengan warna green yellow */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            {
              label: "Frontend",
              value: "95%",
              color: "from-lime-500 to-yellow-500",
            },
            {
              label: "Backend",
              value: "85%",
              color: "from-yellow-500 to-lime-500",
            },
            {
              label: "Design",
              value: "80%",
              color: "from-lime-500 to-yellow-500",
            },
            {
              label: "Tools",
              value: "90%",
              color: "from-yellow-500 to-lime-500",
            },
          ].map((stat, i) => {
            // Buat ref untuk setiap elemen yang akan dianimasi
            const valueRef = useRef<HTMLDivElement>(null);
            const progressRef = useRef<HTMLDivElement>(null);
            const cardRef = useRef<HTMLDivElement>(null);

            useEffect(() => {
              // Animasi untuk angka (counting)
              if (valueRef.current) {
                const targetValue = parseInt(stat.value);
                let currentValue = 0;

                gsap.to(
                  {},
                  {
                    duration: 2,
                    ease: "power2.out",
                    onUpdate: function () {
                      currentValue = Math.floor(this.progress() * targetValue);
                      if (valueRef.current) {
                        valueRef.current.textContent = currentValue + "%";
                      }
                    },
                    onComplete: () => {
                      if (valueRef.current) {
                        valueRef.current.textContent = stat.value;
                      }
                    },
                    scrollTrigger: {
                      trigger: cardRef.current,
                      start: "top 85%",
                      end: "bottom 20%",
                      toggleActions: "play none none reverse",
                    },
                  },
                );
              }

              // Animasi untuk progress bar
              if (progressRef.current) {
                gsap.fromTo(
                  progressRef.current,
                  { width: "0%" },
                  {
                    width: stat.value,
                    duration: 2,
                    ease: "power2.out",
                    scrollTrigger: {
                      trigger: cardRef.current,
                      start: "top 85%",
                      end: "bottom 20%",
                      toggleActions: "play none none reverse",
                    },
                  },
                );
              }

              // Animasi untuk card
              if (cardRef.current) {
                gsap.fromTo(
                  cardRef.current,
                  {
                    y: 30,
                    opacity: 0,
                    scale: 0.9,
                    filter: "blur(5px)",
                  },
                  {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                      trigger: cardRef.current,
                      start: "top 85%",
                      end: "bottom 20%",
                      toggleActions: "play none none reverse",
                    },
                  },
                );
              }
            }, []);

            return (
              <div
                key={stat.label}
                ref={cardRef}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div
                  ref={valueRef}
                  className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                >
                  0%
                </div>
                <div className="text-xs text-muted-foreground/60 mt-1">
                  {stat.label}
                </div>
                <div className="w-full h-1.5 bg-gradient-to-r from-lime-500/10 to-yellow-500/10 rounded-full mt-2 overflow-hidden">
                  <div
                    ref={progressRef}
                    className={`h-full rounded-full bg-gradient-to-r ${
                      i % 2 === 0
                        ? "from-lime-500 to-yellow-500"
                        : "from-yellow-500 to-lime-500"
                    }`}
                    style={{ width: "0%" }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Decorative bottom line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-lime-500/30 to-transparent" />
      </div>

      <style jsx>{`
        @keyframes float-particle {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.3;
          }
          80% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-120px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.3;
            filter: blur(80px);
          }
          50% {
            opacity: 0.5;
            filter: blur(100px);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .skill-item {
          transition: all 0.3s ease;
        }

        .skill-item:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}
