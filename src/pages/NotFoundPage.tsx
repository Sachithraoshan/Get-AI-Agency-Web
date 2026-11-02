import React from 'react';
import { useRouter } from '../utils/router.tsx';
import { ArrowUpRight, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-white text-black px-4 py-24">
      <div className="max-w-md w-full text-center">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-3">
          Error 404
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-black mb-4">
          Page not found.
        </h1>
        <p className="text-sm text-neutral-600 leading-relaxed mb-8">
          The page you are looking for is not available.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Go Home</span>
          </button>

          <button
            onClick={() => navigate('/projects')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-black text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
          >
            <span>View Projects</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
