# Waitlist System Architecture

## 🏗️ System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                          User Interface                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  /power-your-agents               /admin/waitlist               │
│  ┌────────────────┐               ┌────────────────┐            │
│  │ WaitlistForm   │               │ Admin          │            │
│  │ Component      │               │ Dashboard      │            │
│  └────────┬───────┘               └────────┬───────┘            │
│           │                                │                     │
└───────────┼────────────────────────────────┼─────────────────────┘
            │                                │
            │ POST /api/waitlist             │ GET /api/waitlist
            │                                │ ?apiKey=xxx
            ▼                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                          API Layer                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  /src/app/api/waitlist/route.ts                                 │
│  ┌───────────────────────────────────────────────────────┐      │
│  │  POST Handler            GET Handler                  │      │
│  │  - Validate email        - Check API key              │      │
│  │  - Check duplicates      - Fetch all entries          │      │
│  │  - Store data            - Return JSON                │      │
│  │  - Return success        - Order by date              │      │
│  └─────────────┬──────────────────────┬───────────────────┘      │
│                │                      │                          │
└────────────────┼──────────────────────┼──────────────────────────┘
                 │                      │
                 ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Data Access Layer                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  /src/lib/prisma.ts                                              │
│  ┌─────────────────────────────────────────────────────┐        │
│  │  Prisma Client Singleton                            │        │
│  │  - Database connection pooling                      │        │
│  │  - Query builder                                    │        │
│  │  - Type-safe operations                             │        │
│  └────────────────────────┬────────────────────────────┘        │
│                           │                                      │
└───────────────────────────┼──────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Database Layer                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  PostgreSQL Database                                             │
│  ┌─────────────────────────────────────────────────────┐        │
│  │  WaitlistEntry Table                                │        │
│  │  ┌────────────┬───────────┬─────────────────────┐  │        │
│  │  │ id (CUID)  │ Type      │ Constraints         │  │        │
│  │  ├────────────┼───────────┼─────────────────────┤  │        │
│  │  │ id         │ String    │ PRIMARY KEY         │  │        │
│  │  │ email      │ String    │ UNIQUE, INDEX       │  │        │
│  │  │ tools      │ String?   │ NULLABLE            │  │        │
│  │  │ consent    │ Boolean   │ DEFAULT false       │  │        │
│  │  │ createdAt  │ DateTime  │ DEFAULT now, INDEX  │  │        │
│  │  │ updatedAt  │ DateTime  │ AUTO UPDATE         │  │        │
│  │  └────────────┴───────────┴─────────────────────┘  │        │
│  └─────────────────────────────────────────────────────┘        │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## 📊 Data Flow

### User Registration Flow

```
1. User visits /power-your-agents
   └─> Page loads WaitlistForm component

2. User fills form
   └─> Email: user@example.com
   └─> Tools: "Slack, CRM integrations"
   └─> Consent: ✓ checked

3. User clicks "Join Waitlist"
   └─> Form validation runs (client-side)
   └─> Email format check
   └─> Required fields check

4. POST request to /api/waitlist
   {
     "email": "user@example.com",
     "tools": "Slack, CRM integrations",
     "consent": true
   }

5. API Handler processes request
   └─> Validates email format
   └─> Normalizes email (lowercase)
   └─> Checks for duplicates via Prisma

6. Database operation
   └─> UPSERT query
   └─> If new: INSERT entry
   └─> If exists: UPDATE entry

7. Response sent to client
   {
     "success": true,
     "message": "Successfully joined the waitlist!",
     "id": "cm1x2y3z4..."
   }

8. UI updates
   └─> Show success message
   └─> Clear form fields
   └─> Re-enable submit button
```

### Admin View Flow

```
1. Admin visits /admin/waitlist
   └─> Page loads admin dashboard

2. Admin enters API key
   └─> Stored in session storage

3. GET request to /api/waitlist?apiKey=xxx
   └─> API validates key against ADMIN_API_KEY env var

4. If authenticated:
   └─> Prisma fetches all entries
   └─> Orders by createdAt DESC
   └─> Selects safe fields only

5. Response with data
   {
     "success": true,
     "count": 42,
     "entries": [...]
   }

6. Dashboard displays data
   └─> Renders table with entries
   └─> Enables CSV export
   └─> Shows entry count
```

## 🗂️ File Structure and Responsibilities

```
src/
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts          # API endpoints (POST, GET)
│   │                              # - Request validation
│   │                              # - Business logic
│   │                              # - Error handling
│   │
│   ├── power-your-agents/
│   │   └── page.tsx               # Public landing page
│   │                              # - Renders WaitlistForm
│   │                              # - Static content
│   │
│   └── admin/
│       └── waitlist/
│           └── page.tsx           # Admin dashboard
│                                  # - Authentication UI
│                                  # - Data table display
│                                  # - CSV export logic
│
├── components/
│   └── WaitlistForm.tsx           # Client component
│                                  # - Form state management
│                                  # - Validation
│                                  # - API communication
│                                  # - UI feedback
│
└── lib/
    └── prisma.ts                  # Database client
                                   # - Singleton pattern
                                   # - Connection pooling
                                   # - Dev/prod optimization

prisma/
└── schema.prisma                  # Database schema
                                   # - Model definitions
                                   # - Indexes
                                   # - Constraints
```

