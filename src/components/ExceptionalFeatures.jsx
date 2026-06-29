import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Users, Sparkles, Lightbulb, Eye, Image as ImageIcon,
  MessageCircle, MessageCircleQuestion, HeartHandshake,
  GraduationCap, BookOpen, PenTool, Award,
  X, ChevronLeft, ChevronRight, ZoomIn, Maximize2,
} from 'lucide-react';
import { Ornament } from './Ornament.jsx';
import { RichText } from './RichText.jsx';
import { ClickHint } from './ClickHint.jsx';
import { useModalHistory } from '../hooks/useModalHistory.js';
import { featurePreviews } from '../data/teachers.js';
import { api } from '../lib/api.js';
import { useApiData } from '../hooks/useApiData.js';

const ICONS = {
  users: Users,
  sparkles: Sparkles,
  lightbulb: Lightbulb,
  eye: Eye,
  image: ImageIcon,
  'message-circle': MessageCircle,
  'message-circle-question': MessageCircleQuestion,
  'heart-handshake': HeartHandshake,
  'graduation-cap': GraduationCap,
  'book-open': BookOpen,
  'pen-tool': PenTool,
  award: Award,
};

const FALLBACK_FEATURES = [
  { key: 'community', icon: 'users',                   image: null },
  { key: 'tips',      icon: 'lightbulb',               image: null },
  { key: 'feeding',   icon: 'eye',                     image: null },
  { key: 'qa',        icon: 'message-circle-question', image: null },
  { key: 'feedback',  icon: 'heart-handshake',         image: null },
];

