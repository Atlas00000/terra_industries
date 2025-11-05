# 🔗 Frontend-Backend Integration Roadmap

**Status:** Backend ready (60+ endpoints), Frontend optimized  
**Scope:** Dynamic content + Admin dashboard (forms on hold)  
**Timeline:** 5 weeks

---

## 🎯 Current State

**Frontend:** ✅ Live on Vercel, fully optimized, hardcoded data  
**Backend:** ✅ 60+ endpoints ready, 100% tested, production-ready  
**Gap:** No connection between frontend and backend

**Note:** Contact/RFQ forms on hold (pending firm data) - focusing on dynamic content and admin dashboard

---

## 📅 Integration Timeline (5 Weeks)

### **WEEK 1: Foundation + Dynamic News** 🟡

**Goal:** API infrastructure + dynamic news from CMS

**Tasks:**
1. Install dependencies (`axios`, `@tanstack/react-query`, `zod`)
2. Create API client (`lib/api-client.ts`)
3. Create shared types (`types/api.ts`)
4. Create Query provider (`providers/query-provider.tsx`)
5. Create `hooks/use-featured-news.ts` → `GET /api/v1/news/featured`
6. Create news transformer (`lib/transformers/news-transformer.ts`)
7. Create static fallback (`lib/fallback-data/news.ts`)
8. Update `components/mobile-company-news-slideshow.tsx`
9. Update `components/company/company-news-section.tsx`
10. Add loading skeleton + error fallback
11. Test with backend running

**Files to Create:** 6  
**Files to Update:** 3  
**Backend Endpoints:** `GET /api/v1/news/featured`, `GET /api/v1/news?status=published`

**Deliverable:** News section pulls from backend CMS (admin can publish without deployment)

---

### **WEEK 2: Dynamic Products** 🟡

**Goal:** Product specifications from database

**Tasks:**
1. Create `hooks/use-products.ts` → `GET /api/v1/product-specs`
2. Create `hooks/use-product-category.ts` → `GET /api/v1/product-specs/category/:category`
3. Create product transformer (`lib/transformers/product-transformer.ts`)
4. Create static fallback (`lib/fallback-data/products.ts`)
5. Update `components/mobile-product-slideshow.tsx` (home page)
6. Update product pages:
   - `app/artemis/page.tsx`
   - `app/archer/page.tsx`
   - `app/iroko/page.tsx`
   - `app/duma/page.tsx`
   - `app/kallon/page.tsx`
7. Add loading skeletons
8. Test data transformation
9. Verify fallback on API errors

**Files to Create:** 4  
**Files to Update:** 6  
**Backend Endpoints:** `GET /api/v1/product-specs`, `GET /api/v1/product-specs/category/:category`

**Deliverable:** Products pull from database (admin can update specs without deployment)

---

### **WEEK 3: Search + Analytics + Product Details** 🟢

**Goal:** Enhanced UX and business intelligence

**Tasks:**

**Search (Day 1-2):**
1. Create `components/search/search-bar.tsx`
2. Create `components/search/search-modal.tsx`
3. Create `components/search/search-results.tsx`
4. Create `hooks/use-search.ts` → `GET /api/v1/search/global`
5. Create `hooks/use-search-suggestions.ts` → `GET /api/v1/search/suggestions`
6. Add search icon to header
7. Add keyboard shortcuts (Cmd+K)

**Analytics (Day 2-3):**
1. Create `lib/analytics-tracker.ts`
2. Create `hooks/use-track-event.ts`
3. Track page views
4. Track product views
5. Track search queries
6. Send events to backend

**Product Details (Day 3-5):**
1. Enhance product pages with full specifications
2. Use `GET /api/v1/product-specs/:id` for complete data
3. Add expandable technical sections
4. Add performance metrics visualization
5. Keep UI/design identical

**Files to Create:** 8  
**Files to Update:** 6  
**Backend Endpoints:** Search (2), Analytics (12), Product details (1)

**Deliverable:** Search working + analytics tracking + rich product details

---

### **WEEK 4: Admin Dashboard - Part 1** 🔴

**Goal:** Admin authentication + CRM + Sales pipeline

**Tasks:**

**Authentication (Day 1-2):**
1. Create `lib/auth.ts` (JWT token management)
2. Create `hooks/use-auth.ts` → `POST /api/v1/auth/login`
3. Create `middleware.ts` (protect /admin routes)
4. Create `app/admin/login/page.tsx`
5. Create `providers/auth-provider.tsx`

