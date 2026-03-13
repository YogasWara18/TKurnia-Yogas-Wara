"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Award, Code, Users, Briefcase } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline utama dengan timing yang sama seperti hero
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
      });

      // Title reveal - sama seperti hero
      tl.fromTo(titleRef.current,
        { 
          y: 40, 
          opacity: 0,
          filter: "blur(10px)"
        },
        { 
          y: 0, 
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out"
        }
      );

      // Text reveal - sama seperti hero
      tl.fromTo(textRef.current,
        { 
          y: 30, 
          opacity: 0,
          filter: "blur(10px)"
        },
        { 
          y: 0, 
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out"
        },
        "-=0.8"
      );

      // Stats cards stagger dengan efek back.out seperti hero
      const stats = statsRef.current?.querySelectorAll(".stat-card");
      if (stats) {
        tl.fromTo(stats,
          { 
            y: 30, 
            opacity: 0,
            scale: 0.95,
            filter: "blur(5px)"
          },
          { 
            y: 0, 
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)"
          },
          "-=0.4"
        );
      }

      // Image reveal dengan efek cinematic - sama seperti hero
      tl.fromTo(imageRef.current,
        { 
          scale: 1.1, 
          opacity: 0,
          filter: "blur(20px)"
        },
        { 
          scale: 1, 
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.8,
          ease: "power4.out"
        },
        0.2
      );

      // Parallax halus untuk image - sama seperti hero
      gsap.to(imageRef.current, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

    }, sectionRef);

    // Particle animation - sama seperti hero
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
      id="about"
      className="relative min-h-screen py-20 md:py-28 lg:py-32 overflow-hidden bg-background"
    >
      {/* Particle Background - sama seperti hero */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? '#84cc16' : '#eab308',
              opacity: 0.2,
              animation: `float-particle 10s linear infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs - sama seperti hero */}
      <div className="absolute top-20 left-20 w-[30rem] h-[30rem] bg-lime-500/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-20 w-[25rem] h-[25rem] bg-yellow-500/10 rounded-full blur-3xl animate-float" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-lime-500/5 rounded-full blur-3xl animate-pulse-glow"
        style={{ animationDelay: "2s" }}
      />

      {/* Grid Overlay - sama seperti hero */}
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

      {/* Subtle gradient overlay - sama seperti hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-lime-500/5 via-transparent to-transparent" />

      {/* Light leak effect - sama seperti hero */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-yellow-500/10 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-lime-500/10 to-transparent blur-3xl" />

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Mobile/Tablet Image - Tampil di atas untuk mobile dan tablet */}
          <div ref={imageRef} className="relative w-full max-w-md mx-auto lg:hidden mb-8">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-lime-500/20">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                pagination={{ 
                  clickable: true,
                  dynamicBullets: true 
                }}
                className="w-full h-full"
              >
                {[
                  "/CertificatePWD.jpg",
                  "/HTML-Sololearn.jpg",
                  "/CSS-Sololearn.jpg",
                  "/JavaScript-Sololearn.jpg",
                ].map((src, i) => (
                  <SwiperSlide key={i}>
                    <div className="relative w-full h-full flex items-center justify-center bg-black/20">
                      <img
                        src={src}
                        alt={`Certificate ${i + 1}`}
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Decorative elements dengan warna green yellow */}
              <div className="absolute -bottom-3 -right-3 w-12 h-12 border border-lime-500/20 rounded-lg" />
              <div className="absolute -top-3 -left-3 w-12 h-12 border border-yellow-500/20 rounded-lg" />
              
              {/* Edge accents dengan green yellow */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-lime-500/20 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-yellow-500/20 rounded-br-2xl" />
            </div>
          </div>

          {/* Desktop Left - Image (hidden di mobile/tablet) */}
          <div ref={imageRef} className="relative hidden lg:block">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-lime-500/20">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                pagination={{ 
                  clickable: true,
                  dynamicBullets: true 
                }}
                className="w-full h-full"
              >
                {[
                  "/CertificatePWD.jpg",
                  "/HTML-Sololearn.jpg",
                  "/CSS-Sololearn.jpg",
                  "/JavaScript-Sololearn.jpg",
                ].map((src, i) => (
                  <SwiperSlide key={i}>
                    <div className="relative w-full h-full flex items-center justify-center bg-black/20">
                      <img
                        src={src}
                        alt={`Certificate ${i + 1}`}
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Decorative elements dengan warna green yellow */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 border border-lime-500/20 rounded-lg" />
              <div className="absolute -top-4 -left-4 w-20 h-20 border border-yellow-500/20 rounded-lg" />
              
              {/* Edge accents dengan green yellow */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-lime-500/20 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-yellow-500/20 rounded-br-2xl" />
            </div>
          </div>

          {/* Right - Content dengan rata tengah di mobile/tablet */}
          <div className="text-center lg:text-left space-y-6 md:space-y-8 max-w-2xl mx-auto lg:mx-0 lg:pl-12 xl:pl-16">
            {/* Title dengan rata tengah di mobile/tablet */}
            <div ref={titleRef} className="space-y-3">
              <span className="text-sm font-medium tracking-wider bg-gradient-to-r from-lime-500 to-yellow-500 bg-clip-text text-transparent">
                ABOUT ME
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Education & Career Path
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-lime-500 to-yellow-500 rounded-full mx-auto lg:mx-0" />
            </div>

            {/* Description dengan rata tengah di mobile/tablet */}
            <div ref={textRef} className="space-y-4 text-muted-foreground/80">
              <p className="text-sm sm:text-base leading-relaxed">
                I'm Yogas, a passionate Frontend Web Developer with expertise in
                React, Next.js, TypeScript, and modern web technologies. I craft
                responsive, user-centric applications with a focus on performance
                and aesthetic precision.
              </p>
              
              <p className="text-sm sm:text-base leading-relaxed">
                Graduated from Purwadhika Fullstack Bootcamp, I continuously sharpen
                my skills through hands-on projects and emerging technologies. My
                workflow embraces clean code, UI/UX principles, and creative problem-solving.
              </p>
              
              <p className="text-sm sm:text-base leading-relaxed">
                Beyond coding, I explore AI tools and WordPress development to deliver
                comprehensive solutions that blend technical excellence with visual appeal.
              </p>
            </div>

            {/* Stats Cards dengan grid responsif */}
            <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4">
              {[
                { icon: Code, label: "Projects", value: "15+", color: "text-lime-500" },
                { icon: Users, label: "Clients", value: "10+", color: "text-yellow-500" },
                { icon: Award, label: "Certificate", value: "8", color: "text-lime-500" },
                { icon: Briefcase, label: "Tools", value: "20+", color: "text-yellow-500" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="stat-card bg-gradient-to-br from-lime-500/5 to-yellow-500/5 rounded-xl p-3 sm:p-4 text-center hover:from-lime-500/10 hover:to-yellow-500/10 transition-all duration-500 border border-lime-500/10"
                >
                  <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color} mx-auto mb-1 sm:mb-2`} />
                  <div className="text-lg sm:text-xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground/60">{stat.label}</div>
                </div>
              ))}
            </div>

           
          </div>
        </div>
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
          0%, 100% {
            opacity: 0.3;
            filter: blur(80px);
          }
          50% {
            opacity: 0.5;
            filter: blur(100px);
          }
        }

        @keyframes float {
          0%, 100% {
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
      `}</style>
    </section>
  );
}