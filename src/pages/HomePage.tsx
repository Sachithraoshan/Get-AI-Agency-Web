import React from 'react';
import { Hero } from '../components/Hero.tsx';
import { PhilosophySection } from '../components/PhilosophySection.tsx';
import { ServicesSection } from '../components/ServicesSection.tsx';
import { ProcessSection } from '../components/ProcessSection.tsx';
import { PortfolioSection } from '../components/PortfolioSection.tsx';
import { WhyGetAISection } from '../components/WhyGetAISection.tsx';
import { AboutSection } from '../components/AboutSection.tsx';
import { CtaSection } from '../components/CtaSection.tsx';
import { useRouter } from '../utils/router.tsx';

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div>
      <Hero />
      <PhilosophySection />
      <ServicesSection
        onSelectServiceForEnquiry={(serviceId) => {
          navigate('/contact');
        }}
      />
      <ProcessSection />
      <PortfolioSection />
      <WhyGetAISection />
      <AboutSection />
      <CtaSection />
    </div>
  );
};
