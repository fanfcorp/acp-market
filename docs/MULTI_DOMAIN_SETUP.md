# Multi-Domain Setup Guide

## Overview

ACP Market is deployed across **3 production domains**:

1. **acp-market.com** - Primary domain
2. **acpservers.org** - Alternative domain
3. **agenticommerceprotocol.io** - Full brand domain

This guide explains how to configure your app to work seamlessly across all domains.

## 🌐 Domain Configuration

### Vercel Setup

Each domain should be configured in your Vercel project:

1. **Go to Vercel Dashboard** → Your Project → Settings → Domains
2. **Add all three domains:**
   - `acp-market.com`
   - `www.acp-market.com`
   - `acpservers.org`
   - `www.acpservers.org`
   - `agenticommerceprotocol.io`
   - `www.agenticommerceprotocol.io`

3. **Set Primary Domain** (recommended):
   - Make `acp-market.com` your primary domain
   - Others will redirect or serve the same content

### Environment Variables

**Add to Vercel:**

```bash
# Base URL - use your primary domain
NEXT_PUBLIC_BASE_URL="https://acp-market.com"

# Database (same for all domains)
DATABASE_URL="postgres://..."

# Admin API Key (same for all domains)
ADMIN_API_KEY="your-key"

# Resend Email
RESEND_API_KEY="re_..."

# Stripe
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

## 💳 Stripe Configuration for Multiple Domains

### Success/Cancel URLs

The Stripe checkout uses `NEXT_PUBLIC_BASE_URL` for redirect URLs. This works across all domains because:

1. User visits any domain (e.g., `acpservers.org`)
2. Submits job posting form
3. Redirected to Stripe checkout
4. After payment, returns to `acp-market.com/jobs/payment-success`
5. Works seamlessly!

### Webhook Setup

**Create ONE webhook for all domains:**

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Add endpoint: `https://acp-market.com/api/webhooks/stripe`
3. Select event: `checkout.session.completed`
4. Copy webhook secret
5. Add to Vercel as `STRIPE_WEBHOOK_SECRET`

**Note:** The webhook only needs to point to your primary domain. Stripe will send events there regardless of which domain the user used.

## 📧 Email Configuration

### Resend Domain Verification

**Verify all three domains in Resend:**

