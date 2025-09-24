# مشارکت در Go4u

خوش آمدید! این راهنما توضیح می‌دهد که در پروژه **go4u** چطور باید برنچ بسازیم، کد بزنیم، تغییرات را پوش کنیم و Pull Request باز کنیم.

---

## خلاصه سریع

1) از برنچ **staging** یک برنچ جدید بساز  
2) تغییراتت را با کامیت‌های کوچک و واضح ذخیره کن  
3) برنچ را **push** کن به GitHub  
4) یک PR (Pull Request) به برنچ **staging** باز کن  
5) وقتی staging پایدار شد → مدیرها merge می‌کنند به **main** (Production)

---

## دسترسی به ریپو: Collaborator یا Fork

### اگر دسترسی نوشتن داری (collaborator):
```bash
git clone https://github.com/dani-io/go4u.git
cd go4u
git checkout -b feature/chat-translation
# تغییراتت...
git add .
git commit -m "feat(chat): اضافه کردن ترجمه خودکار در چت"
git push origin feature/chat-translation

اگر دسترسی نداری (Fork):

در GitHub روی دکمه Fork بزن → ریپو کپی می‌شود در اکانتت

git clone https://github.com/<your-account>/go4u.git
cd go4u
git checkout -b feature/chat-translation

تغییراتت را اعمال کن و Push کن:

git push origin feature/chat-translation
ریپو خودت را کلون کن:
مدل برنچ‌ها

main → پروDUCTION (app.go4u.app)

staging → تست/QA (staging.go4u.app)

feature/* → توسعه فیچرها: feature/add-task-form

fix/* → رفع باگ: fix/chat-crash

hotfix/* → رفع سریع باگ بحرانی روی Prod: hotfix/contract-pdf-500

(اختیاری) release/* → برنچ‌های نسخه‌دار

همیشه فیچرها را از staging بساز و PR به staging بده.
وقتی staging پایدار شد → merge به main.

استایل کامیت (Conventional Commits)

مثال‌ها:

feat(dashboard): اضافه کردن تب قراردادها

fix(chat): جلوگیری از کرش هنگام ترجمه خالی

chore(ci): افزودن typecheck به PR pipeline

docs(readme): اضافه کردن لینک نسخه فارسی

قوانین Pull Request

هدف: برنچ staging

بررسی‌ها: lint، typecheck، build، تست‌های پایه

بازبینی: حداقل یک تأیید لازم است

چک‌لیست PR

 مطابق Spec فیچر (/docs) پیاده‌سازی شده

 i18n رعایت شده (بدون متن یا برند هاردکد)

 طراحی Mobile-first + ریسپانسیو دسکتاپ

 امنیت رعایت شده (AuthZ/ownership/rate-limit/uploads)

 پرفورمنس (pagination, caching, code-splitting)

 ENV جدید در .env.example و داکیومنت نوشته شده

 تست‌ها به‌روز شده (unit/E2E اگر لازم بود)

 برای UI اسکرین‌شات یا GIF اضافه شده

 Issue یا RFC مرتبط لینک داده شده

git fetch origin
git pull origin staging
# حل conflict ها، سپس:
git push

Hotfix (بحرانی در پروDUCTION)

git checkout -b hotfix/critical-fix main
# ...اصلاح سریع...
git commit -m "fix(hotfix): رفع باگ بحرانی Prod"
git push origin hotfix/critical-fix
# PR مستقیم به main (دپلوی فوری) → سپس main → staging

استایل کد و ابزارها

TypeScript strict, ESLint, Prettier, Tailwind

React Hook Form + Zod برای فرم‌ها

Next.js App Router (پیش‌فرض سروری؛ client فقط در صورت نیاز)

i18n در /src/locales/* (پشتیبانی از RTL برای fa/ar)

محیط و Secrets

Secrets فقط در Vercel Project Settings (رمزگذاری‌شده).

هر ENV جدید باید در /docs/infra/ENVIRONMENT_VARS.md و .env.example ثبت شود.

CI/CD

GitHub Actions: lint + typecheck + build روی هر PR

Vercel: Preview برای هر PR به staging؛ Production deploy روی main

لیبل‌های Issues

type:feat, type:fix, type:docs, type:refactor, type:infra

area:chat, area:dashboard, area:add-task, area:profile, area:admin

prio:high|medium|low

Code of Conduct

مهربان باشید، شفاف بنویسید، بازخورد سازنده بدهید.

اختلاف زمانی را در نظر بگیرید و بازبینی‌ها را async انجام دهید.

ممنون از اینکه به Go4u کمک می‌کنید 🚀


به‌روز نگه داشتن برنچ
