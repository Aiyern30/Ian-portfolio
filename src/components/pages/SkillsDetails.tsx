"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcAlarmClock } from "react-icons/fc";
import { IoDesktopOutline } from "react-icons/io5";
import {
  FaLightbulb,
  FaRocket,
  FaCode,
  FaTools,
  FaSearch,
} from "react-icons/fa";

import { cn } from "@/lib/utils";
import { Badge, Input, Tabs, TabsList, TabsTrigger } from "../ui";

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

// Programming Skills
const programmingSkills = [
  { id: 1, name: "CSS", level: 90, category: "Frontend" },
  { id: 2, name: "HTML", level: 90, category: "Frontend" },
  { id: 3, name: "React", level: 90, category: "Frontend" },
  { id: 4, name: "JavaScript", level: 90, category: "Frontend" },
  { id: 5, name: "NextJS", level: 90, category: "Frontend" },
  { id: 6, name: "Tailwind CSS", level: 90, category: "Frontend" },
  { id: 7, name: "Python", level: 70, category: "Backend" },
  { id: 8, name: "PHP", level: 80, category: "Backend" },
  { id: 9, name: "Java", level: 70, category: "Backend" },
  { id: 10, name: "MySQL", level: 70, category: "Database" },
  { id: 11, name: "TypeScript", level: 75, category: "Frontend" },
  { id: 12, name: "Node.js", level: 70, category: "Backend" },
  { id: 13, name: "Flutter", level: 70, category: "Mobile" },
  { id: 14, name: "R Language", level: 70, category: "Data Science" },
  { id: 15, name: "LabView", level: 70, category: "Other" },
  { id: 16, name: "C++", level: 70, category: "Backend" },
  { id: 17, name: "App Script", level: 70, category: "Other" },
];

// Tools and Applications
const toolsSkills = [
  { id: 1, name: "Visual Studio Code", level: 70, category: "Development" },
  { id: 2, name: "GitHub", level: 80, category: "Version Control" },
  { id: 3, name: "Adobe Premiere Pro", level: 70, category: "Design" },
  { id: 4, name: "Canva", level: 80, category: "Design" },
  { id: 5, name: "RStudio", level: 70, category: "Data Science" },
  { id: 6, name: "Notion", level: 90, category: "Productivity" },
  { id: 7, name: "Netbeans", level: 70, category: "Development" },
  { id: 8, name: "Microsoft Word", level: 90, category: "Office" },
  { id: 9, name: "PowerPoint", level: 85, category: "Office" },
  { id: 10, name: "Excel", level: 80, category: "Office" },
];

// Extract unique categories
const programmingCategories = [
  "All",
  ...Array.from(new Set(programmingSkills.map((skill) => skill.category))),
];
const toolsCategories = [
  "All",
  ...Array.from(new Set(toolsSkills.map((skill) => skill.category))),
];

