# Next.js 16 Blog Implementation Plan
## Technical Specification for sonicdmg.github.io Migration

**Project Overview:** Migrate existing static HTML blog (Hexo-generated) to modern Next.js 16 with App Router, TypeScript, Tailwind CSS, and MDX content system.

**Target Deployment:** GitHub Pages at sonicdmg.github.io

**Current State Analysis:**
- 8 blog posts from 2017-2018 (Technical, Aerial, Something Else categories)
- Static HTML files with embedded content
- Custom CSS styling with banner images
- Tags: datastax, killrvideo, aerial, raspberry-PI, etc.
- Social links: GitHub, Twitter, LinkedIn, YouTube
- Google Analytics integration
- Disqus comments

---

## Table of Contents
1. [Technology Stack](#technology-stack)
2. [Project Architecture](#project-architecture)
3. [File Structure](#file-structure)
4. [Implementation Phases](#implementation-phases)
5. [Configuration Files](#configuration-files)
6. [Deployment Workflow](#deployment-workflow)

---

## Technology Stack

### Core Framework
- **Next.js**: 16.0.0 (App Router)
- **React**: 19.0.0
- **TypeScript**: 5.7.0
- **Node.js**: 20.x LTS

### Styling & UI
- **Tailwind CSS**: 4.0.0
- **PostCSS**: 8.4.x
- **clsx**: 2.1.x
- **tailwind-merge**: 2.5.x

### Content & MDX
- **@next/mdx**: 16.0.0
- **@mdx-js/loader**: 3.1.0
- **@mdx-js/react**: 3.1.0
- **gray-matter**: 4.0.3
- **remark-gfm**: 4.0.0
- **rehype-slug**: 6.0.0
- **rehype-autolink-headings**: 7.1.0
- **rehype-pretty-code**: 0.15.0
- **shiki**: 1.22.0

### Search & Navigation
- **flexsearch**: 0.7.43
- **date-fns**: 4.1.0

### SEO & Analytics
- **next-sitemap**: 4.2.3
- **feed**: 4.2.2

---

## Project Architecture

### App Router Structure
```
app/
├── layout.tsx              # Root layout
├── page.tsx                # Home page
├── about/page.tsx          # About page
├── blog/
│   ├── page.tsx           # Blog listing
│   ├── [slug]/page.tsx    # Individual post
│   └── tag/[tag]/page.tsx # Tag filter
├── archives/page.tsx       # Archives
└── api/search/route.ts     # Search API
```

### Key Architectural Decisions

1. **Static Site Generation (SSG)**: All pages pre-rendered at build time
2. **MDX Content**: Posts stored as MDX files with frontmatter
3. **Image Handling**: Next.js Image component with optimization
4. **Dark Mode**: CSS variables with next-themes
5. **Performance**: Route prefetching, lazy loading, code splitting

---

## File Structure

```
sonicdmg.github.io/
├── .github/workflows/deploy.yml
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── about/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   ├── [slug]/page.tsx
│   │   └── tag/[tag]/page.tsx
│   ├── archives/page.tsx
│   └── api/search/route.ts
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   ├── blog/
│   │   ├── PostCard.tsx
│   │   ├── PostList.tsx
│   │   └── TagList.tsx
│   ├── mdx/
│   │   ├── Callout.tsx
│   │   ├── CodeBlock.tsx
│   │   └── MDXComponents.tsx
│   ├── search/
│   │   └── SearchBar.tsx
│   └── ui/
│       ├── Button.tsx
│       └── ThemeToggle.tsx
├── content/
│   └── posts/
│       ├── 2017-02-07-im-sure-you-werent-looking.mdx
│       ├── 2017-02-07-mixed-workload-dse-cluster.mdx
│       ├── 2017-02-13-dropping-in-on-my-cluster.mdx
│       ├── 2017-04-17-dont-block-async-calls.mdx
│       ├── 2018-01-09-its-been-a-while.mdx
│       ├── 2018-01-10-cassandra-to-search-part-1.mdx
│       ├── 2018-01-24-cassandra-to-search-part-2.mdx
│       └── 2018-02-12-cassandra-to-search-part-2-updated.mdx
├── lib/
│   ├── mdx.ts
│   ├── posts.ts
│   ├── search.ts
│   └── utils.ts
├── public/
│   ├── images/
│   │   ├── banner.jpg
│   │   └── posts/
│   └── fonts/
├── types/
│   └── post.ts
├── scripts/
│   ├── generate-sitemap.ts
│   ├── generate-rss.ts
│   └── migrate-legacy-content.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Implementation Phases

### Phase 1: Project Setup (Days 1-2)

**Tasks:**
1. Initialize Next.js 16 project with TypeScript and Tailwind
2. Install all required dependencies
3. Configure Git repository
4. Setup ESLint, Prettier, and Husky

**Commands:**
```bash
npx create-next-app@latest sonicdmg-blog --typescript --tailwind --app
cd sonicdmg-blog
npm install @next/mdx @mdx-js/loader @mdx-js/react gray-matter
npm install remark-gfm rehype-slug rehype-autolink-headings rehype-pretty-code shiki
npm install flexsearch date-fns clsx tailwind-merge
npm install next-sitemap feed
npm install -D @types/node prettier eslint-config-prettier
```

**Deliverables:**
- ✅ Initialized Next.js project
- ✅ Dependencies installed
- ✅ Development tools configured

---

### Phase 2: Core Architecture (Days 2-3)

**Tasks:**
1. Create directory structure
2. Setup TypeScript types
3. Create utility functions
4. Configure constants

**Key Files:**
- `types/post.ts` - Post type definitions
- `lib/mdx.ts` - MDX processing utilities
- `lib/posts.ts` - Post fetching functions
- `lib/utils.ts` - Helper functions

**Deliverables:**
- ✅ Complete directory structure
- ✅ Type definitions
- ✅ Core utilities

---

### Phase 3: MDX Content System (Days 3-5)

**Tasks:**
1. Configure MDX in next.config.ts
2. Create MDX processing utilities
3. Implement post parsing
4. Create custom MDX components

**Key Components:**
- Callout (info, warning, error, success)
- CodeBlock (syntax highlighting, copy button)
- ImageGallery (responsive grid, lightbox)
- YouTubeEmbed (responsive, lazy loading)

**Deliverables:**
- ✅ MDX configuration complete
- ✅ Post parsing working
- ✅ Custom components created

---

### Phase 4: UI Components (Days 5-7)

**Tasks:**
1. Configure Tailwind CSS with custom theme
2. Create layout components (Header, Footer, Sidebar)
3. Create blog components (PostCard, PostList, etc.)
4. Implement dark mode
5. Make responsive design

**Key Features:**
- Responsive navigation with mobile menu
- Dark mode toggle with persistence
- Tag cloud and category widgets
- Recent posts sidebar
- Social media links

**Deliverables:**
- ✅ Tailwind configured
- ✅ All layout components
- ✅ Blog components
- ✅ Dark mode working

---

### Phase 5: Blog Features (Days 7-9)

**Tasks:**
1. Implement all blog pages
2. Add search functionality
3. Calculate reading time
4. Implement related posts
5. Add social sharing

**Pages:**
- Home (featured + recent posts)
- Blog listing (with pagination)
- Individual post (with TOC, comments)
- Tag pages (filtered posts)
- Archives (by date)
- About page

**Deliverables:**
- ✅ All pages implemented
- ✅ Search working
- ✅ Related posts algorithm
- ✅ Social sharing

---

### Phase 6: Legacy Content Migration (Days 9-11)

**Tasks:**
1. Create migration script (HTML → MDX)
2. Migrate all 8 blog posts
3. Copy and organize images
4. Setup URL redirects
5. Verify content accuracy

**Migration Script:**
- Extract metadata from HTML
- Convert HTML to Markdown
- Create MDX files with frontmatter
- Copy associated images
- Generate redirect mappings

**Deliverables:**
- ✅ Migration script
- ✅ All posts migrated
- ✅ Images organized
- ✅ Redirects configured

---

### Phase 7: SEO & Performance (Days 11-12)

**Tasks:**
1. Implement metadata for all pages
2. Generate sitemap
3. Create RSS/Atom feeds
4. Optimize images
5. Add analytics

**SEO Checklist:**
- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Structured data (JSON-LD)
- ✅ Sitemap.xml
- ✅ RSS feed
- ✅ Robots.txt

**Performance Targets:**
- First Contentful Paint < 1.8s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- Time to Interactive < 3.8s

**Deliverables:**
- ✅ Complete metadata
- ✅ Sitemap generated
- ✅ RSS feeds
- ✅ Performance optimized

---

### Phase 8: GitHub Pages Deployment (Days 12-13)

**Tasks:**
1. Configure Next.js for static export
2. Create GitHub Actions workflow
3. Setup repository settings
4. Test deployment
5. Configure custom domain (if needed)

**GitHub Actions Workflow:**
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Setup Node.js
      - Install dependencies
      - Build Next.js
      - Generate sitemap & RSS
      - Deploy to GitHub Pages
```

**Deliverables:**
- ✅ Static export configured
- ✅ GitHub Actions workflow
- ✅ Automated deployment

---

### Phase 9: Testing & QA (Days 13-14)

**Testing Areas:**
1. Unit tests (utilities, components)
2. Integration tests (pages, navigation)
3. Accessibility audit (WCAG AA)
4. Performance testing (Lighthouse)
5. Cross-browser testing
6. Responsive design testing
7. Content verification

**Tools:**
- Jest + React Testing Library
- Lighthouse
- axe DevTools
- WebPageTest

**Deliverables:**
- ✅ Test suite
- ✅ Accessibility passed
- ✅ Performance benchmarks met
- ✅ Cross-browser verified

---

### Phase 10: Documentation & Launch (Days 14-15)

**Tasks:**
1. Write comprehensive README
2. Document component usage
3. Create deployment guide
4. Write content authoring guide
5. Final review and launch

**Documentation:**
- README.md (project overview, setup)
- CONTRIBUTING.md (how to contribute)
- CONTENT_GUIDE.md (writing posts)
- DEPLOYMENT.md (deployment process)

**Deliverables:**
- ✅ Complete documentation
- ✅ Launch checklist completed
- ✅ Site live on GitHub Pages

---

## Configuration Files

### next.config.ts
```typescript
import createMDX from '@next/mdx'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [rehypePrettyCode, { theme: 'github-dark' }],
    ],
  },
})

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '',
  trailingSlash: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

export default withMDX(nextConfig)
```

### tailwind.config.ts
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#0ea5e9',
          600: '#0284c7',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## Deployment Workflow

### Build Process
1. Install dependencies: `npm ci`
2. Build Next.js: `npm run build`
3. Generate sitemap: `npm run postbuild`
4. Generate RSS: `npm run generate-rss`
5. Output to `/out` directory

### GitHub Actions
- Triggered on push to main branch
- Runs build process
- Deploys to GitHub Pages
- Adds .nojekyll file
- Configures custom domain (if applicable)

### Post-Deployment
1. Verify all pages load
2. Test search functionality
3. Check image loading
4. Verify redirects work
5. Test on mobile devices
6. Monitor analytics

---

## Legacy Content Migration Strategy

### HTML to MDX Conversion

**Step 1: Extract Metadata**
- Title from `.article-title`
- Date from `.article-date time[datetime]`
- Category from `.article-category-link`
- Tags from `.article-tag-list-link`

**Step 2: Convert Content**
- Use Turndown.js for HTML → Markdown
- Preserve code blocks
- Convert images to Next.js Image syntax
- Update internal links

**Step 3: Create MDX Files**
```mdx
---
title: "Post Title"
date: "2017-02-07"
excerpt: "Brief description..."
category: "Technical"
tags: ["datastax", "cassandra"]
---

Post content here...
```

**Step 4: Migrate Images**
- Copy from legacy structure
- Organize by year/month/slug
- Optimize and compress
- Update references in MDX

**Step 5: Setup Redirects**
- Map old URLs to new URLs
- Configure in next.config.ts
- Test all redirects

### URL Mapping
```
OLD: /2017/02/07/Post-Title/
NEW: /blog/2017-02-07-post-title
```

---

## SEO Optimization Strategy

### On-Page SEO
- Semantic HTML5 structure
- Proper heading hierarchy (H1 → H6)
- Meta descriptions (150-160 chars)
- Alt text for all images
- Internal linking
- Fast page load times

### Technical SEO
- XML sitemap
- Robots.txt
- Structured data (JSON-LD)
- Canonical URLs
- Mobile-friendly design
- HTTPS enabled

### Content SEO
- Keyword-rich titles
- Descriptive URLs
- Quality content
- Regular updates
- Social sharing

---

## Performance Optimization

### Image Optimization
- Next.js Image component
- WebP format
- Lazy loading
- Responsive sizes
- Blur placeholder

### Code Optimization
- Tree shaking
- Code splitting
- Dynamic imports
- Minification
- Compression (gzip/brotli)

### Caching Strategy
- Static generation
- Immutable assets
- Long cache headers
- CDN delivery

---

## Testing Strategy

### Unit Tests
- Utility functions
- Component rendering
- Props validation
- Edge cases

### Integration Tests
- Page navigation
- Search functionality
- Form submissions
- API routes

### E2E Tests
- User workflows
- Critical paths
- Cross-browser
- Mobile devices

### Accessibility Tests
- Keyboard navigation
- Screen readers
- Color contrast
- ARIA labels

---

## Launch Checklist

### Pre-Launch
- [ ] All content migrated
- [ ] Images optimized
- [ ] SEO metadata complete
- [ ] Analytics configured
- [ ] Performance tested
- [ ] Accessibility audited
- [ ] Cross-browser tested
- [ ] Mobile responsive
- [ ] Search working
- [ ] Dark mode working

### Launch
- [ ] Deploy to GitHub Pages
- [ ] Verify deployment
- [ ] Test all pages
- [ ] Check redirects
- [ ] Monitor errors
- [ ] Submit sitemap to Google

### Post-Launch
- [ ] Monitor analytics
- [ ] Check performance
- [ ] Gather feedback
- [ ] Fix issues
- [ ] Plan improvements

---

## Maintenance Plan

### Regular Tasks
- Update dependencies monthly
- Review analytics weekly
- Check broken links monthly
- Optimize images as needed
- Update content regularly

### Monitoring
- Performance metrics
- Error tracking
- User feedback
- Search queries
- Popular content

---

## Success Metrics

### Performance
- Lighthouse score > 90
- Page load < 2s
- Core Web Vitals passed

### SEO
- Indexed pages
- Search rankings
- Organic traffic
- Backlinks

### User Engagement
- Page views
- Time on site
- Bounce rate
- Return visitors

---

## Conclusion

This implementation plan provides a comprehensive roadmap for migrating the Aerial Dev blog from static HTML to a modern Next.js 16 application. The phased approach ensures systematic progress while maintaining quality and performance standards.

**Estimated Timeline:** 15 days
**Team Size:** 1-2 developers
**Complexity:** Medium

**Key Success Factors:**
1. Thorough planning and preparation
2. Incremental implementation
3. Comprehensive testing
4. Performance optimization
5. SEO best practices
6. Quality documentation

**Next Steps:**
1. Review and approve this plan
2. Setup development environment
3. Begin Phase 1 implementation
4. Regular progress reviews
5. Iterative improvements

---

**Document Version:** 1.0  
**Last Updated:** 2026-02-26  
**Author:** Technical Planning Team