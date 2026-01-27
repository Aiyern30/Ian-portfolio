import { Inter } from "next/font/google";
import "./globals.css";
import "./custom.css";
import { PrimeReactProvider } from "primereact/api";
import { Toaster } from "@/components/ui";
import { Analytics } from "@vercel/analytics/next";
// import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ian's Portfolio",
  description: "Created by Ian",
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
