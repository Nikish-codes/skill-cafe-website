import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/content';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 lg:py-32 bg-[#F8F9FA] border-t border-[#E8EAED]">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-6">
        
        {/* Eyebrow & Headline */}
        <div className="max-w-[640px] mb-8 lg:mb-12">
          <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-[#DA5662] mb-3 lg:mb-4">
            FAQ
          </p>

          <h2 className="text-[28px] lg:text-[clamp(32px,4vw,48px)] font-medium leading-[1.2] lg:leading-[1.15] tracking-[-0.01em] text-[#202124]">
            Frequently asked questions.
          </h2>
        </div>

        {/* Compact Accordion */}
        <div className="max-w-[760px] space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.question}
                className="card-google overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full min-h-[56px] py-4 px-5 sm:px-8 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DA5662]"
                  aria-expanded={isOpen}
                >
                  <span className="text-[16px] sm:text-[18px] font-medium text-[#202124]">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#F8F9FA] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#DA5662]' : 'text-[#5F6368]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-5 pt-1 text-[15px] text-[#5F6368] leading-[1.6] border-t border-[#E8EAED]/60 animate-fade-rise">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
