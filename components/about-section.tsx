"use client";

import React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-flip";
import { Navigation, Pagination, Autoplay, EffectFlip, FreeMode } from "swiper/modules";
import {
  Award,
  Code,
  Users,
  Briefcase,
  Sparkles,
  Zap,
  Layers,
  Cpu,
  TrendingUp,
  Coffee,
  Rocket,
  Hexagon,
  Braces,
  Terminal,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Data skills
const skillsData = [
  {
    name: "React",
    icon: "/react.png",
    level: 92,
    color: "#61DAFB",
    description: "Hooks, Context, Performance",
  },
  {
    name: "Next.js",
    icon: "/next.js.png",
    level: 88,
    color: "#000000",
    description: "App Router, SSR, ISR",
  },
  {
    name: "TypeScript",
    icon: "/typeScript.png",
    level: 85,
    color: "#3178C6",
    description: "Types, Generics, Utility",
  },
  {
    name: "Tailwind CSS",
    icon: "/tailwind.png",
    level: 90,
    color: "#06B6D4",
    description: "Utility-first, Responsive",
  },
  {
    name: "GSAP",
    icon: "/gsap.png",
    level: 87,
    color: "#88CE02",
    description: "ScrollTrigger, Timeline",
  },
  {
    name: "Node.js",
    icon: "/nodejs.png",
    level: 82,
    color: "#339933",
    description: "Express, REST API",
  },
  {
    name: "WordPress",
    icon: "/Wordpress.png",
    level: 85,
    color: "#21759B",
    description: "Themes, Plugins, ACF",
  },
  {
    name: "Figma",
    icon: "/figma.png",
    level: 80,
    color: "#F24E1E",
    description: "Design, Prototyping",
  },
];

const certificates = [
  "/CertificatePWD.jpg",
  "/HTML-Sololearn.jpg",
  "/CSS-Sololearn.jpg",
  "/JavaScript-Sololearn.jpg",
];

export default function AboutSkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const skillsContainerRef = useRef<HTMLDivElement>(null);
  const certificateRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const floatingShapesRef = useRef<HTMLDivElement>(null);
  const progressCirclesRef = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    progressCirclesRef.current = progressCirclesRef.current.slice(0, skillsData.length);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tlMain = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      if (bioRef.current) {
        tlMain.fromTo(
          bioRef.current,
          { y: 60, opacity: 0, filter: "blur(12px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" }
        );
      }

      const statChildren = statsRef.current?.children;
      if (statChildren && statChildren.length) {
        tlMain.fromTo(
          statChildren,
          { y: 40, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: "back.out(1.5)" },
          "-=0.6"
        );
      }

      const skillCards = skillsContainerRef.current?.querySelectorAll(".skill-card");
      if (skillCards && skillCards.length) {
        gsap.fromTo(
          skillCards,
          { y: 70, opacity: 0, rotationX: -25, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.1,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: skillsContainerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (certificateRef.current) {
        gsap.fromTo(
          certificateRef.current,
          { scale: 0.85, opacity: 0, rotationY: -15 },
          {
            scale: 1,
            opacity: 1,
            rotationY: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: certificateRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (floatingShapesRef.current) {
        const shapes = floatingShapesRef.current.children;
        if (shapes.length) {
          gsap.to(shapes, {
            y: "random(-30, 30)",
            x: "random(-20, 20)",
            rotation: "random(-15, 15)",
            duration: "random(4, 8)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.3,
          });
        }
      }
    }, sectionRef);

    if (particlesRef.current) {
      const particles = particlesRef.current.children;
      if (particles.length) {
        gsap.to(particles, {
          y: -250,
          rotation: 360,
          opacity: 0,
          duration: 5,
          stagger: { amount: 2, from: "random" },
          ease: "power1.out",
          repeat: -1,
          repeatDelay: 1.5,
        });
      }
    }

    skillsData.forEach((skill, idx) => {
      const circle = progressCirclesRef.current[idx];
      if (circle) {
        const radius = 35;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (skill.level / 100) * circumference;
        gsap.fromTo(
          circle,
          { strokeDashoffset: circumference },
          {
            strokeDashoffset: offset,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: circle,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-16 sm:py-20 md:py-28 lg:py-32 xl:py-40 overflow-hidden bg-gradient-to-br from-slate-950 via-background to-slate-950"
    >
      {/* Particle background (15 butir) */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? "#84cc16" : "#eab308",
              opacity: 0.25,
              willChange: "transform",
            }}
          />
        ))}
      </div>

      {/* Floating shapes dekoratif */}
      <div
        ref={floatingShapesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute text-lime-500/10 will-change-transform"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 30 + 20}px`,
            }}
          >
            {i % 2 === 0 ? (
              <Hexagon className="w-full h-full" />
            ) : (
              <Braces className="w-full h-full" />
            )}
          </div>
        ))}
      </div>

      {/* Orbs besar */}
      <div
        className="absolute top-1/4 -left-80 w-[400px] md:w-[500px] h-[400px] md:h-[500px] bg-lime-500/10 rounded-full blur-3xl mix-blend-screen animate-pulse"
        style={{ animationDuration: "8s" }}
      />
      <div
        className="absolute bottom-1/4 -right-80 w-[400px] md:w-[500px] h-[400px] md:h-[500px] bg-yellow-500/10 rounded-full blur-3xl mix-blend-screen animate-pulse"
        style={{ animationDuration: "10s", animationDelay: "1s" }}
      />

      {/* Grid garis */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(transparent, transparent 50px, rgba(132,204,22,0.15) 50px, rgba(132,204,22,0.15) 51px), repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(234,179,8,0.15) 50px, rgba(234,179,8,0.15) 51px)`,
        }}
      />

      <div className="container relative z-10 px-4 sm:px-6 mx-auto">
        {/* BIO SECTION */}
        <div className="max-w-5xl mx-auto text-center mb-16 md:mb-20 lg:mb-24 xl:mb-28">
          <div ref={bioRef} className="space-y-4 md:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2 rounded-full bg-gradient-to-r from-lime-500/20 to-yellow-500/20 border border-lime-500/40 backdrop-blur-sm shadow-lg shadow-lime-500/10">
              <Rocket className="w-3 h-3 md:w-4 md:h-4 text-lime-400" />
              <span className="text-[10px] md:text-xs font-bold text-lime-400 tracking-wider">
                ABOUT ME 
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black tracking-tighter">
              <span className="bg-gradient-to-r from-lime-400 via-yellow-400 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
               Who Am I
              </span>
            </h2>
            <div className="relative inline-block mx-auto">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed">
                I'm <span className="text-lime-400 font-bold">Yogas</span> a
                creative engineer who transforms
                <span className="text-yellow-400 font-bold"> complex ideas </span>
                into
                <span className="text-cyan-400 font-bold"> high impact digital experiences.</span>
              </p>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-lime-500 to-transparent" />
            </div>
          </div>

          {/* Stats Cards */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mt-10 md:mt-12 lg:mt-16"
          >
            {[
              { icon: Code, label: "Projects", value: "15+", desc: "Completed", color: "lime" },
              { icon: Users, label: "Clients", value: "10+", desc: "Happy", color: "yellow" },
              { icon: Award, label: "Certs", value: "4", desc: "Global", color: "lime" },
              { icon: TrendingUp, label: "Experience", value: "2+", desc: "Years", color: "yellow" },
            ].map((stat, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-xl md:rounded-2xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-md border border-white/10 p-3 sm:p-4 md:p-5 lg:p-6 text-center transition-all duration-500 hover:scale-105 hover:border-lime-500/40 hover:shadow-xl hover:shadow-lime-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-lime-500/0 via-lime-500/10 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <stat.icon
                  className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-${stat.color}-400 mx-auto mb-1 md:mb-2 lg:mb-3 group-hover:scale-110 transition-transform duration-300`}
                />
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-muted-foreground/80 mt-0.5 md:mt-1">
                  {stat.label}
                </div>
                <div className="text-[10px] sm:text-xs text-muted-foreground/50">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SKILLS + CERTIFICATES */}
        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* Skills kolom kiri */}
          <div>
            <div className="flex items-center gap-2 md:gap-3 mb-5 md:mb-6 lg:mb-8">
              <div className="p-1.5 md:p-2 rounded-xl bg-gradient-to-br from-lime-500/20 to-yellow-500/20 border border-lime-500/40">
                <Cpu className="w-4 h-4 md:w-5 md:h-5 text-lime-400" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground">
                Core Competencies
              </h3>
            </div>
            <div
              ref={skillsContainerRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 lg:gap-5"
            >
              {skillsData.map((skill, idx) => {
                const radius = 30;
                const circumference = 2 * Math.PI * radius;
                return (
                  <div
                    key={skill.name}
                    className="skill-card group relative p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-md border border-white/10 hover:border-lime-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-lime-500/10 overflow-hidden"
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex-shrink-0">
                        <svg
                          className="w-full h-full transform -rotate-90"
                          viewBox="0 0 80 80"
                        >
                          <circle
                            cx="40"
                            cy="40"
                            r={radius}
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="5"
                          />
                          <circle
                            ref={(el) => {
                              progressCirclesRef.current[idx] = el;
                            }}
                            cx="40"
                            cy="40"
                            r={radius}
                            fill="none"
                            stroke={skill.color}
                            strokeWidth="5"
                            strokeDasharray={circumference}
                            strokeDashoffset={circumference}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 object-contain"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-foreground/90 text-xs sm:text-sm md:text-base">
                            {skill.name}
                          </span>
                          <span className="text-[10px] md:text-xs font-mono text-lime-400">
                            {skill.level}%
                          </span>
                        </div>
                        <p className="text-[8px] md:text-[10px] text-muted-foreground/50 mt-0.5 line-clamp-1">
                          {skill.description}
                        </p>
                        <div className="w-full h-1 bg-white/10 rounded-full mt-1.5 md:mt-2 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-lime-500 to-yellow-500"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-lime-500/0 via-lime-500/5 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Certificates kolom kanan */}
          <div>
            <div className="flex items-center gap-2 md:gap-3 mb-5 md:mb-6 lg:mb-8">
              <div className="p-1.5 md:p-2 rounded-xl bg-gradient-to-br from-yellow-500/20 to-cyan-500/20 border border-yellow-500/40">
                <Zap className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground">
                Verified Credentials
              </h3>
            </div>
            <div ref={certificateRef} className="relative perspective-1000">
              <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFlip]}
                effect="flip"
                flipEffect={{ slideShadows: true, limitRotation: true }}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true, dynamicBullets: true }}
                navigation={{
                  prevEl: ".swiper-button-prev-custom",
                  nextEl: ".swiper-button-next-custom",
                }}
                className="w-full rounded-xl md:rounded-2xl overflow-hidden shadow-2xl"
              >
                {certificates.map((src, i) => (
                  <SwiperSlide key={i}>
                    <div className="relative aspect-[4/3] rounded-lg md:rounded-xl overflow-hidden border-2 border-lime-500/30 bg-black/50 transform transition-all duration-500 hover:scale-[1.02]">
                      <img
                        src={src}
                        alt={`Certificate ${i + 1}`}
                        className="w-full h-full object-contain p-3 md:p-4 lg:p-6"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                        <span className="text-[8px] md:text-[10px] font-mono text-white/70 bg-black/50 px-1.5 py-0.5 rounded-full">
                          Verified
                        </span>
                        <span className="text-[8px] md:text-[10px] font-mono text-lime-400 bg-black/50 px-1.5 py-0.5 rounded-full">
                          #{i + 1}
                        </span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <button className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-black/60 backdrop-blur-sm border border-lime-500/50 flex items-center justify-center hover:bg-lime-500/30 hover:scale-110 transition-all duration-300 focus:outline-none">
                <svg
                  className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-lime-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-black/60 backdrop-blur-sm border border-yellow-500/50 flex items-center justify-center hover:bg-yellow-500/30 hover:scale-110 transition-all duration-300 focus:outline-none">
                <svg
                  className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <div className="absolute -inset-0.5 rounded-xl md:rounded-2xl bg-gradient-to-r from-lime-500 to-yellow-500 opacity-20 blur-xl -z-10" />
              <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 border-r-2 border-b-2 border-lime-500/50 rounded-br-xl md:rounded-br-2xl" />
              <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 border-l-2 border-t-2 border-yellow-500/50 rounded-tl-xl md:rounded-tl-2xl" />
            </div>
          </div>
        </div>

        {/* Tech Stack Carousel - berjalan tanpa henti */}
        <div className="mt-16 md:mt-20 lg:mt-24 xl:mt-28 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <Terminal className="w-3 h-3 md:w-4 md:h-4 text-lime-400" />
            <span className="text-[10px] md:text-xs font-semibold text-muted-foreground/70">
              TOOLKIT & TECH STACK
            </span>
          </div>
          <div className="relative mt-4 md:mt-6">
            <Swiper
              modules={[Autoplay, FreeMode]}
              spaceBetween={12}
              slidesPerView="auto"
              loop={true}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                stopOnLastSlide: false,
              }}
              speed={5000}
              freeMode={true}
              className="tech-stack-swiper"
            >
              {[
                "HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js",
                "Tailwind CSS", "Bootstrap", "Node.js", "PostgreSQL", "REST API",
                "GIT", "GITHUB", "GSAP", "Framer Motion", "Figma", "WordPress",
                "Elementor", "YOAST SEO", "Vercel"
              ].map((tech, idx) => (
                <SwiperSlide key={idx} className="!w-auto">
                  <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs rounded-full bg-white/5 border border-white/10 text-muted-foreground/70 hover:border-lime-500/50 hover:text-lime-400 transition-all duration-300 whitespace-nowrap">
                    {tech}
                  </span>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Efek gradasi di tepi */}
            <div className="absolute inset-y-0 left-0 w-12 md:w-20 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-12 md:w-20 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .skill-card {
          transform-style: preserve-3d;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .skill-card:hover {
          transform: translateY(-4px);
        }
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.4);
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #84cc16 !important;
        }
        .swiper-button-prev-custom,
        .swiper-button-next-custom {
          cursor: pointer;
        }
      `}</style>
    </section>
  );
}