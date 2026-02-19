import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Ian Gan - Full Stack Developer Portfolio",
  description:
    "Explore Ian Gan's web development projects including React applications, Next.js websites, and full-stack solutions. View interactive project showcase and technical implementations.",
  keywords: [
    "Ian Gan Projects",
    "Web Development Projects",
    "React Projects",
    "Next.js Projects",
    "Full Stack Projects",
    "Portfolio Projects",
    "Software Development",
    "Programming Projects",
    "Interactive Projects",
    "Code Projects",
  ],
  openGraph: {
    type: "website",
    title: "Projects | Ian Gan Portfolio",
    description:
      "Explore Ian Gan's web development projects including React applications, Next.js websites, and full-stack solutions.",
    url: "https://ian-gan.vercel.app/Projects",
    images: [
      {
        url: "/Logo/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Ian Gan Portfolio Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Projects | Ian Gan Portfolio",
    description:
      "Explore my web development projects and technical implementations.",
    images: ["/Logo/android-chrome-512x512.png"],
  },
  alternates: {
    canonical: "/Projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
