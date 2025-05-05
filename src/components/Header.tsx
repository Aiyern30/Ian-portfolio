"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronRight } from "lucide-react";

interface HeaderProps {
  activeSection?: string;
}

const navItems = [
  { name: "Home", href: "/", section: "home" },
  { name: "Tools", href: "#tools", section: "tools" },
  { name: "Projects", href: "#projects", section: "projects" },
  { name: "Certificates", href: "#certs", section: "certs" },
  { name: "About", href: "#about", section: "about" },
  { name: "Support Me", href: "#support-me", section: "support-me" },
  { name: "Contact", href: "#contact-us", section: "contact-us" },
  { name: "Journey", href: "/Journey", section: "Journey" },
];

export default function Header({ activeSection }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking a link (especially important for anchor links)
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  if (!mounted) return null;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#320F85]/90 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[20px] lg:text-[28px] font-bold text-white flex items-center"
          >
            <span className="bg-gradient-to-r from-[#FF9D7A] to-[#FFD166] bg-clip-text text-transparent">
              Ian's
            </span>
            <span className="ml-2">Portfolio</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden lg:block"
        >
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <motion.li key={item.section} whileHover={{ y: -2 }}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative px-2 py-1 text-[16px] font-medium transition-colors",
                    activeSection === item.section
                      ? "text-[#FF9D7A]"
                      : "text-white hover:text-[#FFD166]"
                  )}
                >
                  {item.name}
                  {activeSection === item.section && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FF9D7A]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.nav>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:hidden relative z-10 p-2 rounded-full bg-[#320F85]/60 hover:bg-[#4A1D9A] transition-colors"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-5 h-5 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-5 h-5 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 right-0 bottom-0 w-[75%] max-w-[300px] bg-gradient-to-b from-[#320F85] to-[#763CAC] z-50 lg:hidden shadow-xl"
            >
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-white/10">
                  <div className="text-xl font-bold text-white">
                    <span className="bg-gradient-to-r from-[#FF9D7A] to-[#FFD166] bg-clip-text text-transparent">
                      Ian's
                    </span>
                    <span className="ml-2">Portfolio</span>
                  </div>
                </div>
                <nav className="flex-1 overflow-y-auto py-6">
                  <ul className="space-y-1 px-2">
                    {navItems.map((item, index) => (
                      <motion.li
                        key={item.section}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={handleLinkClick}
                          className={cn(
                            "flex items-center justify-between px-4 py-3 rounded-lg transition-colors",
                            activeSection === item.section
                              ? "bg-white/10 text-[#FF9D7A]"
                              : "text-white hover:bg-white/5"
                          )}
                        >
                          <span>{item.name}</span>
                          <ChevronRight
                            className={cn(
                              "w-4 h-4 transition-colors",
                              activeSection === item.section
                                ? "text-[#FF9D7A]"
                                : "text-white/50"
                            )}
                          />
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
                <div className="p-6 border-t border-white/10">
                  <div className="text-sm text-white/60 text-center">
                    &copy; {new Date().getFullYear()} Ian Gan
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
