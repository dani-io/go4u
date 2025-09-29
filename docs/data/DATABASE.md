# Go4u — Database Design (PostgreSQL + Prisma)

## 1) Design Principles
- **Postgres** primary; **Prisma ORM** with strict types.
- **IDs:** ULID/UUID (text) for all aggregates (e.g., `usr_`, `tsk_` prefixes optional at app layer).
- **Timestamps:** `created_at`, `updated_at` (UTC, `timestamptz`), optional `deleted_at` (soft delete).
- **Money:** store as **integer cents** + `currency` (ISO-4217). Never float.
- **PII:** isolate in dedicated tables; avoid storing raw PII in events/logs.
- **Multi-language:** content is user-entered; UI strings live in i18n, not DB.
- **Auditable:** append-only ledgers (wallet), event outbox, audit log.
- **Privacy & Retention:** documented retention windows per table.

---

## 2) High-level ERD (conceptual)


Users(usr)──1─┬─1──Profiles(prf)
│
├───Tasks(tsk)──1─┬─1──Deals(dla)
│ ├───ChatMessages(msg)
│ ├─1──Contracts(ctr)
│ └─0..1 Certificates(cer)
│
├─1──WalletAccounts(wac)────WalletLedger(wle)
│ └─ Holds(wht)
│
├───Referrals(ref)────ReferralRewards(rwr)
│
├───Notifications(ntf)
│
├───Disputes(dsp)────DisputeEvents(dse)
│
├───RiskFlags(rsk)
│
├───Payments(pay)────Payouts(pot)
│
└─*──AuditLogs(aud)

System: EventOutbox(eox), EventInbox(eix)


---

## 3) Entities & Tables (columns abbreviated)

> Types: `id text`, `int` (cents), `jsonb`, `timestamptz`.

### 3.1 Users & Profile
**users**
- `id`, `email` (unique, lowercased), `email_verified_at`
- `role` (`requester|agent|admin`)
- `status` (`active|suspended|deleted`)
- `created_at`, `updated_at`, `deleted_at`

**profiles**
- `user_id (pk/fk users.id)`
- `display_name`, `locale` (e.g., `en|fa|ar|fr|de`)
- `country`, `tz`, `avatar_url`
- KYC fields kept separate:

**kyc_verifications**
- `id`, `user_id`, `provider`, `reference`, `level` (`basic|enhanced`)
- `status` (`pending|approved|rejected`), `risk_score` (numeric)
- `submitted_at`, `verified_at`, `created_at`, `updated_at`

### 3.2 Tasks, Deals, Chat
**tasks**
- `id`, `requester_id`, `title`, `description`
- `category` (enum: `delivery|exhibition|volunteer|other`)
- `location` (`jsonb` with lat,lng,country,city)
- `budget_cents`, `currency`
- `is_public` (bool), `multi_slot` (int default 1)
- `status` (`draft|open|dealing|active|done|cancelled`)
- `created_at`, `updated_at`, `deleted_at`

**deals**
- `id`, `task_id`, `agent_id`, `requester_confirmed_at`, `agent_confirmed_at`
- `status` (`initiated|confirmed|rejected|expired`)
- `created_at`, `updated_at`
> A task can have multiple **initiated** deals but only **one confirmed** deal (unless `multi_slot>1`).

**chat_messages**
- `id`, `task_id`, `sender_id`, `text`, `media (jsonb|null)`
- `language_detected`, `translated (jsonb)` (optional cache)
- `created_at`, `edited_at`, `deleted_at`
> Index by `(task_id, created_at)`.

### 3.3 Contracts & Certificates
**contracts**
- `id`, `task_id`, `deal_id`, `language` (`en` base)
- `raw_context (jsonb)` (snapshot of task + chat excerpts)
- `pdf_url`, `hash` (sha256 of content)
- `created_at`

**certificates**
- `id`, `task_id`, `volunteer` (bool), `language`, `pdf_url`, `issued_at`

### 3.4 Wallet, Payments, Payouts
**wallet_accounts**
- `id`, `user_id` (unique), `currency` (default profile currency)
- `balance_available_cents`, `balance_on_hold_cents`
- `created_at`, `updated_at`

**wallet_ledger**
- `id`, `wallet_id`, `type` (`credit|debit|hold|release|refund|fee|payout`)
- `amount_cents`, `currency`
- `task_id|null`, `payment_id|null`, `payout_id|null`, `referral_id|null`
- `ref` (idempotency key), `metadata jsonb`
- `created_at`
> Append-only. Invariants checked via database constraints where possible.

**wallet_holds**
- `id`, `wallet_id`, `task_id`, `amount_cents`, `currency`
- `status` (`active|released|refunded|frozen`)
- `created_at`, `released_at`, `refunded_at`
> Referential integrity with `wallet_ledger` entries.

**payments**
- `id`, `user_id`, `provider` (`stripe|adyen|local`)
- `provider_ref`, `amount_cents`, `currency`, `status` (`succeeded|failed|refunded`)
- `created_at`, `updated_at`

**payouts**
- `id`, `agent_id`, `amount_cents`, `currency`, `method` (`stripe_connect|payoneer|paypal`)
- `provider_ref`, `status` (`requested|processing|completed|failed`)
- `requested_at`, `completed_at`

### 3.5 Referrals
**referral_codes**
- `id`, `user_id`, `code (unique)`, `created_at`

**referrals**
- `id`, `ref_code_id`, `referrer_id`, `invitee_id|null`
- `status` (`pending|qualified|rejected`), `reason|null`
- `first_deal_task_id|null`, `created_at`, `qualified_at`

