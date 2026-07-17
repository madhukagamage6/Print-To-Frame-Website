import React, { useState } from 'react';
import { PipelineStep, Page } from '../types';
import { 
  QrCode, 
  Users, 
  Coins, 
  Warehouse, 
  Hammer, 
  Truck, 
  Briefcase, 
  LockKeyhole,
  CheckCircle2,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProcessProps {
  onNavigate: (page: Page) => void;
}

export default function Process({ onNavigate }: ProcessProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps: PipelineStep[] = [
    {
      act: 'ACT.01',
      displayNum: '00',
      title: 'Trigger Scan',
      description: 'The customer journey initiates when a potential client scans a unique QR code provided by one of our referral partners (Agents). This logs the lead in our pipeline.',
      icon: 'QrCode',
    },
    {
      act: 'ACT.02',
      displayNum: '01',
      title: 'Customer Engagement',
      description: 'A Business Executive contacts the customer to define the project dimensions, structural needs, provide pricing, and formalize the job within our operational system.',
      role: 'Biz Exec',
      icon: 'Users',
    },
    {
      act: 'ACT.03',
      displayNum: '02',
      title: 'Pickup & 75% Advance',
      description: 'A Logistics Executive travels to the customer to collect the raw physical banner material and secure the 75% advance deposit payment required to trigger roll-forming fabrication.',
      role: 'Logistics Exec',
      icon: 'Coins',
    },
    {
      act: 'ACT.04',
      displayNum: '03',
      title: 'Warehouse Handover',
      description: 'The Logistics Exec delivers the raw banner and cash/payment to the warehouse. This logging action automatically releases the commission payment for the referring Agent.',
      role: 'Logistics Exec',
      icon: 'Warehouse',
    },
    {
      act: 'ACT.05',
      displayNum: '04',
      title: 'Fabrication & Quality Control',
      description: 'Our automated LGS roll-forming machines roll-out the custom exoskeleton elements. The physical flex banner is then professionally flex-fixed to ensure a flawless, rigid structure.',
      icon: 'Hammer',
    },
    {
      act: 'ACT.06',
      displayNum: '05',
      title: 'Final Mile Delivery',
      description: 'The Logistics Exec delivers the completed steel-framed structure to the client site, captures photographic evidence of handover, and logs the pickup verification.',
      role: 'Logistics Exec',
      icon: 'Truck',
    },
    {
      act: 'ACT.07',
      displayNum: '06',
      title: 'The Hard Close',
      description: 'The Logistics Exec remits the final 25% payment to the office. The Biz Exec verifies the funds and executes the "Hard Close" in the system, finalizing the transaction immutably in Google Sheets.',
      role: 'Biz Exec',
      icon: 'LockKeyhole',
    },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'QrCode': return <QrCode className="w-6 h-6 text-primary-container text-glow" />;
      case 'Users': return <Users className="w-6 h-6 text-primary-container text-glow" />;
      case 'Coins': return <Coins className="w-6 h-6 text-primary-container text-glow" />;
      case 'Warehouse': return <Warehouse className="w-6 h-6 text-primary-container text-glow" />;
      case 'Hammer': return <Hammer className="w-6 h-6 text-primary-container text-glow" />;
      case 'Truck': return <Truck className="w-6 h-6 text-primary-container text-glow" />;
      case 'LockKeyhole': return <LockKeyhole className="w-6 h-6 text-primary-container text-glow" />;
      default: return <Briefcase className="w-6 h-6 text-primary-container text-glow" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 md:px-12 pt-12 pb-24 relative">
      {/* Top Header */}
      <header className="mb-20 max-w-3xl">
        <span className="font-mono text-xs text-primary-container tracking-[0.2em] uppercase mb-4 block">
          Service Delivery Protocol // Active
        </span>
        <h1 className="font-display text-4xl sm:text-5xl text-on-surface mb-6 tracking-tight">
          The 7-Act <span className="text-primary-container text-glow">Operational</span> Pipeline
        </h1>
        <p className="font-sans text-on-surface-variant text-base sm:text-lg leading-relaxed">
          A rigorous, end-to-end service delivery model. From initial referral scan to final payment verification, every stage is tracked, engineered, and executed with precision to guarantee seamless handover.
        </p>
      </header>

      {/* Interactive Timeline Pipeline Layout */}
      <div className="relative">
        {/* Center Line for Desktop Timeline */}
        <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary-container/40 via-outline-variant/20 to-transparent transform -translate-x-1/2 pointer-events-none hidden md:block"></div>
        <div className="absolute left-[30px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary-container/40 via-outline-variant/20 to-transparent pointer-events-none md:hidden"></div>

        <div className="space-y-12">
          {steps.map((step, idx) => {
            const isLeft = idx % 2 === 0;
            const isOpen = activeStep === idx;

            return (
              <motion.div 
                key={step.act}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`flex flex-col md:flex-row relative ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
              >
                {/* Timeline node icon */}
                <div 
                  className="absolute left-[30px] md:left-1/2 w-12 h-12 rounded-lg bg-surface-container-high border border-primary-container/50 shadow-[0_0_15px_rgba(0,218,243,0.2)] flex items-center justify-center transform -translate-x-1/2 z-20 cursor-pointer hover:scale-110 transition-transform duration-300"
                  onClick={() => setActiveStep(isOpen ? null : idx)}
                >
                  {getIcon(step.icon)}
                </div>

                {/* Step content card */}
                <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div 
                    onClick={() => setActiveStep(isOpen ? null : idx)}
                    className="glass-panel p-6 hover:border-primary-container/40 transition-all duration-300 shadow-[0_0_15px_rgba(0,218,243,0.05)] cursor-pointer select-none group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="font-mono text-[10px] text-primary/70 tracking-widest block uppercase mb-1">
                          {step.act}
                        </span>
                        <h2 className="font-display text-lg text-on-surface font-semibold group-hover:text-primary-container transition-colors">
                          {step.title}
                        </h2>
                      </div>
                      <span className="font-display text-2xl font-bold text-outline-variant/40 group-hover:text-primary-container/20 transition-colors">
                        {step.displayNum}
                      </span>
                    </div>

                    <p className="font-sans text-on-surface-variant text-sm leading-relaxed mb-4">
                      {step.description}
                    </p>

                    {/* Role Tag & Expand Toggle */}
                    <div className="flex justify-between items-center pt-4 border-t border-outline-variant/10">
                      {step.role ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-highest/50 border border-outline-variant/30 rounded text-[11px] font-mono text-primary uppercase">
                          Role: {step.role}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-highest/20 border border-outline-variant/10 rounded text-[11px] font-mono text-outline uppercase">
                          System Automated
                        </span>
                      )}

                      <span className="text-outline-variant group-hover:text-primary-container transition-colors">
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </span>
                    </div>

                    {/* Expanded details */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-4 border-t border-outline-variant/10 space-y-3 font-mono text-[11px] text-on-surface-variant">
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
                              <span>Target Verification: Completed immediately via pipeline sync.</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
                              <span>Associated Tooling: Google Drive (receipt storage) & Google Sheets (ledger log).</span>
                            </div>
                            {step.role && (
                              <div className="p-3 bg-surface-container-lowest/80 rounded border border-outline-variant/20 mt-2 font-sans text-xs">
                                <strong>Role Mandate:</strong> The {step.role} must review details inside the Order Management System, update active statuses with clients, and finalize cash receipts or design file assets securely.
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA to dashboard */}
      <div className="mt-20 text-center">
        <div className="glass-panel p-8 max-w-2xl mx-auto">
          <h3 className="font-display text-lg text-on-surface font-semibold mb-2">Track & Execute Orders Live</h3>
          <p className="font-sans text-on-surface-variant text-sm mb-6">
            All 7 acts are wired directly to our Google Workspace ERP pipeline. Sign in to view, create, or update active orders now.
          </p>
          <button 
            onClick={() => onNavigate('pipeline')}
            className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container font-mono text-xs uppercase tracking-wider px-6 py-3 rounded hover:bg-primary-fixed hover:shadow-[0_0_15px_rgba(0,218,243,0.3)] transition-all duration-300"
          >
            Open Live Pipeline <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
