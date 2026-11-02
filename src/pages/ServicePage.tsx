import React, { useEffect } from 'react';
import { ServiceItem } from '../types/index.ts';
import { useRouter } from '../utils/router.tsx';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  ShieldCheck, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';

interface ServicePageProps {
  service: ServiceItem;
  allServices: ServiceItem[];
}

export const ServicePage: React.FC<ServicePageProps> = ({ service, allServices }) => {
  const { navigate } = useRouter();

  // Find next and previous services
  const currentIndex = allServices.findIndex((s) => s.slug === service.slug);
  const prevService = currentIndex > 0 ? allServices[currentIndex - 1] : allServices[allServices.length - 1];
  const nextService = currentIndex < allServices.length - 1 ? allServices[currentIndex + 1] : allServices[0];

  // Dynamic JSON-LD schema for Service and BreadcrumbList
  useEffect(() => {
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          '@id': `https://getai.com.lk/services/${service.slug}#service`,
          'name': service.name,
          'serviceType': service.primaryTopic,
          'description': service.metaDescription,
          'provider': {
            '@type': 'LocalBusiness',
            'name': 'GET AI Agency',
            'url': 'https://getai.com.lk/',
            'telephone': '+94775768237',
            'email': 'hello@getai.com.lk',
            'address': {
              '@type': 'PostalAddress',
              'addressLocality': 'Colombo',
              'addressCountry': 'LK'
            }
          },
          'areaServed': [
            { '@type': 'Country', 'name': 'Sri Lanka' },
            { '@type': 'City', 'name': 'Colombo' },
            { '@type': 'City', 'name': 'Kandy' },
            { '@type': 'City', 'name': 'Galle' },
            { '@type': 'City', 'name': 'Kurunegala' },
            { '@type': 'City', 'name': 'Jaffna' }
          ],
          'url': `https://getai.com.lk/services/${service.slug}`
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://getai.com.lk/'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Services',
              'item': 'https://getai.com.lk/#services'
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': service.name,
              'item': `https://getai.com.lk/services/${service.slug}`
            }
          ]
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'service-jsonld';
    script.text = JSON.stringify(serviceSchema);
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById('service-jsonld');
      if (existing) {
        document.head.removeChild(existing);
      }
    };
  }, [service]);

  return (
    <div className="pt-28 pb-24 md:pt-36 md:pb-32 bg-white text-black min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs (Zero Dash) */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-8 uppercase tracking-wider">
          <button 
            onClick={() => navigate('/')} 
            className="hover:text-black cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button 
            onClick={() => navigate('/#services')} 
            className="hover:text-black cursor-pointer"
          >
            Services
          </button>
          <span>/</span>
          <span className="text-black font-semibold truncate">
            {service.name}
          </span>
        </nav>

        {/* Header Block */}
        <div className="border-b border-neutral-200 pb-10 mb-12">
          
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-neutral-100 border border-neutral-200 text-[11px] font-mono uppercase tracking-widest text-neutral-700 rounded-xs">
              Service {service.number}
            </span>
            <span className="px-3 py-1 bg-neutral-900 text-white text-[11px] font-mono uppercase tracking-widest rounded-xs">
              Sri Lanka and Regional
            </span>
          </div>

          {/* H1 Title */}
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-black mb-4">
            {service.h1Title}
          </h1>

          {/* Short Subtitle */}
          <p className="text-lg text-neutral-700 leading-relaxed max-w-3xl">
            {service.shortDescription}
          </p>

          {/* Action Links Bar */}
          <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-neutral-100">
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <span>Consult on {service.name}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href="tel:+94775768237"
              className="inline-flex items-center gap-2 px-5 py-3 bg-neutral-100 hover:bg-neutral-200 text-black text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Hotline: +94 775768237</span>
            </a>

            {service.relatedProjectSlug && (
              <button
                onClick={() => navigate(`/projects/${service.relatedProjectSlug}`)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-black transition-colors cursor-pointer ml-auto"
              >
                <span>View {service.relatedProjectName} Case Study</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="space-y-16">
          
          {/* Section 1: Who Needs This and The Core Problem */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-neutral-50 border border-neutral-200 p-6 sm:p-8 rounded-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">
                <HelpCircle className="w-4 h-4 text-black" />
                <span>Who Needs This Service</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-black mb-3">
                Identified Business Need
              </h2>
              <p className="text-xs text-neutral-700 leading-relaxed font-normal">
                {service.whoNeedsThis}
              </p>
            </div>

            <div className="bg-neutral-900 text-white p-6 sm:p-8 rounded-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">
                <AlertCircle className="w-4 h-4 text-white" />
                <span>Problem Diagnosis</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white mb-3">
                The Core Challenge
              </h2>
              <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                {service.problem}
              </p>
            </div>
          </section>

          {/* Section 2: Common Symptoms vs What GET AI Changes */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Common Symptoms */}
            <div className="border border-neutral-200 p-6 sm:p-8 rounded-sm bg-white">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-2">
                Common Business Symptoms
              </span>
              <h3 className="text-xl font-bold tracking-tight text-black mb-4">
                What You Might Be Experiencing
              </h3>
              <ul className="space-y-3">
                {service.commonProblems.map((prob, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-700">
                    <span className="font-mono text-neutral-400 mt-0.5">0{idx + 1}</span>
                    <span className="leading-relaxed font-normal">{prob}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What We Change */}
            <div className="border border-neutral-200 p-6 sm:p-8 rounded-sm bg-neutral-50">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-2">
                Applied Execution
              </span>
              <h3 className="text-xl font-bold tracking-tight text-black mb-4">
                What GET AI Re-Engineers
              </h3>
              <ul className="space-y-3">
                {service.whatWeChange.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-800">
                    <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 3: Technical and Strategic Considerations Grid */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 block mb-1">
                  Rigorous Standards
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-black">
                  Key Technical and Strategic Considerations
                </h2>
              </div>
              <span className="text-[11px] font-mono text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-xs">
                Quality Protocol
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {service.considerations.map((c, idx) => (
                <div key={idx} className="border border-neutral-200 bg-white p-6 rounded-sm">
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-2">
                    <span>Standard 0{idx + 1}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-black" />
                  </div>
                  <h3 className="text-base font-bold text-black mb-2">
                    {c.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                    {c.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Tangible Deliverables Scope */}
          <section className="bg-neutral-50 border border-neutral-200 p-6 sm:p-8 rounded-sm">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 block mb-2">
              Deliverables Scope
            </span>
            <h2 className="text-xl font-bold tracking-tight text-black mb-4">
              What You Receive Upon Completion
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {service.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 bg-white border border-neutral-200 p-3 rounded-xs text-xs text-neutral-800">
                  <Layers className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white border border-neutral-200 rounded-xs">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                Target Business Outcome
              </span>
              <p className="text-xs text-black font-semibold leading-relaxed">
                {service.businessOutcome}
              </p>
            </div>
          </section>

          {/* Section 5: Geographic Availability and Consultation Hotline */}
          <section className="border border-neutral-200 p-6 sm:p-8 rounded-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                  Service Availability in Sri Lanka
                </span>
                <h3 className="text-lg font-bold text-black uppercase tracking-wider mb-2">
                  Serving Colombo, Kandy, Galle, Kurunegala, Jaffna and Nationwide
                </h3>
                <p className="text-xs text-neutral-600 max-w-xl leading-relaxed">
                  GET AI works with business founders, directors, and operational teams across Sri Lanka through structured online briefings and dedicated technical coordination.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                <a
                  href="tel:+94775768237"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-neutral-100 hover:bg-neutral-200 text-black text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors whitespace-nowrap"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Hotline: +94 775768237</span>
                </a>
                <button
                  onClick={() => navigate('/contact')}
                  className="px-6 py-3.5 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-800 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Request Consultation
                </button>
              </div>
            </div>
          </section>

        </div>

        {/* Service Navigation Footer */}
        <div className="mt-16 pt-8 border-t border-neutral-200 flex items-center justify-between">
          <button
            onClick={() => navigate(`/services/${prevService.slug}`)}
            className="text-left group cursor-pointer"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
              Previous Service
            </span>
            <span className="text-xs sm:text-sm font-bold text-black group-hover:underline">
              ← {prevService.name}
            </span>
          </button>

          <button
            onClick={() => navigate('/#services')}
            className="text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-black cursor-pointer px-4 py-2 border border-neutral-200 rounded-xs"
          >
            All Services
          </button>

          <button
            onClick={() => navigate(`/services/${nextService.slug}`)}
            className="text-right group cursor-pointer"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
              Next Service
            </span>
            <span className="text-xs sm:text-sm font-bold text-black group-hover:underline">
              {nextService.name} →
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
