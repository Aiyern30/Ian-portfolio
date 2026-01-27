"use client";

import { memo } from "react";
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui";

interface ProjectNodeData {
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  livePreviewUrl?: string;
  githubRepo?: string;
  label: string[];
  year?: string;
}

function ProjectNode({ data, selected }: NodeProps<ProjectNodeData>) {
  return (
    <motion.div
      className={`bg-gradient-to-br from-gray-900 to-gray-950 border-2 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ${
        selected
          ? "border-[#FF9D7A] shadow-[#FF9D7A]/20"
          : "border-gray-800 hover:border-gray-700"
      }`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      style={{ width: 350, minHeight: 420 }}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-[#FF9D7A] border-2 border-gray-900"
      />

      {/* Project Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-950">
        <Image
          src={data.imageUrl}
          alt={data.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          {data.year && (
            <Badge className="bg-black/70 text-white border-none">
              {data.year}
            </Badge>
          )}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-5 space-y-3">
        {/* Category Badge */}
        <Badge className="bg-[#FF9D7A]/10 text-[#FF9D7A] border-[#FF9D7A]/30">
          {data.category}
        </Badge>

        {/* Title */}
        <h3 className="text-xl font-bold text-white line-clamp-2 leading-tight">
          {data.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">
          {data.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 max-h-16 overflow-hidden">
          {data.label.slice(0, 4).map((tech, idx) => (
            <Badge
              key={idx}
              variant="outline"
              className="text-xs border-gray-700 text-gray-300 bg-gray-900/50"
            >
              {tech}
            </Badge>
          ))}
          {data.label.length > 4 && (
            <Badge
              variant="outline"
              className="text-xs border-gray-700 text-gray-400 bg-gray-900/50"
            >
              +{data.label.length - 4}
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {data.livePreviewUrl && (
            <a
              href={data.livePreviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#FF9D7A] hover:bg-[#ff8a5f] text-white rounded-lg transition-colors duration-200 text-sm font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
          {data.githubRepo && (
            <a
              href={data.githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-[#FFD166] border-2 border-gray-900"
      />
    </motion.div>
  );
}

export default memo(ProjectNode);
