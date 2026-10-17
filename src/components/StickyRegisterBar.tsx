import React, { useEffect, useState } from 'react';

interface StickyRegisterBarProps {
  onRegisterClick: () => void;
}

export const StickyRegisterBar: React.FC<StickyRegisterBarProps> = ({ onRegisterClick }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let heroPast = false;
    let formOrCtaInView = false;

    const updateVisibility = () => {
      setVisible(heroPast && !formOrCtaInView);
    };

    // Observer for Hero: detects when user scrolls past Hero
    const heroEl = document.getElementById('hero');
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroPast = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        updateVisibility();
      },
      { threshold: 0.1 }
    );

    if (heroEl) heroObserver.observe(heroEl);

    // Observer for Registration Section and Final CTA: hide bar when either is visible
    const registerEl = document.getElementById('register');
    const finalCtaEl = document.getElementById('final-cta');

    const formObserver = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((e) => e.isIntersecting);
        formOrCtaInView = anyVisible;
        updateVisibility();
      },
      { threshold: 0.05 }
    );

    if (registerEl) formObserver.observe(registerEl);
    if (finalCtaEl) formObserver.observe(finalCtaEl);

    // Scroll fallback check
    const handleScroll = () => {
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        heroPast = rect.bottom < 100;
      }
      updateVisibility();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      heroObserver.disconnect();
      formObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#FFFFFF] border-t border-[#E8EAED] px-5 pt-3 pb-[calc(16px+env(safe-area-inset-bottom,0px))] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] transition-transform duration-300 ease-in-out ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!visible}
    >
      <button
        onClick={onRegisterClick}
        tabIndex={visible ? 0 : -1}
        className="w-full h-[48px] rounded-full bg-[#DA5662] hover:bg-[#C84652] text-white font-medium text-[16px] transition-colors shadow-sm flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DA5662]"
      >
        Register free
      </button>
    </div>
  );
};
