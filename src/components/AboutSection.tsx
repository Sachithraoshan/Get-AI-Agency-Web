import React from 'react';
import { GetPathSymbol } from './Logo.tsx';
import { Compass, Target, Globe } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Agency Story & Founder */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 border border-neutral-200 text-[11px] font-semibold tracking-widest uppercase text-neutral-700 mb-6 rounded-xs">
              Agency & Leadership
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black mb-6">
              Founded on the belief that technology should solve real problems.
            </h2>

            <div className="space-y-4 text-sm text-neutral-700 leading-relaxed font-normal mb-8">
              <p>
                <strong>GET AI AGENCY</strong> was established in Sri Lanka to offer a straightforward alternative to trend driven digital agencies. Many businesses find themselves overwhelmed by technical jargon, expensive retainers, and fragile systems that do little to move their commercial needle.
              </p>
              <p>
                Under the leadership of <strong>Sachithra Oshan</strong> (Founder & CEO), GET AI operates on a disciplined managed service model: we listen deeply to the client's business bottleneck, define the leanest solution, orchestrate vetted external domain specialists, and enforce rigorous quality control before any deliverable is handed over.
              </p>
              <p>
                Our roadmap starts with empowering businesses across Sri Lanka, before methodically scaling our managed agency frameworks across regional and global markets.
              </p>
            </div>

            {/* Founder Profile Box */}
            <div className="bg-neutral-50 border border-neutral-200 p-6 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-1">
                  Founder & CEO
                </div>
                <h3 className="text-lg font-bold text-black uppercase tracking-wider">
                  Sachithra Oshan
                </h3>
                <p className="text-xs text-neutral-600 mt-1">
                  Leading strategic vision, problem scoping, and quality control.
                </p>
              </div>

              <div className="text-left sm:text-right border-t sm:border-t-0 sm:border-l border-neutral-200 pt-3 sm:pt-0 sm:pl-6">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">Domain</span>
                <span className="text-xs font-mono font-semibold text-black">getai.com.lk</span>
              </div>
            </div>

          </div>

          {/* Right Column: Mission & The GET Path Symbolism */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* The GET Path Narrative Card */}
            <div className="bg-neutral-900 text-white p-6 sm:p-8 rounded-sm border border-neutral-800">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <GetPathSymbol size={24} invert={true} />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    The GET Path Identity
                  </span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">Brand Concept</span>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed mb-6">
                The visual mark of GET AI embodies a continuous, persistent journey:
              </p>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center gap-3 p-2 bg-neutral-950 border border-neutral-800 rounded-xs">
                  <span className="text-neutral-500">01</span>
                  <span className="text-white">A small, focused beginning</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-neutral-950 border border-neutral-800 rounded-xs">
                  <span className="text-neutral-500">02</span>
                  <span className="text-white">Persistence through real problem solving</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-neutral-950 border border-neutral-800 rounded-xs">
                  <span className="text-neutral-500">03</span>
                  <span className="text-white">Methodical commercial progression</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-neutral-950 border border-neutral-800 rounded-xs">
                  <span className="text-neutral-500">04</span>
                  <span className="text-white">Transformation of client capabilities</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-neutral-950 border border-neutral-800 rounded-xs">
                  <span className="text-neutral-500">05</span>
                  <span className="text-white">An open ended global future</span>
                </div>
              </div>
            </div>

            {/* Strategic Trajectory Callout */}
            <div className="bg-neutral-50 border border-neutral-200 p-6 rounded-sm">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-black mb-3">
                <Globe className="w-4 h-4 text-neutral-700" />
                <span>Geographic Trajectory</span>
              </div>
              <div className="flex items-center justify-between text-xs text-neutral-700 font-medium py-2 border-y border-neutral-200">
                <span className="font-bold text-black">Sri Lanka</span>
                <span>→</span>
                <span>Regional Asia</span>
                <span>→</span>
                <span>Global Markets</span>
              </div>
              <p className="text-[11px] text-neutral-500 mt-2 leading-relaxed">
                Grounding our foundations locally to deliver exceptional digital standards anywhere.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
