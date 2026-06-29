import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, MapPin, Clock, ZoomIn, Maximize2 } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import { studentProgress as FALLBACK } from '../data/teachers.js';
import { api } from '../lib/api.js';
import { useApiData } from '../hooks/useApiData.js';
import { Ornament } from './Ornament.jsx';
import { RichText } from './RichText.jsx';
import { useModalHistory } from '../hooks/useModalHistory.js';

// كل قصة تقدّم صورتين متتاليتين فى الـ Lightbox (قبل ثم بعد) مع label واضح.
function buildSlides(progress, t) {
  const slides = [];
  progress.forEach((s, i) => {
    const name = s.name || `#${i + 1}`;
    slides.push({ src: s.before, alt: `${name} — ${t('beforeAfter.before')}`, key: `${i}-b`, kind: 'before' });
    slides.push({ src: s.after,  alt: `${name} — ${t('beforeAfter.after')}`,  key: `${i}-a`, kind: 'after'  });
  });
  return slides;
}

export function BeforeAfterSection() {
  const { t } = useTranslation();
  const [lbIndex, setLbIndex] = useState(-1);

  // البيانات من admin API مع fallback محلى — الموقع يكمّل بدون اتصال.
  const { data: items } = useApiData(api.beforeAfter, FALLBACK);
  const slides = buildSlides(items, t);
  useModalHistory(lbIndex >= 0, () => setLbIndex(-1));

  if (!items.length) return null;

  const hero = items[0];
  const openAt = (index, kind) => {
    const slideIdx = slides.findIndex((s, i) => Math.floor(i / 2) === index && s.kind === kind);
    setLbIndex(slideIdx < 0 ? 0 : slideIdx);
  };

  return (
    <section id="students" className="relative overflow-hidden section-y bg-paper-texture">
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
          </div>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Hero preview — visible single image with CTA to open the gallery */}
          <motion.button
            type="button"
            onClick={() => openAt(0, 'after')}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="group relative lg:col-span-8 aspect-[16/10] overflow-hidden rounded-3xl border border-flame-500/30"
          >
            <img
              src={hero.after}
              alt={hero.name || ''}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/20 to-transparent" />

            <span className="absolute top-4 start-4 rounded-full bg-flame-500 text-white px-3 py-1 text-xs font-extrabold shadow-flame">
              {t('beforeAfter.after')}
            </span>

            <span className="absolute top-4 end-4 inline-flex items-center gap-1.5 rounded-full bg-paper/90 dark:bg-ink-900/80 backdrop-blur-md px-3 py-1.5 text-xs font-extrabold text-ink-900 dark:text-ink-100">
              <Maximize2 size={13} />
              {t('beforeAfter.openGallery')}
            </span>

            <div className="absolute inset-x-5 bottom-5 text-start">
              <p className="text-2xl sm:text-3xl font-extrabold text-white">{hero.name}</p>
              {hero.note && <p className="mt-1 text-sm text-white/85">{hero.note}</p>}
              {hero.duration && (
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 rounded-full bg-ink-900/60 backdrop-blur-md px-2.5 py-1 font-bold text-white">
                    <Clock size={11} />
                    {hero.duration}
                  </span>
                </div>
              )}
            </div>

            <span className="absolute inset-0 grid place-items-center bg-ink-900/0 opacity-0 transition-all group-hover:bg-ink-900/30 group-hover:opacity-100">
              <ZoomIn size={36} className="text-white" />
            </span>
          </motion.button>

          {/* Names list — quick jump into the gallery */}
          <div className="lg:col-span-4">
            <h3 className="text-xl font-extrabold text-ink-900 dark:text-ink-100">
              {t('beforeAfter.stories')}
            </h3>
            <ul className="mt-4 space-y-3">
              {items.map((s, i) => (
                <NameRow key={s.id ?? i} student={s} index={i} onOpen={(kind) => openAt(i, kind)} />
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Lightbox
        open={lbIndex >= 0}
        index={lbIndex < 0 ? 0 : lbIndex}
        close={() => setLbIndex(-1)}
        slides={slides}
        plugins={[Zoom, Counter]}
        zoom={{ maxZoomPixelRatio: 4 }}
        counter={{ container: { style: { top: 16, bottom: 'unset' } } }}
        styles={{ container: { backgroundColor: 'rgba(10,5,2,0.95)' } }}
      />
    </section>
  );
}

function NameRow({ student, index, onOpen }) {
  const { t } = useTranslation();
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="rounded-2xl border border-ink-900/10 dark:border-ink-100/10 bg-paper/70 dark:bg-[#150B07]/70 transition-colors hover:border-flame-500/40"
    >
      <button
        type="button"
        onClick={() => onOpen('after')}
        className="group flex w-full items-center gap-3 p-3 text-start"
      >
        <span className="relative inline-flex h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-ink-900/10 dark:border-ink-100/10">
          <img src={student.after} alt="" className="absolute inset-0 h-full w-full object-cover" />
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-base font-extrabold text-ink-900 dark:text-ink-100 truncate">
            {student.name}
          </span>
          <span className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-ink-600 dark:text-ink-300">
            {student.country && (
              <span className="inline-flex items-center gap-1">
                <MapPin size={11} className="text-flame-500" />
                {student.country}
              </span>
            )}
            {student.duration && (
              <span className="inline-flex items-center gap-1">
                <Clock size={11} className="text-flame-500" />
                {student.duration}
              </span>
            )}
          </span>
        </span>
        <span aria-hidden className="shrink-0 text-flame-500 opacity-0 transition-opacity group-hover:opacity-100">
          <ChevronLeft size={18} className="rtl:hidden" />
          <ChevronLeft size={18} className="hidden rtl:inline rotate-180" />
        </span>
      </button>
      <div className="grid grid-cols-2 gap-px border-t border-ink-900/10 dark:border-ink-100/10 text-center text-xs font-bold">
        <button
          type="button"
          onClick={() => onOpen('before')}
          className="py-2 text-ink-600 dark:text-ink-300 hover:bg-ink-900/5 dark:hover:bg-ink-100/5"
        >
          {t('beforeAfter.before')}
        </button>
        <button
          type="button"
          onClick={() => onOpen('after')}
          className="py-2 text-flame-600 dark:text-flame-400 hover:bg-flame-500/10"
        >
          {t('beforeAfter.after')}
        </button>
      </div>
    </motion.li>
  );
}
