import React, { useState, useEffect } from 'react';
import { Page } from './types';
import Home from './components/Home';
import Process from './components/Process';
import Capabilities from './components/Capabilities';
import Portfolio from './components/Portfolio';
import PipelineDashboard from './components/PipelineDashboard';
import ContactUs from './components/ContactUs';
import { initAuth, googleSignIn, logout } from './lib/workspace';
import { User as FirebaseUser } from 'firebase/auth';
import { 
  Menu, 
  X, 
  Phone, 
  MapPin, 
  ArrowUpRight, 
  Layers, 
  FileSpreadsheet, 
  User as UserIcon,
  ChevronRight,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Authentication State
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    // Initialize Auth Listener on mount
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        setIsLoggingIn(false);
      },
      () => {
        setUser(null);
        setToken(null);
        setIsLoggingIn(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
      }
    } catch (err) {
      console.error('Google authorization failed:', err);
      throw err;
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setToken(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const navigateTo = (page: Page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans relative flex flex-col selection:bg-primary-container/30 selection:text-primary-container">
      {/* Background Matrix-styled line layout */}
      <div className="absolute inset-0 technical-grid opacity-15 pointer-events-none z-0"></div>

      {/* Global Top Operations Bar */}
      <div className="bg-surface-container-lowest/80 backdrop-blur border-b border-outline-variant/10 text-[10px] sm:text-xs font-mono text-outline/80 relative z-40 py-2.5 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="hidden lg:flex items-center gap-1.5 uppercase tracking-widest text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-ping"></span>
            SYS: ACTIVE
          </span>
          <span className="hidden xl:flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-primary-container shrink-0" />
            <span className="truncate max-w-[250px]">No. 58/33 Church Road, Eldeniya, Kadawatha, Sri Lanka.</span>
          </span>
          <span className="hidden md:flex items-center gap-1.5">
            <Mail className="w-3 h-3 text-primary-container shrink-0" />
            info@print2frame.xyz
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="w-3 h-3 text-primary-container shrink-0" />
            +94 71 141 9027
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span>PORT: 3000</span>
          {user ? (
            <span className="text-primary-container flex items-center gap-1.5 uppercase tracking-widest text-[10px]">
              <UserIcon className="w-3 h-3" />
              {user.displayName || 'Authorized'}
            </span>
          ) : (
            <span className="text-outline/40 uppercase tracking-widest text-[9px]">GUEST_PROT // CLOSED</span>
          )}
        </div>
      </div>

      {/* Primary Navigation Bar */}
      <nav className="sticky top-0 z-40 glass-panel border-b border-outline-variant/25 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          {/* Logo / Brand */}
          <div 
            onClick={() => navigateTo('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img 
              src="https://drive.google.com/uc?export=view&id=1JhI1uYBGhpDOREzCj-Xau-Tdom0VfNQn" 
              alt="Print2Frame Logo" 
              className="h-10 sm:h-12 object-contain filter drop-shadow-[0_0_8px_rgba(0,218,243,0.3)] transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(0,218,243,0.6)]" 
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => navigateTo('home')}
              className={`font-mono text-xs uppercase tracking-widest transition-colors ${
                activePage === 'home' ? 'text-primary font-semibold text-glow' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => navigateTo('process')}
              className={`font-mono text-xs uppercase tracking-widest transition-colors ${
                activePage === 'process' ? 'text-primary font-semibold text-glow' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Our Process
            </button>
            <button 
              onClick={() => navigateTo('capabilities')}
              className={`font-mono text-xs uppercase tracking-widest transition-colors ${
                activePage === 'capabilities' ? 'text-primary font-semibold text-glow' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Why Us
            </button>
            <button 
              onClick={() => navigateTo('portfolio')}
              className={`font-mono text-xs uppercase tracking-widest transition-colors ${
                activePage === 'portfolio' ? 'text-primary font-semibold text-glow' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Portfolio
            </button>
            <button 
              onClick={() => navigateTo('contact')}
              className={`font-mono text-xs uppercase tracking-widest transition-colors ${
                activePage === 'contact' ? 'text-primary font-semibold text-glow' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Call Us
            </button>
          </div>

          {/* Right Action CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => navigateTo('pipeline')}
              className="inline-flex items-center gap-1.5 bg-primary-container/10 border border-primary-container/30 text-primary-container font-mono text-[11px] uppercase tracking-wider px-4 py-2 rounded hover:bg-primary-container/25 hover:shadow-[0_0_10px_rgba(0,218,243,0.2)] transition-all duration-300"
            >
              Portal Login <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-on-surface-variant hover:text-on-surface p-2 rounded border border-outline-variant/20 bg-surface-container/40"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-outline-variant/25 bg-surface-container-low/95 backdrop-blur-md relative z-30"
          >
            <div className="px-6 py-8 space-y-6 flex flex-col font-mono text-sm uppercase tracking-widest">
              <button 
                onClick={() => navigateTo('home')}
                className={`text-left ${activePage === 'home' ? 'text-primary text-glow' : 'text-on-surface-variant'}`}
              >
                Home
              </button>
              <button 
                onClick={() => navigateTo('process')}
                className={`text-left ${activePage === 'process' ? 'text-primary text-glow' : 'text-on-surface-variant'}`}
              >
                Our Process
              </button>
              <button 
                onClick={() => navigateTo('capabilities')}
                className={`text-left ${activePage === 'capabilities' ? 'text-primary text-glow' : 'text-on-surface-variant'}`}
              >
                Why Us
              </button>
              <button 
                onClick={() => navigateTo('portfolio')}
                className={`text-left ${activePage === 'portfolio' ? 'text-primary text-glow' : 'text-on-surface-variant'}`}
              >
                Portfolio
              </button>
              <button 
                onClick={() => navigateTo('contact')}
                className={`text-left ${activePage === 'contact' ? 'text-primary text-glow' : 'text-on-surface-variant'}`}
              >
                Call Us
              </button>
              <div className="pt-6 border-t border-outline-variant/10">
                <button 
                  onClick={() => navigateTo('pipeline')}
                  className="w-full text-center flex items-center justify-center gap-2 bg-primary-container/10 border border-primary-container/30 text-primary-container py-3 rounded font-bold hover:bg-primary-container/25 transition-all"
                >
                  Portal Login <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Render Section with Transitions */}
      <main className="flex-grow z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {activePage === 'home' && <Home onNavigate={navigateTo} />}
            {activePage === 'process' && <Process onNavigate={navigateTo} />}
            {activePage === 'capabilities' && <Capabilities onNavigate={navigateTo} />}
            {activePage === 'portfolio' && <Portfolio />}
            {activePage === 'contact' && <ContactUs />}
            {activePage === 'pipeline' && (
              <PipelineDashboard 
                user={user}
                token={token}
                onLogin={handleLogin}
                onLogout={handleLogout}
                isLoggingIn={isLoggingIn}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Slogan/Footer */}
      <footer className="bg-surface-container-lowest/40 border-t border-outline-variant/15 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src="https://drive.google.com/uc?export=view&id=1JhI1uYBGhpDOREzCj-Xau-Tdom0VfNQn" 
                alt="Print2Frame Logo" 
                className="h-12 object-contain" 
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="font-sans text-xs sm:text-sm text-on-surface-variant max-w-sm leading-relaxed">
              Professional skeletal steel systems custom roll-formed in Kadawatha. Structured, transacted, and closed immutably via live Workspace databases.
            </p>
            <div className="space-y-2 mt-4 font-mono text-xs text-on-surface-variant">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>No. 58/33 Church Road, Eldeniya,<br/>Kadawatha, Sri Lanka.</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@print2frame.xyz</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+94 71 141 9027</span>
              </div>
            </div>
          </div>

          {/* Quick links Col */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-primary">ERP Operations</h4>
            <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-on-surface-variant">
              <li>
                <button onClick={() => navigateTo('process')} className="hover:text-primary transition-colors text-left flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5" /> 7-Act Protocol
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('capabilities')} className="hover:text-primary transition-colors text-left flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5" /> Capabilities
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('portfolio')} className="hover:text-primary transition-colors text-left flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5" /> Project Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('pipeline')} className="hover:text-primary transition-colors text-left flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5" /> Workspace Ledger
                </button>
              </li>
            </ul>
          </div>

          {/* Technical Specifications metadata Col */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-primary">Technical Info</h4>
            <div className="bg-surface-container-high/20 border border-outline-variant/10 rounded-lg p-5 space-y-3 font-mono text-[10px] text-outline/80 leading-relaxed">
              <div className="flex justify-between">
                <span>LGS MACHINE</span>
                <span className="text-on-surface">ROLL-A4 // ONLINE</span>
              </div>
              <div className="flex justify-between">
                <span>CAD INTEGRITY</span>
                <span className="text-on-surface">BIM-STRESS-PASS</span>
              </div>
              <div className="flex justify-between">
                <span>ERP SYNC STATUS</span>
                <span className="text-glow text-primary-container">ACTIVE_WS_v1</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-outline-variant/10 py-6 px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-outline/50 max-w-7xl mx-auto">
          <span>&copy; {new Date().getFullYear()} PRINT TO FRAME INDUSTRIES. ALL RIGHTS RESERVED.</span>
          <span>SYS.VER: 4.15 // KADAWATHA WORKSHOP</span>
        </div>
      </footer>
    </div>
  );
}
