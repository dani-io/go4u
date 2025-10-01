# Go4u — Environment Variables

This document defines **all environment variables**, scoping per environment (local, staging, production), storage policy, validation, rotation, and examples.

> Never commit real secrets. Use `.env.local` for local dev and Vercel’s encrypted env store for staging/production.

---

## 1) Files & Sources

- Local:
  - `.env.local` (ignored by git)
  - `.env.test` (CI tests only)
  - `.env.example` (template without secrets)
- Cloud:
  - **Vercel → Project Settings → Environment Variables** (per branch/env)
  - **CI (GitHub Actions) → Repository Secrets** for build-time tokens

---

## 2) Naming Conventions

- Uppercase + snake case: `PAYMENT_STRIPE_SECRET_KEY`
- Boolean: `TRUE` / `FALSE`
- Integers: decimal numbers (e.g., `30000`)
- URLs must include protocol (e.g., `https://…`)
- Per-env override via suffix (optional): `*_STAGING`, `*_PROD` if needed

---

## 3) Core App

| Var | Example | Required | Notes |
|---|---|---|---|
| `NODE_ENV` | `development` \| `production` | ✅ | Implicitly set by platform in prod |
| `APP_URL` | `http://localhost:3000` | ✅ | Used in links, redirects, emails |
| `APP_NAME` | `Go4u` | ✅ | Branding in emails/contracts |
| `APP_LOCALE_DEFAULT` | `en` | ✅ | Default language |
| `APP_TIMEZONE_DEFAULT` | `Europe/Helsinki` | ✅ | Server-side default |

---

## 4) Auth & Sessions (NextAuth)

| Var | Example | Required | Notes |
|---|---|---|---|
| `NEXTAUTH_URL` | `https://go4u.app` | ✅ | Base URL for callbacks |
| `NEXTAUTH_SECRET` | `random-long-secret` | ✅ | Encrypts NextAuth JWT/cookies |
| `JWT_ISSUER` | `go4u` | ✅ | Token issuer |
| `JWT_PRIVATE_KEY` | `-----BEGIN PRIVATE KEY-----…` | ⛔️ | Optional for asymmetric JWT |
| `OAUTH_GOOGLE_ID` | `…apps.googleusercontent.com` | ⛔️ | If using Google OAuth |
| `OAUTH_GOOGLE_SECRET` | `…` | ⛔️ |  |

---

## 5) Database & Cache

| Var | Example | Required | Notes |
|---|---|---|---|
| `DATABASE_URL` | `postgresql://user:pass@host:5432/go4u?sslmode=require` | ✅ | Prisma datasource |
| `SHADOW_DATABASE_URL` | `postgresql://user:pass@host:5432/go4u_shadow` | ⛔️ | For Prisma migrate |
| `REDIS_URL` | `redis://:pass@host:6379/0` | ⛔️ | Caching, queues, rate-limit |
| `PRISMA_LOG_LEVEL` | `warn` | ⛔️ | `query` in dev only |

---

## 6) Storage (S3-compatible)

| Var | Example | Required | Notes |
|---|---|---|---|
| `STORAGE_DRIVER` | `s3` | ✅ | Only s3 for now |
| `S3_ENDPOINT` | `https://s3.amazonaws.com` | ✅ | Or provider endpoint |
| `S3_REGION` | `eu-central-1` | ✅ | |
| `S3_BUCKET_PUBLIC` | `go4u-public` | ✅ | Images, static public (if any) |
| `S3_BUCKET_PRIVATE` | `go4u-private` | ✅ | Contracts, certificates |
| `S3_ACCESS_KEY_ID` | `AKIA…` | ✅ | |
| `S3_SECRET_ACCESS_KEY` | `…` | ✅ | |
| `S3_SIGNED_URL_TTL_SEC` | `600` | ✅ | 10 minutes |

---

## 7) Payments & Wallet

| Var | Example | Required | Notes |
|---|---|---|---|
| `PAYMENT_PROVIDER` | `stripe` \| `adyen` | ✅ | |
| `PAYMENT_CURRENCY_DEFAULT` | `EUR` | ✅ | |
| `STRIPE_SECRET_KEY` | `sk_live_…` | ⛔️ | If Stripe chosen |
| `STRIPE_PUBLISHABLE_KEY` | `pk_live_…` | ⛔️ | Frontend |
| `STRIPE_WEBHOOK_SECRET` | `whsec_…` | ⛔️ | Verify webhook |
| `ADYEN_API_KEY` | `AQEy…` | ⛔️ | If Adyen chosen |
| `ADYEN_MERCHANT_ACCOUNT` | `Go4u` | ⛔️ | |
| `ADYEN_WEBHOOK_HMAC` | `…` | ⛔️ | |
| `WALLET_ESCROW_AUTOCONFIRM_HOURS` | `72` | ✅ | Auto release window |

