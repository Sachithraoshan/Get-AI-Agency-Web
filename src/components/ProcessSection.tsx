import React, { useState } from 'react';
import { PROCESS_STEPS } from '../data/agencyData.ts';
import { ArrowRight, ShieldCheck, Users2, FileCheck, Layers } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(0);

  return (
    <section id="process" className="py-20 md:py-28 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black mb-4">
            From problem to practical solution.
          </h2>
          <p className="text-base text-neutral-600 leading-relaxed font-normal">
            GET AI operates as a managed third party service agency. You work with a single accountable partner who defines the problem, matches the ideal specialist, controls the quality, and guarantees the delivery.
          </p>
        </div>

        {/* Operating Architecture Diagram */}
        <div className="bg-white border border-neutral-200 rounded-sm p-6 sm:p-8 mb-16 shadow-2xs">
          <div className="border-b border-neutral-100 pb-4 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-black">
              The GET AI Operating Model
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-center">
            
            {/* Step 1: Client */}
            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xs flex flex-col items-center">
              <Users2 className="w-5 h-5 text-neutral-800 mb-2" />
              <span className="text-xs font-bold uppercase tracking-wider text-black">Client</span>
              <span className="text-[11px] text-neutral-500 mt-1">Brings the business challenge</span>
            </div>

            <div className="hidden md:flex justify-center text-neutral-400">
              <ArrowRight className="w-4 h-4" />
            </div>

            {/* Step 2: GET AI Core */}
            <div className="p-4 bg-black text-white border border-black rounded-xs flex flex-col items-center shadow-xs">
              <Layers className="w-5 h-5 text-white mb-2" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">GET AI Agency</span>
              <span className="text-[11px] text-neutral-300 mt-1">Scoping • Project Lead • QC</span>
            </div>

            <div className="hidden md:flex justify-center text-neutral-400">
              <ArrowRight className="w-4 h-4" />
            </div>

            {/* Step 3: External Specialist */}
            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xs flex flex-col items-center">
              <FileCheck className="w-5 h-5 text-neutral-800 mb-2" />
              <span className="text-xs font-bold uppercase tracking-wider text-black">External Specialist</span>
              <span className="text-[11px] text-neutral-500 mt-1">Domain specific execution</span>
            </div>

          </div>

          <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-center gap-2 text-xs text-neutral-600">
            <ShieldCheck className="w-4 h-4 text-black flex-shrink-0" />
            <span>GET AI manages every stage and conducts thorough quality control before client delivery.</span>
          </div>
        </div>

        {/* 6 Sequential Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROCESS_STEPS.map((step, idx) => {
            const isSelected = selectedStep === idx;
            return (
              <div
                key={step.number}
                onClick={() => setSelectedStep(idx)}
                className={`cursor-pointer p-6 sm:p-7 rounded-sm border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-black shadow-md'
                    : 'bg-white border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4">
                    <span className="font-mono text-xs font-bold text-neutral-400">
                      STEP {step.number}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                      Phase {idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold uppercase tracking-tight text-black mb-1">
                    {step.title}
                  </h3>
                  
                  <p className="text-xs font-semibold text-neutral-700 mb-3">
                    {step.summary}
                  </p>

                  <p className="text-xs text-neutral-600 leading-relaxed mb-6 font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 space-y-1 text-[11px]">
                  <div className="text-neutral-500">
                    <span className="font-bold text-neutral-700">Governance:</span> {step.role}
                  </div>
                  <div className="text-neutral-500">
                    <span className="font-bold text-neutral-700">Deliverable:</span> {step.deliverable}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
