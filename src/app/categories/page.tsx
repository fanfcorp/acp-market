import Header from "@/components/Header";
import { ChevronRight, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { StructuredData } from "@/components/StructuredData";
import { Metadata } from "next";

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: "ACP Server Categories - Agentic Commerce Protocol Directory",
  description: "Browse Agentic Commerce Protocol (ACP) server categories including Core Infrastructure, Experience & Coordination, and Vertical Economies. Find the perfect AI agent commerce tools for your needs.",
  keywords: [
    "ACP categories",
    "Agentic Commerce Protocol categories", 
    "AI agent commerce categories",
    "ACP server categories",
    "agentic commerce infrastructure",
    "AI agent automation categories",
    "commerce automation tools"
  ],
  openGraph: {
    title: "ACP Server Categories - Agentic Commerce Protocol Directory",
    description: "Browse Agentic Commerce Protocol (ACP) server categories including Core Infrastructure, Experience & Coordination, and Vertical Economies.",
    type: "website",
  },
};

async function getCategories() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          acpServers: {
            where: {
              status: 'active'
            }
          }
        }
      }
    },
    orderBy: {
      sortOrder: 'asc'
    }
  });
  return categories;
}

function CategoryCard({ category, count }: { category: {
  id: string;
  name: string;
  description?: string | null;
  icon?: string | null;
  color?: string | null;
  slug: string;
}; count: number }) {
  return (
    <a 
      href={`/categories/${category.slug}`} 
      className="block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg hover:border-blue-500/50 transition-all duration-200 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{category.icon}</div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Category</div>
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
              {category.name}
            </h3>
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
        {category.description}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: category.color || '#3b82f6' }}
          ></div>
          <span className="text-xs text-gray-500 dark:text-gray-400">Active</span>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-blue-600">{count}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">ACP servers</div>
        </div>
      </div>
    </a>
  );
}

function CategorySection({ title, categories }: { title: string; categories: {
  id: string;
  name: string;
  description?: string | null;
  icon?: string | null;
  color?: string | null;
  slug: string;
  _count: { acpServers: number };
}[] }) {
  if (categories.length === 0) return null;
  
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard 
            key={category.id} 
            category={category} 
            count={category._count.acpServers} 
          />
        ))}
      </div>
    </section>
  );
}

export default async function CategoriesPage() {
  const categories = await getCategories();
  
  // Group categories by their tier
  const coreInfrastructure = categories.filter(cat => 
    ['agent-infrastructure-apis', 'data-intelligence-automation', 'security-identity-trust', 'commerce-transaction-layer'].includes(cat.slug)
  );
  
  const experienceCoordination = categories.filter(cat => 
    ['cms-content-agents', 'design-marketing-creative-agents', 'productivity-workflow-agents', 'collaboration-governance'].includes(cat.slug)
  );
  
  const verticalEconomies = categories.filter(cat => 
    ['banking-financial-agents', 'insurance-risk-agents', 'ecommerce-retail-agents', 'legal-compliance-agents'].includes(cat.slug)
  );

  const totalServers = categories.reduce((sum, cat) => sum + cat._count.acpServers, 0);

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      <StructuredData 
        type="itemList" 
        data={{
          name: "Agentic Commerce Protocol Server Categories",
          description: "Complete directory of ACP server categories including Core Infrastructure, Experience & Coordination, and Vertical Economies",
          url: "https://acp-market-mt2lloch9-francois-goupils-projects.vercel.app/categories",
          items: categories
        }} 
      />
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <span>Home</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 dark:text-white">Categories</span>
        </nav>

        {/* Page header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Browse Agentic Commerce Protocol <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Categories</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mb-6">
            Discover Agentic Commerce Protocol (ACP) servers organized by specialized categories. From core infrastructure to vertical-specific solutions, find the perfect AI agent commerce tools for your automation needs.
          </p>
          
          {/* Stats */}
          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <span>{categories.length} Categories</span>
            <span>•</span>
            <span>{totalServers} Active ACP Servers</span>
            <span>•</span>
            <span>Updated daily</span>
          </div>
        </div>

        {/* Category Sections */}
        <CategorySection 
          title="🏗️ I. Core Infrastructure" 
          categories={coreInfrastructure} 
        />
        
        <CategorySection 
          title="🎯 II. Experience & Coordination" 
          categories={experienceCoordination} 
        />
        
        <CategorySection 
          title="🏢 III. Vertical Economies" 
          categories={verticalEconomies} 
        />

        {/* CTA Section */}
        <section className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Can&apos;t find what you&apos;re looking for?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Submit a new ACP server or request a category. Help us build the most comprehensive directory of agentic commerce tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/submit-acp"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Submit ACP Server
            </a>
            <a
              href="mailto:contact@acp-market.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors font-medium border border-white/20"
            >
              Request Category
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}


