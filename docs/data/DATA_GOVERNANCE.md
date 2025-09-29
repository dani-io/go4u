
---

## `/data/DATA_GOVERNANCE.md`

```markdown
# Go4u — Data Governance & Privacy

## 1) Goals
- Protect user data (privacy, integrity, availability).
- Comply with GDPR/CCPA principles.
- Define ownership, retention, and access controls.

---

## 2) Data Classification
- **Public**: docs, marketing content.
- **Internal**: non-sensitive app configs, feature flags.
- **Confidential**: user profiles, tasks, wallet balances.
- **Sensitive**: KYC metadata, payment references, risk flags.

**Rule**: Sensitive data must be minimized, encrypted in transit, and access logged.

---

## 3) Ownership & Stewardship
- **Data Owner** (functional): Product/Operations lead per domain (Users, Tasks, Wallet).
- **Data Steward** (technical): Engineering lead responsible for schema and quality.
- **Security Officer**: reviews access rights and incidents.

---

## 4) Access Control
- **RBAC**:
  - User: sees own data.
  - Agent: sees assigned task data.
  - Admin: least-privilege; audit all admin views.
- **Principle of Least Privilege**: no blanket read to prod DB.
- **Break-glass** access for incidents (temporary, fully logged).

---

## 5) PII & KYC
- Store minimal **references** to KYC (status/level/provider).  
  Raw documents remain with provider (Sumsub/Persona).  
- Hash or tokenize emails when used in events/analytics.
- Pseudonymize logs (no raw PII in logs).

---

## 6) Data Retention
- **chat_messages**: until user deletion request (GDPR) or policy (e.g., 2 years).
- **kyc_verifications**: retain minimal metadata per legal requirements (country-dependent).
- **audit_logs & event_outbox**: 180–365 days.
- **notifications**: 90 days.
- **soft deletes**: schedule purge (e.g., after 90 days) with a cron worker.

---

## 7) Data Quality
- Constraints & checks (NOT NULL, FK, enum).
- Idempotent event processing (avoid duplicates).
- Periodic integrity checks (ledger sums, holds vs releases).
- Monitoring: failed jobs, retry queues, DLQ depth.

---

## 8) Encryption & Secrets
- **At rest**: rely on managed Postgres disk encryption; encrypt exported backups.
- **In transit**: TLS everywhere (app ↔ DB, app ↔ providers).
- **Secrets**: never in repo; use environment vars + secret manager.

---

## 9) Backups & Recovery
- Nightly backups + weekly snapshots.
- Test restore quarterly (disaster recovery drill).
- Document RPO/RTO targets (e.g., RPO ≤ 24h, RTO ≤ 4h).

---

## 10) Data Subject Rights (GDPR)
- **Export**: user can request a copy (JSON/CSV) of their data.
- **Delete**: remove or anonymize personal data while preserving financial ledgers.
- **Rectify**: allow updates to profile and preferences.
- **Consent**: explicit acceptance of Terms & Privacy at signup.

---

## 11) Analytics & Event Data
- Use first-party analytics (PostHog) with IP anonymization.
- Respect DNT (Do Not Track) and cookie consent where applicable.
- Store only necessary fields for KPIs (avoid PII).

---

## 12) Incident Response (Data)
- If data incident suspected:
  1) Contain (revoke access, rotate keys).
  2) Investigate (audit logs, scope).
  3) Notify stakeholders per legal timelines.
  4) Remediate and document (post-mortem in `/infra/INCIDENT_RESPONSE.md`).

---

## 13) Auditing & Reviews
- Quarterly review of access lists and permissions.
- Annual privacy impact assessment.
- Automated checks for schema drift and data policy violations.

---
