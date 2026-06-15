import { useCallback, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { teachers } from '../data/teachers.js';
import { shuffle } from '../lib/shuffle.js';
import { TeacherAvatar } from './TeacherAvatar.jsx';
import { TeacherModal } from './TeacherModal.jsx';
import { Ornament } from './Ornament.jsx';
import { RichText } from './RichText.jsx';

// ترتيب عرض الخطوط فى الفلتر (ما هو متاح فقط يظهر)
const SCRIPT_ORDER = ['naskh', 'thuluth', 'diwani', 'jali', 'ruqaa'];

export function InstructorsSection({ onRegisterWithTeacher }) {
  const { t } = useTranslation();
  const [active, setActive] = useState(null);
  const [seen, setSeen] = useState(() => new Set());
  const [filter, setFilter] = useState('all');
  const scrollerRef = useRef(null);

  // ترتيب عشوائى ثابت طوال الجلسة، يُعاد توليده عند كل refresh للصفحة.
  const ordered = useMemo(() => shuffle(teachers), []);

  // خيارات الفلتر مبنية ديناميكيًا من الخطوط الموجودة فعلًا.
  const filterOptions = useMemo(() => {
    const present = SCRIPT_ORDER.filter((s) => teachers.some((tt) => tt.scripts.includes(s)));
    return ['all', ...present];
  }, []);

  const visible = useMemo(
    () => (filter === 'all' ? ordered : ordered.filter((tt) => tt.scripts.includes(filter))),
    [ordered, filter],
  );

  const markSeen = useCallback((id) => {
    setSeen((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const openTeacher = useCallback((teacher) => {
    markSeen(teacher.id);
    setActive(teacher);
  }, [markSeen]);

  const handleClose = useCallback(() => setActive(null), []);
  const handleSwitch = useCallback((next) => {
    markSeen(next.id);
    setActive(next);
  }, [markSeen]);

  // أسهم التنقّل — تُحرّك الـ scroller أفقيًا فقط (لا تمسّ تمرير الصفحة الرأسى).
  const scrollByCard = useCallback((dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector('[data-card]');
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.6;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  }, []);

  return (
    <section id="teachers" className="relative overflow-hidden section-y bg-paper-texture">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="eyebrow">{t('teachers.eyebrow')}</span>
          <h2 className="section-title mt-6 text-balance">
            <RichText text={t('teachers.title')} />
          </h2>
          <Ornament className="mx-auto mt-6 h-3 w-56 text-flame-500/70" />
          <p className="mt-5 text-lg leading-relaxed text-ink-700/85 dark:text-ink-200/85">
            {t('teachers.subtitle')}
          </p>
        </motion.div>

        {/* شريط الفلتر — الكل + الخطوط المتاحة */}
        <div className="mt-10 flex justify-center">
          <div className="flex gap-2 overflow-x-auto px-1 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filterOptions.map((opt) => {
              const isActive = filter === opt;
              const label = opt === 'all' ? t('teachers.filterAll') : t(`scripts.${opt}`);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setFilter(opt);
                    scrollerRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
                  }}
                  className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-extrabold transition-all duration-300 ${
                    isActive
                      ? 'bg-flame-500 text-white shadow-flame'
                      : 'bg-ink-900/5 dark:bg-ink-100/10 text-ink-700 dark:text-ink-200 hover:bg-ink-900/10 dark:hover:bg-ink-100/15'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* الكاروسيل + الأسهم */}
        <div className="relative mt-12">
          {/* سهم (يمين فى RTL = تحريك للخلف) — يظهر على الموبايل/التابلت فقط */}
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label={t('teachers.prevTeacher')}
            className="lg:hidden absolute end-0 top-[4.5rem] z-10 grid h-11 w-11 place-items-center rounded-full border border-ink-900/10 dark:border-ink-100/15 bg-paper/90 dark:bg-[#150B07]/90 backdrop-blur text-ink-700 dark:text-ink-200 hover:bg-flame-500 hover:text-white hover:border-transparent shadow-soft transition-all"
          >
            <ChevronRight size={20} />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label={t('teachers.nextTeacher')}
            className="lg:hidden absolute start-0 top-[4.5rem] z-10 grid h-11 w-11 place-items-center rounded-full border border-ink-900/10 dark:border-ink-100/15 bg-paper/90 dark:bg-[#150B07]/90 backdrop-blur text-ink-700 dark:text-ink-200 hover:bg-flame-500 hover:text-white hover:border-transparent shadow-soft transition-all"
          >
            <ChevronLeft size={20} />
          </button>

          {/* الـ scroller:
              - موبايل: Center Mode — عنصر فى المنتصف ونصفا الجارَين يطلّان من الجنبين.
              - ديسكتوب: كل المعلمين فى صفّ موسّط بدون تمرير.
              التمرير الأفقى native (snap)، والتمرير الرأسى للصفحة يبقى حرًّا تمامًا. */}
          <div
            ref={scrollerRef}
            className="flex gap-6 overflow-x-auto px-[19%] sm:px-0 sm:justify-center sm:gap-10 sm:overflow-visible scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((teacher) => (
                <motion.div
                  key={teacher.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex shrink-0 basis-[62%] justify-center snap-center sm:basis-auto"
                >
                  <TeacherAvatar
                    teacher={teacher}
                    seen={seen.has(teacher.id)}
                    onClick={() => openTeacher(teacher)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <TeacherModal
        teacher={active}
        seen={seen}
        onSeen={markSeen}
        onClose={handleClose}
        onSwitch={handleSwitch}
        onRegister={onRegisterWithTeacher}
      />
    </section>
  );
}
