# Go4u — Observability

## 1) Goals
- Provide **end-to-end visibility** across the platform: frontend, backend, DB, infra.  
- Enable quick detection of issues (latency, errors, fraud) and fast recovery.  
- Collect metrics for business (GMV, retention) and technical health.

---

## 2) Pillars
1. **Logging** (structured, centralized).  
2. **Metrics** (numerical, for trends & dashboards).  
3. **Tracing** (request-level, across services).  
4. **Alerting** (notify humans when thresholds exceeded).

---

## 3) Logging
- **Format:** JSON logs with fields: `timestamp`, `level`, `service`, `trace_id`, `message`, `context`.  
- **Levels:** `debug`, `info`, `warn`, `error`, `fatal`.  
- **Sensitive data:** never log PII (emails, KYC docs, card numbers). Use IDs or hashes only.  
- **Centralization:** all logs shipped to provider (e.g., Datadog, ELK, or OpenSearch).  
- **Retention:**  
  - App logs: 90 days.  
  - Audit logs: 180–365 days.  

Example:
```json
{ "level":"error", "service":"wallet", "event":"escrow.release.failed", "task_id":"tsk_1001", "error":"insufficient balance" }

4) Metrics

System metrics: CPU, memory, DB connections, Redis queue depth.

App metrics:

API latency (p95, p99)

Error rate (%) per route

Queue processing times

Wallet invariants (holds vs releases)

Business metrics: GMV, task funnel conversion, referral conversions.

Collected via Prometheus/OpenTelemetry exporters.

Dashboards in Grafana (or Datadog alternative).

5) Tracing

Tracing standard: OpenTelemetry.

Trace IDs propagated across services (frontend → API → DB query → external provider).

Sample rate: 10% in production (configurable with TRACE_SAMPLE_RATE).

UI: Jaeger or Datadog APM for distributed tracing.

6) Alerts

Channels: Slack/Telegram/Email.

Rules (examples):

API error rate > 5% for 5 minutes.

Latency (p95) > 2s for 5 minutes.

DB replication lag > 30s.

Dispute creation spikes (>50/hour).

Payment webhook failures > 10/min.

Escalation:

P1 (critical): page on-call immediately.

P2 (major): Slack + email, respond < 4h.

P3 (minor): daily digest.

7) Dashboards

Engineering: latency, error rate, infra health.

Product/Business: task funnel, GMV, active users, referral stats.

Ops/Admin: disputes, fraud flags, payout delays.

8) Data Sources

App logs: Next.js API routes, background workers.

DB metrics: Postgres (pg_stat_statements, slow queries).

Cache/Queue: Redis (ops metrics).

External providers: Stripe (payments), Sumsub/Persona (KYC), Postmark (emails).

9) SLOs & SLAs

Availability (SLO): 99.9% monthly uptime for API.

Latency (SLO): p95 < 500ms for API requests.

Error budget: track % of failed requests per month.

Escrow fund safety: 100% accuracy (no lost/mismatched transactions).

10) Incident Management Link

See /infra/INCIDENT_RESPONSE.md for escalation and response steps.

Post-incident reviews documented in /infra/RUNBOOKS.md.

11) Future Enhancements

Log correlation with AI anomaly detection.

Real-time fraud alerts integrated with risk engine.

Synthetic monitoring (simulate tasks + deals end-to-end).
