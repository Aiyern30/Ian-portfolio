"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { Check, Copy, Heart, Coffee, Gift, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Payment methods with additional details
const paymentMethods = [
  {
    id: "paypal",
    name: "PayPal",
    logo: "/Logo/paypal.png",
    link: "https://www.paypal.com/paypalme/aiyern30",
    description: "Fast and secure way to support my work internationally",
    color: "from-[#0070ba] to-[#003087]",
    textColor: "text-white",
    featured: true,
    copyText: "aiyern30@gmail.com",
  },
  {
    id: "buymeacoffee",
    name: "Buy Me a Coffee",
    logo: "/Logo/buymeacoffee.svg",
    link: "https://buymeacoffee.com/IanGan",
    description: "A fun way to show appreciation with the price of a coffee",
    color: "from-[#FFDD00] to-[#FFC800]",
    textColor: "text-black",
    featured: false,
    copyText: "buymeacoffee.com/IanGan",
  },
  {
    id: "stripe",
    name: "Stripe",
    logo: "/Logo/stripe.png",
    link: "https://buy.stripe.com/test_7sIg2FeFCfvu2FW144",
    description: "Secure card payments with flexible amounts",
    color: "from-[#6772E5] to-[#4D5BD9]",
    textColor: "text-white",
    featured: false,
    copyText: "stripe.com/IanGan",
  },
  {
    id: "kofi",
    name: "Ko-fi",
    logo: "/Logo/kofi_logo.svg",
    link: "https://ko-fi.com/iangan",
    description: "Support creative work with no fees",
    color: "from-[#29ABE0] to-[#1A85B3]",
    textColor: "text-white",
    featured: false,
    copyText: "ko-fi.com/iangan",
  },
  {
    id: "tng",
    name: "Touch 'n Go eWallet",
    logo: "/Logo/TNG.jpg",
    link: "https://payment.tngdigital.com.my/sc/bDLnPgpH5S",
    description: "Quick local payments for Malaysian supporters",
    color: "from-[#FF0000] to-[#CC0000]",
    textColor: "text-white",
    featured: false,
    copyText: "TNG eWallet: Ian Gan",
  },
];

// Support tiers
const supportTiers = [
  {
    name: "Coffee",
    amount: "RM 15",
    value: 15,
    description: "Buy me a coffee to fuel late night coding sessions",
    icon: <Coffee className="h-6 w-6" />,
  },
  {
    name: "Pizza",
    amount: "RM 30",
    value: 30,
    description: "Help me stay energized with a delicious pizza",
    icon: <Gift className="h-6 w-6" />,
  },
  {
    name: "Premium",
    amount: "RM 100",
    value: 100,
    description: "Support ongoing development of my projects",
    icon: <Heart className="h-6 w-6" fill="#FF6B6B" />,
  },
];

