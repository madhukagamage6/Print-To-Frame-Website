import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Phone, Send, CheckCircle, PhoneCall, CircleDot, Circle } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    intent: ''
  });
  
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile number is required';
    } else if (!/^[0-9]{9}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter exactly 9 digits (e.g. 771234567)';
    }

    if (!formData.intent) {
      newErrors.intent = 'Please select a requirement';
    }

    if (!captchaValue) {
      newErrors.captcha = 'Please verify that you are a human.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmitted(true);

      // Trigger the tel: protocol to automatically open the dialer
      // with the company's contact number.
      window.location.href = 'tel:+94770000000';
    }
  };

  const options = [
    "I need a steel frame fabricated and my digital print fixed to it",
    "I am planning to get a banner done soon",
    "I want to become an Agent/Partner"
  ];

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface-container border border-outline-variant/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,218,243,0.1)]"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary-container/10 border border-primary-container/20 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(0,218,243,0.15)]">
            <PhoneCall className="w-8 h-8 text-primary-container" />
          </div>
          <h2 className="font-display text-3xl text-on-surface mb-2 font-semibold">Call Us</h2>
          <p className="font-sans text-on-surface-variant max-w-lg mx-auto">
            If you are in need of a steel frame fabricated and getting your digital print flex fixed to it, call us right now by filling the form. Even if not, our support agent will call you within two minutes.
          </p>
        </div>

        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-on-surface mb-2">Request Received!</h3>
            <p className="font-sans text-on-surface-variant mb-8">
              Our support agent will call you at <strong>{formData.phone}</strong> within two minutes.
            </p>

            <div className="pt-6 border-t border-outline-variant/20">
              <p className="text-sm text-on-surface-variant mb-4">Need immediate assistance?</p>
              <a 
                href="tel:+94770000000" 
                className="inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container hover:bg-primary-fixed py-4 px-8 rounded-lg text-base font-bold transition-all shadow-[0_0_15px_rgba(0,218,243,0.15)] hover:shadow-[0_0_25px_rgba(0,218,243,0.3)]"
              >
                <PhoneCall className="w-5 h-5" />
                Call Us Directly Now
              </a>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="font-sans text-xs text-on-surface-variant block mb-1.5 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline/60" />
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => {
                    setFormData({...formData, name: e.target.value});
                    if (errors.name) setErrors({...errors, name: ''});
                  }}
                  className={`w-full bg-surface-container-low border ${errors.name ? 'border-error/50' : 'border-outline-variant/30'} rounded-lg py-3 pl-10 pr-4 text-sm text-on-surface outline-none focus:border-primary-container transition-all`}
                  placeholder="Your Name"
                />
              </div>
              {errors.name && <p className="text-error text-xs mt-1.5 ml-1">{errors.name}</p>}
            </div>

            <div>
              <label className="font-sans text-xs text-on-surface-variant block mb-1.5 ml-1">Contact Number</label>
              <div className="relative flex items-center">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline/60" />
                <span className="absolute left-9 text-on-surface-variant text-sm font-medium">+94</span>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={e => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 9);
                    setFormData({...formData, phone: val});
                    if (errors.phone) setErrors({...errors, phone: ''});
                  }}
                  className={`w-full bg-surface-container-low border ${errors.phone ? 'border-error/50' : 'border-outline-variant/30'} rounded-lg py-3 pl-[4.5rem] pr-4 text-sm text-on-surface outline-none focus:border-primary-container transition-all`}
                  placeholder="7X XXX XXXX"
                />
              </div>
              {errors.phone && <p className="text-error text-xs mt-1.5 ml-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="font-sans text-xs text-on-surface-variant block mb-3 ml-1">What is your requirement?</label>
              <div className="space-y-2">
                {options.map((option, idx) => (
                  <label 
                    key={idx} 
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.intent === option 
                        ? 'bg-primary-container/10 border-primary-container/50' 
                        : 'bg-surface-container-low border-outline-variant/20 hover:border-outline-variant/50'
                    }`}
                  >
                    <div className="flex-shrink-0 text-primary-container">
                      {formData.intent === option ? <CircleDot className="w-5 h-5" /> : <Circle className="w-5 h-5 text-outline/40" />}
                    </div>
                    <span className={`text-sm ${formData.intent === option ? 'text-on-surface font-medium' : 'text-on-surface-variant'}`}>
                      {option}
                    </span>
                    <input 
                      type="radio" 
                      name="intent" 
                      value={option}
                      checked={formData.intent === option}
                      onChange={e => {
                        setFormData({...formData, intent: e.target.value});
                        if (errors.intent) setErrors({...errors, intent: ''});
                      }}
                      className="hidden"
                    />
                  </label>
                ))}
              </div>
              {errors.intent && <p className="text-error text-xs mt-1.5 ml-1">{errors.intent}</p>}
            </div>

            {/* Captcha */}
            <div className="flex flex-col items-center justify-center w-full mt-6">
              <label className="font-sans text-xs text-on-surface-variant block mb-3 text-center">Human Verification</label>
              <div className="flex flex-col items-center justify-center gap-2">
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={(value) => {
                    setCaptchaValue(value);
                    if (errors.captcha) setErrors({...errors, captcha: ''});
                  }}
                  theme="dark"
                />
                {errors.captcha && <p className="text-error text-xs">{errors.captcha}</p>}
              </div>
            </div>

            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary-container text-on-primary-container hover:bg-primary-fixed py-3.5 rounded-lg text-sm font-semibold transition-all shadow-[0_0_15px_rgba(0,218,243,0.15)] hover:shadow-[0_0_25px_rgba(0,218,243,0.3)] mt-4"
            >
              <Send className="w-4 h-4" />
              Request Call Back
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
