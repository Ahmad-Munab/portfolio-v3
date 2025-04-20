import { about } from "@/data/portfolio";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaExternalLinkAlt,
} from "react-icons/fa";

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-foreground/5">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          className="flex flex-col items-center text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Get In Touch
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full mt-4"></div>
          <p className="text-foreground/70 mt-4 max-w-[700px]">
            Feel free to reach out for collaborations or just a friendly hello!
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="bg-background p-6 rounded-lg shadow-sm border border-foreground/10 hover:border-primary/30 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{
                y: -5,
                boxShadow:
                  "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)",
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <FaEnvelope className="text-2xl text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-foreground/70 mb-3">{about.email}</p>
                <motion.a
                  href={`mailto:${about.email}`}
                  className="text-primary flex items-center gap-1 hover:underline"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Email <FaExternalLinkAlt size={12} />
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              className="bg-background p-6 rounded-lg shadow-sm border border-foreground/10 hover:border-primary/30 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{
                y: -5,
                boxShadow:
                  "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)",
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <FaPhone className="text-2xl text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Phone</h3>
                <p className="text-foreground/70 mb-3">{about.phone}</p>
                <motion.a
                  href={`tel:${about.phone}`}
                  className="text-primary flex items-center gap-1 hover:underline"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Call Me <FaExternalLinkAlt size={12} />
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              className="bg-background p-6 rounded-lg shadow-sm border border-foreground/10 hover:border-primary/30 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{
                y: -5,
                boxShadow:
                  "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)",
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <FaMapMarkerAlt className="text-2xl text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Location</h3>
                <p className="text-foreground/70 mb-3">{about.location}</p>
                <p className="text-primary">Available for Remote Work</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mt-12 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>
            <div className="flex gap-6">
              <motion.a
                href={about.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-foreground/5 p-4 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaLinkedin className="text-2xl" />
              </motion.a>
              <motion.a
                href={about.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-foreground/5 p-4 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub className="text-2xl" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
