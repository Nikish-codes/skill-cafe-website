import React from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { EVENT_DETAILS } from '../data/content';
import { GooglyEyeButton } from './GooglyEyeButton';

interface HeroProps {
  onOpenRegister: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegister }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100svh-64px)] pt-[64px] flex flex-col justify-between bg-[#FFFFFF] overflow-hidden"
    >
      {/* 
        ========================================================================
        1. COMPACT HERO (< 600px)
        Exact vertical flow, centred alignment, single-screen fit (390×844)
        ========================================================================
      */}
      <div className="flex sm:hidden flex-col items-center text-center w-full max-w-[390px] mx-auto pt-6 pb-6 px-5 flex-1 justify-center">
        {/* 1. Coffee cup image with the peach blob behind it. Cup width 200px, blob about 240px, centred. Not cut off. */}
        <div className="relative w-[240px] h-[150px] flex items-center justify-center shrink-0">
          <div className="absolute inset-0 soft-peach-blob pointer-events-none opacity-90" />
          <img
            src="/assets/logos/skill-cafe-saucer-cup.png"
            srcSet="/assets/logos/skill-cafe-saucer-cup.png 2x"
            alt="Skill Café Cup"
            className="relative z-10 w-[200px] h-auto object-contain drop-shadow-[0_8px_18px_rgba(32,33,36,0.08)]"
          />
        </div>

        {/* 2. 24px gap */}
        <div className="h-6 shrink-0" aria-hidden="true" />

        {/* 3. Chip: small pill reading "Google Ecosystem Track" (Google "G" icon + text, 13px, white background, 1px border #E8EAED, 32px tall). Sits on its own line here, NOT overlapping the cup. */}
        <div className="h-8 px-3.5 rounded-full bg-white border border-[#E8EAED] shadow-sm flex items-center gap-2 shrink-0">
          <img
            src="/assets/logos/google-logo.svg"
            alt=""
            aria-hidden="true"
            className="w-3.5 h-3.5 object-contain"
          />
          <span className="text-[13px] font-medium text-[#202124]">
            Google Ecosystem Track
          </span>
        </div>

        {/* 4. 16px gap */}
        <div className="h-4 shrink-0" aria-hidden="true" />

        {/* 5. H1 "Where disciplines collide with AI." 36px, weight 500, line-height 1.1, letter-spacing -0.02em. "collide" stays coral. Max 3 lines. */}
        <h1 className="text-[36px] font-medium leading-[1.1] tracking-[-0.02em] text-[#202124] max-w-[340px]">
          Where disciplines <span className="text-[#DA5662]">collide</span> with AI.
        </h1>

        {/* 6. 12px gap */}
        <div className="h-3 shrink-0" aria-hidden="true" />

        {/* 7. Subhead, 16px, line-height 1.5, secondary gray, max-width 340px, centred. */}
        <p className="text-[16px] leading-[1.5] text-[#5F6368] max-w-[340px] font-normal">
          Seven schools, one table. Team up with students outside your major, solve a real-world problem with AI, and pitch it live to Woxsen's deans.
        </p>

        {/* 8. 24px gap */}
        <div className="h-6 shrink-0" aria-hidden="true" />

        {/* 9. "Register free" button: full width, 52px tall, label centred, NO eyes on compact screens. */}
        <div className="w-full">
          <button
            onClick={onOpenRegister}
            className="w-full h-[52px] rounded-full bg-[#DA5662] hover:bg-[#C84652] text-white text-[16px] font-medium transition-colors duration-150 shadow-sm flex items-center justify-center cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DA5662]"
          >
            Register free
          </button>
        </div>

        {/* 10. 8px gap */}
        <div className="h-2 shrink-0" aria-hidden="true" />

        {/* 11. "See how it works →" text link, 15px, 44px tap height. */}
        <a
          href="#how-it-works"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center justify-center gap-1.5 h-[44px] text-[15px] font-medium text-[#DA5662] hover:text-[#C84652] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#DA5662] rounded-md px-2"
        >
          <span>See how it works</span>
          <ArrowRight className="w-4 h-4" />
        </a>

        {/* 12. 16px gap */}
        <div className="h-4 shrink-0" aria-hidden="true" />

        {/* 13. Meta line on ONE line, 14px, secondary gray: "Tue, 6 Oct · 3:00 PM · LT1, Woxsen University". If it would wrap below 360px width, drop "University". */}
        <p className="text-[14px] text-[#5F6368] font-normal whitespace-nowrap">
          Tue, 6 Oct · 3:00 PM · LT1, Woxsen<span className="hidden min-[370px]:inline"> University</span>
        </p>
      </div>

      {/* 
        ========================================================================
        2. DESKTOP & TABLET HERO (≥ 600px)
        Preserved existing 2-column layout with Googly eyes and COTD line
        ========================================================================
      */}
      <div className="hidden sm:flex max-w-[1200px] w-full mx-auto px-6 flex-1 flex-col justify-center py-6 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* Left Column: Headline, Subhead, Primary CTA, Link, Meta & COTD */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <h1 className="text-[44px] lg:text-[clamp(44px,6.5vw,84px)] font-medium leading-[1.05] tracking-[-0.02em] text-[#202124]">
              Where disciplines <br className="hidden sm:inline" />
              <span className="text-[#DA5662]">collide</span> with AI.
            </h1>

            <p className="mt-6 text-[16px] lg:text-[20px] text-[#5F6368] leading-[1.6] max-w-[640px] font-normal">
              Seven schools, one table. Team up with students outside your major, solve a real-world problem with AI, and pitch it live to Woxsen's deans.
            </p>

            <div className="mt-10 flex items-center gap-6">
              <GooglyEyeButton
                onClick={onOpenRegister}
                text="Register free"
                className="min-h-[48px]"
              />

              <a
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 min-h-[48px] py-2 text-[16px] font-medium text-[#DA5662] hover:text-[#C84652] transition-colors group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#DA5662] rounded-md px-2"
              >
                <span>See how it works</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="mt-8 text-[14px] text-[#5F6368] font-normal flex items-center gap-2">
              <span>{EVENT_DETAILS.metaLine}</span>
            </div>

            <div className="mt-3 flex items-center gap-3 text-[14px] text-[#5F6368] font-normal">
              <img
                src="/assets/logos/cotd-logo.png"
                alt="Centre of Talent Development"
                className="h-[24px] w-auto object-contain shrink-0"
              />
              <span>Presented by the Centre of Talent Development, Woxsen University</span>
            </div>
          </div>

          {/* Right Column: Coffee Cup with Scaled Google Chip */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-[320px] h-[320px] lg:w-[400px] lg:h-[400px] flex items-center justify-center">
              <div className="absolute inset-0 soft-peach-blob pointer-events-none opacity-100" />

              <div className="relative z-10 w-[240px] lg:w-[290px] flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]">
                <img
                  src="/assets/logos/skill-cafe-logo-realistic.png"
                  alt="Skill Café Cup"
                  className="w-full h-auto object-contain drop-shadow-[0_12px_24px_rgba(32,33,36,0.1)]"
                />
              </div>

              <div className="absolute top-2 left-2 lg:top-4 lg:left-2 z-20 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E8EAED] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-center gap-2">
                <img
                  src="/assets/logos/google-logo.svg"
                  alt="Google"
                  className="w-3.5 h-3.5 object-contain"
                />
                <span className="text-[14px] font-medium text-[#202124]">Powered by Google AI</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Subtle Scroll Indicator (Desktop Only) */}
      <div className="hidden lg:flex w-full pb-4 justify-center text-[#5F6368]/60">
        <a
          href="#overview"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' });
          }}
          aria-label="Scroll down to overview"
          className="p-2 min-h-[48px] min-w-[48px] flex items-center justify-center hover:text-[#202124] transition-colors"
        >
          <ChevronDown className="w-5 h-5 animate-pulse" />
        </a>
      </div>
    </section>
  );
};
