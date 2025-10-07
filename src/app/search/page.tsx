'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Search, Star, Github, Globe, ChevronRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface ACPServer {
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
  primaryCategory: {
    name: string;
    slug: string;
    color?: string;
  };
  _count: {
    reviews: number;
  };
}

interface SearchResponse {
  servers: ACPServer[];
  totalCount: number;
  hasMore: boolean;
  query: string;
  category: string;
}

function ACPServerCard({ server }: { server: ACPServer }) {
  const isPremium = server.tier === 'pro' || server.tier === 'featured';
  const isFeatured = server.featured || server.tier === 'featured';
  
  return (
    <div className={`bg-white dark:bg-gray-900 border rounded-lg p-6 hover:shadow-lg transition-all duration-200 ${
      isPremium 
        ? 'border-yellow-400 bg-gradient-to-br from-yellow-50/30 to-orange-50/30 dark:from-yellow-900/10 dark:to-orange-900/10 shadow-lg' 
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

      {/* Category and Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded text-xs">
          {server.primaryCategory.name}
        </span>
        {server.tags.slice(0, 2).map((tag: string) => (
          <span 
            key={tag}
            className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs"
          >
            #{tag}
          </span>
        ))}
        {server.tags.length > 2 && (
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs">
            +{server.tags.length - 2} more
          </span>
        )}
      </div>

      {/* Stats and Links */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            {server.stars.toLocaleString()}
          </div>
          <div>
            {server._count.reviews} reviews
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

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const search = async (searchQuery: string, searchCategory: string) => {
    setLoading(true);
    setError('');
    
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set('q', searchQuery);
      if (searchCategory) params.set('category', searchCategory);
      params.set('limit', '20');
      
      const response = await fetch(`/api/search?${params.toString()}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Search failed');
      }
      
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    search(query, category);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    search(query, newCategory);
  };

  useEffect(() => {
    if (query || category) {
      search(query, category);
    }
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-300">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 dark:text-white">Search</span>
        </nav>

        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Search ACP Servers
          </h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Search by name, description, or tags..." 
              />
            </div>
          </form>

          {/* Category Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange('')}
              className={`px-3 py-1 rounded-full text-sm border ${
                category === '' 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-500'
              }`}
            >
              All Categories
            </button>
            {['core-infrastructure', 'experience-coordination', 'vertical-economies'].map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1 rounded-full text-sm border ${
                  category === cat 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-500'
                }`}
              >
                {cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Searching...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {results && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {results.totalCount} results found
                {query && ` for "${query}"`}
                {category && ` in ${category}`}
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Sorted by featured, then stars
              </div>
            </div>

            {results.servers.length === 0 ? (
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Try adjusting your search terms or browse categories.
                </p>
                <Link
                  href="/categories"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse Categories
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.servers.map((server) => (
                  <ACPServerCard key={server.id} server={server} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
