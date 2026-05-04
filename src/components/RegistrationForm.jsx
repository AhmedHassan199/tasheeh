import { forwardRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, User, Mail, Phone, GraduationCap, Sparkles } from 'lucide-react';
import { teachers } from '../data/teachers.js';
import { Ornament } from './Ornament.jsx';

const initial = { name: '', email: '', phone: '', teacher: '' };

export const RegistrationForm = forwardRef(function RegistrationForm(
  { presetTeacherId, onPresetConsumed },
  ref
) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | done

  // Apply preset (when user clicked "Register with X" from a modal)
  useEffect(() => {
    if (!presetTeacherId) return;
    setForm((f) => ({ ...f, teacher: presetTeacherId }));
    onPresetConsumed?.();
  }, [presetTeacherId, onPresetConsumed]);

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 3) e.name = 'الاسم لا يقل عن ٣ أحرف';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'بريد إلكتروني غير صالح';
    if (!/^[+\d\s-]{8,}$/.test(form.phone)) e.phone = 'رقم هاتف غير صالح';
    if (!form.teacher) e.teacher = 'اختر أستاذًا';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setStatus('submitting');
    // Simulate request — replace with the real Google Form / API call.
    await new Promise((r) => setTimeout(r, 1100));
    setStatus('done');
  };

  const reset = () => {
    setForm(initial);
    setStatus('idle');
    setErrors({});
  };

  return (
    <section
      id="register"
      ref={ref}
      className="relative overflow-hidden py-24 sm:py-32 bg-paper-texture"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-radial-flame opacity-60"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left column — pitch */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <span className="eyebrow">التسجيل</span>
            <h2 className="section-title mt-6">
              ابدأ رحلتك مع <span className="text-flame-gradient">الحرف</span>.
            </h2>
            <Ornament className="mt-6 h-3 w-44 text-flame-500/70" />
            <p className="mt-6 text-lg leading-relaxed text-ink-700/85 dark:text-ink-200/85">
              املأ النموذج وسيتواصل معك فريق الأكاديمية خلال ٢٤ ساعة لتحديد موعد الحصة
              التجريبية واختيار الباقة المناسبة لك.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                '٤ دروس فردية شهريًا مع أستاذك',
                'تصحيح بالفيديو + الصورة على Google Drive',
                'باقات مرنة: شهري · ربع سنوي · سنوي',
                'منهج تدريجي من الحرف إلى النص',
              ].map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-3 rounded-2xl border border-ink-900/10 dark:border-ink-100/10 bg-paper/70 dark:bg-[#150B07]/70 px-4 py-3"
                >
                  <span className="mt-0.5 grid h-7 w-7 place-items-center rounded-full bg-flame-500 text-ink-100">
                    <Check size={14} />
                  </span>
                  <span className="text-ink-800 dark:text-ink-100">{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right column — form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-[32px] border border-ink-900/10 dark:border-ink-100/10 bg-paper/90 dark:bg-[#150B07]/85 p-6 sm:p-10 shadow-soft backdrop-blur-md">
              <AnimatePresence mode="wait">
                {status === 'done' ? (
                  <SuccessState key="done" form={form} reset={reset} />
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    noValidate
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        label="الاسم الكامل"
                        icon={User}
                        value={form.name}
                        onChange={(v) => setForm({ ...form, name: v })}
                        error={errors.name}
                        autoComplete="name"
                      />
                      <Field
                        label="البريد الإلكتروني"
                        icon={Mail}
                        type="email"
                        dir="ltr"
                        value={form.email}
                        onChange={(v) => setForm({ ...form, email: v })}
                        error={errors.email}
                        autoComplete="email"
                      />
                      <Field
                        label="رقم الهاتف"
                        icon={Phone}
                        type="tel"
                        dir="ltr"
                        value={form.phone}
                        onChange={(v) => setForm({ ...form, phone: v })}
                        error={errors.phone}
                        autoComplete="tel"
                      />

                      <SelectField
                        label="الأستاذ المُفضّل"
                        icon={GraduationCap}
                        value={form.teacher}
                        onChange={(v) => setForm({ ...form, teacher: v })}
                        error={errors.teacher}
                        options={teachers.map((t) => ({
                          value: t.id,
                          label: `${t.name} — ${t.styles.join('، ')}`,
                        }))}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="btn-flame mt-8 w-full justify-center text-base !py-4 disabled:opacity-70"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          جاري الإرسال...
                        </>
                      ) : (
                        <>
                          <Sparkles size={18} />
                          أرسل طلب التسجيل
                        </>
                      )}
                    </button>

                    <p className="mt-4 text-center text-xs text-ink-600/70 dark:text-ink-300/70">
                      بإرسالك للنموذج، توافق على سياسة الخصوصية الخاصة بأكاديمية تصحيح.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

function Field({ label, icon: Icon, type = 'text', value, onChange, error, dir, autoComplete }) {
  return (
    <label className="block">
      <span className="block text-sm font-bold text-ink-700 dark:text-ink-200 mb-2">
        {label}
      </span>
      <div
        className={`group flex items-center gap-3 rounded-2xl border bg-paper/80 dark:bg-[#1E120A]/80 px-4 transition-colors ${
          error
            ? 'border-flame-500/70'
            : 'border-ink-900/10 dark:border-ink-100/10 focus-within:border-flame-500'
        }`}
      >
        <Icon className="text-ink-500 group-focus-within:text-flame-500 transition-colors" size={18} />
        <input
          type={type}
          dir={dir}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent py-3.5 outline-none text-ink-900 dark:text-ink-100 placeholder:text-ink-500/70"
        />
      </div>
      {error && <span className="mt-1.5 inline-block text-xs text-flame-600">{error}</span>}
    </label>
  );
}

function SelectField({ label, icon: Icon, value, onChange, error, options }) {
  return (
    <label className="block sm:col-span-2">
      <span className="block text-sm font-bold text-ink-700 dark:text-ink-200 mb-2">
        {label}
      </span>
      <div
        className={`group flex items-center gap-3 rounded-2xl border bg-paper/80 dark:bg-[#1E120A]/80 px-4 transition-colors ${
          error
            ? 'border-flame-500/70'
            : 'border-ink-900/10 dark:border-ink-100/10 focus-within:border-flame-500'
        }`}
      >
        <Icon className="text-ink-500 group-focus-within:text-flame-500 transition-colors" size={18} />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-transparent py-3.5 outline-none text-ink-900 dark:text-ink-100"
        >
          <option value="">— اختر أستاذًا —</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      {error && <span className="mt-1.5 inline-block text-xs text-flame-600">{error}</span>}
    </label>
  );
}

function SuccessState({ form, reset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45 }}
      className="text-center py-6"
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-flame-500 text-ink-100 shadow-flame"
      >
        <Check size={36} />
      </motion.span>
      <h3 className="mt-6 text-3xl font-extrabold text-ink-900 dark:text-ink-100">
        تمَّ استلام طلبك بنجاح
      </h3>
      <p className="mt-3 mx-auto max-w-md leading-relaxed text-ink-700 dark:text-ink-200">
        أهلًا <span className="font-bold text-flame-600">{form.name}</span> — سيتواصل معك
        فريقنا خلال <span className="font-bold">٢٤ ساعة</span> على البريد <span dir="ltr">{form.email}</span>
        لترتيب أوّل حصّة لك.
      </p>
      <button type="button" onClick={reset} className="btn-ghost mt-8">
        إرسال طلب آخر
      </button>
    </motion.div>
  );
}
