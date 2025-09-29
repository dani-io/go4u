# Go4u — Design Tokens

## 1. Purpose
Design tokens define the **visual language** of Go4u, ensuring consistency across mobile, desktop, and admin panels.  
They are used in Tailwind config and shadcn/ui components.

---

## 2. Color Palette

### Primary
- **Primary Blue:** `#0A84FF` (Trust / Action)  
- **Primary Blue Hover:** `#0066CC`  
- **Primary Blue Light:** `#E6F0FF`

### Secondary
- **Neutral Dark:** `#1C1C1E`  
- **Neutral Gray:** `#8E8E93`  
- **Neutral Light:** `#F2F2F7`

### Feedback
- **Success Green:** `#34C759`  
- **Warning Orange:** `#FF9500`  
- **Error Red:** `#FF3B30`

---

## 3. Typography

### Font Families
- **Primary (Latin):** Inter, system-ui, sans-serif  
- **Secondary (Farsi/Arabic):** Vazirmatn, system-ui, sans-serif  

### Scales
- **Heading XL:** 32px / 40px  
- **Heading L:** 24px / 32px  
- **Heading M:** 20px / 28px  
- **Body:** 16px / 24px  
- **Caption:** 14px / 20px  

### Weights
- Regular (400), Medium (500), Semi-bold (600), Bold (700)

---

## 4. Spacing & Layout
- **Base unit:** 4px  
- **Scale:** 4px · 8px · 12px · 16px · 24px · 32px · 48px  
- **Border radius:** 12px (default), 24px (cards), 32px (modals)  
- **Elevation (shadow):**
  - Low: `0 1px 3px rgba(0,0,0,0.1)`  
  - Medium: `0 4px 8px rgba(0,0,0,0.1)`  
  - High: `0 8px 16px rgba(0,0,0,0.15)`  

---

## 5. Components & States
- **Buttons:**  
  - Primary (blue background, white text).  
  - Secondary (border, neutral).  
  - Disabled (reduced opacity).  
- **Inputs:**  
  - Rounded corners (12px).  
  - Focus state: border `#0A84FF`.  
  - Error state: border `#FF3B30`.  
- **Cards:**  
  - Rounded corners (24px).  
  - Soft shadow.  
- **Badges:**  
  - Status indicators (Active, Done, Cancelled, Volunteer).  

---

## 6. Dark Mode
- **Background:** `#121212`  
- **Surface:** `#1E1E1E`  
- **Text Primary:** `#FFFFFF`  
- **Text Secondary:** `#A1A1A1`  
- **Primary Blue:** Adjusted to `#3399FF`  

---

## 7. Implementation Notes
- All tokens stored in Tailwind config (`tailwind.config.ts`).  
- Synced with shadcn/ui theme.  
- Documented in Storybook with usage examples.  

---
