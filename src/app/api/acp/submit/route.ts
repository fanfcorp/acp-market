import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getStripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('ACP Submission received:', { 
      selectedTier: body.selectedTier, 
      name: body.name,
      submitterEmail: body.submitterEmail 
    });
    
    const {
      submitterName,
      submitterEmail,
      submitterCompany,
      name,
      description,
      website,
      githubUrl,
      categoryId,
      tags,
      protocolSupport,
      apiEndpoint,
      apiKeyRequired,
      selectedTier
    } = body;

    // Validate required fields
    if (!submitterName || !submitterEmail || !name || !description || !githubUrl || !categoryId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');

    // Check if slug already exists
    let finalSlug = slug;
    let counter = 1;
    while (await prisma.aCPServer.findUnique({ where: { slug: finalSlug } })) {
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    // Create the submission record
    console.log('Creating submission record...');
    const submission = await prisma.aCPSubmission.create({
      data: {
        submitterName,
        submitterEmail,
        submitterCompany: submitterCompany || null,
        name,
        description,
        website: website || null,
        githubUrl,
        categoryId,
        tags,
        protocolSupport,
        selectedTier,
        status: 'pending'
      }
    });
    console.log('Submission created:', submission.id);

    // If it's a free tier, create the ACP server directly
    if (selectedTier === 'free') {
      console.log('Creating free tier ACP server...');
      try {
        const acpServer = await prisma.aCPServer.create({
          data: {
            slug: finalSlug,
            name,
            description,
            website: website || null,
            githubUrl,
            primaryCategoryId: categoryId,
            tags,
            protocolSupport,
            apiEndpoint: apiEndpoint || null,
            apiKeyRequired: apiKeyRequired || false,
            submitterEmail,
            submitterName,
            submitterCompany: submitterCompany || null,
            status: 'pending', // Will be reviewed manually
            tier: 'free',
            featured: false,
            verified: false
          }
        });
        console.log('ACP server created:', acpServer.id);

        // Update submission with ACP server ID
        await prisma.aCPSubmission.update({
          where: { id: submission.id },
          data: { 
            acpServerId: acpServer.id,
            status: 'pending'
          }
        });

        return NextResponse.json({
          success: true,
          message: 'ACP submitted successfully for review',
          submissionId: submission.id,
          acpServerId: acpServer.id
        });
      } catch (error) {
        console.error('Error creating ACP server:', error);
        // If ACP server creation fails, still return success for the submission
        return NextResponse.json({
          success: true,
          message: 'ACP submitted successfully for review',
          submissionId: submission.id
        });
      }
    }

    // For premium tiers, create Stripe checkout session
    const tierPrices = {
      pro: 4900, // $49.00 in cents
      featured: 9900 // $99.00 in cents
    };

    const price = tierPrices[selectedTier as keyof typeof tierPrices];
    
    if (!price) {
      return NextResponse.json(
        { error: 'Invalid tier selected' },
        { status: 400 }
      );
    }

    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_PUBLISHABLE_KEY) {
      return NextResponse.json(
        { error: 'Payment processing is not configured. Please contact support.' },
        { status: 503 }
      );
    }

    // Create Stripe checkout session
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1)} ACP Listing`,
              description: `Premium ACP listing with enhanced features`,
            },
            unit_amount: price,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${request.nextUrl.origin}/submit-acp/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/submit-acp?tier=${selectedTier}`,
      metadata: {
        submissionId: submission.id,
        tier: selectedTier,
        submitterEmail,
      },
      customer_email: submitterEmail,
    });

    // Update submission with Stripe session ID
    await prisma.aCPSubmission.update({
      where: { id: submission.id },
      data: {
        stripeSessionId: session.id,
        amount: price
      }
    });

    return NextResponse.json({
      success: true,
      paymentUrl: session.url,
      sessionId: session.id
    });

  } catch (error) {
    console.error('Error creating ACP submission:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const submissionId = searchParams.get('submissionId');
    const email = searchParams.get('email');

    if (!submissionId && !email) {
      return NextResponse.json(
        { error: 'Missing submissionId or email' },
        { status: 400 }
      );
    }

    const where = submissionId 
      ? { id: submissionId }
      : { submitterEmail: email };

    const submission = await prisma.aCPSubmission.findFirst({
      where,
      include: {
        acpServer: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(submission);
  } catch (error) {
    console.error('Error fetching submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
