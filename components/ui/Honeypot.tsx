import { honeypotField } from '@/lib/content/contact';

/**
 * A field people never see or reach, but bots that fill every input do. The Server Action drops the request
 * if it has a value. `hidden` (not visually-hidden) so browser autofill and password managers skip it.
 */
export default function Honeypot() {
  return (
    <div hidden>
      <input
        type="text"
        name={honeypotField}
        tabIndex={-1}
        autoComplete="off"
        data-1p-ignore
        data-lpignore="true"
        data-bwignore
        data-form-type="other"
        defaultValue=""
      />
    </div>
  );
}
