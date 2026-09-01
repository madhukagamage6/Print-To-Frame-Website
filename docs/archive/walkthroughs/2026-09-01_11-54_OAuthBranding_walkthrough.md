# Walkthrough: Google Cloud OAuth Branding & Compliance Implementation

We have implemented and verified the complete set of required links, components, and URL routing for **Print To Frame Pvt Ltd** to satisfy Google Cloud OAuth Consent Screen verification and general regulatory requirements.

---

## 1. Google Cloud Console Input Links

Enter the following URLs into your Google Cloud Console **Branding** tab (as shown in your screenshot):

| Setting Field | Value to Enter | Status |
| :--- | :--- | :--- |
| **Application home page** | `https://www.print2frame.xyz` | ✅ Verified & Live Route |
| **Application privacy policy link** | `https://www.print2frame.xyz/privacy-policy` | ✅ Implemented & Verified |
| **Application terms of service link** | `https://www.print2frame.xyz/terms-of-service` | ✅ Implemented & Verified |
| **Authorized domains** | `print2frame.xyz` | ✅ Covers all subdomains |

---

## 2. Key Changes Implemented

### Legal & Compliance Pages
- **[PrivacyPolicy.tsx](file:///c:/Users/User/Documents/Github%20repos/Print-To-Frame-Website/src/components/PrivacyPolicy.tsx)**:
  - Complete business details for **Print To Frame Pvt Ltd** (No. 58/33 Church Road, Eldeniya, Kadawatha, Sri Lanka).
  - Explicit disclosures for all Google OAuth scopes used in the codebase:
    - `https://www.googleapis.com/auth/drive.file` (CAD & print artwork uploads)
    - `https://www.googleapis.com/auth/spreadsheets` (Order tracking & status updates)
    - `https://www.googleapis.com/auth/gmail.send` (Automated customer receipts)
  - **Mandatory Google API Services User Data Policy Compliance statement** (Limited Use requirements).
  - Data non-sale commitment, TLS encryption, and data deletion instructions (`info@print2frame.xyz`).

- **[TermsOfService.tsx](file:///c:/Users/User/Documents/Github%20repos/Print-To-Frame-Website/src/components/TermsOfService.tsx)**:
  - Custom roll-formed Light Gauge Steel (LGS) frame specifications & digital flex mounting terms.
  - Payment milestones (75% advance deposit, balance upon delivery).
  - Client artwork copyright & indemnity clauses.
  - Portal authentication rules and Sri Lankan legal jurisdiction.

### URL Routing & Navigation Sync
- **[App.tsx](file:///c:/Users/User/Documents/Github%20repos/Print-To-Frame-Website/src/App.tsx)**:
  - Added URL router that parses `window.location.pathname` and `window.location.hash`.
  - Added `window.history.pushState` and `popstate` event handling for instant navigation between `/`, `/privacy-policy`, `/terms-of-service`, `/process`, `/capabilities`, and `/contact`.
  - Added **Privacy Policy** and **Terms of Service** navigation links to the website's footer and bottom copyright strip.

### Portal Authentication Compliance
- **[AuthScreen.tsx](file:///c:/Users/User/Documents/Github%20repos/Print-To-Frame-Website/src/components/AuthScreen.tsx)** & **[portal-login-template.html](file:///c:/Users/User/Documents/Github%20repos/Print-To-Frame-Website/portal-login-template.html)**:
  - Added footer links to Privacy Policy and Terms of Service directly below the portal sign-in container as required for OAuth verification.

---

## 3. Verification Results

### Automated Build & Type Checking
- **TypeScript Type Check**: `npm run lint` (`tsc --noEmit`) completed with exit code `0` (0 errors).
- **Vite Production Build**: `npm run build` completed successfully, producing production-ready chunks in `dist/`.

### Navigation Matrix
- Direct access to `https://www.print2frame.xyz/privacy-policy` or `https://www.print2frame.xyz/privacy` renders the **Privacy Policy**.
- Direct access to `https://www.print2frame.xyz/terms-of-service` or `https://www.print2frame.xyz/terms` renders the **Terms of Service**.
- Footer links in all pages smoothly navigate to the respective legal document and back to the home page.
