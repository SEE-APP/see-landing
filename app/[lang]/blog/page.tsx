import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NewsSearch from '@/components/blog/NewsSearch';
import PageHero from '@/components/ui/PageHero';
import { hasLocale, locales } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { getAllPosts, localizeCard } from '@/lib/blog';
import { blogPath, homeHref, localeHref } from '@/lib/site';

export async function generateMetadata({ params }: PageProps<'/[lang]/blog'>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { news } = await getDictionary(lang);

  return {
    title: news.meta.title,
    description: news.meta.description,
    alternates: {
      canonical: localeHref(lang, blogPath),
      languages: Object.fromEntries(locales.map((locale) => [locale, localeHref(locale, blogPath)])),
    },
    openGraph: {
      title: news.meta.title,
      description: news.meta.description,
      locale: lang,
      type: 'website',
    },
  };
}

export default async function BlogPage({ params }: PageProps<'/[lang]/blog'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { news, nav } = await getDictionary(lang);
  const posts = getAllPosts().map((post) => localizeCard(post, lang));
  const tags = [...new Set(posts.flatMap((post) => post.tags))];

  return (
    <>
      <PageHero
        title={news.title}
        description={news.description}
        back={{ href: homeHref(lang), label: nav.backToHome }}
      />
      <div className="page-container">
        <div className="mx-auto max-w-content border-t border-line pt-12 pb-24 md:pt-16 md:pb-32">
          <NewsSearch
            lang={lang}
            posts={posts}
            tags={tags}
            t={{ searchLabel: news.searchLabel, empty: news.empty, tagFilterLabel: news.tagFilterLabel }}
          />
        </div>
      </div>
    </>
  );
}
