import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/posts';
import { formatDate } from '@/lib/utils';
import { SITE_CONFIG, UI_CONFIG, IMAGE_SIZES } from '@/lib/constants';
import TerminalTyping from '@/components/TerminalTyping';
import HandDrawnAnnotation from '@/components/HandDrawnAnnotation';

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

export default function Home() {
  const posts = getAllPosts().slice(0, UI_CONFIG.RECENT_POSTS_LIMIT);

  return (
    <div className="container py-4 md:py-6 lg:py-8 relative">
      {/* Main Hero Content - Centered column layout */}
      <div className="flex flex-col items-center justify-center space-y-6 text-center">
          {/* Title at the top with terminal typing effect and podcast on the side for tablet+ */}
          <div className="w-full mb-4 md:relative">
            <div className="mx-auto max-w-fit">
              <TerminalTyping
                text="Welcome to SonicDMG"
                speed={UI_CONFIG.TERMINAL_TYPING_SPEED}
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
              />
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                {SITE_CONFIG.description}
              </p>
            </div>
            
            {/* The Flow Podcast Section - Positioned to the right of centered title on tablet and desktop */}
            <div className="hidden md:block md:absolute md:top-0 md:left-1/2 md:ml-[400px] md:w-40">
                <div className="flex flex-col items-center space-y-2">
                  <h3 className="text-xs font-bold tracking-tight text-center">The Flow</h3>
                  
                  {/* Album Cover Style Image */}
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                    <div className="relative">
                      <Image
                        src="/the_flow.jpg"
                        alt="The Flow Podcast"
                        width={150}
                        height={150}
                        className="rounded-md shadow-xl"
                      />
                    </div>
                  </div>

                  {/* Platform Links */}
                  <div className="flex flex-col gap-1.5 w-full">
                    <a
                      href="https://youtube.com/playlist?list=PLkxCRYFY2hAyQDprZo_nyTtnxJ78S7sKH&si=xnRgepxoG_pYCOyQ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 h-8 rounded-md bg-red-600 px-2 text-xs font-medium text-white shadow-md transition-all hover:bg-red-700 hover:shadow-lg hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      YouTube
                    </a>
                    
                    <a
                      href="https://open.spotify.com/show/2rhGcAxL3Qium5LSOBij7y?si=NciSEqWTTviAwi7oSihFmw"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 h-8 rounded-md bg-green-600 px-2 text-xs font-medium text-white shadow-md transition-all hover:bg-green-700 hover:shadow-lg hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                      Spotify
                    </a>
                    
                    <a
                      href="https://podcasts.apple.com/us/podcast/the-flow-ai-podcast/id1828241221"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 h-8 rounded-md bg-purple-600 px-2 text-xs font-medium text-white shadow-md transition-all hover:bg-purple-700 hover:shadow-lg hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.182c5.423 0 9.818 4.395 9.818 9.818 0 5.423-4.395 9.818-9.818 9.818-5.423 0-9.818-4.395-9.818-9.818 0-5.423 4.395-9.818 9.818-9.818zM12 5.455c-3.614 0-6.545 2.931-6.545 6.545 0 2.543 1.455 4.745 3.575 5.836v-2.11c-1.305-.872-2.166-2.345-2.166-4.027 0-2.678 2.17-4.848 4.848-4.848s4.848 2.17 4.848 4.848c0 1.682-.861 3.155-2.166 4.027v2.11c2.12-1.091 3.575-3.293 3.575-5.836 0-3.614-2.931-6.545-6.545-6.545zm0 4.364c-1.204 0-2.182.978-2.182 2.182 0 .804.436 1.506 1.09 1.885v4.023c0 .603.489 1.091 1.092 1.091s1.091-.488 1.091-1.091v-4.023c.654-.379 1.091-1.081 1.091-1.885 0-1.204-.978-2.182-2.182-2.182z"/>
                      </svg>
                      Apple
                    </a>
                  </div>
                </div>
            </div>
          </div>

          {/* Action Figure Hero Image with Hand-Drawn Annotation */}
          <div className="relative">
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
            
            {/* Hand-drawn annotation pointing to the action figure */}
            <HandDrawnAnnotation
              position="bottom-left"
              scale={0.9}
              rotation={-8}
              className="hidden sm:block -left-24 md:-left-32 lg:-left-36 bottom-40 md:bottom-48 lg:bottom-56"
            />
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

          {/* The Flow Podcast Section - After hero on mobile only */}
          <div className="mt-12 md:hidden">
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-center">The Flow Podcast</h2>
              
              {/* Album Cover Style Image */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative">
                  <Image
                    src="/the_flow.jpg"
                    alt="The Flow Podcast"
                    width={300}
                    height={300}
                    className="rounded-lg shadow-2xl"
                    priority
                  />
                </div>
              </div>

              {/* Platform Links */}
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <a
                  href="https://youtube.com/playlist?list=PLkxCRYFY2hAyQDprZo_nyTtnxJ78S7sKH&si=xnRgepxoG_pYCOyQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-md bg-red-600 px-4 text-sm font-medium text-white shadow-lg transition-all hover:bg-red-700 hover:shadow-xl hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  YouTube
                </a>
                
                <a
                  href="https://open.spotify.com/show/2rhGcAxL3Qium5LSOBij7y?si=NciSEqWTTviAwi7oSihFmw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-md bg-green-600 px-4 text-sm font-medium text-white shadow-lg transition-all hover:bg-green-700 hover:shadow-xl hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  Spotify
                </a>
                
                <a
                  href="https://podcasts.apple.com/us/podcast/the-flow-ai-podcast/id1828241221"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-md bg-purple-600 px-4 text-sm font-medium text-white shadow-lg transition-all hover:bg-purple-700 hover:shadow-xl hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.182c5.423 0 9.818 4.395 9.818 9.818 0 5.423-4.395 9.818-9.818 9.818-5.423 0-9.818-4.395-9.818-9.818 0-5.423 4.395-9.818 9.818-9.818zM12 5.455c-3.614 0-6.545 2.931-6.545 6.545 0 2.543 1.455 4.745 3.575 5.836v-2.11c-1.305-.872-2.166-2.345-2.166-4.027 0-2.678 2.17-4.848 4.848-4.848s4.848 2.17 4.848 4.848c0 1.682-.861 3.155-2.166 4.027v2.11c2.12-1.091 3.575-3.293 3.575-5.836 0-3.614-2.931-6.545-6.545-6.545zm0 4.364c-1.204 0-2.182.978-2.182 2.182 0 .804.436 1.506 1.09 1.885v4.023c0 .603.489 1.091 1.092 1.091s1.091-.488 1.091-1.091v-4.023c.654-.379 1.091-1.081 1.091-1.885 0-1.204-.978-2.182-2.182-2.182z"/>
                  </svg>
                  Apple
                </a>
              </div>
            </div>
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
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const ageCategory = getPostAgeCategory(post.metadata.date);
                const isLegacy = ageCategory === 'legacy';
                const isRecent = ageCategory === 'recent';

                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className={`group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow ${
                      isLegacy
                        ? 'border-l-4 border-l-amber-500/50 opacity-90'
                        : isRecent
                        ? 'border-l-4 border-l-emerald-500/50'
                        : ''
                    }`}
                  >
                    {isLegacy && (
                      <span className="absolute top-3 right-3 inline-flex items-center rounded-md bg-amber-50 dark:bg-amber-950/30 px-2 py-1 text-xs font-medium text-amber-700 dark:text-amber-400 ring-1 ring-inset ring-amber-600/20 dark:ring-amber-500/30 z-10">
                        Legacy
                      </span>
                    )}
                    {isRecent && (
                      <span className="absolute top-3 right-3 inline-flex items-center rounded-md bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 ring-1 ring-inset ring-emerald-600/20 dark:ring-emerald-500/30 z-10">
                        New
                      </span>
                    )}
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {post.metadata.title}
                      </h3>
                      <p className={`text-sm text-muted-foreground line-clamp-3 ${isLegacy ? 'opacity-80' : ''}`}>
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
                );
              })}
            </div>
            <div className="flex justify-center mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center text-sm font-medium text-primary hover:underline"
              >
                View all posts →
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
