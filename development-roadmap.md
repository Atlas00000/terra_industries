# Terra Industries - Unified Development Roadmap

**Last Updated:** November 3, 2025  
**Version:** 2.0  
**Status:** Phase 1-2 Complete - Ready for Backend Development

---

## ✅ **Completion Status**

### **Phase 1-2: Frontend Optimization - COMPLETE ✅**
- ✅ Image optimization (WebP/AVIF)
- ✅ Font optimization (self-hosted)
- ✅ Code splitting (dynamic imports)
- ✅ TypeScript strict mode (68 → 0 errors)
- ✅ Testing infrastructure (82% coverage, 66 tests)
- ✅ Error tracking (Sentry)
- ✅ Security headers (7 total)
- ✅ Component cleanup (removed 7 duplicates)
- ✅ ESLint configuration
- ✅ Environment validation

### **Phase 3+: Backend Development - READY TO START 🚀**
- ⏳ Contact & Inquiry API
- ⏳ RFQ System
- ⏳ Admin Authentication
- ⏳ Admin Panel
- ⏳ Content Management (Stories, Products)
- ⏳ Media Management (Cloudflare R2)

---

## 🎯 **Overview**

This roadmap consolidates frontend optimization and backend development into a single, phased implementation plan. The project runs on two parallel tracks:

- **Frontend Track:** ✅ **COMPLETE** - Performance optimizations on Vercel-hosted Next.js application
- **Backend Track:** 🚀 **READY TO START** - New backend API and admin panel with dedicated database and Cloudflare R2 storage

---

## 📅 **Unified Implementation Timeline**

### **Phase 1: Foundation (Week 1-2)**

#### Frontend Optimizations ⚡
| Priority | Task | Expected Impact |
|----------|------|-----------------|
| 🔴 HIGH | Enable Next.js image optimization | -60-80% bandwidth |
| 🔴 HIGH | Implement Next.js font optimization | -200-500ms FCP |
| 🟡 MEDIUM | Remove non-existent image preloads | Cleaner network |

#### Backend Development 🔧
| Priority | Task | Description |
|----------|------|-------------|
| 🔴 CRITICAL | Contact & Inquiry API | Lead capture system |
| 🔴 CRITICAL | RFQ System API | Quote request management |
| 🔴 CRITICAL | Admin Authentication | JWT-based auth system |
| 🔴 CRITICAL | Basic Admin Panel | Dashboard + inquiry management |
| 🔴 CRITICAL | Email Service Setup | Notifications (provider TBD) |

**Deliverables:**
- ✅ Optimized frontend with faster load times
- ✅ Working backend API for lead capture
- ✅ Admin can login and view inquiries/RFQs
- ✅ Email notifications working

---

### **Phase 2: Enhancement (Week 3-4)**

#### Frontend Optimizations ⚡
| Priority | Task | Expected Impact |
|----------|------|-----------------|
| 🔴 HIGH | Code splitting (lazy load sections) | -30-40% bundle size |
| 🟡 MEDIUM | Fix TypeScript errors | Better code quality |

#### Backend Development 🔧
| Priority | Task | Description |
|----------|------|-------------|
| 🔴 HIGH | News/Stories CMS | Dynamic content management |
| 🔴 HIGH | Product Specs Management | Update product data without deployment |
| 🔴 HIGH | Media Management (Cloudflare R2) | Image/file upload with CDN |
| 🔴 HIGH | Document Management | Upload datasheets, specs |

**Deliverables:**
- ✅ Frontend bundle size reduced significantly
- ✅ TypeScript errors resolved
- ✅ Admin can create/edit stories and products
- ✅ File uploads working with Cloudflare R2
- ✅ Frontend pulling dynamic content from backend

---

### **Phase 3: Advanced Features (Month 2)**

#### Frontend Optimizations ⚡
| Priority | Task | Expected Impact |
|----------|------|-----------------|
| 🟢 LOW | Optimize Next.js config | Additional 5-10% improvement |
| 🟢 LOW | Bundle analyzer review | Identify further optimizations |

