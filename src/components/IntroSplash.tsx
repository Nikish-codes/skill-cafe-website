import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

interface IntroSplashProps {
  onComplete: () => void;
  onExitStart?: () => void;
}

export const IntroSplash: React.FC<IntroSplashProps> = ({ onComplete, onExitStart }) => {
  const [phase, setPhase] = useState<'initial' | 'ring' | 'logo' | 'text' | 'subtext' | 'hold' | 'exit'>('initial');
  const [isMobile, setIsMobile] = useState(false);

  const splashLogoRef = useRef<HTMLDivElement>(null);
  const skipBtnRef = useRef<HTMLButtonElement>(null);
  const isExitingRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  // Motion values for fluid FLIP logo transition & circular mask expansion
  const logoX = useMotionValue(0);
  const logoY = useMotionValue(0);
  const logoScale = useMotionValue(1);
  const revealRadius = useMotionValue(0);

  // Responsive dimensions
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const dimensions = isMobile
    ? {
        svgSize: 260,
        center: 130,
        ringRadius: 88,
        textRadius: 108,
        glowSize: 240,
        logoHeight: 96,
      }
    : {
        svgSize: 320,
        center: 160,
        ringRadius: 110,
        textRadius: 135,
        glowSize: 320,
        logoHeight: 120,
      };

  const ringCircumference = 2 * Math.PI * dimensions.ringRadius;
  const textCircumference = 2 * Math.PI * dimensions.textRadius;

  // Lock scroll on mount
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus skip button for accessibility
    const focusTimer = window.setTimeout(() => {
      skipBtnRef.current?.focus();
    }, 100);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.clearTimeout(focusTimer);
    };
  }, []);

  // Exit trigger with FLIP flight & circular cutout mask
  const triggerExit = useCallback(() => {
    if (isExitingRef.current) return;
    isExitingRef.current = true;
    setPhase('exit');

    // Notify parent to start hero reveal synchronization if requested
    if (onExitStart) {
      onExitStart();
    }

    // Measure target nav logo for exact FLIP coordinates
    const navLogoEl = document.getElementById('nav-cotd-logo');
    const splashLogoEl = splashLogoRef.current;

    let targetDeltaX = 0;
    let targetDeltaY = 0;
    let targetScale = 0.25;

    if (navLogoEl && splashLogoEl) {
      const navRect = navLogoEl.getBoundingClientRect();
      const splashRect = splashLogoEl.getBoundingClientRect();

      const splashCenterX = splashRect.left + splashRect.width / 2;
      const splashCenterY = splashRect.top + splashRect.height / 2;

      const navCenterX = navRect.left + navRect.width / 2;
      const navCenterY = navRect.top + navRect.height / 2;

      targetDeltaX = navCenterX - splashCenterX;
      targetDeltaY = navCenterY - splashCenterY;
      targetScale = navRect.height / splashRect.height;
    } else {
      // Fallback coordinate towards top-left
      targetDeltaX = -window.innerWidth / 2 + 50;
      targetDeltaY = -window.innerHeight / 2 + 32;
      targetScale = 0.25;
    }

    // Animate logo to nav position (duration: 700ms, cubic-bezier(0.65, 0, 0.35, 1))
    const exitEase = [0.65, 0, 0.35, 1] as const;

    animate(logoX, targetDeltaX, { duration: 0.7, ease: exitEase });
    animate(logoY, targetDeltaY, { duration: 0.7, ease: exitEase });
    animate(logoScale, targetScale, { duration: 0.7, ease: exitEase });

    // Animate circular hole in black mask from 0 to screen diagonal
    const maxScreenRadius = Math.hypot(window.innerWidth, window.innerHeight);
    animate(revealRadius, maxScreenRadius, {
      duration: 0.7,
      ease: exitEase,
      onComplete: () => {
        // Mark session as seen
        try {
          sessionStorage.setItem('cotd-intro-seen', 'true');
        } catch {
          // ignore session storage access errors
        }
        onComplete();
      },
    });
  }, [logoX, logoY, logoScale, revealRadius, onComplete, onExitStart]);

  // Choreographed timeline
  useEffect(() => {
    // 0-200ms: plain black
    // 200ms: gold ring draws itself (200-900ms)
    const tRing = window.setTimeout(() => setPhase('ring'), 200);

    // 400ms: glow & logo fade in (400-1000ms)
    const tLogo = window.setTimeout(() => setPhase('logo'), 400);

    // 800ms: orbiting text fades in (800-1300ms)
    const tText = window.setTimeout(() => setPhase('text'), 800);

    // 1100ms: COTD & PRESENTS fade up (1100-1600ms)
    const tSubtext = window.setTimeout(() => setPhase('subtext'), 1100);

    // 1600-2100ms: hold
    const tHold = window.setTimeout(() => setPhase('hold'), 1600);

    // 2100ms: trigger exit (2100-2800ms)
    const tExit = window.setTimeout(() => triggerExit(), 2100);

    timersRef.current = [tRing, tLogo, tText, tSubtext, tHold, tExit];

    return () => {
      timersRef.current.forEach((t) => window.clearTimeout(t));
    };
  }, [triggerExit]);

  // Any user interaction (click, tap, keydown, scroll) immediately jumps to exit
  useEffect(() => {
    const handleInteraction = () => {
      // Don't intercept if clicking the skip button specifically (it already handles click)
      triggerExit();
    };

    window.addEventListener('pointerdown', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });
    window.addEventListener('wheel', handleInteraction, { passive: true, once: true });
    window.addEventListener('touchmove', handleInteraction, { passive: true, once: true });

    return () => {
      window.removeEventListener('pointerdown', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('wheel', handleInteraction);
      window.removeEventListener('touchmove', handleInteraction);
    };
  }, [triggerExit]);

  const isExiting = phase === 'exit';
  const showRing = phase !== 'initial';
  const showLogo = ['logo', 'text', 'subtext', 'hold', 'exit'].includes(phase);
  const showText = ['text', 'subtext', 'hold'].includes(phase);
  const showSubtext = ['subtext', 'hold'].includes(phase);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Center of Talent Development intro"
      className="fixed inset-0 z-[9999] pointer-events-auto flex items-center justify-center select-none"
    >
      {/* 
        Background Layer with Circular Reveal Mask:
        An SVG mask cut-out expands outward from screen center upon exit,
        revealing the rendered website beneath.
      */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ width: '100vw', height: '100vh' }}
        aria-hidden="true"
      >
        <defs>
          <mask id="cotd-splash-reveal-mask">
            <rect width="100%" height="100%" fill="white" />
            <motion.circle
              cx="50%"
              cy="50%"
              r={revealRadius}
              fill="black"
            />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="#000000"
          mask="url(#cotd-splash-reveal-mask)"
        />
      </svg>

      {/* Main Centered Stage */}
      <div className="relative flex flex-col items-center justify-center pointer-events-none z-10">
        {/* Glow & Emblem Container */}
        <div
          className="relative flex items-center justify-center"
          style={{ width: dimensions.svgSize, height: dimensions.svgSize }}
        >
          {/* 1. Glow: Soft radial gradient behind logo, gold color at ~18% opacity */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isExiting ? 0 : showLogo ? 1 : 0,
              scale: isExiting ? 0.8 : showLogo ? 1 : 0.8,
            }}
            transition={{
              duration: isExiting ? 0.2 : 0.6,
              ease: [0.2, 0, 0, 1],
            }}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: dimensions.glowSize,
              height: dimensions.glowSize,
              background: 'radial-gradient(circle, rgba(212, 143, 48, 0.22) 0%, rgba(212, 143, 48, 0.10) 45%, transparent 70%)',
              filter: 'blur(16px)',
            }}
            aria-hidden="true"
          />

          {/* 2 & 3. SVG Layer: Gold Ring & Orbiting Text */}
          <svg
            className="absolute inset-0 pointer-events-none overflow-visible"
            width={dimensions.svgSize}
            height={dimensions.svgSize}
            viewBox={`0 0 ${dimensions.svgSize} ${dimensions.svgSize}`}
            aria-hidden="true"
          >
            <defs>
              {/* Path for Orbiting Text Circle */}
              <path
                id="orbitCirclePath"
                d={`M ${dimensions.center},${dimensions.center} m -${dimensions.textRadius},0 a ${dimensions.textRadius},${dimensions.textRadius} 0 1,1 ${dimensions.textRadius * 2},0 a ${dimensions.textRadius},${dimensions.textRadius} 0 1,1 -${dimensions.textRadius * 2},0`}
                fill="none"
              />
            </defs>

            {/* 3. Gold Ring: Circle drawn around logo from the top */}
            <motion.circle
              cx={dimensions.center}
              cy={dimensions.center}
              r={dimensions.ringRadius}
              fill="none"
              stroke="#D48F30"
              strokeWidth="1.5"
              strokeDasharray={ringCircumference}
              initial={{ strokeDashoffset: ringCircumference, opacity: 0 }}
              animate={{
                strokeDashoffset: showRing ? 0 : ringCircumference,
                opacity: isExiting ? 0 : showRing ? 1 : 0,
              }}
              transition={{
                strokeDashoffset: { duration: 0.7, ease: [0.2, 0, 0, 1] },
                opacity: { duration: isExiting ? 0.2 : 0.3 },
              }}
              transform={`rotate(-90 ${dimensions.center} ${dimensions.center})`}
            />

            {/* 4. Orbiting Text: Rotates continuously 1 full turn every 14s */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{
                opacity: isExiting ? 0 : showText ? 1 : 0,
              }}
              transition={{ duration: isExiting ? 0.2 : 0.5 }}
              style={{
                transformOrigin: `${dimensions.center}px ${dimensions.center}px`,
              }}
            >
              <g
                style={{
                  transformOrigin: `${dimensions.center}px ${dimensions.center}px`,
                  animation: 'spin 14s linear infinite',
                }}
              >
                <text
                  fill="rgba(255, 255, 255, 0.7)"
                  fontSize="12"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  fontWeight="500"
                  letterSpacing="0.2em"
                >
                  <textPath
                    href="#orbitCirclePath"
                    startOffset="0%"
                    textLength={textCircumference}
                    lengthAdjust="spacing"
                  >
                    CENTER OF TALENT DEVELOPMENT • WOXSEN UNIVERSITY • 
                  </textPath>
                </text>
              </g>
            </motion.g>
          </svg>

          {/* 2. COTD Logo: Fades/scales in, then flies to nav logo on exit */}
          <motion.div
            ref={splashLogoRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isExiting
                ? undefined
                : {
                    opacity: showLogo ? 1 : 0,
                    scale: showLogo ? 1 : 0.9,
                  }
            }
            transition={{
              duration: 0.6,
              ease: [0.2, 0, 0, 1],
            }}
            style={
              isExiting
                ? {
                    x: logoX,
                    y: logoY,
                    scale: logoScale,
                  }
                : undefined
            }
            className="relative z-20 flex items-center justify-center will-change-transform"
          >
            <img
              src="/assets/logos/cotd-logo.png"
              alt="Center of Talent Development logo"
              style={{ height: `${dimensions.logoHeight}px` }}
              className="w-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
            />
          </motion.div>
        </div>

        {/* 5. Typography below circle (32px gap) */}
        <div className="mt-8 flex flex-col items-center text-center">
          {/* COTD */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isExiting ? 0 : showSubtext ? 1 : 0,
              y: isExiting ? -6 : showSubtext ? 0 : 10,
            }}
            transition={{
              duration: isExiting ? 0.2 : 0.4,
              ease: [0.2, 0, 0, 1],
            }}
            className="text-[28px] font-semibold tracking-[0.3em] text-[#FFFFFF] font-sans"
          >
            COTD
          </motion.div>

          {/* PRESENTS SKILL CAFÉ 3.0 (8px gap) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isExiting ? 0 : showSubtext ? 0.5 : 0,
              y: isExiting ? -6 : showSubtext ? 0 : 10,
            }}
            transition={{
              duration: isExiting ? 0.2 : 0.4,
              delay: isExiting ? 0 : 0.15,
              ease: [0.2, 0, 0, 1],
            }}
            className="mt-2 text-[12px] font-medium tracking-[0.2em] text-[#FFFFFF] font-sans"
          >
            PRESENTS SKILL CAFÉ 3.0
          </motion.div>
        </div>
      </div>

      {/* Accessible Skip Button */}
      <motion.button
        ref={skipBtnRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          triggerExit();
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-6 right-6 z-50 text-[13px] text-white/50 hover:text-white/80 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70 rounded px-2.5 py-1.5 cursor-pointer pointer-events-auto font-sans"
        aria-label="Skip intro animation"
      >
        Skip
      </motion.button>
    </div>
  );
};
