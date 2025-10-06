import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Search, Star, Zap } from "lucide-react";

const sampleCards = [
  { name: "Bright Data", tag: "Official", stars: 1387 },
  { name: "Firecrawl", tag: "Web Scraping & Data Collection", stars: 4195 },
  { name: "ElevenLabs", tag: "API Development", stars: 998 },
  { name: "Magic", tag: "Developer Tools", stars: 3741 },
  { name: "Browserbase", tag: "Browser Automation", stars: 2678 },
  { name: "Exa", tag: "API Development", stars: 2785 },
];

function Card({ title, tag, stars }: { title: string; tag: string; stars: number }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="font-medium text-gray-900">{title}</div>
        <div className="flex items-center text-gray-600 text-sm">
          <Star className="w-4 h-4 text-yellow-500 mr-1" /> {stars.toLocaleString()}
        </div>
      </div>
      <div className="mt-3 inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">{tag}</div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <div className="mb-8">
          <div className="text-sm text-gray-600 mb-3">15,062 Servers · Updated: 3 hours ago</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Find The Best <span className="underline decoration-yellow-400">Agent Tools</span></h1>
          <p className="mt-3 text-gray-600 max-w-3xl">Directory of awesome ACP servers and clients to connect AI agents with your favorite tools.</p>
          <div className="mt-5 relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input className="w-full border border-gray-300 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" placeholder="Search for ACP servers..." />
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {["All", "Developer Tools", "API Development", "Data Science & ML", "Other", "Productivity & Workflow"].map(t => (
              <button key={t} className={`px-3 py-1 rounded-full border ${t === "All" ? "bg-black text-white border-black" : "border-gray-300 text-gray-700"}`}>{t}</button>
            ))}
          </div>
        </div>

        {/* Sections */}
        {[
          { title: "Official ACP Servers" },
          { title: "Featured ACP Servers" },
          { title: "Top ACP Servers" },
          { title: "Latest ACP Servers" },
        ].map((section, idx) => (
          <section key={section.title} className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
              <Link href="/leaderboard" className="text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-1">View all</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sampleCards.slice(0, 6).map((c) => (
                <Card key={`${idx}-${c.name}`} title={c.name} tag={c.tag} stars={c.stars} />
              ))}
            </div>
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
              Need Help Integrating ACP?
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
              Our expert team can help you integrate ACP into your business with custom development, consulting, and ongoing support
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
