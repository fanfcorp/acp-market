'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';

interface WaitlistEntry {
  id: string;
  email: string;
  tools: string | null;
  consent: boolean;
  createdAt: string;
}

export default function AdminWaitlistPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchEntries = async (key: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/waitlist?apiKey=${encodeURIComponent(key)}`);
      const data = await response.json();

      if (response.ok) {
        setEntries(data.entries);
        setIsAuthenticated(true);
        // Store API key in session storage for convenience
        sessionStorage.setItem('adminApiKey', key);
      } else {
        setError(data.error || 'Failed to fetch entries');
        setIsAuthenticated(false);
      }
    } catch {
      setError('Network error. Please try again.');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if API key is stored in session
    const storedKey = sessionStorage.getItem('adminApiKey');
    if (storedKey) {
      setApiKey(storedKey);
      fetchEntries(storedKey);
    } else {
      setLoading(false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEntries(apiKey);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminApiKey');
    setIsAuthenticated(false);
    setApiKey('');
    setEntries([]);
  };

  const exportToCSV = () => {
    const headers = ['Email', 'Tools Needed', 'Consent', 'Created At'];
    const rows = entries.map(entry => [
      entry.email,
      entry.tools || 'N/A',
      entry.consent ? 'Yes' : 'No',
      new Date(entry.createdAt).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white border border-gray-200 rounded-md p-6">
            <h1 className="text-2xl font-bold mb-4">Admin - Waitlist Entries</h1>
            <p className="text-sm text-gray-600 mb-4">
              Enter your admin API key to view waitlist entries.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="apiKey" className="block text-sm font-medium mb-1">
                  API Key
                </label>
                <input
                  id="apiKey"
                  type="password"
                  placeholder="Enter your admin API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 disabled:opacity-50"
                />
              </div>
              {error && (
                <div className="p-3 rounded-md text-sm bg-red-50 text-red-800 border border-red-200">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading || !apiKey}
                className="w-full bg-gray-900 text-white rounded-md py-2 text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : 'View Entries'}
              </button>
            </form>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Waitlist Entries ({entries.length})</h1>
          <div className="flex gap-2">
            <button
              onClick={exportToCSV}
              disabled={entries.length === 0}
              className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Export CSV
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700"
            >
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <div className="bg-white border border-gray-200 rounded-md p-8 text-center">
            <p className="text-gray-600">Loading entries...</p>
          </div>
        ) : entries.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-md p-8 text-center">
            <p className="text-gray-600">No waitlist entries yet.</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tools Needed
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Consent
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {entries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{entry.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {entry.tools ? (
                          <div className="max-w-xs truncate" title={entry.tools}>
                            {entry.tools}
                          </div>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            entry.consent
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {entry.consent ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(entry.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

