"use client";

import { GeneratePortfolioForm } from "@/components/generate-portfolio-form";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function GeneratePortfolioPage() {
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
    // Generate stars for background
    const starCount = window.innerWidth < 768 ? 200 : 300;
    const newStars = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${Math.random() * 50 + 50}s`,
      delay: `${Math.random() * 50}s`,
      opacity: `${Math.random() * 0.7 + 0.3}`,
      distance: `${Math.random() * 150 + 50}px`,
    }));
    setStars(newStars);
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

      <main className="lg:py-16 sm:py-12 py-8 min-h-screen">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <FaArrowLeft size={14} />
                Back to Portfolio
              </Button>
            </Link>
          </div>

          <motion.div
            className="flex flex-col items-start mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold tracking-tighter mb-2">
              Create Your Portfolio
            </h1>
            <p className="text-foreground/70 max-w-3xl">
              Fill out the form below to generate your own customized portfolio
              website based on this template. You&apos;ll receive a downloadable
              zip file containing your personalized Next.js project.
            </p>
          </motion.div>

          <GeneratePortfolioForm />
        </div>
      </main>
    </div>
  );
}
