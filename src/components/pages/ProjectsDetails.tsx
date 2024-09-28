"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ConfettiButton } from "../magicui/Confetti";
const projects = [
  // {
  //   id: 1,
  //   title: "Weather Forecast Application",
  //   description:
  //     "Our Weather Forecast Application provides users with comprehensive weather information, customizable appearance settings, and forecasts extending up to 3 days.",
  //   imageUrl: "/Weather-Dashboard.png",
  //   livePreviewUrl: "https://ian-weather-application.vercel.app",
  //   githubRepo: "https://github.com/Aiyern30/Weather-Application",
  // },
  {
    id: 1,
    title: "Music Application with Spotify",
    label: [
      "Spotify",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "React.js",
      "Vercel",
      "TypeScript",
      "Shadcn UI",
      "Lottie React",
      "Axios",
    ],
    description:
      "SpotWave allows you to search for and listen to Spotify songs with a preview and lyrics. You can also view the top tracks and artists in global rank and come with their all details such as bio, images, albums, and tracks.",
    imageUrl: "/SpotWave.png",
    livePreviewUrl: "https://spot-wave.vercel.app/",
    githubRepo: "https://github.com/Aiyern30/SpotWave",
  },
  {
    id: 2,
    title: "Expenses Tracker",
    label: [
      "Firebase",
      "NextAuth",
      "Next.js",
      "Tailwind CSS",
      "React.js",
      "Vercel",
      "TypeScript",
      "Shadcn UI",
      "Lucide react",
    ],
    description:
      "The Expenses Tracker is a robust application designed to help users efficiently manage their finances. Track your expenses daily, monthly, and yearly, and gain detailed insights into your spending habits. Key features include expense tracking, managing friend expenses, and effective group expense management during trips.",
    imageUrl: "/Split-Track.png",
    livePreviewUrl: "https://split-track.vercel.app/",
    githubRepo: "https://github.com/Aiyern30/SplitTrack",
  },
  {
    id: 3,
    title: "Reka Konsult Company Profile",
    label: [
      "Next.js",
      "Tailwind CSS",
      "React.js",
      "Vercel",
      "TypeScript",
      "Shadcn UI",
      "Heroicons",
      "EmailJS",
      "Leaflet",
      "Lucide react",
    ],
    description:
      "The Reka Konsult Company Profile is a comprehensive showcase of our company's vision, values, and services. This web application serves as an engaging platform to inform potential clients and partners about Reka Konsult's capabilities, including company background, services offered, and easy contact information.",
    imageUrl: "/Reka-Konsult.png",
    livePreviewUrl: "https://reka-konsult.vercel.app/",
    githubRepo: "https://github.com/Aiyern30/reka-konsult",
  },
  {
    id: 4,
    title: "Ethereum KL hackathon projects",
    label: [],
    description:
      "Description of yet another project with its features and highlights.",
    imageUrl: "/Weather-Statistics.png",
    livePreviewUrl: "https://ethkl.vercel.app/",
    githubRepo: "https://github.com/Aiyern30/ETHKL",
  },
];
import { Badge, Button, Skeleton } from "@/components/ui";
import { cn } from "@/lib/utils";

