import Header from "@/components/Header";
import { ChevronRight, Home as HomeIcon, Star, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LeaderboardPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <HomeIcon className="w-4 h-4" />
          <span>Home</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Leaderboard</span>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <Trophy className="w-8 h-8 text-yellow-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Top 100 ACP Servers</h1>
          </div>
          <div className="w-24 h-1 bg-yellow-400 mb-4" />
          <p className="text-lg text-gray-600 max-w-3xl">
            Explore the most popular ACP servers ranked by GitHub stars. Find the best open-source tools to connect AI to your favorite services.
          </p>
        </div>

        {/* Leaderboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Rank 1 - MindsDB */}
          <Link href="/servers/mindsdb" className="bg-white rounded-lg border border-gray-200 p-6 relative block hover:shadow-sm transition-shadow">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white font-bold">M</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">MindsDB</h3>
                <div className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span>36,230</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-4">Build AI applications that can learn and answer questions over large-scale federated...</p>
            <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Database Management</span>
          </Link>

          {/* Rank 2 - Context7 */}
          <Link href="/servers/context7" className="bg-white rounded-lg border border-gray-200 p-6 relative block hover:shadow-sm transition-shadow">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white font-bold">C</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">Context7</h3>
                <div className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span>32,268</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-4">Fetches up-to-date documentation and code examples for LLMs and AI code editors...</p>
            <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Learning & Documentation</span>
          </Link>

          {/* Rank 3 - GPT Researcher */}
          <Link href="/servers/gpt-researcher" className="bg-white rounded-lg border border-gray-200 p-6 relative block hover:shadow-sm transition-shadow">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center mr-4 overflow-hidden">
                <Image src="/api/placeholder/48/48" alt="GPT Researcher" width={48} height={48} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">GPT Researcher</h3>
                <div className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span>23,680</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-4">Conducts in-depth web and local research on any topic, generating comprehensive...</p>
            <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Data Science & ML</span>
          </Link>

          {/* Rank 4 - GitHub */}
          <Link href="/servers/github" className="bg-white rounded-lg border border-gray-200 p-6 relative block hover:shadow-sm transition-shadow">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mr-4">
                {/* GitHub icon placeholder using text since lucide brand icon may vary */}
                <span className="text-white font-bold">GH</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">GitHub</h3>
                <div className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span>23,192</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-4">Enables advanced automation and interaction capabilities with GitHub APIs for developers...</p>
          </Link>

          {/* Rank 5 - Task Master */}
          <Link href="/servers/task-master" className="bg-white rounded-lg border border-gray-200 p-6 relative block hover:shadow-sm transition-shadow">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold text-sm">5</div>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center mr-4 overflow-hidden">
                <Image src="/api/placeholder/48/48" alt="Task Master" width={48} height={48} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">Task Master</h3>
                <div className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span>22,473</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-4">Streamline AI-driven development workflows by automating task management with Claude.</p>
          </Link>

          {/* Rank 6 - Playwright */}
          <Link href="/servers/playwright" className="bg-white rounded-lg border border-gray-200 p-6 relative block hover:shadow-sm transition-shadow">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold text-sm">6</div>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center mr-4">
                <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
                  <div className="bg-red-500 w-2.5 h-2.5"></div>
                  <div className="bg-green-500 w-2.5 h-2.5"></div>
                  <div className="bg-blue-500 w-2.5 h-2.5"></div>
                  <div className="bg-yellow-500 w-2.5 h-2.5"></div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">Playwright</h3>
                <div className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span>21,074</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-4">Automates browser interactions for Large Language Models (LLMs) using Playwright.</p>
          </Link>
        </div>
      </main>
    </div>
  );
}


