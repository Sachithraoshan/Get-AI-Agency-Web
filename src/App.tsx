/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { RouterProvider, useRouter } from './utils/router.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { ProjectsPage } from './pages/ProjectsPage.tsx';
import { CaseStudyPage } from './pages/CaseStudyPage.tsx';
import { ServicePage } from './pages/ServicePage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { NotFoundPage } from './pages/NotFoundPage.tsx';
import { AdminDashboard } from './pages/admin/AdminDashboard.tsx';
import { AdminLogin } from './pages/admin/AdminLogin.tsx';
import { ChatBot } from './components/ChatBot.tsx';
import { PROJECTS_DATA, SERVICES_DATA } from './data/agencyData.ts';
import { isAuthorizedAdmin } from './config/admin.ts';

function AppContent() {
  const { path, navigate } = useRouter();

  // Admin authentication session state
  const [adminUser, setAdminUser] = useState<string | null>(() => {
    try {
      const stored = sessionStorage.getItem('getai_admin_email');
      return stored && isAuthorizedAdmin(stored) ? stored : null;
    } catch {
      return null;
    }
  });

  const handleAdminLogin = (email: string) => {
    try {
      sessionStorage.setItem('getai_admin_email', email);
    } catch {
      // ignore
    }
    setAdminUser(email);
  };

  const handleAdminLogout = () => {
    try {
      sessionStorage.removeItem('getai_admin_email');
    } catch {
      // ignore
    }
    setAdminUser(null);
  };

  // Check if current route is /admin
  const isAdminRoute = path === '/admin' || path.startsWith('/admin');

  // Dynamic route resolution
  let currentPage = <HomePage />;
  let pageTitle = 'GET AI Agency | Web Design and Digital Solutions in Sri Lanka';
  let metaDescription = 'GET AI helps Sri Lankan businesses solve practical digital problems through custom websites, website redesign, speed optimization, business dashboards, and brand consistency.';
  let canonicalUrl = 'https://getai.com.lk/';
  let shouldIndex = true;

  if (isAdminRoute) {
    pageTitle = 'Admin Console | GET AI Agency';
    metaDescription = 'Private GET AI Lead Management Console';
    canonicalUrl = 'https://getai.com.lk/admin';
    shouldIndex = false;

    currentPage = adminUser ? (
      <AdminDashboard
        adminEmail={adminUser}
        onLogout={handleAdminLogout}
        onReturnToSite={() => navigate('/')}
      />
    ) : (
      <AdminLogin
        onLoginSuccess={handleAdminLogin}
        onReturnToSite={() => navigate('/')}
      />
    );
  } else if (path === '/' || path === '') {
    currentPage = <HomePage />;
    pageTitle = 'GET AI Agency | Web Design and Digital Solutions in Sri Lanka';
    metaDescription = 'GET AI helps Sri Lankan businesses solve practical digital problems through custom websites, website redesign, speed optimization, business dashboards, and brand consistency.';
    canonicalUrl = 'https://getai.com.lk/';
  } else if (path === '/projects') {
    currentPage = <ProjectsPage />;
    pageTitle = 'Selected Projects | GET AI Agency';
    metaDescription = 'Explore verified portfolio projects, web applications, data dashboards, and brand design systems created by GET AI in Sri Lanka.';
    canonicalUrl = 'https://getai.com.lk/projects';
  } else if (path.startsWith('/projects/')) {
    const slug = path.replace('/projects/', '').split('/')[0];
    const foundProject = PROJECTS_DATA.find((p) => p.slug === slug);
    if (foundProject) {
      currentPage = <CaseStudyPage project={foundProject} allProjects={PROJECTS_DATA} />;
      pageTitle = `${foundProject.name} Case Study | GET AI Agency`;
      metaDescription = foundProject.description;
      canonicalUrl = `https://getai.com.lk/projects/${foundProject.slug}`;
    } else {
      currentPage = <NotFoundPage />;
      pageTitle = 'Page Not Found | GET AI Agency';
      canonicalUrl = 'https://getai.com.lk/404';
      shouldIndex = false;
    }
  } else if (path.startsWith('/services/')) {
    const slug = path.replace('/services/', '').split('/')[0];
    const foundService = SERVICES_DATA.find((s) => s.slug === slug);
    if (foundService) {
      currentPage = <ServicePage service={foundService} allServices={SERVICES_DATA} />;
      pageTitle = foundService.seoTitle;
      metaDescription = foundService.metaDescription;
      canonicalUrl = `https://getai.com.lk/services/${foundService.slug}`;
    } else {
      currentPage = <NotFoundPage />;
      pageTitle = 'Page Not Found | GET AI Agency';
      canonicalUrl = 'https://getai.com.lk/404';
      shouldIndex = false;
    }
  } else if (path === '/contact') {
    currentPage = <ContactPage />;
    pageTitle = 'Start a Project | GET AI Agency';
    metaDescription = 'Contact GET AI Agency. Call our hotline at +94 775768237 or submit an enquiry to discuss your website, performance, or dashboard needs in Sri Lanka.';
    canonicalUrl = 'https://getai.com.lk/contact';
  } else {
    currentPage = <NotFoundPage />;
    pageTitle = 'Page Not Found | GET AI Agency';
    canonicalUrl = 'https://getai.com.lk/404';
    shouldIndex = false;
  }

  // Synchronize document metadata and canonical link
  useEffect(() => {
    document.title = pageTitle;

    // Update meta description
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', metaDescription);

    // Update OpenGraph Title & Description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', pageTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', metaDescription);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

    // Update Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', shouldIndex ? 'index, follow' : 'noindex, nofollow');

    // Optional Google Analytics trigger if window.gtag exists and ID configured
    const gaId = (import.meta as unknown as { env?: { GA_MEASUREMENT_ID?: string } }).env?.GA_MEASUREMENT_ID;
    const win = window as unknown as { gtag?: (cmd: string, id: string, params: object) => void };
    if (gaId && typeof win.gtag === 'function') {
      win.gtag('config', gaId, {
        page_path: path,
        page_title: pageTitle
      });
    }
  }, [pageTitle, metaDescription, canonicalUrl, path, shouldIndex]);

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-neutral-100 text-black flex flex-col font-sans">
        {currentPage}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans selection:bg-black selection:text-white">
      {/* Fixed Navigation Bar with Hotline */}
      <Navbar />

      {/* Routed Page */}
      <main id="main-content" className="flex-grow">
        {currentPage}
      </main>

      {/* Global Footer with Hotline & Public Links */}
      <Footer />

      {/* Floating GET AI Assistant */}
      <ChatBot />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
