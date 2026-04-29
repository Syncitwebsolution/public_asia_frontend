import React, { useState, useEffect, useCallback, useRef } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Calendar as CalendarIcon, 
  Maximize, 
  Download,
  Loader2,
  AlertCircle,
  Share2,
  ArrowRight,
  Printer
} from "lucide-react";
import api from "../assets/api";
import logoImg from '../assets/IMG_3084.JPG.jpeg';

const EPaperPage = () => {
  const [editions, setEditions] = useState([]);
  const [selectedEdition, setSelectedEdition] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [zoomScale, setZoomScale] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dateInputRef = useRef(null);

  // Fetch all editions metadata
  useEffect(() => {
    const fetchEditions = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/epaper");
        const editionList = data.data || [];
        setEditions(editionList);

        if (editionList.length > 0) {
          // Default to the most recent edition
          fetchEditionDetails(editionList[0].date);
        } else {
          setLoading(false);
          setError("अभी तक कोई ई-पेपर संस्करण उपलब्ध नहीं है।");
        }
      } catch (err) {
        console.error("Failed to fetch editions", err);
        setError("ई-पेपर संस्करण लोड करने में विफल।");
        setLoading(false);
      }
    };
    fetchEditions();
  }, []);

  const fetchEditionDetails = async (date) => {
    try {
      setLoading(true);
      const formattedDate = new Date(date).toISOString().split('T')[0];
      const { data } = await api.get(`/epaper/${formattedDate}`);
      setSelectedEdition(data.data);
      setCurrentPageIndex(0);
      setZoomScale(1);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch edition details", err);
      setError("चयनित तिथि के लिए ई-पेपर संस्करण नहीं मिला।");
      setSelectedEdition(null);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = useCallback(() => {
    if (selectedEdition && currentPageIndex < selectedEdition.pages.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
      setZoomScale(1);
    }
  }, [selectedEdition, currentPageIndex]);

  const handlePrevPage = useCallback(() => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
      setZoomScale(1);
    }
  }, [currentPageIndex]);

  const handleZoomIn = () => setZoomScale((prev) => Math.min(prev + 0.2, 2.5));
  const handleZoomOut = () => setZoomScale((prev) => Math.max(prev - 0.2, 0.5));
  const handleResetZoom = () => setZoomScale(1);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("hi-IN", {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };

  const handleCalendarToggle = () => {
    dateInputRef.current?.showPicker(); // Opens the native calendar picker
  };

  const onDateChange = (e) => {
    const newDate = e.target.value;
    if (newDate) {
      fetchEditionDetails(newDate);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Public Asia e-Paper',
        url: window.location.href,
      }).catch(console.error);
    }
  };

  if (loading && !selectedEdition) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50">
        <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-red-100 rounded-full"></div>
            <div className="absolute top-0 w-20 h-20 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <Printer className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-600" size={32} />
        </div>
        <p className="text-gray-900 font-black text-xl animate-pulse tracking-tight">Public Asia e-Paper लोड हो रहा है...</p>
        <p className="text-gray-400 mt-2 font-medium">कृपया प्रतीक्षा करें</p>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(new Date().getMonth() - 1);
  const minDate = oneMonthAgo.toISOString().split("T")[0];

  const currentPage = selectedEdition?.pages[currentPageIndex];

  return (
    <div className="bg-[#f0f2f5] min-h-screen flex flex-col font-sans">
      {/* --- High Contrast Professional Header --- */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-md">
        <div className="max-w-screen-2xl mx-auto px-4 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-2 sm:gap-6">
            <div className="flex items-center shrink-0">
               <img
                  src={logoImg}
                  alt="Public Asia"
                  style={{ height: '60px', width: 'auto' }}
                  className="object-contain"
                />
              <div className="h-6 w-px bg-gray-300 mx-4 hidden sm:block"></div>
              <span className="bg-red-600 text-white px-3 py-1 rounded-lg text-[10px] sm:text-xs font-black tracking-widest uppercase shadow-lg shadow-red-200">e-Paper</span>
            </div>

            {/* --- CALENDAR SELECTOR --- */}
            <div className="relative group ml-1 sm:ml-4">
              <input 
                type="date"
                ref={dateInputRef}
                onChange={onDateChange}
                min={minDate}
                max={today}
                className="absolute inset-0 opacity-0 pointer-events-none"
              />
              <button 
                onClick={handleCalendarToggle}
                className="flex items-center gap-2 bg-gray-50 text-gray-900 px-4 py-2.5 rounded-xl border border-gray-100 hover:bg-white hover:border-red-600 transition-all font-black text-[11px] sm:text-sm active:scale-95 shadow-sm"
              >
                <CalendarIcon size={16} className="text-red-600" />
                <span className="hidden sm:inline">तिथि चुनें</span>
                <span className="sm:hidden text-xs">Calendar</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-3">
             <div className="hidden md:flex items-center bg-gray-100 rounded-2xl p-1 border border-gray-200 mr-2">
                <button onClick={handleZoomOut} className="p-2 hover:bg-white rounded-xl transition text-gray-700 active:scale-90"><ZoomOut size={18} /></button>
                <span className="text-xs font-black w-14 text-center text-red-600">{Math.round(zoomScale * 100)}%</span>
                <button onClick={handleZoomIn} className="p-2 hover:bg-white rounded-xl transition text-gray-700 active:scale-90"><ZoomIn size={18} /></button>
             </div>
             
             <button onClick={handleShare} className="p-3 hover:bg-red-50 hover:text-red-600 rounded-xl transition text-gray-500 bg-gray-50 border border-gray-100" title="Share">
               <Share2 size={18} />
             </button>
             <a href={currentPage?.imageUrl} target="_blank" rel="noreferrer" className="p-3 hover:bg-red-50 hover:text-red-600 rounded-xl transition text-gray-500 bg-gray-50 border border-gray-100" title="Download">
               <Download size={18} />
             </a>
             <button onClick={handleResetZoom} className="p-3 hover:bg-red-50 hover:text-red-600 rounded-xl transition text-gray-500 bg-gray-50 border border-gray-100 hidden sm:block" title="Reset Viewer">
               <Maximize size={18} />
             </button>
          </div>
        </div>
      </header>

      {/* --- Edition Context & Quick Info --- */}
      <div className="bg-gray-900 text-white py-3 shadow-inner">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
             <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse shrink-0"></div>
             <p className="text-[11px] sm:text-sm font-black truncate uppercase tracking-widest text-gray-100">
               {selectedEdition?.title || "Latest Edition"} <span className="mx-2 opacity-30">|</span> {formatDate(selectedEdition?.date)}
             </p>
          </div>
          <div className="flex items-center gap-4 shrink-0 px-2 ml-2">
             <div className="text-[10px] sm:text-xs font-black uppercase text-red-600 bg-white px-3 py-1 rounded-full shadow-lg">
               Page {currentPageIndex + 1} / {selectedEdition?.pages.length || 0}
             </div>
          </div>
        </div>
      </div>

      {/* --- Main Viewer Section --- */}
      <main className="flex-1 overflow-hidden relative flex flex-col items-center justify-center p-2 sm:p-6 lg:p-10 bg-gray-200 custom-scrollbar-minimal">
        
        {error ? (
          <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md border-t-8 border-red-600">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle size={40} className="text-red-600" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">ओह! क्षमा करें</h3>
            <p className="text-gray-500 font-bold mb-8">{error}</p>
            <button 
               onClick={() => window.location.reload()} 
               className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-black hover:shadow-xl transition-all active:scale-95 flex items-center gap-3 mx-auto uppercase tracking-widest text-sm"
            >
              रीफ्रेश करें <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Desktop Navigation Floating Arrows */}
            <button 
              disabled={currentPageIndex === 0}
              onClick={handlePrevPage}
              className="absolute left-0 lg:left-8 z-40 p-5 bg-white/95 hover:bg-red-600 hover:text-white text-gray-900 rounded-2xl shadow-2xl transition-all disabled:opacity-0 disabled:pointer-events-none active:scale-90 border border-gray-100 hidden sm:flex"
            >
              <ChevronLeft size={32} strokeWidth={3} />
            </button>

            <button 
              disabled={currentPageIndex === selectedEdition?.pages.length - 1}
              onClick={handleNextPage}
              className="absolute right-0 lg:right-8 z-40 p-5 bg-white/95 hover:bg-red-600 hover:text-white text-gray-900 rounded-2xl shadow-2xl transition-all disabled:opacity-0 disabled:pointer-events-none active:scale-90 border border-gray-100 hidden sm:flex"
            >
              <ChevronRight size={32} strokeWidth={3} />
            </button>

            {/* THE PAGE VIEW */}
            <div 
              className={`transition-all duration-500 ease-out origin-top shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] bg-white relative overflow-hidden rounded-sm ${loading ? 'opacity-50 grayscale' : 'opacity-100 grayscale-0'}`}
              style={{ transform: `scale(${zoomScale})` }}
            >
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-10">
                   <div className="flex flex-col items-center">
                      <div className="w-16 h-16 border-4 border-red-100 border-t-red-600 rounded-full animate-spin"></div>
                      <span className="mt-4 text-[12px] font-black uppercase text-red-600 tracking-[0.2em] leading-none">Rendering...</span>
                   </div>
                </div>
              )}
              <img 
                 src={currentPage?.imageUrl}
                 alt={`Page ${currentPageIndex + 1}`}
                 className="max-w-full h-auto cursor-zoom-in"
                 style={{ width: 'auto', maxHeight: zoomScale > 1 ? 'none' : 'calc(100vh - 240px)' }}
                 onLoad={() => setLoading(false)}
                 onDoubleClick={handleResetZoom}
              />
            </div>
          </div>
        )}

        {/* Mobile Fixed Controls Overlay */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-gray-950/90 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] sm:hidden z-50 text-white">
          <button 
             onClick={handlePrevPage}
             disabled={currentPageIndex === 0}
             className="p-1 disabled:opacity-20 text-white"
          >
            <ChevronLeft size={28} strokeWidth={3} />
          </button>
          <div className="w-px h-6 bg-white/10 mx-2"></div>
          <span className="text-xs font-black min-w-[70px] text-center uppercase tracking-tighter">P - {currentPageIndex + 1} / {selectedEdition?.pages.length}</span>
          <div className="w-px h-6 bg-white/10 mx-2"></div>
          <button 
             onClick={handleNextPage}
             disabled={currentPageIndex === selectedEdition?.pages.length - 1}
             className="p-1 disabled:opacity-20 text-white"
          >
            <ChevronRight size={28} strokeWidth={3} />
          </button>
        </div>
      </main>

      {/* --- Thumbnail Overview Strip --- */}
      {!error && selectedEdition && (
        <div className="bg-white border-t border-gray-200 p-4 pb-8 overflow-hidden hidden sm:block">
          <div className="max-w-screen-2xl mx-auto flex items-center gap-6 overflow-x-auto pb-4 scrollbar-hide-custom">
            {selectedEdition?.pages.map((page, idx) => (
              <button
                key={page._id}
                onClick={() => {
                  setLoading(true);
                  setCurrentPageIndex(idx);
                  setZoomScale(1);
                }}
                className={`flex-shrink-0 w-24 h-32 border-4 rounded-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2 ${
                  currentPageIndex === idx 
                  ? 'border-red-600 shadow-2xl shadow-red-200 scale-110' 
                  : 'border-white hover:border-gray-200 shadow-md opacity-50 hover:opacity-100'
                }`}
              >
                <img src={page.imageUrl} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide-custom::-webkit-scrollbar { display: none; }
        .scrollbar-hide-custom { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar-minimal::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar-minimal::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 10px; }
        .custom-scrollbar-minimal::-webkit-scrollbar-track { background: transparent; }
      `}} />
    </div>
  );
};

export default EPaperPage;
