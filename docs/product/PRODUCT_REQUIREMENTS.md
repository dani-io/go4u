# Go4u — Product Requirements

## 1. Purpose
Define the functional and non-functional requirements for the Go4u platform, ensuring clarity for design, development, and testing teams.

---

## 2. User Roles

- **Requester (Client):** Creates tasks, pays via wallet, receives results.  
- **Agent (Doer):** Accepts tasks, completes them, earns money or certificates.  
- **Admin (Founder/Managers):** Oversees platform, manages disputes, payments, and analytics.  
- **Guest:** Can browse tasks and limited content, must sign up to interact.

---

## 3. Core Features (MVP)

### 3.1 Task Management
- **Create Task:** Title, description, category, location, price suggestion (AI polish option).  
- **Deal:** Both parties must confirm to lock a contract.  
- **Dashboard:** Track My Tasks (Active, Done, Cancelled).  
- **Cancel/Done:** Confirmed by Requester (with safety delay for Cancel).  

### 3.2 Chat
- 1-to-1 secure messaging between Requester and Agent.  
- AI-powered translation (optional).  
- “Deal” button inside chat triggers contract generation.  

### 3.3 Contracts & Certificates
- AI-generated contracts from task details + chat log.  
- Volunteer tasks → certificate instead of payment.  

### 3.4 Wallet & Payments
- Internal wallet for all users.  
- Escrow hold when Deal is made.  
- Release funds after Done/Confirm or 72h auto-confirm.  
- Refunds in case of Cancel.  

### 3.5 Identity & Trust
- Selfie KYC for Agents.  
- Escrow wallet + verified ID + contract = Trust triangle.  

### 3.6 Notifications
- Email + in-app notifications (task updates, payment, confirmations).  

### 3.7 Admin Panel
- Access via `/admin`.  
- Manage tasks, users, payments, disputes.  
- Analytics dashboard (basic in MVP).  

---

## 4. Growth Features (Phase 2+)

- **Referral Program:** Invite-to-earn with dual-sided rewards.  
- **Analytics Dashboard:** Funnel, GMV, Retention, CAC/LTV.  
- **Rating & Reviews:** Two-way feedback after tasks.  
- **Discovery & Matching:** Location + category-based suggestions.  
- **Multi-language / Multi-currency:** EN/FA/AR/FR/DE, with region-based currency.  
- **Loyalty & Badges:** Gamification for engagement.  

---

## 5. Non-Functional Requirements

- **Performance:**  
  - Mobile-first, PWA-ready.  
  - Pages load < 2s on 4G mobile.  

- **Security:**  
  - Encrypted communication (HTTPS, TLS).  
  - Escrow wallet with strict audit logs.  
  - Rate-limiting & anti-fraud checks.  

- **Scalability:**  
  - Support 100k concurrent users.  
  - Modular services (Tasks, Wallet, Chat, Notifications).  

- **Compliance:**  
  - GDPR, CCPA (data privacy).  
  - Terms of Service & Privacy Policy must be accepted at signup.  

---

## 6. Acceptance Criteria (MVP)

- A Requester can create a task with AI-polished text.  
- A Requester and Agent can both confirm a Deal.  
- Funds move to Escrow upon Deal.  
- Task shows in Dashboard (Active, Done, Cancelled).  
- Contracts are generated in English (translatable if needed).  
- Volunteer tasks produce certificates.  
- Email + in-app notifications fire correctly.  
- Admin can view all tasks, users, and disputes.  

---

## 7. Dependencies

- **Backend:** Wallet, Escrow, Contracts, Chat APIs.  
- **Frontend:** Next.js PWA, responsive design.  
- **Database:** Postgres (Users, Tasks, Wallet, Contracts, Referrals).  
- **Integrations:** Stripe/Adyen, Postmark/Resend, KYC provider.  

---

## 8. Future Considerations

- Live video streaming (TURN/STUN infra).  
- Insurance coverage for tasks.  
- B2B mode: organizational accounts and invoicing.  
- AI-powered agent matching and fraud detection.  

---