#### Backend Development 🔧
| Priority | Task | Description |
|----------|------|-------------|
| 🟡 MEDIUM | Analytics Dashboard | Track inquiries, views, conversions |
| 🟡 MEDIUM | Lead Scoring System | Auto-prioritize high-value leads |
| 🟡 MEDIUM | Document Access Control | Public/restricted document downloads |
| 🟡 MEDIUM | Admin Panel Enhancements | Advanced filters, exports, reports |

**Deliverables:**
- ✅ Fully optimized frontend configuration
- ✅ Analytics tracking business metrics
- ✅ Lead scoring and prioritization active
- ✅ Complete admin panel with all features

---

### **Phase 4: Future Expansion (Month 3+)**

#### Optional Features 📅
| Status | Feature | Notes |
|--------|---------|-------|
| 📅 LATER | Newsletter System | Subscription + campaigns |
| 📅 OPTIONAL | Partner Portal | Evaluate need based on business requirements |
| 🔍 EVALUATE | Additional Optimizations | Based on analytics data |

---

## 🎯 **Frontend Optimization Details**

### 1. **Image Optimization** ⚠️ HIGH PRIORITY
**File:** `next.config.mjs`

**Current State:**
```javascript
images: {
  unoptimized: true,  // ❌ DISABLED
},
```

**Action Required:**
```javascript
images: {
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
},
```

**Impact:**
- 60-80% reduction in image bandwidth
- Automatic WebP/AVIF conversion
- Better LCP scores

---

### 2. **Font Loading Optimization** ⚠️ HIGH PRIORITY
**File:** `app/layout.tsx`

**Current State:** External Google Fonts via `<link>` tag

**Action Required:**
```javascript
import { Inter, JetBrains_Mono, Orbitron } from "next/font/google"

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: 'swap',
  variable: '--font-inter'
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: 'swap',
  variable: '--font-jetbrains'
})

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: 'swap',
  variable: '--font-orbitron'
})
```

Update `tailwind.config`:
```javascript
fontFamily: {
  sans: ['var(--font-inter)', 'sans-serif'],
  mono: ['var(--font-jetbrains)', 'monospace'],
  display: ['var(--font-orbitron)', 'sans-serif'],
}
```

**Impact:**
- 200-500ms faster First Contentful Paint
- Self-hosted fonts
- No external requests

---

### 3. **Code Splitting** ⚠️ HIGH PRIORITY
**File:** `app/page.tsx`

**Action Required:**
```javascript
import dynamic from "next/dynamic"

// Keep critical above-the-fold imports
import { HeroSection } from "@/components/sections/hero-section"
import { WhoWeAreSection } from "@/components/sections/who-we-are-section"

// Lazy load below-the-fold sections
const LeadershipSection = dynamic(
  () => import('@/components/sections/leadership-section').then(mod => ({ default: mod.LeadershipSection })),
  { ssr: false }
)

const ProductEcosystemSection = dynamic(
  () => import('@/components/sections/product-ecosystem-section').then(mod => ({ default: mod.ProductEcosystemSection })),
  { ssr: false }
)

const InternationalSection = dynamic(
  () => import('@/components/sections/international-section').then(mod => ({ default: mod.InternationalSection })),
  { ssr: false }
)

const MobileLeadershipSlideshow = dynamic(
  () => import('@/components/mobile-leadership-slideshow').then(mod => ({ default: mod.MobileLeadershipSlideshow })),
  { ssr: false }
)

const MobileProductSlideshow = dynamic(
  () => import('@/components/mobile-product-slideshow').then(mod => ({ default: mod.MobileProductSlideshow })),
  { ssr: false }
)
```

**Impact:**
- 30-40% reduction in initial bundle
- Faster Time to Interactive
- Better mobile performance

---

### 4. **Remove Non-existent Image Preloads** ⚠️ MEDIUM PRIORITY
**File:** `app/page.tsx` (lines 37-49)

