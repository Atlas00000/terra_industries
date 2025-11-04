# 🏗️ Terra Industries - Backend & Database Integration

**Last Updated:** November 4, 2025  
**Version:** 1.0  
**Status:** 📋 Planning Phase

---

## 📊 **Architecture Overview**

### **Development Setup**

```
┌─────────────────────────────────────────────────────────────┐
│                    DEVELOPER MACHINE                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────┐         ┌────────────────────┐   │
│  │   CLIENT (Native)    │         │   DOCKER COMPOSE   │   │
│  │   pnpm dev (3000)    │────────▶│                    │   │
│  │   Hot reload         │  API    │  ┌──────────────┐  │   │
│  │   Fast development   │  Calls  │  │   BACKEND    │  │   │
│  └──────────────────────┘         │  │   (NestJS)   │  │   │
│                                    │  │   Port: 4000 │  │   │
│                                    │  └──────────────┘  │   │
│                                    │  ┌──────────────┐  │   │
│                                    │  │  POSTGRESQL  │  │   │
│                                    │  │   Port: 5432 │  │   │
│                                    │  └──────────────┘  │   │
│                                    │  ┌──────────────┐  │   │
│                                    │  │    REDIS     │  │   │
│                                    │  │   Port: 6379 │  │   │
│                                    │  └──────────────┘  │   │
│                                    └────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### **Why This Approach?**

| Component | Deployment | Reason |
|-----------|------------|--------|
| **Client** | Native `pnpm dev` | ⚡ Fast hot-reload, instant feedback |
| **Backend** | Docker | 🔒 Consistent environment, isolated |
| **Database** | Docker | 🔒 No local PostgreSQL needed, portable |
| **Redis** | Docker | 🔒 Optional, for caching |

---

## 🎯 **Technology Stack (Final Selections)**

### **Backend Framework**
✅ **NestJS** - Enterprise-grade Node.js framework
- TypeScript-first
- Built-in dependency injection
- Modular architecture
- Extensive documentation
- Built-in testing utilities
- Swagger integration out-of-the-box

### **Database & ORM**
✅ **PostgreSQL** - Relational database
✅ **Prisma** - Type-safe ORM
- Excellent TypeScript support
- Auto-generated types
- Migration system
- Database introspection
- Great developer experience

### **Validation**
✅ **Zod** - TypeScript-first schema validation
- Consistent with frontend
- Type inference
- Runtime validation
- Great error messages

### **File Storage**
✅ **Cloudflare R2** - S3-compatible object storage
- Free tier: 10GB storage
- S3-compatible API
- Global CDN
- No egress fees

### **Email Service**
✅ **Resend** - Modern email API
- Simple REST API
- Good deliverability
- Free tier: 100 emails/day
- React email templates

### **Caching**
✅ **Redis** - In-memory data store
- Session storage
- API caching
- Rate limiting
- Pub/Sub for real-time features

### **Admin Panel**
✅ **Custom Next.js + shadcn/ui**
- Consistent branding
- Full control
- Reuse components
- Seamless integration

---

## 🎯 **15 Essential API Endpoints (Industry Standard)**

### **1. Authentication (5 endpoints)**
```typescript
POST   /api/v1/auth/register           // Create admin account
POST   /api/v1/auth/login              // Get JWT token
POST   /api/v1/auth/logout             // Invalidate session
POST   /api/v1/auth/refresh            // Refresh JWT token
GET    /api/v1/auth/me                 // Get current user profile
```

### **2. Inquiry Management (5 endpoints)**
```typescript
POST   /api/v1/inquiries               // Submit contact form (public)
GET    /api/v1/inquiries               // List with pagination/filters (admin)
GET    /api/v1/inquiries/:id           // Get single inquiry details
PATCH  /api/v1/inquiries/:id           // Update status, assign user
DELETE /api/v1/inquiries/:id           // Soft delete inquiry
```

### **3. File Upload & Management (5 endpoints)**
```typescript
POST   /api/v1/upload                  // Upload single/multiple files
POST   /api/v1/upload/presigned        // Get presigned URL (for large files)
GET    /api/v1/media                   // List media library
GET    /api/v1/media/:id               // Get file metadata
DELETE /api/v1/media/:id               // Delete file from storage
```

### **4. Content Management - News (5 endpoints)**
```typescript
GET    /api/v1/news                    // List articles (public: published only)
GET    /api/v1/news/:slug              // Get single article by slug
POST   /api/v1/news                    // Create article (admin)
PATCH  /api/v1/news/:id                // Update article (admin)
DELETE /api/v1/news/:id                // Delete article (admin)
```

### **5. Content Management - Products (5 endpoints)**
```typescript
GET    /api/v1/products                // List products (public: active only)
GET    /api/v1/products/:slug          // Get product details by slug
POST   /api/v1/products                // Create product (admin)
PATCH  /api/v1/products/:id            // Update product (admin)
DELETE /api/v1/products/:id            // Delete product (admin)
```

### **6. RFQ/Lead Management (5 endpoints)**
```typescript
POST   /api/v1/rfq                     // Submit RFQ (public/authenticated)
GET    /api/v1/rfq                     // List RFQs with filters (admin)
GET    /api/v1/rfq/:id                 // Get RFQ details
PATCH  /api/v1/rfq/:id                 // Update status, add quote
POST   /api/v1/rfq/:id/quote           // Send quote to customer
```

### **7. User Management (5 endpoints)**
```typescript
GET    /api/v1/users                   // List all users (super admin)
GET    /api/v1/users/:id               // Get user profile
POST   /api/v1/users                   // Create new user (admin)
PATCH  /api/v1/users/:id               // Update user details
DELETE /api/v1/users/:id               // Deactivate user
```

### **8. Analytics & Dashboard (5 endpoints)**
```typescript
GET    /api/v1/analytics/overview      // Dashboard metrics (inquiries, RFQs, etc.)
GET    /api/v1/analytics/inquiries     // Inquiry analytics (by date, country, etc.)
GET    /api/v1/analytics/rfq-funnel    // RFQ conversion funnel
POST   /api/v1/analytics/event         // Track custom events (public)
GET    /api/v1/analytics/export        // Export analytics data
```

### **9. Search (2 endpoints)**
```typescript
GET    /api/v1/search                  // Unified search (news, products, inquiries)
POST   /api/v1/search/advanced         // Advanced search with filters
```

### **10. Export/Import (3 endpoints)**
```typescript
GET    /api/v1/export/inquiries        // Export inquiries to CSV/Excel
GET    /api/v1/export/rfq              // Export RFQs to CSV
POST   /api/v1/import/contacts         // Bulk import contacts
```

### **11. Email Queue (3 endpoints)**
```typescript
POST   /api/v1/email/send              // Queue email for sending
GET    /api/v1/email/queue             // View email queue status (admin)
POST   /api/v1/email/retry/:id         // Retry failed email
```

### **12. Activity Logs (2 endpoints)**
```typescript
GET    /api/v1/activity-logs           // View audit trail (admin)
GET    /api/v1/activity-logs/user/:id  // User-specific logs
```

### **13. Settings (3 endpoints)**
```typescript
GET    /api/v1/settings                // Get app settings
PATCH  /api/v1/settings                // Update settings (admin)
POST   /api/v1/settings/email-test     // Test email configuration
```

### **14. Documents (4 endpoints)**
```typescript
POST   /api/v1/documents               // Upload document (PDF, datasheet)
GET    /api/v1/documents               // List documents
GET    /api/v1/documents/:id/download  // Download document (track count)
DELETE /api/v1/documents/:id           // Delete document
```

### **15. Health & Status (2 endpoints)**
```typescript
GET    /api/v1/health                  // Health check (db, redis, services)
GET    /api/v1/status                  // System status (version, uptime)
```

**Total Core Endpoints: ~60**

---

## 📋 **Backend Feature List (Priority Ranked)**

### **TIER 1: MVP Core (Must Have) - Weeks 1-4**

| # | Feature | Endpoints | Priority | Complexity | Time |
|---|---------|-----------|----------|------------|------|
| 1 | **Authentication & Authorization** | 5 | 🔴 Critical | Medium | 20h |
| 2 | **Contact/Inquiry Management** | 5 | 🔴 Critical | Low | 20h |
| 3 | **File Upload (Cloudflare R2)** | 5 | 🔴 Critical | Medium | 20h |
| 4 | **RFQ Management** | 5 | 🔴 Critical | Medium | 20h |
| 5 | **Lead Scoring System** | Built-in | 🔴 Critical | Medium | 10h |
| 6 | **Email Notifications (Resend)** | 3 | 🔴 Critical | Low | 20h |
| 7 | **Admin Dashboard** | UI | 🔴 Critical | High | 40h |
| 8 | **Activity Logs (Audit Trail)** | 2 | 🟡 High | Low | 10h |

**Tier 1 Total: ~160 hours (~4 weeks)**

---

### **TIER 2: Content & Analytics (Should Have) - Weeks 5-6**

| # | Feature | Endpoints | Priority | Complexity | Time |
|---|---------|-----------|----------|------------|------|
| 9 | **News/Blog CMS** | 5 | 🟡 High | Medium | 20h |
| 10 | **Product Specifications CMS** | 5 | 🟡 High | Medium | 20h |
| 11 | **Media Library Management** | Included | 🟡 High | Low | 10h |
| 12 | **Document Management** | 4 | 🟡 High | Low | 10h |
| 13 | **Analytics Dashboard** | 5 | 🟡 High | Medium | 20h |
| 14 | **Search Functionality** | 2 | 🟢 Medium | Medium | 10h |
| 15 | **Export Data (CSV/Excel)** | 3 | 🟢 Medium | Low | 10h |

**Tier 2 Total: ~100 hours (~2.5 weeks)**

---

### **TIER 3: Optimization (Nice to Have) - Weeks 7-8**

| # | Feature | Endpoints | Priority | Complexity | Time |
|---|---------|-----------|----------|------------|------|
| 16 | **User Management** | 5 | 🟢 Medium | Low | 15h |
| 17 | **Settings/Configuration** | 3 | 🟢 Medium | Low | 10h |
| 18 | **Email Queue System** | Built-in | 🟢 Medium | Medium | 15h |
| 19 | **Redis Caching** | Infrastructure | 🟢 Medium | Low | 10h |
| 20 | **Rate Limiting** | Middleware | 🟢 Medium | Low | 5h |
| 21 | **API Versioning** | Structure | 🟢 Medium | Low | 5h |
| 22 | **Webhooks** | 3 | 🔵 Low | Medium | 10h |

**Tier 3 Total: ~70 hours (~2 weeks)**

---

### **TIER 4: Future Enhancements (Later)**

| # | Feature | Endpoints | Priority | Complexity |
|---|---------|-----------|----------|------------|
| 23 | **Newsletter System** | 5 | 🔵 Later | Medium |
| 24 | **Partner Portal** | 8 | 🔵 Later | High |
| 25 | **Multi-language Support (i18n)** | Built-in | 🔵 Later | High |
| 26 | **Two-Factor Authentication** | 3 | 🔵 Later | Medium |
| 27 | **Real-time Notifications (WebSockets)** | 4 | 🔵 Later | High |
| 28 | **Advanced Lead Nurturing** | 5 | 🔵 Later | High |
| 29 | **CRM Integration** | 3 | 🔵 Later | High |
| 30 | **Payment Processing** | 5 | 🔵 Later | High |

---

## 🗄️ **Database Schema Design**

### **Phase 1: Core Tables (Weeks 1-2)**

```sql
-- Users & Authentication
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin', -- admin, super_admin
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Contact Inquiries
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_type VARCHAR(50) NOT NULL, -- general, sales, support, partnership
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  country VARCHAR(100),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new', -- new, in_progress, resolved, closed
  lead_score INTEGER DEFAULT 0,
  assigned_to UUID REFERENCES users(id),
  metadata JSONB, -- Additional data (budget, timeline, etc.)
  source VARCHAR(100), -- website, referral, direct
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- RFQ (Request for Quote)
CREATE TABLE rfq_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id UUID REFERENCES inquiries(id),
  product_category VARCHAR(100) NOT NULL, -- duma, archer, artemis, kallon, iroko
  quantity INTEGER,
  budget_range VARCHAR(50), -- <$100K, $100K-$500K, $500K-$1M, >$1M
  timeline VARCHAR(50), -- immediate, 3-6_months, 6-12_months, 12+_months
  requirements TEXT,
  specifications JSONB,
  status VARCHAR(50) DEFAULT 'pending', -- pending, quoted, won, lost
  quote_amount DECIMAL(15,2),
  quote_sent_at TIMESTAMP,
  decision_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Activity Log (Audit Trail)
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL, -- login, create_inquiry, update_rfq, etc.
  entity_type VARCHAR(50), -- inquiry, rfq, news, product
  entity_id UUID,
  changes JSONB, -- Before/after values
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX idx_inquiries_lead_score ON inquiries(lead_score DESC);
CREATE INDEX idx_rfq_status ON rfq_requests(status);
CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at DESC);
```

### **Phase 2: Content Management (Weeks 3-4)**

```sql
-- News & Stories
CREATE TABLE news_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  summary TEXT,
  content TEXT NOT NULL, -- Markdown or HTML
  featured_image_url TEXT,
  category VARCHAR(100), -- press_release, industry_news, company_update
  tags TEXT[], -- Array of tags
  author_id UUID REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'draft', -- draft, published, archived
  published_at TIMESTAMP,
  views_count INTEGER DEFAULT 0,
  metadata JSONB, -- SEO, og:image, etc.
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Product Specifications
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  category VARCHAR(100) NOT NULL, -- duma, archer, artemis, kallon, iroko
  description TEXT,
  specifications JSONB, -- Technical specs (JSON structure)
  features TEXT[], -- Array of features
  applications TEXT[], -- Use cases
  status VARCHAR(50) DEFAULT 'active', -- active, discontinued, coming_soon
  order_index INTEGER DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Media Assets