export function ExceptionalFeatures() {
  const { t } = useTranslation();
  const { data: remote } = useApiData(api.features, FALLBACK_FEATURES);

  const items = useMemo(() => {
    const rows = Array.isArray(remote) && remote.length ? remote : FALLBACK_FEATURES;
    return rows.map((row) => ({
      id: row.key,
      icon: ICONS[row.icon] || Sparkles,
      title: row.title || t(`features.items.${row.key}.title`, ''),
      body:  row.body  || t(`features.items.${row.key}.body`, ''),
      image: row.image || featurePreviews[row.key] || null,
    }));
  }, [remote, t]);

  const [activeId, setActiveId] = useState(items[0]?.id);
  const [popupOpen, setPopupOpen] = useState(false);

  const active = items.find((i) => i.id === activeId) || items[0];
  if (!active) return null;

  return (
    <section id="features" className="relative overflow-hidden section-y bg-paper-texture">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="grid gap-8 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            <span className="eyebrow">{t('features.eyebrow')}</span>
            <h2 className="section-title mt-6 text-balance">
              <RichText text={t('features.title')} />
            </h2>
            <Ornament className="mt-6 h-3 w-56 text-flame-500/70" />
          </div>
          <div className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-ink-700/85 dark:text-ink-200/85">
              {t('features.subtitle')}
            </p>
            <ClickHint className="mt-4" />
          </div>
        </motion.div>

        {/* Tabs — horizontal scroll on mobile, wrap on desktop */}
        <div className="mt-12 -mx-5 px-5 lg:mx-0 lg:px-0">
          <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-wrap lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  aria-pressed={isActive}
                  className={`group shrink-0 flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'border-flame-500 bg-flame-500 text-white shadow-flame'
                      : 'border-ink-900/10 dark:border-ink-100/15 bg-paper/70 dark:bg-[#150B07]/70 text-ink-700 dark:text-ink-200 hover:border-flame-500/40 hover:text-flame-500'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active item body + dynamic preview */}
        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <motion.div
            key={`copy-${activeId}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5 rounded-3xl border border-ink-900/10 dark:border-ink-100/10 bg-paper/80 dark:bg-[#150B07]/70 p-6 sm:p-7"
          >
            <h3 className="text-2xl font-extrabold text-ink-900 dark:text-ink-100">
              {active.title}
            </h3>
            <p className="mt-3 leading-relaxed text-ink-700 dark:text-ink-200">
              {active.body}
            </p>
            <Ornament className="mt-6 h-3 w-32 text-flame-500/60" />
          </motion.div>

          <motion.button
            key={`preview-${activeId}`}
            type="button"
            onClick={() => setPopupOpen(true)}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="group lg:col-span-7 relative aspect-video overflow-hidden rounded-3xl border border-ink-900/10 dark:border-ink-100/10 bg-flame-500/5"
          >
            {active.image && (
              <img
                src={active.image}
                alt={active.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            )}
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-900/40 to-transparent" />

            <span className="absolute top-4 start-4 rounded-full bg-paper/90 dark:bg-ink-900/80 backdrop-blur-md px-3 py-1 text-xs font-extrabold text-ink-900 dark:text-ink-100">
              {t('features.previewLabel')}
            </span>
            <span className="absolute bottom-4 end-4 inline-flex items-center gap-2 rounded-full bg-flame-500 text-white px-3 py-2 text-xs font-extrabold shadow-flame">
              <Maximize2 size={14} />
              {t('features.openPreview')}
            </span>
          </motion.button>
        </div>
      </div>

      <FeaturePopup
        open={popupOpen}
        items={items}
        activeId={activeId}
        onChange={setActiveId}
        onClose={() => setPopupOpen(false)}
      />
    </section>
  );
}

function FeaturePopup({ open, items, activeId, onChange, onClose }) {
  const { t } = useTranslation();
  useModalHistory(open, onClose);

  const idx = items.findIndex((it) => it.id === activeId);
  const active = items[idx] || items[0];
  const next = () => onChange(items[(idx + 1) % items.length].id);
  const prev = () => onChange(items[(idx - 1 + items.length) % items.length].id);
  if (!active) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 bg-ink-900/85 backdrop-blur-md" />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-[61] w-full max-w-5xl rounded-3xl border border-white/10 bg-paper dark:bg-[#120A05] shadow-ink overflow-hidden"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t('common.close')}
              className="absolute end-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-ink-900/70 text-white backdrop-blur-md hover:bg-flame-500"
            >
              <X size={18} />
            </button>

            {/* Image area + arrow nav */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {active.image && (
                  <motion.img
                    key={activeId}
                    src={active.image}
                    alt={active.title}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="block w-full max-h-[60vh] object-cover"
                  />
                )}
              </AnimatePresence>

              {/* Counter */}
              <span className="absolute top-4 start-4 rounded-full bg-ink-900/70 text-white px-3 py-1.5 text-xs font-extrabold backdrop-blur-md">
                {idx + 1} {t('common.of')} {items.length}
              </span>

              <button
                type="button"
                onClick={prev}
                aria-label="prev"
                className="absolute start-3 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-ink-900/70 text-white backdrop-blur-md hover:bg-flame-500"
              >
                <ChevronLeft size={20} className="rtl:hidden" />
                <ChevronRight size={20} className="hidden rtl:inline" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="next"
                className="absolute end-3 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-ink-900/70 text-white backdrop-blur-md hover:bg-flame-500"
              >
                <ChevronRight size={20} className="rtl:hidden" />
                <ChevronLeft size={20} className="hidden rtl:inline" />
              </button>
            </div>

            {/* Active feature copy */}
            <div className="p-6 sm:p-8 border-t border-ink-900/10 dark:border-ink-100/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`copy-${activeId}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl sm:text-2xl font-extrabold text-ink-900 dark:text-ink-100">
                    {active.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink-700 dark:text-ink-200">
                    {active.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Tab strip — switch between features without closing */}
            <div className="border-t border-ink-900/10 dark:border-ink-100/10 bg-paper/95 dark:bg-[#120A05]/95 backdrop-blur-md p-3 sm:p-4">
              <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeId === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onChange(item.id)}
                      className={`shrink-0 flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold whitespace-nowrap transition-all ${
                        isActive
                          ? 'border-flame-500 bg-flame-500 text-white'
                          : 'border-ink-900/10 dark:border-ink-100/15 text-ink-700 dark:text-ink-200 hover:border-flame-500/40 hover:text-flame-500'
                      }`}
                    >
                      <Icon size={13} />
                      <span>{item.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Used by older callers (e.g. App.jsx may import previously) but no-op now.
void ZoomIn;
