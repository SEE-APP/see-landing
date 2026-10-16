import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  SVGProps,
  TextareaHTMLAttributes,
} from 'react';

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> & { size?: number };

export type TypographySize = 14 | 16 | 18 | 20 | 32;
export type TypographyWeight = 'regular' | 'medium' | 'semibold';
export type TypographyTone = 'inherit' | 'muted' | 'subtle' | 'accent';
export type TypographyElement = 'span' | 'p' | 'h1' | 'h2' | 'h3';

export type TypographyVariant = 'display' | 'body-lg' | 'body';
export type TypographyTracking = 'tight' | 'normal';

interface TypographyBaseProps {
  /** @default 'span' */
  as?: TypographyElement;
  /**
   * Letter spacing. Defaults to `tight` for the `display` variant and for sizes of 28 and up,
   * and to the font's own spacing otherwise.
   */
  tracking?: TypographyTracking;
  id?: string;
  className?: string;
  children: ReactNode;
}

/** Sets size, weight and tone yourself. */
type TypographyCustomProps = TypographyBaseProps & {
  variant?: undefined;
  /** Font size in px, mapped to the `text-{size}` theme token. @default 16 */
  size?: TypographySize;
  /** @default 'regular' */
  weight?: TypographyWeight;
  /** @default 'inherit' */
  tone?: TypographyTone;
};

/**
 * A preset: `display` for section titles (40px, 64px from `md`), `body-lg` for the 18px lead
 * paragraph, `body` for the 16px one. A preset fixes size, weight and tone.
 */
type TypographyPresetProps = TypographyBaseProps & {
  variant: TypographyVariant;
  size?: never;
  weight?: never;
  tone?: never;
};

export type TypographyProps = TypographyCustomProps | TypographyPresetProps;

/** Title in the left column, body paragraphs in the right column from `md` up. */
export interface EditorialHeadingProps {
  /** Referenced by the section's `aria-labelledby`. */
  id: string;
  title: string;
  /** Omit for a title-only heading. */
  paragraphs?: readonly string[];
}

/** A landing page section: content column, editorial heading, then the section's content. */
export interface LandingSectionProps {
  /** Anchor for in-page links. */
  id: string;
  /** Id of the heading; the section's `aria-labelledby` points at it. */
  titleId: string;
  title: string;
  paragraphs?: readonly string[];
  children: ReactNode;
}

export interface BackLinkProps {
  href: string;
  label: string;
  className?: string;
}

/** The page's `<h1>` with a lead paragraph beside it. */
export interface PageHeroProps {
  title: string;
  description: string;
  /** A back link shown above the title. */
  back?: Pick<BackLinkProps, 'href' | 'label'>;
}

export interface NumberedListItem {
  id: string;
  /** Step number or year shown large above the title. */
  marker: string;
  title: string;
  description: string;
  /** Draws the accent rail and the accent marker; use for the latest entry of a timeline. */
  isCurrent?: boolean;
}

export interface NumberedListProps {
  items: readonly NumberedListItem[];
  /** Title and description size. `md` for steps, `sm` for a compact timeline. @default 'md' */
  size?: 'md' | 'sm';
  /** Colour every marker with the accent, not only the current item. */
  accentMarkers?: boolean;
}

export type ButtonVariant = 'filled' | 'outline';
/** Height and horizontal padding. */
export type ButtonSize = 'md' | 'sm';
export type ButtonShape = 'pill' | 'rounded';

type ButtonSharedProps = {
  label?: string;
  rightIcon?: ReactNode;
  /** @default 'filled' */
  variant?: ButtonVariant;
  /** @default 'md' */
  size?: ButtonSize;
  /** @default 'pill' */
  shape?: ButtonShape;
  fullWidth?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
};

type ButtonAsButton = ButtonSharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & { href?: undefined };

type ButtonAsLink = ButtonSharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children' | 'href'> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export interface PopoverPanelProps {
  /** Must be unique on the page; the trigger points at it with `popoverTarget`. */
  id: string;
  className?: string;
  /** Per-instance values only (e.g. the CSS anchor name). */
  style?: CSSProperties;
  /** Accessible name; required when `modal`. */
  'aria-label'?: string;
  /** Exposes the panel as a modal dialog: moves focus in on open and keeps Tab inside it. */
  modal?: boolean;
  children: ReactNode;
}

/** The panel opens below its trigger, right edges aligned. */
export type DropdownPlacement = 'bottom' | 'top';

export interface DropdownProps {
  id: string;
  /** Trigger content; a chevron is appended. */
  label: ReactNode;
  /** Side of the trigger the panel opens on; use `top` near the bottom of the page. @default 'bottom' */
  placement?: DropdownPlacement;
  children: ReactNode;
}

export type DropdownItemProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'> & {
  href: string;
  children: ReactNode;
};

interface ControlSharedProps {
  /** Marks the control as failing validation (red border, `aria-invalid`). */
  invalid?: boolean;
}

export type InputProps = InputHTMLAttributes<HTMLInputElement> & ControlSharedProps;
export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & ControlSharedProps;
export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & ControlSharedProps;

/** Label, control and messages of one form field. The control gets the same `id` and `describedBy(id, …)`. */
export interface FieldProps {
  /** `id` of the control; the label's `htmlFor`. */
  id: string;
  label: string;
  /** Shown beside the label, e.g. "Optional". */
  optionalLabel?: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}

export interface FormSuccessProps {
  title: string;
  body: string;
}

export interface AccentRuleProps {
  /** Slides the accent line in over the hairline. */
  isActive: boolean;
  /** Which border of the parent the line sits on. @default 'top' */
  edge?: 'top' | 'bottom';
}
