import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Journey | Ian Gan - Full Stack Developer",
  description:
    "Follow Ian Gan's professional journey in software development, from education to career milestones. Discover the path to becoming a full-stack developer.",
  keywords: [
    "Ian Gan Journey",
    "Developer Journey",
    "Career Path",
    "Software Development Journey",
    "Professional Journey",
    "Learning Path",
    "Developer Story",
    "Career Timeline",
    "Education",
    "Professional Growth",
  ],
  openGraph: {
    type: "website",
    title: "My Journey | Ian Gan Portfolio",
    description:
      "Follow Ian Gan's professional journey in software development, from education to career milestones.",
    url: "https://ian-gan.vercel.app/Journey",
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
    title: "My Journey | Ian Gan Portfolio",
    description: "Follow my professional journey in software development.",
    images: ["/Logo/android-chrome-512x512.png"],
  },
  alternates: {
    canonical: "/Journey",
  },
};

export default function JourneyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
