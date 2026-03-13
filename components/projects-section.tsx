"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ExternalLink,
  Github,
  Calendar,
  Tag,
  ChevronRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Data projects (tetap sama)
const webProjects = [
  {
    title:
      "Oceanis Grand Palace  – Full Frontend build with React + Vite + JavaScript + TailwindCss",
    description:
      "Oceanis Grand Palace is a luxury hotel website designed to deliver a premium experience with an elegant and cinematic atmosphere. It highlights exclusive services such as Dive & Discovery, Night of Elegance, Sunset Wellness, and Luxury Water Sports, alongside world-class facilities including a pristine beachfront, infinity pool oasis, fine dining excellence, exclusive spa retreat, and a grand ballroom for events. Guests can explore a wide range of room options, from the Ocean View Chamber to the Presidential Suite, each presented with detailed capacity, size, and pricing. The site also emphasizes the grandeur of its architecture, exclusive suites, harmony with the ocean, and world-class culinary offerings. Complementing this, the blog and reviews section features refined articles on travel, wellness, gastronomy, and guest experiences that underscore prestige and unforgettable memories. Finally, the contact and location details, based in Medan, North Sumatra, Indonesia, provide clear information for reservations and communication, making the website a seamless gateway to luxury hospitality.",
    video: "/Thumbnail-Oceanis.mp4",
    tags: [
      "Design",
      "Website Hotel",
      "Animation",
      "Development",
      "Branding",
      "Responsive",
      "Vite",
      "React",
      "Javascript",
      "TailwindCss",
      "Swiper.js",
      "RestAPI",
      "Vercel",
    ],
    liveUrl: "https://oceanis-grand-palace.vercel.app/",
    githubUrl: "https://github.com/YogasWara18/Oceanis-Grand-Palace",
    date: "February 2026",
  },
  {
    title:
      "indoShop E-Commerce – Full Frontend build with React + Next.js + TypeScript + TailwindCss",
    description:
      "Indoshop Art Market is an e-commerce platform designed to help Indonesian artisans modernize artworks from every region through an elegant, responsive, and easily accessible digital display; this website is built using modern technologies such as React.js for interactive interfaces, Next.js for SEO optimization and fast rendering, TypeScript to maintain code consistency, TailwindCSS for responsive styling, Swiper.js for dynamic product sliders, and an authentication system that ensures user security and personalization, so that every piece of Indonesian art can be presented professionally and reach the global market.",
    video: "/Thumbnail-indoShop.mp4",
    tags: [
      "Design",
      "E-Commerce",
      "Animation",
      "Development",
      "Branding",
      "Responsive",
      "Next.js",
      "React",
      "TypeScript",
      "TailwindCss",
      "Swiper.js",
      "RestAPI",
      "Vercel",
    ],
    liveUrl: "https://indoshop.vercel.app/",
    githubUrl: "https://github.com/YogasWara18/Indoshop",
    date: "January 2026",
  },
  {
    title: "Burger Café Bar – Build with Next.js TypeScript & Bootstrap",
    description:
      "The Burger Café Bar website is a professional frontend project showcasing culinary branding with a modern, interactive, and high performance approach. Built using Next.js as the primary framework and Bootstrap for its grid system and responsive components, the website delivers a clean and consistent appearance across multiple devices.",
    video: "/Thumbnail-Burger.mp4",
    tags: [
      "Design",
      "Animation",
      "Development",
      "Branding",
      "Responsive",
      "Next.js",
      "React",
      "TypeScript",
      "Bootstrap",
      "RestAPI",
      "Vercel",
    ],
    liveUrl: "https://burger-cafe-bar.vercel.app/",
    githubUrl: "https://github.com/YogasWara18/Burger-Cafe-Bar",
    date: "January 2026",
  },
  {
    title:
      "Design Nature Interior - Full Frontend Build with Next.js TypeScript TailwindCss Framer-Motion",
    description:
      "The website design nature.vercel.app is a portfolio for interior design services inspired by nature, showcasing a philosophy of living in harmony with the environment through offerings such as biophilic space planning, natural material selection, and sensory wellness integration it highlights international projects, service packages (Basic and Signature), design trend blogs, and client testimonials, while technically it is built with Next.js (a React framework) and deployed on Vercel, leveraging Next.js image optimization and likely modern styling tools such as Tailwind CSS to deliver a fast, responsive, and SEO-friendly experience.",
    video: "/Thumbnail-nature.mp4",
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
    liveUrl: "https://design-nature.vercel.app/",
    githubUrl: "https://github.com/YogasWara18/nature",
    date: "December 2025",
  },
  {
    title:
      "Palm Hotel – Modern Build with Next.js TypeScript & Cloud Integration",
    description:
      "The Palm Hotel website was developed using Next.js for performance and scalability, combined with TailwindCSS for responsive and consistent styling. The authentication system is managed with Auth.js, while Google Cloud and Neon are used for the backend and database infrastructure. Payment integration is handled through Midtrans, and the entire project was smoothly deployed using Vercel. This combination of technologies results in a modern, secure, and user friendly website.",
    video: "/Thumbnail-video-PalmHotel.mp4",
    tags: [
      "Branding",
      "Design",
      "Marketing",
      "Development",
      "Payment",
      "Database",
      "Responsive",
      "Cloud",
      "Auth.js",
      "Authentication",
      "Next.js",
      "React",
      "TypeScript",
      "TailwindCSS",
      "Vercel",
    ],
    liveUrl: "https://palm-hotel.vercel.app/",
    githubUrl: "https://github.com/YogasWara18/Palm-Hotel",
    date: "November 2025",
  },
  {
    title:
      "Jack Daniel’s - Modern Frontend Animation Build with Next.js JavaScript GSAP",
    description:
      "This website is built using Next.js for its fast and scalable React architecture, combined with GSAP for smooth, interactive animations. Styling is handled with TailwindCSS for responsiveness and consistency, while JavaScript and additional components deliver an elegant, modern, and extensible UI/UX experience.",
    video: "/Thumbnail-video-JackDaniel's.mp4",
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
      "Vercel",
    ],
    liveUrl: "https://jackdaniels-green.vercel.app/",
    githubUrl: "https://github.com/YogasWara18/jackDaniels",
    date: "November 2025",
  },
];

