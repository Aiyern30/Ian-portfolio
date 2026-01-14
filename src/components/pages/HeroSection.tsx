"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { useDeviceType } from "@/lib/useDeviceTypes";
import { SocialIcon } from "react-social-icons";
import {
  ChevronDown,
  Code2,
  Palette,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Components ---

const MagneticButton = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

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

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);
  const { isMobile } = useDeviceType();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("developer");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  const tabs = [
    { id: "developer", label: "Developer", icon: Code2 },
    { id: "designer", label: "Designer", icon: Palette },
    { id: "student", label: "Student", icon: GraduationCap },
  ];

  const tabContent = {
    developer: (
      <div className="space-y-4">
        <p className="text-base md:text-lg leading-relaxed text-gray-200">
          With <span className="text-[#FF9D7A] font-medium">5 years</span> of
          software development experience that began in high school, I've honed
          my skills in various technologies. I believe in the importance of both
          functionality and design.
        </p>
        <p className="text-base md:text-lg text-gray-300">
          I strive to create solutions that are as visually appealing as they
          are effective, focusing on user experience and performance.
        </p>
      </div>
    ),
    designer: (
      <div className="space-y-4">
        <p className="text-base md:text-lg leading-relaxed text-gray-200">
          I approach design with a keen eye for detail and a focus on{" "}
          <span className="text-[#FF9D7A] font-medium">
            user-centered experiences
          </span>
          . My design philosophy centers around creating intuitive interfaces
          that guide users naturally.
        </p>
        <p className="text-base md:text-lg text-gray-300">
          I believe that great design should be invisible, allowing users to
          accomplish their goals without friction or confusion.
        </p>
      </div>
    ),
    student: (
      <div className="space-y-4">
        <p className="text-base md:text-lg leading-relaxed text-gray-200">
          Completed a 2-year Diploma in Software Engineering and currently
          pursuing a{" "}
          <span className="text-[#FF9D7A] font-medium">
            Computer Science degree
          </span>{" "}
          to deepen my technical expertise.
        </p>
        <p className="text-base md:text-lg text-gray-300">
          I'm passionate about continuous learning and hands-on projects that
          combine both practical problem-solving and innovation.
        </p>
      </div>
    ),
  };

  const socialLinks = [
    {
      network: "linkedin",
      url: "https://www.linkedin.com/in/ian-gan-346547279/",
    },
    { network: "github", url: "https://github.com/Aiyern30" },
    { network: "discord", url: "https://discord.gg/eEzxaxPR2d" },
    { network: "instagram", url: "https://www.instagram.com/_aiyern_/" },
    {
      network: "whatsapp",
      url: "https://wa.me/+60182133211?text='Type%20your%20message%20here%20%3A'",
    },
  ];

  if (!isMounted) return <div className="min-h-screen bg-transparent" />;

  return (
    <div
      ref={containerRef}
      className="relative min-h-[calc(100vh-8rem)] flex items-center justify-center overflow-visible bg-transparent"
    >
      <BackgroundAtmosphere />

      {/* Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0,
            }}
            animate={{
              y: [null, "-20%"],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        className="container relative z-10 flex flex-col justify-center items-center px-6 pt-20 md:pt-0 min-h-screen font-secondary"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl gap-12 lg:gap-20">
          {/* Left Side: Profile & Message */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 w-full lg:w-1/2">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative"
            >
              <div className="relative w-[180px] h-[180px] md:w-[220px] md:h-[220px]">
                {/* Animated Rings */}
                <motion.div
                  className="absolute -inset-4 border-2 border-[#763CAC]/30 rounded-full"
                  animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="absolute -inset-8 border border-[#FF9D7A]/20 rounded-full"
                  animate={{ rotate: -360, scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Main Border */}
                <motion.div
                  className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-[#763CAC] via-[#320F85] to-[#FF9D7A]"
                  animate={{
                    borderRadius: ["2.5rem", "4rem", "2.5rem"],
                    rotate: [0, 90, 180, 270, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ padding: 3 }}
                />

                <div className="absolute inset-[3px] rounded-[2.5rem] overflow-hidden bg-black group transition-all duration-500">
                  <Image
                    src="/Me.png"
                    alt="Ian Gan Jian Hao"
                    fill
                    priority
                    quality={100}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 180px, 220px"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-[#320F85]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </motion.div>

            {/* Text Hierarchy */}
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-block px-4 py-1.5 rounded-full bg-[#763CAC]/20 text-[#FF9D7A] text-sm font-medium border border-[#763CAC]/30 backdrop-blur-md"
              >
                Available for New Projects
              </motion.span>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-xl md:text-2xl text-gray-400 font-light mb-1">
                  Hello, I'm
                </h2>
                <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-white font-primary">
                  Ian Gan{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9D7A] to-[#FFD166]">
                    Jian Hao
                  </span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg md:text-xl text-gray-300 max-w-lg leading-relaxed"
              >
                Crafting{" "}
                <span className="text-white font-medium">
                  exceptional digital experiences
                </span>{" "}
                where design meets flawless implementation.
              </motion.p>

              {/* Socials */}
              <motion.div
                className="flex space-x-4 justify-center lg:justify-start pt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {socialLinks.map((link) => (
                  <MagneticButton key={link.network}>
                    <SocialIcon
                      network={link.network}
                      style={{ width: 42, height: 42 }}
                      url={link.url}
                      target="_blank"
                      fgColor="#fff"
                      bgColor="transparent"
                      className="hover:scale-110 transition-transform border border-white/10 rounded-full bg-white/5 hover:bg-white/10"
                    />
                  </MagneticButton>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Right Side: Interactive Content Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full lg:w-1/2 max-w-xl"
          >
            <div className="relative group">
              {/* Card Glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#763CAC] to-[#FF9D7A] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />

              <div className="relative bg-[#1a0b2e]/60 border border-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl">
                {/* Tabs Header */}
                <div className="flex p-1 bg-white/5 rounded-xl mb-8 space-x-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                          "relative flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300",
                          activeTab === tab.id
                            ? "text-white"
                            : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                        )}
                      >
                        {activeTab === tab.id && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-gradient-to-r from-[#763CAC] to-[#320F85] rounded-lg shadow-lg"
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.6,
                            }}
                          />
                        )}
                        <Icon
                          className={cn(
                            "w-4 h-4 relative z-10",
                            activeTab === tab.id
                              ? "text-[#FF9D7A]"
                              : "text-gray-500"
                          )}
                        />
                        <span className="relative z-10 hidden sm:inline">
                          {tab.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="min-h-[220px]"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-[#FF9D7A]" />
                      <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        {activeTab === "developer"
                          ? "Full-stack Developer"
                          : activeTab === "designer"
                          ? "UI/UX Designer"
                          : "Computer Science Student"}
                      </h3>
                    </div>
                    {tabContent[activeTab as keyof typeof tabContent]}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-8 group flex items-center gap-2 text-sm font-semibold text-[#FF9D7A]"
                    >
                      Learn more about my journey
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-lg"
                      >
                        →
                      </motion.span>
                    </motion.button>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.5 }}
          onClick={scrollToContent}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-400">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 text-white" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
