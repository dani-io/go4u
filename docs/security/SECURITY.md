# Go4u — Security Policy

## 1) Objectives
- Protect **money, identity, and contracts** with defense-in-depth.
- Minimize blast radius; make breaches hard to execute and easy to detect.
- Align with **OWASP ASVS** and **CWE Top 25**.

---

## 2) Threat Model (high level)
- **Account Takeover (ATO):** credential stuffing, session theft.
- **Payment Fraud:** fake “Done”, refund abuse, stolen cards.
- **Data Exposure:** PII/KYC leakage, chat logs, contracts.
- **Injection/XSS/CSRF:** user-generated content in chat/tasks.
- **Supply Chain:** npm package compromise, CI secrets leakage.
- **Insider/Privilege Misuse:** over-privileged admin or DB access.

Mitigations below are mapped to these threats.

---

## 3) Authentication & Session
- **Primary:** NextAuth + JWT (short-lived) + httpOnly refresh cookie.
- **MFA (Phase 2+):** TOTP/WebAuthn supported for high-risk actions (payout, email change).
- **Password policy:** min 12 chars; breach check via k-anonymity (HIBP-style, server-side).
- **Brute-force protection:** rate-limit and incremental lockouts (per IP + per account).
- **Session binding:** user-agent + IP heuristics (loose), rotate on privilege change.
- **Logout:** server-side JWT revoke list for high-risk events (password/MFA reset).

---

## 4) Authorization (RBAC & ABAC)
- **Roles:** `requester`, `agent`, `admin`.
- **Resource ownership checks** on all task/chat/payment endpoints.
- **Admin** is least-privilege; sensitive actions always **audited**.
- **ABAC** (Phase 2+): geographic/currency rules, KYC level gates for payout.

---

## 5) Input Validation & Output Encoding
- **Validation:** Zod schemas on all API inputs; reject unknown fields (fail-closed).
- **Sanitization:** strip HTML in task/chat; allow a safe subset if needed (DOMPurify on client; server re-validate).
- **Output encoding:** React auto-escapes; never `dangerouslySetInnerHTML` except with sanitation.
- **File uploads:** MIME & extension allowlist; size limits; virus scanning (ClamAV/Lambda); store on S3 with pre-signed URLs.

---

## 6) Web App Protections
- **CSRF:** use **SameSite=Lax** cookies; for state-changing endpoints from browser, include CSRF token (double submit) when applicable.
- **CSP:** default-src 'self'; frame-ancestors 'none'; script-src 'self' 'nonce-<generated>'; img-src 'self' data: https:; connect-src 'self' https:;
- **Clickjacking:** `X-Frame-Options: DENY`.
- **Referrer-Policy:** `strict-origin-when-cross-origin`.
- **XSS:** strict CSP + sanitize user content; disable inline event handlers.
- **CORS:** deny by default; allow app domains only (prod/staging).
- **Headers:** HSTS (preload), X-Content-Type-Options: nosniff, X-Permitted-Cross-Domain-Policies: none.

---

## 7) Payments & Wallet
- **PCI scope minimized:** only tokenized payments via Stripe/Adyen; Go4u never stores PAN/CVV.
- **Escrow invariants:** ledger append-only; idempotency keys on all moves; dual-entry accounting.
- **High-risk actions:** payout/withdraw, refund, dispute resolution → require recent re-auth or MFA (Phase 2+).

---

## 8) Secrets & Configuration
- **No secrets in repo.** Use environment variables + provider secret manager.
- **Rotation:** on incident and quarterly.
- **Scoping:** separate keys per environment (dev/staging/prod), least-privilege IAM for S3/DB.
- **Build-time vs run-time:** avoid baking secrets into client bundles.

---

## 9) Data Protection & Privacy
- **Transport:** TLS 1.2+ everywhere (app↔DB, app↔S3, webhooks).
- **At rest:** managed disk encryption; sensitive exports re-encrypted (AES-256).
- **PII/KYC:** only minimal metadata in DB; raw KYC stays at provider; access is audited.
- **Data retention:** per `DATA_GOVERNANCE.md`; soft-delete + purge schedules.
- **Right to be forgotten:** anonymize user while preserving financial ledgers.

---

## 10) Logging, Audit & Monitoring
- **Structured logs:** no secrets/PII; include correlation/trace IDs.
- **Audit logs:** admin actions, payment mutations, dispute outcomes, KYC views.
- **Anomaly alerts:** login spikes, refund surge, dispute spikes → Slack/Telegram.
- **Error monitoring:** Sentry; **Metrics:** Prometheus/Grafana or provider analytics.
- **Log retention:** 90 days (operational), Audit 180–365 days.

---

## 11) Rate Limiting & Abuse Controls
- **Global limits:** per-IP and per-user (e.g., 60 req/min).
- **Endpoint-specific:** auth/login tighter (5/min), chat send (20/min).
- **Graph throttling:** prevent spam tasks/chats; captcha on anomalous patterns.
- **Risk engine hooks:** IP/device overlap, payment mismatch → flag & require manual review.

---

## 12) Supply Chain & CI/CD
- **Dependency policy:** pin exact versions; weekly vuln scan (npm audit, Snyk).
- **Build integrity:** lockfiles in repo; Reproducible builds on CI.
- **CI secrets:** stored in CI vault; masked; least-privilege deploy tokens.
- **Branch protection:** required PR review, status checks, no force-push to `main`.
- **Artifact signing (Phase 2+):** Sigstore/COSIGN consideration.

---

## 13) Infrastructure Security
- **Network:** least-open security groups; only HTTPS ingress; no public DB.
- **S3/Storage:** private buckets; pre-signed GET/PUT with short TTL.
- **Backups:** encrypted; access controlled; restore drills quarterly.
- **Webhooks:** HMAC signatures; replay protection (timestamp + nonce).

---

## 14) Incident Response (link)
- Playbooks in `/infra/INCIDENT_RESPONSE.md` and runbooks in `/infra/RUNBOOKS.md`.
- Steps: Detect → Contain → Eradicate → Recover → Post-mortem.
- Mandatory key rotation on relevant incidents.

---

## 15) Testing & Verification
- **Security test plan:** auth bypass, IDOR, CSRF, XSS, SSRF, RCE, SQLi (ORM guards), access control.
- **DAST/SAST:** GitHub Advanced Security (CodeQL), OWASP ZAP against staging.
- **Pentest:** external pentest before production launch and annually.

---

## 16) Governance & Reviews
- **Security review** required on all PRs touching auth, payments, file upload, or admin.
- **Threat modeling** (lightweight) for new modules (RFCs).
- **Quarterly** security posture review; update this doc accordingly.

---

## 17) Developer Checklist (PR Gate)
- [ ] Input validated (Zod) & unknown fields rejected  
- [ ] AuthN/AuthZ enforced (role + ownership)  
- [ ] Idempotency-Key for mutating endpoints  
- [ ] No secrets/PII in logs or errors  
- [ ] Proper headers (CSP, HSTS, …) unchanged or improved  
- [ ] SQL via Prisma only; no raw queries without review  
- [ ] File uploads validated; presigned URLs used  
- [ ] Tests include negative/abuse cases  

