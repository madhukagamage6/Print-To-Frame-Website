import React from 'react';
import { Page } from '../types';
import { ShieldCheck, HardHat, Zap, Layers, ChevronRight, PenTool } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16 pb-32">
        {/* Background Visuals */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 technical-grid"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
            style={{ 
              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuChXV3jbjVgup8uRIsY-VE842-FW2cyZ-lfAXh5YS_Vwz2IyiAYFbb02c8xn2NfWyNgiTqAIAXJoYjfLXsee3rtQP6p3N4URiMdHIVMjfSsycJjDBawk11z7wFKz4iMTZrxhpX84dOF4ycVGwrOZX63w3SWU2MlzIgO1YGWWJyJJyRaCMWyFS8ZtF-8-NUlLFI2vl3gAB3aAOo6QDJ_EGaYAkGVpLXX3NgoNduTU2OZe_cctMhky90hRQ")' 
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/50 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl px-6 md:px-12 text-left w-full mx-auto flex flex-col items-start">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs text-primary-container tracking-[0.2em] uppercase mb-4 block"
          >
            Digital Flex Printing & Custom Steel Frame Fabrication
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl text-on-surface mb-6 tracking-tight leading-tight max-w-4xl"
          >
            High-Impact Digital <span className="text-primary-container text-glow">Prints</span> & Precision Steel Frames.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-on-surface-variant text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed"
          >
            Professional steel frame fabrication and flex fixing for business billboards, tuition class banners, and event backdrops. Custom-built in Kadawatha with BIM/LGSF accuracy.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button 
              onClick={() => onNavigate('pipeline')}
              className="w-full sm:w-auto bg-primary-container text-on-primary-container font-mono text-xs uppercase tracking-wider px-8 py-4 rounded-md font-semibold hover:bg-primary-fixed hover:shadow-[0_0_20px_rgba(0,218,243,0.4)] transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Request a Project Estimate
            </button>
            <button 
              onClick={() => onNavigate('process')}
              className="w-full sm:w-auto bg-transparent text-primary border border-outline-variant hover:border-primary-container hover:bg-primary/5 px-8 py-4 rounded-md font-mono text-xs uppercase tracking-wider transition-all duration-300"
            >
              Explore the Technology
            </button>
          </motion.div>
        </div>
      </section>

      {/* Advantage Section */}
      <section className="py-24 bg-surface-container-lowest border-t border-outline-variant/20 relative">
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-20">
            <span className="font-mono text-xs text-primary-container tracking-widest uppercase block mb-3">Industrial Superiority</span>
            <h2 className="font-display text-3xl md:text-4xl text-on-surface mb-4 uppercase tracking-tight">The Print To Frame Advantage</h2>
            <div className="h-1 w-24 bg-primary-container mx-auto rounded-full shadow-[0_0_8px_rgba(0,218,243,0.5)]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4">
            {/* Card 1 - Primary Feature (Large) */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-panel p-6 md:p-8 flex flex-col justify-between group hover:border-primary-container/40 transition-all duration-300 lg:col-span-2 lg:row-span-2 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/10 blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-surface-container-high rounded-xl border border-outline-variant/30 flex items-center justify-center mb-6 group-hover:bg-primary-container/10 group-hover:border-primary-container/30 transition-all duration-300">
                  <PenTool className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-mono text-xs text-primary tracking-wider uppercase mb-3">Custom Fabrication</h3>
                <h4 className="text-3xl sm:text-4xl font-display text-on-surface mb-4 leading-tight">Tailored steel frames<br/><span className="font-bold">for any scale.</span></h4>
                <p className="font-sans text-on-surface-variant text-sm leading-relaxed mb-6 max-w-sm">
                  From small shop signs to massive roadside business billboards, we construct the physical backbone of your brand visibility.
                </p>
              </div>
              <div className="relative z-10 mt-auto pt-6 border-t border-outline-variant/10 text-right font-mono text-xs text-outline/40">SYS: 01</div>
            </motion.div>

            {/* Card 2 - Standard Size */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-panel p-6 flex flex-col group hover:border-primary-container/40 transition-all duration-300 lg:col-span-1 lg:row-span-1"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 bg-surface-container-high rounded-xl border border-outline-variant/30 flex items-center justify-center group-hover:bg-primary-container/10 group-hover:border-primary-container/30 transition-all duration-300">
                  <Layers className="w-5 h-5 text-primary" />
                </div>
                <span className="font-mono text-[10px] text-primary bg-primary/10 px-2 py-1 rounded-full uppercase">FIT: 100%</span>
              </div>
              <h3 className="font-mono text-xs text-on-surface font-bold tracking-wider uppercase mb-2">Precision Flex Fixing</h3>
              <p className="font-sans text-on-surface-variant text-xs leading-relaxed mt-auto">
                Expert mounting of digital prints onto engineered exoskeleton frames for a wrinkle-free, professional finish.
              </p>
            </motion.div>

            {/* Card 3 - Tall (Data Stream style) */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-panel p-6 flex flex-col group hover:border-primary-container/40 transition-all duration-300 lg:col-span-1 lg:row-span-2 bg-primary-container text-on-primary-container border-none"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs uppercase tracking-widest font-bold">Rapid Delivery</h3>
                <Zap className="w-5 h-5 opacity-50" />
              </div>
              <div className="space-y-4 mb-8">
                <div className="h-1 bg-on-primary-container/20 w-full rounded-full overflow-hidden"><div className="h-full bg-on-primary-container w-4/5"></div></div>
                <div className="h-1 bg-on-primary-container/20 w-full rounded-full overflow-hidden"><div className="h-full bg-on-primary-container w-2/5"></div></div>
                <div className="h-1 bg-on-primary-container/20 w-full rounded-full overflow-hidden"><div className="h-full bg-on-primary-container w-3/5"></div></div>
              </div>
              <p className="font-sans text-on-primary-container/80 text-sm leading-relaxed mb-6">
                Fast turnaround times designed to meet tight business launches, class timetables, and event deadlines.
              </p>
              <div className="mt-auto pt-6 border-t border-on-primary-container/20">
                <p className="text-4xl font-mono font-bold">24<span className="text-lg opacity-50">HR</span></p>
                <p className="text-[10px] opacity-70 mt-1 uppercase">SME Express Queue</p>
              </div>
            </motion.div>

            {/* Card 4 - Standard Size */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-panel p-6 flex flex-col group hover:border-primary-container/40 transition-all duration-300 lg:col-span-1 lg:row-span-1"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 bg-surface-container-high rounded-xl border border-outline-variant/30 flex items-center justify-center group-hover:bg-primary-container/10 group-hover:border-primary-container/30 transition-all duration-300">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <span className="font-mono text-[10px] text-primary bg-primary/10 px-2 py-1 rounded-full uppercase">OPT: MAX</span>
              </div>
              <h3 className="font-mono text-xs text-on-surface font-bold tracking-wider uppercase mb-2">Transparent Pricing</h3>
              <p className="font-sans text-on-surface-variant text-xs leading-relaxed mt-auto">
                Accurate, material-exact cost estimation based on physical dimensions, wind loads, and frame steel volume.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Overview Banner */}
      <section className="py-20 bg-surface border-t border-outline-variant/10 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <span className="font-mono text-xs text-primary-container tracking-wider uppercase block mb-3">BIM to Roll-Forming</span>
            <h2 className="font-display text-2xl md:text-3xl text-on-surface mb-6 tracking-tight">
              We structuralize your visibility. From digital pixels to LGS steel structures.
            </h2>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed mb-8">
              Every signboard we deliver goes through full engineering layout calculations. In our fabrication workshop, LGS (Light Gauge Steel) machines bend and roll steel elements exactly to specifications. This ensures maximum weather stability, rust resistance, and easy final mounting.
            </p>
            <button 
              onClick={() => onNavigate('capabilities')}
              className="inline-flex items-center gap-2 text-primary hover:text-primary-container font-mono text-xs uppercase tracking-wider transition-colors"
            >
              See Structural Specifications <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-video rounded-xl overflow-hidden border border-outline-variant/30 relative">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDD5KvhNLYnu_Nv7AfoLx1aIsajMrhd1Y4raQvWCfrdM1ML1OV9t4F1z53FhcHPaRmbighWzOxxi3A2iWYxko93nzrWj1yTI-VewF_6hrDuiNYHJpJyWqr5Rg7Mt0pIS3MQVAFoEg4tC0P9gj8V1sMpQTJFkJH87Su7bRytrs2lk_zZzrRGwdrBXSnD1ZuSEbB5iX8dkdFWw1AyxGCXA6FKr0py842AxVby28fEUg8WAif_gGu6zrLtVw" 
                alt="Roll forming structure" 
                className="w-full h-full object-cover mix-blend-luminosity opacity-80"
              />
              <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
