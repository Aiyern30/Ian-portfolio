"use client";

import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useDeviceType } from "@/lib/useDeviceTypes";
import { Calendar, Award, ExternalLink, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CertificateShowcase() {
  const t = useTranslations("certificates");
  const { isMobile } = useDeviceType();

  // Certificate data with translations
  const certificates = useMemo(() => [
    {
      title: t("data.cert0.title"),
      organization: t("data.cert0.organization"),
      date: t("data.cert0.date"),
      imageUrl: "/Certs/Devmatch.jpg",
      link: "/Certs/Devmatch.jpg",
      category: t("data.cert0.category"),
    },
    {
      title: t("data.cert1.title"),
      organization: t("data.cert1.organization"),
      date: t("data.cert1.date"),
      imageUrl: "/Certs/Devmatch2.jpg",
      link: "/Certs/Devmatch2.jpg",
      category: t("data.cert1.category"),
    },
    {
      title: t("data.cert2.title"),
      organization: t("data.cert2.organization"),
      date: t("data.cert2.date"),
      imageUrl: "/Certs/JavaScript.png",
      link: "https://www.freecodecamp.org/certification/Aiyern30/javascript-algorithms-and-data-structures-v8",
      category: t("data.cert2.category"),
    },
    {
      title: t("data.cert3.title"),
      organization: t("data.cert3.organization"),
      date: t("data.cert3.date"),
      imageUrl: "/Certs/Machine-Learning.jpg",
      link: "/Certs/Machine-Learning.pdf",
      category: t("data.cert3.category"),
    },
    {
      title: t("data.cert4.title"),
      organization: t("data.cert4.organization"),
      date: t("data.cert4.date"),
      imageUrl: "/Certs/Python ai e-cert.jpg",
      link: "/Certs/Python ai e-cert.pdf",
      category: t("data.cert4.category"),
    },
    {
      title: t("data.cert5.title"),
      organization: t("data.cert5.organization"),
      date: t("data.cert5.date"),
      imageUrl: "/Certs/Responsive-Web-Design.png",
      link: "https://www.freecodecamp.org/certification/Aiyern30/responsive-web-design",
      category: t("data.cert5.category"),
    },
    {
      title: t("data.cert6.title"),
      organization: t("data.cert6.organization"),
      date: t("data.cert6.date"),
      imageUrl: "/Certs/ThreeJS.jpg",
      link: "/Certs/ThreeJS.pdf",
      category: t("data.cert6.category"),
    },
    {
      title: t("data.cert7.title"),
      organization: t("data.cert7.organization"),
      date: t("data.cert7.date"),
      imageUrl: "/Certs/X2 Hackathon Certificate.jpg",
      link: "/Certs/X2 Hackathon Certificate.pdf",
      category: t("data.cert7.category"),
    },
  ], [t]);

  // Extract unique organizations and categories
  const organizations = Array.from(
    new Set(certificates.map((cert) => cert.organization)),
  );
  const categories = Array.from(
    new Set(certificates.map((cert) => cert.category)),
  );
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
  }, [certificates]);

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

  // Handle scroll lock when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

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
    <div className="relative py-24 md:py-32 px-4 md:px-8 lg:px-12 overflow-hidden min-h-screen">
      {/* Background Atmosphere */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#763CAC]/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-[#FF9D7A]/10 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <Award className="w-4 h-4 text-[#FF9D7A]" />
            <span className="text-[10px] font-bold text-[#FF9D7A] uppercase tracking-[0.2em]">
              {t("badge")}
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold font-primary mb-6 bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
            {t("heading").split(" & ")[0]} & <span className="text-[#FF9D7A]">{t("heading").split(" & ")[1]}</span>
          </h2>

          <p className="text-gray-400 font-secondary max-w-2xl mx-auto text-lg leading-relaxed">
            {t("description")}
          </p>
        </motion.div>

        {/* Controls and Filters */}
        <motion.div
          className="mb-16 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border backdrop-blur-md",
                !selectedCategory
                  ? "bg-[#FF9D7A] border-[#FF9D7A] text-white shadow-[0_4px_20px_rgba(255,157,122,0.3)]"
                  : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white",
              )}
            >
              {t("allAchievements")}
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border backdrop-blur-md",
                  selectedCategory === category
                    ? "bg-[#FF9D7A] border-[#FF9D7A] text-white shadow-[0_4px_20px_rgba(255,157,122,0.3)]"
                    : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white",
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Secondary Filter: Organization */}
          <div className="flex flex-wrap justify-center gap-2">
            {organizations.map((org) => (
              <button
                key={org}
                onClick={() =>
                  setSelectedOrganization(
                    selectedOrganization === org ? null : org,
                  )
                }
                className={cn(
                  "px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border",
                  selectedOrganization === org
                    ? "bg-white/15 border-white/30 text-white"
                    : "bg-transparent border-white/5 text-gray-500 hover:border-white/20 hover:text-gray-300",
                )}
              >
                {org}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredCertificates.map((cert, index) => (
              <motion.div
                key={cert.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group"
              >
                <div
                  className="relative h-full bg-[#1a0b2e]/40 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-md hover:border-[#FF9D7A]/30 transition-all duration-500 shadow-2xl cursor-pointer"
                  onClick={() => openCertificateModal(cert)}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a0b2e] via-transparent to-transparent z-10" />
                    <Image
                      src={cert.imageUrl || "/placeholder.svg"}
                      alt={cert.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-[2px]">
                      <div className="p-4 bg-white text-black rounded-full scale-50 group-hover:scale-100 transition-transform duration-500">
                        <Award className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[9px] font-bold text-white tracking-widest uppercase">
                        {cert.category}
                      </span>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-6 md:p-8 space-y-4">
                    <h3 className="text-xl md:text-2xl font-bold font-primary group-hover:text-[#FF9D7A] transition-colors line-clamp-2 leading-tight">
                      {cert.title}
                    </h3>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF9D7A]" />
                        <span className="font-secondary line-clamp-1">
                          {cert.organization}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{cert.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results Message */}
        {filteredCertificates.length === 0 && (
          <motion.div
            className="text-center py-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Search className="w-16 h-16 text-white/10 mx-auto mb-6" />
            <h3 className="text-2xl font-bold font-primary mb-2">
              {t("noResults.title")}
            </h3>
            <p className="text-gray-500 font-secondary mb-8">
              {t("noResults.description")}
            </p>
            <button
              onClick={resetFilters}
              className="px-8 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors"
            >
              {t("noResults.resetButton")}
            </button>
          </motion.div>
        )}

        {/* Immersive Detail Modal */}
        <AnimatePresence>
          {isModalOpen && selectedCertificate && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10 pointer-events-none">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="fixed inset-0 bg-black/95 backdrop-blur-2xl pointer-events-auto"
              />

              <motion.div
                layoutId={`cert-${selectedCertificate.title}`}
                className="relative w-full max-w-5xl bg-[#0a0514] rounded-[3rem] overflow-hidden border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.8)] max-h-full flex flex-col pointer-events-auto"
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
              >
                {/* Sticky Close Button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 z-[60] p-4 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-xl border border-white/10 transition-all group"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300 pointer-events-auto" />
                </button>

                {/* Scrollable Content Container */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {/* Hero Certificate Image */}
                  <div className="relative w-full aspect-video md:aspect-[21/9] bg-white/5">
                    <Image
                      src={selectedCertificate.imageUrl || "/placeholder.svg"}
                      alt={selectedCertificate.title}
                      fill
                      className="object-contain p-4 md:p-12 opacity-90"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0514] via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Content Detail */}
                  <div className="p-8 md:p-16 space-y-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                      <div className="space-y-6">
                        <div className="flex flex-wrap items-center gap-4">
                          <span className="px-5 py-2 rounded-full bg-[#FF9D7A]/10 border border-[#FF9D7A]/20 text-[#FF9D7A] text-[10px] font-bold uppercase tracking-[0.2em]">
                            {selectedCertificate.category}
                          </span>
                          <div className="h-4 w-[1px] bg-white/10" />
                          <span className="text-gray-500 text-xs font-medium uppercase tracking-widest">
                            {t("modal.verificationIdAvailable")}
                          </span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold font-primary leading-tight tracking-tight max-w-2xl">
                          {selectedCertificate.title}
                        </h2>

                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-3 text-white/80">
                            <Award className="w-5 h-5 text-[#FF9D7A]" />
                            <span className="text-lg font-secondary">
                              {selectedCertificate.organization}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-white/60">
                            <Calendar className="w-5 h-5" />
                            <span className="font-secondary">
                              {selectedCertificate.date}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <button
                          onClick={() =>
                            window.open(selectedCertificate.link, "_blank")
                          }
                          className="flex items-center gap-3 px-8 py-4 bg-[#FF9D7A] text-white font-bold rounded-2xl hover:bg-[#FF9D7A]/90 transition-all shadow-[0_10px_30px_rgba(255,157,122,0.2)]"
                        >
                          {t("modal.verifyCredential")} <ExternalLink className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/5 pt-12">
                      <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
                        <h4 className="text-white font-bold uppercase tracking-widest text-sm">
                          {t("modal.descriptionTitle")}
                        </h4>
                        <p className="text-gray-400 font-secondary leading-relaxed">
                          {t("modal.descriptionText", {
                            category: selectedCertificate.category,
                            organization: selectedCertificate.organization
                          })}
                        </p>
                      </div>
                      <div className="p-8 rounded-3xl bg-gradient-to-br from-[#FF9D7A]/5 to-transparent border border-[#FF9D7A]/10 space-y-4">
                        <h4 className="text-[#FF9D7A] font-bold uppercase tracking-widest text-sm">
                          {t("modal.impactTitle")}
                        </h4>
                        <ul className="space-y-3 text-gray-400 font-secondary text-sm">
                          <li className="flex gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#FF9D7A] mt-1.5" />
                            {t("modal.impactItems.principles")}
                          </li>
                          <li className="flex gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#FF9D7A] mt-1.5" />
                            {t("modal.impactItems.experience")}
                          </li>
                          <li className="flex gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#FF9D7A] mt-1.5" />
                            {t("modal.impactItems.validation")}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
