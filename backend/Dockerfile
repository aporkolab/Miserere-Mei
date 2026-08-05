# Multi-stage build for production-ready backend
FROM node:24-alpine AS base

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
FROM base AS deps
RUN npm ci --omit=dev && npm cache clean --force

# Development stage
FROM base AS dev
RUN npm ci
COPY . .
CMD ["dumb-init", "npm", "run", "dev"]

# Production stage
FROM base AS production

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001

# Copy node_modules from deps stage
COPY --from=deps --chown=nodeuser:nodejs /usr/src/app/node_modules ./node_modules

# Copy built application
COPY --chown=nodeuser:nodejs src ./src
COPY --chown=nodeuser:nodejs healthcheck.js ./healthcheck.js

# Switch to non-root user
USER nodeuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node healthcheck.js || exit 1

# Expose port
EXPOSE 3000

# Start the application
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]
