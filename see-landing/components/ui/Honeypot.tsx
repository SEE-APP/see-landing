import { honeypotField } from '@/lib/content/contact';

/** A field people never see or reach, but bots fill. The Server Action drops the request if it has a value. */
export default function Honeypot() {
  return (
    <div aria-hidden="true" className="sr-only">
      <input type="text" name={honeypotField} tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}