**Action Required:** Remove entire preload block (images don't exist)

**Impact:**
- Eliminates 404 errors
- Cleaner network waterfall

---

### 5. **Fix TypeScript Errors** ⚠️ MEDIUM PRIORITY
**File:** `next.config.mjs`

**Current State:**
```javascript
typescript: {
  ignoreBuildErrors: true,  // ❌ UNSAFE
},
```

**Action Required:**
1. Remove `ignoreBuildErrors: true`
2. Run `pnpm tsc --noEmit` to identify errors
3. Fix errors incrementally

**Impact:**
- Better code quality
- Catch bugs at build time

---

### 6. **Enhanced Next.js Configuration** ⚠️ LOW PRIORITY
**File:** `next.config.mjs`

**Complete Recommended Configuration:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix TypeScript errors instead of ignoring
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Enable image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Keep standalone output for Docker
  output: 'standalone',
  
  // Performance optimizations
  swcMinify: true,
  compress: true,
  
  // React optimization
  reactStrictMode: true,
  
  // Experimental optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      'lucide-react',
      'framer-motion'
    ],
  },
}

export default nextConfig
```

---

### 📊 **Frontend Performance Improvements Summary**

After all optimizations:

- **First Contentful Paint (FCP):** -1.5 to -2 seconds
- **Largest Contentful Paint (LCP):** -2 to -3 seconds  
- **Time to Interactive (TTI):** -1 to -1.5 seconds
- **Initial Bundle Size:** -30% to -40%
- **Bandwidth Usage:** -60% to -70%
- **Lighthouse Score:** +20 to +30 points

### 📝 **Frontend - Keeping As-Is**

✅ Loading screen with artificial delay (intentional design)  
✅ All UI components and animations  
✅ Framer Motion usage throughout  
✅ Particle animations and effects  
✅ three.js and recharts dependencies (future use)  
✅ All Radix UI components (scalability)

---

## 🔧 **Backend Development Details**

### **Phase 1: Core MVP (Week 1-2)**

#### 1. Contact & Inquiry Management
**Priority:** CRITICAL

**Endpoints:**
- `POST /api/inquiries` - Submit contact form
- `GET /api/inquiries` - List all inquiries (admin)
- `GET /api/inquiries/:id` - Get single inquiry
- `PATCH /api/inquiries/:id` - Update status/notes

**Database Schema:**
```sql
inquiries:
  - id, name, email, phone, company, country
  - inquiry_type (product_demo, partnership, purchase, other)
  - product_interest (archer, artemis, duma, iroko, kallon)
  - message, status (new, contacted, qualified, closed)
  - priority (high, medium, low)
  - admin_notes
  - created_at, updated_at
```

#### 2. Request for Quote (RFQ) System
**Priority:** CRITICAL

**Endpoints:**
- `POST /api/rfq` - Submit RFQ
- `GET /api/rfq` - List all RFQs (admin)
- `GET /api/rfq/:id` - Get RFQ details
- `PATCH /api/rfq/:id` - Update status/quote
- `POST /api/rfq/:id/notes` - Add internal notes

**Database Schema:**
```sql
rfq_requests:
  - id, company_name, contact_person, email, phone
  - country, organization_type (government, military, private)
  - products (JSON array), quantity, timeline
  - requirements (text), budget_range
  - status (pending, quoted, negotiating, won, lost)
  - quote_amount, quote_pdf_url
  - admin_notes (JSON array with timestamps)
  - created_at, updated_at, responded_at
```

#### 3. Admin Authentication
**Priority:** CRITICAL

**Endpoints:**
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh` - Refresh token
- `GET /api/auth/me` - Get current user
- `POST /api/auth/change-password` - Change password

**Database Schema:**
```sql
admin_users:
  - id, email, password_hash, name
  - role (super_admin, admin, editor, sales)
  - active, last_login_at
  - created_at, updated_at
```

#### 4. Admin Panel
**Priority:** CRITICAL

**Pages:**
- `/admin/dashboard` - Overview with key metrics
- `/admin/inquiries` - Inquiry list & management
- `/admin/rfq` - RFQ list & management
- `/admin/stories` - Content management
- `/admin/products` - Product specs management
- `/admin/documents` - Document management
- `/admin/users` - Admin user management
- `/admin/settings` - System settings

