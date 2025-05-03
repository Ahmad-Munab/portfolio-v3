"use client";

import { GeneratePortfolioForm } from "@/components/generate-portfolio-form";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function GeneratePortfolioPage() {
  const [showForm, setShowForm] = useState(false);
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

  // Features list
  const features = [
    {
      title: "Multi-Step Form",
      description: "Easy-to-follow process with validation at each step",
      icon: "✨",
    },
    {
      title: "Tech Selection",
      description: "Choose from a wide range of technologies with proper icons",
      icon: "🛠️",
    },
    {
      title: "Customizable Sections",
      description: "Add your experiences, skills, and projects with ease",
      icon: "📝",
    },
    {
      title: "Responsive Design",
      description: "Your portfolio will look great on all devices",
      icon: "📱",
    },
    {
      title: "Easy Deployment",
      description: "Simple instructions to deploy your site to the web",
      icon: "🚀",
    },
    {
      title: "Modern UI",
      description: "Beautiful design with animations and smooth scrolling",
      icon: "🎨",
    },
  ];

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

      <main className="min-h-screen">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 m-4">
              <FaArrowLeft size={14} />
              Back to Portfolio
            </Button>
          </Link>
        </div>

        {showForm ? (
          <div className="container px-4 md:px-6 mx-auto py-8">
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
                Fill out the form below to generate your own customized
                portfolio website. You&apos;ll receive a downloadable zip file
                containing your personalized Next.js project.
              </p>
            </motion.div>

            <GeneratePortfolioForm />
          </div>
        ) : (
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-center py-12">
              {/* Hero Section */}
              <motion.div
                className="flex-1 space-y-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                  ✨ Portfolio Generator
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                  Create Your Professional Portfolio in Minutes
                </h1>
                <p className="text-xl text-foreground/70">
                  Generate a stunning, customizable portfolio website with our
                  easy-to-use form. No coding required!
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button
                    size="lg"
                    className="gap-2 text-white"
                    onClick={() => setShowForm(true)}
                  >
                    Start Creating
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/">View Demo</Link>
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Features Section */}
            <motion.div
              className="py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
                <p className="text-foreground/70 max-w-2xl mx-auto">
                  Our portfolio generator includes all the features you need to
                  create a professional online presence.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="p-6 rounded-lg border border-foreground/10 bg-background/50 backdrop-blur-sm"
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 30px -15px rgba(0,0,0,0.2)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-3xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-foreground/70">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-12">
                <Button
                  size="lg"
                  className="gap-2 text-white"
                  onClick={() => setShowForm(true)}
                >
                  Create Your Portfolio Now
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}