const systemProjects = [
  {
    title: "POS System – Full Stack with React + Node.js + PostgreSQL",
    description:
      "A comprehensive Point of Sale system designed for restaurants and retail businesses. Features include inventory management, sales reporting, employee management, and real-time analytics. Built with React for the frontend, Node.js for the backend API, and PostgreSQL for data persistence. The system includes role-based access control, offline capability, and cloud synchronization for multi-branch operations.",
    video: "/Thumbnail-POS.mp4",
    tags: [
      "System Development",
      "POS",
      "React",
      "Node.js",
      "PostgreSQL",
      "REST API",
      "JWT",
      "Dashboard",
      "Analytics",
    ],
    liveUrl: "https://pos-system-demo.vercel.app/",
    githubUrl: "https://github.com/YogasWara18/pos-system",
    date: "March 2026",
  },
  {
    title: "Hotel Management System – Full Stack with Next.js + Prisma + MySQL",
    description:
      "Complete hotel management solution handling reservations, room allocation, billing, and guest management. Features include real-time room availability, booking calendar, guest check-in/out, invoice generation, and integration with payment gateways. Built with Next.js, Prisma ORM, and MySQL database, deployed on Vercel with Cloudflare CDN for optimal performance.",
    video: "/Thumbnail-HMS.mp4",
    tags: [
      "System Development",
      "Hotel Management",
      "Next.js",
      "Prisma",
      "MySQL",
      "Authentication",
      "Payment Gateway",
    ],
    liveUrl: "https://hotel-management-demo.vercel.app/",
    githubUrl: "https://github.com/YogasWara18/hotel-management",
    date: "February 2026",
  },
  {
    title: "School Management System – Laravel + MySQL + Bootstrap",
    description:
      "Educational platform for managing student records, attendance, grades, and parent-teacher communication. Includes modules for student enrollment, class scheduling, exam management, and report card generation. Built with Laravel PHP framework, MySQL database, and Bootstrap for responsive interface design.",
    video: "/Thumbnail-School.mp4",
    tags: [
      "System Development",
      "Education",
      "Laravel",
      "PHP",
      "MySQL",
      "Bootstrap",
      "Dashboard",
    ],
    liveUrl: "https://school-management-demo.vercel.app/",
    githubUrl: "https://github.com/YogasWara18/school-management",
    date: "January 2026",
  },
  {
    title: "Inventory Management System – MERN Stack with Redux",
    description:
      "Advanced inventory tracking system with barcode scanning, low stock alerts, purchase orders, and supplier management. Features real-time stock updates, multi-warehouse support, and detailed inventory reports. Built with MongoDB, Express.js, React with Redux for state management, and Node.js backend.",
    video: "/Thumbnail-Inventory.mp4",
    tags: [
      "System Development",
      "Inventory",
      "MERN",
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Redux",
    ],
    liveUrl: "https://inventory-system-demo.vercel.app/",
    githubUrl: "https://github.com/YogasWara18/inventory-system",
    date: "December 2025",
  },
];

