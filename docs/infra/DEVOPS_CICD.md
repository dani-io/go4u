# Go4u — DevOps & CI/CD

## 1) Goals
- Ensure **safe, automated, and repeatable deployments**.
- Enforce code quality (lint, test, type-check) before merge.
- Standardize across local → staging → production.

---

## 2) Branching & Workflow
- **Main**: production-ready, protected branch.  
- **Staging**: integration testing, QA, investor demos.  
- **Feature/***: short-lived branches for new features.  
- **Hotfix/***: urgent fixes on production.  

### Rules
- No direct commits to `main` or `staging`.  
- All changes via Pull Request (PR).  
- At least 1 review approval required.  
- CI must pass before merge.  

---

## 3) CI Pipeline (GitHub Actions)

`.github/workflows/ci.yml`

### Steps
1. **Install & Cache**  
   - Install Node (22.x), pnpm.  
   - Cache node_modules/.pnpm-store.  

2. **Static Checks**  
   - ESLint (`pnpm lint`)  
   - TypeScript (`tsc --noEmit`)  

3. **Tests**  
   - Unit tests (`pnpm test`)  
   - Integration tests (with docker-compose Postgres+Redis).  
   - Coverage report uploaded.  

4. **Database**  
   - Prisma migrate validate  
   - Prisma migrate diff (ensure no drift).  

5. **Build**  
   - `pnpm build` (Next.js)  

6. **Security**  
   - `npm audit --production`  
   - `npx snyk test` (if integrated)  

---

## 4) CD Pipeline (Vercel + GitHub Actions)

### Staging
- Trigger: merge → `staging`.  
- Action: Deploy to `staging.go4u.app`.  
- DB: apply migrations automatically (`prisma migrate deploy`).  
- Tests: run smoke tests post-deploy (basic health, login, create task).  

### Production
- Trigger: merge → `main`.  
- Action: Deploy to `go4u.app`.  
- DB: migrations require manual approval.  
- Rollback: Vercel “Revert to previous deployment”.  

---

## 5) Secrets & Env in CI/CD
- Secrets stored in:
  - GitHub → Settings → Secrets → Actions.  
  - Vercel → Project → Environment Variables.  
- Mask secrets in CI logs (`::add-mask::`).  
- Rotate quarterly or on incident.  

---

## 6) Quality Gates
- Lint, TypeScript, Tests must pass.  
- Test coverage threshold: **≥ 80%** lines/branches.  
- Lighthouse audit (PWA, Accessibility) must score **≥ 90**.  
- Vulnerability scan must show 0 high/critical vulns.  

---

## 7) Monitoring CI/CD
- GitHub → Checks tab for each PR.  
- Vercel → Deploy logs.  
- Alerts (Slack/Telegram) on failed CI or failed deploy.  

---

## 8) Rollback Playbook
- **App:** Vercel revert (1-click).  
- **DB:** PITR if using managed Postgres.  
- **Feature flag:** disable via `feature_flags` table (instant rollback without deploy).  

---

## 9) Future Enhancements
- Add preview DB per PR (ephemeral DB for full e2e).  
- Blue/Green or Canary deploy strategy.  
- Terraform/IaC for infra reproducibility.  
- Automated chaos testing (resilience).  

---

## 10) Checklist (per PR)
- [ ] All tests pass.  
- [ ] Coverage ≥ 80%.  
- [ ] Lint + TypeScript clean.  
- [ ] Security scan passes.  
- [ ] DB migration included & reviewed.  
- [ ] Feature flags used if rollout risky.  
- [ ] Docs updated if relevant.  

---
