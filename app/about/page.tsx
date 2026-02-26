import Image from 'next/image';

export const metadata = {
  title: 'About',
  description: 'Developer Relations Engineer, distributed systems enthusiast, and ninja warrior in training.',
};

export default function AboutPage() {
  return (
    <div className="container max-w-3xl mx-auto py-12">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">About Me</h1>
        
        {/* Portrait Image */}
        <div className="pixel-image-frame portrait">
          <Image
            src="/david-portrait.jpg"
            alt="David Jones-Gilardi - Developer Relations Engineer and Ninja Warrior Enthusiast"
            width={300}
            height={300}
            className="mx-auto"
          />
          <div className="image-caption">
            [SYSTEM OPERATOR]
          </div>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground">
            Hey there! I'm David Gilardi—a Developer Relations Engineer at IBM who's equally comfortable
            debugging distributed databases and training for ninja warrior obstacles. Welcome to my corner
            of the internet where tech meets athleticism.
          </p>

          <h2>What I Do</h2>
          <p>
            I'm currently a Developer Relations Engineer at IBM, where I get to combine my passion for
            technology with helping developers succeed. With over 30 years of experience spanning software
            development, database administration, infrastructure, and management, I've seen the industry
            evolve from many angles.
          </p>

          {/* Conference/Professional Image */}
          <div className="pixel-image-frame conference">
            <Image
              src="/david-conference.jpg"
              alt="David Jones-Gilardi speaking at a technical conference"
              width={600}
              height={400}
              className="mx-auto"
            />
            <div className="image-caption">
              [CONFERENCE MODE ACTIVATED]
            </div>
          </div>

          <p>
            My technical sweet spots include distributed databases (especially Apache Cassandra and DataStax
            Enterprise), AI agents, RAG (Retrieval-Augmented Generation), and context engineering. I love
            diving deep into complex systems and then finding ways to make them accessible and understandable
            for others.
          </p>

          <h2>Beyond the Keyboard</h2>
          <p>
            When I'm not writing code or creating content, you'll find me training for ninja warrior
            competitions—because apparently, I enjoy challenging myself both mentally and physically.
            I have a background in aerial arts (aerial silks and fabric climbing), which taught me a lot
            about persistence, body awareness, and the importance of a good grip.
          </p>
          <p>
            I'm also a huge sci-fi and fantasy enthusiast, a gamer when time permits, and someone who
            genuinely enjoys home improvement projects (there's something satisfying about fixing things
            with your hands). And yes, I tinker with technology at home too—because apparently, I can't
            get enough of it.
          </p>

          <h2>Personal Life</h2>
          <p>
            I'm married with a family, and they're remarkably patient with my various obsessions—from
            late-night coding sessions to training for obstacle courses in the backyard. Life is about
            balance, even if that balance sometimes involves hanging upside down from aerial silks.
          </p>

          <h2>What You'll Find Here</h2>
          <p>
            This blog is where I share insights about distributed systems, databases, AI, developer
            relations, and whatever else catches my technical curiosity. I try to write the kind of
            content I wish I had when I was learning these topics—practical, honest, and hopefully
            helpful.
          </p>

          <h2>Let's Connect</h2>
          <p>
            I'm always happy to chat about technology, developer relations, distributed systems, or
            the best way to train for a warped wall. Find me on:
          </p>
          <ul>
            <li>
              <a href="https://github.com/SonicDMG" target="_blank" rel="noopener noreferrer">
                GitHub
              </a> - Where my code lives
            </li>
            <li>
              <a href="https://twitter.com/SonicDMG" target="_blank" rel="noopener noreferrer">
                Twitter
              </a> - Tech thoughts and occasional ninja warrior updates
            </li>
            <li>
              <a href="https://www.linkedin.com/in/david-gilardi" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a> - Professional connections and career stuff
            </li>
            <li>
              <a href="https://www.youtube.com/channel/UCOYqZ4ckEso2-lYQjzpeaoQ" target="_blank" rel="noopener noreferrer">
                YouTube
              </a> - Videos, demos, and technical content
            </li>
          </ul>
          <p>
            Feel free to reach out—whether you want to discuss distributed databases, share training
            tips, or just say hi. I'm always up for a good conversation.
          </p>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
