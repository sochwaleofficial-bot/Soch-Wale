import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft, ChevronRight, Pause, Play, ArrowRight, MessageCircle, ExternalLink } from 'lucide-react';

export const HeroSlider: React.FC = () => {
  const { heroSlides, navigate, setCheckoutProduct, booklets } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const slideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeSlides = heroSlides.filter((s) => s.isActive);
  const totalSlides = activeSlides.length;

  useEffect(() => {
    if (isPlaying && totalSlides > 1) {
      slideTimerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }, 7000);
    }
    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    };
  }, [isPlaying, totalSlides, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const handleCtaClick = (link: string) => {
    if (link.startsWith('http')) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      navigate(link);
    }
  };

  if (totalSlides === 0) return null;

  const currentSlide = activeSlides[currentIndex];

  return (
    <section
      className="relative bg-[#0A0A0A] text-white overflow-hidden border-b border-[#1E1E1E]"
      aria-label="Featured Educational Topics"
    >
      {/* 16:9 Responsive Viewport Container */}
      <div className="relative w-full aspect-[16/9] max-h-[720px] min-h-[460px]">
        {/* Background 16:9 Image with Smooth Crossfade */}
        {activeSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.titleUr}
              className="w-full h-full object-cover object-center"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            {/* Scrim: for custom banner keep it subtle so the red BUY NOW graphic and website text are visible */}
            {slide.isCustomBanner ? (
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-black/30 to-[#0A0A0A]/40 sm:bg-gradient-to-t sm:from-[#0A0A0A]/85 sm:via-transparent sm:to-black/20" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/40 lg:bg-gradient-to-r lg:from-[#0A0A0A]/95 lg:via-[#0A0A0A]/80 lg:to-transparent" />
            )}
          </div>
        ))}

        {/* Slide Content Layer */}
        <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
          {currentSlide.isCustomBanner ? (
            /* Custom Banner Slide Layout (Showcasing Nangi Baatein Book Launch with BUY NOW) */
            <div className="w-full flex flex-col justify-end h-full pb-16 sm:pb-20 max-w-2xl lg:max-w-3xl">
              <div className="bg-[#0A0A0A]/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-stone-800 shadow-2xl space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-widest text-[#B89A5A] font-bold bg-[#1A1A1A] px-2.5 py-1 rounded">
                    {currentSlide.category}
                  </span>
                  <span className="text-stone-500">·</span>
                  <span className="text-xs text-stone-300">نئی خصوصی اشاعت</span>
                </div>

                <h1 className="font-urdu-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white text-right leading-[1.8]">
                  {currentSlide.titleUr}
                </h1>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl">
                  {currentSlide.supportingTextEn}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => handleCtaClick(currentSlide.ctaLink)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xl transition-all cursor-pointer group"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>{currentSlide.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    onClick={() => navigate('/booklets/book-nangi-baatein')}
                    className="inline-flex items-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-lg backdrop-blur-sm transition-colors border border-white/20"
                  >
                    <span>View Book Details & Chapters</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Standard Editorial Slide Layout */
            <div className="max-w-2xl lg:max-w-3xl py-12 lg:py-20">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs uppercase tracking-widest text-[#B89A5A] font-semibold">
                  {currentSlide.category}
                </span>
                <span className="text-stone-500">·</span>
                <span className="text-xs text-stone-400">سوچ والے خصوصی تعلیمی سلسلہ</span>
              </div>

              {/* Urdu Primary Headline in Jameel Noori Nastaleeq */}
              <h1 className="font-urdu-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 drop-shadow-md leading-[1.8] text-right">
                {currentSlide.titleUr}
              </h1>

              {/* English Supporting Text */}
              <p className="text-sm sm:text-base lg:text-lg text-stone-300 mb-8 leading-relaxed max-w-xl">
                {currentSlide.supportingTextEn}
              </p>

              {/* Action CTA */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => handleCtaClick(currentSlide.ctaLink)}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#B89A5A] hover:bg-[#967B43] text-[#0A0A0A] font-semibold text-sm rounded shadow-lg transition-colors cursor-pointer group"
                >
                  <span>{currentSlide.ctaText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => navigate('/courses')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium text-sm rounded backdrop-blur-sm transition-colors border border-white/20"
                >
                  <span>All Courses</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Accessible Slider Controls (Bottom Bar) */}
        <div className="absolute bottom-6 right-6 lg:right-12 z-30 flex items-center gap-3 bg-[#0A0A0A]/80 backdrop-blur-md px-4 py-2 rounded-full border border-stone-800">
          {/* Pause / Play */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 text-stone-400 hover:text-white transition-colors"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {/* Indicators */}
          <div className="flex items-center gap-1.5 px-2">
            {activeSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? 'w-6 bg-[#B89A5A]' : 'w-2 bg-stone-600 hover:bg-stone-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-1 border-l border-stone-800 pl-2">
            <button
              onClick={handlePrev}
              className="p-1 text-stone-300 hover:text-white transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-1 text-stone-300 hover:text-white transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
