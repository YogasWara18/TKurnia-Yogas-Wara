"use client";

import React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFlip, FreeMode } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";
// @ts-ignore
import "swiper/css/effect-flip";
import {
  Award,
  Code,
  Users,
  Zap,
  Cpu,
  TrendingUp,
  Rocket,
  Hexagon,
  Braces,
  Terminal,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  { name: "React", icon: "/react.png", level: 92, color: "#61DAFB", description: "Hooks, Context, Performance" },
  { name: "Next.js", icon: "/next.js.png", level: 88, color: "#000000", description: "App Router, SSR, ISR" },
  { name: "TypeScript", icon: "/typeScript.png", level: 85, color: "#3178C6", description: "Types, Generics, Utility" },
  { name: "Tailwind CSS", icon: "/tailwind.png", level: 90, color: "#06B6D4", description: "Utility-first, Responsive" },
  { name: "GSAP", icon: "/gsap.png", level: 87, color: "#88CE02", description: "ScrollTrigger, Timeline" },
  { name: "Node.js", icon: "/nodejs.png", level: 82, color: "#339933", description: "Express, REST API" },
  { name: "WordPress", icon: "/Wordpress.png", level: 85, color: "#21759B", description: "Themes, Plugins, ACF" },
  { name: "Figma", icon: "/figma.png", level: 80, color: "#F24E1E", description: "Design, Prototyping" },
];

