# Deployment Guide

## 🚀 Deploying to GitHub Pages

Your Next.js blog is configured to automatically deploy to GitHub Pages using GitHub Actions.

### Prerequisites

1. Your repository must be named `username.github.io` (e.g., `sonicdmg.github.io`)
2. GitHub Pages must be enabled in repository settings

### Setup Steps

#### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

#### 2. Push Your Code

```bash
# Add all files
git add .

# Commit changes
git commit -m "Initial Next.js blog setup"

# Push to main branch
git push origin main
```

#### 3. Monitor Deployment

1. Go to the **Actions** tab in your repository
2. Watch the "Deploy to GitHub Pages" workflow run
3. Once complete, your site will be live at `https://sonicdmg.github.io`

### Manual Deployment

If you prefer to deploy manually:

```bash
# Build the site
npm run build

# The static files are in the out/ directory
# You can deploy these files to any static hosting service
```

### Deployment Workflow

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:

1. Checks out your code
2. Sets up Node.js 20
3. Installs dependencies
4. Builds the Next.js site
5. Uploads the `out/` directory
6. Deploys to GitHub Pages

### Triggering Deployments

Deployments are triggered automatically when you:
- Push to the `main` branch
- Manually trigger the workflow from the Actions tab

### Troubleshooting

#### Build Fails

Check the Actions tab for error messages. Common issues:

- **TypeScript errors**: Fix type errors in your code
- **Missing dependencies**: Run `npm install` locally first
- **MDX parsing errors**: Check your MDX frontmatter syntax

#### Site Not Updating

1. Clear your browser cache
2. Wait a few minutes for GitHub's CDN to update
3. Check that the workflow completed successfully

#### 404 Errors

- Ensure `.nojekyll` file exists in `public/` directory
- Verify `basePath` is empty in `next.config.ts` for user sites
- Check that all routes are properly generated in the build

### Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public/` directory with your domain
2. Configure DNS settings with your domain provider
3. Enable HTTPS in GitHub Pages settings

Example `public/CNAME`:
```
blog.yourdomain.com
```

### Environment Variables

For production builds, you can add secrets in GitHub:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add your secrets
3. Reference them in the workflow file

### Performance Tips

- Images are automatically optimized during build
- CSS is minified and bundled
- JavaScript is code-split for optimal loading
- Static pages are pre-rendered for instant loading

### Monitoring

After deployment, monitor:
- Build times in GitHub Actions
- Site performance with Lighthouse
- Error logs in browser console
- Analytics (if configured)

## 🔄 Continuous Deployment

Every push to `main` triggers a new deployment. To prevent this:

1. Work on feature branches
2. Use pull requests for review
3. Merge to `main` only when ready to deploy

## 📊 Build Output

After a successful build, you'll see:

```
Route (app)
┌ ○ /                          # Homepage
├ ○ /about                     # About page
├ ○ /blog                      # Blog listing
└ ● /blog/[slug]               # Individual posts
```

- `○` = Static page (pre-rendered)
- `●` = SSG page (uses generateStaticParams)

## 🎉 Success!

Once deployed, your blog will be live at:
**https://sonicdmg.github.io**

Share your posts and enjoy your new modern blog! 🚀