import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  motion,
  useMotionValue,
  useScroll,
  useVelocity,
  useSpring,
  useAnimationFrame,
  wrap,
} from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/gallery';
import { GalleryItem } from '../types';

interface VelocityRowProps {
  items: GalleryItem[];
  direction: 'left' | 'right';
  isPlaying: boolean;
  isInView: boolean;
  isTabVisible: boolean;
  onSelectItem: (item: GalleryItem) => void;
}

const VelocityRow: React.FC<VelocityRowProps> = ({
  items,
  direction,
  isPlaying,
  isInView,
  isTabVisible,
  onSelectItem,
}) => {
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  const isHoveredRef = useRef(false);
  const hoverFactorRef = useRef(1.0);
  const playFactorRef = useRef(1.0);

  // Drag & momentum refs
  const isDraggingRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const lastPointerTimeRef = useRef(0);
  const dragVelocityRef = useRef(0);

  // Measure single track width dynamically
  useEffect(() => {
    const updateWidth = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.offsetWidth);
      }
    };

    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [items]);

  // Animation frame loop
  useAnimationFrame((_time, delta) => {
    if (!isInView || !isTabVisible || trackWidth === 0) return;

    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const dt = Math.min(delta, 100) / 1000;

    // 1. Smooth hover ease over ~400ms (mouse devices only)
    const targetHover = isHoveredRef.current ? 0 : 1;
    hoverFactorRef.current += (targetHover - hoverFactorRef.current) * Math.min(1, delta / 400);

    // 2. Smooth play/pause ease over ~200ms
    const targetPlay = isPlaying ? 1 : 0;
    playFactorRef.current += (targetPlay - playFactorRef.current) * Math.min(1, delta / 200);

    // 3. Drag momentum inertia decay over ~1s
    if (!isDraggingRef.current && Math.abs(dragVelocityRef.current) > 0.5) {
      const nextX = x.get() + dragVelocityRef.current * dt;
      x.set(wrap(-trackWidth, 0, nextX));
      dragVelocityRef.current *= Math.pow(0.04, dt);
      if (Math.abs(dragVelocityRef.current) <= 0.5) {
        dragVelocityRef.current = 0;
      }
    }

    // 4. Velocity-linked auto scroll
    if (!isDraggingRef.current) {
      const scrollVel = smoothVelocity.get();
      // Up to ~5x base speed boost, scroll up reverses direction
      const boost = Math.min(Math.max(scrollVel * 0.003, -4), 4);
      const directionMultiplier = 1 + boost;

      // Base speed: 70px/s (top row left, bottom row right)
      const baseSpeed = direction === 'left' ? -70 : 70;
      const moveBy = baseSpeed * directionMultiplier * hoverFactorRef.current * playFactorRef.current * dt;

      const nextX = x.get() + moveBy;
      x.set(wrap(-trackWidth, 0, nextX));
    }
  });

  // Pointer drag events
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = performance.now();
    dragVelocityRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dx = e.clientX - lastPointerXRef.current;
    const dt = Math.max(1, now - lastPointerTimeRef.current) / 1000;

    dragVelocityRef.current = dx / dt;
    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = now;

    if (trackWidth > 0) {
      x.set(wrap(-trackWidth, 0, x.get() + dx));
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const renderCard = (item: GalleryItem, isDuplicate = false) => (
    <div
      key={isDuplicate ? `dup-${item.id}` : item.id}
      onClick={() => onSelectItem(item)}
      onKeyDown={(e) => {
        if (!isDuplicate && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onSelectItem(item);
        }
      }}
      tabIndex={isDuplicate ? -1 : 0}
      aria-hidden={isDuplicate}
      role={isDuplicate ? undefined : 'button'}
      aria-label={isDuplicate ? undefined : `View photo: ${item.title}`}
      className="w-[260px] md:w-[360px] shrink-0 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#DA5662] rounded-[20px] select-none"
    >
      {/* Photo Container: 4:3 ratio, 20px radius, no border or background box */}
      <div className="aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-[#E8EAED] relative shadow-sm pointer-events-none">
        <img
          src={item.src}
          alt={isDuplicate ? '' : item.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-400 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.03]"
        />
      </div>

      {/* Caption directly below photo: 14px secondary gray (#5F6368), 12px gap (mt-3) */}
      <p className="mt-3 text-[14px] text-[#5F6368] font-normal line-clamp-1 pointer-events-none">
        {item.title}
      </p>
    </div>
  );

  return (
    <div
      className="gallery-mask overflow-hidden w-full select-none cursor-grab active:cursor-grabbing"
      style={{ touchAction: 'pan-y' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
    >
      <motion.div
        className="flex gap-5 w-max will-change-transform py-2"
        style={{ x }}
      >
        {/* Sequence 1: Measured track for seamless wrap */}
        <div ref={trackRef} className="flex gap-5 shrink-0">
          {items.map((item) => renderCard(item, false))}
        </div>

        {/* Sequence 2: Duplicate for seamless loop */}
        <div className="flex gap-5 shrink-0" aria-hidden="true">
          {items.map((item) => renderCard(item, true))}
        </div>

        {/* Sequence 3: Buffer for ultra-wide displays */}
        <div className="flex gap-5 shrink-0" aria-hidden="true">
          {items.map((item) => renderCard(item, true))}
        </div>
      </motion.div>
    </div>
  );
};

export const ArchivesGallery: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isInView, setIsInView] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);

  // Performance: Pause when off-screen or tab hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '200px 0px' }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
    };
  }, []);

  // Filter items by edition
  const row1Items = useMemo(
    () => GALLERY_ITEMS.filter((item) => item.edition === 'Skill Café 2.0'),
    []
  );

  const row2Items = useMemo(
    () => GALLERY_ITEMS.filter((item) => item.edition === 'Skill Café 1.0'),
    []
  );

  // Lightbox controls
  const allItems = useMemo(() => [...row1Items, ...row2Items], [row1Items, row2Items]);
  const currentIndex = selectedItem ? allItems.findIndex((it) => it.id === selectedItem.id) : -1;

  const handleNext = useCallback(() => {
    if (currentIndex >= 0 && currentIndex < allItems.length - 1) {
      setSelectedItem(allItems[currentIndex + 1]);
    } else {
      setSelectedItem(allItems[0]);
    }
  }, [currentIndex, allItems]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setSelectedItem(allItems[currentIndex - 1]);
    } else {
      setSelectedItem(allItems[allItems.length - 1]);
    }
  }, [currentIndex, allItems]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === 'Escape') setSelectedItem(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, handleNext, handlePrev]);

  return (
    <section
      id="archives"
      ref={sectionRef}
      className="py-16 lg:py-32 bg-[#FFFFFF] border-t border-[#E8EAED] overflow-hidden"
    >
      {/* 
        Section Header: Aligned with normal content column.
        Small accessibility pause/play button aligned to the right of section heading.
      */}
      <div className="max-w-[1200px] mx-auto px-5 lg:px-6 mb-8 lg:mb-12">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-[640px]">
            <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-[#DA5662] mb-3 lg:mb-4">
              Archives
            </p>

            <h2 className="text-[28px] lg:text-[clamp(32px,4vw,48px)] font-medium leading-[1.2] lg:leading-[1.15] tracking-[-0.01em] text-[#202124]">
              Two editions. One growing table.
            </h2>
          </div>

          {/* Accessibility Pause/Play button (40px circle, 1px border #E8EAED, no background box) */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full border border-[#E8EAED] flex items-center justify-center text-[#202124] hover:bg-[#F8F9FA] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#DA5662] cursor-pointer shrink-0"
            aria-label={isPlaying ? 'Pause gallery animation' : 'Play gallery animation'}
            title={isPlaying ? 'Pause gallery animation' : 'Play gallery animation'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-[#202124]" />
            ) : (
              <Play className="w-4 h-4 text-[#202124] ml-0.5" />
            )}
          </button>
        </div>
      </div>

      {/* Row 1: Skill Café 2.0 (moves left) */}
      <div className="w-full">
        {/* Row Label: Aligned with normal content column */}
        <div className="max-w-[1200px] mx-auto px-5 lg:px-6 mb-3">
          <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-[#5F6368]">
            Skill Café 2.0
          </p>
        </div>

        {/* Wider Photo Row: max-w-[1680px], 32px space on desktop, 0 on mobile */}
        <div className="w-full max-w-[1680px] mx-auto px-0 md:px-8">
          <VelocityRow
            items={row1Items}
            direction="left"
            isPlaying={isPlaying}
            isInView={isInView}
            isTabVisible={isTabVisible}
            onSelectItem={setSelectedItem}
          />
        </div>
      </div>

      {/* 40px Gap Between Rows */}
      <div className="mt-10 w-full">
        {/* Row Label: Aligned with normal content column */}
        <div className="max-w-[1200px] mx-auto px-5 lg:px-6 mb-3">
          <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-[#5F6368]">
            Skill Café 1.0 · Coursera Café
          </p>
        </div>

        {/* Wider Photo Row: max-w-[1680px], 32px space on desktop, 0 on mobile */}
        <div className="w-full max-w-[1680px] mx-auto px-0 md:px-8">
          <VelocityRow
            items={row2Items}
            direction="right"
            isPlaying={isPlaying}
            isInView={isInView}
            isTabVisible={isTabVisible}
            onSelectItem={setSelectedItem}
          />
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-8 animate-fade-rise"
          onClick={() => setSelectedItem(null)}
        >
          {/* Close Button */}
          <div className="absolute top-6 right-6 text-white z-10">
            <button
              onClick={() => setSelectedItem(null)}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close image viewer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Previous Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all z-10 cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all z-10 cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption */}
          <div
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedItem.src}
              alt={selectedItem.title}
              className="max-h-[70vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-4 text-center text-white max-w-xl">
              <h4 className="text-[18px] sm:text-[20px] font-medium">{selectedItem.title}</h4>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
