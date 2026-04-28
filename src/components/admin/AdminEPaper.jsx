import React, { useState, useEffect } from "react";
import { Plus, Trash2, Calendar, FileText, Loader2, Search, X, Check, Image as ImageIcon } from "lucide-react";
import api from "../../assets/api";

const AdminEPaper = () => {
  const [epapers, setEpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    status: "PUBLISHED",
    thumbnail: null,
  });

  const [selectedPages, setSelectedPages] = useState([]);
  const [selectedEpaperId, setSelectedEpaperId] = useState(null);
  const [showPagesModal, setShowPagesModal] = useState(false);

  useEffect(() => {
    fetchEpapers();
  }, []);

  const fetchEpapers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/epaper");
      setEpapers(data.data || []);
    } catch (err) {
      console.error("Failed to fetch epapers", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, thumbnail: e.target.files[0] }));
  };

  const handlePagesChange = (e) => {
    setSelectedPages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("date", formData.date);
    data.append("status", formData.status);
    data.append("thumbnail", formData.thumbnail);

    try {
      await api.post("/epaper", data);
      setShowModal(false);
      setFormData({
        title: "",
        date: new Date().toISOString().split("T")[0],
        status: "PUBLISHED",
        thumbnail: null,
      });
      fetchEpapers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create epaper");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddPages = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    selectedPages.forEach((file) => {
      data.append("pages", file);
    });

    try {
      await api.post(`/epaper/${selectedEpaperId}/pages`, data);
      setShowPagesModal(false);
      setSelectedPages([]);
      setSelectedEpaperId(null);
      fetchEpapers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add pages");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this e-paper?")) return;

    try {
      await api.delete(`/epaper/${id}`);
      fetchEpapers();
    } catch (err) {
      alert("Failed to delete e-paper");
    }
  };

  const filteredEpapers = epapers.filter((ep) =>
    ep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ep.date.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">E-Paper Management</h1>
          <p className="text-slate-500 text-sm">Create and manage daily digital newspaper editions.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md shadow-blue-200"
        >
          <Plus size={18} />
          Create Edition
        </button>
      </div>

      {/* Stats & Filter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Editions</p>
            <p className="text-2xl font-bold text-slate-900">{epapers.length}</p>
          </div>
        </div>
        
        <div className="md:col-span-2 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search by title or date..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Edition</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-20 text-center">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
                    <p className="text-slate-400 text-sm font-medium">Loading editions...</p>
                  </td>
                </tr>
              ) : filteredEpapers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-20 text-center">
                    <p className="text-slate-400 font-medium">No editions found.</p>
                  </td>
                </tr>
              ) : (
                filteredEpapers.map((epaper) => (
                  <tr key={epaper._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={epaper.thumbnail} 
                          alt="" 
                          className="w-12 h-16 rounded-lg object-cover bg-slate-100 border border-slate-200 shadow-sm" 
                        />
                        <span className="font-bold text-slate-900">{epaper.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600 font-medium">
                        <Calendar size={14} />
                        {new Date(epaper.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        epaper.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {epaper.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedEpaperId(epaper._id);
                            setShowPagesModal(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Add Pages"
                        >
                          <Plus size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(epaper._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
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

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Create New Edition</h2>
              <button onClick={() => setShowModal(false)} className="p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-50 transition-all">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Edition Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Daily Edition - Delhi"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Publish Date</label>
                <input
                  type="date"
                  name="date"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Thumbnail Image</label>
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 group-hover:border-blue-500 group-hover:bg-blue-50/30 transition-all">
                    {formData.thumbnail ? (
                      <div className="flex items-center gap-2 text-blue-600 font-bold">
                        <Check size={18} />
                        <span className="text-sm truncate max-w-[200px]">{formData.thumbnail.name}</span>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="text-slate-400 group-hover:text-blue-500" size={32} />
                        <span className="text-xs font-bold text-slate-400 group-hover:text-blue-500">Upload Cover Image</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3.5 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all active:scale-95 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-2 px-8 py-3.5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                >
                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : "Create Edition"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pages Modal */}
      {showPagesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Add Edition Pages</h2>
              <button onClick={() => setShowPagesModal(false)} className="p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-50 transition-all">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddPages} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Page Images</label>
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    required
                    onChange={handlePagesChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full h-48 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 group-hover:border-blue-500 group-hover:bg-blue-50/30 transition-all">
                    {selectedPages.length > 0 ? (
                      <div className="text-center">
                        <p className="text-blue-600 font-black text-2xl">{selectedPages.length}</p>
                        <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mt-1">Files Selected</p>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="text-slate-400 group-hover:text-blue-500" size={40} />
                        <span className="text-xs font-bold text-slate-400 group-hover:text-blue-500">Select Multiple Page Images</span>
                        <p className="text-[10px] text-slate-400 mt-1">Click to browse your gallery</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPagesModal(false)}
                  className="flex-1 px-6 py-3.5 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all active:scale-95 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || selectedPages.length === 0}
                  className="flex-2 px-8 py-3.5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                >
                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : "Upload Pages"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEPaper;
