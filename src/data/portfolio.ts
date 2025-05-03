import { RiRobot2Line } from "react-icons/ri";
import { LuComponent } from "react-icons/lu";
import { MdAnimation } from "react-icons/md";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiMysql,
  SiPostgresql,
  SiFramer,
  SiOpenai,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPython,
  SiFastapi,
  SiSupabase,
  SiShadcnui,
  SiJavascript,
  SiTypescript,
  SiBootstrap,
  SiDocker,
  SiCloudflare,
  SiGit,
  SiGithub
} from "react-icons/si";

export const projects = [
  {
    title: "AdmitPath",
    url: "https://admit-path.com",
    image: "/project-images/admit-path.png",
    description: "A Marketplace Connecting College Applicants and Counselors",
    tech: [SiNextdotjs, SiTailwindcss, SiPython, SiFastapi, SiPostgresql, SiSupabase],
  },
  {
    title: "ProjectMate",
    url: "https://project-mate-develop.vercel.app",
    image: "/project-images/project-mate.png",
    description: "An AI Powered platform for project management and collaboration",
    tech: [SiNextdotjs, SiSupabase, SiPostgresql, RiRobot2Line],
  },
  {
    title: "PromoBars",
    url: "https://promo-bars.vercel.app",
    image: "/project-images/promo-bars.png",
    description: "A customizable promotion bar solution for e-commerce websites",
    tech: [SiNextdotjs, SiTailwindcss, SiShadcnui],
  },
  {
    title: "Nano Link",
    url: "https://nano-link.vercel.app",
    image: "/project-images/nano-link.png",
    description: "URL shortener with analytics and custom links",
    tech: [SiNextdotjs, SiTailwindcss, SiShadcnui, SiPostgresql],
  },
  {
    title: "Munab AI",
    url: "https://munab-ai.vercel.app",
    image: "/project-images/munab-ai.png",
    description: "AI-powered assistant for developers and content creators",
    tech: [SiNextdotjs, SiTailwindcss, SiOpenai],
  },
  {
    title: "Munab Portfolio-v2",
    url: "https://munab-v2.vercel.app",
    image: "/project-images/portfolio-v2.png",
    description: "Second iteration with improved design and animations",
    tech: [SiNextdotjs, SiTailwindcss, SiFramer],
  },
];

export const experiences = [
  {
    title: "Co-founder",
    company: "ZenDevz",
    location: "Bangladesh",
    period: "2024 – Present",
    description: [
      "Co-founding ZenDevz. A startup Providing lit software solutions by the Gen-z",
    ],
    tech: [SiNextdotjs, SiTailwindcss, SiPython, SiFastapi, SiPostgresql]
  },
  {
    title: "Full Stack Engineer",
    company: "AdmitPath",
    location: "Singapore",
    period: "2024 – 2025",
    description: [
      "Developed the admit-path.com platform with a remote team.",
      "Worked with technologies like Next.js, Tailwind CSS, Python, FastAPI, and PostgreSQL."
    ],
    tech: [SiNextdotjs, SiTailwindcss, SiPython, SiFastapi, SiPostgresql]
  },
  {
    title: "Web Development Intern",
    company: "Minitzgo",
    location: "India",
    period: "2024",
    description: [
      "Worked on the frontend of minitzgo.com, a one-minute fashion delivery company.",
      "Used React.js, Bootstrap, Tailwind CSS, and Node.js."
    ],
    tech: [SiReact, SiTailwindcss, SiNodedotjs]
  },
  {
    title: "Freelance Developer",
    company: "Various Clients",
    location: "Remote",
    period: "2022 – 2025",
    description: [
      "Worked with various clients and companies globally.",
      "Built and collaborated on platforms like pranerbangla.com, Muse, etc.",
      "Real-world project experience with teams in Bangladesh.",
      "Utilized PostgreSQL for database management in several projects."
    ],
    tech: [SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql]
  }
];

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
