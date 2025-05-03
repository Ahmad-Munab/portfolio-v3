import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import fsExtra from "fs-extra";
import archiver from "archiver";
import { v4 as uuidv4 } from "uuid";

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
    };

    // Transform skills data to match the expected format
    const transformedSkills = skills.map((category: {
      category: string;
      items: { name: string; icon: string; color: string }[];
      selectedTechs: string[];
    }) => ({
      category: category.category,
      items: category.items.map((item) => ({
        name: item.name,
        icon: item.icon,
        color: item.color,
      })),
    }));

    // Create the about.ts file content
    const aboutFileContent = `import { RiRobot2Line } from "react-icons/ri";
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
      // Split technologies string into an array and map to icon imports
      const techArray = exp.technologies.split(",").map((tech: string) => tech.trim());
      const techIcons = techArray.map((tech: string) => {
        // Convert tech name to icon name (e.g., "React" -> "SiReact")
        return `Si${tech.replace(/\./g, "").replace(/\s/g, "")}`;
      });

      return {
        title: exp.title,
        company: exp.company,
        location: exp.location,
        period: exp.period,
        description: exp.description.split("\\n"),
        tech: techIcons,
      };
    });

    // Create the experience.ts file content
    const experienceFileContent = `import {
  SiNextdotjs,
  SiTailwindcss,
  SiPostgresql,
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
import { RiRobot2Line } from "react-icons/ri";

export const experiences = ${JSON.stringify(transformedExperiences, null, 2)};
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
      const techArray = project.technologies ? project.technologies.split(",").map((tech: string) => tech.trim()) : [];
      const techIcons = techArray.map((tech: string) => {
        // Convert tech name to icon name (e.g., "React" -> "SiReact")
        return tech.startsWith("Si") ? tech : `Si${tech.replace(/\./g, "").replace(/\s/g, "")}`;
      });

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

    // Create the projects.ts file content
    const projectsFileContent = `import { RiRobot2Line } from "react-icons/ri";
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
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiJavascript,
  SiTypescript,
  SiBootstrap,
  SiDocker,
  SiCloudflare,
  SiGit,
  SiGithub
} from "react-icons/si";

export const projects = ${JSON.stringify(transformedProjects, null, 2)};
`;

    await fs.writeFile(path.join(tempDir, "src", "data", "projects.ts"), projectsFileContent);

    // 4. Copy uploaded files to the appropriate locations
    if (profilePicturePath) {
      await fsExtra.copy(
        profilePicturePath,
        path.join(tempDir, "public", "Picture.jpg")
      );
    }

    if (resumePath) {
      await fsExtra.copy(
        resumePath,
        path.join(tempDir, "public", "Resume.pdf")
      );
    }

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

    // Return the zip file as a download
    return new NextResponse(zipFile, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename=portfolio-${Date.now()}.zip`,
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
