import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Search, Clock, ArrowRight, Newspaper } from "lucide-react";
import api from "../assets/api";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) return;

    const fetchSearchNews = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/articles`, {
          params: { search: query, limit: 20 }
        });
        // Our backend returns { articles: [], pagination: {} } inside data
        setNews(data.data.articles || []);
      } catch (err) {
        console.error("Search failed:", err);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchNews();
  }, [query]);

  // Helper to strip HTML and truncate content
  const getSnippet = (html) => {
    if (!html) return "";
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    const text = tmp.textContent || tmp.innerText || "";
    return text.length > 150 ? text.substring(0, 150) + "..." : text;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-white p-6 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-200">
              <Search className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">SEARCH RESULTS FOR</p>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">"{query}"</h1>
            </div>
          </div>
          <div className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold text-sm">
            {news.length} परिणाम मिले
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-gray-100">
            <div className="w-12 h-12 border-4 border-red-100 border-t-red-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-400 font-bold uppercase tracking-widest text-xs">Searching Archives...</p>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Newspaper className="w-10 h-10 text-gray-200" />
            </div>
            <h2 className="text-2xl font-black text-gray-400">कोई समाचार नहीं मिला</h2>
            <p className="text-gray-500 mt-2 font-medium">कृपया दूसरे शब्दों के साथ पुनः प्रयास करें।</p>
          </div>
        ) : (
          <div className="space-y-6">
            {news.map((item) => (
              <Link
                key={item._id}
                to={`/news/${item.slug}`}
                className="group flex flex-col md:flex-row gap-6 bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {item.thumbnail && (
                  <div className="w-full md:w-60 h-48 md:h-40 shrink-0 overflow-hidden rounded-2xl">
                    <img
                      src={item.thumbnail}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      alt={item.title}
                    />
                  </div>
                )}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black text-red-600 bg-red-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {item.category?.name || 'NEWS'}
                    </span>
                    <span className="text-gray-200">•</span>
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                      <Clock size={12} />
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 group-hover:text-red-600 transition-colors leading-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 font-medium leading-relaxed mb-4">
                    {getSnippet(item.content)}
                  </p>
                  <div className="mt-auto flex justify-end">
                    <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                      पूरा पढ़ें <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
