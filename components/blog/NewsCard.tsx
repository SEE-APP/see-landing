import Image from 'next/image';
import Link from 'next/link';
import Typography from '@/components/ui/Typography';
import type { NewsCardProps } from '@/types/blog';

export default function NewsCard({ post, href, headingAs = 'h3' }: NewsCardProps) {
  return (
    <Link href={href} className="group block rounded-2xl focus-ring">
      <Image
        src={post.cover}
        alt={post.coverAlt}
        sizes="(min-width: 1100px) 340px, (min-width: 640px) 30vw, 100vw"
        className="aspect-4/3 w-full rounded-2xl bg-surface object-cover"
      />
      <div className="mt-5 flex flex-col gap-2">
        <Typography as="p" size={14} tone="muted">
          <time dateTime={post.publishedAt}>{post.dateLabel}</time>
          {post.tags.map((tag) => (
            <span key={tag}> · {tag}</span>
          ))}
        </Typography>
        <Typography
          as={headingAs}
          size={20}
          weight="semibold"
          className="transition-colors duration-200 group-hover:text-accent"
        >
          {post.title}
        </Typography>
        <Typography as="p" variant="body" className="line-clamp-3">
          {post.excerpt}
        </Typography>
      </div>
    </Link>
  );
}
