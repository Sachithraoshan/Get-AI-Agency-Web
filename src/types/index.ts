export type ServiceId = 
  | 'website-redesign'
  | 'mobile-responsive'
  | 'speed-optimization'
  | 'business-dashboard'
  | 'brand-consistency'
  | 'not-sure';

export interface ServiceItem {
  id: ServiceId;
  slug: string;
  number: string;
  name: string;
  seoTitle: string;
  h1Title: string;
  metaDescription: string;
  primaryTopic: string;
  secondaryTopics: string[];
  problem: string;
  shortDescription: string;
  whoNeedsThis: string;
  commonProblems: string[];
  whatWeChange: string[];
  symptoms: string[];
  deliverables: string[];
  businessOutcome: string;
  considerations: {
    title: string;
    description: string;
  }[];
  relatedProjectSlug?: string;
  relatedProjectName?: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  type: string;
  description: string;
  overview: string;
  problem: string;
  approach: string;
  features: string[];
  technology: string[];
  handledByGetAi: string[];
  status: string;
  coverImage?: string;
  githubUrl?: string;
  liveUrl?: string;
  visualTheme: string;
  gallerySections: {
    title: string;
    image?: string;
    caption: string;
    description: string;
  }[];
  audioDemos?: {
    title: string;
    scriptTitle: string;
    audioUrl: string;
    description: string;
    duration: string;
  }[];
  metrics?: {
    label: string;
    value: string;
    note: string;
  }[];
  insights?: string[];
  actions?: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tag: string;
  problemSolved: string;
  practicalSolution: string;
  highlights: string[];
  visualTheme: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  summary: string;
  description: string;
  role: string;
  deliverable: string;
}

export interface WhyPillar {
  title: string;
  summary: string;
  detail: string;
}

export type EnquiryStatus = 
  | 'New' 
  | 'Contacted' 
  | 'Discovery' 
  | 'Proposal' 
  | 'Won' 
  | 'Lost';

export interface LeadEnquiry {
  id: string; // e.g. GETAI-0001
  timestamp: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: EnquiryStatus;
  source: string; // 'Website'
  notes: string;
}

export interface EnquiryFormData {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  service: ServiceId;
  message: string;
}
