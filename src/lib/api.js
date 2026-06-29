/**
 * طبقة الاتصال بـ Tasheeh System API.
 *
 * - الـ BASE URL يأتى من متغيّر بيئة Vite VITE_API_BASE.
 *   مثال: VITE_API_BASE=https://admin.tasheeh.com/api
 *   لو غير معرَّف → API معطّل، والموقع يستخدم البيانات المحلية الافتراضية.
 *
 * - كل دالة ترجع وعدًا بـ data أو null لو الـ API غير متوفّر/فشل.
 *   هكذا الموقع لا ينكسر إذا تعطّل الـ admin؛ يعمل بالبيانات الافتراضية.
 */

const API_BASE = import.meta.env.VITE_API_BASE || '';

/** هل الـ API مُهيَّأ؟ */
export const apiEnabled = () => !!API_BASE;

/**
 * نداء GET بسيط — يرجع البيانات أو null عند الفشل.
 * يطبع التحذير فى الـ console للمساعدة فى التشخيص دون كسر الموقع.
 */
async function getJson(path, { signal } = {}) {
  if (!API_BASE) return null;
  try {
    const res = await fetch(`${API_BASE}${path}`, { signal, headers: { Accept: 'application/json' } });
    if (!res.ok) {
      console.warn(`[api] ${path} → ${res.status}`);
      return null;
    }
    const payload = await res.json();
    return payload?.ok ? payload.data : null;
  } catch (e) {
    if (e.name === 'AbortError') return null;
    console.warn(`[api] ${path} →`, e.message);
    return null;
  }
}

export const api = {
  teachers:     (opts) => getJson('/teachers',      opts),
  teacher:      (slug, opts) => getJson(`/teachers/${slug}`, opts),
  reviews:      (opts) => getJson('/reviews',       opts),
  beforeAfter:  (opts) => getJson('/before-after',  opts),
  siteContent:  (opts) => getJson('/site-content',  opts),
  scripts:      (opts) => getJson('/scripts',       opts),
  features:     (opts) => getJson('/features',      opts),
  services:     (opts) => getJson('/services',      opts),

  /** إرسال طلب تسجيل جديد. ترجع true عند النجاح. */
  async sendLead(payload) {
    if (!API_BASE) return false;
    try {
      const res = await fetch(`${API_BASE}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.ok;
    } catch (e) {
      console.warn('[api] /leads →', e.message);
      return false;
    }
  },
};
