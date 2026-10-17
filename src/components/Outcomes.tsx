import React from 'react';
import { OUTCOME_CARDS } from '../data/content';

export const Outcomes: React.FC = () => {

  return (
    <section id="outcomes" className="py-16 lg:py-32 bg-[#F8F9FA] border-t border-[#E8EAED] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-6">
        
        {/* Eyebrow, Headline & Intro Line */}
        <div className="max-w-[640px] mb-8 lg:mb-12">
          <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-[#DA5662] mb-3 lg:mb-4">
            Outcomes
          </p>

          <h2 className="text-[28px] lg:text-[clamp(32px,4vw,48px)] font-medium leading-[1.2] lg:leading-[1.15] tracking-[-0.01em] text-[#202124]">
            You leave with more than you came with.
          </h2>

          <p className="mt-4 lg:mt-6 text-[16px] text-[#5F6368] leading-[1.6]">
            Recognition, a new network, and something real you built.
          </p>
        </div>

        {/* Swipe Row on Compact (<840px), 4-Column Grid on Expanded (≥840px) */}
        <div className="flex lg:grid lg:grid-cols-4 gap-3 lg:gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory no-scrollbar px-5 lg:px-0 -mx-5 lg:mx-0 pb-4 lg:pb-0 items-stretch">
          {OUTCOME_CARDS.map((card, idx) => (
            <div
              key={card.index}
              className="w-[85vw] max-w-[340px] lg:w-auto lg:max-w-none shrink-0 snap-start card-google p-6 lg:p-8 flex flex-col justify-start"
            >
              {/* Uniform 48px White Circle Icon Container with 1px #E8EAED border */}
              <div className="w-12 h-12 rounded-full bg-white border border-[#E8EAED] shadow-sm flex items-center justify-center mb-6 shrink-0">
                {idx === 0 && (
                  <img
                    src="/assets/logos/cotd-logo.png"
                    alt="Center of Talent Development logo"
                    className="w-7 h-7 object-contain"
                  />
                )}
                {idx === 1 && (
                  <img
                    src="/assets/logos/gdg-logo.svg"
                    alt="Google Developer Groups logo"
                    className="w-7 h-7 object-contain"
                  />
                )}
                {idx === 2 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    fill="#C84652"
                    aria-hidden="true"
                    className="w-6 h-6"
                  >
                    <path d="M40-240q-17 0-28.5-11.5T0-280v-23q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H40Zm240 0q-17 0-28.5-11.5T240-280v-25q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v25q0 17-11.5 28.5T680-240H280Zm500 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v23q0 17-11.5 28.5T920-240H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z" />
                  </svg>
                )}
                {idx === 3 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    fill="#C84652"
                    aria-hidden="true"
                    className="w-6 h-6"
                  >
                    <path d="M284-506q14-28 29-54t33-52l-56-11-84 84 78 33Zm482-275q-70 2-149.5 41T472-636q-42 42-75 90t-49 90l114 113q42-16 90-49t90-75q65-65 104-144t41-149q0-4-1.5-8t-4.5-7q-3-3-7-4.5t-8-1.5ZM546-541q-23-23-23-56.5t23-56.5q23-23 57-23t57 23q23 23 23 56.5T660-541q-23 23-57 23t-57-23Zm-34 262 33 79 84-84-11-56q-26 18-52 32.5T512-279Zm351-534q8 110-36 214.5T688-399l20 99q4 20-2 39t-20 33L560-102q-15 15-36 11.5T495-114l-61-143-171-171-143-61q-20-8-24-29t11-36l126-126q14-14 33.5-20t39.5-2l99 20q95-95 199.5-139T819-857q8 1 16 4.5t14 9.5q6 6 9.5 14t4.5 16ZM157-321q35-35 85.5-35.5T328-322q35 35 34.5 85.5T327-151q-48 48-113.5 57T82-76q9-66 18-131.5T157-321Zm57 56q-17 17-23.5 41T180-175q25-4 49-10t41-23q12-12 13-29t-11-29q-12-12-29-11.5T214-265Z" />
                  </svg>
                )}
              </div>

              <h3 className="text-[18px] lg:text-[20px] font-medium text-[#202124] leading-[1.3] mb-2 lg:mb-3">
                {card.title}
              </h3>

              <p className="text-[14px] lg:text-[15px] text-[#5F6368] leading-[1.6]">
                {card.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
