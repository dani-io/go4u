# 🌍 Go4u

**کمک محلی، دسترسی جهانی**  
یک مارکت‌پلیس اعتمادمحور برای استخدام نماینده‌های محلی جهت انجام کارها، خریدها و حضور به‌جای شما در هر نقطه دنیا.  
از خرید گل تا شرکت در نمایشگاه‌ها — Go4u دست‌ها و حضور شماست.

---

## ✨ ویژگی‌ها (MVP → پروداکشن)
- 🔐 **لایه اعتماد** — کیف‌پول امانی (Escrow)، احراز هویت سلفی، گزارش لاگ‌ها  
- 📄 **قرارداد هوشمند** — تولید خودکار از روی تسک‌ها، دوزبانه، قابل پیگیری قانونی  
- 🏅 **مد حالت داوطلبانه** — انجام کار رایگان + صدور گواهی به جای پول  
- 💬 **چت + دیل** — پیشنهاد، پذیرش، کنسل، اصلاح — همه در داخل چت  
- 🌍 **چندزبانه + چندارزی** — انگلیسی، فارسی، عربی، فرانسوی، آلمانی  
- 📱 **UI موبایل‌فرست + PWA** — نصب‌پذیر، کارکرد آفلاین  
- 📊 **داشبورد** — مدیریت تسک‌ها، قراردادها، گواهی‌ها، کیف‌پول و جلسات لایو  
- 🎥 **جلسات لایو** — استریم یک‌طرفه/دوطرفه برای نمایندگی  
- 🔔 **نوتیفیکیشن‌ها** — داخل اپ + ایمیل (Postmark/Resend) + (فاز بعدی) پوش/SMS  

---


##📂 ساختار پروژه
/docs → مستندات (MVP + نسخه ادونس)
BACKEND.md → معماری بک‌اند و API
DATABASE.md → مدل داده (Prisma/Postgres)
FRONTEND_UI_PWA.md → راهنمای UI و PWA
NOTIFICATIONS.md → سیستم نوتیفیکیشن چندکاناله
PROJECT_OVERVIEW.md → نقشهٔ ماژول‌ها و رودمپ
/src
/app → Next.js (App Router: فرانت‌اند + API)
/components → کامپوننت‌های مشترک (shadcn/ui + Tailwind)
/server → لاجیک‌های بک‌اند (سرویس‌ها، auth، ai، فایل‌ها)
/brand → تنظیمات برند (اسم، رنگ‌ها، دامنه)
/locales → فایل‌های i18n (en, fa, ar, fr, de)


---

## 🚀 تکنولوژی‌ها
- **فرانت‌اند:** Next.js 14 (App Router)، React 19، TailwindCSS، shadcn/ui  
- **بک‌اند:** Next.js Route Handlers، Prisma ORM، PostgreSQL  
- **هوش مصنوعی:** Gemini API (برای Polish، Translate، Contracts)  
- **زیرساخت:** Vercel (دپلوی)، Supabase/Neon (DB)، S3/Cloud (فایل‌ها)، Postmark/Resend (ایمیل)  
- **PWA:** نصب‌پذیر، صفحه آفلاین، پوش (فاز بعدی با FCM)  
- **مانیتورینگ:** Sentry، Vercel Analytics  

---

## 🛠 توسعه روی لوکال
```bash
git clone https://github.com/dani-io/go4u.git
cd go4u
cp .env.example .env.local

pnpm install
docker compose up

pnpm db:migrate:dev
pnpm dev


رفتن به: http://localhost:3000

ساب‌دامین‌های تست لوکال: app.localhost:3000، admin.localhost:3000

🌐 دامنه‌ها و محیط‌ها

پروडकشن: app.go4u.app

استیجینگ: staging.go4u.app

ادمین: admin.go4u.app

ایمیل: mail.go4u.app (برای ایمیل‌های تراکنشی)

دامنه ثانویه: go4uapp.com → go4u.app (ریدایرکت 301)

📌 نقشه راه

 داکیومنت MVP (Home, Chat, Add Task, Dashboard, Profile, Admin)

 مشخصات بک‌اند و دیتابیس

 نوتیفیکیشن (داخل اپ + ایمیل)

 برنامه ارجاعی (Invite & Earn)

 سیستم امتیازدهی و ریویو

 مچینگ هوشمند (AI Matching)

 سناریوهای B2B (نمایشگاه‌ها، بازاریابی سازمانی)

 پوش نوتیفیکیشن (FCM)

 لایه ضمانت/بیمه و رسیدگی به اختلافات

🤝 مشارکت

ریپو را Fork و کلون کنید

یک برنچ بسازید (git checkout -b feature/my-feature)

تغییرات خود را کامیت کنید (git commit -m "feat: اضافه کردن نمایش قرارداد")

Push کنید و PR ایجاد کنید

📄 لایسنس

MIT © Go4u
