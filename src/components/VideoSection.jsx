import React from 'react'
import { Play, Calendar, Tag, ChevronRight } from 'lucide-react'

const getYoutubeEmbedUrl = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url?.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  return url; 
};

const VideoSection = ({ video }) => {
  if (!video) return null;
  
  const embedUrl = getYoutubeEmbedUrl(video.videoUrl);

  return (
    <div className='bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full group'>
        <div className='relative w-full aspect-video overflow-hidden'>
            <iframe 
                className="w-full h-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" 
                src={embedUrl} 
                title={video.title} 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
            ></iframe>
            <div className="absolute top-3 left-3">
              <span className="bg-red-600/90 backdrop-blur-md text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-lg">
                <Play size={10} fill="white" /> LIVE
              </span>
            </div>
        </div>
        <div className='p-5 flex flex-col flex-1'>
            <div className="flex items-center gap-2 mb-3">
              <Tag size={12} className="text-red-600" />
              <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">
                 {video.category?.name || "FEATURED VIDEO"}
              </span>
            </div>
            
            <h3 className='font-black text-gray-900 leading-snug line-clamp-2 text-lg group-hover:text-red-600 transition-colors'>
                {video.title}
            </h3>
            
            {video.description && (
                <p className='text-sm text-gray-500 mt-3 line-clamp-2 font-medium leading-relaxed'>{video.description}</p>
            )}
            
            <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-50">
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar size={12} />
                  <span className='text-[11px] font-bold uppercase'>
                      {new Date(video.createdAt).toLocaleDateString('hi-IN', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
                <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-red-600 group-hover:text-white transition-all shadow-sm">
                  <ChevronRight size={16} />
                </button>
            </div>
        </div>
    </div>
  )
}

export default VideoSection
