export const SITE_CONFIG = {
  name: 'SonicDMG',
  author: 'David Jones-Gilardi',
  description: 'AI agents, RAG, context engineering, and ninja warrior training all rolled up into one, oddly shaped...bundle',
  url: 'https://sonicdmg.github.io',
  ogImage: 'https://sonicdmg.github.io/og-image.png',
  links: {
    twitter: '@sonicdmg',
    github: 'https://github.com/SonicDMG',
    linkedin: 'https://www.linkedin.com/in/david-gilardi/',
  },
} as const;

// UI Configuration
export const UI_CONFIG = {
  RECENT_POSTS_LIMIT: 3,
  TERMINAL_TYPING_SPEED: 80,
} as const;

// Image dimensions for consistent sizing
export const IMAGE_SIZES = {
  actionFigure: {
    width: 400,
    height: 600,
  },
  portrait: {
    width: 300,
    height: 300,
  },
  conference: {
    width: 600,
    height: 400,
  },
} as const;
