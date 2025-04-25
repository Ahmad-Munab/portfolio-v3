import { skills } from "@/data/portfolio";
import { motion } from "framer-motion";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiCloudflare,
  SiGit,
  SiGithub,
} from "react-icons/si";
import { RiRobot2Line } from "react-icons/ri";

// Map skill names to their corresponding icons
const skillIcons: Record<string, JSX.Element> = {
  JavaScript: <SiJavascript className="text-[#F7DF1E]" />,
  TypeScript: <SiTypescript className="text-[#3178C6]" />,
  Python: <SiPython className="text-[#3776AB]" />,
  "Next.js": <SiNextdotjs className="text-foreground" />,
  "React.js": <SiReact className="text-[#61DAFB]" />,
  "Tailwind CSS": <SiTailwindcss className="text-[#06B6D4]" />,
  Bootstrap: <SiBootstrap className="text-[#7952B3]" />,
  "Node.js": <SiNodedotjs className="text-[#339933]" />,
  "Express.js": <SiExpress className="text-foreground" />,
  FastAPI: <SiFastapi className="text-[#009688]" />,
  MongoDB: <SiMongodb className="text-[#47A248]" />,
  PostgreSQL: <SiPostgresql className="text-[#4169E1]" />,
  Docker: <SiDocker className="text-[#2496ED]" />,
  Cloudflare: <SiCloudflare className="text-[#F38020]" />,
  Git: <SiGit className="text-[#F05032]" />,
  GitHub: <SiGithub className="text-foreground" />,
  Groq: <RiRobot2Line className="text-foreground" />,
};

export function SkillsSection() {
  return (
    <section id="skills" className="py-16">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          className="flex flex-col items-center text-center mb-8"
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
                {skillGroup.items.map((skill, index) => (
                  <motion.div
                    key={skill}
                    className="flex items-center gap-2 border border-foreground/10 px-3 py-2 rounded-md"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.2,
                      delay: 0.03 * index + 0.1 * groupIndex,
                    }}
                    whileHover={{
                      y: -2,
                      borderColor: "rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <span className="text-base">
                      {skillIcons[skill] || skill.charAt(0)}
                    </span>
                    <span className="text-sm">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function getCategoryIcon(category: string) {
  switch (category) {
    case "Languages":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m2 7 5 5-5 5V7Z"></path>
          <path d="m17 7 5 5-5 5V7Z"></path>
          <path d="M7 12h10"></path>
        </svg>
      );
    case "Frontend":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="3" rx="2"></rect>
          <path d="M7 7h10"></path>
          <path d="M7 12h10"></path>
          <path d="M7 17h10"></path>
        </svg>
      );
    case "Backend":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="8" x="2" y="2" rx="2"></rect>
          <rect width="20" height="8" x="2" y="14" rx="2"></rect>
          <line x1="6" x2="6.01" y1="6" y2="6"></line>
          <line x1="6" x2="6.01" y1="18" y2="18"></line>
        </svg>
      );
    case "Database":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        </svg>
      );
    case "DevOps & Tools":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
        </svg>
      );
    case "AI":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path>
        </svg>
      );
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 16v-4"></path>
          <path d="M12 8h.01"></path>
        </svg>
      );
  }
}
