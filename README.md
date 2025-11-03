# 🚀 Terra Industries

<div align="center">

![Terra Industries Logo](public/terra-logo.png)

**Advanced Defense Technology & Aerospace Solutions**

[![Next.js](https://img.shields.io/badge/Next.js-16.0.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.16-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)

[🌐 Live Demo](https://terra-industries.vercel.app) • [📖 Documentation](#documentation) • [🚀 Quick Start](#quick-start) • [🐳 Docker](#docker)

</div>

---

## 🎯 Overview

Terra Industries is a cutting-edge defense technology company specializing in advanced aerospace solutions, autonomous systems, and AI-powered defense platforms. This modern web application showcases our innovative products and capabilities through an immersive, responsive interface.

### ✨ Key Features

- 🎨 **Modern UI/UX** - Sleek, professional design with smooth animations
- 📱 **Mobile-First** - Fully responsive across all devices
- ⚡ **Performance Optimized** - 60-80% bandwidth reduction, self-hosted fonts, code splitting
- 🎭 **Interactive Elements** - Engaging slideshows and dynamic content
- 🔒 **Production Ready** - 7 security headers, error tracking, type-safe
- 🌐 **SEO Optimized** - Static generation for optimal performance
- 🧪 **Well-Tested** - 82% code coverage with 66 passing tests
- 🛡️ **Error Monitoring** - Sentry integration with error boundaries
- 📐 **Type-Safe** - Zero TypeScript errors, strict mode enabled

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 16.0.0 with App Router
- **UI Library**: React 19.2.0 with TypeScript
- **Styling**: Tailwind CSS 4.1.16 with custom design system
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React for consistent iconography

### Development
- **Package Manager**: pnpm for fast, efficient dependency management
- **Type Safety**: TypeScript with strict configuration
- **Code Quality**: ESLint + Prettier for consistent code style
- **Version Control**: Git with conventional commits

### Deployment
- **Containerization**: Docker with multi-stage builds
- **Orchestration**: Docker Compose for easy development
- **Hosting**: Vercel for production deployment
- **CDN**: Optimized static asset delivery

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20.9.0 or higher
- **pnpm** package manager
- **Docker** (optional, for containerized deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/terra-industries.git
cd terra-industries

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

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

```bash
# Development
pnpm dev          # Start development server
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

# Docker
docker-compose up -d    # Start with Docker
docker-compose down     # Stop Docker services
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
├── 📁 app/                    # Next.js App Router
│   ├── 📁 (routes)/          # Route groups
│   ├── 📄 layout.tsx         # Root layout
│   ├── 📄 page.tsx           # Home page
│   └── 📄 globals.css        # Global styles
├── 📁 components/            # Reusable components
│   ├── 📁 sections/          # Page sections
│   ├── 📁 mobile-*           # Mobile-specific components
│   └── 📄 ui/                # UI components
├── 📁 hooks/                 # Custom React hooks
├── 📁 public/                # Static assets
│   ├── 📁 stories/           # Image assets
│   └── 📁 ArtemisOS/         # Product images
├── 📁 styles/                # Additional styles
├── 🐳 Dockerfile             # Docker configuration
├── 🐳 docker-compose.yml     # Docker Compose setup
├── 📄 next.config.mjs        # Next.js configuration
├── 📄 package.json           # Dependencies
└── 📄 tailwind.config.js     # Tailwind configuration
```

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
