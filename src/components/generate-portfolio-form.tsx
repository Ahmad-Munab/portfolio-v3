"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { FaPlus, FaTrash, FaDownload, FaShare } from "react-icons/fa";
import { TechSelector } from "@/components/tech-selector";
import { techIcons } from "@/data/tech-icons";

// Define the complete form values type
type FormValues = {
  name: string;
  title: string;
  location: string;
  email: string;
  bio: string;
  github?: string;
  linkedin?: string;
  profilePicture: FileList | null;
  resume: FileList | null;
  experiences: {
    title: string;
    company: string;
    location: string;
    period: string;
    description: string;
    technologies: string;
    selectedTechs: string[];
  }[];
  skills: {
    category: string;
    items: {
      name: string;
      icon: string;
      color: string;
    }[];
    selectedTechs: string[];
  }[];
  projects: {
    title: string;
    description: string;
    technologies: string;
    url: string;
    image: FileList | null;
    selectedTechs: string[];
  }[];
};

export function GeneratePortfolioForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [experiences, setExperiences] = useState<FormValues["experiences"]>([
    {
      title: "",
      company: "",
      location: "",
      period: "",
      description: "",
      technologies: "",
      selectedTechs: [],
    },
  ]);
  const [skillCategories, setSkillCategories] = useState<FormValues["skills"]>([
    { category: "Languages", items: [], selectedTechs: [] },
  ]);
  const [projects, setProjects] = useState<FormValues["projects"]>([
    {
      title: "",
      description: "",
      technologies: "",
      url: "",
      image: null,
      selectedTechs: [],
    },
  ]);

  const form = useForm<FormValues>({
    // Using a more compatible approach without the zodResolver
    defaultValues: {
      name: "",
      title: "",
      location: "",
      email: "",
      bio: "",
      github: "",
      linkedin: "",
      profilePicture: null,
      resume: null,
      experiences: experiences,
      skills: skillCategories,
      projects: projects,
    },
  });

  // Add/remove functions for dynamic fields
  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        title: "",
        company: "",
        location: "",
        period: "",
        description: "",
        technologies: "",
        selectedTechs: [],
      },
    ]);
  };

  const removeExperience = (index: number) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter((_, i) => i !== index));
    }
  };

  const handleExperienceTechSelection = (
    expIndex: number,
    selectedTechs: string[]
  ) => {
    const updatedExperiences = [...experiences];

    // Update the selectedTechs array
    updatedExperiences[expIndex].selectedTechs = selectedTechs;

    // Update the technologies string with comma-separated tech names
    updatedExperiences[expIndex].technologies = selectedTechs.join(", ");

    setExperiences(updatedExperiences);
  };

  const addSkillCategory = () => {
    setSkillCategories([
      ...skillCategories,
      { category: "", items: [], selectedTechs: [] },
    ]);
  };

  const removeSkillCategory = (index: number) => {
    if (skillCategories.length > 1) {
      setSkillCategories(skillCategories.filter((_, i) => i !== index));
    }
  };

  const handleTechSelection = (
    categoryIndex: number,
    selectedTechs: string[]
  ) => {
    const updatedCategories = [...skillCategories];

    // Update the selectedTechs array
    updatedCategories[categoryIndex].selectedTechs = selectedTechs;

    // Update the items array with the corresponding tech objects
    updatedCategories[categoryIndex].items = selectedTechs.map((techName) => {
      const tech = techIcons.find((t) => t.name === techName);
      return {
        name: tech?.name || "",
        icon: tech?.icon.name || "",
        color: tech?.color || "",
      };
    });

    setSkillCategories(updatedCategories);
  };

  const addProject = () => {
    setProjects([
      ...projects,
      {
        title: "",
        description: "",
        technologies: "",
        url: "",
        image: null,
        selectedTechs: [],
      },
    ]);
  };

  const removeProject = (index: number) => {
    if (projects.length > 1) {
      setProjects(projects.filter((_, i) => i !== index));
    }
  };

  const handleProjectTechSelection = (
    projectIndex: number,
    selectedTechs: string[]
  ) => {
    const updatedProjects = [...projects];

    // Update the selectedTechs array
    updatedProjects[projectIndex].selectedTechs = selectedTechs;

    // Update the technologies string with comma-separated tech names
    updatedProjects[projectIndex].technologies = selectedTechs.join(", ");

    setProjects(updatedProjects);
  };

  // Form submission handler
  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    try {
      // Create FormData object to handle file uploads
      const formData = new FormData();

      // Add basic info
      formData.append("name", data.name);
      formData.append("title", data.title);
      formData.append("location", data.location);
      formData.append("email", data.email);
      formData.append("bio", data.bio);
      formData.append("github", data.github || "");
      formData.append("linkedin", data.linkedin || "");

      // Add experiences
      formData.append("experiences", JSON.stringify(experiences));

      // Add skills
      formData.append("skills", JSON.stringify(skillCategories));

      // Add projects
      formData.append("projects", JSON.stringify(projects));

      // Add files if they exist
      if (data.profilePicture && data.profilePicture.length > 0) {
        formData.append("profilePicture", data.profilePicture[0]);
      }

      if (data.resume && data.resume.length > 0) {
        formData.append("resume", data.resume[0]);
      }

      // Add project images if they exist
      projects.forEach((project, index) => {
        if (project.image && project.image.length > 0) {
          formData.append(`projectImage-${index}`, project.image[0]);
        }
      });

      // Send the data to the API
      const response = await fetch("/api/generate-portfolio", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to generate portfolio");
      }

      // Handle successful response - this will be a file download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `portfolio-${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      toast({
        title: "Success!",
        description: "Your portfolio has been generated and downloaded.",
      });

      // Show share options
      const shareData = {
        title: "Check out my new portfolio!",
        text: "I just created a custom portfolio using this amazing generator!",
        url: window.location.href,
      };

      // Add a share button to the toast
      toast({
        title: "Share Your Creation",
        description: (
          <div className="flex items-center gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                if (navigator.share) {
                  try {
                    await navigator.share(shareData);
                  } catch (error) {
                    console.log("Error sharing:", error);
                  }
                }
              }}
              className="gap-2"
            >
              <FaShare size={14} />
              Share
            </Button>
            <span className="text-xs text-muted-foreground">
              Let others know about this portfolio generator!
            </span>
          </div>
        ),
      });
    } catch (error) {
      console.error("Error generating portfolio:", error);
      toast({
        title: "Error",
        description: "Failed to generate portfolio. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-4xl mx-auto"
      >
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Enter your basic information for the portfolio.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Professional Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Stack Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="New York, USA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/yourusername"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://linkedin.com/in/yourusername"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a short bio about yourself..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      form.setValue("profilePicture", e.target.files)
                    }
                    className="cursor-pointer"
                  />
                </FormControl>
                <FormDescription>
                  Upload a square image for best results.
                </FormDescription>
                <FormMessage />
              </FormItem>

              <FormItem>
                <FormLabel>Resume (PDF)</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={(e) => form.setValue("resume", e.target.files)}
                    className="cursor-pointer"
                  />
                </FormControl>
                <FormDescription>
                  Upload your resume in PDF or DOCX format.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </div>
          </CardContent>
        </Card>

        {/* Experience Section */}
        <Card>
          <CardHeader>
            <CardTitle>Professional Experience</CardTitle>
            <CardDescription>Add your work experience details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="p-4 border border-border rounded-lg space-y-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">
                    Experience #{index + 1}
                  </h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExperience(index)}
                    disabled={experiences.length <= 1}
                  >
                    <FaTrash className="text-destructive" size={14} />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Software Engineer"
                        value={exp.title}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[index].title = e.target.value;
                          setExperiences(updated);
                        }}
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Company Name"
                        value={exp.company}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[index].company = e.target.value;
                          setExperiences(updated);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="City, Country"
                        value={exp.location}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[index].location = e.target.value;
                          setExperiences(updated);
                        }}
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem>
                    <FormLabel>Period</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="2020 - Present"
                        value={exp.period}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[index].period = e.target.value;
                          setExperiences(updated);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                </div>

                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your responsibilities and achievements..."
                      className="min-h-[80px]"
                      value={exp.description}
                      onChange={(e) => {
                        const updated = [...experiences];
                        updated[index].description = e.target.value;
                        setExperiences(updated);
                      }}
                    />
                  </FormControl>
                </FormItem>

                <FormItem>
                  <FormLabel>Technologies</FormLabel>
                  <FormControl>
                    <TechSelector
                      value={exp.selectedTechs || []}
                      onChange={(value) =>
                        handleExperienceTechSelection(index, value)
                      }
                      placeholder="Select technologies for this experience..."
                    />
                  </FormControl>
                  <FormDescription>
                    Choose from the list of technologies with their icons and
                    colors
                  </FormDescription>
                </FormItem>
              </motion.div>
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addExperience}
              className="w-full"
            >
              <FaPlus className="mr-2" size={14} />
              Add Experience
            </Button>
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
            <CardDescription>
              Add your skills organized by categories.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                className="p-4 border border-border rounded-lg space-y-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center">
                  <FormItem className="flex-1 mr-4">
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Languages, Frontend, Backend, etc."
                        value={category.category}
                        onChange={(e) => {
                          const updated = [...skillCategories];
                          updated[catIndex].category = e.target.value;
                          setSkillCategories(updated);
                        }}
                      />
                    </FormControl>
                  </FormItem>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkillCategory(catIndex)}
                    disabled={skillCategories.length <= 1}
                    className="mt-8"
                  >
                    <FaTrash className="text-destructive" size={14} />
                  </Button>
                </div>

                <div className="space-y-4">
                  <FormItem>
                    <FormLabel>Select Skills</FormLabel>
                    <FormControl>
                      <TechSelector
                        value={category.selectedTechs || []}
                        onChange={(value) =>
                          handleTechSelection(catIndex, value)
                        }
                        placeholder="Select technologies for this category..."
                      />
                    </FormControl>
                    <FormDescription>
                      Choose from the list of technologies with their icons and
                      colors
                    </FormDescription>
                  </FormItem>
                </div>
              </motion.div>
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addSkillCategory}
              className="w-full"
            >
              <FaPlus className="mr-2" size={14} />
              Add Skill Category
            </Button>
          </CardContent>
        </Card>

        {/* Projects Section */}
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
            <CardDescription>Add your notable projects.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="p-4 border border-border rounded-lg space-y-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Project #{index + 1}</h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeProject(index)}
                    disabled={projects.length <= 1}
                  >
                    <FaTrash className="text-destructive" size={14} />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Project Name"
                        value={project.title}
                        onChange={(e) => {
                          const updated = [...projects];
                          updated[index].title = e.target.value;
                          setProjects(updated);
                        }}
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem>
                    <FormLabel>Project URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com"
                        value={project.url}
                        onChange={(e) => {
                          const updated = [...projects];
                          updated[index].url = e.target.value;
                          setProjects(updated);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                </div>

                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your project..."
                      className="min-h-[80px]"
                      value={project.description}
                      onChange={(e) => {
                        const updated = [...projects];
                        updated[index].description = e.target.value;
                        setProjects(updated);
                      }}
                    />
                  </FormControl>
                </FormItem>

                <FormItem>
                  <FormLabel>Technologies</FormLabel>
                  <FormControl>
                    <TechSelector
                      value={project.selectedTechs || []}
                      onChange={(value) =>
                        handleProjectTechSelection(index, value)
                      }
                      placeholder="Select technologies for this project..."
                    />
                  </FormControl>
                  <FormDescription>
                    Choose from the list of technologies with their icons and
                    colors
                  </FormDescription>
                </FormItem>

                <FormItem>
                  <FormLabel>Project Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const updated = [...projects];
                        // Type assertion to ensure compatibility
                        updated[index].image = e.target
                          .files as FileList | null;
                        setProjects(updated);
                      }}
                      className="cursor-pointer"
                    />
                  </FormControl>
                  <FormDescription>
                    Upload a thumbnail image for your project
                  </FormDescription>
                </FormItem>
              </motion.div>
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addProject}
              className="w-full"
            >
              <FaPlus className="mr-2" size={14} />
              Add Project
            </Button>
          </CardContent>
        </Card>

        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isSubmitting} className="gap-2">
            {isSubmitting ? (
              <>Generating...</>
            ) : (
              <>
                <FaDownload size={14} />
                Generate & Download Portfolio
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
