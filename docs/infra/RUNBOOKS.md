# Go4u — Runbooks

## 1) Purpose
Runbooks provide **step-by-step guides** for common operational tasks.  
They help engineers respond quickly and consistently, reducing risk of mistakes.

---

## 2) Principles
- Keep instructions **short, explicit, and copy-paste friendly**.  
- Include **checks** (before and after).  
- Document **rollback steps**.  
- Link to **Incident Response** when escalation is needed.  

---

## 3) Common Tasks

### 3.1 Restarting a Service (Local/Staging)
```bash
docker compose restart db redis
pnpm dev

Check:

pnpm prisma db push
curl http://localhost:3000/health

3.2 Apply Prisma Migrations (Staging)
pnpm prisma migrate deploy


Verify:

pnpm prisma migrate status


Rollback (if broken): restore staging DB snapshot.

3.3 Rollback a Vercel Deployment

Go to Vercel dashboard → Project → Deployments.

Select previous successful deployment → "Promote to Production".

Announce rollback in Slack/Telegram.

Create issue with RCA.

3.4 Restoring a Database Backup (Postgres)

Identify snapshot or dump file.

Provision new DB instance.

Import:

pg_restore --clean --no-owner -h <host> -U <user> -d go4u latest.dump


Point staging app to restored DB.

Verify with smoke tests (login, create task, wallet balance).

3.5 Clear Redis Cache/Queue
redis-cli -u $REDIS_URL FLUSHALL


⚠️ Only in staging. In production, prefer selective key deletion.

3.6 Rotating Secrets

Rotate at provider (Stripe, Postmark, KYC, etc).

Update in:

Vercel env vars (prod/staging).

GitHub Secrets (CI/CD).

Trigger redeploy.

Verify connectivity (payments, emails).

3.7 Feature Flag Toggle
UPDATE feature_flags SET enabled = false WHERE key = 'FF_LIVE_SESSIONS_ENABLED';


Confirm with:

SELECT * FROM feature_flags WHERE key = 'FF_LIVE_SESSIONS_ENABLED';

4) Health Checks
4.1 App Health
curl -s https://go4u.app/api/health


Expected:

{ "status":"ok", "version":"1.0.0" }

4.2 Database Health
psql $DATABASE_URL -c "select now();"


Expected: current timestamp, no errors.

4.3 Payment Provider Webhooks
curl -v -X POST https://api.go4u.app/v1/payment/webhook \
  -H "Stripe-Signature: test" \
  -d '{"test":"ping"}'


Expect 200 { "ok":true }.

5) Scheduled Jobs (cron workers)

Nightly backup: run pg_dump to cloud storage.

Purge soft-deleted users/tasks: daily job.

Expire notifications older than 90d.

Auto-confirm escrow after 72h.

6) Escalation

If runbook doesn’t solve the issue:

Escalate to Incident Commander (see /infra/INCIDENT_RESPONSE.md).

Document what you tried.

Never “wing it” in production without notes.

7) Future Additions

Runbook for multi-region failover.

Runbook for analytics reprocessing (event replay).

Runbook for fraud/risk flag review.
