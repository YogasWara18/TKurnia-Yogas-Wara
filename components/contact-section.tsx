"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { src: "/icons/Email.png", label: "Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=teukukurniayogaswara@gmail.com", borderColor: "#EA4335" },
  { src: "/icons/Whatsap.png", label: "WhatsApp", href: "https://wa.me/+6281234701212", borderColor: "#25D366" },
  { src: "/icons/Linkedin.png", label: "LinkedIn", href: "https://linkedin.com/in/t-kurnia-yogas-wara-604b64338", borderColor: "#0077B5" },
  { src: "/icons/Github.png", label: "GitHub", href: "https://github.com/YogasWara18", borderColor: "#333333" },
  { src: "/icons/Instagram.png", label: "Instagram", href: "https://instagram.com/yogaswara04/", borderColor: "#E1306C" },
  { src: "/icons/Facebook.png", label: "Facebook", href: "https://web.facebook.com/Yogasswar", borderColor: "#1877F2" },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Animasi masuk
      const titleLines = titleRef.current?.querySelectorAll(".title-line");
      if (titleLines) {
        tl.fromTo(
          Array.from(titleLines),
          { y: 100, clipPath: "inset(100% 0% 0% 0%)" },
          { y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1, stagger: 0.15, ease: "power4.out" }
        );
      }

      tl.fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5");
      tl.fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");

      const socialIcons = iconsRef.current?.querySelectorAll(".social-icon");
      if (socialIcons) {
        tl.fromTo(
          Array.from(socialIcons),
          { y: 40, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
          "-=0.3"
        );
      }

      // Hover interaktif
      const icons = iconsRef.current?.querySelectorAll(".social-icon");
      icons?.forEach((icon, i) => {
        const color = socialLinks[i].borderColor;

        const handleMouseMove = (e: Event) => {
          const mouseEvent = e as MouseEvent; // cast ke MouseEvent
          const rect = (icon as HTMLElement).getBoundingClientRect();
          const x = mouseEvent.clientX - rect.left - rect.width / 2;
          const y = mouseEvent.clientY - rect.top - rect.height / 2;

          gsap.to(icon, {
            x: x * 0.35,
            y: y * 0.35,
            scale: 1.1,
            borderColor: color,
            boxShadow: `0 0 10px ${color}`,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(icon, {
            x: 0,
            y: 0,
            scale: 1,
            borderColor: "#ccc",
            boxShadow: "none",
            duration: 0.5,
            ease: "elastic.out(1, 0.4)",
          });
        };

        icon.addEventListener("mousemove", handleMouseMove);
        icon.addEventListener("mouseleave", handleMouseLeave);

        // cleanup
        return () => {
          icon.removeEventListener("mousemove", handleMouseMove);
          icon.removeEventListener("mouseleave", handleMouseLeave);
        };
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-32 px-6 bg-secondary/20 relative overflow-hidden bg-checkerboard">
      <div className="max-w-3xl mx-auto text-center">
        {/* Title */}
        <div ref={titleRef} className="mb-8">
          <div className="overflow-hidden">
            <h2 className="title-line text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1]">Professional Contact</h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-md mx-auto">Let’s Build Something Together</h2>
          </div>
        </div>

        {/* Subtitle */}
        <p ref={subtitleRef} className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-md mx-auto">
          “I’m open to collaborations, projects, or just a friendly chat. Let’s connect through the channels below.”
        </p>

        {/* CTA Button */}
        <div ref={ctaRef} className="mb-16">
          <a
            href="https://wa.me/+6281234701212"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-medium transition-all duration-500 hover:bg-primary hover:scale-105"
          >
            Get in Touch
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>

        {/* Social icons */}
        <div ref={iconsRef} className="flex items-center justify-center gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="social-icon p-4 rounded-full border border-[#ccc] transition-colors duration-300 flex items-center justify-center"
            >
              <img src={social.src} alt={social.label} className="w-6 h-6 object-contain" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}