import { about } from "@/data/about";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export function ContactSection() {
  return (
    <section id="contact">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          className="flex flex-col items-start mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold tracking-tighter">Contact</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              className="border border-foreground/10 p-4 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
              whileHover={{
                y: -2,
                borderColor: "rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className="flex flex-col items-center text-center">
                <FaEnvelope className="text-lg mb-2" />
                <h3 className="text-sm font-medium mb-1">Email</h3>
                <a
                  href={`mailto:${about.email}`}
                  className="text-xs text-foreground/70 hover:underline"
                >
                  {about.email}
                </a>
              </div>
            </motion.div>

            <motion.div
              className="border border-foreground/10 p-4 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 }}
              whileHover={{
                y: -2,
                borderColor: "rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className="flex flex-col items-center text-center">
                <FaMapMarkerAlt className="text-lg mb-2" />
                <h3 className="text-sm font-medium mb-1">Location</h3>
                <p className="text-xs text-foreground/70">{about.location}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
