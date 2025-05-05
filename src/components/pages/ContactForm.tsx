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
    <section
      className="py-16 md:py-24 px-4 md:px-6 text-white relative"
      id="contact-us"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <motion.div
            className="h-1 w-32 bg-gradient-to-r from-[#FF9D7A] to-[#FFD166] mx-auto"
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Have a project in mind or want to collaborate? I'd love to hear from
            you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#320F85]/20 backdrop-blur-sm p-8 rounded-xl border border-white/10 shadow-xl"
          >
            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center py-12"
              >
                <div className="w-16 h-16 bg-[#FF9D7A]/20 rounded-full flex items-center justify-center mb-6">
                  <Send className="w-8 h-8 text-[#FF9D7A]" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-white/70 mb-6">
                  Thank you for reaching out. I'll get back to you as soon as
                  possible.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setFormSubmitted(false)}
                  className="border-white/20"
                >
                  Send another message
                </Button>
              </motion.div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/80">
                              First name
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                                <Input
                                  placeholder="John"
                                  className="bg-[#320F85]/40 border-white/10 focus:border-[#FF9D7A]/50 pl-10 text-white"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/80">
                              Last name
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                                <Input
                                  placeholder="Doe"
                                  className="bg-[#320F85]/40 border-white/10 focus:border-[#FF9D7A]/50 pl-10 text-white"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/80">Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                              <Input
                                type="email"
                                placeholder="johndoe@example.com"
                                className="bg-[#320F85]/40 border-white/10 focus:border-[#FF9D7A]/50 pl-10 text-white"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/80">
                            Contact number (optional)
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                              <Input
                                type="tel"
                                placeholder="+60 182133211"
                                className="bg-[#320F85]/40 border-white/10 focus:border-[#FF9D7A]/50 pl-10 text-white"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormDescription className="text-white/50 text-xs">
                            I'll only use this to contact you if necessary.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/80">
                            Message
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MessageSquare className="absolute left-3 top-3 text-white/40 w-4 h-4" />
                              <Textarea
                                placeholder="Tell me about your project or inquiry..."
                                className="resize-none bg-[#320F85]/40 border-white/10 focus:border-[#FF9D7A]/50 pl-10 text-white min-h-[120px]"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className={cn(
                        "w-full text-white bg-gradient-to-r from-[#FF9D7A] to-[#FFD166] hover:opacity-90 transition-all"
                      )}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </>
            )}
          </motion.div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white p-8 bg-[#320F85]/20 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl flex flex-col justify-between"
          >
            <div>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Need a <span className="text-[#FF9D7A]">Web Developer</span>?
                <br />
                Let's build something{" "}
                <span className="text-[#FFD166]">amazing</span> together.
              </h3>

              <p className="text-white/70 mb-8">
                I'm currently available for freelance work and exciting
                collaborations. Whether you need a website, web application, or
                have a creative project in mind, I'd love to help bring your
                vision to life.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4 border-b border-white/10 pb-2">
                Connect With Me
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all group"
                    whileHover={{ y: -2 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#320F85]/60 flex items-center justify-center group-hover:bg-[#FF9D7A]/20 transition-colors">
                      {link.icon}
                    </div>
                    <span className="font-medium">{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