**Admin Layout (Day 2-3):**
1. Create `app/admin/layout.tsx`
2. Create `components/admin/sidebar.tsx` (navigation)
3. Create `components/admin/header.tsx` (with logout)
4. Create `components/admin/stat-card.tsx`

**Dashboard Pages (Day 3-5):**
1. Create `app/admin/dashboard/page.tsx` → `GET /api/v1/analytics/overview`
2. Create `app/admin/inquiries/page.tsx` → `GET /api/v1/inquiries`
3. Create `app/admin/rfqs/page.tsx` → `GET /api/v1/rfq`
4. Create `components/admin/inquiries-table.tsx`
5. Create `components/admin/rfq-table.tsx`
6. Create `components/admin/quote-modal.tsx`
7. Add pagination, filtering, sorting
8. Add CSV export for RFQs

**Files to Create:** 15  
**Backend Endpoints:** Auth (3), Inquiries (6), RFQ (7), Analytics (1)

**Deliverable:** Admin can login and manage inquiries/RFQs

---

### **WEEK 5: Admin Dashboard - Part 2** 🔴

**Goal:** CMS + Media + Monitoring

**Tasks:**

**News CMS (Day 1-2):**
1. Create `app/admin/news/page.tsx` (list all stories)
2. Create `app/admin/news/new/page.tsx` (create story)
3. Create `app/admin/news/[id]/edit/page.tsx` (edit story)
4. Create `components/admin/news-editor.tsx` (rich text editor)
5. Create `components/admin/news-table.tsx`
6. Add publish/unpublish actions
7. Add featured image selection

**Product Specs Editor (Day 2-3):**
1. Create `app/admin/products/page.tsx`
2. Create `app/admin/products/new/page.tsx`
3. Create `app/admin/products/[id]/edit/page.tsx`
4. Create `components/admin/product-editor.tsx`
5. Create `components/admin/product-table.tsx`
6. JSON editor for specifications
7. Media gallery for product images

**Media Library (Day 3-4):**
1. Create `app/admin/media/page.tsx`
2. Create `components/admin/file-uploader.tsx` (drag & drop)
3. Create `components/admin/media-grid.tsx`
4. Upload → `POST /api/v1/media/upload`
5. Delete → `DELETE /api/v1/media/:id`
6. Update metadata → `PATCH /api/v1/media/:id/metadata`

**Monitoring (Day 4-5):**
1. Create `app/admin/email/page.tsx` (email queue)
2. Create `app/admin/analytics/page.tsx` (full analytics)
3. Create `app/admin/logs/page.tsx` (activity logs)
4. Create `components/admin/email-queue-table.tsx`
5. Create `components/admin/analytics-charts.tsx` (recharts)
6. Create `components/admin/activity-log-table.tsx`
7. Add export capabilities

**Files to Create:** 20  
**Backend Endpoints:** News (10), Products (7), Media (6), Email (2), Analytics (12), Logs (4)

**Deliverable:** Complete admin panel for all operations

---

## 📦 Dependencies

### Week 1: API + News
```bash
pnpm add axios @tanstack/react-query zod
```

### Week 3: Search
```bash
pnpm add cmdk  # For Cmd+K search
```

### Week 4: Admin - Part 1
```bash
pnpm add @tanstack/react-table date-fns recharts sonner
pnpm add react-hook-form @hookform/resolvers
```

### Week 5: Admin - Part 2
```bash
pnpm add @tiptap/react @tiptap/starter-kit  # Rich text editor
pnpm add react-dropzone  # File upload
```

---

## 🔌 Backend Endpoints

### Public Endpoints (Weeks 1-3)

**News/Stories:**
- `GET /api/v1/news/featured` → Company news section
- `GET /api/v1/news?status=published` → All published stories
- `GET /api/v1/news/slug/:slug` → Individual story page

**Products:**
- `GET /api/v1/product-specs` → Product slideshow
- `GET /api/v1/product-specs/category/artemis` → Artemis page
- `GET /api/v1/product-specs/category/archer` → Archer page
- `GET /api/v1/product-specs/category/iroko` → Iroko page
- `GET /api/v1/product-specs/category/duma` → Duma page
- `GET /api/v1/product-specs/category/kallon` → Kallon page
- `GET /api/v1/product-specs/:id` → Full product details

