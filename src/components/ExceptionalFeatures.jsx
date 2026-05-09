import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Users, Sparkles, Image as ImageIcon, MessageCircle, HeartHandshake, PlayCircle } from 'lucide-react';
import { Ornament } from './Ornament.jsx';
import { RichText } from './RichText.jsx';
import { featurePlaceholders } from '../data/teachers.js';

const ITEMS = [
  { id: 'community', icon: Users },
  { id: 'tips',      icon: Sparkles },
  { id: 'feeding',   icon: ImageIcon },
  { id: 'qa',        icon: MessageCircle },
  { id: 'feedback',  icon: HeartHandshake },
];

export function ExceptionalFeatures() {
  const { t } = useTranslation();

  return (
    <section id="features" className="relative overflow-hidden py-24 sm:py-32 bg-paper-texture">
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
          </div>
        </motion.div>

        {/* 5 feature cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className={`group relative overflow-hidden rounded-3xl border border-ink-900/10 dark:border-ink-100/10 bg-paper/80 dark:bg-[#150B07]/70 p-7 transition-all hover:border-flame-500/40 hover:shadow-flame ${
                  i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <span aria-hidden className="absolute inset-0 bg-gradient-to-br from-flame-500/5 to-transparent opacity-60" />
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-flame-500/10 text-flame-600 dark:text-flame-400 transition-colors group-hover:bg-flame-500 group-hover:text-white">
                  <Icon size={22} />
                </span>
                <h3 className="relative mt-5 text-xl font-extrabold text-ink-900 dark:text-ink-100">
                  {t(`features.items.${item.id}.title`)}
                </h3>
                <p className="relative mt-3 leading-relaxed text-ink-700/85 dark:text-ink-200/85">
                  {t(`features.items.${item.id}.body`)}
                </p>
                <Ornament className="relative mt-6 h-3 w-32 text-flame-500/60" />
              </motion.article>
            );
          })}
        </div>

        {/* Screenshot placeholders */}
        <div className="mt-16 grid gap-6 lg:grid-cols-12 lg:items-stretch">
          <Showcase
            title={t('features.communityCaption')}
            images={featurePlaceholders.community}
            className="lg:col-span-7"
          />
          <Showcase
            title={t('features.liveCaption')}
            images={featurePlaceholders.live}
            isVideo
            className="lg:col-span-5"
          />
        </div>
      </div>
    </section>
  );
}

function Showcase({ title, images, isVideo = false, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7 }}
      className={`relative rounded-[28px] border border-ink-900/10 dark:border-ink-100/10 bg-paper/80 dark:bg-[#150B07]/70 p-5 sm:p-6 ${className}`}
    >
      <p className="mb-4 text-sm font-extrabold tracking-[0.18em] uppercase text-flame-600 dark:text-flame-400">
        {title}
      </p>

      {isVideo ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {images.map((src, i) => (
            <div
              key={src}
              className="group relative aspect-video overflow-hidden rounded-2xl border border-ink-900/10 dark:border-ink-100/10 bg-flame-500/5"
            >
              <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-flame-500/95 text-white shadow-flame transition-transform group-hover:scale-110">
                  <PlayCircle size={28} />
                </span>
              </span>
              <span aria-hidden className="absolute inset-0 bg-ink-900/30" />
              {/* recording dot */}
              {i === 0 && (
                <motion.span
                  className="absolute top-3 start-3 inline-flex items-center gap-1.5 rounded-full bg-ink-900/70 text-white text-[10px] font-extrabold px-2 py-1"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                >
                  <span className="h-2 w-2 rounded-full bg-red-400" />
                  LIVE
                </motion.span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className={`relative aspect-square overflow-hidden rounded-2xl border border-ink-900/10 dark:border-ink-100/10 ${
                i === 0 ? 'col-span-2 sm:col-span-2 row-span-1 aspect-[2/1] sm:aspect-[2/1.05]' : ''
              }`}
            >
              <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-110" />
              <span className="absolute inset-0 bg-gradient-to-t from-ink-900/40 to-transparent" />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
