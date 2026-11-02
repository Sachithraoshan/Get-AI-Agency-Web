import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, Phone } from 'lucide-react';
import { GetPathSymbol } from './Logo.tsx';
import { useRouter } from '../utils/router.tsx';

const PATH_STAGES = [
  {
    step: '01',
    name: 'Small Beginning',
    label: 'Where GET AI starts: focused, lean, and grounded in real customer realities.',
  },
  {
    step: '02',
    name: 'Persistence',
    label: 'Uncompromising determination to solve the core business challenge.',
  },
  {
    step: '03',
    name: 'Progression',
    label: 'Methodical advancement from raw problem definition to clean specifications.',
  },
  {
    step: '04',
    name: 'Transformation',
    label: 'Elevating digital presence, performance, and commercial clarity.',
  },
  {
    step: '05',
    name: 'Open Ended Future',
    label: 'Building long term foundation for regional and global expansion.',
  },
];

export const Hero: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const { navigate } = useRouter();

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-white overflow-hidden border-b border-neutral-200">
      {/* Subtle geometric architectural grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#000000" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Core Positioning and Typography */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Market and Direction Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 border border-neutral-200 text-[11px] font-semibold tracking-widest uppercase text-neutral-700 mb-8 rounded-xs">
              <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
              <span>Sri Lanka • Regional • Global</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-black leading-[1.08] mb-6">
              Web Design and Digital Solutions
              <br />
              <span className="text-neutral-900">for Sri Lankan Businesses.</span>
              <br />
              <span className="text-neutral-500">Practical Results.</span>
            </h1>

            {/* Supporting Text matching prompt exact specification */}
            <p className="text-base sm:text-lg text-neutral-700 max-w-2xl leading-relaxed mb-8 font-normal">
              We help Sri Lankan businesses solve practical digital problems through websites, website improvements, business dashboards and brand design.
            </p>

            {/* CTAs & Direct Hotline */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-6">
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center justify-center gap-2.5 bg-black text-white text-xs font-semibold uppercase tracking-wider px-7 py-4 rounded-xs hover:bg-neutral-800 transition-all shadow-xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/projects')}
                className="inline-flex items-center justify-center gap-2 bg-transparent text-black border border-neutral-300 text-xs font-semibold uppercase tracking-wider px-7 py-4 rounded-xs hover:bg-neutral-50 hover:border-black transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Hotline Callout */}
            <div className="mb-10">
              <a
                href="tel:+94775768237"
                className="inline-flex items-center gap-2 text-xs font-mono text-neutral-600 hover:text-black py-1 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <span>Hotline: +94 775768237</span>
              </a>
            </div>

            {/* Core Credo Bar */}
            <div className="w-full pt-8 border-t border-neutral-200 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Philosophy</div>
                <div className="text-xs font-semibold text-black">Problem First</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Model</div>
                <div className="text-xs font-semibold text-black">Managed Service</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Assurance</div>
                <div className="text-xs font-semibold text-black">Rigorous QC</div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Concept: The GET Path */}
          <div className="lg:col-span-5">
            <div className="bg-neutral-50 border border-neutral-200 rounded-sm p-6 sm:p-8 relative">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-neutral-200 pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <GetPathSymbol size={24} />
                  <span className="text-xs font-bold uppercase tracking-wider text-black">
                    The GET Path
                  </span>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 bg-white px-2 py-0.5 border border-neutral-200">
                  Continuous Progression
                </span>
              </div>

              {/* Central Geometric Path Visualization */}
              <div className="relative py-4 flex flex-col items-center justify-center">
                {/* Large Visual Symbol Display */}
                <div className="w-36 h-36 relative flex items-center justify-center mb-6">
                  <div className="absolute inset-0 rounded-full border border-dashed border-neutral-300 animate-[spin_60s_linear_infinite]" />
                  <GetPathSymbol size={110} className="transition-transform duration-500 hover:scale-105 drop-shadow-xs" />
                </div>

                {/* Narrative Stage Selector */}
                <div className="w-full space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 text-center mb-3">
                    Stage {PATH_STAGES[activeStage].step} of 05
                  </div>
                  
                  {/* Progress Line */}
                  <div className="grid grid-cols-5 gap-1 mb-4">
                    {PATH_STAGES.map((stage, idx) => (
                      <button
                        key={stage.step}
                        onClick={() => setActiveStage(idx)}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          idx <= activeStage ? 'bg-black' : 'bg-neutral-200'
                        }`}
                        title={stage.name}
                        aria-label={`Select stage ${stage.step}: ${stage.name}`}
                      />
                    ))}
                  </div>

                  {/* Active Stage Description */}
                  <div className="bg-white border border-neutral-200 p-4 rounded-xs min-h-[96px] flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-1">
                      <h2 className="text-xs font-bold uppercase tracking-wider text-black">
                        {PATH_STAGES[activeStage].step}. {PATH_STAGES[activeStage].name}
                      </h2>
                      <span className="text-[10px] font-mono text-neutral-400">Progression</span>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {PATH_STAGES[activeStage].label}
                    </p>
                  </div>
                </div>

                {/* Quick Interactive Toggles */}
                <div className="flex items-center justify-between w-full mt-4 pt-4 border-t border-neutral-200 text-[11px]">
                  <button
                    onClick={() => setActiveStage((prev) => (prev > 0 ? prev - 1 : PATH_STAGES.length - 1))}
                    className="text-neutral-500 hover:text-black font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    Previous
                  </button>
                  <span className="text-[10px] text-neutral-400 font-mono">Click stages to explore</span>
                  <button
                    onClick={() => setActiveStage((prev) => (prev < PATH_STAGES.length - 1 ? prev + 1 : 0))}
                    className="text-neutral-900 hover:text-black font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    Next
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
