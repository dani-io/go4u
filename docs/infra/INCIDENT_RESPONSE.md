# Go4u — Incident Response Plan

## 1) Purpose
Provide a structured process for identifying, responding to, and learning from incidents.  
Covers **outages, security breaches, fraud spikes, and data integrity issues**.

---

## 2) Severity Levels

- **P1 (Critical):**
  - Production outage (API unreachable, payments blocked).  
  - Data breach or suspected PII/KYC leak.  
  - Escrow/wallet mismatch.  
  → Immediate all-hands response, on-call escalation.

- **P2 (Major):**
  - Service degradation (latency p95 > 5s).  
  - High error rates (>5%).  
  - Significant spike in disputes/fraud.  
  → On-call within 30 mins, resolve within hours.

- **P3 (Minor):**
  - Partial feature outage (notifications, analytics delay).  
  - Non-critical bugs with limited impact.  
  → Logged, triaged, fix scheduled.

---

## 3) Roles

- **Incident Commander (IC):** leads response, coordinates comms.  
- **Ops Engineer:** executes mitigations (DB failover, rollback).  
- **Security Officer:** investigates breach, manages disclosures.  
- **Comms Lead:** updates internal/external stakeholders.  
- **Scribe:** logs timeline for post-mortem.

---

## 4) Response Process

### Step 1 — Detect
- Alerts from Observability (error rate, downtime, anomalies).  
- Reports from users/support.  
- Automated fraud/risk triggers.

### Step 2 — Acknowledge
- On-call acknowledges alert within SLA (P1: 5 min, P2: 30 min).  
- Assign IC + roles.

### Step 3 — Contain
- Mitigate damage (disable feature flag, freeze payouts, block abusive IPs).  
- Communicate status (Slack/Telegram, status page).

### Step 4 — Eradicate & Fix
- Identify root cause.  
- Apply hotfix or rollback.  
- Validate system integrity (ledger balance, DB consistency).

### Step 5 — Recover
- Gradually re-enable features.  
- Monitor stability for 24h.  
- Inform stakeholders of resolution.

### Step 6 — Post-Mortem
- Timeline of events.  
- Root cause analysis.  
- Action items (with owners, deadlines).  
- Lessons learned (prevent recurrence).  
- Document in `/infra/RUNBOOKS.md` if routine fix is needed.

---

## 5) Communication

- **Internal:** Slack `#incidents`, Telegram on-call channel.  
- **External:**  
  - Status page: `status.go4u.app`.  
  - Email/SMS updates for P1 outages.  
  - Public disclosure for breaches (as required by GDPR/CCPA).  

---

## 6) Tooling

- Alerting: Sentry, Prometheus, Vercel Analytics.  
- Incident tracking: GitHub Issues (`label:incident`).  
- Timeline logging: shared doc per incident.  
- Escalation: PagerDuty/Telegram Bot.  

---

## 7) Compliance

- GDPR: notify DPA within 72h of personal data breach.  
- CCPA: notify impacted California users within 30 days.  
- AML/KYC issues: notify payment/KYC providers immediately.  

---

## 8) Training & Drills

- Quarterly incident simulation (tabletop + live drill).  
- Rotate IC role across engineers.  
- Test escalation (pager, Telegram, email).  

---

## 9) Post-Incident Checklist
- [ ] Incident documented with unique ID.  
- [ ] Root cause identified.  
- [ ] Fix deployed and validated.  
- [ ] Users notified if required.  
- [ ] Post-mortem completed and shared.  
- [ ] Preventive actions tracked in backlog.  

---

