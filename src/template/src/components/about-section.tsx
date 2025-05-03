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

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <div className="border border-foreground/10 p-4 rounded-xl hover:border-foreground/20 transition-colors">
                <h4 className="text-base font-medium mb-2">Personal</h4>
                <p className="text-foreground/70 text-sm">
                  Passionate about building scalable and resilient systems with
                  a focus on great user experiences. Utilizing AI to ship
                  solutions in light speed!
                </p>
              </div>

              <div className="border border-foreground/10 p-4 rounded-xl hover:border-foreground/20 transition-colors">
                <h4 className="text-base font-medium mb-2">Professional</h4>
                <p className="text-foreground/70 text-sm">
                  2+ years of experience across JavaScript and Python ecosystem,
                  contributing to high-impact projects.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
