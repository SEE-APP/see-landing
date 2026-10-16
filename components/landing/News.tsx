import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import NewsList from '@/components/blog/NewsList';
import LandingSection from '@/components/ui/LandingSection';
import { getLatestPosts, localizeCard } from '@/lib/blog';
import { blogPath, localeHref } from '@/lib/site';
import type { NewsProps } from '@/types/sections';

const highlightCount = 3;

export default function News({ lang, t }: NewsProps) {
  const posts = getLatestPosts(highlightCount).map((post) => localizeCard(post, lang));

  return (
    <LandingSection id="news" titleId="news-title" title={t.title} paragraphs={[t.description]}>
      <NewsList lang={lang} posts={posts} />
      <div className="mt-12 md:mt-16">
        <Link
          href={localeHref(lang, blogPath)}
          className="inline-flex items-center gap-2 rounded-sm text-16 text-accent transition-colors duration-200 hover:text-accent-hover focus-ring"
        >
          {t.viewAll}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </LandingSection>
  );
}
