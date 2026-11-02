import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/agencyData.ts';
import { ServiceItem } from '../types/index.ts';
import { ServiceModal } from './ServiceModal.tsx';
import { ArrowUpRight } from 'lucide-react';
import { useRouter } from '../utils/router.tsx';

interface ServicesSectionProps {
  onSelectServiceForEnquiry: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForEnquiry,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const { navigate } = useRouter();

  return (
    <section id="services" className="py-20 md:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black mb-4">
            Problems we help solve.
          </h2>
          <p className="text-base text-neutral-600 leading-relaxed font-normal">
            We focus exclusively on five high impact digital problem domains. No unnecessary technology bloat, no trend chasing. Only practical, proven solutions built around commercial needs.
          </p>
        </div>

        {/* 5 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES_DATA.map((service, index) => {
            // Give the 4th and 5th card a clean bento-inspired width on large screens
            const isWide = index === 3 || index === 4;
            return (
              <div
                key={service.id}
                className={`group bg-white border border-neutral-200 hover:border-black rounded-sm p-6 sm:p-8 transition-all flex flex-col justify-between relative hover:shadow-md ${
                  isWide ? 'lg:col-span-1.5' : ''
                }`}
              >
                <div>
                  {/* Service Number & Category Header */}
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
                    <span className="font-mono text-xs font-bold text-neutral-400 group-hover:text-black transition-colors">
                      SERVICE {service.number}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                      Managed Solution
                    </span>
                  </div>

                  {/* Service Name */}
                  <h3 className="text-xl font-bold tracking-tight text-black mb-3">
                    {service.name}
                  </h3>

                  {/* Problem Statement Box */}
                  <div className="bg-neutral-50 border border-neutral-100 p-3 rounded-xs mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                      Problem Addressed
                    </span>
                    <p className="text-xs font-medium text-neutral-800 leading-snug">
                      "{service.problem}"
                    </p>
                  </div>

                  {/* Short Explanation */}
                  <p className="text-xs text-neutral-600 leading-relaxed mb-6 font-normal">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Card Footer Interaction */}
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <button
                    onClick={() => navigate(`/services/${service.slug}`)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-black group-hover:underline focus:outline-hidden focus-visible:ring-1 focus-visible:ring-black cursor-pointer"
                  >
                    <span>Explore Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => onSelectServiceForEnquiry(service.id)}
                    className="text-[11px] font-mono text-neutral-500 hover:text-black transition-colors cursor-pointer"
                  >
                    Enquire →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Service Deep Dive */}
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onSelectService={(serviceId) => {
            onSelectServiceForEnquiry(serviceId);
            setSelectedService(null);
          }}
        />

      </div>
    </section>
  );
};
