import Header from "@/components/Header";
import Link from "next/link";
import { Star } from "lucide-react";

const servers = [
  { slug: "mindsdb", name: "MindsDB", stars: 36230, tag: "Database Management", badgeBg: "bg-gray-900", badgeText: "M" },
  { slug: "context7", name: "Context7", stars: 32268, tag: "Learning & Documentation", badgeBg: "bg-green-600", badgeText: "C" },
  { slug: "gpt-researcher", name: "GPT Researcher", stars: 23680, tag: "Data Science & ML", badgeBg: "bg-gray-300", badgeText: "IMG" },
  { slug: "github", name: "GitHub", stars: 23192, tag: "Developer Tools", badgeBg: "bg-gray-900", badgeText: "GH" },
  { slug: "task-master", name: "Task Master", stars: 22473, tag: "Automation", badgeBg: "bg-amber-600", badgeText: "IMG" },
  { slug: "playwright", name: "Playwright", stars: 21074, tag: "Testing", badgeBg: "bg-white border border-gray-200", badgeText: "PW" },
  { slug: "firecrawl", name: "Firecrawl", stars: 4195, tag: "Web Scraping & Data", badgeBg: "bg-orange-100 border border-orange-200", badgeText: "🔥" },
];

export default function ServersListPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Servers</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servers.map((s, idx) => (
            <Link
              href={`/servers/${s.slug}`}
              key={s.slug}
              className="bg-white rounded-lg border border-gray-200 p-6 relative hover:shadow-sm transition-shadow"
            >
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {idx + 1}
              </div>
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${s.badgeBg}`}>
                  <span className="text-white font-bold text-lg">{s.badgeText}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{s.name}</h3>
                  <div className="flex items-center text-gray-600">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span>{s.stars.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{s.tag}</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}


