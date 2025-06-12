"use client";

import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { SkillsSection } from "@/components/skills-section";
import { ExperienceSection } from "@/components/experience-section";
import { ProjectsSection } from "@/components/projects-section";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useEffect, useState } from "react";
import FloatingCTA from "@/components/floating-cta";

export default function Home() {
  const [stars, setStars] = useState<
    {
      id: number;
      size: number;
      left: string;
      top: string;
      duration: string;
      delay: string;
      opacity: string;
      distance: string;
    }[]
  >([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768; // md breakpoint in Tailwind

    const starsCount = isMobile ? 100 : 200;

    const starsArray = Array.from({ length: starsCount }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${Math.random() * 8 + 4}s`,
      delay: `${Math.random() * 5}s`,
      opacity: `${Math.random() * 0.7 + 0.3}`,
      distance: `${Math.random() * 150 + 50}px`,
    }));
    setStars(starsArray);

    const handleResize = () => {
      const isMobileNow = window.innerWidth < 768;
      if (
        (isMobileNow && starsCount !== 200) ||
        (!isMobileNow && starsCount !== 200)
      ) {
        const newStarsCount = isMobileNow ? 200 : 100;
        const newStarsArray = Array.from({ length: newStarsCount }, (_, i) => ({
          id: i,
          size: Math.random() * 3 + 1,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          duration: `${Math.random() * 8 + 4}s`,
          delay: `${Math.random() * 5}s`,
          opacity: `${Math.random() * 0.7 + 0.3}`,
          distance: `${Math.random() * 150 + 50}px`,
        }));
        setStars(newStarsArray);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      {/* Stars background */}
      <div className="stars-container">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={
              {
                width: `${star.size}px`,
                height: `${star.size}px`,
                left: star.left,
                top: star.top,
                "--duration": star.duration,
                "--delay": star.delay,
                "--opacity": star.opacity,
                "--distance": star.distance,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Navbar - appears when scrolling past hero section */}
      <Navbar />
      <FloatingCTA />
      <main className="lg:py-32 sm:py-24 py-12 lg:space-y-28 sm:space-y-24 space-y-16">
        <section id="home">
          <HeroSection />
        </section>
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
      </main>
      <Footer />
    </div>
  );
}
