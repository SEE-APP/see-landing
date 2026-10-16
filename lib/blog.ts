import type { Locale } from '@/i18n/config';
import { blogPosts } from '@/lib/content/blog';
import type { BlogPost, LocalizedString, NewsArticlePost, NewsCardPost } from '@/types/blog';

function pick(value: LocalizedString, locale: Locale): string {
  return value[locale] ?? value.en;
}

/** Newest first. */
export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getLatestPosts(count: number): BlogPost[] {
  return getAllPosts().slice(0, count);
}

export function localizeCard(post: BlogPost, locale: Locale): NewsCardPost {
  return {
    slug: post.slug,
    publishedAt: post.publishedAt,
    dateLabel: formatPostDate(post.publishedAt, locale),
    cover: post.cover,
    coverAlt: pick(post.coverAlt, locale),
    tags: post.tags.map((tag) => pick(tag, locale)),
    title: pick(post.title, locale),
    excerpt: pick(post.excerpt, locale),
  };
}

export function localizePost(post: BlogPost, locale: Locale): NewsArticlePost {
  return { ...localizeCard(post, locale), body: pick(post.body, locale) };
}

/** UTC, so the server and every visitor print the same day. */
export function formatPostDate(isoDate: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(isoDate));
}
