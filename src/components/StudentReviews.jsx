import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ZoomIn, MapPin, Clock, MessageSquareHeart } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import { studentReviews } from '../data/teachers.js';
import { Ornament } from './Ornament.jsx';
import { RichText } from './RichText.jsx';

export function StudentReviews() {
  const { t } = useTranslation();
  const [lbIndex, setLbIndex] = useState(-1);
  const slides = studentReviews.map((r) => ({ src: r.src, alt: r.name }));

  return (
    <section id="reviews" className="relative overflow-hidden py-24 sm:py-32 bg-paper-texture">
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

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studentReviews.map((r, i) => (
            <motion.button
              key={r.id}
              type="button"
              onClick={() => setLbIndex(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-ink-900/10 dark:border-ink-100/10 bg-paper/80 dark:bg-[#150B07]/70 text-start transition-all hover:border-flame-500/40 hover:shadow-flame"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={r.src}
                  alt={r.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/30 to-transparent" />
                <span className="absolute inset-0 grid place-items-center bg-ink-900/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <ZoomIn size={28} className="text-white" />
                </span>
              </div>

              <div className="p-5">
                <p className="text-xl font-extrabold text-ink-900 dark:text-ink-100">{r.name}</p>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-ink-600 dark:text-ink-300 font-semibold">
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={13} className="text-flame-500" />
                    {r.country}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={13} className="text-flame-500" />
                    {r.duration}
                  </span>
                  <span>{r.age} {t('common.yearsOld')}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox
        open={lbIndex >= 0}
        index={lbIndex < 0 ? 0 : lbIndex}
        close={() => setLbIndex(-1)}
        slides={slides}
        plugins={[Zoom]}
        zoom={{ maxZoomPixelRatio: 4 }}
        styles={{ container: { backgroundColor: 'rgba(10,5,2,0.95)' } }}
      />
    </section>
  );
}
