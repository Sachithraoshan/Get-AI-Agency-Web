import React from 'react';
import { ServiceItem } from '../types/index.ts';
import { X, Check, ArrowUpRight, AlertTriangle } from 'lucide-react';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectService: (serviceId: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onSelectService,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white border border-neutral-300 rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-black transition-colors rounded-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-black"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="border-b border-neutral-200 pb-5 mb-6">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-2">
            <span>Service {service.number}</span>
            <span>•</span>
            <span>Core Agency Capability</span>
          </div>
          <h3 id="service-modal-title" className="text-2xl font-bold tracking-tight text-black">
            {service.name}
          </h3>
        </div>

        {/* Core Problem Callout */}
        <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-xs mb-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-800 mb-1">
            <AlertTriangle className="w-4 h-4 text-neutral-600" />
            <span>Problem Addressed</span>
          </div>
          <p className="text-sm font-medium text-neutral-900 leading-snug">
            "{service.problem}"
          </p>
          <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
            {service.shortDescription}
          </p>
        </div>

        {/* Common Symptoms / Warning Signs */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-3">
            Signs Your Business Has This Problem:
          </h4>
          <ul className="space-y-2 text-xs text-neutral-700">
            {service.symptoms.map((symptom, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 flex-shrink-0" />
                <span>{symptom}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Deliverables / Practical Execution */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-3">
            What GET AI Reviews & Delivers:
          </h4>
          <ul className="space-y-2 text-xs text-neutral-800">
            {service.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-black mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Business Outcome */}
        <div className="border-t border-neutral-200 pt-5 mb-8">
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
            Expected Business Outcome
          </span>
          <p className="text-xs font-medium text-neutral-900 mt-1 leading-relaxed">
            {service.businessOutcome}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-black border border-neutral-200 hover:border-neutral-300 rounded-xs transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onSelectService(service.id);
              onClose();
            }}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-800 transition-colors shadow-xs"
          >
            <span>Enquire About This Service</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
