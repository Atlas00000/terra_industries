# Docker Setup for Terra Industries

## Quick Start

### Using Docker Compose (Recommended)
```bash
# Build and start the application
docker-compose up --build

# Run in background
docker-compose up -d --build

# Stop the application
docker-compose down
```

### Using Docker directly
```bash
# Build the image
docker build -t terra-industries .

# Run the container
docker run -p 3000:3000 terra-industries
```

## Access the Application
- **Local**: http://localhost:3000
- **Network**: http://192.168.1.162:3000

**Note**: Make sure to stop the development server (`pnpm dev`) before running Docker on port 3000 to avoid port conflicts.

## Docker Commands

### Development
```bash
# Stop dev server first (if running)
pkill -f "next dev" || true

# Build and run with live reload (if needed)
docker-compose up --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production
```bash
# Build for production
docker-compose -f docker-compose.yml up --build -d

# Check container status
docker-compose ps

# View logs
docker-compose logs -f terra-industries
```

## Health Check
The container includes a health check that verifies the application is responding on port 3000.

## Environment Variables
- `NODE_ENV=production`
- `NEXT_TELEMETRY_DISABLED=1`
- `PORT=3000`
- `HOSTNAME=0.0.0.0`

## Image Size Optimization
- Uses Node.js 18 Alpine (smaller base image)
- Multi-stage build to reduce final image size
- Standalone Next.js output for minimal runtime dependencies
- Non-root user for security
