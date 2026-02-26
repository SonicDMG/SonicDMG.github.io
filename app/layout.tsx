import type { Metadata } from 'next';
import { Press_Start_2P } from 'next/font/google';
import './globals.css';

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-press-start',
});

export const metadata: Metadata = {
  title: {
    default: 'SonicDMG',
    template: '%s | SonicDMG',
  },
  description: 'AI agents, RAG, context engineering, and ninja warrior training all rolled up into one, oddly shaped...bundle',
  keywords: ['AI agents', 'RAG', 'context engineering', 'LLM', 'artificial intelligence', 'ninja warrior', 'software engineering', 'technical evangelist', 'podcast'],
  authors: [{ name: 'David Jones-Gilardi' }],
  creator: 'David Jones-Gilardi',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sonicdmg.github.io',
    siteName: 'SonicDMG',
    title: 'SonicDMG',
    description: 'AI agents, RAG, context engineering, and ninja warrior training all rolled up into one, oddly shaped...bundle',
    images: [
      {
        url: 'https://sonicdmg.github.io/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SonicDMG - David Jones-Gilardi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SonicDMG',
    description: 'AI agents, RAG, context engineering, and ninja warrior training all rolled up into one, oddly shaped...bundle',
    creator: '@sonicdmg',
    images: ['https://sonicdmg.github.io/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${pressStart2P.variable} antialiased min-h-screen bg-background text-foreground`}>
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
              <div className="mr-4 flex">
                <a className="mr-6 flex items-center space-x-2" href="/">
                  <span className="font-bold text-xl">SonicDMG</span>
                </a>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                  <a
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                    href="/blog"
                  >
                    Blog
                  </a>
                  <a
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                    href="/about"
                  >
                    About
                  </a>
                </nav>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-border/40 py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built with Next.js, TypeScript, and Tailwind CSS. © {new Date().getFullYear()} David Jones-Gilardi
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

// Made with Bob
