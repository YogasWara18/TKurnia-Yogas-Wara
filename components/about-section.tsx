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
      tl.fromTo(labelRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 });

      // Title lines reveal
      const titleLines = titleRef.current?.querySelectorAll(".title-line");
      if (titleLines) {
        tl.fromTo(
          Array.from(titleLines),
          { y: 80, clipPath: "inset(100% 0% 0% 0%)" },
          { y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1, stagger: 0.12 },
          "-=0.4"
        );
      }

      // Text animation
      tl.fromTo(textRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5");

      // Gallery stagger
      const statItems = statsRef.current?.querySelectorAll(".stat-item");
      if (statItems) {
        tl.fromTo(Array.from(statItems), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, "-=0.3");
      }

      // Image reveal
      gsap.fromTo(
        imageRef.current,
        { y: 100, scale: 1.1, clipPath: "inset(100% 0% 0% 0%)" },
        { y: 0, scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, scrollTrigger: { trigger: imageRef.current, start: "top 85%" } }
      );

      // Parallax effect
      gsap.to(imageRef.current, {
        y: -60,
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 },
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
                    <img src={src} alt={`Slide ${i + 1}`} className="w-full h-full object-contain" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <span
              ref={labelRef}
              className="inline-block text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium mb-4 sm:mb-6"
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
             I'm Yogas, a passionate Frontend Web Developer with a strong foundation in modern web technologies. I graduated from the Fullstack Web Development Bootcamp at Purwadhika Digital Technology School and continue to hone my skills through SoloLearn and FreeCodeCamp. My expertise includes building responsive, user-centric applications using React, Next.js, HTML, CSS, JavaScript, TypeScript, and TailwindCSS and Bootstrap. I also integrate backend solutions with Node.js, REST APIs, and PostgreSQL, ensuring scalable and maintainable projects. Creativity is my forte, I love creating smooth animations with GSAP, interactive sliders with Swiper.js, and designing intuitive interfaces using Figma. Version control and collaboration are second nature to me, thanks to Git and GitHub. I thrive on blending technical rigor with aesthetic design, aiming to deliver web experiences that are not only functional but also visually appealing. In addition, I actively study and apply UI/UX principles focusing on user research, wireframing, prototyping, and usability testing to ensure that every project I build is not only technically sound but also provides a seamless and engaging user experience. I am also familiar with leveraging AI tools such as V0, Copilot, and Dreamina to accelerate development, enhance creativity, and explore innovative solutions in both design and coding workflows.
            </p>

            {/* Gallery images */}
            <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
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