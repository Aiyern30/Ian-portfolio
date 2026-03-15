"use client";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ScrollTop } from "primereact/scrolltop";

import { Meteors } from "@/components/magicui/index";

import HeroSection from "@/components/pages/HeroSection";
import GlobalSection from "@/components/pages/GlobalSection";
import Certificate from "@/components/pages/Certificate";
import ProjectsSection from "@/components/pages/ProjectsDetails";
import ContactForm from "@/components/pages/ContactForm";
import SkillsDetails from "@/components/pages/SkillsDetails";
import Header from "@/components/Header";
import { Dock } from "primereact/dock";
import { SocialIcon } from "react-social-icons";

const items = [
  {
    label: "LinkedIn",
    icon: () => (
      <span>
        <SocialIcon network="linkedin" style={{ height: 48, width: 48 }} />
      </span>
    ),
    url: "https://www.linkedin.com/in/ian-gan-346547279/",
  },
  {
    label: "GitHub",
    icon: () => (
      <span>
        <SocialIcon network="github" style={{ height: 48, width: 48 }} />
      </span>
    ),
    url: "https://github.com/Aiyern30",
  },
  {
    label: "Discord",
    icon: () => (
      <span>
        <SocialIcon network="discord" style={{ height: 48, width: 48 }} />
      </span>
    ),
    url: "https://discord.gg/eEzxaxPR2d",
  },
  {
    label: "Instagram",
    icon: () => (
      <span>
        <SocialIcon network="instagram" style={{ height: 48, width: 48 }} />
      </span>
    ),
    url: "https://www.instagram.com/_aiyern_/",
  },
  {
    label: "WhatsApp",
    icon: () => (
      <span>
        <SocialIcon network="whatsapp" style={{ height: 48, width: 48 }} />
      </span>
    ),
    url: "https://wa.me/+60182133211?text='Type%20your%20message%20here%20%3A'",
  },
];

import { cn } from "@/lib/utils";
import { useDeviceType } from "@/lib/useDeviceTypes";
import PaymentDetails from "@/components/pages/PaymentDetails";
import { FloatingIcon } from "@/components/FloatingIcon";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState("home");
  const [isClient, setIsClient] = useState(false);
  const intersectionStates = useRef<Record<string, boolean>>({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const sectionOrder = [
      "home",
      "tools",
      "projects",
      "certs",
      "about",
      "support-me",
      "contact-us",
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -70% 0px", // 5% strip 25% from top
      threshold: 0,
    };

    const handleUpdate = () => {
      // Find the last section in order that is currently intersecting
      let latestActive = "home";
      for (const id of sectionOrder) {
        if (intersectionStates.current[id]) {
          latestActive = id;
        }
      }

      // Check for bottom of page to force contact active
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;

      if (isAtBottom) {
        setActiveSection("contact-us");
      } else {
        setActiveSection(latestActive);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        intersectionStates.current[entry.target.id.toLowerCase()] =
          entry.isIntersecting;
      });
      handleUpdate();
    }, observerOptions);

    sections.forEach((section) => {
      if (section.id) {
        observer.observe(section);
      }
    });

    // Manual check for initial state and bottom flickering
    const onScroll = () => {
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;
      if (isAtBottom) {
        setActiveSection("contact-us");
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const { isMobile } = useDeviceType();

  return (
    <div className="content relative">
      <Header activeSection={activeSection} />
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {/* <Meteors number={100} /> */}
      </div>
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Global Grid Overlay */}
      {/* <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      /> */}

      <section id="home">
        <HeroSection />
      </section>

      <section id="tools">
        <GlobalSection />
      </section>

      <section id="projects">
        <ProjectsSection />
      </section>

      <section id="certs">
        <Certificate />
      </section>

      <section id="about">
        <SkillsDetails />
      </section>

      <section id="support-me">
        <PaymentDetails />
      </section>

      <section id="contact-us">
        <ContactForm />
      </section>

      {/* {isClient && !isMobile && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <Dock model={items} position="bottom" className="bg-black/50" />
        </div>
      )} */}

      <ScrollTop
        className={cn(
          "rounded-full shadow-md flex items-center justify-center",
          "bg-white text-black hover:bg-white/90",
          "w-14 h-14",
        )}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M7.05 15.71 12 10.76l4.95 4.95 1.41-1.41L12 7.93l-6.36 6.36z" />
          </svg>
        }
      />

      <AnimatePresence>
        <motion.div
          className="fixed inset-0 pointer-events-none z-[-5]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
        >
          <FloatingIcon count={2} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
