import { projects } from "@/data/portfolio";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-foreground/5">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          className="flex flex-col items-center text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            My Projects
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full mt-4"></div>
          <p className="text-foreground/70 mt-4 max-w-[700px]">
            Here are some of the projects I&apos;ve worked on. Each project
            represents different skills and technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group relative overflow-hidden rounded-xl border border-foreground/10 bg-background"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)",
                borderColor: "rgba(59, 130, 246, 0.3)",
              }}
            >
              <div className="relative h-52 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 z-20 flex items-end p-4">
                  <h3 className="text-xl font-bold text-white">
                    {project.title}
                  </h3>
                </div>

                {/* Overlay with buttons */}
                <div className="absolute inset-0 bg-primary/80 z-30 flex flex-col justify-center items-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  <p className="text-white mb-6 text-center">
                    {project.description}
                  </p>
                  <div className="flex gap-4">
                    <motion.a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-primary px-4 py-2 rounded-full flex items-center gap-2 hover:bg-primary/10 hover:text-white border border-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Visit Site <FaExternalLinkAlt size={12} />
                    </motion.a>
                    <motion.a
                      href="#"
                      className="bg-transparent text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/10 border border-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Code <FaGithub size={14} />
                    </motion.a>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((Icon, i) => (
                    <div
                      key={i}
                      className="bg-foreground/5 p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      <Icon className="text-lg" />
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold">{project.title}</h3>
                  <motion.a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-primary hover:underline"
                    whileHover={{ x: 3 }}
                  >
                    Visit <FaExternalLinkAlt size={12} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
