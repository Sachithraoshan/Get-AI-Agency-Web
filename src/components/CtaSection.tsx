import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { GetPathSymbol } from './Logo.tsx';
import { useRouter } from '../utils/router.tsx';

export const CtaSection: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section className="py-20 md:py-28 bg-neutral-950 text-white relative overflow-hidden border-b border-neutral-800">
      
      {/* Abstract geometric watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none translate-x-1/4">
        <GetPathSymbol size={480} invert={true} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-neutral-800 text-[11px] font-semibold tracking-widest uppercase text-neutral-400 mb-6 rounded-xs">
            Start The Dialogue
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.15]">
            Have a business problem worth solving?
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-normal mb-10 max-w-2xl">
            Tell us what is not working. We will help you understand the problem and identify the right next step.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center justify-center gap-2.5 bg-white text-black text-xs font-semibold uppercase tracking-wider px-8 py-4 rounded-xs hover:bg-neutral-200 transition-colors shadow-xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/projects')}
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white border border-neutral-700 text-xs font-semibold uppercase tracking-wider px-8 py-4 rounded-xs hover:bg-neutral-900 hover:border-neutral-500 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
