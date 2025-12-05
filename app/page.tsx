import Navbar from "../components/navbar"
import HeroSection from "../components/hero-section"
import AboutSection from "../components/about-section"
import SkillsSection from "../components/skills-section"
import ProjectsSection from "../components/projects-section"
import ContactSection from "../components/contact-section"
import Footer from "../components/footer"
import GSAPProvider from "../components/gsap-provider"

export default function Home() {
  return (
    <GSAPProvider>
      <main className="relative min-h-screen bg-background overflow-hidden">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </main>
    </GSAPProvider>
  )
}
