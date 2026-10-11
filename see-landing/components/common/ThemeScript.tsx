'use client';
// client: renders the theme boot script as executable only in the server HTML (see below)

// Runs before first paint so a stored dark choice never flashes light. Light is the default.
const themeBootScript =
  "try{if(localStorage.getItem('theme')==='dark')document.documentElement.dataset.theme='dark'}catch(e){}";

// A script React creates in the browser never runs, and React warns about it. When the root
// layout remounts on the client (language switch, hot reload), render it as an inert data block;
// the server HTML keeps the executable copy, and hydration leaves that copy untouched.
export default function ThemeScript() {
  return (
    <script
      suppressHydrationWarning
      type={typeof window === 'undefined' ? undefined : 'text/plain'}
      dangerouslySetInnerHTML={{ __html: themeBootScript }}
    />
  );
}
