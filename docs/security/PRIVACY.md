# Go4u — Privacy Policy (Internal Draft)

_This is the internal developer-facing privacy specification. A public-facing version will be simplified and legal-reviewed before launch._

---

## 1) Purpose
- Ensure **compliance** with GDPR, CCPA, and other data protection laws.  
- Define how personal data is collected, processed, stored, and deleted.  
- Guide developers to implement privacy by design.

---

## 2) Data Collected

### 2.1 User-provided
- Account info: email, password hash, display name, locale.  
- Task content: titles, descriptions, chat messages, attachments.  
- KYC metadata: provider, status, reference ID, risk score.  

### 2.2 Automatically collected
- Device/browser fingerprints.  
- IP address & country (for fraud detection).  
- Logs (auth events, task actions).  

### 2.3 Payments
- No card data stored.  
- Only provider references (Stripe/Adyen transaction IDs).  

---

## 3) Data Usage
- Provide core services (tasks, chat, payments, notifications).  
- Trust & safety (fraud detection, disputes).  
- Growth features (referrals, analytics).  
- Legal compliance (tax, anti-money laundering).  

---

## 4) Data Sharing
- **KYC providers** (Sumsub, Persona, Veriff): only metadata retained.  
- **Payment providers** (Stripe, Adyen, PayPal): tokenized transactions only.  
- **Analytics** (PostHog/Mixpanel): anonymized/hashed data, no raw PII.  
- **Storage/CDN**: contracts/certificates stored in S3-like bucket, access via signed URLs.  

---

## 5) Data Minimization
- Store only **necessary fields**.  
- Avoid storing raw documents (KYC scans).  
- Anonymize or hash identifiers where possible (e.g., analytics, referrals).  

---

## 6) Retention Policy
- **Users**: soft delete → purge after 90 days.  
- **Tasks & Chat**: retained until user deletion request (GDPR right to erasure).  
- **KYC metadata**: keep minimal for 5 years (AML requirement).  
- **Payments/Wallet**: financial data retained for 7 years (legal/tax).  
- **Logs**: 90 days operational, 365 days audit.  

---

## 7) Data Subject Rights (GDPR/CCPA)
- **Access**: users can export their data (JSON/CSV).  
- **Rectify**: users can update their profile.  
- **Erase**: users can request deletion (while preserving ledger integrity).  
- **Portability**: export in machine-readable format.  
- **Opt-out**: users can decline non-essential analytics/tracking.  

---

## 8) Security Measures
- TLS 1.2+ for all connections.  
- Pseudonymization in analytics.  
- Role-based access to DB (admins cannot query full dumps).  
- Audit logs for all data exports.  

---

## 9) Children’s Data
- Not directed to under-18.  
- Age gating in signup; if detected → delete account immediately.  

---

## 10) International Transfers
- Data may be processed in EU/US.  
- Use providers with Standard Contractual Clauses (SCCs).  
- Privacy Shield invalid → fallback to SCCs only.  

---

## 11) Future Work
- Self-service privacy dashboard.  
- Granular consent management (cookies, analytics, notifications).  
- Legal review for each jurisdiction (EU, CA, US, MENA).  

---

## 12) Governance
- Privacy Officer: designated role within company.  
- Quarterly privacy review + DPIA (Data Protection Impact Assessment).  
- This doc must stay in sync with `/data/DATA_GOVERNANCE.md` and `/security/SECURITY.md`.  

---
