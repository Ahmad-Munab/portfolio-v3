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
import { FaPlus, FaTrash, FaDownload } from "react-icons/fa";
import { TechSelector } from "@/components/tech-selector";
import { techIcons } from "@/data/tech-icons";
import Image from "next/image";

// Define the complete form values type
type FormValues = {
  name: string;
  title: string;
  location: string;
  email: string;
  bio: string; // General bio
  personalBio: string; // Personal bio
  professionalBio: string; // Professional bio
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

// Define the steps for the form
const formSteps = [
  { id: "personal", title: "Personal Information" },
  { id: "experience", title: "Professional Experience" },
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Projects" },
  { id: "review", title: "Review & Submit" },
];

export function GeneratePortfolioForm() {
  const [currentStep, setCurrentStep] = useState(0);
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
      personalBio: "",
      professionalBio: "",
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

  // Validation functions for each step
  const validatePersonalInfo = () => {
    const errors: string[] = [];
    const values = form.getValues();

    if (!values.name) errors.push("Full Name is required");
    if (!values.title) errors.push("Professional Title is required");
    if (!values.location) errors.push("Location is required");
    if (!values.email) errors.push("Email is required");
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email))
      errors.push("Email format is invalid");
    if (!values.bio) errors.push("General Bio is required");
    if (!values.personalBio) errors.push("Personal Bio is required");
    if (!values.professionalBio) errors.push("Professional Bio is required");

    if (values.github && !/^https?:\/\//.test(values.github))
      errors.push("GitHub URL must be a valid URL");
    if (values.linkedin && !/^https?:\/\//.test(values.linkedin))
      errors.push("LinkedIn URL must be a valid URL");

    return errors;
  };

  const validateExperiences = () => {
    const errors: string[] = [];

    experiences.forEach((exp, index) => {
      if (!exp.title)
        errors.push(`Experience #${index + 1}: Job Title is required`);
      if (!exp.company)
        errors.push(`Experience #${index + 1}: Company is required`);
      if (!exp.period)
        errors.push(`Experience #${index + 1}: Period is required`);
      if (!exp.description)
        errors.push(`Experience #${index + 1}: Description is required`);
    });

    return errors;
  };

  const validateSkills = () => {
    const errors: string[] = [];

    skillCategories.forEach((category, index) => {
      if (!category.category)
        errors.push(`Skill Category #${index + 1}: Category name is required`);
      if (category.selectedTechs.length === 0)
        errors.push(
          `Skill Category #${index + 1}: At least one skill is required`
        );
    });

    return errors;
  };

  const validateProjects = () => {
    const errors: string[] = [];

    projects.forEach((project, index) => {
      if (!project.title)
        errors.push(`Project #${index + 1}: Title is required`);
      if (!project.description)
        errors.push(`Project #${index + 1}: Description is required`);
      if (project.url && !/^https?:\/\//.test(project.url))
        errors.push(`Project #${index + 1}: URL must be a valid URL`);
    });

    return errors;
  };

  // Function to handle step navigation
  const goToNextStep = () => {
    let errors: string[] = [];

    // Validate current step
    switch (currentStep) {
      case 0: // Personal Info
        errors = validatePersonalInfo();
        break;
      case 1: // Experiences
        errors = validateExperiences();
        break;
      case 2: // Skills
        errors = validateSkills();
        break;
      case 3: // Projects
        errors = validateProjects();
        break;
    }

    if (errors.length > 0) {
      // Show error toast
      toast({
        title: "Validation Error",
        description: (
          <div className="space-y-2">
            <p>Please fix the following errors:</p>
            <ul className="list-disc pl-4 space-y-1">
              {errors.map((error, index) => (
                <li key={index} className="text-sm">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        ),
        variant: "destructive",
      });
      return;
    }

    // Proceed to next step

    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Form submission handler
  async function onSubmit(data: FormValues) {
    // Final validation before submission
    const personalErrors = validatePersonalInfo();
    const experienceErrors = validateExperiences();
    const skillsErrors = validateSkills();
    const projectsErrors = validateProjects();

    const allErrors = [
      ...personalErrors,
      ...experienceErrors,
      ...skillsErrors,
      ...projectsErrors,
    ];

    if (allErrors.length > 0) {
      toast({
        title: "Validation Error",
        description: "Please fix all errors before submitting",
        variant: "destructive",
      });
      return;
    }

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
      formData.append("personalBio", data.personalBio);
      formData.append("professionalBio", data.professionalBio);
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

      // Redirect to success page
      window.location.href = "/generate-portfolio/success";
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

  // Progress indicator component
  const FormProgress = () => (
    <div className="mb-8">
      <div className="flex justify-between">
        {formSteps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col items-center ${
              index <= currentStep ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2
                ${
                  index < currentStep
                    ? "bg-primary text-white"
                    : index === currentStep
                    ? "border-2 border-primary"
                    : "border-2 border-muted"
                }`}
            >
              {index < currentStep ? "✓" : index + 1}
            </div>
            <span className="text-xs hidden md:block">{step.title}</span>
          </div>
        ))}
      </div>
      <div className="w-full bg-muted h-1 mt-4 rounded-full overflow-hidden">
        <div
          className="bg-primary h-full transition-all duration-300"
          style={{ width: `${(currentStep / (formSteps.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-4xl mx-auto"
      >
        <FormProgress />

        {/* Step 1: Personal Information */}
        {currentStep === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>{formSteps[currentStep].title}</CardTitle>
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
                        <Input
                          placeholder="your.email@example.com"
                          {...field}
                        />
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

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>General Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write a general bio for your portfolio homepage..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This will appear on your homepage as the main bio.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="personalBio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Personal Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write about your personal interests, hobbies, etc..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This will appear in the About section under &quot;Personal&quot;.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="professionalBio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write about your professional background, goals, etc..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This will appear in the About section under
                        &quot;Professional&quot;.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
            <CardFooter className="flex justify-between">
              <div></div> {/* Empty div for spacing */}
              <Button
                type="button"
                onClick={() => goToNextStep()}
                className="gap-2 text-white"
              >
                Next Step
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 2: Experience Section */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>{formSteps[currentStep].title}</CardTitle>
              <CardDescription>
                Add your work experience details.
              </CardDescription>
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
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                onClick={() => goToPreviousStep()}
                variant="outline"
              >
                Previous Step
              </Button>
              <Button
                type="button"
                onClick={() => goToNextStep()}
                className="gap-2 text-white"
              >
                Next Step
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 3: Skills Section */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>{formSteps[currentStep].title}</CardTitle>
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
                        Choose from the list of technologies with their icons
                        and colors
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
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                onClick={goToPreviousStep}
                variant="outline"
              >
                Previous Step
              </Button>
              <Button
                type="button"
                onClick={goToNextStep}
                className="gap-2 text-white"
              >
                Next Step
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 4: Projects Section */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>{formSteps[currentStep].title}</CardTitle>
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
                    <h3 className="text-sm font-medium">
                      Project #{index + 1}
                    </h3>
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
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                onClick={() => goToPreviousStep()}
                variant="outline"
              >
                Previous Step
              </Button>
              <Button
                type="button"
                onClick={() => goToNextStep()}
                className="gap-2 text-white"
              >
                Next Step
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 5: Review & Submit */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>{formSteps[currentStep].title}</CardTitle>
              <CardDescription>
                Review your information before submitting.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">Name:</div>
                  <div>{form.getValues().name}</div>
                  <div className="font-medium">Title:</div>
                  <div>{form.getValues().title}</div>
                  <div className="font-medium">Location:</div>
                  <div>{form.getValues().location}</div>
                  <div className="font-medium">Email:</div>
                  <div>{form.getValues().email}</div>

                  {form.getValues().github && (
                    <>
                      <div className="font-medium">GitHub:</div>
                      <div>
                        <a
                          href={form.getValues().github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline flex items-center gap-1"
                        >
                          {form.getValues().github}
                        </a>
                      </div>
                    </>
                  )}

                  {form.getValues().linkedin && (
                    <>
                      <div className="font-medium">LinkedIn:</div>
                      <div>
                        <a
                          href={form.getValues().linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline flex items-center gap-1"
                        >
                          {form.getValues().linkedin}
                        </a>
                      </div>
                    </>
                  )}

                  {(() => {
                    const resume = form.getValues().resume;
                    if (resume && resume.length > 0) {
                      return (
                        <>
                          <div className="font-medium">Resume:</div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              {resume[0].name}
                            </span>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const file = resume[0];
                                if (file) {
                                  const url = URL.createObjectURL(file);
                                  window.open(url, "_blank");
                                }
                              }}
                              className="h-7 px-2 text-xs"
                            >
                              Preview
                            </Button>
                          </div>
                        </>
                      );
                    }
                    return null;
                  })()}

                  {(() => {
                    const profilePicture = form.getValues().profilePicture;
                    if (profilePicture && profilePicture.length > 0) {
                      return (
                        <>
                          <div className="font-medium">Profile Picture:</div>
                          <div>
                            <Image
                              src={URL.createObjectURL(profilePicture[0])}
                              alt="Profile Preview"
                              className="w-16 h-16 rounded-full object-cover border"
                            />
                          </div>
                        </>
                      );
                    }
                    return null;
                  })()}

                  <div className="font-medium col-span-2 pt-4">
                    General Bio:
                  </div>
                  <div className="col-span-2 text-muted-foreground text-sm bg-muted p-2 rounded">
                    {form.getValues().bio}
                  </div>

                  <div className="font-medium col-span-2 pt-4">
                    Personal Bio:
                  </div>
                  <div className="col-span-2 text-muted-foreground text-sm bg-muted p-2 rounded">
                    {form.getValues().personalBio}
                  </div>

                  <div className="font-medium col-span-2 pt-4">
                    Professional Bio:
                  </div>
                  <div className="col-span-2 text-muted-foreground text-sm bg-muted p-2 rounded">
                    {form.getValues().professionalBio}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Experience ({experiences.length})
                </h3>
                <div className="space-y-2">
                  {experiences.map((exp, index) => (
                    <div key={index} className="p-3 border rounded-md">
                      <div className="font-medium">
                        {exp.title} at {exp.company}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {exp.period} • {exp.location}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Skills ({skillCategories.length} categories)
                </h3>
                <div className="space-y-2">
                  {skillCategories.map((category, index) => (
                    <div key={index} className="p-3 border rounded-md">
                      <div className="font-medium">{category.category}</div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {category.selectedTechs.map((techName) => {
                          const tech = techIcons.find(
                            (t) => t.name === techName
                          );
                          const Icon = tech?.icon;
                          return (
                            <span
                              key={techName}
                              className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs flex items-center gap-1"
                            >
                              {Icon && (
                                <Icon
                                  style={{ color: tech.color }}
                                  className="h-3 w-3"
                                />
                              )}
                              {techName}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Projects ({projects.length})
                </h3>
                <div className="space-y-2">
                  {projects.map((project, index) => (
                    <div key={index} className="p-3 border rounded-md">
                      <div className="flex gap-3">
                        {project.image && project.image.length > 0 && (
                          <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={URL.createObjectURL(project.image[0])}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="font-medium">{project.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {project.description}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {project.selectedTechs.map((techName) => {
                              const tech = techIcons.find(
                                (t) => t.name === techName
                              );
                              const Icon = tech?.icon;
                              return (
                                <span
                                  key={techName}
                                  className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs flex items-center gap-1"
                                >
                                  {Icon && (
                                    <Icon
                                      style={{ color: tech?.color }}
                                      className="h-3 w-3"
                                    />
                                  )}
                                  {techName}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                onClick={() => goToPreviousStep()}
                variant="outline"
              >
                Previous Step
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="gap-2 text-white"
              >
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
          </Card>
        )}
      </form>
    </Form>
  );
}