const wordpressProjects = [
  {
    title: "Luxury Resort WordPress – Custom Theme Development",
    description:
      "Bespoke WordPress theme for a luxury beach resort. Features custom post types for rooms and amenities, advanced booking system integrated with WooCommerce, multilingual support with WPML, and optimized for speed with lazy loading and caching plugins. The design focuses on visual storytelling with full-screen galleries and immersive video backgrounds.",
    video: "/Thumbnail-WP-Resort.mp4",
    tags: [
      "WordPress",
      "Custom Theme",
      "PHP",
      "WooCommerce",
      "WPML",
      "ACF",
      "Booking System",
      "SEO",
    ],
    liveUrl: "https://luxuryresort.demo",
    githubUrl: "https://github.com/YogasWara18/wp-luxury-resort",
    date: "March 2026",
  },
  {
    title: "E-commerce Fashion Store – WooCommerce + Elementor",
    description:
      "Complete e-commerce solution for a fashion brand using WooCommerce and Elementor Pro. Includes custom product filters, variations for sizes and colors, abandoned cart recovery, and integrated with social media for seamless marketing. The site features a modern, mobile-first design with optimized checkout flow.",
    video: "/Thumbnail-WP-Fashion.mp4",
    tags: [
      "WordPress",
      "WooCommerce",
      "Elementor",
      "E-commerce",
      "PHP",
      "Payment Gateway",
      "Shipping Integration",
    ],
    liveUrl: "https://fashionstore.demo",
    githubUrl: "https://github.com/YogasWara18/wp-fashion-store",
    date: "February 2026",
  },
  {
    title: "News Magazine Portal – Advanced Custom Theme",
    description:
      "High-performance news portal with custom theme development. Features include multi-author support, frontend submission forms, ad management system, and optimized for Core Web Vitals. Integrated with Google AdSense, newsletter subscriptions via Mailchimp, and advanced caching for high traffic handling.",
    video: "/Thumbnail-WP-News.mp4",
    tags: [
      "WordPress",
      "News Portal",
      "Custom Theme",
      "ACF",
      "Multi-author",
      "Ad Management",
      "Performance",
    ],
    liveUrl: "https://newsportal.demo",
    githubUrl: "https://github.com/YogasWara18/wp-news-portal",
    date: "January 2026",
  },
  {
    title:
      "Real Estate Listing Platform – Custom Post Types + Maps Integration",
    description:
      "Comprehensive real estate website with custom property listings. Features advanced search with filters for price, location, bedrooms, and amenities. Integrated with Google Maps for property locations, mortgage calculator, and agent profiles. Built with custom post types, Advanced Custom Fields, and optimized for local SEO.",
    video: "/Thumbnail-WP-RealEstate.mp4",
    tags: [
      "WordPress",
      "Real Estate",
      "Custom Post Types",
      "Google Maps API",
      "ACF",
      "Property Listings",
    ],
    liveUrl: "https://realestate.demo",
    githubUrl: "https://github.com/YogasWara18/wp-realestate",
    date: "December 2025",
  },
];

