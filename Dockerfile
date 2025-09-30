FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
# Build client with Vite
RUN npx vite build
# Build server with bundled dependencies (no external packages for Docker)
RUN npx esbuild server/index.ts --platform=node --bundle --format=esm --outdir=dist

# Production image
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built application (dist contains both server and client/public files)
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/attached_assets ./attached_assets

# Expose port
EXPOSE 5000

# Start the application
CMD ["node", "dist/index.js"]
