"use client";

import { useEffect, useRef } from  "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-flip";
import { Navigation, Pagination, Autoplay, EffectFlip } from "swiper/modules";
import { 
  Award, Code, Users, Briefcase, Sparkles, 
  Zap, Layers, Cpu, TrendingUp, Globe, 
  Star, Coffee, Rocket, Hexagon, 
  Braces, Terminal, Palette, Gauge 
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Data skills dengan level dan ikon unik
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
    const ctx = gsap.context(() => {
      // Timeline bio & stats
      const tlMain = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
      tlMain.fromTo(bioRef.current, { y: 60, opacity: 0, filter: "blur(12px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" });
      tlMain.fromTo(statsRef.current?.children, { y: 40, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: "back.out(1.5)" }, "-=0.6");

      // Skills cards dengan efek 3D berurutan
      const skillCards = skillsContainerRef.current?.querySelectorAll(".skill-card");
      if (skillCards) {
        gsap.fromTo(skillCards, { y: 70, opacity: 0, rotationX: -25, filter: "blur(8px)" }, { y: 0, opacity: 1, rotationX: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.1, ease: "back.out(1.2)", scrollTrigger: { trigger: skillsContainerRef.current, start: "top 80%", toggleActions: "play none none reverse" } });
      }

      // Certificate carousel reveal
      gsap.fromTo(certificateRef.current, { scale: 0.85, opacity: 0, rotationY: -15 }, { scale: 1, opacity: 1, rotationY: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: certificateRef.current, start: "top 85%", toggleActions: "play none none reverse" } });

      // Animasi floating shapes
      if (floatingShapesRef.current) {
        const shapes = floatingShapesRef.current.children;
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
    }, sectionRef);

    // Particle animation (lebih hidup)
    if (particlesRef.current) {
      const particles = particlesRef.current.children;
      gsap.to(particles, {
        y: -300,
        rotation: 360,
        opacity: 0,
        duration: 6,
        stagger: { amount: 3, from: "random" },
        ease: "power1.out",
        repeat: -1,
        repeatDelay: 1.2,
      });
    }

    // Animasi radial progress untuk setiap skill (opsional, menggunakan circle progress)
    skillsData.forEach((_, idx) => {
      const circle = progressCirclesRef.current[idx];
      if (circle) {
        const radius = 40;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (skillsData[idx].level / 100) * circumference;
        gsap.fromTo(circle, { strokeDashoffset: circumference }, { strokeDashoffset: offset, duration: 2, ease: "power2.out", scrollTrigger: { trigger: circle, start: "top 85%", toggleActions: "play none none reverse" } });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen py-32 md:py-40 overflow-hidden bg-gradient-to-br from-slate-950 via-background to-slate-950">
      {/* Particle dinamis (20 butir) */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 rounded-full" style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            backgroundColor: i % 2 === 0 ? "#84cc16" : "#eab308",
            opacity: 0.3,
            willChange: "transform",
          }} />
        ))}
      </div>

      {/* Floating shapes dekoratif */}
      <div ref={floatingShapesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute text-lime-500/10" style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 40 + 20}px`,
          }}>
            {i % 2 === 0 ? <Hexagon className="w-full h-full" /> : <Braces className="w-full h-full" />}
          </div>
        ))}
      </div>

      {/* Orbs besar dengan blur dan animasi */}
      <div className="absolute top-1/4 -left-80 w-[500px] h-[500px] bg-lime-500/15 rounded-full blur-3xl mix-blend-screen animate-pulse" style={{ animationDuration: "8s" }} />
      <div className="absolute bottom-1/4 -right-80 w-[500px] h-[500px] bg-yellow-500/15 rounded-full blur-3xl mix-blend-screen animate-pulse" style={{ animationDuration: "10s", animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "12s" }} />

      {/* Grid garis asimetris dengan animasi garis bergerak */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `repeating-linear-gradient(transparent, transparent 60px, rgba(132,204,22,0.15) 60px, rgba(132,204,22,0.15) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(234,179,8,0.15) 60px, rgba(234,179,8,0.15) 61px)` }} />

      <div className="container relative z-10 px-6 mx-auto">
        {/* ===== BIO SECTION dengan efek typing dan badge ===== */}
        <div className="max-w-5xl mx-auto text-center mb-28">
          <div ref={bioRef} className="space-y-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-lime-500/20 to-yellow-500/20 border border-lime-500/40 backdrop-blur-sm shadow-lg shadow-lime-500/10 animate-pulse-glow">
              <Rocket className="w-4 h-4 text-lime-400" />
              <span className="text-xs font-bold text-lime-400 tracking-wider">AVAILABLE FOR FREELANCE</span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter">
              <span className="bg-gradient-to-r from-lime-400 via-yellow-400 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Beyond Code
              </span>
            </h2>
            <div className="relative inline-block mx-auto">
              <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed">
                I'm <span className="text-lime-400 font-bold">Yogas</span> — a creative engineer who transforms 
                <span className="text-yellow-400 font-bold"> complex ideas </span> into 
                <span className="text-cyan-400 font-bold"> high-impact digital experiences.</span>
              </p>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-lime-500 to-transparent" />
            </div>
          </div>

          {/* Stats Cards dengan efek glass dan hover 3D */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { icon: Code, label: "Projects", value: "15+", desc: "Completed", color: "lime" },
              { icon: Users, label: "Clients", value: "10+", desc: "Happy", color: "yellow" },
              { icon: Award, label: "Certs", value: "8", desc: "Global", color: "lime" },
              { icon: TrendingUp, label: "Experience", value: "3+", desc: "Years", color: "yellow" },
            ].map((stat, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-md border border-white/10 p-6 text-center transition-all duration-500 hover:scale-105 hover:border-lime-500/40 hover:shadow-2xl hover:shadow-lime-500/20">
                <div className="absolute inset-0 bg-gradient-to-r from-lime-500/0 via-lime-500/10 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <stat.icon className={`w-10 h-10 text-${stat.color}-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`} />
                <div className="text-4xl font-black text-foreground">{stat.value}</div>
                <div className="text-sm font-semibold text-muted-foreground/80 mt-1">{stat.label}</div>
                <div className="text-xs text-muted-foreground/50">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== SKILLS + CERTIFICATES dengan layout unik ===== */}
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Kolom kiri: Skills dengan radial progress dan hover effect */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-xl bg-gradient-to-br from-lime-500/20 to-yellow-500/20 border border-lime-500/40">
                <Cpu className="w-5 h-5 text-lime-400" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Core Competencies</h3>
            </div>

            <div ref={skillsContainerRef} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {skillsData.map((skill, idx) => {
                const radius = 35;
                const circumference = 2 * Math.PI * radius;
                const offset = circumference - (skill.level / 100) * circumference;
                return (
                  <div key={skill.name} className="skill-card group relative p-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-md border border-white/10 hover:border-lime-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-lime-500/10 overflow-hidden">
                    <div className="flex items-center gap-4">
                      {/* Radial progress circle */}
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                          <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
                          <circle ref={el => progressCirclesRef.current[idx] = el} cx="40" cy="40" r={radius} fill="none" stroke={skill.color} strokeWidth="5" strokeDasharray={circumference} strokeDashoffset={circumference} strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img src={skill.icon} alt={skill.name} className="w-6 h-6 object-contain" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-foreground/90">{skill.name}</span>
                          <span className="text-xs font-mono text-lime-400">{skill.level}%</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground/50 mt-0.5">{skill.description}</p>
                        <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-lime-500 to-yellow-500" style={{ width: `${skill.level}%` }} />
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-lime-500/0 via-lime-500/5 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Kolom kanan: Certificate Carousel dengan efek flip dan badge */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-500/20 to-cyan-500/20 border border-yellow-500/40">
                <Zap className="w-5 h-5 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Verified Credentials</h3>
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
                navigation={true}
                className="w-full rounded-2xl overflow-hidden shadow-2xl"
              >
                {certificates.map((src, i) => (
                  <SwiperSlide key={i}>
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-lime-500/30 bg-black/50 transform transition-all duration-500 hover:scale-[1.02]">
                      <img src={src} alt={`Certificate ${i + 1}`} className="w-full h-full object-contain p-6" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                        <span className="text-[10px] font-mono text-white/70 bg-black/50 px-2 py-0.5 rounded-full">Verified</span>
                        <span className="text-[10px] font-mono text-lime-400 bg-black/50 px-2 py-0.5 rounded-full">#{i+1}</span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* Decorative glowing border */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-lime-500 to-yellow-500 opacity-20 blur-xl -z-10" />
              <div className="absolute -bottom-4 -right-4 w-16 h-16 border-r-2 border-b-2 border-lime-500/50 rounded-br-2xl" />
              <div className="absolute -top-4 -left-4 w-16 h-16 border-l-2 border-t-2 border-yellow-500/50 rounded-tl-2xl" />
            </div>

            {/* Interactive testimonial / fun fact */}
            <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-lime-500/10 to-yellow-500/10 border border-white/10 backdrop-blur-sm group hover:border-lime-500/30 transition-all duration-500">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-full bg-lime-500/20 group-hover:scale-110 transition-transform duration-300">
                  <Coffee className="w-4 h-4 text-lime-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground/80 italic">
                    "Code is poetry in motion. Every project is a new canvas to create something meaningful."
                  </p>
                  <p className="text-xs text-lime-400/70 mt-2 font-mono">— Yogas, 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack dengan animasi marquee */}
        <div className="mt-28 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <Terminal className="w-4 h-4 text-lime-400" />
            <span className="text-xs font-semibold text-muted-foreground/70">TOOLKIT & TECH STACK</span>
          </div>
          <div className="relative overflow-hidden mt-6 py-3">
            <div className="flex gap-3 animate-marquee whitespace-nowrap">
              {["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "GSAP", "Figma", "WordPress", "Vercel", "Git", "Docker"].map((tech) => (
                <span key={tech} className="px-4 py-2 text-sm rounded-full bg-white/5 border border-white/10 text-muted-foreground/70 hover:border-lime-500/50 hover:text-lime-400 transition-all duration-300">
                  {tech}
                </span>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
          display: inline-flex;
          width: max-content;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .skill-card {
          transform-style: preserve-3d;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .skill-card:hover {
          transform: translateY(-5px);
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(132,204,22,0.3); }
          50% { box-shadow: 0 0 20px rgba(132,204,22,0.6); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        /* Swiper custom styles */
        .swiper-button-next,
        .swiper-button-prev {
          color: #84cc16 !important;
          background: rgba(0,0,0,0.6);
          width: 36px !important;
          height: 36px !important;
          border-radius: 50%;
          backdrop-filter: blur(4px);
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 14px !important;
        }
        .swiper-pagination-bullet-active {
          background: #84cc16 !important;
        }
        .swiper-pagination-bullet {
          background: rgba(255,255,255,0.5);
        }
      `}</style>
    </section>
  );
}