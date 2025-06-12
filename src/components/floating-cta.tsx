"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mb-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/50 min-w-[320px]"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Let's Connect!</h3>
            <button className="text-gray-400 hover:text-white transition-colors p-1">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Social Connect */}
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-sm">Follow me on</span>
              <svg
                className="w-4 h-4 text-blue-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <a
                href="https://twitter.com/ahmadmunab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                @ahmadmunab
              </a>
            </div>

            {/* Portfolio Creation Button */}
            <Link href="/create-your-portfolio" className="block">
              <Button
                variant="outline"
                className="w-full bg-gradient-to-r from-blue-600/20 to-blue-800/20 border-blue-500/30 text-white hover:bg-blue-600/30 hover:border-blue-400/50 transition-all duration-300"
              >
                Create Your Portfolio ⚡
              </Button>
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
