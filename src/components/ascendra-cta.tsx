import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export function AscendraCTA() {
    return (
        <section id="about" className="relative overflow-hidden bg-background container mx-auto">
            {/* AscendraLabs CTA */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <Link href="https://ascendralabs.com" target="_blank" className="block group">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300">
                        <div className="relative p-4 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                                <div className="bg-background/80 p-4 rounded-2xl shadow-lg ring-1 ring-border/50 backdrop-blur-sm group-hover:scale-105 transition-transform duration-300">
                                    <Image
                                        src="/icons/ascendra-labs-icon.svg"
                                        alt="AscendraLabs"
                                        width={48}
                                        height={48}
                                        className="w-12 h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                                        Visit AscendraLabs.com
                                    </h3>
                                    <p className="text-muted-foreground max-w-md">
                                        Explore how we are shaping the future of digital experiences with our team of brilliant young minds.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 bg-background/50 hover:bg-background/80 text-foreground px-6 py-3 rounded-full font-medium transition-all group-hover:gap-3 border border-border/50 shadow-sm backdrop-blur-sm">
                                Visit<FiArrowUpRight />
                            </div>
                        </div>
                    </div>
                </Link>
            </motion.div>

        </section >
    );
}