1. Go to [Resend Domains](https://resend.com/domains)
2. Add each domain:
   - `acp-market.com`
   - `acpservers.org`
   - `agenticommerceprotocol.io`
3. Add DNS records for each
4. Wait for verification

**Update sender addresses:**

In `/src/app/api/jobs/route.ts`:
```typescript
from: 'ACP Market <noreply@acp-market.com>'
```

You can use any of your verified domains!

## 🔄 Domain Redirects (Optional)

### Option 1: Redirect to Primary Domain

If you want all traffic on one domain:

**In `next.config.ts`:**
```typescript
async redirects() {
  return [
    {
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: 'acpservers.org',
        },
      ],
      destination: 'https://acp-market.com/:path*',
      permanent: true,
    },
    {
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: 'agenticommerceprotocol.io',
        },
      ],
      destination: 'https://acp-market.com/:path*',
      permanent: true,
    },
  ];
},
```

### Option 2: Allow All Domains (Current Setup)

All domains serve the same content - no redirects needed!

- ✅ Users can access from any domain
- ✅ SEO: Set canonical URLs
- ✅ Brand flexibility

## 🎯 SEO Configuration

### Set Canonical URLs

**In `src/app/layout.tsx`, add metadata:**

```typescript
export const metadata = {
  metadataBase: new URL('https://acp-market.com'),
  alternates: {
    canonical: '/',
  },
}
```

This tells search engines that `acp-market.com` is the primary URL.

### Domain-Specific Content (Advanced)

If you want different content per domain:

```typescript
import { headers } from 'next/headers';

export default async function Page() {
  const headersList = await headers();
  const domain = headersList.get('host');
  
  const isACPServers = domain?.includes('acpservers.org');
  const isAgenticCommerce = domain?.includes('agenticommerceprotocol.io');
  
  return (
    <div>
      {isACPServers && <h1>Welcome to ACP Servers</h1>}
      {isAgenticCommerce && <h1>Welcome to Agentic Commerce Protocol</h1>}
    </div>
  );
}
```

## 📊 Analytics

### Track by Domain

**In your analytics:**
```javascript
// Track which domain users came from
analytics.track('page_view', {
  domain: window.location.hostname,
  path: window.location.pathname,
});
```

### Vercel Analytics

Automatically tracks all domains in your Vercel project!

## 🔒 CORS & Security

### Allow All Your Domains

**In API routes (if needed):**
```typescript
const allowedOrigins = [
  'https://acp-market.com',
  'https://www.acp-market.com',
  'https://acpservers.org',
  'https://www.acpservers.org',
  'https://agenticommerceprotocol.io',
  'https://www.agenticommerceprotocol.io',
];

const origin = request.headers.get('origin');
if (origin && allowedOrigins.includes(origin)) {
  // Allow request
}
```

## 🧪 Testing Multiple Domains

### Local Testing

You can test domain-specific behavior locally:

1. **Add to `/etc/hosts`:**
   ```
   127.0.0.1 local.acp-market.com
   127.0.0.1 local.acpservers.org
   127.0.0.1 local.agenticommerceprotocol.io
   ```

2. **Access via custom domains:**
   - `http://local.acp-market.com:3000`
   - `http://local.acpservers.org:3000`
   - etc.

## 📝 Vercel Project Configuration

### Recommended Setup

**Primary Domain:** `acp-market.com`
- Set as production domain in Vercel
- All others redirect here OR
- All serve same content

**Deployment Branches:**
- `main` → All production domains
- `preview` → Preview deployments

## 🎯 Stripe Setup Per Domain

### Production Stripe Account

**One Stripe account handles all domains:**

1. Create ONE Stripe account
2. Configure webhook: `https://acp-market.com/api/webhooks/stripe`
3. Payment success returns to primary domain
4. Works for all three domains!

**Example Flow:**
```
User on acpservers.org
  ↓
Posts job → Stripe checkout
  ↓
Pays → Returns to acp-market.com/jobs/payment-success
  ↓
Job published (visible on all domains)
```

## 📋 Checklist: Deploy to All Domains

### Vercel Configuration
- [ ] Add all 6 domain variants (with and without www)
- [ ] Set `acp-market.com` as primary
- [ ] Configure SSL certificates (automatic in Vercel)
- [ ] Set up environment variables

### DNS Configuration
- [ ] Point `acp-market.com` → Vercel
- [ ] Point `acpservers.org` → Vercel
- [ ] Point `agenticommerceprotocol.io` → Vercel
- [ ] Add www CNAME records for each

### Services Setup
- [ ] Stripe webhook pointing to primary domain
- [ ] Resend: Verify all domains (optional but recommended)
- [ ] Set `NEXT_PUBLIC_BASE_URL` to primary domain

### Testing
- [ ] Test each domain loads correctly
- [ ] Test job posting from each domain
- [ ] Test Stripe payment flow
- [ ] Test email notifications
- [ ] Verify database writes work from all domains

## 🔍 Current Configuration

Based on your setup:

**Primary Domain:**
- `acp-market.com` - Main marketing site

**Alternative Domains:**
- `acpservers.org` - Server directory focus
- `agenticommerceprotocol.io` - Full protocol branding

**Database:** 
- Shared Vercel Postgres (works across all domains)

**Payments:**
- Stripe checkout (same for all domains)
- Returns to primary domain after payment

## 💡 Best Practices

1. **Choose ONE primary domain** for:
   - Stripe webhooks
   - Email sender addresses
   - Canonical URLs
   - Social sharing

2. **Use primary domain in:**
   - `NEXT_PUBLIC_BASE_URL`
   - Stripe success/cancel URLs
   - Email links
   - Sitemap generation

3. **All domains share:**
   - Same database
   - Same payment processor
   - Same content
   - Same admin dashboard

4. **Consider redirecting** alternative domains to primary:
   - Better for SEO
   - Simpler analytics
   - Clearer branding

## 🚀 Quick Setup for Your 3 Domains

### 1. Vercel Domains

```bash
# In Vercel Dashboard → Domains, add:
acp-market.com (primary)
www.acp-market.com
acpservers.org
www.acpservers.org
agenticommerceprotocol.io
www.agenticommerceprotocol.io
```

### 2. Environment Variables

**Use `acp-market.com` as base:**
```bash
NEXT_PUBLIC_BASE_URL="https://acp-market.com"
```

### 3. Stripe Webhook

```
Endpoint: https://acp-market.com/api/webhooks/stripe
Events: checkout.session.completed
```

### 4. DNS Records

**For each domain, add:**
```
Type: A
Name: @
Value: 76.76.21.21 (Vercel IP)

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Vercel will provide exact records in the dashboard.**

## ✅ Current Status

Your app is configured to work with:
- ✅ Multiple domains in Vercel
- ✅ Shared database across all
- ✅ Single payment processor
- ✅ Email notifications
- ✅ Admin dashboard (accessible from any domain)

**All three domains will work seamlessly!** 🎉

---

Need help configuring a specific domain? Check Vercel's domain documentation or contact their support.

