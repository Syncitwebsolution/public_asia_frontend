import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Calendar,
  FileText,
  Loader2,
  Search,
  X,
  Check,
  Image as ImageIcon,
  Eye,
  Upload,
  FileCode,
  CheckCircle,
  Layers,
  Edit3,
  ExternalLink
} from "lucide-react";
import api from "../../assets/api";

const AdminEPaper = () => {
  const [epapers, setEpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEdition, setEditingEdition] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Create/Edit Form state
  const [formData, setFormData] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    status: "PUBLISHED",
    thumbnail: null,
    pdf: null,
  });
  const [selectedPages, setSelectedPages] = useState([]);

  // Manage Pages Modal state
  const [selectedEpaper, setSelectedEpaper] = useState(null);
  const [showPagesModal, setShowPagesModal] = useState(false);
  const [additionalPages, setAdditionalPages] = useState([]);
  const [isUploadingPages, setIsUploadingPages] = useState(false);

  useEffect(() => {
    fetchEpapers();
  }, []);

  const fetchEpapers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/epaper?all=true");
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

  const handleFileChange = (e, field) => {
    if (field === "pages") {
      setSelectedPages(Array.from(e.target.files));
    } else {
      setFormData((prev) => ({ ...prev, [field]: e.target.files[0] }));
    }
  };

  const openCreateModal = () => {
    setEditingEdition(null);
    setFormData({
      title: "Public Asia Daily Edition",
      date: new Date().toISOString().split("T")[0],
      status: "PUBLISHED",
      thumbnail: null,
      pdf: null,
    });
    setSelectedPages([]);
    setShowModal(true);
  };

  const openEditModal = (epaper) => {
    setEditingEdition(epaper);
    setFormData({
      title: epaper.title || "",
      date: epaper.date ? new Date(epaper.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      status: epaper.status || "PUBLISHED",
      thumbnail: null,
      pdf: null,
    });
    setSelectedPages([]);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("date", formData.date);
    data.append("status", formData.status);

    if (formData.thumbnail) {
      data.append("thumbnail", formData.thumbnail);
    }
    if (formData.pdf) {
      data.append("pdf", formData.pdf);
    }
    selectedPages.forEach((file) => {
      data.append("pages", file);
    });

    try {
      if (editingEdition) {
        await api.put(`/epaper/${editingEdition._id}`, data);
      } else {
        await api.post("/epaper", data);
      }
      setShowModal(false);
      fetchEpapers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save edition");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openManagePagesModal = (epaper) => {
    setSelectedEpaper(epaper);
    setAdditionalPages([]);
    setShowPagesModal(true);
  };

  const handleAddMorePages = async (e) => {
    e.preventDefault();
    if (additionalPages.length === 0) return;

    setIsUploadingPages(true);
    const data = new FormData();
    additionalPages.forEach((file) => {
      data.append("pages", file);
    });

    try {
      const res = await api.post(`/epaper/${selectedEpaper._id}/pages`, data);
      setSelectedEpaper(res.data.data);
      setAdditionalPages([]);
      fetchEpapers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add pages");
    } finally {
      setIsUploadingPages(false);
    }
  };

  const handleDeletePage = async (pageId) => {
    if (!window.confirm("Delete this page from edition?")) return;

    try {
      const res = await api.delete(`/epaper/${selectedEpaper._id}/pages/${pageId}`);
      setSelectedEpaper(res.data.data);
      fetchEpapers();
    } catch (err) {
      alert("Failed to delete page");
    }
  };

  const handleDeleteEdition = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complete edition?")) return;

    try {
      await api.delete(`/epaper/${id}`);
      fetchEpapers();
    } catch (err) {
      alert("Failed to delete e-paper");
    }
  };

  const toggleStatus = async (epaper) => {
    const newStatus = epaper.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    try {
      await api.put(`/epaper/${epaper._id}`, { status: newStatus });
      fetchEpapers();
    } catch (err) {
      alert("Failed to change status");
    }
  };

  const filteredEpapers = epapers.filter(
    (ep) =>
      ep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ep.date && ep.date.includes(searchQuery))
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">E-Paper Management</h1>
          <p className="text-slate-500 text-sm">Upload, manage, and publish daily news portal e-paper editions.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200 active:scale-95 text-sm"
        >
          <Plus size={18} />
          Upload New Edition
        </button>
      </div>

      {/* Stats and Search bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center font-bold">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Editions</p>
            <p className="text-2xl font-black text-slate-900">{epapers.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Published</p>
            <p className="text-2xl font-black text-slate-900">
              {epapers.filter((e) => e.status === "PUBLISHED").length}
            </p>
          </div>
        </div>

        <div className="md:col-span-2 relative flex items-center">
          <Search className="absolute left-4 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search by title or date..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all text-sm font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Editions List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Cover / Title</th>
                <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Pages</th>
                <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center">
                    <Loader2 className="w-8 h-8 text-red-600 animate-spin mx-auto mb-2" />
                    <p className="text-slate-400 text-sm font-medium">Loading editions...</p>
                  </td>
                </tr>
              ) : filteredEpapers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center">
                    <p className="text-slate-500 font-bold text-base mb-1">No E-Paper Editions Found</p>
                    <p className="text-slate-400 text-xs mb-4">Click "Upload New Edition" to publish your first e-paper.</p>
                    <button
                      onClick={openCreateModal}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition"
                    >
                      <Plus size={16} /> Upload Now
                    </button>
                  </td>
                </tr>
              ) : (
                filteredEpapers.map((epaper) => (
                  <tr key={epaper._id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {epaper.thumbnail ? (
                          <img
                            src={epaper.thumbnail}
                            alt=""
                            className="w-12 h-16 rounded-lg object-cover bg-slate-100 border border-slate-200 shadow-sm shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-16 bg-red-50 text-red-500 rounded-lg border border-red-100 flex items-center justify-center shrink-0">
                            <FileText size={24} />
                          </div>
                        )}
                        <div>
                          <span className="font-bold text-slate-900 text-sm block">{epaper.title}</span>
                          {epaper.pdfUrl && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-blue-600 font-semibold mt-0.5">
                              <FileCode size={12} /> PDF Attached
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-slate-600 text-xs font-semibold">
                        <Calendar size={14} className="text-red-500" />
                        {new Date(epaper.date).toLocaleDateString("hi-IN", {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openManagePagesModal(epaper)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition"
                      >
                        <Layers size={14} />
                        {epaper.pages?.length || 0} Pages
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleStatus(epaper)}
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition ${
                          epaper.status === "PUBLISHED"
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                        }`}
                      >
                        {epaper.status}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <a
                          href="/epaper"
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Preview on Public Website"
                        >
                          <ExternalLink size={18} />
                        </a>
                        <button
                          onClick={() => openManagePagesModal(epaper)}
                          className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                          title="Manage Pages"
                        >
                          <Layers size={18} />
                        </button>
                        <button
                          onClick={() => openEditModal(epaper)}
                          className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit Edition Info"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteEdition(epaper._id)}
                          className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete Edition"
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

      {/* CREATE / EDIT EDITION MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-900">
                {editingEdition ? "Edit Edition Details" : "Upload New E-Paper Edition"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-200 transition"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5 overflow-y-auto custom-scrollbar flex-1">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Edition Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Public Asia Daily - Delhi Edition"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition font-medium text-sm text-slate-900"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Publish Date *</label>
                  <input
                    type="date"
                    name="date"
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition font-medium text-sm text-slate-900"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Status</label>
                  <select
                    name="status"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition font-bold text-sm text-slate-900"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="PUBLISHED">PUBLISHED (Live)</option>
                    <option value="DRAFT">DRAFT (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Upload Page Images */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                  Select Page Images (Multiple Files)
                </label>
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileChange(e, "pages")}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 group-hover:border-red-500 group-hover:bg-red-50/20 transition">
                    {selectedPages.length > 0 ? (
                      <div className="text-center">
                        <Check className="text-green-600 mx-auto mb-1" size={24} />
                        <p className="text-slate-900 font-black text-sm">{selectedPages.length} Page Images Selected</p>
                        <p className="text-xs text-slate-400">Click to change selection</p>
                      </div>
                    ) : (
                      <>
                        <Upload className="text-slate-400 group-hover:text-red-500" size={28} />
                        <span className="text-xs font-bold text-slate-600 group-hover:text-red-600">
                          Click or drag page JPEG / PNG images here
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Cover / Thumbnail Image (Optional) */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                  Cover / Thumbnail Image (Optional - defaults to Page 1)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "thumbnail")}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-600"
                />
              </div>

              {/* Submit buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-2 px-8 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition disabled:opacity-50 flex items-center justify-center gap-2 text-sm shadow-md shadow-red-200"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Uploading & Processing...
                    </>
                  ) : editingEdition ? (
                    "Save Changes"
                  ) : (
                    "Publish Edition"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MANAGE PAGES MODAL */}
      {showPagesModal && selectedEpaper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h2 className="text-lg font-black text-slate-900">{selectedEpaper.title}</h2>
                <p className="text-slate-500 text-xs">
                  {selectedEpaper.pages?.length || 0} total pages uploaded
                </p>
              </div>
              <button
                onClick={() => setShowPagesModal(false)}
                className="p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-200 transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
              {/* Existing Pages Grid */}
              {selectedEpaper.pages && selectedEpaper.pages.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {selectedEpaper.pages.map((page) => (
                    <div
                      key={page._id}
                      className="group relative bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-sm flex flex-col"
                    >
                      <img
                        src={page.imageUrl}
                        alt={`Page ${page.pageNumber}`}
                        className="w-full h-44 object-cover"
                      />
                      <div className="p-2 bg-white flex items-center justify-between text-xs font-bold text-slate-700">
                        <span>Page {page.pageNumber}</span>
                        <button
                          type="button"
                          onClick={() => handleDeletePage(page._id)}
                          className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition"
                          title="Delete Page"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <ImageIcon size={36} className="text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-600 font-bold text-sm">No page images uploaded yet.</p>
                </div>
              )}

              {/* Upload More Pages Form */}
              <form onSubmit={handleAddMorePages} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Add More Pages to this Edition</h3>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    required
                    onChange={(e) => setAdditionalPages(Array.from(e.target.files))}
                    className="w-full text-xs font-medium text-slate-600 bg-white p-3 border border-slate-200 rounded-xl cursor-pointer"
                  />
                  <button
                    type="submit"
                    disabled={isUploadingPages || additionalPages.length === 0}
                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition disabled:opacity-50 shrink-0 flex items-center justify-center gap-2"
                  >
                    {isUploadingPages ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                    Upload Pages
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEPaper;
