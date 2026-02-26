import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import PostMetadata from '@/components/PostMetadata';
import TagList from '@/components/TagList';

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
                <PostMetadata
                  date={post.metadata.date}
                  readingTime={post.readingTime}
                  category={post.metadata.category}
                />
                <TagList tags={post.metadata.tags || []} />
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
