import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';
import api from '../assets/api';
import { useUser } from './admin/UserContext';
import RightSidebar from './RightSidebar';
import { Helmet } from 'react-helmet-async';
import DOMPurify from 'dompurify';

const NewsDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useUser();
    const { state } = useLocation();
    
    const [article, setArticle] = useState(state || null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(!state);
    const [relatedNews, setRelatedNews] = useState([]);

    // ── SCROLL TO TOP on every article change ──
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    // ── FETCH ARTICLE (only if not provided via Router state) ──
    useEffect(() => {
        const fetchArticle = async () => {
            if (!state) {
                try {
                    const { data } = await api.get(`/articles/${slug}`);
                    setArticle(data.data);
                } catch(err) {
                    console.error("Failed to fetch article", err);
                } finally {
                    setLoading(false);
                }
            }
        };
        if (slug) fetchArticle();
    }, [slug, state]);

    // ── ALWAYS FETCH COMMENTS when article is available ──
    useEffect(() => {
        const fetchComments = async () => {
            if (!article?._id) return;
            try {
                const { data } = await api.get(`/comments/article/${article._id}`);
                setComments(data.data || []);
            } catch (err) {
                console.error("Failed to fetch comments", err);
            }
        };
        fetchComments();
    }, [article?._id]);

    // ── FETCH RELATED NEWS from same category ──
    useEffect(() => {
        const fetchRelated = async () => {
            if (!article?.category?.name) return;
            try {
                const { data } = await api.get(`/articles?category=${article.category.name}&limit=5`);
                const articles = data.data?.articles || [];
                // Filter out the current article
                setRelatedNews(articles.filter(a => a._id !== article._id).slice(0, 4));
            } catch (err) {
                console.error("Failed to fetch related news", err);
            }
        };
        fetchRelated();
    }, [article?.category?.name, article?._id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const { data } = await api.post(`/comments/${article._id}`, { content: newComment });
            setComments(prev => [data.data, ...prev]);
            setNewComment("");
        } catch (err) {
            console.error("Failed to post comment", err);
            if (err.response?.status === 401) {
                alert("Please login to comment.");
                navigate('/login');
            } else {
                alert("Failed to submit comment.");
            }
        }
    };

    const timeAgo = (d) => {
        if (!d) return '';
        const mins = Math.floor((Date.now() - new Date(d).getTime()) / 60000);
        if (mins < 60) return `${mins} मिनट पहले`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs} घंटे पहले`;
        return `${Math.floor(hrs / 24)} दिन पहले`;
    };

    if (loading) return <div className='p-4 text-center mt-10'>Loading article...</div>;
    if (!article) return <div className='p-4 text-center mt-10'>Article not found</div>;

    const isExternal = !article._id;
    const metaDescription = article.content ? article.content.replace(/<[^>]*>?/gm, '').substring(0, 155) + '...' : article.title;

    return (
        <div className="bg-gray-50 min-h-screen">
            <Helmet>
                <title>{article.title} | Public Asia</title>
                <meta name="description" content={metaDescription} />
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={metaDescription} />
                {article.thumbnail && <meta property="og:image" content={article.thumbnail} />}
                <meta property="og:type" content="article" />
            </Helmet>
            <div className="max-w-7xl mx-auto px-2 md:px-4 py-4">
                <div className="flex flex-col lg:flex-row gap-6">
                    
                    {/* ── MAIN CONTENT (70%) ── */}
                    <div className="flex-1 min-w-0">
                        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                            {/* Back Button */}
                            <div className="px-5 pt-5">
                                <button onClick={() => navigate(-1)} className='flex items-center gap-2 text-red-600 font-bold hover:gap-3 transition-all text-sm'>
                                    <ChevronRight size={16} className="rotate-180" /> वापस जाएं
                                </button>
                            </div>

                            {/* Article Image */}
                            {(article.thumbnail || article.image || article.urlToImage) && (
                                <div className="px-5 pt-4">
                                    <img
                                        src={article.thumbnail || article.image || article.urlToImage}
                                        alt={article.title}
                                        className="w-full max-h-[480px] object-cover rounded-xl shadow-lg shadow-gray-200"
                                    />
                                </div>
                            )}

                            {/* Article Meta */}
                            <div className="p-5 md:p-8">
                                {article.category?.name && (
                                    <span className="bg-red-600 text-white text-[10px] md:text-xs font-bold uppercase px-3 py-1 rounded-full shadow-sm shadow-red-200">
                                        {article.category.name}
                                    </span>
                                )}
                                <h1 className="text-2xl md:text-4xl font-black mt-4 mb-4 leading-tight text-gray-900">
                                    {article.title}
                                </h1>
                                
                                <div className="flex items-center flex-wrap gap-4 text-xs md:text-sm text-gray-400 mb-8 pb-6 border-b border-gray-50">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold">
                                            {article.author?.fullName?.charAt(0) || 'A'}
                                        </div>
                                        <span className="font-bold text-gray-700">{article.author?.fullName || (typeof article.author === 'string' ? article.author : 'Anonymous')}</span>
                                    </div>
                                    <span className="opacity-30">•</span>
                                    <div className="flex items-center gap-1.5">
                                        <Clock size={14} />
                                        <span>{new Date(article.createdAt || article.publishedAt || Date.now()).toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                    </div>
                                    {article.views !== undefined && (
                                        <>
                                            <span className="opacity-30">•</span>
                                            <span className="bg-gray-50 px-2 py-0.5 rounded font-bold">{article.views} Views</span>
                                        </>
                                    )}
                                </div>

                                <div 
                                    className="text-lg md:text-xl leading-relaxed text-gray-800 prose prose-red max-w-none prose-img:rounded-xl" 
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content || article.description) }}>
                                </div>

                                {isExternal && article.url && (
                                    <a
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block mt-8 bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition-all shadow-lg shadow-gray-200"
                                    >
                                        Read original source →
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* ── RELATED NEWS SECTION ── */}
                        {relatedNews.length > 0 && (
                            <div className="mt-8">
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="text-xl font-black text-gray-900 border-l-4 border-red-600 pl-4 uppercase tracking-tight">
                                        संबंधित खबरें
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {relatedNews.map((item) => (
                                        <div
                                            key={item._id}
                                            className="bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-gray-200 transition-all duration-300 group"
                                            onClick={() => navigate(`/news/${item.slug}`, { state: item })}
                                        >
                                            {item.thumbnail && (
                                                <div className="aspect-[16/9] overflow-hidden">
                                                    <img
                                                        src={item.thumbnail}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        loading="lazy"
                                                        decoding="async"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-4">
                                                {item.category?.name && (
                                                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">{item.category.name}</span>
                                                )}
                                                <h3 className="font-bold text-base text-gray-900 line-clamp-2 leading-snug mt-1 group-hover:text-red-600 transition-colors">
                                                    {item.title}
                                                </h3>
                                                <div className="flex items-center gap-2 text-xs text-gray-400 mt-3 font-medium">
                                                    <Clock size={12} /><span>{timeAgo(item.createdAt)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ── COMMENTS SECTION ── */}
                        {!isExternal && (
                            <div className="bg-white rounded-2xl border border-gray-100 mt-8 p-6 md:p-8 shadow-sm">
                                <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                                    💬 टिप्पणियाँ <span className="text-sm font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">{comments.length}</span>
                                </h2>
                                
                                {currentUser ? (
                                    <form onSubmit={handleCommentSubmit} className="mb-8">
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-red-200">
                                                {currentUser.fullName?.charAt(0) || 'U'}
                                            </div>
                                            <div className="flex-1">
                                                <textarea
                                                    value={newComment}
                                                    onChange={(e) => setNewComment(e.target.value)}
                                                    placeholder="अपनी राय साझा करें..."
                                                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white focus:border-red-500 min-h-[120px] resize-none transition-all placeholder:text-gray-400"
                                                    required
                                                />
                                                <div className="flex justify-end mt-3">
                                                    <button type="submit" className="bg-red-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-red-700 hover:shadow-lg hover:shadow-red-200 active:scale-95 transition-all">
                                                        पोस्ट करें
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="mb-10 p-8 bg-gray-50 rounded-2xl text-center border-2 border-dashed border-gray-200">
                                        <p className="text-gray-500 font-bold mb-4">इस खबर पर अपनी टिप्पणी देने के लिए लॉगिन करें</p>
                                        <button onClick={() => navigate('/login')} className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-all shadow-lg shadow-gray-200">
                                            लॉगिन करें
                                        </button>
                                    </div>
                                )}

                                <div className="space-y-6">
                                    {comments.length === 0 ? (
                                        <div className="text-center py-10">
                                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Clock size={24} className="text-gray-200" />
                                            </div>
                                            <p className="text-gray-400 font-bold italic">अभी कोई टिप्पणी नहीं है। पहले आप टिप्पणी करें!</p>
                                        </div>
                                    ) : (
                                        comments.map((comment, idx) => (
                                            <div key={comment._id || idx} className="flex gap-4 group">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold shrink-0 transition-colors group-hover:bg-red-50 group-hover:text-red-600">
                                                    {comment.author?.fullName?.charAt(0)?.toUpperCase() || 'U'}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="bg-gray-50 px-5 py-4 rounded-2xl rounded-tl-none border border-gray-50 transition-all group-hover:bg-white group-hover:shadow-md group-hover:shadow-gray-100">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="font-bold text-sm text-gray-900">{comment.author?.fullName || 'User'}</span>
                                                            <span className="text-[10px] font-bold text-gray-400 uppercase">{timeAgo(comment.createdAt)}</span>
                                                        </div>
                                                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">{comment.content}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── RIGHT SIDEBAR (30%) ── */}
                    <div className="w-full lg:w-80 shrink-0">
                        <RightSidebar />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsDetail;
