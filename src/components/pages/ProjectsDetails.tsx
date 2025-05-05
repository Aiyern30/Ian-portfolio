"use client";

import { useState, useEffect, useRef } from "react";
import {
  Github,
  ExternalLink,
  Search,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  Tag,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useDeviceType } from "@/lib/useDeviceTypes";
import { Badge, Button, Skeleton, Input } from "@/components/ui";
import { cn } from "@/lib/utils";

// Project data
const projects = [
  {
    title: "Music Application with Spotify (SpotWave)",
    label: [
      "Spotify",
      "NextJS",
      "Tailwind CSS",
      "Framer Motion",
      "React",
      "Vercel",
      "TypeScript",
      "Shadcn UI",
      "Lottie React",
      "Axios",
      "Google Maps API",
      "Ticketmaster API",
      "PredictHQ API",
    ],
    category: "Web Application",
    description:
      "SpotWave allows you to search for and listen to Spotify songs with a preview and lyrics. You can also view the top tracks and artists in global rank and come with their all details such as bio, images, albums, and tracks.",
    imageUrl: "/SpotWave.png",
    livePreviewUrl: "https://spot-wave.vercel.app/",
    githubRepo: "https://github.com/Aiyern30/SpotWave",
  },
  {
    title: "YTL Cement IT Department",
    label: [
      "Power BI",
      "Microsoft Report Builder",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "NextJS",
      "PrimeReact",
      "SCSS",
      "apollo client",
      "graphql",
      "pino",
      "pupeeter",
    ],
    category: "Enterprise",
    description:
      "Recently, I joined the YTL Cement IT department, focusing on developing an e-invoice system. The system manages driver e-invoices and supports role-based access for submitting documents to LHDN. I worked on key features such as income and expenses tracking, statement of accounts, and invoice reporting using Microsoft Power BI and Report Builder.",
    imageUrl: "/Dos-portal.png",
    livePreviewUrl: "https://dos.uat4ytlcement.com/",
    githubRepo: null,
  },
  {
    title: "Sino Mobile and Heavy Equipment (SMHE)",
    label: [
      "NextJS",
      "Tailwind CSS",
      "React",
      "TypeScript",
      "Google Maps API",
      "Framer Motion",
      "Strapi",
      "Google Maps API",
    ],
    category: "Website",
    description:
      "Developed the landing page for the Sino Mobile and Heavy Equipment (SMHE) website, focusing on showcasing trucks for sale. Key features include a Media Center, About Us section, detailed truck pages with overview and specifications, and options for users to contact sales or download brochures. Integrated Google Maps to display workshop and factory locations for easy navigation.",
    imageUrl: "/SMHE.png",
    livePreviewUrl: "https://smhe.my",
    githubRepo: null,
  },
  {
    title: "Reka Konsult Company Profile",
    label: [
      "NextJS",
      "Tailwind CSS",
      "React",
      "Vercel",
      "TypeScript",
      "Shadcn UI",
      "Heroicons",
      "EmailJS",
      "Leaflet",
      "Lucide react",
      "Google Maps API",
    ],
    category: "Website",
    description:
      "The Reka Konsult Company Profile is a comprehensive showcase of our company's vision, values, and services. This web application serves as an engaging platform to inform potential clients and partners about Reka Konsult's capabilities, including company background, services offered, and easy contact information.",
    imageUrl: "/Reka-Konsult.png",
    livePreviewUrl: "https://reka-konsult.vercel.app/",
    githubRepo: "https://github.com/Aiyern30/reka-konsult",
  },
  {
    title: "LiveSportsNow",
    label: [
      "NextAuth",
      "NextJS",
      "Tailwind CSS",
      "React",
      "Vercel",
      "TypeScript",
      "Shadcn UI",
      "Lucide react",
      "Football API",
    ],
    category: "Web Application",
    description:
      "LiveSportsNow is a comprehensive sports platform that allows users to view real-time scores, standings, team details, and stats across multiple sports, including NBA, NFL, Soccer, and more. Designed to offer an experience similar to ESPN, the app provides up-to-date sports coverage, helping fans stay informed with the latest game results, league rankings, and team performances.",
    imageUrl: "/LiveSportsNow.png",
    livePreviewUrl: "https://livesportsnow.vercel.app/NBA",
    githubRepo: "https://github.com/Aiyern30/LiveSportsNow.git",
  },
  {
    title: "Expenses Tracker (SplitTrack)",
    label: [
      "Firebase",
      "NextAuth",
      "NextJS",
      "Tailwind CSS",
      "React",
      "Vercel",
      "TypeScript",
      "Shadcn UI",
      "Lucide react",
    ],
    category: "Web Application",
    description:
      "The Expenses Tracker is a robust application designed to help users efficiently manage their finances. Track your expenses daily, monthly, and yearly, and gain detailed insights into your spending habits. Key features include expense tracking, managing friend expenses, and effective group expense management during trips.",
    imageUrl: "/Split-Track.png",
    livePreviewUrl: "https://split-track.vercel.app/",
    githubRepo: "https://github.com/Aiyern30/SplitTrack",
  },
  {
    title: "Ethereum KL 2024 Hackathon (SassyDispute)",
    label: [
      "Solidity",
      "Hardhat",
      "OpenZeppelin",
      "ERC 20",
      "NextJS",
      "React",
      "Framer motion",
      "Tailwind CSS",
      "TypeScript",
      "Shadcn UI",
      "emailjs",
      "Lucide-react",
      "react-cofetti",
      "Pinata API",
      "Alchemy Node API",
    ],
    category: "Hackathon",
    description:
      "SassyDispute is a platform that allows Web2/Web3 e-commerce websites to share and bridge their dispute cases via IPFS, facilitating decentralized conversations and resolutions. User can comment on dispute cases, search and filter dispute cases and dispute providers can use our ready-bridge smart contract to bridge their Web3 E-commerce platform into SassyDispute",
    imageUrl: "/ETHKL.png",
    livePreviewUrl: "https://sassy-dispute.vercel.app/",
    githubRepo: "https://github.com/FramedStone/SassyDispute",
  },
  {
    title: "Canva Hackathon (Poll Generator)",
    label: [
      "React",
      "NextJS",
      "Canva App SDK",
      "quickChart API",
      "qrcode API",
      "Poll API",
      "Amazon AWS",
      "Vercel",
      "Tailwind Css",
      "TypeScript",
      "Magic UI",
      "Shadcn UI",
      "Material UI",
    ],
    category: "Hackathon",
    description:
      "Poll Generator is a Canva-integrated platform that simplifies poll and survey creation while providing real-time data visualization. Users can design visually appealing surveys, distribute them via QR codes or a dedicated website, and instantly see response trends. Multiple polls can be included in a single survey for comprehensive data collection.",
    imageUrl: "/Canva.jpg",
    livePreviewUrl: "https://devpost.com/software/canva-dx620n",
    githubRepo: "https://github.com/Aiyern30/Canva-Hackathon",
  },
  {
    title: "Google Cloud Vertex AI Agent Builder Hackathon (PythonGPT)",
    label: [
      "HTML",
      "CSS",
      "JavaScript",
      "Python",
      "Flask",
      "EC2",
      "Google Cloud SDK",
      "Google Cloud IAM Service Account",
      "Vertex AI API",
      "Gemini-1.0-Pro-Version-001 Model",
      "bootstrap",
      "Tailwind CSS",
    ],
    category: "Hackathon",
    description:
      "PythonGPT is a dynamic website designed to teach beginners how to code in Python. It offers Python documentation, Python code implementation examples, Python exercises, AI Chatbot Assistance",
    imageUrl: "/PythonAI.jpg",
    livePreviewUrl: "https://devpost.com/software/pythongpt",
    githubRepo: "https://github.com/AcruxN/vertex_PythonGPT/",
  },
  {
    title: "Devmatch Hackathon (VoteChain)",
    label: [
      "Solidity",
      "React",
      "Metamask",
      "NextJS",
      "Hardhat",
      "EmailJS",
      "Tailwind Css",
      "TypeScript",
      "Shadcn UI",
    ],
    category: "Hackathon",
    description:
      "Decentralized voting technology reduces costs by eliminating the need for physical polling places and allows remote voting, boosting democratic participation. It can also be used in organizations, enabling employees to vote on decisions and generate reputation reports based on accuracy and activity. These reports can inform hiring decisions for roles requiring strong decision-making skills, such as HR and recruiting audits.",
    imageUrl: "/Devmatch.png",
    livePreviewUrl:
      "https://devfolio.co/projects/decentralized-voting-system-peyouth-aa44",
    githubRepo: "https://github.com/Aiyern30/Voting-System-DevMatch-Hackathon-",
  },
];

