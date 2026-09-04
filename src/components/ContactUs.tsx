import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  User,
  Phone,
  Send,
  CheckCircle,
  PhoneCall,
  CircleDot,
  Circle,
  Loader2,
} from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import { submitLead } from '../lib/leads';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    intent: '',
  });

  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Please enter your full name (at least 3 characters)';
    } else if (!/^[a-zA-Z\s.-]+$/.test(formData.name)) {
      newErrors.name = 'Name can only contain letters, spaces, dots, and hyphens';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile number is required';
    } else if (!/^[7][0-9]{8}$/.test(formData.phone)) {
      newErrors.phone =
        'Please enter a valid Sri Lankan mobile number starting with 7 (e.g. 771234567)';
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

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };
    if (field === 'name') {
      if (!value.trim()) {
        newErrors.name = 'Full name is required';
      } else if (value.trim().length < 3) {
        newErrors.name = 'Please enter your full name (at least 3 characters)';
      } else if (!/^[a-zA-Z\s.-]+$/.test(value)) {
        newErrors.name = 'Name can only contain letters, spaces, dots, and hyphens';
      } else {
        delete newErrors.name;
      }
    } else if (field === 'phone') {
      if (!value.trim()) {
        newErrors.phone = 'Mobile number is required';
      } else if (!/^[7][0-9]{8}$/.test(value)) {
        newErrors.phone =
          'Please enter a valid Sri Lankan mobile number starting with 7 (e.g. 771234567)';
      } else {
        delete newErrors.phone;
      }
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitError(null);
    setIsSubmitting(true);
    try {
      await submitLead({
        name: formData.name.trim(),
        phone: formData.phone,
        intent: formData.intent,
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit lead:', err);
      setSubmitError(
        'Something went wrong sending your request. Please try again or call us directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const options = [
    'I need a steel frame fabricated and my digital print fixed to it',
    'I am planning to get a banner done soon',
    'I want to become an Agent/Partner',
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
          <h2 className="font-display text-3xl text-on-surface mb-2 font-semibold">Contact Us</h2>
          <p className="font-sans text-on-surface-variant max-w-lg mx-auto">
            If you need a steel frame fabricated and your digital print flex fixed to it, get in
            touch with us right now. Request a fast call back below or call our support team
            directly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="font-sans text-xs text-on-surface-variant block mb-1.5 ml-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline/60" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                onBlur={(e) => validateField('name', e.target.value)}
                className={`w-full bg-surface-container-low border ${errors.name ? 'border-error/50' : 'border-outline-variant/30'} rounded-lg py-3 pl-10 pr-4 text-sm text-on-surface outline-none focus:border-primary-container transition-all`}
                placeholder="Your Name"
              />
            </div>
            {errors.name && <p className="text-error text-xs mt-1.5 ml-1">{errors.name}</p>}
          </div>

          <div>
            <label className="font-sans text-xs text-on-surface-variant block mb-1.5 ml-1">
              Contact Number
            </label>
            <div className="relative flex items-center">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline/60" />
              <span className="absolute left-9 text-on-surface-variant text-sm font-medium">
                +94
              </span>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 9);
                  setFormData({ ...formData, phone: val });
                  if (errors.phone) setErrors({ ...errors, phone: '' });
                }}
                onBlur={(e) => validateField('phone', e.target.value)}
                className={`w-full bg-surface-container-low border ${errors.phone ? 'border-error/50' : 'border-outline-variant/30'} rounded-lg py-3 pl-[4.5rem] pr-4 text-sm text-on-surface outline-none focus:border-primary-container transition-all`}
                placeholder="7X XXX XXXX"
              />
            </div>
            {errors.phone && <p className="text-error text-xs mt-1.5 ml-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="font-sans text-xs text-on-surface-variant block mb-3 ml-1">
              What is your requirement?
            </label>
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
                    {formData.intent === option ? (
                      <CircleDot className="w-5 h-5" />
                    ) : (
                      <Circle className="w-5 h-5 text-outline/40" />
                    )}
                  </div>
                  <span
                    className={`text-sm ${formData.intent === option ? 'text-on-surface font-medium' : 'text-on-surface-variant'}`}
                  >
                    {option}
                  </span>
                  <input
                    type="radio"
                    name="intent"
                    value={option}
                    checked={formData.intent === option}
                    onChange={(e) => {
                      setFormData({ ...formData, intent: e.target.value });
                      if (errors.intent) setErrors({ ...errors, intent: '' });
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
            <label className="font-sans text-xs text-on-surface-variant block mb-3 text-center">
              Human Verification
            </label>
            <div className="flex flex-col items-center justify-center gap-2">
              <ReCAPTCHA
                sitekey={
                  import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
                  '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
                }
                onChange={(value) => {
                  setCaptchaValue(value);
                  if (errors.captcha) setErrors({ ...errors, captcha: '' });
                }}
                theme="dark"
              />
              {errors.captcha && <p className="text-error text-xs">{errors.captcha}</p>}
            </div>
          </div>

          {submitError && <p className="text-error text-xs text-center -mb-2">{submitError}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-primary-container text-on-primary-container hover:bg-primary-fixed py-3.5 rounded-lg text-sm font-semibold transition-all shadow-[0_0_15px_rgba(0,218,243,0.15)] hover:shadow-[0_0_25px_rgba(0,218,243,0.3)] mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Request Call Back
              </>
            )}
          </button>
        </form>

        {submitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-surface-container border border-outline-variant/30 rounded-2xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(0,218,243,0.2)] text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

              <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <CheckCircle className="w-10 h-10 text-emerald-400" />
              </div>

              <h3 className="font-display text-3xl font-semibold text-on-surface mb-3 tracking-tight">
                Request Sent!
              </h3>

              <p className="font-sans text-on-surface-variant mb-8 text-base">
                Thank you, <span className="text-on-surface font-medium">{formData.name}</span>. Our
                support agent will call you at{' '}
                <strong className="text-primary-container tracking-wide">
                  +94 {formData.phone}
                </strong>{' '}
                within two minutes.
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', phone: '', intent: '' });
                    setCaptchaValue(null);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-surface-container-high hover:bg-surface-container-highest text-on-surface py-3.5 rounded-lg text-sm font-medium transition-all border border-outline-variant/30"
                >
                  Close & Return
                </button>

                <a
                  href="tel:+94711419027"
                  className="w-full flex items-center justify-center gap-2 bg-primary-container/10 text-primary-container hover:bg-primary-container/20 py-3.5 rounded-lg text-sm font-medium transition-all border border-primary-container/30"
                >
                  <PhoneCall className="w-4 h-4" />
                  Call Us Directly Instead
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
