"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { FaPlus, FaTrash, FaUpload, FaDownload } from "react-icons/fa";

// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  location: z.string().min(2, { message: "Location must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters" }),
  github: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  linkedin: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  
  // These will be handled separately as they're more complex
  // experiences: z.array(...),
  // skills: z.array(...),
  // projects: z.array(...),
});

type FormValues = z.infer<typeof formSchema> & {
  profilePicture: FileList | null;
  resume: FileList | null;
  experiences: {
    title: string;
    company: string;
    location: string;
    period: string;
    description: string;
    technologies: string;
  }[];
  skills: {
    category: string;
    items: {
      name: string;
      icon: string;
      color: string;
    }[];
  }[];
  projects: {
    title: string;
    description: string;
    technologies: string;
    url: string;
  }[];
};

export function GeneratePortfolioForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [experiences, setExperiences] = useState([
    { title: "", company: "", location: "", period: "", description: "", technologies: "" }
  ]);
  const [skillCategories, setSkillCategories] = useState([
    { category: "Languages", items: [{ name: "", icon: "", color: "" }] }
  ]);
  const [projects, setProjects] = useState([
    { title: "", description: "", technologies: "", url: "" }
  ]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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
    setExperiences([...experiences, { title: "", company: "", location: "", period: "", description: "", technologies: "" }]);
  };

  const removeExperience = (index: number) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter((_, i) => i !== index));
    }
  };

  const addSkillCategory = () => {
    setSkillCategories([...skillCategories, { category: "", items: [{ name: "", icon: "", color: "" }] }]);
  };

  const removeSkillCategory = (index: number) => {
    if (skillCategories.length > 1) {
      setSkillCategories(skillCategories.filter((_, i) => i !== index));
    }
  };

  const addSkillItem = (categoryIndex: number) => {
    const updatedCategories = [...skillCategories];
    updatedCategories[categoryIndex].items.push({ name: "", icon: "", color: "" });
    setSkillCategories(updatedCategories);
  };

  const removeSkillItem = (categoryIndex: number, itemIndex: number) => {
    if (skillCategories[categoryIndex].items.length > 1) {
      const updatedCategories = [...skillCategories];
      updatedCategories[categoryIndex].items = updatedCategories[categoryIndex].items.filter((_, i) => i !== itemIndex);
      setSkillCategories(updatedCategories);
    }
  };

  const addProject = () => {
    setProjects([...projects, { title: "", description: "", technologies: "", url: "" }]);
  };

  const removeProject = (index: number) => {
    if (projects.length > 1) {
      setProjects(projects.filter((_, i) => i !== index));
    }
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto">
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
                      <Input placeholder="https://github.com/yourusername" {...field} />
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
                      <Input placeholder="https://linkedin.com/in/yourusername" {...field} />
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
                    onChange={(e) => form.setValue("profilePicture", e.target.files)}
                    className="cursor-pointer"
                  />
                </FormControl>
                <FormDescription>Upload a square image for best results.</FormDescription>
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
                <FormDescription>Upload your resume in PDF or DOCX format.</FormDescription>
                <FormMessage />
              </FormItem>
            </div>
          </CardContent>
        </Card>
        
        {/* Experience Section */}
        <Card>
          <CardHeader>
            <CardTitle>Professional Experience</CardTitle>
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
                  <h3 className="text-sm font-medium">Experience #{index + 1}</h3>
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
                    <Input 
                      placeholder="React, Node.js, TypeScript (comma separated)"
                      value={exp.technologies}
                      onChange={(e) => {
                        const updated = [...experiences];
                        updated[index].technologies = e.target.value;
                        setExperiences(updated);
                      }}
                    />
                  </FormControl>
                  <FormDescription>Enter technologies as comma-separated values</FormDescription>
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
                  <h4 className="text-sm font-medium">Skills in this category:</h4>
                  
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-t border-border pt-4">
                      <FormItem>
                        <FormLabel>Skill Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="JavaScript"
                            value={item.name}
                            onChange={(e) => {
                              const updated = [...skillCategories];
                              updated[catIndex].items[itemIndex].name = e.target.value;
                              setSkillCategories(updated);
                            }}
                          />
                        </FormControl>
                      </FormItem>
                      
                      <FormItem>
                        <FormLabel>Icon Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="SiJavascript"
                            value={item.icon}
                            onChange={(e) => {
                              const updated = [...skillCategories];
                              updated[catIndex].items[itemIndex].icon = e.target.value;
                              setSkillCategories(updated);
                            }}
                          />
                        </FormControl>
                        <FormDescription>Use React Icons names (e.g., SiJavascript)</FormDescription>
                      </FormItem>
                      
                      <div className="flex items-center gap-2">
                        <FormItem className="flex-1">
                          <FormLabel>Color</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="#F7DF1E"
                              value={item.color}
                              onChange={(e) => {
                                const updated = [...skillCategories];
                                updated[catIndex].items[itemIndex].color = e.target.value;
                                setSkillCategories(updated);
                              }}
                            />
                          </FormControl>
                        </FormItem>
                        
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeSkillItem(catIndex, itemIndex)}
                          disabled={category.items.length <= 1}
                          className="mb-0.5"
                        >
                          <FaTrash className="text-destructive" size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addSkillItem(catIndex)}
                    className="w-full"
                  >
                    <FaPlus className="mr-2" size={14} />
                    Add Skill
                  </Button>
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
            <CardDescription>
              Add your notable projects.
            </CardDescription>
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
                    <Input 
                      placeholder="React, Node.js, TypeScript (comma separated)"
                      value={project.technologies}
                      onChange={(e) => {
                        const updated = [...projects];
                        updated[index].technologies = e.target.value;
                        setProjects(updated);
                      }}
                    />
                  </FormControl>
                  <FormDescription>Enter technologies as comma-separated values</FormDescription>
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
