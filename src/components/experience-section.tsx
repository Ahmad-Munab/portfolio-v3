import { experiences } from "@/data/portfolio";
import { motion } from "framer-motion";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          className="flex flex-col items-center text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Professional Experience
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full mt-4"></div>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20 rounded-full"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={`${experience.company}-${index}`}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className={`flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline dot and year */}
                  <motion.div
                    className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
                      {experience.period.split("–")[0].trim()}
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div
                    className={`md:w-1/2 ${
                      index % 2 === 0 ? "md:pl-12" : "md:pr-12"
                    } pl-16 md:pl-0`}
                  >
                    <motion.div
                      className="bg-background p-6 rounded-lg shadow-sm border border-foreground/10"
                      whileHover={{
                        y: -5,
                        boxShadow:
                          "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)",
                        borderColor: "rgba(59, 130, 246, 0.3)",
                      }}
                    >
                      <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                        <h3 className="text-xl font-bold">
                          {experience.title}
                        </h3>
                        <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                          {experience.period}
                        </span>
                      </div>
                      <p className="text-lg font-medium text-foreground/80 mb-3 flex items-center gap-2">
                        <span className="bg-foreground/5 p-1 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              width="20"
                              height="14"
                              x="2"
                              y="7"
                              rx="2"
                              ry="2"
                            />
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                          </svg>
                        </span>
                        {experience.company} • {experience.location}
                      </p>
                      <ul className="list-none space-y-2 text-foreground/70">
                        {experience.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-foreground/10">
                        {experience.tech.map((Icon, i) => (
                          <div
                            key={i}
                            className="bg-foreground/5 p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                          >
                            <Icon className="text-xl" />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty space for the other side */}
                  <div className="md:w-1/2"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Timeline end */}
          <motion.div
            className="absolute left-8 md:left-1/2 transform -translate-x-1/2 bottom-0 mt-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-primary"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
