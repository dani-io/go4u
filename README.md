# 🌍 Go4u

**Local help, global reach.**  
A trust-driven marketplace to hire local agents for tasks, errands, and representation anywhere.  
From buying flowers to attending exhibitions — Go4u is your proxy, your hands, your presence.

---

## ✨ Features (MVP → Production)
- 🔐 **Trust layer** — Escrow wallet, KYC (selfie ID), audit logs  
- 📄 **Smart contracts** — Auto-generated from tasks, bilingual, legally trackable  
- 🏅 **Volunteer mode** — Free tasks with certificates instead of payment  
- 💬 **Chat + Deal flow** — Propose, accept, cancel, amend — all inside chat  
- 🌍 **Multi-language + Multi-currency** — English, Farsi, Arabic, French, German  
- 📱 **Mobile-first UI + PWA** — Installable app, offline-friendly  
- 📊 **Dashboard** — Manage tasks, contracts, certificates, wallet, live sessions  
- 🎥 **Live sessions** — One-way/two-way streaming for representation  
- 🔔 **Notifications** — In-app + Email (Resend/Postmark) + (future) Push/SMS  

---

## 📂 Project Structure

/docs → Specifications (MVP + Advanced)
BACKEND.md → Backend architecture, API surface
DATABASE.md → Data model (Prisma/Postgres)
FRONTEND_UI_PWA.md → UI/PWA guidelines
NOTIFICATIONS.md → Multi-channel notifications
PROJECT_OVERVIEW.md → Roadmap & modules map
/src
/app → Next.js (App Router: frontend + API routes)
/components → Shared UI components (shadcn/ui + Tailwind)
/server → Business logic (services, auth, ai, files)
/brand → Single source of truth (name, colors, domain)
/locales → i18n files (en, fa, ar, fr, de)



---

## 🚀 Tech Stack
- **Frontend:** Next.js 14 (App Router), React 19, TailwindCSS, shadcn/ui  
- **Backend:** Next.js Route Handlers, Prisma ORM, PostgreSQL  
- **AI:** Gemini API (Polish, Translate, Contracts)  
- **Infra:** Vercel (deploy), Supabase/Neon (DB), S3/Cloud (files), Postmark/Resend (email)  
- **PWA:** Installable, offline page, push (future FCM)  
- **Monitoring:** Sentry, Vercel Analytics  

---

## 🛠 Local Development
```bash
git clone https://github.com/<your-org>/go4u.git
cd go4u
cp .env.example .env.local

pnpm install
docker compose up -d db   # start Postgres locally
pnpm db:migrate:dev
pnpm dev

Visit: http://localhost:3000

Subdomains (local test): app.localhost:3000, admin.localhost:3000

🌐 Domains & Environments

Production: app.go4u.app

Staging: staging.go4u.app

Admin: admin.go4u.app

Mail: mail.go4u.app (for transactional email)

Redirect: go4uapp.com → go4u.app

📌 Roadmap

 MVP Docs (Home, Chat, Add Task, Dashboard, Profile, Admin)

 Backend & Database specs

 Notifications (in-app + email)

 Referral program (Invite & Earn)

 Ratings & Reviews system

 AI Matching & Smart Discovery

 B2B use cases (corporate representation, exhibitions)

 Push Notifications (FCM)

 Insurance & Dispute handling layer

🤝 Contributing

Fork & clone

Create a feature branch (git checkout -b feature/my-feature)

Commit with clear messages (git commit -m "feat: add contract viewer")

Push & create PR
---
📄 License

MIT © Go4u

