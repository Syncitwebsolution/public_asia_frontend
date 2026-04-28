import React, { useState, useEffect } from 'react';
import { Cloud, MapPin, TrendingUp, ChevronRight, Wind, Droplets, Sun, CloudRain, CloudLightning, Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../assets/api';

const RightSidebar = () => {
    const [weather, setWeather] = useState(null);
    const [trending, setTrending] = useState([]);
    const [ad, setAd] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch Trending News
                const trendingRes = await api.get('/articles?limit=5&status=PUBLISHED');
                setTrending(trendingRes.data?.data?.articles || []);

                // 2. Fetch Sidebar Ad
                const adRes = await api.get('/ads?activeOnly=true&placement=sidebar');
                const ads = adRes.data?.data?.ads || [];
                if (ads.length > 0) setAd(ads[0]);

                // 3. Fetch Weather (Default: Delhi)
                // Using Open-Meteo (Free, No Key required)
                const weatherRes = await fetch('https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=Asia%2FKolkata');
                const weatherData = await weatherRes.json();
                setWeather(weatherData.current);
            } catch (error) {
                console.error("RightSidebar Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getWeatherIcon = (code) => {
        if (code === 0) return <Sun className="text-yellow-400" size={48} />;
        if (code <= 3) return <Cloud className="text-gray-400" size={48} />;
        if (code <= 48) return <Cloud className="text-gray-500" size={48} />;
        if (code <= 67) return <CloudRain className="text-blue-400" size={48} />;
        if (code <= 99) return <CloudLightning className="text-purple-500" size={48} />;
        return <Cloud className="text-gray-400" size={48} />;
    };

    const getWeatherDesc = (code) => {
        if (code === 0) return "साफ मौसम";
        if (code <= 3) return "हल्के बादल";
        if (code <= 48) return "धुंधला";
        if (code <= 67) return "बारिश";
        if (code <= 99) return "तूफान";
        return "सामान्य";
    };

    return (
        <div className="flex flex-col gap-6 sticky top-20">
            
            {/* ── 1. WEATHER WIDGET ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group">
                <div className="bg-red-600 px-4 py-2.5 flex items-center justify-between text-white">
                    <h3 className="font-bold text-sm flex items-center gap-2">
                        दिल्ली का मौसम <Cloud size={16} />
                    </h3>
                    <Calendar size={14} className="opacity-80" />
                </div>
                
                {weather ? (
                    <div className="p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {getWeatherIcon(weather.weather_code)}
                                <div>
                                    <h4 className="text-4xl font-black text-gray-900 leading-none">
                                        {Math.round(weather.temperature_2m)}°C
                                    </h4>
                                    <p className="text-gray-500 font-medium mt-1">{getWeatherDesc(weather.weather_code)}</p>
                                </div>
                            </div>
                            <div className="text-right border-l border-gray-100 pl-4">
                                <div className="bg-red-50 px-2 py-1 rounded-lg">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">AQI LEVEL</p>
                                    <p className="text-2xl font-black text-gray-900 leading-none mt-1">586</p>
                                    <span className="text-[10px] font-bold text-red-600 bg-red-100 px-1 rounded">POOR</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-gray-50">
                            <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-xl">
                                <Wind size={16} className="text-blue-500" />
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase">Wind</p>
                                    <p className="text-xs font-bold text-gray-700">{weather.wind_speed_10m} km/h</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-xl">
                                <Droplets size={16} className="text-cyan-500" />
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase">Humidity</p>
                                    <p className="text-xs font-bold text-gray-700">{weather.relative_humidity_2m}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-10 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div></div>
                )}
            </div>

            {/* ── 2. TRENDING NEWS ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-gray-900 px-4 py-3 flex items-center justify-between text-white">
                    <h3 className="font-bold text-sm flex items-center gap-2 uppercase tracking-tight">
                        <TrendingUp size={16} className="text-red-500" /> बड़ी खबरें
                    </h3>
                    <ChevronRight size={14} className="opacity-50" />
                </div>
                <div className="p-2 space-y-1">
                    {trending.map((news, i) => (
                        <div 
                            key={news._id} 
                            onClick={() => navigate(`/news/${news.slug}`)}
                            className="flex gap-3 p-2.5 hover:bg-red-50 rounded-xl transition-all cursor-pointer group"
                        >
                            <span className="text-2xl font-black text-gray-100 group-hover:text-red-100 transition-colors shrink-0 leading-none">
                                0{i + 1}
                            </span>
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-red-600 transition-colors">
                                    {news.title}
                                </p>
                                <div className="flex items-center gap-2 mt-1.5 opacity-50">
                                    <Clock size={10} /><span className="text-[10px] font-bold">1 HOUR AGO</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-3 bg-gray-50">
                    <button 
                        onClick={() => navigate('/')}
                        className="w-full py-2 bg-white border border-gray-200 text-gray-600 text-xs font-bold rounded-lg hover:bg-red-600 hover:text-white hover:border-red-600 transition-all shadow-sm"
                    >
                        सभी खबरें देखें
                    </button>
                </div>
            </div>

            {/* ── 3. AD WIDGET ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-4">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">विज्ञापन</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                </div>
                {ad ? (
                    ad.type === 'script' ? (
                        <div dangerouslySetInnerHTML={{ __html: ad.scriptCode }} className="flex justify-center" />
                    ) : (
                        <a href={ad.link} target="_blank" rel="noreferrer" className="block group">
                            <img 
                                src={ad.imageUrl} 
                                alt="Ad" 
                                className="w-full h-auto rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300"
                            />
                            <p className="text-[10px] text-gray-400 mt-2 text-center italic">{ad.title}</p>
                        </a>
                    )
                ) : (
                    <div className="aspect-[4/5] bg-gray-50 rounded-xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                             <Sun size={20} className="text-gray-300" />
                        </div>
                        <p className="text-xs font-bold text-gray-400">Ad Space (300x250)</p>
                        <p className="text-[10px] text-gray-300 mt-1">Advertise with Public Asia</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default RightSidebar;