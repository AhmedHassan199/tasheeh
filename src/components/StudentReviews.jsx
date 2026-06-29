import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ZoomIn, MapPin, Clock, MessageSquareHeart, Maximize2 } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import { studentReviews as FALLBACK } from '../data/teachers.js';
import { api } from '../lib/api.js';
import { useApiData } from '../hooks/useApiData.js';
import { Ornament } from './Ornament.jsx';
import { RichText } from './RichText.jsx';
import { useModalHistory } from '../hooks/useModalHistory.js';

// كل عنصر يدعم: { id?, name, country, duration, image | src, message? }
// يأتى من /api/reviews أو fallback محلى.
const imgOf = (r) => r.image || r.src;

export function StudentReviews() {
  const { t } = useTranslation();
  const [lbIndex, setLbIndex] = useState(-1);
  const { data: reviews } = useApiData(api.reviews, FALLBACK);
  useModalHistory(lbIndex >= 0, () => setLbIndex(-1));

  if (!reviews.length) return null;

  const slides = reviews.map((r) => ({
    src: imgOf(r),
    alt: r.name || '',
    description: [r.country, r.duration].filter(Boolean).join(' · '),
  }));

  const hero = reviews[0];

  return (
    <section id="reviews" className="relative overflow-hidden section-y bg-paper-texture">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="grid gap-8 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            <span className="eyebrow">
              <MessageSquareHeart size={14} />
              {t('reviews.eyebrow')}
            </span>
            <h2 className="section-title mt-6 text-balance">
              <RichText text={t('reviews.title')} />
            </h2>
            <Ornament className="mt-6 h-3 w-56 text-flame-500/70" />
          </div>
          <div className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-ink-700/85 dark:text-ink-200/85">
              {t('reviews.subtitle')}
            </p>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Hero preview — single screenshot teaser */}
          <motion.button
            type="button"
            onClick={() => setLbIndex(0)}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative lg:col-span-8 aspect-[16/10] overflow-hidden rounded-3xl border border-flame-500/30 bg-flame-500/5"
          >
            <img
              src={imgOf(hero)}
              alt={hero.name || ''}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/15 to-transparent" />

            <span className="absolute top-4 end-4 inline-flex items-center gap-1.5 rounded-full bg-paper/90 dark:bg-ink-900/80 backdrop-blur-md px-3 py-1.5 text-xs font-extrabold text-ink-900 dark:text-ink-100">
              <Maximize2 size={13} />
              {t('reviews.openMessage')}
            </span>

            <div className="absolute inset-x-5 bottom-5 text-start">
              <p className="text-2xl sm:text-3xl font-extrabold text-white">{hero.name}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                {hero.country && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-ink-900/60 backdrop-blur-md px-2.5 py-1 font-bold text-white">
                    <MapPin size={11} />
                    {hero.country}
                  </span>
                )}
                {hero.duration && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-ink-900/60 backdrop-blur-md px-2.5 py-1 font-bold text-white">
                    <Clock size={11} />
                    {hero.duration}
                  </span>
                )}
              </div>
            </div>

            <span className="absolute inset-0 grid place-items-center bg-ink-900/0 opacity-0 transition-all group-hover:bg-ink-900/30 group-hover:opacity-100">
              <ZoomIn size={36} className="text-white" />
            </span>
          </motion.button>

          {/* Names list */}
          <div className="lg:col-span-4">
            <ul className="grid gap-3">
              {reviews.map((r, i) => (
                <ReviewRow key={r.id ?? i} review={r} index={i} onOpen={() => setLbIndex(i)} />
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

function ReviewRow({ review, index, onOpen }) {
  const { t } = useTranslation();
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
    >
      <button
        type="button"
        onClick={onOpen}
        className="group flex w-full items-center gap-3 rounded-2xl border border-ink-900/10 dark:border-ink-100/10 bg-paper/70 dark:bg-[#150B07]/70 p-3 text-start transition-all hover:border-flame-500/40 hover:-translate-y-0.5"
      >
        <span className="relative inline-flex h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-ink-900/10 dark:border-ink-100/10">
          <img src={imgOf(review)} alt="" className="absolute inset-0 h-full w-full object-cover" />
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-base font-extrabold text-ink-900 dark:text-ink-100 truncate">
            {review.name}
          </span>
          <span className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-ink-600 dark:text-ink-300">
            {review.country && (
              <span className="inline-flex items-center gap-1">
                <MapPin size={11} className="text-flame-500" />
                {review.country}
              </span>
            )}
            {review.duration && (
              <span className="inline-flex items-center gap-1">
                <Clock size={11} className="text-flame-500" />
                {review.duration}
              </span>
            )}
            {review.age && <span>{review.age} {t('common.yearsOld')}</span>}
          </span>
        </span>
        <span aria-hidden className="shrink-0 text-flame-500 opacity-0 transition-opacity group-hover:opacity-100">
          <ZoomIn size={16} />
        </span>
      </button>
    </motion.li>
  );
}
