import { skills } from "@/data/about";
import { motion } from "framer-motion";

export function SkillsSection() {
  return (
    <section id="skills">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          className="flex flex-col items-start mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold tracking-tighter">Skills</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {skills.map((skillGroup, groupIndex) => (
            <motion.div
              key={skillGroup.category}
              className="mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 * groupIndex }}
            >
              <h3 className="text-lg font-medium mb-3">
                {skillGroup.category}
              </h3>

              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      className="flex items-center gap-2 border border-foreground/10 px-3 py-2 rounded-xl cursor-pointer skill-item"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.2,
                        delay: 0.03 * index + 0.1 * groupIndex,
                      }}
                      whileHover={{
                        y: -3,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <span className="text-base transition-all duration-200">
                        <Icon
                          className="skill-icon"
                          style={{ color: skill.color }}
                        />
                      </span>
                      <span className="text-sm">{skill.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
