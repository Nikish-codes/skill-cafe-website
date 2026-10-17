import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/content';

export const EventPhases: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 lg:py-32 bg-[#FFFFFF] border-t border-[#E8EAED]">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-6">
        
        {/* Eyebrow & Headline */}
        <div className="max-w-[640px] mb-8 lg:mb-12">
          <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-[#DA5662] mb-3 lg:mb-4">
            How it works
          </p>

          <h2 className="text-[28px] lg:text-[clamp(32px,4vw,48px)] font-medium leading-[1.2] lg:leading-[1.15] tracking-[-0.01em] text-[#202124]">
            Four phases, one afternoon.
          </h2>
        </div>

        {/* Compact Vertical Stepper (<840px / lg:hidden) - NO CARDS */}
        <div className="lg:hidden relative pl-1">
          {HOW_IT_WORKS_STEPS.map((phase, idx) => {
            const isLast = idx === HOW_IT_WORKS_STEPS.length - 1;
            return (
              <div key={phase.number} className="relative flex items-start gap-4 pb-8 last:pb-0">
                {/* Connecting Line */}
                {!isLast && (
                  <div
                    className="absolute left-[17px] top-[34px] bottom-0 w-[2px] bg-[#E8EAED]"
                    aria-hidden="true"
                  />
                )}

                {/* Step Number Circle */}
                <div className="relative z-10 w-9 h-9 rounded-full bg-[#FFFFFF] border-2 border-[#DA5662] text-[#DA5662] flex items-center justify-center font-medium text-[14px] shrink-0 shadow-sm">
                  {phase.number}
                </div>

                {/* Content */}
                <div className="pt-1">
                  <h3 className="text-[18px] font-medium text-[#202124] leading-snug mb-1">
                    {phase.title}
                  </h3>
                  <p className="text-[14px] text-[#5F6368] leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop 4-Column Card Grid (Expanded ≥840px / hidden lg:grid) */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {HOW_IT_WORKS_STEPS.map((phase) => (
            <div
              key={phase.number}
              className="card-google p-8 flex flex-col justify-start"
            >
              <div className="text-[14px] font-medium text-[#DA5662] mb-4">
                {phase.number}
              </div>

              <h3 className="text-[20px] font-medium text-[#202124] leading-[1.3] mb-3">
                {phase.title}
              </h3>

              <p className="text-[15px] text-[#5F6368] leading-[1.6]">
                {phase.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
