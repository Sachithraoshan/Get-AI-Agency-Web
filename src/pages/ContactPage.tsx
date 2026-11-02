import React, { useState } from 'react';
import { ServiceId, EnquiryFormData } from '../types/index.ts';
import { Mail, MapPin, Globe, CheckCircle2, ArrowRight, Phone, ExternalLink } from 'lucide-react';
import { useRouter } from '../utils/router.tsx';
import { submitEnquiryToGoogleSheets, validateEnquiry } from '../services/enquiryService.ts';

interface ContactPageProps {
  preselectedService?: ServiceId;
}

export const ContactPage: React.FC<ContactPageProps> = ({ preselectedService = 'not-sure' }) => {
  const { navigate } = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const [formData, setFormData] = useState<EnquiryFormData>({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    service: preselectedService,
    message: '',
  });

  const servicesList: { id: ServiceId; label: string }[] = [
    { id: 'website-redesign', label: 'Website Redesign' },
    { id: 'mobile-responsive', label: 'Mobile Responsive Website' },
    { id: 'speed-optimization', label: 'Website Speed Optimization' },
    { id: 'business-dashboard', label: 'Business Dashboard' },
    { id: 'brand-consistency', label: 'Brand Consistency and Design Pack' },
    { id: 'not-sure', label: 'Not Sure Yet' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setGeneralError(null);
    const validation = validateEnquiry(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});

    setIsSubmitting(true);

    try {
      const result = await submitEnquiryToGoogleSheets(formData);

      if (result.success) {
        setSubmitted(true);
      } else {
        setGeneralError(result.error || 'We could not submit your enquiry right now. Please try again.');
      }
    } catch {
      setGeneralError('We could not submit your enquiry right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="pt-28 pb-24 md:pt-36 md:pb-32 bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 border border-neutral-200 text-[11px] font-semibold tracking-widest uppercase text-neutral-700 mb-4 rounded-xs">
            Start a Conversation
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black mb-4">
            Start a Project
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            Tell us about your business and what you need help with.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Form Column */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="bg-neutral-50 border border-neutral-200 rounded-sm p-8 sm:p-12 text-center flex flex-col items-center">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-black mb-3">
                  Thank you.
                </h2>
                <p className="text-base text-neutral-800 font-medium mb-2">
                  Your enquiry has been received.
                </p>
                <p className="text-sm text-neutral-600 max-w-md leading-relaxed font-normal mb-8">
                  We will review your request and contact you soon.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      businessName: '',
                      email: '',
                      phone: '',
                      service: 'not-sure',
                      message: '',
                    });
                  }}
                  className="px-6 py-3 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                
                {generalError && (
                  <div className="p-4 bg-neutral-100 border border-neutral-300 rounded-xs text-xs text-neutral-800 font-medium">
                    {generalError}
                  </div>
                )}

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={`w-full px-4 py-3 bg-white border ${errors.name ? 'border-red-500' : 'border-neutral-300'} rounded-xs text-sm text-black placeholder:text-neutral-400 focus:outline-hidden focus:border-black transition-colors`}
                  />
                  {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                </div>

                {/* Business Name */}
                <div>
                  <label htmlFor="businessName" className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Your company or organization"
                    className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xs text-sm text-black placeholder:text-neutral-400 focus:outline-hidden focus:border-black transition-colors"
                  />
                </div>

                {/* Email and Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className={`w-full px-4 py-3 bg-white border ${errors.email ? 'border-red-500' : 'border-neutral-300'} rounded-xs text-sm text-black placeholder:text-neutral-400 focus:outline-hidden focus:border-black transition-colors`}
                    />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+94 7X XXX XXXX"
                      className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xs text-sm text-black placeholder:text-neutral-400 focus:outline-hidden focus:border-black transition-colors"
                    />
                  </div>
                </div>

                {/* What do you need help with? */}
                <div>
                  <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                    What do you need help with? *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xs text-sm text-black focus:outline-hidden focus:border-black transition-colors"
                  >
                    {servicesList.map((svc) => (
                      <option key={svc.id} value={svc.id}>
                        {svc.label}
                      </option>
                    ))}
                  </select>
                  {errors.service && <p className="text-xs text-red-600 mt-1">{errors.service}</p>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Briefly describe your business challenge or current digital friction"
                    className={`w-full px-4 py-3 bg-white border ${errors.message ? 'border-red-500' : 'border-neutral-300'} rounded-xs text-sm text-black placeholder:text-neutral-400 focus:outline-hidden focus:border-black transition-colors`}
                  />
                  {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-800 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Sending</span>
                  ) : (
                    <>
                      <span>SEND ENQUIRY</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Direct Contact Information Column */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="bg-neutral-50 border border-neutral-200 p-6 sm:p-8 rounded-sm">
              <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">
                Direct Contact
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-0.5">
                      Hotline
                    </span>
                    <a
                      href="tel:+94775768237"
                      className="text-base font-bold text-black font-mono hover:underline"
                    >
                      +94 775768237
                    </a>
                    <span className="block text-[11px] text-neutral-500 mt-0.5">
                      Direct line for business and project enquiries
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-0.5">
                      Email
                    </span>
                    <a
                      href="mailto:hello@getai.com.lk"
                      className="text-sm font-bold text-black hover:underline"
                    >
                      hello@getai.com.lk
                    </a>
                    <span className="block text-[11px] text-neutral-500 mt-0.5">
                      Founder and CEO: Sachithra Oshan
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-0.5">
                      Base Location
                    </span>
                    <span className="text-sm font-bold text-black">
                      Colombo, Sri Lanka
                    </span>
                    <span className="block text-[11px] text-neutral-500 mt-0.5">
                      Serving Colombo, Kandy, Galle, Kurunegala, Jaffna, and Islandwide
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Globe className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-0.5">
                      Online Presence
                    </span>
                    <a
                      href="https://www.linkedin.com/company/117434241/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-black hover:underline"
                    >
                      <span>GET AI Agency on LinkedIn</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Practical Response Commitment */}
            <div className="border border-neutral-200 p-6 rounded-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-black mb-2">
                What happens next?
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                We review your inquiry to understand the core problem before recommending any solution. If a project is not a fit or does not require technology, we will tell you directly.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
