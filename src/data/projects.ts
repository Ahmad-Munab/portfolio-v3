import { RiRobot2Line } from "react-icons/ri";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiPostgresql,
  SiFramer,
  SiOpenai,
  SiPython,
  SiFastapi,
  SiSupabase,
  SiShadcnui,
  SiTypescript,
} from "react-icons/si";

export const projects = [
  {
    title: "AdmitPath",
    url: "https://admit-path.com",
    image: "/project-images/admit-path.png",
    description: "A Marketplace Connecting College Applicants and Counselors",
    tech: [
      SiNextdotjs,
      SiTypescript,
      SiTailwindcss,
      SiPython,
      SiFastapi,
      SiPostgresql,
      SiSupabase,
    ],
  },
  {
    title: "Preparify",
    url: "https://preparify-mvp.vercel.app/",
    image: "/project-images/preparify.png",
    description: "AI Powered Mock Interview Prepearation Platform for the big4",
    tech: [SiNextdotjs, SiTypescript, SiTailwindcss, SiPostgresql, SiOpenai],
  },
  {
    title: "ProjectMate",
    url: "https://project-mate-develop.vercel.app",
    image: "/project-images/project-mate.png",
    description:
      "An AI Powered platform for project management and collaboration",
    tech: [SiNextdotjs, SiTypescript, SiSupabase, SiPostgresql, RiRobot2Line],
  },
  {
    title: "PromoBars",
    url: "https://promo-bars.vercel.app",
    image: "/project-images/promo-bars.png",
    description:
      "A customizable promotion bar solution for e-commerce websites",
    tech: [SiNextdotjs, SiTypescript, SiTailwindcss, SiShadcnui],
  },
  {
    title: "Nano Link",
    url: "https://nano-link.vercel.app",
    image: "/project-images/nano-link.png",
    description: "URL shortener with analytics and custom links",
    tech: [SiNextdotjs, SiTypescript, SiTailwindcss, SiShadcnui, SiPostgresql],
  },
  {
    title: "Munab AI",
    url: "https://munab-ai.vercel.app",
    image: "/project-images/munab-ai.png",
    description: "AI-powered assistant for developers and content creators",
    tech: [SiNextdotjs, SiTypescript, SiTailwindcss, SiOpenai],
  },
  {
    title: "Munab Portfolio-v2",
    url: "https://munab-v2.vercel.app",
    image: "/project-images/portfolio-v2.png",
    description: "Second iteration with improved design and animations",
    tech: [SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer],
  },

  {
    title: "B360",
    url: "https://b360-one.vercel.app/",
    image: "/project-images/b360.png",
    description: "Customer support and IT solutions",
    tech: [SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer],
  },
];
