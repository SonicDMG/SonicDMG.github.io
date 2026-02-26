export interface PostMetadata {
  title: string;
  date: string;
  description: string;
  excerpt?: string; // Legacy field, will be normalized to description
  tags?: string[];
  category?: string;
  author?: string;
  image?: string;
  draft?: boolean;
}

export interface Post {
  slug: string;
  metadata: PostMetadata;
  content: string;
  readingTime: string;
}
