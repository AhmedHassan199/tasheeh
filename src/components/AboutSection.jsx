import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Compass, BookOpenText, Award, Repeat } from 'lucide-react';
import { Ornament } from './Ornament.jsx';
import { RichText } from './RichText.jsx';

const PILLARS = [
  { id: 'vision',    icon: Compass     },
  { id: 'boundless', icon: BookOpenText },
  { id: 'mastery',   icon: Award       },
];

const STEPS = ['1', '2', '3', '4'];

export function AboutSection() {
  const { t } = useTranslation();

  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-32 bg-paper-texture">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="grid gap-10 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            <span className="eyebrow">{t('about.eyebrow')}</span>
            <h2 className="section-title mt-6 text-balance">
              <RichText text={t('about.title')} />
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-ink-700/85 dark:text-ink-200/85">
              {t('about.lead')}
            </p>
          </div>
        </motion.div>

        {/* Pillars */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative rounded-3xl border border-ink-900/10 dark:border-ink-100/10 bg-paper/80 dark:bg-[#150B07]/70 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-flame-500/40 hover:shadow-flame"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-flame-500/10 text-flame-600 dark:text-flame-400 transition-colors group-hover:bg-flame-500 group-hover:text-white">
                    <Icon size={22} />
                  </span>
                  <span className="text-5xl font-black text-ink-900/10 dark:text-ink-100/10 transition-colors group-hover:text-flame-500/30">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-extrabold text-ink-800 dark:text-ink-100">
                  {t(`about.pillars.${p.id}.title`)}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-700/80 dark:text-ink-200/80">
                  {t(`about.pillars.${p.id}.body`)}
                </p>
                <Ornament className="mt-6 h-3 w-32 text-flame-500/70" />
              </motion.article>
            );
          })}
        </div>

        {/* Methodology with the loud "repetition" highlight */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mt-24 rounded-[32px] border border-ink-900/10 dark:border-ink-100/10 bg-gradient-to-br from-flame-500/5 to-transparent p-8 sm:p-12"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow">{t('about.methodology.eyebrow')}</span>
              <h3 className="section-title mt-4 !text-3xl sm:!text-4xl">
                <RichText text={t('about.methodology.title')} />
              </h3>
            </div>
          </div>

          <RepetitionHighlight />

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((n, i) => (
              <motion.li
                key={n}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative rounded-2xl border border-ink-900/10 dark:border-ink-100/10 bg-paper/70 dark:bg-[#150B07]/70 p-5"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-flame-600 dark:text-flame-400">
                    0{n}
                  </span>
                  {i < STEPS.length - 1 && (
                    <span aria-hidden className="hidden lg:block text-flame-500/50">←</span>
                  )}
                </div>
                <p className="mt-3 text-lg font-bold text-ink-800 dark:text-ink-100">
                  {t(`about.methodology.steps.${n}`)}
                </p>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}

function RepetitionHighlight() {
  const { t } = useTranslation();
  const headline = t('about.methodology.highlight');
  const sub = t('about.methodology.highlightSub');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8 }}
      className="relative mt-12 overflow-hidden rounded-3xl border-2 border-flame-500/40 bg-flame-500/5 dark:bg-flame-500/10 p-8 sm:p-12"
    >
      <motion.span
        aria-hidden
        className="absolute -top-24 -end-24 h-64 w-64 rounded-full bg-flame-500/30 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative flex items-start gap-5">
        <motion.span
          className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-flame-500 text-white shadow-flame"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          <Repeat size={26} />
        </motion.span>

        <div className="relative flex-1">
          {[0.18, 0.10, 0.05].map((opacity, i) => (
            <motion.p
              key={i}
              aria-hidden
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.18, duration: 0.6 }}
              className="absolute inset-0 text-2xl sm:text-4xl font-black text-flame-600 dark:text-flame-400 select-none"
              style={{ transform: `translate(${(i + 1) * 6}px, ${(i + 1) * 6}px)` }}
            >
              {headline}
            </motion.p>
          ))}

          <motion.p
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="relative text-2xl sm:text-4xl font-black text-flame-600 dark:text-flame-400 leading-tight"
          >
            {headline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="relative mt-6 text-base sm:text-lg leading-relaxed text-ink-700 dark:text-ink-200"
          >
            {sub}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
