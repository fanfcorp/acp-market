# ACP Market

A modern marketplace for AI Control Plane (ACP) servers, featuring job postings, waitlist management, and comprehensive admin tools.

## 🎯 Features

- **🔍 ACP Market** - Browse and discover AI Control Plane servers
- **💼 Jobs Board** - Post and discover AI/ACP job opportunities
- **📝 Waitlist System** - Collect user registrations with PostgreSQL database
- **📧 Email Notifications** - Professional branded emails for job submissions
- **📊 Admin Dashboard** - Manage waitlist entries and job postings
- **🎨 Modern UI** - Built with Next.js 15, React 19, and Tailwind CSS

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

```bash
# Copy environment template
cp .env.template .env

# Edit .env with your credentials:
# - DATABASE_URL (PostgreSQL connection)
# - ADMIN_API_KEY (for admin access)
# - RESEND_API_KEY (for emails, optional)

# Run database migrations
npm run db:migrate
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app!

## 📁 Project Structure

```
/Users/francoisgoupil/Documents/ACP market/
├── docs/                          # Documentation
│   ├── QUICKSTART.md             # Quick setup guide
│   ├── ARCHITECTURE.md           # System architecture
│   ├── JOBS_BOARD_GUIDE.md       # Jobs board documentation
│   ├── WAITLIST_DATABASE_SETUP.md # Waitlist setup guide
│   ├── EMAIL_SETUP.md            # Email configuration
│   └── SETUP_CHECKLIST.md        # Step-by-step checklist
├── src/
│   ├── app/                      # Next.js app directory
│   │   ├── jobs/                 # Jobs board pages
│   │   ├── admin/                # Admin dashboard
│   │   ├── api/                  # API routes
│   │   └── ...
│   ├── components/               # React components
│   ├── emails/                   # Email templates
│   └── lib/                      # Utilities (Prisma, etc.)
├── prisma/
│   └── schema.prisma             # Database schema
├── public/                       # Static assets
├── .env.template                 # Environment variables template
└── README.md                     # This file
```

## 📚 Documentation

### Getting Started
- **[Quick Start Guide](./docs/QUICKSTART.md)** - Get up and running in 3 steps
- **[Setup Checklist](./docs/SETUP_CHECKLIST.md)** - Complete setup checklist

### Features
- **[Jobs Board Guide](./docs/JOBS_BOARD_GUIDE.md)** - Complete jobs board documentation
- **[Waitlist Database Setup](./docs/WAITLIST_DATABASE_SETUP.md)** - Waitlist system guide
- **[Email Setup](./docs/EMAIL_SETUP.md)** - Configure email notifications

### Technical
- **[Architecture](./docs/ARCHITECTURE.md)** - System architecture and data flow
- **[Implementation Summary](./docs/IMPLEMENTATION_SUMMARY.md)** - What was built

## 🗄️ Database

This project uses **PostgreSQL** with **Prisma ORM**.

### Available Scripts

```bash
# View database in browser
npm run db:studio

# Create migrations
npm run db:migrate

# Deploy migrations to production
npm run db:migrate:deploy

# Push schema changes (development)
npm run db:push

# Reset database (WARNING: deletes all data)
npm run db:reset
```

### Models

- **WaitlistEntry** - Stores waitlist registrations
- **Job** - Stores job postings with approval workflow

## 🌐 Key Pages

### Public Pages
- `/` - Home page
- `/jobs` - Browse job postings
- `/jobs/post` - Post a job
- `/jobs/[slug]` - Individual job page
- `/power-your-agents` - Waitlist form
- `/categories` - Browse categories
- `/leaderboard` - Server leaderboard

### Admin Pages (Protected)
- `/admin/waitlist` - Manage waitlist entries
- `/admin/jobs` - Manage job postings

### API Endpoints
- `/api/waitlist` - Waitlist operations
- `/api/jobs` - Job posting operations
- `/api/jobs/[id]` - Job management (update/delete)

## 🔐 Environment Variables

Required environment variables (see `.env.template`):

```bash
# Database (Required)
DATABASE_URL="postgresql://..."

# Admin Access (Required)
ADMIN_API_KEY="your-secure-api-key"

# Email Notifications (Optional)
RESEND_API_KEY="re_your_api_key"
```

## 🎨 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **React**: 19.1.0
- **Database**: PostgreSQL + Prisma ORM
- **Styling**: Tailwind CSS 4
- **Email**: Resend
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Import your repository
   - Vercel auto-detects Next.js

3. **Add Environment Variables**
   - Settings → Environment Variables
   - Add `DATABASE_URL`, `ADMIN_API_KEY`, `RESEND_API_KEY`

4. **Deploy**
   - Vercel auto-deploys on push

### Database Setup for Production

Choose a PostgreSQL provider:
- **Vercel Postgres** (easiest, auto-configured)
- **Supabase** (generous free tier)
- **Railway** (simple setup)
- **Neon** (serverless PostgreSQL)

Run migrations:
```bash
npm run db:migrate:deploy
```

## 📧 Email Setup

To enable email notifications:

1. Sign up at [resend.com](https://resend.com) (free tier: 100 emails/day)
2. Get your API key
3. Add `RESEND_API_KEY` to environment variables
4. See [Email Setup Guide](./docs/EMAIL_SETUP.md) for details

## 🛠️ Development

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 📖 Learn More

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub](https://github.com/vercel/next.js)

### Prisma Resources
- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Studio](https://www.prisma.io/studio)

## 🤝 Contributing

This is a private project. For questions or issues, contact the development team.

## 📝 License

Private and confidential.

---

**Built with ❤️ using Next.js and deployed on Vercel**
