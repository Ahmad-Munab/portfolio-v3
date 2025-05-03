import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import Image from "next/image";

export function ProjectsSection() {
  return (
    <section id="projects">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          className="flex flex-col items-start mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold tracking-tighter">Projects</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-2 overflow-hidden rounded-xl border border-foreground/10 bg-background cursor-pointer hover:border-foreground/20 ease-in-out transition-all"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25 }}
              whileHover={{
                y: -3,
                borderColor: "rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className="relative h-40 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover rounded-xl transition-all duration-300 ease-in-out group-hover:scale-[103.5%]"
                />
                <div className="absolute inset-0 z-20 flex items-end p-3">
                  <h3 className="text-base font-bold text-white">
                    {project.title}
                  </h3>
                </div>
              </div>

              <div className="p-4">
                <p className="text-sm text-foreground/70 mb-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((Icon, i) => (
                    <div key={i} className="p-1 text-foreground/60">
                      <Icon className="text-sm" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
