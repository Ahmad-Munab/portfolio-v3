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