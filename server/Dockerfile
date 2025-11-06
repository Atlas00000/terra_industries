# Multi-stage build for NestJS backend

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
RUN pnpm install --frozen-lockfile || pnpm install
COPY . .
RUN pnpm prisma:generate || echo "Prisma not configured yet"
RUN pnpm build

# Production stage
FROM node:20-alpine AS production
RUN npm install -g pnpm
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
COPY --from=build /app/pnpm-lock.yaml ./
COPY --from=build /app/prisma ./prisma

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile || pnpm install --prod

# Generate Prisma Client
RUN pnpm prisma:generate

EXPOSE 4000
CMD ["node", "dist/main.js"]