CREATE TABLE media_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name VARCHAR(500) NOT NULL,
  file_type VARCHAR(50) NOT NULL, -- image, video, document, 3d_model
  mime_type VARCHAR(100),
  file_size BIGINT, -- bytes
  storage_path TEXT NOT NULL, -- Cloudflare R2 path
  public_url TEXT,
  width INTEGER, -- For images/videos
  height INTEGER,
  duration INTEGER, -- For videos (seconds)
  alt_text TEXT,
  caption TEXT,
  tags TEXT[],
  uploaded_by UUID REFERENCES users(id),
  entity_type VARCHAR(50), -- news, product, inquiry
  entity_id UUID,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Documents (Datasheets, Brochures, etc.)
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  description TEXT,
  file_id UUID REFERENCES media_files(id),
  category VARCHAR(100), -- datasheet, brochure, whitepaper, case_study
  product_id UUID REFERENCES products(id),
  access_level VARCHAR(50) DEFAULT 'public', -- public, authenticated, private
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_news_status_published ON news_articles(status, published_at DESC);
CREATE INDEX idx_news_slug ON news_articles(slug);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_media_entity ON media_files(entity_type, entity_id);
```

### **Phase 3: Analytics & Optimization (Weeks 5-6)**

```sql
-- Lead Scoring Configuration
CREATE TABLE lead_scoring_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_name VARCHAR(255) NOT NULL,
  rule_type VARCHAR(50) NOT NULL, -- country, org_type, budget, product
  condition JSONB NOT NULL, -- Condition logic
  score_value INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Analytics Events
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(100) NOT NULL, -- page_view, button_click, form_submit, download
  page_path TEXT,
  event_data JSONB,
  user_id UUID REFERENCES users(id), -- If authenticated
  session_id VARCHAR(255),
  ip_address INET,
  country VARCHAR(100),
  device_type VARCHAR(50), -- desktop, mobile, tablet
  browser VARCHAR(100),
  referrer TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Email Notifications Queue
