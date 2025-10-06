import Header from '@/components/Header';
import Link from 'next/link';
import { CheckCircle, Clock, Mail } from 'lucide-react';

export default function JobSubmittedPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Job Posted Successfully!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for posting your job on ACP Market
          </p>
        </div>

        {/* What Happens Next */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            What Happens Next?
          </h2>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                1
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Review Process</h3>
                <p className="text-sm text-gray-600">
                  Our team will review your job posting to ensure it meets our guidelines and is relevant to the AI/ACP community.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                2
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Approval & Publishing</h3>
                <p className="text-sm text-gray-600">
                  Once approved, your job will be published on the jobs page and visible to thousands of AI professionals.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                3
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">30-Day Visibility</h3>
                <p className="text-sm text-gray-600">
                  Your job will remain active for 30 days, reaching over 100,000+ monthly visitors interested in AI and ACP technologies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Email Notification */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <div className="flex gap-3">
            <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Email Notification</h3>
              <p className="text-sm text-gray-700">
                We'll send you an email confirmation at the address you provided when your job is approved and goes live.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h3 className="font-medium text-gray-900 mb-3">Typical Timeline</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span><strong>Within 24 hours:</strong> Review and approval</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span><strong>After approval:</strong> Immediate publication on the jobs page</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span><strong>30 days:</strong> Your job remains active and visible</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/jobs"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Browse Other Jobs
          </Link>
          <Link
            href="/jobs/post"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Post Another Job
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </Link>
        </div>

        {/* Need Help */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            Questions or need help?{' '}
            <a href="mailto:jobs@acp-market.com" className="text-blue-600 hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}

