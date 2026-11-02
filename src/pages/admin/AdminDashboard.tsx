import React, { useState, useEffect, useMemo } from 'react';
import { LeadEnquiry, EnquiryStatus } from '../../types/index.ts';
import { fetchEnquiriesFromGoogleSheets } from '../../services/enquiryService.ts';
import { EnquiryDetailModal } from './EnquiryDetailModal.tsx';
import { AdminSettings } from './AdminSettings.tsx';
import {
  RefreshCw,
  Search,
  Filter,
  Eye,
  LogOut,
  SlidersHorizontal,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

interface AdminDashboardProps {
  adminEmail: string;
  onLogout: () => void;
  onReturnToSite: () => void;
}

type AdminTab = 'dashboard' | 'enquiries' | 'settings';

const STATUS_OPTIONS: (EnquiryStatus | 'All')[] = [
  'All',
  'New',
  'Contacted',
  'Discovery',
  'Proposal',
  'Won',
  'Lost',
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  adminEmail,
  onLogout,
  onReturnToSite,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [enquiries, setEnquiries] = useState<LeadEnquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<EnquiryStatus | 'All'>('All');

  // Detail Modal
  const [selectedEnquiry, setSelectedEnquiry] = useState<LeadEnquiry | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    const result = await fetchEnquiriesFromGoogleSheets();
    setIsLoading(false);

    if (result.success) {
      setEnquiries(result.enquiries);
    } else {
      setErrorMessage('We could not load the enquiry data right now. Please try again.');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute live KPIs from actual data
  const kpis = useMemo(() => {
    const counts: Record<string, number> = {
      total: enquiries.length,
      New: 0,
      Contacted: 0,
      Discovery: 0,
      Proposal: 0,
      Won: 0,
      Lost: 0,
    };

    enquiries.forEach((item) => {
      if (counts[item.status] !== undefined) {
        counts[item.status]++;
      }
    });

    return counts;
  }, [enquiries]);

  // Filtered and searched enquiries
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      // Status filter
      if (statusFilter !== 'All' && item.status !== statusFilter) {
        return false;
      }

      // Search query across Name, Business, Email, Phone, Lead ID, Service
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const matchId = (item.id || '').toLowerCase().includes(q);
      const matchName = (item.name || '').toLowerCase().includes(q);
      const matchBiz = (item.businessName || '').toLowerCase().includes(q);
      const matchEmail = (item.email || '').toLowerCase().includes(q);
      const matchPhone = (item.phone || '').toLowerCase().includes(q);
      const matchService = (item.service || '').toLowerCase().includes(q);

      return matchId || matchName || matchBiz || matchEmail || matchPhone || matchService;
    });
  }, [enquiries, statusFilter, searchQuery]);

  const handleEnquiryUpdated = (updated: LeadEnquiry) => {
    setEnquiries((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
    setSelectedEnquiry(updated);
  };

  const getStatusBadgeClass = (status: EnquiryStatus) => {
    switch (status) {
      case 'New':
        return 'bg-black text-white font-bold';
      case 'Contacted':
        return 'bg-neutral-200 text-neutral-800';
      case 'Discovery':
        return 'bg-neutral-300 text-black';
      case 'Proposal':
        return 'bg-neutral-800 text-white';
      case 'Won':
        return 'bg-neutral-900 text-white border border-neutral-700';
      case 'Lost':
        return 'bg-neutral-100 text-neutral-500 line-through';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-black flex flex-col">
      
      {/* Top Admin Navigation Bar */}
      <header className="bg-white border-b border-neutral-300 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left: Brand Monogram + Admin Title */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black bg-black text-white px-2.5 py-1 rounded-xs">
                  GET AI
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 hidden sm:inline">
                  Admin Console
                </span>
              </div>

              {/* Navigation Tabs */}
              <nav className="flex items-center gap-1 sm:gap-2 ml-4 sm:ml-6 border-l border-neutral-200 pl-4 sm:pl-6">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xs transition-colors cursor-pointer ${
                    activeTab === 'dashboard'
                      ? 'bg-black text-white'
                      : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('enquiries')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xs transition-colors cursor-pointer ${
                    activeTab === 'enquiries'
                      ? 'bg-black text-white'
                      : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                  }`}
                >
                  Enquiries ({enquiries.length})
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xs transition-colors cursor-pointer ${
                    activeTab === 'settings'
                      ? 'bg-black text-white'
                      : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                  }`}
                >
                  Settings
                </button>
              </nav>
            </div>

            {/* Right: Auth Profile + Return Link + Logout */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-neutral-500 hidden md:inline truncate max-w-[200px]">
                {adminEmail}
              </span>

              <button
                onClick={onReturnToSite}
                className="text-xs text-neutral-600 hover:text-black hidden sm:flex items-center gap-1 font-medium transition-colors cursor-pointer"
                title="Return to public GET AI website"
              >
                <span>Site</span>
                <ExternalLink className="w-3 h-3" />
              </button>

              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-black text-xs font-semibold rounded-xs transition-colors border border-neutral-200 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* KPI Summary Cards (always displayed on dashboard and top of enquiries) */}
        {activeTab !== 'settings' && (
          <section className="mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              
              <div className="bg-white border border-neutral-300 p-4 rounded-xs">
                <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">
                  Total Enquiries
                </span>
                <div className="text-2xl font-bold font-mono text-black">
                  {kpis.total}
                </div>
              </div>

              <div className="bg-white border border-neutral-300 p-4 rounded-xs">
                <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">
                  New
                </span>
                <div className="text-2xl font-bold font-mono text-black">
                  {kpis.New}
                </div>
              </div>

              <div className="bg-white border border-neutral-300 p-4 rounded-xs">
                <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">
                  Contacted
                </span>
                <div className="text-2xl font-bold font-mono text-black">
                  {kpis.Contacted}
                </div>
              </div>

              <div className="bg-white border border-neutral-300 p-4 rounded-xs">
                <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">
                  Discovery
                </span>
                <div className="text-2xl font-bold font-mono text-black">
                  {kpis.Discovery}
                </div>
              </div>

              <div className="bg-white border border-neutral-300 p-4 rounded-xs">
                <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">
                  Proposal
                </span>
                <div className="text-2xl font-bold font-mono text-black">
                  {kpis.Proposal}
                </div>
              </div>

              <div className="bg-white border border-neutral-300 p-4 rounded-xs">
                <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">
                  Won
                </span>
                <div className="text-2xl font-bold font-mono text-black">
                  {kpis.Won}
                </div>
              </div>

              <div className="bg-white border border-neutral-300 p-4 rounded-xs col-span-2 sm:col-span-1">
                <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">
                  Lost
                </span>
                <div className="text-2xl font-bold font-mono text-black">
                  {kpis.Lost}
                </div>
              </div>

            </div>
          </section>
        )}

        {/* Tab Content: Settings */}
        {activeTab === 'settings' && <AdminSettings />}

        {/* Tab Content: Dashboard or Enquiries */}
        {activeTab !== 'settings' && (
          <div className="space-y-6">
            
            {/* Action Bar: Search, Filters, and Refresh */}
            <div className="bg-white border border-neutral-300 rounded-sm p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              
              {/* Search input */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, business, email, phone, ID, service..."
                  className="w-full pl-9 pr-4 py-2 bg-white border border-neutral-300 rounded-xs text-xs text-black placeholder:text-neutral-400 focus:outline-hidden focus:border-black transition-colors"
                />
              </div>

              {/* Status Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                <Filter className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0 mr-1" />
                {STATUS_OPTIONS.map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-xs border transition-colors whitespace-nowrap cursor-pointer ${
                      statusFilter === st
                        ? 'bg-black text-white border-black'
                        : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Refresh Button */}
              <div className="flex items-center justify-end">
                <button
                  onClick={loadData}
                  disabled={isLoading}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-neutral-100 text-black border border-neutral-300 text-xs font-semibold rounded-xs hover:bg-neutral-200 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>{isLoading ? 'Loading...' : 'Refresh'}</span>
                </button>
              </div>

            </div>

            {/* Error State */}
            {errorMessage && (
              <div className="bg-white border border-neutral-300 p-6 rounded-sm text-center">
                <p className="text-sm font-medium text-black mb-3">
                  {errorMessage}
                </p>
                <button
                  onClick={loadData}
                  className="px-4 py-2 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Loading State */}
            {isLoading && !errorMessage && (
              <div className="bg-white border border-neutral-300 p-12 rounded-sm text-center">
                <div className="inline-block w-6 h-6 border-2 border-neutral-300 border-t-black rounded-full animate-spin mb-3" />
                <p className="text-xs text-neutral-500 font-mono">
                  Loading enquiry data from Google Sheets...
                </p>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !errorMessage && filteredEnquiries.length === 0 && (
              <div className="bg-white border border-neutral-300 p-12 rounded-sm text-center">
                <p className="text-base font-semibold text-black mb-1">
                  {enquiries.length === 0 ? 'No enquiries yet.' : 'No enquiries match your search/filter.'}
                </p>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                  {enquiries.length === 0
                    ? 'New client enquiries submitted through the GET AI website will appear here and in your Google Sheet.'
                    : 'Try clearing your search query or selecting a different status filter.'}
                </p>
              </div>
            )}

            {/* Data View: Desktop Table */}
            {!isLoading && !errorMessage && filteredEnquiries.length > 0 && (
              <div className="space-y-4">
                
                {/* Desktop View: Table */}
                <div className="hidden lg:block bg-white border border-neutral-300 rounded-sm overflow-hidden shadow-xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-neutral-100 border-b border-neutral-300 text-neutral-700 font-mono text-[11px] uppercase">
                      <tr>
                        <th className="py-3 px-3.5 font-bold">ID</th>
                        <th className="py-3 px-3.5 font-bold">Date</th>
                        <th className="py-3 px-3.5 font-bold">Name</th>
                        <th className="py-3 px-3.5 font-bold">Business</th>
                        <th className="py-3 px-3.5 font-bold">Service</th>
                        <th className="py-3 px-3.5 font-bold">Email</th>
                        <th className="py-3 px-3.5 font-bold">Phone</th>
                        <th className="py-3 px-3.5 font-bold">Status</th>
                        <th className="py-3 px-3.5 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 font-sans">
                      {filteredEnquiries.map((item) => (
                        <tr
                          key={item.id}
                          onClick={() => setSelectedEnquiry(item)}
                          className="hover:bg-neutral-50 transition-colors cursor-pointer"
                        >
                          <td className="py-3 px-3.5 font-mono font-bold text-black whitespace-nowrap">
                            {item.id}
                          </td>
                          <td className="py-3 px-3.5 font-mono text-neutral-500 whitespace-nowrap text-[11px]">
                            {item.timestamp ? item.timestamp.split('T')[0] : '—'}
                          </td>
                          <td className="py-3 px-3.5 font-semibold text-black whitespace-nowrap">
                            {item.name}
                          </td>
                          <td className="py-3 px-3.5 text-neutral-700 truncate max-w-[140px]">
                            {item.businessName || '—'}
                          </td>
                          <td className="py-3 px-3.5 text-neutral-700 truncate max-w-[150px]">
                            {item.service}
                          </td>
                          <td className="py-3 px-3.5 font-mono text-neutral-600 truncate max-w-[160px]">
                            {item.email}
                          </td>
                          <td className="py-3 px-3.5 font-mono text-neutral-600 whitespace-nowrap">
                            {item.phone || '—'}
                          </td>
                          <td className="py-3 px-3.5 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 text-[10px] font-mono rounded-xs inline-block ${getStatusBadgeClass(
                                item.status
                              )}`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3 px-3.5 text-right whitespace-nowrap">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedEnquiry(item);
                              }}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-black hover:underline cursor-pointer"
                            >
                              <Eye className="w-3 h-3" />
                              <span>View</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View: Clean Responsive Cards */}
                <div className="lg:hidden space-y-3">
                  {filteredEnquiries.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedEnquiry(item)}
                      className="bg-white border border-neutral-300 rounded-sm p-4 hover:border-black transition-colors cursor-pointer space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs bg-black text-white px-2 py-0.5 rounded-xs">
                            {item.id}
                          </span>
                          <span className="text-[11px] font-mono text-neutral-500">
                            {item.timestamp ? item.timestamp.split('T')[0] : ''}
                          </span>
                        </div>
                        <span
                          className={`px-2 py-0.5 text-[10px] font-mono rounded-xs ${getStatusBadgeClass(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <div>
                        <div className="text-sm font-bold text-black">{item.name}</div>
                        {item.businessName && (
                          <div className="text-xs text-neutral-600 font-medium">
                            {item.businessName}
                          </div>
                        )}
                      </div>

                      <div className="text-xs text-neutral-700 bg-neutral-50 p-2 rounded-xs border border-neutral-200">
                        <span className="text-[10px] font-mono text-neutral-400 block uppercase">
                          Service
                        </span>
                        {item.service}
                      </div>

                      <div className="flex items-center justify-between pt-1 text-xs border-t border-neutral-100">
                        <div className="font-mono text-neutral-500 text-[11px] truncate mr-2">
                          {item.email}
                        </div>
                        <div className="flex items-center gap-1 font-semibold text-black">
                          <span>Details</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>
        )}

      </main>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <EnquiryDetailModal
          enquiry={selectedEnquiry}
          onClose={() => setSelectedEnquiry(null)}
          onUpdate={handleEnquiryUpdated}
        />
      )}

    </div>
  );
};
