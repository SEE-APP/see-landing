import Image from 'next/image';
import BackLink from '@/components/ui/BackLink';
import Typography from '@/components/ui/Typography';
import { blogPath, localeHref } from '@/lib/site';
import type { NewsArticleProps } from '@/types/blog';
import NewsMarkdown from './NewsMarkdown';
import ShareButton from './ShareButton';

export default function NewsArticle({ lang, post, url, t }: NewsArticleProps) {
  return (
    <article className="page-container">
      <div className="mx-auto max-w-content pt-12 pb-24 md:pt-20 md:pb-32">
        <BackLink href={localeHref(lang, blogPath)} label={t.backToNews} />

        <header className="mt-10 max-w-3xl">
          <Typography as="p" size={14} tone="muted">
            <time dateTime={post.publishedAt}>{post.dateLabel}</time>
            {post.tags.map((tag) => (
              <span key={tag}> · {tag}</span>
            ))}
          </Typography>
          <Typography as="h1" variant="display" className="mt-4">
            {post.title}
          </Typography>
        </header>

        <Image
          src={post.cover}
          alt={post.coverAlt}
          sizes="(min-width: 1100px) 1100px, 100vw"
          className="mt-12 aspect-video w-full rounded-2xl bg-surface object-cover"
        />

        <div className="mx-auto mt-12 max-w-2xl md:mt-16">
          <NewsMarkdown>{post.body}</NewsMarkdown>
          <div className="mt-14 border-t border-line pt-8">
            <ShareButton title={post.title} url={url} t={{ share: t.share, shareLabel: t.shareLabel, copied: t.copied }} />
          </div>
        </div>
      </div>
    </article>
  );
}
