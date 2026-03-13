"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Mail, Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { 
    src: "/icons/Email.png", 
    label: "Email", 
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=teukukurniayogaswara@gmail.com", 
    borderColor: "#EA4335",
    bgGradient: "from-[#EA4335]/20 to-transparent",
    hoverColor: "hover:border-[#EA4335] hover:shadow-[#EA4335]/25"
  },
  { 
    src: "/icons/Whatsap.png", 
    label: "WhatsApp", 
    href: "https://wa.me/+6281234701212", 
    borderColor: "#25D366",
    bgGradient: "from-[#25D366]/20 to-transparent",
    hoverColor: "hover:border-[#25D366] hover:shadow-[#25D366]/25"
  },
  { 
    src: "/icons/Linkedin.png", 
    label: "LinkedIn", 
    href: "https://linkedin.com/in/t-kurnia-yogas-wara-604b64338", 
    borderColor: "#0077B5",
    bgGradient: "from-[#0077B5]/20 to-transparent",
    hoverColor: "hover:border-[#0077B5] hover:shadow-[#0077B5]/25"
  },
  { 
    src: "/icons/Github.png", 
    label: "GitHub", 
    href: "https://github.com/YogasWara18", 
    borderColor: "#333333",
    bgGradient: "from-[#333333]/20 to-transparent",
    hoverColor: "hover:border-[#333333] hover:shadow-[#333333]/25"
  },
  { 
    src: "/icons/Instagram.png", 
    label: "Instagram", 
    href: "https://instagram.com/yogaswara04/", 
    borderColor: "#E1306C",
    bgGradient: "from-[#E1306C]/20 to-transparent",
    hoverColor: "hover:border-[#E1306C] hover:shadow-[#E1306C]/25"
  },
  { 
    src: "/icons/Facebook.png", 
    label: "Facebook", 
    href: "https://web.facebook.com/Yogasswar", 
    borderColor: "#1877F2",
    bgGradient: "from-[#1877F2]/20 to-transparent",
    hoverColor: "hover:border-[#1877F2] hover:shadow-[#1877F2]/25"
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Title animation
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

      // Subtitle animation
      tl.fromTo(
        subtitleRef.current,
        { 
          y: 40, 
          opacity: 0, 
          filter: "blur(10px)",
          scale: 0.95
        },
        { 
          y: 0, 
          opacity: 1, 
          filter: "blur(0px)",
          scale: 1,
          duration: 1.2, 
          ease: "back.out(1.2)" 
        },
        "-=0.6"
      );

      // CTA animation
      tl.fromTo(
        ctaRef.current,
        { 
          y: 30, 
          opacity: 0, 
          filter: "blur(5px)",
          scale: 0.9
        },
        { 
          y: 0, 
          opacity: 1, 
          filter: "blur(0px)",
          scale: 1,
          duration: 1, 
          ease: "back.out(1.7)" 
        },
        "-=0.4"
      );

      // Social icons animation
      const socialIcons = iconsRef.current?.querySelectorAll(".social-icon");
      if (socialIcons) {
        tl.fromTo(
          Array.from(socialIcons),
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

      // Parallax effect untuk gradient orbs
      gsap.to(".contact-orb", {
        y: 30,
        scale: 1.1,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, sectionRef);

    // Particle animation
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
      id="contact"
      className="relative min-h-screen py-20 md:py-28 lg:py-32 overflow-hidden bg-background"
    >
      {/* Particle Background */}
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

      {/* Gradient Orbs */}
      <div className="contact-orb absolute top-20 left-20 w-[30rem] h-[30rem] bg-lime-500/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="contact-orb absolute bottom-20 right-20 w-[25rem] h-[25rem] bg-yellow-500/10 rounded-full blur-3xl animate-float" />
      <div
        className="contact-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-lime-500/5 rounded-full blur-3xl animate-pulse-glow"
        style={{ animationDelay: "2s" }}
      />

      {/* Grid Overlay */}
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

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-lime-500/5 via-transparent to-transparent" />

      {/* Light Leak Effect */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-yellow-500/10 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-lime-500/10 to-transparent blur-3xl" />

      {/* Decorative lines dengan warna green yellow */}
      <div className="absolute left-0 top-0 w-24 md:w-32 h-24 md:h-32 border-l-2 border-t-2 border-lime-500/20 rounded-tl-[100px]" />
      <div className="absolute right-0 bottom-0 w-24 md:w-32 h-24 md:h-32 border-r-2 border-b-2 border-yellow-500/20 rounded-br-[100px]" />

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <div ref={titleRef} className="mb-8">
            <span className="text-sm font-medium tracking-wider bg-gradient-to-r from-lime-500 to-yellow-500 bg-clip-text text-transparent">
              CONTACT
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mt-3">
              Let's Connect
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-lime-500 to-yellow-500 rounded-full mx-auto mt-4" />
          </div>

          {/* Quote */}
          <div ref={subtitleRef} className="relative mb-12">
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground/80 leading-relaxed bg-gradient-to-br from-lime-500/5 to-yellow-500/5 p-6 md:p-8 rounded-2xl max-w-2xl mx-auto border border-lime-500/10">
              <span className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-lime-500 to-yellow-500 rounded-l-2xl" />
              <span className="absolute -top-4 -right-4 text-6xl md:text-8xl text-lime-500/10 font-serif">"</span>
              <span className="relative z-10 block">
                I'm open to collaborations, projects, or just a friendly chat. Let's connect through the channels below.
              </span>
              <span className="absolute -bottom-6 md:-bottom-10 -left-4 text-6xl md:text-8xl text-yellow-500/10 font-serif rotate-180">"</span>
            </p>
          </div>

          {/* CTA Button dengan gradient green yellow */}
          <div ref={ctaRef} className="mb-12 md:mb-16">
            <a
              href="https://wa.me/+6281234701212"
              className="group relative inline-flex items-center gap-2 md:gap-3 px-6 md:px-10 py-3 md:py-5 bg-gradient-to-r from-lime-500 to-yellow-500 text-background rounded-full font-medium overflow-hidden hover:scale-105 transition-all duration-500 text-sm md:text-base"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Send className="w-4 h-4 md:w-5 md:h-5" />
                Get in Touch
                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </a>
          </div>

          {/* Social icons dengan warna asli saat hover */}
          <div ref={iconsRef} className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
            {socialLinks.map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`social-icon group relative p-3 md:p-5 rounded-xl md:rounded-2xl border border-lime-500/20 bg-lime-500/5 backdrop-blur-sm transition-all duration-300 hover:scale-110 ${social.hoverColor}`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Background gradient on hover - menggunakan warna asli */}
                <div className={`absolute inset-0 bg-gradient-to-br ${social.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl md:rounded-2xl`} />
                
                {/* Icon */}
                <img
                  src={social.src}
                  alt={social.label}
                  className="relative z-10 w-6 h-6 md:w-8 md:h-8 object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                />
                
                {/* Tooltip */}
                <span className="absolute -top-8 md:-top-10 left-1/2 -translate-x-1/2 px-2 md:px-3 py-1 md:py-1.5 bg-background border border-lime-500/30 rounded-full text-[10px] md:text-xs font-medium text-lime-500 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                  {social.label}
                </span>
              </a>
            ))}
          </div>

          {/* Email contact */}
          <div className="mt-12 md:mt-16 flex flex-col items-center justify-center gap-4 text-sm text-muted-foreground">
            <a
              href="mailto:teukukurniayogaswara@gmail.com"
              className="group flex items-center gap-2 hover:text-lime-500 transition-colors duration-300"
            >
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm md:text-base">teukukurniayogaswara@gmail.com</span>
            </a>
          </div>

          {/* Availability badge */}
          <div className="mt-6 md:mt-8 inline-flex items-center gap-2 bg-gradient-to-br from-lime-500/10 to-yellow-500/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-lime-500/20">
            <span className="relative flex h-2 w-2 md:h-3 md:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-lime-500"></span>
            </span>
            <span className="text-xs md:text-sm font-medium text-lime-500">Available for freelance work</span>
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