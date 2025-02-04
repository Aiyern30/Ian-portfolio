"use client";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

import { AnimatePresence, motion } from "framer-motion";
import { Image } from "primereact/image";

import { useEffect, useState } from "react";
import { ConfettiButton } from "../magicui/Confetti";
const projects = [
  {
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
    ],
    description:
      "SpotWave allows you to search for and listen to Spotify songs with a preview and lyrics. You can also view the top tracks and artists in global rank and come with their all details such as bio, images, albums, and tracks.",
    imageUrl: "/SpotWave.png",
    livePreviewUrl: "https://spot-wave.vercel.app/",
    githubRepo: "https://github.com/Aiyern30/SpotWave",
  },
  {
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
    description:
      "Recently, I joined the YTL Cement IT department, focusing on developing an e-invoice system. The system manages driver e-invoices and supports role-based access for submitting documents to LHDN. I worked on key features such as income and expenses tracking, statement of accounts, and invoice reporting using Microsoft Power BI and Report Builder.",
    imageUrl: "/Dos-portal.png",
    livePreviewUrl: null,
    githubRepo: null,
  },

  {
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
    description:
      "Developed the landing page for the Sino Mobile and Heavy Equipment (SMHE) website, focusing on showcasing trucks for sale. Key features include a Media Center, About Us section, detailed truck pages with overview and specifications, and options for users to contact sales or download brochures. Integrated Google Maps to display workshop and factory locations for easy navigation.",
    imageUrl: "/SMHE.png",
    livePreviewUrl: "https://smhe.uat4ytlcement.com/",
    githubRepo: null,
  },

  // {
  //   title: "Expenses Tracker (SplitTrack)",
  //   label: [
  //     "Firebase",
  //     "NextAuth",
  //     "NextJS",
  //     "Tailwind CSS",
  //     "React",
  //     "Vercel",
  //     "TypeScript",
  //     "Shadcn UI",
  //     "Lucide react",
  //   ],
  //   description:
  //     "The Expenses Tracker is a robust application designed to help users efficiently manage their finances. Track your expenses daily, monthly, and yearly, and gain detailed insights into your spending habits. Key features include expense tracking, managing friend expenses, and effective group expense management during trips.",
  //   imageUrl: "/Split-Track.png",
  //   livePreviewUrl: "https://split-track.vercel.app/",
  //   githubRepo: "https://github.com/Aiyern30/SplitTrack",
  // },
  {
    title: "Pet Care",
    label: [
      "HTML",
      "CSS",
      "JavaScripts",
      "PHP",
      "MySQL",
      "MyPhpAdmin",
      "ChartJS",
    ],
    description:
      "This website provides a comprehensive platform for pet care services. Customers can easily book appointments for their pets, including surgeries and other medical needs. The platform also features a community blog where users can chat, share posts, and read knowledge articles about pet care. For business owners and staff, the website offers robust tools to manage operations effectively, including full CRUD functionality for managing appointments, customer data, and services. Additionally, it includes features to view receipts and generate detailed payment reports with visually appealing charts, streamlining administrative tasks.",
    // imageUrl: "/Split-Track.png",
    githubRepo: "https://github.com/Aiyern30/Pet-Care",
  },
  {
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
    ],
    description:
      "The Reka Konsult Company Profile is a comprehensive showcase of our company's vision, values, and services. This web application serves as an engaging platform to inform potential clients and partners about Reka Konsult's capabilities, including company background, services offered, and easy contact information.",
    imageUrl: "/Reka-Konsult.png",
    livePreviewUrl: "https://reka-konsult.vercel.app/",
    githubRepo: "https://github.com/Aiyern30/reka-konsult",
  },
  {
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
    description:
      "SassyDispute is a platform that allows Web2/Web3 e-commerce websites to share and bridge their dispute cases via IPFS, facilitating decentralized conversations and resolutions. User can comment on dispute cases, search and filter dispute cases and dispute providers can use our ready-bridge smart contract to bridge their Web3 E-commerce platform into SassyDispute",
    imageUrl: "/ETHKL.png",
    livePreviewUrl: "https://sassy-dispute.vercel.app/",
    githubRepo: "https://github.com/FramedStone/SassyDispute",
  },
  {
    title: "Canva Hackathon (Poll Generator)",
    label: [
      "React, NextJS",
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
    description:
      "Poll Generator is a Canva-integrated platform that simplifies poll and survey creation while providing real-time data visualization. Users can design visually appealing surveys, distribute them via QR codes or a dedicated website, and instantly see response trends. Multiple polls can be included in a single survey for comprehensive data collection.",
    imageUrl: "/Canva.jpg",
    livePreviewUrl: "https://devpost.com/software/canva-dx620n",

    githubRepo: "https://github.com/Aiyern30/Canva-Hackathon",
  },
  {
    title: "Google Cloud Vertex AI Agent Builder Hackathon (PythonGPT)",
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
    description:
      "PythonGPT is a dynamic website designed to teach beginners how to code in Python. It offers Python documentation, Python code implementation examples, Python exercises, AI Chatbot Assistance",
    imageUrl: "/PythonAI.jpg",
    livePreviewUrl: "https://devpost.com/software/pythongpt",
    githubRepo: "https://github.com/AcruxN/vertex_PythonGPT/",
  },
  {
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
    description:
      "Decentralized voting technology reduces costs by eliminating the need for physical polling places and allows remote voting, boosting democratic participation. It can also be used in organizations, enabling employees to vote on decisions and generate reputation reports based on accuracy and activity. These reports can inform hiring decisions for roles requiring strong decision-making skills, such as HR and recruiting audits.",
    imageUrl: "/Devmatch.png",
    livePreviewUrl:
      "https://devfolio.co/projects/decentralized-voting-system-peyouth-aa44",
    githubRepo: "https://github.com/Aiyern30/Voting-System-DevMatch-Hackathon-",
  },
];
import { Badge, Skeleton } from "@/components/ui";
import { MarqueCard } from "./MarqueCard";