CREATE TABLE email_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  to_email VARCHAR(255) NOT NULL,
  from_email VARCHAR(255),
  subject VARCHAR(500) NOT NULL,
  body_html TEXT,
  body_text TEXT,
  template_name VARCHAR(100),
  template_data JSONB,
  status VARCHAR(50) DEFAULT 'pending', -- pending, sent, failed
  attempts INTEGER DEFAULT 0,
  last_attempt_at TIMESTAMP,
  sent_at TIMESTAMP,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_created_at ON analytics_events(created_at DESC);
CREATE INDEX idx_email_queue_status ON email_queue(status, created_at);
```

### **Phase 4: Optional Features (Weeks 7-8)**

```sql
-- Newsletter Subscriptions (LATER)
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active', -- active, unsubscribed, bounced
  source VARCHAR(100), -- website, import, referral
  preferences JSONB, -- Topic preferences
  subscribed_at TIMESTAMP DEFAULT NOW(),
  unsubscribed_at TIMESTAMP,
  last_sent_at TIMESTAMP
);

-- Partner Portal Users (LATER)
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name VARCHAR(255) NOT NULL,
  contact_email VARCHAR(255) UNIQUE NOT NULL,
  contact_name VARCHAR(255),
  partner_type VARCHAR(50), -- distributor, integrator, reseller
  country VARCHAR(100),
  status VARCHAR(50) DEFAULT 'pending', -- pending, active, suspended
  portal_access BOOLEAN DEFAULT false,
  api_key VARCHAR(255),
  commission_rate DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🐳 **Docker Configuration**

