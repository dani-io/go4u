# Go4u — Discovery & Matching

## 1) Purpose
- Help Requesters find the right Agents.  
- Help Agents discover relevant tasks.  
- Ensure fair, transparent, and efficient matching.  

---

## 2) Discovery (Requester Side)
- **Browse mode:** requesters can browse agents (future B2B/agency).  
- **Invite mode:** requester invites specific agent(s) via task.  
- **Filters:**  
  - Location (country, city, radius km).  
  - Category (delivery, exhibition, volunteer, etc.).  
  - Language spoken.  
  - Rating (≥4 stars).  
  - Price range (budget).  

---

## 3) Discovery (Agent Side)
- **Feed of open tasks:**  
  - Filtered by location, category, language, budget.  
  - Sorted by recency or relevance.  
- **Notifications:**  
  - New tasks matching saved filters.  
  - Push/email alerts for urgent/local tasks.  

---

## 4) Matching Algorithm
- **Phase 1 (MVP):**  
  - Simple filters: location (same country/city), category, language.  
  - Default sort: newest tasks first.  

- **Phase 2 (Smart Matching):**  
  - Weighted score:  
    - Location proximity (40%)  
    - Rating/reputation (25%)  
    - Task fit (category/language, 25%)  
    - Availability (calendar integration, 10%)  
  - Rank agents/tasks by score.  

- **Phase 3 (AI-enhanced):**  
  - NLP on task description → auto-category classification.  
  - AI recommendations (collaborative filtering).  

---

## 5) APIs

### GET `/search/tasks`
- Query params:  
  - `q=flowers`  
  - `category=delivery`  
  - `lat=52.52&lng=13.405&radius_km=20`  
  - `min_budget=1000&max_budget=10000`  
  - `page=1&limit=20`  
- Response: list of matching tasks.  

### GET `/search/agents`
- Query params: `category=exhibition&city=Berlin&lang=de`  
- Response: list of agents with ratings, profiles.  

---

## 6) UX
- Requester:  
  - “Suggested Agents” panel when creating task.  
  - Search page with filters and map view (phase 2).  
- Agent:  
  - Personalized task feed.  
  - “Recommended for you” section.  

---

## 7) Abuse Prevention
- Prevent fake discoverability boosts (no paid manipulation in MVP).  
- Flag suspicious task spam.  
- Limit agents from applying to too many tasks in short time.  

---

## 8) Metrics
- Task → deal conversion rate.  
- Avg response time (task open → first agent deal).  
- % tasks with no applicants.  
- Agent acceptance vs rejection rates.  

---

## 9) Future Enhancements
- Calendar availability integration (Google/Outlook).  
- Dynamic pricing recommendations (AI-based).  
- Sponsored listings (Phase 3, monetization).  
- “Smart re-match” if agent cancels mid-task.  

---
