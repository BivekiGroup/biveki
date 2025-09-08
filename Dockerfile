# Multi-stage build for Next.js + Prisma
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund

FROM node:20-alpine AS builder
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY prisma ./prisma
# Generate Prisma client for alpine (musl)
RUN npx prisma generate
COPY . .
# Build Next.js (standalone output)
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Copy standalone server and static assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
# Ensure Prisma client runtime and engines are present
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Create uploads folder (mounted as volume in compose)
RUN mkdir -p /app/public/uploads && chown -R node:node /app/public

USER node
EXPOSE 3000
# Start Next standalone server
CMD ["node", "server.js"]
