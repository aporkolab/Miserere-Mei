# Multi-stage build for production-ready frontend
FROM node:24-alpine AS base

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies stage
FROM base AS deps
RUN npm ci --omit=dev && npm cache clean --force

# Development dependencies stage
FROM base AS dev-deps
RUN npm ci

# Development stage
FROM dev-deps AS dev
COPY . .
CMD ["dumb-init", "npm", "run", "start"]

# Build stage
FROM dev-deps AS build
COPY . .

# Build the Angular application for production
RUN npm run build:prod

# Production stage using nginx
FROM nginx:1.25-alpine AS production

# Install dumb-init
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nginx && \
    adduser -S nginxuser -u 1001 -G nginx

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application from build stage
COPY --from=build --chown=nginxuser:nginx /usr/src/app/dist/miserere-mei/ /usr/share/nginx/html/

# Switch to non-root user
USER nginxuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

# Expose port
EXPOSE 80

# Start nginx
ENTRYPOINT ["dumb-init", "--"]
CMD ["nginx", "-g", "daemon off;"]
