# Blog Writing Guide

## 📝 Creating New Posts

### Quick Start

1. Create a new `.mdx` file in `content/posts/`:
```bash
touch content/posts/my-awesome-post.mdx
```

2. Add frontmatter and content:
```mdx
---
title: "My Awesome Post"
date: "2026-02-26"
description: "A compelling description for SEO"
tags: ["nextjs", "typescript", "tutorial"]
category: "tutorial"
author: "David Gilardi"
---

# My Awesome Post

Your content here...
```

3. Save and build:
```bash
npm run dev  # Preview locally
npm run build  # Build for production
```

## 📋 Frontmatter Reference

### Required Fields

- **title**: Post title (shown in listings and page title)
- **date**: Publication date in YYYY-MM-DD format
- **description**: Brief summary (used for SEO and post cards)

### Optional Fields

- **tags**: Array of tags (e.g., `["nextjs", "react", "typescript"]`)
- **category**: Single category (e.g., `"tutorial"`, `"announcement"`)
- **author**: Author name (defaults to site author)
- **image**: Featured image path (relative to `public/`)
- **draft**: Set to `true` to hide from production

### Example Frontmatter

```yaml
---
title: "Building a REST API with Node.js"
date: "2026-02-26"
description: "Learn how to build a scalable REST API using Node.js, Express, and TypeScript"
tags: ["nodejs", "express", "typescript", "api"]
category: "tutorial"
author: "David Gilardi"
draft: false
---
```

## ✍️ Writing Content

### Markdown Basics

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
~~Strikethrough~~

- Bullet list
- Another item

1. Numbered list
2. Another item

[Link text](https://example.com)

![Image alt text](/images/my-image.png)
```

### Code Blocks

Use triple backticks with language specification:

````markdown
```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

function greetUser(user: User): string {
  return `Hello, ${user.name}!`;
}
```
````

Supported languages include: `typescript`, `javascript`, `python`, `bash`, `json`, `yaml`, `css`, `html`, and more.

### Tables

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |
```

### Blockquotes

```markdown
> This is a blockquote.
> It can span multiple lines.
```

### Task Lists

```markdown
- [x] Completed task
- [ ] Incomplete task
- [ ] Another task
```

## 🎨 MDX Features

MDX allows you to use React components in your markdown:

### Future: Custom Components

Once you create custom components, you can use them like:

```mdx
<Callout type="info">
  This is an informational callout!
</Callout>

<CodePlayground language="javascript">
  const greeting = "Hello, World!";
  console.log(greeting);
</CodePlayground>
```

## 📁 File Naming

Use kebab-case for file names:
- ✅ `my-awesome-post.mdx`
- ✅ `getting-started-with-nextjs.mdx`
- ❌ `My Awesome Post.mdx`
- ❌ `getting_started_with_nextjs.mdx`

The file name becomes the URL slug:
- `my-awesome-post.mdx` → `/blog/my-awesome-post`

## 🖼️ Images

### Adding Images

1. Place images in `public/images/`:
```
public/
  images/
    my-post/
      diagram.png
      screenshot.jpg
```

2. Reference in your post:
```markdown
![Diagram description](/images/my-post/diagram.png)
```

### Image Best Practices

- Use descriptive alt text for accessibility
- Optimize images before uploading (compress, resize)
- Use WebP format when possible
- Keep images under 500KB

## 🏷️ Tags and Categories

### Tags

Use tags for specific topics:
- `["nextjs", "react", "typescript"]`
- `["database", "postgresql", "optimization"]`
- `["devops", "docker", "kubernetes"]`

### Categories

Use categories for broad groupings:
- `"tutorial"` - Step-by-step guides
- `"announcement"` - News and updates
- `"technical"` - Deep technical posts
- `"opinion"` - Thoughts and perspectives

## ✅ Pre-Publish Checklist

Before publishing a post:

- [ ] Frontmatter is complete and accurate
- [ ] Title is clear and compelling
- [ ] Description is concise (150-160 characters)
- [ ] Tags are relevant and consistent
- [ ] Code blocks have language specified
- [ ] Images have alt text
- [ ] Links are working
- [ ] Spelling and grammar checked
- [ ] Preview looks good locally (`npm run dev`)
- [ ] Build succeeds (`npm run build`)

## 🚀 Publishing

1. **Preview locally**:
```bash
npm run dev
# Visit http://localhost:3000/blog/your-post-slug
```

2. **Build and test**:
```bash
npm run build
```

3. **Commit and push**:
```bash
git add content/posts/your-post.mdx
git commit -m "Add new post: Your Post Title"
git push origin main
```

4. **Automatic deployment**: GitHub Actions will build and deploy your site automatically!

## 📊 Post Performance

After publishing, monitor:
- Reading time (automatically calculated)
- Social shares
- Comments/feedback
- Analytics (if configured)

## 💡 Tips for Great Posts

1. **Start with an outline** - Plan your structure first
2. **Write for your audience** - Know who you're writing for
3. **Use examples** - Code examples and real-world scenarios
4. **Break it up** - Use headings, lists, and images
5. **Edit ruthlessly** - Remove unnecessary words
6. **Get feedback** - Have someone review before publishing
7. **Update regularly** - Keep content current

## 🔗 Resources

- [Markdown Guide](https://www.markdownguide.org/)
- [MDX Documentation](https://mdxjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)

Happy writing! 🎉