import Link from "next/link";
import {
  FaRegFileCode,
  FaArrowRight,
  FaLinkedinIn,
  FaFacebookF,
} from "react-icons/fa";
import { LuMail } from "react-icons/lu";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-y-6 px-6">
        <h1 className="text-5xl md:text-6xl text-gray-100 font-extrabold font-[family-name:var(--font-geist-mono)]">
          Ahmad Munab <p className="text-3xl opacity-50">Vortex</p>
        </h1>
        <ul className="list-inside text-md font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Co-Founder & COO @
            <Link href={"https://zendevz.com"}>
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                ZenDevz
              </code>
            </Link>
            .
          </li>
          <li>Software Engineer | Business Enthusiast</li>
        </ul>

        <div className="flex gap-4">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/Munab-Resume.pdf"
            download
          >
            <FaRegFileCode />
            Resume
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-all flex gap-2 items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://www.linkedin.com/in/ahmad-munab/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get in touch
            <FaArrowRight />
          </a>
        </div>
      </main>
      <footer className="flex flex-col gap-2 fixed bottom-0 py-4">
        <div className="flex gap-x-8">
          <div className="flex gap-x-4">
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://www.linkedin.com/in/ahmad-munab/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://www.facebook.com/profile.php?id=100069734056848"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
          </div>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="mailto:ahmadmunab22@gmail.com?subject=Portfolio%20Enquiry&body=Hello%20Ahmad%20Munab%2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LuMail />
            ahmadmunab22@gmail.com
          </a>
        </div>
        <div className="flex justify-between text-foreground opacity-70 text-gray-200">
          <p>&copy; 2024-{new Date().getFullYear()}. </p>
          <p>All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
