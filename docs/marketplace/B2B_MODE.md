# Go4u — B2B Mode

## 1) Purpose
- Enable companies to use Go4u for **corporate tasks**, e.g.:  
  - Presence at exhibitions (brand reps).  
  - Local marketing campaigns.  
  - Office errands, deliveries.  
- Provide **multi-user corporate accounts** with centralized billing.  

---

## 2) Features (MVP → Advanced)

### MVP
- Company account with profile.  
- Ability to assign multiple sub-users (employees).  
- Centralized wallet (shared balance).  
- Task creation under company name.  

### Advanced
- Cost centers (departments).  
- Invoicing instead of wallet prepay.  
- Bulk task posting (CSV/API import).  
- Dedicated account manager (admin role).  
- B2B referral program (bonus for company invites).  

---

## 3) Roles & Permissions
- **Company Admin:** manages wallet, sub-users, invoices.  
- **Employee:** can create/manage tasks, chat with agents.  
- **Finance Officer (optional):** approves payouts/refunds.  

RBAC table:

# Go4u — B2B Mode

## 1) Purpose
- Enable companies to use Go4u for **corporate tasks**, e.g.:  
  - Presence at exhibitions (brand reps).  
  - Local marketing campaigns.  
  - Office errands, deliveries.  
- Provide **multi-user corporate accounts** with centralized billing.  

---

## 2) Features (MVP → Advanced)

### MVP
- Company account with profile.  
- Ability to assign multiple sub-users (employees).  
- Centralized wallet (shared balance).  
- Task creation under company name.  

### Advanced
- Cost centers (departments).  
- Invoicing instead of wallet prepay.  
- Bulk task posting (CSV/API import).  
- Dedicated account manager (admin role).  
- B2B referral program (bonus for company invites).  

---

## 3) Roles & Permissions
- **Company Admin:** manages wallet, sub-users, invoices.  
- **Employee:** can create/manage tasks, chat with agents.  
- **Finance Officer (optional):** approves payouts/refunds.  

RBAC table:

| role            | create_task | manage_users | manage_wallet | approve_refunds |
| --------------- | ----------- | ------------ | ------------- | --------------- |
| Company Admin   | yes         | yes          | yes           | yes             |
| Employee        | yes         | no           | no            | no              |
| Finance Officer | no          | no           | yes           | yes             |



---

## 4) Billing Models
- **Wallet-based (MVP):**  
  - Deposit → tasks draw from shared balance.  
- **Invoice-based (Advanced):**  
  - Monthly invoice → tasks billed to company account.  
  - Payment methods: bank transfer, card on file.  
- **Tax compliance:** store VAT/GST info per company.  

---

## 5) API Draft

### POST `/b2b/companies`
- Create company account.  
- Body: `{ "name":"Acme Corp", "vat":"DE123456" }`

### POST `/b2b/companies/:id/users`
- Add employee to company.  

### GET `/b2b/companies/:id/wallet`
- Shared balance details.  

### POST `/b2b/companies/:id/invoices`
- Generate invoice for period.  

---

## 6) Admin Dashboard
- View company accounts.  
- Monitor spend, outstanding invoices.  
- Flag suspicious corporate activity (e.g., task spam).  

---

## 7) UX
- Switcher in dashboard: Personal ↔ Company.  
- Company branding in tasks/contracts.  
- Invoice download from dashboard.  

---

## 8) Security & Compliance
- KYC/KYB (Know Your Business) for companies.  
- Verify company registration, VAT ID.  
- Fraud/risk engine checks on large transactions.  
- Comply with B2B invoicing/tax laws per region.  

---

## 9) Future Enhancements
- B2B marketplace: agencies discover companies needing reps.  
- API/SDK for corporate integrations.  
- SLA-backed enterprise plans.  
- Custom reporting dashboards.  

---
