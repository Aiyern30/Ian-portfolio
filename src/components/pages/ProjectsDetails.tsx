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
  Monitor,
  Smartphone,
  Laptop,
  Globe,
  Loader2,
  Workflow,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useDeviceType } from "@/lib/useDeviceTypes";
import { Badge, Button, Input } from "@/components/ui";
import { cn } from "@/lib/utils";
import { projects } from "@/data/projects";
import Link from "next/link";

// Extract all unique technologies and categories
const allTechnologies = Array.from(
  new Set(projects.flatMap((project) => project.label)),
);
const allCategories = Array.from(
  new Set(projects.map((project) => project.category)),
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
  const [modalTab, setModalTab] = useState<"details" | "preview">("details");
  const [previewDevice, setPreviewDevice] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");
  const [isPreviewLoading, setIsPreviewLoading] = useState(true);
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
    setModalTab("details");
    setIsDetailModalOpen(true);
    setIsPreviewLoading(true);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
    setSelectedTechs([]);
  };

  return (
    <div className="relative py-24 md:py-32 px-4 md:px-8 lg:px-12 text-white overflow-hidden">
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
            {/* Explore Interactive Flow Button */}
            <Link href="/Projects">
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-6 py-3 bg-gradient-to-r from-[#763CAC] to-[#FF9D7A] rounded-xl font-bold overflow-hidden transition-all hover:shadow-[0_0_30px_#763CAC66] flex items-center gap-2"
              >
                <Workflow className="w-5 h-5" />
                <span className="relative z-10">Explore Interactive Flow</span>
                <Sparkles className="w-4 h-4 animate-pulse" />
                <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </motion.button>
            </Link>

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
                  : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10",
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
                              selectedCategory === cat ? null : cat,
                            )
                          }
                          className={cn(
                            "px-4 py-2 rounded-lg text-sm transition-all border",
                            selectedCategory === cat
                              ? "bg-[#FF9D7A] border-[#FF9D7A] text-white shadow-[0_0_15px_rgba(255,157,122,0.3)]"
                              : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30",
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
                                prev.filter((t) => t !== tech),
                              );
                            } else {
                              setSelectedTechs((prev) => [...prev, tech]);
                            }
                          }}
                          className={cn(
                            "px-4 py-2 rounded-lg text-sm transition-all border",
                            selectedTechs.includes(tech)
                              ? "bg-[#763CAC] border-[#763CAC] text-white"
                              : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30",
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
                  isFeatured ? "md:col-span-2" : "",
                )}
              >
                {/* Card Container */}
                <div
                  className={cn(
                    "relative flex flex-col h-full bg-[#1a0b2e]/40 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-md hover:border-[#FF9D7A]/30 transition-all duration-500 shadow-2xl",
                    isFeatured ? "lg:flex-row min-h-[500px]" : "flex-col",
                  )}
                >
                  {/* Image Section */}
                  <div
                    className={cn(
                      "relative overflow-hidden bg-black/20",
                      isFeatured
                        ? "lg:w-1/2 aspect-[16/10] lg:aspect-auto"
                        : "aspect-[16/10]",
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a0b2e] via-transparent to-transparent z-10" />

                    {project.livePreviewUrl &&
                    project.livePreviewUrl.includes("vercel.app") ? (
                      <div className="w-full h-full relative group/preview">
                        <iframe
                          src={project.livePreviewUrl}
                          className="absolute inset-0 border-none pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                          style={{
                            width: "200%",
                            height: "200%",
                            transform: "scale(0.5)",
                            transformOrigin: "top left",
                          }}
                          loading="lazy"
                        />
                        {/* Live Indicator */}
                        <div className="absolute top-6 right-6 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">
                            Live Preview
                          </span>
                        </div>
                        {/* Shadow over top of iframe to match theme */}
                        <div className="absolute inset-0 z-[1] shadow-[inset_0_0_100px_rgba(0,0,0,0.4)] pointer-events-none" />
                      </div>
                    ) : (
                      <Image
                        src={project.imageUrl || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}

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
                      isFeatured ? "lg:p-12" : "",
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
                            : "text-2xl md:text-3xl",
                        )}
                      >
                        {project.title}
                      </h3>
                      <p
                        className={cn(
                          "text-gray-400 font-secondary leading-relaxed",
                          isFeatured ? "text-lg line-clamp-4" : "line-clamp-3",
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

            {/* Interactive Flow CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 p-8 bg-gradient-to-br from-[#763CAC]/10 to-[#FF9D7A]/10 border border-[#FF9D7A]/20 rounded-2xl max-w-2xl text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Workflow className="w-6 h-6 text-[#FF9D7A]" />
                <h3 className="text-2xl font-bold text-white">
                  Interactive Project Explorer
                </h3>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Explore all {projects.length} projects in an interactive flow
                diagram! Drag, zoom, and navigate through my portfolio with an
                immersive visual experience.
              </p>
              <Link href="/Projects">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-[#763CAC] to-[#FF9D7A] rounded-full font-bold overflow-hidden transition-all hover:shadow-[0_0_40px_#763CAC88] flex items-center gap-3 mx-auto">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                  <span className="relative z-10">
                    Launch Interactive Explorer
                  </span>
                  <ExternalLink className="w-5 h-5" />
                  <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                </button>
              </Link>
            </motion.div>
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
              className={cn(
                "relative w-full bg-[#0a0514] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.8)] max-h-full flex flex-col pointer-events-auto transition-all duration-500",
                modalTab === "preview" ? "max-w-7xl h-[90vh]" : "max-w-4xl",
              )}
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

              <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar flex flex-col">
                {/* Tab Switcher - Only show for Vercel projects */}
                {detailProject.livePreviewUrl &&
                  detailProject.livePreviewUrl.includes("vercel.app") && (
                    <div className="flex items-center justify-center p-4 border-b border-white/5 bg-black/20 backdrop-blur-md">
                      <div className="flex p-1 bg-white/5 rounded-2xl overflow-hidden border border-white/10">
                        <button
                          onClick={() => setModalTab("details")}
                          className={cn(
                            "px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2",
                            modalTab === "details"
                              ? "bg-[#FF9D7A] text-white shadow-lg"
                              : "text-gray-400 hover:text-white",
                          )}
                        >
                          Case Study
                        </button>
                        <button
                          onClick={() => setModalTab("preview")}
                          className={cn(
                            "px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2",
                            modalTab === "preview"
                              ? "bg-[#FF9D7A] text-white shadow-lg"
                              : "text-gray-400 hover:text-white",
                          )}
                        >
                          Live Preview{" "}
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        </button>
                      </div>
                    </div>
                  )}

                {modalTab === "details" ? (
                  <>
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
                                window.open(
                                  detailProject.livePreviewUrl,
                                  "_blank",
                                )
                              }
                              className="flex items-center gap-3 px-8 py-4 bg-[#FF9D7A] text-white font-bold rounded-2xl hover:bg-[#FF9D7A]/90 transition-all shadow-[0_10px_30px_rgba(255,157,122,0.2)]"
                            >
                              Launch Project{" "}
                              <ExternalLink className="w-5 h-5" />
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
                  </>
                ) : (
                  <div className="flex-1 flex flex-col bg-[#050505] min-h-[600px]">
                    {/* Preview Controls */}
                    <div className="flex items-center justify-between p-4 border-b border-white/5 bg-black/40">
                      <div className="flex items-center gap-4">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500/50" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                          <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] text-gray-500 font-mono">
                          <Globe className="w-3 h-3" />
                          <span className="truncate max-w-[200px]">
                            {detailProject.livePreviewUrl}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center p-1 bg-white/5 rounded-lg border border-white/10">
                        <button
                          onClick={() => setPreviewDevice("desktop")}
                          className={cn(
                            "p-2 rounded-md transition-all",
                            previewDevice === "desktop"
                              ? "bg-white/10 text-[#FF9D7A]"
                              : "text-gray-500 hover:text-gray-300",
                          )}
                        >
                          <Monitor className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setPreviewDevice("tablet")}
                          className={cn(
                            "p-2 rounded-md transition-all",
                            previewDevice === "tablet"
                              ? "bg-white/10 text-[#FF9D7A]"
                              : "text-gray-500 hover:text-gray-300",
                          )}
                        >
                          <Laptop className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setPreviewDevice("mobile")}
                          className={cn(
                            "p-2 rounded-md transition-all",
                            previewDevice === "mobile"
                              ? "bg-white/10 text-[#FF9D7A]"
                              : "text-gray-500 hover:text-gray-300",
                          )}
                        >
                          <Smartphone className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() =>
                          window.open(detailProject.livePreviewUrl, "_blank")
                        }
                        className="p-2 text-gray-500 hover:text-[#FF9D7A] transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Iframe Viewport */}
                    <div className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-hidden bg-[radial-gradient(circle_at_center,rgba(255,157,122,0.05)_0%,transparent_100%)]">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={cn(
                          "bg-white rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 relative",
                          previewDevice === "desktop" && "w-full h-full",
                          previewDevice === "tablet" && "w-[768px] h-full",
                          previewDevice === "mobile" && "w-[375px] h-[667px]",
                        )}
                      >
                        {isPreviewLoading && (
                          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black gap-4 text-center p-4">
                            <Loader2 className="w-8 h-8 text-[#FF9D7A] animate-spin" />
                            <div className="space-y-1">
                              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF9D7A]">
                                Spawning Live Environment...
                              </p>
                              <p className="text-[10px] text-gray-500 font-secondary lowercase italic">
                                Building preview for {detailProject.title}
                              </p>
                            </div>
                          </div>
                        )}
                        <iframe
                          src={detailProject.livePreviewUrl}
                          className="w-full h-full border-none bg-white"
                          onLoad={() => setIsPreviewLoading(false)}
                        />
                        {/* Interaction Blocker Overlay */}
                        <div className="absolute inset-0 z-20 cursor-default flex items-end justify-center pb-8 opacity-0 hover:opacity-100 transition-opacity bg-black/5 pointer-events-auto">
                          <div className="px-4 py-2 bg-black/80 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                            Preview Only Mode
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
