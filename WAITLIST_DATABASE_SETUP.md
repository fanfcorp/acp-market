# Waitlist Database Setup Guide

## Overview

The waitlist registration system stores user submissions in a PostgreSQL database using Prisma ORM. This guide will help you set up and manage the database.

## Prerequisites

- PostgreSQL database (local or cloud-hosted)
- Node.js and npm installed

## Quick Setup

### 1. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database connection URL
DATABASE_URL="postgresql://username:password@localhost:5432/acp_market"

# Admin API Key for accessing waitlist entries
ADMIN_API_KEY="your-secure-admin-api-key-here"
```

**For local development:**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/acp_market"
```

**For production (examples):**
- Vercel Postgres: `DATABASE_URL="postgres://..."` (auto-configured)
- Supabase: `DATABASE_URL="postgresql://postgres:[password]@[project].supabase.co:5432/postgres"`
- Railway: `DATABASE_URL="postgresql://..."` (provided by Railway)

### 2. Generate a Secure Admin API Key

```bash
# On macOS/Linux
openssl rand -base64 32

# Or use any secure random string generator
```

Add this to your `.env` file as `ADMIN_API_KEY`.

### 3. Run Database Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Create and apply migrations
npx prisma migrate dev --name init

# Or for production
npx prisma migrate deploy
```

### 4. Verify Setup

```bash
# Open Prisma Studio to view your database
npx prisma studio
```

## Database Schema

The `WaitlistEntry` model stores:

- **id**: Unique identifier (CUID)
- **email**: User's email address (unique)
- **tools**: Optional text describing tools they need
- **consent**: Whether they agreed to receive emails
- **createdAt**: Timestamp when they joined
- **updatedAt**: Last update timestamp

## Using the Waitlist System

### Frontend Form

Users can join the waitlist at:
- **URL**: `/power-your-agents#waitlist`
- **Component**: `WaitlistForm` (client-side interactive form)

### API Endpoints

#### Submit to Waitlist
```http
POST /api/waitlist
Content-Type: application/json

{
  "email": "user@example.com",
  "tools": "CRM integration, Slack, etc.",
  "consent": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully joined the waitlist!",
  "id": "..."
}
```

#### View Waitlist Entries (Admin)
```http
GET /api/waitlist?apiKey=YOUR_ADMIN_API_KEY
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "entries": [
    {
      "id": "...",
      "email": "user@example.com",
      "tools": "...",
      "consent": true,
      "createdAt": "2025-10-06T..."
    }
  ]
}
```

### Admin Dashboard

Access the admin dashboard at:
- **URL**: `/admin/waitlist`
- **Features**:
  - View all waitlist entries
  - Export to CSV
  - Protected by API key authentication

## Database Management

### View Data with Prisma Studio

```bash
npx prisma studio
```

This opens a web interface at `http://localhost:5555` where you can:
- Browse entries
- Edit records
- Add test data

### Export Data

#### Using the Admin Dashboard
1. Go to `/admin/waitlist`
2. Enter your API key
3. Click "Export CSV"

#### Using Prisma
```bash
# Export to JSON
npx prisma db seed
```

#### Direct PostgreSQL Query
```sql
SELECT email, tools, consent, created_at 
FROM "WaitlistEntry" 
ORDER BY created_at DESC;
```

### Common Operations

#### Reset Database
```bash
npx prisma migrate reset
```

#### Update Schema
1. Edit `prisma/schema.prisma`
2. Run: `npx prisma migrate dev --name description_of_changes`

#### Backup Database
```bash
# PostgreSQL dump
pg_dump -h localhost -U username -d acp_market > backup.sql
```

## Deployment

### Vercel + Vercel Postgres

1. Install Vercel Postgres:
   ```bash
   npm install @vercel/postgres
   ```

2. Add database in Vercel dashboard:
   - Go to Storage → Create Database → Postgres
   - Connection string is auto-configured

3. Run migrations:
   ```bash
   vercel env pull .env.local
   npx prisma migrate deploy
   ```

### Vercel + Supabase

1. Create Supabase project at [supabase.com](https://supabase.com)

2. Get connection string:
   - Go to Project Settings → Database
   - Copy "Connection string" with `[password]` replaced

3. Add to Vercel environment variables:
   ```
   DATABASE_URL=postgresql://postgres:[password]@[project].supabase.co:5432/postgres
   ADMIN_API_KEY=your-secure-key
   ```

4. Deploy migrations:
   ```bash
   npx prisma migrate deploy
   ```

### Railway

1. Create new project at [railway.app](https://railway.app)
2. Add PostgreSQL database
3. Copy `DATABASE_URL` from variables
4. Add to your environment variables
5. Run `npx prisma migrate deploy`

## Monitoring and Analytics

### View Stats

```sql
-- Total signups
SELECT COUNT(*) FROM "WaitlistEntry";

-- Signups with consent
SELECT COUNT(*) FROM "WaitlistEntry" WHERE consent = true;

-- Signups by day
SELECT DATE(created_at) as date, COUNT(*) as signups
FROM "WaitlistEntry"
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Most requested tools
SELECT tools, COUNT(*) as count
FROM "WaitlistEntry"
WHERE tools IS NOT NULL AND tools != ''
GROUP BY tools
ORDER BY count DESC
LIMIT 10;
```

## Troubleshooting

### "Cannot find module '@prisma/client'"
```bash
npx prisma generate
```

### Migration errors
```bash
# Reset and recreate
npx prisma migrate reset
npx prisma migrate dev
```

### Connection errors
- Check `DATABASE_URL` is correct
- Verify database is running
- Check network/firewall settings
- Ensure PostgreSQL version compatibility

## Security Best Practices

1. **Never commit `.env` files** - Already in `.gitignore`
2. **Use strong API keys** - Generate with `openssl rand -base64 32`
3. **Enable SSL in production** - Add `?sslmode=require` to DATABASE_URL
4. **Rotate API keys regularly**
5. **Monitor access logs**

## Next Steps

- Set up email notifications for new signups
- Add analytics dashboard
- Implement duplicate email handling
- Add email verification
- Set up automated backups

## Support

For issues or questions:
- Check Prisma docs: https://www.prisma.io/docs
- Check Next.js docs: https://nextjs.org/docs
- Review the code in `/src/app/api/waitlist/` and `/src/components/WaitlistForm.tsx`

