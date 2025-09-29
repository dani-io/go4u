# Go4u — UX Content Guide

## 1. Purpose
This guide defines the **tone of voice, terminology, and multilingual strategy** for all user-facing content in Go4u.  
It ensures consistency across Home, Chat, Add Task, Dashboard, Profile, Admin, and Notifications.

---

## 2. Tone of Voice
- **Friendly but professional**: approachable like a helpful assistant, but still trustworthy.  
- **Clear and concise**: short sentences, avoid jargon.  
- **Trust-focused**: always reassure the user (escrow, contracts, ID verification).  
- **Action-oriented**: use verbs that encourage quick decisions (Confirm, Deal, Pay, Withdraw).  

Examples:
- ✅ “Your payment is safe in escrow.”  
- ✅ “Tap *Deal* to confirm the agreement.”  
- ❌ “Financial transaction initiated to intermediary account.” (too complex)

---

## 3. Key Terminology
- **Task** → core unit (do not rename to “project” to avoid confusion).  
- **Deal** → mutual confirmation that locks the task and creates a contract.  
- **Escrow** → funds on hold until task is confirmed Done.  
- **Done** → requester confirms successful completion.  
- **Cancel** → ends a task; refund to wallet if eligible.  
- **Wallet** → user’s balance (Available, On Hold, Total).  
- **Certificate** → proof of volunteer task completion.  
- **Contract** → AI-generated agreement between requester and agent.  

---

## 4. Multilingual Strategy
- **Default:** English (EN).  
- **Supported:** Farsi (FA), Arabic (AR), French (FR), German (DE).  
- **Approach:**  
  - Store all strings in `i18n` JSON files.  
  - Use **English keys** consistently across the app.  
  - Allow users to set preferred language in Profile.  
  - Contracts & Certificates: Always generated in English + translatable version in profile language.  
- **RTL Languages:** Farsi, Arabic → ensure UI RTL support.  

Example i18n entry:
```json
{
  "task_create_title": {
    "en": "Create Task",
    "fa": "ایجاد تسک",
    "ar": "إنشاء مهمة",
    "fr": "Créer une tâche",
    "de": "Aufgabe erstellen"
  }
}

5. Notifications & Emails

Transactional messages should be short and direct.

Structure:

Subject: clear and informative.

Body: short message + CTA (link to dashboard/app).

Examples:

Task Done:

Subject: “✅ Task Completed”

Body: “Your task Buy Flowers has been confirmed. Funds released to the agent.”

Payment:

Subject: “💳 Payment Successful”

Body: “You paid €20 for Task #123. Funds are held in escrow until confirmation.”

6. Error Messages

Be polite, explain what happened, suggest a next step.

Avoid technical jargon.

Examples:

✅ “Something went wrong. Please try again.”

✅ “Your payment could not be processed. Check your card details.”

❌ “Error 402: transaction declined due to gateway mismatch.”

7. Accessibility & Inclusivity

Use simple English for easy translation.

Avoid idioms or culture-specific jokes.

Support screen readers (alt text for images).

Gender-neutral phrasing where possible.

8. Governance

All new strings must go through i18n pipeline.

PR checklist: “Added/Updated i18n entry for user-facing text.”

Quarterly content review for consistency and tone.
