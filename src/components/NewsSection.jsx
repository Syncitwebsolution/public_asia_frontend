import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TrendingUp, Clock, ChevronRight, Loader2, Play, Share2, Check, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { useNavigate, useParams } from "react-router-dom";
import api from "../assets/api";

const NewsSection = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();

  // ── STATES ──
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]); // 🚀 MASTERSTROKE: Only a single Video State
  const [ad, setAd] = useState(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [current, setCurrent] = useState(0);
  const [copiedId, setCopiedId] = useState(null);
  const [activeShareId, setActiveShareId] = useState(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const [menuDirection, setMenuDirection] = useState('down'); // 'up' or 'down'

  const handleShareToggle = (e, id) => {
    e.stopPropagation();
    if (activeShareId === id) {
      setActiveShareId(null);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      const screenHeight = window.innerHeight;
      const menuHeight = 240; // Approx height of the share menu
      
      let topPos = rect.bottom + 8;
      let direction = 'down';
      
      // If menu would go off the bottom of the screen, flip it upwards
      if (rect.bottom + menuHeight > screenHeight) {
        topPos = rect.top - menuHeight - 8;
        direction = 'up';
      }

      setMenuPos({ top: topPos, left: rect.right - 140 });
      setMenuDirection(direction);
      setActiveShareId(id);
    }
  };

  const handleShareAction = async (e, item, platform) => {
    e.stopPropagation();
    const url = `${window.location.origin}/news/${item.slug}`;
    const title = item.title;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopiedId(item._id);
        setTimeout(() => setCopiedId(null), 2000);
        break;
      case 'native':
        if (navigator.share) {
          try {
            await navigator.share({ title, text: title, url });
          } catch (err) {
            console.log('Error sharing', err);
          }
        }
        break;
      default:
        break;
    }
    setActiveShareId(null);
  };

  // Close share menu on click outside
  useEffect(() => {
    const handleOutsideClick = () => setActiveShareId(null);
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  // ── 1. RESET STATE ON CATEGORY CHANGE + SCROLL TO TOP ──
  useEffect(() => {
    setArticles([]);
    setVideos([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [categoryName]);

  // Fetch Ad
  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await api.get('/ads?activeOnly=true&placement=feed');
        const adsList = res.data?.data?.ads || [];
        if (adsList.length > 0) {
          setAd(adsList[Math.floor(Math.random() * adsList.length)]);
        }
      } catch (error) {
        console.error("Failed to fetch ad", error);
      }
    };
    fetchAd();
  }, []);

  // ── 2. FETCH DATA FUNCTION ──
  useEffect(() => {
    const fetchData = async () => {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      try {
        let articleApiUrl = `/articles?page=${page}&limit=10`;
        let videoApiUrl = `/videos?status=PUBLISHED&page=${page}&limit=10`;

        if (categoryName) {
          articleApiUrl += `&category=${categoryName}`;
          videoApiUrl += `&category=${categoryName}`;
        }

        const [articlesRes, videosRes] = await Promise.all([
          api.get(articleApiUrl),
          api.get(videoApiUrl)
        ]);

        const newArticles = articlesRes.data?.data?.articles || [];
        const newVideos = videosRes.data?.data?.videos || [];

        // Articles append logic
        setArticles(prev => {
          if (page === 1) return newArticles;
          const existingIds = new Set(prev.map(a => a._id));
          return [...prev, ...newArticles.filter(a => !existingIds.has(a._id))];
        });

        // Videos append logic (All videos are gathered in one place)
        setVideos(prev => {
          if (page === 1) return newVideos;
          const existingIds = new Set(prev.map(v => v._id));
          return [...prev, ...newVideos.filter(v => !existingIds.has(v._id))];
        });

        setHasMore(articlesRes.data?.data?.pagination?.hasNextPage || false);

      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    fetchData();
  }, [categoryName, page]);

  // ── 3. THE SPY (INTERSECTION OBSERVER) ──
  const observer = useRef();
  const lastArticleElementRef = useCallback(node => {
    if (loadingMore) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loadingMore, hasMore]);

  // ── HELPER FUNCTIONS ──
  const trending = articles.slice(0, 6);

  useEffect(() => {
    if (trending.length === 0) return;
    const interval = setInterval(() => setCurrent(prev => (prev + 1) % trending.length), 3500);
    return () => clearInterval(interval);
  }, [trending.length]);

  const getYtId = (url) => {
    const m = url?.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
    return m && m[2].length === 11 ? m[2] : null;
  };

  const getEmbedUrl = (url) => {
    const id = getYtId(url);
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1&mute=1` : url;
  };

  const timeAgo = (d) => {
    if (!d) return '';
    const mins = Math.floor((Date.now() - new Date(d).getTime()) / 60000);
    if (mins < 60) return `${mins} मिनट पहले`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} घंटे पहले`;
    return `${Math.floor(hrs / 24)} दिन पहले`;
  };

  const strip = (h) => h ? h.replace(/<[^>]*>?/gm, '').substring(0, 200) : '';

  // ── RENDER ──
  if (loading && page === 1) return (
    <div className="flex items-center justify-center py-24">
      <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
      <span className="ml-3 text-gray-500 text-lg">लोड हो रहा है...</span>
    </div>
  );

  if (!articles.length && !videos.length) return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold text-gray-600">
        {categoryName ? `"${decodeURIComponent(categoryName)}" में कोई खबर नहीं` : 'अभी कोई समाचार नहीं है'}
      </h2>
      <p className="text-gray-400 mt-2 text-lg">कृपया बाद में देखें।</p>
    </div>
  );

  // 🚀 SLICING LOGIC (NO DUPLICATES)
  const heroVideo = videos[0]; // 1st video
  const restVideos = videos.slice(1, 5); // 2nd to 5th video (for grid)
  const feedVideos = videos.slice(5); // 6th video onwards (ONLY FOR FEED)

  const heroArticle = articles[0]; // 1st article
  const restArticles = articles.slice(1); // 2nd article onwards (for feed)

  return (
    <div className="space-y-6">

      {/* ── 1. TRENDING TICKER ── */}
      {trending.length > 0 && (
        <div className="flex items-center bg-white border border-gray-200 rounded overflow-hidden">
          <div className="bg-red-600 text-white px-4 py-2.5 font-bold text-sm flex items-center gap-1.5 shrink-0">
            <TrendingUp size={16} /> ट्रेंडिंग
          </div>
          <div className="relative h-6 overflow-hidden flex-1 px-4">
            <div className="absolute transition-transform duration-500 w-full"
              style={{ transform: `translateY(-${current * 24}px)` }}>
              {trending.map((item, i) => (
                <div key={item._id || i}
                  className="h-6 text-base text-gray-800 font-medium whitespace-nowrap truncate cursor-pointer hover:text-red-600"
                  onClick={() => navigate(`/news/${item.slug}`)}>
                  {item.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── 2. HERO VIDEO ── */}
      {heroVideo && (
        <div className="bg-white border border-gray-200 rounded overflow-hidden">
          <div className="aspect-video bg-black">
            <iframe className="w-full h-full" src={getEmbedUrl(heroVideo.videoUrl)}
              title={heroVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen />
          </div>
          <div className="p-4 border-t border-gray-100">
            {heroVideo.category?.name && (
              <span className="text-sm font-bold text-red-600 uppercase">{heroVideo.category.name}</span>
            )}
            <h2 className="font-bold text-xl text-gray-900 mt-1 leading-snug">{heroVideo.title}</h2>
          </div>
        </div>
      )}

      {/* ── 3. FEATURED ARTICLE ── */}
      {heroArticle && (
        <div className="bg-white border border-gray-200 rounded overflow-hidden cursor-pointer hover:shadow transition"
          onClick={() => navigate(`/news/${heroArticle.slug}`, { state: heroArticle })}>
          {heroArticle.thumbnail ? (
            <div className="relative">
              <img src={heroArticle.thumbnail} alt={heroArticle.title}
                className="w-full aspect-[2/1] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                {heroArticle.category?.name && (
                  <span className="bg-red-600 text-white text-xs font-bold uppercase px-2.5 py-1 rounded">{heroArticle.category.name}</span>
                )}
                <div className="flex items-end justify-between gap-4 mt-2 relative">
                  <h1 className="text-white font-bold text-2xl leading-tight line-clamp-2">{heroArticle.title}</h1>
                  <div className="relative">
                    <button 
                      onClick={(e) => handleShareToggle(e, heroArticle._id)}
                      className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full text-white transition-colors shrink-0"
                      title="Share Article"
                    >
                      {copiedId === heroArticle._id ? <Check size={20} className="text-green-400" /> : <Share2 size={20} />}
                    </button>
                    
                    {activeShareId === heroArticle._id && (
                      <div 
                        style={{ top: `${menuPos.top}px`, left: `${menuPos.left}px` }}
                        className={`fixed bg-white rounded-lg shadow-2xl border border-gray-100 p-2 flex flex-col gap-1 z-[9999] animate-in fade-in zoom-in-95 duration-200 min-w-[140px] ${menuDirection === 'up' ? 'origin-bottom-right' : 'origin-top-right'}`}
                      >
                        <button onClick={(e) => handleShareAction(e, heroArticle, 'whatsapp')} className="flex items-center gap-3 px-3 py-2 hover:bg-green-50 rounded text-green-600 transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                          <span className="text-xs font-bold whitespace-nowrap">WhatsApp</span>
                        </button>
                        <button onClick={(e) => handleShareAction(e, heroArticle, 'facebook')} className="flex items-center gap-3 px-3 py-2 hover:bg-blue-50 rounded text-blue-600 transition-colors">
                          <Facebook size={16} />
                          <span className="text-xs font-bold">Facebook</span>
                        </button>
                        <button onClick={(e) => handleShareAction(e, heroArticle, 'twitter')} className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded text-gray-900 transition-colors">
                          <Twitter size={16} />
                          <span className="text-xs font-bold">Twitter (X)</span>
                        </button>
                        <button onClick={(e) => handleShareAction(e, heroArticle, 'copy')} className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded text-gray-600 transition-colors">
                          <LinkIcon size={16} />
                          <span className="text-xs font-bold">{copiedId === heroArticle._id ? 'Copied!' : 'Copy Link'}</span>
                        </button>
                        {navigator.share && (
                          <button onClick={(e) => handleShareAction(e, heroArticle, 'native')} className="flex items-center gap-3 px-3 py-2 hover:bg-red-50 rounded text-red-600 transition-colors">
                            <Share2 size={16} />
                            <span className="text-xs font-bold">More</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-5">
              <h1 className="font-bold text-2xl text-gray-900 mt-1">{heroArticle.title}</h1>
            </div>
          )}
        </div>
      )}

      {/* ── AD 1 ── */}
      <div className="bg-gray-50 border border-gray-200 rounded text-center flex flex-col items-center justify-center overflow-hidden">
        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1 mt-2">विज्ञापन</span>
        {ad ? (
          ad.type === 'script' ? (
            <div className="w-full overflow-hidden flex justify-center items-center my-2" dangerouslySetInnerHTML={{ __html: ad.scriptCode }} />
          ) : (
            <a href={ad.link} target="_blank" rel="noreferrer" className="block w-full h-32 md:h-48 bg-gray-50 flex items-center justify-center p-2">
              <img src={ad.imageUrl} alt={ad.title} className="max-w-full max-h-full object-contain hover:opacity-90 transition-opacity rounded" />
            </a>
          )
        ) : (
          <div className="w-full h-24 flex items-center justify-center">
            <span className="text-gray-400 text-sm font-medium">Ad Space</span>
          </div>
        )}
      </div>

      {/* ── 4. TOP VIDEO GRID ── */}
      {restVideos.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-red-600 pl-3 flex items-center gap-2">
              <Play size={18} className="text-red-600" fill="currentColor" /> वीडियो
            </h2>
            <button onClick={() => navigate('/videos')}
              className="text-sm text-red-600 font-bold hover:underline flex items-center">
              और देखें <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {restVideos.map(video => {
              const ytId = getYtId(video.videoUrl);
              const thumb = video.thumbnail || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null);
              return (
                <div key={video._id}
                  className="bg-white border border-gray-200 rounded overflow-hidden cursor-pointer hover:shadow transition group"
                  onClick={() => window.open(video.videoUrl, '_blank')}>
                  <div className="relative aspect-video bg-gray-200 overflow-hidden">
                    {thumb ? (
                      <img src={thumb} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" decoding="async" />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <Play size={32} className="text-white" fill="white" />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-11 h-11 bg-red-600/90 rounded-full flex items-center justify-center group-hover:bg-red-600 group-hover:scale-110 transition-all shadow-lg">
                        <Play size={20} className="text-white ml-0.5" fill="white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-2.5">
                    <h4 className="font-bold text-sm text-gray-900 line-clamp-2 leading-snug">{video.title}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── 5. INFINITE SCROLL ARTICLES (WITH NATIVE VIDEO UI) ── */}
      {restArticles.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 border-l-4 border-orange-500 pl-3 mb-4">
            {categoryName ? decodeURIComponent(categoryName) : 'ताज़ा खबरें'}
          </h2>
          <div className="divide-y divide-gray-100 bg-white border border-gray-200 rounded">

            {restArticles.map((item, index) => {
              const isLastElement = restArticles.length === index + 1;
              const shouldShowVideo = (index + 1) % 3 === 0;
              const videoIndex = Math.floor(index / 3);
              const videoToRender = feedVideos[videoIndex];

              return (
                <React.Fragment key={item._id || index}>
                  {/* -- ARTICLE ROW -- */}
                  <div
                    ref={isLastElement ? lastArticleElementRef : null}
                    onClick={() => navigate(`/news/${item.slug}`, { state: item })}
                    className="flex gap-4 p-4 hover:bg-gray-50 transition cursor-pointer"
                  >
                    {item.thumbnail && (
                      <img src={item.thumbnail} alt={item.title} className="w-36 h-24 md:w-44 md:h-28 object-cover rounded flex-shrink-0" loading="lazy" decoding="async" />
                    )}
                    <div className="flex flex-col justify-between flex-1 min-w-0">
                      <div>
                        {item.category?.name && (
                          <span className="text-xs font-bold text-red-600 uppercase">{item.category.name}</span>
                        )}
                        <h3 className="font-bold text-lg text-gray-900 line-clamp-2 leading-snug mt-1">{item.title}</h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2 hidden md:block">{strip(item.content)}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2 relative">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Clock size={12} /><span>{timeAgo(item.createdAt)}</span>
                        </div>
                        <div className="relative">
                          <button 
                            onClick={(e) => handleShareToggle(e, item._id)}
                            className="p-1.5 rounded-full hover:bg-red-50 hover:text-red-600 text-gray-400 transition-colors"
                            title="Share Article"
                          >
                            {copiedId === item._id ? <Check size={16} className="text-green-600" /> : <Share2 size={16} />}
                          </button>

                          {activeShareId === item._id && (
                            <div 
                              style={{ top: `${menuPos.top}px`, left: `${menuPos.left}px` }}
                              className={`fixed bg-white rounded-lg shadow-2xl border border-gray-100 p-2 flex flex-col gap-1 z-[9999] animate-in fade-in zoom-in-95 duration-200 min-w-[140px] ${menuDirection === 'up' ? 'origin-bottom-right' : 'origin-top-right'}`}
                            >
                              <button onClick={(e) => handleShareAction(e, item, 'whatsapp')} className="flex items-center gap-3 px-3 py-2 hover:bg-green-50 rounded text-green-600 transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                <span className="text-xs font-bold">WhatsApp</span>
                              </button>
                              <button onClick={(e) => handleShareAction(e, item, 'facebook')} className="flex items-center gap-3 px-3 py-2 hover:bg-blue-50 rounded text-blue-600 transition-colors">
                                <Facebook size={16} />
                                <span className="text-xs font-bold">Facebook</span>
                              </button>
                              <button onClick={(e) => handleShareAction(e, item, 'twitter')} className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded text-gray-900 transition-colors">
                                <Twitter size={16} />
                                <span className="text-xs font-bold">Twitter (X)</span>
                              </button>
                              <button onClick={(e) => handleShareAction(e, item, 'copy')} className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded text-gray-600 transition-colors">
                                <LinkIcon size={16} />
                                <span className="text-xs font-bold">{copiedId === item._id ? 'Copied!' : 'Copy Link'}</span>
                              </button>
                              {navigator.share && (
                                <button onClick={(e) => handleShareAction(e, item, 'native')} className="flex items-center gap-3 px-3 py-2 hover:bg-red-50 rounded text-red-600 transition-colors">
                                  <Share2 size={16} />
                                  <span className="text-xs font-bold">More</span>
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-300 self-center hidden md:block" />
                  </div>

                  {/* -- INJECTED VIDEO ROW (ARTICLE FORMAT) -- */}
                  {shouldShowVideo && videoToRender && (() => {
                    const ytId = getYtId(videoToRender.videoUrl);
                    const thumb = videoToRender.thumbnail || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null);

                    return (
                      <div
                        className="flex gap-4 p-4 bg-red-50 hover:bg-red-100 transition cursor-pointer"
                        onClick={() => window.open(videoToRender.videoUrl, '_blank')}
                      >
                        {/* 🚀 IMAGE WITH PLAY BUTTON OVERLAY */}
                        <div className="relative w-36 h-24 md:w-44 md:h-28 flex-shrink-0">
                          {thumb ? (
                            <img src={thumb} alt={videoToRender.title} className="w-full h-full object-cover rounded" loading="lazy" decoding="async" />
                          ) : (
                            <div className="w-full h-full bg-gray-800 rounded" />
                          )}
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded transition hover:bg-black/10">
                            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                              <Play size={20} fill="white" className="text-white ml-1" />
                            </div>
                          </div>
                        </div>

                        {/* TEXT CONTENT EXTACTLY LIKE ARTICLE */}
                        <div className="flex flex-col justify-between flex-1 min-w-0">
                          <div>
                            <span className="text-xs font-bold text-red-600 uppercase flex items-center gap-1">
                              <Play size={12} fill="currentColor" /> सुझाई गई वीडियो
                            </span>
                            <h3 className="font-bold text-lg text-gray-900 line-clamp-2 leading-snug mt-1">{videoToRender.title}</h3>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2 hidden md:block">{videoToRender.description || 'वीडियो देखने के लिए क्लिक करें'}</p>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                            <Clock size={12} /><span>{timeAgo(videoToRender.createdAt)}</span>
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-red-300 self-center hidden md:block" />
                      </div>
                    );
                  })()}
                </React.Fragment>
              );
            })}
          </div>

          {/* LOAD MORE SPINNER */}
          {loadingMore && (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
            </div>
          )}

          {/* END OF LIST MESSAGE */}
          {!hasMore && restArticles.length > 0 && (
            <div className="text-center py-8 text-gray-500 font-medium bg-gray-50 rounded-b-lg border border-t-0 border-gray-200">
              आपने सारी खबरें पढ़ ली हैं! 📰
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsSection;