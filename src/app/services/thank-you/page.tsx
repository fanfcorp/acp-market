import Header from '@/components/Header';
import Link from 'next/link';
import { CheckCircle, Mail, Clock } from 'lucide-react';

export default function ServiceThankYouPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Request Submitted Successfully!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your interest in our professional services
          </p>
        </div>

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
                <h3 className="font-medium text-gray-900 mb-1">Initial Review</h3>
                <p className="text-sm text-gray-600">
                  Our team will review your request and assess the scope of your project
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                2
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Personal Contact</h3>
                <p className="text-sm text-gray-600">
                  We&apos;ll reach out within 24 hours to discuss your needs and provide a preliminary assessment
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                3
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Proposal & Timeline</h3>
                <p className="text-sm text-gray-600">
                  If it&apos;s a good fit, we&apos;ll prepare a detailed proposal with timeline and pricing
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex gap-3">
            <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Check Your Email</h3>
              <p className="text-sm text-gray-700">
                We&apos;ve sent a confirmation email to the address you provided. If you don&apos;t see it, please check your spam folder.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            View Services
          </Link>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            Questions?{' '}
            <a href="mailto:services@acp-market.com" className="text-blue-600 hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}

