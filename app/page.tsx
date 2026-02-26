import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { formatDate } from '@/lib/utils';

export default function Home() {
  const posts = getAllPosts().slice(0, 3); // Get latest 3 posts

  return (
    <div className="container py-12 md:py-24 lg:py-32">
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Welcome to SonicDMG
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Technical blog about software engineering, distributed systems, and technology.
            Exploring the intersection of code, architecture, and innovation.
          </p>
        </div>
        <div className="space-x-4">
          <Link
            href="/blog"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Read the Blog
          </Link>
          <Link
            href="/about"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            About Me
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-5xl">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Recent Posts</h2>
        {posts.length === 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Coming Soon</h3>
                <p className="text-sm text-muted-foreground">
                  New blog posts will appear here. Stay tuned for technical insights and tutorials.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow"
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {post.metadata.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.metadata.description}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground pt-2">
                    <time dateTime={post.metadata.date}>
                      {formatDate(post.metadata.date)}
                    </time>
                    <span className="mx-2">•</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Made with Bob
