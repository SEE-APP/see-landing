import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import Typography from '@/components/ui/Typography';
import type { NewsMarkdownProps } from '@/types/blog';

/** Posts are authored by the team, but only these elements render; raw HTML never does. */
const allowedElements = ['p', 'h2', 'h3', 'ul', 'ol', 'li', 'a', 'strong', 'em', 'blockquote'];

const components: Components = {
  p: ({ children }) => (
    <Typography as="p" variant="body-lg" className="mt-6">
      {children}
    </Typography>
  ),
  h2: ({ children }) => (
    <Typography as="h2" size={32} weight="semibold" className="mt-14 text-balance">
      {children}
    </Typography>
  ),
  h3: ({ children }) => (
    <Typography as="h3" size={20} weight="semibold" className="mt-10 text-balance">
      {children}
    </Typography>
  ),
  ul: ({ children }) => (
    <ul className="mt-6 list-disc space-y-2 pl-6 text-18 leading-[1.7] text-ink-muted marker:text-ink-subtle">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-6 list-decimal space-y-2 pl-6 text-18 leading-[1.7] text-ink-muted marker:text-ink-subtle">
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  a: ({ href, children }) => (
    <a
      href={href}
      {...(href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="rounded-sm text-accent underline underline-offset-4 transition-colors duration-200 hover:text-accent-hover focus-ring"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  blockquote: ({ children }) => (
    <blockquote className="mt-8 border-l border-line pl-6 text-ink-muted">{children}</blockquote>
  ),
};

export default function NewsMarkdown({ children }: NewsMarkdownProps) {
  return (
    <ReactMarkdown allowedElements={allowedElements} unwrapDisallowed components={components}>
      {children}
    </ReactMarkdown>
  );
}
