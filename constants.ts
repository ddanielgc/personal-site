import type { Project, SocialLink } from './types';

export const PROJECTS: Project[] = [
  {
    title: 'Tubly AI',
    description:
      'Chrome extension that turns YouTube into a readable daily brief: concise summaries, jump-back timestamps, readable transcripts (when available), optional Audio Digest, and an opt-in auto-digest of new releases from your subscriptions. Includes a one-line Video Insight to check if a video delivers on its title.',
    tags: ['React', 'TypeScript', 'Chrome Extension', 'OAuth2', 'YouTube Data API', 'Serverless AWS', 'Node.js', 'DynamoDB', 'Pulumi', 'CloudFront'],
    liveUrl: 'https://tubly.app',
    repoUrl: '#',
  },
  {
    title: 'TryLenses',
    description:
      'AI-powered virtual eyewear try-on. React + Vite + Tailwind SPA using Google Gemini 2.5 Flash Image Preview to auto-detect face shape and skin undertone, plan N variations, and render one photorealistic image per variation (no collages). UI with draggable Polaroid cards (re-generate, download, album poster). Serverless infra on AWS via Pulumi (API Gateway + Lambda, S3/CloudFront OAC).',
    tags: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'PWA',
      'Google Gemini',
      'AWS Lambda',
      'API Gateway',
      'S3',
      'CloudFront',
      'Pulumi'
    ],
    liveUrl: 'https://trylenses.com/',
    repoUrl: '#'
  },
  {
    title: 'OnionPad',
    description:
      'End-to-end encrypted paste/notes over Tor (.onion). Keys live in the URL fragment; the server stores only ciphertext. Includes strict CSP, authenticated updates/deletes, atomic writes, and a sandboxed systemd service.',
    tags: ['Node.js', 'WebCrypto (AES-GCM)', 'Tor Hidden Service', 'CSP', 'Systemd', 'Security'],
    // Optional: if you want to show the onion link, keep it here and add a Tor notice near the button.
    liveUrl: 'http://urhjypbimkzutlkthryjq6sn3im6nkoge5254ozbymxyjya733nzkoid.onion', // Accessible via Tor Browser only
    repoUrl: '#'
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/ddanielgc' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/danielgusmaocampos' },
  { name: 'Email', url: 'mailto:support@mail.go2ai.co' },
];
