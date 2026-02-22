"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Panel,
} from "reactflow";
import type { Node, Edge, Connection } from "reactflow";
import "reactflow/dist/style.css";
import ProjectNode from "@/components/pages/ProjectNode";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import {
  Search,
  X,
  Filter,
  RotateCcw,
  Lock,
  Unlock,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from "lucide-react";
import { Input, Badge, Button } from "@/components/ui";
import { projects as projectsData } from "@/data/projects";
import { Meteors } from "@/components/magicui/index";
import { FloatingIcon } from "@/components/FloatingIcon";

// Type for enriched project with translations
type EnrichedProject = (typeof projectsData)[0] & {
  id: string;
  year: string;
  title: string;
  category: string;
  description: string;
};

// Add IDs and year to projects for the flow diagram
const getProjectsWithTranslations = (
  data: typeof projectsData,
  projectTranslations: Record<
    string,
    { title: string; category: string; description: string }
  >,
): EnrichedProject[] => {
  return data.map((project, index: number) => ({
    ...project,
    id: String(index + 1),
    year: "2024",
    title: projectTranslations[project.id]?.title || "Untitled",
    category: projectTranslations[project.id]?.category || "Project",
    description: projectTranslations[project.id]?.description || "",
  }));
};

// Calculate initial node positions - optimized for all projects
const calculateNodePositions = (projectsData: EnrichedProject[]) => {
  const nodeWidth = 450;
  const nodeHeight = 700; // Increased to accommodate full descriptions and all badges
  const horizontalSpacing = 250;
  const verticalSpacing = 250; // Increased vertical spacing
  const nodesPerRow = 3;

  return projectsData.map((project, index) => {
    const row = Math.floor(index / nodesPerRow);
    const col = index % nodesPerRow;

    return {
      id: project.id,
      type: "projectNode",
      position: {
        x: col * (nodeWidth + horizontalSpacing) + 100,
        y: row * (nodeHeight + verticalSpacing) + 100,
      },
      data: {
        ...project,
      },
    };
  });
};

// BackgroundAtmosphere Component
const BackgroundAtmosphere = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100 };
  const sx = useSpring(mouseX, springConfig);
  const sy = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 50);
      mouseY.set((clientY / innerHeight - 0.5) * 50);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const translateX = useTransform(sx, (v) => v);
  const translateY = useTransform(sy, (v) => v);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20">
      {/* Mesh Gradient / Spotlight */}
      <motion.div
        className="absolute -inset-[100px] opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle at center, #763CAC 0%, transparent 70%)",
          x: useTransform(sx, (v) => v * 1.5),
          y: useTransform(sy, (v) => v * 1.5),
        }}
      />

      {/* Deep Background Blobs */}
      <motion.div
        className="absolute top-1/4 -left-20 w-96 h-96 bg-[#320F85] rounded-full mix-blend-screen filter blur-[80px] opacity-20"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ x: translateX, y: translateY }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-20 w-[450px] h-[450px] bg-[#FF9D7A] rounded-full mix-blend-screen filter blur-[100px] opacity-10"
        animate={{
          x: [0, -40, 0],
          y: [0, 60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{
          x: useTransform(sx, (v) => -v),
          y: useTransform(sy, (v) => -v),
        }}
      />
    </div>
  );
};

// Generate edges connecting similar projects
const generateEdges = (projectsData: EnrichedProject[]): Edge[] => {
  return []; // No automatic edges
};

export default function ProjectsPage() {
  const t = useTranslations("projects");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"flow" | "grid">("flow");
  const [zoom, setZoom] = useState(0.6);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [isLocked, setIsLocked] = useState(false);

  // Get translated project data
  const projectsWithTranslations = useMemo(() => {
    const projectTranslations: Record<
      string,
      { title: string; category: string; description: string }
    > = {};
    projectsData.forEach((project) => {
      projectTranslations[project.id] = {
        title: t(`projectsData.${project.id}.title`),
        category: t(`projectsData.${project.id}.category`),
        description: t(`projectsData.${project.id}.description`),
      };
    });
    return getProjectsWithTranslations(projectsData, projectTranslations);
  }, [t]);

  const projects = projectsWithTranslations;

  // Get categories from enriched projects
  const allCategories = useMemo(
    (): string[] =>
      Array.from(new Set(projects.map((p: EnrichedProject) => p.category))),
    [projects],
  );

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project: EnrichedProject) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.label.some((tech: string) =>
          tech.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesCategory = selectedCategory
        ? project.category === selectedCategory
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, projects]);

  const initialNodes = useMemo(
    () => calculateNodePositions(filteredProjects),
    [filteredProjects],
  );

  const initialEdges = useMemo(
    () => generateEdges(filteredProjects),
    [filteredProjects],
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const nodeTypes = useMemo(() => ({ projectNode: ProjectNode }), []);

  // Update nodes when filters change
  useMemo(() => {
    setNodes(calculateNodePositions(filteredProjects));
    setEdges(generateEdges(filteredProjects));
  }, [filteredProjects, setNodes, setEdges]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "f" || e.key === "F") {
        // Fit view to all nodes
        reactFlowInstance?.fitView({ padding: 0.2, duration: 800 });
      }
      if (e.key === "l" || e.key === "L") {
        // Toggle lock/unlock nodes
        setIsLocked((prev) => !prev);
      }
      if (e.key === "Escape") {
        // Clear search and filters
        setSearchTerm("");
        setSelectedCategory(null);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [reactFlowInstance]);

  const handleResetView = () => {
    reactFlowInstance?.fitView({ padding: 0.2, duration: 800 });
    setSearchTerm("");
    setSelectedCategory(null);
  };

  const handleZoomIn = () => {
    reactFlowInstance?.zoomIn({ duration: 300 });
  };

  const handleZoomOut = () => {
    reactFlowInstance?.zoomOut({ duration: 300 });
  };

  const handleFitView = () => {
    reactFlowInstance?.fitView({ padding: 0.2, duration: 800 });
  };

  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Meteors Background Animation */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Meteors number={100} />
      </div>

      {/* Global Grid Overlay */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingIcon count={3} />
      </div>

      <BackgroundAtmosphere />

      {/* Main Content */}
      <div className="h-full w-full bg-transparent">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          nodesDraggable={!isLocked}
          onInit={setReactFlowInstance}
          onMove={(_, viewport) => setZoom(viewport.zoom)}
          fitView
          minZoom={0.1}
          maxZoom={1.5}
          defaultViewport={{ x: 0, y: 0, zoom: 0.6 }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="#374151"
          />
          {/* Removed default Controls - using custom panel instead */}
          <MiniMap
            className="!bg-gray-900 !border-gray-700 !rounded-lg"
            nodeColor="#763CAC"
            maskColor="rgba(0, 0, 0, 0.6)"
            zoomable
            pannable
          />

          {/* Header Panel */}
          <Panel position="top-left" className="m-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/95 backdrop-blur-lg border border-gray-800 rounded-xl p-6 shadow-2xl"
            >
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <h1 className="text-3xl font-bold text-white mb-1">
                    {t("archiveTitle")}{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#763CAC] to-[#B794F4]">
                      {t("archiveHighlight")}
                    </span>
                  </h1>
                  <p className="text-gray-400 text-sm">
                    Interactive portfolio explorer • {filteredProjects.length}{" "}
                    projects
                  </p>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search projects or technologies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-950 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#763CAC]"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant={selectedCategory === null ? "default" : "outline"}
                    onClick={() => setSelectedCategory(null)}
                    className={
                      selectedCategory === null
                        ? "bg-[#763CAC] hover:bg-[#9D50BB] text-white border-none"
                        : "bg-gray-950 border-gray-700 text-gray-300 hover:bg-gray-800"
                    }
                  >
                    All
                  </Button>
                  {allCategories.map((category: string) => (
                    <Button
                      key={category}
                      size="sm"
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      onClick={() => setSelectedCategory(category)}
                      className={
                        selectedCategory === category
                          ? "bg-[#763CAC] hover:bg-[#9D50BB] text-white border-none"
                          : "bg-gray-950 border-gray-700 text-gray-300 hover:bg-gray-800"
                      }
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          </Panel>

          {/* Zoom Indicator & Controls */}
          <Panel position="bottom-left" className="m-4 pb-24 space-y-2">
            {/* Zoom Controls */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-900/90 backdrop-blur rounded-lg border border-gray-800 overflow-hidden"
            >
              <button
                onClick={handleZoomIn}
                className="w-full px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-all border-b border-gray-800 flex items-center justify-center"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="w-full px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-all border-b border-gray-800 flex items-center justify-center"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleFitView}
                className="w-full px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-all border-b border-gray-800 flex items-center justify-center"
                title="Fit View (F)"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsLocked(!isLocked)}
                className={`w-full px-3 py-2 transition-all flex items-center justify-center ${
                  isLocked
                    ? "bg-[#763CAC] text-white hover:bg-[#9D50BB]"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
                title={isLocked ? "Unlock Nodes (L)" : "Lock Nodes (L)"}
              >
                {isLocked ? (
                  <Lock className="w-4 h-4" />
                ) : (
                  <Unlock className="w-4 h-4" />
                )}
              </button>
            </motion.div>

            {/* Zoom Indicator */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-gray-900/90 backdrop-blur px-3 py-2 rounded-lg border border-gray-800 text-sm text-gray-300 text-center"
            >
              {(zoom * 100).toFixed(0)}%
            </motion.div>

            {/* Reset Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              onClick={handleResetView}
              className="w-full flex items-center justify-center gap-2 bg-gray-900/90 backdrop-blur px-3 py-2 rounded-lg border border-gray-800 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-all"
              title="Reset view and clear filters (F)"
            >
              <RotateCcw className="w-4 h-4" />
            </motion.button>

            {/* Keyboard Shortcuts */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-gray-900/90 backdrop-blur px-3 py-2 rounded-lg border border-gray-800 text-xs text-gray-400 space-y-1"
            >
              <div className="font-semibold text-gray-300 mb-1">
                {t("shortcuts.title")}
              </div>
              <div>
                <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">F</kbd>{" "}
                {t("shortcuts.fitView")}
              </div>
              <div>
                <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">L</kbd>{" "}
                {isLocked ? t("shortcuts.unlock") : t("shortcuts.lock")}
              </div>
              <div>
                <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">ESC</kbd>{" "}
                {t("shortcuts.clear")}
              </div>
            </motion.div>
          </Panel>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <Panel position="top-center" className="mt-32">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-900/95 backdrop-blur-lg border border-gray-800 rounded-xl p-8 shadow-2xl text-center max-w-md"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t("emptyState.title")}
                </h3>
                <p className="text-gray-400 mb-4">
                  {t("emptyState.description")}
                </p>
                <button
                  onClick={handleResetView}
                  className="px-4 py-2 bg-[#763CAC] hover:bg-[#9D50BB] text-white rounded-lg transition-colors font-medium"
                >
                  {t("emptyState.clearButton")}
                </button>
              </motion.div>
            </Panel>
          )}

          {/* React Flow Attribution */}
          <Panel position="bottom-right" className="m-4">
            <a
              href="https://reactflow.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors bg-gray-900/80 backdrop-blur px-3 py-1.5 rounded-lg border border-gray-800"
            >
              React Flow attribution
            </a>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}
