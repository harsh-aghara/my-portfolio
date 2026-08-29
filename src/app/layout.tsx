import type { Metadata } from "next";
import { geistSans, jetBrainsMono } from "@/lib/fonts";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Harsh Aghara - Backend Engineer",
    template: "%s - Harsh Aghara",
  },
  description:
    "Backend engineer focused on concurrency, failure modes, and making systems reliable at scale. CSE at IIIT Pune.",
  metadataBase: new URL("https://harsh-aghara-portfolio.vercel.app"),
  openGraph: {
    title: "Harsh Aghara - Backend Engineer",
    description:
      "Backend engineer focused on concurrency, failure modes, and making systems reliable at scale.",
    url: "https://harsh-aghara-portfolio.vercel.app",
    siteName: "Harsh Aghara",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${jetBrainsMono.variable}`}
    >
      <body className="font-sans antialiased flex min-h-screen flex-col">
        <Nav />
        <main id="main" className="pt-16 flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
