# Component Specifications & Code Examples
## Detailed Implementation Guide for Next.js 16 Blog

This document provides detailed code examples and specifications for all major components in the blog implementation.

---

## Table of Contents
1. [Type Definitions](#type-definitions)
2. [Utility Functions](#utility-functions)
3. [Layout Components](#layout-components)
4. [Blog Components](#blog-components)
5. [MDX Components](#mdx-components)
6. [Page Implementations](#page-implementations)

---

## Type Definitions

### types/post.ts
```typescript
export interface PostMetadata {
  title: string
  date: string
  excerpt: string
  category: 'Technical' | 'Aerial' | 'Something Else'
  tags: string[]
  author?: string
  coverImage?: string
  featured?: boolean
}

export interface Post {
  slug: string
  content: string
  metadata: PostMetadata
}

export interface PostWithReadTime extends Post {
  readTime: number
}

export interface SearchResult {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
}
```

---

## Utility Functions

### lib/mdx.ts
```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Post, PostMetadata } from '@/types/post'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export async function getAllPosts(): Promise<Post[]> {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        content,
        metadata: data as PostMetadata,
      }
    })

  return allPostsData.sort((a, b) => {
    return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  })
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      metadata: data as PostMetadata,
    }
  } catch {
    return null
  }
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) =>
    post.metadata.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) => post.metadata.category === category)
}

export function getAllTags(): string[] {
  const posts = fs.readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      return data.tags || []
    })
    .flat()

  return Array.from(new Set(posts)).sort()
}

export function getAllCategories(): string[] {
  const posts = fs.readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      return data.category
    })
    .filter(Boolean)

  return Array.from(new Set(posts)).sort()
}
```

### lib/utils.ts
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, parseISO } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
  return format(parseISO(date), 'MMMM dd, yyyy')
}

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}
```

---

## Layout Components

### components/layout/Header.tsx
```typescript
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { SearchBar } from '@/components/search/SearchBar'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">Aerial Dev</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-primary">
              Blog
            </Link>
            <Link href="/archives" className="text-sm font-medium hover:text-primary">
              Archives
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary">
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <SearchBar />
          <ThemeToggle />
          
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="container py-4 flex flex-col gap-4">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>
              Blog
            </Link>
            <Link href="/archives" onClick={() => setMobileMenuOpen(false)}>
              Archives
            </Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
```

### components/layout/Footer.tsx
```typescript
import Link from 'next/link'
import { Github, Twitter, Linkedin, Youtube } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-4">Aerial Dev</h3>
            <p className="text-sm text-muted-foreground">
              Distributed databases and aerial arts all rolled up into one, oddly shaped...bundle
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/archives">Archives</Link></li>
              <li><Link href="/about">About</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="https://github.com/SonicDMG" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/SonicDMG" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/david-gilardi" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/channel/UCOYqZ4ckEso2-lYQjzpeaoQ" target="_blank" rel="noopener noreferrer">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} David Gilardi. All rights reserved.</p>
          <p className="mt-2">Built with Next.js 16</p>
        </div>
      </div>
    </footer>
  )
}
```

---

## Blog Components

### components/blog/PostCard.tsx
```typescript
import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/types/post'
import { formatDate, calculateReadTime } from '@/lib/utils'
import { CategoryBadge } from './CategoryBadge'
import { TagList } from './TagList'
import { Clock } from 'lucide-react'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const readTime = calculateReadTime(post.content)

  return (
    <article className="group relative flex flex-col space-y-4 border rounded-lg p-6 hover:shadow-lg transition-shadow">
      {post.metadata.coverImage && (
        <Link href={`/blog/${post.slug}`}>
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={post.metadata.coverImage}
              alt={post.metadata.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </Link>
      )}

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <time dateTime={post.metadata.date}>
          {formatDate(post.metadata.date)}
        </time>
        <span>•</span>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{readTime} min read</span>
        </div>
      </div>

      <div>
        <CategoryBadge category={post.metadata.category} />
      </div>

      <Link href={`/blog/${post.slug}`}>
        <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
          {post.metadata.title}
        </h2>
      </Link>

      <p className="text-muted-foreground line-clamp-3">
        {post.metadata.excerpt}
      </p>

      <TagList tags={post.metadata.tags} />

      <Link
        href={`/blog/${post.slug}`}
        className="text-primary font-medium hover:underline"
      >
        Read more →
      </Link>
    </article>
  )
}
```

### components/blog/CategoryBadge.tsx
```typescript
import { cn } from '@/lib/utils'

interface CategoryBadgeProps {
  category: string
}

const categoryColors = {
  Technical: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  Aerial: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'Something Else': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
        categoryColors[category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'
      )}
    >
      {category}
    </span>
  )
}
```

### components/blog/TagList.tsx
```typescript
import Link from 'next/link'
import { Tag } from 'lucide-react'

