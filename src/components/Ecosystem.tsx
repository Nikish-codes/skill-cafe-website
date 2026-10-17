import React from 'react';
import { PARTNERS_LIST } from '../data/content';

export const Ecosystem: React.FC = () => {
  return (
    <section id="partners" className="py-16 lg:py-32 bg-[#F8F9FA] border-t border-[#E8EAED] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-6">
        
        {/* Eyebrow, Headline & Intro */}
        <div className="max-w-[640px] mb-8 lg:mb-12">
          <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-[#DA5662] mb-3 lg:mb-4">
            Partners
          </p>

          <h2 className="text-[28px] lg:text-[clamp(32px,4vw,48px)] font-medium leading-[1.2] lg:leading-[1.15] tracking-[-0.01em] text-[#202124]">
            Brought to you by
          </h2>

          <p className="mt-4 lg:mt-6 text-[16px] text-[#5F6368] leading-[1.6]">
            Organised by the Centre of Talent Development, with support from Google and Ideate Club.
          </p>
        </div>

        {/* Swipe Row on Compact (<840px), 3-Column Grid on Expanded (≥840px) */}
        <div className="flex lg:grid lg:grid-cols-3 gap-3 lg:gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory no-scrollbar px-5 lg:px-0 -mx-5 lg:mx-0 pb-4 lg:pb-0 items-stretch">
          {/* Partner 1: COTD */}
          <div className="w-[85vw] max-w-[340px] lg:w-auto lg:max-w-none shrink-0 snap-start card-google p-6 lg:p-8 flex flex-col justify-start">
            <div className="h-14 flex items-center mb-6">
              <img
                src={PARTNERS_LIST[0].logo!}
                alt="Centre of Talent Development"
                className="h-12 w-auto object-contain"
              />
            </div>

            <div className="text-[12px] uppercase tracking-[0.08em] text-[#DA5662] font-medium mb-1">
              {PARTNERS_LIST[0].role}
            </div>

            <h3 className="text-[18px] lg:text-[20px] font-medium text-[#202124] mb-2 lg:mb-3">
              {PARTNERS_LIST[0].name}
            </h3>

            <p className="text-[14px] lg:text-[15px] text-[#5F6368] leading-[1.6]">
              {PARTNERS_LIST[0].description}
            </p>
          </div>

          {/* Partner 2: Google */}
          <div className="w-[85vw] max-w-[340px] lg:w-auto lg:max-w-none shrink-0 snap-start card-google p-6 lg:p-8 flex flex-col justify-start">
            <div className="h-14 flex items-center mb-6">
              <img
                src={PARTNERS_LIST[1].logo!}
                alt="Google"
                className="h-7 w-auto object-contain"
              />
            </div>

            <div className="text-[12px] uppercase tracking-[0.08em] text-[#DA5662] font-medium mb-1">
              {PARTNERS_LIST[1].role}
            </div>

            <h3 className="text-[18px] lg:text-[20px] font-medium text-[#202124] mb-2 lg:mb-3">
              {PARTNERS_LIST[1].name}
            </h3>

            <p className="text-[14px] lg:text-[15px] text-[#5F6368] leading-[1.6]">
              {PARTNERS_LIST[1].description}
            </p>
          </div>

          {/* Partner 3: Ideate Club */}
          <div className="w-[85vw] max-w-[340px] lg:w-auto lg:max-w-none shrink-0 snap-start card-google p-6 lg:p-8 flex flex-col justify-start">
            <div className="h-14 flex items-center mb-6">
              <img
                src={PARTNERS_LIST[2].logo!}
                alt="Ideate Club"
                className="h-10 w-auto object-contain"
              />
            </div>

            <div className="text-[12px] uppercase tracking-[0.08em] text-[#DA5662] font-medium mb-1">
              {PARTNERS_LIST[2].role}
            </div>

            <h3 className="text-[18px] lg:text-[20px] font-medium text-[#202124] mb-2 lg:mb-3">
              {PARTNERS_LIST[2].name}
            </h3>

            <p className="text-[14px] lg:text-[15px] text-[#5F6368] leading-[1.6]">
              {PARTNERS_LIST[2].description}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
