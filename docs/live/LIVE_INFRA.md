# Go4u — Live Infrastructure

## 1) Purpose
Enable **live video streaming** between Requesters and Agents:  
- **One-way stream**: Agent → Requester (exhibition, task proof).  
- **Two-way video**: optional for collaboration/training.  
- **Recording (optional)**: for dispute resolution or certificates.

---

## 2) Requirements
- Low latency (<500ms ideal).  
- Secure (only authorized task participants can join).  
- Scalable (handle concurrent sessions).  
- Cross-platform (web + mobile).  
- Cost-efficient (pay-as-you-go infra).  

---

## 3) Providers
- **LiveKit (preferred)**: open-source, self-hostable, WebRTC-based.  
- **Alternatives:** Agora, Twilio Live, Daily.co.  
- MVP: managed service (LiveKit Cloud or Agora).  
- Future: self-host LiveKit cluster for cost control.  

---

## 4) Architecture

### Session Flow
1. Task deal confirmed → user can start Live session.  
2. Agent clicks “Start Live” in dashboard.  
3. Backend issues a **JWT join token** (short-lived).  
4. Client connects to LiveKit/Agora room with token.  
5. Requester joins via web/app → watches or interacts.  
6. End of session → backend logs event `live.session.ended`.

### Roles
- **Agent:** always broadcaster.  
- **Requester:** viewer or optional broadcaster (two-way).  
- **Admin:** can observe any live session for audit.  

---

## 5) Security
- **Auth:** session tokens scoped to task_id + user_id.  
- **Encryption:** DTLS-SRTP (standard WebRTC).  
- **Recording:** stored in private S3 bucket with signed URLs.  
- **Access control:** only deal participants + admin can join.  
- **Abuse prevention:**  
  - Max session length (e.g., 2h).  
  - Kick/ban from session if abuse.  

---

## 6) API Endpoints (Draft)

### POST `/tasks/:task_id/live/start`
- Preconditions: deal confirmed.  
- Body: `{ "mode":"one_way"|"two_way" }`  
- 201: `{ "live_id":"live_123", "token":"jwt", "url":"wss://live.go4u.app/room/live_123" }`

### POST `/tasks/:task_id/live/stop`
- 200: `{ "status":"ended" }`

### GET `/tasks/:task_id/live/status`
- 200: `{ "live_id":"live_123", "status":"active", "viewers": 1 }`

---

## 7) UI/UX Considerations
- Dashboard:  
  - “Start Live” button visible after deal confirm.  
  - Status indicator: 🔴 Live.  
  - Viewer count.  
- Requester side:  
  - “Join Live” button.  
  - Picture-in-picture mode (mobile).  
- Option to download recording (if enabled).  

---

## 8) Events
- `live.session.started`  
- `live.session.ended`  
- `live.session.recording.saved`  
- `live.session.abuse.flagged`  

---

## 9) Observability
- Track: concurrent sessions, avg duration, bandwidth usage.  
- Alerts: session start failure rate > 5%, dropped frames > 10%.  
- Logs: who started, joined, ended session.  

---

## 10) Costs (Estimates)
- Bandwidth: ~1–2 Mbps per stream.  
- Recording: ~1GB/hr per session.  
- Pricing (Agora/LiveKit Cloud): ~$0.003–0.005/min/user.  
- Budget for MVP: ~$500–1000/month at low scale.  

---

## 11) Future Enhancements
- Multi-participant mode (group sessions).  
- Interactive features: chat overlay, polls.  
- AI transcription/translation of live video.  
- Automatic highlights/clips for task proof.  

---
