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
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useDeviceType } from "@/lib/useDeviceTypes";
import { Badge, Button, Input } from "@/components/ui";
import { cn } from "@/lib/utils";

// Project data
const projects = [
  {
    title: "YTL Concrete Hub (AI-Powered Platform)",
    label: [
      "NextJS",
      "Tailwind CSS",
      "Framer Motion",
      "React",
      "Vercel",
      "TypeScript",
      "Shadcn UI",
      "Supabase",
      "Google Cloud Vision API",
      "Gemini Flash 1.5 Pro",
      "Stripe",
      "Chart.js",
      "Google Client",
      "Google Maps API",
      "NextAuth",
      "Twilio",
    ],
    category: "Web Application",
    description:
      "YTL Concrete Hub is an AI-driven platform sponsored by YTL Shared Services Sdn Bhd as part of a Final Year Project. The system integrates intelligent chatbot interactions, smart product comparisons, AI-powered image processing, and predictive analytics. It also features a staff dashboard for real-time product insights, automated alerts, and business intelligence visualization to enhance operational efficiency.",
    imageUrl: "/YTLConcreteHub.png",
    livePreviewUrl: "https://ytlconcretehub.vercel.app/",
    githubRepo: "",
  },

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
    category: "Enterprise",
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
    title: "Gamer Token Hub (Web3 NFT Marketplace)",
    label: [
      "NextJS",
      "Tailwind CSS",
      "Framer Motion",
      "React",
      "TypeScript",
      "Vercel",
      "ethers.js",
      "RainbowKit",
      "React Hook Form",
      "Zod",
      "IPFS",
      "Pinata",
    ],
    category: "Web Application",
    description:
      "Gamer Token Hub is a decentralized NFT marketplace built on the Sepolia test network. It allows users to create and manage NFT collections, mint NFTs with custom metadata, list and purchase NFTs, and view user profiles with their owned and minted NFTs. The platform also includes wishlist, shopping cart, and responsive UI features to provide a smooth and engaging Web3 experience.",
    imageUrl: "/GamerTokenHub.png",
    livePreviewUrl: "https://gamertokenhub.vercel.app/",
    githubRepo: "https://github.com/Aiyern30/blockchain-fe",
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
    title: "Children's Respite Home KL (Company Profile Website)",
    label: [
      "NextJS",
      "Tailwind CSS",
      "Framer Motion",
      "React",
      "TypeScript",
      "Shadcn UI",
      "Cloudflare",
    ],
    category: "Website",
    description:
      "A freelance project developed for a Malaysia-based community respite care centre for children with special needs. The website showcases the organization’s mission, services, and facilities with a warm, accessible design. It aims to help families learn more about the centre’s compassionate short-term care and community support programs.",
    imageUrl: "/ChildrenRespiteHomeKL.png",
    livePreviewUrl: "https://childrenrespitehomekl.com/",
    githubRepo: "",
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
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailProject, setDetailProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // Handle scroll lock when modal is open
  useEffect(() => {
    if (isDetailModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDetailModalOpen]);

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

    const matchesTech =
      selectedTechs.length > 0
        ? selectedTechs.every((tech) => project.label.includes(tech))
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
    setSelectedTechs([]);
  };

  return (
    <div className="py-20 md:py-32 px-6 text-white relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#763CAC]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-[#FF9D7A]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#FF9D7A] font-medium tracking-wider uppercase text-sm">
              <span className="w-8 h-[1px] bg-[#FF9D7A]" />
              Portfolio
            </div>
            <h2 className="text-4xl md:text-6xl font-bold font-primary">
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9D7A] to-[#FFD166]">
                Projects
              </span>
            </h2>
            <p className="text-gray-400 max-w-xl text-lg font-secondary">
              A curated selection of my most challenging and impactful work,
              spanning <span className="text-white font-medium">Web3</span>,{" "}
              <span className="text-white font-medium">AI Integration</span>,
              and{" "}
              <span className="text-white font-medium">
                Enterprise Solutions
              </span>
              .
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Box */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#763CAC] to-[#FF9D7A] rounded-xl blur opacity-0 group-focus-within:opacity-20 transition duration-500" />
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#FF9D7A]/50 transition-all placeholder:text-gray-600 text-sm"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={cn(
                "flex items-center justify-center gap-2 px-6 py-3 rounded-xl border transition-all text-sm font-medium",
                isFilterOpen || selectedCategory || selectedTechs.length > 0
                  ? "bg-[#FF9D7A] border-[#FF9D7A] text-white"
                  : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
              )}
            >
              <Filter className="w-4 h-4" />
              Filters
              {(selectedCategory || selectedTechs.length > 0) && (
                <span className="w-2 h-2 rounded-full bg-white ml-1" />
              )}
            </button>
          </div>
        </motion.div>

        {/* Expanded Filter Panel */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-12"
            >
              <div className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold font-primary">
                    Refine Projects
                  </h3>
                  <button
                    onClick={resetFilters}
                    className="text-sm text-[#FF9D7A] hover:underline"
                  >
                    Reset All Filters
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                      Categories
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {allCategories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() =>
                            setSelectedCategory(
                              selectedCategory === cat ? null : cat
                            )
                          }
                          className={cn(
                            "px-4 py-2 rounded-lg text-sm transition-all border",
                            selectedCategory === cat
                              ? "bg-[#FF9D7A] border-[#FF9D7A] text-white shadow-[0_0_15px_rgba(255,157,122,0.3)]"
                              : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                      Popular Tech
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {allTechnologies.slice(0, 15).map((tech) => (
                        <button
                          key={tech}
                          onClick={() => {
                            if (selectedTechs.includes(tech)) {
                              setSelectedTechs((prev) =>
                                prev.filter((t) => t !== tech)
                              );
                            } else {
                              setSelectedTechs((prev) => [...prev, tech]);
                            }
                          }}
                          className={cn(
                            "px-4 py-2 rounded-lg text-sm transition-all border",
                            selectedTechs.includes(tech)
                              ? "bg-[#763CAC] border-[#763CAC] text-white"
                              : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30"
                          )}
                        >
                          {tech}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {displayedProjects.map((project, index) => {
            const isFeatured =
              index === 0 &&
              !searchTerm &&
              !selectedCategory &&
              selectedTechs.length === 0;

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  "group relative",
                  isFeatured ? "md:col-span-2" : ""
                )}
              >
                {/* Card Container */}
                <div
                  className={cn(
                    "relative flex flex-col h-full bg-[#1a0b2e]/40 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-md hover:border-[#FF9D7A]/30 transition-all duration-500 shadow-2xl",
                    isFeatured ? "lg:flex-row min-h-[500px]" : "flex-col"
                  )}
                >
                  {/* Image Section */}
                  <div
                    className={cn(
                      "relative overflow-hidden",
                      isFeatured
                        ? "lg:w-1/2 aspect-[16/10] lg:aspect-auto"
                        : "aspect-[16/10]"
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a0b2e] via-transparent to-transparent z-10" />
                    <Image
                      src={project.imageUrl || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Hover Buttons Overlay */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-sm">
                      {project.livePreviewUrl && (
                        <button
                          onClick={() =>
                            window.open(project.livePreviewUrl, "_blank")
                          }
                          className="p-4 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-xl"
                          title="Live Preview"
                        >
                          <ExternalLink className="w-6 h-6" />
                        </button>
                      )}
                    </div>

                    <div className="absolute top-6 left-6 z-20">
                      <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white tracking-widest uppercase">
                        {isFeatured ? "Featured Project" : project.category}
                      </span>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div
                    className={cn(
                      "p-8 md:p-10 flex-1 flex flex-col justify-center",
                      isFeatured ? "lg:p-12" : ""
                    )}
                  >
                    <div className="space-y-4">
                      {isFeatured && (
                        <span className="text-[#FF9D7A] text-sm font-bold uppercase tracking-widest">
                          {project.category}
                        </span>
                      )}
                      <h3
                        className={cn(
                          "font-bold font-primary group-hover:text-[#FF9D7A] transition-colors",
                          isFeatured
                            ? "text-3xl md:text-5xl"
                            : "text-2xl md:text-3xl"
                        )}
                      >
                        {project.title}
                      </h3>
                      <p
                        className={cn(
                          "text-gray-400 font-secondary leading-relaxed",
                          isFeatured ? "text-lg line-clamp-4" : "line-clamp-3"
                        )}
                      >
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.label
                          .slice(0, isFeatured ? 8 : 4)
                          .map((tech) => (
                            <span
                              key={tech}
                              className="text-[10px] font-bold text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 uppercase tracking-wider"
                            >
                              {tech}
                            </span>
                          ))}
                      </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between">
                      <button
                        onClick={() => openDetailModal(project)}
                        className="flex items-center gap-2 text-sm font-bold text-white group/btn"
                      >
                        <span className="relative overflow-hidden">
                          <span className="block transition-transform duration-300 group-hover/btn:-translate-y-full">
                            View Case Study
                          </span>
                          <span className="absolute inset-0 block transition-transform duration-300 translate-y-full group-hover/btn:translate-y-0 text-[#FF9D7A]">
                            View Case Study
                          </span>
                        </span>
                        <ExternalLink className="w-4 h-4 text-[#FF9D7A]" />
                      </button>

                      <div className="flex gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                        {project.githubRepo && (
                          <button
                            onClick={() =>
                              window.open(project.githubRepo, "_blank")
                            }
                            className="p-2 hover:text-[#FF9D7A] transition-colors"
                            title="Github Repo"
                          >
                            <Github className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Load More Section */}
        {filteredProjects.length > filteredProjects.slice(0, 4).length && (
          <motion.div
            className="mt-20 flex flex-col items-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="group relative px-10 py-4 bg-gradient-to-r from-[#763CAC] to-[#320F85] rounded-full font-bold overflow-hidden transition-all hover:shadow-[0_0_30px_#763CAC66]"
            >
              <span className="relative z-10 flex items-center gap-2">
                {showAll
                  ? "Show Fewer"
                  : `View All ${filteredProjects.length} Projects`}
                {showAll ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <p className="text-gray-500 text-sm italic">
              Showing {displayedProjects.length} of {filteredProjects.length}{" "}
              projects
            </p>
          </motion.div>
        )}
      </div>

      {/* Modern Detail Modal */}
      <AnimatePresence>
        {isDetailModalOpen && detailProject && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10 pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailModalOpen(false)}
              className="fixed inset-0 bg-black/95 backdrop-blur-2xl pointer-events-auto"
            />

            <motion.div
              layoutId={`project-${detailProject.title}`}
              className="relative w-full max-w-4xl bg-[#0a0514] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.8)] max-h-full flex flex-col pointer-events-auto"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
            >
              {/* Sticky Close Button */}
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="absolute top-6 right-6 z-[60] p-4 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-xl border border-white/10 transition-all group"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Scrollable Content Container */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
                {/* Hero Image Header */}
                <div className="relative w-full aspect-[21/9] md:aspect-[2/1] bg-white/5">
                  <Image
                    src={detailProject.imageUrl || "/placeholder.svg"}
                    alt={detailProject.title}
                    fill
                    className="object-cover opacity-90"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0514] via-transparent to-transparent" />
                </div>

                {/* Content Layout */}
                <div className="p-8 md:p-16 space-y-12">
                  {/* Header Info */}
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="px-5 py-2 rounded-full bg-[#FF9D7A]/10 border border-[#FF9D7A]/20 text-[#FF9D7A] text-[10px] font-bold uppercase tracking-[0.2em]">
                        {detailProject.category}
                      </span>
                      <div className="h-4 w-[1px] bg-white/10" />
                      <span className="text-gray-500 text-xs font-medium uppercase tracking-widest">
                        Case Study
                      </span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold font-primary leading-[1.1] tracking-tight">
                      {detailProject.title}
                    </h2>

                    <div className="flex flex-wrap gap-6 pt-4">
                      {detailProject.livePreviewUrl && (
                        <button
                          onClick={() =>
                            window.open(detailProject.livePreviewUrl, "_blank")
                          }
                          className="flex items-center gap-3 px-8 py-4 bg-[#FF9D7A] text-white font-bold rounded-2xl hover:bg-[#FF9D7A]/90 transition-all shadow-[0_10px_30px_rgba(255,157,122,0.2)]"
                        >
                          Launch Project <ExternalLink className="w-5 h-5" />
                        </button>
                      )}
                      {detailProject.githubRepo && (
                        <button
                          onClick={() =>
                            window.open(detailProject.githubRepo, "_blank")
                          }
                          className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 font-bold rounded-2xl hover:bg-white/10 transition-all"
                        >
                          Source Code <Github className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="space-y-16 text-gray-400">
                    {/* Overview Row */}
                    <div className="space-y-6">
                      <h4 className="text-white font-bold uppercase tracking-widest text-sm">
                        Overview
                      </h4>
                      <p className="font-secondary leading-[1.8] text-lg max-w-4xl">
                        {detailProject.description}
                      </p>
                    </div>

                    {/* Tech Stack Row */}
                    <div className="space-y-6">
                      <h4 className="text-white font-bold uppercase tracking-widest text-sm">
                        Stack Architecture
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {detailProject.label.map((tech) => (
                          <span
                            key={tech}
                            className="px-5 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-gray-300 hover:bg-[#FF9D7A]/10 hover:border-[#FF9D7A]/30 transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
