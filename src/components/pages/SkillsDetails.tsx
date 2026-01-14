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
import { useDeviceType } from "@/lib/useDeviceTypes";
import { User, Sparkles } from "lucide-react";

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
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "PHP",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  },
  {
    name: "C++",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  {
    name: "Rust",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
  },
  {
    name: "R",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg",
  },
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Flutter",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
];

// Databases and backend
const backendTech = [
  {
    name: "MySQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },
  {
    name: "Supabase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
  },
  {
    name: "GraphQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  },
  {
    name: "Redis",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  },
  {
    name: "Prisma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
  },
];

// Tools and platforms
const toolsTech = [
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "VS Code",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  },
  {
    name: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Nginx",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
  },
  {
    name: "Vercel",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
  },
  {
    name: "Postman",
    icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
  },
  {
    name: "Notion",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg",
  },
  {
    name: "Canva",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
  },
];

// Web3 and blockchain
const web3Tech = [
  {
    name: "Ethereum",
    icon: "/Logo/ethereum.png",
  },
  {
    name: "Solidity",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg",
  },
  {
    name: "Solana",
    icon: "/Logo/solana.png",
  },
  {
    name: "Worldcoin",
    icon: "https://assets.coingecko.com/coins/images/31069/standard/worldcoin.jpeg?1696529903",
  },
  {
    name: "Web3.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/web3js/web3js-original.svg",
  },
  {
    name: "MetaMask",
    icon: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
  },
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

const MobileTechGrid = ({
  techs,
}: {
  techs: Array<{ name: string; icon: string }>;
}) => (
  <div className="grid grid-cols-3 gap-4">
    {techs.map((tech, index) => (
      <motion.div
        key={tech.name}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="group relative flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-[#320F85]/20 backdrop-blur-sm p-4 hover:border-white/30 hover:bg-[#320F85]/40 transition-all duration-300"
      >
        <div className="relative w-12 h-12 flex items-center justify-center">
          <Image
            src={tech.icon}
            alt={tech.name}
            width={48}
            height={48}
            className="object-contain group-hover:scale-110 transition-transform duration-300"
            unoptimized
          />
        </div>
        <span className="text-xs font-medium text-white/90 text-center line-clamp-2">
          {tech.name}
        </span>
      </motion.div>
    ))}
  </div>
);

export default function SkillsDetails() {
  const [activeTab, setActiveTab] = useState("all");
  const { isMobile } = useDeviceType();

  return (
    <div className="relative py-24 md:py-32 px-4 md:px-6 overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#763CAC]/15 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-[#FF9D7A]/10 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20 md:mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <User className="w-4 h-4 text-[#FF9D7A]" />
            <span className="text-[10px] font-bold text-[#FF9D7A] uppercase tracking-[0.2em]">
              The Developer
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold font-primary mb-6 bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
            Crafting Digital <span className="text-[#FF9D7A]">Excellence</span>
          </h2>

          <p className="text-gray-400 font-secondary max-w-2xl mx-auto text-lg leading-relaxed">
            A developer passionate about creating fast, responsive, and
            intuitive web experiences that leave a lasting impression.
          </p>
        </motion.div>

        {/* Qualities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-32">
          {qualities.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="relative h-full p-8 md:p-10 bg-[#1a0b2e]/40 border border-white/10 rounded-[2.5rem] backdrop-blur-md overflow-hidden hover:border-[#FF9D7A]/30 transition-all duration-500 shadow-2xl">
                {/* Gradient Background on Hover */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500",
                    item.color
                  )}
                />

                <div
                  className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6",
                    item.iconBg
                  )}
                >
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold font-primary mb-4 group-hover:text-[#FF9D7A] transition-colors">
                  {item.title}
                </h3>

                <p className="text-gray-400 font-secondary leading-relaxed group-hover:text-gray-300 transition-colors">
                  {item.details}
                </p>

                {/* Decorative Element */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-[#FF9D7A]/20 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
        >
          {/* Section Sub-header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Sparkles className="w-4 h-4 text-[#FF9D7A]" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                Tech Ecosystem
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-primary mb-12">
              My <span className="text-[#FF9D7A]">Stack</span> Architecture
            </h2>

            {/* Premium Tabs */}
            {!isMobile && (
              <div className="flex justify-center mb-12">
                <div className="inline-flex p-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem]">
                  {["all", "programming", "backend", "tools", "web3"].map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                          "px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300",
                          activeTab === tab
                            ? "bg-[#FF9D7A] text-white shadow-[0_4px_20px_rgba(255,157,122,0.3)]"
                            : "text-gray-500 hover:text-white"
                        )}
                      >
                        {tab === "programming" ? "Languages" : tab}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Marquee Grids */}
          <div className="space-y-12">
            {(isMobile ||
              activeTab === "all" ||
              activeTab === "programming") && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mb-8 text-center">
                  Languages & Frameworks
                </h4>
                {isMobile ? (
                  <MobileTechGrid techs={programmingTech} />
                ) : (
                  <Marquee pauseOnHover className="[--duration:40s] py-4">
                    {programmingTech.map((tech) => (
                      <TechCard key={tech.name} tech={tech} />
                    ))}
                  </Marquee>
                )}
              </motion.div>
            )}

            {(isMobile || activeTab === "all" || activeTab === "backend") && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mb-8 text-center">
                  Databases & Infrastructure
                </h4>
                {isMobile ? (
                  <MobileTechGrid techs={backendTech} />
                ) : (
                  <Marquee
                    reverse
                    pauseOnHover
                    className="[--duration:35s] py-4"
                  >
                    {backendTech.map((tech) => (
                      <TechCard key={tech.name} tech={tech} />
                    ))}
                  </Marquee>
                )}
              </motion.div>
            )}

            {(isMobile || activeTab === "all" || activeTab === "tools") && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mb-8 text-center">
                  Development Power-Tools
                </h4>
                {isMobile ? (
                  <MobileTechGrid techs={toolsTech} />
                ) : (
                  <Marquee pauseOnHover className="[--duration:45s] py-4">
                    {toolsTech.map((tech) => (
                      <TechCard key={tech.name} tech={tech} />
                    ))}
                  </Marquee>
                )}
              </motion.div>
            )}

            {(isMobile || activeTab === "all" || activeTab === "web3") && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mb-8 text-center">
                  Web3 & Digital Assets
                </h4>
                {isMobile ? (
                  <MobileTechGrid techs={web3Tech} />
                ) : (
                  <Marquee
                    reverse
                    pauseOnHover
                    className="[--duration:30s] py-4"
                  >
                    {web3Tech.map((tech) => (
                      <TechCard key={tech.name} tech={tech} />
                    ))}
                  </Marquee>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
