import React, { useState, useEffect } from "react";
import api from "../assets/api";
import { BookOpen, X, Play, Clock, Share2, ArrowLeft } from "lucide-react";

const WebStoryPage = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);
  const [progress, setProgress] = useState(0);

  // 🚀 Auto-Advance Timer Logic
  useEffect(() => {
    if (activeIndex === null) return;
    setProgress(0);
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Auto-advance to next story or close if at the end
          if (activeIndex < stories.length - 1) setActiveIndex(activeIndex + 1);
          else setActiveIndex(null);
          return 100;
        }
        return prev + 1; // 1% per 50ms = 5 seconds total
      });
    }, 50);

    return () => clearInterval(timer);
  }, [activeIndex, stories.length]);

  const activeStory = activeIndex !== null ? stories[activeIndex] : null;

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await api.get('/webstories?status=PUBLISHED');
        setStories(res.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch web stories", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">वेब स्टोरीज़</h1>
              <p className="text-gray-500 font-medium mt-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></span>
                Visual Stories by Public Asia
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-xl text-orange-600 font-bold text-sm">
            <Play size={16} fill="currentColor" />
            <span>Auto-Play Enabled</span>
          </div>
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-gray-100">
            <div className="w-16 h-16 border-4 border-orange-100 border-t-orange-600 rounded-full animate-spin"></div>
            <p className="mt-6 text-gray-400 font-bold uppercase tracking-widest text-xs">Storytelling in progress...</p>
          </div>
        ) : stories.length === 0 ? (
           <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-gray-200" />
              </div>
              <h2 className="text-2xl font-black text-gray-400">कोई वेब स्टोरी नहीं मिली</h2>
              <p className="text-gray-500 mt-2 font-medium">जल्द ही नई स्टोरीज़ अपलोड की जाएंगी।</p>
           </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
            {stories.map((story, index) => (
              <div 
                key={story._id} 
                onClick={() => setActiveIndex(index)} 
                className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 aspect-[9/16] cursor-pointer ring-1 ring-gray-100"
              >
                 <img src={story.image} alt={story.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-5">
                    <span className="bg-white/20 backdrop-blur-md text-white text-[10px] uppercase font-black tracking-widest px-3 py-1.5 rounded-lg inline-block mb-3 w-max border border-white/20">
                       {story.category?.name || "Story"}
                    </span>
                    <h3 className="text-white font-black text-sm md:text-lg leading-tight line-clamp-3 group-hover:text-orange-400 transition-colors">
                       {story.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-md">
                         <Play size={14} fill="white" />
                      </div>
                      <span className="text-[10px] text-white font-bold uppercase tracking-widest">Watch Story</span>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        )}

        {/* 🚀 FULLSCREEN STORY VIEWER MODAL */}
        {activeStory && (
          <div className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center p-0 sm:p-8">
            {/* Close Button */}
            <button 
              onClick={() => setActiveIndex(null)}
              className="absolute top-6 right-6 p-3 bg-black/40 hover:bg-red-600 text-white rounded-full transition-all z-[1010] backdrop-blur-md border border-white/10 active:scale-90"
            >
              <X size={24} />
            </button>

            <button 
              onClick={() => setActiveIndex(null)}
              className="absolute top-6 left-6 flex items-center gap-2 text-white/60 hover:text-white transition-all z-[1010] font-black uppercase tracking-widest text-xs"
            >
              <ArrowLeft size={16} /> Close
            </button>
            
            {/* Story Container (Instagram Reel Style) */}
            <div className="relative w-full max-w-[450px] h-full sm:h-[90vh] sm:rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
              
              {/* 🚀 Progress Bar */}
              <div className="absolute top-0 left-0 right-0 z-[1020] flex gap-1.5 p-4 bg-gradient-to-b from-black/60 to-transparent">
                <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white transition-all duration-75 ease-linear shadow-[0_0_10px_#fff]" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="absolute top-8 left-4 z-[1020] flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full border-2 border-orange-500 p-0.5">
                    <div className="w-full h-full bg-red-600 rounded-full flex items-center justify-center text-white font-black text-xs">P</div>
                 </div>
                 <div>
                    <p className="text-white font-black text-sm shadow-sm">Public Asia</p>
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Trending Now</p>
                 </div>
              </div>

              <img 
                src={activeStory.image} 
                alt={activeStory.title}
                className="w-full h-full object-cover"
              />
              {/* Story Overlay Info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent flex flex-col justify-end p-8">
                <span className="bg-orange-600 text-white text-[10px] uppercase font-black tracking-widest px-3 py-1.5 rounded-lg inline-block mb-4 w-max shadow-xl shadow-orange-900/40">
                  {activeStory.category?.name || "Story"}
                </span>
                <h2 className="text-white font-black text-2xl sm:text-3xl leading-tight drop-shadow-xl mb-12">
                  {activeStory.title}
                </h2>
                
                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                   <div className="flex items-center gap-2 text-white/60 text-xs font-bold">
                      <Clock size={14} /> <span>Just Now</span>
                   </div>
                   <button className="text-white hover:text-orange-400 transition-colors">
                      <Share2 size={20} />
                   </button>
                </div>

                {/* 🚀 Swipe Up Article Link */}
                {activeStory.articleUrl && (
                  <div className="mt-10 mb-2 flex justify-center w-full animate-bounce">
                    <a href={activeStory.articleUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-white/90 hover:text-white transition-colors group/link">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">Swipe Up</span>
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover/link:bg-white/30 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Buttons (Desktop) */}
            <div className="hidden lg:flex absolute inset-x-0 top-1/2 -translate-y-1/2 justify-between px-10 pointer-events-none">
                <button 
                  onClick={() => activeIndex > 0 && setActiveIndex(activeIndex - 1)}
                  className={`p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all pointer-events-auto ${activeIndex === 0 ? 'opacity-0' : 'opacity-100'}`}
                >
                  <ArrowLeft size={32} />
                </button>
                <button 
                  onClick={() => activeIndex < stories.length - 1 && setActiveIndex(activeIndex + 1)}
                  className={`p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all pointer-events-auto ${activeIndex === stories.length - 1 ? 'opacity-0' : 'opacity-100'}`}
                >
                   <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebStoryPage;