#### 5. Email Notification Service
**Priority:** CRITICAL
**Note:** Provider TBD during implementation

**Use Cases:**
- New inquiry → Sales team
- New RFQ → Sales team
- Auto-reply → Customer
- Password reset emails
- High-priority lead alerts

**Provider Options:**
- SendGrid
- AWS SES
- Resend
- Postmark
- Mailgun

---

### **Phase 2: Content Management (Week 3-4)**

#### 6. News/Stories CMS
**Priority:** HIGH

**Endpoints:**
- `GET /api/stories` - List all stories (public, paginated)
- `GET /api/stories/:slug` - Get single story
- `POST /api/stories` - Create story (admin)
- `PATCH /api/stories/:id` - Update story (admin)
- `DELETE /api/stories/:id` - Delete story (admin)
- `POST /api/stories/:id/publish` - Publish/unpublish

**Database Schema:**
```sql
stories:
  - id, slug, title, subtitle, description
  - image_url, category (milestone, partnership, contract, leadership)
  - status (draft, published, archived)
  - featured, display_order
  - created_by (admin_user_id)
  - created_at, updated_at, published_at
```

**Features:**
- Draft/published states
- Featured stories for hero carousel
- Custom ordering
- Image upload to Cloudflare R2
- Preview before publish

#### 7. Product Specifications Management
**Priority:** HIGH

**Endpoints:**
- `GET /api/products` - List all products (public)
- `GET /api/products/:slug` - Get product details (public)
- `PATCH /api/products/:id` - Update specs (admin)
- `POST /api/products/:id/images` - Upload product images

**Database Schema:**
```sql
products:
  - id, slug, name, category
  - description, tagline
  - specifications (JSON)
  - capabilities (JSON)
  - applications (JSON)
  - images (JSON array) - stored in Cloudflare R2
  - datasheets (JSON array)
  - status (active, development, discontinued)
  - updated_by (admin_user_id)
  - updated_at
```

#### 8. Media Management (Cloudflare R2)
**Priority:** HIGH

**Endpoints:**
- `POST /api/media/upload` - Upload file
- `GET /api/media` - List all media (admin)
- `DELETE /api/media/:id` - Delete file (admin)
- `GET /api/media/:id/url` - Get public URL

**Database Schema:**
```sql
media:
  - id, filename, original_filename, file_type
  - size, cloudflare_key, public_url
  - uploaded_by (admin_user_id)
  - used_in (stories, products, documents)
  - created_at
```

**Features:**
- **Cloudflare R2 (free tier: 10GB storage)**
- Image optimization on upload
- Automatic WebP conversion
- CDN delivery
- Folder organization (stories/, products/, documents/)

#### 9. Document Management
**Priority:** HIGH

**Endpoints:**
- `POST /api/documents` - Upload document
- `GET /api/documents` - List documents (filtered by access)
- `GET /api/documents/:id` - Get document info
- `GET /api/documents/:id/download` - Download
- `DELETE /api/documents/:id` - Delete (admin)

**Database Schema:**
```sql
documents:
  - id, name, description, type (datasheet, spec, whitepaper, contract)
  - product_id (optional), file_url (Cloudflare R2)
  - file_size, file_type
  - access_level (public, restricted, internal)
  - download_count
  - uploaded_by (admin_user_id)
  - created_at
```

---

### **Phase 3: Advanced Features (Month 2)**

#### 10. Analytics Dashboard
**Priority:** MEDIUM

**Endpoints:**
- `POST /api/analytics/event` - Track custom event
- `GET /api/analytics/dashboard` - Get metrics (admin)
- `GET /api/analytics/inquiries` - Inquiry analytics
- `GET /api/analytics/products` - Product page analytics

**Track:**
- Product page views per product
- Inquiry/RFQ conversion funnel
- Geographic distribution
- Traffic sources
- Most downloaded documents

**Features:**
- Visual charts in admin panel
- Export to CSV
- Date range filtering