**Search:**
- `GET /api/v1/search/global?q=term` → Global search
- `GET /api/v1/search/suggestions?q=term` → Autocomplete

---

### Protected Endpoints (Weeks 4-5)

**Authentication:**
- `POST /api/v1/auth/login` → Admin login
- `GET /api/v1/auth/me` → Current user

**Inquiries:**
- `GET /api/v1/inquiries` → List (paginated)
- `GET /api/v1/inquiries/stats` → Statistics
- `PATCH /api/v1/inquiries/:id` → Update status
- `DELETE /api/v1/inquiries/:id` → Delete

**RFQ:**
- `GET /api/v1/rfq` → List (paginated)
- `GET /api/v1/rfq/stats` → Statistics
- `GET /api/v1/rfq/export` → CSV export
- `PATCH /api/v1/rfq/:id` → Update status
- `POST /api/v1/rfq/:id/quote` → Send quote

**News CMS:**
- `POST /api/v1/news` → Create story
- `GET /api/v1/news` → List all
- `GET /api/v1/news/stats` → Statistics
- `PATCH /api/v1/news/:id` → Update
- `POST /api/v1/news/:id/publish` → Publish
- `DELETE /api/v1/news/:id` → Delete

**Product CMS:**
- `POST /api/v1/product-specs` → Create spec
- `GET /api/v1/product-specs/stats` → Statistics
- `PATCH /api/v1/product-specs/:id` → Update
- `DELETE /api/v1/product-specs/:id` → Delete

**Media:**
- `GET /api/v1/media` → List files
- `POST /api/v1/media/upload` → Upload
- `DELETE /api/v1/media/:id` → Delete
- `GET /api/v1/media/stats` → Statistics

**Email Queue:**
- `GET /api/v1/email/queue` → View queue
- `POST /api/v1/email/retry/:id` → Retry failed

**Analytics:**
- `GET /api/v1/analytics/overview` → Dashboard
- `GET /api/v1/analytics/conversion-funnel` → Funnel
- `GET /api/v1/analytics/lead-sources` → Sources
- `GET /api/v1/analytics/products` → Product performance
- `GET /api/v1/analytics/news` → News performance

**Activity Logs:**
- `GET /api/v1/activity-logs` → Audit trail
- `GET /api/v1/activity-logs/recent` → Recent activity

---

## 🗂️ Files to Create (~53 files)

### Week 1: News Integration (6 files)
```
lib/
├── api-client.ts
├── api-endpoints.ts
└── fallback-data/
    └── news.ts

types/
└── api.ts

hooks/
└── use-featured-news.ts

providers/
└── query-provider.tsx
```

### Week 2: Products (4 files)
```
hooks/
├── use-products.ts
└── use-product-category.ts

lib/
├── transformers/
│   ├── news-transformer.ts
│   └── product-transformer.ts
└── fallback-data/
    └── products.ts
```

### Week 3: Search + Analytics (8 files)
```
components/search/
├── search-bar.tsx
├── search-modal.tsx
└── search-results.tsx

components/ui/
└── skeleton.tsx

hooks/
├── use-search.ts
├── use-search-suggestions.ts
└── use-track-event.ts

lib/
└── analytics-tracker.ts
```

### Week 4: Admin Part 1 (15 files)
```
app/admin/
├── layout.tsx
├── login/page.tsx
├── dashboard/page.tsx
├── inquiries/page.tsx
└── rfqs/page.tsx

components/admin/
├── sidebar.tsx
├── header.tsx
├── stat-card.tsx
├── inquiries-table.tsx
├── rfq-table.tsx
└── quote-modal.tsx

lib/auth.ts
hooks/use-auth.ts
middleware.ts
providers/auth-provider.tsx
```

### Week 5: Admin Part 2 (20 files)
```
app/admin/
├── news/
│   ├── page.tsx
│   ├── new/page.tsx
│   └── [id]/edit/page.tsx
├── products/
│   ├── page.tsx
│   ├── new/page.tsx
│   └── [id]/edit/page.tsx
├── media/page.tsx
├── email/page.tsx
├── analytics/page.tsx
└── logs/page.tsx

components/admin/
├── news-editor.tsx
├── news-table.tsx
├── product-editor.tsx
├── product-table.tsx
├── file-uploader.tsx
├── media-grid.tsx
├── email-queue-table.tsx
├── analytics-charts.tsx
└── activity-log-table.tsx
```

