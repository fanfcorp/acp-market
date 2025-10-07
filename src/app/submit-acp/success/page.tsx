import Header from "@/components/Header";
import { CheckCircle, Clock, Mail, ExternalLink } from "lucide-react";
import { Suspense } from "react";

function SuccessContent({ searchParams }: { searchParams: { session_id?: string } }) {
  const isPaymentSuccess = !!searchParams.session_id;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {isPaymentSuccess ? 'Payment Successful!' : 'Submission Received!'}
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {isPaymentSuccess 
              ? 'Your premium ACP listing has been activated and is now being reviewed. You&apos;ll receive an email confirmation shortly.'
              : 'Thank you for submitting your ACP server! We&apos;ll review your submission and get back to you soon.'
            }
          </p>

          {/* Next Steps */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">What happens next?</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Clock className="w-6 h-6 text-blue-600 mt-1" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Review Process</h3>
                  <p className="text-gray-600 mt-1">
                    {isPaymentSuccess 
                      ? 'Your premium listing will be reviewed within 12-24 hours.'
                      : 'Free listings are typically reviewed within 24-48 hours.'
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600 mt-1" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Email Notification</h3>
                  <p className="text-gray-600 mt-1">
                    We'll send you an email once your ACP is approved and live on the directory.
                  </p>
                </div>
              </div>

              {isPaymentSuccess && (
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <ExternalLink className="w-6 h-6 text-blue-600 mt-1" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">Premium Features</h3>
                    <p className="text-gray-600 mt-1">
                      Your ACP will get featured placement, analytics dashboard, and verified badge once approved.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/categories"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Other ACPs
            </Link>
            <a
              href="/submit-acp"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Submit Another ACP
            </a>
          </div>

          {/* Support */}
          <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Need help?</h3>
            <p className="text-blue-700 text-sm">
              If you have any questions about your submission, contact us at{' '}
              <a href="mailto:support@acp-market.com" className="underline hover:no-underline">
                support@acp-market.com
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function SubmitAcpSuccessPage({ searchParams }: { searchParams: { session_id?: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent searchParams={searchParams} />
    </Suspense>
  );
}
