# Quick Start Guide - Waitlist Database

## ⚡ Get Started in 3 Steps

### Step 1: Set up your database connection

Create a `.env` file in the root directory:

```bash
# Copy and edit this:
DATABASE_URL="postgresql://username:password@localhost:5432/acp_market"
ADMIN_API_KEY="replace-with-secure-random-string"
```

**Quick Options:**

**Option A: Local PostgreSQL** (if you have PostgreSQL installed)
```bash
# Create database
createdb acp_market

# Then use:
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/acp_market"
```

**Option B: Vercel Postgres** (recommended for production)
1. Go to your Vercel project → Storage → Create Database
2. Select Postgres
3. Copy the `DATABASE_URL` automatically added to your environment variables

**Option C: Supabase** (free tier available)
1. Create project at [supabase.com](https://supabase.com)
2. Get connection string from Settings → Database
3. Use the "Connection string" (not "Connection pooling")

**Option D: Railway** (simple setup)
1. Create project at [railway.app](https://railway.app)
2. Add PostgreSQL database
3. Copy `DATABASE_URL` from variables

### Step 2: Run database migration

```bash
# This creates the database tables
npm run db:migrate
```

When prompted for a migration name, enter: `init`

### Step 3: Start your app

```bash
npm run dev
```

Visit http://localhost:3000/power-your-agents to see the waitlist form!

## 🎯 Testing the Setup

1. **Submit a test entry:**
   - Go to http://localhost:3000/power-your-agents#waitlist
   - Fill out the form
   - Click "Join Waitlist"

2. **View entries in Prisma Studio:**
   ```bash
   npm run db:studio
   ```
   Opens at http://localhost:5555

3. **View in admin dashboard:**
   - Go to http://localhost:3000/admin/waitlist
   - Enter your `ADMIN_API_KEY` from `.env`
   - View and export entries

## 📊 Useful Commands

```bash
# View database in browser
npm run db:studio

# Create a new migration after schema changes
npm run db:migrate

# Push schema changes without migration
npm run db:push

# Deploy migrations to production
npm run db:migrate:deploy

# Reset database (WARNING: deletes all data)
npm run db:reset
```

## 🔑 Generate a Secure API Key

```bash
# macOS/Linux
openssl rand -base64 32

# Or visit: https://generate-secret.vercel.app/32
```

Add the result to your `.env` file as `ADMIN_API_KEY`.

## 🚀 Deploy to Production

### With Vercel:

1. **Add database:**
   ```bash
   vercel
   # Then add Postgres in dashboard
   ```

2. **Set environment variable:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add `ADMIN_API_KEY` with a secure value

3. **Deploy:**
   ```bash
   git push origin main
   # Vercel auto-deploys
   ```

4. **Run migrations:**
   ```bash
   vercel env pull .env.local
   npm run db:migrate:deploy
   ```

## 📧 Access Your Data

### Export to CSV
1. Go to `/admin/waitlist`
2. Enter API key
3. Click "Export CSV"

### Query directly
```sql
-- Connect to your database and run:
SELECT * FROM "WaitlistEntry" ORDER BY "createdAt" DESC;
```

## ❓ Troubleshooting

**"Cannot find module '@prisma/client'"**
```bash
npm run db:generate
```

**"Error: P1001: Can't reach database server"**
- Check your `DATABASE_URL` in `.env`
- Make sure PostgreSQL is running
- Verify connection details (username, password, host, port)

**Migration errors**
```bash
npm run db:reset
npm run db:migrate
```

## 📚 Need More Help?

- See full documentation: `WAITLIST_DATABASE_SETUP.md`
- Prisma docs: https://www.prisma.io/docs
- Next.js API routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

## ✅ What's Included

- ✅ PostgreSQL database with Prisma ORM
- ✅ Interactive waitlist form (`/power-your-agents`)
- ✅ API endpoint (`/api/waitlist`)
- ✅ Admin dashboard (`/admin/waitlist`)
- ✅ CSV export functionality
- ✅ Duplicate email prevention
- ✅ Form validation
- ✅ Success/error messages

---

**Your waitlist is ready to go!** 🎉

Start collecting signups at: `/power-your-agents#waitlist`

