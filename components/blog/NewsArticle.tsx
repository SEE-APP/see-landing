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

        <header className="mt-10 grid gap-6 md:mt-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-9">
            <Typography as="p" size={14} tone="muted">
              <time dateTime={post.publishedAt}>{post.dateLabel}</time>
              {post.tags.map((tag) => (
                <span key={tag}> · {tag}</span>
              ))}
            </Typography>
            <Typography as="h1" variant="display" className="mt-4">
              {post.title}
            </Typography>
          </div>
          <Typography as="p" variant="body-lg" className="md:col-span-7">
            {post.excerpt}
          </Typography>
        </header>

        <div className="mx-auto mt-12 max-w-2xl md:mt-16">
          <Image
            src={post.cover}
            alt={post.coverAlt}
            sizes="(min-width: 672px) 672px, 100vw"
            className="aspect-3/2 w-full rounded-2xl bg-surface object-cover"
          />
          <div className="mt-6">
            <NewsMarkdown>{post.body}</NewsMarkdown>
          </div>
          <div className="mt-16 border-t border-line pt-8">
            <ShareButton title={post.title} url={url} t={{ share: t.share, shareLabel: t.shareLabel, copied: t.copied }} />
          </div>
        </div>
      </div>
    </article>
  );
}
