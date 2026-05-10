import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Compass, BookOpenText, Award } from 'lucide-react';
import { Ornament } from './Ornament.jsx';
import { RichText } from './RichText.jsx';
import { HorizontalSlider } from './HorizontalSlider.jsx';

const PILLARS = [
  { id: 'vision',    icon: Compass     },
  { id: 'boundless', icon: BookOpenText },
  { id: 'mastery',   icon: Award       },
];

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

        {/* Pillars — single horizontal row on mobile, 3-up grid on desktop */}
        <HorizontalSlider className="mt-16 lg:mt-20 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:mx-0 lg:pb-0 lg:snap-none">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative h-full rounded-3xl border border-ink-900/10 dark:border-ink-100/10 bg-paper/80 dark:bg-[#150B07]/70 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-flame-500/40 hover:shadow-flame"
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
        </HorizontalSlider>
      </div>
    </section>
  );
}
