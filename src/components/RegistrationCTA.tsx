import React from 'react';
import { ArrowRight } from 'lucide-react';

interface RegistrationCTAProps {
  onOpenRegister: () => void;
}

export const RegistrationCTA: React.FC<RegistrationCTAProps> = ({ onOpenRegister }) => {
  return (
    <section id="final-cta" className="py-16 sm:py-24 lg:py-40 bg-[#F8F9FA] border-t border-[#E8EAED] text-center">
      <div className="max-w-[640px] mx-auto px-5 sm:px-6">
        
        {/* Short H2 */}
        <h2 className="text-[28px] sm:text-[32px] lg:text-[48px] font-medium leading-[1.15] tracking-[-0.01em] text-[#202124]">
          Pull up a chair.
        </h2>

        {/* One Line */}
        <p className="mt-4 text-[16px] text-[#5F6368] leading-[1.6]">
          Free for every Woxsen student.
        </p>

        {/* Clean Standard Pill Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onOpenRegister}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-[48px] px-8 rounded-full bg-[#DA5662] hover:bg-[#C84652] text-white text-[16px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DA5662] shadow-sm"
          >
            <span>Register free</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
