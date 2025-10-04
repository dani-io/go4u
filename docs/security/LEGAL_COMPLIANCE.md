# Go4u — Legal & Compliance Guidelines

_This document is for internal reference. A public-facing Terms of Service and Privacy Policy will be drafted with legal counsel._

---

## 1) Scope
Go4u operates a **global task marketplace** with payments and identity verification.  
This creates obligations around **contracts, financial compliance, consumer protection, and data privacy**.

---

## 2) Terms of Service (ToS)
- Every user must accept ToS at signup.  
- Key elements:  
  - Go4u is an **intermediary**, not the service provider.  
  - Tasks/contracts are between **Requester & Agent**, facilitated by Go4u.  
  - Go4u may **hold funds in escrow**, charge fees, and arbitrate disputes.  
  - Go4u is not liable for damages caused by Agents beyond escrow amount.  
  - Volunteer tasks: no monetary compensation, only certificates.  
- ToS must be versioned and timestamped in DB (`accepted_at`).

---

## 3) Privacy Policy
- See `/security/PRIVACY.md`.  
- Must be referenced and linked in signup flow.  

---

## 4) AML / KYC Compliance
- Required for payouts and high-value transactions.  
- **KYC providers**: Persona, Veriff, Sumsub (meta only, no raw docs stored).  
- **Risk scoring** integrated into payouts (e.g., block if risk_score > threshold).  
- Retain minimal KYC metadata for 5 years.  
- Sanctions list checks (OFAC/EU) for agents receiving payouts.  

---

## 5) Escrow & Payments
- Wallet and escrow logic must comply with **local money service business (MSB) regulations**.  
- If operating in US/EU → may require partnerships with regulated payment providers.  
- Transaction receipts must be stored and accessible in user dashboard.  
- Refund policies must be explicit in ToS.  

---

## 6) Contracts & Certificates
- AI-generated contracts are **binding** when both parties confirm “Deal”.  
- Contracts must include: task details, parties, date/time, signatures (digital acceptance).  
- Language: generated in English + translated copy in user’s profile language.  
- Certificates: non-monetary proof of volunteer work, not legally binding.  

---

## 7) Disputes & Liability
- Disputes resolved via `/admin` panel by human review.  
- Policy outcomes: refund requester, release to agent, split.  
- Escrow ensures maximum liability = escrowed amount.  
- For B2B tasks: option for arbitration clauses (future).  

---

## 8) Consumer Rights
- Right to cancel before “Deal” without penalty.  
- Right to refund if task not performed.  
- Right to access/export personal data (GDPR).  
- Clear disclosure of fees (commission, withdrawal fees).  

---

## 9) Intellectual Property
- Go4u owns platform IP, branding, logos.  
- Task content belongs to requesters/agents but must comply with content policy (no illegal/harmful tasks).  
- Users grant Go4u license to display task info in app/marketing.  

---

## 10) Local Law Considerations
- **EU**: GDPR, PSD2 (Strong Customer Authentication), consumer law.  
- **US**: CCPA, state MSB licensing if applicable.  
- **CA**: PIPEDA, FINTRAC AML obligations.  
- **MENA**: country-specific KYC/payment restrictions.  
- Regular legal review per region before expansion.  

---

## 11) Insurance (Future)
- Explore liability coverage for agents (accidents, damages).  
- Display “Protected by Go4u Guarantee” where applicable.  

---

## 12) Governance
- Legal Officer responsible for: ToS, Privacy, AML/KYC compliance, disputes policy.  
- ToS/Privacy changes must be versioned and re-accepted by users.  
- Annual compliance audit.  

---
