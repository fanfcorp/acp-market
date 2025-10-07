'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function PostJobForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    companyLogoUrl: '',
    location: '',
    workLocation: 'On-site',
    jobType: 'Full Time',
    salaryRange: '',
    applicationUrl: '',
    description: '',
    requirements: '',
    benefits: '',
    contactEmail: '',
    companyWebsite: '',
    tags: [] as string[],
    listingType: 'standard' as 'standard' | 'premium' | 'featured',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      // Create Stripe checkout session for payment
      const response = await fetch('/api/jobs/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.checkoutUrl) {
          // Redirect to Stripe checkout
          setMessage({ type: 'success', text: 'Redirecting to payment...' });
          window.location.href = data.checkoutUrl;
        } else {
          // Free listing - no payment needed
          setMessage({ type: 'success', text: 'Job posted successfully! Redirecting...' });
          setTimeout(() => {
            router.push('/jobs/submitted');
          }, 1500);
        }
      } else {
        setMessage({ type: 'error', text: data.error || 'Something went wrong. Please try again.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {message && (
        <div
          className={`p-4 rounded-md text-sm ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Step Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          type="button"
          onClick={() => setStep(1)}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            step === 1
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          📋 Job Details
        </button>
        <button
          type="button"
          onClick={() => setStep(2)}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            step === 2
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          🏢 Company Info
        </button>
        <button
          type="button"
          onClick={() => setStep(3)}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            step === 3
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          📝 Listing Type
        </button>
      </div>

      {/* Step 1: Job Details */}
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            📋 Job Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium mb-2">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                id="jobTitle"
                name="jobTitle"
                type="text"
                placeholder="e.g., Senior MCP Developer"
                value={formData.jobTitle}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
              />
            </div>

            <div>
              <label htmlFor="companyName" className="block text-sm font-medium mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                placeholder="e.g., Acme Corp"
                value={formData.companyName}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="e.g., San Francisco, CA or Remote"
                value={formData.location}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
              />
            </div>

            <div>
              <label htmlFor="workLocation" className="block text-sm font-medium mb-2">
                Work Location <span className="text-red-500">*</span>
              </label>
              <select
                id="workLocation"
                name="workLocation"
                value={formData.workLocation}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
              >
                <option value="On-site">On-site</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label htmlFor="jobType" className="block text-sm font-medium mb-2">
                Job Type <span className="text-red-500">*</span>
              </label>
              <select
                id="jobType"
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div>
              <label htmlFor="salaryRange" className="block text-sm font-medium mb-2">
                Salary Range
              </label>
              <input
                id="salaryRange"
                name="salaryRange"
                type="text"
                placeholder="e.g., $120k - $180k"
                value={formData.salaryRange}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="applicationUrl" className="block text-sm font-medium mb-2">
              Application URL <span className="text-red-500">*</span>
            </label>
            <input
              id="applicationUrl"
              name="applicationUrl"
              type="text"
              placeholder="yourcompany.com/apply or https://yourcompany.com/apply"
              value={formData.applicationUrl}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
            />
            <p className="mt-1 text-xs text-gray-500">Where candidates should apply (https:// will be added automatically)</p>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe the role, responsibilities, and what makes it exciting..."
              value={formData.description}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              rows={6}
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="requirements" className="block text-sm font-medium mb-2">
              Requirements
            </label>
            <textarea
              id="requirements"
              name="requirements"
              placeholder="List the key requirements and qualifications..."
              value={formData.requirements}
              onChange={handleChange}
              disabled={isSubmitting}
              rows={6}
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="benefits" className="block text-sm font-medium mb-2">
              Benefits
            </label>
            <textarea
              id="benefits"
              name="benefits"
              placeholder="Describe the benefits, perks, and compensation..."
              value={formData.benefits}
              onChange={handleChange}
              disabled={isSubmitting}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
            />
          </div>
        </div>
      )}

      {/* Step 2: Company Info */}
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🏢 Company Info
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium mb-2">
                Contact Email <span className="text-red-500">*</span>
              </label>
              <input
                id="contactEmail"
                name="contactEmail"
                type="email"
                placeholder="hiring@company.com"
                value={formData.contactEmail}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
              />
              <p className="mt-1 text-xs text-gray-500">For job posting notifications (not shown publicly)</p>
            </div>

            <div>
              <label htmlFor="companyWebsite" className="block text-sm font-medium mb-2">
                Company Website
              </label>
              <input
                id="companyWebsite"
                name="companyWebsite"
                type="url"
                placeholder="https://company.com"
                value={formData.companyWebsite}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="companyLogoUrl" className="block text-sm font-medium mb-2">
              Company Logo URL
            </label>
            <input
              id="companyLogoUrl"
              name="companyLogoUrl"
              type="url"
              placeholder="https://example.com/logo.png"
              value={formData.companyLogoUrl}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
            />
            <p className="mt-1 text-xs text-gray-500">Optional: URL to your company logo</p>
          </div>
        </div>
      )}

      {/* Step 3: Listing Type */}
      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            📝 Listing Type
          </h2>
          
          <div className="space-y-4">
            {/* Standard Listing */}
            <label className={`block cursor-pointer ${formData.listingType === 'standard' ? 'ring-2 ring-blue-600' : ''}`}>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="listingType"
                    value="standard"
                    checked={formData.listingType === 'standard'}
                    onChange={handleChange}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">Standard Listing</h3>
                    </div>
                    <div className="text-2xl font-bold text-blue-600 mb-2">$49</div>
                    <p className="text-sm text-gray-700 mb-4">
                      Your job will appear in the main job feed
                    </p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">✓</span>
                        <span>Standard visibility in job listings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">✓</span>
                        <span>30-day listing duration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">✓</span>
                        <span>Basic company logo support</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </label>

            {/* Premium Listing */}
            <label className={`block cursor-pointer ${formData.listingType === 'premium' ? 'ring-2 ring-green-600' : ''}`}>
              <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="listingType"
                    value="premium"
                    checked={formData.listingType === 'premium'}
                    onChange={handleChange}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">Premium Listing</h3>
                      <span className="text-lg">⭐</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600 mb-2">$89 for 30 days</div>
                    <p className="text-sm text-gray-700 mb-4">
                      Enhanced visibility with premium features
                    </p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span>Premium positioning in listings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span>⭐ PREMIUM badge</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span>Highlighted background</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span>2x more views on average</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span>Enhanced company profile</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </label>

            {/* Featured Listing */}
            <label className={`block cursor-pointer ${formData.listingType === 'featured' ? 'ring-2 ring-purple-600' : ''}`}>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="listingType"
                    value="featured"
                    checked={formData.listingType === 'featured'}
                    onChange={handleChange}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">Featured Listing</h3>
                      <span className="text-lg">✨</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600 mb-2">$149 for 30 days</div>
                    <p className="text-sm text-gray-700 mb-4">
                      Maximum visibility with all premium features
                    </p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-0.5">✓</span>
                        <span>Top placement in job listings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-0.5">✓</span>
                        <span>FEATURED badge + premium styling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-0.5">✓</span>
                        <span>Featured in weekly newsletter</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-0.5">✓</span>
                        <span>3x more views on average</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-0.5">✓</span>
                        <span>Custom banner image support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-0.5">✓</span>
                        <span>Priority customer support</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </label>
          </div>

          {/* Payment Notice */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-start gap-3">
            <span className="text-xl">ℹ️</span>
            <p className="text-sm text-gray-700">
              You will be redirected to Stripe to complete the payment. Your job will be published immediately after successful payment.
            </p>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1 || isSubmitting}
          className="px-6 py-2.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {step < 3 ? (
          <button
            type="button"
            onClick={() => setStep(Math.min(3, step + 1))}
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting || !formData.jobTitle || !formData.companyName || !formData.contactEmail}
            className="px-6 py-2.5 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? 'Processing...' : (
              <>
                <span>💳</span>
                <span>Proceed to Payment</span>
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
}

