"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Label animation
      tl.fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      // Title lines with clip-path reveal
      const titleLines = titleRef.current?.querySelectorAll(".title-line");
      if (titleLines) {
        tl.fromTo(
          Array.from(titleLines),
          { y: 80, clipPath: "inset(100% 0% 0% 0%)" },
          {
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            stagger: 0.12,
            ease: "power4.out",
          },
          "-=0.4"
        );
      }

      // Text paragraph animation
      tl.fromTo(
        textRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );

      // Stats stagger in
      const statItems = statsRef.current?.querySelectorAll(".stat-item");
      if (statItems) {
        tl.fromTo(
          Array.from(statItems),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.3"
        );
      }

      gsap.fromTo(
        imageRef.current,
        { y: 100, scale: 1.1, clipPath: "inset(100% 0% 0% 0%)" },
        {
          y: 0,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
          },
        }
      );

      // Image parallax on scroll
      gsap.to(imageRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      const counters = statsRef.current?.querySelectorAll(".stat-number");
      counters?.forEach((counter) => {
        const target = Number.parseInt(
          counter.getAttribute("data-value") || "0"
        );
        gsap.fromTo(
          counter,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
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
      id="about"
      className="py-32 px-6 relative overflow-hidden bg-checkerboard"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div ref={imageRef} className="relative">
            <div className="aspect-4/5 rounded-3xl overflow-hidden">
              <Swiper
      
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                navigation
                pagination={{
                  clickable: true,
                  bulletClass: "swiper-pagination-bullet custom-bullet swiper-pagination-bullet", // custom class
                  bulletActiveClass:
                    "swiper-pagination-bullet-active custom-bullet-active swiper-pagination-bullet-active",
                }}
                className="w-full h-full"
              >
                {[
                  "/CertificatePWD.jpg",
                  "/HTML-Sololearn.jpg",
                  "/CSS-Sololearn.jpg",
                  "/JavaScript-Sololearn.jpg",
                  "/image4.png",
                  "/image5.png",
                ].map((src, i) => (
                  <SwiperSlide key={i}>
                    <img
                      src={src}
                      alt={`Slide ${i + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <span
              ref={labelRef}
              className="inline-block text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium mb-6"
            >
              About Me
            </span>

            <div ref={titleRef} className="mb-8">
              <div className="overflow-hidden">
                <h2 className="title-line text-4xl md:text-5xl font-bold leading-[1.1]">
                  Frontend Web Developer
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="title-line text-4xl md:text-5xl font-bold leading-[1.1] text-primary/60 italic">
                  Experiences
                </h2>
              </div>
            </div>

            <p
              ref={textRef}
              className="text-muted-foreground text-lg leading-relaxed mb-10"
            >
              I&apos;m Yogas a passionate Frontend Web Developer with a strong
              foundation in modern web technologies. I graduated from the
              Fullstack Web Development Bootcamp at Purwadhika Digital
              Technology School and continuously sharpen my skills through
              SoloLearn and FreeCodeCamp. My expertise covers building
              responsive, user-focused applications using React, Next.js, HTML,
              CSS, JavaScript, TypeScript, and TailwindCSS. I also integrate
              backend solutions with Node.js, REST API, and PostgreSQL, ensuring
              scalable and maintainable projects. Creativity is my edge: I love
              crafting smooth animations with GSAP, interactive sliders with
              Swiper.js, and designing intuitive interfaces using Figma. Version
              control and collaboration are second nature to me, thanks to Git
              and GitHub. I thrive on blending technical precision with
              aesthetic design, aiming to deliver web experiences that are not
              only functional but also visually engaging.
            </p>
            {/* 3 Images in a row */}
            <div className="grid grid-cols-3 gap-6">
              {["/image1.png", "/image2.png", "/image3.png"].map((src, i) => (
                <div key={i} className="rounded-xl overflow-hidden">
                  <img
                    src={src}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
