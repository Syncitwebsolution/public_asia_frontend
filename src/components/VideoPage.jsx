import React, { useState, useEffect } from "react";
import VideoSection from "./VideoSection";
import api from "../assets/api";
import { Youtube, Play, Film, ChevronRight } from "lucide-react";

const VideoPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await api.get('/videos?status=PUBLISHED&page=1&limit=20');
        setVideos(res.data?.data?.videos || []);
      } catch (err) {
        console.error("Failed to fetch videos", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-200">
              <Film className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">वीडियो गैलरी</h1>
              <p className="text-gray-500 font-medium mt-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                Public Asia की ताज़ा वीडियो खबरें
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-xl text-red-600 font-bold text-sm">
            <Youtube size={18} />
            <span>YouTube Live Feed</span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-gray-100">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-red-100 rounded-full"></div>
              <div className="absolute top-0 w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="mt-6 text-gray-500 font-bold text-lg animate-pulse">वीडियो लोड हो रहे हैं...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Youtube className="w-12 h-12 text-gray-200" />
            </div>
            <h2 className="text-2xl font-black text-gray-400">कोई वीडियो नहीं मिला</h2>
            <p className="text-gray-500 mt-2 font-medium">जल्द ही नए वीडियो अपडेट किए जाएंगे।</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-8 bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-all"
            >
              दोबारा कोशिश करें
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map(video => (
              <VideoSection key={video._id} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPage;