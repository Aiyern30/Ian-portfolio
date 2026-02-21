"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ms", label: "Bahasa", flag: "🇲🇾" },
];

export default function FloatingLanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Extract locale from pathname
  const localeMatch = pathname.match(/^\/(en|zh|ms)/);
  const locale = localeMatch ? localeMatch[1] : "en";

  const currentLanguage = languages.find((lang) => lang.code === locale);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageChange = (newLocale: string) => {
    // Remove the current locale from pathname if it exists
    const pathWithoutLocale = pathname.replace(/^\/(en|zh|ms)/, "") || "/";

    // Navigate to the new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="fixed bottom-8 left-8 z-40"
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-200",
          "bg-white/10 hover:bg-white/20 border border-white/20",
          "backdrop-blur-md text-white shadow-lg",
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Languages className="w-4 h-4" />
        <span className="text-sm font-medium">
          {currentLanguage?.flag} {currentLanguage?.label}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: -10, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full mb-3 left-0 w-48 bg-[#320F85]/95 backdrop-blur-md rounded-lg shadow-xl overflow-hidden border border-white/10"
          >
            <div className="py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors",
                    locale === lang.code
                      ? "bg-white/10 text-[#FF9D7A]"
                      : "text-white hover:bg-white/5",
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </span>
                  {locale === lang.code && (
                    <Check className="w-4 h-4 text-[#FF9D7A]" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
