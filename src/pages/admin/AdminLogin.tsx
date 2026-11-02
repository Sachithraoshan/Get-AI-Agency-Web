import React, { useState } from 'react';
import { Shield, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import { ADMIN_EMAILS, isAuthorizedAdmin } from '../../config/admin.ts';

interface AdminLoginProps {
  onLoginSuccess: (email: string) => void;
  onReturnToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onReturnToSite }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmed = email.trim();

    if (!trimmed) {
      setError('Please enter your Google account email.');
      return;
    }

    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      if (isAuthorizedAdmin(trimmed)) {
        onLoginSuccess(trimmed);
      } else {
        setError('Access denied. This email is not on the authorized GET AI admin allowlist.');
      }
    }, 400);
  };

  const handleQuickSelect = (allowedEmail: string) => {
    setEmail(allowedEmail);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-black text-white font-bold tracking-wider text-sm rounded-xs mb-3">
            GET AI
          </div>
          <h1 className="text-xl font-bold tracking-tight text-black">
            Lead Management Console
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Private internal tool for GET AI leadership
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-white border border-neutral-300 rounded-sm p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 pb-4 mb-5 border-b border-neutral-200">
            <Lock className="w-4 h-4 text-neutral-700" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-black">
              Google Account Authentication
            </h2>
          </div>

          {error && (
            <div className="p-3 bg-neutral-100 border border-neutral-300 rounded-xs text-xs text-black mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                Authorized Google Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. sachithraoshan769@gmail.com"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xs text-xs text-black placeholder:text-neutral-400 focus:outline-hidden focus:border-black transition-colors"
                autoComplete="email"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full flex items-center justify-center gap-2 bg-black text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xs hover:bg-neutral-800 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isVerifying ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <span>Sign In to Admin</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Configuration Notice */}
          <div className="mt-6 pt-5 border-t border-neutral-200 text-[11px] text-neutral-600">
            <div className="flex items-center gap-1.5 font-semibold text-neutral-800 mb-1.5">
              <Shield className="w-3.5 h-3.5 text-neutral-500" />
              <span>Security Allowlist Configuration</span>
            </div>
            <p className="leading-relaxed mb-2 text-neutral-500">
              Only Google accounts configured in <code className="bg-neutral-100 px-1 py-0.5 rounded-xs font-mono text-[10px]">src/config/admin.ts</code> have dashboard access:
            </p>
            <div className="space-y-1">
              {ADMIN_EMAILS.map((admin) => (
                <button
                  key={admin}
                  type="button"
                  onClick={() => handleQuickSelect(admin)}
                  className="w-full text-left font-mono text-[11px] text-neutral-700 bg-neutral-50 hover:bg-neutral-100 p-2 rounded-xs border border-neutral-200 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="truncate">{admin}</span>
                  <span className="text-[10px] text-neutral-400 font-sans">Click to fill</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Return to Public Website */}
        <div className="text-center mt-6">
          <button
            onClick={onReturnToSite}
            className="text-xs text-neutral-500 hover:text-black font-medium transition-colors cursor-pointer"
          >
            ← Return to public GET AI website
          </button>
        </div>

      </div>
    </div>
  );
};
