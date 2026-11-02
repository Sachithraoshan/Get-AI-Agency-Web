import React from 'react';
import { PROJECTS_DATA } from '../data/agencyData.ts';
import { useRouter } from '../utils/router.tsx';
import { ArrowUpRight, Github, ExternalLink, ArrowRight, Laptop, Volume2, TrendingUp, Palette } from 'lucide-react';

export const PortfolioSection: React.FC = () => {
  const { navigate } = useRouter();

  // Show top 3 on the home page showcase, with button to view all on /projects
  const featuredProjects = PROJECTS_DATA.slice(0, 3);

  const getProjectIcon = (category: string) => {
    if (category.includes('Voice')) return <Volume2 className="w-3.5 h-3.5 text-neutral-600" />;
    if (category.includes('Analytics')) return <TrendingUp className="w-3.5 h-3.5 text-neutral-600" />;
    if (category.includes('Brand') || category.includes('Design')) return <Palette className="w-3.5 h-3.5 text-neutral-600" />;
    return <Laptop className="w-3.5 h-3.5 text-neutral-600" />;
  };

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black mb-4">
              Selected Projects.
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed font-normal">
              A selection of websites, web applications, and data analytics dashboards created by GET AI.
            </p>
          </div>

          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-black hover:underline cursor-pointer self-start md:self-auto"
          >
            <span>View All 5 Projects</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className="group bg-white border border-neutral-200 hover:border-black rounded-sm p-6 sm:p-7 flex flex-col justify-between transition-all hover:shadow-md"
            >
              <div>
                {/* Visual Architecture Window Header */}
                <div className="bg-neutral-100 border border-neutral-200 rounded-xs overflow-hidden mb-6 group-hover:border-neutral-400 transition-colors">
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 px-3 py-2 border-b border-neutral-200 bg-neutral-50">
                    <div className="flex items-center gap-1.5">
                      {getProjectIcon(project.category)}
                      <span className="truncate max-w-[140px]">{project.category}</span>
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
                        Listen to AI Voice Demos
                      </span>
                    </div>
                  )}
                </div>

                {/* Project Title and Category */}
                <div className="mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                    {project.category}
                  </span>
                  <h3 
                    onClick={() => navigate(`/projects/${project.slug}`)}
                    className="text-xl font-bold tracking-tight text-black group-hover:underline cursor-pointer"
                  >
                    {project.name}
                  </h3>
                </div>

                {/* Short Description */}
                <p className="text-xs text-neutral-600 leading-relaxed mb-6 font-normal">
                  {project.description}
                </p>

                {/* Technology Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technology.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono uppercase bg-neutral-100 px-2 py-0.5 rounded-xs text-neutral-700 border border-neutral-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions: Primary View Case Study, Secondary GitHub/Live */}
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

        {/* View All Projects Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-100 hover:bg-neutral-200 text-black text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
          >
            <span>Explore All 5 Projects and Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
