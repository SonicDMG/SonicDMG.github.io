import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import PostMetadata from '@/components/PostMetadata';
import TagList from '@/components/TagList';
import ZoomableImage from '@/components/ZoomableImage';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import CollapsibleVideo from '@/components/CollapsibleVideo';
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

  // Type assertion needed due to complex rehype plugin type inference
  // The configuration is correct but TypeScript struggles with the tuple type
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
        ],
      ] as any[],
    },
  };

  return (
    <article className="container max-w-3xl mx-auto py-12">
      <div className="space-y-4 mb-4">
        <h1 className="text-4xl font-bold tracking-tight">{post.metadata.title}</h1>
        <PostMetadata
          date={post.metadata.date}
          readingTime={post.readingTime}
          author={post.metadata.author}
        />
        <TagList tags={post.metadata.tags || []} />
      </div>

      {/* Video embed for video-to-openrag post */}
      {slug === 'video-to-openrag-searchable-transcripts' && (
        <CollapsibleVideo
          videoId="Y0b1TANWZ-Y"
          title="Making Video Content Searchable with Docling and OpenRAG"
          summary="📺 Prefer to watch instead of read? Click here to view the video walkthrough"
        />
      )}

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <MDXRemote
          source={post.content}
          options={mdxOptions}
          components={{
            img: (props: any) => <ZoomableImage src={props.src} alt={props.alt || ''} />,
            YouTubeEmbed,
            CollapsibleVideo,
            a: (props: any) => {
              const isExternal = props.href?.startsWith('http');
              return (
                <a
                  {...props}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                />
              );
            },
          }}
        />
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
