import React from 'react';
import { Logo, GetPathSymbol } from './Logo.tsx';
import { ArrowUp, Phone, Mail, ExternalLink } from 'lucide-react';
import { useRouter } from '../utils/router.tsx';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Services', to: '/#services' },
    { label: 'Projects', to: '/projects' },
    { label: 'Process', to: '/#process' },
    { label: 'About', to: '/#about' },
    { label: 'Contact', to: '/contact' },
  ];

  const serviceLinks = [
    { label: 'Website Redesign', to: '/services/website-redesign' },
    { label: 'Responsive Websites', to: '/services/mobile-responsive-websites' },
    { label: 'Speed Optimization', to: '/services/website-speed-optimization' },
    { label: 'Business Dashboards', to: '/services/business-dashboards' },
    { label: 'Brand Design', to: '/services/brand-design' },
  ];

  return (
    <footer className="bg-neutral-950 text-white pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tier */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Brand Info & Hotline */}
          <div className="md:col-span-4">
            <Logo size={32} invert={true} className="mb-4" />
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
              AI Solutions. Real Problems. Practical Results.
            </p>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed font-normal mb-6">
              GET AI helps businesses improve digital presence, performance, and decision making through practical technology solutions designed around real business problems.
            </p>

            <div className="space-y-2 text-xs font-mono text-neutral-300">
              <a 
                href="tel:+94775768237"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <span>Hotline: +94 775768237</span>
              </a>
              <a 
                href="mailto:hello@getai.com.lk"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>Email: hello@getai.com.lk</span>
              </a>
            </div>
          </div>

          {/* Services Links for Crawlability & Navigation */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.to)}
                    className="text-xs text-neutral-400 hover:text-white transition-colors uppercase tracking-wider font-medium cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.to)}
                    className="text-xs text-neutral-400 hover:text-white transition-colors uppercase tracking-wider font-medium cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Agency Positioning & Public Social */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 mb-4">
                Core Positioning
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-normal mb-4">
                Problem First. Not Technology First.<br />
                Managed Third Party Agency Model.<br />
                Sri Lanka • Regional • Global.
              </p>

              <div className="pt-2">
                <a
                  href="https://www.linkedin.com/company/117434241/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors font-mono"
                >
                  <span>Company LinkedIn</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Scroll to top of page"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Tier: Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-mono">
          <div className="flex items-center gap-3">
            <GetPathSymbol size={20} invert={true} className="opacity-80" />
            <span>© 2026 GET AI AGENCY. All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-4 text-neutral-400">
            <span>Colombo, Sri Lanka</span>
            <span>•</span>
            <a href="tel:+94775768237" className="hover:text-white transition-colors">
              +94 775768237
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
