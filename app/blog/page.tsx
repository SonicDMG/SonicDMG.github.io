import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { formatDate } from '@/lib/utils';

export const metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, distributed systems, and more.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container max-w-3xl mx-auto py-12">
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Thoughts on software development, distributed systems, and technology.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group relative flex flex-col space-y-2 border-b pb-8 last:border-0"
            >
              <Link href={`/blog/${post.slug}`} className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight group-hover:underline">
                  {post.metadata.title}
                </h2>
                <p className="text-muted-foreground">{post.metadata.description}</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <time dateTime={post.metadata.date}>
                    {formatDate(post.metadata.date)}
                  </time>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                  {post.metadata.category && (
                    <>
                      <span>•</span>
                      <span className="capitalize">{post.metadata.category}</span>
                    </>
                  )}
                </div>
                {post.metadata.tags && post.metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {post.metadata.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

// Made with Bob
