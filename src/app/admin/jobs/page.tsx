'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';

interface Job {
  id: string;
  slug: string;
  jobTitle: string;
  companyName: string;
  location: string;
  workLocation: string;
  jobType: string;
  status: string;
  createdAt: string;
  expiresAt: string | null;
}

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchJobs = async (key: string) => {
    setLoading(true);
    setError(null);

    try {
      const url = statusFilter === 'all'
        ? `/api/jobs?apiKey=${encodeURIComponent(key)}`
        : `/api/jobs?apiKey=${encodeURIComponent(key)}&status=${statusFilter}`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setJobs(data.jobs);
        setIsAuthenticated(true);
        sessionStorage.setItem('adminApiKey', key);
      } else {
        setError(data.error || 'Failed to fetch jobs');
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
    const storedKey = sessionStorage.getItem('adminApiKey');
    if (storedKey) {
      setApiKey(storedKey);
      fetchJobs(storedKey);
    } else {
      setLoading(false);
    }
  }, [statusFilter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs(apiKey);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminApiKey');
    setIsAuthenticated(false);
    setApiKey('');
    setJobs([]);
  };

  const handleApprove = async (jobId: string) => {
    if (!apiKey) return;
    
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey, status: 'published', publishedAt: new Date() }),
      });

      if (response.ok) {
        fetchJobs(apiKey);
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to approve job');
      }
    } catch {
      alert('Network error');
    }
  };

  const handleReject = async (jobId: string) => {
    if (!apiKey || !confirm('Are you sure you want to reject this job?')) return;
    
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey }),
      });

      if (response.ok) {
        fetchJobs(apiKey);
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete job');
      }
    } catch {
      alert('Network error');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white border border-gray-200 rounded-md p-6">
            <h1 className="text-2xl font-bold mb-4">Admin - Job Postings</h1>
            <p className="text-sm text-gray-600 mb-4">
              Enter your admin API key to manage job postings.
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
                {loading ? 'Loading...' : 'View Jobs'}
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
          <h1 className="text-2xl font-bold">Job Postings ({jobs.length})</h1>
          <div className="flex gap-2">
            <Link
              href="/admin/waitlist"
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
            >
              View Waitlist
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Status Filter */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-md text-sm ${
              statusFilter === 'all'
                ? 'bg-gray-900 text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-4 py-2 rounded-md text-sm ${
              statusFilter === 'pending'
                ? 'bg-gray-900 text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setStatusFilter('published')}
            className={`px-4 py-2 rounded-md text-sm ${
              statusFilter === 'published'
                ? 'bg-gray-900 text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Published
          </button>
        </div>

        {loading ? (
          <div className="bg-white border border-gray-200 rounded-md p-8 text-center">
            <p className="text-gray-600">Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-md p-8 text-center">
            <p className="text-gray-600">No jobs found.</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Job Title
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Company
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Location
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Created
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <Link
                          href={`/jobs/${job.slug}`}
                          target="_blank"
                          className="hover:underline text-blue-600"
                        >
                          {job.jobTitle}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{job.companyName}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {job.location} • {job.workLocation}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            job.status === 'published'
                              ? 'bg-green-100 text-green-800'
                              : job.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {job.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(job.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2">
                          {job.status === 'pending' && (
                            <button
                              onClick={() => handleApprove(job.id)}
                              className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => handleReject(job.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
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