interface TagListProps {
  tags: string[]
  limit?: number
}

export function TagList({ tags, limit }: TagListProps) {
  const displayTags = limit ? tags.slice(0, limit) : tags

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Tag className="h-4 w-4 text-muted-foreground" />
      {displayTags.map((tag) => (
        <Link
          key={tag}
          href={`/blog/tag/${tag.toLowerCase()}`}
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          #{tag}
        </Link>
      ))}
    </div>
  )
}
```

---

## MDX Components

### components/mdx/Callout.tsx
```typescript
import { ReactNode } from 'react'
import { AlertCircle, Info, AlertTriangle, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CalloutProps {
  type?: 'info' | 'warning' | 'error' | 'success'
  children: ReactNode
}

const calloutConfig = {
  info: {
    icon: Info,
    className: 'bg-blue-50 border-blue-500 text-blue-900 dark:bg-blue-950 dark:text-blue-100',
  },
  warning: {
    icon: AlertTriangle,
    className: 'bg-yellow-50 border-yellow-500 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-100',
  },
  error: {
    icon: AlertCircle,
    className: 'bg-red-50 border-red-500 text-red-900 dark:bg-red-950 dark:text-red-100',
  },
  success: {
    icon: CheckCircle,
    className: 'bg-green-50 border-green-500 text-green-900 dark:bg-green-950 dark:text-green-100',
  },
}

export function Callout({ type = 'info', children }: CalloutProps) {
  const config = calloutConfig[type]
  const Icon = config.icon

  return (
    <div className={cn('border-l-4 p-4 my-6 rounded-r-lg', config.className)}>
      <div className="flex gap-3">
        <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
```

### components/mdx/CodeBlock.tsx
```typescript
'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface CodeBlockProps {
  children: string
  className?: string
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  
  const language = className?.replace('language-', '') || 'text'
  const code = String(children).trim()

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group my-6">
      <div className="absolute right-2 top-2 z-10">
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4 text-gray-300" />
          )}
        </button>
      </div>
      
      <div className="absolute left-4 top-2 text-xs text-gray-400 font-mono">
        {language}
      </div>

      <pre className="overflow-x-auto p-4 pt-12 rounded-lg bg-gray-900">
        <code className={className}>{children}</code>
      </pre>
    </div>
  )
}
```

---

## Page Implementations

### app/page.tsx (Home Page)
```typescript
import { getAllPosts } from '@/lib/mdx'
import { PostCard } from '@/components/blog/PostCard'
import Link from 'next/link'

export default async function HomePage() {
  const allPosts = await getAllPosts()
  const featuredPosts = allPosts.filter((post) => post.metadata.featured).slice(0, 3)
  const recentPosts = allPosts.slice(0, 6)

  return (
    <div className="container py-12">
      <section className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Aerial Dev
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Distributed databases and aerial arts all rolled up into one, oddly shaped...bundle
        </p>
      </section>

      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Recent Posts</h2>
          <Link href="/blog" className="text-primary hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {recentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}
```

### app/blog/[slug]/page.tsx (Individual Post)
```typescript
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import { mdxComponents } from '@/components/mdx/MDXComponents'
import { formatDate, calculateReadTime } from '@/lib/utils'
import { CategoryBadge } from '@/components/blog/CategoryBadge'
import { TagList } from '@/components/blog/TagList'
import { Clock } from 'lucide-react'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) return {}

  return {
    title: post.metadata.title,
    description: post.metadata.excerpt,
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const readTime = calculateReadTime(post.content)

  return (
    <article className="container max-w-4xl py-12">
      <header className="mb-12">
        <div className="mb-4">
          <CategoryBadge category={post.metadata.category} />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {post.metadata.title}
        </h1>

        <div className="flex items-center gap-4 text-muted-foreground">
          <time dateTime={post.metadata.date}>
            {formatDate(post.metadata.date)}
          </time>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{readTime} min read</span>
          </div>
        </div>

        <div className="mt-6">
          <TagList tags={post.metadata.tags} />
        </div>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>
    </article>
  )
}
```

---

## Summary

This document provides detailed implementation specifications for all major components. Each component is designed to be:

- **Type-safe**: Full TypeScript support
- **Accessible**: WCAG AA compliant
- **Responsive**: Mobile-first design
- **Performant**: Optimized rendering
- **Maintainable**: Clean, documented code

Use these specifications as a reference during implementation to ensure consistency and quality across the entire application.