import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');
    const jobId = searchParams.get('job_id');

    if (!sessionId || !jobId) {
      return NextResponse.json(
        { error: 'Missing session_id or job_id' },
        { status: 400 }
      );
    }

    // Verify session with Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      );
    }

    // Update job status
    const job = await prisma.job.update({
      where: { id: jobId },
      data: {
        paymentStatus: 'paid',
        status: 'published',
        publishedAt: new Date(),
        stripePaymentId: session.payment_intent as string,
      },
    });

    return NextResponse.json({
      success: true,
      slug: job.slug,
      message: 'Payment verified successfully',
    });
  } catch (error: unknown) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}

