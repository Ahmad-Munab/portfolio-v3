import { about } from "@/data/portfolio";
import { FaRegFileCode, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center py-20">
      <motion.div
        className="container px-4 md:px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="rounded-full bg-foreground/5 p-1 mb-4"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
            }}
          >
            <div className="rounded-full overflow-hidden w-32 h-32">
              <Image
                src="/Picture.jpg"
                alt="Profile Picture"
                className="w-full h-full object-cover"
                width={128}
                height={128}
              />
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {about.name}
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-foreground/80 max-w-[700px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {about.title}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-primary text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              href="/Resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaRegFileCode />
              Download Resume
            </motion.a>
            <motion.a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-all flex gap-2 items-center justify-center hover:bg-primary/10 hover:text-primary hover:border-primary text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              href={about.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Connect on LinkedIn
              <FaArrowRight />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
