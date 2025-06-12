import { about } from "@/data/about";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import { GlowEffect } from "./ui/glow-effect";

export function HeroSection() {
  return (
    <section className="flex flex-col items-center py-8">
      <motion.div
        className="container px-4 md:px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative flex flex-col items-center justify-center min-h-[120px]">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <GlowEffect
              colors={["#FF5733", "#33FF57", "#3357FF", "#F1C40F"]}
              mode="colorShift"
              blur="soft"
              duration={3}
              scale={1}
            />
          </motion.div>
          <motion.div
            className="relative border border-foreground/10 rounded-xl p-6 bg-background w-full backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="rounded-full overflow-hidden w-16 h-16">
                <Image
                  src="/Picture.jpg"
                  alt="Profile Picture"
                  className="w-full h-full object-cover"
                  width={64}
                  height={64}
                />
              </div>
              <div className="text-center my-auto sm:text-left">
                <h1 className="text-2xl font-bold metallic-text-blue">
                  {about.name}
                </h1>
                <p className="text-sm text-foreground/70">{about.title}</p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-auto flex items-center gap-3">
                <motion.a
                  href={about.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-[#3b82f6] transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <FaGithub size={20} />
                </motion.a>
                <motion.a
                  href={about.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-[#3b82f6] transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <FaLinkedin size={20} />
                </motion.a>
                <motion.a
                  href={about.social.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-[#3b82f6] transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <svg
                    className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
