import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/posts';
import { formatDate } from '@/lib/utils';
import { SITE_CONFIG, UI_CONFIG, IMAGE_SIZES } from '@/lib/constants';
import TerminalTyping from '@/components/TerminalTyping';

export default function Home() {
  const posts = getAllPosts().slice(0, UI_CONFIG.RECENT_POSTS_LIMIT);

  return (
    <div className="container py-4 md:py-6 lg:py-8">
      <div className="flex flex-col items-center justify-center space-y-6 text-center">
        {/* Title at the top with terminal typing effect */}
        <div className="w-full mb-4">
          <TerminalTyping
            text="Welcome to SonicDMG"
            speed={UI_CONFIG.TERMINAL_TYPING_SPEED}
            className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
          />
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            {SITE_CONFIG.description}
          </p>
        </div>

        {/* Action Figure Hero Image */}
        <div className="terminal-image-frame action-figure">
          <Image
            src="/sonicdmg-action-figure.png"
            alt="SonicDMG Action Figure - Limited Edition Developer Relations Engineer with Ninja Warrior Training Action"
            width={IMAGE_SIZES.actionFigure.width}
            height={IMAGE_SIZES.actionFigure.height}
            priority
            className="mx-auto"
          />
          <div className="image-caption">
            [COLLECTOR'S EDITION]
          </div>
        </div>

        <div className="space-y-4">
          <p className="mx-auto max-w-[700px] text-gray-600 md:text-lg dark:text-gray-300">
            Hi, I'm David Jones-Gilardi, a Developer Relations Engineer specializing in AI agents, RAG (Retrieval-Augmented Generation),
            and context engineering. When I'm not building intelligent systems and exploring LLMs,
            you'll find me training for ninja warrior obstacles.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href="https://www.linkedin.com/in/david-gilardi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-muted-foreground">•</span>
            <a
              href="https://youtube.com/playlist?list=PLkxCRYFY2hAyQDprZo_nyTtnxJ78S7sKH&si=xnRgepxoG_pYCOyQ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Podcast
            </a>
          </div>
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

      <div className="mx-auto mt-8 max-w-5xl">
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
