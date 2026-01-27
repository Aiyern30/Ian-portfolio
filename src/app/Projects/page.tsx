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

// Project data
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
  {
    id: "3",
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
      "Recently, I joined the YTL Cement IT department, focusing on developing an e-invoice system. The system manages driver e-invoices and supports role-based access for submitting documents to LHDN.",
    imageUrl: "/Dos-portal.png",
    livePreviewUrl: "https://dos.uat4ytlcement.com/",
    githubRepo: null,
    year: "2024",
  },
  {
    id: "4",
    title: "Sino Mobile and Heavy Equipment (SMHE)",
    label: [
      "NextJS",
      "Tailwind CSS",
      "React",
      "TypeScript",
      "Google Maps API",
      "Framer Motion",
      "Strapi",
    ],
    category: "Website",
    description:
      "Developed the landing page for the Sino Mobile and Heavy Equipment (SMHE) website, focusing on showcasing trucks for sale. Key features include a Media Center, About Us section, and detailed truck pages.",
    imageUrl: "/SMHE.png",
    livePreviewUrl: "https://smhe.my",
    githubRepo: null,
    year: "2024",
  },
  {
    id: "5",
    title: "ScorePanda (Niu Niu & Number Solver)",
    label: [
      "NextJS",
      "React",
      "Framer Motion",
      "Vercel",
      "TypeScript",
      "Shadcn UI",
    ],
    category: "Web Application",
    description:
      "ScorePanda is a specialized gaming utility platform featuring a Niu Niu hand verifier and a Number Solver. The Niu Niu tool is designed to help players accurately identify their best possible scores.",
    imageUrl: "/ScorePanda.png",
    livePreviewUrl: "https://score-panda.vercel.app/",
    githubRepo: "https://github.com/Aiyern30/ScorePanda",
    year: "2024",
  },
  {
    id: "6",
    title: "Nutrition Tracker (Eat Smart AI)",
    label: [
      "Gemini 1.5 Pro",
      "Baidu Ernie 5.0",
      "NextJS",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "Framer Motion",
      "Lucide React",
      "Recharts",
      "Supabase",
      "OpenAI",
    ],
    category: "Web Application",
    description:
      "Eat Smart AI is a sophisticated nutrition management platform. It leverages AI Image Recognition to detect food and macros from meal photos, natural language processing for text-based meal logging.",
    imageUrl: "/EatSmartAI.png",
    livePreviewUrl: "https://eat-smart-ai.vercel.app",
    githubRepo: "https://github.com/Aiyern30/nutrition-tracker",
    year: "2024",
  },
  {
    id: "7",
    title: "RY Electric Works (Company Profile)",
    label: [
      "NextJS",
      "Cloudflare Workers",
      "React",
      "Tailwind CSS",
      "Multi-language",
      "Lucide React",
    ],
    category: "Website",
    description:
      "A professional, multilingual company profile for RY Electric Works. The platform showcases specialized electrical services including Internal Electrical Wiring, Telekom Works, and Street lighting.",
    imageUrl: "/RY-electrics.png",
    livePreviewUrl: "https://ry-electric-works.ryelectric828.workers.dev/",
    githubRepo: "",
    year: "2023",
  },
  {
    id: "8",
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
      "Gamer Token Hub is a decentralized NFT marketplace built on the Sepolia test network. It allows users to create and manage NFT collections, mint NFTs with custom metadata, list and purchase NFTs.",
    imageUrl: "/GamerTokenHub.png",
    livePreviewUrl: "https://gamertokenhub.vercel.app/",
    githubRepo: "https://github.com/Aiyern30/blockchain-fe",
    year: "2023",
  },
  {
    id: "9",
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
      "The Reka Konsult Company Profile is a comprehensive showcase of our company's vision, values, and services. This web application serves as an engaging platform to inform potential clients.",
    imageUrl: "/Reka-Konsult.png",
    livePreviewUrl: "https://reka-konsult.vercel.app/",
    githubRepo: "https://github.com/Aiyern30/reka-konsult",
    year: "2023",
  },
  {
    id: "10",
    title: "Children's Respite Home KL",
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
      "A freelance project developed for a Malaysia-based community respite care centre for children with special needs. The website showcases the organization's mission, services, and facilities.",
    imageUrl: "/ChildrenRespiteHomeKL.png",
    livePreviewUrl: "https://childrenrespitehomekl.com/",
    githubRepo: "",
    year: "2024",
  },
  {
    id: "11",
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
      "LiveSportsNow is a comprehensive sports platform that allows users to view real-time scores, standings, team details, and stats across multiple sports, including NBA, NFL, Soccer, and more.",
    imageUrl: "/LiveSportsNow.png",
    livePreviewUrl: "https://livesportsnow.vercel.app/NBA",
    githubRepo: "https://github.com/Aiyern30/LiveSportsNow.git",
    year: "2024",
  },
  {
    id: "12",
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
      "The Expenses Tracker is a robust application designed to help users efficiently manage their finances. Track your expenses daily, monthly, and yearly, and gain detailed insights into your spending habits.",
    imageUrl: "/Split-Track.png",
    livePreviewUrl: "https://split-track.vercel.app/",
    githubRepo: "https://github.com/Aiyern30/SplitTrack",
    year: "2023",
  },
  {
    id: "13",
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
      "SassyDispute is a platform that allows Web2/Web3 e-commerce websites to share and bridge their dispute cases via IPFS, facilitating decentralized conversations and resolutions.",
    imageUrl: "/ETHKL.png",
    livePreviewUrl: "https://sassy-dispute.vercel.app/",
    githubRepo: "https://github.com/FramedStone/SassyDispute",
    year: "2024",
  },
  {
    id: "14",
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
      "Poll Generator is a Canva-integrated platform that simplifies poll and survey creation while providing real-time data visualization. Users can design visually appealing surveys.",
    imageUrl: "/Canva.jpg",
    livePreviewUrl: "https://devpost.com/software/canva-dx620n",
    githubRepo: "https://github.com/Aiyern30/Canva-Hackathon",
    year: "2024",
  },
  {
    id: "15",
    title: "Google Cloud Vertex AI Agent Builder Hackathon",
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
      "PythonGPT is a dynamic website designed to teach beginners how to code in Python. It offers Python documentation, Python code implementation examples, Python exercises, AI Chatbot Assistance.",
    imageUrl: "/PythonAI.jpg",
    livePreviewUrl: "https://devpost.com/software/pythongpt",
    githubRepo: "https://github.com/AcruxN/vertex_PythonGPT/",
    year: "2024",
  },
  {
    id: "16",
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
      "Decentralized voting technology reduces costs by eliminating the need for physical polling places and allows remote voting, boosting democratic participation.",
    imageUrl: "/Devmatch.png",
    livePreviewUrl:
      "https://devfolio.co/projects/decentralized-voting-system-peyouth-aa44",
    githubRepo:
      "https://github.com/Aiyern30/Voting-System-DevMatch-Hackathon-",
    year: "2023",
  },
];

// Extract unique categories
const allCategories = Array.from(
  new Set(projects.map((project) => project.category))
);

// Calculate initial node positions in a scattered grid
const calculateNodePositions = (projectsData: typeof projects) => {
  const columns = 4;
  const nodeWidth = 380;
  const nodeHeight = 500;
  const horizontalSpacing = 100;
  const verticalSpacing = 150;

  return projectsData.map((project, index) => {
    const row = Math.floor(index / columns);
    const col = index % columns;
    
    // Add some randomness for organic feel
    const randomX = (Math.random() - 0.5) * 50;
    const randomY = (Math.random() - 0.5) * 50;

    return {
      id: project.id,
      type: "projectNode",
      position: {
        x: col * (nodeWidth + horizontalSpacing) + randomX,
        y: row * (nodeHeight + verticalSpacing) + randomY,
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
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory = selectedCategory
        ? project.category === selectedCategory
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const initialNodes = useMemo(
    () => calculateNodePositions(filteredProjects),
    [filteredProjects]
  );

  const initialEdges = useMemo(
    () => generateEdges(filteredProjects),
    [filteredProjects]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
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
