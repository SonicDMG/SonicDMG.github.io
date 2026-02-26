# SonicDMG Blog

A modern, fast blog built with Next.js 16, TypeScript, Tailwind CSS, and MDX.

## 🚀 Features

- **Next.js 16** with App Router for optimal performance
- **TypeScript** for type safety
- **Tailwind CSS** for beautiful, responsive styling
- **MDX** for rich, interactive blog content
- **Static Site Generation** for lightning-fast page loads
- **GitHub Pages** deployment with automated CI/CD
- **SEO Optimized** with metadata and Open Graph support
- **Syntax Highlighting** for code blocks
- **Reading Time** estimation for posts
- **Responsive Design** that works on all devices

## 📦 Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [MDX](https://mdxjs.com/) - Markdown with JSX
- [Gray Matter](https://github.com/jonschlinkert/gray-matter) - Frontmatter parsing
- [Rehype](https://github.com/rehypejs/rehype) - HTML processing
- [Remark](https://github.com/remarkjs/remark) - Markdown processing

## 🛠️ Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sonicdmg/sonicdmg.github.io.git
cd sonicdmg.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Writing Blog Posts

Blog posts are written in MDX format and stored in the `content/posts/` directory.

### Creating a New Post

1. Create a new `.mdx` file in `content/posts/`:
```bash
touch content/posts/my-new-post.mdx
```

2. Add frontmatter and content:
```mdx
---
title: "My New Post"
date: "2026-02-26"
description: "A brief description of my post"
tags: ["nextjs", "typescript"]
category: "tutorial"
author: "David Gilardi"
---

# My New Post

Your content here...
```

### Frontmatter Fields

- `title` (required): Post title
- `date` (required): Publication date (YYYY-MM-DD)
- `description` (required): Brief description for SEO
- `tags` (optional): Array of tags
- `category` (optional): Post category
- `author` (optional): Author name
- `draft` (optional): Set to `true` to hide from production

## 🚀 Deployment

The site automatically deploys to GitHub Pages when you push to the `main` branch.

### Manual Deployment

1. Build the site:
```bash
npm run build
```

2. The static files will be in the `out/` directory.

### GitHub Pages Setup

1. Go to your repository settings
2. Navigate to Pages
3. Set Source to "GitHub Actions"
4. Push to main branch to trigger deployment

## 📁 Project Structure

```
.
├── app/                    # Next.js App Router pages
│   ├── blog/              # Blog pages
│   ├── about/             # About page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
├── content/               # Blog content
│   └── posts/            # MDX blog posts
├── lib/                   # Utility functions
│   ├── posts.ts          # Post fetching logic
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Helper functions
├── public/                # Static assets
├── .github/               # GitHub Actions workflows
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind configuration
└── tsconfig.json          # TypeScript configuration
```

## 🎨 Customization

### Styling

- Modify `tailwind.config.ts` for Tailwind customization
- Edit `app/globals.css` for global styles
- Update color scheme in `app/layout.tsx`

### Site Metadata

Update site metadata in `app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: 'Your Site Title',
  description: 'Your site description',
  // ...
};
```

## 📄 License

MIT License - feel free to use this project for your own blog!

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Deployed on [GitHub Pages](https://pages.github.com/)