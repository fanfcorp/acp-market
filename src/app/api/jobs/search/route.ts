import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const location = searchParams.get('location') || '';
    const jobType = searchParams.get('jobType') || '';
    const workLocation = searchParams.get('workLocation') || '';
    const tier = searchParams.get('tier') || '';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build where clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {
      status: 'published'
    };

    // Add search query
    if (query) {
      where.OR = [
        { jobTitle: { contains: query, mode: 'insensitive' } },
        { companyName: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { tags: { has: query } },
        { tags: { hasSome: query.split(' ').map(tag => tag.toLowerCase()) } }
      ];
    }

    // Add filters
    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }

    if (jobType) {
      where.jobType = jobType;
    }

    if (workLocation) {
      where.workLocation = workLocation;
    }

    if (tier) {
      where.tier = tier;
    }

    // Fetch jobs with premium ranking
    const jobs = await prisma.job.findMany({
      where,
      orderBy: [
        { featured: 'desc' },        // Featured jobs first
        { tier: 'desc' },            // Premium > Standard
        { verified: 'desc' },        // Verified companies first
        { urgent: 'desc' },          // Urgent hiring priority
        { highlighted: 'desc' },     // Highlighted jobs
        { publishedAt: 'desc' },     // Newest first
      ],
      take: limit,
      skip: offset
    });

    // Get total count for pagination
    const totalCount = await prisma.job.count({ where });

    return NextResponse.json({
      jobs,
      totalCount,
      hasMore: offset + jobs.length < totalCount,
      query,
      filters: { location, jobType, workLocation, tier }
    });

  } catch (error) {
    console.error('Job search error:', error);
    return NextResponse.json(
      { error: 'Job search failed' },
      { status: 500 }
    );
  }
}
