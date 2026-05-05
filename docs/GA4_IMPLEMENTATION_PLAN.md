# Google Analytics 4 Implementation Plan

## Overview
This document outlines the plan to add Google Analytics 4 tracking to your sonicdmg.github.io Next.js static site.

## Implementation Approach

### Option 1: Script Tag in Layout (Recommended for Static Export)
Add GA4 scripts directly to [`app/layout.tsx`](../app/layout.tsx) using Next.js Script component.

**Pros:**
- Works perfectly with static export (`output: 'export'`)
- No build-time dependencies
- Simple to implement and maintain
- Scripts load on every page automatically

**Cons:**
- Measurement ID visible in source code (not a security issue for public sites)

### Option 2: Environment Variable Approach
Store GA4 Measurement ID in environment variable and inject at build time.

**Pros:**
- Cleaner separation of config
- Easy to use different IDs for staging/production

**Cons:**
- Requires rebuild to change ID
- More complex setup for static export

## Recommended Implementation Steps

### Step 1: Create Analytics Component
Create a new component at `components/GoogleAnalytics.tsx`:

```typescript
import Script from 'next/script';

export default function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
```

### Step 2: Update Root Layout
Modify [`app/layout.tsx`](../app/layout.tsx) to include the GoogleAnalytics component:

```typescript
import GoogleAnalytics from '@/components/GoogleAnalytics';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleAnalytics measurementId="G-XXXXXXXXXX" />
      </head>
      <body>
        {/* existing body content */}
      </body>
    </html>
  );
}
```

### Step 3: Test Implementation
1. Run development server: `npm run dev`
2. Open browser DevTools → Network tab
3. Verify requests to `googletagmanager.com`
4. Check GA4 Real-time reports in Google Analytics

### Step 4: Deploy
1. Build static site: `npm run build`
2. Verify `out/` directory contains analytics scripts
3. Deploy to GitHub Pages
4. Monitor GA4 for incoming traffic

## Privacy & GDPR Considerations

### Current Implementation (Basic)
The basic implementation above tracks all visitors without consent. This is:
- ✅ Legal in US
- ⚠️ May require consent banner for EU visitors (GDPR)
- ⚠️ May require consent for California visitors (CCPA)

### Optional: Add Consent Management
If you need GDPR compliance, consider:

1. **Cookie Consent Banner** - Use a library like `react-cookie-consent`
2. **Conditional Loading** - Only load GA4 after user consent
3. **IP Anonymization** - Already enabled by default in GA4

Example with consent:
```typescript
'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

export default function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    // Check localStorage for previous consent
    const hasConsent = localStorage.getItem('analytics-consent') === 'true';
    setConsent(hasConsent);
  }, []);

  if (!consent) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}');
          `,
        }}
      />
    </>
  );
}
```

## What GA4 Will Track

With this implementation, you'll automatically track:
- ✅ Page views
- ✅ User sessions
- ✅ Traffic sources (direct, referral, search)
- ✅ Geographic location (country/city)
- ✅ Device type (desktop/mobile/tablet)
- ✅ Browser and OS
- ✅ Page engagement time
- ✅ Scroll depth (with enhanced measurement)

### Enhanced Measurement (Automatic)
GA4 automatically tracks these events when enabled in your property:
- Outbound link clicks
- Site search
- Video engagement
- File downloads
- Scroll tracking

## Custom Event Tracking (Optional)

To track custom events (e.g., blog post reads, newsletter signups):

```typescript
// In any component
'use client';

export function BlogPost() {
  const trackReadTime = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'blog_read_complete', {
        post_title: 'Your Post Title',
        read_time: '5min'
      });
    }
  };

  return (
    <article onScroll={trackReadTime}>
      {/* content */}
    </article>
  );
}
```

## Verification Checklist

After implementation:
- [ ] GA4 scripts load in browser DevTools
- [ ] Real-time reports show active users
- [ ] Page views appear in GA4 dashboard
- [ ] No console errors related to analytics
- [ ] Static export builds successfully
- [ ] Analytics work on deployed GitHub Pages site

## Files to Modify

1. **Create:** `components/GoogleAnalytics.tsx` - Analytics component
2. **Modify:** [`app/layout.tsx`](../app/layout.tsx) - Add GoogleAnalytics component
3. **Optional:** Add TypeScript types for gtag to `lib/types.ts`

## Next Steps

1. Replace `G-XXXXXXXXXX` with your actual Measurement ID
2. Decide on privacy/consent approach
3. Implement the changes
4. Test locally
5. Deploy to GitHub Pages
6. Monitor GA4 dashboard

## Resources

- [Next.js Analytics Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
- [GA4 Event Reference](https://developers.google.com/analytics/devguides/collection/ga4/events)