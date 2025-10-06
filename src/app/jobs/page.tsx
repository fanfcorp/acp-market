import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import { Building2, MapPin, Briefcase } from 'lucide-react';

export const revalidate = 60; // Revalidate every 60 seconds

async function getJobs() {
  const jobs = await prisma.job.findMany({
    where: {
      status: 'published',
    },
    orderBy: [
      { featured: 'desc' },
      { publishedAt: 'desc' },
    ],
  });
  return jobs;
}

export default async function JobsPage() {
  const jobs = await getJobs();
  const jobCount = jobs.length;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Build the Future of Commerce
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join innovative companies shaping the next generation of commerce with AI, ACP, and cutting-edge technologies.
            Find roles in product, engineering, research, and strategy.
          </p>
        </div>

        {/* CTA Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-gray-900">
              Looking for talent shaping the future of commerce? Reach{' '}
              <span className="font-semibold">100,000+ monthly visitors</span>{' '}
              building the next generation of AI-powered commerce
            </p>
          </div>
          <Link
            href="/jobs/post"
            className="inline-flex items-center justify-center px-5 py-2 rounded-md bg-gray-900 text-white text-sm hover:bg-gray-800 whitespace-nowrap"
          >
            + Post a Job
          </Link>
        </div>

        {/* Jobs List */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            All Jobs <span className="text-gray-500 font-normal">({jobCount} positions)</span>
          </h2>
        </div>

        {/* Filters - Placeholder for now */}
        <div className="mb-6 flex gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 hover:bg-gray-50">
            <Briefcase className="w-4 h-4" />
            Job Type
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 hover:bg-gray-50">
            <MapPin className="w-4 h-4" />
            Work Location
          </button>
        </div>

        {/* Job Cards */}
        <div className="space-y-4">
          {jobs.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
              <p className="text-gray-600">No jobs posted yet. Check back soon!</p>
            </div>
          ) : (
            jobs.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.slug}`}
                className="block bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {job.jobTitle}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700 font-medium">{job.companyName}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.jobType}
                      </div>
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                        {job.workLocation}
                      </span>
                    </div>

                    {/* Description Preview */}
                    <p className="mt-3 text-gray-600 line-clamp-2">
                      {job.description.substring(0, 200)}...
                    </p>
                  </div>

                  {/* Company Logo */}
                  {job.companyLogoUrl && (
                    <div className="flex-shrink-0">
                      <Image
                        src={job.companyLogoUrl}
                        alt={`${job.companyName} logo`}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded object-contain bg-white border border-gray-200"
                      />
                    </div>
                  )}
                </div>

                {/* Apply Button */}
                <div className="mt-4 flex justify-end">
                  <span className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Apply Now →
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

