# 📁 Terra Industries - Folder Structure

**Date:** November 5, 2025  
**Structure:** Monorepo (client + server + docs + scripts)  
**Organization:** Clean, scalable, industry-standard

---

## 🏗️ Monorepo Structure

```
terra-industries/
├── client/                 # Frontend (Next.js)
├── server/                 # Backend (NestJS)
├── docs/                   # Documentation
├── scripts/                # Utility scripts
└── [config files]          # Root config only
```

---

## 📂 Detailed Structure

### **Root Directory (Clean)**
```
terra-industries/
├── client/                       # Frontend application
├── server/                       # Backend application
├── docs/                         # All documentation
├── scripts/                      # Test/utility scripts
├── docker-compose.yml            # Docker orchestration
├── docker-compose.dev.yml        # Dev overrides
├── pnpm-workspace.yaml           # Monorepo workspace
├── vercel.json                   # Vercel config (points to client/)
├── package.json                  # Workspace scripts
├── pnpm-lock.yaml                # Lockfile
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore
├── LICENSE                       # MIT License
└── README.md                     # Main README
```

**Total:** 12 files + 4 folders in root ✅

---

### **client/** - Frontend (Next.js)
```
client/
├── app/                          # Next.js App Router
│   ├── archer/                  # Archer VTOL page
│   ├── artemis/                 # Artemis OS page
│   ├── company/                 # Company page
│   ├── duma/                    # Duma UGV page
│   ├── iroko/                   # Iroko UAV page
│   ├── kallon/                  # Kallon Tower page
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── loading.tsx              # Loading component
│   ├── not-found.tsx            # 404 page
│   └── globals.css              # Global styles
├── components/                   # React components (141 files)
│   ├── sections/                # Page sections (8)
│   ├── ui/                      # shadcn/ui components (57)
│   ├── archer/                  # Archer components (4)
│   ├── artemis/                 # Artemis components (7)
│   ├── company/                 # Company components (4)
│   ├── duma/                    # Duma components (5)
│   ├── iroko/                   # Iroko components (7)
│   ├── kallon/                  # Kallon components (5)
│   ├── mobile-*.tsx             # Mobile slideshows (15)
│   ├── __tests__/               # Component tests (4)
│   ├── error-boundary.tsx       # Error boundary
│   ├── footer.tsx               # Footer
│   ├── header.tsx               # Header
│   └── ... (141 total)
├── hooks/                        # Custom React hooks (4)
│   ├── __tests__/               # Hook tests (2)
│   ├── use-mobile.ts
│   ├── use-mobile-optimization.ts
│   ├── use-optimized-scroll.ts
│   └── use-toast.ts
├── lib/                          # Utilities (3)
│   ├── __tests__/               # Util tests (2)
│   ├── config.ts                # Environment config
│   ├── types.ts                 # TypeScript types
│   └── utils.ts                 # Utility functions
├── public/                       # Static assets
│   ├── archer_vtol/             # Archer images
│   ├── ArtemisOS/               # Artemis images
│   ├── Duma_ground_drone/       # Duma images
│   ├── Iroko_UAV/               # Iroko images
│   ├── kallon(sentry_tower)/    # Kallon images
│   ├── stories/                 # News/story images
│   └── terra-logo.png           # Logo
├── test/                         # Test setup
│   └── setup.ts                 # Vitest setup
├── utils/                        # Animation utilities
│   └── animation-utils.ts
├── package.json                  # Frontend dependencies
├── next.config.mjs               # Next.js configuration
├── tsconfig.json                 # TypeScript config
├── vitest.config.mts             # Vitest config
├── tailwind.config.ts            # Tailwind config
├── postcss.config.mjs            # PostCSS config
├── components.json               # shadcn/ui config
├── Dockerfile                    # Frontend Docker
├── .env.example                  # Frontend env template
├── .eslintrc.json                # ESLint config
├── .dockerignore                 # Docker ignore
├── sentry.client.config.ts       # Sentry client
├── sentry.server.config.ts       # Sentry server
└── sentry.edge.config.ts         # Sentry edge
```

**Total:** ~250 files

---

