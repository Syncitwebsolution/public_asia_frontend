import React, { useState, useEffect, useRef } from "react";
import api from "../assets/api";
import { BookOpen, X, Play, ChevronLeft, ChevronRight, Share2, ExternalLink, Sparkles } from "lucide-react";

const WebStoryPage = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await api.get("/webstories?status=PUBLISHED");
        setStories(res.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch web stories", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  const activeStory = activeStoryIndex !== null ? stories[activeStoryIndex] : null;
  const currentSlides = activeStory?.slides?.length > 0
    ? activeStory.slides
    : activeStory
    ? [{ image: activeStory.image, title: activeStory.title, description: "", articleUrl: activeStory.articleUrl }]
    : [];

  // Reset slide index and progress when active story changes
  useEffect(() => {
    if (activeStoryIndex !== null) {
      setActiveSlideIndex(0);
      setProgress(0);
      setIsPaused(false);
    }
  }, [activeStoryIndex]);

  // Slide Timer Logic (5 seconds per slide = 1% per 50ms)
  useEffect(() => {
    if (activeStoryIndex === null || isPaused) return;
    setProgress(0);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Advance to next slide or next story
          if (activeSlideIndex < currentSlides.length - 1) {
            setActiveSlideIndex((s) => s + 1);
          } else if (activeStoryIndex < stories.length - 1) {
            setActiveStoryIndex((st) => st + 1);
          } else {
            setActiveStoryIndex(null);
          }
          return 0;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [activeStoryIndex, activeSlideIndex, currentSlides.length, stories.length, isPaused]);

  const handleNextSlide = (e) => {
    e?.stopPropagation();
    if (activeSlideIndex < currentSlides.length - 1) {
      setActiveSlideIndex(activeSlideIndex + 1);
      setProgress(0);
    } else if (activeStoryIndex < stories.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
    } else {
      setActiveStoryIndex(null);
    }
  };

  const handlePrevSlide = (e) => {
    e?.stopPropagation();
    if (activeSlideIndex > 0) {
      setActiveSlideIndex(activeSlideIndex - 1);
      setProgress(0);
    } else if (activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
    }
  };

  const currentSlide = currentSlides[activeSlideIndex] || {};

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                वेब स्टोरीज़
                <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> AMP Web Stories
                </span>
              </h1>
              <p className="text-slate-500 font-medium mt-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></span>
                Visual Stories by Public Asia News
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-xl text-orange-600 font-bold text-sm">
            <Play size={16} fill="currentColor" />
            <span>Tap to View & Auto-Play</span>
          </div>
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-slate-100">
            <div className="w-16 h-16 border-4 border-orange-100 border-t-orange-600 rounded-full animate-spin"></div>
            <p className="mt-6 text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Web Stories...</p>
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-slate-300" />
            </div>
            <h2 className="text-2xl font-black text-slate-400">कोई वेब स्टोरी नहीं मिली</h2>
            <p className="text-slate-500 mt-2 font-medium">जल्द ही नई स्टोरीज़ अपलोड की जाएंगी।</p>
          </div>
        ) : (
          /* STORY GRID CARDS */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-8">
            {stories.map((story, index) => (
              <div 
                key={story._id || index} 
                onClick={() => setActiveStoryIndex(index)} 
                className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 aspect-[9/16] cursor-pointer ring-1 ring-slate-200/60 bg-slate-900"
              >
                <img 
                  src={story.image} 
                  alt={story.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90" 
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-between p-5">
                  <div className="flex items-center justify-between">
                    <span className="bg-black/40 backdrop-blur-md text-white text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-lg border border-white/20">
                      {story.category?.name || "Story"}
                    </span>
                    {story.slides?.length > 1 && (
                      <span className="bg-orange-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md shadow-sm">
                        {story.slides.length} SLIDES
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-white font-black text-base md:text-lg leading-snug line-clamp-3 group-hover:text-orange-400 transition-colors drop-shadow-md">
                      {story.title}
                    </h3>
                    <div className="mt-4 flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                      <div className="w-7 h-7 rounded-full bg-orange-600/90 flex items-center justify-center">
                        <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                      </div>
                      <span className="text-xs font-extrabold uppercase tracking-wider">Watch Story</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 🚀 FULLSCREEN MULTI-SLIDE STORY VIEWER MODAL */}
        {activeStory && (
          <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-0 md:p-4">
            
            {/* Close Button */}
            <button 
              onClick={() => setActiveStoryIndex(null)}
              className="absolute top-4 right-4 z-50 p-3 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-all border border-white/10"
              title="Close Story"
            >
              <X size={24} />
            </button>

            {/* Desktop Navigation Arrows */}
            {activeStoryIndex > 0 || activeSlideIndex > 0 ? (
              <button
                onClick={handlePrevSlide}
                className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-50 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-md"
              >
                <ChevronLeft size={32} />
              </button>
            ) : null}

            {activeStoryIndex < stories.length - 1 || activeSlideIndex < currentSlides.length - 1 ? (
              <button
                onClick={handleNextSlide}
                className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-50 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-md"
              >
                <ChevronRight size={32} />
              </button>
            ) : null}

            {/* Main Phone Story Container */}
            <div 
              className="relative w-full max-w-[420px] h-full md:h-[90vh] md:max-h-[820px] bg-slate-900 md:rounded-[36px] overflow-hidden shadow-2xl flex flex-col justify-between select-none"
              onMouseDown={() => setIsPaused(true)}
              onMouseUp={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              {/* Background Slide Image */}
              <img 
                src={currentSlide.image || activeStory.image} 
                alt={currentSlide.title || activeStory.title}
                className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-300"
              />

              {/* Dark Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />

              {/* TOP BAR: Segmented Progress Bars & Story Meta */}
              <div className="relative z-20 p-4 space-y-3">
                {/* Segmented Progress Bars */}
                <div className="flex gap-1.5 w-full">
                  {currentSlides.map((_, idx) => (
                    <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white transition-all duration-75"
                        style={{
                          width: idx < activeSlideIndex ? "100%" : idx === activeSlideIndex ? `${progress}%` : "0%"
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Story Meta Header */}
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-xs font-black">
                      PA
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-tight">Public Asia News</p>
                      <p className="text-[10px] text-white/70 font-semibold">{activeStory.category?.name || "Web Story"}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                    {activeSlideIndex + 1} / {currentSlides.length}
                  </span>
                </div>
              </div>

              {/* TAP NAVIGATION OVERLAYS (Left / Right) */}
              <div className="absolute inset-0 z-10 flex">
                <div onClick={handlePrevSlide} className="w-1/3 h-full cursor-pointer" />
                <div onClick={handleNextSlide} className="w-2/3 h-full cursor-pointer" />
              </div>

              {/* BOTTOM SLIDE INFO & CTA */}
              <div className="relative z-20 p-6 space-y-4">
                <div className="bg-black/60 backdrop-blur-xl p-5 rounded-3xl border border-white/15 space-y-2 shadow-2xl">
                  {currentSlide.title && (
                    <h2 className="text-white font-black text-lg md:text-xl leading-snug drop-shadow-md">
                      {currentSlide.title}
                    </h2>
                  )}

                  {currentSlide.description && (
                    <p className="text-white/90 font-medium text-xs md:text-sm leading-relaxed">
                      {currentSlide.description}
                    </p>
                  )}

                  {!currentSlide.title && !currentSlide.description && (
                    <h2 className="text-white font-black text-lg leading-snug">
                      {activeStory.title}
                    </h2>
                  )}
                </div>

                {/* Swipe Up / Call To Action Link */}
                {(currentSlide.articleUrl || activeStory.articleUrl) && (
                  <a 
                    href={currentSlide.articleUrl || activeStory.articleUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-sm py-3 px-6 rounded-2xl shadow-lg shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>पूरी खबर पढ़ें (Read Article)</span>
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default WebStoryPage;