function ProjectSection({
  id,
  title,
  subtitle,
  projects,
  index,
}: {
  id: string;
  title: string;
  subtitle: string;
  projects: typeof webProjects;
  index: number;
}) {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
        },
      });

      const titleLines = titleRef.current?.querySelectorAll(".title-line");
      if (titleLines && titleLines.length > 0) {
        tl.fromTo(
          titleLines,
          {
            y: 100,
            opacity: 0,
            scale: 0.9,
            clipPath: "inset(100% 0% 0% 0%)",
            rotateY: 15,
            filter: "blur(10px)",
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            rotateY: 0,
            filter: "blur(0px)",
            duration: 1.4,
            stagger: 0.2,
            ease: "power4.out",
          },
          0,
        );
      }

      const cards = cardsRef.current?.querySelectorAll(".project-card");
      cards?.forEach((card, cardIndex) => {
        const isEven = cardIndex % 2 === 0;
        const direction = isEven ? -1 : 1;

        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        cardTl.fromTo(
          card,
          {
            x: direction * 150,
            y: 80,
            opacity: 0,
            rotationY: direction * 30,
            rotationX: 10,
            filter: "blur(10px)",
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            rotationY: 0,
            rotationX: 0,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power4.out",
          },
        );

        const videoContainer = card.querySelector(".video-container");
        cardTl.fromTo(
          videoContainer,
          {
            clipPath: "inset(20% 20% 20% 20% round 20px)",
            opacity: 0,
            scale: 0.9,
          },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.8",
        );

        const video = card.querySelector(".project-video");
        gsap.to(video, {
          y: -60,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 2.5,
          },
        });

        const contentElements = card.querySelectorAll(".content-animate");
        cardTl.fromTo(
          contentElements,
          {
            y: 50,
            opacity: 0,
            filter: "blur(5px)",
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.6",
        );

        card.addEventListener("mouseenter", () => {
          gsap.to(videoContainer, {
            duration: 0.6,
            ease: "power2.out",
            boxShadow: "0 40px 80px rgba(132, 204, 22, 0.3)",
            scale: 1.02,
          });
          gsap.to(video, {
            duration: 0.8,
            ease: "power2.out",
            scale: 1.15,
          });
          gsap.to(card.querySelectorAll(".project-link"), {
            duration: 0.4,
            opacity: 1,
            y: 0,
            stagger: 0.1,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(videoContainer, {
            duration: 0.6,
            ease: "power2.out",
            boxShadow: "0 0px 0px rgba(132, 204, 22, 0)",
            scale: 1,
          });
          gsap.to(video, {
            duration: 0.6,
            ease: "power2.out",
            scale: 1,
          });
          gsap.to(card.querySelectorAll(".project-link"), {
            duration: 0.3,
            opacity: 0,
            y: 20,
            stagger: 0.05,
            ease: "power2.out",
          });
        });
      });

      if (sectionRef.current) {
        const particles =
          sectionRef.current.querySelectorAll(".project-particle");
        gsap.to(particles, {
          y: -150,
          rotation: 360,
          duration: 25,
          repeat: -1,
          ease: "none",
          stagger: {
            amount: 3,
            from: "random",
          },
        });
      }
    }, sectionRef);

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
      id="projects"
      className={`relative min-h-screen py-20 md:py-28 lg:py-32 overflow-hidden ${
        index % 2 === 0 ? "bg-background" : "bg-background/95"
      }`}
    >
      {/* Particle Background */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="project-particle absolute w-1 h-1 rounded-full"
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

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-[30rem] h-[30rem] bg-lime-500/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-20 w-[25rem] h-[25rem] bg-yellow-500/10 rounded-full blur-3xl animate-float" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-lime-500/5 rounded-full blur-3xl animate-pulse-glow"
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

      <div className="container relative z-10 px-4 sm:px-6">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-16 md:mb-20">
          <div className="overflow-hidden mb-2">
            <h2 className="title-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-lime-500 to-yellow-500 bg-clip-text text-transparent">
              {title}
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="title-line text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white italic">
              {subtitle}
            </h2>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-lime-500 to-yellow-500 rounded-full mx-auto mt-4" />
        </div>

        {/* Projects */}
        <div ref={cardsRef} className="space-y-24 md:space-y-32">
          {projects.map((project, projectIndex) => (
            <div
              key={project.title}
              className="project-card flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center perspective group"
              onMouseEnter={() => setActiveProject(projectIndex)}
              onMouseLeave={() => setActiveProject(null)}
            >
              {/* Video Section - Mobile First */}
              <div
                className={`relative w-full overflow-hidden rounded-2xl md:rounded-3xl order-1 ${
                  projectIndex % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <div className="video-container relative aspect-video md:aspect-4/3 overflow-hidden bg-black/50 rounded-2xl md:rounded-3xl border border-lime-500/20">
                  <video
                    src={project.video || "/placeholder.mp4"}
                    className="project-video w-full h-full object-cover transition-transform duration-700"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-lime-500/0 to-yellow-500/0 hover:from-lime-500/20 hover:to-yellow-500/20 transition-all duration-700 flex items-center justify-center gap-4 opacity-0 hover:opacity-100">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link translate-y-5 px-4 md:px-6 py-2 md:py-3 bg-background/80 backdrop-blur-sm text-foreground rounded-full text-sm font-medium hover:scale-110 transition-all duration-300 flex items-center gap-2 border border-lime-500/30"
                    >
                      <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="hidden sm:inline">Live Demo</span>
                      <span className="sm:hidden">Demo</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link translate-y-5 px-4 md:px-6 py-2 md:py-3 bg-background/80 backdrop-blur-sm text-foreground rounded-full text-sm font-medium hover:scale-110 transition-all duration-300 flex items-center gap-2 border border-yellow-500/30"
                    >
                      <Github className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="hidden sm:inline">Source</span>
                      <span className="sm:hidden">Code</span>
                    </a>
                  </div>

                  {/* Decorative frame */}
                  <div className="absolute inset-0 border border-lime-500/20 rounded-2xl md:rounded-3xl pointer-events-none">
                    <div className="absolute top-2 left-2 md:top-4 md:left-4 w-6 h-6 md:w-8 md:h-8 border-l-2 border-t-2 border-lime-500/40 rounded-tl-lg md:rounded-tl-2xl" />
                    <div className="absolute top-2 right-2 md:top-4 md:right-4 w-6 h-6 md:w-8 md:h-8 border-r-2 border-t-2 border-yellow-500/40 rounded-tr-lg md:rounded-tr-2xl" />
                    <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 w-6 h-6 md:w-8 md:h-8 border-l-2 border-b-2 border-yellow-500/40 rounded-bl-lg md:rounded-bl-2xl" />
                    <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 w-6 h-6 md:w-8 md:h-8 border-r-2 border-b-2 border-lime-500/40 rounded-br-lg md:rounded-br-2xl" />
                  </div>

                 

                  <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 glass px-2 py-1 md:px-3 md:py-1.5 rounded-full">
                    <span className="text-[10px] md:text-xs font-medium text-yellow-500 flex items-center gap-1">
                      <Calendar className="w-2 h-2 md:w-3 md:h-3" />
                      <span>{project.date}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div
                className={`w-full order-2 ${projectIndex % 2 === 1 ? "md:order-1" : ""}`}
              >
                <div className="space-y-4 md:space-y-6 text-center md:text-left">
                  {/* Project number */}
                  <div className="overflow-hidden">
                    <span className="content-animate inline-block text-xs tracking-[0.2em] uppercase text-lime-500/60 font-medium">
                      Project {String(projectIndex + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="overflow-hidden">
                    <h3 className="content-animate text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white bg-clip-text text-transparent">
                      {project.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="relative">
                    <p className="content-animate text-sm md:text-base text-muted-foreground/80 leading-relaxed bg-gradient-to-br from-lime-500/5 to-yellow-500/5 p-4 md:p-6 rounded-xl md:rounded-2xl border border-lime-500/10">
                      <span className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-lime-500 to-yellow-500 rounded-l-xl" />
                      <span className="block pl-3">
                        {project.description.length > 200
                          ? `${project.description.substring(0, 200)}...`
                          : project.description}
                      </span>
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="content-animate flex flex-wrap justify-center md:justify-start gap-1.5 md:gap-2">
                    {project.tags.slice(0, 6).map((tag, i) => (
                      <span
                        key={tag}
                        className={`px-2 md:px-3 py-1 text-[10px] md:text-xs font-medium rounded-full border ${
                          i % 2 === 0
                            ? "bg-lime-500/10 border-lime-500/20 text-lime-500"
                            : "bg-yellow-500/10 border-yellow-500/20 text-yellow-500"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="content-animate flex flex-col xs:flex-row items-center justify-center md:justify-start gap-3 pt-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative w-full xs:w-auto px-5 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-lime-500 to-yellow-500 text-background rounded-full text-sm font-medium overflow-hidden hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <span className="relative z-10">View Details</span>
                      <ChevronRight className="relative z-10 w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </a>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-full xs:w-auto px-5 md:px-6 py-2.5 md:py-3 border border-lime-500/30 text-foreground/80 rounded-full text-sm font-medium hover:bg-lime-500/5 hover:border-lime-500/60 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Github className="w-3 h-3 md:w-4 md:h-4 group-hover:rotate-12 transition-transform duration-300" />
                      <span>Source Code</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-16 md:mt-20">
          <a
            href={`#${id}`}
            className="group inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-br from-lime-500/10 to-yellow-500/10 rounded-full hover:scale-105 transition-all duration-500 border border-lime-500/20"
          >
            <span className="text-sm md:text-base text-foreground font-medium">
              View All Projects
            </span>
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-lime-500 group-hover:translate-x-2 transition-transform duration-500" />
          </a>
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

        .glass {
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(132, 204, 22, 0.2);
        }

        @media (min-width: 640px) {
          .glass {
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
          }
        }
      `}</style>
    </section>
  );
}

export default function AllProjectsSection() {
  return (
    <>
      <ProjectSection
        id="web-development"
        title="Web Development"
        subtitle="Portfolio"
        projects={webProjects}
        index={0}
      />
      <ProjectSection
        id="system-development"
        title="System Development"
        subtitle="Applications"
        projects={systemProjects}
        index={1}
      />
      <ProjectSection
        id="wordpress"
        title="WordPress"
        subtitle="Development"
        projects={wordpressProjects}
        index={2}
      />
    </>
  );
}
