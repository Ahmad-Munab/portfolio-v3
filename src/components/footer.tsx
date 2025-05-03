import { about } from "@/data/about";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaHeart,
  FaRegFileCode,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-12 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between mb-6">
          <motion.h2
            className="text-xl font-bold flex items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {about.name}
            <span className="text-[#3b82f6] text-2xl">.</span>
          </motion.h2>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.a
              href={about.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full hover:text-[#3b82f6] transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <FaGithub size={16} />
            </motion.a>
            <motion.a
              href={about.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full hover:text-[#3b82f6] transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <FaLinkedin size={16} />
            </motion.a>
            <motion.a
              href={`mailto:${about.email}`}
              className="rounded-full hover:text-[#3b82f6] transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <FaEnvelope size={16} />
            </motion.a>
            <motion.a
              href="/Resume.pdf"
              download
              className="flex items-center gap-1 px-3 py-1.5 bg-[#2578ff] text-white rounded-xl hover:bg-[#205fe7] transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <FaRegFileCode size={16} />
              <span className="text-xs font-medium">Resume</span>
            </motion.a>
          </motion.div>
        </div>

        <div className="border-t border-foreground/10 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/60 text-xs mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} {about.name}. All rights reserved.
          </p>
          <p className="text-foreground/60 text-xs flex items-center gap-1">
            Designed & Developed by{" "}
            <Link
              href={"https://munab.vercel.app"}
              className="underline hover:-translate-y-[0.15rem] transition-all duration-200"
            >
              Ahmad Munab
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
