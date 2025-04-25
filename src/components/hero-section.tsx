import { about } from "@/data/portfolio";
import {
  FaRegFileCode,
  FaGithub,
  FaEnvelope,
  FaLinkedin,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="flex flex-col items-center pt-32 pb-16">
      <motion.div
        className="container px-4 md:px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div
            className="border border-foreground/10 rounded-xl p-6 bg-background/50 backdrop-blur-sm w-full max-w-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex items-center gap-4">
              <div className="rounded-full overflow-hidden w-16 h-16">
                <Image
                  src="/Picture.jpg"
                  alt="Profile Picture"
                  className="w-full h-full object-cover"
                  width={64}
                  height={64}
                />
              </div>
              <div className="text-left">
                <h1 className="text-xl font-bold">{about.name}</h1>
                <p className="text-sm text-foreground/70">{about.title}</p>
              </div>
              <div className="ml-auto flex gap-3">
                <motion.a
                  href={about.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-foreground transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <FaGithub size={20} />
                </motion.a>
                <motion.a
                  href={about.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-foreground transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <FaLinkedin size={20} />
                </motion.a>
                <motion.a
                  href={`mailto:${about.email}`}
                  className="text-foreground/80 hover:text-foreground transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <FaEnvelope size={20} />
                </motion.a>
                <motion.a
                  href="/Resume.pdf"
                  download
                  className="text-foreground/80 hover:text-foreground transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <FaRegFileCode size={20} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