#### 11. Lead Scoring System
**Priority:** MEDIUM

**Logic:**
- **Country:** +10 (Nigeria, South Africa, Kenya), +5 (other Africa)
- **Org Type:** +15 (government/military), +10 (private defense), +5 (other)
- **Budget Range:** +15 (>$1M), +10 ($500K-$1M), +5 (<$500K)
- **Products:** +5 per product interested
- **Response Time:** +10 if filled during business hours

**Features:**
- Auto-calculate score on submission
- Priority queue in admin panel
- Email alerts for high-value leads (score >40)

---

### **Phase 4: Future/Optional (Month 3+)**

#### 12. Newsletter System 📅
**Status:** Not now, implement later

**Will include:**
- Subscription management
- Campaign creation
- Analytics
- Email delivery integration

#### 13. Partner Portal 📅
**Status:** Optional, evaluate need

**Could include:**
- Partner registration
- Resource access
- Order history
- API access

---

## 🏗️ **Tech Stack Summary**

### Frontend (Current)
- **Framework:** Next.js 16.0.0
- **Styling:** Tailwind CSS 4.1.9
- **UI Components:** Radix UI
- **Animations:** Framer Motion
- **Hosting:** Vercel
- **Analytics:** Vercel Analytics

### Backend (New)
- **Framework:** TBD (Express/Fastify/NestJS)
- **Database:** PostgreSQL
- **ORM:** TBD (Prisma/Drizzle)
- **Auth:** JWT
- **Storage:** Cloudflare R2 (10GB free)
- **Email:** TBD during implementation
- **Hosting:** TBD (Railway/Render/DigitalOcean)

### Admin Panel (New)
- **Framework:** TBD (React/Next.js/Vue)
- **UI Library:** TBD during implementation
- **Charts:** TBD (Recharts/Chart.js)

---

## 🔌 **API Structure**

```
Base URL: https://api.terraindustries.com

/v1
  /inquiries        - Lead capture
  /rfq              - Quote requests
  /stories          - News/milestones CMS
  /products         - Product specifications
  /media            - File uploads (Cloudflare R2)
  /documents        - Document downloads
  /analytics        - Custom tracking
  /auth             - Admin authentication
```

Full API documentation available in `backend-roadmap.md` (archived).

---

## 🔒 **Security Requirements**

### Frontend
1. ✅ Environment variables for API endpoints
2. ✅ HTTPS only
3. ✅ XSS prevention via React
4. ✅ Content Security Policy headers

### Backend
1. ✅ HTTPS only (SSL certificate)
2. ✅ Rate limiting on public endpoints
3. ✅ CORS (allow Vercel domain)
4. ✅ Input validation/sanitization
5. ✅ SQL injection prevention (ORM)
6. ✅ JWT with expiry + refresh tokens
7. ✅ Environment variables for secrets
8. ✅ File upload validation (type, size)
9. ✅ XSS prevention
10. ✅ CSRF protection
11. ✅ Secure headers (helmet.js)
12. ✅ Password complexity requirements
13. ✅ Audit logs for sensitive actions

---

## 💰 **Cost Estimates**

### MVP Phase (Month 1-2)
| Item | Cost | Notes |
|------|------|-------|
| Frontend (Vercel) | $0 | Free tier (hobby) |
| Backend Hosting | $0-20 | Railway/Render free tier |
| Database | $0-20 | Supabase/Railway free tier |
| Cloudflare R2 | $0 | 10GB free |
| Email Service | $0-15 | Free tier initially |
| **Total** | **$0-55/month** | |

### Production Phase (Month 3+)
| Item | Cost | Notes |
|------|------|-------|
| Frontend (Vercel) | $20 | Pro plan (if needed) |
| Backend Hosting | $50-100 | Production tier |
| Database | $50-100 | Managed PostgreSQL |
| Cloudflare R2 | $5-20 | Pay as you grow |
| Email Service | $20-50 | Higher volume |
| **Total** | **$145-290/month** | |

---

## 📊 **Success Metrics**

