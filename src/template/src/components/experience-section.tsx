import { experiences } from "@/data/experience";
import { motion } from "framer-motion";

export function ExperienceSection() {
  return (
    <section id="experience">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          className="flex flex-col items-start mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold tracking-tighter">Experience</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-foreground/10 rounded-full"></div>

          {/* Timeline items */}
          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <motion.div
                key={`${experience.company}-${index}`}
                className="relative pt-[0.3rem]"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-0 top-0 transform -translate-x-1/2 z-10 transition-all duration-200"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: index * 0.1 + 0.2 }}
                >
                  <div className="w-3 h-3 rounded-full bg-foreground"></div>
                </motion.div>

                {/* Content */}
                <motion.div
                  className="bg-background rounded-xl border border-foreground/10 p-5"
                  whileHover={{
                    y: -2,
                    borderColor: "rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <div className="flex justify-between items-start mb-2 flex-wrap gap-1">
                    <h3 className="text-base font-bold">{experience.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full border border-foreground/10 font-medium">
                      {experience.period}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground/80 mb-2">
                    {experience.company} • {experience.location}
                  </p>
                  <ul className="list-none space-y-1 text-foreground/70 text-sm">
                    {experience.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-foreground/10">
                    {experience.tech.map((Icon, i) => (
                      <div key={i} className="p-1 text-foreground/70">
                        <Icon className="text-sm" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
