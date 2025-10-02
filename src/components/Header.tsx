"use client";

import Link from "next/link";
import { Globe, Sun, Zap } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">ACP</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ACP Market</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Browse All
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Categories
            </Link>
            <Link href="/leaderboard" className="text-gray-900 px-3 py-2 text-sm font-medium">
              Leaderboard
            </Link>
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Submit ACP</button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Power Your Agents
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-900" aria-label="Language">
              <Globe className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-900" aria-label="Theme">
              <Sun className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}


