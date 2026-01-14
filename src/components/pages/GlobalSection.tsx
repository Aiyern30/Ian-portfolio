"use client";

import { useDeviceType } from "@/lib/useDeviceTypes";
import { IconCloud } from "../magicui";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Globe } from "lucide-react";

const slugs = [
  "devpost",
  "sublimetext",
  "apachenetbeanside",
  "posit",
  "ethers",
  "json",
  "laravel",
  "obsidian",
  "googleauthenticator",
  "googlecloud",
  "opencv",
  "solana",
  "google",
  "googledrive",
  "googlecalendar",
  "googleappsscript",
  "googlemaps",
  "mongodb",
  "amazonaws",
  "ethereum",
  "npm",
  "cplusplus",
  "apache",
  "phpmyadmin",
  "typescript",
  "javascript",
  "java",
  "react",
  "flutter",
  "html5",
  "css3",
  "nodedotjs",
  "postgresql",
  "firebase",
  "vercel",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "figma",
  "nextdotjs",
  "php",
  "python",
  "mysql",
  "tailwindcss",
  "r",
  "labview",
  "adobepremierepro",
  "canva",
  "notion",
  "strapi",
  "apollographql",
  "autodesk",
  "axios",
  "xampp",
  "matlab",
  "rust",
];

export default function GlobalSection() {
  const { isMobile, isTablet, isDesktop } = useDeviceType();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const images = slugs.map((slug) => `https://cdn.simpleicons.org/${slug}`);

  return (
    <div className="relative min-h-screen py-20 flex flex-col items-center justify-center overflow-hidden">
      <div className="container relative z-10 max-w-6xl px-6 flex flex-col lg:flex-row items-center gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left space-y-8"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center lg:justify-start gap-2 text-[#FF9D7A] font-medium tracking-wider uppercase text-sm"
            >
              <Globe className="w-4 h-4" />
              Global Tech Stack
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold font-primary leading-tight">
              Tools &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9D7A] to-[#FFD166]">
                Technologies
              </span>
            </h2>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl font-secondary leading-relaxed">
              I leverage a diverse ecosystem of cutting-edge tools to bring
              digital visions to life. From{" "}
              <span className="text-white font-medium">
                Full-stack Development
              </span>{" "}
              to{" "}
              <span className="text-white font-medium">
                Cloud Infrastructure
              </span>
              , here's what's in my arsenal.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center lg:justify-start gap-4"
          >
            <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center gap-3 group hover:bg-white/10 transition-colors">
              <div className="w-2 h-2 rounded-full bg-[#FF9D7A] shadow-[0_0_10px_#FF9D7A]" />
              <span className="text-sm font-medium">
                Fluent in 20+ technologies
              </span>
            </div>
            <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center gap-3 group hover:bg-white/10 transition-colors">
              <Sparkles className="w-4 h-4 text-[#FFD166]" />
              <span className="text-sm font-medium">
                Scalable Architectures
              </span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex-1 relative flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#763CAC]/20 to-[#FF9D7A]/10 blur-[100px] rounded-full scale-150 -z-10" />

          <div className="relative group cursor-grab active:cursor-grabbing">
            {isClient && (
              <div className="scale-110 md:scale-125 lg:scale-150">
                <IconCloud images={images} />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
