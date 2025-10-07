import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build where clause
    const where: any = {
      status: 'active'
    };

    // Add search query
    if (query) {
      where.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { tags: { has: query } },
        { tags: { hasSome: query.split(' ').map(tag => tag.toLowerCase()) } }
      ];
    }

    // Add category filter
    if (category) {
      where.primaryCategory = {
        slug: category
      };
    }

    // Fetch servers with premium ranking
    const servers = await prisma.aCPServer.findMany({
      where,
      include: {
        primaryCategory: true,
        _count: {
          select: {
            reviews: {
              where: {
                status: 'approved'
              }
            }
          }
        }
      },
      orderBy: [
        { featured: 'desc' },        // Featured servers first
        { tier: 'desc' },            // Pro > Free
        { verified: 'desc' },        // Verified priority
        { stars: 'desc' },           // Community rating
        { createdAt: 'desc' }        // Newest first
      ],
      take: limit,
      skip: offset
    });

    // Get total count for pagination
    const totalCount = await prisma.aCPServer.count({ where });

    return NextResponse.json({
      servers,
      totalCount,
      hasMore: offset + servers.length < totalCount,
      query,
      category
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
