import { Inter } from "next/font/google";
import "./globals.css";
import "./custom.css";
import { PrimeReactProvider } from "primereact/api";
import { Toaster } from "@/components/ui";
import { Analytics } from "@vercel/analytics/react";
// import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title:
    "Ian Gan - Full Stack Developer Portfolio | Web Development & Software Engineering",
  description:
    "Explore Ian Gan's portfolio showcasing full-stack web development projects, software engineering skills, and professional journey. Specializing in React, Next.js, TypeScript, and modern web technologies.",
  keywords: [
    "Ian Gan",
    "Full Stack Developer",
    "Web Developer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "JavaScript",
    "Portfolio",
    "Web Development",
    "Frontend Developer",
    "Backend Developer",
    "UI/UX",
    "Responsive Design",
    "Software Engineering",
  ],
  authors: [{ name: "Ian Gan" }],
  creator: "Ian Gan",
  publisher: "Ian Gan",
  metadataBase: new URL("https://ian-gan.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ian-gan.vercel.app",
    title: "Ian Gan - Full Stack Developer Portfolio",
    description:
      "Explore Ian Gan's portfolio showcasing full-stack web development projects, software engineering skills, and professional journey.",
    siteName: "Ian Gan Portfolio",
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
    title: "Ian Gan - Full Stack Developer Portfolio",
    description:
      "Explore my portfolio showcasing full-stack web development projects and software engineering skills.",
    images: ["/Logo/android-chrome-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "_FFjqiZ81ovs7By86j2PL8yGgjMNzm3F19Y7GnOQjVA",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrimeReactProvider>
      <html lang="en">
        <head>
          {/* Google Site Verification */}
          <meta
            name="google-site-verification"
            content="_FFjqiZ81ovs7By86j2PL8yGgjMNzm3F19Y7GnOQjVA"
          />

          {/* Favicon */}
          <link
            rel="icon"
            href="/Logo/favicon-16x16.png"
            sizes="16x16"
            type="image/png"
          />
          <link
            rel="icon"
            href="/Logo/favicon-32x32.png"
            sizes="32x32"
            type="image/png"
          />
          <link rel="icon" href="/Logo/favicon.ico" type="image/x-icon" />

          {/* Apple Touch Icon */}
          <link rel="apple-touch-icon" href="/Logo/apple-touch-icon.png" />

          {/* Android Chrome Icons */}
          <link
            rel="icon"
            href="/Logo/android-chrome-192x192.png"
            sizes="192x192"
            type="image/png"
          />
          <link
            rel="icon"
            href="/Logo/android-chrome-512x512.png"
            sizes="512x512"
            type="image/png"
          />

          {/* JSON-LD Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Ian Gan",
                url: "https://ian-gan.vercel.app",
                image: "/Logo/android-chrome-512x512.png",
                jobTitle: "Full Stack Developer",
                description:
                  "Full Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies",
                sameAs: [
                  "https://www.linkedin.com/in/ian-gan-346547279/",
                  "https://github.com/Aiyern30",
                  "https://discord.gg/eEzxaxPR2d",
                ],
                knowsAbout: [
                  "Web Development",
                  "React",
                  "Next.js",
                  "TypeScript",
                  "JavaScript",
                  "Full Stack Development",
                  "Frontend Development",
                  "Backend Development",
                  "UI/UX Design",
                ],
              }),
            }}
          />
        </head>
        <body className={inter.className}>
          {/* <CustomCursor /> */}
          <Toaster />
          <Analytics />
          {children}
        </body>
      </html>
    </PrimeReactProvider>
  );
}