export default function ProjectsSection() {
  const [selectedImage, setSelectedImage] = useState<{
    id: string;
    src: string;
    alt: string;
  } | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const projectsToShow = 3;

  const handleImageClick = (id: string, src: string, alt: string) => {
    setSelectedImage({ id, src, alt });
  };

  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelectedImage(null);
  };

  const nextProjects = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex + 1) % Math.ceil(projects.length / projectsToShow)
    );
  };

  const prevProjects = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + Math.ceil(projects.length / projectsToShow)) %
        Math.ceil(projects.length / projectsToShow)
    );
  };

  const startIndex = currentIndex * projectsToShow;
  const currentProjects = projects.slice(
    startIndex,
    startIndex + projectsToShow
  );

  const totalItemsToShow = projectsToShow;
  const skeletonsToShow = totalItemsToShow - currentProjects.length;

  return (
    <>
      <section
        className="min-h-screen  text-white container mx-auto space-y-8 select-none mb-20 relative"
        id="projects"
      >
        <div className="text-5xl text-center relative mb-8">
          <div className="font-primary">Recent Projects</div>
          <div className="h-1 w-64 bg-white mx-auto text-center mt-4"></div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div
            className={`flex justify-center items-center w-full md:w-3/4 mx-auto mt-4 text-black h-16 ${
              projects.length <= 3 ? "hidden" : ""
            }`}
          >
            <button
              onClick={prevProjects}
              className="mx-4 w-32 h-12 rounded-xl bg-white hover:opacity-80"
            >
              Previous
            </button>
            <button
              onClick={nextProjects}
              className="mx-4 w-32 h-12 rounded-xl bg-white hover:opacity-80"
            >
              Next
            </button>
          </div>

          {/* Render Current Projects */}
          {currentProjects.map((project) => (
            <div
              key={project.id}
              className="w-full md:w-3/4 flex flex-col md:flex-row items-stretch space-y-6 md:space-y-0 m-4"
            >
              <motion.div
                className="w-full md:w-1/2 flex flex-col space-y-3 px-4 md:px-8 flex-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="text-lg font-semibold text-tertiary">
                  Featured project {project.id}
                </div>
                <div className="text-2xl font-bold">{project.title}</div>

                <div className="bg-secondary opacity-80 p-4 rounded-xl flex-1">
                  {project.description}
                  <div className="flex md:flex-row justify-start space-x-0 md:space-x-5 space-y-2 md:space-y-0 my-3">
                    <div className="cursor-pointer space-x-5">
                      <a
                        href={project.livePreviewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline cursor-pointer"
                      >
                        <ConfettiButton className="hover:underline">
                          Live Preview
                        </ConfettiButton>
                      </a>
                      <a
                        href={project.githubRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline cursor-pointer"
                      >
                        <ConfettiButton className="hover:underline">
                          View Code
                        </ConfettiButton>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="w-full md:w-1/2 flex items-center justify-center flex-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div
                  className="w-full h-full flex flex-col items-center justify-center bg-transparent border-0 cursor-pointer"
                  onClick={() =>
                    handleImageClick(
                      `image${project.id}`,
                      project.imageUrl,
                      project.title
                    )
                  }
                  layoutId={`image${project.id}`}
                >
                  <Image
                    src={project.imageUrl}
                    alt={`${project.title} Dashboard`}
                    width={400}
                    height={300}
                  />

                  {/* Centered buttons */}
                  <div className="flex flex-wrap gap-2 justify-center mt-2">
                    {project.label.map((label) => (
                      <Badge
                        key={label}
                        variant="secondary"
                        className="text-xs"
                      >
                        {label}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          ))}
          {[...Array(skeletonsToShow)].map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="w-full md:w-3/4 flex flex-col md:flex-row items-stretch space-y-6 md:space-y-0 m-4"
            >
              <motion.div
                className="w-full md:w-1/2 flex flex-col space-y-3 px-4 md:px-8 flex-1"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-8 w-64" />
                <div className="bg-purple-800 opacity-60 p-4 rounded-xl flex-1 ">
                  <Skeleton className="h-32 w-full" />
                  <div className="flex md:flex-row justify-start space-x-0 md:space-x-5 space-y-2 md:space-y-0 my-3">
                    <div className="space-x-5">
                      <Skeleton className="h-8 w-24 inline-block" />
                      <Skeleton className="h-8 w-24 inline-block" />
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="w-full md:w-1/2 flex items-center justify-center flex-1"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Skeleton className="w-[400px] h-[200px]" />
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-4 shadow-lg relative"
              layoutId={selectedImage.id}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1200}
                height={800}
              />
              <button
                className="px-3 py-1 rounded-full bg-primary text-white absolute top-0 right-0"
                onClick={handleCloseClick}
              >
                X
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
