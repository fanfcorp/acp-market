import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ACP Market - Agentic Commerce Protocol Directory",
    template: "%s | ACP Market"
  },
  description: "Discover and integrate Agentic Commerce Protocol (ACP) servers and clients. The premier directory for AI agent commerce tools, infrastructure, and automation solutions. Connect AI agents with payment systems, e-commerce platforms, and financial services.",
  keywords: [
    "Agentic Commerce Protocol",
    "ACP servers",
    "ACP clients", 
    "AI agent commerce",
    "agent payment systems",
    "AI agent e-commerce",
    "agentic commerce infrastructure",
    "AI agent automation",
    "agent commerce tools",
    "ACP protocol implementation",
    "AI agent marketplace",
    "agentic commerce directory",
    "AI agent integration",
    "commerce automation agents",
    "agentic commerce platform"
  ],
  authors: [{ name: "ACP Market" }],
  creator: "ACP Market",
  publisher: "ACP Market",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://acp-market-mt2lloch9-francois-goupils-projects.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://acp-market-mt2lloch9-francois-goupils-projects.vercel.app",
    title: "ACP Market - Agentic Commerce Protocol Directory",
    description: "Discover and integrate Agentic Commerce Protocol (ACP) servers and clients. The premier directory for AI agent commerce tools, infrastructure, and automation solutions.",
    siteName: "ACP Market",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ACP Market - Agentic Commerce Protocol Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ACP Market - Agentic Commerce Protocol Directory",
    description: "Discover and integrate Agentic Commerce Protocol (ACP) servers and clients. The premier directory for AI agent commerce tools.",
    images: ["/og-image.png"],
    creator: "@acpmarket",
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
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
