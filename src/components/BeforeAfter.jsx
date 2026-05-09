import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, MapPin, Clock, ZoomIn, X } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import { studentProgress } from '../data/teachers.js';
import { Ornament } from './Ornament.jsx';
import { RichText } from './RichText.jsx';
import { ClickHint } from './ClickHint.jsx';
import { useModalHistory } from '../hooks/useModalHistory.js';

export function BeforeAfterSection() {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState(null);

  return (
    <section id="students" className="relative overflow-hidden py-24 sm:py-32 bg-paper-texture">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span className="eyebrow">{t('beforeAfter.eyebrow')}</span>
            <h2 className="section-title mt-6 text-balance">
              <RichText text={t('beforeAfter.title')} />
            </h2>
            <Ornament className="mt-5 h-3 w-44 text-flame-500/70" />
          </div>
          <div className="max-w-md">
            <p className="text-lg leading-relaxed text-ink-700/80 dark:text-ink-200/80">
              {t('beforeAfter.subtitle')}
            </p>
            <ClickHint className="mt-4" />
          </div>
        </motion.div>

        {/* Names list — primary view on every screen size */}
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {studentProgress.map((s, i) => (
            <StudentRow
              key={s.id}
              student={s}
              index={i}
              onOpen={() => setActiveId(s.id)}
            />
          ))}
        </div>
      </div>

      <ProgressModal
        student={studentProgress.find((s) => s.id === activeId) || null}
        onClose={() => setActiveId(null)}
      />
    </section>
  );
}

function StudentRow({ student, index, onOpen }) {
  const { t } = useTranslation();
  const name     = t(`beforeAfter.list.${student.id}.name`);
  const country  = t(`beforeAfter.list.${student.id}.country`);
  const duration = t(`beforeAfter.list.${student.id}.duration`);

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="group flex items-center gap-4 rounded-2xl border border-ink-900/10 dark:border-ink-100/10 bg-paper/70 dark:bg-[#150B07]/70 p-3 text-start transition-all hover:border-flame-500/40 hover:shadow-flame"
    >
      <span className="relative inline-flex h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-ink-900/10 dark:border-ink-100/10">
        <img src={student.after} alt="" className="absolute inset-0 h-full w-full object-cover" />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-base font-extrabold text-ink-900 dark:text-ink-100 truncate">
          {name}
        </span>
        <span className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-ink-600 dark:text-ink-300">
          <span className="inline-flex items-center gap-1">
            <MapPin size={11} className="text-flame-500" />
            {country}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock size={11} className="text-flame-500" />
            {duration}
          </span>
        </span>
      </span>
      <span
        aria-hidden
        className="shrink-0 text-flame-500 opacity-0 transition-opacity group-hover:opacity-100"
      >
        <ChevronLeft size={18} className="rtl:hidden" />
        <ChevronLeft size={18} className="hidden rtl:inline rotate-180" />
      </span>
    </motion.button>
  );
}

function ProgressModal({ student, onClose }) {
  const { t } = useTranslation();
  const [lbIndex, setLbIndex] = useState(-1);
  const isOpen = !!student;

  // Mobile back button: lightbox first, then the modal
  useModalHistory(isOpen && lbIndex < 0, onClose);
  useModalHistory(lbIndex >= 0, () => setLbIndex(-1));

  if (!student) return <AnimatePresence />;
  const name     = t(`beforeAfter.list.${student.id}.name`);
  const country  = t(`beforeAfter.list.${student.id}.country`);
  const duration = t(`beforeAfter.list.${student.id}.duration`);
  const note     = t(`beforeAfter.list.${student.id}.note`);

  const slides = [
    { src: student.before, alt: t('beforeAfter.before') },
    { src: student.after,  alt: t('beforeAfter.after')  },
  ];

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
            aria-label={name}
          >
            <div className="absolute inset-0 bg-ink-900/70 backdrop-blur-md" />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-[61] w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/10 bg-paper dark:bg-[#120A05] shadow-ink"
            >
              <div className="relative p-7 sm:p-10 pb-2">
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t('common.close')}
                  className="absolute end-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-ink-900/10 dark:border-ink-100/15 text-ink-700 dark:text-ink-200 hover:bg-flame-500 hover:text-white hover:border-transparent transition-colors"
                >
                  <X size={18} />
                </button>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-ink-900 dark:text-ink-100">
                  {name}
                </h3>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                  <span className="rounded-full border border-flame-500/40 bg-flame-500/10 px-3 py-1 font-bold text-flame-700 dark:text-flame-300">
                    {t(`scripts.${student.script}`)}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/10 dark:border-ink-100/15 bg-paper/70 dark:bg-ink-900/40 px-3 py-1 font-semibold text-ink-700 dark:text-ink-200">
                    <Clock size={13} className="text-flame-500" />
                    {duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-ink-600 dark:text-ink-300 font-semibold">
                    <MapPin size={13} className="text-flame-500" />
                    {country}
                  </span>
                </div>
              </div>

              <div className="space-y-4 px-7 sm:px-10 pb-7">
                <Frame
                  src={student.before}
                  tone="muted"
                  label={t('beforeAfter.before')}
                  onClick={() => setLbIndex(0)}
                />
                <Frame
                  src={student.after}
                  tone="primary"
                  label={t('beforeAfter.after')}
                  onClick={() => setLbIndex(1)}
                />
                <p className="leading-relaxed text-ink-700 dark:text-ink-200">{note}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Lightbox
        open={lbIndex >= 0}
        index={lbIndex < 0 ? 0 : lbIndex}
        close={() => setLbIndex(-1)}
        slides={slides}
        plugins={[Zoom]}
        zoom={{ maxZoomPixelRatio: 4 }}
        styles={{ container: { backgroundColor: 'rgba(10,5,2,0.95)' } }}
      />
    </>
  );
}

function Frame({ src, tone, label, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.005 }}
      className={`group relative aspect-[16/9] w-full overflow-hidden rounded-3xl border ${
        tone === 'primary' ? 'border-flame-500/40' : 'border-ink-900/10 dark:border-ink-100/10'
      }`}
    >
      <img
        src={src}
        alt={label}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <span
        className={`absolute top-4 start-4 rounded-full px-3 py-1 text-xs font-extrabold backdrop-blur-md ${
          tone === 'primary'
            ? 'bg-flame-500 text-white shadow-flame'
            : 'bg-paper/95 dark:bg-ink-900/80 text-ink-900 dark:text-ink-100 border border-ink-900/10 dark:border-ink-100/10'
        }`}
      >
        {label}
      </span>
      <span className="absolute inset-0 grid place-items-center bg-ink-900/40 opacity-0 transition-opacity group-hover:opacity-100">
        <ZoomIn size={28} className="text-white" />
      </span>
    </motion.button>
  );
}