### Business KPIs
- Inquiries per month
- RFQ conversion rate
- Average lead response time
- Geographic distribution of leads
- High-value lead percentage (score >40)

### Technical KPIs
- Frontend load time (target: <2s)
- Lighthouse score (target: 90+)
- API response time (target: <200ms)
- Error rates (target: <1%)
- Database query performance
- Email delivery rate (target: >98%)

### Content KPIs
- Most viewed products
- Story engagement rate
- Document downloads
- Admin panel usage

---

## 🔧 **Development Commands**

### Frontend
```bash
# Development
pnpm dev

# Production build
pnpm build
pnpm start

# Check TypeScript errors
pnpm tsc --noEmit

# Bundle analysis
pnpm add -D @next/bundle-analyzer
ANALYZE=true pnpm build

# Linting
pnpm lint
```

### Backend (TBD based on framework choice)
```bash
# Will be defined during Phase 1 implementation
```

---

## 🚀 **Quick Start Checklist**

### Phase 1 - Week 1
- [ ] Enable Next.js image optimization
- [ ] Implement Next.js font optimization
- [ ] Remove non-existent image preloads
- [ ] Set up backend framework
- [ ] Set up PostgreSQL database
- [ ] Implement Contact/Inquiry API
- [ ] Implement RFQ API
- [ ] Set up admin authentication

### Phase 1 - Week 2
- [ ] Build basic admin panel UI
- [ ] Integrate email service
- [ ] Test inquiry flow end-to-end
- [ ] Test RFQ flow end-to-end
- [ ] Deploy backend to staging
- [ ] Configure CORS for Vercel frontend

### Phase 2 - Week 3
- [ ] Implement code splitting on frontend
- [ ] Fix TypeScript errors
- [ ] Implement Stories CMS API
- [ ] Implement Products API
- [ ] Set up Cloudflare R2
- [ ] Implement Media Management API

### Phase 2 - Week 4
- [ ] Build Stories CMS UI in admin panel
- [ ] Build Products management UI
- [ ] Build Media library UI
- [ ] Implement Document Management
- [ ] Frontend integration with backend APIs
- [ ] End-to-end testing

### Phase 3 - Month 2
- [ ] Optimize Next.js configuration
- [ ] Run bundle analyzer
- [ ] Implement Analytics Dashboard
- [ ] Implement Lead Scoring
- [ ] Add advanced admin features
- [ ] Performance testing & optimization

---

## 🎯 **What NOT to Build**

### Frontend
❌ Major UI/UX changes (keeping current design)  
❌ Remove animations (intentional design choice)  
❌ Remove loading screen (intentional)  
❌ Remove unused dependencies yet (planned for future)

### Backend
❌ Full e-commerce system  
❌ Public user accounts  
❌ Social media features  
❌ Real-time chat system  
❌ Custom CRM  
❌ Payment processing  
❌ Complex inventory management  
❌ Mobile apps

---

## 📝 **Additional Notes**

### Integration Strategy
1. **Week 1-2:** Backend APIs ready, frontend still using hardcoded data
2. **Week 3:** Begin frontend integration with Stories API
3. **Week 4:** Complete frontend-backend integration
4. **Month 2:** Full dynamic site with admin management

### Deployment Strategy
1. **Frontend:** Remains on Vercel (no changes to deployment)
2. **Backend:** Deploy to separate hosting (Railway/Render/DO)
3. **Database:** Managed PostgreSQL instance
4. **Storage:** Cloudflare R2 configured with backend

### Testing Strategy
1. **Frontend:** Lighthouse audits after each optimization
2. **Backend:** API testing with Postman/Thunder Client
3. **Integration:** End-to-end tests for critical flows
4. **Performance:** Load testing before production launch

---

**Ready to Start? Begin with Phase 1 - Week 1 checklist above!**

---

**Version History:**
- v1.0 (Nov 3, 2025) - Initial consolidated roadmap

**Related Documents:**
- `optimization.md` - Detailed frontend optimization guide (archived)
- `backend-roadmap.md` - Detailed backend development guide (archived)

