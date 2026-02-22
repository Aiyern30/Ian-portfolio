"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

interface HeaderProps {
  activeSection?: string;
}

export default function Header({
  activeSection: activeSectionProp,
}: HeaderProps) {
  const t = useTranslations("header");
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentYear, setCurrentYear] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  // Navigation items with translations
  const navItems = useMemo(() => [
    { name: t("home"), href: "/", section: "home" },
    { name: t("tools"), href: "/#tools", section: "tools" },
    { name: t("projects"), href: "/#projects", section: "projects" },
    { name: t("archive"), href: "/Projects", section: "Projects" },
    { name: t("certificates"), href: "/#certs", section: "certs" },
    { name: t("about"), href: "/#about", section: "about" },
    { name: t("supportMe"), href: "/#support-me", section: "support-me" },
    { name: t("contactUs"), href: "/#contact-us", section: "contact-us" },
    { name: t("journey"), href: "/Journey", section: "Journey" },
  ], [t]);

  // Determine which section is active:
  // 1. If we're on /Journey or /Projects, that's active.
  // 2. Otherwise use the prop passed from observer.
  const activeSection =
    pathname === "/Journey"
      ? "Journey"
      : pathname === "/Projects"
        ? "Projects"
        : activeSectionProp;

  // Handle clicks outside the menu to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setMounted(true);
    setCurrentYear(new Date().getFullYear().toString());

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

  // Close menu when clicking a link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  if (!mounted) {
    // Return a simple placeholder during SSR to avoid hydration mismatch
    return (
      <header className="fixed top-0 left-0 right-0 z-50 py-5 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex justify-between items-center">
          <div className="text-[20px] font-bold text-white">
            <span className="text-white">{t("portfolio")}</span>
          </div>
          <div className="w-10 h-10"></div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#320F85]/90 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex justify-between items-center">
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
            <span className="ml-2">{t("portfolio").split(" ")[1] || "Portfolio"}</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center gap-4">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <motion.li key={item.section} whileHover={{ y: -2 }}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative px-2 py-1 text-[15px] font-medium transition-colors whitespace-nowrap",
                      activeSection === item.section
                        ? "text-[#FF9D7A]"
                        : "text-white hover:text-[#FFD166]",
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

          <motion.a
            href="/portfolio/Ian Gan Jian Hao.pdf"
            download="Ian Gan Jian Hao CV.pdf"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-[#FF9D7A] to-[#FFD166] text-black font-bold text-sm hover:shadow-[0_0_20px_rgba(255,157,122,0.4)] transition-all active:scale-95 whitespace-nowrap"
          >
            {t("downloadCV")}
          </motion.a>
        </div>

        {/* Mobile Menu Button & Dropdown */}
        <div className="flex xl:hidden items-center gap-4">
          <motion.a
            href="/portfolio/Ian Gan Jian Hao.pdf"
            download="Ian Gan Jian Hao CV.pdf"
            className="hidden sm:block px-4 py-2 rounded-full bg-gradient-to-r from-[#FF9D7A] to-[#FFD166] text-black font-bold text-xs"
          >
            {t("downloadCVShort")}
          </motion.a>

          <div className="relative" ref={menuRef}>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#320F85]/60 hover:bg-[#4A1D9A] transition-colors"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
            >
              <span className="text-sm font-medium text-white">{t("menu")}</span>
              {isMenuOpen ? (
                <X className="w-4 h-4 text-white" />
              ) : (
                <ChevronDown className="w-4 h-4 text-white" />
              )}
            </motion.button>

            {/* Simple Dropdown Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-[#320F85]/95 backdrop-blur-md rounded-lg shadow-xl overflow-hidden z-50 border border-white/10"
                >
                  <ul className="py-1">
                    {navItems.map((item) => (
                      <li key={item.section}>
                        <Link
                          href={item.href}
                          onClick={handleLinkClick}
                          className={cn(
                            "block px-4 py-3 text-sm font-medium transition-colors",
                            activeSection === item.section
                              ? "bg-white/10 text-[#FF9D7A]"
                              : "text-white hover:bg-white/5",
                          )}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    <li className="border-t border-white/10 p-2">
                      <a
                        href="/portfolio/Ian Gan Jian Hao.pdf"
                        download="Ian Gan Jian Hao CV.pdf"
                        className="flex items-center justify-center w-full py-2 rounded-lg bg-gradient-to-r from-[#FF9D7A] to-[#FFD166] text-black font-bold text-sm"
                        onClick={handleLinkClick}
                      >
                        {t("downloadCV")}
                      </a>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
