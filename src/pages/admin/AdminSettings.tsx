import React, { useState } from 'react';
import { ADMIN_EMAILS } from '../../config/admin.ts';
import { getAppsScriptUrl } from '../../services/enquiryService.ts';
import { Shield, FileSpreadsheet, Key, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const endpoint = getAppsScriptUrl();
  const isConfigured = Boolean(endpoint);

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);

    if (!endpoint) {
      setTesting(false);
      setTestResult({
        success: false,
        message: 'Endpoint URL is not set. Set VITE_ENQUIRY_API_URL in your environment.',
      });
      return;
    }

    try {
      const response = await fetch(`${endpoint}?action=fetch&limit=1`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });
      if (response.ok) {
        setTestResult({
          success: true,
          message: 'Connection successful. Google Apps Script responded with 200 OK.',
        });
      } else {
        setTestResult({
          success: false,
          message: `Endpoint returned HTTP status ${response.status}. Verify deployment permissions are set to "Anyone".`,
        });
      }
    } catch {
      setTestResult({
        success: false,
        message: 'Could not connect to Apps Script. Check URL formatting and deployment.',
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-black">
          System Configuration
        </h2>
        <p className="text-xs text-neutral-500 mt-1">
          Reference settings for Google Sheets, Apps Script Web App, and security allowlists.
        </p>
      </div>

      {/* Web App Endpoint Status */}
      <div className="bg-white border border-neutral-300 rounded-sm p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-black" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-black">
              Google Apps Script Endpoint
            </h3>
          </div>
          <span
            className={`px-2 py-0.5 text-[11px] font-mono rounded-xs ${
              isConfigured
                ? 'bg-neutral-900 text-white font-semibold'
                : 'bg-neutral-100 text-neutral-600 border border-neutral-300'
            }`}
          >
            {isConfigured ? 'CONFIGURED' : 'UNCONFIGURED'}
          </span>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-600 mb-1">
            Current Endpoint URL:
          </label>
          <div className="font-mono text-xs p-3 bg-neutral-50 border border-neutral-200 rounded-xs break-all text-neutral-800">
            {endpoint || 'No URL configured. Using client fallback in local environment.'}
          </div>
          <p className="text-[11px] text-neutral-500 mt-1.5 leading-relaxed">
            Configured via <code className="font-mono bg-neutral-100 px-1 py-0.5 rounded-xs">VITE_ENQUIRY_API_URL</code> environment variable in your build settings or <code className="font-mono bg-neutral-100 px-1 py-0.5 rounded-xs">.env.example</code>.
          </p>
        </div>

        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={handleTestConnection}
            disabled={testing}
            className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-800 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
            <span>{testing ? 'Testing...' : 'Test Connection'}</span>
          </button>
          {testResult && (
            <span className={`text-xs ${testResult.success ? 'text-black font-semibold' : 'text-neutral-700 font-medium'}`}>
              {testResult.message}
            </span>
          )}
        </div>
      </div>

      {/* Google Sheet Mapping */}
      <div className="bg-white border border-neutral-300 rounded-sm p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-neutral-200">
          <FileSpreadsheet className="w-4 h-4 text-black" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-black">
            Google Sheet Schema (Source of Record)
          </h3>
        </div>

        <div className="text-xs text-neutral-600 leading-relaxed">
          <p className="mb-3">
            Sheet Name: <strong>GET AI Agency Leads</strong> (Tab: <strong>Enquiries</strong>)
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-[11px] border border-neutral-200">
              <thead className="bg-neutral-100 border-b border-neutral-200 text-neutral-800">
                <tr>
                  <th className="p-2 border-r border-neutral-200">Col</th>
                  <th className="p-2 border-r border-neutral-200">Header Name</th>
                  <th className="p-2">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-neutral-700">
                <tr><td className="p-2 border-r">A</td><td className="p-2 border-r font-semibold text-black">ID</td><td className="p-2">Unique sequential code (e.g. GETAI-0001)</td></tr>
                <tr><td className="p-2 border-r">B</td><td className="p-2 border-r font-semibold text-black">Timestamp</td><td className="p-2">ISO / Formatted creation datetime</td></tr>
                <tr><td className="p-2 border-r">C</td><td className="p-2 border-r font-semibold text-black">Name</td><td className="p-2">Customer full name</td></tr>
                <tr><td className="p-2 border-r">D</td><td className="p-2 border-r font-semibold text-black">Business Name</td><td className="p-2">Company / Organization</td></tr>
                <tr><td className="p-2 border-r">E</td><td className="p-2 border-r font-semibold text-black">Email</td><td className="p-2">Verified work email</td></tr>
                <tr><td className="p-2 border-r">F</td><td className="p-2 border-r font-semibold text-black">Phone</td><td className="p-2">Phone or WhatsApp contact</td></tr>
                <tr><td className="p-2 border-r">G</td><td className="p-2 border-r font-semibold text-black">Service</td><td className="p-2">Intake category selected</td></tr>
                <tr><td className="p-2 border-r">H</td><td className="p-2 border-r font-semibold text-black">Message</td><td className="p-2">Detailed business challenge</td></tr>
                <tr><td className="p-2 border-r">I</td><td className="p-2 border-r font-semibold text-black">Status</td><td className="p-2">New | Contacted | Discovery | Proposal | Won | Lost</td></tr>
                <tr><td className="p-2 border-r">J</td><td className="p-2 border-r font-semibold text-black">Source</td><td className="p-2">Originating channel (Website)</td></tr>
                <tr><td className="p-2 border-r">K</td><td className="p-2 border-r font-semibold text-black">Notes</td><td className="p-2">Private internal team notes</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Admin Security Allowlist */}
      <div className="bg-white border border-neutral-300 rounded-sm p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-neutral-200">
          <Shield className="w-4 h-4 text-black" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-black">
            Authorized Admin Accounts
          </h3>
        </div>

        <p className="text-xs text-neutral-600 leading-relaxed">
          Google accounts configured in <code className="font-mono bg-neutral-100 px-1 py-0.5 rounded-xs">src/config/admin.ts</code>:
        </p>

        <ul className="space-y-1.5">
          {ADMIN_EMAILS.map((email) => (
            <li key={email} className="font-mono text-xs p-2.5 bg-neutral-50 border border-neutral-200 rounded-xs flex items-center justify-between">
              <span className="text-black font-semibold">{email}</span>
              <span className="text-[10px] uppercase font-mono text-neutral-500">Authorized Owner</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};
