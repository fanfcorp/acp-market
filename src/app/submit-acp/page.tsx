import Header from "@/components/Header";
import { Star } from "lucide-react";

export default function SubmitAcpPage() {
  const popular = [
    { name: "MindsDB", tag: "Database Management", stars: 36230 },
    { name: "Context7", tag: "Learning & Documentation", stars: 32268 },
    { name: "GPT Researcher", tag: "Data Science & ML", stars: 23680 },
    { name: "GitHub", tag: "API Development", stars: 23192 },
    { name: "Task Master", tag: "Developer Tools", stars: 22473 },
    { name: "Playwright", tag: "Security & Testing", stars: 21074 },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900">Submit an <span className="underline decoration-yellow-400">ACP Server</span></h1>
          <p className="mt-4 text-gray-600">Have an ACP server you&apos;d like to feature? Submit the related GitHub repository below and we&apos;ll review it for inclusion.</p>
          <form className="mt-6 flex items-center gap-3">
            <input type="url" placeholder="https://github.com/username/repository" className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
            <button className="px-4 py-2 rounded-md bg-gray-900 text-white text-sm">Submit</button>
          </form>
          <p className="mt-2 text-xs text-gray-500">Enter the full URL to the GitHub repository for the ACP you&apos;d like to submit</p>
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 text-center">Popular ACP Servers</h2>
          <p className="text-sm text-gray-600 text-center mt-1">Discover what others are building with ACP</p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {popular.map((c) => (
              <div key={c.name} className="bg-white border border-gray-200 rounded-lg p-5">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-gray-900">{c.name}</div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" /> {c.stars.toLocaleString()}
                  </div>
                </div>
                <div className="mt-3 inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">{c.tag}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}


