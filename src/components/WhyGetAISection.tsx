import React from 'react';
import { WHY_GET_AI_PILLARS } from '../data/agencyData.ts';
import { Check } from 'lucide-react';

export const WhyGetAISection: React.FC = () => {
  return (
    <section id="why-us" className="py-20 md:py-28 bg-neutral-900 text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Practical strengths over empty promises.
          </h2>
          <p className="text-base text-neutral-400 leading-relaxed font-normal">
            We do not claim to be the largest agency or publish unverified growth claims. Instead, we compete on clarity, rigorous project management, and an uncompromising problem first work ethic.
          </p>
        </div>

        {/* 6 Core Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_GET_AI_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="bg-neutral-950 border border-neutral-800 p-6 sm:p-7 rounded-sm flex flex-col justify-between hover:border-neutral-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
                  <span className="font-mono text-[11px] text-neutral-500">
                    PILLAR 0{idx + 1}
                  </span>
                  <div className="w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>

                <h3 className="text-base font-bold uppercase tracking-wider text-white mb-2">
                  {pillar.title}
                </h3>

                <p className="text-xs font-semibold text-neutral-300 mb-3 leading-snug">
                  {pillar.summary}
                </p>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {pillar.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
