import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Sparkles, ZoomIn, IdCard } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import { Ornament } from './Ornament.jsx';
import { useModalHistory } from '../hooks/useModalHistory.js';
import { teachers as ALL_TEACHERS } from '../data/teachers.js';

export function TeacherModal({ teacher, onClose, onSwitch, onRegister }) {
  const { t } = useTranslation();
  const [lbIndex, setLbIndex] = useState(-1);
  const isOpen = !!teacher;

  const namePlain     = teacher ? t(`teachers.list.${teacher.id}.namePlain`)     : '';
  const nationality   = teacher ? t(`teachers.list.${teacher.id}.nationality`)   : '';
  const dob           = teacher ? t(`teachers.list.${teacher.id}.dob`)           : '';
  const qualification = teacher ? t(`teachers.list.${teacher.id}.qualification`) : '';
  const studentOf     = teacher ? t(`teachers.list.${teacher.id}.studentOf`, { returnObjects: true }) : [];
  const awards        = teacher ? t(`teachers.list.${teacher.id}.awards`,    { returnObjects: true }) : [];
  const prefix        = t('teachers.prefix');
  const otherTeachers = teacher ? ALL_TEACHERS.filter((tt) => tt.id !== teacher.id) : [];

  useEffect(() => {
    if (!isOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  // Mobile back button: lightbox first, then the modal
  useModalHistory(isOpen && lbIndex < 0, onClose);
  useModalHistory(lbIndex >= 0, () => setLbIndex(-1));

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={namePlain}
          >
            <div className="absolute inset-0 bg-ink-900/70 backdrop-blur-md" />

            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-[61] w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/10 bg-paper dark:bg-[#120A05] shadow-ink"
            >
              {/* Header — image + name + scripts */}
              <div className="grid gap-0 md:grid-cols-12">
                <div className="relative md:col-span-5 aspect-[4/5] md:aspect-auto md:min-h-[420px] overflow-hidden">
                  <img src={teacher.image} alt={namePlain} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent md:bg-gradient-to-l" />
                  <div className="absolute inset-x-6 bottom-6 md:hidden">
                    <p className="text-sm font-semibold text-white/80">{prefix}</p>
                    <h2 className="text-3xl font-extrabold text-white">{namePlain}</h2>
                  </div>
                </div>

                <div className="relative md:col-span-7 p-7 sm:p-10">
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label={t('common.close')}
                    className="absolute end-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-ink-900/10 dark:border-ink-100/15 text-ink-700 dark:text-ink-200 hover:bg-flame-500 hover:text-white hover:border-transparent transition-colors"
                  >
                    <X size={18} />
                  </button>

                  <div className="hidden md:block">
                    <p className="text-sm font-semibold text-ink-500 dark:text-ink-300">{prefix}</p>
                    <h2 className="mt-1 text-4xl font-extrabold leading-tight text-ink-900 dark:text-ink-100">
                      {namePlain}
                    </h2>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {teacher.scripts.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-flame-500/40 bg-flame-500/10 px-3 py-1.5 text-sm font-bold text-flame-700 dark:text-flame-300"
                      >
                        {t(`scripts.${s}`)}
                      </span>
                    ))}
                  </div>

                  <Ornament className="mt-6 h-3 w-44 text-flame-500/70" />
                </div>
              </div>

              {/* Info box */}
              <div className="px-7 sm:px-10 mt-2">
                <div className="rounded-2xl border border-ink-900/10 dark:border-ink-100/10 bg-paper/70 dark:bg-[#170D07]/70 p-5 sm:p-6">
                  <div className="flex items-center gap-2.5 mb-4">
                    <IdCard className="text-flame-500" size={18} />
                    <h4 className="text-lg font-extrabold text-ink-900 dark:text-ink-100">
                      {t('teachers.info.title')}
                    </h4>
                  </div>

                  <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    <InfoRow label={t('teachers.info.name')}          value={namePlain} />
                    <InfoRow label={t('teachers.info.nationality')}  value={nationality} />
                    <InfoRow label={t('teachers.info.dob')}           value={dob} />
                    <InfoRow label={t('teachers.info.qualification')} value={qualification} />
                    <InfoRow
                      label={t('teachers.info.scripts')}
                      value={teacher.scripts.map((s) => t(`scripts.${s}`)).join('، ')}
                    />
                  </dl>

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-bold text-ink-600 dark:text-ink-300 mb-2">
                        {t('teachers.info.studentOf')}
                      </p>
                      <ul className="space-y-1.5">
                        {studentOf.map((s) => (
                          <li key={s} className="flex gap-2 text-ink-800 dark:text-ink-100 leading-relaxed">
                            <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-flame-500" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink-600 dark:text-ink-300 mb-2">
                        {t('teachers.info.awards')}
                      </p>
                      <ul className="space-y-1.5">
                        {awards.map((a) => (
                          <li key={a} className="flex gap-2 text-ink-800 dark:text-ink-100 leading-relaxed">
                            <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-flame-500" />
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gallery */}
              <div className="px-7 sm:px-10 mt-8">
                <h3 className="text-xl font-extrabold text-ink-900 dark:text-ink-100 mb-4">
                  {t('teachers.info.works')}
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {teacher.gallery.map((src, i) => (
                    <motion.button
                      type="button"
                      key={src}
                      onClick={() => setLbIndex(i)}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                      className="group relative overflow-hidden rounded-2xl border border-ink-900/10 dark:border-ink-100/10"
                    >
                      <img
                        src={src}
                        alt=""
                        className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <span className="absolute inset-0 grid place-items-center bg-ink-900/60 opacity-0 transition-opacity group-hover:opacity-100">
                        <ZoomIn size={26} className="text-white" />
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Other teachers — circular avatars to switch directly */}
              {otherTeachers.length > 0 && (
                <div className="px-7 sm:px-10 mt-8">
                  <p className="text-sm font-extrabold tracking-[0.18em] uppercase text-flame-600 dark:text-flame-400 mb-4">
                    {t('teachers.switchTeacher')}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    {otherTeachers.map((tt) => {
                      const otherName = t(`teachers.list.${tt.id}.namePlain`);
                      return (
                        <button
                          key={tt.id}
                          type="button"
                          onClick={() => onSwitch?.(tt)}
                          className="group flex flex-col items-center gap-1.5 transition-transform hover:-translate-y-1"
                        >
                          <span className="relative grid h-16 w-16 place-items-center overflow-hidden rounded-full border-2 border-ink-900/10 dark:border-ink-100/15 transition-colors group-hover:border-flame-500 group-hover:shadow-flame">
                            <img src={tt.image} alt={otherName} className="absolute inset-0 h-full w-full object-cover" />
                          </span>
                          <span className="text-xs font-bold text-ink-700 dark:text-ink-200 group-hover:text-flame-600 dark:group-hover:text-flame-400">
                            {otherName}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="sticky bottom-0 mt-10 border-t border-ink-900/10 dark:border-ink-100/10 bg-paper/95 dark:bg-[#120A05]/95 backdrop-blur-md px-7 sm:px-10 py-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="text-flame-500" size={18} />
                  <p className="font-bold text-ink-700 dark:text-ink-200">
                    {t('teachers.ctaPrompt')} {namePlain}؟
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onRegister?.(teacher);
                    onClose();
                  }}
                  className="btn-flame"
                >
                  {t('teachers.registerWith')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Lightbox
        open={lbIndex >= 0}
        index={lbIndex < 0 ? 0 : lbIndex}
        close={() => setLbIndex(-1)}
        slides={(teacher?.gallery || []).map((src) => ({ src }))}
        plugins={[Zoom, Counter]}
        zoom={{ maxZoomPixelRatio: 4 }}
        controller={{ closeOnBackdropClick: true }}
        styles={{ container: { backgroundColor: 'rgba(10,5,2,0.95)' } }}
      />
    </>
  );
}

function InfoRow({ label, value }) {
  return (
    <div>
      <dt className="text-xs font-bold tracking-wider text-ink-500 dark:text-ink-300">{label}</dt>
      <dd className="mt-0.5 text-base font-bold text-ink-900 dark:text-ink-100">{value}</dd>
    </div>
  );
}
