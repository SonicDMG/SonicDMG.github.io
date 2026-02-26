export const metadata = {
  title: 'About',
  description: 'Learn more about me and this blog.',
};

export default function AboutPage() {
  return (
    <div className="container max-w-3xl py-12">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">About</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground">
            Welcome to my technical blog where I share insights about software engineering,
            distributed systems, and technology.
          </p>

          <h2>About Me</h2>
          <p>
            I'm David Gilardi, a software engineer passionate about building scalable systems
            and exploring new technologies. This blog is where I document my learnings,
            share technical insights, and discuss interesting problems in software development.
          </p>

          <h2>Topics I Write About</h2>
          <ul>
            <li>Distributed Systems & Databases</li>
            <li>Software Architecture & Design Patterns</li>
            <li>Cloud Technologies & DevOps</li>
            <li>Programming Languages & Frameworks</li>
            <li>Performance Optimization</li>
          </ul>

          <h2>Get in Touch</h2>
          <p>
            Feel free to reach out if you'd like to discuss any of the topics I write about
            or if you have questions about my posts.
          </p>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
