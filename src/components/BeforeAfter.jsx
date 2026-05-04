import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Quote } from 'lucide-react';
import { studentProgress } from '../data/teachers.js';
import { Ornament } from './Ornament.jsx';

// Drag-to-reveal before/after slider — the headline interaction of the section.
// Mirrors the academy's "قبل / بعد" social posts but turns the static layout
// into something the visitor can play with.
function CompareSlider({ before, after, beforeLabel = 'قبل', afterLabel = 'بعد' }) {
  const [pos, setPos] = useState(50);
  const wrapRef = useRef(null);
  const dragging = useRef(false);

  const move = useCallback((clientX) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const next = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(2, Math.min(98, next)));
  }, []);

  useEffect(() => {
    const onUp = () => (dragging.current = false);
    const onMove = (e) => {
      if (!dragging.current) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      move(x);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, [move]);

  return (
    <div
      ref={wrapRef}
      className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-3xl border border-ink-900/10 dark:border-ink-100/10 bg-ink-100/50 dark:bg-ink-900/40 cursor-ew-resize"
      onMouseDown={(e) => {
        dragging.current = true;
        move(e.clientX);
      }}
      onTouchStart={(e) => {
        dragging.current = true;
        move(e.touches[0].clientX);
      }}
    >
      {/* AFTER (full image, beneath the clipped BEFORE) */}
      <img
        src={after}
        alt="بعد التصحيح"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span className="absolute top-4 left-4 rounded-full bg-flame-500 text-white px-3 py-1 text-xs font-extrabold shadow-flame">
        {afterLabel}
      </span>

      {/* BEFORE (clipped to the slider position) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      >
        <img
          src={before}
          alt="قبل التصحيح"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className="absolute top-4 right-4 rounded-full bg-paper/95 dark:bg-ink-900/80 text-ink-900 dark:text-ink-100 px-3 py-1 text-xs font-extrabold border border-ink-900/10 dark:border-ink-100/10">
          {beforeLabel}
        </span>
      </div>

      {/* Drag handle */}
      <div
        className="pointer-events-none absolute inset-y-0 z-10"
        style={{ left: `calc(${pos}% - 1px)` }}
      >
        <span className="absolute inset-y-0 w-0.5 bg-white/95 shadow-[0_0_0_1px_rgba(0,0,0,0.15)]" />
        <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 grid h-12 w-12 place-items-center rounded-full bg-flame-500 text-white shadow-flame">
          <ChevronLeft size={16} className="-mr-1" />
          <ChevronRight size={16} className="-ml-1" />
        </span>
      </div>
    </div>
  );
}

export function BeforeAfterSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = studentProgress[activeIdx];

  return (
    <section
      id="students"
      className="relative overflow-hidden py-24 sm:py-32 bg-paper-texture"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span className="eyebrow">تطوّر المشتركين</span>
            <h2 className="section-title mt-6">
              قبل التصحيح <span className="text-flame-gradient">وبعده</span>.
            </h2>
            <Ornament className="mt-5 h-3 w-44 text-flame-500/70" />
          </div>
          <p className="max-w-md text-ink-700/80 dark:text-ink-200/80 text-lg leading-relaxed">
            اسحب الشريط يمينًا ويسارًا لترى الفرق الحقيقي في خط الطالب قبل وبعد دراسته في
            أكاديمية تصحيح.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Slider + caption */}
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8"
          >
            <CompareSlider before={active.before} after={active.after} />

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full border border-flame-500/40 bg-flame-500/10 px-3 py-1.5 font-bold text-flame-700 dark:text-flame-300">
                خط {active.style}
              </span>
              <span className="rounded-full border border-ink-900/10 dark:border-ink-100/15 bg-paper/70 dark:bg-ink-900/40 px-3 py-1.5 text-ink-700 dark:text-ink-200 font-semibold">
                {active.duration}
              </span>
              <span className="inline-flex items-center gap-1.5 text-ink-600 dark:text-ink-300">
                <MapPin size={14} className="text-flame-500" />
                {active.country}
              </span>
            </div>

            <p className="mt-5 leading-relaxed text-ink-700 dark:text-ink-200">
              {active.note}
            </p>
          </motion.div>

          {/* Picker */}
          <div className="lg:col-span-4">
            <h3 className="text-xl font-extrabold text-ink-900 dark:text-ink-100">
              قصص الطلاب
            </h3>
            <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
              نتائج حقيقية بعد الالتزام بالمنهج وأداء الواجبات أسبوعيًا.
            </p>

            <ul className="mt-6 space-y-3">
              {studentProgress.map((s, i) => {
                const isActive = i === activeIdx;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => setActiveIdx(i)}
                      aria-pressed={isActive}
                      className={`group flex w-full items-center gap-4 rounded-2xl border p-3 text-right transition-all ${
                        isActive
                          ? 'border-flame-500/60 bg-flame-500/10 shadow-flame'
                          : 'border-ink-900/10 dark:border-ink-100/10 bg-paper/70 dark:bg-[#150B07]/70 hover:border-flame-500/40'
                      }`}
                    >
                      <span className="relative inline-flex h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-ink-900/10 dark:border-ink-100/10">
                        <img
                          src={s.after}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </span>
                      <span className="flex-1">
                        <span className="block text-base font-extrabold text-ink-900 dark:text-ink-100">
                          {s.name}
                        </span>
                        <span className="block text-xs text-ink-600 dark:text-ink-300">
                          {s.country} · خط {s.style}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className={`shrink-0 text-flame-500 transition-transform ${
                          isActive ? '-translate-x-1' : 'opacity-0 group-hover:opacity-100'
                        }`}
                      >
                        <ChevronLeft size={18} />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Testimonial card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-8 relative rounded-3xl border border-ink-900/10 dark:border-ink-100/10 bg-gradient-to-br from-flame-500/10 to-transparent p-6"
            >
              <Quote className="text-flame-500/60" size={28} />
              <p className="mt-3 leading-relaxed text-ink-800 dark:text-ink-100">
                «نبتهج برؤية الثمرة بعد المجهود الطويل.»
              </p>
              <p className="mt-3 text-sm font-bold text-flame-600 dark:text-flame-400">
                — من رسائل الطلاب
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
