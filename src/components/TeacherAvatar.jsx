import { useTranslation } from 'react-i18next';

// Story-style circular avatar with a vibrant interactive border.
// - Unseen  → vibrant orange conic gradient ring (entices exploration).
// - Seen    → muted gray ring.
// يعتمد على teacher.slug | teacher.name_ar | teacher.scripts فى البيانات.
export function TeacherAvatar({
  teacher,
  seen = false,
  dim = false,
  size = 'lg',
  showMeta = true,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
}) {
  const { t, i18n } = useTranslation();
  const isAr = (i18n.language || 'ar').startsWith('ar');
  const name = isAr
    ? (teacher.name_ar || teacher.name_en || '')
    : (teacher.name_en || teacher.name_ar || '');
  const scripts = (teacher.scripts || []).map((s) => t(`scripts.${s}`)).join(' · ');

  const ring = size === 'sm' ? 'h-[68px] w-[68px]' : 'h-28 w-28 sm:h-32 sm:w-32';
  const img  = size === 'sm' ? 'h-16 w-16' : 'h-[6.25rem] w-[6.25rem] sm:h-[7.25rem] sm:w-[7.25rem]';

  return (
    <button
      type="button"
      data-card
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      className={`group flex shrink-0 flex-col items-center gap-3 outline-none transition-all duration-300
        ${dim ? 'opacity-35 scale-95' : 'opacity-100 scale-100'} hover:-translate-y-1.5`}
    >
      <span
        className={`relative grid ${ring} place-items-center rounded-full p-[3.5px] transition-all duration-500 ${
          seen
            ? 'bg-ink-300/70 dark:bg-ink-700/70'
            : 'bg-[conic-gradient(from_140deg,theme(colors.flame.600),theme(colors.flame.300),theme(colors.flame.500),theme(colors.flame.700),theme(colors.flame.600))] shadow-[0_0_0_1px_rgba(244,78,26,0.25)] group-hover:shadow-flame'
        }`}
      >
        {!seen && (
          <span aria-hidden className="absolute inset-0 rounded-full bg-flame-500/20 blur-md animate-pulse" />
        )}
        <span className="relative grid place-items-center rounded-full p-[3px] bg-paper dark:bg-[#120A05]">
          <img
            src={teacher.image}
            alt={name}
            loading="lazy"
            className={`${img} rounded-full object-cover`}
          />
        </span>
      </span>

      {showMeta && (
        <div className="text-center">
          <p
            className={`font-extrabold leading-tight transition-colors ${
              size === 'sm' ? 'text-xs sm:text-sm' : 'text-lg sm:text-xl'
            } text-ink-900 dark:text-ink-100 group-hover:text-flame-600 dark:group-hover:text-flame-400`}
          >
            {name}
          </p>
          <p
            className={`mt-0.5 font-bold text-flame-600/90 dark:text-flame-400/90 ${
              size === 'sm' ? 'text-[10px]' : 'text-sm'
            }`}
          >
            {scripts}
          </p>
        </div>
      )}
    </button>
  );
}
