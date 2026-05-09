import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ZoomIn, MapPin, Clock, MessageSquareHeart, X } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import { studentReviews } from '../data/teachers.js';
import { Ornament } from './Ornament.jsx';
import { RichText } from './RichText.jsx';
import { ClickHint } from './ClickHint.jsx';
import { useModalHistory } from '../hooks/useModalHistory.js';

export function StudentReviews() {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState(null);

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
            <ClickHint className="mt-4" />
          </div>
        </motion.div>

        {/* Compact name list — 2 cols mobile, 3 desktop. Each opens a modal */}
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {studentReviews.map((r, i) => (
            <ReviewRow key={r.id} review={r} index={i} onOpen={() => setActiveId(r.id)} />
          ))}
        </div>
      </div>

      <ReviewModal
        review={studentReviews.find((r) => r.id === activeId) || null}
        onClose={() => setActiveId(null)}
      />
    </section>
  );
}

function ReviewRow({ review, index, onOpen }) {
  const { t } = useTranslation();
  const name     = t(`reviews.list.${review.id}.name`);
  const country  = t(`reviews.list.${review.id}.country`);
  const duration = t(`reviews.list.${review.id}.duration`);

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
        <img src={review.src} alt="" className="absolute inset-0 h-full w-full object-cover" />
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
          <span>{review.age} {t('common.yearsOld')}</span>
        </span>
      </span>
      <span aria-hidden className="shrink-0 text-flame-500 opacity-0 transition-opacity group-hover:opacity-100">
        <ZoomIn size={16} />
      </span>
    </motion.button>
  );
}

function ReviewModal({ review, onClose }) {
  const { t } = useTranslation();
  const [zoomOpen, setZoomOpen] = useState(false);
  const isOpen = !!review;

  // Mobile back: close zoom first if open, otherwise the modal
  useModalHistory(isOpen && !zoomOpen, onClose);
  useModalHistory(zoomOpen, () => setZoomOpen(false));

  if (!review) return <AnimatePresence />;
  const name     = t(`reviews.list.${review.id}.name`);
  const country  = t(`reviews.list.${review.id}.country`);
  const duration = t(`reviews.list.${review.id}.duration`);

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
              className="relative z-[61] w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/10 bg-paper dark:bg-[#120A05] shadow-ink"
            >
              <div className="relative p-7 sm:p-10 pb-3">
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
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/10 dark:border-ink-100/15 bg-paper/70 dark:bg-ink-900/40 px-3 py-1 font-semibold text-ink-700 dark:text-ink-200">
                    <MapPin size={13} className="text-flame-500" />
                    {country}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/10 dark:border-ink-100/15 bg-paper/70 dark:bg-ink-900/40 px-3 py-1 font-semibold text-ink-700 dark:text-ink-200">
                    <Clock size={13} className="text-flame-500" />
                    {duration}
                  </span>
                  <span className="rounded-full border border-flame-500/40 bg-flame-500/10 px-3 py-1 font-bold text-flame-700 dark:text-flame-300">
                    {review.age} {t('common.yearsOld')}
                  </span>
                </div>
              </div>

              <div className="px-7 sm:px-10 pb-7">
                <button
                  type="button"
                  onClick={() => setZoomOpen(true)}
                  className="group relative block w-full overflow-hidden rounded-3xl border border-ink-900/10 dark:border-ink-100/10"
                >
                  <img src={review.src} alt={name} className="w-full max-h-[60vh] object-contain bg-ink-900/5 dark:bg-ink-100/5 transition-transform duration-500 group-hover:scale-[1.01]" />
                  <span className="absolute inset-0 grid place-items-center bg-ink-900/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <ZoomIn size={32} className="text-white" />
                  </span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Lightbox
        open={zoomOpen}
        close={() => setZoomOpen(false)}
        slides={[{ src: review.src, alt: name }]}
        plugins={[Zoom]}
        zoom={{ maxZoomPixelRatio: 4 }}
        styles={{ container: { backgroundColor: 'rgba(10,5,2,0.95)' } }}
      />
    </>
  );
}
