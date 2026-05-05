'use client';

import { useState } from 'react';
import YouTubeEmbed from './YouTubeEmbed';

interface CollapsibleVideoProps {
  videoId: string;
  title?: string;
  summary?: string;
}

export default function CollapsibleVideo({ 
  videoId, 
  title = "YouTube video",
  summary = "📺 Prefer to watch? Click here to view the video"
}: CollapsibleVideoProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <details 
      className="my-6 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden"
      onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="cursor-pointer px-4 py-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium">
        {summary}
      </summary>
      <div className="p-4">
        {isOpen && <YouTubeEmbed videoId={videoId} title={title} />}
      </div>
    </details>
  );
}

// Made with Bob