export default function SkillsDetails() {
  const [activeTab, setActiveTab] = useState("programming");
  const [programmingFilter, setProgrammingFilter] = useState("All");
  const [toolsFilter, setToolsFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    setIsInView(true);
  }, []);

  // Filter skills based on category and search term
  const filteredProgrammingSkills = programmingSkills.filter((skill) => {
    const matchesCategory =
      programmingFilter === "All" || skill.category === programmingFilter;
    const matchesSearch = skill.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredToolsSkills = toolsSkills.filter((skill) => {
    const matchesCategory =
      toolsFilter === "All" || skill.category === toolsFilter;
    const matchesSearch = skill.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get level color based on percentage
  const getLevelColor = (level: number) => {
    if (level >= 90) return "bg-emerald-500";
    if (level >= 80) return "bg-green-500";
    if (level >= 70) return "bg-lime-500";
    if (level >= 60) return "bg-yellow-500";
    if (level >= 50) return "bg-amber-500";
    return "bg-orange-500";
  };

  // Get level text color based on percentage
  const getLevelTextColor = (level: number) => {
    if (level >= 90) return "text-emerald-500";
    if (level >= 80) return "text-green-500";
    if (level >= 70) return "text-lime-500";
    if (level >= 60) return "text-yellow-500";
    if (level >= 50) return "text-amber-500";
    return "text-orange-500";
  };

  return (
    <div className="relative py-16 md:py-24 px-4 md:px-6 text-white">
      <div className="max-w-6xl mx-auto relative z-10">
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
            <h2 className="text-4xl font-bold mb-4">My Skills</h2>
            <motion.div
              className="h-1 w-16 bg-gradient-to-r from-[#FF9D7A] to-[#FFD166] mx-auto"
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              A comprehensive overview of my technical skills and proficiency
              levels
            </p>
          </div>

          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <Tabs
                defaultValue="programming"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full sm:w-auto"
              >
                <TabsList className="bg-[#320F85]/40 backdrop-blur-sm">
                  <TabsTrigger
                    value="programming"
                    className="flex items-center gap-2"
                  >
                    <FaCode className="w-4 h-4" />
                    <span>Programming</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="tools"
                    className="flex items-center gap-2"
                  >
                    <FaTools className="w-4 h-4" />
                    <span>Tools</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="relative w-full sm:w-64">
                <Input
                  type="text"
                  placeholder="Search skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-[#320F85]/40 backdrop-blur-sm border-white/20 text-white placeholder-white/60"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <AnimatePresence mode="wait">
              {activeTab === "programming" && (
                <motion.div
                  key="programming-categories"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-wrap gap-2"
                >
                  {programmingCategories.map((category) => (
                    <Badge
                      key={category}
                      variant={
                        programmingFilter === category ? "default" : "outline"
                      }
                      className={cn(
                        "cursor-pointer",
                        programmingFilter === category
                          ? "bg-[#9D7AFF] hover:bg-[#9D7AFF]/80"
                          : "hover:bg-white/10"
                      )}
                      onClick={() => setProgrammingFilter(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </motion.div>
              )}

              {activeTab === "tools" && (
                <motion.div
                  key="tools-categories"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-wrap gap-2"
                >
                  {toolsCategories.map((category) => (
                    <Badge
                      key={category}
                      variant={toolsFilter === category ? "default" : "outline"}
                      className={cn(
                        "cursor-pointer",
                        toolsFilter === category
                          ? "bg-[#9D7AFF] hover:bg-[#9D7AFF]/80"
                          : "hover:bg-white/10"
                      )}
                      onClick={() => setToolsFilter(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "programming" && (
              <motion.div
                key="programming-skills"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filteredProgrammingSkills.length === 0 ? (
                  <div className="text-center py-12">
                    <FaSearch className="w-12 h-12 text-white/30 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">
                      No skills found
                    </h3>
                    <p className="text-white/60">
                      Try adjusting your search or filter
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredProgrammingSkills.map((skill, index) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: isInView ? 1 : 0,
                          y: isInView ? 0 : 20,
                        }}
                        transition={{ duration: 0.5, delay: 0.05 * index }}
                        className="bg-[#320F85]/20 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:border-white/30 transition-all duration-300"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <h3 className="font-medium text-lg">
                              {skill.name}
                            </h3>
                            <Badge className="ml-2 bg-[#9D7AFF]/20 text-[#9D7AFF] text-xs">
                              {skill.category}
                            </Badge>
                          </div>
                          <span
                            className={cn(
                              "font-bold text-lg",
                              getLevelTextColor(skill.level)
                            )}
                          >
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className={cn(
                              "h-full rounded-full",
                              getLevelColor(skill.level)
                            )}
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{
                              duration: 1,
                              delay: 0.1 * index,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "tools" && (
              <motion.div
                key="tools-skills"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filteredToolsSkills.length === 0 ? (
                  <div className="text-center py-12">
                    <FaSearch className="w-12 h-12 text-white/30 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">No tools found</h3>
                    <p className="text-white/60">
                      Try adjusting your search or filter
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredToolsSkills.map((skill, index) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: isInView ? 1 : 0,
                          y: isInView ? 0 : 20,
                        }}
                        transition={{ duration: 0.5, delay: 0.05 * index }}
                        className="bg-[#320F85]/20 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:border-white/30 transition-all duration-300"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <h3 className="font-medium text-lg">
                              {skill.name}
                            </h3>
                            <Badge className="ml-2 bg-[#FF9D7A]/20 text-[#FF9D7A] text-xs">
                              {skill.category}
                            </Badge>
                          </div>
                          <span
                            className={cn(
                              "font-bold text-lg",
                              getLevelTextColor(skill.level)
                            )}
                          >
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className={cn(
                              "h-full rounded-full",
                              getLevelColor(skill.level)
                            )}
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{
                              duration: 1,
                              delay: 0.1 * index,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
