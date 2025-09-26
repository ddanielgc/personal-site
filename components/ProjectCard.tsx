
import React from 'react';
import type { Project } from '../types';
import { GitHubIcon, ExternalLinkIcon } from './Icons';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group relative flex flex-col h-full bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300">
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-slate-50 group-hover:text-cyan-400 transition-colors duration-300">
            {project.title}
          </h3>
          <div className="flex items-center space-x-4 text-slate-400">
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                <GitHubIcon className="w-5 h-5" />
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                <ExternalLinkIcon className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          {project.description}
        </p>
      </div>
      <ul className="flex flex-wrap gap-2 mt-auto">
        {project.tags.map((tag) => (
          <li key={tag} className="text-xs font-mono text-cyan-400 bg-cyan-900/50 px-2 py-1 rounded">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectCard;
