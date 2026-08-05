FROM node:24-trixie-slim AS frontend-build
WORKDIR /build/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build:prod

FROM node:24-trixie-slim AS backend-deps
WORKDIR /build/backend
COPY backend/package*.json ./
RUN npm ci --omit=dev

FROM node:24-trixie-slim AS production
ENV NODE_ENV=production PORT=8080 DB_DIALECT=sqlite DB_STORAGE=/data/miserere.sqlite \
    FRONTEND_DIR=/app/public SEED_DATABASE=true COOKIE_SECURE=false
WORKDIR /app
RUN groupadd --gid 1001 miserere && useradd --uid 1001 --gid miserere --create-home miserere \
    && mkdir -p /data /app/public && chown -R miserere:miserere /data /app
COPY --from=backend-deps --chown=miserere:miserere /build/backend/node_modules ./node_modules
COPY --chown=miserere:miserere backend/package.json ./package.json
COPY --chown=miserere:miserere backend/src ./src
COPY --from=frontend-build --chown=miserere:miserere /build/frontend/dist/miserere-mei/ ./public/
USER miserere
EXPOSE 8080
VOLUME ["/data"]
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 CMD ["node", "-e", "fetch('http://127.0.0.1:8080/ready').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"]
CMD ["node", "src/index.js"]
