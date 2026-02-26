interface TagListProps {
  tags: string[];
}

export default function TagList({ tags }: TagListProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 pt-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
