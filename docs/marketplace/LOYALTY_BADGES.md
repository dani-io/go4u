# Go4u — Loyalty & Badges System

## 1) Purpose
- Reward active and trustworthy users.  
- Provide visible signals of reputation.  
- Encourage retention via gamification.  

---

## 2) Badge Types

### Performance Badges (Agents)
- **Rising Star:** first 5 tasks completed with rating ≥4.  
- **Trusted Agent:** ≥20 tasks, avg rating ≥4.5.  
- **Pro Agent:** ≥100 tasks, avg rating ≥4.7, low cancellation rate.  

### Engagement Badges (Requesters)
- **Supportive Client:** 5 reviews left for agents.  
- **Frequent Poster:** ≥10 tasks created.  
- **Premium Client (future):** subscription plan, higher limits.  

### Special Badges
- **Volunteer Hero:** ≥5 volunteer tasks completed.  
- **Early Adopter:** joined platform in first 6 months.  
- **Community Helper:** flagged ≥10 abusive contents (validated).  

---

## 3) Visibility
- Profile pages → show badges with tooltips.  
- Chat → small badge icon next to username.  
- Dashboard → “Achievements” section.  

---

## 4) Rules
- Badges auto-assigned by backend jobs.  
- Badge metadata stored in `user_badges` table:  

id | user_id | badge_type | earned_at


- Cannot be purchased or transferred.  
- Revocation: admin can revoke in case of fraud.  

---

## 5) UX
- Notify users when badge earned (toast + email).  
- Badge showcase in profile (sortable by category).  
- Encourage sharing: “Share your Pro Agent badge on LinkedIn.”  

---

## 6) API Draft

### GET `/users/:id/badges`
- 200: list of badges.

### POST `/admin/users/:id/badges/revoke`
- Admin-only.  

---

## 7) Abuse Prevention
- Prevent farming (fake tasks to earn badges).  
- Link badges to verified KYC status if critical.  
- Risk Engine integration: suspicious accounts lose badges.  

---

## 8) Metrics
- % of active users with ≥1 badge.  
- Retention difference between badged vs non-badged.  
- Conversion uplift (tasks assigned to badged agents).  

---

## 9) Future Enhancements
- Badge marketplace (redeem for perks).  
- Seasonal/event badges (e.g., “2025 Expo Partner”).  
- Tiered loyalty program with cashback/discounts.  

---