export default function ProjectsSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // You can adjust the breakpoint (768px is typical for mobile)
    };

    // Run on mount and on window resize
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const icon = <i className="pi pi-search"></i>;

  const [currentIndex, setCurrentIndex] = useState(0);
  const projectsToShow = isMobile ? 1 : 3;

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
        className="  text-white container mx-auto select-none mb-20 relative"
        id="projects"
      >
        <FaChevronLeft
          onClick={prevProjects}
          className="w-32 h-12  absolute top-1/2 -left-10 sm:left-0 cursor-pointer"
        />
        <FaChevronRight
          onClick={nextProjects}
          className="w-32 h-12  absolute top-1/2 -right-10 sm:right-0 cursor-pointer"
        />
        <div className="text-5xl text-center relative mb-8">
          <div className="font-primary">Recent Projects</div>
          <div className="h-1 w-64 bg-white mx-auto text-center mt-4"></div>
        </div>
        
          <div className="flex flex-col items-center justify-center">
            {currentProjects.map((project, idx) => (
              <div
                key={idx}
                className="w-full md:w-3/4 flex flex-col md:flex-row items-stretch space-y-6 md:space-y-0 m-4"
              >
                <motion.div
                  className="w-full md:w-1/2 flex flex-col space-y-3 px-4 md:px-8 flex-1"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {/* Adjusted index to reflect page-relative numbering */}
                  <div className="text-lg font-semibold text-tertiary text-center sm:text-left">
                    Featured project {startIndex + idx + 1}
                  </div>
                  <div className="text-2xl font-bold text-center sm:text-left">{project.title}</div>

                  <div className="bg-secondary opacity-80 p-4 flex-1">
                    <div className="sm:text-justify text-sm sm:text-base">{project.description}</div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                      {project.livePreviewUrl && (
                        <ConfettiButton
                          className="hover:underline w-full"
                          onClick={() =>
                            window.open(
                              project.livePreviewUrl,
                              "_blank",
                              "noopener noreferrer"
                            )
                          }
                        >
                          Live Preview
                        </ConfettiButton>
                      )}
                      {project.githubRepo && (
                        <ConfettiButton
                          className="hover:underline w-full"
                          onClick={() =>
                            window.open(
                              project.githubRepo,
                              "_blank",
                              "noopener noreferrer"
                            )
                          }
                        >
                          View Code
                        </ConfettiButton>
                      )}
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
                    className="w-full h-64 flex flex-col items-center justify-center bg-transparent border-0 cursor-pointer"
                    layoutId={`image${idx}`}
                  >
                    <Image
                      src={project.imageUrl}
                      alt={`${project.title} Dashboard`}
                      width="400"
                      height="300"
                      indicatorIcon={icon}
                      preview
                      className="bg-gray-400"
                    />

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
                  <div className="bg-purple-800 opacity-60 p-4 flex-1 ">
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
    </>
  );
}
