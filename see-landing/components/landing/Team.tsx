import { team } from '@/lib/content/team';
import LinkedInIcon from '@/assets/icons/LinkedInIcon';
import Eyebrow from '@/components/ui/Eyebrow';
import Typography from '@/components/ui/Typography';
import { format } from '@/i18n/format';
import type { TeamProps } from '@/types/sections';

/* ---------------------------------------------------------------- */
/*  LinkedIn badge — small circular icon docked on the avatar's edge */
/* ---------------------------------------------------------------- */

function LinkedInBadge({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="bg-surface-solid text-accent transition-colors duration-200 hover:bg-accent-strong hover:text-on-accent"
      style={{
        position: 'absolute',
        bottom: '-2px',
        right: '-2px',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1.5px solid color-mix(in srgb, var(--accent) 60%, transparent)',
        boxShadow: '0 2px 8px var(--shadow-tint)',
        cursor: 'pointer',
      }}
    >
      <LinkedInIcon size={16} className="pointer-events-none" />
    </a>
  );
}

/* ---------------------------------------------------------------- */
/*  Team Section                                                    */
/* ---------------------------------------------------------------- */

export default function Team({ t }: TeamProps) {
  return (
    <section
      id="team"
      style={{
        backgroundColor: "transparent",
        padding: '6rem 0',
        position: 'relative',
        borderTop: "1px solid var(--section-rule)",
        userSelect: 'none',
      }}
    >
      <div className="page-container">
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <div>
            <Eyebrow label={t.eyebrow} />
          </div>
          <div>
            <Typography as="h2" size={32} weight="semibold" tone="default" className="mb-4 md:text-40">
              {t.title}
            </Typography>
          </div>
          <div>
            <Typography as="p" size={18} tone="muted" className="mx-auto max-w-2xl leading-relaxed">
              {t.description}
            </Typography>
          </div>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
            gap: '1.5rem',
          }}
        >
          {team.map((member) => {
            const { name, role } = t.members[member.id];
            return (
              <div
                key={member.id}
                className="transition-transform duration-300 ease-out-expo motion-safe:hover:-translate-y-1.5"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  background: 'var(--surface)',
                  boxShadow: 'var(--card-shadow)',
                  border: '1px solid var(--line)',
                  borderRadius: '1.5rem',
                  padding: '2rem 1.5rem',
                  cursor: 'default',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '116px',
                    height: '116px',
                    marginBottom: '1.25rem',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: '116px',
                      height: '116px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '2px solid color-mix(in srgb, var(--accent) 40%, transparent)',
                      boxShadow: '0 0 0 4px color-mix(in srgb, var(--accent) 8%, transparent)',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.avatar}
                      alt={name}
                      width={116}
                      height={116}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      draggable={false}
                    />
                  </div>

                  {member.linkedin && <LinkedInBadge href={member.linkedin} label={format(t.linkedinLabel, { name })} />}
                </div>

                <Typography as="h3" size={18} weight="semibold" tone="default" className="mb-1.5">
                  {name}
                </Typography>

                <Typography size={12} tone="accent" className="font-mono uppercase tracking-[0.06em]">
                  {role}
                </Typography>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </section>
  );
}