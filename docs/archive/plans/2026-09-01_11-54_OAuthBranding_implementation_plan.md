# Implementation Plan: Google Cloud OAuth Branding Links & Legal Pages

This implementation plan provides the exact links required for your Google Cloud Console OAuth Consent Screen branding configuration, and outlines the technical changes needed to build, route, and integrate comprehensive **Privacy Policy** and **Terms of Service** pages into the Print To Frame live website and portal application.

---

## 1. Google Cloud Console Input Values

Based on your uploaded screenshot and domain configuration, here are the exact values to enter into the Google Cloud Console Branding screen:

| Field Name | Recommended Value | Notes |
| :--- | :--- | :--- |
| **Application home page** | `https://www.print2frame.xyz` | Direct public URL for Print To Frame |
| **Application privacy policy link** | `https://www.print2frame.xyz/privacy-policy` | Compliant with Google API User Data & Limited Use policies |
| **Application terms of service link** | `https://www.print2frame.xyz/terms-of-service` | Outlines fabrication, portal usage, and payment terms |
| **Authorized domains** | `print2frame.xyz` | Base domain covering `www.` and `portal.` subdomains |

---

## 2. Technical Overview & Proposed Architecture

To ensure Google Cloud verification passes without rejection and to provide a seamless user experience, we will implement:

1. **Dedicated Legal Components**:
   - `src/components/PrivacyPolicy.tsx`: In-depth policy covering data collection, cookies, and explicit disclosures for Google OAuth scopes (`drive.file`, `spreadsheets`, `gmail.send`) following the **Google API Services User Data Policy** (Limited Use Requirements).
   - `src/components/TermsOfService.tsx`: Full terms covering custom roll-formed steel framing, flex printing specifications, advance payments, order fulfillment, portal account responsibilities, and Sri Lankan jurisdiction.

2. **Full URL Path & Hash-Based Routing Sync**:
   - Enable browser URL routing (`/privacy-policy`, `/terms-of-service`, `/privacy`, `/terms`, etc.) with `history.pushState` and `window.onpopstate` in `src/App.tsx`.
   - Support both direct browser navigation and in-app navigation without full page reloads.

3. **Footer & Login Screen Integration**:
   - Add visible, accessible navigation links in the primary website footer (`src/App.tsx`).
   - Add compliance links in the Portal authentication screens (`src/components/AuthScreen.tsx` and `portal-login-template.html`).

4. **Static Hosting Compatibility**:
   - Ensure direct URL hits (e.g. Google reviewers opening `https://www.print2frame.xyz/privacy-policy` directly) route cleanly.

---

## User Review Required

> [!IMPORTANT]
> **Google OAuth Scope Disclosures**:
> Because the codebase in `src/lib/workspace.ts` requests Google Drive (`drive.file`), Google Sheets (`spreadsheets`), and Gmail (`gmail.send`), Google's verification team requires the Privacy Policy to clearly state how these specific APIs are used:
> 1. **Google Drive API**: To upload and store banner CAD designs and print artwork files.
> 2. **Google Sheets API**: To log and sync customer order statuses and fabrication milestones.
> 3. **Gmail API**: To send automated order confirmation receipts and milestone notifications to customers.
>
> The drafted policy includes explicit statements confirming that user data is not sold or transferred to third parties except as required for service fulfillment, adhering to the **Google API Services User Data Policy**.

---

## Proposed Changes

### Core Types & Navigation

#### [MODIFY] [types.ts](file:///c:/Users/User/Documents/Github%20repos/Print-To-Frame-Website/src/types.ts)
- Extend `Page` union type: `'home' | 'process' | 'capabilities' | 'portfolio' | 'pipeline' | 'contact' | 'privacy' | 'terms'`.

---

### Legal Components

#### [NEW] [PrivacyPolicy.tsx](file:///c:/Users/User/Documents/Github%20repos/Print-To-Frame-Website/src/components/PrivacyPolicy.tsx)
- Professional, dark-themed responsive component matching Print To Frame's industrial UI.
- Sections:
  1. Introduction & Company Details (Kadawatha, Sri Lanka).
  2. Data Collection (Contact details, order requirements, uploaded print files).
  3. **Google API Scopes & User Data Disclosures** (Drive, Sheets, Gmail).
  4. Google Limited Use Compliance statement.
  5. Data Storage, Retention, and Security.
  6. User Rights, Data Deletion Requests, and Contact Information (`info@print2frame.xyz`).

#### [NEW] [TermsOfService.tsx](file:///c:/Users/User/Documents/Github%20repos/Print-To-Frame-Website/src/components/TermsOfService.tsx)
- Sections:
  1. Acceptance of Terms.
  2. Scope of Fabrication & Printing Services (LGS Steel, Digital Flex, Billboards).
  3. Order Submission, Quotations, and Payment Milestones (Advance payments).
  4. Client Artwork Specifications & Intellectual Property.
  5. Portal Access and Google Account Authentication.
  6. Warranties, Structural Limitations, and Force Majeure.
  7. Governing Law (Democratic Socialist Republic of Sri Lanka).

---

### Application Shell & Navigation

#### [MODIFY] [App.tsx](file:///c:/Users/User/Documents/Github%20repos/Print-To-Frame-Website/src/App.tsx)
- Add initial path parsing on component mount (detect `/privacy-policy`, `/privacy`, `/terms-of-service`, `/terms`, `/process`, `/capabilities`, `/contact`).
- Sync `window.history.pushState` on page navigation.
- Handle browser Back/Forward navigation (`popstate` event listener).
- Render `PrivacyPolicy` and `TermsOfService` components with animated transitions.
- Update footer to include links for **Privacy Policy** and **Terms of Service** alongside the copyright notice.

#### [MODIFY] [AuthScreen.tsx](file:///c:/Users/User/Documents/Github%20repos/Print-To-Frame-Website/src/components/AuthScreen.tsx)
- Add bottom links for "Privacy Policy" and "Terms of Service" below the login container for OAuth screen compliance.

#### [MODIFY] [portal-login-template.html](file:///c:/Users/User/Documents/Github%20repos/Print-To-Frame-Website/portal-login-template.html)
- Add Privacy Policy and Terms of Service links in the standalone template footer.

---

## Verification Plan

### Automated / Build Verification
- Run `npm run lint` (`tsc --noEmit`) to ensure TypeScript type safety across all modified files.
- Run `npm run build` (`vite build`) to ensure the production bundle builds without errors.

### Manual Verification
- Test direct URL path navigation (`/privacy-policy`, `/terms-of-service`, `/privacy`, `/terms`).
- Test in-app navigation via footer links and verify smooth scroll to top and state transition.
- Verify browser back/forward buttons update the view appropriately.
- Verify that Google OAuth consent screen requirements (clear scope usage, limited use statement, contact email, company address) are thoroughly satisfied in the rendered UI.
