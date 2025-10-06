'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Link from 'next/link';
import { CheckCircle, Loader2 } from 'lucide-react';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [jobSlug, setJobSlug] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    const jobId = searchParams.get('job_id');

    if (!sessionId || !jobId) {
      setStatus('error');
      return;
    }

    // Verify payment with backend
    fetch(`/api/jobs/verify-payment?session_id=${sessionId}&job_id=${jobId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus('success');
          setJobSlug(data.slug);
        } else {
          setStatus('error');
        }
      })
      .catch(() => {
        setStatus('error');
      });
  }, [searchParams]);

  if (status === 'loading') {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Verifying Payment...</h1>
            <p className="text-gray-600">Please wait while we confirm your payment</p>
          </div>
        </main>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-red-600 text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Payment Verification Failed</h1>
            <p className="text-gray-600 mb-6">
              We couldn&apos;t verify your payment. Please contact support if you were charged.
            </p>
            <Link
              href="/jobs/post"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800"
            >
              Try Again
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-600">
            Your job posting is now live
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-6">
          <h2 className="text-xl font-semibold mb-4">What&apos;s Next?</h2>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold text-sm">
                ✓
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Job Published</h3>
                <p className="text-sm text-gray-600">
                  Your job is now live on ACP Market and visible to thousands of candidates
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold text-sm">
                ✓
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Payment Confirmed</h3>
                <p className="text-sm text-gray-600">
                  A receipt has been sent to your email address
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                30
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">30-Day Visibility</h3>
                <p className="text-sm text-gray-600">
                  Your job will remain active for 30 days, reaching over 100,000+ monthly visitors
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {jobSlug && (
            <Link
              href={`/jobs/${jobSlug}`}
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800"
            >
              View Your Job Posting
            </Link>
          )}
          <Link
            href="/jobs"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50"
          >
            Browse All Jobs
          </Link>
        </div>
      </main>
    </div>
  );
}

