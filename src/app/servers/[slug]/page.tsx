import Header from "@/components/Header";
import { ChevronRight, Github, Share2 } from "lucide-react";

export default function ServerDetailPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const isFirecrawl = slug === "firecrawl";

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <span className="mr-2">Home</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="mr-2">Servers</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 font-medium capitalize">{slug}</span>
        </nav>

        {/* Header section */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-md bg-orange-100 border border-orange-200 flex items-center justify-center mr-3">
              <span className="text-xl">🔥</span>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-semibold text-gray-900">{isFirecrawl ? "Firecrawl" : slug}</h1>
                <span className="text-sm text-gray-500">by mendableai</span>
                <span className="text-sm text-yellow-600">★ 4,195</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "Web Scraping & Data Collection",
                  "Developer Tools",
                  "API Development",
                  "Official",
                ].map((b) => (
                  <span
                    key={b}
                    className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-gray-700 max-w-3xl">
                Empowers LLMs with advanced web scraping capabilities for content extraction,
                crawling, and search functionalities.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="hidden md:block w-64">
            <div className="space-y-2">
              <button className="w-full flex items-center justify-center gap-2 border rounded-md py-2 text-sm bg-white">
                <Share2 className="w-4 h-4" /> Share
              </button>
              <a
                className="w-full flex items-center justify-center gap-2 border rounded-md py-2 text-sm bg-white"
                href="https://github.com/mendableai/firecrawl" target="_blank" rel="noreferrer"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a
                className="w-full flex items-center justify-center gap-2 border rounded-md py-2 text-sm bg-white"
                href="https://www.npmjs.com/package/@mendable/firecrawl" target="_blank" rel="noreferrer"
              >
                NPM
              </a>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex gap-6 text-sm">
            <button className="py-2 px-1 text-gray-900 border-b-2 border-gray-900">About</button>
            <button className="py-2 px-1 text-gray-500">README</button>
            <button className="py-2 px-1 text-gray-500">FAQ</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-md p-5 mb-6">
              <h2 className="text-lg font-semibold mb-3">About</h2>
              <p className="text-gray-700 text-sm leading-6">
                Firecrawl integrates seamlessly with LLM clients like Cursor and Claude, providing powerful web scraping features. It supports scraping, crawling, searching, and extracting content with JavaScript rendering and efficient batch processing.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-md p-5 mb-6">
              <h3 className="text-base font-semibold mb-3">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 text-sm text-gray-700">
                <div>• Web scraping with JS rendering</div>
                <div>• URL discovery and crawling</div>
                <div>• Web search with content extraction</div>
                <div>• Efficient batch processing with built-in rate limiting</div>
                <div>• Comprehensive logging system</div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-md p-5">
              <h3 className="text-base font-semibold mb-3">Use Cases</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 text-sm text-gray-700">
                <div>• Enhance LLM context with real-time web data</div>
                <div>• Automate data collection from multiple websites</div>
                <div>• Extract structured information from web pages for analysis</div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-md p-4">
              <button className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-md py-2 text-sm">
                Try Now ↗
              </button>
            </div>
            <div className="bg-white border border-gray-200 rounded-md p-4">
              <h4 className="text-sm font-semibold mb-3">Similar Tools</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>Browserbase</li>
                <li>YouTube</li>
                <li>Google CSE</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


