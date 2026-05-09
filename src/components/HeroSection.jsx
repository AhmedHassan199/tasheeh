import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, GraduationCap, BookOpen, Users, Video, ImageIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Ornament } from './Ornament.jsx';
import { RichText } from './RichText.jsx';

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
      {/* Soft ink wash; no logo watermark anywhere */}
      <div aria-hidden className="absolute inset-0 ink-wash" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Headline + slogan + CTAs */}
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
              <RichText text={t('hero.slogan')} />
            </motion.p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              {/* 1) Meet teachers — primary orange */}
              <a href="#teachers" className="btn-flame">
                <GraduationCap size={18} />
                {t('hero.ctaTeachers')}
              </a>
              {/* 2) Study tracks — ghost */}
              <a href="#mechanism" className="btn-ghost">
                <BookOpen size={18} />
                {t('hero.ctaMechanism')}
              </a>
              {/* 3) Begin journey — ghost with sparkle */}
              <a href="#register" className="btn-ghost">
                <Sparkles size={18} />
                {t('hero.ctaJoin')}
              </a>
            </div>
          </motion.div>

          {/* Brand video — framed on mobile, feathered on desktop */}
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

        {/* 3-stat strip */}
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

// Brand video presentation:
//  - Mobile: smaller, proper rounded card frame with border + ornaments —
//    legibility is everything on small screens.
//  - Desktop (lg+): feathered radial mask so the video dissolves into the
//    page; the floating USP badges sit around it.
function BrandVideo() {
  const { t } = useTranslation();
  return (
    <motion.div
      animate={{ y: [-6, 6, -6] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[460px]"
    >
      {/* glow halo */}
      <span
        aria-hidden
        className="absolute -inset-6 rounded-full bg-flame-500/30 blur-3xl opacity-60 dark:opacity-80"
      />

      {/* Mobile/tablet — framed card */}
      <div className="relative h-full w-full overflow-hidden rounded-[28px] border border-flame-500/30 bg-flame-500 shadow-ink lg:hidden">
        <video
          src="/tasheeh.mp4"
          autoPlay muted loop playsInline preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-900/30 via-transparent to-transparent" />
      </div>

      {/* Desktop — frameless feathered */}
      <div
        className="relative hidden h-full w-full overflow-hidden lg:block"
        style={{
          WebkitMaskImage:
            'radial-gradient(circle at 50% 50%, black 55%, rgba(0,0,0,0.85) 70%, transparent 95%)',
          maskImage:
            'radial-gradient(circle at 50% 50%, black 55%, rgba(0,0,0,0.85) 70%, transparent 95%)',
        }}
      >
        <video
          src="/tasheeh.mp4"
          autoPlay muted loop playsInline preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Decorative ornaments — desktop only (mobile gets the framed card without these) */}
      <Ornament className="absolute -top-2 right-6 h-3 w-32 text-flame-500/70 hidden lg:block" />
      <Ornament className="absolute -bottom-2 left-6 h-3 w-32 text-flame-500/70 hidden lg:block" flip />

      {/* Floating USP badges around the video */}
      <FloatingBadge icon={Users} label={t('hero.badges.community')}   className="top-2  -start-3 sm:-start-6 sm:top-6"  delay={0.4} />
      <FloatingBadge icon={Video} label={t('hero.badges.live')}        className="bottom-3 -end-3 sm:-end-6 sm:bottom-10" delay={0.7} />
      <FloatingBadge icon={ImageIcon} label={t('hero.badges.inspiration')} className="-bottom-4 start-1/3 sm:start-1/4" delay={1.0} />
    </motion.div>
  );
}

function FloatingBadge({ icon: Icon, label, className, delay = 0 }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute z-10 flex items-center gap-2 rounded-full border border-flame-500/30 bg-paper/95 dark:bg-ink-900/85 backdrop-blur-md px-3 py-1.5 text-[11px] sm:text-xs font-extrabold text-ink-900 dark:text-ink-100 shadow-soft ${className || ''}`}
    >
      <span className="grid h-6 w-6 place-items-center rounded-full bg-flame-500 text-white">
        <Icon size={12} />
      </span>
      <span className="whitespace-nowrap">{label}</span>
    </motion.span>
  );
}
