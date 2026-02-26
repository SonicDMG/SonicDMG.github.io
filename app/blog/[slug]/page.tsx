import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { formatDate } from '@/lib/utils';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      type: 'article',
      publishedTime: post.metadata.date,
      authors: [post.metadata.author || 'David Gilardi'],
      tags: post.metadata.tags,
    },
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const mdxOptions = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeHighlight,
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'wrap',
            properties: {
              className: ['anchor'],
            },
          },
        ] as any,
      ],
    },
  };

  return (
    <article className="container max-w-3xl py-12">
      <div className="space-y-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">{post.metadata.title}</h1>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <time dateTime={post.metadata.date}>{formatDate(post.metadata.date)}</time>
          <span>•</span>
          <span>{post.readingTime}</span>
          {post.metadata.author && (
            <>
              <span>•</span>
              <span>{post.metadata.author}</span>
            </>
          )}
        </div>
        {post.metadata.tags && post.metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
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
      </div>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <MDXRemote source={post.content} options={mdxOptions} />
      </div>

      <div className="mt-12 pt-8 border-t">
        <a
          href="/blog"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to blog
        </a>
      </div>
    </article>
  );
}

// Made with Bob
