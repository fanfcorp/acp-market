# Jobs Board System - Complete Guide

## 🎉 What Was Built

A fully-featured job board system for ACP Market to connect AI/MCP talent with opportunities!

### ✅ Features Included

1. **Jobs Listing Page** (`/jobs`)
   - Browse all published job postings
   - Filter by job type and work location
   - Beautiful card-based layout
   - Company logos and details
   - Responsive design

2. **Post a Job Page** (`/jobs/post`)
   - Multi-step form (Job Details → Company Info → Listing Type)
   - Form validation and error handling
   - Free job postings (30-day duration)
   - Success/error feedback

3. **Individual Job Pages** (`/jobs/[slug]`)
   - Full job description and requirements
   - Benefits section
   - Company information sidebar
   - Similar jobs recommendations
   - Apply now CTA buttons
   - Social sharing

4. **Admin Dashboard** (`/admin/jobs`)
   - View all job submissions
   - Filter by status (pending, published, all)
   - Approve or reject job postings
   - Delete jobs
   - Protected with API key

5. **Database Integration**
   - PostgreSQL via Prisma ORM
   - Stores all job details
   - Status management (pending → published)
   - 30-day expiration tracking
   - Full-text search ready

## 📁 File Structure

```
src/
├── app/
│   ├── jobs/
│   │   ├── page.tsx                    # Jobs listing page
│   │   ├── post/
│   │   │   └── page.tsx                # Post job form page
│   │   └── [slug]/
│   │       └── page.tsx                # Individual job detail page
│   ├── api/
│   │   └── jobs/
│   │       ├── route.ts                # POST (create), GET (list) jobs
│   │       └── [id]/
│   │           └── route.ts            # PATCH (update), DELETE jobs
│   └── admin/
│       └── jobs/
│           └── page.tsx                # Admin job management
├── components/
│   └── PostJobForm.tsx                 # Job posting form component
└── lib/
    └── prisma.ts                       # Database client (already exists)

prisma/
└── schema.prisma                       # Updated with Job model
```

## 🗄️ Database Schema

```prisma
model Job {
  id              String   @id @default(cuid())
  slug            String   @unique
  
  // Job Details
  jobTitle        String
  companyName     String
  companyLogoUrl  String?
  location        String
  workLocation    String   // Remote, On-site, Hybrid
  jobType         String   // Full Time, Part Time, Contract, Internship
  salaryRange     String?
  applicationUrl  String
  
  // Job Content
  description     String   @db.Text
  requirements    String?  @db.Text
  benefits        String?  @db.Text
  
  // Contact & Meta
  contactEmail    String
  companyWebsite  String?
  tags            String[]
  
  // Status & Publishing
  status          String   @default("pending")
  featured        Boolean  @default(false)
  expiresAt       DateTime?
  
  // Timestamps
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  publishedAt     DateTime?
}
```

## 🚀 How It Works

### For Job Seekers

1. **Browse Jobs**
   - Visit `/jobs` to see all published positions
   - Filter by job type or work location
   - Click on any job to see full details

2. **View Job Details**
   - See full description, requirements, and benefits
   - View company information
   - Apply directly via external link

### For Employers

1. **Post a Job**
   - Visit `/jobs/post`
   - Fill out 3-step form:
     - **Step 1**: Job details (title, location, description, etc.)
     - **Step 2**: Company info (email, website, logo)
     - **Step 3**: Review listing type (free for 30 days)
   - Submit for review

2. **After Submission**
   - Job enters "pending" status
   - Admin reviews and approves
   - Once approved, job is published for 30 days
   - Job appears in `/jobs` listing

### For Admins

1. **Access Dashboard**
   - Go to `/admin/jobs`
   - Enter your ADMIN_API_KEY
   - View all job submissions

2. **Manage Jobs**
   - Filter by status (pending, published, all)
   - **Approve**: Click "Approve" to publish pending jobs
   - **Delete**: Remove spam or inappropriate jobs
   - **View**: Click job title to see public-facing page

## 🔌 API Endpoints

### POST /api/jobs
Create a new job posting

**Request:**
```json
{
  "jobTitle": "Senior MCP Developer",
  "companyName": "Acme Corp",
  "location": "San Francisco, CA",
  "workLocation": "Hybrid",
  "jobType": "Full Time",
  "salaryRange": "$120k - $180k",
  "applicationUrl": "https://company.com/apply",
  "description": "We're looking for...",
  "requirements": "• 3+ years experience...",
  "benefits": "• Competitive salary...",
  "contactEmail": "hiring@company.com",
  "companyWebsite": "https://company.com",
  "companyLogoUrl": "https://company.com/logo.png"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Job posted successfully!",
  "slug": "senior-mcp-developer-acme-corp-abc123",
  "id": "cm1x2y3z4..."
}
```

### GET /api/jobs
List all jobs (public: published only, admin: all)

**Public Request:**
```
GET /api/jobs
```

**Admin Request:**
```
GET /api/jobs?apiKey=YOUR_KEY&status=pending
```

### PATCH /api/jobs/[id]
Update job status (admin only)

