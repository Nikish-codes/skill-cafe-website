import React, { useState } from 'react';
import { X, Check, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WOXSEN_SCHOOLS } from '../data/content';
import { RegistrationFormData } from '../types';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    rollNumber: '',
    school: '',
    email: '',
    phone: '',
    specialisation: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.rollNumber || !formData.school || !formData.email || !formData.phone || !formData.specialisation) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (!formData.email.includes('@')) {
      setErrorMsg('Please enter a valid student email address.');
      return;
    }

    setErrorMsg('');
    const randomTicket = `SC26-WUX-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(randomTicket);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#DA5662', '#34A853', '#FBBC04', '#EA4335'],
      });
    } catch {
      // Fallback
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      rollNumber: '',
      school: '',
      email: '',
      phone: '',
      specialisation: '',
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto animate-fade-rise"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-[#FFFFFF] rounded-[24px] p-6 sm:p-10 shadow-xl border border-[#E8EAED] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#F8F9FA] text-[#5F6368] hover:text-[#202124] transition-colors"
          aria-label="Close registration"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="mb-8">
              <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-[#DA5662] mb-2">
                Registration
              </p>
              <h2 className="text-[24px] font-medium text-[#202124] leading-tight">
                Skill Café 3.0 Pass
              </h2>
              <p className="text-[14px] text-[#5F6368] mt-1">
                Enter your details to confirm your attendance.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
                {errorMsg}
              </div>
            )}

            {/* Line directly above form per specification */}
            <p className="text-[14px] text-[#5F6368] mb-4">
              Register on your own and we'll place you in a team. Takes a minute.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-[#202124] mb-1">
                  Full Name <span className="text-[#DA5662]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Rao"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E8EAED] focus:border-[#DA5662] focus:ring-1 focus:ring-[#DA5662] outline-none text-[14px] transition-all text-[#202124] placeholder:text-[#9AA0A6]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-[#202124] mb-1">
                    Roll Number <span className="text-[#DA5662]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. WU2024CS012"
                    value={formData.rollNumber}
                    onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E8EAED] focus:border-[#DA5662] focus:ring-1 focus:ring-[#DA5662] outline-none text-[14px] transition-all text-[#202124] placeholder:text-[#9AA0A6]"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-[#202124] mb-1">
                    Phone Number <span className="text-[#DA5662]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E8EAED] focus:border-[#DA5662] focus:ring-1 focus:ring-[#DA5662] outline-none text-[14px] transition-all text-[#202124] placeholder:text-[#9AA0A6]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#202124] mb-1">
                  School / Faculty <span className="text-[#DA5662]">*</span>
                </label>
                <select
                  required
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E8EAED] focus:border-[#DA5662] focus:ring-1 focus:ring-[#DA5662] outline-none text-[14px] bg-[#FFFFFF] transition-all text-[#202124]"
                >
                  <option value="">Select your Woxsen school...</option>
                  {WOXSEN_SCHOOLS.map((school) => (
                    <option key={school} value={school}>
                      {school}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#202124] mb-1">
                  Woxsen Email ID <span className="text-[#DA5662]">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name.roll@woxsen.edu.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E8EAED] focus:border-[#DA5662] focus:ring-1 focus:ring-[#DA5662] outline-none text-[14px] transition-all text-[#202124] placeholder:text-[#9AA0A6]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#202124] mb-1">
                  Specialisation & Section <span className="text-[#DA5662]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. B.Tech AI & ML - Section B"
                  value={formData.specialisation}
                  onChange={(e) => setFormData({ ...formData, specialisation: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E8EAED] focus:border-[#DA5662] focus:ring-1 focus:ring-[#DA5662] outline-none text-[14px] transition-all text-[#202124] placeholder:text-[#9AA0A6]"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full h-[48px] rounded-full bg-[#DA5662] hover:bg-[#C84652] text-white font-medium text-[16px] transition-colors shadow-sm"
                >
                  Register free
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Pass */
          <div className="py-4 text-center animate-fade-rise">
            <div className="w-12 h-12 rounded-full bg-[#DA5662]/10 text-[#DA5662] flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6" />
            </div>

            <div className="text-[13px] font-medium text-[#DA5662] mb-1">
              Registration Confirmed
            </div>

            <h3 className="text-[24px] font-medium text-[#202124]">
              Welcome, {formData.fullName.split(' ')[0]}!
            </h3>
            <p className="text-[14px] text-[#5F6368] mt-1.5 max-w-sm mx-auto">
              Your pass is confirmed. Please bring your laptop, charger, and student ID.
            </p>

            {/* Pass details */}
            <div className="mt-6 p-6 rounded-[20px] border border-[#E8EAED] bg-[#F8F9FA] text-left">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8EAED]">
                <span className="text-[14px] font-medium text-[#202124]">Skill Café 3.0</span>
                <span className="font-mono text-[13px] text-[#DA5662] font-medium">{ticketId}</span>
              </div>

              <div className="py-3 grid grid-cols-2 gap-3 text-[13px]">
                <div>
                  <span className="text-[#5F6368] text-[12px] uppercase">Participant</span>
                  <div className="font-medium text-[#202124]">{formData.fullName}</div>
                </div>
                <div>
                  <span className="text-[#5F6368] text-[12px] uppercase">Roll Number</span>
                  <div className="font-medium text-[#202124]">{formData.rollNumber}</div>
                </div>
                <div className="col-span-2">
                  <span className="text-[#5F6368] text-[12px] uppercase">School</span>
                  <div className="font-medium text-[#202124]">{formData.school}</div>
                </div>
                <div className="col-span-2 pt-2 border-t border-[#E8EAED]">
                  <span className="text-[#5F6368] text-[12px] uppercase">What to bring</span>
                  <div className="font-medium text-[#202124]">Laptop, charger, student ID</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-3">
              <a
                href="https://chat.whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-[48px] inline-flex items-center justify-center gap-2 rounded-full bg-[#DA5662] hover:bg-[#C84652] text-white font-medium text-[16px] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Join Participant Community</span>
              </a>

              <button
                onClick={resetForm}
                className="w-full text-[14px] font-medium text-[#5F6368] hover:text-[#202124] py-2 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
