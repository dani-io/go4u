# Go4u — Notifications

## 1) Purpose
Provide clear, reliable, and user-friendly communication via:
- **Email**
- **In-app notifications (bell + toast)**
- **Push notifications (phase 2+)**

---

## 2) Principles
- **Actionable:** every notification must guide the user to next step.  
- **Localized:** match user profile language (default English).  
- **Multi-channel:** fallback if one channel fails (e.g., email if app closed).  
- **Secure:** no sensitive data (e.g., no full KYC docs in messages).  
- **Respectful:** opt-in/out controls; no spam.  

---

## 3) Channels

### 3.1 Email
- Transactional emails only (no marketing in MVP).  
- Provider: Postmark or Resend.  
- Templates:
  - Account: signup confirm, password reset.  
  - Tasks: deal confirmed, task done, task cancelled.  
  - Wallet: deposit success, escrow hold, release, refund, payout.  
  - Security: suspicious login, KYC result.  
- From: `no-reply@go4u.app`  
- Reply-to: `support@go4u.app`  

### 3.2 In-App
- Types:
  - Toast (ephemeral, top-right or bottom on mobile).  
  - Bell feed (persistent, “Notifications” tab).  
- Uses:
  - Chat mentions, task status changes, wallet updates.  
- UX:
  - Max 3 unread highlights; older collapse.  
  - Click → deep link to relevant page.  

### 3.3 Push (Phase 2+)
- Provider: FCM or OneSignal.  
- Use cases:
  - New task match (agent side).  
  - Deal confirmed.  
  - Payment released.  
- Payload ≤ 4kb; localized.  

---

## 4) Events → Notifications

| Event | Email | In-App | Push |
|-------|-------|--------|------|
| User signup | ✅ Welcome | — | — |
| Password reset | ✅ Reset link | — | — |
| KYC approved/failed | ✅ | ✅ | — |
| Task created | — | ✅ | — |
| Deal confirmed | ✅ | ✅ | ✅ |
| Task done (pending confirm) | ✅ | ✅ | ✅ |
| Task cancelled | ✅ | ✅ | — |
| Escrow hold | ✅ | ✅ | — |
| Escrow release | ✅ | ✅ | ✅ |
| Refund processed | ✅ | ✅ | — |
| Payout initiated | ✅ | ✅ | ✅ |
| Payout completed/failed | ✅ | ✅ | — |
| Dispute opened | ✅ | ✅ | — |
| Referral success | ✅ | ✅ | — |

---

## 5) Templates & Tone
- **Tone:** concise, friendly, trust-building.  
- Subject line: `<AppName> — [Action]`.  
- Example:
  - **Subject:** `Go4u — Your deal is confirmed!`  
  - **Body:**  
    ```
    Hi {name},
    Your deal for task "{task_title}" is now confirmed. 
    Escrow of {amount}{currency} is securely held.
    Next: connect with your agent in chat.
    → View Task
    ```

---

## 6) Tech Implementation
- **Backend:**  
  - Event-driven → Notification Service.  
  - Subscribe to events (`task.deal.confirmed`, `wallet.escrow.hold`, etc.).  
- **Email:**  
  - Provider SDK (Postmark/Resend).  
  - Templates versioned in repo (`/templates/email`).  
- **In-App:**  
  - DB table `notifications`:  
    ```sql
    id | user_id | type | payload | read_at | created_at
    ```  
  - WebSocket/SSE or polling.  
- **Push:**  
  - Token storage per device.  
  - Send via FCM API.  

---

## 7) User Settings
- Profile → Notification Preferences:  
  - Toggle email/in-app/push per category (security always enforced).  
- Respect `do not disturb` hours (future).  

---

## 8) Monitoring
- Email delivery/bounce rates.  
- In-app unread notification backlog.  
- Push success vs failures.  
- Alert if delivery < 95% success.  

---

## 9) Future Enhancements
- Digest mode (daily summary).  
- Rich push (images, action buttons).  
- AI-personalized task suggestions.  

---