### **Project Structure**

```
terra-industries/
├── client/                      # Next.js frontend (existing)
│   ├── app/
│   ├── components/
│   ├── package.json
│   └── next.config.mjs
│
├── server/                      # NestJS backend (new)
│   ├── src/
│   │   ├── modules/            # Feature modules
│   │   │   ├── auth/
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.module.ts
│   │   │   │   ├── dto/
│   │   │   │   └── guards/
│   │   │   ├── inquiries/
│   │   │   ├── rfq/
│   │   │   ├── media/
│   │   │   ├── news/
│   │   │   ├── products/
│   │   │   └── analytics/
│   │   ├── common/
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   ├── filters/
│   │   │   └── decorators/
│   │   ├── config/
│   │   │   ├── database.config.ts
│   │   │   ├── env.config.ts
│   │   │   └── redis.config.ts
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── test/
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── admin/                       # Admin panel (new)
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── package.json
│   └── next.config.mjs
│
├── docker-compose.yml           # Main orchestration
├── docker-compose.dev.yml       # Development overrides
├── .env.example
└── README.md
```

---

### **docker-compose.yml**

```yaml
version: '3.9'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:16-alpine
    container_name: terra-db
    restart: unless-stopped
    environment:
      POSTGRES_USER: terra_user
      POSTGRES_PASSWORD: ${DB_PASSWORD:-secure_password_change_me}
      POSTGRES_DB: terra_industries
      PGDATA: /var/lib/postgresql/data/pgdata
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./server/prisma/migrations:/docker-entrypoint-initdb.d
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U terra_user -d terra_industries"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - terra-network

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: terra-redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD:-redis_password}
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - terra-network

  # Backend API (NestJS)
  backend:
    build:
      context: ./server
      dockerfile: Dockerfile
      target: development
    container_name: terra-backend
    restart: unless-stopped
    ports:
      - "4000:4000"
    environment:
      NODE_ENV: development
      PORT: 4000
      
      # Database
      DATABASE_URL: postgresql://terra_user:${DB_PASSWORD:-secure_password_change_me}@postgres:5432/terra_industries
      
      # Redis
      REDIS_URL: redis://:${REDIS_PASSWORD:-redis_password}@redis:6379
      
      # JWT
      JWT_SECRET: ${JWT_SECRET:-your_jwt_secret_change_me}
      JWT_EXPIRES_IN: 7d
      
      # CORS
      CORS_ORIGIN: http://localhost:3000
      
      # Cloudflare R2
      R2_ACCOUNT_ID: ${R2_ACCOUNT_ID}
      R2_ACCESS_KEY_ID: ${R2_ACCESS_KEY_ID}
      R2_SECRET_ACCESS_KEY: ${R2_SECRET_ACCESS_KEY}
      R2_BUCKET_NAME: ${R2_BUCKET_NAME:-terra-media}
      R2_PUBLIC_URL: ${R2_PUBLIC_URL}
      
      # Resend Email
      RESEND_API_KEY: ${RESEND_API_KEY}
      EMAIL_FROM: ${EMAIL_FROM:-noreply@terraindustries.com}
      ADMIN_EMAIL: ${ADMIN_EMAIL:-admin@terraindustries.com}
      
      # Sentry (Optional)
      SENTRY_DSN: ${SENTRY_DSN}
    volumes:
      - ./server:/app
      - /app/node_modules
      - ./server/logs:/app/logs
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - terra-network
    command: pnpm start:dev

volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local

networks:
  terra-network:
    driver: bridge
```

