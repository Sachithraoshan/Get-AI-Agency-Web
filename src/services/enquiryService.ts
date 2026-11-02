import { EnquiryFormData, LeadEnquiry, EnquiryStatus } from '../types/index.ts';
import { ENQUIRY_API_URL } from '../config/admin.ts';

export interface SubmitResult {
  success: boolean;
  id?: string;
  error?: string;
}

export interface FetchResult {
  success: boolean;
  enquiries: LeadEnquiry[];
  error?: string;
}

/**
 * Returns the currently configured Google Apps Script Web App endpoint
 */
export function getAppsScriptUrl(): string {
  return ENQUIRY_API_URL.trim();
}

/**
 * Service options mapping to readable titles
 */
export const SERVICE_TITLES: Record<string, string> = {
  'website-redesign': 'Website Redesign',
  'mobile-responsive': 'Mobile Responsive Website',
  'speed-optimization': 'Website Speed Optimization',
  'business-dashboard': 'Business Dashboard',
  'brand-consistency': 'Brand Consistency and Design Pack',
  'not-sure': 'Not Sure Yet',
};

/**
 * Validate required enquiry fields
 */
export function validateEnquiry(data: EnquiryFormData): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.name || !data.name.trim()) {
    errors.name = 'Please provide your full name.';
  }

  if (!data.email || !data.email.trim()) {
    errors.email = 'Please provide your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address format.';
  }

  if (!data.service) {
    errors.service = 'Please select a service area.';
  }

  if (!data.message || !data.message.trim()) {
    errors.message = 'Please provide a brief message about your requirement.';
  } else if (data.message.trim().length < 5) {
    errors.message = 'Please provide a little more detail in your message.';
  } else if (data.message.trim().length > 5000) {
    errors.message = 'Message must be under 5000 characters.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Submits a validated enquiry to the Google Apps Script Web App
 */
export async function submitEnquiryToGoogleSheets(data: EnquiryFormData): Promise<SubmitResult> {
  // Client-side validation check
  const validation = validateEnquiry(data);
  if (!validation.valid) {
    const firstError = Object.values(validation.errors)[0];
    return { success: false, error: firstError };
  }

  const endpoint = ENQUIRY_API_URL.trim();

  // If endpoint is not configured in production environment
  if (!endpoint) {
    return {
      success: false,
      error: 'The enquiry service is currently being configured. Please contact our direct hotline at +94 775768237 or email hello@getai.com.lk.',
    };
  }

  const serviceLabel = SERVICE_TITLES[data.service] || data.service;

  const payload = {
    action: 'createEnquiry',
    name: data.name.trim(),
    businessName: data.businessName ? data.businessName.trim() : '',
    email: data.email.trim(),
    phone: data.phone ? data.phone.trim() : '',
    service: serviceLabel,
    message: data.message.trim(),
    source: 'Website',
  };

  try {
    // Send as text/plain to avoid CORS preflight OPTIONS restriction on Google Apps Script
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return {
        success: false,
        error: 'We could not submit your enquiry right now. Please try again shortly.',
      };
    }

    const result = await response.json();

    if (result && result.success) {
      return {
        success: true,
        id: result.id,
      };
    } else {
      return {
        success: false,
        error: result?.error || 'We could not submit your enquiry right now. Please try again.',
      };
    }
  } catch {
    return {
      success: false,
      error: 'We could not submit your enquiry right now. Please try again.',
    };
  }
}

/**
 * Fetches all enquiries from Google Sheets for the private Admin Dashboard
 */
export async function fetchEnquiriesFromGoogleSheets(): Promise<FetchResult> {
  const endpoint = ENQUIRY_API_URL.trim();

  if (!endpoint) {
    return {
      success: false,
      enquiries: [],
      error: 'Google Apps Script Web App endpoint (VITE_ENQUIRY_API_URL) is not configured yet.',
    };
  }

  try {
    const url = endpoint.includes('?') 
      ? `${endpoint}&action=getEnquiries&_t=${Date.now()}` 
      : `${endpoint}?action=getEnquiries&_t=${Date.now()}`;

    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      return {
        success: false,
        enquiries: [],
        error: 'We could not load the enquiry data right now. Please try again.',
      };
    }

    const data = await response.json();

    if (data && data.success && Array.isArray(data.enquiries)) {
      return {
        success: true,
        enquiries: data.enquiries,
      };
    } else {
      return {
        success: false,
        enquiries: [],
        error: 'We could not load the enquiry data right now. Please try again.',
      };
    }
  } catch {
    return {
      success: false,
      enquiries: [],
      error: 'We could not load the enquiry data right now. Please try again.',
    };
  }
}

/**
 * Updates enquiry status in Google Sheets
 */
export async function updateEnquiryStatusInGoogleSheets(id: string, status: EnquiryStatus): Promise<{ success: boolean; error?: string }> {
  const endpoint = ENQUIRY_API_URL.trim();

  if (!endpoint) {
    return { success: false, error: 'Endpoint not configured.' };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        action: 'updateStatus',
        id,
        status,
      }),
    });

    if (!response.ok) {
      return { success: false, error: 'Could not update status.' };
    }

    const result = await response.json();
    return { success: !!result?.success, error: result?.error };
  } catch {
    return { success: false, error: 'Could not update status.' };
  }
}

/**
 * Updates internal notes for an enquiry in Google Sheets
 */
export async function updateEnquiryNotesInGoogleSheets(id: string, notes: string): Promise<{ success: boolean; error?: string }> {
  const endpoint = ENQUIRY_API_URL.trim();

  if (!endpoint) {
    return { success: false, error: 'Endpoint not configured.' };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        action: 'updateNotes',
        id,
        notes,
      }),
    });

    if (!response.ok) {
      return { success: false, error: 'Could not update notes.' };
    }

    const result = await response.json();
    return { success: !!result?.success, error: result?.error };
  } catch {
    return { success: false, error: 'Could not update notes.' };
  }
}
