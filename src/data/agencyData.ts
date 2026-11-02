import { ServiceItem, ProjectItem, ProcessStep, WhyPillar } from '../types/index.ts';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'website-redesign',
    slug: 'website-redesign',
    number: '01',
    name: 'Website Redesign',
    seoTitle: 'Website Redesign Sri Lanka | GET AI Agency',
    h1Title: 'Website Redesign for Sri Lankan Businesses',
    metaDescription: 'Modern website redesign for businesses in Sri Lanka. Upgrade outdated layouts, improve mobile usability, and create clear customer conversion pathways.',
    primaryTopic: 'Website Redesign Sri Lanka',
    secondaryTopics: [
      'website redesign Colombo',
      'business website redesign',
      'modern website redesign',
      'website improvement',
      'outdated website redesign'
    ],
    problem: 'Your website looks outdated or no longer represents your business.',
    shortDescription: 'We restructure your web presence to reflect your current business caliber, establish credibility, and guide visitors toward clear business actions.',
    whoNeedsThis: 'Sri Lankan enterprises, established service providers, clinics, and consumer brands whose existing websites were built years ago and no longer reflect their current standards, services, or market stature.',
    commonProblems: [
      'Visual design has not been updated in several years and looks abandoned',
      'Does not accurately reflect your current products, services, or market positioning',
      'High bounce rate from prospective corporate or retail clients on mobile phones',
      'Confusing navigation layout that buries your primary contact information and value proposition'
    ],
    whatWeChange: [
      'Information architecture restructuring to surface primary services immediately',
      'High contrast typographical hierarchy paired with custom brand visual assets',
      'Streamlined mobile navigation with prominent contact hotlines and enquiry triggers',
      'Clean semantic code delivery without bloated plugins or unnecessary dependencies'
    ],
    symptoms: [
      'Visual design has not been updated in several years',
      'Does not accurately reflect your current products or positioning',
      'High bounce rate from prospective corporate or retail clients',
      'Confusing layout that buries your primary value proposition'
    ],
    deliverables: [
      'Complete information architecture audit',
      'Clean modern visual design with brand alignment',
      'Clear conversion paths and streamlined user flows',
      'Launch verification and testing'
    ],
    considerations: [
      {
        title: 'Design Improvements',
        description: 'We replace outdated visual clutter with clean monochrome spacing, legible typography, and structured content sections that build immediate trust.'
      },
      {
        title: 'Mobile Usability',
        description: 'Every layout is engineered to render smoothly across smartphones and tablets with finger friendly touch targets and zero horizontal overflow.'
      },
      {
        title: 'Performance Considerations',
        description: 'We strip legacy bloated scripts and optimize image weights so pages load quickly on Sri Lankan mobile connections.'
      },
      {
        title: 'Search Optimization',
        description: 'Proper semantic headings, metadata, schema markup, and canonical structure ensure search engines understand your business offerings.'
      }
    ],
    businessOutcome: 'Elevated brand credibility that commands professional respect and converts visitor curiosity into qualified enquiries.',
    relatedProjectSlug: 'primefit',
    relatedProjectName: 'PrimeFit Studio'
  },
  {
    id: 'mobile-responsive',
    slug: 'mobile-responsive-websites',
    number: '02',
    name: 'Mobile Responsive Website',
    seoTitle: 'Responsive Website Design Sri Lanka | GET AI Agency',
    h1Title: 'Responsive Websites for Modern Businesses',
    metaDescription: 'Professional responsive web design for Sri Lankan businesses. Ensure seamless layout scaling and finger friendly usability across phones, tablets, and desktops.',
    primaryTopic: 'Responsive Website Design Sri Lanka',
    secondaryTopics: [
      'mobile friendly website',
      'responsive business website',
      'mobile responsive web design',
      'responsive web development Colombo'
    ],
    problem: 'Your website does not work properly across phones, tablets and desktops.',
    shortDescription: 'We rebuild and optimize layouts to deliver seamless usability and legibility across every screen width without horizontal scroll defects or awkward tap targets.',
    whoNeedsThis: 'Businesses where more than 65 percent of incoming web traffic originates from mobile devices, yet the current site forces visitors to pinch, zoom, or struggle with broken menus.',
    commonProblems: [
      'Desktop navigation bars break, overlap, or clip on smartphone screens',
      'Buttons and contact links are too tiny or awkward to tap accurately',
      'Key enquiry forms and hotline phone numbers disappear off screen',
      'Horizontal scroll bars appear because fixed pixel containers fail to scale'
    ],
    whatWeChange: [
      'Fluid CSS grid and flexbox architectures designed from mobile to wide screen',
      'Comfortable tap targets meeting strict accessibility and usability standards',
      'Responsive typography scales that preserve reading comfort on small viewports',
      'Comprehensive device validation across iOS, Android, tablets, and laptops'
    ],
    symptoms: [
      'Desktop elements break, overlap, or clip on smartphones',
      'Buttons and navigation links are too tiny or awkward to tap',
      'Visitors leave quickly when browsing on mobile devices',
      'Key calls to action disappear on smaller screen viewports'
    ],
    deliverables: [
      'Fluid cross breakpoint responsive layout for all screens',
      'Touch friendly navigation with comfortable tap targets',
      'Adaptive image scaling and fluid typographic hierarchy',
      'Thorough device validation across phones and tablets'
    ],
    considerations: [
      {
        title: 'Multi Screen Adaptation',
        description: 'Layouts naturally adapt from 320px smartphone displays up to 4K desktop screens without visual degradation.'
      },
      {
        title: 'Usability and Touch',
        description: 'Buttons and navigation items maintain minimum 44px tap areas with tactile active states for error free browsing.'
      },
      {
        title: 'Thumb Zone Navigation',
        description: 'Primary actions, booking buttons, and telephone hotlines are placed within natural thumb reach on mobile devices.'
      },
      {
        title: 'Real Device Testing',
        description: 'Every layout undergoes manual verification across popular mobile browsers including Safari and Chrome.'
      }
    ],
    businessOutcome: 'Flawless digital accessibility ensuring you never lose a client due to a broken mobile layout.',
    relatedProjectSlug: 'lankacare',
    relatedProjectName: 'LankaCare Dental Clinic'
  },
  {
    id: 'speed-optimization',
    slug: 'website-speed-optimization',
    number: '03',
    name: 'Website Speed Optimization',
    seoTitle: 'Website Speed Optimization Sri Lanka | GET AI Agency',
    h1Title: 'Website Speed Optimization',
    metaDescription: 'Technical website performance and loading speed optimization for businesses in Sri Lanka. Improve Core Web Vitals, reduce script bloat, and speed up page load times.',
    primaryTopic: 'Website Speed Optimization Sri Lanka',
    secondaryTopics: [
      'website performance optimization',
      'slow website optimization',
      'website loading speed',
      'Core Web Vitals optimization Sri Lanka'
    ],
    problem: 'Your website loads slowly and creates unnecessary friction.',
    shortDescription: 'We identify technical bottlenecks, strip bloated assets, and tune loading pipelines so your website responds quickly to prospective customers.',
    whoNeedsThis: 'Websites suffering from high drop off rates, sluggish rendering on Sri Lankan mobile networks, or failing Google Core Web Vitals assessments due to script bloat.',
    commonProblems: [
      'Pages take several seconds before showing meaningful content to the user',
      'Heavy multi megabyte uncompressed imagery blocking browser rendering',
      'Unused CSS and legacy JavaScript files executing on every single page',
      'Third party tracking snippets and widgets delaying layout stability'
    ],
    whatWeChange: [
      'Asset pipeline compression converting images to modern WebP and vector formats',
      'Elimination of redundant libraries, unused plugins, and render blocking code',
      'Implementation of intelligent lazy loading for media located below the fold',
      'Optimized HTTP caching directives and efficient content delivery configuration'
    ],
    symptoms: [
      'Pages take more than 3 seconds to fully render',
      'Visitors abandon the page before reading your offer',
      'Heavy uncompressed images and unnecessary scripts choke performance',
      'Slow response times degrading customer trust'
    ],
    deliverables: [
      'Comprehensive performance bottleneck audit',
      'Image and vector compression with modern format delivery',
      'Script cleanup and lazy loading implementation',
      'Server response and caching strategy optimization'
    ],
    considerations: [
      {
        title: 'Largest Contentful Paint',
        description: 'We prioritize the loading of your main hero content so visitors see key information within milliseconds.'
      },
      {
        title: 'Cumulative Layout Shift',
        description: 'Explicit aspect ratios on media elements prevent disruptive visual jumps as images load.'
      },
      {
        title: 'Script Rationalization',
        description: 'We audit every external script, removing dead dependencies that drag down client devices.'
      },
      {
        title: 'Measurable Reality',
        description: 'We focus on real world human perceptible loading speed rather than chasing artificial benchmark badges.'
      }
    ],
    businessOutcome: 'Fast response times that eliminate user drop off and convey high technical competence.',
    relatedProjectSlug: 'primefit',
    relatedProjectName: 'PrimeFit Studio'
  },
  {
    id: 'business-dashboard',
    slug: 'business-dashboards',
    number: '04',
    name: 'Business Dashboard',
    seoTitle: 'Business Dashboard Development Sri Lanka | GET AI Agency',
    h1Title: 'Business Dashboards That Make Data Easier to Understand',
    metaDescription: 'Custom business analytics and KPI dashboard development in Sri Lanka. Consolidate fragmented operational data into clear single screen executive views.',
    primaryTopic: 'Business Dashboard Sri Lanka',
    secondaryTopics: [
      'business analytics dashboard',
      'KPI dashboard Sri Lanka',
      'business reporting dashboard',
      'data dashboard Sri Lanka'
    ],
    problem: 'Your business has data but important numbers are difficult to understand.',
    shortDescription: 'We consolidate dispersed business information into a clear single screen dashboard that highlights key performance indicators and operational health at a glance.',
    whoNeedsThis: 'Business owners, operations directors, and general managers who spend hours cross referencing spreadsheets each week just to know whether their business is growing or stalling.',
    commonProblems: [
      'Critical business metrics are locked in scattered disconnected spreadsheets',
      'Management teams waste valuable hours preparing manual weekly reports',
      'Revenue leaks, inventory imbalances, and margin drops go undetected for weeks',
      'Lack of an objective single screen reference point for executive discussions'
    ],
    whatWeChange: [
      'Mapping business key performance indicators directly to your operational priorities',
      'Clean high contrast single screen dashboards engineered for immediate visual clarity',
      'Interactive date range filtering and product category segment breakdowns',
      'Executive summary cards showing core numbers, orders, units sold, and order value'
    ],
    symptoms: [
      'Critical business metrics are locked in disparate spreadsheets',
      'Leadership spends hours compiling weekly status reports manually',
      'Operational trends and cash flow bottlenecks remain unnoticed',
      'Lack of a unified view for daily decision making'
    ],
    deliverables: [
      'Business KPI mapping and source data rationalization',
      'High contrast visual dashboard with essential metric summaries',
      'Interactive filtering by date range or customer segment',
      'Clean summaries for executive and team reviews'
    ],
    considerations: [
      {
        title: 'Clarity Over Complexity',
        description: 'We present essential metrics without overwhelming users with dozens of redundant charts.'
      },
      {
        title: 'Actionable Reporting',
        description: 'Dashboards highlight specific business questions, from top selling items to customer return patterns.'
      },
      {
        title: 'Commercial Relevance',
        description: 'Every chart and KPI corresponds to real commercial decisions that affect cash flow and margins.'
      },
      {
        title: 'Zero Clutter Architecture',
        description: 'Carefully organized visual hierarchy allows directors to evaluate health in under 30 seconds.'
      }
    ],
    businessOutcome: 'Total operational clarity so leaders can make fast confident decisions based on actual performance data.',
    relatedProjectSlug: 'novawear',
    relatedProjectName: 'NOVAWEAR Sales Intelligence'
  },
  {
    id: 'brand-consistency',
    slug: 'brand-design',
    number: '05',
    name: 'Brand Consistency and Design Pack',
    seoTitle: 'Brand Design and Consistency | GET AI Agency',
    h1Title: 'A Consistent Brand Across Every Customer Touchpoint',
    metaDescription: 'Professional brand design and visual identity consistency for businesses in Sri Lanka. Unify typography, color palettes, digital collateral, and document templates.',
    primaryTopic: 'Brand Design Sri Lanka',
    secondaryTopics: [
      'brand consistency',
      'business brand design',
      'visual identity Sri Lanka',
      'brand design Colombo'
    ],
    problem: 'Your business looks different across different platforms and customer touchpoints.',
    shortDescription: 'We unify your visual identity across digital touchpoints, providing clear rules, cohesive assets, and professional design templates that keep your brand coherent.',
    whoNeedsThis: 'Companies with fragmented visual identities across social media, printed materials, websites, client proposals, and office signage that undermine customer trust.',
    commonProblems: [
      'Social profiles, proposal documents, invoices, and websites look completely disjointed',
      'Inconsistent color shades, mismatched fonts, and distorted logos are in daily use',
      'Team members guess graphic dimensions and layouts when producing customer collateral',
      'Lack of defined visual guidelines dilutes brand recognition and premium pricing power'
    ],
    whatWeChange: [
      'Comprehensive brand identity system establishing unified typography and color standards',
      'Digital asset toolkit with production ready web, social, and print formats',
      'Standardized business proposal, presentation, and document templates',
      'Clear practical usage guidelines that make team compliance straightforward'
    ],
    symptoms: [
      'Social profiles, proposals, invoices, and website look disjointed',
      'Inconsistent colors, mismatched fonts, and stretched logos in use',
      'Team members guess design formats when producing customer collateral',
      'Weak visual perception that weakens premium pricing potential'
    ],
    deliverables: [
      'Unified brand guidelines covering typography, color palette, and logo usage',
      'Digital asset kit containing optimized web and social formats',
      'Standardized document and proposal cover templates',
      'Clear usage rules to ensure ongoing internal consistency'
    ],
    considerations: [
      {
        title: 'Visual Cohesion',
        description: 'We align fonts, weights, margins, and tones so clients instantly recognize your business.'
      },
      {
        title: 'Practical Asset Kits',
        description: 'We deliver ready to use exports formatted for web headers, profile pictures, and print documents.'
      },
      {
        title: 'Template Standardization',
        description: 'Prebuilt document foundations ensure every customer facing proposal looks polished and executive.'
      },
      {
        title: 'Long Term Protection',
        description: 'A concise guide prevents brand dilution when new staff or contractors create marketing material.'
      }
    ],
    businessOutcome: 'A cohesive professional presence that reinforces trust at every single customer touchpoint.',
    relatedProjectSlug: 'kola-cafe',
    relatedProjectName: 'KOLA Café Brand Identity'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery',
    summary: 'Understand the business and the problem.',
    description: 'We do not rush into technology. We begin by listening to key stakeholders, reviewing your existing digital presence, and defining the precise commercial friction you are experiencing.',
    role: 'Led directly by GET AI leadership',
    deliverable: 'Problem definition and commercial baseline'
  },
  {
    number: '02',
    title: 'Requirements',
    summary: 'Define what is actually needed.',
    description: 'We translate your business challenge into clear concise specifications. We strictly eliminate feature bloat and trend chasing to identify the leanest most effective technical scope.',
    role: 'GET AI solutions architecture',
    deliverable: 'Functional specification and scope blueprint'
  },
  {
    number: '03',
    title: 'Solution',
    summary: 'Choose the right solution.',
    description: 'We determine the ideal technical architecture, design system, and execution path. If a simple static website solves the problem, we recommend that over costly complex stacks.',
    role: 'GET AI technical strategy',
    deliverable: 'Architecture roadmap and specialist selection'
  },
  {
    number: '04',
    title: 'Execution',
    summary: 'Work with the right specialist.',
    description: 'GET AI matches the scoped work to vetted specialized external engineers and designers tailored for that exact domain, managing all day to day coordination.',
    role: 'Coordinated specialist execution under GET AI supervision',
    deliverable: 'Active development and interface crafting'
  },
  {
    number: '05',
    title: 'Quality Control',
    summary: 'GET AI reviews the work.',
    description: 'Before any work is presented to you, GET AI conducts thorough quality control. We audit code quality, cross device responsiveness, speed, and alignment with original business requirements.',
    role: 'Strict internal GET AI quality review',
    deliverable: 'Quality verification audit and staging review'
  },
  {
    number: '06',
    title: 'Delivery',
    summary: 'Deliver the completed solution.',
    description: 'We deploy the vetted solution, configure production domains and security, provide walkthrough documentation, and ensure everything functions smoothly.',
    role: 'GET AI managed handover and rollout',
    deliverable: 'Live deployment, documentation and post launch check'
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'primefit',
    slug: 'primefit',
    name: 'PrimeFit Studio',
    category: 'Business Website and Web Development',
    type: 'Portfolio Project',
    status: 'Portfolio Project',
    coverImage: '/portfolio/primefit/home-page-design.png',
    description: 'A mobile first business website designed around customer discovery, class schedules, memberships, and enquiries.',
    overview: 'GET AI Agency designed and developed a fitness studio website MVP to demonstrate its web development process, business thinking, and client delivery workflow. The concept specifically targets university students and young professionals in Sri Lanka.',
    problem: 'Fitness businesses often lose potential members because their websites bury schedule details, load slowly, or force users to navigate complex forms on mobile devices. Customers repeatedly asked for basic information that was difficult to find.',
    approach: 'We designed an ultra clean, high contrast layout that prioritizes immediate class schedule clarity, transparent membership tiers, direct location details, and a frictionless WhatsApp enquiry pathway.',
    features: [
      'Interactive class schedule with filters',
      'Structured membership plans comparison',
      'Website enquiry form with WhatsApp contact option',
      'FAQ and quick information section',
      'Studio facilities and amenities showcase',
      'Mobile friendly contact, map and operating hours'
    ],
    technology: [
      'React',
      'Vite',
      'TypeScript',
      'Tailwind CSS'
    ],
    handledByGetAi: [
      'CEO: Discussed business problem, client requirements, and UX goals',
      'CEO: Prepared proposal and coordinated project deliverables',
      'CEO: Reviewed code quality, responsive validation, and final checks',
      'Web Developer: Implemented component architecture and interactive filters',
      'Web Developer: Optimized mobile performance and touch targets'
    ],
    githubUrl: 'https://github.com/Sachithraoshan/primefit-studio-website',
    liveUrl: '',
    visualTheme: 'High contrast athletic typography with clean tabular schedule blocks',
    gallerySections: [
      {
        title: 'Home Page Design',
        image: '/portfolio/primefit/home-page-design.png',
        caption: 'Focused hero and brand presentation',
        description: 'Clean typography pairing with instant calls to action for class booking and membership review.'
      },
      {
        title: 'Class Schedule Matrix',
        image: '/portfolio/primefit/schedule-design.png',
        caption: 'Fast daily class filters',
        description: 'Enables visitors to toggle between morning, afternoon, and evening training sessions in one tap without page reloads.'
      },
      {
        title: 'Membership Tiers',
        image: '/portfolio/primefit/membership-design.png',
        caption: 'Transparent rate cards',
        description: 'Presents monthly, quarterly, and personal coaching rates with unambiguous inclusions and no hidden charges.'
      },
      {
        title: 'Facilities Showcase',
        image: '/portfolio/primefit/facilities-page.png',
        caption: 'Studio amenities preview',
        description: 'High resolution layout highlighting training zones, equipment, lockers, and recovery areas.'
      },
      {
        title: 'About PrimeFit',
        image: '/portfolio/primefit/about-us-page.png',
        caption: 'Brand mission and trainer profiles',
        description: 'Establishes studio credibility and introduces certified strength and conditioning coaches.'
      },
      {
        title: 'Booking and Intake',
        image: '/portfolio/primefit/booking-page.png',
        caption: 'Streamlined trial session booking',
        description: 'Simple form allowing prospective members to reserve a trial session with zero friction.'
      },
      {
        title: 'Mobile Viewport Experience',
        image: '/portfolio/primefit/mobile-design.png',
        caption: 'Flawless smartphone layout',
        description: 'Optimized touch navigation and card stacking tested across standard mobile viewports.'
      },
      {
        title: 'FAQ and Quick Information',
        image: '/portfolio/primefit/faq.png',
        caption: 'Direct answers to frequent customer questions',
        description: 'Eliminates repetitive calls by addressing lockers, parking, cancellations, and trial classes upfront.'
      }
    ]
  },
  {
    id: 'lankacare',
    slug: 'lankacare',
    name: 'LankaCare Dental Clinic',
    category: 'AI Powered Web Application',
    type: 'Portfolio Project',
    status: 'Portfolio Project',
    coverImage: '/portfolio/lankacare/home-page-screenshot-2026-09-15-232653.png',
    description: 'An AI powered healthcare web application combining dental service information, online appointment booking, and an intelligent AI assistant.',
    overview: 'LankaCare Dental Clinic is a specialized medical web concept created to modernize clinical appointment booking and patient triage. The design eliminates clinical anxiety through serene typography, clear procedure pricing, and an intelligent guidance experience.',
    problem: 'Dental clinics experience overwhelmed front desks due to repetitive patient calls regarding doctor specialties, consultation charges, and available time slots. Service information is difficult to access, and the appointment booking process is manual and slow.',
    approach: 'We established an accessible clinical interface with transparent service guides, upfront consultation expectations, an online appointment calendar, and an AI chatbot that answers patient queries 24/7 before appointment booking.',
    features: [
      'Comprehensive dental treatments and pricing index',
      'Interactive online appointment calendar and booking system',
      'AI chatbot assistant for symptom guidance and triage',
      'Clinic admin dashboard for appointment and patient tracking',
      'Responsive design optimized for mobile and desktop',
      'Direct WhatsApp and emergency contact integration'
    ],
    technology: [
      'React',
      'Vite',
      'TypeScript',
      'Tailwind CSS',
      'AI Assistant Logic'
    ],
    handledByGetAi: [
      'Patient journey mapping and triage workflow design',
      'Clinical service hierarchy and transparent pricing layout',
      'Interactive appointment booking calendar design',
      'AI assistant prompt design and knowledge base preparation',
      'Clinic admin management console development',
      'Cross device mobile testing and validation'
    ],
    githubUrl: 'https://github.com/Sachithraoshan/lankacare-dental-clinic-ai-webapp',
    liveUrl: '',
    visualTheme: 'Crisp medical minimalist typography with patient first navigation',
    gallerySections: [
      {
        title: 'Clinic Home Page',
        image: '/portfolio/lankacare/home-page-screenshot-2026-09-15-232653.png',
        caption: 'Welcoming medical interface',
        description: 'Clear value proposition, emergency contact access, and immediate consultation booking button.'
      },
      {
        title: 'Dental Treatments & Pricing',
        image: '/portfolio/lankacare/service-page-screenshot-2026-09-15-233048.png',
        caption: 'Transparent clinical care index',
        description: 'Details preventative dentistry, cosmetic procedures, orthodontics, and restorative treatments with clear fee estimates.'
      },
      {
        title: 'Online Appointment Booking',
        image: '/portfolio/lankacare/booking-page-screenshot-2026-09-15-233824.png',
        caption: 'Direct calendar reservation',
        description: 'Multi step booking form letting patients select preferred dentist, date, time slot, and reason for consultation.'
      },
      {
        title: 'AI Chatbot Assistant',
        image: '/portfolio/lankacare/ai-chatbot-agent-screenshot-2026-09-16-000215.png',
        caption: '24/7 intelligent patient assistance',
        description: 'Conversational agent answering patient questions regarding opening hours, treatment costs, and preparation steps.'
      },
      {
        title: 'Clinic Admin Dashboard',
        image: '/portfolio/lankacare/admin-dashboard-screenshot-2026-09-16-001908.png',
        caption: 'Back office appointment management',
        description: 'Internal management view showing daily bookings, doctor schedules, patient contact lists, and status updates.'
      },
      {
        title: 'Mobile Patient Experience',
        image: '/portfolio/lankacare/mobile-version-screenshot-2026-09-16-000336.png',
        caption: 'Optimized smartphone accessibility',
        description: 'Ensures patients in dental discomfort can easily locate emergency numbers and book visits on their phones.'
      }
    ]
  },
  {
    id: 'novawear',
    slug: 'novawear',
    name: 'NOVAWEAR Retail Sales Intelligence',
    category: 'Data Analytics and Intelligence',
    type: 'Portfolio Project',
    status: 'Portfolio Project',
    coverImage: '/portfolio/novawear/dashboard-screenshot.png',
    description: 'A six month sales analytics project turning 773 order records into an executive management dashboard with revenue, product, category, and sales channel intelligence.',
    overview: 'NOVAWEAR is an apparel retail brand operating across a physical store and digital social channels in Sri Lanka. GET AI ingested six months of order level transaction data, cleaned and validated every record, calculated net revenue after discounts, and produced a plain language executive dashboard.',
    problem: 'Management had six months of sales data across multiple spreadsheets but could not determine which products were actually profitable, which categories made the most money, how online channels compared to the physical store, or where marketing budgets should be allocated.',
    approach: 'We cleaned and validated 773 sales rows with zero data loss, computed net revenue, average order value, and channel distributions, then synthesized findings into an executive dashboard with exact business actions.',
    features: [
      'Net Revenue, Order Count, and AOV calculations',
      'Monthly sales trend tracking across 6 months',
      'Product level and category level contribution analysis',
      'Channel performance breakdown (Store vs Instagram vs Facebook)',
      'Management summary with two clear business insights and actions',
      'Interactive executive visual dashboard'
    ],
    technology: [
      'Data Cleaning Pipeline',
      'Statistical Analysis',
      'Executive KPI Dashboard',
      'Excel & Business Intelligence Modeling'
    ],
    handledByGetAi: [
      'Data cleaning: Trimmed fields, verified date formats, checked duplicates and missing values',
      'Financial validation: Added Gross Sales, Discount Amount, and Net Revenue calculations',
      'Channel analysis: Compared Physical Store, Instagram, and Facebook revenue and margins',
      'Executive dashboard design with intuitive chart layouts',
      'Formulation of two specific, actionable management recommendations'
    ],
    liveUrl: '',
    visualTheme: 'High contrast executive dashboard with crisp tabular metrics and data visualization',
    metrics: [
      {
        label: 'Net Revenue',
        value: 'LKR 3,035,014',
        note: 'Calculated after discounts across 6 months'
      },
      {
        label: 'Distinct Orders',
        value: '570',
        note: '773 individual line items validated'
      },
      {
        label: 'Units Sold',
        value: '995',
        note: 'Across all apparel categories'
      },
      {
        label: 'Average Order Value',
        value: 'LKR 5,325',
        note: 'Highest on Instagram (LKR 5,631)'
      }
    ],
    insights: [
      'Online channels (Instagram and Facebook) generated 55.5% of total net revenue. Instagram was the single strongest channel with the highest Average Order Value of LKR 5,631.',
      'Women Bottoms was the highest revenue category at LKR 520,387, while Women Tops (LKR 183,772) and Women T-Shirts (LKR 202,562) were the weakest categories by revenue.'
    ],
    actions: [
      'Increase marketing budget allocation to Instagram campaigns and test scalable ad sets while continuously monitoring revenue and Average Order Value.',
      'Create curated outfit bundles pairing underperforming women tops with strong women bottoms products to lift inventory velocity and average basket size.'
    ],
    gallerySections: [
      {
        title: 'Executive Sales Dashboard',
        image: '/portfolio/novawear/dashboard-screenshot.png',
        caption: 'Management KPI dashboard',
        description: 'High contrast visual interface consolidating revenue, order trends, category shares, and top performing product lists.'
      }
    ]
  },
  {
    id: 'kola-cafe',
    slug: 'kola-cafe',
    name: 'KOLA Café Brand and Design System',
    category: 'Brand and Graphic Design',
    type: 'Portfolio Project',
    status: 'Portfolio Project',
    coverImage: '/portfolio/kola-cafe/logo-logo.png',
    description: 'A complete visual identity and marketing design system for a modern Sri Lankan café, including logo, menus, posters, and social media post templates.',
    overview: 'KOLA Café is a modern Sri Lankan café concept created to demonstrate GET AI graphic design and visual identity capabilities. The project focused on building a consistent, minimal, and professional brand system appealing directly to young professionals and university students.',
    problem: 'The café faced three core commercial challenges: no consistent brand identity, an amateurish and disjointed social media presence, and difficulty standing out from competing coffee shops in Colombo.',
    approach: 'We defined a modern, new-gen, minimal visual direction before creating assets. We crafted a distinctive logo, standardized typography and earth tone color palettes, designed print ready menus and promotional posters, and produced an aligned social media kit.',
    features: [
      'Original minimalist logo and brand mark',
      'Cohesive brand color palette and typography rules',
      'Dual menu system (Coffee & Food, Desserts & Beverages)',
      'High impact promotional posters for store display',
      'Instagram social media post templates with consistent layout',
      'Full brand guidelines documentation'
    ],
    technology: [
      'Vector Identity Design',
      'Print Production Layout',
      'Social Media Template Systems',
      'Typography Hierarchy Architecture'
    ],
    handledByGetAi: [
      'Brand discovery and competitor visual audit in Sri Lanka',
      'Logo design and vector geometry generation',
      'Menu information architecture and legibility testing',
      'Promotional poster layout for in store display',
      'Social media content grid and template design',
      'Brand consistency delivery pack'
    ],
    liveUrl: '',
    visualTheme: 'Minimalist earth tone typography with clean spatial composition',
    gallerySections: [
      {
        title: 'Brand Identity and Logo',
        image: '/portfolio/kola-cafe/logo-logo.png',
        caption: 'Clean modern café brand mark',
        description: 'Minimalist emblem combining clean lines with warm hospitality warmth.'
      },
      {
        title: 'Artisan Coffee and Food Menu',
        image: '/portfolio/kola-cafe/menu-design-menu-design-1.png',
        caption: 'Print ready café menu design',
        description: 'Structured layout featuring espresso drinks, cold brews, all day breakfast, and artisan sandwiches.'
      },
      {
        title: 'Desserts and Specialty Beverage Menu',
        image: '/portfolio/kola-cafe/menu-design-menu-design-2.png',
        caption: 'Complementary menu design',
        description: 'Clear pricing, portion details, and dietary callouts with elegant typography.'
      },
      {
        title: 'In Store Promotional Poster 1',
        image: '/portfolio/kola-cafe/promotional-poster-promotional-poster-1.png',
        caption: 'Signature blend promotional display',
        description: 'Eye catching poster crafted for window displays and counter stands.'
      },
      {
        title: 'In Store Promotional Poster 2',
        image: '/portfolio/kola-cafe/promotional-poster-promotional-poster-2.png',
        caption: 'Seasonal launch promotional poster',
        description: 'High contrast visual composition communicating seasonal menu additions.'
      },
      {
        title: 'Social Media Post: Coffee Culture',
        image: '/portfolio/kola-cafe/social-media-post-post-1.png',
        caption: 'Instagram feed template',
        description: 'Curated square format highlighting single origin bean stories and brewing precision.'
      },
      {
        title: 'Social Media Post: Ambiance and Workspace',
        image: '/portfolio/kola-cafe/social-media-post-post-2.png',
        caption: 'Lifestyle social post template',
        description: 'Appealing imagery framing the café as the premier remote work haven for young creators.'
      },
      {
        title: 'Social Media Post: Weekend Specials',
        image: '/portfolio/kola-cafe/social-media-post-post-3.png',
        caption: 'Promotional social post template',
        description: 'Vibrant graphic driving weekend foot traffic with limited edition bakery pairings.'
      }
    ]
  },
  {
    id: 'learnup-academy',
    slug: 'learnup-academy',
    name: 'LearnUp Academy AI Voice Demo',
    category: 'AI Voice Solutions',
    type: 'Portfolio Project',
    status: 'Portfolio Project',
    coverImage: '/portfolio/learnup/voice-over-1.mp3',
    description: 'An educational AI voice narration project demonstrating how synthetic voice technology delivers consistent, engaging voiceovers for online learning content.',
    overview: 'GET AI created an educational AI voice demonstration for LearnUp Academy to show how AI powered narration can support digital learning content. The voice direction was specifically calibrated to sound friendly, energetic, clear, and engaging for students and young professionals.',
    problem: 'Educational content creators need frequent voiceovers for short videos and micro-learning modules. Recording every video manually with voice actors requires significant coordination, expensive studio time, and lengthy retakes whenever curriculum updates occur.',
    approach: 'We developed two educational narration scripts covering foundational Computer Science concepts, selected an optimal synthetic voice profile, and synthesized professional 30 second audio demos ready for digital video integration.',
    features: [
      'Two professional English AI voiceover audio demos',
      'Friendly, energetic, and articulate speech delivery',
      'Computer Science Basics educational scripts',
      'Audio player integration for instant browser preview',
      'Strict voice ethics and authorized model usage guidelines',
      'Scalable production workflow for digital courses'
    ],
    technology: [
      'AI Neural Voice Synthesis',
      'Audio Mastering and Normalization',
      'Educational Scriptwriting',
      'Digital Audio Delivery'
    ],
    handledByGetAi: [
      'Content requirement analysis and audience calibration',
      'Scriptwriting for 30 second educational micro modules',
      'Voice model selection prioritizing clarity and natural pacing',
      'Audio post processing and level normalization',
      'Ethics compliance: strictly synthetic voice, no unauthorized cloning'
    ],
    liveUrl: '',
    visualTheme: 'Sound wave visualization and interactive audio player',
    audioDemos: [
      {
        title: 'Voice Demo 01',
        scriptTitle: 'What is Computer Science?',
        audioUrl: '/portfolio/learnup/voice-over-1.mp3',
        duration: '0:30',
        description: 'Computer science is more than just using computers. It is the study of how we solve problems using technology and logical thinking. From websites and mobile apps to artificial intelligence and cybersecurity, computer science is behind much of the technology we use every day. And the best part? You do not need to be a genius to start. You just need curiosity, practice, and the willingness to learn.'
      },
      {
        title: 'Voice Demo 02',
        scriptTitle: 'Why Learn Programming?',
        audioUrl: '/portfolio/learnup/voice-over-2.mp3',
        duration: '0:30',
        description: 'Programming is the language of modern creation. When you learn to code, you gain the power to build software, automate repetitive tasks, and bring ideas to life from anywhere in the world. Whether you want to launch a startup, analyze complex business data, or build intelligent systems, programming gives you the practical tools to solve real problems.'
      }
    ],
    gallerySections: [
      {
        title: 'AI Audio Narration 01: What is Computer Science?',
        caption: 'Demo voiceover 1',
        description: 'Friendly, energetic male synthetic voice explaining core computing concepts for modern learners.'
      },
      {
        title: 'AI Audio Narration 02: Why Learn Programming?',
        caption: 'Demo voiceover 2',
        description: 'Articulate educational delivery designed to motivate prospective students in digital skills.'
      }
    ]
  }
];

