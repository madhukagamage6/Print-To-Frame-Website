import React, { useState } from 'react';
import { PortfolioItem } from '../types';
import { 
  Grid, 
  Store, 
  GraduationCap, 
  Flame, 
  ArrowRight,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Portfolio() {
  const [filter, setFilter] = useState<'All' | 'Retail Signage' | 'Educational Banners' | 'Event Backdrops'>('All');
  const [selectedSpecsItem, setSelectedSpecsItem] = useState<PortfolioItem | null>(null);

  const portfolioItems: PortfolioItem[] = [
    {
      id: 'RF-8492',
      category: 'Retail Signage',
      title: 'Flagship Store Facade',
      description: 'Precision fabrication of a multi-tiered aluminum composite sign structure engineered for high local wind loads and ultra-flush joint seams.',
      turnaround: '14 Days',
      digitalPrintImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjuCSQfCZN51nATuKzGeQXKbC_xxiV4o8RpEV0eKPQ-h1MiAO4kq1OKbTojPz_aE7SXopX4X2rDzP18QVqDUXP8CF7r6GFrvwulQZO6Bb9cXd3gLKA6fynI3ftqFOtu4JVptwz_LaHSPS3K-02259ZU8Y64xhcRP3qU6vMaOmHVLH31fBi_KFGwhdqIaOsGfNNtwDeRateGDf6ARV9emjO-k9Y_vZeB4qFhugpXVqPHCY35ZKczmlVjw',
      finalFrameImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWSeaxYR67rwH18ImgKSg1P7jOQfdI-8pJBwgLQTV_6W2mDiXQLjj4LiH8AVXTrCZ9QY0460Zyms0LZ0W1PWOVJQinQwX7ObNDYrCEScMvu7yrGZg--rcryz_FF_atLvRqU3wMNRwGkhCIa7DMAq5nJfi5jRFMFbclBVCZaH88zvObyY0DoeF5DrIZGBg8_oZu-qVY2AYNLjZfM31pwaSpmE_IztqTviS6HIWtCIU-WmIEuh4mCLqXvQ',
      digitalPrintAlt: 'Flagship store facade digital print CAD wireframe blueprints',
      finalFrameAlt: 'Completed retail store physical steel frame storefront',
    },
    {
      id: 'ED-3310',
      category: 'Educational Banners',
      title: 'Campus Wayfinding Array',
      description: 'A structural network of 15 free-standing structural banner mounts designed to withstand extreme monsoon weather while maintaining constant canvas tension.',
      turnaround: '21 Days',
      digitalPrintImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5lUuUTWtWzG9C6VHR68qFHUkPDW4qttDjU6PUsGUOLXkgEB15mDC8tvD7r39G-JBRd9RvfC0l400zIAXaih0hAPuWYztQnK_2Qbc3Nz59yhrPMkTkxao8vftXx2xYMHVj1l5bfL-AZFUgt57OuQGlr6t74AdAed1I7BL_lCPNJs6cG-V4C3t39IZOBfzTZJ1ms_ptPg8t6rdTe6LXP_qnzHnzoFEiH4G25U9PMxRpbOLe4ss94yONSg',
      finalFrameImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEQd0Bdw8lgnynzQcukGuZ_YVTkPu2m4PXqEMwWFbybOp66HSCXmL9c-kKmqvNAkqe-DvYB7on6R4LVW56mtKCC7x1LQnOzV2on-TCK8GtQOeSPrBduv1nVdIog0yVxkwNcmxbRDdrima1IoQYhEG2geTOcgOFYegVvBYF8bhzZCd3mKIOul6Fvc0by0MVats27IlthMyoDyDT7oVgHtH0bGCyVxBGq8expwTj9J-w1dd7w1IXL_7cog',
      digitalPrintAlt: 'Wayfinding banner array digital print CAD stress metrics',
      finalFrameAlt: 'Installed steel frame physical banner arrays on campus courtyard',
    },
    {
      id: 'EV-9021',
      category: 'Event Backdrops',
      title: 'Tech Summit Main Stage',
      description: 'Modular, rapid-deployment truss exoskeleton system. CNC roll-formed and designed for 4-hour quick onsite bolt assembly with high AV rigging load limits.',
      turnaround: '8 Days',
      digitalPrintImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGzsAqZpEcj5FSSHvpynTw2Nv8KsV0C-z18o_nGtZuSGzfR-q3q4ER3m28d3VIvHJmYseNDZDu7STncFl3ktgiorS22JEbeRNiWsrHClN4xmpOJeP40sr25_WJbObfFliov2sVlbKEkpD0nID3F-qQ2jOK3Lt4B9-7PiZKHrC-nzz0hF-inx1HYN55HgHSqmhK_oHJg5fa6mKh7sL7xGC2-cTvDlG32HR8bMaFWJ63ztYKJRSXFLMdOA',
      finalFrameImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIYW2SlS0ssbdXhnYxhTvVYNx7Z6AuzGsTdiWBdfM4KzSFnQDDLpcfB-gLSno2baY2-KRiln7-vdJ1KlmCw2VuP1YWvGKRdVKuYKIScfgUjidypyRysk7HJxL8ozIBoy5hoHf9RbkyANpNkXQTIxVevh_ZjV0rjs64tA7HLU9JVLAV4kBQtvnNiEvpcWvvQIB1mwyjrjc_FBFwVK2v0gW4wSQOnFEQSMx-XXeNNY1_7gKTyjByGFSRqQ',
      digitalPrintAlt: 'Stage backdrop modular truss digital blueprint CAD',
      finalFrameAlt: 'Completed massive steel truss stage backdrop in event hall',
    },
  ];

  const filteredItems = filter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Retail Signage': return <Store className="w-4 h-4 text-primary" />;
      case 'Educational Banners': return <GraduationCap className="w-4 h-4 text-primary" />;
      case 'Event Backdrops': return <Flame className="w-4 h-4 text-primary" />;
      default: return <Grid className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-24 relative">
      {/* Page Header */}
      <header className="mb-24 max-w-4xl relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 bg-primary-container rounded-full animate-pulse shadow-[0_0_10px_rgba(0,218,243,0.5)]"></div>
          <span className="font-mono text-xs text-primary-container uppercase tracking-[0.2em]">Protocol // Active</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-on-surface mb-8 tracking-tight">
          Portfolio. <span className="text-primary-container text-glow">Showcase</span>
        </h1>
        <div className="bg-surface-container-low/40 backdrop-blur-md border border-outline-variant/20 p-6 md:p-8 rounded-lg max-w-3xl">
          <p className="font-sans text-on-surface-variant text-base leading-relaxed">
            A technical showcase of structural fabrication. Highlighting the transition from digital blueprint (BIM-calculated design) to structural steel reality across retail, educational, and event sectors.
          </p>
        </div>
      </header>

      {/* Category Filters */}
      <div className="flex gap-4 mb-16 border-b border-outline-variant/20 pb-4 overflow-x-auto select-none">
        {(['All', 'Retail Signage', 'Educational Banners', 'Event Backdrops'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`pb-2 font-mono text-xs uppercase tracking-widest px-3 transition-all duration-300 relative whitespace-nowrap ${
              filter === cat 
                ? 'text-primary border-b-2 border-primary-container text-glow' 
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Portfolio projects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {filteredItems.map((item, index) => (
          <article 
            key={item.id}
            className={`glass-panel flex flex-col group relative overflow-hidden transition-all duration-300 hover:border-primary-container/40 ${
              index === 0 ? 'lg:col-span-2' : 'lg:col-span-1'
            }`}
          >
            {/* Top metadata strip */}
            <div className="p-4 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-high/20">
              <span className="font-mono text-[10px] uppercase text-primary tracking-widest flex items-center gap-2">
                {getCategoryIcon(item.category)}
                {item.category}
              </span>
              <span className="font-mono text-xs text-on-surface-variant">ID: {item.id}</span>
            </div>

            {/* Split Images: Left CAD / Right Physical */}
            <div className="p-4 border-b border-outline-variant/10">
              <div className="grid grid-cols-2 gap-4 h-48">
                {/* Digital CAD blueprint */}
                <div className="relative border border-outline-variant/20 rounded overflow-hidden group/img bg-surface-container-high">
                  <div className="absolute top-2 left-2 bg-surface-container/90 backdrop-blur px-2 py-0.5 rounded text-[9px] font-mono text-on-surface uppercase tracking-wider z-10 border border-outline-variant/30">
                    Digital Print
                  </div>
                  <img 
                    src={item.digitalPrintImg} 
                    alt={item.digitalPrintAlt} 
                    className="w-full h-full object-cover grayscale opacity-60 group-hover/img:opacity-95 transition-opacity duration-300 mix-blend-screen"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Finished Physical Steel Frame */}
                <div className="relative border border-outline-variant/20 rounded overflow-hidden group/img bg-surface-container-high">
                  <div className="absolute top-2 left-2 bg-surface-container/90 backdrop-blur px-2 py-0.5 rounded text-[9px] font-mono text-on-surface uppercase tracking-wider z-10 border border-outline-variant/30">
                    Final Frame
                  </div>
                  <img 
                    src={item.finalFrameImg} 
                    alt={item.finalFrameAlt} 
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="p-6 flex-grow flex flex-col gap-4">
              <div>
                <h3 className="font-display text-lg text-on-surface font-semibold mb-2 group-hover:text-primary-container transition-colors">
                  {item.title}
                </h3>
                <p className="font-sans text-on-surface-variant text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="flex justify-between items-end mt-auto pt-6 border-t border-outline-variant/10">
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[9px] uppercase text-outline/60">Workshop Turnaround</span>
                  <span className="font-mono text-xs text-on-surface font-medium">{item.turnaround}</span>
                </div>
                <button 
                  onClick={() => setSelectedSpecsItem(item)}
                  className="text-primary hover:text-primary-container flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  View Specs <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Specs Detail Modal */}
      <AnimatePresence>
        {selectedSpecsItem && (
          <div className="fixed inset-0 bg-surface-container-lowest/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-surface-container border border-outline-variant/30 rounded-xl max-w-2xl w-full overflow-hidden shadow-[0_0_50px_rgba(0,218,243,0.15)]"
            >
              <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
                <h3 className="font-display text-lg text-on-surface font-semibold">
                  Technical Specifications: {selectedSpecsItem.title}
                </h3>
                <button 
                  onClick={() => setSelectedSpecsItem(null)}
                  className="text-on-surface-variant hover:text-on-surface font-mono text-xs uppercase"
                >
                  Close
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-outline-variant/20 rounded p-4 bg-surface-container-low/40">
                    <span className="text-[10px] uppercase font-mono text-outline/60 block mb-1">Layout Stage Blueprint</span>
                    <img src={selectedSpecsItem.digitalPrintImg} alt="CAD drawing" className="w-full h-32 object-cover rounded border border-outline-variant/20 mix-blend-screen" />
                  </div>
                  <div className="border border-outline-variant/20 rounded p-4 bg-surface-container-low/40">
                    <span className="text-[10px] uppercase font-mono text-outline/60 block mb-1">Fabricated Exoskeleton</span>
                    <img src={selectedSpecsItem.finalFrameImg} alt="Final structure" className="w-full h-32 object-cover rounded border border-outline-variant/20" />
                  </div>
                </div>

                <div className="space-y-3 font-sans text-sm text-on-surface-variant">
                  <p><strong>BIM Engineering Data:</strong> All steel members are precision mapped in CAD/BIM software before fabrication. Wind load rating checks confirm suitability for structural installations under regional monsoon climates.</p>
                  <p><strong>Tolerance Level:</strong> Steel elements are custom roll-formed with millimeter accuracy (tolerances within +/- 1.0mm). Exoskeletons use pre-fixed heavy structural brackets to guarantee structural safety and flat flex canvas positioning.</p>
                </div>

                <div className="border-t border-outline-variant/20 pt-4 flex gap-4 font-mono text-xs">
                  <div>
                    <span className="text-outline/60 block uppercase mb-0.5">Asset ID</span>
                    <span className="text-on-surface">{selectedSpecsItem.id}</span>
                  </div>
                  <div>
                    <span className="text-outline/60 block uppercase mb-0.5">Category</span>
                    <span className="text-on-surface">{selectedSpecsItem.category}</span>
                  </div>
                  <div>
                    <span className="text-outline/60 block uppercase mb-0.5">Estimated Velocity</span>
                    <span className="text-primary-container text-glow">{selectedSpecsItem.turnaround}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
