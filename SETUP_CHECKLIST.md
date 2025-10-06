# ✅ Setup Checklist

Use this checklist to get your waitlist database up and running.

## Prerequisites
- [ ] Node.js installed (v18 or higher)
- [ ] PostgreSQL database available (local or cloud)

## Setup Steps

### 1️⃣ Environment Configuration
- [ ] Copy `.env.template` to `.env`
  ```bash
  cp .env.template .env
  ```
- [ ] Get your database connection string
- [ ] Generate an admin API key
  ```bash
  openssl rand -base64 32
  ```
- [ ] Update `.env` with both values

### 2️⃣ Database Setup
- [ ] Run database migration
  ```bash
  npm run db:migrate
  ```
- [ ] When prompted, enter migration name: `init`
- [ ] Verify migration completed successfully

### 3️⃣ Testing Locally
- [ ] Start development server
  ```bash
  npm run dev
  ```
- [ ] Visit http://localhost:3000/power-your-agents
- [ ] Submit a test entry in the waitlist form
- [ ] Check for success message

### 4️⃣ Verify Data Storage
- [ ] Open Prisma Studio
  ```bash
  npm run db:studio
  ```
- [ ] Verify test entry appears in database
- [ ] Or visit http://localhost:3000/admin/waitlist
- [ ] Enter your API key to view entries

### 5️⃣ Production Deployment (Optional)
- [ ] Choose hosting provider (Vercel recommended)
- [ ] Set up production database
- [ ] Add environment variables to hosting platform
  - `DATABASE_URL`
  - `ADMIN_API_KEY`
- [ ] Deploy application
- [ ] Run production migrations
  ```bash
  npm run db:migrate:deploy
  ```
- [ ] Test production waitlist form

## Quick Tests

### Test 1: Form Submission
1. Go to `/power-your-agents#waitlist`
2. Fill in email: `test@example.com`
3. Add tools description (optional)
4. Check consent checkbox
5. Click "Join Waitlist"
6. ✅ Should see success message

### Test 2: Duplicate Prevention
1. Submit same email again
2. ✅ Should see "already registered" message

### Test 3: Admin Access
1. Go to `/admin/waitlist`
2. Enter your `ADMIN_API_KEY`
3. ✅ Should see list of entries
4. Click "Export CSV"
5. ✅ Should download CSV file

### Test 4: API Endpoint
```bash
# Submit via API
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"api@test.com","tools":"Testing","consent":true}'

# Should return: {"success":true,"message":"Successfully joined the waitlist!","id":"..."}
```

## Troubleshooting

### Issue: "Cannot connect to database"
**Solution:**
- Check `DATABASE_URL` in `.env`
- Ensure PostgreSQL is running
- Test connection string

### Issue: "Module '@prisma/client' not found"
**Solution:**
```bash
npm run db:generate
```

### Issue: "Migration failed"
**Solution:**
```bash
npm run db:reset
npm run db:migrate
```

### Issue: "Unauthorized" on admin page
**Solution:**
- Check `ADMIN_API_KEY` in `.env`
- Ensure no extra spaces in API key
- Clear browser session storage

## Database Providers Quick Setup

### Vercel Postgres
1. ✅ Go to Vercel Dashboard → Storage
2. ✅ Create Postgres database
3. ✅ Connection string auto-added to env vars
4. ✅ Pull env: `vercel env pull .env.local`
5. ✅ Run: `npm run db:migrate:deploy`

### Supabase
1. ✅ Create project at supabase.com
2. ✅ Settings → Database → Connection string
3. ✅ Copy "URI" (not connection pooling)
4. ✅ Add to `.env` as `DATABASE_URL`
5. ✅ Run: `npm run db:migrate`

### Railway
1. ✅ Create project at railway.app
2. ✅ Add PostgreSQL service
3. ✅ Copy `DATABASE_URL` from variables
4. ✅ Add to `.env`
5. ✅ Run: `npm run db:migrate`

### Local PostgreSQL
1. ✅ Install PostgreSQL
2. ✅ Create database: `createdb acp_market`
3. ✅ Use: `DATABASE_URL="postgresql://postgres:password@localhost:5432/acp_market"`
4. ✅ Run: `npm run db:migrate`

## Next Actions

After setup is complete:

- [ ] Update API key to a secure value for production
- [ ] Test form on mobile devices
- [ ] Set up monitoring/alerts for new signups
- [ ] Plan email campaign for waitlist users
- [ ] Consider adding reCAPTCHA
- [ ] Set up automated backups
- [ ] Document internal processes

## Resources

📖 **Documentation:**
- Quick Start: `QUICKSTART.md`
- Full Setup: `WAITLIST_DATABASE_SETUP.md`
- Implementation: `IMPLEMENTATION_SUMMARY.md`

🔗 **External Links:**
- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/)

## Success Criteria

You'll know everything is working when:

✅ Form submission shows success message
✅ Entries appear in Prisma Studio
✅ Admin dashboard displays entries
✅ CSV export downloads correctly
✅ Duplicate emails are prevented
✅ API endpoints respond correctly

---

**Need help?** Check `WAITLIST_DATABASE_SETUP.md` for detailed troubleshooting.

**Ready to go?** Start at step 1️⃣ above!