const certificates = ["/CertificatePWD.jpg", "/HTML-Sololearn.jpg", "/CSS-Sololearn.jpg", "/JavaScript-Sololearn.jpg"];

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
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", end: "bottom 20%", toggleActions: "play none none reverse" },
      });
      if (bioRef.current) {
        tlMain.fromTo(bioRef.current, { y: 60, opacity: 0, filter: "blur(12px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" });
      }
      const statChildren = statsRef.current?.children;
      if (statChildren && statChildren.length) {
        tlMain.fromTo(statChildren, { y: 40, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: "back.out(1.5)" }, "-=0.6");
      }
      const skillCards = skillsContainerRef.current?.querySelectorAll(".skill-card");
      if (skillCards && skillCards.length) {
        gsap.fromTo(skillCards, { y: 70, opacity: 0, rotationX: -25, filter: "blur(8px)" }, {
          y: 0, opacity: 1, rotationX: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.1, ease: "back.out(1.2)",
          scrollTrigger: { trigger: skillsContainerRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        });
      }
      if (certificateRef.current) {
        gsap.fromTo(certificateRef.current, { scale: 0.85, opacity: 0, rotationY: -15 }, { scale: 1, opacity: 1, rotationY: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: certificateRef.current, start: "top 85%", toggleActions: "play none none reverse" } });
      }
      if (floatingShapesRef.current) {
        const shapes = floatingShapesRef.current.children;
        if (shapes.length) {
          gsap.to(shapes, { y: "random(-30, 30)", x: "random(-20, 20)", rotation: "random(-15, 15)", duration: "random(4, 8)", repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.3 });
        }
      }
    }, sectionRef);

    if (particlesRef.current) {
      const particles = particlesRef.current.children;
      if (particles.length) {
        gsap.to(particles, { y: -250, rotation: 360, opacity: 0, duration: 5, stagger: { amount: 2, from: "random" }, ease: "power1.out", repeat: -1, repeatDelay: 1.5 });
      }
    }

    skillsData.forEach((skill, idx) => {
      const circle = progressCirclesRef.current[idx];
      if (circle) {
        const radius = 35;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (skill.level / 100) * circumference;
        gsap.fromTo(circle, { strokeDashoffset: circumference }, { strokeDashoffset: offset, duration: 2, ease: "power2.out", scrollTrigger: { trigger: circle, start: "top 85%", toggleActions: "play none none reverse" } });
      }
    });

    return () => { ctx.revert(); ScrollTrigger.getAll().forEach(trigger => trigger.kill()); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 overflow-x-hidden bg-gradient-to-br from-slate-950 via-slate-950 to-slate-950"
    >
      {/* Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? "#84cc16" : "#eab308",
              opacity: 0.2,
            }}
          />
        ))}
      </div>

      {/* Floating shapes — tablet & desktop only */}
      <div ref={floatingShapesRef} className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
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
            {i % 2 === 0 ? <Hexagon className="w-full h-full" /> : <Braces className="w-full h-full" />}
          </div>
        ))}
      </div>

      {/* Orbs */}
      <div
        className="absolute top-1/4 -left-32 sm:-left-48 md:-left-64 lg:-left-80
          w-[220px] sm:w-[320px] md:w-[400px] lg:w-[500px]
          h-[220px] sm:h-[320px] md:h-[400px] lg:h-[500px]
          bg-lime-500/10 rounded-full blur-3xl mix-blend-screen animate-pulse"
        style={{ animationDuration: "8s" }}
      />
      <div
        className="absolute bottom-1/4 -right-32 sm:-right-48 md:-right-64 lg:-right-80
          w-[220px] sm:w-[320px] md:w-[400px] lg:w-[500px]
          h-[220px] sm:h-[320px] md:h-[400px] lg:h-[500px]
          bg-yellow-500/10 rounded-full blur-3xl mix-blend-screen animate-pulse"
        style={{ animationDuration: "10s", animationDelay: "1s" }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(transparent, transparent 50px, rgba(132,204,22,0.15) 50px, rgba(132,204,22,0.15) 51px),
            repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(234,179,8,0.15) 50px, rgba(234,179,8,0.15) 51px)
          `,
        }}
      />

      <div className="container relative z-10 px-4 sm:px-6 md:px-8 mx-auto max-w-6xl">

        {/* BIO SECTION */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14 md:mb-16 lg:mb-20">
          <div ref={bioRef} className="space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
              bg-gradient-to-r from-lime-500/20 to-yellow-500/20
              border border-lime-500/40 backdrop-blur-sm shadow-lg shadow-lime-500/10">
              <Rocket className="w-3.5 h-3.5 text-lime-400" />
              <span className="text-[10px] sm:text-xs font-bold text-lime-400 tracking-wider">Crafting Digital Experiences</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">
              <span className="bg-gradient-to-r from-lime-400 via-yellow-400 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                My Journey
              </span>
            </h2>

            <div className="relative">
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed">
                I'm <span className="text-lime-400 font-bold">Yogas</span>  a Frontend Developer who blends technical precision with creative strategy to craft seamless digital experiences.
                <span className="text-yellow-400 font-bold"> From dynamic UI animations to accessible design systems </span> I ensure every project balances innovation
                <span className="text-cyan-400 font-bold"> functionality, and storytelling.</span>
              </p>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-lime-500 to-transparent" />
            </div>
          </div>

          {/* Stats Grid */}
          <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-12">
            {[
              { icon: Code,       label: "Projects",   value: "15+", desc: "Completed", color: "lime"   },
              { icon: Users,      label: "Clients",    value: "10+", desc: "Happy",     color: "yellow" },
              { icon: Award,      label: "Certs",      value: "4",   desc: "Global",    color: "lime"   },
              { icon: TrendingUp, label: "Experience", value: "2+",  desc: "Years",     color: "yellow" },
            ].map((stat, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-xl md:rounded-2xl
                  bg-gradient-to-br from-white/5 to-white/0
                  backdrop-blur-md border border-white/10 p-4 sm:p-5 text-center
                  transition-all duration-500
                  hover:scale-105 hover:border-lime-500/40 hover:shadow-xl hover:shadow-lime-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-lime-500/0 via-lime-500/10 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <stat.icon
                  className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8
                    ${stat.color === "lime" ? "text-lime-400" : "text-yellow-400"}
                    mx-auto mb-2 group-hover:scale-110 transition-transform duration-300`}
                />
                <div className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground">{stat.value}</div>
                <div className="text-xs sm:text-sm font-semibold text-muted-foreground/80 mt-1">{stat.label}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground/50">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SKILLS + CERTIFICATES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-start">

          {/* Skills */}
          <div>
            <div className="flex items-center gap-2.5 mb-6 sm:mb-7 md:mb-8">
              <div className="p-2 rounded-xl bg-gradient-to-br from-lime-500/20 to-yellow-500/20 border border-lime-500/40">
                <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-lime-400" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-foreground">Core Competencies</h3>
            </div>

            <div ref={skillsContainerRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {skillsData.map((skill, idx) => {
                const radius = 30;
                const circumference = 2 * Math.PI * radius;
                return (
                  <div
                    key={skill.name}
                    className="skill-card group relative p-3 sm:p-4
                      rounded-xl md:rounded-2xl
                      bg-gradient-to-br from-white/5 to-white/0
                      backdrop-blur-md border border-white/10
                      hover:border-lime-500/50
                      transition-all duration-500
                      hover:shadow-xl hover:shadow-lime-500/10 overflow-hidden"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                          <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
                          <circle
                            ref={(el) => { progressCirclesRef.current[idx] = el; }}
                            cx="40" cy="40" r={radius}
                            fill="none" stroke={skill.color}
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
                            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 object-contain"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center gap-1 mb-1">
                          <span className="font-bold text-foreground/90 text-xs sm:text-sm md:text-base truncate">{skill.name}</span>
                          <span className="text-[10px] sm:text-xs font-mono text-lime-400 shrink-0">{skill.level}%</span>
                        </div>
                        <p className="text-[10px] sm:text-xs text-muted-foreground/50 line-clamp-1 mb-1.5">{skill.description}</p>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
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

          {/* Certificates */}
         {/* Certificates */}
<div>
  <div className="flex items-center gap-2.5 mb-6 sm:mb-7 md:mb-8">
    <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-500/20 to-cyan-500/20 border border-yellow-500/40">
      <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
    </div>
    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-foreground">Verified Certificate </h3>
  </div>

  <div ref={certificateRef} className="relative perspective-1000 w-full">
    {/* Wrapper dengan tinggi eksplisit agar Swiper flip tidak collapse */}
    <div className="w-full h-[220px] sm:h-[280px] md:h-[340px] lg:h-[360px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFlip]}
        effect="flip"
        flipEffect={{ slideShadows: false, limitRotation: true }}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        style={{ width: "100%", height: "100%" }}
        className="rounded-xl md:rounded-2xl overflow-hidden shadow-2xl"
      >
        {certificates.map((src, i) => (
          <SwiperSlide
            key={i}
            style={{ width: "100%", height: "100%" }}
          >
            <div className="relative w-full h-full rounded-lg md:rounded-xl overflow-hidden border-2 border-lime-500/30 bg-black/60">
              <img
                src={src}
                alt={`Certificate ${i + 1}`}
                className="w-full h-full object-contain"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                <span className="text-[10px] sm:text-xs font-mono text-white/70 bg-black/50 px-2 py-0.5 rounded-full">
                  Verified
                </span>
                <span className="text-[10px] sm:text-xs font-mono text-lime-400 bg-black/50 px-2 py-0.5 rounded-full">
                  #{i + 1}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

    {/* Nav buttons */}
    <button className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 z-10
      w-8 h-8 sm:w-9 sm:h-9 rounded-full
      bg-black/60 backdrop-blur-sm border border-lime-500/50
      flex items-center justify-center
      hover:bg-lime-500/30 hover:scale-110 transition-all duration-300 focus:outline-none">
      <svg className="w-4 h-4 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 z-10
      w-8 h-8 sm:w-9 sm:h-9 rounded-full
      bg-black/60 backdrop-blur-sm border border-yellow-500/50
      flex items-center justify-center
      hover:bg-yellow-500/30 hover:scale-110 transition-all duration-300 focus:outline-none">
      <svg className="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <div className="absolute -inset-0.5 rounded-xl md:rounded-2xl bg-gradient-to-r from-lime-500 to-yellow-500 opacity-20 blur-xl -z-10" />
    <div className="absolute -bottom-2 -right-2 w-10 h-10 sm:w-12 sm:h-12 border-r-2 border-b-2 border-lime-500/50 rounded-br-xl" />
    <div className="absolute -top-2 -left-2 w-10 h-10 sm:w-12 sm:h-12 border-l-2 border-t-2 border-yellow-500/50 rounded-tl-xl" />
  </div>
</div>
        </div>

        {/* TECH STACK CAROUSEL */}
        <div className="mt-14 sm:mt-16 md:mt-20 text-center w-full">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <Terminal className="w-3.5 h-3.5 text-lime-400" />
            <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground/70">TOOLKIT & TECH STACK</span>
          </div>

          <div className="relative mt-4 sm:mt-5 md:mt-6 w-full">
            <Swiper
              modules={[Autoplay, FreeMode]}
              spaceBetween={8}
              slidesPerView="auto"
              loop={true}
              autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true, stopOnLastSlide: false }}
              speed={5000}
              freeMode={true}
              className="tech-stack-swiper w-full"
            >
              {[
                "HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js",
                "Tailwind CSS", "Bootstrap", "Node.js", "PostgreSQL", "REST API",
                "GIT", "GITHUB", "GSAP", "Framer Motion", "Figma",
                "WordPress", "Elementor", "YOAST SEO", "Vercel",
              ].map((tech, idx) => (
                <SwiperSlide key={idx} className="!w-auto">
                  <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5
                    text-[10px] sm:text-xs rounded-full
                    bg-white/5 border border-white/10 text-muted-foreground/70
                    hover:border-lime-500/50 hover:text-lime-400
                    transition-all duration-300 whitespace-nowrap">
                    {tech}
                  </span>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="absolute inset-y-0 left-0 w-10 sm:w-16 md:w-20 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-10 sm:w-16 md:w-20 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
        .perspective-1000 { perspective: 1000px; }
        .skill-card {
          transform-style: preserve-3d;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .skill-card:hover { transform: translateY(-4px); }
        .swiper-pagination-bullet { background: rgba(255,255,255,0.4); opacity: 1; }
        .swiper-pagination-bullet-active { background: #84cc16 !important; }
        .swiper-button-prev-custom,
        .swiper-button-next-custom { cursor: pointer; }
      `}</style>
    </section>
  );
}