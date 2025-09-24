# Deployment & Environments

## Branching
- main (prod), staging (qa), feature/*

## Vercel Projects
- Project: go4you (main=Production, PR=Preview)
- Optional: separate project for staging.go4u.app

## Build Command
`prisma generate && prisma migrate deploy && next build`

## Env Vars
- GEMINI_API_KEY=…
- EMAIL_PROVIDER=resend
- EMAIL_API_KEY=…
- DATABASE_URL=…
- NEXTAUTH_SECRET=…
- NEXT_PUBLIC_APP_NAME=Go4you
- …

## Domains
- Primary: go4u.app
- 301 redirect: go4uapp.com → go4u.app
- Subdomains: app., admin., staging., mail., (api., cdn.)

## Observability
- Sentry DSN, Log retention, Health endpoint /api/health
