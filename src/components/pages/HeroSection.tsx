"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useDeviceType } from "@/lib/useDeviceTypes";
import { SocialIcon } from "react-social-icons";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);
  const { isMobile } = useDeviceType();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("developer");

  // Parallax effect for background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  const tabs = [
    { id: "developer", label: "Developer" },
    { id: "designer", label: "Designer" },
    { id: "student", label: "Student" },
  ];

  const tabContent = {
    developer: isMobile ? (
      <p className="text-base">
        Passionate about coding and problem-solving. Love creating functional
        and beautiful applications.
      </p>
    ) : (
      <>
        <p className="text-base md:text-lg mb-4">
          With 5 years of software development experience that began in high
          school, I've honed my skills in various technologies. I believe in the
          importance of both functionality and design.
        </p>
        <p className="text-base md:text-lg">
          I strive to create solutions that are as visually appealing as they
          are effective, focusing on user experience and performance.
        </p>
      </>
    ),
    designer: isMobile ? (
      <p className="text-base">
        Crafting visually stunning interfaces that enhance user experience and
        engagement.
      </p>
    ) : (
      <>
        <p className="text-base md:text-lg mb-4">
          I approach design with a keen eye for detail and a focus on
          user-centered experiences. My design philosophy centers around
          creating intuitive interfaces that guide users naturally through
          digital experiences.
        </p>
        <p className="text-base md:text-lg">
          I believe that great design should be invisible, allowing users to
          accomplish their goals without friction or confusion.
        </p>
      </>
    ),
    student: isMobile ? (
      <p className="text-base">
        Pursuing Computer Science at Asia Pacific University, constantly
        learning and growing.
      </p>
    ) : (
      <>
        <p className="text-base md:text-lg mb-4">
          Currently pursuing a degree in Computer Science at Asia Pacific
          University, Malaysia, where I'm expanding my knowledge in algorithms,
          data structures, and software engineering principles.
        </p>
        <p className="text-base md:text-lg">
          I am also keen to learn about Web3 and actively participate in
          numerous hackathons and workshops to enhance my skills and knowledge
          in this exciting field.
        </p>
      </>
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

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Animated background gradient */}
      <motion.div className="" style={{ y: backgroundY }} />

      {/* Animated particles/stars effect */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * 20 - 10 + "%"],
              opacity: [0.3, 0.8, 0.3],
              scale: [null, Math.random() + 0.5],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <motion.div
        className="container relative z-10 flex flex-col justify-center items-center min-h-screen"
        style={{ opacity }}
      >
        <div className="flex flex-col md:flex-row items-center md:space-x-10 w-full">
          {/* Profile image with animated border */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mb-8 md:mb-0"
          >
            <div className="relative w-[200px] h-[200px] md:w-[250px] md:h-[250px]">
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#763CAC] to-[#320F85]"
                animate={{
                  rotate: 360,
                  background: [
                    "linear-gradient(to right, #763CAC, #320F85)",
                    "linear-gradient(to right, #320F85, #763CAC)",
                    "linear-gradient(to right, #763CAC, #320F85)",
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                style={{ padding: 4 }}
              />
              <div className="absolute inset-[4px] rounded-full overflow-hidden">
                <Image
                  src="/Me.png"
                  alt="Ian Gan Jian Hao"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Text content with staggered animations */}
          <motion.div
            className="flex flex-col space-y-4 justify-center text-white font-primary text-center md:text-left max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              className="text-xl md:text-3xl mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Hello! I Am{" "}
              <span className="text-[#FF9D7A] font-semibold">
                Ian Gan Jian Hao
              </span>
            </motion.div>

            <motion.div
              className="text-sm md:text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              A Designer who
            </motion.div>

            <motion.div
              className="text-2xl md:text-5xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              judges a book by its{" "}
              <motion.span
                className="text-[#FF9D7A]"
                animate={{
                  color: ["#FF9D7A", "#FFD166", "#FF9D7A"],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                cover...
              </motion.span>
            </motion.div>

            <motion.div
              className="text-sm md:text-base italic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Because if the cover doesn't impress you, what will?
            </motion.div>

            {/* Social media icons for desktop */}
            {!isMobile && (
              <motion.div
                className="flex space-x-3 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                {socialLinks.map((link, index) => (
                  <motion.div
                    key={link.network}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                  >
                    <SocialIcon
                      network={link.network}
                      style={{ width: 36, height: 36 }}
                      onClick={() => window.open(link.url, "_blank")}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Interactive tabs section */}
        <motion.div
          className="w-full mt-12 md:mt-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex justify-center md:justify-start mb-6">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-2 mx-1 rounded-full text-white font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-[#FF9D7A] shadow-lg"
                    : "bg-[#4A1D9A]/50 hover:bg-[#4A1D9A]"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          <motion.div
            className="bg-[#320F85]/40 backdrop-blur-sm p-6 rounded-xl shadow-xl text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#FF9D7A]">
                  I'm a{" "}
                  {activeTab === "developer"
                    ? "Full-stack Developer"
                    : activeTab === "designer"
                    ? "UI/UX Designer"
                    : "Computer Science Student"}
                </h3>
                {tabContent[activeTab as keyof typeof tabContent]}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Social media icons for mobile */}
        {isMobile && (
          <motion.div
            className="flex flex-wrap justify-center space-x-2 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            {socialLinks.map((link) => (
              <SocialIcon
                key={link.network}
                network={link.network}
                style={{ width: 36, height: 36 }}
                onClick={() => window.open(link.url, "_blank")}
                className="cursor-pointer"
              />
            ))}
          </motion.div>
        )}

        {/* Scroll down indicator */}
        <motion.div
          className="absolute bottom-8 cursor-pointer"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
          onClick={scrollToContent}
        >
          <ChevronDown className="w-8 h-8 text-white opacity-80" />
        </motion.div>
      </motion.div>
    </div>
  );
}
