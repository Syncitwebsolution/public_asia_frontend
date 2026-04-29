import React, { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from "react-router-dom"
import { Home, Video, Search, User, BookOpen, Layers, LogOut, Settings, ChevronDown, KeyRound, Menu, X, ChevronRight, Shield } from "lucide-react"
import { useUser } from './admin/UserContext.jsx';
import logoImg from '../assets/IMG_3084.JPG.jpeg';

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useUser();

  const isAdmin = currentUser && (currentUser.role === "admin" || currentUser.role === "ADMIN");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${query}`);
    setSearchOpen(false);
    setMenuOpen(false);
    setQuery("");
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate("/");
  };

  const handleScrollToTop = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const goTo = (path) => {
    setMenuOpen(false);
    setDropdownOpen(false);
    navigate(path);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Common drawer link style
  const drawerLinkClass = (isActive) =>
    `flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${isActive
      ? "bg-gradient-to-r from-red-50 to-red-50/60 text-red-600 font-semibold shadow-sm shadow-red-100/40"
      : "text-gray-700 hover:bg-gray-50 active:bg-gray-100"
    }`;

  return (
    <>
      <div className="sticky top-0 z-[100] bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">

          {/* Left: Hamburger + Logo */}
          <div className="flex items-center sm:gap-2">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors active:scale-90"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <NavLink to="/" onClick={handleScrollToTop} className="group cursor-pointer flex items-center shrink-0">
              <img
                src={logoImg}
                alt="Public Asia Logo"
                style={{ height: '70px', width: 'auto', maxWidth: '200px' }}
                className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </NavLink>
          </div>

          {/* Center: Desktop Nav */}
          <div className="hidden md:flex flex-1 justify-center font-bold text-gray-700">
            <div className="flex items-center gap-8">
              <NavLink to="/" onClick={handleScrollToTop} className={({ isActive }) =>
                `flex items-center gap-2 hover:text-red-600 transition-colors py-1 ${isActive ? "text-red-600 border-b-2 border-red-600" : ""}`
              }>
                <Home size={20} />
                <span>होम</span>
              </NavLink>

              <NavLink to="/videos" className={({ isActive }) =>
                `flex items-center gap-2 hover:text-red-600 transition-colors py-1 ${isActive ? "text-red-600 border-b-2 border-red-600" : ""}`
              }>
                <Video size={20} />
                <span>वीडियो</span>
              </NavLink>

              {!searchOpen ? (
                <div onClick={() => setSearchOpen(true)} className="flex items-center gap-2 cursor-pointer hover:text-red-600 transition-colors py-1">
                  <Search size={20} />
                  <span>खोजें</span>
                </div>
              ) : (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="समाचार खोजें..."
                    className="border border-gray-200 rounded-full px-4 py-1.5 outline-none w-56 text-sm font-normal focus:border-red-500 focus:ring-1 focus:ring-red-500/20 transition-all bg-gray-50"
                    autoFocus
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget)) setSearchOpen(false);
                    }}
                  />
                </form>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5 sm:gap-4 font-bold text-gray-700">
            <NavLink to="/epaper" className={({ isActive }) =>
              `flex items-center gap-1 sm:gap-2 hover:text-red-600 whitespace-nowrap py-1 transition-colors text-[10px] sm:text-base ${isActive ? "text-red-600 border-b-2 border-red-600" : ""}`
            }>
              <BookOpen className="w-3.5 h-3.5 sm:w-5 sm:h-5 mr-2" />
              <span className="hidden sm:inline">ई-पेपर</span>
            </NavLink>

            <NavLink to="/webstory" className={({ isActive }) =>
              `flex items-center gap-1 sm:gap-2 hover:text-red-600 whitespace-nowrap py-1 transition-colors text-[10px] sm:text-base ${isActive ? "text-red-600 border-b-2  border-red-600" : ""}`
            }>
              <Layers className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">वेबस्टोरी</span>
            </NavLink>

            <div className="pl-1.5 sm:pl-4 border-l border-gray-100">
              {!currentUser ? (
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-1 sm:gap-2 bg-red-600 text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-full hover:bg-red-700 active:scale-95 transition-all text-[11px] sm:text-sm shadow-sm"
                >
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>लॉगिन</span>
                </button>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-1 sm:gap-2 bg-gray-50 border border-gray-100 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {currentUser.avatar ? (
                      <img src={currentUser.avatar} alt="Profile" className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover" />
                    ) : (
                      <div className="w-6 h-6 sm:w-7 sm:h-7 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                    )}
                    <span className="hidden lg:inline text-xs font-semibold max-w-[80px] truncate">
                      {currentUser.fullName || currentUser.username || "Account"}
                    </span>
                    <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[100]">
                      <div className="px-5 py-4 bg-gray-50/50 border-b border-gray-100 text-left">
                        <p className="text-sm font-bold text-gray-900 truncate">{currentUser.fullName}</p>
                        <p className="text-[11px] text-gray-500 truncate">{currentUser.email}</p>
                      </div>
                      <div className="p-1.5">
                        {isAdmin && (
                          <button onClick={() => goTo("/admin")} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl flex items-center gap-3 transition-colors">
                            <Settings size={18} className="opacity-70" /> Admin Panel
                          </button>
                        )}
                        <button onClick={() => goTo("/change-password")} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl flex items-center gap-3 transition-colors">
                          <KeyRound size={18} className="opacity-70" /> पासवर्ड बदलें
                        </button>
                        <div className="h-px bg-gray-100 my-1 mx-2" />
                        <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-3 transition-colors">
                          <LogOut size={18} className="opacity-70" /> लॉगआउट
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ============ MOBILE DRAWER ============ */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[70] md:hidden"
          onClick={() => setMenuOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

          {/* Drawer Panel */}
          <div
            className="fixed left-0 top-0 h-screen w-[82%] max-w-[310px] bg-white shadow-2xl flex flex-col z-[80]"
            style={{ animation: 'slideInLeft 0.25s ease-out' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* --- Header --- */}
            <div className="shrink-0 flex items-center justify-between px-5 py-3 border-b border-gray-100">
              <img src={logoImg} alt="Logo" style={{ height: '36px' }} className="w-auto object-contain" />
              <button
                onClick={() => setMenuOpen(false)}
                className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all active:scale-90"
              >
                <X size={22} />
              </button>
            </div>

            {/* --- Search --- */}
            <div className="shrink-0 px-4 pt-4 pb-2">
              <form onSubmit={handleSearch} className="relative">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="समाचार खोजें..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all placeholder:text-gray-400"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </form>
            </div>

            {/* --- Navigation Links (scrollable) --- */}
            <div className="flex-1 overflow-y-auto min-h-0 px-3 py-2">
              {/* Main Pages */}
              <div className="mb-1 px-2 pt-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">नेविगेशन</p>
              </div>

              <nav className="flex flex-col gap-0.5">
                <NavLink to="/" onClick={handleScrollToTop} className={({ isActive }) => drawerLinkClass(isActive)}>
                  <div className="flex items-center gap-3">
                    <Home size={19} strokeWidth={1.8} />
                    <span className="text-[14px]">होम</span>
                  </div>
                  <ChevronRight size={15} className="text-gray-300" />
                </NavLink>

                <NavLink to="/videos" onClick={() => setMenuOpen(false)} className={({ isActive }) => drawerLinkClass(isActive)}>
                  <div className="flex items-center gap-3">
                    <Video size={19} strokeWidth={1.8} />
                    <span className="text-[14px]">वीडियो</span>
                  </div>
                  <ChevronRight size={15} className="text-gray-300" />
                </NavLink>

                <NavLink to="/epaper" onClick={() => setMenuOpen(false)} className={({ isActive }) => drawerLinkClass(isActive)}>
                  <div className="flex items-center gap-3">
                    <BookOpen size={19} strokeWidth={1.8} />
                    <span className="text-[14px]">ई-पेपर</span>
                  </div>
                  <ChevronRight size={15} className="text-gray-300" />
                </NavLink>

                <NavLink to="/webstory" onClick={() => setMenuOpen(false)} className={({ isActive }) => drawerLinkClass(isActive)}>
                  <div className="flex items-center gap-3">
                    <Layers size={19} strokeWidth={1.8} />
                    <span className="text-[14px]">वेबस्टोरी</span>
                  </div>
                  <ChevronRight size={15} className="text-gray-300" />
                </NavLink>
              </nav>

              {/* Admin Section */}
              {currentUser && isAdmin && (
                <>
                  <div className="my-3 mx-2 h-px bg-gray-100" />
                  <div className="mb-1 px-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">एडमिन</p>
                  </div>
                  <nav className="flex flex-col gap-0.5">
                    <button
                      onClick={() => goTo("/admin")}
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-700 active:bg-purple-100 transition-all duration-200 w-full text-left"
                    >
                      <div className="flex items-center gap-3">
                        <Shield size={19} strokeWidth={1.8} />
                        <span className="text-[14px]">Admin Panel</span>
                      </div>
                      <ChevronRight size={15} className="text-gray-300" />
                    </button>
                  </nav>
                </>
              )}

              {/* Account Section */}
              {currentUser && (
                <>
                  <div className="my-3 mx-2 h-px bg-gray-100" />
                  <div className="mb-1 px-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">अकाउंट</p>
                  </div>
                  <nav className="flex flex-col gap-0.5">
                    <button
                      onClick={() => goTo("/change-password")}
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 w-full text-left"
                    >
                      <div className="flex items-center gap-3">
                        <KeyRound size={19} strokeWidth={1.8} />
                        <span className="text-[14px]">पासवर्ड बदलें</span>
                      </div>
                      <ChevronRight size={15} className="text-gray-300" />
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 active:bg-red-100 transition-all duration-200 w-full text-left"
                    >
                      <div className="flex items-center gap-3">
                        <LogOut size={19} strokeWidth={1.8} />
                        <span className="text-[14px] font-medium">लॉगआउट</span>
                      </div>
                    </button>
                  </nav>
                </>
              )}
            </div>

            {/* --- Footer: User Card or Login --- */}
            <div className="shrink-0 border-t border-gray-100 p-4 bg-gray-50/80">
              {!currentUser ? (
                <button
                  onClick={() => goTo("/login")}
                  className="w-full flex items-center justify-center gap-2.5 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 active:scale-[0.97] transition-all text-sm shadow-lg shadow-red-600/20"
                >
                  <User size={18} />
                  लॉगइन / साइनअप
                </button>
              ) : (
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-red-100" />
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full flex items-center justify-center shadow-md shadow-red-200">
                      <User size={18} />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{currentUser.fullName || currentUser.username}</p>
                    <p className="text-[11px] text-gray-500 truncate">{currentUser.email}</p>
                    {isAdmin && (
                      <span className="inline-block mt-0.5 text-[9px] font-bold bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full uppercase tracking-wider">Admin</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Drawer slide-in animation */}
      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  )
}

export default Navbar