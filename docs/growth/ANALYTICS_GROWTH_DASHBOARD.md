# Go4u — Analytics & Growth Dashboard

## 1) Purpose
- Track key metrics to measure **growth, engagement, and monetization**.  
- Provide real-time visibility for founders, product, and growth teams.  
- Ensure data-driven decisions.

---

## 2) Tools
- **Product Analytics:** PostHog (self-hosted or EU cloud).  
- **Backend Events:** tracked via event bus (`task.created`, `wallet.escrow.hold`, etc.).  
- **BI Layer:** dashboards in Metabase/Grafana.  
- **Monitoring vs Analytics:** Sentry/Prometheus = health; PostHog/Metabase = product usage.

---

## 3) Core Metrics

### Acquisition
- New signups (daily/weekly/monthly).  
- Cost per acquisition (CPA).  
- Referral usage (# invites, # signups).  

### Activation
- % of users who create first task within 24h.  
- % of agents who accept a task within 7 days.  

### Retention
- DAU/WAU/MAU (Daily/Weekly/Monthly Active Users).  
- Cohort analysis (retention curve by signup month).  
- Repeat task creation % (requesters).  

### Revenue
- Gross Merchandise Volume (GMV): total value of tasks.  
- Take rate % (Go4u fee / GMV).  
- Escrow balance over time.  
- Payout volume (agents).  

### Referral
- Referral invites sent → accepted → qualified.  
- Credit earned vs redeemed.  
- Abuse rate (fake accounts flagged).  

### Task Funnel
- Task created → deal initiated → deal confirmed → done.  
- Drop-off % at each stage.  
- Median time deal_confirmed → task_done.  

---

## 4) Dashboards (by Audience)

### Founder / Exec
- GMV, take rate, DAU/MAU, referral performance.  
- Burn vs revenue forecast.  

### Product Team
- Funnel conversion (task lifecycle).  
- Feature adoption (AI polish, contract gen, volunteer mode).  
- Retention cohorts.  

### Ops / Trust & Safety
- Dispute rate (% of tasks).  
- Fraud flags (referrals, payments).  
- KYC pass/fail rate.  

### Engineering
- Event ingestion lag.  
- Error rates on analytics events.  
- % of missing/null fields.  

---

## 5) Events Schema (Simplified)

```json
{
  "event": "task.deal.confirmed",
  "user_id": "usr_123",
  "task_id": "tsk_456",
  "amount_cents": 2000,
  "currency": "EUR",
  "timestamp": "2025-09-25T10:00:00Z"
}

Key rules:

ISO timestamps.

Always include user_id.

Use cents for amounts.

Locale/currency attached when relevant.

6) KPIs & Targets (MVP → Growth)

Activation: 30% of signups create task in 24h.

Retention: 25% WAU/MAU.

Conversion: 50% of created tasks → deal confirmed.

GMV: €50k/month within 6 months post-launch.

Referral: 20% of signups via invites.

7) Data Governance

Respect GDPR/CCPA (see /security/PRIVACY.md).

Anonymize IP, hash emails.

Store raw PII only in transactional DB, not analytics DB.

Delete analytics events tied to deleted accounts.

8) Future Enhancements

Predictive analytics (task pricing, fraud risk).

Growth experiments A/B framework.

B2B dashboard (exhibition presence, corporate accounts).