export default function SupportMe() {
  const [selectedMethod, setSelectedMethod] = useState<
    (typeof paymentMethods)[0] | null
  >(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  // Prevent background scrolling when dialog is open
  useEffect(() => {
    if (isDialogOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDialogOpen]);

  const handleCopy = (text: string, name: string) => {
    navigator.clipboard.writeText(text);
    setCopied(name);

    toast({
      title: "Copied to clipboard!",
      description: `${name} details copied successfully.`,
    });

    setTimeout(() => setCopied(null), 2000);
  };

  const openPaymentDialog = (
    method: (typeof paymentMethods)[0],
    amount?: number
  ) => {
    setSelectedMethod(method);
    if (amount) setSelectedAmount(amount);
    setIsDialogOpen(true);
  };

  const getDynamicLink = () => {
    if (!selectedMethod) return "";

    // For PayPal, we can append the amount like /15 or /15MYR
    if (selectedMethod.id === "paypal" && selectedAmount) {
      return `${selectedMethod.link}/${selectedAmount}MYR`;
    }

    // For Buy Me A Coffee, it uses /?amount=5 or similar, but /5 is often for counts
    if (selectedMethod.id === "buymeacoffee" && selectedAmount) {
      // RM 15 is roughly $3.5, BMC uses $5 units usually
      // We'll just stick to the base link for now or handle specifically if needed
      return selectedMethod.link;
    }

    return selectedMethod.link;
  };

  return (
    <div className="relative py-24 md:py-32 px-4 md:px-8 lg:px-12 overflow-hidden min-h-screen flex items-center">
      {/* Background Atmosphere */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#FF9D7A]/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-[#763CAC]/15 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <Heart className="w-4 h-4 text-[#FF9D7A]" fill="#FF9D7A" />
            <span className="text-[10px] font-bold text-[#FF9D7A] uppercase tracking-[0.2em]">
              Support The Journey
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold font-primary mb-6 bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent leading-tight">
            Support My <span className="text-[#FF9D7A]">Creative</span> Work
          </h2>

          <p className="text-gray-400 font-secondary max-w-2xl mx-auto text-lg leading-relaxed">
            Your contributions fuel my late-night coding sessions and help me
            maintain high-quality open-source projects for the community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Tiers & Impact */}
          <div className="lg:col-span-7 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {supportTiers.map((tier, index) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <div className="relative h-full p-8 bg-[#1a0b2e]/40 border border-white/10 rounded-[2.5rem] backdrop-blur-md hover:border-[#FF9D7A]/40 transition-all duration-500">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                      {tier.icon}
                    </div>
                    <div className="flex justify-between items-end mb-4">
                      <h3 className="text-2xl font-bold font-primary">
                        {tier.name}
                      </h3>
                      <span className="text-[#FF9D7A] font-bold text-xl">
                        {tier.amount}
                      </span>
                    </div>
                    <p className="text-gray-400 font-secondary leading-relaxed mb-8">
                      {tier.description}
                    </p>
                    <button
                      onClick={() => {
                        const featured = paymentMethods.find((m) => m.featured);
                        if (featured) openPaymentDialog(featured, tier.value);
                      }}
                      className="w-full py-3 bg-white/5 border border-white/10 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#FF9D7A] hover:border-[#FF9D7A] hover:text-white transition-all duration-300"
                    >
                      Support {tier.amount}
                    </button>
                  </div>
                </motion.div>
              ))}

              {/* Custom Amount Tip Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="group sm:col-span-1"
              >
                <div className="relative h-full p-8 bg-gradient-to-br from-[#763CAC]/10 to-transparent border border-white/5 rounded-[2.5rem] backdrop-blur-md flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full border border-[#FF9D7A]/30 flex items-center justify-center">
                    <Gift className="w-5 h-5 text-[#FF9D7A]" />
                  </div>
                  <h4 className="font-primary font-bold">Custom Tip</h4>
                  <p className="text-xs text-gray-500 font-secondary">
                    Every little bit counts towards the next big release.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Impact Message */}
            <motion.div
              className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">
                Sustainability & Impact
              </h4>
              <p className="text-gray-400 font-secondary text-sm leading-relaxed">
                100% of your contributions go directly towards server costs,
                research tools, and development time. Your support enables me to
                keep my projects ad-free and open for everyone.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Payment Methods Selection */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-24 space-y-8"
            >
              <div className="p-8 md:p-10 bg-[#1a0b2e]/60 border border-white/10 rounded-[3rem] backdrop-blur-xl shadow-2xl">
                <h3 className="text-2xl font-bold font-primary mb-8 text-center lg:text-left">
                  Choose Platform
                </h3>

                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => openPaymentDialog(method)}
                      className="w-full flex items-center justify-between p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#FF9D7A]/30 hover:bg-white/[0.05] transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl p-2.5 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Image
                            src={method.logo || "/placeholder.svg"}
                            alt={method.name}
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-sm tracking-wide">
                            {method.name}
                          </p>
                          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">
                            {method.featured ? "Recommended" : "Secure Payment"}
                          </p>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-[#FF9D7A] group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-white/5 text-center">
                  <p className="text-xs text-gray-500 font-secondary mb-2">
                    Secure encrypted redirection
                  </p>
                  <div className="flex justify-center gap-4 grayscale opacity-30">
                    {/* Placeholder for security badges/icons */}
                    <div className="w-8 h-4 bg-white/20 rounded" />
                    <div className="w-8 h-4 bg-white/20 rounded" />
                    <div className="w-8 h-4 bg-white/20 rounded" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Dialog Checkout */}
        <AnimatePresence>
          {isDialogOpen && selectedMethod && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10 pointer-events-none">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsDialogOpen(false)}
                className="fixed inset-0 bg-black/95 backdrop-blur-2xl pointer-events-auto"
              />

              <motion.div
                className="relative w-full max-w-xl bg-[#0a0514] rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl pointer-events-auto flex flex-col"
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
              >
                <div className="p-8 md:p-12 space-y-8">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="w-16 h-16 bg-white rounded-2xl p-3 flex items-center justify-center mb-4">
                        <Image
                          src={selectedMethod.logo || "/placeholder.svg"}
                          alt={selectedMethod.name}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                      <h3 className="text-3xl font-bold font-primary">
                        Checkout Result
                      </h3>
                      <p className="text-gray-400 font-secondary text-sm">
                        {selectedMethod.description}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsDialogOpen(false)}
                      className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors group"
                    >
                      <Check className="w-5 h-5 text-gray-500 group-hover:text-white" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 space-y-4">
                      <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-[#FF9D7A]">
                        <span>ID / Wallet Address</span>
                        <button
                          onClick={() =>
                            handleCopy(
                              selectedMethod.copyText,
                              selectedMethod.name
                            )
                          }
                          className="hover:text-white transition-colors"
                        >
                          {copied === selectedMethod.name ? "Copied!" : "Copy"}
                        </button>
                      </div>
                      <p className="font-mono text-lg break-all text-white/90">
                        {selectedMethod.copyText}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">
                          Status
                        </p>
                        <p className="text-xs text-green-500 font-bold">
                          Encrypted Link Ready
                        </p>
                      </div>
                      <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">
                          Type
                        </p>
                        <p className="text-xs text-white font-bold">
                          {selectedMethod.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <button
                      onClick={() => window.open(getDynamicLink(), "_blank")}
                      className="w-full py-5 bg-[#FF9D7A] text-white font-bold rounded-2xl shadow-[0_10px_30px_rgba(255,157,122,0.3)] hover:bg-[#FF9D7A]/90 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                    >
                      Proceed to Secure Payment{" "}
                      <ExternalLink className="w-5 h-5" />
                    </button>
                    <p className="text-center text-[10px] text-gray-600 font-medium">
                      Redirecting to {selectedMethod.name}.{" "}
                      {selectedAmount
                        ? `Amount RM${selectedAmount} pre-filled.`
                        : "Secure transactions encrypted by provider."}
                    </p>
                  </div>
                </div>

                {/* Decorative Bottom Bar */}
                <div
                  className={cn(
                    "h-2 w-full bg-gradient-to-r",
                    selectedMethod?.color
                  )}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
