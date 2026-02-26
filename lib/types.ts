export interface PostMetadata {
  title: string;
  date: string;
  description: string;
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

export interface PostCardProps {
  post: Post;
}

// Made with Bob