---

## 8) Notifications

| Var | Example | Required | Notes |
|---|---|---|---|
| `MAIL_PROVIDER` | `postmark` \| `resend` | ✅ | |
| `POSTMARK_SERVER_TOKEN` | `…` | ⛔️ | If postmark |
| `RESEND_API_KEY` | `…` | ⛔️ | If resend |
| `MAIL_FROM` | `no-reply@go4u.app` | ✅ | Sender |
| `MAIL_REPLY_TO` | `support@go4u.app` | ✅ | |
| `PUSH_FCM_SERVER_KEY` | `AAAA…` | ⛔️ | Future push |
| `NOTIFY_WEBAPP_URL` | `https://go4u.app` | ✅ | Links in templates |

---

## 9) KYC / Risk

| Var | Example | Required | Notes |
|---|---|---|---|
| `KYC_PROVIDER` | `sumsub` \| `persona` \| `veriff` | ⛔️ | |
| `KYC_API_KEY` | `…` | ⛔️ | |
| `RISK_THRESHOLD_PAYOUT` | `0.7` | ✅ | Block if score > threshold |
| `SANCTIONS_LIST_PROVIDER` | `ofac` \| `none` | ⛔️ | If used |

---

## 10) Analytics & Growth

| Var | Example | Required | Notes |
|---|---|---|---|
| `ANALYTICS_PROVIDER` | `posthog` | ✅ | |
| `POSTHOG_KEY` | `phc_…` | ⛔️ | |
| `POSTHOG_HOST` | `https://eu.posthog.com` | ⛔️ | |
| `REFERRAL_INVITEE_DISCOUNT_AMOUNT` | `500` | ✅ | Cents |
| `REFERRAL_INVITEE_DISCOUNT_MIN_BASKET` | `2000` | ✅ | Cents |
| `REFERRAL_REFERRER_CREDIT_AMOUNT` | `1000` | ✅ | Cents |
| `REFERRAL_HOLD_HOURS` | `72` | ✅ | |
| `REFERRAL_MONTHLY_CAP_PER_USER` | `20000` | ✅ | Cents |
| `REFERRAL_MAX_INVITES_PER_USER` | `20` | ✅ | |

---

## 11) Live / Media

| Var | Example | Required | Notes |
|---|---|---|---|
| `LIVE_PROVIDER` | `livekit` \| `agora` \| `twilio` | ⛔️ | Future |
| `LIVE_API_KEY` | `…` | ⛔️ | |
| `LIVE_API_SECRET` | `…` | ⛔️ | |
| `LIVE_RECORDING` | `FALSE` | ⛔️ | Enable server-side recording |
| `LIVE_TURN_STUN_URLS` | `stun:stun1.example.com:3478,…` | ⛔️ | |

---

## 12) Security & Web

| Var | Example | Required | Notes |
|---|---|---|---|
| `CORS_ALLOWED_ORIGINS` | `https://go4u.app,https://staging.go4u.app` | ✅ | Comma-separated |
| `CSP_REPORT_ONLY` | `FALSE` | ⛔️ | For rollout |
| `RATE_LIMIT_GLOBAL_PER_MIN` | `60` | ✅ | |
| `RATE_LIMIT_LOGIN_PER_MIN` | `5` | ✅ | |
| `HSTS_ENABLED` | `TRUE` | ✅ | Force HTTPS |
| `COOKIE_SECURE` | `TRUE` | ✅ | Prod only |

---

## 13) Feature Flags

| Var | Example | Required | Notes |
|---|---|---|---|
| `FF_REFERRAL_ENABLED` | `TRUE` | ✅ | |
| `FF_CONTRACTS_AI_ENABLED` | `TRUE` | ✅ | |
| `FF_LIVE_SESSIONS_ENABLED` | `FALSE` | ✅ | |
| `FF_PUSH_NOTIFICATIONS` | `FALSE` | ✅ | |

---

## 14) Logging & Observability

| Var | Example | Required | Notes |
|---|---|---|---|
| `LOG_LEVEL` | `info` | ✅ | `debug` in dev |
| `SENTRY_DSN` | `https://…` | ⛔️ | |
| `SENTRY_ENVIRONMENT` | `production` | ⛔️ | |
| `TRACE_SAMPLE_RATE` | `0.1` | ⛔️ | 10% tracing |