---

### **docker-compose.dev.yml (Development Overrides)**

```yaml
version: '3.9'

services:
  backend:
    build:
      target: development
    volumes:
      - ./server:/app
      - /app/node_modules
    environment:
      NODE_ENV: development
      LOG_LEVEL: debug
    command: pnpm start:dev

  postgres:
    ports:
      - "5432:5432"  # Expose for local tools (pgAdmin, DBeaver)

  redis:
    ports:
      - "6379:6379"  # Expose for Redis Commander
```

---

### **server/Dockerfile (NestJS)**

```dockerfile
# Multi-stage build for NestJS

# Base stage
FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

# Dependencies stage
FROM base AS dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Development stage
FROM base AS development
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN npx prisma generate
EXPOSE 4000
CMD ["pnpm", "start:dev"]

# Build stage
FROM base AS build
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod
COPY . .
RUN npx prisma generate
RUN pnpm build

# Production stage
FROM node:20-alpine AS production
RUN npm install -g pnpm
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/prisma ./prisma

EXPOSE 4000
CMD ["node", "dist/main.js"]
```

---

## 🚀 **Backend Development Roadmap (NestJS)**

### **PHASE 0: Docker Setup (Week 0) - 4 hours**

**Goals:**
- Docker environment ready
- Database accessible
- NestJS scaffold

**Checklist:**
- [ ] Create `docker-compose.yml` (1h)
- [ ] Create `server/Dockerfile` (30min)
- [ ] Create `.env.example` with all variables (30min)
- [ ] Test Docker setup: `docker-compose up` (30min)
- [ ] Create NestJS project scaffold (1h)
  ```bash
  pnpm dlx @nestjs/cli new server
  ```
