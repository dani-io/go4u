# Go4u — Risk Engine

## 1) Purpose
- Detect and prevent **fraud, abuse, and financial risk**.  
- Score users, tasks, and transactions to enable **trust-based decisions**.  
- Balance **user experience** with **security & compliance**.  

---

## 2) Risk Signals

### Identity
- KYC level (none, basic, advanced).  
- Selfie verification match % (via provider).  
- Device fingerprint reuse across accounts.  
- Multiple failed login/verification attempts.  

### Behavior
- Task spam (too many tasks in short time).  
- Chat abuse (spam links, offensive content).  
- Referral abuse (self-invite, mass fake accounts).  
- Cancellation rate (too high → suspicious).  

### Financial
- Payment failures (declines, chargebacks).  
- Wallet mismatch (hold vs release imbalance).  
- Payout anomalies (large sudden withdrawals).  
- Cross-currency arbitrage attempts.  

### Geo/Network
- VPN/proxy/Tor detection.  
- Country mismatch (signup vs payment vs device).  
- High-risk geos (sanctions, fraud hotspots).  

---

## 3) Risk Scoring Model
- Each signal = weighted score (0–100).  
- Risk score categories:
  - **0–0.3 (Low):** normal flow.  
  - **0.3–0.7 (Medium):** require extra verification.  
  - **0.7–1.0 (High):** block action, escalate.  

Formula example:

score = (identity * 0.4) + (behavior * 0.2) + (financial * 0.3) + (geo * 0.1)


---

## 4) Actions by Risk Level
- **Low (0–0.3):** normal task flow.  
- **Medium (0.3–0.7):**
  - Extra KYC required for payouts.  
  - Flag for admin review if dispute arises.  
- **High (0.7–1.0):**
  - Block task creation/payout.  
  - Notify Trust & Safety admin.  
  - Auto-freeze referral credits.  

---

## 5) Events Integration
Risk Engine subscribes to events:
- `auth.login`  
- `task.created`  
- `task.cancelled`  
- `wallet.escrow.hold`  
- `wallet.payout.requested`  
- `referral.accepted`  

On each event:
- Pull relevant data.  
- Compute risk score.  
- Emit `risk.flagged` if threshold exceeded.  

---

## 6) Admin Dashboard
- Tab: **Risk & Fraud**.  
- Views:
  - High-risk users.  
  - Blocked payouts.  
  - Referral abuse cases.  
  - Country/device anomaly reports.  
- Actions:
  - Approve/reject flagged payouts.  
  - Suspend accounts.  
  - Override false positives.  

---

## 7) Compliance Hooks
- AML checks (sanctions lists).  
- Report suspicious activity (SAR) if legally required.  
- Retain audit logs for 5 years.  

---

## 8) Notifications
- User-facing:
  - “Your payout is on hold pending verification.”  
- Admin-facing:
  - “High-risk referral flagged.”  
  - “Payout blocked — risk score 0.85.”  

---

## 9) Future Enhancements
- ML model (fraud detection trained on historical data).  
- Shared intelligence (blacklist across partner platforms).  
- Real-time scoring on chat content (AI moderation).  
- Risk-based pricing (dynamic fees for high-risk users).  

---
