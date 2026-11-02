import React, { useState } from 'react';
import { ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

const FLOW_STEPS = [
  {
    label: 'BUSINESS',
    subtitle: 'Context and Reality',
    detail: 'We examine your business model, customer journey, and operational constraints first.',
  },
  {
    label: 'PROBLEM',
    subtitle: 'Root Cause',
    detail: 'We identify what is actually failing: conversion friction, slow load speed, or unclear brand positioning.',
  },
  {
    label: 'IMPACT',
    subtitle: 'Cost of Inaction',
    detail: 'We evaluate the commercial damage: lost customer enquiries, wasted staff hours, or weakened credibility.',
  },
  {
    label: 'SOLUTION',
    subtitle: 'Lean Architecture',
    detail: 'We define the leanest effective solution required to fix the problem with zero unnecessary complexity.',
  },
  {
    label: 'EXECUTION',
    subtitle: 'Specialist Craft',
    detail: 'We assign and coordinate specialized execution talent suited specifically to that scope.',
  },
  {
    label: 'OUTCOME',
    subtitle: 'Business Result',
    detail: 'A reliable, fast digital asset that directly improves customer clarity and operational performance.',
  },
];

export const PhilosophySection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="philosophy" className="py-20 md:py-28 bg-neutral-900 text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Technology is not the starting point.
          </h2>
          <p className="text-2xl sm:text-3xl font-light text-neutral-400">
            Your business problem is.
          </p>
          <p className="mt-6 text-base text-neutral-400 leading-relaxed font-normal">
            Too many businesses are sold expensive, bloated technology by agencies chasing the newest trend. At GET AI, we reject technology for the sake of technology. We start with the commercial problem and work forward to the leanest practical solution.
          </p>
        </div>

        {/* Visual Problem First Flow Sequence: BUSINESS -> PROBLEM -> IMPACT -> SOLUTION -> EXECUTION -> OUTCOME */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-sm p-6 sm:p-8 mb-16">
          <div className="border-b border-neutral-800 pb-4 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              The GET AI Problem to Outcome Sequence
            </span>
          </div>

          {/* Desktop Flow Grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-8">
            {FLOW_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.label}
                  onClick={() => setActiveStep(idx)}
                  className={`text-left p-4 rounded-xs border transition-all relative flex flex-col justify-between min-h-[140px] cursor-pointer ${
                    isActive
                      ? 'bg-white text-black border-white shadow-lg'
                      : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div>
                    <div className={`text-[10px] font-mono mb-2 ${isActive ? 'text-neutral-500' : 'text-neutral-500'}`}>
                      0{idx + 1}
                    </div>
                    <div className={`text-xs font-bold tracking-wider uppercase mb-1 ${isActive ? 'text-black' : 'text-white'}`}>
                      {step.label}
                    </div>
                    <div className={`text-[11px] leading-tight ${isActive ? 'text-neutral-700' : 'text-neutral-400'}`}>
                      {step.subtitle}
                    </div>
                  </div>

                  {idx < FLOW_STEPS.length - 1 && (
                    <ArrowRight className={`w-3.5 h-3.5 self-end hidden md:block mt-2 ${isActive ? 'text-black' : 'text-neutral-600'}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Detailed step explanation callout */}
          <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-xs">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                Stage 0{activeStep + 1} Focus
              </span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mt-0.5">
                {FLOW_STEPS[activeStep].label}: {FLOW_STEPS[activeStep].subtitle}
              </h3>
              <p className="text-xs text-neutral-300 mt-1 max-w-3xl leading-relaxed">
                {FLOW_STEPS[activeStep].detail}
              </p>
            </div>
          </div>
        </div>

        {/* Contrast Comparison Grid without dash characters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Trend Chasing Column */}
          <div className="border border-neutral-800 bg-neutral-950 p-6 sm:p-8 rounded-sm">
            <div className="flex items-center gap-2.5 text-neutral-400 text-xs font-bold uppercase tracking-wider mb-4">
              <AlertCircle className="w-4 h-4 text-neutral-400" />
              <span>The Industry Norm (Technology First)</span>
            </div>
            <ul className="space-y-3.5 text-xs text-neutral-400">
              <li className="flex items-start gap-2.5">
                <span className="text-neutral-500 font-mono mt-0.5">1.</span>
                <span>Pushes complex expensive AI models and toolchains before understanding customer needs.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-neutral-500 font-mono mt-0.5">2.</span>
                <span>Produces fragile websites with bloated plugins, slow loading speeds, and high maintenance costs.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-neutral-500 font-mono mt-0.5">3.</span>
                <span>Leaves business owners confused by technical jargon without measurable commercial improvement.</span>
              </li>
            </ul>
          </div>

          {/* The GET AI Standard */}
          <div className="border border-neutral-700 bg-neutral-900 p-6 sm:p-8 rounded-sm relative">
            <div className="flex items-center gap-2.5 text-white text-xs font-bold uppercase tracking-wider mb-4">
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>The GET AI Standard (Problem First)</span>
            </div>
            <ul className="space-y-3.5 text-xs text-neutral-300">
              <li className="flex items-start gap-2.5">
                <span className="text-white font-mono mt-0.5">1.</span>
                <span>Starts with what hurts the business: low conversion, broken mobile views, or unreadable reports.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-white font-mono mt-0.5">2.</span>
                <span>Recommends the simplest, fastest, and most affordable technical execution path.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-white font-mono mt-0.5">3.</span>
                <span>Rigorous internal quality control before handover ensures longevity, speed, and real results.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
