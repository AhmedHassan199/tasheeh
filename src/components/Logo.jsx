// Brand mark — uses the actual logo asset shipped from public/logo.jpg.
// The orange tile is part of the source image, so we just render it as-is
// and let the cream text color follow whichever theme we're in.

export function Logo({ size = 44, withWordmark = true, className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} dir="rtl">
      <img
        src="/logo.jpg"
        alt="أكاديمية تصحيح"
        width={size}
        height={size}
        className="rounded-xl object-cover shadow-flame"
        style={{ width: size, height: size }}
      />
      {withWordmark && (
        <span
          className="font-extrabold leading-none text-ink-800 dark:text-ink-100"
          style={{ fontSize: size * 0.5 }}
        >
          أكاديمية تصحيح
        </span>
      )}
    </div>
  );
}
