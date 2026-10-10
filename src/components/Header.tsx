import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LogoSW } from './LogoSW';
import {
  Search,
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  BookOpen,
  LogOut,
  LayoutDashboard,
  ShieldAlert,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentPath,
    navigate,
    currentUser,
    setAuthModalOpen,
    setSearchModalOpen,
    logout,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Sex Education', path: '/category/sex-education' },
    { label: 'Parenting', path: '/category/parenting' },
    { label: 'Emotional Intelligence', path: '/category/emotional-intelligence' },
    { label: 'Relationships', path: '/category/relationships' },
    { label: 'Marriage', path: '/category/marriage' },
    { label: 'Adolescence', path: '/category/adolescence' },
    { label: 'Health & Wellbeing', path: '/category/health-wellbeing' },
    { label: 'Courses', path: '/courses' },
  ];

  const moreCategories = [
    { label: 'Personal Development', path: '/category/personal-development', urdu: 'شخصی تعمیر' },
    { label: 'Miscellaneous', path: '/category/miscellaneous', urdu: 'متفرق وسائل' },
    { label: 'Booklets & Guides', path: '/booklets', urdu: 'کتابچے اور گائیڈز' },
    { label: 'Video Lectures', path: '/videos', urdu: 'ویڈیو لیکچرز' },
    { label: 'Ask Soch Wale', path: '/ask', urdu: 'گمنام سوال پوچھیں' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && (currentPath === '/' || currentPath === '')) return true;
    return currentPath === path;
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setCategoriesDropdownOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0A] border-b border-[#222222] text-white shadow-md">
      {/* Top Banner Notice (Minimal & Classy) */}
      <div className="bg-[#141414] border-b border-stone-800 text-[11px] py-1.5 px-4 text-center text-stone-400">
        <span className="font-urdu-inline text-stone-300 ml-2">سوچ والے — بہتر سوچ، بہتر زندگی</span>
        <span className="mx-2 text-stone-600">·</span>
        <span>WhatsApp Assistance: <a href="https://wa.me/923032226181" target="_blank" rel="noopener noreferrer" className="text-[#B89A5A] hover:underline">+92 303 2226181</a></span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo & Name */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
            aria-label="Soch Wale Home"
          >
            <LogoSW size={46} showText={false} />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-[#B89A5A] transition-colors font-serif">
                SOCH WALE
              </span>
              <span className="text-xs font-urdu text-[#B89A5A] leading-none mt-0.5">
                سوچ والے
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2 text-[13px] font-medium tracking-wide">
            {navLinks.map((item) => {
              const active = isActive(item.path);
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.path)}
                  className={`px-2.5 py-1.5 rounded transition-colors whitespace-nowrap cursor-pointer ${
                    active
                      ? 'text-[#B89A5A] font-semibold border-b-2 border-[#B89A5A] rounded-b-none'
                      : 'text-stone-300 hover:text-[#B89A5A]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Explore More Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 text-stone-300 hover:text-[#B89A5A] text-[13px] font-medium transition-colors cursor-pointer"
                aria-expanded={categoriesDropdownOpen}
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${categoriesDropdownOpen ? 'rotate-180 text-[#B89A5A]' : ''}`} />
              </button>

              {categoriesDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#181818] border border-stone-800 rounded-lg shadow-2xl py-2 z-50">
                  {moreCategories.map((cat) => (
                    <button
                      key={cat.label}
                      onClick={() => handleNavClick(cat.path)}
                      className="w-full text-left px-4 py-2 text-xs text-stone-300 hover:bg-[#252525] hover:text-[#B89A5A] flex items-center justify-between transition-colors"
                    >
                      <span>{cat.label}</span>
                      <span className="font-urdu text-[11px] text-stone-400">{cat.urdu}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right-Side Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
              title="Search articles, courses, and guides"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User Account / Auth buttons */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#181818] hover:bg-stone-800 border border-stone-700 rounded-lg text-xs font-medium text-stone-200 transition-colors cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-[#B89A5A] text-[#0A0A0A] font-bold flex items-center justify-center text-[11px]">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[100px] truncate">{currentUser.name}</span>
                  <ChevronDown className="w-3 h-3 text-stone-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-[#181818] border border-stone-800 rounded-lg shadow-2xl py-2 z-50 text-xs">
                    <div className="px-4 py-2 border-b border-stone-800">
                      <p className="font-semibold text-white truncate">{currentUser.name}</p>
                      <p className="text-stone-400 text-[11px] truncate">{currentUser.email}</p>
                      {currentUser.role === 'super_admin' && (
                        <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider text-[#B89A5A] bg-[#B89A5A]/10 px-2 py-0.5 rounded">
                          Super Administrator
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleNavClick('/dashboard')}
                      className="w-full text-left px-4 py-2.5 text-stone-200 hover:bg-stone-800 hover:text-[#B89A5A] flex items-center gap-2 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Student Dashboard</span>
                    </button>

                    {currentUser.role === 'super_admin' && (
                      <button
                        onClick={() => handleNavClick('/admin')}
                        className="w-full text-left px-4 py-2.5 text-[#B89A5A] hover:bg-stone-800 flex items-center gap-2 transition-colors font-medium"
                      >
                        <ShieldAlert className="w-4 h-4" />
                        <span>CMS & Admin Panel</span>
                      </button>
                    )}

                    <div className="border-t border-stone-800 my-1"></div>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-rose-400 hover:bg-stone-800 flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAuthModalOpen('login')}
                  className="px-3.5 py-1.5 text-xs font-medium text-stone-300 hover:text-white transition-colors cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => setAuthModalOpen('signup')}
                  className="px-4 py-2 text-xs font-semibold text-[#0A0A0A] bg-[#B89A5A] hover:bg-[#967B43] rounded transition-colors shadow cursor-pointer whitespace-nowrap"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-stone-300 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#121212] border-b border-stone-800 px-4 pt-3 pb-6 max-h-[80vh] overflow-y-auto space-y-3">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.path)}
                className={`text-left px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-[#B89A5A] bg-[#1c1c1c] font-semibold'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="border-t border-stone-800 pt-3">
            <p className="px-3 text-[11px] uppercase tracking-wider text-stone-500 font-semibold mb-1">
              Explore More
            </p>
            {moreCategories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => handleNavClick(cat.path)}
                className="w-full text-left px-3 py-2 rounded text-xs text-stone-300 hover:text-[#B89A5A] hover:bg-stone-800 flex items-center justify-between"
              >
                <span>{cat.label}</span>
                <span className="font-urdu text-stone-400">{cat.urdu}</span>
              </button>
            ))}
          </div>

          {!currentUser && (
            <div className="border-t border-stone-800 pt-4 flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthModalOpen('login');
                }}
                className="flex-1 py-2 text-center text-xs font-semibold text-stone-300 bg-stone-800 rounded"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthModalOpen('signup');
                }}
                className="flex-1 py-2 text-center text-xs font-semibold text-[#0A0A0A] bg-[#B89A5A] rounded"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
