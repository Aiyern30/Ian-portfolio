"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useDeviceType } from "@/lib/useDeviceTypes";
import {
  Badge,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";
import { Calendar, Award, ExternalLink, X, Search } from "lucide-react";

// Certificate data
const certificates = [
  {
    title: "Devmatch Hackathon Certificate",
    organization: "Asia Pacific University of Technology",
    date: "August 2024",
    imageUrl: "/Certs/Devmatch.jpg",
    link: "/Certs/Devmatch.jpg",
    category: "Hackathon",
  },
  {
    title: "Devmatch 2 Hackathon Certificate",
    organization: "Asia Pacific University of Technology",
    date: "August 2025",
    imageUrl: "/Certs/Devmatch2.jpg",
    link: "/Certs/Devmatch2.jpg",
    category: "Hackathon",
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    organization: "FreeCodeCamp",
    date: "27 September 2024",
    imageUrl: "/Certs/JavaScript.png",
    link: "https://www.freecodecamp.org/certification/Aiyern30/javascript-algorithms-and-data-structures-v8",
    category: "Programming",
  },
  {
    title: "Machine Learning with Python",
    organization: "Asia Pacific University of Technology",
    date: "September 2024",
    imageUrl: "/Certs/Machine-Learning.jpg",
    link: "/Certs/Machine-Learning.pdf",
    category: "AI & ML",
  },
  {
    title: "Python Powered AI Chatbot",
    organization: "Asia Pacific University of Technology",
    date: "September 2024",
    imageUrl: "/Certs/Python ai e-cert.jpg",
    link: "/Certs/Python ai e-cert.pdf",
    category: "AI & ML",
  },
  {
    title: "Responsive Web Design",
    organization: "freeCodeCamp",
    date: "January 2023",
    imageUrl: "/Certs/Responsive-Web-Design.png",
    link: "https://www.freecodecamp.org/certification/Aiyern30/responsive-web-design",
    category: "Web Development",
  },
  {
    title: "ThreeJS",
    organization: "Asia Pacific University of Technology",
    date: "September 2024",
    imageUrl: "/Certs/ThreeJS.jpg",
    link: "/Certs/ThreeJS.pdf",
    category: "Web Development",
  },
  {
    title: "X2 Hackathon Certificate",
    organization: "Asia Pacific University of Technology",
    date: "September 2024",
    imageUrl: "/Certs/X2 Hackathon Certificate.jpg",
    link: "/Certs/X2 Hackathon Certificate.pdf",
    category: "Hackathon",
  },
];

// Extract unique organizations and categories
const organizations = Array.from(
  new Set(certificates.map((cert) => cert.organization))
);
const categories = Array.from(
  new Set(certificates.map((cert) => cert.category))
);

export default function CertificateShowcase() {
  const { isMobile } = useDeviceType();
  const [selectedCertificate, setSelectedCertificate] = useState<
    (typeof certificates)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState<
    string | null
  >(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  // Preload images on component mount
  useEffect(() => {
    // Create an array of promises for image loading
    const imagePromises = certificates.map((cert) => {
      return new Promise((resolve) => {
        const img = document.createElement("img");
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = cert.imageUrl;
      });
    });

    // When all images are loaded, set preloaded to true
    Promise.all(imagePromises).then(() => {
      setImagesPreloaded(true);
    });
  }, []);

  // Filter certificates based on selected organization and category
  const filteredCertificates = certificates.filter((cert) => {
    const matchesOrganization = selectedOrganization
      ? cert.organization === selectedOrganization
      : true;
    const matchesCategory = selectedCategory
      ? cert.category === selectedCategory
      : true;
    return matchesOrganization && matchesCategory;
  });

  // Open certificate modal
  const openCertificateModal = (cert: (typeof certificates)[0]) => {
    setSelectedCertificate(cert);
    setIsModalOpen(true);
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedOrganization(null);
    setSelectedCategory(null);
  };

  return (
    <div className="py-16 md:py-24 px-4 md:px-6 text-white relative">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#320F85]/30 via-[#4A1D9A]/20 to-[#763CAC]/10 opacity-80" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">My Certificates</h2>
          <motion.div
            className="h-1 w-32 bg-gradient-to-r from-[#FF9D7A] to-[#FFD166] mx-auto text-center"
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            A collection of certifications I've earned throughout my learning
            journey
          </p>
        </motion.div>

        {/* Controls and Filters */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Select
                value={selectedCategory || ""}
                onValueChange={(value) => setSelectedCategory(value || null)}
              >
                <SelectTrigger className="w-full sm:w-[180px] bg-[#320F85]/40 backdrop-blur-sm border-white/20 text-white">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent className="bg-[#320F85]/90 backdrop-blur-md border-white/20 text-white">
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedOrganization || ""}
                onValueChange={(value) =>
                  setSelectedOrganization(value || null)
                }
              >
                <SelectTrigger className="w-full sm:w-[200px] bg-[#320F85]/40 backdrop-blur-sm border-white/20 text-white">
                  <SelectValue placeholder="Filter by organization" />
                </SelectTrigger>
                <SelectContent className="bg-[#320F85]/90 backdrop-blur-md border-white/20 text-white">
                  <SelectItem value="all">All Organizations</SelectItem>
                  {organizations.map((org) => (
                    <SelectItem key={org} value={org}>
                      {org}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {(selectedCategory || selectedOrganization) && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={resetFilters}
                  className="border-white/20 h-10 w-10 flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* No Results Message */}
        {filteredCertificates.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4">
              <Search className="w-12 h-12 text-white/30 mx-auto" />
            </div>
            <h3 className="text-xl font-medium mb-2">No certificates found</h3>
            <p className="text-white/60 mb-4">Try adjusting your filters</p>
            <Button variant="outline" onClick={resetFilters}>
              Reset Filters
            </Button>
          </motion.div>
        )}

        {/* Grid View */}
        {filteredCertificates.length > 0 && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredCertificates.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Card className="overflow-hidden h-full flex flex-col bg-[#320F85]/20 backdrop-blur-sm border-white/10 hover:border-white/30 transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {/* Static background color while image loads */}
                    <div className="absolute inset-0 bg-[#320F85]/60" />

                    <Image
                      src={cert.imageUrl || "/placeholder.svg"}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 6} // Prioritize loading the first 6 images
                      className="object-cover"
                      unoptimized // This can help with external images that might have loading issues
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-[#9D7AFF] hover:bg-[#9D7AFF]">
                        {cert.category}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-5 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                        {cert.title}
                      </h3>
                      <div className="flex items-center text-sm text-white/70 mb-2">
                        <Award className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span className="line-clamp-1">
                          {cert.organization}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-white/70">
                        <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span>{cert.date}</span>
                      </div>
                    </div>

                    <Button
                      variant="default"
                      className="w-full bg-[#FF9D7A] hover:bg-[#FF9D7A]/80 mt-4"
                      onClick={() => openCertificateModal(cert)}
                    >
                      View Certificate
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Certificate Detail Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="bg-gradient-to-br from-[#320F85] to-[#763CAC] border-white/10 text-white max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-xl md:text-2xl">
                {selectedCertificate?.title}
              </DialogTitle>
              <DialogDescription className="text-white/70">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2">
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    <span>{selectedCertificate?.organization}</span>
                  </div>
                  <div className="hidden md:block text-white/60">•</div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{selectedCertificate?.date}</span>
                  </div>
                  <div className="hidden md:block text-white/60">•</div>
                  <Badge className="bg-[#9D7AFF] hover:bg-[#9D7AFF]">
                    {selectedCertificate?.category}
                  </Badge>
                </div>
              </DialogDescription>
            </DialogHeader>

            <div className="relative aspect-video w-full overflow-hidden rounded-md bg-[#320F85]/60">
              {selectedCertificate && (
                <Image
                  src={selectedCertificate.imageUrl || "/placeholder.svg"}
                  alt={selectedCertificate.title}
                  fill
                  className="object-contain"
                  unoptimized
                  priority
                />
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
              {selectedCertificate && (
                <Button
                  className="bg-[#FF9D7A] hover:bg-[#FF9D7A]/80"
                  onClick={() =>
                    window.open(selectedCertificate.link, "_blank")
                  }
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Certificate
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
