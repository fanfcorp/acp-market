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
      { featured: 'desc' },        // Featured jobs first
      { tier: 'desc' },            // Premium > Standard
      { verified: 'desc' },        // Verified companies first
      { urgent: 'desc' },          // Urgent hiring priority
      { highlighted: 'desc' },     // Highlighted jobs
      { publishedAt: 'desc' },     // Newest first
    ],
  });
  return jobs;
}

export default async function JobsPage() {
  const jobs = await getJobs();
  const jobCount = jobs.length;

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Build the Job Ads
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join innovative companies shaping the next generation of commerce with AI, ACP, and cutting-edge technologies.
            Find roles in product, engineering, research, and strategy.
          </p>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            {jobCount} positions available • Premium listings appear first
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-gray-900 dark:text-white">
              Looking for talent shaping the future of commerce? Reach{' '}
              <span className="font-semibold">100,000+ monthly visitors</span>{' '}
              building the next generation of AI-powered commerce
            </p>
          </div>
          <Link
            href="/jobs/post"
            className="inline-flex items-center justify-center px-5 py-2 rounded-md bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm hover:bg-gray-800 dark:hover:bg-gray-100 whitespace-nowrap"
          >
            + Post a Job
          </Link>
        </div>

        {/* Jobs List */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              All Jobs <span className="text-gray-500 dark:text-gray-400 font-normal">({jobCount} positions)</span>
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Sorted by featured, then premium
            </div>
          </div>
        </div>

        {/* Filters - Placeholder for now */}
        <div className="mb-6 flex gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
            <Briefcase className="w-4 h-4" />
            Job Type
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
            <MapPin className="w-4 h-4" />
            Work Location
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
            Premium Jobs
          </button>
        </div>

        {/* Job Cards */}
        <div className="space-y-4">
          {jobs.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-12 text-center">
              <p className="text-gray-600 dark:text-gray-300">No jobs posted yet. Check back soon!</p>
              <Link
                href="/jobs/post"
                className="inline-flex items-center mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Post First Job
              </Link>
            </div>
          ) : (
            jobs.map((job) => {
              const isPremium = job.tier === 'premium' || job.tier === 'featured';
              const isFeatured = job.featured || job.tier === 'featured';
              const isUrgent = job.urgent;
              const isHighlighted = job.highlighted;
              
              return (
                <Link
                  key={job.id}
                  href={`/jobs/${job.slug}`}
                  className={`block border rounded-lg p-6 hover:shadow-lg transition-all duration-200 ${
                    isPremium 
                      ? 'bg-gradient-to-br from-blue-50/50 to-purple-50/50 border-blue-300 dark:from-blue-900/10 dark:to-purple-900/10 dark:border-blue-700 shadow-md' 
                      : isHighlighted
                      ? 'bg-gradient-to-br from-yellow-50/50 to-orange-50/50 border-yellow-300 dark:from-yellow-900/10 dark:to-orange-900/10 dark:border-yellow-700 shadow-sm'
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                              {job.jobTitle}
                            </h3>
                            {isPremium && (
                              <span className="text-xs font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                                ⭐ PREMIUM
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 mb-3">
                            <Building2 className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700 dark:text-gray-300 font-medium">{job.companyName}</span>
                            {job.verified && (
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-xs text-green-600 dark:text-green-400">Verified</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-1">
                          {isFeatured && (
                            <div className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded text-xs font-bold text-center">
                              FEATURED
                            </div>
                          )}
                          {isUrgent && (
                            <div className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded text-xs font-medium">
                              URGENT
                            </div>
                          )}
                          {isHighlighted && !isPremium && (
                            <div className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded text-xs font-medium">
                              HIGHLIGHTED
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.jobType}
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          job.workLocation === 'Remote' 
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                            : job.workLocation === 'Hybrid'
                            ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                        }`}>
                          {job.workLocation}
                        </span>
                        {job.salaryRange && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs">
                            {job.salaryRange}
                          </span>
                        )}
                      </div>

                      {/* Description Preview */}
                      <p className="mt-3 text-gray-600 dark:text-gray-300 line-clamp-2">
                        {job.description.substring(0, 200)}...
                      </p>
                      
                      {/* Tags */}
                      {job.tags && job.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {job.tags.slice(0, 3).map((tag: string) => (
                            <span 
                              key={tag}
                              className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                          {job.tags.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs">
                              +{job.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Company Logo */}
                    {job.companyLogoUrl && (
                      <div className="flex-shrink-0">
                        <Image
                          src={job.companyLogoUrl}
                          alt={`${job.companyName} logo`}
                          width={64}
                          height={64}
                          className="w-16 h-16 rounded object-contain bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                        />
                      </div>
                    )}
                  </div>

                  {/* Apply Button */}
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {job.publishedAt && new Date(job.publishedAt).toLocaleDateString()}
                    </div>
                    <span className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                      Apply Now →
                    </span>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}

