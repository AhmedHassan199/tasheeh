import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, GraduationCap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Ornament } from './Ornament.jsx';
import { RichText } from './RichText.jsx';

const fadeUp = {
  initial: { y: 28, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

export function HeroSection() {
  const { t } = useTranslation();
  const stats = [t('hero.stats.founded', { returnObjects: true }), t('hero.stats.instructors', { returnObjects: true }), t('hero.stats.countries', { returnObjects: true })];

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-paper-texture pt-32 pb-24 sm:pt-40 sm:pb-32"
    >
      <div aria-hidden className="absolute inset-0 ink-wash" />

      {/* Brand watermark — the actual logo image, very low opacity, no text */}
      <img
        src="/logo.jpg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-[12vw] top-[12%] w-[70vw] max-w-[900px] opacity-[0.05] dark:opacity-[0.08] mix-blend-multiply rotate-[-6deg] select-none"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div variants={fadeUp} initial="initial" animate="animate" transition={{ duration: 0.7 }}>
          <span className="eyebrow">{t('hero.eyebrow')}</span>
        </motion.div>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left: title + slogan + CTAs */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <h1 className="section-title text-balance">
              {t('hero.title')}
              {/* Ink mark beneath the title — draws itself in like a calligraphic flourish */}
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
              <RichText text={t('hero.slogan')} />
            </motion.p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#register" className="btn-flame">
                <Sparkles size={18} />
                {t('hero.ctaPrimary')}
              </a>
              <a href="#teachers" className="btn-ghost">
                <GraduationCap size={18} />
                {t('hero.ctaSecondary')}
              </a>
            </div>
          </motion.div>

          {/* Right: brand video — feathered into the page, no traditional frame */}
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

        {/* 3-item stats strip */}
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

        {/* Scroll cue */}
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

// Frameless brand video — feathered with a soft mask so it dissolves into
// the page rather than living inside a square card.
function BrandVideo() {
  return (
    <motion.div
      animate={{ y: [-6, 6, -6] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      className="relative mx-auto aspect-square max-w-[440px]"
    >
      {/* glow halo */}
      <span
        aria-hidden
        className="absolute -inset-8 rounded-full bg-flame-500/30 blur-3xl opacity-60 dark:opacity-80"
      />

      {/* feathered mask + organic shape */}
      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          WebkitMaskImage:
            'radial-gradient(circle at 50% 50%, black 55%, rgba(0,0,0,0.85) 70%, transparent 95%)',
          maskImage:
            'radial-gradient(circle at 50% 50%, black 55%, rgba(0,0,0,0.85) 70%, transparent 95%)',
        }}
      >
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

      {/* decorative ornaments around the video — replace the previous text tags */}
      <Ornament className="absolute -top-2 right-6 h-3 w-32 text-flame-500/70" />
      <Ornament className="absolute -bottom-2 left-6 h-3 w-32 text-flame-500/70" flip />
    </motion.div>
  );
}
