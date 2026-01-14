"use client";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -10% 0px",
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    };

    const observer = new IntersectionObserver((entries) => {
      let maxRatio = 0;
      let activeEntry = null as IntersectionObserverEntry | null;

      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;

        if (entry.isIntersecting && entry.intersectionRatio >= maxRatio) {
          maxRatio = entry.intersectionRatio;
          activeEntry = entry;
        }
      });

      if (activeEntry && activeEntry.isIntersecting) {
        const target = activeEntry.target as HTMLElement;
        const sectionId = target.id.toLowerCase();

        if (sectionId) {
          setActiveSection(sectionId);
        }
      } else {
      }
    }, observerOptions);

    sections.forEach((section) => {
      if (section.id) {
        console.log(`🔍 Observing section: ${section.id}`);
        observer.observe(section);
      } else {
        console.warn("⚠️ Found section without ID:", section);
      }
    });

    return () => {
      sections.forEach((section) => {
        if (section.id) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  const { isMobile } = useDeviceType();

  return (
    <div className="content relative">
      <Header activeSection={activeSection} />
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Meteors number={100} />
      </div>
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Global Grid Overlay */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <section
        className="flex flex-col items-center justify-center px-4 mt-36 sm:mt-24 md:mt-8"
        id="home"
      >
        <HeroSection />
      </section>

      <section className="flex items-center justify-center" id="tools">
        <GlobalSection />
      </section>

      <section id="projects">
        <ProjectsSection />
      </section>

      <section
        className="flex flex-col items-center justify-center px-4"
        id="certs"
      >
        <Certificate />
      </section>

      <section className="px-4" id="about">
        <SkillsDetails />
      </section>

      <section className="flex items-center justify-center" id="support-me">
        <PaymentDetails />
      </section>

      <section className="flex items-center justify-center" id="contact-us">
        <ContactForm />
      </section>

      <ScrollTop
        threshold={100}
        className={cn("border-round bg-tertiary")}
        icon="pi pi-arrow-up text-base"
      />

      {isClient && !isMobile && (
        <Dock
          model={items.map((item) => ({
            label: item.label,
            icon: item.icon,
            command: () => window.open(item.url, "_blank"),
          }))}
          position="right"
          className="fixed"
        />
      )}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingIcon count={3} />
      </div>
    </div>
  );
}
