import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Manifesto } from './components/Manifesto';
import { EventPhases } from './components/EventPhases';
import { Outcomes } from './components/Outcomes';
import { ArchivesGallery } from './components/ArchivesGallery';
import { Ecosystem } from './components/Ecosystem';
import { EventDetails } from './components/EventDetails';
import { FAQ } from './components/FAQ';
import { RegistrationSection } from './components/RegistrationSection';
import { RegistrationCTA } from './components/RegistrationCTA';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { StickyRegisterBar } from './components/StickyRegisterBar';
import { IntroSplash } from './components/IntroSplash';

export const App: React.FC = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Splash screen state: show once per session, bypass if prefers-reduced-motion
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === 'undefined') return false;
    const hasSeen = sessionStorage.getItem('cotd-intro-seen') === 'true';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return !hasSeen && !prefersReducedMotion;
  });

  const [isNavLogoHidden, setIsNavLogoHidden] = useState(() => showSplash);

  useEffect(() => {
    // Disable automatic browser scroll restoration on refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Force scroll to top (Hero) on page load/refresh
    window.scrollTo(0, 0);

    // If a hash exists in the address bar (e.g. #outcomes), clean it up so refreshes stay at Hero
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  const handleOpenRegister = () => {
    const el = document.getElementById('register');
    if (el) {
      const navHeight = 64;
      const y = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      setIsRegisterOpen(true);
    }
  };

  const handleSplashComplete = () => {
    setIsNavLogoHidden(false);
    setShowSplash(false);
  };

  return (
    <div className="min-h-screen bg-white text-black selection:bg-[#DA5662]/15 selection:text-black font-sans">
      {/* COTD Intro Splash Screen */}
      {showSplash && <IntroSplash onComplete={handleSplashComplete} />}

      {/* Sticky Navigation */}
      <Navbar onOpenRegister={handleOpenRegister} isNavLogoHidden={isNavLogoHidden} />

      {/* Main Content Flow:
          Hero → Overview → How it works → Outcomes → Archives → Partners → Event details → FAQ → Registration form → Final CTA → Footer
      */}
      <main>
        {/* 1. Hero */}
        <Hero onOpenRegister={handleOpenRegister} />

        {/* 2. Overview (Manifesto & 7 Schools) */}
        <Manifesto />

        {/* 3. How it works (Four phases, one afternoon) */}
        <EventPhases />

        {/* 4. Outcomes (You leave with more than you came with) */}
        <Outcomes />

        {/* 5. Archives (Two editions. One growing table.) */}
        <ArchivesGallery />

        {/* 6. Partners (Brought to you by) */}
        <Ecosystem />

        {/* 7. Event details (The details.) */}
        <EventDetails onOpenRegister={handleOpenRegister} />

        {/* 8. FAQ (Frequently asked questions) */}
        <FAQ />

        {/* 9. Registration form (Claim your spot / Inline form) */}
        <RegistrationSection />

        {/* 10. Final CTA (Pull up a chair.) */}
        <RegistrationCTA onOpenRegister={handleOpenRegister} />
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* Sticky Register Bar for mobile & tablet (<840px) */}
      <StickyRegisterBar onRegisterClick={handleOpenRegister} />

      {/* Interactive Participant Registration Modal (Fallback) */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
};

export default App;
