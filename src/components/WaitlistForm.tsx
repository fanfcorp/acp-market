'use client';

import { useState, FormEvent } from 'react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [tools, setTools] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          tools,
          consent,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message || 'Successfully joined the waitlist!' });
        // Reset form
        setEmail('');
        setTools('');
        setConsent(false);
      } else {
        setMessage({ type: 'error', text: data.error || 'Something went wrong. Please try again.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && (
        <div
          className={`p-3 rounded-md text-sm ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
      
      <div>
        <label htmlFor="tools" className="block text-sm font-medium mb-1">
          What tools do your agents need most?
        </label>
        <textarea
          id="tools"
          placeholder="Tell us about the tools you'd like to integrate (optional)"
          value={tools}
          onChange={(e) => setTools(e.target.value)}
          disabled={isSubmitting}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-24 focus:outline-none focus:ring-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <p className="mt-2 text-xs text-gray-500">
          This helps us prioritize integrations for our launch.
        </p>
      </div>
      
      <label className="flex items-start gap-2 text-xs text-gray-600">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          disabled={isSubmitting}
          className="mt-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        I agree to receive product updates and announcements via email. You can unsubscribe at any time.
      </label>
      
      <button
        type="submit"
        disabled={isSubmitting || !email}
        className="w-full bg-gray-900 text-white rounded-md py-2 text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
      >
        {isSubmitting ? 'Joining...' : 'Join Waitlist'}
      </button>
    </form>
  );
}

