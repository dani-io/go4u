# Go4u — Project Overview

## 1. Introduction
**Vision:** Build a global marketplace where anyone can request local help, with trust and security guaranteed.  
**Mission:** Enable individuals, businesses, and organizations to delegate tasks worldwide, with local agents acting on their behalf.  

**Target users:**
- **Individuals:** Daily errands, gift delivery, event participation.  
- **Expats & Families:** Sending items or handling local chores remotely.  
- **Businesses:** Representation at exhibitions, distributing brochures, proxy visits.  
- **Organizations:** Local presence for official meetings and community work.  

---

## 2. Core Value Proposition
- **Trust at a distance:** Escrow wallet, verified identities (selfie KYC), and AI-generated contracts.  
- **Local help, global reach:** A user in one country can securely hire someone in another.  
- **Transparency:** Clear task lifecycle, receipts, and certificates.  
- **Flexibility:** Paid tasks, volunteer tasks, and B2B services.

---

## 3. Core Features
- **Task lifecycle:**  
  Create → Deal → Escrow → Done/Cancel → Review.  

- **Contracts & Certificates:**  
  AI-generated contracts based on task title, description, and chat. Certificates for volunteer tasks.  

- **Volunteer tasks:**  
  No payment, certificate of completion issued if requested.  

- **Multi-language / Multi-currency:**  
  Default EN, support FA/AR/FR/DE. Currency adapts by region (CAD, EUR, USD, IRR).  

- **Live sessions:**  
  Agents can stream 1-way video for proof or 2-way video for training/guidance.  

---

## 4. Platform Architecture
- **Frontend:**  
  Next.js PWA, React, Tailwind. Mobile-first design with responsive desktop layout.  

- **Backend:**  
  Node/Next.js API routes, event-driven services, secured with authentication & authorization.  

- **Database:**  
  PostgreSQL with Prisma ORM. Wallet, tasks, contracts, notifications, referral.  

- **Wallet & Payment:**  
  Internal wallet with Escrow hold. Stripe/Adyen for global payments, local gateways for IRR.  

- **Notifications:**  
  Email (Postmark/Resend), in-app toasts & bell, push notifications (future).  

- **Admin Panel:**  
  `/admin` dashboard for founder and managers: disputes, payments, user management, analytics.  

---

## 5. Marketplace Dynamics
- **Roles:** Requester (task creator) and Agent (task doer).  

- **Trust & Safety triangle:**  
  Wallet + Identity Verification + Escrow.  

- **Rating & Review:**  
  Two-way reviews after task completion, building Trust Score.  

- **Referral Program:**  
  Invite-to-earn system with wallet credits and invitee discounts.  

---

## 6. Growth & Analytics
- **Referral Engine:**  
  Dual-sided rewards, anti-fraud checks, capped incentives.  

- **Analytics & Growth Dashboard:**  
  Tracks funnel (Visitor → Signup → Verified → Active → Paying), GMV, retention, referral performance.  

- **Risk Engine:**  
  Fraud detection signals: duplicate accounts, unusual patterns, payment abuse.  

---

## 7. Future Roadmap
- **B2B Features:**  
  Organizational accounts, delegation, invoicing.  

- **Loyalty & Badges:**  
  Gamification for retention.  

- **Insurance & Dispute Automation:**  
  Coverage for agents, streamlined resolution workflows.  

- **AI-powered Discovery:**  
  Smart matching of tasks to agents based on location, category, and trust score.  

---

## 8. Related Documents
- `/product/PRODUCT_REQUIREMENTS.md`  
- `/ui/FRONTEND_UI_PWA.md`  
- `/backend/BACKEND.md`  
- `/data/DATABASE.md`  
- `/infra/DEPLOYMENT.md`  
- `/growth/ANALYTICS_GROWTH_DASHBOARD.md`  
- `/growth/REFERRAL_PROGRAM.md`  
- `/security/LEGAL_COMPLIANCE.md`  
