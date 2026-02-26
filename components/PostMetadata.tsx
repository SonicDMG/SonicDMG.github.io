import { formatDate } from '@/lib/utils';

interface PostMetadataProps {
  date: string;
  readingTime: string;
  author?: string;
  category?: string;
}

export default function PostMetadata({ date, readingTime, author, category }: PostMetadataProps) {
  return (
    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
      <time dateTime={date}>{formatDate(date)}</time>
      <span>•</span>
      <span>{readingTime}</span>
      {author && (
        <>
          <span>•</span>
          <span>{author}</span>
        </>
      )}
      {category && (
        <>
          <span>•</span>
          <span className="capitalize">{category}</span>
        </>
      )}
    </div>
  );
}
