"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Github, Code2 } from "lucide-react";
import { about } from "@/data/about";

export default function GeneratePortfolioPage() {
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    left: `${Math.random() * 100}vw`,
    top: `${Math.random() * 100}vh`,
    duration: `${Math.random() * 2 + 1}s`,
    delay: `${Math.random() * 2}s`,
    opacity: `${Math.random() * 0.5 + 0.5}`,
  }));

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Enhanced Stars background */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: star.left,
            top: star.top,
            opacity: star.opacity,
          }}
          animate={{
            opacity: [
              star.opacity,
              `${Number.parseFloat(star.opacity) * 0.3}`,
              star.opacity,
            ],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Number.parseFloat(star.duration.replace("s", "")),
            repeat: Number.POSITIVE_INFINITY,
            delay: Number.parseFloat(star.delay.replace("s", "")),
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 mb-8 sm:mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm sm:text-base">Back to Home</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-12 sm:mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="text-white">Create Your</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Portfolio
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Choose the path that matches your technical expertise and get
            started building your dream portfolio
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mx-auto">
          {/* Technical Users Option - Black & White */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
            <div className="relative bg-black p-6 sm:p-8 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all duration-500 group-hover:transform group-hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gray-900 rounded-xl">
                  <Code2 className="w-6 h-6 text-gray-300" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Technical Users
                  </h2>
                  <p className="text-sm text-gray-400">
                    For developers & coders
                  </p>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Fork the repository and customize every aspect of your
                portfolio. Full control over design, functionality, and
                deployment.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                  <span>Complete source code access</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                  <span>Unlimited customization</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                  <span>Self-hosted deployment</span>
                </div>
              </div>

              <a
                href="https://github.com/Ahmad-Munab/portfolio-v3"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:bg-gray-100 hover:transform hover:scale-105 w-full sm:w-auto justify-center group/btn"
              >
                <Github className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                Fork on GitHub
              </a>
            </div>
          </motion.div>

          {/* Non-Technical Users Option - Blue Highlighted */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative bg-gradient-to-br from-black to-blue-950/90 p-6 sm:p-8 rounded-2xl border border-blue-800/30 hover:border-blue-700/50 transition-all duration-500 group-hover:transform group-hover:scale-[1.02] ring-1 ring-blue-900/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-900/30 rounded-xl">
                  {/* X Logo (SVG) */}
                  <svg
                    className="w-6 h-6 text-blue-400"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Personalized Setup
                  </h2>
                  <p className="text-sm text-blue-300">
                    Direct guidance & support
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 bg-blue-900/20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium mb-4">
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Connect with me
              </div>

              <p className="text-blue-100 mb-6 leading-relaxed">
                Let me personally guide you through creating your professional
                portfolio. I&apos;ll provide expert advice and help you showcase your
                work effectively.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-sm text-blue-200">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  <span>One-on-one consultation</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-200">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  <span>Tailored portfolio strategy</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-200">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  <span>Professional guidance</span>
                </div>
              </div>

              <a
                href={about.social.x}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:transform hover:scale-105 shadow-lg shadow-blue-900/25 w-full sm:w-auto justify-center group/btn"
              >
                {/* X Logo (SVG) */}
                <svg
                  className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Connect on X
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
