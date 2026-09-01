import React from 'react';
import { Page } from '../types';
import { Shield, Lock, Eye, FileText, CheckCircle2, Mail, MapPin, Phone, ArrowLeft, ExternalLink } from 'lucide-react';

interface PrivacyPolicyProps {
  onNavigate?: (page: Page) => void;
}

export default function PrivacyPolicy({ onNavigate }: PrivacyPolicyProps) {
  const lastUpdated = 'September 1, 2026';

  return (
    <div className="w-full min-h-screen py-12 md:py-20 relative">
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Back navigation */}
        {onNavigate && (
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-primary hover:text-primary-container text-xs font-mono uppercase tracking-wider mb-8 transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Home
          </button>
        )}

        {/* Header */}
        <div className="border-b border-outline-variant/30 pb-8 mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary-container/10 border border-primary-container/30 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <span className="font-mono text-xs text-primary tracking-widest uppercase">
              Legal & Data Protection
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-on-surface tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-on-surface-variant font-sans text-sm md:text-base leading-relaxed">
            Effective Date: <span className="text-primary font-mono">{lastUpdated}</span> | Print To Frame Pvt Ltd
          </p>
        </div>

        {/* Main Content Sections */}
        <div className="space-y-10 text-on-surface font-sans leading-relaxed">
          
          {/* Section 1: Overview */}
          <section className="bg-surface-container/40 border border-outline-variant/20 rounded-xl p-6 md:p-8 space-y-4">
            <h2 className="text-xl font-display font-semibold text-primary flex items-center gap-2">
              <FileText className="w-5 h-5" /> 1. Overview & Identity
            </h2>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
              <strong>Print To Frame Pvt Ltd</strong> ("we", "our", or "us"), located at No. 58/33 Church Road, Eldeniya, Kadawatha, Sri Lanka, operates the website <code className="text-primary font-mono text-xs bg-surface-container-high px-2 py-0.5 rounded">https://www.print2frame.xyz</code> and the specialized fabrication portal <code className="text-primary font-mono text-xs bg-surface-container-high px-2 py-0.5 rounded">https://portal.print2frame.xyz</code>.
            </p>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
              This Privacy Policy describes how we collect, use, process, and safeguard your personal information and Google user data when you visit our website, submit fabrication orders, or use our digital portal applications.
            </p>
          </section>

          {/* Section 2: Information We Collect */}
          <section className="space-y-4">
            <h2 className="text-xl font-display font-semibold text-on-surface flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" /> 2. Information We Collect
            </h2>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
              Depending on how you interact with our services, we may collect the following types of information:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-surface-container-low/80 border border-outline-variant/30 rounded-lg p-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-primary mb-2">A. Customer Contact Data</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Full name, company name, email address, phone number (+94), and delivery/installation addresses for signage fabrication.
                </p>
              </div>
              <div className="bg-surface-container-low/80 border border-outline-variant/30 rounded-lg p-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-primary mb-2">B. Project Specifications</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Banner dimensions (width/height), frame materials (LGS steel, aluminum), structural wind load requirements, and uploaded artwork/CAD blueprints.
                </p>
              </div>
              <div className="bg-surface-container-low/80 border border-outline-variant/30 rounded-lg p-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-primary mb-2">C. Authentication Credentials</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Account identity, profile name, and OAuth authorization tokens obtained via secure Google Sign-In for ERP/portal access.
                </p>
              </div>
              <div className="bg-surface-container-low/80 border border-outline-variant/30 rounded-lg p-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-primary mb-2">D. Technical Device Data</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  IP address, browser type, operating system, and anonymous usage telemetry collected to maintain site performance and prevent abuse.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Google Workspace API Scopes & User Data Disclosures (CRITICAL FOR GOOGLE CLOUD OAUTH) */}
          <section className="bg-surface-container-high/40 border-2 border-primary/30 rounded-xl p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Lock className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-xl font-display font-bold text-on-surface">
                3. Google API Scopes & User Data Handling
              </h2>
            </div>
            
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
              When authorized by our staff, partners, or authorized portal users, the Print To Frame application requests specific Google OAuth scopes to streamline framing operations. Here is how each permission is strictly utilized:
            </p>

            <div className="space-y-4">
              <div className="border border-outline-variant/30 rounded-lg p-4 bg-surface-container-low/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-semibold text-primary">Google Drive API (drive.file)</span>
                  <span className="text-[11px] font-mono bg-primary/10 text-primary px-2 py-0.5 rounded">Scope: drive.file</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  <strong>Purpose:</strong> Used exclusively to create designated order folders and upload digital print files, artwork vectors, and CAD fabrication specifications. The app only accesses, modifies, or deletes files created directly through the Print To Frame application.
                </p>
              </div>

              <div className="border border-outline-variant/30 rounded-lg p-4 bg-surface-container-low/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-semibold text-primary">Google Sheets API (spreadsheets)</span>
                  <span className="text-[11px] font-mono bg-primary/10 text-primary px-2 py-0.5 rounded">Scope: spreadsheets</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  <strong>Purpose:</strong> Used solely to create, log, read, and synchronize fabrication order records (e.g., Act 0 to Act 6 lifecycle steps, payment statuses, material costs, and order dimensions) in the designated operations spreadsheet.
                </p>
              </div>

              <div className="border border-outline-variant/30 rounded-lg p-4 bg-surface-container-low/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-semibold text-primary">Gmail API (gmail.send)</span>
                  <span className="text-[11px] font-mono bg-primary/10 text-primary px-2 py-0.5 rounded">Scope: gmail.send</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  <strong>Purpose:</strong> Used exclusively to dispatch automated operational receipts, order confirmations, and milestone updates directly to the customer's email. The application does not read, index, or access your incoming messages or email history.
                </p>
              </div>
            </div>

            {/* Mandatory Google Limited Use Statement */}
            <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg">
              <h4 className="font-mono text-xs uppercase tracking-wider text-primary font-bold mb-1">
                Google API Services User Data Policy Compliance
              </h4>
              <p className="text-xs md:text-sm text-on-surface leading-relaxed">
                Print To Frame's use and transfer to any other app of information received from Google APIs will adhere to the{' '}
                <a 
                  href="https://developers.google.com/terms/api-services-user-data-policy" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary underline hover:text-primary-container inline-flex items-center gap-1"
                >
                  Google API Services User Data Policy <ExternalLink className="w-3 h-3" />
                </a>, including the Limited Use requirements.
              </p>
            </div>
          </section>

          {/* Section 4: How We Use Your Information */}
          <section className="space-y-4">
            <h2 className="text-xl font-display font-semibold text-on-surface flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" /> 4. How We Use Your Information
            </h2>
            <ul className="space-y-2.5 text-sm text-on-surface-variant list-disc pl-5">
              <li>To engineer, fabricate, roll-form, and deliver custom Light Gauge Steel (LGS) frames and digital flex banners.</li>
              <li>To process customer orders, issue price quotations, and confirm advance payments.</li>
              <li>To provide customer support and respond to technical inquiries regarding fabrication specifications.</li>
              <li>To authenticate authorized personnel into our internal fabrication pipeline dashboard.</li>
              <li>To comply with statutory legal and tax obligations in Sri Lanka.</li>
            </ul>
          </section>

          {/* Section 5: Data Sharing & Non-Sale of Data */}
          <section className="space-y-4">
            <h2 className="text-xl font-display font-semibold text-on-surface flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" /> 5. Data Sharing & Disclosure
            </h2>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
              We respect your privacy. <strong>We do not sell, rent, or trade your personal information or Google user data to third parties or advertising networks.</strong> We only share information with:
            </p>
            <ul className="space-y-2 text-sm text-on-surface-variant list-disc pl-5">
              <li><strong>Cloud Infrastructure Providers:</strong> Google Cloud Platform and Firebase for secure hosting and authentication under strict confidentiality agreements.</li>
              <li><strong>Delivery & Logistics Partners:</strong> Necessary delivery drivers or installers strictly to fulfill physical frame deliveries to your specified site.</li>
              <li><strong>Legal Compliance:</strong> When required by Sri Lankan law, court order, or governmental authorities.</li>
            </ul>
          </section>

          {/* Section 6: Security & Storage */}
          <section className="space-y-4">
            <h2 className="text-xl font-display font-semibold text-on-surface flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" /> 6. Data Security & Retention
            </h2>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
              All communications between your browser and our servers are encrypted via industry-standard Transport Layer Security (TLS/HTTPS). OAuth access tokens are handled securely in session memory and are never exposed in public repositories. We retain project files and transaction logs only as long as necessary for engineering warranty support, tax records, and customer re-orders.
            </p>
          </section>

          {/* Section 7: User Rights & Data Deletion */}
          <section className="space-y-4">
            <h2 className="text-xl font-display font-semibold text-on-surface flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" /> 7. Your Rights & Data Deletion
            </h2>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
              You have the right to request access to, correction of, or permanent deletion of your personal records and uploaded artwork stored on our systems.
            </p>
            <div className="bg-surface-container-low border border-outline-variant/30 rounded-lg p-4 space-y-2">
              <p className="text-xs md:text-sm text-on-surface-variant">
                To request data deletion or revoke portal permissions:
              </p>
              <ul className="text-xs text-on-surface-variant list-disc pl-5 space-y-1">
                <li>Email us directly at <a href="mailto:info@print2frame.xyz" className="text-primary hover:underline">info@print2frame.xyz</a> with your name and order ID.</li>
                <li>You can revoke Google Account permissions at any time via your <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Account Security Settings</a>.</li>
              </ul>
            </div>
          </section>

          {/* Section 8: Contact Information */}
          <section className="bg-surface-container/60 border border-outline-variant/30 rounded-xl p-6 md:p-8 space-y-4">
            <h2 className="text-xl font-display font-semibold text-primary">
              8. Contact Us
            </h2>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data handling practices, please contact us:
            </p>
            <div className="space-y-2.5 text-xs sm:text-sm text-on-surface-variant font-sans pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Print To Frame Pvt Ltd, No. 58/33 Church Road, Eldeniya, Kadawatha, Sri Lanka.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:info@print2frame.xyz" className="text-primary hover:underline">info@print2frame.xyz</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+94 71 141 9027</span>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