---

## 🔄 Data Transformation

### News Transformation

**Backend → Frontend:**
```typescript
// Backend NewsStory
{
  id: "uuid",
  title: "Ooni of Ife Joins Board",
  slug: "ooni-of-ife-joins-board",
  content: "Full content...",
  excerpt: "Short excerpt...",
  category: "leadership",
  tags: ["board", "leadership"],
  featuredImage: { publicUrl: "https://..." },
  viewCount: 450,
  publishedAt: "2025-11-01"
}

// Transform to Frontend Format
{
  title: "Board Leadership",
  subtitle: "Royal & Military Command",
  content: "Short excerpt...",
  items: [{ title, description, details, impact }],
  visual: "https://r2.cloudflare.com/..."
}
```

### Product Transformation

**Backend → Frontend:**
```typescript
// Backend ProductSpecification
{
  productName: "Artemis OS",
  category: "artemis",
  specifications: { aiModels: "50+", processingSpeed: "10,000+/sec" },
  performanceMetrics: { responseTime: "<1s", accuracy: "99.5%" },
  technicalDetails: { features: [...] }
}

// Transform to Frontend
{
  id: 1,
  name: "ArtemisOS",
  title: "AI-Powered Central Intelligence Platform",
  description: "...",
  features: [...],
  metrics: { responseTime: "<1s", accuracy: "99.5%" },
  color: "purple",
  href: "/artemis"
}
```

---

## 🎛️ Admin Dashboard

### Route Structure
```
/admin
├── /login              # JWT authentication
├── /dashboard          # Overview (metrics, charts)
├── /inquiries          # CRM lead management
├── /rfqs               # Sales pipeline
├── /email              # Email queue monitoring
├── /media              # Media library (R2)
├── /news               # News CMS
│   ├── /new           # Create story
│   └── /[id]/edit     # Edit story
├── /products           # Product specs CMS
│   ├── /new           # Create spec
│   └── /[id]/edit     # Edit spec
├── /analytics          # Analytics dashboard
└── /logs               # Activity audit logs
```

### Dashboard Features

**1. Overview** (`/admin/dashboard`)
- Key metrics: Inquiries, RFQs, conversion rate
- Recent activity feed
- Pending actions
- Charts: Timeline, funnel

**2. Inquiries** (`/admin/inquiries`)
- Data table: Name, Email, Company, Country, Lead Score, Status
- Filters: Status, lead score, date, country
- Actions: View, update status, delete
- Export CSV

**3. RFQ Management** (`/admin/rfqs`)
- Data table: Company, Product, Budget, Status, Quote Amount
- Filters: Status, product, budget, timeline
- Actions: View, send quote, update, export CSV
- Quote modal

**4. Email Queue** (`/admin/email`)
- Table: To, Subject, Status, Attempts
- Actions: Retry failed emails
- Stats: Sent, pending, failed

**5. Media Library** (`/admin/media`)
- Grid view with thumbnails
- Upload (drag & drop)
- Delete, update metadata
- Stats: Total files, size

**6. News CMS** (`/admin/news`)
- Table: Title, Status, Views, Published
- Create/Edit with rich text editor
- Publish/Unpublish
- Featured image upload
- SEO slug

**7. Product Specs** (`/admin/products`)
- Table: Product, Category, Updated
- Create/Edit with JSON editor
- Media gallery
- Performance metrics

**8. Analytics** (`/admin/analytics`)
- Full dashboard with charts
- Conversion funnel
- Lead sources
- Product/news performance

**9. Activity Logs** (`/admin/logs`)
- Audit trail table
- Filters: User, action, date
- Before/after state
- Export for compliance

---

## 📊 Components to Update

### Week 1: News Components (2 files)
- `components/mobile-company-news-slideshow.tsx` → Use `useFeaturedNews()`
- `components/company/company-news-section.tsx` → Use `useFeaturedNews()`

### Week 2: Product Components (6 files)
- `components/mobile-product-slideshow.tsx` → Use `useProducts()`
- `app/artemis/page.tsx` → Use `useProductCategory('artemis')`
- `app/archer/page.tsx` → Use `useProductCategory('archer')`
- `app/iroko/page.tsx` → Use `useProductCategory('iroko')`
- `app/duma/page.tsx` → Use `useProductCategory('duma')`
- `app/kallon/page.tsx` → Use `useProductCategory('kallon')`

