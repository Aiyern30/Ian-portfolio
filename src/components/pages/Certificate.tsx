import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "../ui";
import { useMediaQuery } from "react-responsive";
import Gallery from "./Gallery";

const certificates = [
  {
    title: "Devmatch Hackathon Certificate",
    organization: "Asia Pacific University of Technology",
    date: "August 2024",
    imageUrl: "/Certs/Devmatch.jpg",
    link: "/Certs/Devmatch.pdf",
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    organization: "FreeCodeCamp",
    date: "27 September 2024",
    role: "Executive Director, FreeCodeCamp.org",
    name: "Quincy Larson",
    imageUrl: "/Certs/JavaScript.png",
    link: "https://www.freecodecamp.org/certification/Aiyern30/javascript-algorithms-and-data-structures-v8",
  },
  {
    title: "Machine Learning with Python",
    organization: "Asia Pacific University of Technology",
    date: "September 2024",
    role: "Academic Liaison Officer, APU IMechE Student Chapter",
    name: "Ts. Dr. Arun Seeralan Balakrishnan",
    imageUrl: "/Certs/Machine-Learning.jpg",
    link: "/Certs/Machine-Learning.pdf",
  },
  {
    title: "Python Powered AI Chatbot",
    organization: "Asia Pacific University of Technology",
    role: "Assistant Manager, Student Affairs",
    name: "HASHANNA ABDUL HALIM",
    date: "September 2024",
    imageUrl: "/Certs/Python ai e-cert.jpg",
    link: "/Certs/Python ai e-cert.pdf",
  },
  {
    title: "Responsive Web Design",
    organization: "freeCodeCamp",
    date: "January 2023",
    role: "Executive Director, FreeCodeCamp.org",
    name: "Quincy Larson",
    imageUrl: "/Certs/Responsive-Web-Design.png",
    link: "https://www.freecodecamp.org/certification/Aiyern30/responsive-web-design",
  },
  {
    title: "ThreeJS",
    organization: "Asia Pacific University of Technology",
    date: "September 2024",
    role: [
      "Vice President, APU Hackthletes",
      "President, APU Hackthletes",
      "Supervisor, APU Hackthletes",
    ],
    name: ["Cheong Yee Chian", "Benjamin Tan", "Dr. Vinesh Thiruchelvam"],
    imageUrl: "/Certs/ThreeJS.jpg",
    link: "/Certs/ThreeJS.pdf",
  },
  {
    title: "X2 Hackathon Certificate",
    organization: [
      "Asia Pacific University of Technology",
      "Payments Network Sdn. Bhd.",
    ],
    date: "September 2024",
    role: ["Group CEO Payments Network Malaysia"],
    name: ["FARHAN AHMAD"],

    imageUrl: "/Certs/X2 Hackathon Certificate.jpg",
    link: "/Certs/X2 Hackathon Certificate.pdf",
  },
];

const galleryImages = certificates.map(cert => ({
  title: cert.title,
  imageUrl: cert.imageUrl, 
}));

const Certificate = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <div className="flex flex-col items-center w-full py-10">
      <div className="text-5xl text-center relative mb-8">
        <div className="font-primary text-white">Certificates</div>
        <div className="h-1 w-32 bg-white mx-auto text-center mt-4"></div>
      </div>
      {isMobile ? <Gallery images={galleryImages}/> : <div className="flex flex-wrap justify-center space-x-4">
        {certificates.map((cert, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 m-4 max-w-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Image
              src={cert.imageUrl}
              alt={`${cert.title} Certificate`}
              width={400}
              height={200}
              className="w-full h-auto rounded-md mb-4"
              priority
            />
            <h2 className="text-xl font-semibold">{cert.title}</h2>
            <p className="text-gray-600">Issued by: {cert.organization}</p>
            <p className="text-gray-500">Date Earned: {cert.date}</p>
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline mt-2 inline-block"
            >
              <Button>View Certificate</Button>
            </a>
          </motion.div>
        ))}
      </div>}
      
    </div>
  );
};

export default Certificate;
