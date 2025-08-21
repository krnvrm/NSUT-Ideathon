import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Languages, Contrast, Minus, Plus } from 'lucide-react';

import sakshamLogo from '../assets/saksham-logo.png';
import satyamevLogo from '../assets/satyamev-jayate.png';

export interface NavbarProps {
  showUtilities?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showUtilities = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [contrast, setContrast] = useState(false);
  const [fontStep, setFontStep] = useState<-1 | 0 | 1>(0);

  const location = useLocation();

  const navItems = [
    { name: 'Finance Hub', path: '/finance' },
    { name: 'Market Linkage', path: '/market-linkage' },
    { name: 'Technology Hub', path: '/technology' },
    { name: 'ONDC Academy', path: '/ondc-academy' },
    { name: 'Clusters', path: '/cluster' },
    { name: 'UaaS', path: '/UaaS' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('gov-ui:font-step', { detail: { fontStep } }));
  }, [fontStep]);
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('gov-ui:contrast', { detail: { contrast } }));
  }, [contrast]);
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('gov-ui:lang', { detail: { lang } }));
  }, [lang]);

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      {/* Skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-yellow-300 text-black px-3 py-2 rounded"
      >
        {lang === 'en' ? 'Skip to main content' : 'मुख्य सामग्री पर जाएं'}
      </a>

      {/* Utility bar */}
      {showUtilities && (
        <div className={`${contrast ? 'bg-zinc-900' : 'bg-slate-800'} text-white text-xs sm:text-sm`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{lang === 'en' ? 'Government of India' : 'भारत सरकार'}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                aria-label="Decrease font size"
                onClick={() => setFontStep((s) => (s === -1 ? -1 : ((s - 1) as -1 | 0 | 1)))}
                className="inline-flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10"
              >
                <Minus size={16} /> <span className="hidden sm:inline">A-</span>
              </button>
              <button
                aria-label="Reset font size"
                onClick={() => setFontStep(0)}
                className="inline-flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10"
              >
                A
              </button>
              <button
                aria-label="Increase font size"
                onClick={() => setFontStep((s) => (s === 1 ? 1 : ((s + 1) as -1 | 0 | 1)))}
                className="inline-flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10"
              >
                <Plus size={16} /> <span className="hidden sm:inline">A+</span>
              </button>
              <button
                aria-pressed={contrast}
                onClick={() => setContrast((v) => !v)}
                className="inline-flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10"
              >
                <Contrast size={16} /> <span className="hidden sm:inline">{lang === 'en' ? 'High Contrast' : 'हाई कॉन्ट्रास्ट'}</span>
              </button>
              <button
                onClick={() => setLang((l) => (l === 'en' ? 'hi' : 'en'))}
                className="inline-flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10"
              >
                <Languages size={16} /> <span className="uppercase">{lang === 'en' ? 'हिं' : 'EN'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main bar */}
      <div className={`${contrast ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* TALLER: h-20 (80px) on mobile, h-24 (96px) on md+ */}
          <div className="flex justify-between h-20 md:h-24">
            {/* Brand */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 md:gap-3" aria-label="Home">
                {/* LEFT — Satyamev Jayate (kept modest) */}
                <img
                  src={satyamevLogo}
                  alt={lang === 'en' ? 'Satyamev Jayate' : 'सत्यमेव जयते'}
                  className="h-10 w-auto md:h-12 object-contain select-none shrink-0"
                  draggable={false}
                />
                {/* RIGHT — Saksham (significantly larger) */}
                <img
                  src={sakshamLogo}
                  alt="Saksham"
                  className="h-16 w-auto md:h-20 object-contain select-none shrink-0 -my-1 md:-my-2"
                  draggable={false}
                />
              </Link>
            </div>

            {/* Desktop Menu — slightly tighter spacing */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    aria-current={active ? 'page' : undefined}
                    className={`px-2.5 py-2 rounded-md text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-200 ${
                      active
                        ? 'text-[#0F5BA7] bg-blue-50'
                        : 'text-slate-700 hover:text-[#0F5BA7] hover:bg-slate-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}

              {/* Search (tighter left margin) */}
              <div className="hidden lg:flex items-center bg-slate-100 rounded-lg px-2 py-1 ml-1 focus-within:ring focus-within:ring-blue-200">
                <Search size={16} className="opacity-60" />
                <input
                  aria-label="Search"
                  placeholder={lang === 'en' ? 'Search schemes or services' : 'योजनाएँ/सेवाएँ खोजें'}
                  className="bg-transparent px-2 outline-none w-48 text-sm"
                />
              </div>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen((o) => !o)}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                className="text-slate-700 hover:text-[#0F5BA7] focus:outline-none"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tricolour accent */}
      <div className="h-1 w-full grid grid-cols-3">
        <div className="bg-[#FF9933]" />
        <div className="bg-white" />
        <div className="bg-[#138808]" />
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden bg-white border-t shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    active
                      ? 'text-[#0F5BA7] bg-blue-50'
                      : 'text-slate-700 hover:text-[#0F5BA7] hover:bg-slate-50'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            {/* Search on mobile */}
            <div className="mt-2 flex items-center bg-slate-100 rounded-lg px-2 py-2">
              <Search size={16} className="opacity-60" />
              <input
                aria-label="Search"
                placeholder={lang === 'en' ? 'Search schemes or services' : 'योजनाएँ/सेवाएँ खोजें'}
                className="bg-transparent px-2 outline-none w-full text-sm"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
