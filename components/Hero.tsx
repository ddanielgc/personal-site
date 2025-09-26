import React from 'react';

const Hero: React.FC = () => {
  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center py-20">
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold text-slate-50 leading-tight">
          Daniel Gusmão Campos
        </h1>
        <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-cyan-400">
          Technology Leader & Product Builder
        </h2>
        <p className="mt-6 text-lg text-slate-400 leading-relaxed">
          I transform ideas into high-impact software products. With 16 years of experience, I lead the entire product lifecycle—from initial concept and strategy to scalable deployment and market fit. My focus is on building valuable, business-driven solutions that solve real-world problems.
        </p>
        <div className="mt-10">
          <a 
            href="#projects" 
            onClick={handleScrollToProjects}
            className="bg-cyan-500 text-slate-900 font-bold py-3 px-6 rounded-md hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105"
          >
            View My Work
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;