import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import Typography from '@/components/ui/Typography';
import type { NewsMarkdownProps } from '@/types/blog';

/** Posts are authored by the team, but only these elements render; raw HTML never does. */
const allowedElements = ['p', 'h2', 'h3', 'ul', 'ol', 'li', 'a', 'strong', 'em', 'blockquote'];

const listClasses = 'mt-6 space-y-3 pl-6 text-18 leading-[1.8] text-ink marker:text-ink-subtle';

const components: Components = {
  p: ({ children }) => (
    <Typography as="p" size={18} className="mt-6 text-pretty leading-[1.8] text-ink">
      {children}
    </Typography>
  ),
  h2: ({ children }) => (
    <Typography as="h2" size={32} weight="semibold" className="mt-16 border-t border-line pt-8 text-balance">
      {children}
    </Typography>
  ),
  h3: ({ children }) => (
    <Typography as="h3" size={20} weight="semibold" className="mt-10 text-balance">
      {children}
    </Typography>
  ),
  ul: ({ children }) => <ul className={`${listClasses} list-disc`}>{children}</ul>,
  ol: ({ children }) => <ol className={`${listClasses} list-decimal`}>{children}</ol>,
  li: ({ children }) => <li className="pl-1">{children}</li>,
  a: ({ href, children }) => (
    <a
      href={href}
      {...(href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="rounded-sm text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-200 hover:text-accent-hover focus-ring"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  blockquote: ({ children }) => (
    <blockquote className="mt-10 border-l-2 border-accent pl-6 text-20 leading-[1.6] text-ink">{children}</blockquote>
  ),
};

export default function NewsMarkdown({ children }: NewsMarkdownProps) {
  return (
    <ReactMarkdown allowedElements={allowedElements} unwrapDisallowed components={components}>
      {children}
    </ReactMarkdown>
  );
}
