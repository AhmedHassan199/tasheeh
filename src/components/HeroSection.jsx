import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, GraduationCap, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const fadeUp = { initial: { y: 28, opacity: 0 }, animate: { y: 0, opacity: 1 } };

export function HeroSection() {
  const { t } = useTranslation();
  const stats = [
    t('hero.stats.founded',     { returnObjects: true }),
    t('hero.stats.instructors', { returnObjects: true }),
    t('hero.stats.countries',   { returnObjects: true }),
  ];

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-paper-texture pt-32 pb-24 sm:pt-40 sm:pb-32"
    >
      <div aria-hidden className="absolute inset-0 ink-wash" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <h1 className="section-title text-balance">
              {t('hero.title')}
              <span className="block relative mt-3 h-3 w-40">
                <svg viewBox="0 0 200 12" className="absolute inset-0 w-full h-full text-flame-500">
                  <motion.path
                    d="M2 8C40 2 80 2 120 6 150 9 178 8 198 5"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.6, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
                  />
                </svg>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-7 max-w-2xl text-xl sm:text-2xl leading-relaxed font-bold text-ink-800/90 dark:text-ink-100/90"
            >
              {t('hero.slogan')}
            </motion.p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href="#teachers" className="btn-flame">
                <GraduationCap size={18} />
                {t('hero.ctaTeachers')}
              </a>
              <a href="#mechanism" className="btn-ghost">
                <BookOpen size={18} />
                {t('hero.ctaMechanism')}
              </a>
              <a href="#register" className="btn-ghost">
                <Sparkles size={18} />
                {t('hero.ctaJoin')}
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <BrandVideo />
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-ink-900/10 dark:border-ink-100/10 bg-ink-900/5 dark:bg-ink-100/5 sm:grid-cols-3"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-paper dark:bg-[#150B07] px-6 py-7 text-center transition-colors hover:bg-flame-50 dark:hover:bg-flame-900/20"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-flame-600 dark:text-flame-400">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-ink-600/80 dark:text-ink-300/80 font-semibold">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.a
          href="#teachers"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-14 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-bold text-ink-600/70 dark:text-ink-300/70 hover:text-flame-500"
        >
          {t('hero.scrollCue')}
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="inline-flex">
            <ArrowDown size={14} />
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}

// Square framed brand video, identical treatment on mobile and desktop.
// No floating badges, no feathered mask — clean, professional UI frame.
function BrandVideo() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[460px]">
      <span
        aria-hidden
        className="absolute -inset-6 rounded-[36px] bg-flame-500/30 blur-3xl opacity-50"
      />
      <div className="relative h-full w-full overflow-hidden rounded-[28px] border border-flame-500/30 bg-flame-500 shadow-ink">
        <video
          src="/tasheeh.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