**Request:**
```json
{
  "apiKey": "YOUR_KEY",
  "status": "published",
  "publishedAt": "2025-10-06T..."
}
```

### DELETE /api/jobs/[id]
Delete a job (admin only)

**Request:**
```json
{
  "apiKey": "YOUR_KEY"
}
```

## 🎨 UI/UX Features

### Jobs Listing Page
- ✅ Clean card-based layout
- ✅ Company logos
- ✅ Work location badges
- ✅ Quick filter buttons
- ✅ CTA banner to post jobs
- ✅ "Apply Now" links

### Post Job Form
- ✅ Multi-step wizard interface
- ✅ Progress indicators
- ✅ Real-time validation
- ✅ Loading states
- ✅ Success/error messages
- ✅ Mobile responsive

### Job Detail Page
- ✅ Full-width layout
- ✅ Sidebar with company info
- ✅ Similar jobs section
- ✅ Apply button prominent
- ✅ Share functionality
- ✅ Formatted lists (bullets)

### Admin Dashboard
- ✅ Data table view
- ✅ Status badges
- ✅ Quick action buttons
- ✅ Filter tabs
- ✅ Link to job preview

## 🔐 Security

- ✅ **Admin protection**: API key required for admin actions
- ✅ **Email validation**: Contact emails verified
- ✅ **URL validation**: Application URLs checked
- ✅ **SQL injection prevention**: Prisma ORM parameterized queries
- ✅ **Input sanitization**: All fields validated
- ✅ **Status workflow**: Jobs can't self-publish

## 📊 Job Lifecycle

```
1. Company submits job
   ↓
2. Job created with status: "pending"
   ↓
3. Admin reviews job
   ↓
4. Admin approves → status: "published", publishedAt: now()
   ↓
5. Job visible on /jobs for 30 days
   ↓
6. After 30 days → status: "expired" (optional automation)
```

## 🛠️ Common Tasks

### Add a Test Job (Development)

You can use the Prisma Studio or API:

```typescript
// Via API
const response = await fetch('/api/jobs', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jobTitle: 'Senior AI Engineer',
    companyName: 'Tech Corp',
    location: 'Remote',
    workLocation: 'Remote',
    jobType: 'Full Time',
    applicationUrl: 'https://example.com/apply',
    description: 'Build the future of AI...',
    contactEmail: 'jobs@example.com',
  }),
});
```

### Approve a Job (Admin)

1. Go to `/admin/jobs`
2. Enter API key
3. Find pending job
4. Click "Approve"
5. Job now visible at `/jobs`

### Query Jobs Directly

```bash
# View in Prisma Studio
npm run db:studio

# Or via SQL
SELECT * FROM "Job" WHERE status = 'published' ORDER BY "publishedAt" DESC;
```

## 🎯 Usage Examples

### Example Job Post Flow

1. **Employer visits** `/jobs`
2. **Clicks** "Post a Job" button
3. **Fills out form:**
   - Job Title: "Full-Stack AI Engineer"
   - Company: "Anthropic"
   - Location: "San Francisco, CA"
   - Work: "Hybrid"
   - Type: "Full Time"
   - Description: "Work on Claude..."
4. **Submits** form
5. **Receives** confirmation message
6. **Admin approves** within 24 hours
7. **Job goes live** at `/jobs/full-stack-ai-engineer-anthropic-xyz123`
8. **Candidates apply** via external link
9. **Job expires** after 30 days (or can be renewed)

## 📈 Future Enhancements

Consider adding:

- [ ] Email notifications when jobs are approved
- [ ] Featured job listings (paid)
- [ ] Company profiles
- [ ] Job search functionality
- [ ] Location-based filtering
- [ ] Save/bookmark jobs
- [ ] Email alerts for new jobs
- [ ] Analytics for job views
- [ ] RSS feed for jobs
- [ ] Integration with job boards (LinkedIn, Indeed)

## 🔗 Navigation

The jobs board is accessible via:

- **Header navigation**: "Jobs in AI" link
- **Direct URL**: `/jobs`
- **Post job**: `/jobs/post`
- **Admin**: `/admin/jobs`

## 📝 Notes

- **Free listings**: Currently all jobs are free for 30 days
- **Approval required**: Jobs must be approved by admin before going live
- **Auto-expiration**: Jobs expire after 30 days (can be automated)
- **Database**: Uses same Vercel Postgres as waitlist
- **No login required**: Anyone can submit jobs (moderation prevents spam)

## 🎉 You're Ready!

Your jobs board is fully functional and integrated with your ACP Market site!

**Test it out:**
1. Visit http://localhost:3000/jobs
2. Click "Post a Job"
3. Submit a test job
4. Go to http://localhost:3000/admin/jobs
5. Approve the job
6. See it live at http://localhost:3000/jobs

**When deployed:**
- Jobs board: `https://your-domain.vercel.app/jobs`
- Post job: `https://your-domain.vercel.app/jobs/post`
- Admin: `https://your-domain.vercel.app/admin/jobs`

---

Need help? All the code is well-commented and follows Next.js best practices!

