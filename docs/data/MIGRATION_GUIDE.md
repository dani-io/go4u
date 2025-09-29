# Go4u — Database Migration Guide (Prisma + Postgres)

## 1) Goals
- Safe, traceable, and reversible schema changes.
- One migration per PR that alters DB.
- Zero/low downtime for production.

---

## 2) Principles
- **Declarative first**: change Prisma schema → generate migration → review SQL.
- **Backward compatible** (when possible): deploy code that can read old+new.
- **Idempotent seed**: seeding never duplicates or corrupts state.
- **Feature flags**: flip behavior after successful migration.

---

## 3) Local Development
```bash
# modify schema.prisma
pnpm prisma format

# create a new migration with a descriptive name
pnpm prisma migrate dev --name add-wallet-holds

# check DB + migration history
pnpm prisma studio  # optional
pnpm prisma migrate status


Naming convention:
<yyyy-mm-dd>-<area>-<short-change> → e.g., 2025-09-25-wallet-add-holds

4) CI/CD Flow (Staging → Production)

PR includes:

schema.prisma changes

generated SQL files under prisma/migrations/*

migration description in PR body (why + risk + rollback)

CI:

prisma validate (schema validity)

prisma migrate diff (detect drift)

apply migrations to ephemeral DB (tests pass)

Staging:

Auto apply migrations on deploy (prisma migrate deploy)

Run smoke tests + e2e critical paths

Production:

Manual approval

Apply migrations with prisma migrate deploy

Post-deploy checks + observability

5) Backward-Compatible Patterns
Additive changes (SAFE)

Add new table/column (nullable) → deploy → backfill → later make NOT NULL.

Add index concurrently (if manual SQL): CREATE INDEX CONCURRENTLY ...

Destructive changes (CARE)

Drop/rename column:

Add new column.

Dual-write at application layer.

Backfill data.

Switch reads to new column.

Remove old column in a later release.

Enum changes

Add new enum value (safe).

Renames/removals require two-step rollout (map old→new, then clean).

6) Data Backfill Jobs

Implement idempotent backfill scripts:

Store progress marker (e.g., last processed id/time).

Retry with exponential backoff.

Log metrics (#processed, errors).

Run on staging first; measure duration and impact.

7) Long Migrations & Lock Minimization

Avoid long blocking operations on hot tables.

Strategies:

Create new table → backfill → swap.

Batch updates (e.g., 1k rows/tx).

Use CREATE INDEX CONCURRENTLY (manual SQL migration).

Off-peak deploy windows.

8) Rollback Strategy

Schema-only rollback: prisma migrate resolve --rolled-back <migration_id>

Prefer roll-forward with hotfix migration rather than destructive rollback.

For data mistakes: run compensating scripts (audited).

9) Seeding
pnpm prisma db seed


Seed only safe defaults (admin user, categories, feature flags).

Use UPSERT patterns to prevent duplicates.

10) Drift Detection

Scheduled job (CI nightly): prisma migrate diff --from-url $PROD_URL --to-schema-datamodel schema.prisma

Alerts if drift detected between code and live DB.

11) Observability & Post-Migration Checks

Check: new columns populated, constraints satisfied, error rate stable.

Track: migration duration, lock time, rows affected.

Dashboards: DB CPU/IO, slow queries, deadlocks.

12) Examples
12.1 Add holds table (escrow)

Migration: create wallet_holds.

App: on deal.confirmed → insert hold.

Backfill (if needed): create holds for active deals.

12.2 Rename column balAvail → balance_available_cents

Add new column; dual-write.

Backfill values.

Switch reads.

Remove old column in later migration.
