import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

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
      listingType,
    } = body;

    // Validate required fields
    if (!jobTitle || !companyName || !contactEmail || !applicationUrl || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate and normalize URL
    let normalizedApplicationUrl = applicationUrl.trim();
    if (!normalizedApplicationUrl.startsWith('http://') && !normalizedApplicationUrl.startsWith('https://')) {
      normalizedApplicationUrl = 'https://' + normalizedApplicationUrl;
    }

    // Generate unique slug
    const slug = generateSlug(jobTitle, companyName);

    // Set expiration date (30 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    // Determine pricing
    const pricing = {
      standard: { amount: 4900, name: 'Standard Listing' }, // $49 in cents
      featured: { amount: 12900, name: 'Featured Listing - 30 days' }, // $129 in cents
    };

    const selectedPricing = pricing[listingType as 'standard' | 'featured'] || pricing.standard;

    // Create job in database with payment_pending status
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
        status: 'payment_pending',
        listingType: listingType || 'standard',
        featured: listingType === 'featured',
        paymentStatus: 'unpaid',
        paymentAmount: selectedPricing.amount,
        expiresAt,
      },
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: selectedPricing.name,
              description: `${jobTitle} at ${companyName}`,
            },
            unit_amount: selectedPricing.amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/jobs/payment-success?session_id={CHECKOUT_SESSION_ID}&job_id=${job.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/jobs/post?error=payment_cancelled`,
      customer_email: contactEmail,
      metadata: {
        jobId: job.id,
        jobSlug: slug,
        listingType,
      },
    });

    // Update job with Stripe session ID
    await prisma.job.update({
      where: { id: job.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({
      success: true,
      checkoutUrl: session.url,
      jobId: job.id,
      slug: job.slug,
    });
  } catch (error: unknown) {
    console.error('Checkout creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session. Please try again.' },
      { status: 500 }
    );
  }
}

