import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Search, Star, Zap } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { StructuredData } from "@/components/StructuredData";
import { ServerLogo } from "@/components/ServerLogo";

export const revalidate = 60; // Revalidate every 60 seconds

async function getACPServers() {
  const servers = await prisma.aCPServer.findMany({
    where: {
      status: 'active'
    },
    include: {
      primaryCategory: true
    },
    orderBy: [
      { featured: 'desc' },        // Featured servers first
      { tier: 'desc' },            // Pro > Free
      { verified: 'desc' },        // Verified priority
      { stars: 'desc' },           // Community rating
      { createdAt: 'desc' }        // Newest first
    ],
    take: 24 // Get top 24 servers for homepage
  });
  return servers;
}

function ACPServerCard({ server }: { server: {
  id: string;
  name: string;
  description: string;
  logoUrl?: string | null;
  verified: boolean;
  featured: boolean;
  tier: string;
  tags: string[];
  stars: number;
  downloads: number;
  githubUrl?: string | null;
  website?: string | null;
  primaryCategory: {
    name: string;
    color?: string | null;
  };
} }) {
  const isPremium = server.tier === 'pro' || server.tier === 'featured';
  const isFeatured = server.featured || server.tier === 'featured';
  
  return (
    <div className={`bg-white dark:bg-gray-900 border rounded-lg p-4 hover:shadow-md transition-all duration-200 ${
      isPremium 
        ? 'border-yellow-400 bg-gradient-to-br from-yellow-50/30 to-orange-50/30 dark:from-yellow-900/10 dark:to-orange-900/10 shadow-md' 
        : 'border-gray-200 dark:border-gray-800'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ServerLogo 
            logoUrl={server.logoUrl}
            name={server.name}
            size="md"
          />
          <div>
            <div className="flex items-center gap-1">
              <div className="font-medium text-gray-900 dark:text-white text-sm">{server.name}</div>
              {isPremium && (
                <span className="text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
                  ⭐
                </span>
              )}
            </div>
            {server.verified && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600 dark:text-green-400">Verified</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
          <Star className="w-3 h-3 text-yellow-500 mr-1" /> 
          {server.stars.toLocaleString()}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
          {server.primaryCategory.name}
        </div>
        {isFeatured && (
          <div className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded text-xs font-medium">
            Featured
          </div>
        )}
      </div>
    </div>
  );
}

export default async function Home() {
  const servers = await getACPServers();
  
  // Group servers by different criteria
  const featuredServers = servers.filter(s => s.featured || s.tier === 'featured');
  const verifiedServers = servers.filter(s => s.verified);
  const topRatedServers = servers.sort((a, b) => b.stars - a.stars);
  const latestServers = servers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      <StructuredData 
        type="website" 
        data={{
          name: "ACP Market",
          description: "The premier directory for Agentic Commerce Protocol servers and clients"
        }} 
      />
      <StructuredData 
        type="organization" 
        data={{
          name: "ACP Market",
          description: "Agentic Commerce Protocol directory and marketplace"
        }} 
      />
      <StructuredData 
        type="itemList" 
        data={{
          name: "Featured Agentic Commerce Protocol Servers",
          description: "Top-rated ACP servers for AI agent commerce automation",
          url: "https://acp-market-mt2lloch9-francois-goupils-projects.vercel.app",
          items: servers.slice(0, 10)
        }} 
      />
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <div className="mb-8">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {servers.length} Agentic Commerce Protocol Servers · Updated: {new Date().toLocaleTimeString()}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            Discover Premium <span className="underline decoration-yellow-400">Agentic Commerce Protocol</span> Servers
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-3xl">
            The premier directory for Agentic Commerce Protocol (ACP) servers and clients. Connect AI agents with payment systems, e-commerce platforms, and financial services. Find the best AI agent commerce automation tools and infrastructure.
          </p>
          <div className="mt-5 relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Search Agentic Commerce Protocol servers, AI agent tools, payment systems..." 
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {["All", "Core Infrastructure", "Experience & Coordination", "Vertical Economies"].map(t => (
              <button 
                key={t} 
                className={`px-3 py-1 rounded-full border ${
                  t === "All" 
                    ? "bg-blue-600 text-white border-blue-600" 
                    : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-500"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Sections */}
        {[
          { title: "Featured Agentic Commerce Protocol Servers", servers: featuredServers.slice(0, 6), fallback: "No featured ACP servers yet" },
          { title: "Verified AI Agent Commerce Tools", servers: verifiedServers.slice(0, 6), fallback: "No verified commerce automation servers yet" },
          { title: "Top Rated ACP Infrastructure", servers: topRatedServers.slice(0, 6), fallback: "No rated ACP servers yet" },
          { title: "Latest Agentic Commerce Solutions", servers: latestServers.slice(0, 6), fallback: "No ACP servers submitted yet" },
        ].map((section, idx) => (
          <section key={section.title} className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{section.title}</h2>
              <Link 
                href="/categories" 
                className="text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-1 hover:border-blue-500"
              >
                View all
              </Link>
            </div>
            {section.servers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.servers.map((server) => (
                  <ACPServerCard key={`${idx}-${server.id}`} server={server} />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">{section.fallback}</p>
                <Link
                  href="/submit-acp"
                  className="inline-flex items-center mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit First Server
                </Link>
              </div>
            )}
          </section>
        ))}

        {/* Services CTA */}
        <section className="my-16">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm mb-6">
              <Zap className="w-4 h-4" />
              Professional Services
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Help with Agentic Commerce Protocol Integration?
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
              Our expert team can help you integrate Agentic Commerce Protocol (ACP) into your AI agent workflows with custom development, consulting, and ongoing support for AI agent commerce automation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Get Started →
              </Link>
              <Link
                href="/services#benefits"
                className="inline-flex items-center justify-center px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors font-medium border border-white/20"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
