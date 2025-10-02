import Header from "@/components/Header";

export default function PowerYourAgentsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">● Coming Soon</span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold text-gray-900">
            The Agent Infrastructure
            <br />
            <span className="underline decoration-yellow-400">You&apos;ve Been Waiting For</span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Connect your AI agents to the tools they need. Coming soon.
          </p>
          <div className="mt-6">
            <a href="#waitlist" className="inline-flex items-center justify-center px-5 py-2 rounded-md bg-gray-900 text-white text-sm hover:bg-gray-800">
              Join the waitlist for early access ↗
            </a>
          </div>
        </div>

        <section id="waitlist" className="mt-16">
          <div className="bg-white border border-gray-200 rounded-md p-6 max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold mb-2">Join the Waitlist</h2>
            <p className="text-sm text-gray-600 mb-4">Be the first to know when we launch!</p>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" placeholder="you@example.com" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">What tools do your agents need most?</label>
                <textarea placeholder="Tell us about the tools you&apos;d like to integrate (optional)" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-24 focus:outline-none focus:ring-2 focus:ring-gray-900" />
                <p className="mt-2 text-xs text-gray-500">This helps us prioritize integrations for our launch.</p>
              </div>
              <label className="flex items-start gap-2 text-xs text-gray-600">
                <input type="checkbox" className="mt-0.5" />
                I agree to receive product updates and announcements via email. You can unsubscribe at any time.
              </label>
              <button type="submit" className="w-full bg-gray-900 text-white rounded-md py-2 text-sm hover:bg-gray-800">Join Waitlist</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}


