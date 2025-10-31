"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FcAlarmClock } from "react-icons/fc";
import { IoDesktopOutline } from "react-icons/io5";
import { FaLightbulb, FaRocket } from "react-icons/fa";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/Marquee";
import { Tabs, TabsList, TabsTrigger } from "../ui";

// About qualities
const qualities = [
  {
    id: 1,
    icon: <FcAlarmClock size={45} />,
    title: "Fast",
    details: "Fast load times and lag-free interaction, my highest priority.",
    color: "from-blue-600 to-blue-800",
    hoverColor: "group-hover:from-blue-500 group-hover:to-blue-700",
    iconBg: "bg-blue-500/20",
  },
  {
    id: 2,
    icon: <IoDesktopOutline color="white" size={45} />,
    title: "Responsive",
    details: "My layouts will work on any device, big or small.",
    color: "from-purple-600 to-purple-800",
    hoverColor: "group-hover:from-purple-500 group-hover:to-purple-700",
    iconBg: "bg-purple-500/20",
  },
  {
    id: 3,
    icon: <FaLightbulb color="yellow" size={45} />,
    title: "Intuitive",
    details: "Strong preference for easy-to-use, intuitive UX/UI.",
    color: "from-amber-500 to-amber-700",
    hoverColor: "group-hover:from-amber-400 group-hover:to-amber-600",
    iconBg: "bg-amber-500/20",
  },
  {
    id: 4,
    icon: <FaRocket color="orange" size={45} />,
    title: "Dynamic",
    details:
      "Websites don't have to be static; I love making pages come to life.",
    color: "from-rose-600 to-rose-800",
    hoverColor: "group-hover:from-rose-500 group-hover:to-rose-700",
    iconBg: "bg-rose-500/20",
  },
];

// Programming languages and frameworks - using Devicon for colorful icons
const programmingTech = [
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Rust", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg" },
  { name: "R", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
];

// Databases and backend
const backendTech = [
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
  { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
  { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "Prisma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" },
];

// Tools and platforms
const toolsTech = [
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Nginx", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
  { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
  { name: "Postman", icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
  { name: "Notion", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg" },
  { name: "Canva", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" },
];

// Web3 and blockchain
const web3Tech = [
  { name: "Ethereum", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ethereum/ethereum-original.svg" },
  { name: "Solidity", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg" },
  { name: "Hardhat", icon: "https://seeklogo.com/images/H/hardhat-logo-888739EBB4-seeklogo.com.png" },
  { name: "Web3.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/web3js/web3js-original.svg" },
  { name: "MetaMask", icon: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" },
];

const TechCard = ({ tech }: { tech: { name: string; icon: string } }) => (
  <div className="relative mx-4 w-32 shrink-0">
    <div className="group relative flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-[#320F85]/20 backdrop-blur-sm p-6 hover:border-white/30 hover:bg-[#320F85]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#9D7AFF]/20">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <Image
          src={tech.icon}
          alt={tech.name}
          width={64}
          height={64}
          className="object-contain group-hover:scale-110 transition-transform duration-300"
          unoptimized
        />
      </div>
      <span className="text-sm font-medium text-white/90 text-center">
        {tech.name}
      </span>
    </div>
  </div>
);

export default function SkillsDetails() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="relative py-16 md:py-24 px-4 md:px-6 text-white">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">About Me</h2>
            <motion.div
              className="h-1 w-16 bg-gradient-to-r from-[#FF9D7A] to-[#FFD166] mx-auto"
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              I'm a passionate developer focused on creating fast, responsive,
              and intuitive web experiences
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualities.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className={cn(
                  "group relative rounded-xl overflow-hidden shadow-lg transition-all duration-300",
                  "bg-gradient-to-br",
                  item.color,
                  "hover:shadow-xl"
                )}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br transition-all duration-300",
                      item.hoverColor
                    )}
                  />
                </div>

                <div className="relative p-6 flex flex-col items-center text-center z-10">
                  <div className={cn("p-4 rounded-full mb-4", item.iconBg)}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-white/80">{item.details}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">My Tech Stack</h2>
            <motion.div
              className="h-1 w-16 bg-gradient-to-r from-[#FF9D7A] to-[#FFD166] mx-auto"
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Technologies and tools I use to build amazing projects
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center mb-12">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full max-w-2xl"
            >
              <TabsList className="bg-[#320F85]/40 backdrop-blur-sm grid w-full grid-cols-2 md:grid-cols-5 gap-1">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="programming">Languages</TabsTrigger>
                <TabsTrigger value="backend">Backend</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
                <TabsTrigger value="web3">Web3</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Marquee Sections */}
          <div className="space-y-8">
            {/* Show all categories when "all" is selected */}
            {(activeTab === "all" || activeTab === "programming") && (
              <div className="relative">
                <h3 className="text-2xl font-semibold mb-6 text-center md:text-left">
                  Programming Languages & Frameworks
                </h3>
                <Marquee pauseOnHover className="[--duration:40s]">
                  {programmingTech.map((tech) => (
                    <TechCard key={tech.name} tech={tech} />
                  ))}
                </Marquee>
              </div>
            )}

            {(activeTab === "all" || activeTab === "backend") && (
              <div className="relative">
                <h3 className="text-2xl font-semibold mb-6 text-center md:text-left">
                  Databases & Backend Services
                </h3>
                <Marquee reverse pauseOnHover className="[--duration:30s]">
                  {backendTech.map((tech) => (
                    <TechCard key={tech.name} tech={tech} />
                  ))}
                </Marquee>
              </div>
            )}

            {(activeTab === "all" || activeTab === "tools") && (
              <div className="relative">
                <h3 className="text-2xl font-semibold mb-6 text-center md:text-left">
                  Development Tools & Platforms
                </h3>
                <Marquee pauseOnHover className="[--duration:35s]">
                  {toolsTech.map((tech) => (
                    <TechCard key={tech.name} tech={tech} />
                  ))}
                </Marquee>
              </div>
            )}

            {(activeTab === "all" || activeTab === "web3") && (
              <div className="relative">
                <h3 className="text-2xl font-semibold mb-6 text-center md:text-left">
                  Web3 & Blockchain
                </h3>
                <Marquee reverse pauseOnHover className="[--duration:25s]">
                  {web3Tech.map((tech) => (
                    <TechCard key={tech.name} tech={tech} />
                  ))}
                </Marquee>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
