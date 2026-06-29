import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../lib/api.js';

/**
 * يجلب محتوى الموقع العام (hero/about/footer/...) من /api/site-content مرة واحدة
 * ويوفّره عبر Context. لو الـ API غير متاح → يبقى الـ map فارغًا، والمكوّنات
 * تستخدم نصوص i18n الافتراضية تلقائيًا.
 */
const SiteContentContext = createContext({});

export function SiteContentProvider({ children }) {
  const [map, setMap] = useState({});

  useEffect(() => {
    const ctrl = new AbortController();
    let alive = true;
    (async () => {
      const result = await api.siteContent({ signal: ctrl.signal });
      if (alive && result && typeof result === 'object') setMap(result);
    })();
    return () => { alive = false; ctrl.abort(); };
  }, []);

  return (
    <SiteContentContext.Provider value={map}>
      {children}
    </SiteContentContext.Provider>
  );
}

/** يرجع قسم معيّن (hero/about/footer/...) أو null لو غير مُعرَّف. */
export function useSiteContent(section) {
  const map = useContext(SiteContentContext);
  return section ? (map?.[section] ?? null) : map;
}
