# 🚀 Terra Industries

<div align="center">

![Terra Industries Logo](public/terra-logo.png)

**Advanced Defense Technology & Aerospace Solutions**

**Frontend:**  
[![Next.js](https://img.shields.io/badge/Next.js-16.0.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.16-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**Backend:**  
[![NestJS](https://img.shields.io/badge/NestJS-Planned-E0234E?style=for-the-badge&logo=nestjs)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Redis](https://img.shields.io/badge/Redis-Cache-DC382D?style=for-the-badge&logo=redis)](https://redis.io/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)

[🌐 Live Demo](https://terra-industries.vercel.app) • [📖 Documentation](#documentation) • [🚀 Quick Start](#quick-start) • [🐳 Docker](#docker)

</div>

---

## 🎯 Overview

Terra Industries is a cutting-edge defense technology company specializing in advanced aerospace solutions, autonomous systems, and AI-powered defense platforms. This modern web application showcases our innovative products and capabilities through an immersive, responsive interface.

**Current Status:**
- ✅ **Frontend**: Production-ready, live at [terra-industries-seven.vercel.app](https://terra-industries-seven.vercel.app/)
- ✅ **Backend Week 1**: Complete - Authentication + Inquiries API (10 endpoints, 33 tests passing)
- 🔄 **Backend Week 2**: Next - RFQ System + Email Notifications
- 🎯 **Goal**: Full-stack enterprise application with CMS, CRM, and analytics

### ✨ Key Features

**Frontend:**
- 🎨 **Modern UI/UX** - Sleek, professional design with smooth animations
- 📱 **Mobile-First** - Fully responsive across all devices
- ⚡ **Performance Optimized** - 60-80% bandwidth reduction, self-hosted fonts, code splitting
- 🎭 **Interactive Elements** - Engaging slideshows and dynamic content
- 🔒 **Production Ready** - 7 security headers, error tracking, type-safe
- 🌐 **SEO Optimized** - Static generation for optimal performance
- 🧪 **Well-Tested** - 82% code coverage with 66 passing tests
- 🛡️ **Error Monitoring** - Sentry integration with error boundaries
- 📐 **Type-Safe** - Zero TypeScript errors, strict mode enabled

**Backend API:**
- 🔐 **Authentication** - JWT tokens, bcrypt password hashing, role-based access
- 📧 **Contact Management** - Inquiry submission, automatic lead scoring (0-100)
- 📊 **Admin Dashboard** - Inquiry CRUD, pagination, filtering, statistics
- 🎯 **Lead Prioritization** - AI-powered scoring based on country, budget, keywords
- 🧪 **Fully Tested** - 33 tests passing (24 unit + 9 E2E)
- 📖 **Auto-Documented** - Swagger/OpenAPI at `/api-docs`
- 🐳 **Docker-Ready** - PostgreSQL + Redis containerized
- 🔒 **Secure** - Rate limiting, CORS, input validation, SQL injection prevention

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 16.0.0 with App Router
- **UI Library**: React 19.2.0 with TypeScript 5.9.3
- **Styling**: Tailwind CSS 4.1.16 with custom design system
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React for consistent iconography
- **3D Graphics**: Three.js for immersive visualizations
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Context + TanStack Query

### Backend (In Development)
- **Framework**: NestJS (TypeScript-first Node.js framework)
- **Language**: TypeScript 5.9.3 with strict mode
- **API Style**: RESTful API with versioning
- **Authentication**: JWT with Passport.js
- **Authorization**: Role-based access control (RBAC)
- **Documentation**: Swagger/OpenAPI auto-generated
- **Testing**: Jest + Supertest for unit and E2E tests
- **Validation**: Zod schemas for runtime type safety

### Database & ORM
- **Database**: PostgreSQL 16 (ACID-compliant relational DB)
- **ORM**: Prisma (type-safe database client)
- **Migrations**: Prisma Migrate for version control
- **Caching**: Redis for session storage and API caching
- **Search**: PostgreSQL full-text search

### File Storage & Media
- **Object Storage**: Cloudflare R2 (S3-compatible, free 10GB)
- **Image Processing**: Sharp for optimization and resizing
- **CDN**: Cloudflare CDN for global delivery
- **Formats**: Automatic WebP/AVIF conversion

### Communication
- **Email Service**: Resend (modern email API)
- **Email Templates**: React Email for beautiful emails
- **Email Queue**: Bull/BullMQ for reliable delivery
- **Retry Logic**: Automatic retry for failed emails

### Development Tools
- **Package Manager**: pnpm for fast, efficient dependency management
- **Type Safety**: TypeScript with strict configuration
- **Code Quality**: ESLint + Prettier for consistent code style
- **Version Control**: Git with conventional commits
- **Linting**: ESLint with TypeScript plugins
- **Formatting**: Prettier for consistent style

### Testing & Quality
- **Frontend Testing**: Vitest + React Testing Library (82% coverage)
- **Backend Testing**: Jest + Supertest (target >80% coverage)
- **E2E Testing**: Supertest for API integration tests
- **Load Testing**: Artillery for performance testing
- **Code Coverage**: Jest coverage reports

### Monitoring & Observability
- **Error Tracking**: Sentry for both frontend and backend
- **Analytics**: Vercel Analytics for frontend performance
- **Logging**: Winston for structured backend logs
- **Health Checks**: @nestjs/terminus for service monitoring
- **APM**: Built-in NestJS performance monitoring

### Security
- **Authentication**: JWT tokens with refresh mechanism
- **Password Hashing**: bcrypt for secure storage
- **Rate Limiting**: @nestjs/throttler for DDoS protection
- **CORS**: Configurable cross-origin policies
- **Helmet**: Security headers middleware
- **Input Validation**: Zod schemas for all inputs
- **SQL Injection**: Prisma parameterized queries
- **XSS Protection**: Built-in Next.js sanitization

### Infrastructure & DevOps
- **Containerization**: Docker with multi-stage builds
- **Orchestration**: Docker Compose for local development
- **Frontend Hosting**: Vercel (production)
- **Backend Hosting**: Railway/Render (planned)
- **Database Hosting**: Railway PostgreSQL (planned)
- **CI/CD**: GitHub Actions (planned)
- **Environment Management**: .env with Zod validation

### Admin Panel (Planned)
- **Framework**: Next.js with App Router
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **Data Tables**: TanStack Table for complex grids
- **Forms**: React Hook Form with Zod validation
- **API Client**: TanStack Query for data fetching
- **Rich Text**: TipTap for content editing

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20.9.0 or higher
- **pnpm** package manager
- **Docker & Docker Compose** (for backend database services)

---

### Frontend Development

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

### Backend Development

```bash
# 1. Start database services (PostgreSQL + Redis)
docker-compose up -d postgres redis

# 2. Setup backend
cd server
pnpm install
pnpm prisma:generate
pnpm prisma migrate dev --name init

# 3. Start backend API
pnpm start:dev
```

**Backend API:** [http://localhost:4000/api/v1](http://localhost:4000/api/v1)  
**Swagger Docs:** [http://localhost:4000/api-docs](http://localhost:4000/api-docs)  
**Prisma Studio:** Run `pnpm prisma:studio` (opens on port 5555)

---

### Full-Stack Development

Run both frontend and backend simultaneously:

**Terminal 1 (Backend):**
```bash
docker-compose up -d postgres redis
cd server && pnpm start:dev
```

**Terminal 2 (Frontend):**
```bash
pnpm dev
```

**Terminal 3 (Optional - Client dev with backend):**
```bash
# Frontend will connect to backend at http://localhost:4000
```

### Environment Variables

Copy `.env.example` to `.env.local` and configure the following variables:

```bash
# Application
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# API Configuration (Backend - optional for now)
NEXT_PUBLIC_API_URL=http://localhost:4000

# Analytics (Optional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=

# Error Tracking (Optional - Sentry)
NEXT_PUBLIC_SENTRY_DSN=

# Development
NEXT_TELEMETRY_DISABLED=1
```

**Required variables:**
- `NODE_ENV` - Environment mode (development, production, test)
- `NEXT_PUBLIC_SITE_URL` - Full URL of your application

**Optional variables:**
- `NEXT_PUBLIC_API_URL` - Backend API endpoint (for future backend integration)
- `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` - Vercel Analytics ID
- `NEXT_PUBLIC_SENTRY_DSN` - Sentry error tracking DSN

### Available Scripts

**Frontend:**
```bash
# Development
pnpm dev          # Start development server (port 3000)
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint issues automatically
pnpm type-check   # Run TypeScript type checking

# Testing
pnpm test         # Run tests (watch mode)
pnpm test:run     # Run tests once
pnpm test:coverage # Generate coverage report
```

**Backend:**
```bash
cd server

# Development
pnpm start:dev    # Start backend API (port 4000, hot-reload)
pnpm build        # Build for production
pnpm start:prod   # Start production server

# Database
pnpm prisma:generate  # Generate Prisma client
pnpm prisma:migrate   # Run database migrations
pnpm prisma:studio    # Open database GUI (port 5555)

# Testing
pnpm test         # Run unit tests
pnpm test:e2e     # Run E2E tests
pnpm test:cov     # Generate coverage report

# Code Quality
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
```

**Docker:**
```bash
# Start database services only (recommended for development)
docker-compose up -d postgres redis

# Start all services (optional)
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down

# Reset database (CAUTION: deletes all data)
docker-compose down -v
```

---

## 🐳 Docker

### Quick Docker Setup

```bash
# Build and run with Docker Compose
docker-compose up -d

# Access the application
open http://localhost:3000
```

### Docker Commands

```bash
# Build Docker image
docker build -t terra-industries .

# Run container
docker run -p 3000:3000 terra-industries

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

For detailed Docker documentation, see [DOCKER.md](./DOCKER.md).

---

## 📁 Project Structure

```
terra-industries/
├── 📁 client/                          # Frontend (Next.js) - Current
│   ├── 📁 app/                        # Next.js App Router
│   │   ├── 📁 (routes)/              # Route groups
│   │   ├── 📄 layout.tsx             # Root layout
│   │   ├── 📄 page.tsx               # Home page
│   │   └── 📄 globals.css            # Global styles
│   ├── 📁 components/                # Reusable components
│   │   ├── 📁 sections/              # Page sections
│   │   ├── 📁 mobile-*               # Mobile-specific components
│   │   └── 📁 ui/                    # UI components
│   ├── 📁 hooks/                     # Custom React hooks
│   ├── 📁 lib/                       # Utilities and helpers
│   ├── 📁 public/                    # Static assets
│   ├── 📁 test/                      # Tests and test utilities
│   ├── 🐳 Dockerfile                 # Docker configuration
│   ├── 📄 next.config.mjs            # Next.js configuration
│   ├── 📄 package.json               # Dependencies
│   └── 📄 tailwind.config.js         # Tailwind configuration
│
├── 📁 server/                          # Backend (NestJS) - Planned
│   ├── 📁 src/
│   │   ├── 📁 modules/               # Feature modules
│   │   │   ├── 📁 auth/              # Authentication
│   │   │   ├── 📁 inquiries/         # Contact management
│   │   │   ├── 📁 rfq/               # Request for Quote
│   │   │   ├── 📁 media/             # File uploads
│   │   │   ├── 📁 news/              # News CMS
│   │   │   ├── 📁 products/          # Product specs
│   │   │   └── 📁 analytics/         # Analytics tracking
│   │   ├── 📁 common/                # Shared resources
│   │   │   ├── 📁 guards/            # Auth guards
│   │   │   ├── 📁 interceptors/      # Logging, transform
│   │   │   ├── 📁 filters/           # Exception filters
│   │   │   └── 📁 decorators/        # Custom decorators
│   │   ├── 📁 config/                # Configuration
│   │   ├── 📁 prisma/                # Database schema
│   │   │   ├── 📄 schema.prisma      # Prisma schema
│   │   │   └── 📁 migrations/        # Database migrations
│   │   ├── 📄 app.module.ts          # Root module
│   │   └── 📄 main.ts                # Application entry
│   ├── 📁 test/                      # E2E tests
│   ├── 🐳 Dockerfile                 # Docker configuration
│   ├── 📄 package.json               # Dependencies
│   └── 📄 tsconfig.json              # TypeScript config
│
├── 📁 admin/                           # Admin Panel - Planned
│   ├── 📁 app/                        # Next.js App Router
│   ├── 📁 components/                # Admin UI components
│   ├── 📁 lib/                       # API client
│   ├── 📄 package.json               # Dependencies
│   └── 📄 next.config.mjs            # Next.js configuration
│
├── 🐳 docker-compose.yml              # Docker orchestration
├── 🐳 docker-compose.dev.yml          # Development overrides
├── 📄 .env.example                    # Environment template
├── 📄 README.md                       # This file
└── 📄 backend-database-integration.md # Backend roadmap
```

**Current Status:**
- ✅ **Client (Frontend)**: Production-ready, deployed to Vercel
- 📋 **Server (Backend)**: Planning phase, Docker-ready architecture
- 📋 **Admin Panel**: Planned for Phase 2
- 📋 **Database**: PostgreSQL + Redis in Docker

---

## 🎨 Design System

### Color Palette

```css
/* Primary Colors */
--terra-black: #000000
--terra-charcoal: #1a1a1a
--terra-steel-gray: #2d2d2d
--terra-cold-blue: #4a90e2
--terra-steel-blue: #2e5bba
--terra-silver: #c0c0c0
--terra-pure-white: #ffffff
```

### Typography

- **Headings**: Custom font stack with fallbacks
- **Body**: System font stack for optimal performance
- **Code**: Monospace font for technical content

### Components

- **Responsive Grid System** - Mobile-first approach
- **Interactive Elements** - Hover states and animations
- **Loading States** - Smooth transitions and spinners
- **Navigation** - Horizontal mobile navigation

---

## 📱 Mobile Optimization

### Features

- **Horizontal Navigation** - Touch-friendly mobile menu
- **Optimized Images** - Next.js Image component with lazy loading
- **Smooth Animations** - Reduced motion support
- **Touch Interactions** - Optimized for mobile devices
- **Performance** - Image preloading and caching

### Responsive Breakpoints

```css
/* Mobile First */
xs: 475px    /* Extra small devices */
sm: 640px    /* Small devices */
md: 768px    /* Medium devices */
lg: 1024px   /* Large devices */
xl: 1280px   /* Extra large devices */
```

---

## 🚀 Performance

### Optimization Features

- **Static Generation** - Pre-rendered pages for maximum speed
- **Image Optimization** - Automatic WebP conversion and sizing
- **Code Splitting** - Dynamic imports for optimal bundle size
- **Caching** - Aggressive caching strategies
- **CDN** - Global content delivery network

### Performance Metrics

- **First Contentful Paint**: 1.0s (Excellent)
- **Cumulative Layout Shift**: 0 (Perfect - zero layout shift)
- **Image Bandwidth**: 60-80% reduction via WebP/AVIF
- **Bundle Size**: 30-40% smaller via code splitting
- **Font Loading**: Self-hosted, zero external requests
- **TypeScript**: Zero errors, strict mode enabled
- **Test Coverage**: 82% (66 tests passing)

---

## 🔧 Development

### Code Style

- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Conventional Commits** - Standardized commit messages
- **TypeScript** - Strict type checking

### Git Workflow

```bash
# Feature development
git checkout -b feature/your-feature-name
git add .
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
```

### Testing

```bash
# Run type checking
pnpm type-check

# Run linting
pnpm lint

# Build verification
pnpm build
```

---

## 📦 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - **Build Command**: `pnpm build`
   - **Output Directory**: `.next`
   - **Install Command**: `pnpm install`
3. Deploy automatically on push to main

### Docker

```bash
# Build production image
docker build -t terra-industries .

# Run in production
docker run -p 3000:3000 terra-industries
```

### Environment Variables

```env
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

---

## 📖 Documentation

### Available Documentation

- **[README.md](./README.md)** - This file, project overview and setup
- **[backend-database-integration.md](./backend-database-integration.md)** - Backend & database roadmap
- **[development-roadmap.md](./development-roadmap.md)** - Full project roadmap
- **[structural-opt.md](./structural-opt.md)** - Frontend optimization report
- **[PROGRESS-SUMMARY.md](./PROGRESS-SUMMARY.md)** - Detailed progress summary
- **[DOCKER.md](./DOCKER.md)** - Docker deployment guide
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution guidelines

### Backend Development

For backend implementation details, see **[backend-database-integration.md](./backend-database-integration.md)**

**Backend Tech Stack:**
- NestJS + TypeScript
- PostgreSQL + Prisma
- Redis caching
- Cloudflare R2 storage
- Resend email service
- Docker containerization

**Timeline:** 8 weeks for MVP (174 hours)

**Status:** 📋 Planning complete, ready for implementation

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

### Development Setup

```bash
# Fork and clone
git clone https://github.com/your-username/terra-industries.git
cd terra-industries

# Install dependencies
pnpm install

# Start development
pnpm dev
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🏢 About Terra Industries

Terra Industries is a leading defense technology company specializing in:

- **Aerospace Solutions** - Advanced VTOL aircraft and drones
- **AI Systems** - Autonomous mission planning and execution
- **Defense Technology** - Cutting-edge security solutions
- **International Operations** - Global presence and partnerships

### Our Products

- **Archer VTOL** - Vertical takeoff and landing aircraft
- **Artemis OS** - AI-powered mission control system
- **Iroko Surveillance** - Advanced reconnaissance systems
- **Duma Operations** - Tactical mission support
- **Kallon Intelligence** - Data analysis and insights

---

## 📞 Contact

- **Website**: [terra-industries.com](https://terra-industries.com)
- **Email**: contact@terra-industries.com
- **LinkedIn**: [Terra Industries](https://linkedin.com/company/terra-industries)
- **GitHub**: [@terra-industries](https://github.com/terra-industries)

---

<div align="center">

**Built with ❤️ by the Terra Industries Team**

[⬆ Back to Top](#-terra-industries)

</div>
