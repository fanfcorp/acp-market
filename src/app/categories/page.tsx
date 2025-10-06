import Header from "@/components/Header";
import { ChevronRight } from "lucide-react";

const categories = [
  { name: "Developer Tools", count: 10233 },
  { name: "API Development", count: 7576 },
  { name: "Data Science & ML", count: 4725 },
  { name: "Other", count: 3762 },
  { name: "Productivity & Workflow", count: 3490 },
  { name: "Deployment & DevOps", count: 1711 },
  { name: "Web Scraping & Data Collection", count: 1400 },
  { name: "Analytics & Monitoring", count: 1372 },
  { name: "Database Management", count: 1266 },
  { name: "Security & Testing", count: 1217 },
  { name: "Learning & Documentation", count: 1157 },
  { name: "Cloud Infrastructure", count: 1000 },
  { name: "Collaboration Tools", count: 868 },
  { name: "Content Management", count: 571 },
  { name: "Design Tools", count: 353 },
  { name: "Browser Automation", count: 330 },
  { name: "Social Media Management", count: 269 },
  { name: "Game Development", count: 253 },
  { name: "Marketing Automation", count: 216 },
  { name: "E-commerce Solutions", count: 194 },
];

export default function CategoriesPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <span>Home</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 dark:text-white">Categories</span>
        </nav>

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Browse by <span className="underline decoration-yellow-400">Category</span></h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-3xl">
            Explore our comprehensive collection of ACP servers organized by category. Find the perfect ACP for your needs.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <a key={cat.name} href={`/categories/${encodeURIComponent(cat.name.toLowerCase())}`} className="block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Category</div>
                  <div className="mt-1 font-medium text-gray-900 dark:text-white">{cat.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-yellow-600 font-semibold">{cat.count.toLocaleString()}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">ACP servers</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}


