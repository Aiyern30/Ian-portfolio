"use client";

import { useDeviceType } from "@/lib/useDeviceTypes";
import { IconCloud } from "../magicui";
import { useEffect, useState } from "react";

const slugs = [
  "devpost",
  "sublimetext",
  "apachenetbeanside",
  "rstudioide",
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
  "Googlemaps",
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
  "rstudio",
  "canva",
  "notion",
  "strapi",
  "apollographql",
  "autodesk",
  "axios",
  "xampp",
  "ethereum",
  "ethers",
  "solana",
];

export default function GlobalSection() {
  const { isMobile, isTablet, isDesktop } = useDeviceType();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  );

  return (
    <div className="container flex flex-col justify-center items-center text-center text-white min-h-screen">
      <div className="text-5xl text-center relative mb-8">
        <div className="font-primary">Tools & Technologies</div>
        <div className="h-1 w-44 bg-white mx-auto text-center mt-4"></div>
      </div>

      <div className="max-w-xl mx-auto mb-5 md:text-xl">
        {!isClient && <span>Loading...</span>}
        {isClient && isMobile && (
          <span>Check out the tools I use to build awesome projects!</span>
        )}
        {isClient && isTablet && (
          <span>A closer look at the technologies I work with.</span>
        )}
        {isClient && isDesktop && (
          <span>
            I'm currently looking to join a{" "}
            <span className="text-tertiary">cross-functional</span> team
            dedicated to enhancing lives through accessible design. The icons
            below represent the tools and technologies I have learned and worked
            with.
          </span>
        )}
      </div>

      <IconCloud images={images} />
    </div>
  );
}
