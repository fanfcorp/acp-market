import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';
import { createElement } from 'react';
import { JobSubmissionConfirmationEmail } from '@/emails/JobSubmissionConfirmation';

// Helper function to generate slug from job title
function generateSlug(title: string, companyName: string): string {
  const baseSlug = `${title}-${companyName}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `${baseSlug}-${randomSuffix}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      jobTitle,
      companyName,
      companyLogoUrl,
      location,
      workLocation,
      jobType,
      salaryRange,
      applicationUrl,
      description,
      requirements,
      benefits,
      contactEmail,
      companyWebsite,
      tags,
    } = body;

    // Validate required fields
    if (!jobTitle || typeof jobTitle !== 'string') {
      return NextResponse.json(
        { error: 'Job title is required' },
        { status: 400 }
      );
    }

    if (!companyName || typeof companyName !== 'string') {
      return NextResponse.json(
        { error: 'Company name is required' },
        { status: 400 }
      );
    }

    if (!contactEmail || typeof contactEmail !== 'string') {
      return NextResponse.json(
        { error: 'Contact email is required' },
        { status: 400 }
      );
    }

    if (!applicationUrl || typeof applicationUrl !== 'string') {
      return NextResponse.json(
        { error: 'Application URL is required' },
        { status: 400 }
      );
    }

    if (!description || typeof description !== 'string') {
      return NextResponse.json(
        { error: 'Job description is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate and normalize URL format
    let normalizedApplicationUrl = applicationUrl.trim();
    
    // Add https:// if no protocol is provided
    if (!normalizedApplicationUrl.startsWith('http://') && !normalizedApplicationUrl.startsWith('https://')) {
      normalizedApplicationUrl = 'https://' + normalizedApplicationUrl;
    }
    
    // Validate URL format
    try {
      new URL(normalizedApplicationUrl);
    } catch {
      return NextResponse.json(
        { error: 'Invalid application URL. Please enter a valid URL (e.g., https://company.com/apply)' },
        { status: 400 }
      );
    }

    // Generate unique slug
    const slug = generateSlug(jobTitle, companyName);

    // Set expiration date (30 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    // Create job posting
    const job = await prisma.job.create({
      data: {
        slug,
        jobTitle,
        companyName,
        companyLogoUrl: companyLogoUrl || null,
        location,
        workLocation: workLocation || 'On-site',
        jobType: jobType || 'Full Time',
        salaryRange: salaryRange || null,
        applicationUrl: normalizedApplicationUrl,
        description,
        requirements: requirements || null,
        benefits: benefits || null,
        contactEmail: contactEmail.toLowerCase(),
        companyWebsite: companyWebsite || null,
        tags: tags || [],
        status: 'pending', // Jobs need approval before publishing
        featured: false,
        expiresAt,
      },
    });

    // Send confirmation email (don't fail if email fails)
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        await resend.emails.send({
          from: 'ACP Market <jobs@acp-market.com>',
          to: contactEmail,
          subject: `Job Posted: ${jobTitle} at ${companyName}`,
          react: createElement(JobSubmissionConfirmationEmail, {
            jobTitle,
            companyName,
            contactEmail,
          }),
        });
        
        console.log('Confirmation email sent to:', contactEmail);
      } catch (emailError) {
        // Log but don't fail the request if email fails
        console.error('Failed to send confirmation email:', emailError);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Job posted successfully! It will be reviewed and published soon.',
        slug: job.slug,
        id: job.id,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Job submission error:', error);

    // Handle unique constraint violation
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A job with similar details already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to post job. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const apiKey = searchParams.get('apiKey');
    const status = searchParams.get('status');

    // Simple API key protection for viewing all entries
    if (apiKey !== process.env.ADMIN_API_KEY) {
      // Public endpoint - only show published jobs
      const jobs = await prisma.job.findMany({
        where: { status: 'published' },
        orderBy: [
          { featured: 'desc' },
          { publishedAt: 'desc' },
        ],
        select: {
          id: true,
          slug: true,
          jobTitle: true,
          companyName: true,
          companyLogoUrl: true,
          location: true,
          workLocation: true,
          jobType: true,
          salaryRange: true,
          description: true,
          tags: true,
          featured: true,
          publishedAt: true,
          expiresAt: true,
        },
      });

      return NextResponse.json({
        success: true,
        count: jobs.length,
        jobs,
      });
    }

    // Admin access - show all or filtered jobs
    const whereClause = status ? { status } : {};
    
    const jobs = await prisma.job.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

