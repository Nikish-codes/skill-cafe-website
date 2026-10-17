import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Outcomes', href: '#outcomes' },
    { label: 'Archives', href: '#archives' },
    { label: 'Partners', href: '#partners' },
    { label: 'Details', href: '#event-details' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    if (!id) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 64;
      const y = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('register');
    if (el) {
      const navHeight = 64;
      const y = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      onOpenRegister();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[64px] bg-[#FFFFFF]/90 backdrop-blur-md transition-all duration-200 ${
        scrolled ? 'border-b border-[#E8EAED] shadow-[0_1px_3px_rgba(0,0,0,0.04)]' : 'border-b border-transparent'
      }`}
    >
      <div className="max-w-[1200px] h-full mx-auto px-5 lg:px-6 flex items-center justify-between">
        {/* Brand Group */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3.5 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#DA5662] rounded-lg py-1 px-1 min-h-[48px]"
        >
          <img
            src="/assets/logos/cotd-logo.png"
            alt="Centre of Talent Development"
            className="h-[28px] sm:h-8 w-auto object-contain shrink-0"
          />
          <span className="h-5 w-px bg-[#E8EAED]" aria-hidden="true" />
          <div className="flex items-baseline gap-1.5">
            <span className="text-[18px] font-medium tracking-tight text-[#202124]">
              Skill Café
            </span>
            <span className="text-[13px] text-[#5F6368] sm:font-semibold sm:text-[#DA5662] sm:text-[12px]">
              3.0
            </span>
          </div>
        </a>

        {/* Centered Navigation (Expanded ≥840px) */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-[14px] font-medium text-[#5F6368] hover:text-[#202124] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#DA5662] rounded-md px-1 py-2 min-h-[48px] flex items-center"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA (Expanded ≥840px) */}
        <div className="hidden lg:flex items-center">
          <button
            onClick={handleRegisterClick}
            className="h-[48px] px-6 rounded-full bg-[#DA5662] hover:bg-[#C84652] text-white text-[14px] font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DA5662] shadow-sm flex items-center justify-center cursor-pointer"
          >
            Register free
          </button>
        </div>

        {/* Mobile Compact Controls (<840px) - Menu button only on compact (<600px) */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={handleRegisterClick}
            className="hidden sm:flex min-h-[48px] px-4 rounded-full bg-[#DA5662] text-white text-[14px] font-medium items-center justify-center"
          >
            Register free
          </button>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="w-[48px] h-[48px] rounded-full flex items-center justify-center text-[#202124] hover:bg-[#F8F9FA] transition-colors cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Full-Screen Mobile Sheet rendered in Portal to escape header backdrop-filter containing block */}
      {mobileMenuOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[100] bg-[#FFFFFF] flex flex-col p-6 animate-fade-rise overflow-y-auto"
          >
            {/* Top Bar with Brand and Close Button */}
            <div className="flex items-center justify-between pb-6 border-b border-[#E8EAED]">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/logos/cotd-logo.png"
                  alt="Centre of Talent Development"
                  className="h-8 w-auto object-contain shrink-0"
                />
                <span className="h-5 w-px bg-[#E8EAED]" aria-hidden="true" />
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[18px] font-semibold tracking-tight text-[#202124]">
                    Skill Café
                  </span>
                  <span className="text-[12px] font-semibold text-[#DA5662]">
                    3.0
                  </span>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-12 h-12 rounded-full flex items-center justify-center text-[#202124] hover:bg-[#F8F9FA] transition-colors"
                aria-label="Close navigation menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Large Section Links (20px text, 56px row height) */}
            <nav className="flex-1 flex flex-col py-4" aria-label="Mobile Navigation Links">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavClick(e, link.href);
                  }}
                  className="h-[56px] flex items-center justify-between text-[20px] font-medium text-[#202124] hover:text-[#DA5662] border-b border-[#E8EAED]/50 transition-colors"
                >
                  <span>{link.label}</span>
                </a>
              ))}
            </nav>

            {/* Full-Width Mobile CTA Button */}
            <div className="pt-4 pb-6">
              <button
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleRegisterClick(e);
                }}
                className="w-full h-[48px] rounded-full bg-[#DA5662] hover:bg-[#C84652] text-white text-[16px] font-medium transition-colors shadow-sm flex items-center justify-center"
              >
                Register free
              </button>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
};
