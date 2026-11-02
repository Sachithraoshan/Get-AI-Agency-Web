import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/agencyData.ts';
import { useRouter } from '../utils/router.tsx';
import { ArrowUpRight, Github, ExternalLink, ShieldAlert, Laptop, Volume2, TrendingUp, Palette, Phone } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Dynamic list of unique categories
  const categories = [
    'All',
    'Business Website and Web Development',
    'AI Powered Web Application',
    'Data Analytics and Intelligence',
    'Brand and Graphic Design',
    'AI Voice Solutions'
  ];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  const getProjectIcon = (category: string) => {
    if (category.includes('Voice')) return <Volume2 className="w-3.5 h-3.5 text-neutral-600" />;
    if (category.includes('Analytics')) return <TrendingUp className="w-3.5 h-3.5 text-neutral-600" />;
    if (category.includes('Brand') || category.includes('Design')) return <Palette className="w-3.5 h-3.5 text-neutral-600" />;
    return <Laptop className="w-3.5 h-3.5 text-neutral-600" />;
  };

  return (
    <div className="pt-28 pb-24 md:pt-36 md:pb-32 bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 border border-neutral-200 text-[11px] font-semibold tracking-widest uppercase text-neutral-700 mb-4 rounded-xs">
            Selected Projects
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black mb-4">
            Projects built around real problems.
          </h1>
          
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            A selection of websites, web applications, data analytics dashboards, graphic design systems, and AI voice solutions created by GET AI.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-neutral-200">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-black text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Transparency Banner: Zero Fake Claims */}
        <div className="bg-neutral-50 border border-neutral-200 p-5 rounded-xs mb-12 flex items-start gap-3.5">
          <ShieldAlert className="w-5 h-5 text-neutral-700 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-neutral-700 leading-relaxed">
            <strong className="font-semibold text-black uppercase tracking-wider block sm:inline mr-2">
              Transparency Standard:
            </strong>
            The projects below are dedicated portfolio projects and functional demonstrations. In accordance with GET AI policy, we clearly show the scope, architecture, and technology without fabricated claims.
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group bg-white border border-neutral-200 hover:border-black rounded-sm p-6 sm:p-7 flex flex-col justify-between transition-all hover:shadow-md"
            >
              <div>
                {/* Visual Representation Window Header */}
                <div className="bg-neutral-100 border border-neutral-200 rounded-xs overflow-hidden mb-6 group-hover:border-neutral-400 transition-colors">
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 px-3 py-2 border-b border-neutral-200 bg-neutral-50">
                    <div className="flex items-center gap-1.5">
                      {getProjectIcon(project.category)}
                      <span className="truncate max-w-[160px]">{project.category}</span>
                    </div>
                    <span className="font-bold text-neutral-700 uppercase">{project.type}</span>
                  </div>

                  {/* Real Image or Audio Preview */}
                  {project.coverImage && !project.coverImage.endsWith('.mp3') ? (
                    <div 
                      className="h-44 bg-neutral-200 overflow-hidden cursor-pointer"
                      onClick={() => navigate(`/projects/${project.slug}`)}
                    >
                      <img
                        src={project.coverImage}
                        alt={project.name}
                        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-103"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div 
                      className="h-44 flex flex-col justify-center items-center text-center p-4 bg-neutral-900 text-white cursor-pointer"
                      onClick={() => navigate(`/projects/${project.slug}`)}
                    >
                      <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center mb-3">
                        <Volume2 className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider">
                        {project.name}
                      </span>
                      <span className="text-[10px] text-neutral-400 mt-1">
                        Listen to 2 AI Audio Demos
                      </span>
                    </div>
                  )}
                </div>

                {/* Project Meta and Title */}
                <div className="mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                    {project.category}
                  </span>
                  <h2 
                    onClick={() => navigate(`/projects/${project.slug}`)}
                    className="text-2xl font-bold tracking-tight text-black group-hover:underline cursor-pointer"
                  >
                    {project.name}
                  </h2>
                </div>

                {/* Short Description */}
                <p className="text-xs text-neutral-600 leading-relaxed mb-6 font-normal">
                  {project.description}
                </p>

                {/* Key Technology List */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technology.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono uppercase bg-neutral-100 px-2 py-0.5 rounded-xs text-neutral-700 border border-neutral-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions: View Case Study (Primary), Live Preview (Only if exists), GitHub (Optional) */}
              <div className="pt-4 border-t border-neutral-100 flex flex-col gap-2.5">
                <button
                  onClick={() => navigate(`/projects/${project.slug}`)}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-neutral-300 hover:border-black text-[11px] font-semibold uppercase tracking-wider text-black rounded-xs transition-colors"
                    >
                      <span>Live Preview</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : null}

                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-neutral-200 hover:border-neutral-400 text-[11px] font-semibold uppercase tracking-wider text-neutral-700 hover:text-black rounded-xs transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Consultation CTA Banner */}
        <div className="mt-20 bg-neutral-50 border border-neutral-200 rounded-sm p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-black mb-1">
              Looking for a practical digital solution for your business?
            </h3>
            <p className="text-xs text-neutral-600 max-w-xl leading-relaxed">
              Explore how our managed service model delivers tailored digital solutions without bloated budgets or technical complexity.
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
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-800 transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
