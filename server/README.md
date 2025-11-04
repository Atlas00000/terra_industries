# Terra Industries Backend API

NestJS backend server for Terra Industries defense technology platform.

## Tech Stack

- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL 16
- **ORM**: Prisma
- **Authentication**: JWT + Passport
- **Validation**: Zod + class-validator
- **Documentation**: Swagger/OpenAPI
- **Logging**: Winston
- **Testing**: Jest + Supertest

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm
- Docker & Docker Compose

### Installation

```bash
# Install dependencies
cd server
pnpm install

# Generate Prisma client
pnpm prisma:generate

# Run database migrations
pnpm prisma:migrate
```

### Development

```bash
# Start with Docker (recommended)
docker-compose up -d

# Or start locally (requires PostgreSQL + Redis running)
pnpm start:dev
```

### Access Points

- **API**: http://localhost:4000/api/v1
- **Swagger Docs**: http://localhost:4000/api-docs
- **Health Check**: http://localhost:4000/api/v1/health
- **Prisma Studio**: Run `pnpm prisma:studio` (opens on http://localhost:5555)

---

## 📁 Project Structure

```
server/
├── src/
│   ├── modules/                # Feature modules
│   │   ├── auth/              # Authentication
│   │   ├── inquiries/         # Contact inquiries
│   │   └── ...
│   ├── common/                # Shared resources
│   │   ├── guards/            # Auth guards
│   │   ├── filters/           # Exception filters
│   │   └── decorators/        # Custom decorators
│   ├── config/                # Configuration
│   ├── prisma/                # Prisma module
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── app.module.ts          # Root module
│   └── main.ts                # Application entry
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── test/                      # E2E tests
├── Dockerfile
└── package.json
```

---

## 🗄️ Database

### Migrations

```bash
# Create a new migration
pnpm prisma migrate dev --name migration_name

# Apply migrations (production)
pnpm prisma migrate deploy

# Reset database (CAUTION: deletes all data)
pnpm prisma migrate reset
```

### Prisma Studio

Visual database editor:

```bash
pnpm prisma:studio
```

---

## 🔐 Authentication

JWT-based authentication with refresh tokens.

### Register Admin

```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "admin@terraindustries.com",
  "password": "SecurePass123!",
  "fullName": "Admin User"
}
```

### Login

```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@terraindustries.com",
  "password": "SecurePass123!"
}
```

Response:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "7d",
  "user": {
    "id": "uuid",
    "email": "admin@terraindustries.com",
    "role": "admin"
  }
}
```

### Protected Routes

Include JWT token in Authorization header:

```bash
Authorization: Bearer <your_token_here>
```

---

## 📝 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Create admin account
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/me` - Get current user (protected)

### Inquiries
- `POST /api/v1/inquiries` - Submit contact form (public)
- `GET /api/v1/inquiries` - List inquiries (admin)
- `GET /api/v1/inquiries/:id` - Get single inquiry (admin)
- `PATCH /api/v1/inquiries/:id` - Update inquiry (admin)
- `DELETE /api/v1/inquiries/:id` - Delete inquiry (admin)

### Health
- `GET /api/v1/health` - Health check

Full API documentation available at `/api-docs`

---

## 🧪 Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Test coverage
pnpm test:cov

# Watch mode
pnpm test:watch
```

---

## 🐳 Docker

### Development

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down

# Reset everything (including database)
docker-compose down -v
```

### Production Build

```bash
# Build production image
docker build -t terra-backend:prod --target production .

# Run production container
docker run -p 4000:4000 --env-file .env terra-backend:prod
```

---

## 📊 Available Scripts

```bash
pnpm start:dev        # Start development server (watch mode)
pnpm start:prod       # Start production server
pnpm build            # Build for production
pnpm lint             # Run ESLint
pnpm format           # Format code with Prettier
pnpm test             # Run unit tests
pnpm test:e2e         # Run E2E tests
pnpm test:cov         # Generate coverage report
pnpm prisma:generate  # Generate Prisma client
pnpm prisma:migrate   # Run database migrations
pnpm prisma:studio    # Open Prisma Studio (database GUI)
```

---

## 🔧 Environment Variables

See `.env.example` in project root for all available variables.

Required:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing secret
- `CORS_ORIGIN` - Frontend URL for CORS

Optional:
- `REDIS_URL` - Redis connection string
- `R2_*` - Cloudflare R2 credentials
- `RESEND_API_KEY` - Email service API key
- `SENTRY_DSN` - Error tracking

---

## 📖 Documentation

- **Swagger UI**: http://localhost:4000/api-docs
- **Prisma Docs**: https://www.prisma.io/docs
- **NestJS Docs**: https://docs.nestjs.com

---

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Write tests
4. Run linting: `pnpm lint`
5. Run tests: `pnpm test`
6. Create pull request

---

## 📄 License

MIT

