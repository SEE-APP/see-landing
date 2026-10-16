import type { StaticImageData } from 'next/image';
import type { Dictionary, Locale } from './i18n';

/** English is required; Georgian falls back to English when missing. */
export interface LocalizedString {
  en: string;
  ka?: string;
}

/** A post as authored in `lib/content/blog.ts`. */
export interface BlogPost {
  slug: string;
  /** ISO date, `YYYY-MM-DD`. */
  publishedAt: string;
  cover: StaticImageData;
  coverAlt: LocalizedString;
  tags: readonly LocalizedString[];
  title: LocalizedString;
  excerpt: LocalizedString;
  /** Markdown. */
  body: LocalizedString;
}

/** What a card, a list row or the search filter needs; no body, so it stays small when sent to a client leaf. */
export interface NewsCardPost {
  slug: string;
  publishedAt: string;
  /** `publishedAt` written out in the visitor's language. */
  dateLabel: string;
  cover: StaticImageData;
  coverAlt: string;
  tags: readonly string[];
  title: string;
  excerpt: string;
}

export interface NewsArticlePost extends NewsCardPost {
  body: string;
}

export interface NewsCardProps {
  post: NewsCardPost;
  href: string;
  /** Heading level under the page's own title: `h2` on the list page, `h3` inside a landing section. @default 'h3' */
  headingAs?: 'h2' | 'h3';
}

export interface NewsListProps {
  lang: Locale;
  posts: readonly NewsCardPost[];
  headingAs?: NewsCardProps['headingAs'];
}

/** The strings the search leaf uses; the rest of `news` stays on the server. */
export type NewsSearchCopy = Pick<Dictionary['news'], 'searchLabel' | 'empty' | 'tagFilterLabel'>;

export interface NewsSearchProps {
  lang: Locale;
  posts: readonly NewsCardPost[];
  /** Every tag used by `posts`, once each. */
  tags: readonly string[];
  t: NewsSearchCopy;
}

export interface NewsMarkdownProps {
  children: string;
}

/** The strings the share leaf uses. */
export type ShareButtonCopy = Pick<Dictionary['news'], 'share' | 'shareLabel' | 'copied'>;

export interface ShareButtonProps {
  title: string;
  /** Absolute URL of the article. */
  url: string;
  t: ShareButtonCopy;
}

export interface NewsArticleProps {
  lang: Locale;
  post: NewsArticlePost;
  /** Absolute URL of the article, for sharing. */
  url: string;
  t: Dictionary['news'];
}
