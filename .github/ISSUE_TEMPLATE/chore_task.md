---
name: "⚙️ Chore / Task"
about: "Track infra, documentation, or non-feature tasks"
title: "[Chore] <short description>"
labels: ["chore"]
assignees: ""
---

## 📝 Summary
<!-- Short description of the task -->
e.g., Update Prisma migration scripts for new Wallet schema.

---

## 📖 Context / Motivation
<!-- Why is this task needed? -->
- Keep documentation and infra updated
- Ensure CI/CD pipeline works properly
- Align staging env with production

---

## ✅ Acceptance Criteria
- [ ] Task completed as described
- [ ] Tests/validation done if applicable
- [ ] Documentation updated if relevant

---

## 🛠 Technical Notes
- CI/CD config lives in `.github/workflows`
- Deployment details in `/docs/infra/DEPLOYMENT.md`
- DB migration rules in `/docs/data/MIGRATION_GUIDE.md`

---

## 🔗 Related Docs / Issues
- [Env Vars](/docs/infra/ENVIRONMENT_VARS.md)
- Related to: #15

---

## 📅 Priority
- High / Medium / Low
