# Multi-stage build for NestJS backend
# Updated: 2025-11-06

# Base stage
FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

# Dependencies stage
FROM base AS dependencies
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile || pnpm install

# Development stage
FROM base AS development
# Install build dependencies for native modules (bcrypt)
RUN apk add --no-cache python3 make g++
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile || pnpm install
COPY . .
RUN pnpm prisma:generate || echo "Prisma not configured yet"
EXPOSE 4000
CMD ["pnpm", "start:dev"]

# Build stage
FROM base AS build
# Install build dependencies for native modules (bcrypt)
RUN apk add --no-cache python3 make g++
COPY package.json pnpm-lock.yaml* ./
# Install all dependencies (no cache issues)
RUN pnpm install --frozen-lockfile
COPY . .
# Verify node_modules exists and generate Prisma
RUN ls -la node_modules/.bin/ && \
    pnpm prisma generate && \
    pnpm build

# Production stage
FROM node:20-alpine AS production
RUN npm install -g pnpm
# Install OpenSSL for Prisma
RUN apk add --no-cache openssl
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
COPY --from=build /app/pnpm-lock.yaml ./
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules/.pnpm/@prisma+client* ./node_modules/.pnpm/
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile || pnpm install --prod

EXPOSE 4000
CMD ["node", "dist/main.js"]

