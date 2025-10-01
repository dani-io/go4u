# Go4u — Ratings & Reviews

## 1) Purpose
- Build **trust & reputation** between Requesters and Agents.  
- Provide transparent feedback loops.  
- Detect poor performance and fraud early.  

---

## 2) Principles
- **Two-sided:** both Requester and Agent can review each other.  
- **Post-completion only:** reviews enabled only after task marked as `done`.  
- **One review per deal:** no spam or duplicate reviews.  
- **Immutable:** reviews cannot be edited; only supplemented by additional comments.  
- **Visible:** aggregate ratings shown on profiles.  

---

## 3) Rating Model
- **Numeric rating:** 1–5 stars.  
- **Optional comment:** max 500 chars, moderated for abuse.  
- **Sub-categories (optional, Phase 2):**  
  - Reliability  
  - Communication  
  - Quality of Work  
  - Professionalism  

---

## 4) Review Lifecycle
1. Task marked `done`.  
2. System prompts both parties to review.  
3. Review window: 14 days.  
4. If no review → marked as “no feedback given”.  
5. Once submitted, review is permanent.  

---

## 5) Display
- **User Profile:**  
  - Avg rating (to 1 decimal).  
  - Total # of reviews.  
  - Last 5 reviews preview.  
- **Task History (dashboard):**  
  - Show reviews attached to completed tasks.  
- **Admin Panel:**  
  - All reviews with moderation controls.  

---

## 6) Abuse Prevention
- **Content filters:** detect hate, spam, links.  
- **Flagging:** users can report abusive reviews.  
- **Admin override:**  
  - Remove only if policy violation (not for bad ratings).  
- **Risk integration:** repeated bad ratings may raise risk score.  

---

## 7) API Draft

### POST `/tasks/:task_id/reviews`
- Body: `{ "for":"agent|requester", "rating":5, "comment":"..." }`
- 201: `{ "review_id":"rvw_1" }`

### GET `/users/:user_id/reviews`
- 200: `{ "avg":4.8, "count":12, "items":[...] }`

### GET `/reviews/:review_id`
- 200: review details.  

---

## 8) Notifications
- In-app: “You received a new review.”  
- Email (optional): summary of feedback.  
- Admin alerts for flagged reviews.  

---

## 9) Metrics
- % of tasks with reviews.  
- Avg rating distribution.  
- Correlation with repeat deals.  
- Flag rate % of reviews.  

---

## 10) Future Enhancements
- Verified Badges for consistently high-rated agents.  
- Private feedback (visible only to admins).  
- Weighted ratings (recent > old).  
- AI sentiment analysis on reviews.  

---
