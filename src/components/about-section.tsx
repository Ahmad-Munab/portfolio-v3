import { about } from "@/data/about";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="about">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          className="flex flex-col items-start mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold tracking-tighter">About</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <motion.p
              className="text-foreground/80 leading-relaxed text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              {about.bio}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
