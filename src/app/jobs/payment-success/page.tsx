import { Suspense } from 'react';
import Header from '@/components/Header';
import PaymentSuccessContent from '@/components/PaymentSuccessContent';
import { Loader2 } from 'lucide-react';

function PaymentSuccessLoading() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Loading...</h1>
          <p className="text-gray-600">Please wait</p>
        </div>
      </main>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<PaymentSuccessLoading />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
