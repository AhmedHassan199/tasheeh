import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

export function LanguageToggle({ className = '' }) {
  const { i18n } = useTranslation();
  const next = i18n.language?.startsWith('en') ? 'ar' : 'en';
  const label = next === 'en' ? 'EN' : 'AR';
  return (
    <button
      type="button"
      onClick={() => i18n.changeLanguage(next)}
      aria-label="Switch language"
      className={`relative inline-flex h-10 items-center gap-2 rounded-full border border-ink-900/10 dark:border-ink-100/15 bg-white/40 dark:bg-ink-900/40 backdrop-blur-md px-3 text-sm font-bold text-ink-800 dark:text-ink-100 transition-all hover:text-flame-500 hover:border-flame-500/40 ${className}`}
    >
      <Languages size={16} />
      <span className="tracking-wider">{label}</span>
    </button>
  );
}
