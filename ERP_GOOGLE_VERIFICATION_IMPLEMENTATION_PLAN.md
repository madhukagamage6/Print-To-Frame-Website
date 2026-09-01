# Implementation Plan: Google OAuth Verification & Scope Compliance for Print-To-Frame ERP System

This implementation plan details the exact actions required to pass **Google Cloud OAuth Consent Screen & Sensitive Scope Verification** for the **Print To Frame ERP System** (`portal.print2frame.xyz`) in conjunction with the **Marketing Website** (`www.print2frame.xyz`).

---

## 1. System Architecture & Ecosystem Context

```
                         ┌──────────────────────────────────────┐
                         │ Authorized Domain: print2frame.xyz   │
                         └──────────────────┬───────────────────┘
                                            │
                 ┌──────────────────────────┴──────────────────────────┐
                 ▼                                                     ▼
┌───────────────────────────────────────┐             ┌───────────────────────────────────────┐
│ Public Website (www.print2frame.xyz)  │             │ ERP System (portal.print2frame.xyz)   │
│ • Hosts public Privacy Policy         │             │ • Authenticates users via Google Auth │
│ • Hosts public Terms of Service       │             │ • Uses drive.readonly & contacts.read │
│ • Non-gated, accessible to crawlers   │             │ • Manages orders, CAD, CRM leads      │
└───────────────────────────────────────┘             └───────────────────────────────────────┘
```

---

## 2. Google Cloud Console Scope Cleanup

> [!WARNING]
> **Remove All 25 Unused Sensitive Scopes**
> Your Google Cloud Console currently has 27 scopes selected. Keeping unused scopes causes automatic rejection by Google Trust & Safety or triggers expensive third-party CASA security audits.

### Scopes to DELETE in Google Cloud Console
Click the **Trash Can 🗑️ icon** in the **Data Access / Sensitive Scopes** table for:
- ❌ `.../auth/contacts` *(Full write/delete; replace with `contacts.readonly`)*
- ❌ `.../auth/contacts.other.readonly`
- ❌ `.../auth/directory.readonly`
- ❌ `.../auth/drive.photos.readonly`
- ❌ `.../auth/drive.apps.readonly`
- ❌ `.../auth/calendar` *(all 8 Calendar scopes)*
- ❌ `.../auth/documents` *(all 2 Google Docs scopes)*
- ❌ `.../auth/tasks` *(all 2 Google Tasks scopes)*
- ❌ `.../auth/forms` *(all 3 Google Forms scopes)*
- ❌ `.../auth/gmail.addons.*` *(all Gmail Addon scopes)*
- ❌ `.../auth/gmail.send` *(unless actively sending emails via user's personal Gmail)*

### Scopes to KEEP in Google Cloud Console
- ✅ `.../auth/drive.readonly` (or `drive.file`) — Sensitive (Required for `GoogleDrivePickerModal.jsx`)
- ✅ `.../auth/contacts.readonly` — Sensitive (Required for `ContactSyncModal.jsx`)
- ✅ `.../auth/userinfo.email` / `email` — Non-sensitive
- ✅ `.../auth/userinfo.profile` / `profile` — Non-sensitive
- ✅ `openid` — Non-sensitive

---

## 3. Justification Content for Google Cloud Console

In the **"How will the scopes be used?"** box, paste this exact justification (935 / 1000 characters):

```text
Print To Frame Pvt Ltd (https://www.print2frame.xyz) operates an enterprise ERP fabrication portal at https://portal.print2frame.xyz for structural steel framing and flex printing.

The requested scopes are strictly used for core operational workflows:

1. Google Drive (https://www.googleapis.com/auth/drive.readonly):
Allows authorized clients and engineers to select and attach their existing banner artwork, CAD structural blueprints, and production spec PDFs directly to fabrication work orders.

2. Google Contacts (https://www.googleapis.com/auth/contacts.readonly):
Allows sales and project managers to import client names, phone numbers, and company details into the ERP CRM lead management pipeline with user consent. The app only reads contacts and never edits or deletes contacts.

No user data is sold or shared with third parties. All usage adheres strictly to the Google API Services User Data Policy Limited Use requirements.
```

---

## 4. Required Code Changes in `Print-To-Frame-ERP-System`

### A. Add Privacy & Terms Links to Login Screen
#### [MODIFY] `src/components/auth/Login.jsx`
Around line 266, replace:
```jsx
<p className="mt-8 font-sans text-xs text-on-surface-variant/60">
  © 2024 Print To Frame Pvt Ltd. All rights reserved.
</p>
```
With:
```jsx
<div className="mt-8 flex flex-col items-center gap-2 font-sans text-xs text-on-surface-variant/60">
  <div className="flex items-center gap-4">
    <a 
      href="https://www.print2frame.xyz/privacy-policy" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="hover:text-primary transition-colors underline"
    >
      Privacy Policy
    </a>
    <span>•</span>
    <a 
      href="https://www.print2frame.xyz/terms-of-service" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="hover:text-primary transition-colors underline"
    >
      Terms of Service
    </a>
  </div>
  <p>© 2026 Print To Frame Pvt Ltd. All rights reserved.</p>
</div>
```

### B. Clean up Scopes in Firebase Auth Service
#### [MODIFY] `src/services/firebase.js`
Around lines 40–46, ensure the provider scopes match the approved minimal scopes:
```javascript
// Google Workspace Scopes
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/drive.readonly');
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.addScope('https://www.googleapis.com/auth/userinfo.email');
provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
```

---

## 5. Google Cloud Console & Firebase Configuration Settings

### In Google Cloud Console -> APIs & Services -> Credentials:
1. **OAuth 2.0 Client IDs -> Web client**:
   - **Authorized JavaScript origins**:
     - `https://www.print2frame.xyz`
     - `https://portal.print2frame.xyz`
     - `http://localhost:5173` (for local development)
   - **Authorized redirect URIs**:
     - `https://portal.print2frame.xyz/__/auth/handler` (or your Firebase Auth handler URL)
     - `https://<YOUR_FIREBASE_PROJECT_ID>.firebaseapp.com/__/auth/handler`

### In Firebase Console -> Authentication -> Settings -> Authorized Domains:
Add the following domains:
- `print2frame.xyz`
- `portal.print2frame.xyz`
- `www.print2frame.xyz`

---

## 6. YouTube Demo Video Guidelines (For Google Trust & Safety Review)

When requested by Google's Trust & Safety team via email, provide a 1–2 minute unlisted YouTube video showing:
1. **Login Screen**: Navigating to `https://portal.print2frame.xyz` showing the Privacy Policy and Terms of Service links.
2. **OAuth Consent Screen**: Clicking "Login with Google", with the URL bar clearly showing the OAuth Client ID (`client_id=...`).
3. **Drive Picker Feature**: Opening `GoogleDrivePickerModal.jsx` and selecting a CAD drawing / artwork PDF from Drive.
4. **Contact Sync Feature**: Opening `ContactSyncModal.jsx` and importing a Google Contact into the CRM leads.

---

## 7. Execution Checklist

- [ ] 1. In Google Cloud Console, delete the 25 unused scopes.
- [ ] 2. In Google Cloud Console, paste the justification text in the text box.
- [ ] 3. In `Print-To-Frame-ERP-System`, update `src/components/auth/Login.jsx` and `src/services/firebase.js`.
- [ ] 4. In `Print-To-Frame-ERP-System`, build and deploy the update to `portal.print2frame.xyz`.
- [ ] 5. In Google Cloud Console, select **"I have fixed the issues"** and click **Proceed** to submit for re-verification.
