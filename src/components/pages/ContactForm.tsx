import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input, Textarea } from "@/components/ui";
import { useToast } from "@/hooks/use-toast";
import emailjs from "emailjs-com";
import { cn } from "@/lib/utils";

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

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    <div className="container mx-auto py-10 px-4 sm:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white bg-opacity-5 p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            Contact Us
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">First name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John"
                          className="bg-[#2d1a46] border-gray-600 text-white"
                          {...field}
                        />
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
                      <FormLabel className="text-white">Last name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Doe"
                          className="bg-[#2d1a46] border-gray-600 text-white"
                          {...field}
                        />
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
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="johndoe@example.com"
                        className="bg-[#2d1a46] border-gray-600 text-white"
                        {...field}
                      />
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
                    <FormLabel className="text-white">
                      Contact number (optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+60 182133211"
                        className="bg-[#2d1a46] border-gray-600 text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-400">
                      We'll only use this to contact you if necessary.
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
                    <FormLabel className="text-white">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your message here."
                        className="resize-none bg-[#2d1a46] border-gray-600 text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className={cn(
                  "w-full text-white bg-purple-600 hover:bg-purple-700"
                )}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send message"}
              </Button>
            </form>
          </Form>
        </div>

        {/* Additional Information */}
        <div className="text-white p-8 bg-white bg-opacity-5 rounded-lg shadow-md">
          <h2 className="text-5xl sm:text-7xl font-bold mb-4">
            Need a Web Developer? Let's build something.
          </h2>

          <div className="space-y-3">
            <div>
              <a
                href="https://github.com/Aiyern30"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                + GITHUB
              </a>
            </div>
            <div>
              <a
                href="https://www.linkedin.com/in/ian-gan-346547279/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                + LINKEDIN
              </a>
            </div>
            <div>
              <a
                href="https://www.instagram.com/_aiyern_/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                + INSTAGRAM
              </a>
            </div>
            <div>
              <a
                href="https://discord.gg/eEzxaxPR2d"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                + DISCORD
              </a>
            </div>
            <div>
              <a
                href="https://wa.me/+60182133211?text='Type%20your%20message%20here%20%3A'"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                + WHATSAPP
              </a>
            </div>
            <div>
              <a
                href="https://github.com/Aiyern30/Ian-portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                + SOURCE
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
