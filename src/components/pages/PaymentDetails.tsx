"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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
    description: "Buy me a coffee to fuel late night coding sessions",
    icon: <Coffee className="h-6 w-6" />,
  },
  {
    name: "Pizza",
    amount: "RM 30",
    description: "Help me stay energized with a delicious pizza",
    icon: <Gift className="h-6 w-6" />,
  },
  {
    name: "Premium",
    amount: "RM 100",
    description: "Support ongoing development of my projects",
    icon: <Heart className="h-6 w-6" fill="#FF6B6B" />,
  },
];

export default function SupportMe() {
  const [selectedMethod, setSelectedMethod] = useState<
    (typeof paymentMethods)[0] | null
  >(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCopy = (text: string, name: string) => {
    navigator.clipboard.writeText(text);
    setCopied(name);

    toast({
      title: "Copied to clipboard!",
      description: `${name} details copied successfully.`,
    });

    setTimeout(() => setCopied(null), 2000);
  };

  const openPaymentDialog = (method: (typeof paymentMethods)[0]) => {
    setSelectedMethod(method);
    setIsDialogOpen(true);
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 text-white relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">Support My Work</h2>
          <motion.div
            className="h-1 w-48 bg-gradient-to-r from-[#FF9D7A] to-[#FFD166] mx-auto"
            initial={{ width: 0 }}
            animate={{ width: "12rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
            Your support helps me continue creating high-quality projects and
            tutorials. Choose your preferred payment method below to contribute
            to my work.
          </p>
        </motion.div>

        {/* Featured Payment Method */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {paymentMethods
            .filter((method) => method.featured)
            .map((method, index) => (
              <div key={method.id} className="max-w-2xl mx-auto">
                <Card className="overflow-hidden border-white/10 bg-[#320F85]/20 backdrop-blur-sm">
                  <div
                    className={cn(
                      "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r",
                      method.color
                    )}
                  />
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-white p-2 flex items-center justify-center">
                          <Image
                            src={method.logo || "/placeholder.svg"}
                            alt={method.name}
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {method.name}
                            <span className="bg-[#FF9D7A] text-white text-xs py-0.5 px-2 rounded-full">
                              Recommended
                            </span>
                          </CardTitle>
                          <CardDescription className="text-white/70">
                            {method.description}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      className="border-white/20"
                      onClick={() => handleCopy(method.copyText, method.name)}
                    >
                      {copied === method.name ? (
                        <Check className="mr-2 h-4 w-4" />
                      ) : (
                        <Copy className="mr-2 h-4 w-4" />
                      )}
                      Copy Details
                    </Button>
                    <Button
                      className="bg-[#FF9D7A] hover:bg-[#FF9D7A]/80"
                      onClick={() => openPaymentDialog(method)}
                    >
                      Support via {method.name}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
        </motion.div>

        {/* Support Tiers */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl font-semibold text-center mb-6">
            Choose a Support Tier
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {supportTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index + 0.4 }}
                whileHover={{ y: -5 }}
              >
                <Card className="border-white/10 bg-[#320F85]/20 backdrop-blur-sm h-full flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <CardTitle>{tier.name}</CardTitle>
                      <div className="p-2 rounded-full bg-[#4A1D9A]/50">
                        {tier.icon}
                      </div>
                    </div>
                    <CardDescription className="text-white/70">
                      {tier.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto">
                    <Button
                      className="w-full bg-gradient-to-r from-[#9D7AFF] to-[#7A4FFF] hover:opacity-90"
                      onClick={() => {
                        const featured = paymentMethods.find((m) => m.featured);
                        if (featured) openPaymentDialog(featured);
                      }}
                    >
                      Support with {tier.amount}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Other Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-semibold text-center mb-6">
            Other Payment Methods
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {paymentMethods
              .filter((method) => !method.featured)
              .map((method, index) => (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index + 0.5 }}
                  whileHover={{ y: -5 }}
                  className="flex flex-col"
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Card
                          className="border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer flex-1 flex flex-col"
                          onClick={() => openPaymentDialog(method)}
                        >
                          <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                            <div className="h-16 w-16 rounded-full bg-white p-3 mb-4 flex items-center justify-center">
                              <Image
                                src={method.logo || "/placeholder.svg"}
                                alt={method.name}
                                width={40}
                                height={40}
                                className="object-contain"
                              />
                            </div>
                            <CardTitle className="text-base mb-1">
                              {method.name}
                            </CardTitle>
                          </CardContent>
                        </Card>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{method.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* Thank You Message */}
        <motion.div
          className="mt-16 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="p-6 rounded-lg border border-white/10 bg-[#320F85]/10 backdrop-blur-sm">
            <Heart className="h-12 w-12 mx-auto mb-4 text-[#FF9D7A]" />
            <h3 className="text-xl font-semibold mb-2">
              Thank You for Your Support!
            </h3>
            <p className="text-white/70">
              Your contributions help me dedicate more time to creating quality
              content, developing new projects, and sharing knowledge with the
              community. Every bit of support is deeply appreciated!
            </p>
          </div>
        </motion.div>

        {/* Payment Method Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-gradient-to-br from-[#320F85] to-[#763CAC] border-white/10 text-white">
            <DialogHeader>
              {selectedMethod && (
                <>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-white p-2 flex items-center justify-center">
                      <Image
                        src={selectedMethod.logo || "/placeholder.svg"}
                        alt={selectedMethod.name}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <DialogTitle>Support via {selectedMethod.name}</DialogTitle>
                  </div>
                  <DialogDescription className="text-white/70">
                    {selectedMethod.description}
                  </DialogDescription>
                </>
              )}
            </DialogHeader>

            {selectedMethod && (
              <div className="space-y-4">
                <div className="p-4 bg-white/10 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-white/70">
                      Payment details:
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-white/70 hover:text-white hover:bg-white/10"
                      onClick={() =>
                        handleCopy(selectedMethod.copyText, selectedMethod.name)
                      }
                    >
                      {copied === selectedMethod.name ? (
                        <Check className="h-4 w-4 mr-1" />
                      ) : (
                        <Copy className="h-4 w-4 mr-1" />
                      )}
                      Copy
                    </Button>
                  </div>
                  <p className="font-mono bg-black/20 p-2 rounded text-white/90 break-all">
                    {selectedMethod.copyText}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Suggested amounts:</h4>
                  <div className="flex flex-wrap gap-2">
                    {supportTiers.map((tier) => (
                      <Button
                        key={tier.name}
                        variant="outline"
                        className="border-white/20 hover:bg-white/10"
                      >
                        {tier.icon}
                        <span className="ml-2">{tier.amount}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <DialogFooter className="flex sm:justify-between">
              <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              {selectedMethod && (
                <Button
                  className="bg-[#FF9D7A] hover:bg-[#FF9D7A]/80"
                  onClick={() => window.open(selectedMethod.link, "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Continue to {selectedMethod.name}
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