---

## 15) `.env.example` (Template)

```dotenv
# --- Core ---
NODE_ENV=development
APP_URL=http://localhost:3000
APP_NAME=Go4u
APP_LOCALE_DEFAULT=en
APP_TIMEZONE_DEFAULT=Europe/Helsinki

# --- Auth ---
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-me
JWT_ISSUER=go4u

# --- DB/Cache ---
DATABASE_URL=postgresql://go4u:secret@localhost:5432/go4u
REDIS_URL=redis://localhost:6379

# --- Storage (S3) ---
STORAGE_DRIVER=s3
S3_ENDPOINT=https://s3.amazonaws.com
S3_REGION=eu-central-1
S3_BUCKET_PUBLIC=go4u-public
S3_BUCKET_PRIVATE=go4u-private
S3_ACCESS_KEY_ID=replace
S3_SECRET_ACCESS_KEY=replace
S3_SIGNED_URL_TTL_SEC=600

# --- Payments ---
PAYMENT_PROVIDER=stripe
PAYMENT_CURRENCY_DEFAULT=EUR
STRIPE_SECRET_KEY=replace
STRIPE_PUBLISHABLE_KEY=replace
STRIPE_WEBHOOK_SECRET=replace
WALLET_ESCROW_AUTOCONFIRM_HOURS=72

# --- Notifications ---
MAIL_PROVIDER=postmark
POSTMARK_SERVER_TOKEN=replace
MAIL_FROM=no-reply@go4u.app
MAIL_REPLY_TO=support@go4u.app
NOTIFY_WEBAPP_URL=http://localhost:3000

# --- KYC/Risk ---
KYC_PROVIDER=sumsub
KYC_API_KEY=replace
RISK_THRESHOLD_PAYOUT=0.7

# --- Analytics & Referral ---
ANALYTICS_PROVIDER=posthog
POSTHOG_KEY=replace
POSTHOG_HOST=https://eu.posthog.com
REFERRAL_INVITEE_DISCOUNT_AMOUNT=500
REFERRAL_INVITEE_DISCOUNT_MIN_BASKET=2000
REFERRAL_REFERRER_CREDIT_AMOUNT=1000
REFERRAL_HOLD_HOURS=72
REFERRAL_MONTHLY_CAP_PER_USER=20000
REFERRAL_MAX_INVITES_PER_USER=20

# --- Live ---
LIVE_PROVIDER=
LIVE_API_KEY=
LIVE_API_SECRET=
LIVE_RECORDING=FALSE
LIVE_TURN_STUN_URLS=

# --- Security ---
CORS_ALLOWED_ORIGINS=http://localhost:3000
CSP_REPORT_ONLY=FALSE
RATE_LIMIT_GLOBAL_PER_MIN=60
RATE_LIMIT_LOGIN_PER_MIN=5
HSTS_ENABLED=FALSE
COOKIE_SECURE=FALSE

# --- Feature Flags ---
FF_REFERRAL_ENABLED=TRUE
FF_CONTRACTS_AI_ENABLED=TRUE
FF_LIVE_SESSIONS_ENABLED=FALSE
FF_PUSH_NOTIFICATIONS=FALSE

# --- Observability ---
LOG_LEVEL=debug
SENTRY_DSN=
SENTRY_ENVIRONMENT=local
TRACE_SAMPLE_RATE=0


16) Validation (Boot-time)

Use Zod/Yup to validate envs at server start. Example:

import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development","test","production"]),
  APP_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(24),
  DATABASE_URL: z.string().url(),
  PAYMENT_PROVIDER: z.enum(["stripe","adyen"]),
  MAIL_PROVIDER: z.enum(["postmark","resend"]),
  S3_SIGNED_URL_TTL_SEC: z.coerce.number().int().positive(),
  RATE_LIMIT_GLOBAL_PER_MIN: z.coerce.number().int().positive(),
  // … add the rest
});

export const ENV = EnvSchema.parse(process.env);


Fail-fast if invalid → safer deployments.

17) Rotation & Access

Rotate: quarterly or on incident.

Scope: different keys per env (dev/staging/production).

Access: least-privilege; no shared root accounts.

Audit: keep a change log for secrets (who/when).

Webhooks: verify with HMAC; rotate HMAC secrets periodically.

18) CI/CD Notes

GitHub Actions:

Read-only access to necessary secrets.

Never echo secrets in logs (::add-mask::).

Vercel:

Set envs for Development, Preview, Production separately.

Trigger redeploy after secret rotation.
