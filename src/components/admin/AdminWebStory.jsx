import { useState, useEffect } from "react";
import api from "../../assets/api";
import { Plus, Edit2, Trash2, X, Search, BookOpen, CheckCircle2, Image as ImageIcon, Layers, MoveUp, MoveDown, Globe } from "lucide-react";

const AdminWebStories = () => {
  const [categories, setCategories] = useState([]);
  const [articlesList, setArticlesList] = useState([]);
  const [stories, setStories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    status: "PUBLISHED",
    articleUrl: ""
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Multi-slide state
  const [slides, setSlides] = useState([
    { title: "", description: "", articleUrl: "", image: null, preview: "" }
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/categories");
        setCategories(data.data || []);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    const fetchArticles = async () => {
      try {
        const { data } = await api.get("/articles");
        setArticlesList(data.data?.articles || data.data || []);
      } catch (err) {
        console.error("Failed to fetch articles", err);
      }
    };
    fetchCategories();
    fetchArticles();
  }, []);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const { data } = await api.get("/webstories");
        setStories(data.data || data || []);
      } catch (err) {
        console.error("Failed to fetch web stories", err);
      }
    };
    fetchStories();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Slide management
  const handleAddSlide = () => {
    setSlides([
      ...slides,
      { title: "", description: "", articleUrl: "", image: null, preview: "" }
    ]);
  };

  const handleRemoveSlide = (index) => {
    if (slides.length <= 1) {
      alert("A web story must have at least 1 slide.");
      return;
    }
    setSlides(slides.filter((_, i) => i !== index));
  };

  const handleSlideChange = (index, field, value) => {
    const newSlides = [...slides];
    newSlides[index][field] = value;
    setSlides(newSlides);
  };

  const handleSlideImage = (index, file) => {
    if (!file) return;
    const newSlides = [...slides];
    newSlides[index].image = file;
    newSlides[index].preview = URL.createObjectURL(file);
    setSlides(newSlides);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category) return;

    const multipartData = new FormData();
    multipartData.append("title", formData.title);
    multipartData.append("category", formData.category);
    multipartData.append("status", formData.status);
    if (formData.articleUrl) multipartData.append("articleUrl", formData.articleUrl);

    if (image) {
      multipartData.append("image", image);
    }

    // Process slides JSON and slideImages files
    const slidesMeta = slides.map((s) => ({
      title: s.title || "",
      description: s.description || "",
      articleUrl: s.articleUrl || "",
      image: typeof s.image === "string" ? s.image : (s.preview && !s.image ? s.preview : "")
    }));

    multipartData.append("slides", JSON.stringify(slidesMeta));

    slides.forEach((s) => {
      if (s.image && typeof s.image !== "string") {
        multipartData.append("slideImages", s.image);
      }
    });

    try {
      if (editingId) {
        const { data } = await api.patch(`/webstories/${editingId}`, multipartData);
        setStories((prev) =>
          prev.map((story) =>
            story.id === editingId || story._id === editingId ? data.data || data : story
          )
        );
      } else {
        const { data } = await api.post("/webstories", multipartData);
        setStories((prev) => [data.data || data, ...prev]);
      }
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Failed to save web story");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      status: "PUBLISHED",
      articleUrl: ""
    });
    setImage(null);
    setPreview(null);
    setSlides([{ title: "", description: "", articleUrl: "", image: null, preview: "" }]);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (story) => {
    setFormData({
      title: story.title || "",
      category: story.category?._id || story.category || "",
      status: story.status || "PUBLISHED",
      articleUrl: story.articleUrl || ""
    });
    setPreview(story.image || story.preview);

    if (story.slides && story.slides.length > 0) {
      setSlides(
        story.slides.map((s) => ({
          title: s.title || "",
          description: s.description || "",
          articleUrl: s.articleUrl || "",
          image: s.image,
          preview: s.image
        }))
      );
    } else {
      setSlides([
        {
          title: story.title || "",
          description: "",
          articleUrl: story.articleUrl || "",
          image: story.image,
          preview: story.image
        }
      ]);
    }

    setEditingId(story._id || story.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this story?")) return;
    try {
      await api.delete(`/webstories/${id}`);
      setStories((prev) => prev.filter((story) => (story._id || story.id) !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete web story");
    }
  };

  const filteredStories = stories.filter((story) =>
    story.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">वेब स्टोरीज़ मैनेजर (Web Stories)</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Create multi-slide vertical visual stories for mobile & Google Discover</p>
        </div>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm shadow-orange-200 active:scale-[0.98] text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Story</span>
          </button>
        )}
      </div>

      {/* FORM SECTION */}
      {showForm ? (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-200">
                <BookOpen className="w-5 h-5" />
              </div>
              {editingId ? "Edit Multi-Slide Web Story" : "New Multi-Slide Web Story"}
            </h2>
            <button 
              onClick={resetForm} 
              className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-2 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Story Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="E.g. IPL 2026: टॉप 5 युवा खिलाड़ी"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all text-slate-900 text-sm font-bold"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all text-slate-800 text-sm font-bold cursor-pointer"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat._id || cat.id} value={cat._id || cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all text-slate-800 text-sm font-bold cursor-pointer"
                    >
                      <option value="DRAFT">Draft</option>
                      <option value="PUBLISHED">Published</option>
                      <option value="ARCHIVED">Archived</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Link News Article (Swipe-Up / Read More Link)</label>
                  <div className="space-y-2">
                    {articlesList && articlesList.length > 0 && (
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            setFormData({ ...formData, articleUrl: window.location.origin + "/news/" + e.target.value });
                          }
                        }}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none focus:border-orange-500 cursor-pointer"
                      >
                        <option value="">-- Choose Published News Article --</option>
                        {articlesList.map((art) => (
                          <option key={art._id || art.id} value={art.slug || art._id}>
                            {art.title}
                          </option>
                        ))}
                      </select>
                    )}
                    <input
                      type="url"
                      name="articleUrl"
                      value={formData.articleUrl}
                      onChange={handleChange}
                      placeholder="Or enter custom URL: https://publicasia.in/news/article-slug"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all text-slate-900 text-sm font-medium"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 font-medium">This article link opens when readers click "पूरी खबर पढ़ें" or swipe up on the story.</p>
                </div>
              </div>

              {/* Cover Image Upload */}
              <div className="flex flex-col items-center justify-center bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 text-center">Story Poster/Cover (9:16)</label>
                <label className="relative flex flex-col items-center justify-center w-[160px] h-[260px] border-2 border-dashed border-slate-300 rounded-2xl bg-white hover:bg-slate-50 hover:border-orange-500 transition-all cursor-pointer group overflow-hidden shadow-sm">
                  {preview ? (
                    <>
                      <img src={preview} alt="Preview" className="w-full h-full object-cover absolute inset-0" />
                      <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                        <span className="bg-white text-slate-900 font-bold text-xs px-3 py-1.5 rounded-lg shadow-sm">Change Cover</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-500 p-4 text-center">
                      <ImageIcon className="w-8 h-8 text-slate-300 mb-2 group-hover:text-orange-500 transition-colors" />
                      <p className="text-[12px] font-bold text-slate-700">Upload Cover</p>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
                </label>
              </div>

            </div>

            {/* MULTI SLIDE BUILDER SECTION */}
            <div className="pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-orange-600" />
                    <span>Story Slides ({slides.length})</span>
                  </h3>
                  <p className="text-xs font-medium text-slate-500">Each slide represents a screen in the story swipe viewer.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddSlide}
                  className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Slide</span>
                </button>
              </div>

              <div className="space-y-6">
                {slides.map((slide, idx) => (
                  <div key={idx} className="p-6 bg-slate-50/80 rounded-2xl border border-slate-200 relative group transition-all hover:border-orange-200 hover:bg-slate-50">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-orange-100 text-orange-700 font-black text-xs px-3 py-1 rounded-lg">
                        Slide #{idx + 1}
                      </span>
                      {slides.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSlide(idx)}
                          className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                      {/* Slide Image */}
                      <div className="flex flex-col items-center">
                        <label className="relative flex flex-col items-center justify-center w-full h-[180px] border-2 border-dashed border-slate-300 rounded-xl bg-white hover:border-orange-500 cursor-pointer overflow-hidden group/img">
                          {slide.preview || slide.image ? (
                            <>
                              <img src={slide.preview || slide.image} alt="" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                                <span className="text-white text-[11px] font-bold bg-black/60 px-2 py-1 rounded">Change</span>
                              </div>
                            </>
                          ) : (
                            <div className="text-center p-3">
                              <ImageIcon className="w-6 h-6 text-slate-300 mx-auto mb-1" />
                              <span className="text-[11px] font-bold text-slate-600">Slide Image *</span>
                            </div>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleSlideImage(idx, e.target.files[0])}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* Slide Info */}
                      <div className="md:col-span-3 space-y-3">
                        <input
                          type="text"
                          value={slide.title}
                          onChange={(e) => handleSlideChange(idx, "title", e.target.value)}
                          placeholder="Slide Headline (e.g. 1. यशस्वी जायसवाल)"
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-orange-500"
                        />
                        <textarea
                          rows={2}
                          value={slide.description}
                          onChange={(e) => handleSlideChange(idx, "description", e.target.value)}
                          placeholder="Slide Description / Caption text..."
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 outline-none focus:border-orange-500 resize-none"
                        />
                        <input
                          type="url"
                          value={slide.articleUrl}
                          onChange={(e) => handleSlideChange(idx, "articleUrl", e.target.value)}
                          placeholder="Swipe-up Link (Optional)"
                          className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-medium text-slate-700 outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Actions */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-orange-600 text-white font-bold text-sm rounded-xl hover:bg-orange-700 transition-all shadow-sm shadow-orange-200 flex items-center gap-2 active:scale-[0.98]"
              >
                <CheckCircle2 className="w-4 h-4" />
                {editingId ? "Update Web Story" : "Publish Web Story"}
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {/* TABLE / LIST SECTION */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search web stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:bg-white focus:border-orange-500 transition-all"
            />
          </div>
          <span className="text-xs font-bold text-slate-400">Total: {stories.length} Web Stories</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-[11px] font-black text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Story Cover</th>
                <th className="py-4 px-6">Title & Category</th>
                <th className="py-4 px-6">Slides</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Google AMP Link</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredStories.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-slate-400 font-bold">
                    No web stories found. Click "Create New Story" to publish one.
                  </td>
                </tr>
              ) : (
                filteredStories.map((story) => (
                  <tr key={story._id || story.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="w-12 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                        <img src={story.image} alt="" className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-900 line-clamp-1">{story.title}</p>
                      <p className="text-xs text-orange-600 font-semibold mt-0.5">{story.category?.name || "News"}</p>
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-700">
                      <span className="bg-slate-100 px-2.5 py-1 rounded-lg text-xs">
                        {story.slides?.length || 1} slides
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                        story.status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {story.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <a
                        href={`${api.defaults.baseURL || '/api/v1'}/webstories/${story._id || story.id}/amp`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>View AMP HTML</span>
                      </a>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(story)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(story._id || story.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminWebStories;
