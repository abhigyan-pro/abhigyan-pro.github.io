// Small inline-SVG icon set (stroke-based, inherits currentColor).
// Keeps the site free of any icon-font CDN dependency.

const paths = {
  graduation: <path d="M22 10 12 5 2 10l10 5 10-5Zm-4 2.5V17c0 1.1-2.7 2.5-6 2.5S6 18.1 6 17v-4.5M22 10v6" />,
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
    </>
  ),
  plane: <path d="M10.2 2.3a1.4 1.4 0 0 1 2.3 0l2.6 5.1 5.7.8a1.4 1.4 0 0 1 .8 2.4l-4.1 4 1 5.6a1.4 1.4 0 0 1-2 1.5L12 19.3 6.9 22a1.4 1.4 0 0 1-2-1.5l1-5.6-4.1-4a1.4 1.4 0 0 1 .8-2.4l5.7-.8Z" transform="rotate(12 12 12)" />,
  star: <path d="m12 2 2.9 6.3 6.8.8-5 4.7 1.3 6.8L12 18.2 5.9 21.4l1.3-6.8-5-4.7 6.8-.8L12 2Z" />,
  trophy: (
    <>
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3M9 20h6M12 14v6" />
    </>
  ),
  users: (
    <>
      <path d="M16 20v-1.5A3.5 3.5 0 0 0 12.5 15h-5A3.5 3.5 0 0 0 4 18.5V20" />
      <circle cx="10" cy="8" r="3.2" />
      <path d="M20 20v-1.5a3.5 3.5 0 0 0-2.6-3.4M15.5 5a3.2 3.2 0 0 1 0 6" />
    </>
  ),
  brain: <path d="M9 3a3 3 0 0 0-3 3 3 3 0 0 0-1 5.8A3 3 0 0 0 7 17a3 3 0 0 0 5 1 3 3 0 0 0 5-1 3 3 0 0 0 2-5.2A3 3 0 0 0 18 6a3 3 0 0 0-3-3 3 3 0 0 0-3 1.5A3 3 0 0 0 9 3ZM12 4.5v13.5" />,
  satellite: (
    <>
      <path d="m4 13 3-3 3 3-3 3-3-3ZM7 10l3-3M10 13l3 3" />
      <path d="M13 11a4 4 0 0 1 4 4M13 7a8 8 0 0 1 8 8" />
    </>
  ),
  cpu: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M10 2v3M14 2v3M10 19v3M14 19v3M2 10h3M2 14h3M19 10h3M19 14h3" />
    </>
  ),
  external: <path d="M14 4h6v6M20 4l-9 9M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />,
  calendar: (
    <>
      <rect x="3" y="4.5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 2.5v4M16 2.5v4" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  envelope: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </>
  ),
}

export default function Icon({ name, size = 22, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name] || null}
    </svg>
  )
}
