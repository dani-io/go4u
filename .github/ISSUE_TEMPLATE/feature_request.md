---
name: "🚀 Feature Request"
about: "Suggest or track a new feature for Go4u"
title: "[Feature] <short title>"
labels: ["feature", "MVP"]
assignees: ""
---

## 🎯 Summary
<!-- Short description of the feature -->
e.g., Implement Wallet Escrow system for holding funds until task completion.

---

## 📖 Context / Motivation
<!-- Why is this feature needed? -->
- Trust & safety for transactions
- Required for MVP payments
- Linked to docs: [/docs/backend/API_SPEC.md](../docs/backend/API_SPEC.md)

---

## ✅ Acceptance Criteria
- [ ] Backend API implemented (`/wallet/escrow/hold`, `/wallet/escrow/release`)
- [ ] UI integrated into Dashboard → Wallet tab
- [ ] Notifications sent when escrow hold/release occurs
- [ ] Tests added (unit + integration)
- [ ] Docs updated

---

## 🛠 Technical Notes
- Relies on Postgres schema: `wallet_transactions`
- Uses Prisma migrations
- Triggered on `task.deal.confirmed` event
- Integration with Stripe/Adyen

---

## 🔗 Related Docs
- [API Spec](/docs/backend/API_SPEC.md)
- [Risk Engine](/docs/risk/RISK_ENGINE.md)
- [Payment Guide](/docs/PAYMENT.md)

---

## 📅 Priority
- MVP: Yes
- Blocker for: Task lifecycle → Payments
