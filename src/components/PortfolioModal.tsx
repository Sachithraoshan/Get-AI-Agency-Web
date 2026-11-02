import React from 'react';
import { PortfolioItem } from '../types/index.ts';
import { X, Check, ArrowUpRight, AlertCircle, Laptop, Layers } from 'lucide-react';

interface PortfolioModalProps {
  project: PortfolioItem | null;
  onClose: () => void;
  onStartProjectWithConcept: (projectTitle: string) => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  project,
  onClose,
  onStartProjectWithConcept,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white border border-neutral-300 rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="portfolio-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-black transition-colors rounded-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-black"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Concept Badge & Header */}
        <div className="border-b border-neutral-200 pb-5 mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 bg-neutral-100 text-neutral-800 text-[10px] font-mono font-bold uppercase tracking-wider border border-neutral-300">
              {project.tag}
            </span>
            <span className="text-[11px] font-mono text-neutral-500">
              Category: {project.category}
            </span>
          </div>

          <h3 id="portfolio-modal-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-black">
            {project.title}
          </h3>
          <p className="text-sm font-medium text-neutral-600 mt-1">
            {project.subtitle}
          </p>
        </div>

        {/* Honest Prototype Notice */}
        <div className="flex items-start gap-2.5 bg-neutral-50 border border-neutral-200 p-3.5 rounded-xs text-xs text-neutral-700 mb-6">
          <AlertCircle className="w-4 h-4 text-neutral-500 mt-0.5 flex-shrink-0" />
          <span>
            <strong>Transparency Notice:</strong> This project is a curated demo prototype engineered to illustrate GET AI's problem-solving, UX hierarchy, and technical structure. It is not an active commercial deployment.
          </span>
        </div>

        {/* Clean Mockup Representation Box */}
        <div className="bg-neutral-900 text-white rounded-xs p-5 mb-6 border border-neutral-800">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4 text-[11px] font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <Laptop className="w-3.5 h-3.5" />
              <span>INTERFACE PROTOTYPE MOCKUP</span>
            </div>
            <span>PREVIEW LAYOUT</span>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-xs">
            <div className="h-32 sm:h-40 flex flex-col justify-center items-center text-center border border-dashed border-neutral-800 rounded-xs px-4">
              <Layers className="w-8 h-8 text-neutral-600 mb-2" />
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-200">
                {project.title} • {project.subtitle}
              </div>
              <p className="text-[11px] text-neutral-400 mt-1 max-w-md">
                {project.visualTheme}
              </p>
            </div>
          </div>
        </div>

        {/* Problem and Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-xs">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500 block mb-1.5">
              The Problem Addressed
            </span>
            <p className="text-xs text-neutral-800 leading-relaxed font-medium">
              {project.problemSolved}
            </p>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-xs">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500 block mb-1.5">
              Practical Solution Delivered
            </span>
            <p className="text-xs text-neutral-800 leading-relaxed font-medium">
              {project.practicalSolution}
            </p>
          </div>
        </div>

        {/* Architectural Highlights */}
        <div className="mb-8">
          <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-3">
            Key Execution Highlights:
          </h4>
          <ul className="space-y-2 text-xs text-neutral-700">
            {project.highlights.map((highlight: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-black mt-0.5 flex-shrink-0" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-5 border-t border-neutral-200">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-black border border-neutral-200 hover:border-neutral-300 rounded-xs transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onStartProjectWithConcept(project.title);
              onClose();
            }}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-800 transition-colors shadow-xs"
          >
            <span>Discuss Similar Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
