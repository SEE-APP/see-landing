import { blogPostHref } from '@/lib/site';
import type { NewsListProps } from '@/types/blog';
import NewsCard from './NewsCard';

export default function NewsList({ lang, posts, headingAs }: NewsListProps) {
  return (
    <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-3">
      {posts.map((post) => (
        <li key={post.slug}>
          <NewsCard post={post} href={blogPostHref(lang, post.slug)} headingAs={headingAs} />
        </li>
      ))}
    </ul>
  );
}
