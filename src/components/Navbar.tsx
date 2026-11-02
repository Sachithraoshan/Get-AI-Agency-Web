import React, { useState, useEffect } from 'react';
import { Logo } from './Logo.tsx';
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react';
import { useRouter } from '../utils/router.tsx';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { path, navigate } = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', to: '/#services' },
    { label: 'Projects', to: '/projects' },
    { label: 'Process', to: '/#process' },
    { label: 'About', to: '/#about' },
    { label: 'Contact', to: '/contact' },
  ];

  const handleLinkClick = (to: string) => {
    setMobileMenuOpen(false);
    navigate(to);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200 py-3 shadow-xs'
          : 'bg-white/80 backdrop-blur-sm border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => navigate('/')}
          className="group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-black rounded-sm py-1 cursor-pointer"
          aria-label="GET AI AGENCY Home"
        >
          <Logo size={28} />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = path === link.to;
            return (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.to)}
                className={`text-xs font-semibold uppercase tracking-wider transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-black rounded-sm px-1 py-1 cursor-pointer ${
                  isActive ? 'text-black' : 'text-neutral-600 hover:text-black'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop CTA & Hotline */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+94775768237"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-700 hover:text-black transition-colors px-2 py-1.5 rounded-xs hover:bg-neutral-100"
            title="Call GET AI Agency Hotline"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Hotline: +94 775768237</span>
          </a>

          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-2 bg-black text-white text-xs font-semibold tracking-wider uppercase px-4 py-2.5 rounded-sm hover:bg-neutral-800 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2 sm:gap-3">
          <a
            href="tel:+94775768237"
            className="p-2 text-neutral-800 hover:text-black hover:bg-neutral-100 rounded-sm"
            aria-label="Call Hotline +94 775768237"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            onClick={() => navigate('/contact')}
            className="text-xs font-semibold uppercase bg-black text-white px-3 py-1.5 rounded-sm hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Start
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-800 hover:text-black focus:outline-hidden focus-visible:ring-2 focus-visible:ring-black rounded-sm cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200 px-4 pt-3 pb-6 shadow-md">
          <div className="flex flex-col divide-y divide-neutral-100">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.to)}
                className="text-left py-3 text-sm font-medium tracking-wide text-neutral-800 hover:text-black uppercase cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            
            <div className="pt-3 pb-2">
              <a
                href="tel:+94775768237"
                className="flex items-center gap-2 text-xs font-mono text-neutral-800 hover:text-black py-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Hotline: +94 775768237</span>
              </a>
            </div>

            <div className="pt-4">
              <button
                onClick={() => handleLinkClick('/contact')}
                className="w-full flex items-center justify-center gap-2 bg-black text-white text-xs font-semibold uppercase tracking-wider py-3 rounded-sm hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
