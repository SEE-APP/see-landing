import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NewsArticle from '@/components/blog/NewsArticle';
import { hasLocale, locales, siteUrl } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { getAllPosts, getPostBySlug, localizePost } from '@/lib/blog';
import { blogPostHref } from '@/lib/site';

export function generateStaticParams() {
  return locales.flatMap((lang) => getAllPosts().map((post) => ({ lang, slug: post.slug })));
}

export async function generateMetadata({ params }: PageProps<'/[lang]/blog/[slug]'>): Promise<Metadata> {
  const { lang, slug } = await params;
  const source = getPostBySlug(slug);
  if (!hasLocale(lang) || !source) return {};
  const post = localizePost(source, lang);

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: blogPostHref(lang, slug),
      languages: Object.fromEntries(locales.map((locale) => [locale, blogPostHref(locale, slug)])),
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      locale: lang,
      type: 'article',
      publishedTime: post.publishedAt,
      images: [{ url: post.cover.src, width: post.cover.width, height: post.cover.height, alt: post.coverAlt }],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<'/[lang]/blog/[slug]'>) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const source = getPostBySlug(slug);
  if (!source) notFound();
  const { news } = await getDictionary(lang);

  return (
    <NewsArticle
      lang={lang}
      post={localizePost(source, lang)}
      url={new URL(blogPostHref(lang, slug), siteUrl).toString()}
      t={news}
    />
  );
}
