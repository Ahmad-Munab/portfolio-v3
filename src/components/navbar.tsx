import { about } from "@/data/about";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const lastScrollY = useRef(0);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const activeNavRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Get reference to the hero section
    heroSectionRef.current = document.querySelector("section") as HTMLElement;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if hero section is out of view
      const homeSection = document.getElementById("home");
      if (homeSection) {
        const heroHeight = homeSection.offsetHeight;
        // Only show navbar when fully scrolled past hero section
        if (currentScrollY >= heroHeight) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }

      // Set scrolled state for styling
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Update active section based on scroll position with more responsive detection
      const sections = ["home", "about", "skills", "experience", "projects"];

      // Use a smaller offset to make the detection more responsive
      const scrollPosition = currentScrollY + 50;

      // Find the section closest to the current scroll position
      let closestSection = "home";
      let minDistance = Number.MAX_VALUE;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          const sectionMiddle = offsetTop + offsetHeight / 2;
          const distance = Math.abs(scrollPosition - sectionMiddle);

          // Check if we're within the section bounds or if this is the closest section so far
          if (
            (scrollPosition >= offsetTop &&
              scrollPosition < offsetTop + offsetHeight) ||
            distance < minDistance
          ) {
            minDistance = distance;
            closestSection = section;
          }
        }
      }

      if (activeSection !== closestSection) {
        setActiveSection(closestSection);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  // Scroll to section smoothly
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Calculate the position to scroll to
      const navHeight = 80; // Approximate height of navbar
      const offsetPosition = section.offsetTop - navHeight;

      // Scroll smoothly to the section
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed top-4 left-4 right-4 md:left-0 md:right-0 z-50 transition-all duration-300 max-w-3xl mx-auto hidden md:block ${
            isScrolled
              ? "bg-background/70 backdrop-blur-md shadow-md px-4 py-3 rounded-xl border border-foreground/5"
              : "bg-transparent py-5"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("home");
              }}
              className="text-2xl font-bold flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {about.name}
              <span className="text-[#3b82f6]">.</span>
            </motion.a>

            {/* Navigation */}
            <nav className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  ref={
                    activeSection === link.href.substring(1)
                      ? activeNavRef
                      : null
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href.substring(1));
                  }}
                  className={`relative px-2 py-1 ${
                    activeSection === link.href.substring(1)
                      ? "text-[#3b82f6] font-medium"
                      : "text-foreground/80 hover:text-[#3b82f6]"
                  } transition-colors`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {link.name}
                  {activeSection === link.href.substring(1) && (
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3b82f6] rounded-full"
                      layoutId="navIndicator"
                    />
                  )}
                </motion.a>
              ))}
            </nav>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