### **server/** - Backend (NestJS)
```
server/
├── src/                          # Source code
│   ├── modules/                 # Feature modules (11)
│   │   ├── auth/                # Authentication
│   │   ├── inquiries/           # CRM
│   │   ├── rfq/                 # Sales pipeline
│   │   ├── email/               # Email queue
│   │   ├── media/               # Media (R2)
│   │   ├── activity-logs/       # Audit trail
│   │   ├── news/                # News CMS
│   │   ├── product-specs/       # Product specs
│   │   ├── analytics/           # Analytics
│   │   ├── search/              # Search
│   │   └── health/              # Health checks
│   ├── common/                  # Shared (guards, filters, pipes)
│   ├── config/                  # Configuration
│   ├── prisma/                  # Database
│   │   ├── schema.prisma        # Schema (8 models)
│   │   └── migrations/          # Migration history
│   ├── utils/                   # Utilities
│   ├── app.module.ts            # Root module
│   └── main.ts                  # Entry point
├── test/                         # E2E tests (52 tests)
│   ├── setup-e2e.ts             # Test setup
│   ├── auth.e2e-spec.ts
│   ├── rfq.e2e-spec.ts
│   ├── news.e2e-spec.ts
│   ├── media.e2e-spec.ts
│   ├── product-specs.e2e-spec.ts
│   ├── analytics-search.e2e-spec.ts
│   ├── comprehensive.e2e-spec.ts
│   ├── test.env                 # Test environment
│   └── jest-e2e.json            # Jest config
├── coverage/                     # Test coverage reports
├── logs/                         # Application logs
├── dist/                         # Build output
├── package.json                  # Backend dependencies
├── tsconfig.json                 # TypeScript config
├── nest-cli.json                 # NestJS CLI
├── Dockerfile                    # Backend Docker
├── .env.example                  # Env template
└── README.md                     # Backend README
```

**Total:** ~150 files

---

### **docs/** - Documentation
```
docs/
├── BACKEND-PROGRESS.md           # Backend development report
├── PROJECT-COMPLETION-REPORT.md  # Final completion report
├── PROGRESS-SUMMARY.md           # Full-stack summary
├── integration.md                # Integration roadmap
├── CHANGELOG.md                  # Version history
├── development-roadmap.md        # Project roadmap
├── backend-database-integration.md # Architecture docs
├── RESUME-DEVELOPMENT.md         # Resume guide
├── PROJECT-STATUS.md             # Current status
├── FOLDER-STRUCTURE.md           # This file
├── CONTRIBUTING.md               # Contributing guide
├── DOCKER.md                     # Docker guide
├── structural-opt.md             # Optimization guide
├── architecture.md               # System architecture
├── firm_persona.md               # Company persona
├── main_terra_industries.md      # Company overview
├── product_specifications.md     # Product specs
├── stories_news.md               # News/stories
├── terra_product.md              # Product details
├── terra_ui.md                   # UI guidelines
└── Terrahaptix_profile.md        # Company profile
```

**Total:** 20+ documentation files

---

### **scripts/** - Utility Scripts
```
scripts/
├── test-api.sh                   # Test API endpoints
├── test-week1.sh                 # Week 1 tests
├── test-week2.sh                 # Week 2 tests
├── test-week3.sh                 # Week 3 tests
├── test-week4.sh                 # Week 4 tests
├── test-week5.sh                 # Week 5 tests
├── test-week6.sh                 # Week 6 tests
├── test-redis-caching.sh         # Redis tests
├── test-backend-comprehensive.sh # Comprehensive tests
└── run-tests.sh                  # Test runner
```

**Total:** 10 test scripts

---

## 🎯 Benefits of New Structure

### **Before (Messy)**
- ❌ Frontend files scattered in root
- ❌ Documentation mixed with code
- ❌ Scripts in root
- ❌ Hard to navigate
- ❌ Confusing for new developers

### **After (Clean)**
- ✅ Clear separation (client/, server/, docs/, scripts/)
- ✅ Easy to find files
- ✅ Scalable structure
- ✅ Industry-standard monorepo
- ✅ Easy to deploy separately
- ✅ Clean root (only orchestration files)

---

## 🚀 Deployment Benefits

### **Vercel (Frontend)**
- Points to `client/` via `vercel.json`
- Clean build process
- No backend files in frontend deployment

### **Railway/Render (Backend)**
- Points to `server/` directory
- No frontend files in backend deployment
- Clean Docker build

### **Documentation**
- All docs in one place (`docs/`)
- Easy to find and maintain
- Version controlled

---

## 📊 File Count

- **Root:** 12 files + 4 folders
- **Client:** ~250 files
- **Server:** ~150 files
- **Docs:** 20 files
- **Scripts:** 10 files

**Total:** ~440 files (organized!)

---

## ✅ Structure Validation

**Root:**
- ✅ Only workspace config and orchestration files
- ✅ No scattered .md files
- ✅ No scattered .sh files
- ✅ No frontend code
- ✅ No backend code

**client/**
- ✅ All frontend code
- ✅ All frontend configs
- ✅ All frontend tests

**server/**
- ✅ All backend code
- ✅ All backend configs
- ✅ All backend tests

**docs/**
- ✅ All documentation
- ✅ All .md files

**scripts/**
- ✅ All test scripts
- ✅ All .sh files

---

## 🔄 Migration Summary

**Moved to client/:**
- app/, components/, hooks/, lib/, public/, test/, utils/, styles/
- All frontend config files
- Sentry configs
- Coverage reports

**Moved to docs/:**
- All .md files (except root README.md)

**Moved to scripts/:**
- All .sh test scripts

**Stayed in root:**
- docker-compose.yml (orchestrates both)
- pnpm-workspace.yaml (workspace config)
- vercel.json (deployment config)
- package.json (workspace scripts)
- README.md (main documentation)
- LICENSE

---

**Structure Status: ✅ CLEAN & ORGANIZED**
