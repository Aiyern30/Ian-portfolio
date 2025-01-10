"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui";
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
    imageUrl: "/Certs/JavaScript.png",
    link: "https://www.freecodecamp.org/certification/Aiyern30/javascript-algorithms-and-data-structures-v8",
  },
  {
    title: "Machine Learning with Python",
    organization: "Asia Pacific University of Technology",
    date: "September 2024",
    imageUrl: "/Certs/Machine-Learning.jpg",
    link: "/Certs/Machine-Learning.pdf",
  },
  {
    title: "Python Powered AI Chatbot",
    organization: "Asia Pacific University of Technology",
    date: "September 2024",
    imageUrl: "/Certs/Python ai e-cert.jpg",
    link: "/Certs/Python ai e-cert.pdf",
  },
  {
    title: "Responsive Web Design",
    organization: "freeCodeCamp",
    date: "January 2023",
    imageUrl: "/Certs/Responsive-Web-Design.png",
    link: "https://www.freecodecamp.org/certification/Aiyern30/responsive-web-design",
  },
  {
    title: "ThreeJS",
    organization: "Asia Pacific University of Technology",
    date: "September 2024",
    imageUrl: "/Certs/ThreeJS.jpg",
    link: "/Certs/ThreeJS.pdf",
  },
  {
    title: "X2 Hackathon Certificate",
    organization: "Asia Pacific University of Technology",
    date: "September 2024",
    imageUrl: "/Certs/X2 Hackathon Certificate.jpg",
    link: "/Certs/X2 Hackathon Certificate.pdf",
  },
];

const Certificate = () => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  // const handleNext = () => {
  //   if (startIndex + itemsPerPage < certificates.length) {
  //     setStartIndex(startIndex + 1);
  //   }
  // };

  // const handlePrevious = () => {
  //   if (startIndex > 0) {
  //     setStartIndex(startIndex - 1);
  //   }
  // };
  const isMobile = useMediaQuery({ maxWidth: 1028 });
  const galleryImages = certificates.map((cert) => ({
    title: cert.title,
    imageUrl: cert.imageUrl,
  }));
  return (
    <>
      {isMobile ? (
        <Gallery images={galleryImages} />
      ) : (
        <div className="flex flex-col items-center w-full py-10">
          <div className="text-5xl text-center relative mb-8">
            <div className="font-primary text-white">Certificates</div>
            <div className="h-1 w-32 bg-white mx-auto text-center mt-4"></div>
          </div>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-5xl bg-secondary rounded-xl"
          >
            <CarouselContent>
              {certificates.map((cert, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-4">
                    <motion.div
                      className="bg-white rounded-lg shadow-lg p-4"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={cert.imageUrl}
                        alt={`${cert.title} Certificate`}
                        width={400}
                        height={200}
                        className="w-full h-auto rounded-md mb-4"
                        priority
                      />
                      <h2 className="text-lg font-semibold">{cert.title}</h2>
                      <p className="text-gray-600">
                        Issued by: {cert.organization}
                      </p>
                      <p className="text-gray-500">Date Earned: {cert.date}</p>
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline mt-2 inline-block"
                      >
                        View Certificate
                      </a>
                    </motion.div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-white" />
            <CarouselNext className="text-white" />
          </Carousel>
        </div>
      )}
    </>
  );
};

export default Certificate;
