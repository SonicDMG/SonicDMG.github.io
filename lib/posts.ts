import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { Post, PostMetadata } from './types';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.mdx'));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
      slug: realSlug,
      metadata: data as PostMetadata,
      content,
      readingTime: stats.text,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .filter((post) => !post.metadata.draft)
    .sort((post1, post2) => (post1.metadata.date > post2.metadata.date ? -1 : 1));
  
  return posts;
}

export function getPostsByTag(tag: string): Post[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => 
    post.metadata.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getPostsByCategory(category: string): Post[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => 
    post.metadata.category?.toLowerCase() === category.toLowerCase()
  );
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tags = new Set<string>();
  
  allPosts.forEach((post) => {
    post.metadata.tags?.forEach((tag) => tags.add(tag));
  });
  
  return Array.from(tags).sort();
}

export function getAllCategories(): string[] {
  const allPosts = getAllPosts();
  const categories = new Set<string>();
  
  allPosts.forEach((post) => {
    if (post.metadata.category) {
      categories.add(post.metadata.category);
    }
  });
  
  return Array.from(categories).sort();
}

// Made with Bob
