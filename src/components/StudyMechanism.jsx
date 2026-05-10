import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Mic, Video, Zap, Sprout, X, ArrowUpLeft, Sparkles,
  PlayCircle, Users, Clock, ListChecks, Repeat, FileDown,
} from 'lucide-react';
import { Ornament } from './Ornament.jsx';
import { RichText } from './RichText.jsx';
import { ClickHint } from './ClickHint.jsx';
import { HorizontalSlider } from './HorizontalSlider.jsx';
import { useModalHistory } from '../hooks/useModalHistory.js';
import { STUDENT_GUIDE_URL } from '../data/teachers.js';

const SERVICES = [
  { id: 'recorded',   icon: Mic,    accent: 'from-flame-500/15 to-flame-500/0', methodology: true  },
  { id: 'live',       icon: Video,  accent: 'from-flame-400/15 to-flame-400/0', methodology: true  },
  { id: 'intensive',  icon: Zap,    accent: 'from-flame-600/15 to-flame-600/0', methodology: false },
  { id: 'foundation', icon: Sprout, accent: 'from-flame-300/15 to-flame-300/0', methodology: false },
];

export function StudyMechanism({ onPickService }) {
  const { t } = useTranslation();
  const [active, setActive] = useState(null);
  const activeService = SERVICES.find((s) => s.id === active);

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
            <ClickHint className="mt-4" />
          </div>
        </motion.div>

        {/* Service cards — single row on mobile, 4-up grid on desktop */}
        <HorizontalSlider className="mt-14 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0 lg:mx-0 lg:pb-0 lg:snap-none">
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
                className="group relative h-full w-full overflow-hidden rounded-3xl border border-ink-900/10 dark:border-ink-100/10 bg-paper/80 dark:bg-[#150B07]/70 p-7 text-start transition-all hover:border-flame-500/40 hover:shadow-flame"
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
                <p className="relative mt-3 leading-relaxed text-ink-700/85 dark:text-ink-200/85">
                  {t(`mechanism.services.${s.id}.summary`)}
                </p>

                <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-bold text-flame-600 dark:text-flame-400">
                  {t('mechanism.openDetails')}
                  <ArrowUpLeft size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </motion.button>
            );
          })}
        </HorizontalSlider>

        {/* Student Guide PDF download — sits right after the cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex flex-col items-start gap-4 rounded-[28px] border border-flame-500/30 bg-gradient-to-br from-flame-500/10 to-transparent p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div>
            <p className="text-sm font-extrabold tracking-[0.18em] uppercase text-flame-600 dark:text-flame-400">
              {t('common.studentGuide')}
            </p>
            <p className="mt-2 leading-relaxed text-ink-700 dark:text-ink-200 max-w-2xl">
              {t('mechanism.guideLine')}
            </p>
          </div>
          <a
            href={STUDENT_GUIDE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-flame whitespace-nowrap"
          >
            <FileDown size={18} />
            {t('mechanism.downloadGuide')}
          </a>
        </motion.div>
      </div>

      <ServiceModal
        service={activeService}
        onClose={() => setActive(null)}
        onPick={onPickService}
      />
    </section>
  );
}

function ServiceModal({ service, onClose, onPick }) {
  const { t } = useTranslation();
  const isOpen = !!service;
  useModalHistory(isOpen, onClose);

  if (!service) return <AnimatePresence />;

  const id = service.id;
  const details = t(`mechanism.services.${id}.details`, { returnObjects: true });
  const methodologySteps = t('mechanism.methodologySteps', { returnObjects: true });
  const methodologyHighlight = t('mechanism.methodologyHighlight');
  const methodologySub = t('mechanism.methodologyHighlightSub');

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
            className="relative z-[61] w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/10 bg-paper dark:bg-[#120A05] shadow-ink"
          >
            <div className="relative p-7 sm:p-10 pb-0">
              <button
                type="button"
                onClick={onClose}
                aria-label={t('common.close')}
                className="absolute end-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-ink-900/10 dark:border-ink-100/15 text-ink-700 dark:text-ink-200 hover:bg-flame-500 hover:text-white hover:border-transparent transition-colors"
              >
                <X size={18} />
              </button>

              <span className="eyebrow">{t(`mechanism.services.${id}.tag`)}</span>
              <h3 className="mt-4 text-3xl sm:text-4xl font-extrabold text-ink-900 dark:text-ink-100">
                {t(`mechanism.services.${id}.title`)}
              </h3>
              <Ornament className="mt-5 h-3 w-44 text-flame-500/70" />
              <p className="mt-5 leading-relaxed text-ink-700/85 dark:text-ink-200/85">
                {t(`mechanism.services.${id}.summary`)}
              </p>
            </div>

            <div className="grid gap-5 p-7 sm:p-10 pt-7">
              <ModalCard icon={Users} title={t('mechanism.headers.audience')}>
                <p className="leading-relaxed text-ink-700 dark:text-ink-200">
                  {t(`mechanism.services.${id}.audience`)}
                </p>
              </ModalCard>

              <ModalCard icon={Clock} title={t('mechanism.headers.duration')}>
                <p className="leading-relaxed text-ink-700 dark:text-ink-200">
                  {t(`mechanism.services.${id}.duration`)}
                </p>
              </ModalCard>

              <ModalCard icon={ListChecks} title={t('mechanism.headers.details')}>
                <ul className="space-y-2">
                  {details.map((d) => (
                    <li key={d} className="flex gap-3 leading-relaxed text-ink-700 dark:text-ink-200">
                      <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-flame-500" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </ModalCard>

              {/* Methodology — only on Recorded + Live (per brief: merge here)
                  Uses a soft fade-in instead of the previous shake/pulse. */}
              {service.methodology && (
                <ModalCard icon={Repeat} title={t('mechanism.headers.methodology')} accent>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl bg-flame-500/10 border border-flame-500/30 p-4"
                  >
                    <p className="text-lg sm:text-xl font-black text-flame-700 dark:text-flame-300">
                      {methodologyHighlight}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-700 dark:text-ink-200">
                      {methodologySub}
                    </p>
                  </motion.div>
                  <ol className="mt-4 grid gap-3 sm:grid-cols-2">
                    {Object.entries(methodologySteps).map(([k, label], i) => (
                      <motion.li
                        key={k}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                        className="flex items-center gap-3 rounded-xl border border-ink-900/10 dark:border-ink-100/10 bg-paper/70 dark:bg-[#1a0e08]/70 px-3 py-2.5"
                      >
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-flame-500 text-white text-xs font-extrabold">
                          0{i + 1}
                        </span>
                        <span className="font-bold text-ink-900 dark:text-ink-100">{label}</span>
                      </motion.li>
                    ))}
                  </ol>
                </ModalCard>
              )}

              <ModalCard icon={PlayCircle} title={t('mechanism.headers.preview')}>
                <div className="relative aspect-video overflow-hidden rounded-2xl border border-ink-900/10 dark:border-ink-100/10 bg-gradient-to-br from-flame-500/10 to-transparent grid place-items-center">
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-flame-500 text-white shadow-flame">
                      <PlayCircle size={32} />
                    </span>
                  </span>
                  <span className="absolute bottom-3 inset-x-0 text-center text-xs font-bold text-ink-600 dark:text-ink-300">
                    {t('common.videoSoon')}
                  </span>
                </div>
              </ModalCard>
            </div>

            <div className="sticky bottom-0 mt-2 border-t border-ink-900/10 dark:border-ink-100/10 bg-paper/95 dark:bg-[#120A05]/95 backdrop-blur-md px-7 sm:px-10 py-5 flex flex-wrap items-center justify-end gap-3">
              <button type="button" onClick={onClose} className="btn-ghost">
                {t('common.close')}
              </button>
              <button
                type="button"
                onClick={() => {
                  onPick?.(id);
                  onClose();
                }}
                className="btn-flame"
              >
                <Sparkles size={16} />
                {t('hero.ctaJoin')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModalCard({ icon: Icon, title, accent = false, children }) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        accent
          ? 'border-flame-500/40 bg-flame-500/5'
          : 'border-ink-900/10 dark:border-ink-100/10 bg-paper/60 dark:bg-[#170D07]/60'
      }`}
    >
      <div className="flex items-center gap-2.5">
        <Icon className="text-flame-500" size={18} />
        <h4 className="text-lg font-extrabold text-ink-900 dark:text-ink-100">{title}</h4>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
