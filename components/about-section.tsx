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
        { y: 0, opacity: 1, duration: 0.8 },
      );

      // Title lines reveal
      const titleLines = titleRef.current?.querySelectorAll(".title-line");
      if (titleLines) {
        tl.fromTo(
          Array.from(titleLines),
          { y: 80, clipPath: "inset(100% 0% 0% 0%)" },
          { y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1, stagger: 0.12 },
          "-=0.4",
        );
      }

      // Text animation
      tl.fromTo(
        textRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.5",
      );

      // Gallery stagger
      const statItems = statsRef.current?.querySelectorAll(".stat-item");
      if (statItems) {
        tl.fromTo(
          Array.from(statItems),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          "-=0.3",
        );
      }

      // Image reveal
      gsap.fromTo(
        imageRef.current,
        { y: 100, scale: 1.1, clipPath: "inset(100% 0% 0% 0%)" },
        {
          y: 0,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          scrollTrigger: { trigger: imageRef.current, start: "top 85%" },
        },
      );

      // Parallax effect
      gsap.to(imageRef.current, {
        y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 sm:py-28 md:py-32 px-4 sm:px-6 relative overflow-hidden bg-checkerboard"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image */}
          <div ref={imageRef} className="relative">
            <div className="aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                loop
                navigation
                pagination={{ clickable: true }}
                className="w-full h-full"
              >
                {[
                  "/CertificatePWD.jpg",
                  "/HTML-Sololearn.jpg",
                  "/CSS-Sololearn.jpg",
                  "/JavaScript-Sololearn.jpg",
                  "/UI_UX-SpecialSkill.png",
                  "/UI_UX-Utara.png",
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
              className="title-line text-5xl md:text-6xl lg:text-7xl font-bold text-primary/60 italic mb-4 sm:mb-6"
            >
              About Me
            </span>

            <div ref={titleRef} className="mb-6 sm:mb-8">
              <div className="overflow-hidden">
                <h2 className="title-line text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1]">
                  Education & Career Path
                </h2>
              </div>
            </div>

            <p
              ref={textRef}
              className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-8 sm:mb-10"
            >
              I'm Yogas, a passionate Frontend Web Developer with expertise in
              React, Next.js, TypeScript, TailwindCSS, Bootstrap, and backend
              integration using Node.js, REST APIs, and PostgreSQL. I craft
              responsive, user-centric applications enriched with GSAP
              animations, Swiper.js sliders, and intuitive designs via Figma.{" "}
              <br /> <br />
              I graduated from the Fullstack Web Development Bootcamp at
              Purwadhika and continue sharpening my skills through SoloLearn and
              FreeCodeCamp. My workflow embraces Git/GitHub collaboration,
              strong UI/UX principles (research, wireframing, prototyping,
              usability testing), and premium design aesthetics.
              <br /> <br />
              Beyond coding, I leverage WordPress, Elementor, and Yoast SEO to
              deliver scalable, SEO-optimized websites. I also explore AI tools
              like V0, Copilot, Dreamina, and Gemini AI to accelerate
              development and spark creativity. 
              <br /> <br />
              My mission is to blend technical
              rigor with aesthetic design, ensuring every project is not only
              functional but also visually engaging and globally credible.
            </p>

            {/* Gallery images */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6"
            >
              {["/image1.png", "/image2.png", "/image3.png"].map((src, i) => (
                <div key={i} className="stat-item rounded-xl overflow-hidden">
                  <img
                    src={src}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
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
