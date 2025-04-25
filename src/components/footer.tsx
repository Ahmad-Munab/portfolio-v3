import { about } from "@/data/portfolio";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaHeart,
  FaArrowUp,
} from "react-icons/fa";
import { motion } from "framer-motion";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground/5 pt-16 pb-8 relative">
      <div className="container mx-auto px-4 md:px-6 ">
        <div className="flex justify-between mb-6">
          <motion.h2
            className="text-2xl font-bold flex items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ahmad<span className="text-primary">.</span>
          </motion.h2>

          <motion.div
            className="flex space-x-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.a
              href={about.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-foreground/5 p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
            >
              <FaLinkedin size={18} />
            </motion.a>
            <motion.a
              href={about.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-foreground/5 p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
            >
              <FaGithub size={18} />
            </motion.a>
            <motion.a
              href={`mailto:${about.email}`}
              className="bg-foreground/5 p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
            >
              <FaEnvelope size={18} />
            </motion.a>
          </motion.div>
        </div>

        <div className="border-t border-foreground/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/60 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Ahmad Munab. All rights reserved.
          </p>
          <p className="text-foreground/60 text-sm flex items-center gap-1">
            Made with <FaHeart className="text-red-500" size={12} /> By Munab :
            )
          </p>
        </div>
      </div>
    </footer>
  );
}
