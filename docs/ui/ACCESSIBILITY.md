# Go4u — Accessibility (A11y)

## 1. Purpose
Ensure Go4u is **usable by everyone**, regardless of ability, language, or device.  
This includes compliance with **WCAG 2.1 AA**, full RTL support, and assistive technologies.

---

## 2. Standards
- **WCAG 2.1 AA compliance** is mandatory.  
- Follow WAI-ARIA guidelines for roles, states, and properties.  
- Test with screen readers (NVDA, VoiceOver, TalkBack).  
- Test with keyboard-only navigation (Tab, Shift+Tab, Enter, Space).  

---

## 3. Core Principles

### 3.1 Perceivable
- Provide text alternatives for all non-text content (alt text for images, captions for video).  
- Ensure color contrast ratio ≥ 4.5:1 for text and UI elements.  
- Avoid using only color to convey meaning (add icons/labels).

### 3.2 Operable
- All actions must be possible with keyboard navigation.  
- Focus indicators must be visible and consistent.  
- Avoid keyboard traps (all modals and drawers must be escapable with ESC).

### 3.3 Understandable
- Use plain, simple language.  
- Provide consistent navigation (same order in mobile bottom nav & desktop sidebar).  
- Error messages must be clear and suggest solutions.

### 3.4 Robust
- Semantic HTML (use `<button>` not `<div>` for actions).  
- Support assistive technologies (screen readers, voice commands).  
- Test in multiple browsers/devices.

---

## 4. RTL (Right-to-Left) Support
- Fully support **Farsi (FA)** and **Arabic (AR)**.  
- Use logical properties (`margin-inline-start` instead of `margin-left`).  
- Mirror layouts for RTL:  
  - Bottom nav icons flip order.  
  - Chat bubbles align right.  
- Ensure bidirectional text handling (mixed EN + FA).  

---

## 5. Testing Strategy
- **Automated:**  
  - ESLint plugin `jsx-a11y`  
  - Lighthouse accessibility audits (score > 90).  
- **Manual:**  
  - Screen reader tests (NVDA, VoiceOver).  
  - Keyboard navigation walkthroughs.  
  - RTL rendering verification in staging.  

---

## 6. Accessibility in Notifications
- In-app toasts should be screen-reader friendly (use `role="alert"`).  
- Emails should have semantic HTML and proper heading hierarchy.  
- Push notifications must have concise titles and bodies (<100 chars).

---

## 7. Governance
- Accessibility checklist included in PR template.  
- Accessibility review required for all UI components before merge.  
- Quarterly audit of UI/UX against WCAG guidelines.  

---
