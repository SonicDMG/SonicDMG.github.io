import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'SonicDMG Blog',
    template: '%s | SonicDMG Blog',
  },
  description: 'Technical blog about software engineering, distributed systems, and technology',
  keywords: ['blog', 'software engineering', 'distributed systems', 'cassandra', 'datastax', 'technology'],
  authors: [{ name: 'David Gilardi' }],
  creator: 'David Gilardi',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sonicdmg.github.io',
    siteName: 'SonicDMG Blog',
    title: 'SonicDMG Blog',
    description: 'Technical blog about software engineering, distributed systems, and technology',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SonicDMG Blog',
    description: 'Technical blog about software engineering, distributed systems, and technology',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background text-foreground">
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
                Built with Next.js, TypeScript, and Tailwind CSS. © {new Date().getFullYear()} David Gilardi
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

// Made with Bob
