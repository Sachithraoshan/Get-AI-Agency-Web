import React, { useState, useEffect } from 'react';
import { ServiceId, EnquiryFormData } from '../types/index.ts';
import { Send, CheckCircle2 } from 'lucide-react';
import { submitEnquiryToGoogleSheets, validateEnquiry } from '../services/enquiryService.ts';

interface ContactSectionProps {
  initialServiceId?: string;
  initialProjectTitle?: string;
}

const SERVICE_OPTIONS: { id: ServiceId; label: string }[] = [
  { id: 'website-redesign', label: 'Website Redesign' },
  { id: 'mobile-responsive', label: 'Mobile Responsive Website' },
  { id: 'speed-optimization', label: 'Website Speed Optimization' },
  { id: 'business-dashboard', label: 'Business Dashboard' },
  { id: 'brand-consistency', label: 'Brand Consistency and Design Pack' },
  { id: 'not-sure', label: 'Not Sure Yet' },
];

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialServiceId,
  initialProjectTitle,
}) => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    service: 'not-sure',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  useEffect(() => {
    if (initialServiceId) {
      setFormData((prev) => ({
        ...prev,
        service: initialServiceId as ServiceId,
      }));
    }
    if (initialProjectTitle) {
      setFormData((prev) => ({
        ...prev,
        message: prev.message ? prev.message : `Hello GET AI, I am interested in discussing a project similar to the "${initialProjectTitle}" concept.`,
      }));
    }
  }, [initialServiceId, initialProjectTitle]);

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
        setIsSubmitted(true);
      } else {
        setGeneralError(result.error || 'We could not submit your enquiry right now. Please try again.');
      }
    } catch {
      setGeneralError('We could not submit your enquiry right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Direct Agency Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 border border-neutral-200 text-[11px] font-semibold tracking-widest uppercase text-neutral-700 mb-6 rounded-xs">
                Project Enquiry
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black mb-4">
                Start a Project.
              </h2>

              <p className="text-sm text-neutral-600 leading-relaxed font-normal mb-8">
                Share what is not working in your digital ecosystem. We review your request, assess the core problem, and provide a clear, no obligation evaluation of practical solutions.
              </p>

              {/* Direct Details Box */}
              <div className="space-y-4 text-xs text-neutral-700 mb-8">
                <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xs">
                  <div className="text-[10px] font-mono uppercase text-neutral-400 mb-1">
                    Telephone Hotline
                  </div>
                  <a 
                    href="tel:+94775768237"
                    className="text-base font-bold text-black font-mono hover:underline inline-block"
                  >
                    +94 775768237
                  </a>
                  <div className="text-neutral-500 text-[11px] mt-0.5">
                    Direct inquiries and priority consultations
                  </div>
                </div>

                <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xs">
                  <div className="text-[10px] font-mono uppercase text-neutral-400 mb-1">
                    Direct Contact
                  </div>
                  <div className="text-sm font-bold text-black">
                    Sachithra Oshan • Founder and CEO
                  </div>
                  <div className="text-neutral-500 mt-1 space-y-0.5">
                    <div>Email: hello@getai.com.lk</div>
                    <div>Alternate: sachithraoshan769@gmail.com</div>
                  </div>
                </div>

                <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xs">
                  <div className="text-[10px] font-mono uppercase text-neutral-400 mb-1">
                    Base Of Operations
                  </div>
                  <div className="text-sm font-semibold text-black">
                    Colombo, Sri Lanka
                  </div>
                  <div className="text-neutral-500 mt-0.5">
                    Serving Sri Lankan clients nationwide and expanding regionally
                  </div>
                </div>

                <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xs">
                  <div className="text-[10px] font-mono uppercase text-neutral-400 mb-1">
                    Direct Response Commitment
                  </div>
                  <div className="text-xs text-neutral-700 leading-relaxed">
                    All client enquiries receive personal assessment directly from GET AI leadership within one business day.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Enquiry Form or Success State */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-50 border border-neutral-200 rounded-sm p-6 sm:p-8 shadow-xs">
              
              {isSubmitted ? (
                /* Customer Success Message */
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight text-black mb-3">
                    Thank you.
                  </h3>

                  <p className="text-base text-neutral-800 font-medium mb-2">
                    Your enquiry has been received.
                  </p>

                  <p className="text-sm text-neutral-600 max-w-md leading-relaxed font-normal">
                    We will review your request and contact you soon.
                  </p>
                </div>
              ) : (
                /* The Enquiry Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="border-b border-neutral-200 pb-3 mb-4">
                    <h3 className="text-base font-bold uppercase tracking-wider text-black">
                      Project Intake Form
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      All fields marked with an asterisk (*) are required.
                    </p>
                  </div>

                  {generalError && (
                    <div className="p-3.5 bg-neutral-100 border border-neutral-300 rounded-xs text-xs text-neutral-800 font-medium">
                      {generalError}
                    </div>
                  )}

                  {/* Name and Business Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="form-name" className="block text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1.5">
                        Name *
                      </label>
                      <input
                        id="form-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className={`w-full bg-white border ${errors.name ? 'border-red-500' : 'border-neutral-300'} px-3.5 py-2.5 text-xs text-black rounded-xs focus:outline-hidden focus:border-black transition-colors`}
                      />
                      {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="form-business" className="block text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1.5">
                        Business Name
                      </label>
                      <input
                        id="form-business"
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="Your business name"
                        className="w-full bg-white border border-neutral-300 px-3.5 py-2.5 text-xs text-black rounded-xs focus:outline-hidden focus:border-black transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="form-email" className="block text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1.5">
                        Email *
                      </label>
                      <input
                        id="form-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@business.com"
                        className={`w-full bg-white border ${errors.email ? 'border-red-500' : 'border-neutral-300'} px-3.5 py-2.5 text-xs text-black rounded-xs focus:outline-hidden focus:border-black transition-colors`}
                      />
                      {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="form-phone" className="block text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1.5">
                        Phone
                      </label>
                      <input
                        id="form-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+94 7X XXX XXXX"
                        className="w-full bg-white border border-neutral-300 px-3.5 py-2.5 text-xs text-black rounded-xs focus:outline-hidden focus:border-black transition-colors"
                      />
                    </div>
                  </div>

                  {/* What do you need help with? */}
                  <div>
                    <label htmlFor="form-service" className="block text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1.5">
                      What do you need help with? *
                    </label>
                    <select
                      id="form-service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value as ServiceId })}
                      className="w-full bg-white border border-neutral-300 px-3.5 py-2.5 text-xs text-black rounded-xs focus:outline-hidden focus:border-black transition-colors"
                    >
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="form-message" className="block text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      id="form-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe your business requirement..."
                      className={`w-full bg-white border ${errors.message ? 'border-red-500' : 'border-neutral-300'} p-3.5 text-xs text-black rounded-xs focus:outline-hidden focus:border-black transition-colors resize-y`}
                    />
                    {errors.message && <p className="text-[11px] text-red-600 mt-1">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-black text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-xs hover:bg-neutral-800 transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Sending</span>
                      ) : (
                        <>
                          <span>SEND ENQUIRY</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-neutral-500 text-center mt-2 font-mono">
                      No automated spam. Handled directly under GET AI leadership review.
                    </p>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
