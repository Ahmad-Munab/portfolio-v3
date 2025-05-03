import { RiRobot2Line } from "react-icons/ri";
import { LuComponent } from "react-icons/lu";
import { MdAnimation } from "react-icons/md";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiMysql,
  SiPostgresql,
  SiOpenai,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPython,
  SiFastapi,
  SiJavascript,
  SiTypescript,
  SiBootstrap,
  SiDocker,
  SiCloudflare,
  SiGit,
  SiGithub
} from "react-icons/si";


export const skills = [
  {
    category: "Languages",
    items: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Python", icon: SiPython, color: "#3776AB" }
    ]
  },
  {
    category: "Frontend",
    items: [
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
      { name: "shadcn UI", icon: LuComponent, color: "#FFFFFF" },
      { name: "Aceternity UI", icon: MdAnimation, color: "#FFFFFF" }
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#339933" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688" }
    ]
  },
  {
    category: "Database",
    items: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" }
    ]
  },
  {
    category: "DevOps & Tools",
    items: [
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Cloudflare", icon: SiCloudflare, color: "#F38020" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#FFFFFF" }
    ]
  },
  {
    category: "AI",
    items: [
      { name: "Groq", icon: RiRobot2Line, color: "#FFFFFF" },
      { name: "OpenAI", icon: SiOpenai, color: "#FFFFFF" }
    ]
  }
];

export const about = {
  name: "Ahmad Munab",
  nickName: "Munab",
  title: "Co-founder @ZenDevz | AI Enthusiast | SaaS Builder",
  location: "Dhaka, Bangladesh",
  phone: "+880 1968450105",
  email: "ahmadmunab22@gmail.com",
  website: "https://munab.vercel.app",
  social: {
    linkedin: "https://www.linkedin.com/in/ahmad-munab/",
    github: "https://github.com/ahmad-munab"
  },
  bio: "I'm a Software Engineer passionate about building scalable and resilient systems. With 2+ years of experience across the JavaScript and Python ecosystem, I've contributed to high-impact projects at AdmitPath, Minitzgo, Pranerbangla.com, and more. I thrive on designing great user experiences and am deeply passionate about AI and ML."
};
