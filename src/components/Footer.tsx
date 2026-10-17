import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FFFFFF] border-t border-[#E8EAED] py-12 lg:py-16">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-[#E8EAED] text-center lg:text-left items-center">
          
          {/* Logo & Organiser Credit */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <img
              src="/assets/logos/skill-cafe-saucer-cup.png"
              alt="Skill Café"
              className="h-8 w-auto object-contain"
            />
            <div>
              <div className="text-[16px] font-semibold text-[#202124]">
                Skill Café 3.0
              </div>
              <div className="text-[14px] text-[#5F6368]">
                Organised by the Centre of Talent Development (COTD)
              </div>
            </div>
          </div>

          {/* Links & Back to Top (Min 48px tap targets) */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[14px]">
            <a
              href="https://woxsen.edu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] inline-flex items-center text-[#5F6368] hover:text-[#DA5662] transition-colors"
            >
              Learn more about Woxsen University
            </a>
            <span className="hidden sm:inline text-[#E8EAED]" aria-hidden="true">·</span>
            <a
              href="mailto:cotd@woxsen.edu.in"
              className="min-h-[48px] inline-flex items-center text-[#5F6368] hover:text-[#DA5662] transition-colors"
            >
              Contact
            </a>
            <span className="hidden sm:inline text-[#E8EAED]" aria-hidden="true">·</span>
            <button
              onClick={scrollToTop}
              className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center rounded-full hover:bg-[#F8F9FA] text-[#5F6368] hover:text-[#202124] transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Institutional Marks: COTD next to Woxsen University (Centered on mobile, left-aligned on desktop) */}
        <div className="pt-8 pb-4 flex items-center justify-center lg:justify-start gap-6">
          <img
            src="/assets/logos/cotd-logo.png"
            alt="Centre of Talent Development"
            className="h-10 w-auto object-contain shrink-0"
          />
          <span className="h-6 w-px bg-[#E8EAED]" aria-hidden="true" />
          <img
            src="/assets/logos/woxsen-logo.png"
            alt="Woxsen University"
            className="h-10 w-auto object-contain shrink-0"
          />
        </div>

        {/* Copyright */}
        <div className="pt-2 text-[14px] text-[#5F6368] text-center lg:text-left">
          © {new Date().getFullYear()} Centre of Talent Development, Woxsen University. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
