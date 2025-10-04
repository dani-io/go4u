# Go4u — Referral Program

## 1) Purpose
- Encourage organic user growth via peer referrals.  
- Reward both **referrer** (existing user) and **invitee** (new user).  
- Maintain trust by preventing abuse.

---

## 2) Mechanics

### Referrer
- Gets wallet credit after invitee qualifies.  
- Qualify condition: invitee creates & completes 1 paid task (min basket threshold).  
- Reward: €10 (1000 cents) wallet credit.  

### Invitee
- Gets discount/credit on first task.  
- Example: €5 discount (500 cents) if basket ≥ €20.  

---

## 3) Flow
1. User requests referral code/link: `/referral/code`.  
   - Example link: `https://go4u.app/invite/DANI-1A2B`.  
2. Invitee signs up using code.  
3. Invitee completes first qualifying task.  
4. System issues:
   - Referrer → wallet credit.  
   - Invitee → discount applied at checkout.  

---

## 4) Limits & Anti-Abuse
- **Monthly cap per referrer:** €200.  
- **Max invites per user:** 20.  
- **Hold period:** 72h before credit spendable (fraud window).  
- **One device = one new account** (device fingerprinting).  
- **Fraud signals:** self-referral, multiple accounts, mismatched KYC.  

Abuse flagged → referral credits frozen until manual review.

---

## 5) Technical Implementation
- **Backend:**
  - Referral Service subscribes to `task.done.confirmed`.  
  - Checks if invitee qualifies.  
  - Issues wallet transactions (credit/discount).  
- **Database Tables:**  
  - `referrals` (referrer_id, invitee_id, code, status).  
  - `wallet_transactions` (linked to referral).  

- **API Endpoints:** (see `/backend/API_SPEC.md`)  
  - `GET /referral/code`  
  - `POST /referral/accept`  
  - `GET /referral/stats`  

---

## 6) UX
- Profile → Referral tab.  
- Show invite link + copy/share button.  
- Show stats: invites sent, signups, qualified, earnings.  
- Toast/email when credit issued.  

---

## 7) Notifications
- Invite accepted: in-app to referrer.  
- Referral qualified: email + in-app to referrer.  
- Abuse flagged: email + admin alert.  

---

## 8) Governance
- Credits valid 12 months.  
- Non-withdrawable: can only be used for tasks, not cashed out.  
- Program terms in `/security/LEGAL_COMPLIANCE.md`.  
- Quarterly audit of referrals.  

---

## 9) Future Enhancements
- Tiered rewards (e.g., bonus after 5 successful referrals).  
- Leaderboard & community challenges.  
- B2B referral (agencies, companies).  

---
