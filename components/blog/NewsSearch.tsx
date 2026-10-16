'use client';
// client: filter posts by the typed query
import { useState } from 'react';
import Field from '@/components/ui/Field';
import Input from '@/components/ui/Input';
import { format } from '@/i18n/format';
import { filterPosts } from '@/lib/filter-posts';
import type { NewsSearchProps } from '@/types/blog';
import NewsList from './NewsList';

const searchId = 'news-search';

export default function NewsSearch({ lang, posts, tags, t }: NewsSearchProps) {
  const [query, setQuery] = useState('');
  const visiblePosts = filterPosts(posts, query);
  const activeTag = query.trim().toLowerCase();

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <Field id={searchId} label={t.searchLabel}>
          <Input
            id={searchId}
            type="search"
            name="q"
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </Field>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {tags.map((tag) => (
            <li key={tag}>
              <button
                type="button"
                aria-pressed={activeTag === tag.toLowerCase()}
                aria-label={format(t.tagFilterLabel, { tag })}
                onClick={() => setQuery(activeTag === tag.toLowerCase() ? '' : tag)}
                className="rounded-sm text-14 text-ink-muted transition-colors duration-200 hover:text-ink aria-pressed:text-accent focus-ring"
              >
                {tag}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {visiblePosts.length > 0 ? (
        <NewsList lang={lang} posts={visiblePosts} headingAs="h2" />
      ) : (
        <p role="status" className="text-18 text-ink-muted">
          {t.empty}
        </p>
      )}
    </div>
  );
}
