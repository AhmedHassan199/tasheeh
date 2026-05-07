import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Keeps <html lang> + <html dir> in sync with the current i18n language.
// Arabic -> rtl, others -> ltr. Plain Tailwind handles layout flipping
// because we standardised on logical CSS where it matters; the rest of
// the design is symmetric enough to avoid a full mirror sheet.
export function useDirection() {
  const { i18n } = useTranslation();
  useEffect(() => {
    const lang = i18n.language || 'ar';
    const dir = lang.startsWith('ar') ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [i18n.language]);
}
