"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";

import {
  Input,
  Textarea,
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui";
import { useToast } from "@/hooks/use-toast";
import emailjs from "emailjs-com";
import { cn } from "@/lib/utils";
import {
  Github,
  Linkedin,
  Instagram,
  MessageSquare,
  Send,
  Phone,
  Mail,
  User,
  Code,
  Loader2,
} from "lucide-react";

// Schema definition
const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  contactNumber: z.string().optional(),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

// Social links data
const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/Aiyern30",
    icon: <Github className="w-5 h-5" />,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ian-gan-346547279/",
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/_aiyern_/",
    icon: <Instagram className="w-5 h-5" />,
  },
  {
    name: "Discord",
    url: "https://discord.gg/eEzxaxPR2d",
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/+60182133211?text='Type%20your%20message%20here%20%3A'",
    icon: <Phone className="w-5 h-5" />,
  },
  {
    name: "Source",
    url: "https://github.com/Aiyern30/Ian-portfolio",
    icon: <Code className="w-5 h-5" />,
  },
];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    const formData = {
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      contactNumber: data.contactNumber,
      enquiry: data.message,
    };

    emailjs
      .send(
        "service_kgb3j15",
        "template_2vj3nql",
        formData,
        "deYKZbFxD1zzhjpFe"
      )
      .then(() => {
        toast({
          title: "Message sent!",
          description: "We'll get back to you as soon as possible.",
        });
        form.reset();
        setFormSubmitted(true);
        setTimeout(() => setFormSubmitted(false), 5000);
      })
      .catch(() => {
        toast({
          title: "Failed to send message.",
          description: "Please try again later.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div
      className="relative py-24 md:py-32 px-4 md:px-6 overflow-hidden min-h-screen flex items-center"
      id="contact-us"
    >
      {/* Background Atmosphere */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#763CAC]/15 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-[#FF9D7A]/10 rounded-full blur-[150px] -z-10" />

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
            <MessageSquare className="w-4 h-4 text-[#FF9D7A]" />
            <span className="text-[10px] font-bold text-[#FF9D7A] uppercase tracking-[0.2em]">
              Available for projects
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold font-primary mb-6 bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent leading-tight">
            Let's Start a <span className="text-[#FF9D7A]">Conversation</span>
          </h2>

          <p className="text-gray-400 font-secondary max-w-2xl mx-auto text-lg leading-relaxed">
            Have a question or a proposal? I'm always open to discussing new
            projects, creative ideas or opportunities to be part of your
            visions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-12 xl:col-span-7"
          >
            <div className="relative h-full p-8 md:p-12 bg-[#1a0b2e]/40 border border-white/10 rounded-[3rem] backdrop-blur-xl shadow-2xl">
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center py-20"
                >
                  <div className="w-20 h-20 bg-[#FF9D7A]/20 rounded-3xl flex items-center justify-center mb-8 rotate-12 transition-transform hover:rotate-0 duration-500">
                    <Send className="w-10 h-10 text-[#FF9D7A]" />
                  </div>
                  <h3 className="text-3xl font-bold font-primary mb-4">
                    Message Transmitted!
                  </h3>
                  <p className="text-gray-400 font-secondary max-w-sm mx-auto mb-10 leading-relaxed">
                    Thank you for reaching out. I've received your inquiry and
                    will respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#FF9D7A] hover:border-[#FF9D7A] hover:text-white transition-all duration-300"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold font-primary mb-10 text-white/90">
                    Inquiry Details
                  </h3>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                First Name
                              </FormLabel>
                              <FormControl>
                                <div className="relative group">
                                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#FF9D7A] transition-colors w-4 h-4" />
                                  <Input
                                    placeholder="John"
                                    className="h-14 bg-white/[0.03] border-white/5 focus:border-[#FF9D7A]/50 focus:bg-white/[0.05] pl-12 rounded-2xl text-white transition-all"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-[10px] uppercase font-bold tracking-tighter" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                Last Name
                              </FormLabel>
                              <FormControl>
                                <div className="relative group">
                                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#FF9D7A] transition-colors w-4 h-4" />
                                  <Input
                                    placeholder="Doe"
                                    className="h-14 bg-white/[0.03] border-white/5 focus:border-[#FF9D7A]/50 focus:bg-white/[0.05] pl-12 rounded-2xl text-white transition-all"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-[10px] uppercase font-bold tracking-tighter" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                Email Address
                              </FormLabel>
                              <FormControl>
                                <div className="relative group">
                                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#FF9D7A] transition-colors w-4 h-4" />
                                  <Input
                                    type="email"
                                    placeholder="hello@example.com"
                                    className="h-14 bg-white/[0.03] border-white/5 focus:border-[#FF9D7A]/50 focus:bg-white/[0.05] pl-12 rounded-2xl text-white transition-all"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-[10px] uppercase font-bold tracking-tighter" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="contactNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                Contact (Optional)
                              </FormLabel>
                              <FormControl>
                                <div className="relative group">
                                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#FF9D7A] transition-colors w-4 h-4" />
                                  <Input
                                    type="tel"
                                    placeholder="+60 18..."
                                    className="h-14 bg-white/[0.03] border-white/5 focus:border-[#FF9D7A]/50 focus:bg-white/[0.05] pl-12 rounded-2xl text-white transition-all"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-[10px] uppercase font-bold tracking-tighter" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-500">
                              Project Description
                            </FormLabel>
                            <FormControl>
                              <div className="relative group">
                                <MessageSquare className="absolute left-4 top-5 text-gray-600 group-focus-within:text-[#FF9D7A] transition-colors w-4 h-4" />
                                <Textarea
                                  placeholder="Briefly describe your vision..."
                                  className="min-h-[160px] bg-white/[0.03] border-white/5 focus:border-[#FF9D7A]/50 focus:bg-white/[0.05] pl-12 pt-5 rounded-[2rem] text-white transition-all resize-none"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-[10px] uppercase font-bold tracking-tighter" />
                          </FormItem>
                        )}
                      />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-5 bg-[#FF9D7A] text-white font-bold rounded-2xl shadow-[0_10px_30px_rgba(255,157,122,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale uppercase tracking-[0.2em] text-xs"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Transmit Message
                          </>
                        )}
                      </button>
                    </form>
                  </Form>
                </>
              )}
            </div>
          </motion.div>

          {/* Right Column: Experience & Socials */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-12 xl:col-span-5 flex flex-col gap-8"
          >
            {/* Value Proposition Card */}
            <div className="p-10 bg-gradient-to-br from-[#1a0b2e]/60 to-transparent border border-white/10 rounded-[3rem] backdrop-blur-xl flex-1 flex flex-col justify-center">
              <h3 className="text-4xl font-bold font-primary mb-6 leading-tight">
                Digital <span className="text-[#FF9D7A]">Solutions</span> for
                Modern <span className="text-[#FFD166]">Visions</span>.
              </h3>
              <p className="text-gray-400 font-secondary text-lg leading-relaxed mb-8">
                I specialize in high-performance web applications that combine
                stunning aesthetics with robust engineering. Let's discuss how I
                can help your team scale.
              </p>

              <div className="flex flex-wrap gap-4 mt-auto">
                <div className="px-4 py-2 bg-white/5 border border-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#FF9D7A]">
                  Full-Stack Development
                </div>
                <div className="px-4 py-2 bg-white/5 border border-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#FF9D7A]">
                  Cloud Infrastructure
                </div>
                <div className="px-4 py-2 bg-white/5 border border-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#FF9D7A]">
                  Web3 Integration
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="p-10 bg-[#1a0b2e]/40 border border-white/10 rounded-[3rem] backdrop-blur-md">
              <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-8">
                Network Ecosystem
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="flex items-center gap-4 p-4 rounded-[1.5rem] bg-white/[0.02] border border-white/5 hover:border-[#FF9D7A]/40 hover:bg-white/[0.05] transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#FF9D7A] group-hover:text-white transition-all">
                      {link.icon}
                    </div>
                    <span className="text-sm font-bold tracking-wide group-hover:text-white transition-colors">
                      {link.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
