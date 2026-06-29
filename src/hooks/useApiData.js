import { useEffect, useState } from 'react';

/**
 * Hook عام لجلب بيانات من API مرة واحدة عند الـ mount.
 *
 *   const teachers = useApiData(api.teachers, FALLBACK_TEACHERS);
 *
 * - إذا كان الـ API معطّلًا أو فشل: تُستخدم البيانات الافتراضية فى نفس اللحظة.
 * - إذا نجح: تُستبدل بالنتيجة (مع AnimatePresence فى الـ UI، التغيير سلس).
 *
 * fallback يمكن أن يكون: قيمة أو دالة (تُستدعى مرة واحدة).
 */
export function useApiData(fetcher, fallback) {
  const initial = typeof fallback === 'function' ? fallback() : fallback;
  const [data, setData] = useState(initial);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ctrl = new AbortController();
    let alive = true;
    (async () => {
      const result = await fetcher({ signal: ctrl.signal });
      if (!alive) return;
      if (result !== null && result !== undefined) setData(result);
      setLoading(false);
    })();
    return () => { alive = false; ctrl.abort(); };
    // مرة واحدة فقط — fetcher يُعتبر مرجعًا ثابتًا (دالة من api object)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading };
}
