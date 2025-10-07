import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  // Check if Stripe webhook is configured
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        if (session.mode === 'subscription') {
          // Handle successful subscription payment
          const submissionId = session.metadata?.submissionId;
          const tier = session.metadata?.tier;

          if (submissionId) {
            // Update submission status
            await prisma.aCPSubmission.update({
              where: { id: submissionId },
              data: {
                status: 'approved',
                paymentStatus: 'paid',
                stripePaymentId: session.payment_intent as string,
                stripeSessionId: session.id,
                reviewedAt: new Date()
              }
            });

            // Get submission details
            const submission = await prisma.aCPSubmission.findUnique({
              where: { id: submissionId }
            });

            if (submission) {
              // Generate slug from name
              const slug = submission.name
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-+|-+$/g, '');

              // Check if slug already exists
              let finalSlug = slug;
              let counter = 1;
              while (await prisma.aCPServer.findUnique({ where: { slug: finalSlug } })) {
                finalSlug = `${slug}-${counter}`;
                counter++;
              }

              // Create the ACP server with premium features
              const acpServer = await prisma.aCPServer.create({
                data: {
                  slug: finalSlug,
                  name: submission.name,
                  description: submission.description,
                  website: submission.website,
                  githubUrl: submission.githubUrl,
                  primaryCategoryId: submission.categoryId,
                  tags: submission.tags,
                  protocolSupport: submission.protocolSupport,
                  submitterEmail: submission.submitterEmail,
                  submitterName: submission.submitterName,
                  submitterCompany: submission.submitterCompany,
                  status: 'active', // Premium listings go live immediately
                  tier: tier || 'pro',
                  featured: tier === 'featured' || tier === 'pro',
                  verified: true, // Premium listings are auto-verified
                  approvedAt: new Date(),
                  // Premium features
                  customProfile: true,
                  leadGeneration: true,
                  analyticsEnabled: true,
                  // Premium tiers get better placement
                  ...(tier === 'featured' && { featured: true })
                }
              });

              // Update submission with ACP server ID
              await prisma.aCPSubmission.update({
                where: { id: submissionId },
                data: { acpServerId: acpServer.id }
              });

              // TODO: Send confirmation email to submitter
              console.log(`Premium ACP server created: ${acpServer.name} (${acpServer.id})`);
            }
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Handle subscription changes (upgrades/downgrades)
        const metadata = subscription.metadata;
        if (metadata?.acpServerId) {
          // Update ACP server tier based on subscription status
          await prisma.aCPServer.update({
            where: { id: metadata.acpServerId },
            data: {
              tier: metadata.tier || 'pro',
              featured: metadata.tier === 'featured' || metadata.tier === 'pro',
              // Update premium features based on tier
              customProfile: metadata.tier === 'featured' || metadata.tier === 'pro',
              leadGeneration: metadata.tier === 'featured' || metadata.tier === 'pro',
              analyticsEnabled: metadata.tier === 'featured' || metadata.tier === 'pro'
            }
          });
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Handle subscription cancellation
        const metadata = subscription.metadata;
        if (metadata?.acpServerId) {
          // Downgrade to free tier
          await prisma.aCPServer.update({
            where: { id: metadata.acpServerId },
            data: {
              tier: 'free',
              featured: false,
              customProfile: false,
              leadGeneration: false,
              analyticsEnabled: false
            }
          });
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        
        // Handle failed payment
        // TODO: Send email notification to customer
        // TODO: Maybe suspend premium features temporarily
        console.log(`Payment failed for invoice: ${invoice.id}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}