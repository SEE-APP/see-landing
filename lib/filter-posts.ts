import type { NewsCardPost } from '@/types/blog';

// Kept apart from `lib/blog.ts` so the client search leaf does not pull every post body into its bundle.
/** Case-insensitive match on the title and the tags; an empty query keeps every post. */
export function filterPosts(posts: readonly NewsCardPost[], query: string): NewsCardPost[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [...posts];

  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(needle) || post.tags.some((tag) => tag.toLowerCase().includes(needle)),
  );
}
