import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Award, BookMarked, GraduationCap, Sparkles, ZoomIn } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import { Ornament } from './Ornament.jsx';
import { useModalHistory } from '../hooks/useModalHistory.js';

export function TeacherModal({ teacher, onClose, onRegister }) {
  const { t } = useTranslation();
  const [lbIndex, setLbIndex] = useState(-1);
  const isOpen = !!teacher;

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

  // Mobile back button closes the modal (history API)
  useModalHistory(isOpen && lbIndex < 0, onClose);

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
            aria-label={teacher.name}
          >
            <div className="absolute inset-0 bg-ink-900/70 backdrop-blur-md" />

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-[61] w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/10 bg-paper dark:bg-[#120A05] shadow-ink"
            >
              <div className="grid gap-0 md:grid-cols-12">
                <div className="relative md:col-span-5 aspect-[4/5] md:aspect-auto md:min-h-[420px] overflow-hidden">
                  <img src={teacher.image} alt={teacher.name} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent md:bg-gradient-to-l" />
                  <div className="absolute inset-x-6 bottom-6 md:hidden">
                    <h2 className="text-3xl font-extrabold text-white">{teacher.name}</h2>
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

                  <span className="hidden md:inline-flex eyebrow">{t('teachers.scriptsTaught')}</span>
                  <h2 className="hidden md:block mt-4 text-4xl font-extrabold leading-tight text-ink-900 dark:text-ink-100">
                    {teacher.name}
                  </h2>

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

              <div className="grid gap-8 px-7 sm:px-10 pb-2 md:grid-cols-2">
                <DetailBlock icon={GraduationCap} title={t('teachers.studentOf')} items={teacher.studentOf} />
                <DetailBlock icon={Award} title={t('teachers.awards')} items={teacher.awards} />
              </div>

              <div className="px-7 sm:px-10 mt-10">
                <div className="mb-5 flex items-center gap-3">
                  <BookMarked className="text-flame-500" size={18} />
                  <h3 className="text-xl font-extrabold text-ink-900 dark:text-ink-100">
                    {t('teachers.works')}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {teacher.gallery.map((src, i) => (
                    <motion.button
                      type="button"
                      key={src}
                      onClick={() => setLbIndex(i)}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
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

              <div className="sticky bottom-0 mt-10 border-t border-ink-900/10 dark:border-ink-100/10 bg-paper/95 dark:bg-[#120A05]/95 backdrop-blur-md px-7 sm:px-10 py-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="text-flame-500" size={18} />
                  <p className="font-bold text-ink-700 dark:text-ink-200">
                    {t('teachers.ctaPrompt')} {teacher.name}؟
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

      {/* Artwork lightbox — pinch zoom + pan */}
      <Lightbox
        open={lbIndex >= 0}
        index={lbIndex < 0 ? 0 : lbIndex}
        close={() => setLbIndex(-1)}
        slides={(teacher?.gallery || []).map((src) => ({ src }))}
        plugins={[Zoom]}
        zoom={{ maxZoomPixelRatio: 4 }}
        controller={{ closeOnBackdropClick: true }}
        styles={{ container: { backgroundColor: 'rgba(10,5,2,0.95)' } }}
      />
    </>
  );
}

function DetailBlock({ icon: Icon, title, items }) {
  return (
    <div className="rounded-2xl border border-ink-900/10 dark:border-ink-100/10 bg-paper/60 dark:bg-[#170D07]/60 p-5">
      <div className="flex items-center gap-2.5">
        <Icon className="text-flame-500" size={18} />
        <h4 className="text-lg font-extrabold text-ink-900 dark:text-ink-100">{title}</h4>
      </div>
      <ul className="mt-3 space-y-2 text-ink-700 dark:text-ink-200">
        {items.map((it) => (
          <li key={it} className="flex gap-2 leading-relaxed">
            <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-flame-500" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
