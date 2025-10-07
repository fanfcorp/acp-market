import Header from "@/components/Header";
import { ChevronRight, Star, Github, Globe, Tag } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export const revalidate = 60; // Revalidate every 60 seconds

async function getCategory(slug: string) {
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      acpServers: {
        where: {
          status: 'active'
        },
        orderBy: [
          { featured: 'desc' },        // Featured tier first
          { tier: 'desc' },            // Pro > Free
          { verified: 'desc' },        // Verified priority
          { stars: 'desc' },           // Community rating
          { createdAt: 'desc' }        // Newest first
        ]
      },
      _count: {
        select: {
          acpServers: {
            where: {
              status: 'active'
            }
          }
        }
      }
    }
  });
  return category;
}

function ACPServerCard({ server }: { server: {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  verified: boolean;
  featured: boolean;
  tier: string;
  tags: string[];
  protocolSupport: string[];
  stars: number;
  downloads: number;
  githubUrl?: string;
  website?: string;
} }) {
  const isPremium = server.tier === 'pro' || server.tier === 'featured';
  const isFeatured = server.featured || server.tier === 'featured';
  
  return (
    <div className={`bg-white dark:bg-gray-900 border rounded-lg p-6 hover:shadow-lg transition-all duration-200 ${
      isPremium 
        ? 'border-gradient-to-r from-yellow-400 to-orange-500 bg-gradient-to-br from-yellow-50/30 to-orange-50/30 dark:from-yellow-900/10 dark:to-orange-900/10 shadow-lg' 
        : 'border-gray-200 dark:border-gray-800 hover:border-blue-500/50'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {server.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={server.logoUrl} 
              alt={`${server.name} logo`}
              className="w-12 h-12 rounded-lg object-contain bg-gray-50 dark:bg-gray-800 p-2"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
              {server.name.charAt(0)}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">{server.name}</h3>
              {isPremium && (
                <span className="text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
                  ⭐ PREMIUM
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              {server.verified && (
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600 dark:text-green-400">Verified</span>
                </div>
              )}
              {isFeatured && (
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs text-yellow-600 dark:text-yellow-400">Featured</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-1">
          {isPremium && (
            <div className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded text-xs font-bold text-center">
              {server.tier.toUpperCase()}
            </div>
          )}
          {isFeatured && !isPremium && (
            <div className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded text-xs font-medium">
              Featured
            </div>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
        {server.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {server.tags.slice(0, 3).map((tag: string) => (
          <span 
            key={tag}
            className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded text-xs"
          >
            #{tag}
          </span>
        ))}
        {server.tags.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs">
            +{server.tags.length - 3} more
          </span>
        )}
      </div>

      {/* Protocol Support */}
      <div className="flex flex-wrap gap-1 mb-4">
        {server.protocolSupport.map((protocol: string) => (
          <span 
            key={protocol}
            className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs"
          >
            {protocol}
          </span>
        ))}
      </div>

      {/* Stats and Links */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            {server.stars.toLocaleString()}
          </div>
          <div>
            {server.downloads.toLocaleString()} downloads
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {server.githubUrl && (
            <a 
              href={server.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title="View on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {server.website && (
            <a 
              href={server.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title="Visit website"
            >
              <Globe className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await getCategory(params.slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-300">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/categories" className="hover:text-gray-700 dark:hover:text-gray-300">Categories</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 dark:text-white">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">{category.icon}</div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                {category.name}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: category.color }}
                ></div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {category._count.acpServers} ACP servers
                </span>
              </div>
            </div>
          </div>
          
          {category.description && (
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
              {category.description}
            </p>
          )}
        </div>

        {/* ACP Servers */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              ACP Servers
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>{category.acpServers.length} servers</span>
              <span>•</span>
              <span>Sorted by featured, then stars</span>
            </div>
          </div>

          {category.acpServers.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Tag className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No ACP servers yet
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Be the first to submit an ACP server in this category.
              </p>
              <Link
                href="/submit-acp"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit ACP Server
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.acpServers.map((server) => (
                <ACPServerCard key={server.id} server={server} />
              ))}
            </div>
          )}
        </div>

        {/* Related Categories */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Explore Related Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* This would show related categories - for now, show a few key ones */}
            <Link 
              href="/categories"
              className="block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:shadow-md hover:border-blue-500/50 transition-all duration-200"
            >
              <div className="text-2xl mb-2">🏗️</div>
              <h3 className="font-medium text-gray-900 dark:text-white">Core Infrastructure</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Foundation tools and APIs
              </p>
            </Link>
            
            <Link 
              href="/categories"
              className="block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:shadow-md hover:border-blue-500/50 transition-all duration-200"
            >
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-medium text-gray-900 dark:text-white">Experience & Coordination</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                User-facing agents
              </p>
            </Link>
            
            <Link 
              href="/categories"
              className="block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:shadow-md hover:border-blue-500/50 transition-all duration-200"
            >
              <div className="text-2xl mb-2">🏢</div>
              <h3 className="font-medium text-gray-900 dark:text-white">Vertical Economies</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Industry-specific solutions
              </p>
            </Link>
            
            <Link 
              href="/submit-acp"
              className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-4 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              <div className="text-2xl mb-2">➕</div>
              <h3 className="font-medium">Submit ACP Server</h3>
              <p className="text-sm text-blue-100 mt-1">
                Add your server to the directory
              </p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
