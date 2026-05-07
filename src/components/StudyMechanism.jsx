import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mic, Video, Zap, Sprout, X, ArrowUpLeft, Sparkles } from 'lucide-react';
import { Ornament } from './Ornament.jsx';
import { RichText } from './RichText.jsx';
import { useModalHistory } from '../hooks/useModalHistory.js';

const SERVICES = [
  { id: 'recorded',   icon: Mic,    accent: 'from-flame-500/15 to-flame-500/0' },
  { id: 'live',       icon: Video,  accent: 'from-flame-400/15 to-flame-400/0' },
  { id: 'intensive',  icon: Zap,    accent: 'from-flame-600/15 to-flame-600/0' },
  { id: 'foundation', icon: Sprout, accent: 'from-flame-300/15 to-flame-300/0' },
];

export function StudyMechanism({ onPickService }) {
  const { t } = useTranslation();
  const [active, setActive] = useState(null);

  return (
    <section id="mechanism" className="relative overflow-hidden py-24 sm:py-32 bg-paper-texture">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="grid gap-8 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            <span className="eyebrow">{t('mechanism.eyebrow')}</span>
            <h2 className="section-title mt-6 text-balance">
              <RichText text={t('mechanism.title')} />
            </h2>
            <Ornament className="mt-6 h-3 w-56 text-flame-500/70" />
          </div>
          <div className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-ink-700/85 dark:text-ink-200/85">
              {t('mechanism.subtitle')}
            </p>
          </div>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl border border-ink-900/10 dark:border-ink-100/10 bg-paper/80 dark:bg-[#150B07]/70 p-7 text-start transition-all hover:border-flame-500/40 hover:shadow-flame"
              >
                <span aria-hidden className={`absolute inset-0 bg-gradient-to-br ${s.accent} opacity-60`} />
                <span className="relative flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-flame-500/10 text-flame-600 dark:text-flame-400 transition-colors group-hover:bg-flame-500 group-hover:text-white">
                    <Icon size={22} />
                  </span>
                  <span className="text-5xl font-black text-ink-900/10 dark:text-ink-100/10 transition-colors group-hover:text-flame-500/30">
                    0{i + 1}
                  </span>
                </span>

                <h3 className="relative mt-6 text-xl font-extrabold text-ink-900 dark:text-ink-100">
                  {t(`mechanism.services.${s.id}.title`)}
                </h3>
                <p className="relative mt-2 text-sm font-bold tracking-wider text-flame-600 dark:text-flame-400">
                  {t(`mechanism.services.${s.id}.tag`)}
                </p>
                <p className="relative mt-4 leading-relaxed text-ink-700/85 dark:text-ink-200/85">
                  {t(`mechanism.services.${s.id}.summary`)}
                </p>

                <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-bold text-flame-600 dark:text-flame-400">
                  {t('mechanism.openDetails')}
                  <ArrowUpLeft size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <ServiceModal serviceId={active} onClose={() => setActive(null)} onPick={onPickService} />
    </section>
  );
}

function ServiceModal({ serviceId, onClose, onPick }) {
  const { t } = useTranslation();
  const isOpen = !!serviceId;
  useModalHistory(isOpen, onClose);

  const details = serviceId ? t(`mechanism.services.${serviceId}.details`, { returnObjects: true }) : [];

  return (
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
        >
          <div className="absolute inset-0 bg-ink-900/70 backdrop-blur-md" />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-[61] w-full max-w-2xl rounded-3xl border border-white/10 bg-paper dark:bg-[#120A05] shadow-ink p-7 sm:p-10"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t('common.close')}
              className="absolute end-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-ink-900/10 dark:border-ink-100/15 text-ink-700 dark:text-ink-200 hover:bg-flame-500 hover:text-white hover:border-transparent transition-colors"
            >
              <X size={18} />
            </button>

            <span className="eyebrow">{t(`mechanism.services.${serviceId}.tag`)}</span>
            <h3 className="mt-4 text-3xl sm:text-4xl font-extrabold text-ink-900 dark:text-ink-100">
              {t(`mechanism.services.${serviceId}.title`)}
            </h3>
            <Ornament className="mt-5 h-3 w-44 text-flame-500/70" />

            <ul className="mt-7 space-y-3">
              {details.map((d, i) => (
                <motion.li
                  key={d}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  className="flex gap-3 leading-relaxed text-ink-700 dark:text-ink-200"
                >
                  <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-flame-500" />
                  <span>{d}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center justify-end gap-3">
              <button type="button" onClick={onClose} className="btn-ghost">
                {t('common.close')}
              </button>
              <button
                type="button"
                onClick={() => {
                  onPick?.(serviceId);
                  onClose();
                }}
                className="btn-flame"
              >
                <Sparkles size={16} />
                {t('hero.ctaPrimary')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
