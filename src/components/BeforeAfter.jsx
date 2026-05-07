import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, MapPin, Clock, ZoomIn } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import { studentProgress } from '../data/teachers.js';
import { Ornament } from './Ornament.jsx';
import { RichText } from './RichText.jsx';

export function BeforeAfterSection() {
  const { t } = useTranslation();
  const [activeIdx, setActiveIdx] = useState(0);
  const [lbIndex, setLbIndex] = useState(-1);
  const active = studentProgress[activeIdx];

  const slides = [
    { src: active.before, label: t('beforeAfter.before') },
    { src: active.after,  label: t('beforeAfter.after')  },
  ];

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
          <p className="max-w-md text-lg leading-relaxed text-ink-700/80 dark:text-ink-200/80">
            {t('beforeAfter.subtitle')}
          </p>
        </motion.div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Vertical Before / After stack */}
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 space-y-6"
          >
            <BeforeAfterFrame
              src={active.before}
              tone="muted"
              label={t('beforeAfter.before')}
              onClick={() => setLbIndex(0)}
            />
            <BeforeAfterFrame
              src={active.after}
              tone="primary"
              label={t('beforeAfter.after')}
              onClick={() => setLbIndex(1)}
            />

            <div className="flex flex-wrap items-center gap-3 text-sm pt-2">
              <span className="rounded-full border border-flame-500/40 bg-flame-500/10 px-3 py-1.5 font-bold text-flame-700 dark:text-flame-300">
                {t(`scripts.${active.script}`)}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/10 dark:border-ink-100/15 bg-paper/70 dark:bg-ink-900/40 px-3 py-1.5 font-semibold text-ink-700 dark:text-ink-200">
                <Clock size={14} className="text-flame-500" />
                {active.duration}
              </span>
              <span className="inline-flex items-center gap-1.5 text-ink-600 dark:text-ink-300 font-semibold">
                <MapPin size={14} className="text-flame-500" />
                {active.country}
              </span>
            </div>

            <p className="leading-relaxed text-ink-700 dark:text-ink-200">{active.note}</p>
          </motion.div>

          {/* Picker */}
          <div className="lg:col-span-4">
            <h3 className="text-xl font-extrabold text-ink-900 dark:text-ink-100">
              {t('beforeAfter.stories')}
            </h3>

            <ul className="mt-6 space-y-3">
              {studentProgress.map((s, i) => {
                const isActive = i === activeIdx;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => setActiveIdx(i)}
                      aria-pressed={isActive}
                      className={`group flex w-full items-center gap-4 rounded-2xl border p-3 text-start transition-all ${
                        isActive
                          ? 'border-flame-500/60 bg-flame-500/10 shadow-flame'
                          : 'border-ink-900/10 dark:border-ink-100/10 bg-paper/70 dark:bg-[#150B07]/70 hover:border-flame-500/40'
                      }`}
                    >
                      <span className="relative inline-flex h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-ink-900/10 dark:border-ink-100/10">
                        <img src={s.after} alt="" className="absolute inset-0 h-full w-full object-cover" />
                      </span>
                      <span className="flex-1">
                        <span className="block text-base font-extrabold text-ink-900 dark:text-ink-100">
                          {s.name}
                        </span>
                        <span className="block text-xs text-ink-600 dark:text-ink-300">
                          {s.country} · {t(`scripts.${s.script}`)} · {s.age} {t('common.yearsOld')}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className={`shrink-0 text-flame-500 transition-transform ${
                          isActive ? '-translate-x-1 rtl:translate-x-1' : 'opacity-0 group-hover:opacity-100'
                        }`}
                      >
                        <ChevronLeft size={18} className="rtl:hidden" />
                        <ChevronLeft size={18} className="hidden rtl:inline rotate-180" />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lbIndex >= 0 && (
          <Lightbox
            open
            index={lbIndex}
            close={() => setLbIndex(-1)}
            slides={slides}
            plugins={[Zoom]}
            zoom={{ maxZoomPixelRatio: 4 }}
            styles={{ container: { backgroundColor: 'rgba(10,5,2,0.95)' } }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function BeforeAfterFrame({ src, tone, label, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`group relative aspect-[16/9] w-full overflow-hidden rounded-3xl border ${
        tone === 'primary'
          ? 'border-flame-500/40'
          : 'border-ink-900/10 dark:border-ink-100/10'
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
        <ZoomIn size={32} className="text-white" />
      </span>
    </motion.button>
  );
}