export const WHY_GET_AI_PILLARS: WhyPillar[] = [
  {
    title: 'Problem First',
    summary: 'We start with the business problem.',
    detail: 'We never push technology for the sake of trends. Every project begins with a root cause diagnosis of your business challenge before a single line of code or design file is touched.'
  },
  {
    title: 'Practical',
    summary: 'We avoid unnecessary complexity.',
    detail: 'If a lightweight static website or streamlined dashboard solves your problem, we will not burden your business with expensive fragile over engineering.'
  },
  {
    title: 'Managed',
    summary: 'GET AI coordinates the project and specialists.',
    detail: 'You do not have to manage multiple freelancers, interpret technical jargon, or referee miscommunications. GET AI acts as your single accountable partner from start to finish.'
  },
  {
    title: 'Quality Control',
    summary: 'Work is reviewed before delivery.',
    detail: 'All deliverables undergo rigorous verification by GET AI including speed benchmarking, responsive device validation, and security reviews before reaching your hands.'
  },
  {
    title: 'Honest',
    summary: 'We clearly show what is a concept, prototype or production project.',
    detail: 'We never mislead clients with fake statistics, fabricated testimonials, or exaggerated team claims. Our integrity and transparency are absolute.'
  },
  {
    title: 'Business Focus',
    summary: 'Technology should serve a clear business purpose.',
    detail: 'We evaluate success strictly by business outcomes: customer clarity, operational time saved, improved credibility, and frictionless user conversions.'
  }
];

export const AGENCY_CONTACT_INFO = {
  company: 'GET AI AGENCY',
  tagline: 'AI Solutions. Real Problems. Practical Results.',
  founder: 'Sachithra Oshan',
  title: 'Founder and CEO',
  email: 'hello@getai.com.lk',
  founderEmail: 'sachithraoshan769@gmail.com',
  phone: '+94 775768237',
  domain: 'getai.com.lk',
  location: 'Colombo, Sri Lanka'
};
