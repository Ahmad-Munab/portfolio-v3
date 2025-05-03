"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FaCopy, FaCheck } from "react-icons/fa";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "bash" }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-md bg-muted p-4 overflow-x-auto">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-8 w-8 opacity-70 hover:opacity-100"
        onClick={copyToClipboard}
      >
        {copied ? (
          <FaCheck className="h-4 w-4 text-green-500" />
        ) : (
          <FaCopy className="h-4 w-4" />
        )}
      </Button>
      <pre className="text-sm font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}