**referral_rewards**
- `id`, `referral_id`, `user_id` (referrer or invitee)
- `type` (`wallet_credit|discount_coupon`)
- `amount_cents|null`, `currency|null`, `coupon_code|null`
- `status` (`locked|active|void`), `expires_at|null`, `activated_at|null`, `created_at`

### 3.6 Notifications
**notifications**
- `id`, `user_id`, `channel` (`in_app|email|push|sms`)
- `template` (e.g., `payment_success|escrow_hold|task_done`)
- `payload jsonb`, `status` (`queued|sent|failed`)
- `sent_at`, `created_at`

### 3.7 Disputes & Risk
**disputes**
- `id`, `task_id`, `opened_by` (`requester|agent|system`)
- `status` (`open|resolved|dismissed`)
- `resolution` (`refund_requester|release_to_agent|split|null`)
- `ratio_requester numeric`, `ratio_agent numeric`
- `created_at`, `resolved_at|null`

**dispute_events**
- `id`, `dispute_id`, `actor_id|null`, `action`, `notes`, `created_at`

**risk_flags**
- `id`, `entity` (`user|task|payment|payout|referral`), `entity_id`
- `score numeric`, `reason` (`ip_overlap|device_reuse|payment_mismatch|other`)
- `status` (`open|reviewed|cleared`)
- `created_at`, `reviewed_at|null`

### 3.8 Audit & Events
**audit_logs**
- `id`, `actor_id|null`, `action`, `entity`, `entity_id`, `metadata jsonb`, `created_at`

**event_outbox**
- `id`, `event_name`, `event_version`, `aggregate_id`, `payload jsonb`, `metadata jsonb`
- `status` (`pending|dispatched|failed`), `created_at`, `dispatched_at|null`, `retry_count int`
> Background worker dispatches to Pub/Sub; idempotent consumers required.

**event_inbox** (for exactly-once-ish consumers)
- `id`, `event_id`, `consumer`, `processed_at`
> Prevents duplicate side-effects.

---

## 4) Indexing & Constraints (examples)
- `users(email)` unique, `lower(email)` for case-insensitive lookups.
- `tasks(requester_id)`, `tasks(status)`, `tasks((location->>'country'))`
- `chat_messages(task_id, created_at DESC)`
- `wallet_ledger(wallet_id, created_at)`, `wallet_holds(task_id)`
- `payments(provider_ref)` unique, `payouts(provider_ref)` unique
- `referrals(referrer_id)`, `referral_codes(code)` unique
- **Check constraints:**
  - `wallet_ledger.amount_cents > 0`
  - currency consistency between linked records
  - `ratio_requester + ratio_agent = 1` (disputes) via trigger or check

---

## 5) Invariants & Flows

### 5.1 Escrow Flow
1) Deal confirmed → create `wallet_holds` + `wallet_ledger(type=hold)`  
2) Done confirmed or auto-confirm → `release` entry, move to agent wallet  
3) Cancel policy → `refund` entry to requester wallet

> Balances updated via **derived sums** from ledger (or materialized balance with transactional updates).

### 5.2 Referral Flow
- Invite accepted → `referrals.status=pending`  
- First deal confirmed (+hold released) → `qualified` → create reward(s)  
- Reward wallet credit → `wallet_ledger(type=credit, source=referral)`

### 5.3 Dispute Flow
- On open → freeze hold (no release)  
- On resolve → ledger split per ratios → close dispute

---

## 6) Prisma Model Snippets (illustrative)

```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  role          String
  status        String   @default("active")
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  deletedAt     DateTime?
  profile       Profile?
  walletAccount WalletAccount?
}

model WalletAccount {
  id          String   @id @default(cuid())
  userId      String   @unique
  currency    String
  balAvail    Int      @default(0)
  balOnHold   Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  user        User     @relation(fields: [userId], references: [id])
  ledger      WalletLedger[]
}

model WalletLedger {
  id          String   @id @default(cuid())
  walletId    String
  type        String   // credit|debit|hold|release|refund|fee|payout
  amountCents Int
  currency    String
  taskId      String?
  paymentId   String?
  payoutId    String?
  referralId  String?
  ref         String?  @unique
  metadata    Json?
  createdAt   DateTime @default(now())
  wallet      WalletAccount @relation(fields: [walletId], references: [id])
  @@index([walletId, createdAt])
}


بقیه مدل‌ها مشابه همین الگو تعریف می‌شوند (پرهیز از تکرار).

7) Migrations & Seeding

Migrations via prisma migrate (one per PR affecting DB).

Seed minimal: admin user, currencies, a few categories.

Use feature flags (DB table feature_flags) for gradual rollouts.

8) Data Retention & Privacy

chat_messages: retain indefinitely unless user deletion request (GDPR).

kyc_verifications: keep minimal references; raw documents remain at provider.

audit_logs/event_outbox: 180–365 days (configurable).

notifications: 90 days (compact).

soft delete users/tasks, then scheduled purge after grace window.

9) Backup & Recovery

Nightly logical backups (pg_dump) + weekly full snapshot.

PITR (point-in-time recovery) if using managed Postgres.

Quarterly restore drills.

10) Risks & Open Questions

Precision of currency conversion (handled at payment provider vs internal FX?).

Multi-slot tasks: enforce at DB-level max confirmed deals per task.

Large chat history excerpts in contracts: store references + hashed snapshot, avoid oversized rows.

Eventual consistency between ledger & holds: verify with transactional tests.