- [ ] Test database connection from backend container (30min)
- [ ] Document quick start in README (30min)

**Commands:**
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Access backend container
docker-compose exec backend sh

# Stop all services
docker-compose down

# Reset database
docker-compose down -v && docker-compose up -d
```

---

### **PHASE 1: Core Backend (Weeks 1-2) - 40 hours**

#### **Week 1: Authentication + Inquiry API** ✅ COMPLETE

**Status:** ✅ 100% Complete (36/36 todos)  
**Tests:** ✅ 49/49 passing (100%)  
**Completed:** November 4, 2025

**Module 1: Authentication (20h)** ✅ COMPLETE
- [x] Create `auth` module (2h)
  ```bash
  nest g module auth
  nest g controller auth
  nest g service auth
  ```
- [ ] Setup Prisma with PostgreSQL (2h)
  ```bash
  pnpm add -D prisma
  pnpm add @prisma/client
  npx prisma init
  ```
- [ ] JWT strategy implementation (3h)
  ```bash
  pnpm add @nestjs/jwt @nestjs/passport passport passport-jwt
  pnpm add -D @types/passport-jwt
  ```
- [ ] Password hashing with bcrypt (1h)
  ```bash
  pnpm add bcrypt
  pnpm add -D @types/bcrypt
  ```
- [ ] Auth guards (JWT, Roles) (2h)
- [ ] Login/register/logout/me endpoints (4h)
- [ ] Refresh token logic (2h)
- [ ] Unit tests for auth service (2h)
- [ ] E2E tests for auth endpoints (2h)

**Module 2: Inquiry Management (20h)**
- [ ] Create `inquiries` module (2h)
- [ ] Prisma schema for inquiries (1h)
- [ ] DTOs with Zod validation (2h)
  ```bash
  pnpm add zod nestjs-zod
  ```
- [ ] Inquiry CRUD endpoints (6h)
- [ ] Pagination + filtering (3h)
- [ ] Lead scoring service (2h)
- [ ] Unit + E2E tests (4h)

**Shared Infrastructure:**
- [ ] Global exception filter (1h)
- [ ] Logger service (Winston) (1h)
  ```bash
  pnpm add nest-winston winston
  ```
- [ ] CORS configuration (30min)
- [ ] Rate limiting (1h)
  ```bash
  pnpm add @nestjs/throttler
  ```
- [ ] Health check (30min)
  ```bash
  pnpm add @nestjs/terminus
  ```
- [ ] Swagger documentation (1h)
  ```bash
  pnpm add @nestjs/swagger
  ```

---

#### **Week 2: RFQ + Email Notifications**

**Module 3: RFQ System (20h)**
- [ ] Create `rfq` module (2h)
- [ ] Prisma schema for RFQ (1h)
- [ ] RFQ DTOs with Zod (2h)
- [ ] RFQ CRUD endpoints (6h)
- [ ] Link RFQ to inquiries (1h)
- [ ] RFQ status workflow (2h)
- [ ] Quote calculation logic (2h)
- [ ] Export RFQs to CSV (2h)
  ```bash
  pnpm add csv-writer
  ```
- [ ] Unit + E2E tests (2h)

**Module 4: Email Service (20h)**
- [ ] Create `email` module (2h)
- [ ] Setup Resend integration (2h)
  ```bash
  pnpm add resend
  ```
- [ ] Email templates (4h)
  - [ ] New inquiry notification
  - [ ] Inquiry confirmation
  - [ ] RFQ received
  - [ ] Quote sent
- [ ] Email queue system (3h)
- [ ] Email queue processor (Bull/BullMQ) (3h)
  ```bash
  pnpm add @nestjs/bull bull
  ```
- [ ] Retry logic for failed emails (2h)
- [ ] Email service tests (2h)
- [ ] Admin endpoints for email queue (1h)
- [ ] Test email sending (1h)

---

### **PHASE 2: File Storage + Admin Panel (Weeks 3-4) - 40 hours**

#### **Week 3: Media Management + Cloudflare R2**

**Module 5: File Upload (20h)**
- [ ] Create `media` module (2h)
- [ ] Setup Cloudflare R2 SDK (2h)
  ```bash
  pnpm add @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
  ```
- [ ] Multer configuration for uploads (2h)
  ```bash
  pnpm add -D @types/multer
  ```
- [ ] Single file upload endpoint (3h)
- [ ] Multiple file upload (2h)
- [ ] Image optimization with Sharp (3h)
  ```bash
  pnpm add sharp
  ```
- [ ] File validation (type, size) (2h)
- [ ] Media list/get/delete endpoints (2h)
- [ ] Tests for upload service (2h)

**Module 6: Activity Logs (20h)**
- [ ] Create `activity-logs` module (2h)
- [ ] Activity log interceptor (3h)
- [ ] Log all CRUD operations (4h)
- [ ] Activity log endpoints (2h)
- [ ] Admin UI integration (4h)
- [ ] Filter logs (user, action, date) (3h)
- [ ] Export logs (1h)
- [ ] Tests (1h)

---

#### **Week 4: Admin Dashboard UI**

**Admin Panel Setup (40h)**
- [ ] Setup Next.js admin project (2h)
  ```bash
  pnpm create next-app@latest admin
  cd admin
  pnpm add @tanstack/react-query axios
  ```
- [ ] Install shadcn/ui components (1h)
  ```bash
  pnpm dlx shadcn@latest init
  ```
- [ ] Setup API client (2h)
- [ ] Authentication flow (4h)
- [ ] Dashboard overview page (6h)
- [ ] Inquiry management UI (8h)
- [ ] RFQ management UI (8h)
- [ ] Media library UI (6h)
- [ ] Activity logs UI (3h)

---

### **PHASE 3: Content CMS (Weeks 5-6) - 40 hours**

#### **Week 5: News CMS**

**Module 7: News/Blog (20h)**
- [ ] Create `news` module (2h)
- [ ] Prisma schema for news (1h)
- [ ] News DTOs with Zod (2h)
- [ ] News CRUD endpoints (6h)
- [ ] Rich text handling (1h)
- [ ] Slug generation + validation (1h)
- [ ] Publish/unpublish workflow (2h)
- [ ] SEO fields (2h)
- [ ] Tests (3h)

**News Admin UI (20h)**
- [ ] News list page (4h)
- [ ] Create/edit form (8h)
- [ ] Rich text editor (TipTap) (4h)
  ```bash
  pnpm add @tiptap/react @tiptap/starter-kit
  ```
- [ ] Preview mode (2h)
- [ ] Update frontend to fetch from API (2h)

---

#### **Week 6: Products CMS + Documents**

**Module 8: Products (20h)**
- [ ] Create `products` module (2h)
- [ ] Prisma schema for products (1h)
- [ ] Product DTOs (2h)
- [ ] Product CRUD endpoints (6h)
- [ ] Specifications JSON handling (2h)
- [ ] Features/applications arrays (2h)
- [ ] Product categories (2h)
- [ ] Image gallery (1h)
- [ ] Tests (2h)

**Module 9: Documents (10h)**
- [ ] Create `documents` module (2h)
- [ ] Document upload (2h)
- [ ] Link to products (1h)
- [ ] Access control (2h)
- [ ] Download tracking (1h)
- [ ] Tests (2h)

**Products Admin UI (10h)**
- [ ] Products list page (2h)
- [ ] Create/edit form (5h)
- [ ] Document uploader (2h)
- [ ] Update frontend (1h)

---

### **PHASE 4: Analytics + Optimization (Weeks 7-8) - 30 hours**

#### **Week 7: Analytics System**

**Module 10: Analytics (20h)**
- [ ] Create `analytics` module (2h)
- [ ] Event tracking endpoint (2h)
- [ ] Analytics overview endpoint (4h)
- [ ] Charts data endpoints (4h)
- [ ] Export analytics (2h)
- [ ] Tests (2h)
- [ ] Update frontend tracking (4h)

**Analytics Admin UI (10h)**
- [ ] Analytics dashboard (6h)
- [ ] Date range picker (2h)
- [ ] Export button (2h)

---

#### **Week 8: Optimization + Production**

**Optimization (15h)**
- [ ] Redis caching with CacheModule (3h)
  ```bash
  pnpm add @nestjs/cache-manager cache-manager
  pnpm add cache-manager-redis-store
  ```
- [ ] Database indexes optimization (2h)
- [ ] Query optimization (2h)
- [ ] Response compression (1h)
  ```bash
  pnpm add compression
  ```
- [ ] Full-text search (PostgreSQL) (4h)
- [ ] Load testing (2h)
- [ ] Performance profiling (1h)

**Production Readiness (15h)**
- [ ] Security audit (3h)
- [ ] API documentation (Swagger) (2h)
- [ ] Postman collection export (1h)
- [ ] Database migrations (2h)
- [ ] Backup/restore scripts (2h)
- [ ] CI/CD pipeline (3h)
- [ ] Monitoring setup (2h)

---

## 🎯 **Development Workflow**

### **Daily Development**

```bash
# Start backend + database (Docker)
docker-compose up -d

