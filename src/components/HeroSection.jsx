import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, GraduationCap, Play } from 'lucide-react';
import { Ornament } from './Ornament.jsx';
import { academyStats } from '../data/teachers.js';

const fadeUp = {
  initial: { y: 28, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-paper-texture pt-32 pb-24 sm:pt-40 sm:pb-32"
    >
      {/* Layered ink wash */}
      <div aria-hidden className="absolute inset-0 ink-wash" />

      {/* Watermark — using the actual brand watermark mark */}
      <img
        src="/logo.jpg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-[15vw] top-[20%] w-[80vw] max-w-[1100px] opacity-[0.04] dark:opacity-[0.08] mix-blend-multiply rotate-[-6deg] select-none"
      />

      {/* Side strip with vertical text */}
      <div
        aria-hidden
        className="hidden xl:flex absolute right-6 top-1/2 -translate-y-1/2 items-center gap-4 text-ink-500/60 dark:text-ink-300/40"
      >
        <span className="vertical-text tracking-[0.4em] text-xs uppercase font-bold">
          Tasheeh — since 2022
        </span>
        <span className="block h-32 w-px bg-current/40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow">أكاديمية الخط العربي</span>
        </motion.div>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:items-end">
          {/* Headline */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <h1 className="section-title text-balance">
              نُصحّحُ الحرفَ،
              <br />
              لنصنعَ
              <span className="relative mx-3 inline-block">
                <span className="text-flame-gradient">خطّاطًا</span>
                {/* Hand-drawn underline that draws itself in (echoes the pen
                    swoop in the brand video) */}
                <svg
                  aria-hidden
                  viewBox="0 0 200 12"
                  className="absolute -bottom-3 left-0 right-0 w-full text-flame-500/80"
                >
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
              حقيقيًا.
            </h1>
            <p className="mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed text-ink-700/85 dark:text-ink-200/85">
              منذ عام <span className="font-extrabold text-flame-600 dark:text-flame-400">٢٠٢٢</span>،
              نُرسي المنهجية الأصيلة لفنون الخط العربي وننقلها إلى عُشّاق الحرف أينما كانوا — لا
              مجرّد دورات عابرة، بل رحلة أكاديمية طويلة الأمد تحت إشراف نخبة من الأساتذة
              المتقنين.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#register" className="btn-flame">
                <Sparkles size={18} />
                ابدأ رحلتك الآن
              </a>
              <a href="#instructors" className="btn-ghost">
                <GraduationCap size={18} />
                تعرّف على الأساتذة
              </a>
            </div>
          </motion.div>

          {/* Right column: brand video — autoplays muted as a hero animation */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <BrandVideoCard />
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-ink-900/10 dark:border-ink-100/10 bg-ink-900/5 dark:bg-ink-100/5 sm:grid-cols-4"
        >
          {academyStats.map((s) => (
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
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-14 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-bold text-ink-600/70 dark:text-ink-300/70 hover:text-flame-500"
        >
          اكتشف المزيد
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="inline-flex"
          >
            <ArrowDown size={14} />
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}

// Brand video card — plays /tasheeh.mp4 muted on loop. Mobile browsers need
// `playsInline` to keep it inline rather than going fullscreen.
function BrandVideoCard() {
  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-[28px] border border-ink-900/10 dark:border-ink-100/10 bg-flame-500 shadow-ink aspect-square">
        <video
          src="/tasheeh.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* subtle vignette for legibility */}
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-900/35 via-transparent to-transparent" />

        {/* Floating play indicator (purely decorative, the video already plays) */}
        <span
          aria-hidden
          className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-paper/90 dark:bg-ink-900/80 px-3 py-1.5 text-xs font-bold text-ink-800 dark:text-ink-100 backdrop-blur-md"
        >
          <Play size={12} className="fill-current" />
          هويّة تصحيح
        </span>
      </div>

      {/* Floating tag */}
      <motion.div
        aria-hidden
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-5 -left-5 hidden sm:flex items-center gap-2 rounded-2xl bg-flame-500 text-white px-4 py-2 shadow-flame text-sm font-bold"
      >
        <Ornament className="h-2 w-12 text-white/90" />
        ٤ دروس / شهر
      </motion.div>
    </div>
  );
}
