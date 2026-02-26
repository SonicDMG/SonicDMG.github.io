import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { Post, PostMetadata } from './types';

const postsDirectory = path.join(process.cwd(), 'content/posts');

/**
 * Gets all post slugs from the posts directory
 * @returns Array of post slugs (filenames without .mdx extension)
 */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.mdx'));
}

/**
 * Validates that required metadata fields are present and normalizes legacy fields
 * @param data - The metadata object to validate
 * @throws Error if required fields are missing
 */
function validatePostMetadata(data: any): asserts data is PostMetadata {
  if (!data.title || typeof data.title !== 'string') {
    throw new Error('Post metadata missing required field: title');
  }
  if (!data.date || typeof data.date !== 'string') {
    throw new Error('Post metadata missing required field: date');
  }
  
  // Normalize excerpt to description for backward compatibility
  if (!data.description && data.excerpt) {
    data.description = data.excerpt;
  }
  
  if (!data.description || typeof data.description !== 'string') {
    throw new Error('Post metadata missing required field: description or excerpt');
  }
}

/**
 * Retrieves a single post by its slug
 * @param slug - The post slug (with or without .mdx extension)
 * @returns Post object or null if not found or invalid
 */
export function getPostBySlug(slug: string): Post | null {
  try {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Validate metadata
    validatePostMetadata(data);
    
    const stats = readingTime(content);

    return {
      slug: realSlug,
      metadata: data,
      content,
      readingTime: stats.text,
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`Error reading post ${slug}:`, error);
    }
    return null;
  }
}

/**
 * Retrieves all published posts, sorted by date (newest first)
 * @returns Array of Post objects
 */
export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .filter((post) => !post.metadata.draft)
    .sort((post1, post2) => (post1.metadata.date > post2.metadata.date ? -1 : 1));
  
  return posts;
}
