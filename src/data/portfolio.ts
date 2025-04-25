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
  SiSupabase
} from "react-icons/si";

export const projects = [
  { 
    title: "ProjectMate", 
    url: "https://project-mate-develop.vercel.app", 
    image: "/project-images/project-mate.png", 
    description: "An AI Powered platform for project management and collaboration",
    tech: [SiNextdotjs, SiSupabase, SiPostgresql], 
  }, 
  { 
    title: "PromoBars", 
    url: "https://promo-bars.vercel.app", 
    image: "/project-images/promo-bars.png", 
    description: "A customizable promotion bar solution for e-commerce websites",
    tech: [SiNextdotjs, SiTailwindcss, SiMysql], 
  }, 
  { 
    title: "Nano Link", 
    url: "https://nano-link.vercel.app", 
    image: "/project-images/nano-link.png", 
    description: "URL shortener with analytics and custom links",
    tech: [SiNextdotjs, SiTailwindcss, SiPostgresql], 
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
      "Real-world project experience with teams in Bangladesh."
    ],
    tech: [SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiMongodb]
  }
];

export const skills = [
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "Python"]
  },
  {
    category: "Frontend",
    items: ["Next.js", "React.js", "Tailwind CSS", "Bootstrap"]
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "FastAPI"]
  },
  {
    category: "Database",
    items: ["MongoDB", "PostgreSQL"]
  },
  {
    category: "DevOps & Tools",
    items: ["Docker", "Cloudflare", "Git", "GitHub"]
  },
  {
    category: "AI",
    items: ["Groq"]
  }
];

export const about = {
  name: "Ahmad Munab",
  title: "Software Engineer | AI Enthusiast | SaaS Builder",
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
