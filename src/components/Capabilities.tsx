import React, { useState } from 'react';
import { Page } from '../types';
import { 
  Server, 
  Zap, 
  Truck, 
  Handshake, 
  Cpu, 
  Crosshair, 
  CheckCircle2, 
  XCircle,
  Users,
  Clock,
  Tag,
  Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CapabilitiesProps {
  onNavigate: (page: Page) => void;
}

export default function Capabilities({ onNavigate }: CapabilitiesProps) {
  const [activeTab, setActiveTab] = useState<'system' | 'clients' | 'printers'>('system');

  const marketComparisons = [
    { feature: 'Operational Speed', analog: 'Paralyzed by manual estimations and subjective lead times.', p2f: 'Real-time algorithmic quoting and surgical execution.' },
    { feature: 'Documentation & Compliance', analog: 'Choked by paper receipts, manual ledgers, and audit risk.', p2f: '0-Paper Policy; RAMIS-compliant digital data permanence.' },
    { feature: 'Technical Precision', analog: 'Reliant on the volatile availability of "master welders".', p2f: 'Protocol-driven assembly through systematic "deskilling".' },
    { feature: 'Rust Protection', analog: 'Reliance on inferior, hand-applied zinc phosphate primers.', p2f: 'Zinc Preservation strategy; maintaining factory-grade coatings.' },
    { feature: 'Pricing Structure', analog: 'Vague, "all-inclusive" quotes with hidden industrial markups.', p2f: 'Transparent, React-based algorithmic certainty.' },
    { feature: 'Logistics', analog: 'A "delivery nightmare" externalized to the client.', p2f: 'Integrated, doorstep delivery as a core service pillar.' }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-24 relative">
      {/* Header */}
      <div className="w-full mb-12 relative text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-3 h-3 bg-primary-container rounded-full animate-pulse shadow-[0_0_10px_rgba(0,218,243,0.6)]"></div>
          <span className="font-mono text-xs text-primary-container text-glow uppercase tracking-widest">Operational Intelligence // Active</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-on-surface mb-6 tracking-tight">
          Why <span className="text-primary-container text-glow">Print2Frame?</span>
        </h1>
        <p className="font-sans text-on-surface-variant text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          The traditional fabrication shop is an industrial liability. We are a Strategic Visionary Digital Systematic Executor, 
          replacing manual guesswork with an AI-orchestrated operating system designed for the digital-industrial shift.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-16 border-b border-outline-variant/20 pb-px">
        <button 
          onClick={() => setActiveTab('system')}
          className={`px-4 sm:px-8 py-4 font-mono text-xs sm:text-sm uppercase tracking-widest transition-all border-b-2 ${activeTab === 'system' ? 'border-primary-container text-primary-container text-glow bg-primary-container/5' : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50'}`}
        >
          Our System
        </button>
        <button 
          onClick={() => setActiveTab('clients')}
          className={`px-4 sm:px-8 py-4 font-mono text-xs sm:text-sm uppercase tracking-widest transition-all border-b-2 ${activeTab === 'clients' ? 'border-primary-container text-primary-container text-glow bg-primary-container/5' : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50'}`}
        >
          For Clients
        </button>
        <button 
          onClick={() => setActiveTab('printers')}
          className={`px-4 sm:px-8 py-4 font-mono text-xs sm:text-sm uppercase tracking-widest transition-all border-b-2 ${activeTab === 'printers' ? 'border-primary-container text-primary-container text-glow bg-primary-container/5' : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50'}`}
        >
          For Printers
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'system' && (
            <motion.div 
              key="system"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              <div>
                <h2 className="font-display text-2xl text-on-surface mb-8 font-semibold border-b border-outline-variant/20 pb-4">
                  Core Strategic Advantages
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-surface-container-low border border-outline-variant/30 p-8 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:border-primary-container/40 transition-all flex flex-col">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-high border border-outline-variant/50 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,218,243,0.05)]">
                      <Server className="w-6 h-6 text-primary-container" />
                    </div>
                    <h3 className="font-display text-xl text-on-surface font-semibold mb-1">Digital Sovereignty</h3>
                    <span className="font-mono text-xs text-primary-container uppercase tracking-wider mb-4 block">0-Paper AI-Orchestrated Ecosystem</span>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                      We eliminate "analog friction". Our proprietary print2frame.com system ensures absolute data permanence, real-time tracking, and instant algorithmic quoting, aligning with 2026 fiscal compliances.
                    </p>
                  </div>
                  <div className="bg-surface-container-low border border-outline-variant/30 p-8 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:border-primary-container/40 transition-all flex flex-col">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-high border border-outline-variant/50 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,218,243,0.05)]">
                      <Crosshair className="w-6 h-6 text-primary-container" />
                    </div>
                    <h3 className="font-display text-xl text-on-surface font-semibold mb-1">Surgical Precision</h3>
                    <span className="font-mono text-xs text-primary-container uppercase tracking-wider mb-4 block">Bifurcated Manufacturing Protocols</span>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                      We match material specifications to exact square-footage thresholds (0.9mm for &lt;100 sq.ft. vs 1.2mm heavy-duty). This binary logic prevents over-engineering and surgicalizes costs.
                    </p>
                  </div>
                  <div className="bg-surface-container-low border border-outline-variant/30 p-8 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:border-primary-container/40 transition-all flex flex-col">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-high border border-outline-variant/50 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,218,243,0.05)]">
                      <Zap className="w-6 h-6 text-primary-container" />
                    </div>
                    <h3 className="font-display text-xl text-on-surface font-semibold mb-1">Zinc Preservation</h3>
                    <span className="font-mono text-xs text-primary-container uppercase tracking-wider mb-4 block">The "No-Primer" Advantage</span>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                      By minimizing the Heat-Affected Zone (HAZ), we preserve the factory-applied hot-dip zinc coating. This eliminates 24-hour primer drying times and guarantees a pristine, rust-free finish.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl text-on-surface mb-8 font-semibold border-b border-outline-variant/20 pb-4">
                  The Analog Myth vs. The Print2Frame Reality
                </h2>
                <div className="bg-surface-container border border-outline-variant/30 rounded-xl overflow-hidden shadow-2xl">
                  <div className="grid grid-cols-1 lg:grid-cols-12 bg-surface-container-high border-b border-outline-variant/30 text-xs font-mono uppercase tracking-wider text-outline/80 p-4">
                    <div className="lg:col-span-3 mb-2 lg:mb-0">Strategic Feature</div>
                    <div className="lg:col-span-4 lg:pl-6 mb-2 lg:mb-0 text-error/80 flex items-center gap-2">The Analog Myth (Traditional)</div>
                    <div className="lg:col-span-5 lg:pl-6 text-primary-container flex items-center gap-2">The Print2Frame Reality</div>
                  </div>
                  
                  <div className="divide-y divide-outline-variant/15">
                    {marketComparisons.map((row, idx) => (
                      <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 p-4 lg:p-6 items-start hover:bg-surface-container-highest/20 transition-colors">
                        <div className="lg:col-span-3 font-display font-medium text-on-surface mb-3 lg:mb-0">
                          {row.feature}
                        </div>
                        <div className="lg:col-span-4 lg:pl-6 lg:border-l border-outline-variant/20 flex items-start gap-3 mb-3 lg:mb-0">
                          <XCircle className="w-5 h-5 text-error/70 flex-shrink-0 mt-0.5" />
                          <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                            {row.analog}
                          </p>
                        </div>
                        <div className="lg:col-span-5 lg:pl-6 lg:border-l border-outline-variant/20 flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <p className="font-sans text-sm text-on-surface leading-relaxed font-medium">
                            {row.p2f}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'clients' && (
            <motion.div 
              key="clients"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              <div>
                <h2 className="font-display text-2xl text-on-surface mb-8 font-semibold border-b border-outline-variant/20 pb-4">
                  Client Benefits
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-surface-container-low border border-outline-variant/30 p-8 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:border-primary-container/40 transition-all flex flex-col">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-high border border-outline-variant/50 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,218,243,0.05)]">
                      <Zap className="w-6 h-6 text-primary-container" />
                    </div>
                    <h3 className="font-display text-xl text-on-surface font-semibold mb-1">Zinc Preservation</h3>
                    <span className="font-mono text-xs text-primary-container uppercase tracking-wider mb-4 block">The "No-Primer" Advantage</span>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                      Coastal environments destroy inferior frames. By minimizing the Heat-Affected Zone (HAZ) during assembly, we preserve the factory-applied hot-dip zinc coating. This guarantees a pristine, rust-free finish that will never bleed onto your clean prints.
                    </p>
                  </div>
                  <div className="bg-surface-container-low border border-outline-variant/30 p-8 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:border-primary-container/40 transition-all flex flex-col">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-high border border-outline-variant/50 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,218,243,0.05)]">
                      <Crosshair className="w-6 h-6 text-primary-container" />
                    </div>
                    <h3 className="font-display text-xl text-on-surface font-semibold mb-1">Surgical Precision</h3>
                    <span className="font-mono text-xs text-primary-container uppercase tracking-wider mb-4 block">No Over-Engineering</span>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                      We match material specifications strictly to your square-footage. Small boards get agile, cost-effective frames, while large hoardings receive heavy-duty structural steel. You never pay for unnecessary weight.
                    </p>
                  </div>
                  <div className="bg-surface-container-low border border-outline-variant/30 p-8 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:border-primary-container/40 transition-all flex flex-col">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-high border border-outline-variant/50 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,218,243,0.05)]">
                      <Truck className="w-6 h-6 text-primary-container" />
                    </div>
                    <h3 className="font-display text-xl text-on-surface font-semibold mb-1">Frictionless Logistics</h3>
                    <span className="font-mono text-xs text-primary-container uppercase tracking-wider mb-4 block">Pickup to Doorstep</span>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                      Enjoy free delivery. We pick up the flex banner from your location, perform the fabrication in our workshop, and transport the finished frame back to your designated drop spot.
                    </p>
                  </div>
                  <div className="bg-surface-container-low border border-outline-variant/30 p-8 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:border-primary-container/40 transition-all flex flex-col">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-high border border-outline-variant/50 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,218,243,0.05)]">
                      <Tag className="w-6 h-6 text-primary-container" />
                    </div>
                    <h3 className="font-display text-xl text-on-surface font-semibold mb-1">Dynamic Pricing & Discounts</h3>
                    <span className="font-mono text-xs text-primary-container uppercase tracking-wider mb-4 block">Cost-Optimized System</span>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                      Our dynamic pricing offers a lower rate per square foot for larger frames. Plus, clients coming through a partner referral receive an exclusive 15% to 20% discount on the final invoice.
                    </p>
                  </div>
                  <div className="bg-surface-container-low border border-outline-variant/30 p-8 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:border-primary-container/40 transition-all flex flex-col">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-high border border-outline-variant/50 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,218,243,0.05)]">
                      <Clock className="w-6 h-6 text-primary-container" />
                    </div>
                    <h3 className="font-display text-xl text-on-surface font-semibold mb-1">24-Hour Turnaround</h3>
                    <span className="font-mono text-xs text-primary-container uppercase tracking-wider mb-4 block">With Real-Time Tracking</span>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                      We provide a rapid 24-hour completion time for single jobs. You will receive live status updates directly to your mobile phone throughout the entire fabrication process.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl text-on-surface mb-8 font-semibold border-b border-outline-variant/20 pb-4">
                  Intercepting Market Inefficiencies
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-panel p-8 border-t-2 border-t-primary-container">
                    <h3 className="font-display text-lg text-on-surface font-semibold mb-2">The Industrial Welder Conflict</h3>
                    <span className="font-mono text-xs text-error uppercase tracking-wider mb-4 block">The "Nuisance" Gap</span>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                      General welders view retail signage as a nuisance, applying artificial markups and using inferior mild steel to cover their hassle. We treat your frame as a specialized product. Our strict use of Galvanized Iron and factory-direct protocols entirely eliminates this penalty markup.
                    </p>
                  </div>
                  <div className="glass-panel p-8 border-t-2 border-t-primary-container">
                    <h3 className="font-display text-lg text-on-surface font-semibold mb-2">The Analog Workshop Risk</h3>
                    <span className="font-mono text-xs text-error uppercase tracking-wider mb-4 block">The Quality Gap</span>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                      Analog shops use high-heat manual arc welding, causing metal distortion and rust bleeding that ruins white canvas prints. Our Agile Glue Protocol completely eliminates heat distortion and ensures drum-tight canvas stretching, every single time.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'printers' && (
            <motion.div 
              key="printers"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              <div>
                <h2 className="font-display text-2xl text-on-surface mb-8 font-semibold border-b border-outline-variant/20 pb-4">
                  Agent Benefits
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-surface-container-low border border-outline-variant/30 p-8 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:border-primary-container/40 transition-all flex flex-col">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-high border border-outline-variant/50 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,218,243,0.05)]">
                      <Handshake className="w-6 h-6 text-primary-container" />
                    </div>
                    <h3 className="font-display text-xl text-on-surface font-semibold mb-1">Financial Sovereignty</h3>
                    <span className="font-mono text-xs text-primary-container uppercase tracking-wider mb-4 block">The Fabrication Margin</span>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                      We act as an industrial node, offering direct-from-factory wholesale rates (LKR 275/sq.ft). This allows you to stay comfortably under the LKR 350 market ceiling while keeping the fabrication margin for yourself.
                    </p>
                  </div>
                  <div className="bg-surface-container-low border border-outline-variant/30 p-8 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:border-primary-container/40 transition-all flex flex-col">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-high border border-outline-variant/50 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,218,243,0.05)]">
                      <Cpu className="w-6 h-6 text-primary-container" />
                    </div>
                    <h3 className="font-display text-xl text-on-surface font-semibold mb-1">Labor Neutralization</h3>
                    <span className="font-mono text-xs text-primary-container uppercase tracking-wider mb-4 block">Deskilling Assembly</span>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                      We bypass the skilled labor shortage. Our protocols replace complex welding with logic-driven assembly (Cyanoacrylate glue & Wood Beading), ensuring flawless high-speed execution without relying on master welders.
                    </p>
                  </div>
                  <div className="bg-surface-container-low border border-outline-variant/30 p-8 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:border-primary-container/40 transition-all flex flex-col">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-high border border-outline-variant/50 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,218,243,0.05)]">
                      <Truck className="w-6 h-6 text-primary-container" />
                    </div>
                    <h3 className="font-display text-xl text-on-surface font-semibold mb-1">Frictionless Logistics</h3>
                    <span className="font-mono text-xs text-primary-container uppercase tracking-wider mb-4 block">Algorithmic Doorstep Delivery</span>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                      We solve the physical bottleneck of rigid steel frames. Our algorithm seamlessly integrates transport, allowing you to offer a direct-to-client experience without ever investing in flatbed truck overheads.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl text-on-surface mb-8 font-semibold border-b border-outline-variant/20 pb-4">
                  Intercepting Market Inefficiencies
                </h2>
                <div className="glass-panel p-8 border-t-2 border-t-primary-container">
                  <h3 className="font-display text-lg text-on-surface font-semibold mb-2">The Integrated Agency Bottleneck</h3>
                  <span className="font-mono text-xs text-error uppercase tracking-wider mb-4 block">The Markup Gap</span>
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed max-w-4xl">
                    Integrated agencies act as middlemen, charging a market ceiling of LKR 450 per sq.ft. We identify a "Fabrication Gap" of LKR 350.00 per sq.ft. (the difference between retail print costs and the agency ceiling). Through our ecosystem, we provide digital printers with a wholesale rate of LKR 275 per sq.ft., allowing you, the printer, to capture the margin while the end-client bypasses heavy agency overheads.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA Section */}
      <div className="w-full mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Become an Agent CTA */}
          <div className="flex flex-col justify-center items-center text-center gap-6 px-8 py-12 bg-surface-container border border-outline-variant/30 relative overflow-hidden rounded-xl hover:border-primary-container/50 transition-colors">
            <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none"></div>
            
            <div className="z-10 max-w-sm space-y-3">
              <span className="font-mono text-xs text-primary-container tracking-wider uppercase block">
                Agent Network Integration
              </span>
              <h2 className="text-on-surface font-display text-2xl font-semibold tracking-tight">
                Ready to Capture the Margin?
              </h2>
              <p className="text-on-surface-variant font-sans text-sm leading-relaxed">
                Integrate into the Print2Frame ecosystem to descale your liabilities and supercharge your production speed as an official agent.
              </p>
            </div>

            <button 
              onClick={() => onNavigate('contact')}
              className="z-10 flex items-center justify-center gap-2 rounded-md h-12 px-8 bg-primary-container text-on-primary-container font-mono text-xs uppercase tracking-wider font-semibold hover:bg-primary-fixed hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(0,218,243,0.4)]"
            >
              <Users className="w-4 h-4" />
              Become an Agent
            </button>
          </div>

          {/* Call Us CTA */}
          <div className="flex flex-col justify-center items-center text-center gap-6 px-8 py-12 bg-surface-container border border-outline-variant/30 relative overflow-hidden rounded-xl hover:border-primary-container/50 transition-colors">
            <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none"></div>
            
            <div className="z-10 max-w-sm space-y-3">
              <span className="font-mono text-xs text-primary-container tracking-wider uppercase block">
                Direct Fabrication Services
              </span>
              <h2 className="text-on-surface font-display text-2xl font-semibold tracking-tight">
                Ready to bring your print to life?
              </h2>
              <p className="text-on-surface-variant font-sans text-sm leading-relaxed">
                If there is a print, we make the frame. Connect with us directly to get your signage fabricated with surgical precision.
              </p>
            </div>

            <button 
              onClick={() => onNavigate('contact')}
              className="z-10 flex items-center justify-center gap-2 rounded-md h-12 px-8 bg-surface-container-high border border-outline-variant/50 text-on-surface font-mono text-xs uppercase tracking-wider font-semibold hover:bg-surface-container-highest hover:scale-[1.02] transition-all"
            >
              <Zap className="w-4 h-4" />
              Call us now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
