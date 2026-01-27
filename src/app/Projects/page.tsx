"use client";

import { useCallback, useMemo, useState } from "react";
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
import { motion } from "framer-motion";
import { Search, X, Filter, Grid3x3, Workflow } from "lucide-react";
import { Input, Badge, Button } from "@/components/ui";

// Project data - Showing 2 example projects
const projects = [
  {
    id: "1",
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
      "YTL Concrete Hub is an AI-driven platform sponsored by YTL Shared Services Sdn Bhd as part of a Final Year Project. The system integrates intelligent chatbot interactions, smart product comparisons, AI-powered image processing, and predictive analytics.",
    imageUrl: "/YTLConcreteHub.png",
    livePreviewUrl: "https://ytlconcretehub.vercel.app/",
    githubRepo: "",
    year: "2024",
  },
  {
    id: "2",
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
    year: "2024",
  },
];

// Extract unique categories
const allCategories = Array.from(
  new Set(projects.map((project) => project.category)),
);

// Calculate initial node positions - optimized for 2 projects
const calculateNodePositions = (projectsData: typeof projects) => {
  const nodeWidth = 380;
  const horizontalSpacing = 200;

  return projectsData.map((project, index) => {
    return {
      id: project.id,
      type: "projectNode",
      position: {
        x: index * (nodeWidth + horizontalSpacing) + 100,
        y: 100,
      },
      data: {
        ...project,
      },
    };
  });
};

// Generate edges connecting similar projects
const generateEdges = (projectsData: typeof projects): Edge[] => {
  const edges: Edge[] = [];

  projectsData.forEach((project, i) => {
    // Connect to next project if same category
    const nextIndex = i + 1;
    if (nextIndex < projectsData.length) {
      const nextProject = projectsData[nextIndex];
      if (project.category === nextProject.category) {
        edges.push({
          id: `e${project.id}-${nextProject.id}`,
          source: project.id,
          target: nextProject.id,
          animated: true,
          style: { stroke: "#FF9D7A40", strokeWidth: 2 },
        });
      }
    }
  });

  return edges;
};

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"flow" | "grid">("flow");

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.label.some((tech) =>
          tech.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesCategory = selectedCategory
        ? project.category === selectedCategory
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

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

  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
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
        <Controls className="!bg-gray-900 !border-gray-700" />
        <MiniMap
          className="!bg-gray-900 !border-gray-700"
          nodeColor="#FF9D7A"
          maskColor="rgba(0, 0, 0, 0.6)"
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
                  Project{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9D7A] to-[#FFD166]">
                    Archive
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
                  className="pl-10 bg-gray-950 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#FF9D7A]"
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
                      ? "bg-[#FF9D7A] hover:bg-[#ff8a5f] text-white border-none"
                      : "bg-gray-950 border-gray-700 text-gray-300 hover:bg-gray-800"
                  }
                >
                  All
                </Button>
                {allCategories.map((category) => (
                  <Button
                    key={category}
                    size="sm"
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    onClick={() => setSelectedCategory(category)}
                    className={
                      selectedCategory === category
                        ? "bg-[#FF9D7A] hover:bg-[#ff8a5f] text-white border-none"
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
  );
}
