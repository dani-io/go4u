# Go4u — Deployment Guide

## 1) Environments
- **Local** (developer machine):  
  - Run Next.js + Postgres + Redis via Docker Compose.  
  - Feature flags, hot reload, debug logging.  

- **Staging**:  
  - Hosted on Vercel (frontend + API routes).  
  - Managed Postgres + Redis (cloud provider).  
  - Used for QA, demo, and investor testing.  
  - Auto-deployed on merges to `staging` branch.  

- **Production**:  
  - Vercel for frontend.  
  - Option 1 (MVP): Vercel serverless API + managed Postgres/Redis.  
  - Option 2 (Scale): Containerized services on Kubernetes/Docker Swarm.  
  - Auto-deployed on merges to `main` branch (after CI/CD checks).  

---

## 2) Branch → Environment Mapping
- `feature/*` → PR Preview Deploy (Vercel preview URL).  
- `dev` → Developer shared env (optional).  
- `staging` → Vercel staging + staging DB.  
- `main` → Production.  

---

## 3) Vercel Deployment
- Connect GitHub repo → Vercel project.  
- Add environment variables via Vercel dashboard (never commit secrets).  
- Each PR → auto-preview (`https://pr-123-go4u.vercel.app`).  
- Branch `main` → production domain: `https://go4u.app`.  
- Branch `staging` → staging domain: `https://staging.go4u.app`.  

---

## 4) Docker & Local Dev
`docker-compose.yml` example:
```yaml
version: "3.9"
services:
  db:
    image: postgres:16
    restart: always
    environment:
      POSTGRES_DB: go4u
      POSTGRES_USER: go4u
      POSTGRES_PASSWORD: secret
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data
  redis:
    image: redis:7
    restart: always
    ports:
      - "6379:6379"
volumes:
  db_data:

Local run:

pnpm install
pnpm dev

5) CI/CD Flow

CI (GitHub Actions):

Lint, type-check, tests.

Prisma migrations validation.

Build check.

CD (Vercel):

If CI passes → deploy preview/staging/prod.

Post-deploy checks: health endpoints, smoke tests.

6) Secrets Management

Stored in:

Vercel env vars (per environment).

.env.local for local dev (not committed).

Secrets rotated quarterly or on incident.

Use different keys per environment.

7) Database Deployment

Migrations:

Generated via Prisma.

Applied automatically on staging deploys.

For production: manual approval (prisma migrate deploy).

Backups:

Nightly full DB dump.

Retained 30 days (staging), 90 days (production).

8) Monitoring & Alerts

Sentry: error tracking.

Prometheus/Grafana (future): infra metrics.

Vercel Analytics: request/latency stats.

Alerts to Slack/Telegram.

9) Rollback

Vercel: one-click rollback to previous deployment.

Database: PITR (point-in-time recovery) if managed Postgres.

Feature flags: disable buggy features instantly.

10) Domains & Subdomains

Production: go4u.app (frontend+API).

Staging: staging.go4u.app.

Docs: docs.go4u.app (optional, GitHub Pages or Vercel project).

Admin: /admin path inside main app (not separate subdomain).

11) Future Scaling

Break out backend services to containers.

Use managed message broker (Kafka/PubSub).

Multi-region Postgres read replicas.

CDN for static/media assets.
