
import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons';
import type { SocialLink } from '../types';

const iconMap: Record<SocialLink['name'], React.ReactNode> = {
  GitHub: <GitHubIcon className="w-8 h-8" />,
  LinkedIn: <LinkedInIcon className="w-8 h-8" />,
  Email: <MailIcon className="w-8 h-8" />,
};

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 md:py-32 text-center">
      <h2 className="text-3xl font-bold text-slate-50 mb-4">Get In Touch</h2>
      <p className="max-w-2xl mx-auto text-slate-400 mb-8">
        I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision. Feel free to reach out.
      </p>
      <div className="flex justify-center space-x-8">
        {SOCIAL_LINKS.map(link => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            className="text-slate-400 hover:text-cyan-400 transform hover:scale-110 transition-all duration-300"
          >
            {iconMap[link.name]}
          </a>
        ))}
      </div>
    </section>
  );
};

export default Contact;
