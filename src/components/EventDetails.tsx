import React from 'react';
import { Calendar, Clock, MapPin, Building, ArrowRight, Ticket } from 'lucide-react';
import { EVENT_DETAILS } from '../data/content';

interface EventDetailsProps {
  onOpenRegister: () => void;
}

export const EventDetails: React.FC<EventDetailsProps> = ({ onOpenRegister }) => {
  return (
    <section id="event-details" className="py-16 lg:py-32 bg-[#FFFFFF] border-t border-[#E8EAED]">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-6">
        
        {/* Eyebrow & Headline */}
        <div className="max-w-[640px] mb-8 lg:mb-12">
          <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-[#DA5662] mb-3 lg:mb-4">
            Event details
          </p>

          <h2 className="text-[28px] lg:text-[clamp(32px,4vw,48px)] font-medium leading-[1.2] lg:leading-[1.15] tracking-[-0.01em] text-[#202124]">
            The details.
          </h2>
        </div>

        {/* Single Visual Pattern: Clean Card */}
        <div className="card-google p-6 lg:p-12">
          
          {/* Compact View (<840px / lg:hidden): 2-Column Grid with Venue spanning both */}
          <div className="lg:hidden space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Date */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#DA5662]/10 flex items-center justify-center shrink-0 text-[#DA5662]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[12px] font-medium text-[#5F6368]">Date</div>
                  <div className="text-[14px] font-medium text-[#202124] leading-snug">{EVENT_DETAILS.date}</div>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#DA5662]/10 flex items-center justify-center shrink-0 text-[#DA5662]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[12px] font-medium text-[#5F6368]">Time</div>
                  <div className="text-[14px] font-medium text-[#202124] leading-snug">{EVENT_DETAILS.time}</div>
                </div>
              </div>

              {/* Venue (Spans both columns) */}
              <div className="col-span-2 flex items-start gap-3 pt-3 border-t border-[#E8EAED]/60">
                <div className="w-9 h-9 rounded-full bg-[#DA5662]/10 flex items-center justify-center shrink-0 text-[#DA5662]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[12px] font-medium text-[#5F6368]">Venue</div>
                  <div className="text-[14px] font-medium text-[#202124] leading-snug">{EVENT_DETAILS.venue}</div>
                </div>
              </div>

              {/* Organiser */}
              <div className="flex items-start gap-3 pt-3 border-t border-[#E8EAED]/60">
                <div className="w-9 h-9 rounded-full bg-[#DA5662]/10 flex items-center justify-center shrink-0 text-[#DA5662]">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[12px] font-medium text-[#5F6368]">Organiser</div>
                  <div className="text-[14px] font-medium text-[#202124] leading-snug">{EVENT_DETAILS.organizer}</div>
                </div>
              </div>

              {/* Admission */}
              <div className="flex items-start gap-3 pt-3 border-t border-[#E8EAED]/60">
                <div className="w-9 h-9 rounded-full bg-[#DA5662]/10 flex items-center justify-center shrink-0 text-[#DA5662]">
                  <Ticket className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[12px] font-medium text-[#5F6368]">Admission</div>
                  <div className="text-[14px] font-medium text-[#202124] leading-snug">Free · Open to all students</div>
                </div>
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="pt-2">
              <button
                onClick={onOpenRegister}
                className="w-full h-[48px] rounded-full bg-[#DA5662] hover:bg-[#C84652] text-white text-[16px] font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Register free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Desktop View (Expanded ≥840px / hidden lg:grid) */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8 items-center">
            
            {/* Left Column: Schedule & Location Data */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#DA5662]/10 flex items-center justify-center shrink-0 text-[#DA5662]">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[13px] font-medium text-[#5F6368]">Date</div>
                  <div className="text-[18px] font-medium text-[#202124]">{EVENT_DETAILS.date}</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#DA5662]/10 flex items-center justify-center shrink-0 text-[#DA5662]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[13px] font-medium text-[#5F6368]">Time</div>
                  <div className="text-[18px] font-medium text-[#202124]">{EVENT_DETAILS.time}</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#DA5662]/10 flex items-center justify-center shrink-0 text-[#DA5662]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[13px] font-medium text-[#5F6368]">Venue</div>
                  <div className="text-[18px] font-medium text-[#202124]">{EVENT_DETAILS.venue}</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#DA5662]/10 flex items-center justify-center shrink-0 text-[#DA5662]">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[13px] font-medium text-[#5F6368]">Organiser</div>
                  <div className="text-[18px] font-medium text-[#202124]">{EVENT_DETAILS.organizer}</div>
                </div>
              </div>
            </div>

            {/* Right Column: Admission & Register free Pill Button */}
            <div className="flex flex-col items-end justify-center border-l border-[#E8EAED] pl-12">
              <div className="text-[13px] font-medium tracking-[0.08em] uppercase text-[#DA5662] mb-2">
                Admission
              </div>
              <div className="text-[28px] font-medium text-[#202124] mb-2">
                Free
              </div>
              <p className="text-[15px] text-[#5F6368] mb-8 text-right max-w-sm">
                Open to all enrolled Woxsen students.
              </p>

              <button
                onClick={onOpenRegister}
                className="inline-flex items-center gap-2 h-[48px] px-8 rounded-full bg-[#DA5662] hover:bg-[#C84652] text-white text-[16px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DA5662] shadow-sm cursor-pointer"
              >
                <span>Register free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
