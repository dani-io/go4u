# Contributing to Go4u

Welcome! This guide explains how we branch, code, push, and open Pull Requests for **go4u**.

---

## TL;DR

1) Create a branch from **staging**  
2) Commit small, clear changes (Conventional Commits)  
3) Push your branch  
4) Open a PR → **staging** (auto preview on Vercel)  
5) When staging is stable → maintainers merge to **main** (Production)

---

## Repo Access: Collaborator vs Fork

### If you have **write** access (collaborator):
```bash
git clone https://github.com/dani-io/go4u.git
cd go4u
git checkout -b feature/chat-translation
# ...do your changes...
git add .
git commit -m "feat(chat): add AI translation bubble in messages"
git push origin feature/chat-translation


If you don’t have write access (use Fork):

# On GitHub: click Fork → your-account/go4u
git clone https://github.com/<your-account>/go4u.git
cd go4u
git checkout -b feature/chat-translation
# ...do your changes...
git add .
git commit -m "feat(chat): add AI translation bubble in messages"
git push origin feature/chat-translation
# Then open a PR from your fork → dani-io/go4u:staging

Branching Model

main → Production (app.go4u.app)

staging → QA/Preview (staging.go4u.app)

feature/* → new features: feature/add-task-form, feature/dashboard-contracts

fix/* → bug fixes: fix/chat-crash

hotfix/* → urgent fixes on production: hotfix/contract-pdf-500

(optional) release/* → versioned freeze branches

Create features from staging and open PRs into staging.
When staging is stable, maintainers merge staging → main.
Commit Style (Conventional Commits)

Examples:

feat(dashboard): add contracts tab viewer

fix(chat): prevent crash on empty translation

chore(ci): add typecheck to PR pipeline

docs(readme): add Persian version link

Keep commits small and focused.

Pull Request Rules

Target: staging
Checks: lint, typecheck, build, basic tests
Review: at least 1 approver

PR Checklist

 Feature spec followed (see /docs)

 i18n keys used (no hard-coded brand/strings)

 Mobile-first + desktop responsive

 Security considered (AuthZ/ownership/rate-limit/uploads)

 Performance (pagination/caching/code-splitting)

 No new secrets in code; ENV documented

 Tests updated (unit/E2E if needed)

 Screenshots/GIFs for UI changes

 Linked issues / RFC references added

Keeping Your Branch Up-to-date

git fetch origin
git pull origin staging
# resolve conflicts if any, then push again:
git push

Hotfix Flow (Production fire)

git checkout -b hotfix/critical-fix main
# ...patch...
git commit -m "fix(hotfix): patch critical prod bug"
git push origin hotfix/critical-fix
# Open PR → main (immediate deploy), then merge main → staging

Code Style & Tooling

TypeScript strict, ESLint, Prettier, Tailwind

React Hook Form + Zod for forms

Next.js App Router (server-first; client components only when needed)

i18n via /src/locales/*; RTL safe (fa/ar)

Environment & Secrets

Keep secrets in Vercel project settings (encrypted).

Document any new ENV in /docs/infra/ENVIRONMENT_VARS.md and .env.example.

CI/CD

GitHub Actions: lint + typecheck + build on PR

Vercel: Preview for every PR to staging; Production deploy on main

Issue Labels (suggested)

type:feat, type:fix, type:docs, type:refactor, type:infra

area:chat, area:dashboard, area:add-task, area:profile, area:admin

prio:high|medium|low

Code of Conduct

Be kind, be clear, be constructive. Respect time zones and async review.

Thanks for contributing to go4u 🚀
