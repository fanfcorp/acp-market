import Header from '@/components/Header';
import PostJobForm from '@/components/PostJobForm';
import Link from 'next/link';

export default function PostJobPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Link */}
        <Link
          href="/jobs"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          ← Back to Jobs
        </Link>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Post a Job</h1>
        </div>

        {/* Benefits Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold mb-3">Reach the Right Audience</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">✓</span>
              <span><strong>100,000+ monthly visitors</strong> building the future of commerce with AI and ACP</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">✓</span>
              <span><strong>Highly targeted traffic</strong> of developers and AI professionals</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <PostJobForm />
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Need help? Contact us at{' '}
            <a href="mailto:jobs@acp-market.com" className="text-blue-600 hover:underline">
              jobs@acp-market.com
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}