### Week 3: Header (1 file)
- `components/header.tsx` → Add search icon

**Total Updates:** 9 files  
**Visual Changes:** Zero (public site)

---

## 🔒 Error Handling

### Fallback Strategy
```typescript
// Always fallback to static data on error
const { data: products, error } = useProducts()
const displayProducts = error ? STATIC_PRODUCTS : products

// Components work identically with either data source
<ProductSlideshow products={displayProducts} />
```

### User-Friendly Errors
```typescript
// Admin dashboard
try {
  await updateInquiry(id, data)
  toast.success('Updated successfully')
} catch {
  toast.error('Update failed. Please try again.')
}
```

---

## 🎨 Design Principles

### Public Site (Zero Changes)
- ✅ All colors, fonts, spacing unchanged
- ✅ All animations (Framer Motion) unchanged
- ✅ Loading screen with delay unchanged
- ✅ Mobile navigation unchanged
- ✅ All layouts unchanged

### Admin Dashboard (New)
- ✅ Use existing design system
- ✅ Use existing UI components (shadcn/ui)
- ✅ Match color scheme
- ✅ Clean, professional interface
- ✅ Responsive (desktop-first)

---

## 📈 Success Criteria

### Week 1
- ✅ News pulling from backend
- ✅ Admin can publish → appears immediately
- ✅ Fallback to static on error
- ✅ Zero visual changes

### Week 2
- ✅ Products pulling from database
- ✅ Admin can update specs
- ✅ Changes reflect immediately
- ✅ Zero visual changes

### Week 3
- ✅ Search working
- ✅ Analytics tracking events
- ✅ Product pages enhanced

### Week 5
- ✅ Admin dashboard operational
- ✅ CRM system working
- ✅ News/product CMS functional
- ✅ Media library working
- ✅ Full analytics visibility

---

## 🚀 Implementation Guide

### Week 1 Quick Start

**Step 1:** Install dependencies
```bash
pnpm add axios @tanstack/react-query zod
```

**Step 2:** Create API client
```typescript
// lib/api-client.ts
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  timeout: 10000,
})

apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)
```

**Step 3:** Create news hook
```typescript
// hooks/use-featured-news.ts
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { transformNews } from '@/lib/transformers/news-transformer'
import { FALLBACK_NEWS } from '@/lib/fallback-data/news'

export function useFeaturedNews() {
  return useQuery({
    queryKey: ['news', 'featured'],
    queryFn: async () => {
      const { data } = await apiClient.get('/api/v1/news/featured')
      return data.map(transformNews)
    },
    placeholderData: FALLBACK_NEWS,
    staleTime: 60 * 1000,
  })
}
```

**Step 4:** Update news component
```typescript
// components/mobile-company-news-slideshow.tsx
'use client'
import { useFeaturedNews } from '@/hooks/use-featured-news'

export function MobileCompanyNewsSlideshow() {
  const { data: slides } = useFeaturedNews()
  
  // Rest of component stays EXACTLY the same
  // Just use 'slides' instead of hardcoded data
}
```

---

## 📊 Summary

### Phase 1: Dynamic Content (Weeks 1-2)
- ✅ News from backend CMS
- ✅ Products from database
- ✅ Fallback to static data
- ✅ Zero UI changes

**Effort:** 10 days  
**Value:** Update content without deployment  
**Files:** 10 new, 9 updated

### Phase 2: Enhanced UX (Week 3)
- ✅ Search functionality
- ✅ Analytics tracking
- ✅ Product details enhancement

**Effort:** 5 days  
**Value:** Better UX + business intel  
**Files:** 8 new, 6 updated

### Phase 3: Admin Dashboard (Weeks 4-5)
- ✅ Authentication + CRM + Sales
- ✅ News/Product CMS
- ✅ Media library
- ✅ Monitoring dashboards

**Effort:** 10 days  
**Value:** Complete operations  
**Files:** 35 new

---

### Final Metrics
- **Timeline:** 5 weeks
- **Files to Create:** ~53
- **Files to Update:** ~10
- **Public UI Changes:** Zero
- **Admin Routes:** 10+ pages
- **Backend Ready:** 100%
- **Risk:** Low

---

**Forms Integration:** On hold (pending firm data)  
**Focus:** Dynamic content + Admin dashboard  
**Start:** Week 1 - Dynamic News 🚀
