# Go4u — HTTP API Spec (v1)

**Base URL (prod):** `https://api.go4u.app/v1`  
**Auth:** Bearer JWT (via NextAuth) unless noted as `Public`.  
**Format:** JSON (UTF-8).  
**Pagination:** `?page=1&limit=20` (default limit 20, max 100)  
**Idempotency:** Header `Idempotency-Key` for write endpoints (POST/PATCH/PUT/DELETE).  
**Rate Limits:** 60 req/min per IP (unless otherwise noted).  
**Errors:**  
```json
{ "error": { "code": "string", "message": "human readable", "details": {...} } }

0) Health & Meta
GET /health (Public)

200: { "status":"ok", "version":"1.0.0", "time":"ISO" }

GET /meta (Public)

200: { "languages":["en","fa","ar","fr","de"], "currencies":["USD","EUR","CAD","IRR"] }

1) Auth & Users
POST /auth/login (Public)

Body: { "email":"", "password":"" }

200: { "token":"jwt", "user": { "id":"usr_", "role":"requester|agent|admin" } }

POST /auth/oauth/:provider/callback (Public)

200: same as login.

POST /auth/logout

204

GET /users/me

200: user profile summary

Example:

{ "id":"usr_123", "email":"x@x.com", "role":"requester", "locale":"en", "kyc": { "status":"approved", "level":"basic" } }

PATCH /users/me

Body (partial): { "display_name":"", "locale":"en", "country":"DE", "tz":"Europe/Berlin" }

200: updated profile.

POST /users/me/kyc

Body: { "provider":"sumsub", "token":"providerInitToken" }

202: { "status":"pending", "reference":"kyc_ref_abc" }

2) Tasks
POST /tasks

Purpose: create draft/open task.

Body:

{
  "title":"Buy flowers",
  "description":"... ",
  "category":"delivery",
  "location": { "lat":52.52, "lng":13.405, "country":"DE", "city":"Berlin" },
  "budget_cents": 2000,
  "currency": "EUR",
  "is_public": true,
  "multi_slot": 1
}


201: { "task_id":"tsk_1001", "status":"open" }

POST /tasks/polish

Purpose: AI polish title/description.

Body: { "title":"...", "description":"...", "tone":"friendly|formal" }

200: { "title":"refined...", "description":"refined..." }

GET /tasks

Query: status=open|active|done|cancelled, mine=true|false, country=DE, category=delivery, page, limit

200: { "items":[{...task}], "page":1, "total": 124 }

GET /tasks/:task_id

200: full task details (no chat content)

PATCH /tasks/:task_id

Only by requester (owner) and only if status in [draft,open].

Body: partial fields like POST.

200: updated task.

DELETE /tasks/:task_id

Only if status in [draft,open] and no confirmed deal.

204

3) Deals
POST /tasks/:task_id/deals/initiate

Body: { "agent_id":"usr_999" } or empty (from chat initiator)

201: { "deal_id":"dla_1", "status":"initiated" }

POST /tasks/:task_id/deals/:deal_id/confirm

Both sides must call confirm.

200: { "status":"confirmed", "escrow_required": true }

POST /tasks/:task_id/deals/:deal_id/reject

200: { "status":"rejected" }

GET /tasks/:task_id/deals

200: list of deals (respect privacy/multi_slot policy)

4) Chat
GET /tasks/:task_id/chat

Query: page, limit

200: { "items":[{ "id":"msg_1", "sender_id":"usr_123", "text":"...", "created_at":"ISO" }], "page":1 }

POST /tasks/:task_id/chat

Body: { "text":"...", "translate_to?":"en|fa|..." }

201: { "message_id":"msg_1" }

POST /tasks/:task_id/chat/deal

Shortcut: emits task.deal.initiated (internally creates deal if needed).

201: { "deal_id":"dla_1" }

5) Contracts & Certificates
POST /tasks/:task_id/contracts/generate

Preconditions: confirmed deal.

Body: { "language":"en" }

201:

{ "contract_id":"ctr_900", "language":"en", "pdf_url":"https://cdn/.../ctr_900.pdf", "hash":"sha256..." }

GET /contracts/:contract_id

200: metadata (and signed download URL if authorized)

POST /tasks/:task_id/certificates/issue

Volunteer tasks only.

Body: { "language":"en" }

201: { "certificate_id":"cer_700", "pdf_url":"..." }

6) Task Status (Done / Cancel)
POST /tasks/:task_id/done/request

By agent or requester.

200: { "status":"pending_confirmation" }

POST /tasks/:task_id/done/confirm

By requester or auto (system).

200: { "status":"done" }

POST /tasks/:task_id/cancel/request

Body: { "reason":"accidental|no_show|other" }

200: { "status":"cancel_pending" }

POST /tasks/:task_id/cancel/resolve (Admin or policy engine)

Body: { "policy":"full_refund|partial|no_refund" }

200: { "status":"cancelled" }

7) Wallet & Payments
GET /wallet

200:

{ "currency":"EUR", "balance": { "available_cents":12000, "on_hold_cents":2000, "total_cents":14000 } }

GET /wallet/ledger

Query: page, limit, type=credit|debit|hold|release|refund|fee|payout

200: { "items":[{ "type":"hold", "amount_cents":2000, "task_id":"tsk_1001" }], "page":1 }

POST /payment/checkout

Purpose: deposit to wallet before escrow.

Body: { "amount_cents":2000, "currency":"EUR", "task_id":"tsk_1001" }

201: { "provider":"stripe", "redirect_url":"https://checkout.stripe.com/..." }

POST /payment/webhook (Provider → API, Public but signed)

Stripe/Adyen webhook handler (verify signature).

200: { "ok":true }

POST /wallet/escrow/hold

System-internal (after confirmed deal) or explicit:

Body: { "task_id":"tsk_1001", "amount_cents":2000, "currency":"EUR" }

201: { "hold_id":"wht_123" }

POST /wallet/escrow/release

Preconditions: done.confirmed

Body: { "task_id":"tsk_1001" }

200: { "released": true }

POST /wallet/refund

Body: { "task_id":"tsk_1001", "policy":"full|partial", "amount_cents":2000 }

200: { "refunded": true }

POST /payouts/request

Agent requests withdrawal.

Body: { "amount_cents":15000, "currency":"EUR", "method":"stripe_connect" }

201: { "payout_id":"out_500", "status":"requested" }

GET /payouts/:payout_id

200: { "status":"processing|completed|failed", "provider_ref":"tr_12345" }

8) Referral
GET /referral/code

200: { "code":"DANI-1A2B", "link":"https://app.go4u.app/invite/DANI-1A2B" }

POST /referral/accept

Body: { "code":"DANI-1A2B" }

201: { "referral_id":"ref_100", "status":"pending" }

GET /referral/stats

200:

{ "invites": 12, "signups": 5, "qualified": 3, "earnings_cents": 3000 }

9) Notifications
GET /notifications

200: list (most recent first)

POST /notifications/test

For admin/dev: trigger a template to self.

Body: { "template":"payment_success", "channel":"email|in_app" }

202

10) Reviews (Phase 2+)
POST /tasks/:task_id/reviews

Body: { "for":"agent|requester", "rating":5, "comment":"..." }

201: { "review_id":"rvw_1" }

GET /users/:user_id/reviews

200: paginated list + aggregates (avg rating, count)

11) Discovery & Search (Phase 2+)
GET /search/tasks

Query: q, category, lat, lng, radius_km, min_budget, max_budget, page, limit

200: result set.

12) Admin

All admin endpoints require role admin + audit logging.

GET /admin/users

Query: q, role, status

200: list

PATCH /admin/users/:user_id

Body: { "status":"active|suspended" }

200

GET /admin/tasks

Query: status, dispute=open, country

200

POST /admin/disputes/:dispute_id/resolve

Body: { "resolution":"refund_requester|release_to_agent|split", "ratio_requester":0.5 }

200

GET /admin/analytics/summary

200:

{
  "dau": 1200,
  "gmv_cents": 2500000,
  "take_rate": 0.18,
  "conversion_signup_to_deal": 0.24
}

13) Webhooks (Outbound)

Go4u → your backend (for partners/integrations). Configurable per org in future B2B.

Events (subset):

task.deal.confirmed, task.done.confirmed, wallet.escrow.hold, wallet.escrow.released, referral.qualified

Headers: X-Go4u-Signature: sha256=... (HMAC)

Retries: exponential backoff up to 24h

Payload example:

{
  "event":"task.done.confirmed",
  "version":1,
  "sent_at":"ISO",
  "data":{ "task_id":"tsk_1001", "confirmed_at":"ISO" }
}

14) Security & Compliance

Auth: JWT; refresh strategy via NextAuth (httpOnly cookie).

RBAC: requester/agent/admin; endpoint guards at router level.

PII: Do not return raw KYC docs; masked where applicable.

Audit: All admin mutations generate audit logs.

Idempotency: server must return same 2xx + resource id on duplicate key.

Geo/FX: currency and locale inferred from profile but overridable in request where safe.

15) Versioning & Deprecation

Prefix paths with /v1.

Backward-compatible field additions allowed.

Breaking changes → new version /v2 with overlap window and deprecation headers.

16) Example Requests
Create Task
curl -X POST https://api.go4u.app/v1/tasks \
 -H "Authorization: Bearer <JWT>" \
 -H "Content-Type: application/json" \
 -H "Idempotency-Key: 01JH5..." \
 -d '{
  "title":"Buy flowers",
  "description":"Please buy tuberose and deliver.",
  "category":"delivery",
  "location":{"lat":52.52,"lng":13.405,"country":"DE","city":"Berlin"},
  "budget_cents":2000,
  "currency":"EUR",
  "is_public":true,
  "multi_slot":1
}'

Confirm Deal
curl -X POST https://api.go4u.app/v1/tasks/tsk_1001/deals/dla_1/confirm \
 -H "Authorization: Bearer <JWT>"

Wallet Checkout (Stripe)
curl -X POST https://api.go4u.app/v1/payment/checkout \
 -H "Authorization: Bearer <JWT>" \
 -H "Content-Type: application/json" \
 -d '{ "amount_cents":2000, "currency":"EUR", "task_id":"tsk_1001" }'
