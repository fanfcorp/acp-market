# Stripe Payment Integration Setup

## Overview

Job postings on ACP Market now support paid listings with Stripe integration:
- **Standard Listing**: $49 - Main job feed placement
- **Featured Listing**: $129 - Premium visibility with special badge

## 🚀 Quick Setup

### 1. Create a Stripe Account

1. Go to [stripe.com](https://stripe.com)
2. Sign up for a free account
3. Complete account verification

### 2. Get API Keys

1. Go to [Stripe Dashboard → API Keys](https://dashboard.stripe.com/apikeys)
2. You'll need:
   - **Publishable key** (starts with `pk_`)
   - **Secret key** (starts with `sk_`)

**For Testing:**
- Use test mode keys (toggle in dashboard)
- Test cards: `4242 4242 4242 4242`
- Any future expiration date, any CVC

**For Production:**
- Switch to live mode
- Use live API keys

### 3. Add to Environment Variables

**Local Development (.env):**
```bash
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

**Vercel Production:**
1. Dashboard → Settings → Environment Variables
2. Add:
   - `STRIPE_SECRET_KEY` = `sk_live_...`
   - `STRIPE_PUBLISHABLE_KEY` = `pk_live_...`
   - `STRIPE_WEBHOOK_SECRET` = `whsec_...` (see step 4)
   - `NEXT_PUBLIC_BASE_URL` = `https://your-domain.vercel.app`

### 4. Set Up Webhooks (Production Only)

Webhooks ensure payment confirmation works reliably.

**Create Webhook:**
1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Enter your webhook URL: `https://your-domain.vercel.app/api/webhooks/stripe`
4. Select events to listen for:
   - ✅ `checkout.session.completed`
5. Click "Add endpoint"
6. Copy the **Signing secret** (starts with `whsec_`)
7. Add to Vercel env vars as `STRIPE_WEBHOOK_SECRET`

## 💳 How It Works

### Payment Flow

```
1. User fills job posting form
   ↓
2. Selects Standard ($49) or Featured ($129)
   ↓
3. Clicks "Proceed to Payment"
   ↓
4. Job created with status: "payment_pending"
   ↓
5. Redirected to Stripe Checkout
   ↓
6. Completes payment with credit card
   ↓
7. Stripe redirects to /jobs/payment-success
   ↓
8. Backend verifies payment
   ↓
9. Job status updated to "published"
   ↓
10. Job appears live on /jobs
```

### Database Fields

New fields added to `Job` model:
- `listingType`: `'standard'` or `'featured'`
- `paymentStatus`: `'unpaid'`, `'paid'`, or `'refunded'`
- `paymentAmount`: Amount in cents (4900 or 12900)
- `stripeSessionId`: Stripe checkout session ID
- `stripePaymentId`: Stripe payment intent ID

### Pricing

| Listing Type | Price | Features |
|-------------|-------|----------|
| **Standard** | $49 | • Main job feed<br>• 30-day visibility<br>• 100,000+ reach |
| **Featured** | $129 | • Premium top placement<br>• Special badge ✨<br>• Newsletter feature<br>• 3x more views<br>• 30-day visibility |

## 🎯 Testing

### Test in Development

1. Use Stripe test mode keys
2. Go to `/jobs/post`
3. Fill out form
4. Select listing type
5. Click "Proceed to Payment"
6. Use test card: `4242 4242 4242 4242`
7. Any future date, any CVC
8. Complete payment
9. You should see success page!

### Test Cards

```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
3D Secure: 4000 0025 0000 3155
```

Full list: [stripe.com/docs/testing](https://stripe.com/docs/testing)

## 🔐 Security

- ✅ **Server-side validation** - All payment processing on backend
- ✅ **Stripe handles PCI compliance** - No card data touches your servers
- ✅ **Webhook signature verification** - Prevents fake payment notifications
- ✅ **Double verification** - Both client-side and webhook confirmation

## 📊 Admin Dashboard

View payment status in admin:

1. Go to `/admin/jobs`
2. Enter API key
3. See payment status for each job:
   - 💳 **Paid** - Payment successful
   - ⏳ **Unpaid** - Payment pending
   - ❌ **Refunded** - Payment refunded

## 🔄 Webhook Events

The webhook endpoint handles:

**`checkout.session.completed`:**
- Triggered when payment succeeds
- Updates job to "published" status
- Sets `publishedAt` timestamp
- Stores payment intent ID

## 💰 Stripe Dashboard

Monitor your business at [dashboard.stripe.com](https://dashboard.stripe.com):

- **Payments** - See all transactions
- **Customers** - View customer data
- **Products** - Manage pricing
- **Webhooks** - Monitor webhook deliveries
- **Reports** - Download financial reports

## 🐛 Troubleshooting

### "Payment verification failed"

**Check:**
1. Is `STRIPE_SECRET_KEY` set correctly?
2. Is payment actually completed in Stripe dashboard?
3. Check server logs for errors

### "Webhook not working"

**Check:**
1. Is `STRIPE_WEBHOOK_SECRET` set in production?
2. Is webhook URL correct?
3. Go to Stripe Dashboard → Webhooks → Check delivery attempts
4. View webhook logs for errors

### Jobs not publishing after payment

**Check:**
1. Verify webhook is configured
2. Check Stripe Dashboard → Webhooks → Recent deliveries
3. Look for failed webhook attempts
4. Check server logs

## 📈 Going Live

**Before launching:**

1. ✅ Switch to live Stripe API keys
2. ✅ Update `NEXT_PUBLIC_BASE_URL` to production domain
3. ✅ Configure production webhook endpoint
4. ✅ Test with real (small) payment
5. ✅ Verify job publishes correctly

**After launching:**

1. Monitor Stripe Dashboard for payments
2. Set up email notifications for new orders
3. Configure payout schedule
4. Download tax reports as needed

## 💵 Pricing Strategy

Current pricing:
- Standard: $49 (competitive with job boards)
- Featured: $129 (2.6x premium for 3x visibility)

**Tips:**
- Test pricing with first 10 customers
- Consider volume discounts
- Offer package deals (5 jobs for $199)
- A/B test pricing to optimize

## 📧 Future Enhancements

Consider adding:
- [ ] Email confirmation with receipt
- [ ] Refund handling in admin dashboard
- [ ] Subscription plans for multiple listings
- [ ] Promotional codes/discounts
- [ ] Invoice generation
- [ ] Auto-renewal for featured listings

## 🔗 Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Testing](https://stripe.com/docs/testing)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Stripe Dashboard](https://dashboard.stripe.com)

## ⚙️ Configuration Summary

**Environment Variables Needed:**
```bash
# Stripe
STRIPE_SECRET_KEY="sk_..."
STRIPE_PUBLISHABLE_KEY="pk_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# App
NEXT_PUBLIC_BASE_URL="https://your-domain.com"
```

**Webhook Endpoint:**
```
https://your-domain.vercel.app/api/webhooks/stripe
```

**Events to Listen:**
- `checkout.session.completed`

---

**Your payment system is ready to accept job posting payments!** 💳

