import { useTranslation } from 'react-i18next';
import { Phone } from 'lucide-react';
import { DIAL_CODES } from '../lib/dialCodes.js';

// Compact phone input with a country-dial-code dropdown. Stores the dial
// code and the local number separately on the parent so the Sheet column
// receives a clean concatenation.
export function PhoneField({ code, number, onCodeChange, onNumberChange, error }) {
  const { t, i18n } = useTranslation();
  const isAr = (i18n.language || 'ar').startsWith('ar');
  const labelFor = (c) => (isAr ? c.ar : c.en);

  return (
    <label className="block sm:col-span-2">
      <span className="block text-sm font-bold text-ink-700 dark:text-ink-200 mb-2">
        {t('register.fields.phone')}
      </span>
      <div
        className={`flex items-stretch gap-2 rounded-2xl border bg-paper/80 dark:bg-[#1E120A]/80 transition-colors overflow-hidden ${
          error ? 'border-flame-500/70' : 'border-ink-900/10 dark:border-ink-100/10 focus-within:border-flame-500'
        }`}
      >
        <select
          aria-label={t('register.fields.phoneCode')}
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          className="appearance-none bg-paper/0 dark:bg-transparent py-3.5 ps-3 pe-2 text-sm font-bold text-ink-900 dark:text-ink-100 outline-none border-e border-ink-900/10 dark:border-ink-100/10"
          dir="ltr"
        >
          {DIAL_CODES.map((c) => (
            <option key={`${c.iso}-${c.dial}`} value={c.dial}>
              {c.flag} {c.dial} — {labelFor(c)}
            </option>
          ))}
        </select>
        <Phone className="self-center text-ink-500 shrink-0" size={18} />
        <input
          type="tel"
          dir="ltr"
          value={number}
          onChange={(e) => onNumberChange(e.target.value)}
          placeholder="123 456 7890"
          className="w-full bg-transparent py-3.5 pe-4 outline-none text-ink-900 dark:text-ink-100 placeholder:text-ink-500/60"
        />
      </div>
      {error && <span className="mt-1.5 inline-block text-xs text-flame-600">{error}</span>}
    </label>
  );
}
