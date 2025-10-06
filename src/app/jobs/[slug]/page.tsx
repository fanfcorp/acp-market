import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import { Building2, MapPin, Briefcase, ExternalLink, Share2 } from 'lucide-react';

export const revalidate = 60;

async function getJob(slug: string) {
  const job = await prisma.job.findUnique({
    where: { slug, status: 'published' },
  });
  
  if (!job) {
    return null;
  }
  
  return job;
}

async function getSimilarJobs(currentJobId: string, workLocation: string, jobType: string) {
  const jobs = await prisma.job.findMany({
    where: {
      status: 'published',
      id: { not: currentJobId },
      OR: [
        { workLocation },
        { jobType },
      ],
    },
    take: 3,
    orderBy: { publishedAt: 'desc' },
    select: {
      slug: true,
      jobTitle: true,
      companyName: true,
      location: true,
      workLocation: true,
    },
  });
  
  return jobs;
}

export default async function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = await getJob(params.slug);
  
  if (!job) {
    notFound();
  }

  const similarJobs = await getSimilarJobs(job.id, job.workLocation, job.jobType);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/jobs" className="text-sm text-gray-600 hover:text-gray-900">
            ← Job Board
          </Link>
          <span className="text-gray-400 mx-2">/</span>
          <span className="text-sm text-gray-900">{job.jobTitle}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="flex items-start justify-between gap-6 mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {job.jobTitle}
                  </h1>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="w-5 h-5 text-gray-500" />
                    <span className="text-lg font-medium text-gray-800">{job.companyName}</span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {job.jobType}
                    </div>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                      {job.workLocation}
                    </span>
                    {job.salaryRange && (
                      <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                        {job.salaryRange}
                      </span>
                    )}
                  </div>
                </div>

                {job.companyLogoUrl && (
                  <div className="flex-shrink-0">
                    <Image
                      src={job.companyLogoUrl}
                      alt={`${job.companyName} logo`}
                      width={96}
                      height={96}
                      className="w-24 h-24 rounded-lg object-contain bg-white border border-gray-200"
                    />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <a
                  href={job.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                  Apply Now
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* About the Role */}
            {job.description && (
              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <h2 className="text-xl font-semibold mb-4">About the Role</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {job.description}
                  </p>
                </div>
              </div>
            )}

            {/* Requirements */}
            {job.requirements && (
              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                <div className="prose prose-gray max-w-none">
                  <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {job.requirements.split('\n').map((line, index) => {
                      const trimmed = line.trim();
                      if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
                        return (
                          <div key={index} className="flex items-start gap-2 mb-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>{trimmed.substring(1).trim()}</span>
                          </div>
                        );
                      }
                      return trimmed ? <p key={index} className="mb-2">{line}</p> : null;
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Benefits */}
            {job.benefits && (
              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <h2 className="text-xl font-semibold mb-4">Benefits</h2>
                <div className="prose prose-gray max-w-none">
                  <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {job.benefits.split('\n').map((line, index) => {
                      const trimmed = line.trim();
                      if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
                        return (
                          <div key={index} className="flex items-start gap-2 mb-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span>{trimmed.substring(1).trim()}</span>
                          </div>
                        );
                      }
                      return trimmed ? <p key={index} className="mb-2">{line}</p> : null;
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Apply CTA */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold mb-3">Ready to apply?</h3>
              <p className="text-gray-700 mb-4">
                Join {job.companyName} and help shape the future of AI
              </p>
              <a
                href={job.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                Apply Now
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Company Info */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Company Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">Company:</span>
                  <p className="font-medium text-gray-900">{job.companyName}</p>
                </div>
                {job.companyWebsite && (
                  <div>
                    <span className="text-gray-600">Website:</span>
                    <a
                      href={job.companyWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:underline"
                    >
                      Visit website →
                    </a>
                  </div>
                )}
                <div>
                  <span className="text-gray-600">Location:</span>
                  <p className="font-medium text-gray-900">{job.location}</p>
                </div>
                <div>
                  <span className="text-gray-600">Work Type:</span>
                  <p className="font-medium text-gray-900">{job.workLocation}</p>
                </div>
                <div>
                  <span className="text-gray-600">Employment:</span>
                  <p className="font-medium text-gray-900">{job.jobType}</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            {job.tags.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Similar Jobs */}
            {similarJobs.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Similar Jobs</h3>
                <div className="space-y-4">
                  {similarJobs.map((similarJob) => (
                    <Link
                      key={similarJob.slug}
                      href={`/jobs/${similarJob.slug}`}
                      className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <h4 className="font-medium text-gray-900 mb-1 text-sm">
                        {similarJob.jobTitle}
                      </h4>
                      <p className="text-xs text-gray-600">{similarJob.companyName}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {similarJob.location} • {similarJob.workLocation}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

