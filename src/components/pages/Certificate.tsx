"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Tabs,
  TabsList,
  TabsTrigger,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";
import {
  Calendar,
  Award,
  ExternalLink,
  X,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Certificate data
const certificates = [
  {
    title: "Devmatch Hackathon Certificate",
    organization: "Asia Pacific University of Technology",
    date: "August 2024",
    imageUrl: "/Certs/Devmatch.jpg",
    link: "/Certs/Devmatch.pdf",
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
  const { isMobile, isTablet } = useDeviceType();
  const [selectedCertificate, setSelectedCertificate] = useState<
    (typeof certificates)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeView, setActiveView] = useState<"grid" | "carousel">("grid");
  const [selectedOrganization, setSelectedOrganization] = useState<
    string | null
  >(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState<boolean[]>(
    Array(certificates.length).fill(false)
  );

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

  // Set default view based on device type
  useEffect(() => {
    if (isMobile) {
      setActiveView("carousel");
    }
  }, [isMobile]);

  // Handle image load state
  const handleImageLoad = (index: number) => {
    const newLoadedState = [...isLoaded];
    newLoadedState[index] = true;
    setIsLoaded(newLoadedState);
  };

  // Open certificate modal
  const openCertificateModal = (cert: (typeof certificates)[0]) => {
    setSelectedCertificate(cert);
    setIsModalOpen(true);
  };

  // Navigate carousel
  const navigateCarousel = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCarouselIndex((prev) =>
        prev === filteredCertificates.length - 1 ? 0 : prev + 1
      );
    } else {
      setCarouselIndex((prev) =>
        prev === 0 ? filteredCertificates.length - 1 : prev - 1
      );
    }
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedOrganization(null);
    setSelectedCategory(null);
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 text-white relative">
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
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* View Toggle (Hidden on mobile) */}
            {!isMobile && (
              <Tabs
                defaultValue="grid"
                value={activeView}
                onValueChange={(value) =>
                  setActiveView(value as "grid" | "carousel")
                }
                className="w-full md:w-auto"
              >
                <TabsList className="bg-[#320F85]/40 backdrop-blur-sm">
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
                  <TabsTrigger value="carousel">Carousel View</TabsTrigger>
                </TabsList>
              </Tabs>
            )}

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
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
                  className="border-white/20 h-10 w-10"
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
        {activeView === "grid" && filteredCertificates.length > 0 && (
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
                <Card className="overflow-hidden h-full bg-[#320F85]/20 backdrop-blur-sm border-white/10 hover:border-white/30 transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div
                      className={cn(
                        "absolute inset-0 bg-[#320F85]/40 backdrop-blur-sm flex items-center justify-center",
                        isLoaded[index] ? "opacity-0" : "opacity-100"
                      )}
                    >
                      <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
                    </div>
                    <Image
                      src={cert.imageUrl || "/placeholder.svg"}
                      alt={cert.title}
                      fill
                      className={cn(
                        "object-cover transition-all duration-500",
                        isLoaded[index]
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-105"
                      )}
                      onLoad={() => handleImageLoad(index)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-[#9D7AFF] hover:bg-[#9D7AFF]">
                        {cert.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {cert.title}
                    </h3>
                    <div className="flex items-center text-sm text-white/70 mb-2">
                      <Award className="w-4 h-4 mr-1" />
                      <span className="line-clamp-1">{cert.organization}</span>
                    </div>
                    <div className="flex items-center text-sm text-white/70 mb-4">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{cert.date}</span>
                    </div>
                    <Button
                      variant="default"
                      className="w-full bg-[#FF9D7A] hover:bg-[#FF9D7A]/80"
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

        {/* Carousel View */}
        {activeView === "carousel" && filteredCertificates.length > 0 && (
          <div className="relative">
            <motion.div
              className="relative overflow-hidden rounded-xl bg-[#320F85]/20 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative aspect-[16/9] md:aspect-[21/9]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={carouselIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={
                          filteredCertificates[carouselIndex].imageUrl ||
                          "/placeholder.svg"
                        }
                        alt={filteredCertificates[carouselIndex].title}
                        fill
                        className="object-contain"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                          <Badge className="mb-2 bg-[#9D7AFF] hover:bg-[#9D7AFF]">
                            {filteredCertificates[carouselIndex].category}
                          </Badge>
                          <h3 className="text-xl md:text-2xl font-bold mb-2">
                            {filteredCertificates[carouselIndex].title}
                          </h3>
                          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-white/80">
                            <div className="flex items-center">
                              <Award className="w-4 h-4 mr-1" />
                              <span>
                                {
                                  filteredCertificates[carouselIndex]
                                    .organization
                                }
                              </span>
                            </div>
                            <div className="hidden md:block text-white/60">
                              •
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>
                                {filteredCertificates[carouselIndex].date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="default"
                          className="bg-[#FF9D7A] hover:bg-[#FF9D7A]/80"
                          onClick={() =>
                            openCertificateModal(
                              filteredCertificates[carouselIndex]
                            )
                          }
                        >
                          View Certificate
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Carousel Navigation */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full h-10 w-10"
                onClick={() => navigateCarousel("prev")}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full h-10 w-10"
                onClick={() => navigateCarousel("next")}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Carousel Indicators */}
              <div className="absolute bottom-20 md:bottom-24 left-0 right-0 flex justify-center gap-1.5">
                {filteredCertificates.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === carouselIndex ? "bg-white w-4" : "bg-white/40"
                    }`}
                    onClick={() => setCarouselIndex(index)}
                  />
                ))}
              </div>
            </motion.div>

            {/* Carousel Thumbnails */}
            <div className="mt-4 flex overflow-x-auto hide-scrollbar gap-2 pb-2">
              {filteredCertificates.map((cert, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 relative w-20 h-12 rounded-md overflow-hidden transition-all ${
                    index === carouselIndex
                      ? "ring-2 ring-[#FF9D7A]"
                      : "ring-1 ring-white/10"
                  }`}
                  onClick={() => setCarouselIndex(index)}
                >
                  <Image
                    src={cert.imageUrl || "/placeholder.svg"}
                    alt={cert.title}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
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

            <div className="relative aspect-video w-full overflow-hidden rounded-md">
              {selectedCertificate && (
                <Image
                  src={selectedCertificate.imageUrl || "/placeholder.svg"}
                  alt={selectedCertificate.title}
                  fill
                  className="object-contain"
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
    </section>
  );
}
