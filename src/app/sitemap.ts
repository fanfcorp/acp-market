import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://acp-market-mt2lloch9-francois-goupils-projects.vercel.app'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/submit-acp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.6,
    },
  ]

  try {
    // Get all categories
    const categories = await prisma.category.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    // Get all active ACP servers
    const acpServers = await prisma.aCPServer.findMany({
      where: {
        status: 'active',
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    // Get all published jobs
    const jobs = await prisma.job.findMany({
      where: {
        status: 'published',
      },
      select: {
        id: true,
        updatedAt: true,
      },
    })

    // Category pages
    const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
      url: `${baseUrl}/categories/${category.slug}`,
      lastModified: category.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

    // ACP server pages (if you have individual pages)
    const acpServerPages: MetadataRoute.Sitemap = acpServers.map((server) => ({
      url: `${baseUrl}/acp/${server.slug}`,
      lastModified: server.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

    // Job pages (if you have individual pages)
    const jobPages: MetadataRoute.Sitemap = jobs.map((job) => ({
      url: `${baseUrl}/jobs/${job.id}`,
      lastModified: job.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.6,
    }))

    return [...staticPages, ...categoryPages, ...acpServerPages, ...jobPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticPages
  }
}
