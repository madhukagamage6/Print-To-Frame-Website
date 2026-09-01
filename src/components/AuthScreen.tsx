import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, Mail, Lock, User as UserIcon, Briefcase, AlertCircle, CheckCircle, Phone } from 'lucide-react';

interface AuthScreenProps {
  onGoogleSignIn: () => void;
  isLoggingIn: boolean;
  errorMessage: string | null;
}

export default function AuthScreen({ onGoogleSignIn, isLoggingIn, errorMessage }: AuthScreenProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('+94');
  const [role, setRole] = useState('Admin');

  const handleStandardAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signin') {
      setShowErrorPopup(true);
    } else {
      setShowComingSoon(true);
    }
  };

  if (showComingSoon) {
    return (
      <div className="max-w-md mx-auto text-center py-10 md:py-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-surface-container border border-outline-variant/30 rounded-2xl p-10 shadow-[0_0_50px_rgba(0,218,243,0.1)]"
        >
          <div className="w-20 h-20 mx-auto bg-primary-container/10 rounded-full flex items-center justify-center mb-6 border border-primary-container/30">
            <AlertCircle className="w-10 h-10 text-primary-container" />
          </div>
          <h2 className="font-display text-3xl text-on-surface mb-4 font-semibold text-glow text-primary-container">
            Coming Soon
          </h2>
          <p className="font-sans text-on-surface-variant text-base mb-6 leading-relaxed">
            Our specialized framing services registration is currently under development.
          </p>
          <div className="bg-surface-container-low p-4 rounded-lg mb-8 border border-outline-variant/20">
             <p className="font-sans text-sm text-on-surface-variant mb-4">
               To register manually, call out to our sales agent by clicking here.
             </p>
             <button 
               onClick={() => setShowContactForm(true)}
               className="w-full bg-primary-container text-on-primary-container hover:bg-primary-fixed py-2.5 rounded-lg text-sm font-semibold transition-all shadow-[0_0_15px_rgba(0,218,243,0.15)] hover:shadow-[0_0_25px_rgba(0,218,243,0.3)]"
             >
               Contact Sales Agent
             </button>
          </div>
          <button
             onClick={() => {
               setShowComingSoon(false);
               setMode('signin');
             }}
             className="text-xs text-outline/60 hover:text-primary transition-colors"
          >
             Back to login
          </button>
        </motion.div>

        {/* Contact Form Modal */}
        <AnimatePresence>
          {showContactForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-container-lowest/80 backdrop-blur-sm">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-surface-container border border-outline-variant/30 rounded-xl max-w-sm w-full p-6 shadow-[0_0_50px_rgba(0,218,243,0.15)] text-left"
              >
                {!contactSuccess ? (
                  <>
                    <h3 className="font-display text-xl font-semibold text-on-surface mb-4">Contact Sales</h3>
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        setContactSuccess(true);
                      }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="font-sans text-xs text-on-surface-variant block mb-1.5 ml-1">Full Name</label>
                        <div className="relative">
                          <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline/60" />
                          <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg py-2.5 pl-10 pr-3 text-sm text-on-surface outline-none focus:border-primary-container transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="font-sans text-xs text-on-surface-variant block mb-1.5 ml-1">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline/60" />
                          <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg py-2.5 pl-10 pr-3 text-sm text-on-surface outline-none focus:border-primary-container transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="font-sans text-xs text-on-surface-variant block mb-1.5 ml-1">Mobile Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline/60" />
                          <input 
                            type="tel" 
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            pattern="^\\+94[0-9]{9}$"
                            title="Must start with +94 followed by 9 digits"
                            placeholder="+94 7X XXX XXXX"
                            required
                            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg py-2.5 pl-10 pr-3 text-sm text-on-surface outline-none focus:border-primary-container transition-all"
                          />
                        </div>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <button 
                          type="button"
                          onClick={() => setShowContactForm(false)}
                          className="flex-1 bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/30 text-on-surface py-2.5 rounded-lg transition-all text-sm font-medium"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit"
                          className="flex-1 bg-primary-fixed/20 border border-primary-fixed/40 text-primary-container hover:bg-primary-fixed/30 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-[0_0_15px_rgba(0,218,243,0.1)] hover:shadow-[0_0_20px_rgba(0,218,243,0.25)]"
                        >
                          Send Request
                        </button>
                      </div>
                      <div className="mt-4 pt-4 border-t border-outline-variant/10 text-center">
                        <p className="font-sans text-xs text-on-surface-variant mb-2">Or speak to us directly</p>
                        <a 
                          href="tel:+94711419027"
                          className="inline-flex items-center justify-center gap-2 w-full bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/30 text-primary py-2.5 rounded-lg transition-all text-sm font-medium"
                        >
                          <Phone className="w-4 h-4" />
                          Call +94 71 141 9027
                        </a>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                       <CheckCircle className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-on-surface mb-2">Request Sent!</h3>
                    <p className="font-sans text-sm text-on-surface-variant mb-6">
                      Our sales agent will contact you shortly to complete your registration.
                    </p>
                    <button 
                      onClick={() => {
                        setShowContactForm(false);
                        setShowComingSoon(false);
                        setContactSuccess(false);
                        setMode('signin');
                      }}
                      className="w-full bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/30 text-on-surface py-2.5 rounded-lg transition-all font-medium text-sm"
                    >
                      Done
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto text-center py-10 md:py-20 relative z-10">
      
      {/* Error Popup Modal */}
      <AnimatePresence>
        {showErrorPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-container-lowest/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-surface-container border border-outline-variant/30 rounded-xl max-w-sm w-full p-6 shadow-2xl text-center"
            >
              <div className="w-12 h-12 rounded-full bg-error/20 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-error" />
              </div>
              <h3 className="font-display text-lg font-semibold text-on-surface mb-2">Sign-In Failed</h3>
              <p className="font-sans text-sm text-on-surface-variant mb-6">
                Invalid credentials. No user sign-in found.
              </p>
              <button 
                onClick={() => setShowErrorPopup(false)}
                className="w-full bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/30 text-on-surface py-2 rounded-lg transition-all"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div 
        key={mode}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="bg-surface-container border border-outline-variant/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,218,243,0.1)]"
      >
        <div className="flex justify-center mb-6">
          <img 
            src="/logo-dark.png" 
            alt="Print2Frame Logo" 
            className="h-20 sm:h-24 w-auto object-contain transition-transform duration-300 hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <h2 className="font-display text-2xl text-on-surface mb-2 font-semibold">
          {mode === 'signin' ? 'Print To Frame' : 'Request Access'}
        </h2>
        <p className="font-sans text-on-surface-variant text-sm mb-8">
          {mode === 'signin' ? 'Sign in to the portal' : 'Request access to the portal'}
        </p>

        <form onSubmit={handleStandardAuth} className="space-y-4 text-left">
          {mode === 'signup' && (
            <>
              <div>
                <label className="font-sans text-xs text-on-surface-variant block mb-1.5 ml-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline/60" />
                  <input 
                    type="text" 
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg py-2.5 pl-10 pr-3 text-sm text-on-surface outline-none focus:border-primary-container transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label className="font-sans text-xs text-on-surface-variant block mb-1.5 ml-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline/60" />
                  <input 
                    type="tel" 
                    placeholder="+94 7X XXX XXXX"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    pattern="^\\+94[0-9]{9}$"
                    title="Must start with +94 followed by 9 digits"
                    required
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg py-2.5 pl-10 pr-3 text-sm text-on-surface outline-none focus:border-primary-container transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="font-sans text-xs text-on-surface-variant block mb-1.5 ml-1">User Role</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline/60" />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg py-2.5 pl-10 pr-3 text-sm text-on-surface outline-none focus:border-primary-container transition-all appearance-none"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Support">Support</option>
                    <option value="Accounts">Accounts</option>
                    <option value="Operations">Operations</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Partners">Partners</option>
                    <option value="Customer">Customer</option>
                    <option value="Business Client">Business Client</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="font-sans text-xs text-on-surface-variant block mb-1.5 ml-1">Email or Mobile</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline/60" />
              <input 
                type="text" 
                placeholder="admin or email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg py-2.5 pl-10 pr-3 text-sm text-on-surface outline-none focus:border-primary-container transition-all"
              />
            </div>
          </div>

          <div>
            <label className="font-sans text-xs text-on-surface-variant block mb-1.5 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline/60" />
              <input 
                type="password" 
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg py-2.5 pl-10 pr-3 text-sm text-on-surface outline-none focus:border-primary-container transition-all"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-primary-fixed/20 border border-primary-fixed/40 text-primary-container hover:bg-primary-fixed/30 py-2.5 rounded-lg text-sm font-semibold transition-all mt-6 shadow-[0_0_15px_rgba(0,218,243,0.1)] hover:shadow-[0_0_20px_rgba(0,218,243,0.25)]"
          >
            {mode === 'signin' ? 'Login' : 'Request Access'}
          </button>
        </form>

        {mode === 'signin' && (
          <div className="mt-8 pt-6 border-t border-outline-variant/20">
            <p className="font-sans text-xs text-on-surface-variant mb-4">
              Or securely authenticate with ERP credentials:
            </p>
            <button 
              onClick={onGoogleSignIn}
              disabled={isLoggingIn}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-600 font-sans text-[15px] font-medium py-2.5 px-4 rounded shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.15),0_2px_3px_rgba(0,0,0,0.2)] transition-all"
            >
              {isLoggingIn ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                  Authorizing...
                </span>
              ) : (
                <>
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-[22px] h-[22px]">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </svg>
                  <span>Login with Google</span>
                </>
              )}
            </button>
          </div>
        )}

        <div className="mt-8 font-sans text-sm">
          {mode === 'signin' ? (
            <p className="text-on-surface-variant">
              Don't have an account?{' '}
              <button 
                onClick={() => setMode('signup')}
                className="text-primary hover:underline font-medium"
              >
                Register
              </button>
            </p>
          ) : (
            <p className="text-on-surface-variant">
              Already have an account?{' '}
              <button 
                onClick={() => setMode('signin')}
                className="text-primary hover:underline font-medium"
              >
                Login
              </button>
            </p>
          )}
        </div>

        {errorMessage && (
          <div className="mt-6 p-3 bg-error-container/20 border border-error/20 rounded-lg text-left text-xs text-error">
            {errorMessage}
          </div>
        )}
      </motion.div>
      
      <div className="mt-8 flex flex-col items-center gap-2 font-sans text-xs text-on-surface-variant/60">
        <div className="flex items-center gap-4">
          <a 
            href="/privacy-policy" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-primary transition-colors underline"
          >
            Privacy Policy
          </a>
          <span>•</span>
          <a 
            href="/terms-of-service" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-primary transition-colors underline"
          >
            Terms of Service
          </a>
        </div>
        <p>© {new Date().getFullYear()} Print To Frame Pvt Ltd. All rights reserved.</p>
      </div>
    </div>
  );
}
