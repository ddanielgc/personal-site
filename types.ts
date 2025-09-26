
export interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
}

export interface SocialLink {
  name: 'GitHub' | 'LinkedIn' | 'Email';
  url: string;
}
