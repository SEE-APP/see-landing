import Typography from '@/components/ui/Typography';
import type { ContactDetailRowProps } from '@/types/contact';

export default function ContactDetailRow({ label, children }: ContactDetailRowProps) {
  return (
    <div className="flex flex-col gap-1.5 border-t border-line py-5">
      <dt>
        <Typography size={14} tone="muted">
          {label}
        </Typography>
      </dt>
      <dd>{children}</dd>
    </div>
  );
}
