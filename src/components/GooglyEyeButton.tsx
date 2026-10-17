import React, { useRef, useEffect, useState } from 'react';

interface GooglyEyeButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  showEyes?: boolean;
}

export const GooglyEyeButton: React.FC<GooglyEyeButtonProps> = ({
  text = 'Register free',
  onClick,
  className = '',
  showEyes = true,
}) => {
  const eye1Ref = useRef<HTMLDivElement>(null);
  const eye2Ref = useRef<HTMLDivElement>(null);
  const pupil1Ref = useRef<HTMLDivElement>(null);
  const pupil2Ref = useRef<HTMLDivElement>(null);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      const updatePupil = (
        eyeEl: HTMLDivElement | null,
        pupilEl: HTMLDivElement | null,
        maxOffset: number
      ) => {
        if (!eyeEl || !pupilEl) return;
        const rect = eyeEl.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const dx = clientX - eyeCenterX;
        const dy = clientY - eyeCenterY;
        const angle = Math.atan2(dy, dx);

        const distance = Math.hypot(dx, dy);
        const offset = Math.min(distance / 12, maxOffset);

        const pupilX = Math.cos(angle) * offset;
        const pupilY = Math.sin(angle) * offset;

        pupilEl.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
      };

      const maxOffset = 5.5;
      updatePupil(eye1Ref.current, pupil1Ref.current, maxOffset);
      updatePupil(eye2Ref.current, pupil2Ref.current, maxOffset);
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const triggerBlink = () => {
    setIsBlinking(true);
    setTimeout(() => setIsBlinking(false), 180);
  };

  const handleClick = () => {
    triggerBlink();
    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={triggerBlink}
      className={`group relative inline-flex items-center justify-center h-[48px] px-6 rounded-full bg-[#DA5662] hover:bg-[#C84652] text-white text-base font-medium transition-colors duration-200 select-none cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DA5662] shadow-sm ${className}`}
    >
      <span className="text-center">{text}</span>

      {/* Googly Eyes Container: only visible on devices with real mouse (hover: hover and pointer: fine) */}
      {showEyes && (
        <div className="googly-eyes-wrapper items-center -space-x-1 ml-3" aria-hidden="true">
        {/* Eye 1 */}
        <div
          ref={eye1Ref}
          className={`w-6 h-6 rounded-full bg-[#FFFFFF] border border-[#C84652]/20 flex items-center justify-center overflow-hidden relative transition-transform duration-150 ${
            isBlinking ? 'scale-y-[0.1]' : 'scale-y-100'
          }`}
        >
          <div
            ref={pupil1Ref}
            className="w-2.5 h-2.5 rounded-full bg-[#202124] will-change-transform"
          />
        </div>

        {/* Eye 2 */}
        <div
          ref={eye2Ref}
          className={`w-6 h-6 rounded-full bg-[#FFFFFF] border border-[#C84652]/20 flex items-center justify-center overflow-hidden relative transition-transform duration-150 ${
            isBlinking ? 'scale-y-[0.1]' : 'scale-y-100'
          }`}
        >
          <div
            ref={pupil2Ref}
            className="w-2.5 h-2.5 rounded-full bg-[#202124] will-change-transform"
          />
        </div>
        </div>
      )}
    </button>
  );
};
