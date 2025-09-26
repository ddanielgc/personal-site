
import React from 'react';
import { PROJECTS } from '../constants';
import ProjectCard from './ProjectCard';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 md:py-32">
      <h2 className="text-3xl font-bold text-slate-50 mb-12">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
