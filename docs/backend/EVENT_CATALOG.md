# Go4u — Event Catalog

This catalog defines domain events emitted across Go4u services.  
Goals: loose coupling, auditability, reliability (idempotent, replay-safe).

---

## 0) Conventions

- **Name**: `area.action.state` (e.g., `task.deal.confirmed`)
- **Versioning**: `event_version` (semantic, default `1`)
- **IDs**:
  - `event_id` = ULID/UUID (unique)
  - `aggregate_id` = business id (e.g., `task_id`, `user_id`)
- **Timestamps**: ISO8601 UTC (`created_at`, `occurred_at`)
- **Delivery**: at-least-once (consumer idempotency required)
- **Ordering**: best-effort per aggregate (use `sequence` where needed)
- **Security/PII**: payloads exclude raw PII (store references, not secrets)
- **Transport**: Pub/Sub via Redis (MVP), Kafka (future)
- **Outbox Pattern**: DB outbox + background dispatcher
- **Retry**: exponential backoff, DLQ on repeated failure

Common envelope:
```json
{
  "event_id": "01JGQW...ULID",
  "event_name": "task.deal.confirmed",
  "event_version": 1,
  "occurred_at": "2025-09-25T10:20:30Z",
  "producer": "task-service",
  "payload": { "...": "domain fields" },
  "metadata": {
    "trace_id": "a3f2...",
    "sequence": 42,
    "ip": "redacted",
    "locale": "en",
    "actor_user_id": "usr_123"
  }
}

1) User & Identity
1.1 user.registered

Producer: auth-service

Consumers: wallet-service (create wallet), notifications, analytics

Payload:

{
  "user_id": "usr_123",
  "email_hash": "sha256:...", 
  "role": "requester|agent|admin",
  "referral_code_used": "DANI-1A2B|null",
  "created_at": "2025-09-25T10:00:00Z"
}

1.2 user.kyc.submitted

Producer: kyc-service

Consumers: risk-engine, admin, notifications

{
  "user_id": "usr_123",
  "provider": "sumsub|persona|internal",
  "reference": "kyc_ref_abc",
  "submitted_at": "2025-09-25T10:05:00Z"
}

1.3 user.kyc.verified

Producer: kyc-service

Consumers: task-service (unlock categories), payout-service

{
  "user_id": "usr_123",
  "level": "basic|enhanced",
  "verified_at": "2025-09-25T10:06:00Z",
  "risk_score": 0.12
}

1.4 user.login

Producer: auth-service

Consumers: analytics

{
  "user_id": "usr_123",
  "method": "password|oauth",
  "at": "2025-09-25T10:10:00Z",
  "device_fingerprint": "dev_...",
  "ip_country": "DE"
}

2) Task Lifecycle
2.1 task.created

Producer: task-service

Consumers: discovery, notifications, analytics

{
  "task_id": "tsk_1001",
  "requester_id": "usr_123",
  "title": "Buy flowers",
  "category": "delivery",
  "location": { "lat": 52.52, "lng": 13.405, "country": "DE" },
  "budget_cents": 2000,
  "currency": "EUR",
  "is_volunteer": false,
  "created_at": "2025-09-25T10:12:00Z"
}

2.2 task.updated

Producer: task-service

Consumers: discovery, notifications

{
  "task_id": "tsk_1001",
  "changed_fields": ["title","budget_cents"],
  "updated_at": "2025-09-25T10:20:00Z"
}

2.3 task.deleted

Producer: task-service

Consumers: search index, analytics

{
  "task_id": "tsk_1001",
  "deleted_by": "usr_123",
  "deleted_at": "2025-09-25T10:25:00Z",
  "reason": "user_request|duplicate|moderation"
}

2.4 task.deal.initiated

Producer: task-service (from chat “Deal” button)

Consumers: contract-service, payment-service (pre-check)

{
  "task_id": "tsk_1001",
  "requester_id": "usr_123",
  "agent_id": "usr_999",
  "initiated_by": "usr_123|usr_999",
  "at": "2025-09-25T10:30:00Z"
}

2.5 task.deal.confirmed

Producer: task-service

Consumers: payment-service (escrow hold), contract-service (generate), notifications

{
  "task_id": "tsk_1001",
  "requester_id": "usr_123",
  "agent_id": "usr_999",
  "confirmed_at": "2025-09-25T10:31:00Z"
}

2.6 task.started

Producer: task-service / agent action

Consumers: notifications, analytics

{
  "task_id": "tsk_1001",
  "agent_id": "usr_999",
  "at": "2025-09-25T11:00:00Z"
}

2.7 task.done.requested

Producer: task-service

Consumers: notifications, payment-service (start release timer)

{
  "task_id": "tsk_1001",
  "by": "agent|requester",
  "at": "2025-09-25T12:00:00Z"
}

2.8 task.done.confirmed

Producer: task-service (requester confirms or auto-confirm)

Consumers: payment-service (release escrow), review-service

{
  "task_id": "tsk_1001",
  "confirmed_by": "requester|system",
  "confirmed_at": "2025-09-26T12:00:00Z"
}

2.9 task.cancel.requested

Producer: task-service

Consumers: payment-service (hold refund), admin-service

{
  "task_id": "tsk_1001",
  "requested_by": "requester|agent",
  "reason": "accidental|no_show|other",
  "at": "2025-09-25T10:40:00Z"
}

2.10 task.cancelled

Producer: task-service (after policy check/admin)

Consumers: payment-service (refund), notifications

{
  "task_id": "tsk_1001",
  "cancelled_by": "requester|agent|admin",
  "policy": "full_refund|partial|no_refund",
  "at": "2025-09-25T10:45:00Z"
}

3) Chat & Live
3.1 chat.message.sent

Producer: chat-service

Consumers: moderation, notifications (badge)

{
  "chat_id": "cht_555",
  "message_id": "msg_777",
  "sender_id": "usr_123",
  "task_id": "tsk_1001",
  "text_len": 142,
  "has_media": false,
  "at": "2025-09-25T10:15:00Z"
}

3.2 chat.deal.clicked

Producer: chat-service

Consumers: task-service (emit task.deal.initiated)

{
  "chat_id": "cht_555",
  "by": "usr_123",
  "task_id": "tsk_1001",
  "at": "2025-09-25T10:29:59Z"
}

3.3 live.session.started

Producer: live-service

Consumers: analytics, storage (if recording)

{
  "session_id": "liv_001",
  "task_id": "tsk_1001",
  "mode": "one_way|two_way",
  "started_at": "2025-09-25T11:05:00Z"
}

3.4 live.session.ended
{
  "session_id": "liv_001",
  "task_id": "tsk_1001",
  "duration_sec": 900,
  "ended_at": "2025-09-25T11:20:00Z"
}

4) Contracts & Certificates
4.1 contract.generated

Producer: contract-service

Consumers: storage, notifications

{
  "contract_id": "ctr_900",
  "task_id": "tsk_1001",
  "language": "en",
  "download_url": "s3://.../ctr_900.pdf",
  "generated_at": "2025-09-25T10:32:00Z"
}

4.2 certificate.issued

Producer: contract-service

Consumers: notifications, profile-service

{
  "certificate_id": "cer_700",
  "task_id": "tsk_2002",
  "volunteer": true,
  "language": "en",
  "download_url": "s3://.../cer_700.pdf",
  "issued_at": "2025-09-25T13:00:00Z"
}

5) Wallet & Payments
5.1 payment.checkout.succeeded

Producer: payment-service (webhook)

Consumers: wallet-service (credit), analytics

{
  "payment_id": "pay_abc",
  "user_id": "usr_123",
  "amount_cents": 2000,
  "currency": "EUR",
  "provider": "stripe",
  "at": "2025-09-25T10:31:10Z"
}

5.2 wallet.escrow.hold

Producer: wallet-service

Consumers: notifications, analytics

{
  "task_id": "tsk_1001",
  "requester_id": "usr_123",
  "amount_cents": 2000,
  "currency": "EUR",
  "held_at": "2025-09-25T10:31:20Z"
}

5.3 wallet.escrow.released

Producer: wallet-service

Consumers: notifications, analytics

{
  "task_id": "tsk_1001",
  "agent_id": "usr_999",
  "amount_cents": 2000,
  "currency": "EUR",
  "released_at": "2025-09-26T12:00:05Z"
}

5.4 wallet.refund.processed

Producer: wallet-service

Consumers: notifications, analytics

{
  "task_id": "tsk_1001",
  "user_id": "usr_123",
  "amount_cents": 2000,
  "currency": "EUR",
  "policy": "full|partial",
  "refunded_at": "2025-09-25T10:50:00Z"
}

5.5 payout.requested

Producer: payout-service

Consumers: risk-engine, analytics

{
  "payout_id": "out_500",
  "agent_id": "usr_999",
  "amount_cents": 15000,
  "currency": "EUR",
  "method": "stripe_connect|payoneer|paypal",
  "requested_at": "2025-09-27T09:00:00Z"
}

5.6 payout.completed

Producer: payout-service

Consumers: notifications, analytics

{
  "payout_id": "out_500",
  "agent_id": "usr_999",
  "amount_cents": 15000,
  "currency": "EUR",
  "completed_at": "2025-09-27T12:00:00Z",
  "provider_ref": "tr_12345"
}

6) Referral & Growth
6.1 referral.accepted

Producer: referral-service

Consumers: analytics, notifications

{
  "referral_id": "ref_100",
  "referrer_id": "usr_321",
  "invitee_id": "usr_888",
  "accepted_at": "2025-09-25T09:00:00Z"
}

6.2 referral.qualified

Producer: referral-service

Consumers: wallet-service (credit), analytics

{
  "referral_id": "ref_100",
  "referrer_id": "usr_321",
  "invitee_id": "usr_888",
  "first_deal_task_id": "tsk_2000",
  "qualified_at": "2025-09-28T14:00:00Z"
}

6.3 referral.reward.activated

Producer: referral-service

Consumers: notifications, analytics

{
  "reward_id": "rwd_300",
  "user_id": "usr_321",
  "type": "wallet_credit|discount_coupon",
  "amount_cents": 1000,
  "currency": "EUR",
  "activated_at": "2025-09-28T16:00:00Z"
}

7) Risk & Disputes
7.1 risk.flag.raised

Producer: risk-engine

Consumers: admin, notifications

{
  "flag_id": "rsk_777",
  "entity": "user|task|payment|payout|referral",
  "entity_id": "tsk_1001",
  "score": 0.86,
  "reason": "ip_overlap|device_reuse|payment_mismatch",
  "raised_at": "2025-09-25T10:52:00Z"
}

7.2 dispute.opened

Producer: admin-service

Consumers: wallet-service (freeze), notifications

{
  "dispute_id": "dsp_100",
  "task_id": "tsk_1001",
  "opened_by": "requester|agent|system",
  "at": "2025-09-25T11:10:00Z"
}

7.3 dispute.resolved

Producer: admin-service

Consumers: wallet-service (apply resolution), notifications, analytics

{
  "dispute_id": "dsp_100",
  "task_id": "tsk_1001",
  "resolution": "refund_requester|release_to_agent|split",
  "ratio_requester": 0.5,
  "ratio_agent": 0.5,
  "resolved_at": "2025-09-25T15:00:00Z"
}

8) Notifications & System
8.1 notification.sent

Producer: notification-service

Consumers: analytics

{
  "notification_id": "ntf_123",
  "user_id": "usr_123",
  "channel": "email|in_app|push|sms",
  "template": "payment_success|escrow_hold|task_done",
  "sent_at": "2025-09-25T10:32:10Z"
}

8.2 system.health.ping

Producer: ops

Consumers: observability

{
  "service": "task-service",
  "status": "ok|degraded|down",
  "at": "2025-09-25T10:00:00Z"
}

9) Idempotency & Replay

All consumers must implement idempotency using (event_id) and (aggregate_id, sequence) guards.

Store event_id in a processed table with TTL; skip duplicates.

Side-effects (wallet moves, email sends) must check idempotency keys.

10) Privacy & PII

Do not include raw PII (emails, documents). Use hashed references or IDs.

Access to raw PII happens within dedicated services (auth/kyc) only.

Audit log all access to sensitive data.

11) Versioning

Backwards-compatible fields can be added freely.

Breaking changes bump event_version and require dual-consumer support during migration.
