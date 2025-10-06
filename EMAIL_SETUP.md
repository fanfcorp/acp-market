# Email Notifications Setup Guide

## Overview

Job posters now receive a **professional, branded confirmation email** when they submit a job posting. This improves user experience and keeps them informed about the review process.

## 📧 Email Features

### Job Submission Confirmation Email

When someone posts a job, they automatically receive an email with:

✅ **Professional branding** - ACP Market logo and colors  
✅ **Job details confirmation** - Position, company, contact email  
✅ **Clear next steps** - 3-step review process explained  
✅ **Timeline expectations** - Review within 24 hours  
✅ **Call-to-action** - Link to browse other jobs  
✅ **Contact information** - Easy way to reach support  

### Email Template

The email includes:
- Success confirmation with checkmark icon
- Job posting details in a clean table
- Step-by-step "What Happens Next" section
- Timeline expectations
- Branded header and footer
- Mobile-responsive design

## 🚀 Setup Instructions

### 1. Create a Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Free tier includes: **100 emails/day** (3,000/month) - perfect for getting started!

### 2. Get Your API Key

1. Go to [API Keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Name it: `ACP Market - Production` or `ACP Market - Development`
4. Copy the API key (it starts with `re_`)

### 3. Add to Environment Variables

**For Local Development:**

Add to your `.env` file:
```bash
RESEND_API_KEY="re_your_api_key_here"
```

**For Vercel Production:**

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add new variable:
   - **Key:** `RESEND_API_KEY`
   - **Value:** `re_your_api_key_here`
   - **Environments:** Production, Preview, Development
3. Click "Save"
4. Redeploy your app

### 4. Verify Domain (Optional but Recommended)

For production use, verify your domain to improve deliverability:

1. Go to [Resend Domains](https://resend.com/domains)
2. Click "Add Domain"
3. Enter your domain: `acp-market.com`
4. Add the DNS records provided by Resend
5. Wait for verification (usually 10-30 minutes)

**Once verified, update the `from` address in the code:**
```typescript
from: 'ACP Market <noreply@acp-market.com>'
```

### 5. Test the Email

1. Submit a test job posting
2. Check the email address you provided
3. You should receive the confirmation email within seconds!

## 📝 Email Content

### Subject Line
```
Job Posted: [Job Title] at [Company Name]
```

Example: `Job Posted: Senior AI Engineer at Acme Corp`

### Email Body Includes

1. **Header Section**
   - ACP Market logo and branding
   - Success icon with checkmark

2. **Confirmation Message**
   - "Job Posted Successfully!"
   - Thank you message

3. **Job Details Box**
   - Position title
   - Company name
   - Contact email

4. **What Happens Next (3 steps)**
   - Review Process
   - Approval & Publishing
   - 30-Day Visibility

5. **Call-to-Action Button**
   - "Browse All Jobs" → Links to /jobs

6. **Email Notification Notice**
   - Info box explaining they'll get another email when approved

7. **Timeline Section**
   - Within 24 hours: Review and approval
   - After approval: Immediate publication
   - 30 days: Active visibility

8. **Footer**
   - Contact information
   - Links to main pages
   - Copyright notice

## 🔧 Customization

### Update the Email Template

Edit: `/src/emails/JobSubmissionConfirmation.tsx`

You can customize:
- Colors and branding
- Logo and imagery
- Text content and messaging
- CTA button text and links
- Footer links

### Update the From Address

Edit: `/src/app/api/jobs/route.ts`

Line ~137:
```typescript
from: 'ACP Market <jobs@acp-market.com>',
```

Change to match your verified domain or desired sender.

### Update Subject Line

Line ~139:
```typescript
subject: `Job Posted: ${jobTitle} at ${companyName}`,
```

## 📊 Email Analytics

Resend provides analytics for:
- Delivery rates
- Open rates
- Click rates
- Bounce rates

Access at: [resend.com/emails](https://resend.com/emails)

## 🎯 Best Practices

1. **Keep it professional** - The email represents your brand
2. **Set expectations** - Let them know what to expect and when
3. **Provide value** - Include helpful information and next steps
4. **Make it actionable** - Include clear CTAs
5. **Test regularly** - Send test emails to verify everything works

## 🔒 Security & Privacy

- Email addresses are only used for notifications
- Not shared with third parties
- Resend is SOC 2 Type II certified
- GDPR compliant

## 💰 Pricing

**Free Tier:**
- 100 emails/day
- 3,000 emails/month
- Perfect for small to medium job boards

**Paid Plans:**
- Start at $20/month for 50,000 emails
- Only pay if you exceed free tier

See: [resend.com/pricing](https://resend.com/pricing)

## 🐛 Troubleshooting

### Email not sending?

**Check:**
1. Is `RESEND_API_KEY` set in environment variables?
2. Is the API key valid? (Check Resend dashboard)
3. Check server logs for error messages
4. Verify email address format is valid

**Debug in Development:**
```bash
# Check if API key is loaded
echo $RESEND_API_KEY

# Check server logs
npm run dev
# Look for: "Confirmation email sent to: [email]"
```

### Email goes to spam?

**Solutions:**
1. Verify your domain in Resend
2. Set up SPF, DKIM, and DMARC records
3. Use a professional from address
4. Ask recipients to whitelist your domain

### Rate limiting?

Free tier: 100 emails/day

**If you hit the limit:**
1. Upgrade to paid plan
2. Or implement email queuing
3. Or prioritize critical emails only

## 🎨 Email Preview

Here's what recipients see:

```
From: ACP Market <jobs@acp-market.com>
Subject: Job Posted: Senior AI Engineer at Acme Corp

┌────────────────────────────────────────┐
│         [ACP] ACP Market               │
│         (Black header)                 │
└────────────────────────────────────────┘

          ✓ (Green checkmark)

     Job Posted Successfully!
  Thank you for posting on ACP Market

┌────────────────────────────────────────┐
│ YOUR JOB POSTING                       │
│ Position: Senior AI Engineer          │
│ Company: Acme Corp                     │
│ Contact: hiring@acme.com               │
└────────────────────────────────────────┘

What Happens Next?

① Review Process
  Our team will review your posting...

② Approval & Publishing
  Once approved (within 24 hours)...

③ 30-Day Visibility
  Your job will remain active...

    [Browse All Jobs]

📧 We'll send you another email when 
   your job is approved and goes live.

...footer with links and contact info...
```

## 🚀 Future Enhancements

Consider adding:
- [ ] Job approval notification email
- [ ] Job expiring soon reminder
- [ ] Weekly digest of applicants
- [ ] Job renewal reminder
- [ ] Custom email templates per job type

## 📞 Support

Need help?
- Resend Docs: [resend.com/docs](https://resend.com/docs)
- Resend Support: [resend.com/support](https://resend.com/support)
- ACP Market: jobs@acp-market.com

---

**Your job posters will now receive professional confirmation emails!** 🎉

