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
      {/* Back to top button */}
      <motion.button
        onClick={scrollToTop}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
        whileHover={{
          y: -5,
          boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)",
        }}
        whileTap={{ y: 0 }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <FaArrowUp />
      </motion.button>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <motion.h2
              className="text-2xl font-bold mb-4 flex items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ahmad<span className="text-primary">.</span>
            </motion.h2>
            <motion.p
              className="text-foreground/70 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Software Engineer passionate about building scalable and resilient
              systems with a focus on great user experiences.
            </motion.p>
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

          <div>
            <motion.h3
              className="text-lg font-semibold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Quick Links
            </motion.h3>
            <motion.ul
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {[
                { name: "Home", href: "#home" },
                { name: "About", href: "#about" },
                { name: "Skills", href: "#skills" },
                { name: "Experience", href: "#experience" },
                { name: "Projects", href: "#projects" },
                { name: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-foreground/70 hover:text-primary transition-colors"
                    whileHover={{ x: 3 }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </motion.ul>
          </div>

          <div>
            <motion.h3
              className="text-lg font-semibold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Contact
            </motion.h3>
            <motion.ul
              className="space-y-2 text-foreground/70"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <li className="flex items-center gap-2">
                <span className="font-medium">Email:</span>
                <a
                  href={`mailto:${about.email}`}
                  className="hover:text-primary transition-colors"
                >
                  {about.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-medium">Phone:</span>
                <a
                  href={`tel:${about.phone}`}
                  className="hover:text-primary transition-colors"
                >
                  {about.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-medium">Location:</span>
                <span>{about.location}</span>
              </li>
            </motion.ul>
          </div>
        </div>

        <div className="border-t border-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center">
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
