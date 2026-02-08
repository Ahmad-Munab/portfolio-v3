"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import Image from "next/image";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
    return (
        <div className="font-[family-name:var(--font-geist-sans)] min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 md:px-6 pt-32 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors group">
                        <MoveLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">All Projects</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        A collection of projects I've worked on, ranging from web applications to AI tools and more.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <motion.a
                            key={index}
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex flex-col overflow-hidden rounded-xl border border-foreground/10 bg-background/50 hover:bg-background/80 cursor-pointer hover:border-foreground/20 ease-in-out transition-all h-full"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            whileHover={{
                                y: -5,
                                borderColor: "rgba(var(--foreground-rgb), 0.2)",
                            }}
                        >
                            <div className="relative aspect-video w-full overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
                                />
                            </div>

                            <div className="flex flex-col flex-grow p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                </div>

                                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tech.map((Icon, i) => (
                                        <div key={i} className="p-1.5 rounded-md bg-foreground/5 text-foreground/70 group-hover:text-foreground group-hover:bg-foreground/10 transition-all">
                                            <Icon className="text-sm" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