## 🔒 Security Layers

```
┌──────────────────────────────────────────────────────┐
│ Layer 1: Client-Side Validation                     │
├──────────────────────────────────────────────────────┤
│ - Email format validation                            │
│ - Required field checks                              │
│ - Form state management                              │
└────────────────────┬─────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────┐
│ Layer 2: API Request Validation                      │
├──────────────────────────────────────────────────────┤
│ - Request body validation                            │
│ - Email format regex check                           │
│ - Type checking                                      │
│ - API key authentication (GET)                       │
└────────────────────┬─────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────┐
│ Layer 3: Database Constraints                        │
├──────────────────────────────────────────────────────┤
│ - UNIQUE constraint on email                         │
│ - Type enforcement                                   │
│ - Required field constraints                         │
│ - Indexed queries for performance                    │
└────────────────────┬─────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────┐
│ Layer 4: Prisma ORM Protection                       │
├──────────────────────────────────────────────────────┤
│ - SQL injection prevention                           │
│ - Parameterized queries                              │
│ - Type safety                                        │
│ - Connection pooling                                 │
└──────────────────────────────────────────────────────┘
```

## 🔄 State Management

### Client-Side State (WaitlistForm.tsx)

```typescript
const [email, setEmail] = useState('')           // Form input
const [tools, setTools] = useState('')           // Form input
const [consent, setConsent] = useState(false)    // Form input
const [isSubmitting, setIsSubmitting] = useState(false)  // Loading state
const [message, setMessage] = useState(null)     // Success/error message
```

### Server-Side State (Prisma/PostgreSQL)

```typescript
// Persisted in database
interface WaitlistEntry {
  id: string        // Generated CUID
  email: string     // Normalized (lowercase)
  tools: string?    // Optional user input
  consent: boolean  // User preference
  createdAt: Date   // Auto-generated
  updatedAt: Date   // Auto-updated
}
```

## 🌐 API Contracts

### POST /api/waitlist

**Request:**
```typescript
{
  email: string      // Required, valid email format
  tools?: string     // Optional, any text
  consent: boolean   // Required, true/false
}
```

**Response (Success):**
```typescript
{
  success: true
  message: string
  id: string        // CUID of created entry
}
```

**Response (Error):**
```typescript
{
  error: string     // Human-readable error message
}
```

**Status Codes:**
- `201` - Created successfully
- `400` - Invalid request (bad email, missing fields)
- `409` - Conflict (email already exists)
- `500` - Server error

### GET /api/waitlist?apiKey=xxx

**Request:**
```typescript
Query Parameters:
  apiKey: string    // Required, must match ADMIN_API_KEY
```

**Response (Success):**
```typescript
{
  success: true
  count: number
  entries: Array<{
    id: string
    email: string
    tools: string | null
    consent: boolean
    createdAt: string  // ISO 8601 format
  }>
}
```

**Response (Error):**
```typescript
{
  error: string
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized (invalid API key)
- `500` - Server error

## 📈 Performance Optimizations

1. **Database Indexes**
   - Email field indexed for fast lookups
   - CreatedAt indexed for sorting

2. **Connection Pooling**
   - Prisma Client singleton pattern
   - Prevents connection exhaustion

3. **Client-Side Caching**
   - Admin API key stored in sessionStorage
   - Prevents redundant authentication

4. **Upsert Operations**
   - Single database query for insert or update
   - Reduces round trips

5. **Selective Field Queries**
   - GET endpoint only returns needed fields
   - Reduces payload size

## 🔌 Integration Points

### Email Service (Future)
```typescript
// Can be integrated in API route
await sendWelcomeEmail(email)
await notifyAdmin(entry)
```

### Analytics (Future)
```typescript
// Track conversions
analytics.track('waitlist_signup', {
  email: entry.email,
  source: 'power-your-agents'
})
```

### CRM Export (Future)
```typescript
// Sync to external CRM
await syncToHubspot(entry)
await syncToMailchimp(entry)
```

## 🎯 Extension Points

The architecture supports easy addition of:

1. **Email Verification**
   - Add `verified: boolean` field
   - Generate verification tokens
   - Send confirmation emails

2. **Rate Limiting**
   - Add middleware for request throttling
   - Prevent spam submissions

3. **Referral Tracking**
   - Add `referredBy: string?` field
   - Track referral sources
   - Implement referral rewards

4. **Custom Fields**
   - Modify Prisma schema
   - Update API validation
   - Extend form component

5. **Webhooks**
   - Notify external systems on signup
   - Trigger automation workflows

---

**This architecture provides:**
- ✅ Separation of concerns
- ✅ Type safety end-to-end
- ✅ Scalable database design
- ✅ Security best practices
- ✅ Easy to extend and maintain

