import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import PostMetadata from '@/components/PostMetadata';
import TagList from '@/components/TagList';

export const metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, distributed systems, and more.',
};

/**
 * Determines the age category of a post based on its date
 * @param dateString - The date string from the post metadata
 * @returns 'recent' for 2025+, 'legacy' for 2018 and earlier, 'standard' for in-between
 */
function getPostAgeCategory(dateString: string): 'recent' | 'legacy' | 'standard' {
  const year = new Date(dateString).getFullYear();
  if (year >= 2025) return 'recent';
  if (year <= 2018) return 'legacy';
  return 'standard';
}

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
          {posts.map((post) => {
            const ageCategory = getPostAgeCategory(post.metadata.date);
            const isLegacy = ageCategory === 'legacy';
            const isRecent = ageCategory === 'recent';

            return (
              <article
                key={post.slug}
                className={`group relative flex flex-col space-y-2 border-b pb-8 last:border-0 ${
                  isLegacy
                    ? 'border-l-4 border-l-amber-500/50 pl-4 opacity-90'
                    : isRecent
                    ? 'border-l-4 border-l-emerald-500/50 pl-4'
                    : ''
                }`}
              >
                {isLegacy && (
                  <span className="absolute top-0 right-0 inline-flex items-center rounded-md bg-amber-50 dark:bg-amber-950/30 px-2 py-1 text-xs font-medium text-amber-700 dark:text-amber-400 ring-1 ring-inset ring-amber-600/20 dark:ring-amber-500/30 z-10">
                    Legacy
                  </span>
                )}
                {isRecent && (
                  <span className="absolute top-0 right-0 inline-flex items-center rounded-md bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 ring-1 ring-inset ring-emerald-600/20 dark:ring-emerald-500/30 z-10">
                    New
                  </span>
                )}
                <Link href={`/blog/${post.slug}`} className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight group-hover:underline">
                    {post.metadata.title}
                  </h2>
                  <p className={`text-muted-foreground ${isLegacy ? 'opacity-80' : ''}`}>
                    {post.metadata.description}
                  </p>
                  <PostMetadata
                    date={post.metadata.date}
                    readingTime={post.readingTime}
                    category={post.metadata.category}
                  />
                  <TagList tags={post.metadata.tags || []} />
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
