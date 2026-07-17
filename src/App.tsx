import React, { useState, useEffect } from 'react';
import { Page } from './types';
import Home from './components/Home';
import Process from './components/Process';
import Capabilities from './components/Capabilities';
import Portfolio from './components/Portfolio';
import PipelineDashboard from './components/PipelineDashboard';
import ContactUs from './components/ContactUs';
import PageSkeleton from './components/PageSkeleton';
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
  Mail,
  ArrowUp
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');
  const [isPendingPage, setIsPendingPage] = useState(false);
  const [pendingPage, setPendingPage] = useState<Page>('home');

  useEffect(() => {
    setPendingPage(activePage);
    setIsPendingPage(true);
    const timer = setTimeout(() => {
      setIsPendingPage(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [activePage]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Authentication State
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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



      {/* Primary Navigation Bar */}
      <nav className="sticky top-0 z-40 transition-all duration-300 pointer-events-none">
        {/* Main Bar Background */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-black/90 shadow-sm border-b border-outline-variant/30 pointer-events-auto backdrop-blur-md"></div>
        
        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary origin-left z-50 shadow-[0_0_15px_rgba(0,218,243,0.6)]"
          style={{ scaleX }}
        />

        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 xl:px-12 flex items-center h-16 relative z-10">
          {/* Logo / Brand - Integrated Section */}
          <div 
            onClick={() => navigateTo('home')} 
            className="flex items-center justify-center cursor-pointer group relative z-50 shrink-0 transition-all duration-300 pointer-events-auto bg-transparent px-2 md:px-4 h-16"
          >
            <img 
              src="/logo.png" 
              alt="Print2Frame Logo" 
              className="h-10 sm:h-11 lg:h-12 object-contain transition-transform duration-300 group-hover:scale-105" 
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8 h-16 pointer-events-auto ml-16 xl:ml-28">
            <button 
              onClick={() => navigateTo('home')}
              className={`font-mono text-sm xl:text-base uppercase tracking-normal transition-all duration-300 border-b pb-1 px-1 hover:scale-105 active:scale-95 hover:[text-shadow:0_0_12px_rgba(0,218,243,0.6)] ${
                activePage === 'home' ? 'text-primary font-medium text-glow border-primary' : 'text-on-surface-variant hover:text-primary border-outline-variant/20 hover:border-primary/50'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => navigateTo('process')}
              className={`font-mono text-sm xl:text-base uppercase tracking-normal transition-all duration-300 border-b pb-1 px-1 hover:scale-105 active:scale-95 hover:[text-shadow:0_0_12px_rgba(0,218,243,0.6)] ${
                activePage === 'process' ? 'text-primary font-medium text-glow border-primary' : 'text-on-surface-variant hover:text-primary border-outline-variant/20 hover:border-primary/50'
              }`}
            >
              Our Process
            </button>
            <button 
              onClick={() => navigateTo('capabilities')}
              className={`font-mono text-sm xl:text-base uppercase tracking-normal transition-all duration-300 border-b pb-1 px-1 hover:scale-105 active:scale-95 hover:[text-shadow:0_0_12px_rgba(0,218,243,0.6)] ${
                activePage === 'capabilities' ? 'text-primary font-medium text-glow border-primary' : 'text-on-surface-variant hover:text-primary border-outline-variant/20 hover:border-primary/50'
              }`}
            >
              Why Us
            </button>
            {/* <button 
              onClick={() => navigateTo('portfolio')}
              className={`font-mono text-sm xl:text-base uppercase tracking-normal transition-all duration-300 border-b pb-1 px-1 hover:scale-105 active:scale-95 hover:[text-shadow:0_0_12px_rgba(0,218,243,0.6)] ${
                activePage === 'portfolio' ? 'text-primary font-medium text-glow border-primary' : 'text-on-surface-variant hover:text-primary border-outline-variant/20 hover:border-primary/50'
              }`}
            >
              Portfolio
            </button> */}
            <button 
              onClick={() => navigateTo('contact')}
              className={`font-mono text-sm xl:text-base uppercase tracking-normal transition-all duration-300 border-b pb-1 px-1 hover:scale-105 active:scale-95 hover:[text-shadow:0_0_12px_rgba(0,218,243,0.6)] ${
                activePage === 'contact' ? 'text-primary font-medium text-glow border-primary' : 'text-on-surface-variant hover:text-primary border-outline-variant/20 hover:border-primary/50'
              }`}
            >
              Call Us
            </button>
          </div>

          {/* Right Action CTA Button */}
          <div className="hidden lg:flex items-center gap-4 pointer-events-auto ml-auto h-16">
            <button 
              onClick={() => navigateTo('pipeline')}
              className="inline-flex items-center gap-1.5 bg-primary-container/10 border border-primary-container/30 text-primary-container font-mono text-sm xl:text-base uppercase tracking-normal px-4 py-2 rounded hover:bg-primary-container/25 hover:shadow-[0_0_10px_rgba(0,218,243,0.2)] hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap"
            >
              Portal Login <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden ml-auto text-on-surface-variant hover:text-on-surface p-2 rounded border border-outline-variant/20 bg-surface-container/40 pointer-events-auto"
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
            className="lg:hidden border-b border-outline-variant/25 bg-surface-container-low/95 backdrop-blur-md relative z-30"
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
              {/* <button 
                onClick={() => navigateTo('portfolio')}
                className={`text-left ${activePage === 'portfolio' ? 'text-primary text-glow' : 'text-on-surface-variant'}`}
              >
                Portfolio
              </button> */}
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
          {isPendingPage ? (
            <motion.div
              key={`skeleton-${pendingPage}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <PageSkeleton page={pendingPage} />
            </motion.div>
          ) : (
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
          )}
        </AnimatePresence>
      </main>

      {/* Global Slogan/Footer */}
      <footer className="bg-surface-container-lowest/40 border-t border-outline-variant/15 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-12">
          {/* Brand Col */}
          <div className="sm:col-span-2 md:col-span-4 space-y-5">
            <h2 className="font-display font-bold text-2xl tracking-tight text-on-surface">
              Print <span className="text-primary">To</span> Frame Pvt Ltd
            </h2>
            <p className="font-sans text-xs sm:text-sm text-on-surface-variant max-w-sm leading-relaxed">
              Professional skeletal steel systems custom roll-formed in Kadawatha. Bringing your designs to life with robust framing solutions.
            </p>
            <div className="pt-2">
              <span className="inline-block border border-primary/20 bg-primary/5 text-[11px] font-mono text-primary px-3 py-1.5 rounded uppercase tracking-wider">
                "If there is a print, we make the frame."
              </span>
            </div>
          </div>

          {/* Headquarters / Contact Col */}
          <div className="sm:col-span-2 md:col-span-3 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-primary border-b border-outline-variant/10 pb-2">Headquarters</h4>
            <div className="space-y-3 font-sans text-xs sm:text-sm text-on-surface-variant">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  No. 58/33 Church Road,<br />
                  Eldeniya, Kadawatha,<br />
                  Sri Lanka.
                </span>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@print2frame.xyz</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary" />
                <span>+94 71 141 9027</span>
              </div>
            </div>
          </div>

          {/* Quick links Col */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-primary border-b border-outline-variant/10 pb-2">Explore</h4>
            <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-on-surface-variant">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-primary transition-colors text-left flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-outline-variant group-hover:text-primary transition-colors" /> Home
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('process')} className="hover:text-primary transition-colors text-left flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-outline-variant group-hover:text-primary transition-colors" /> Our Process
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('capabilities')} className="hover:text-primary transition-colors text-left flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-outline-variant group-hover:text-primary transition-colors" /> Why Us
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('portfolio')} className="hover:text-primary transition-colors text-left flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-outline-variant group-hover:text-primary transition-colors" /> Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('pipeline')} className="hover:text-primary transition-colors text-left flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-outline-variant group-hover:text-primary transition-colors" /> Portal Login
                </button>
              </li>
            </ul>
          </div>

          {/* Core Expertise Col */}
          <div className="col-span-1 md:col-span-3 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-primary border-b border-outline-variant/10 pb-2">Solutions</h4>
            <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-on-surface-variant">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
                <span>LGS Steel Framing (Light Gauge)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
                <span>Digital Flex Printing</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
                <span>Custom Board Fabrication</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
                <span>BIM Design & Roll-Forming</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
                <span>Secure Structural Mounting</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-outline-variant/10 py-6 px-6 md:px-12 flex flex-col justify-center items-center gap-4 text-[10px] font-mono text-outline/50 max-w-7xl mx-auto">
          <span>&copy; {new Date().getFullYear()} PRINT TO FRAME PVT LTD. ALL RIGHTS RESERVED.</span>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(0, 218, 243, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 p-3.5 bg-black/85 hover:bg-black text-primary border border-primary/40 hover:border-primary rounded-full shadow-[0_4px_25px_rgba(0,218,243,0.3)] cursor-pointer transition-all duration-300"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
