import React from 'react';
import { Page } from '../types';
import { FileCheck, ShieldAlert, Scale, CreditCard, Layers, MapPin, Mail, Phone, ArrowLeft } from 'lucide-react';

interface TermsOfServiceProps {
  onNavigate?: (page: Page) => void;
}

export default function TermsOfService({ onNavigate }: TermsOfServiceProps) {
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
              <Scale className="w-5 h-5 text-primary" />
            </div>
            <span className="font-mono text-xs text-primary tracking-widest uppercase">
              Legal & Service Agreement
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-on-surface tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-on-surface-variant font-sans text-sm md:text-base leading-relaxed">
            Effective Date: <span className="text-primary font-mono">{lastUpdated}</span> | Print To Frame Pvt Ltd
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-on-surface font-sans leading-relaxed">
          
          {/* Section 1: Acceptance */}
          <section className="bg-surface-container/40 border border-outline-variant/20 rounded-xl p-6 md:p-8 space-y-4">
            <h2 className="text-xl font-display font-semibold text-primary flex items-center gap-2">
              <FileCheck className="w-5 h-5" /> 1. Acceptance of Terms
            </h2>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
              By accessing the website at <code className="text-primary font-mono text-xs bg-surface-container-high px-2 py-0.5 rounded">https://www.print2frame.xyz</code>, accessing the fabrication portal at <code className="text-primary font-mono text-xs bg-surface-container-high px-2 py-0.5 rounded">https://portal.print2frame.xyz</code>, or commissioning any fabrication or printing orders from <strong>Print To Frame Pvt Ltd</strong> ("Print To Frame", "we", "us", or "our"), you agree to be bound by these Terms of Service.
            </p>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
              If you do not agree with any part of these terms, please do not use our website or portal services.
            </p>
          </section>

          {/* Section 2: Services & Fabrication Scope */}
          <section className="space-y-4">
            <h2 className="text-xl font-display font-semibold text-on-surface flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" /> 2. Scope of Fabrication & Printing Services
            </h2>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
              Print To Frame specializes in precision roll-formed Light Gauge Steel (LGS) framing, high-resolution digital flex printing, signboard structural fabrication, tuition class banner framing, retail display boards, and outdoor billboard systems.
            </p>
            <ul className="space-y-2 text-sm text-on-surface-variant list-disc pl-5">
              <li>All frame designs are engineered according to physical dimensions, wind tolerance parameters, and client material selections.</li>
              <li>Production timelines and turnaround estimates (e.g. 24hr express queues) are subject to timely artwork sign-off, material availability, and payment confirmation.</li>
            </ul>
          </section>

          {/* Section 3: Orders, Quotations & Payment Milestones */}
          <section className="space-y-4">
            <h2 className="text-xl font-display font-semibold text-on-surface flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" /> 3. Orders, Quotations & Payment Milestones
            </h2>
            <div className="bg-surface-container-low border border-outline-variant/30 rounded-lg p-5 space-y-3">
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Fabrication workflows operate through formal project milestones (Act 0 through Act 6):
              </p>
              <ul className="text-xs sm:text-sm text-on-surface-variant list-disc pl-5 space-y-2">
                <li><strong>Quotation & Estimations:</strong> Prices quoted are based on specified dimensions (width × height in feet), frame steel gauge, and mounting requirements. Any change in dimensions will require a revised quotation.</li>
                <li><strong>Advance Payment:</strong> Unless specified otherwise in writing, a minimum advance deposit (standard 75% advance payment) is required before raw material allocation, roll-forming, and high-volume flex printing commence.</li>
                <li><strong>Balance Settlement:</strong> Full balance settlement is mandatory upon completion and inspection, prior to dispatch or final installation on site.</li>
              </ul>
            </div>
          </section>

          {/* Section 4: Client Artwork, Specifications & Intellectual Property */}
          <section className="space-y-4">
            <h2 className="text-xl font-display font-semibold text-on-surface flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-primary" /> 4. Client Artwork & Intellectual Property
            </h2>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
              When submitting digital images, graphic vectors, or architectural blueprints:
            </p>
            <ul className="space-y-2 text-sm text-on-surface-variant list-disc pl-5">
              <li><strong>Ownership & Rights:</strong> You warrant that you own or hold the legal rights and licenses for all logos, brand imagery, text, and artwork submitted to us for printing.</li>
              <li><strong>Indemnification:</strong> You agree to indemnify and hold harmless Print To Frame Pvt Ltd against any trademark, copyright, or intellectual property claims resulting from printing artwork provided by you.</li>
              <li><strong>Proof Approval:</strong> Final digital proofs must be reviewed and approved by the customer. Print To Frame is not liable for spelling errors, color variance due to uncalibrated client monitors, or low-resolution pixelation inherent in source graphics provided.</li>
            </ul>
          </section>

          {/* Section 5: Portal Access & Google Authentication */}
          <section className="space-y-4">
            <h2 className="text-xl font-display font-semibold text-on-surface flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-primary" /> 5. Portal Access & Account Security
            </h2>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
              Authorized customers and staff members who access our ERP fabrication portal agree to:
            </p>
            <ul className="space-y-2 text-sm text-on-surface-variant list-disc pl-5">
              <li>Keep login credentials and OAuth authorization sessions secure and confidential.</li>
              <li>Notify us immediately of any unauthorized access or security breach.</li>
              <li>Not attempt to reverse-engineer, disrupt, or introduce malicious payloads into the portal or API pipelines.</li>
            </ul>
          </section>

          {/* Section 6: Warranties & Structural Limitations */}
          <section className="space-y-4">
            <h2 className="text-xl font-display font-semibold text-on-surface flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary" /> 6. Structural Warranties & Limitations of Liability
            </h2>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
              We fabricate steel structures using high-grade galvanized Light Gauge Steel designed for weather resistance. However:
            </p>
            <ul className="space-y-2 text-sm text-on-surface-variant list-disc pl-5">
              <li>Print To Frame is not liable for damages caused by extreme natural disasters, cyclones exceeding rated wind loads, unauthorized structural modifications, or improper customer-managed installations.</li>
              <li>To the maximum extent permitted by applicable law, Print To Frame's total aggregate liability for any claim shall not exceed the amount paid for the specific order under dispute.</li>
            </ul>
          </section>

          {/* Section 7: Governing Law & Jurisdiction */}
          <section className="space-y-4">
            <h2 className="text-xl font-display font-semibold text-on-surface flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary" /> 7. Governing Law & Jurisdiction
            </h2>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
              These Terms of Service are governed by and construed in accordance with the laws of the <strong>Democratic Socialist Republic of Sri Lanka</strong>. Any dispute arising out of or related to these terms shall be subject to the exclusive jurisdiction of the courts of Sri Lanka.
            </p>
          </section>

          {/* Section 8: Contact Information */}
          <section className="bg-surface-container/60 border border-outline-variant/30 rounded-xl p-6 md:p-8 space-y-4">
            <h2 className="text-xl font-display font-semibold text-primary">
              8. Inquiries & Legal Notices
            </h2>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              For any questions regarding these Terms of Service or to request official quotes and engineering certifications, please contact our administrative office:
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
