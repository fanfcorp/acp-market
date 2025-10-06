import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, tools, consent } = body;

    // Validate required fields
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create or update waitlist entry
    const entry = await prisma.waitlistEntry.upsert({
      where: { email: email.toLowerCase() },
      update: {
        tools: tools || null,
        consent: consent || false,
        updatedAt: new Date(),
      },
      create: {
        email: email.toLowerCase(),
        tools: tools || null,
        consent: consent || false,
      },
    });

    return NextResponse.json(
      { 
        success: true,
        message: 'Successfully joined the waitlist!',
        id: entry.id 
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Waitlist submission error:', error);

    // Handle unique constraint violation
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'This email is already registered' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to join waitlist. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const apiKey = searchParams.get('apiKey');

    // Simple API key protection for viewing entries
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const entries = await prisma.waitlistEntry.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        tools: true,
        consent: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      count: entries.length,
      entries,
    });
  } catch (error) {
    console.error('Error fetching waitlist entries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch entries' },
      { status: 500 }
    );
  }
}

