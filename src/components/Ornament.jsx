// The Tasheeh signature ornament: <◆◆── line ──◆>
// Reused throughout the site for headers, dividers, and accent flourishes.

export function Ornament({ className = '', flip = false, color = 'currentColor' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
    >
      <line x1="22" y1="6" x2="232" y2="6" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <rect x="3" y="2" width="6" height="6" transform="rotate(45 6 5)" fill={color} />
      <rect x="13" y="2" width="6" height="6" transform="rotate(45 16 5)" fill={color} />
      <rect x="226" y="2" width="6" height="6" transform="rotate(45 229 5)" fill={color} />
    </svg>
  );
}

export function OrnamentBoth({ className = '', color = 'currentColor' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <line x1="24" y1="6" x2="296" y2="6" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <rect x="3" y="2" width="6" height="6" transform="rotate(45 6 5)" fill={color} />
      <rect x="13" y="2" width="6" height="6" transform="rotate(45 16 5)" fill={color} />
      <rect x="302" y="2" width="6" height="6" transform="rotate(45 305 5)" fill={color} />
      <rect x="312" y="2" width="6" height="6" transform="rotate(45 315 5)" fill={color} />
    </svg>
  );
}

// Inky brush stroke used as a decorative accent under headings
export function InkStroke({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M5 14C36 6 70 4 100 6 130 8 160 14 195 9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M14 19C44 13 84 13 124 16 154 18 174 19 190 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.25"
      />
    </svg>
  );
}
