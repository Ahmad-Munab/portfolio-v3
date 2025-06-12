import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import fsExtra from "fs-extra";
import archiver from "archiver";
import { v4 as uuidv4 } from "uuid";
import { techIcons } from "@/data/tech-icons";

type exp = {
      title: string;
      company: string;
      location: string;
      period: string;
      description: string[];
      tech: string[];
    }

type project = {
      title: string;
      url: string;
      image: string;
      description: string;
      tech: string[];
    }

// Helper function to save a file from FormData
async function saveFormFile(formData: FormData, name: string, uploadDir: string): Promise<string | null> {
  const file = formData.get(name) as File | null;

  if (!file || !(file instanceof File)) {
    return null;
  }

  const filePath = path.join(uploadDir, `${name}-${Date.now()}${path.extname(file.name)}`);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  return filePath;
}

export async function POST(req: NextRequest) {
  try {
    // Create temporary directories
    const uploadDir = path.join(process.cwd(), "tmp", "uploads");
    await fsExtra.ensureDir(uploadDir);

    // Generate a unique ID for this portfolio
    const portfolioId = uuidv4();
    const tempDir = path.join(process.cwd(), "tmp", `portfolio-${portfolioId}`);

    // Create the temporary directory
    await fsExtra.ensureDir(tempDir);

    // Parse the form data
    const formData = await req.formData();

    // Save uploaded files
    const profilePicturePath = await saveFormFile(formData, "profilePicture", uploadDir);
    const resumePath = await saveFormFile(formData, "resume", uploadDir);

    // Save project images
    const projectImagePaths: Record<string, string> = {};

    // Get all form keys
    const formKeys = Array.from(formData.keys());

    // Find project image keys (they should be in format projectImage-0, projectImage-1, etc.)
    const projectImageKeys = formKeys.filter(key => key.startsWith('projectImage-'));

    // Save each project image
    for (const key of projectImageKeys) {
      const imagePath = await saveFormFile(formData, key, uploadDir);
      if (imagePath) {
        projectImagePaths[key] = imagePath;
      }
    }

    // Get form fields
    const name = formData.get("name") as string;
    const title = formData.get("title") as string;
    const location = formData.get("location") as string;
    const email = formData.get("email") as string;
    const bio = formData.get("bio") as string;
    const personalBio = formData.get("personalBio") as string;
    const professionalBio = formData.get("professionalBio") as string;
    const github = formData.get("github") as string || "";
    const linkedin = formData.get("linkedin") as string || "";
    const experiences = JSON.parse(formData.get("experiences") as string);
    const skills = JSON.parse(formData.get("skills") as string);
    const projects = JSON.parse(formData.get("projects") as string);

    // Copy the template files to the temporary directory
    await fsExtra.copy(path.join(process.cwd(), "src", "template"), tempDir);

    // Process the form data and update the template files

    // 1. Update about.ts with personal information
    const aboutData = {
      name,
      nickName: name.split(" ")[0],
      title,
      location,
      email,
      website: "",
      social: {
        github,
        linkedin,
      },
      bio,
      personalBio,
      professionalBio,
      // Note: phone is intentionally omitted as it's optional
    };

    // Collect all unique tech icons used across all skill categories
    const allSkillIcons = new Set<string>();
    skills.forEach((category: {
      category: string;
      items: { name: string; icon: string; color: string }[];
      selectedTechs: string[];
    }) => {
      category.selectedTechs.forEach((tech: string) => {
        allSkillIcons.add(tech);
      });
    });

    // Map tech names to icon imports for skills
    const skillIconMap = new Map<string, string>();
    allSkillIcons.forEach((tech: string) => {
      // Handle special cases
      if (tech === "shadcn UI") {
        skillIconMap.set(tech, "LuComponent");
      } else if (tech === "Aceternity UI") {
        skillIconMap.set(tech, "MdAnimation");
      } else if (tech === "Groq") {
        skillIconMap.set(tech, "RiRobot2Line");
      } else {
        // Convert tech name to icon name (e.g., "React" -> "SiReact")
        // Fix casing issues for common technologies
        if (tech === "JavaScript") {
          skillIconMap.set(tech, "SiJavascript");
        } else if (tech === "TypeScript") {
          skillIconMap.set(tech, "SiTypescript");
        } else if (tech === "PHP") {
          skillIconMap.set(tech, "SiPhp");
        } else if (tech === "Python") {
          skillIconMap.set(tech, "SiPython");
        } else {
          const iconName = `Si${tech.replace(/\./g, "").replace(/\s/g, "")}`;
          skillIconMap.set(tech, iconName);
        }
      }
    });

    // Transform skills data to match the expected format with proper icon references
    const transformedSkills = skills.map((category: {
      category: string;
      items: { name: string; icon: string; color: string }[];
      selectedTechs: string[];
    }) => {
      return {
        category: category.category,
        items: category.selectedTechs.map((techName: string) => {
          const tech = techIcons.find((t: { name: string; color: string }) => t.name === techName);
          return {
            name: techName,
            icon: skillIconMap.get(techName) || "SiNextdotjs", // Use the mapped icon name
            color: tech?.color || "#FFFFFF",
          };
        }),
      };
    });

    // Create the import statements for skills
    const skillSiImports = Array.from(skillIconMap.values())
      .filter(icon => icon.startsWith("Si"))
      .sort()
      .join(",\n  ");

    // Check if we need other imports for skills
    const skillNeedsRiImport = Array.from(skillIconMap.values()).some(icon => icon === "RiRobot2Line");
    const skillNeedsMdImport = Array.from(skillIconMap.values()).some(icon => icon === "MdAnimation");
    const skillNeedsLuImport = Array.from(skillIconMap.values()).some(icon => icon === "LuComponent");

    // Create the about.ts file content with proper imports
    const aboutFileContent = `${skillNeedsRiImport ? 'import { RiRobot2Line } from "react-icons/ri";\n' : ''}${skillNeedsLuImport ? 'import { LuComponent } from "react-icons/lu";\n' : ''}${skillNeedsMdImport ? 'import { MdAnimation } from "react-icons/md";\n' : ''}import {
  ${skillSiImports}
} from "react-icons/si";

export const skills = ${JSON.stringify(transformedSkills, null, 2)};

export const about = ${JSON.stringify(aboutData, null, 2)};
`;

    await fs.writeFile(path.join(tempDir, "src", "data", "about.ts"), aboutFileContent);

    // 2. Update experience.ts with professional experience
    // Transform experiences data to match the expected format
    const transformedExperiences = experiences.map((exp: {
      title: string;
      company: string;
      location: string;
      period: string;
      description: string;
      technologies: string;
      selectedTechs: string[];
    }) => {
      // Use the selected techs instead of parsing the technologies string
      const techArray = exp.selectedTechs || [];

      // We'll map these to proper icon imports later
      const techIcons = techArray;

      return {
        title: exp.title,
        company: exp.company,
        location: exp.location,
        period: exp.period,
        description: exp.description.split("\\n"),
        tech: techIcons,
      };
    });

    // Collect all unique tech icons used across all experiences
    const allExpTechIcons = new Set<string>();
    experiences.forEach((exp: {
      title: string;
      company: string;
      location: string;
      period: string;
      description: string;
      technologies: string;
      selectedTechs: string[];
    }) => {
      exp.selectedTechs.forEach((tech: string) => {
        allExpTechIcons.add(tech);
      });
    });

    // Map tech names to icon imports for experiences
    const expIconMap = new Map<string, string>();
    allExpTechIcons.forEach((tech: string) => {
      // Handle special cases
      if (tech === "shadcn UI") {
        expIconMap.set(tech, "LuComponent");
      } else if (tech === "Aceternity UI") {
        expIconMap.set(tech, "MdAnimation");
      } else if (tech === "Groq") {
        expIconMap.set(tech, "RiRobot2Line");
      } else {
        // Convert tech name to icon name (e.g., "React" -> "SiReact")
        // Fix casing issues for common technologies
        if (tech === "JavaScript") {
          expIconMap.set(tech, "SiJavascript");
        } else if (tech === "TypeScript") {
          expIconMap.set(tech, "SiTypescript");
        } else if (tech === "PHP") {
          expIconMap.set(tech, "SiPhp");
        } else if (tech === "Python") {
          expIconMap.set(tech, "SiPython");
        } else {
          const iconName = `Si${tech.replace(/\./g, "").replace(/\s/g, "")}`;
          expIconMap.set(tech, iconName);
        }
      }
    });

    // Create the import statements for experiences
    const expSiImports = Array.from(expIconMap.values())
      .filter(icon => icon.startsWith("Si"))
      .sort()
      .join(",\n  ");

    // Check if we need other imports for experiences
    const expNeedsRiImport = Array.from(expIconMap.values()).some(icon => icon === "RiRobot2Line");
    const expNeedsMdImport = Array.from(expIconMap.values()).some(icon => icon === "MdAnimation");
    const expNeedsLuImport = Array.from(expIconMap.values()).some(icon => icon === "LuComponent");

    // Create the experiences with actual component references
    const experiencesWithComponents = transformedExperiences.map((exp: exp) => {
      const techComponents = exp.tech.map((techName: string) => {
        return expIconMap.get(techName) || "SiNextdotjs"; // Fallback to a common icon
      });

      return {
        ...exp,
        tech: techComponents
      };
    });

    // Create the experience.ts file content with proper imports
    const experienceFileContent = `${expNeedsRiImport ? 'import { RiRobot2Line } from "react-icons/ri";\n' : ''}${expNeedsLuImport ? 'import { LuComponent } from "react-icons/lu";\n' : ''}${expNeedsMdImport ? 'import { MdAnimation } from "react-icons/md";\n' : ''}import {
  ${expSiImports}
} from "react-icons/si";

export const experiences = [
  ${experiencesWithComponents.map((exp: exp) => `{
    title: ${JSON.stringify(exp.title)},
    company: ${JSON.stringify(exp.company)},
    location: ${JSON.stringify(exp.location)},
    period: ${JSON.stringify(exp.period)},
    description: ${JSON.stringify(exp.description)},
    tech: [${exp.tech.join(', ')}],
  }`).join(',\n  ')}
];
`;

    await fs.writeFile(path.join(tempDir, "src", "data", "experience.ts"), experienceFileContent);

    // 3. Update projects.ts with project information
    // Transform projects data to match the expected format
    const transformedProjects = projects.map((project: {
      title: string;
      description: string;
      technologies: string;
      url: string;
      image: File | null;
      selectedTechs: string[];
    }, index: number) => {
      // Split technologies string into an array and map to icon imports
      const techArray = project.selectedTechs || [];

      // We need to collect all unique tech icons to ensure they're imported
      const techIcons = techArray;

      // Check if there's an image for this project
      const imageKey = `projectImage-${index}`;
      const hasCustomImage = imageKey in projectImagePaths;

      return {
        title: project.title,
        url: project.url,
        image: hasCustomImage ? `/project-images/project-${index}.${path.extname(projectImagePaths[imageKey]).substring(1)}` : "/project-images/placeholder.png",
        description: project.description,
        tech: techIcons,
      };
    });

    // Collect all unique tech icons used across all projects
    const allTechIcons = new Set<string>();
    projects.forEach((project: {
      title: string;
      description: string;
      technologies: string;
      url: string;
      image: File | null;
      selectedTechs: string[];
    }) => {
      project.selectedTechs.forEach((tech: string) => {
        allTechIcons.add(tech);
      });
    });

    // Map tech names to icon imports
    const techIconMap = new Map<string, string>();
    allTechIcons.forEach(tech => {
      // Handle special cases
      if (tech === "shadcn UI") {
        techIconMap.set(tech, "SiShadcnui");
      } else if (tech === "Aceternity UI") {
        techIconMap.set(tech, "MdAnimation");
      } else if (tech === "Groq") {
        techIconMap.set(tech, "RiRobot2Line");
      } else {
        // Convert tech name to icon name (e.g., "React" -> "SiReact")
        // Fix casing issues for common technologies
        if (tech === "JavaScript") {
          techIconMap.set(tech, "SiJavascript");
        } else if (tech === "TypeScript") {
          techIconMap.set(tech, "SiTypescript");
        } else if (tech === "PHP") {
          techIconMap.set(tech, "SiPhp");
        } else if (tech === "Python") {
          techIconMap.set(tech, "SiPython");
        } else {
          const iconName = `Si${tech.replace(/\./g, "").replace(/\s/g, "")}`;
          techIconMap.set(tech, iconName);
        }
      }
    });

    // Create the import statements
    const siImports = Array.from(techIconMap.values())
      .filter(icon => icon.startsWith("Si"))
      .sort()
      .join(",\n  ");

    // Check if we need other imports
    const needsRiImport = Array.from(techIconMap.values()).some(icon => icon === "RiRobot2Line");
    const needsMdImport = Array.from(techIconMap.values()).some(icon => icon === "MdAnimation");
    const needsLuImport = Array.from(techIconMap.values()).some(icon => icon === "LuComponent");

    // Create the projects with actual component references
    const projectsWithComponents = transformedProjects.map((project: project) => {
      const techComponents = project.tech.map((techName: string) => {
        return techIconMap.get(techName) || "SiNextdotjs"; // Fallback to a common icon
      });

      return {
        ...project,
        tech: techComponents
      };
    });

    // Create the projects.ts file content with proper imports and component references
    const projectsFileContent = `${needsRiImport ? 'import { RiRobot2Line } from "react-icons/ri";\n' : ''}${needsMdImport ? 'import { MdAnimation } from "react-icons/md";\n' : ''}${needsLuImport ? 'import { LuComponent } from "react-icons/lu";\n' : ''}import {
  ${siImports}
} from "react-icons/si";

export const projects = [
  ${projectsWithComponents.map((project: project) => `{
    title: ${JSON.stringify(project.title)},
    url: ${JSON.stringify(project.url)},
    image: ${JSON.stringify(project.image)},
    description: ${JSON.stringify(project.description)},
    tech: [${project.tech.join(', ')}],
  }`).join(',\n  ')}
];
`;

    await fs.writeFile(path.join(tempDir, "src", "data", "projects.ts"), projectsFileContent);

    // 4. Copy uploaded files to the appropriate locations
    if (profilePicturePath) {
      // Copy profile picture
      await fsExtra.copy(
        profilePicturePath,
        path.join(tempDir, "public", "Picture.jpg")
      );

      // Also copy it as favicon.ico
      await fsExtra.copy(
        profilePicturePath,
        path.join(tempDir, "public", "favicon.ico")
      );
    }

    if (resumePath) {
      await fsExtra.copy(
        resumePath,
        path.join(tempDir, "public", "Resume.pdf")
      );
    }

    // Copy the fixed skills-section.tsx file
    await fsExtra.copy(
      path.join(process.cwd(), "src", "template", "src", "components", "skills-section.tsx.new"),
      path.join(tempDir, "src", "components", "skills-section.tsx")
    );

    // Create a placeholder directory for project images
    await fsExtra.ensureDir(path.join(tempDir, "public", "project-images"));

    // Create a placeholder image for projects
    const placeholderImagePath = path.join(tempDir, "public", "project-images", "placeholder.png");

    // Create a simple placeholder image (1x1 transparent pixel)
    const transparentPixel = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');
    await fs.writeFile(placeholderImagePath, transparentPixel);

    // Copy project images to the project directory
    for (let i = 0; i < projects.length; i++) {
      const imageKey = `projectImage-${i}`;
      if (imageKey in projectImagePaths) {
        const imagePath = projectImagePaths[imageKey];
        const extension = path.extname(imagePath);
        await fsExtra.copy(
          imagePath,
          path.join(tempDir, "public", "project-images", `project-${i}${extension}`)
        );
      }
    }

    // 5. Create a zip file of the portfolio
    const zipFilePath = path.join(process.cwd(), "tmp", `portfolio-${portfolioId}.zip`);
    const output = fsExtra.createWriteStream(zipFilePath);
    const archive = archiver("zip", {
      zlib: { level: 9 }, // Compression level
    });

    // Pipe the archive to the file
    archive.pipe(output);

    // Add the portfolio directory to the archive
    archive.directory(tempDir, false);

    // Finalize the archive
    await archive.finalize();

    // Wait for the output stream to finish
    await new Promise<void>((resolve, reject) => {
      output.on("close", () => resolve());
      output.on("error", (err) => reject(err));
    });

    // Read the zip file
    const zipFile = await fs.readFile(zipFilePath);

    // Clean up temporary files
    await fsExtra.remove(tempDir);
    await fsExtra.remove(zipFilePath);

    // Clean up uploaded files
    if (profilePicturePath) {
      await fsExtra.remove(profilePicturePath);
    }
    if (resumePath) {
      await fsExtra.remove(resumePath);
    }

    // Clean up project images
    for (const imagePath of Object.values(projectImagePaths)) {
      await fsExtra.remove(imagePath);
    }

    // Create a sanitized name for the portfolio
    const sanitizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');

    // Return the zip file as a download
    return new NextResponse(zipFile, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename=portfolio-of-${sanitizedName}-${Date.now()}.zip`,
      },
    });
  } catch (error) {
    console.error("Error generating portfolio:", error);
    return NextResponse.json(
      { error: "Failed to generate portfolio" },
      { status: 500 }
    );
  }
}
