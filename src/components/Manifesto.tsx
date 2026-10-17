import React from 'react';
import { WOXSEN_SCHOOLS } from '../data/content';

export const Manifesto: React.FC = () => {
  return (
    <section id="overview" className="py-16 lg:py-32 bg-[#F8F9FA] border-t border-[#E8EAED]">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-6">
        
        {/* Eyebrow, Headline & Paragraph */}
        <div className="max-w-[640px] mb-8 lg:mb-12">
          <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-[#DA5662] mb-3 lg:mb-4">
            Overview
          </p>

          <h2 className="text-[28px] lg:text-[clamp(32px,4vw,48px)] font-medium leading-[1.2] lg:leading-[1.15] tracking-[-0.01em] text-[#202124]">
            Breakthroughs happen at the intersection.
          </h2>

          <p className="mt-4 lg:mt-6 text-[16px] text-[#5F6368] leading-[1.6]">
            The best ideas rarely come from one department. At Skill Café, students from all seven schools sit at the same table, pick a real problem, and solve it together with AI.
          </p>
        </div>

        {/* Single Visual Pattern: The 7 Academic School Pills (8px gap on mobile) */}
        <div className="flex flex-wrap gap-2 lg:gap-3">
          {WOXSEN_SCHOOLS.map((school) => (
            <div
              key={school}
              className="px-4 py-2.5 lg:px-5 lg:py-3 rounded-full bg-[#FFFFFF] border border-[#E8EAED] text-[14px] font-medium text-[#202124] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            >
              {school}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
