"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import {
  Rocket,
  Briefcase,
  Code,
  Globe,
  School,
  Users,
  ArrowDown,
  Sparkles,
  Star,
  GraduationCap,
} from "lucide-react";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import { Meteors } from "@/components/magicui/index";

const journeyData = [
  {
    year: "Secondary School (Form 4 - 5)",
    title: "The Spark of Interest",
    description:
      "My coding journey began in Form 4. Over the course of two years, I challenged myself to build a Car Rental System using PHP, marking my first successful venture into full-stack development and database logic.",
    icon: Code,
    color: "#60A5FA",
    image: null,
    side: "left",
  },
  {
    year: "Diploma in Software Engineering (APU)",
    title: "Laying the Foundations",
    description:
      "During my diploma, I mastered multiple languages through complex projects: a Hotel Booking Prototype in Python, a multi-role Furniture Management System in Java, and a remote Online Workforce Monitoring System in PHP.",
    icon: School,
    color: "#763CAC",
    image: null,
    side: "right",
  },
  {
    year: "First Major Win",
    title: "Google Cloud Hackathon",
    description:
      "Developed 'PythonGPT' during the Google Cloud Vertex AI Hackathon. I built a chatbot-driven platform using Flask designed to facilitate interactive Python learning, which spiked my interest in AI and Agentic development.",
    icon: Sparkles,
    color: "#FFD166",
    image: "/PythonAI.jpg",
    side: "left",
  },
  {
    year: "The Transition",
    title: "Mastering the Modern Stack",
    description:
      "Pivoted to React, Next.js, and TypeScript. I started freelancing and built projects like SplitTrack (Expense Management), and Web3 applications like SassyDispute (ETHKL) and VoteChain (Devmatch).",
    icon: Rocket,
    color: "#FF9D7A",
    image: "/Split-Track.png",
    side: "right",
  },
  {
    year: "Professional Internship #1",
    title: "Fintech at Balaena Quant",
    description:
      "Interned as a Front-End Developer for 4 months. I integrated TradingView API for real-time candlestick charts and optimized wallet security interfaces for a high-performance quantitative trading platform.",
    icon: Briefcase,
    color: "#320F85",
    image: "/SpotWave.png",
    side: "left",
  },
  {
    year: "Degree in Computer Science",
    title: "Academic & Tech Deepening",
    description:
      "Currently deepening my expertise while learning specialized languages like Rust, R, Matlab, and Flutter. I've also intensified my participation in Web3 hackathons globally.",
    icon: GraduationCap,
    color: "#10B981",
    image: "/ETHKL.png",
    side: "right",
  },
  {
    year: "Professional Internship #2",
    title: "Enterprise Solutions at YTL",
    description:
      "Interning at YTL Shared Services. I've developed the SMHE corporate landing page and an internal LHDN-integrated e-invoice system, while also building business intelligence reports via Power BI and SQL Server.",
    icon: Briefcase,
    color: "#EF4444",
    image: "/SMHE.png",
    side: "left",
  },
];

const TimelineItem = ({
  item,
  index,
}: {
  item: (typeof journeyData)[0];
  index: number;
}) => {
  const isLeft = item.side === "left";
  const Icon = item.icon;

  return (
    <div
      className={cn(
        "relative flex flex-col md:flex-row items-center justify-center mb-32 md:mb-48 w-full",
        isLeft ? "md:flex-row" : "md:flex-row-reverse",
      )}
    >
      {/* Central Node */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 md:top-1/2 md:-translate-y-1/2 z-20">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-12 h-12 rounded-2xl bg-[#1a0b2e] border-2 border-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)] relative group"
          style={{ borderColor: item.color }}
        >
          <div className="absolute inset-0 rounded-2xl bg-white/5 blur-md group-hover:bg-white/10 transition-colors" />
          <Icon
            className="w-6 h-6 relative z-10"
            style={{ color: item.color }}
          />
        </motion.div>
      </div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={cn(
          "w-full md:w-[45%] mt-16 md:mt-0 p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all group relative overflow-hidden shadow-2xl",
          isLeft ? "md:mr-[10%]" : "md:ml-[10%]",
        )}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-[100px]" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
            <span
              className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50 px-3 py-1 rounded-full border border-white/10"
              style={{ color: item.color, borderColor: `${item.color}33` }}
            >
              {item.year}
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold font-primary tracking-tight">
            {item.title}
          </h3>

          <p className="text-gray-400 font-secondary leading-relaxed md:text-lg">
            {item.description}
          </p>

          {item.image && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mt-6 border border-white/5 group-hover:border-white/20 transition-all">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0b2e]/60 to-transparent" />
            </div>
          )}
        </div>
      </motion.div>

      {/* Empty space for layout balance on desktop */}
      <div className="hidden md:block w-[45%]" />
    </div>
  );
};

export default function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="relative bg-[#0a0514] min-h-screen">
      <Header />

      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Meteors number={40} />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#763CAC]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-[#FF9D7A]/5 blur-[120px] rounded-full" />
      </div>

      <main className="content pt-40 md:pt-60 pb-32">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          {/* Header Section */}
          <div className="relative mb-32 md:mb-48 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
            >
              <Star className="w-4 h-4 text-[#FFD166]" />
              <span className="text-[10px] font-bold text-[#FF9D7A] uppercase tracking-[0.2em]">
                The Evolution
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-8xl font-bold font-primary mb-8"
            >
              My{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9D7A] to-[#FFD166]">
                Journey
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 font-secondary max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
            >
              From my first line of code in secondary school to building
              enterprise-scale platforms. Here is the story of my evolution as a
              software engineer.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-16 flex flex-col items-center gap-2 text-white/20"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold">
                Scroll to navigate
              </span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ArrowDown className="w-4 h-4" />
              </motion.div>
            </motion.div>
          </div>

          {/* Timeline Wrapper */}
          <div ref={containerRef} className="relative py-12">
            {/* The Vertical Line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#763CAC]/20 via-[#FF9D7A]/20 to-[#763CAC]/20 rounded-full" />

            {/* The Progress Line */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-0 w-[4px] bg-gradient-to-b from-[#FF9D7A] to-[#763CAC] rounded-full z-10 origin-top shadow-[0_0_15px_#FF9D7A]"
              style={{ scaleY }}
            />

            {/* Timeline Items */}
            <div className="relative">
              {journeyData.map((item, index) => (
                <TimelineItem key={index} item={item} index={index} />
              ))}
            </div>

            {/* Ending Sparkle */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="w-4 h-4 bg-white rounded-full blur-sm"
              />
            </div>
          </div>

          {/* Call to Action or Footer */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-32 md:mt-48 p-12 rounded-[3rem] bg-gradient-to-br from-[#763CAC]/20 to-[#FF9D7A]/10 border border-white/10 backdrop-blur-3xl relative overflow-hidden"
          >
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/5 blur-[80px] rounded-full" />
            <Sparkles className="w-12 h-12 text-[#FFD166] mx-auto mb-8" />
            <h2 className="text-3xl md:text-5xl font-bold font-primary mb-6">
              Want to see what's next?
            </h2>
            <p className="text-gray-400 mb-10 max-w-xl mx-auto font-secondary text-lg">
              Every challenge is an opportunity to learn. Let's build the future
              together.
            </p>
            <button
              onClick={() => (window.location.href = "/#contact-us")}
              className="px-10 py-5 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-transform shadow-xl"
            >
              Get In Touch
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
