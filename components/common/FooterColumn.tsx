import Typography from '@/components/ui/Typography';
import type { FooterColumnProps } from '@/types/layout';

export default function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div>
      <Typography as="h2" size={14} weight="semibold">
        {title}
      </Typography>
      <div className="mt-5">{children}</div>
    </div>
  );
}
