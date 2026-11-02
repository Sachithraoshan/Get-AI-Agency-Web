import React, { useState } from 'react';
import { ProjectItem } from '../types/index.ts';
import { useRouter } from '../utils/router.tsx';
import { AudioPlayer } from '../components/AudioPlayer.tsx';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Github, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  TrendingUp, 
  Lightbulb, 
  CheckSquare, 
  Maximize2, 
  X,
  Volume2,
  Phone
} from 'lucide-react';

interface CaseStudyPageProps {
  project: ProjectItem;
  allProjects: ProjectItem[];
}

export const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ project, allProjects }) => {
  const { navigate } = useRouter();
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Find next and previous projects
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  return (
    <div className="pt-28 pb-24 md:pt-36 md:pb-32 bg-white text-black min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={() => navigate('/projects')}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-black mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </button>

        {/* Header Block */}
        <div className="border-b border-neutral-200 pb-8 mb-12">
          
          {/* Badges: Category & Status */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-neutral-100 border border-neutral-200 text-[11px] font-mono uppercase tracking-widest text-neutral-700 rounded-xs">
              {project.category}
            </span>
            <span className="px-3 py-1 bg-neutral-900 text-white text-[11px] font-mono uppercase tracking-widest rounded-xs">
              Status: {project.status}
            </span>
          </div>

          {/* Project Title */}
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-black mb-4">
            {project.name}
          </h1>

          {/* Short Subtitle / Purpose */}
          <p className="text-lg text-neutral-700 leading-relaxed max-w-3xl">
            {project.description}
          </p>

          {/* Action Links Bar */}
          <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-neutral-100">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-800 transition-colors"
              >
                <span>Live Preview</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : null}

            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black border border-neutral-300 hover:border-black text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Visit Project on GitHub</span>
              </a>
            ) : null}

            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-100 text-neutral-800 hover:text-black text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer ml-auto"
            >
              <span>Discuss Similar Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Hero Cover Image Preview (if image available) */}
        {project.coverImage && !project.coverImage.endsWith('.mp3') && (
          <div className="mb-14 bg-neutral-50 border border-neutral-200 rounded-sm overflow-hidden p-2 sm:p-4">
            <div className="relative group cursor-pointer" onClick={() => setActiveImage(project.coverImage!)}>
              <img
                src={project.coverImage}
                alt={project.name}
                className="w-full max-h-[520px] object-cover object-top rounded-xs border border-neutral-200 shadow-xs"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 text-xs font-mono uppercase tracking-wider">
                <Maximize2 className="w-4 h-4" />
                <span>Click to expand high resolution image</span>
              </div>
            </div>
            <div className="mt-3 px-2 flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span>Primary Project Architecture</span>
              <span>GET AI Agency Portfolio Archive</span>
            </div>
          </div>
        )}

        {/* Main Content Sections */}
        <div className="space-y-16">
          
          {/* Section 1: Project Overview */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">
              Overview
            </h2>
            <p className="text-base text-neutral-800 leading-relaxed">
              {project.overview}
            </p>
          </section>

          {/* Section 2: Problem and Approach Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-neutral-50 border border-neutral-200 p-6 sm:p-8 rounded-sm">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block mb-2">
                Challenge Diagnosis
              </span>
              <h2 className="text-xl font-bold tracking-tight text-black mb-3">
                The Problem
              </h2>
              <p className="text-xs text-neutral-700 leading-relaxed font-normal">
                {project.problem}
              </p>
            </div>

            <div className="bg-neutral-900 text-white p-6 sm:p-8 rounded-sm">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-2">
                Applied Execution
              </span>
              <h2 className="text-xl font-bold tracking-tight text-white mb-3">
                The Approach
              </h2>
              <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                {project.approach}
              </p>
            </div>
          </section>

          {/* Special Section: Quantitative Metrics (e.g. for NOVAWEAR) */}
          {project.metrics && project.metrics.length > 0 && (
            <section className="bg-neutral-50 border border-neutral-200 p-6 sm:p-8 rounded-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">
                <TrendingUp className="w-4 h-4 text-black" />
                <span>Validated Performance Metrics</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-black mb-6">
                Core Business Numbers
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="bg-white border border-neutral-200 p-4 rounded-xs">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-1">
                      {m.label}
                    </span>
                    <div className="text-xl sm:text-2xl font-bold text-black tracking-tight mb-1">
                      {m.value}
                    </div>
                    <span className="text-[11px] text-neutral-500 leading-tight block">
                      {m.note}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Special Section: Insights and Actions (e.g. for NOVAWEAR) */}
          {project.insights && project.actions && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-neutral-200 p-6 sm:p-8 rounded-sm bg-white">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">
                  <Lightbulb className="w-4 h-4 text-black" />
                  <span>Key Commercial Insights</span>
                </div>
                <h3 className="text-lg font-bold text-black mb-4">
                  What the Numbers Revealed
                </h3>
                <ul className="space-y-4">
                  {project.insights.map((insight, idx) => (
                    <li key={idx} className="text-xs text-neutral-700 leading-relaxed pl-4 border-l-2 border-black">
                      <strong className="text-black font-semibold block mb-1">Insight 0{idx + 1}:</strong>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-neutral-200 p-6 sm:p-8 rounded-sm bg-white">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">
                  <CheckSquare className="w-4 h-4 text-black" />
                  <span>Recommended Management Actions</span>
                </div>
                <h3 className="text-lg font-bold text-black mb-4">
                  Immediate Steps to Test
                </h3>
                <ul className="space-y-4">
                  {project.actions.map((action, idx) => (
                    <li key={idx} className="text-xs text-neutral-700 leading-relaxed pl-4 border-l-2 border-neutral-800">
                      <strong className="text-black font-semibold block mb-1">Action 0{idx + 1}:</strong>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Special Section: AI Voice Audio Demos (e.g. for LearnUp Academy) */}
          {project.audioDemos && project.audioDemos.length > 0 && (
            <section className="border border-neutral-200 p-6 sm:p-8 rounded-sm bg-neutral-50">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">
                <Volume2 className="w-4 h-4 text-black" />
                <span>Interactive Audio Demos</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-black mb-2">
                Listen to the AI Voiceover Demos
              </h3>
              <p className="text-xs text-neutral-600 mb-6 max-w-2xl">
                Click play below to experience the real synthetic voiceovers produced by GET AI for educational micro-learning content.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.audioDemos.map((demo, idx) => (
                  <AudioPlayer
                    key={idx}
                    title={demo.title}
                    scriptTitle={demo.scriptTitle}
                    audioUrl={demo.audioUrl}
                    duration={demo.duration}
                    description={demo.description}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Section 3: Visual Gallery and Real Project Screenshots */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
                  Visual Architecture
                </h2>
                <h3 className="text-2xl font-bold tracking-tight text-black">
                  Project Gallery and Assets
                </h3>
              </div>
              <span className="text-[11px] font-mono text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-xs">
                {project.gallerySections.length} Deliverables
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallerySections.map((sec, idx) => (
                <div
                  key={sec.title}
                  className="border border-neutral-200 bg-white rounded-sm p-4 sm:p-5 flex flex-col justify-between hover:border-black transition-all"
                >
                  <div>
                    {/* Visual Preview */}
                    <div className="bg-neutral-100 border border-neutral-200 rounded-xs mb-4 overflow-hidden">
                      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 px-3 py-2 border-b border-neutral-200 bg-neutral-50">
                        <span>Artifact 0{idx + 1}</span>
                        <span className="truncate max-w-[160px]">{sec.title}</span>
                      </div>

                      {sec.image ? (
                        <div 
                          className="relative group cursor-pointer bg-neutral-200 overflow-hidden"
                          onClick={() => setActiveImage(sec.image!)}
                        >
                          <img
                            src={sec.image}
                            alt={sec.title}
                            className="w-full h-56 object-cover object-top transition-transform duration-300 group-hover:scale-102"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 text-xs font-mono uppercase tracking-wider">
                            <Maximize2 className="w-4 h-4" />
                            <span>Expand Screenshot</span>
                          </div>
                        </div>
                      ) : (
                        <div className="h-44 flex flex-col justify-center items-center text-center px-4 bg-white border border-dashed border-neutral-300 m-3 rounded-xs">
                          <span className="text-xs font-bold text-black uppercase tracking-wider">
                            {sec.title}
                          </span>
                          <span className="text-[11px] text-neutral-500 mt-1">
                            {sec.caption}
                          </span>
                        </div>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-black mb-1">
                      {sec.title}
                    </h4>
                    <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                      {sec.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                    <span>{sec.caption}</span>
                    <span className="text-neutral-700 font-semibold">Verified Code</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-[11px] text-neutral-500 font-mono flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-neutral-400" />
              <span>Screenshots and architecture wireframes correspond strictly to real project code and deliverables.</span>
            </div>
          </section>

          {/* Section 4: Key Features and Technology Stack */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-neutral-200">
            
            {/* Key Features */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">
                <Layers className="w-4 h-4 text-black" />
                <span>Key Features Implemented</span>
              </div>
              <ul className="space-y-2.5">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-800">
                    <span className="font-mono text-neutral-400 mt-0.5">0{idx + 1}</span>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technology Stack */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">
                <Cpu className="w-4 h-4 text-black" />
                <span>Technology Stack</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technology.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-neutral-100 text-xs font-mono uppercase tracking-wider text-black border border-neutral-200 rounded-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Selected for optimal performance, maintainability, and rapid browser rendering without excess script dependencies.
              </p>
            </div>

          </section>

          {/* Section 5: What GET AI Handled */}
          <section className="bg-neutral-50 border border-neutral-200 p-6 sm:p-8 rounded-sm">
            <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">
              Responsibility Scope
            </h2>
            <h3 className="text-xl font-bold tracking-tight text-black mb-4">
              What GET AI Handled
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.handledByGetAi.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 bg-white border border-neutral-200 p-3 rounded-xs text-xs text-neutral-800">
                  <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Project Status and Honesty Policy */}
          <section className="border border-neutral-200 p-6 rounded-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                  Integrity Standard
                </span>
                <h4 className="text-sm font-bold text-black uppercase tracking-wider">
                  Status: {project.status}
                </h4>
                <p className="text-xs text-neutral-600 mt-1 max-w-xl">
                  This project was engineered as a portfolio project to showcase architecture, design discipline, and real world problem solving for this industry.
                </p>
              </div>
              <button
                onClick={() => navigate('/contact')}
                className="px-6 py-3 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-800 transition-colors whitespace-nowrap cursor-pointer"
              >
                Build Similar Solution
              </button>
            </div>
          </section>

        </div>

        {/* Consultation CTA Block */}
        <div className="mt-16 bg-neutral-50 border border-neutral-200 rounded-sm p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-black mb-1">
              Have a similar digital challenge?
            </h3>
            <p className="text-xs text-neutral-600 max-w-xl leading-relaxed">
              We evaluate your business requirements and review whether a practical digital solution fits your commercial goals.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-neutral-800">
              <a href="tel:+94775768237" className="inline-flex items-center gap-1.5 hover:text-black">
                <Phone className="w-3.5 h-3.5 text-neutral-500" />
                <span>Hotline: +94 775768237</span>
              </a>
              <span className="text-neutral-400">•</span>
              <a href="mailto:hello@getai.com.lk" className="hover:text-black">
                hello@getai.com.lk
              </a>
            </div>
          </div>
          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-800 transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Project Navigation Footer */}
        <div className="mt-16 pt-8 border-t border-neutral-200 flex items-center justify-between">
          <button
            onClick={() => navigate(`/projects/${prevProject.slug}`)}
            className="text-left group cursor-pointer"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
              Previous Project
            </span>
            <span className="text-xs sm:text-sm font-bold text-black group-hover:underline">
              ← {prevProject.name}
            </span>
          </button>

          <button
            onClick={() => navigate('/projects')}
            className="text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-black cursor-pointer px-4 py-2 border border-neutral-200 rounded-xs"
          >
            All Projects
          </button>

          <button
            onClick={() => navigate(`/projects/${nextProject.slug}`)}
            className="text-right group cursor-pointer"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
              Next Project
            </span>
            <span className="text-xs sm:text-sm font-bold text-black group-hover:underline">
              {nextProject.name} →
            </span>
          </button>
        </div>

      </div>

      {/* Lightbox Modal for High-Resolution Screenshots */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveImage(null)}
        >
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 text-white hover:text-neutral-300 p-2 bg-neutral-800 rounded-full cursor-pointer z-50"
            aria-label="Close image preview"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-6xl max-h-[90vh] overflow-auto bg-neutral-950 p-2 rounded-xs border border-neutral-800" onClick={(e) => e.stopPropagation()}>
            <img
              src={activeImage}
              alt="Expanded Preview"
              className="max-w-full max-h-[85vh] object-contain mx-auto rounded-xs"
            />
          </div>
        </div>
      )}

    </div>
  );
};
