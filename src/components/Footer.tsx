import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">ACP</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ACP Market</span>
            </div>
            <p className="text-sm text-gray-600">
              The marketplace for AI Control Plane servers and professional services
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
                  Browse ACPs
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-gray-600 hover:text-gray-900">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-sm text-gray-600 hover:text-gray-900">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/submit-acp" className="text-sm text-gray-600 hover:text-gray-900">
                  Submit ACP
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Community
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/jobs" className="text-sm text-gray-600 hover:text-gray-900">
                  Jobs in AI
                </Link>
              </li>
              <li>
                <Link href="/jobs/post" className="text-sm text-gray-600 hover:text-gray-900">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/power-your-agents" className="text-sm text-gray-600 hover:text-gray-900">
                  Power Your Agents
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="text-sm text-gray-600 hover:text-gray-900">
                  Professional Services
                </Link>
              </li>
              <li>
                <Link href="/services#integration" className="text-sm text-gray-600 hover:text-gray-900">
                  ACP Integration
                </Link>
              </li>
              <li>
                <Link href="/services#consulting" className="text-sm text-gray-600 hover:text-gray-900">
                  Consulting
                </Link>
              </li>
              <li>
                <Link href="/services#support" className="text-sm text-gray-600 hover:text-gray-900">
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Ready to integrate ACP into your business?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Get expert help with integration, custom development, and ongoing support
            </p>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Get Started →
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2025 ACP Market. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
              Privacy
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
              Terms
            </a>
            <a href="mailto:contact@acp-market.com" className="text-sm text-gray-500 hover:text-gray-900">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

