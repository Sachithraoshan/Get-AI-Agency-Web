/**
 * GET AI Agency Admin Access Configuration
 * 
 * IMPORTANT: Add authorized Google account emails that are allowed
 * to access the private GET AI Admin Dashboard.
 */
export const ADMIN_EMAILS: string[] = [
  // Add authorized GET AI owner / admin Google emails below:
  "sachithraoshan769@gmail.com",
  "hello@getai.com.lk"
];

/**
 * Checks if a given email is on the authorized GET AI Admin allowlist.
 */
export function isAuthorizedAdmin(email?: string | null): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return ADMIN_EMAILS.some((admin) => admin.trim().toLowerCase() === normalized);
}

/**
 * Default environment variable or local endpoint for the Google Apps Script Web App.
 * Set VITE_ENQUIRY_API_URL in your deployment environment or .env file.
 */
export const ENQUIRY_API_URL: string = (import.meta as unknown as { env?: { VITE_ENQUIRY_API_URL?: string } }).env?.VITE_ENQUIRY_API_URL || '';