// Extract all unique technologies and categories
const allTechnologies = Array.from(
  new Set(projects.flatMap((project) => project.label))
);
const allCategories = Array.from(
  new Set(projects.map((project) => project.category))
);

export default function ProjectsSection() {
  const { isMobile, isTablet } = useDeviceType();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailProject, setDetailProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the filter panel to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter projects based on search term, category, and technology
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory
      ? project.category === selectedCategory
      : true;

    const matchesTech = selectedTech
      ? project.label.includes(selectedTech)
      : true;

    return matchesSearch && matchesCategory && matchesTech;
  });

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 4);

  const openDetailModal = (project: (typeof projects)[0]) => {
    setDetailProject(project);
    setIsDetailModalOpen(true);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
    setSelectedTech(null);
  };

  return (
    <section
      className="py-16 md:py-24 px-4 md:px-6 text-white relative"
      id="projects"
    >
      {/* Background with animated gradient */}

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">My Recent Work</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are a few past design projects I&apos;ve worked on. Want to see
            more?{" "}
            <a
              href="mailto:ianbian2@gmail.com"
              className="text-[#FF9D7A] hover:underline"
            >
              Email me
            </a>
            .
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-64">
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#320F85]/40 backdrop-blur-sm border-white/20 text-white placeholder-white/60"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative" ref={filterRef}>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                  {(selectedCategory || selectedTech) && (
                    <span className="ml-2 w-2 h-2 rounded-full bg-[#FF9D7A]"></span>
                  )}
                </Button>

                {/* Filter Panel */}
                <AnimatePresence>
                  {isFilterOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-72 md:w-80 bg-[#320F85]/90 backdrop-blur-md rounded-lg shadow-xl p-4 z-50"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium">Filter Projects</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={resetFilters}
                          className="h-8 text-xs"
                        >
                          Reset
                        </Button>
                      </div>

                      {/* Categories */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2 text-white/70">
                          Categories
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {allCategories.map((category) => (
                            <Badge
                              key={category}
                              variant={
                                selectedCategory === category
                                  ? "default"
                                  : "outline"
                              }
                              className={cn(
                                "cursor-pointer",
                                selectedCategory === category
                                  ? "bg-[#FF9D7A] hover:bg-[#FF9D7A]/80"
                                  : "hover:bg-white/10"
                              )}
                              onClick={() =>
                                setSelectedCategory(
                                  selectedCategory === category
                                    ? null
                                    : category
                                )
                              }
                            >
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="text-sm font-medium mb-2 text-white/70">
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-2">
                          {allTechnologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant={
                                selectedTech === tech ? "default" : "outline"
                              }
                              className={cn(
                                "cursor-pointer",
                                selectedTech === tech
                                  ? "bg-[#FF9D7A] hover:bg-[#FF9D7A]/80"
                                  : "hover:bg-white/10"
                              )}
                              onClick={() =>
                                setSelectedTech(
                                  selectedTech === tech ? null : tech
                                )
                              }
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Active filters display */}
              <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
                {selectedCategory && (
                  <Badge
                    variant="secondary"
                    className="bg-[#FF9D7A]/20 text-[#FF9D7A] hover:bg-[#FF9D7A]/30"
                  >
                    {selectedCategory}
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() => setSelectedCategory(null)}
                    />
                  </Badge>
                )}
                {selectedTech && (
                  <Badge
                    variant="secondary"
                    className="bg-[#FF9D7A]/20 text-[#FF9D7A] hover:bg-[#FF9D7A]/30"
                  >
                    {selectedTech}
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() => setSelectedTech(null)}
                    />
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project Count */}
        {filteredProjects.length > 0 && (
          <motion.div
            className="text-sm text-white/60 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Showing {displayedProjects.length} of {filteredProjects.length}{" "}
            projects
          </motion.div>
        )}

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4">
              <Search className="w-12 h-12 text-white/30 mx-auto" />
            </div>
            <h3 className="text-xl font-medium mb-2">No projects found</h3>
            <p className="text-white/60 mb-4">
              Try adjusting your search or filters
            </p>
            <Button variant="outline" onClick={resetFilters}>
              Reset Filters
            </Button>
          </motion.div>
        )}

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {displayedProjects.map((project, index) => {
            const isActive = selectedProject === index;

            return (
              <motion.div
                key={index}
                className="group relative rounded-xl bg-[#320F85]/20 backdrop-blur-sm border border-white/10 shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={!isMobile ? { y: -5 } : undefined}
              >
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-[#FF9D7A] hover:bg-[#FF9D7A]">
                    {project.category}
                  </Badge>
                </div>

                {/* Image Container */}
                <div className="relative aspect-[16/9] rounded-t-xl overflow-hidden">
                  <Image
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    priority={index < 4}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2 line-clamp-1">
                    {project.title}
                  </h3>

                  {/* Description - different for mobile and desktop */}
                  {isMobile ? (
                    <p className="text-sm text-white/80 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                  ) : (
                    <p className="text-sm text-white/80 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                  )}

                  {/* Tech Labels - limited for space */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.label.slice(0, isMobile ? 3 : 5).map((tech, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.label.length > (isMobile ? 3 : 5) && (
                      <Badge variant="outline" className="text-xs">
                        +{project.label.length - (isMobile ? 3 : 5)} more
                      </Badge>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-[#FF9D7A] hover:bg-[#FF9D7A]/80 text-white"
                      onClick={() => openDetailModal(project)}
                    >
                      View Details
                    </Button>
                    <div className="flex gap-2">
                      {project.githubRepo && (
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 border-white/20"
                          onClick={() =>
                            window.open(project.githubRepo, "_blank")
                          }
                        >
                          <Github className="w-4 h-4" />
                        </Button>
                      )}
                      {project.livePreviewUrl && (
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 border-white/20"
                          onClick={() =>
                            window.open(project.livePreviewUrl, "_blank")
                          }
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Show More / Show Less Button */}
        {filteredProjects.length > 4 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll(!showAll)}
              className="border-white/20 hover:bg-white/10"
            >
              {showAll ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-2" /> Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-2" /> Show More (
                  {filteredProjects.length - 4} more)
                </>
              )}
            </Button>
          </motion.div>
        )}

        {/* Project Detail Modal */}
        <AnimatePresence>
          {isDetailModalOpen && detailProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
              onClick={() => setIsDetailModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="bg-gradient-to-br from-[#320F85] to-[#763CAC] rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-2xl"
                onClick={(e: { stopPropagation: () => any }) =>
                  e.stopPropagation()
                }
              >
                <div className="relative aspect-video">
                  <Image
                    src={detailProject.imageUrl || "/placeholder.svg"}
                    alt={detailProject.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 text-white bg-black/30 hover:bg-black/50"
                    onClick={() => setIsDetailModalOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-[#FF9D7A] hover:bg-[#FF9D7A]">
                      {detailProject.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 overflow-y-auto max-h-[50vh]">
                  <h2 className="text-2xl font-bold mb-4">
                    {detailProject.title}
                  </h2>

                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-white/70 mb-2">
                      Description
                    </h3>
                    <p className="text-white/90">{detailProject.description}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-white/70 mb-2">
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {detailProject.label.map((tech, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {detailProject.livePreviewUrl && (
                      <Button
                        onClick={() =>
                          window.open(detailProject.livePreviewUrl, "_blank")
                        }
                        className="bg-[#FF9D7A] hover:bg-[#FF9D7A]/80"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Preview
                      </Button>
                    )}
                    {detailProject.githubRepo && (
                      <Button
                        variant="outline"
                        onClick={() =>
                          window.open(detailProject.githubRepo, "_blank")
                        }
                        className="border-white/20"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
