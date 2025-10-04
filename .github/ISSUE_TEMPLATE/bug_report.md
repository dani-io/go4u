---
name: "🐞 Bug Report"
about: "Report a reproducible bug or unexpected behavior in Go4u"
title: "[Bug] <short description>"
labels: ["bug"]
assignees: ""
---

## 🐞 Summary
<!-- Short description of the bug -->
e.g., Escrow release endpoint returns 500 when confirming task.

---

## 📖 Steps to Reproduce
1. Go to Dashboard → Tasks
2. Confirm a completed task
3. Observe error on `/wallet/escrow/release`

---

## ✅ Expected Behavior
- Funds should move from "On Hold" to "Available" in wallet
- Status updated in task as `done`

---

## ❌ Actual Behavior
- API returns 500
- Wallet balance remains unchanged

---

## 📷 Screenshots / Logs
<!-- Attach console logs, API responses, or screenshots -->

---

## 🛠 Environment
- App Version: `v0.1.0`
- Branch: `dev`
- Browser/OS: Chrome 140, Ubuntu 22.04
- DB: Postgres 16 (docker-compose)

---

## 🔗 Related Docs / Issues
- [API Spec](/docs/backend/API_SPEC.md)
- Possibly related to: #12

---

## 📅 Priority
- High / Medium / Low

