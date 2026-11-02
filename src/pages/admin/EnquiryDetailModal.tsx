import React, { useState } from 'react';
import { LeadEnquiry, EnquiryStatus } from '../../types/index.ts';
import { X, Save, CheckCircle2, Clock, Mail, Phone, Building, Layers, FileText } from 'lucide-react';
import { updateEnquiryStatusInGoogleSheets, updateEnquiryNotesInGoogleSheets } from '../../services/enquiryService.ts';

interface EnquiryDetailModalProps {
  enquiry: LeadEnquiry;
  onClose: () => void;
  onUpdate: (updated: LeadEnquiry) => void;
}

const STATUS_LIST: EnquiryStatus[] = ['New', 'Contacted', 'Discovery', 'Proposal', 'Won', 'Lost'];

export const EnquiryDetailModal: React.FC<EnquiryDetailModalProps> = ({
  enquiry,
  onClose,
  onUpdate,
}) => {
  const [currentStatus, setCurrentStatus] = useState<EnquiryStatus>(enquiry.status);
  const [notes, setNotes] = useState(enquiry.notes || '');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);
  const [notesFeedback, setNotesFeedback] = useState<string | null>(null);

  const handleStatusChange = async (newStatus: EnquiryStatus) => {
    if (newStatus === currentStatus || isUpdatingStatus) return;

    setIsUpdatingStatus(true);
    setStatusFeedback(null);

    const result = await updateEnquiryStatusInGoogleSheets(enquiry.id, newStatus);
    setIsUpdatingStatus(false);

    if (result.success) {
      setCurrentStatus(newStatus);
      setStatusFeedback('Status updated in Google Sheets.');
      onUpdate({ ...enquiry, status: newStatus, notes });
      setTimeout(() => setStatusFeedback(null), 3000);
    } else {
      setStatusFeedback(result.error || 'Failed to update status.');
    }
  };

  const handleSaveNotes = async () => {
    if (isSavingNotes) return;

    setIsSavingNotes(true);
    setNotesFeedback(null);

    const result = await updateEnquiryNotesInGoogleSheets(enquiry.id, notes);
    setIsSavingNotes(false);

    if (result.success) {
      setNotesFeedback('Notes saved to Google Sheets.');
      onUpdate({ ...enquiry, status: currentStatus, notes });
      setTimeout(() => setNotesFeedback(null), 3000);
    } else {
      setNotesFeedback(result.error || 'Failed to save notes.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white border border-neutral-300 w-full max-w-2xl rounded-sm shadow-xl max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-black text-white font-mono text-xs font-bold rounded-xs">
              {enquiry.id}
            </span>
            <div className="text-xs text-neutral-500 font-mono">
              {enquiry.timestamp}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-black rounded-xs transition-colors cursor-pointer"
            aria-label="Close enquiry detail"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Status Bar */}
          <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">
                Lead Status (Google Sheet Row Sync)
              </span>
              <div className="flex flex-wrap gap-1.5">
                {STATUS_LIST.map((st) => (
                  <button
                    key={st}
                    disabled={isUpdatingStatus}
                    onClick={() => handleStatusChange(st)}
                    className={`px-3 py-1 text-xs font-semibold rounded-xs border transition-colors cursor-pointer disabled:opacity-50 ${
                      currentStatus === st
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
            {statusFeedback && (
              <span className="text-[11px] text-neutral-600 font-medium">
                {statusFeedback}
              </span>
            )}
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xs">
              <span className="text-[10px] uppercase font-mono text-neutral-400 block mb-0.5">
                Client Name
              </span>
              <div className="font-bold text-black text-sm">
                {enquiry.name}
              </div>
            </div>

            <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xs">
              <span className="text-[10px] uppercase font-mono text-neutral-400 block mb-0.5">
                Business Name
              </span>
              <div className="font-semibold text-black">
                {enquiry.businessName || 'None specified'}
              </div>
            </div>

            <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xs">
              <span className="text-[10px] uppercase font-mono text-neutral-400 block mb-0.5">
                Work Email
              </span>
              <a href={`mailto:${enquiry.email}`} className="font-mono text-black hover:underline">
                {enquiry.email}
              </a>
            </div>

            <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xs">
              <span className="text-[10px] uppercase font-mono text-neutral-400 block mb-0.5">
                Phone / WhatsApp
              </span>
              {enquiry.phone ? (
                <a href={`tel:${enquiry.phone}`} className="font-mono text-black hover:underline">
                  {enquiry.phone}
                </a>
              ) : (
                <span className="text-neutral-500 font-mono">Not provided</span>
              )}
            </div>

            <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xs sm:col-span-2">
              <span className="text-[10px] uppercase font-mono text-neutral-400 block mb-0.5">
                Requested Service
              </span>
              <div className="font-semibold text-black">
                {enquiry.service}
              </div>
            </div>
          </div>

          {/* Full Message */}
          <div>
            <span className="text-[10px] uppercase font-mono text-neutral-500 block mb-1.5 font-bold">
              Customer Message
            </span>
            <div className="p-4 bg-white border border-neutral-300 rounded-xs text-xs text-neutral-800 leading-relaxed font-sans whitespace-pre-wrap">
              {enquiry.message}
            </div>
          </div>

          {/* Internal Private Notes */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-mono text-neutral-500 font-bold">
                Internal Notes (Private • Stored in Google Sheet Column K)
              </span>
              {notesFeedback && (
                <span className="text-[11px] text-neutral-600 font-medium">
                  {notesFeedback}
                </span>
              )}
            </div>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Called client. Waiting for requirements. Proposal sent. Follow up next week."
              className="w-full p-3 bg-white border border-neutral-300 rounded-xs text-xs text-black focus:outline-hidden focus:border-black transition-colors"
            />
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={handleSaveNotes}
                disabled={isSavingNotes}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-neutral-800 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSavingNotes ? 'Saving...' : 'Save Notes'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between text-xs text-neutral-500 font-mono">
          <span>Source: {enquiry.source || 'Website'}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-neutral-300 text-black font-sans font-semibold rounded-xs hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