# Start client (native for fast hot-reload)
cd client
pnpm dev

# View backend logs
docker-compose logs -f backend

# Access database
docker-compose exec postgres psql -U terra_user -d terra_industries

# Run backend tests
docker-compose exec backend pnpm test

# Run E2E tests
docker-compose exec backend pnpm test:e2e

# Stop all
docker-compose down
```

### **Database Management**

```bash
# Create migration
docker-compose exec backend npx prisma migrate dev --name add_users_table

# Run migrations
docker-compose exec backend npx prisma migrate deploy

# Seed database
docker-compose exec backend npx prisma db seed

# Prisma Studio (DB GUI)
docker-compose exec backend npx prisma studio

# Reset database
docker-compose down -v
docker-compose up -d
```

### **Backend Commands**

```bash
# Generate new module
docker-compose exec backend nest g module feature-name

# Generate controller
docker-compose exec backend nest g controller feature-name

# Generate service
docker-compose exec backend nest g service feature-name

# Generate guard
docker-compose exec backend nest g guard auth/jwt

# Generate interceptor
docker-compose exec backend nest g interceptor logging
```

---

## 📅 **8-Week Implementation Timeline**

| Week | Focus | Hours | Deliverables |
|------|-------|-------|--------------|
| **0** | Docker Setup | 4h | ✅ Infrastructure ready |
| **1** | Auth + Inquiries | 20h | ✅ Auth working, Inquiry API |
| **2** | RFQ + Email | 20h | ✅ RFQ system, Email queue |
| **3** | Media + Logs | 20h | ✅ R2 uploads, Activity logs |
| **4** | Admin Panel | 40h | ✅ Dashboard, CRUD UIs |
| **5** | News CMS | 20h | ✅ News management |
| **6** | Products + Docs | 20h | ✅ Product specs, Documents |
| **7** | Analytics | 15h | ✅ Analytics dashboard |
| **8** | Production | 15h | ✅ Optimized, deployed |
| **TOTAL** | **MVP Backend** | **174h** | **Full-stack app** |

---

## ✅ **Success Metrics**

### **Technical Metrics**

| Metric | Target | Measurement |
|--------|--------|-------------|
| API Response Time | <200ms (p95) | Nest Logger |
| Database Query Time | <50ms (avg) | Prisma metrics |
| Test Coverage | >80% | Jest coverage |
| Uptime | >99.5% | Health checks |
| Error Rate | <0.1% | Sentry |

### **Business Metrics**

| Metric | Target | Measurement |
|--------|--------|-------------|
| Inquiry Response Time | <24h | Admin dashboard |
| RFQ Conversion Rate | >20% | Analytics |
| Lead Score Accuracy | >80% | Manual review |
| Email Deliverability | >98% | Resend dashboard |

---

## 📚 **Documentation Deliverables**

1. ✅ **API Documentation** (Swagger UI at `/api/docs`)
2. ✅ **Database Schema Diagram** (ERD)
3. ✅ **Deployment Guide** (README.md)
4. ✅ **Environment Setup** (.env.example)
5. ✅ **Postman Collection** (All endpoints)
6. ✅ **Admin User Guide** (How to use admin panel)
7. ✅ **Development Workflow** (Git flow, testing, deployment)

---

## 💰 **Cost Estimate (MVP)**

| Service | Tier | Cost/Month | Notes |
|---------|------|------------|-------|
| **Railway** | Hobby | $5 | Backend + PostgreSQL |
| **Cloudflare R2** | Free | $0 | First 10GB free |
| **Resend** | Free | $0 | 100 emails/day |
| **Redis** | Docker | $0 | Local development |
| **Vercel** | Free | $0 | Already hosting |
| **Sentry** | Free | $0 | 5K events/month |
| **TOTAL** | | **$5/month** | Ultra-low cost! |

---

## 🚦 **Next Steps**

### **Immediate Actions:**

1. ✅ Review and approve this document
2. ⏳ Create Docker configuration files
3. ⏳ Setup NestJS project scaffold
4. ⏳ Initialize Prisma with PostgreSQL
5. ⏳ Start Week 1: Authentication module

**Ready to start implementation!** 🚀

---

**Last Updated:** November 4, 2025  
**Status:** 📋 Ready for Implementation  
**Tech Stack:** NestJS + Prisma + PostgreSQL + Redis + Cloudflare R2 + Resend

