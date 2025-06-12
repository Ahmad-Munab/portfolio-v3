"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
  FaCopy,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/code-block";
import { toast } from "@/hooks/use-toast";

export default function SuccessPage() {
  // Share URL for the generator
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/generate-portfolio`
      : "";
  const shareTitle = "Check out this amazing portfolio generator!";
  const shareText =
    "I just created a custom portfolio using this amazing generator. Try it yourself!";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="container max-w-5xl mx-auto py-12 px-4 md:px-6">
      <motion.div
        className="space-y-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Success Message */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Success! Your Portfolio is Ready
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your custom portfolio has been generated and downloaded. Follow the
            instructions below to set it up and share it with the world!
          </p>
        </motion.div>

        {/* Setup Instructions */}
        <motion.div variants={itemVariants}>
          <Card className="border-2 border-primary/20">
            <CardContent className="pt-6">
              <Tabs defaultValue="setup">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="setup">Setup</TabsTrigger>
                  <TabsTrigger value="customize">Customize</TabsTrigger>
                  <TabsTrigger value="deploy">Deploy</TabsTrigger>
                </TabsList>
                <TabsContent value="setup" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">
                      1. Extract the ZIP file
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Extract the downloaded ZIP file to a location on your
                      computer.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">
                      2. Install dependencies
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Open a terminal in the extracted folder and run:
                    </p>
                    <CodeBlock
                      code="npm i --legacy-peer-deps"
                      language="bash"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">
                      3. Start the development server
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Run the following command to start the development server:
                    </p>
                    <CodeBlock code="npm run dev" language="bash" />
                    <p className="text-sm text-muted-foreground">
                      Open{" "}
                      <code className="bg-muted px-1 py-0.5 rounded">
                        http://localhost:3000
                      </code>{" "}
                      in your browser to see your portfolio!
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="customize" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">
                      Customize Your Portfolio
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your portfolio is built with Next.js and can be easily
                      customized:
                    </p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>
                        Edit content in{" "}
                        <code className="bg-muted px-1 py-0.5 rounded">
                          src/data/
                        </code>{" "}
                        files
                      </li>
                      <li>
                        Modify components in{" "}
                        <code className="bg-muted px-1 py-0.5 rounded">
                          src/components/
                        </code>
                      </li>
                      <li>Change styles using Tailwind CSS classes</li>
                      <li>Add new sections by creating new components</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Update Images</h3>
                    <p className="text-sm text-muted-foreground">
                      Replace images in the{" "}
                      <code className="bg-muted px-1 py-0.5 rounded">
                        public/
                      </code>{" "}
                      directory with your own.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="deploy" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">1. Push to GitHub</h3>
                    <p className="text-sm text-muted-foreground">
                      Create a new repository on GitHub and push your code:
                    </p>
                    <CodeBlock
                      code={`git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/your-portfolio.git
git push -u origin main`}
                      language="bash"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">2. Deploy to Vercel</h3>
                    <p className="text-sm text-muted-foreground">
                      The easiest way to deploy your Next.js portfolio is with
                      Vercel:
                    </p>
                    <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                      <li>
                        Go to{" "}
                        <a
                          href="https://vercel.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          vercel.com
                        </a>{" "}
                        and sign up/login
                      </li>
                      <li>
                        Click &quot;New Project&quot; and import your GitHub repository
                      </li>
                      <li>
                        <strong className="text-amber-500">Important:</strong>{" "}
                        Before deploying, go to &quot;Build and Development Settings&quot;
                        and override the install command to:
                        <CodeBlock
                          code="npm i --legacy-peer-deps"
                          language="bash"
                        />
                      </li>
                      <li>Click &quot;Deploy&quot; to start the deployment process</li>
                    </ol>
                    <p className="text-sm text-muted-foreground mt-2">
                      Your portfolio will be live in minutes with a custom URL!
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Share Section */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Share Your Creation</h2>
            <p className="text-muted-foreground">
              Let others know about this portfolio generator!
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                window.open(
                  `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    shareUrl
                  )}&text=${encodeURIComponent(shareText)}`,
                  "_blank"
                );
              }}
            >
              <FaTwitter className="text-[#1DA1F2]" />
              Twitter
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    shareUrl
                  )}`,
                  "_blank"
                );
              }}
            >
              <FaFacebook className="text-[#1877F2]" />
              Facebook
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    shareUrl
                  )}`,
                  "_blank"
                );
              }}
            >
              <FaLinkedin className="text-[#0A66C2]" />
              LinkedIn
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                window.open(
                  `https://api.whatsapp.com/send?text=${encodeURIComponent(
                    shareText + " " + shareUrl
                  )}`,
                  "_blank"
                );
              }}
            >
              <FaWhatsapp className="text-[#25D366]" />
              WhatsApp
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                window.open(
                  `mailto:?subject=${encodeURIComponent(
                    shareTitle
                  )}&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`,
                  "_blank"
                );
              }}
            >
              <FaEnvelope />
              Email
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
                toast({
                  title: "URL Copied!",
                  description: "The link has been copied to your clipboard.",
                  duration: 3000,
                });
              }}
            >
              <FaCopy />
              Copy URL
            </Button>
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-4 pt-4"
        >
          <Button variant="outline" asChild>
            <Link href="/generate-portfolio">Create Another Portfolio</Link>
          </Button>
          <Button asChild>
            <Link href="/" className="text-white">
              Back to Home
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
