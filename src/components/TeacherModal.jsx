import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  X, Sparkles, ZoomIn, Trophy,
  ChevronRight, ChevronLeft,
  MapPin, Calendar, GraduationCap, Feather,
} from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import { Ornament } from './Ornament.jsx';
import { TeacherAvatar } from './TeacherAvatar.jsx';
import { useModalHistory } from '../hooks/useModalHistory.js';
import { teachers as ALL_TEACHERS } from '../data/teachers.js';

export function TeacherModal({ teacher, seen, onSeen, onClose, onSwitch, onRegister }) {
  const { t } = useTranslation();
  const [lbIndex, setLbIndex] = useState(-1);
  const [hoveredId, setHoveredId] = useState(null);
  const scrollRef = useRef(null);

  // عند تبديل الأستاذ: ارجع لأعلى المودال علشان المستخدم يشوف بياناته الجديدة فورًا،
  // وامسح حالة الـ hover (وإلا الأفاتار اللى ضغطته يفضل dim).
  useEffect(() => {
    if (!teacher) return;
    onSeen?.(teacher.id); // الأستاذ المعروض = مستكشَف (يخفت إطاره فى كل الشرائط)
    setHoveredId(null);
    setLbIndex(-1);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [teacher?.id]);
  const isOpen = !!teacher;

  const namePlain     = teacher ? t(`teachers.list.${teacher.id}.namePlain`)     : '';
  const nationality   = teacher ? t(`teachers.list.${teacher.id}.nationality`)   : '';
  const dob           = teacher ? t(`teachers.list.${teacher.id}.dob`)           : '';
  const qualification = teacher ? t(`teachers.list.${teacher.id}.qualification`) : '';
  const studentOf     = teacher ? t(`teachers.list.${teacher.id}.studentOf`, { returnObjects: true }) : [];
  const awards        = teacher ? t(`teachers.list.${teacher.id}.awards`,    { returnObjects: true }) : [];
  const prefix        = t('teachers.prefix');

  useEffect(() => {
    if (!isOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  // زرّ الرجوع على الموبايل يقفل أعلى نافذة مفتوحة (Lightbox أولًا ثم البطاقة).
  // hook واحد فقط بمرجع ثابت لتفادى السباق بين تنظيف hooks متعدّدة
  // (history.back() داخل cleanup يُطلق popstate يلتقطه hook آخر فيغلق نفسه فورًا).
  const lbRef = useRef(lbIndex);
  useEffect(() => { lbRef.current = lbIndex; }, [lbIndex]);
  const handleBack = useCallback(() => {
    if (lbRef.current >= 0) setLbIndex(-1);
    else onClose();
  }, [onClose]);
  useModalHistory(isOpen, handleBack);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6 lg:p-8"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={namePlain}
          >
            <div className="absolute inset-0 bg-ink-900/70 backdrop-blur-md" />

            <motion.div
              ref={scrollRef}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-[61] w-full max-w-5xl max-h-[95vh] sm:max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-white/10 bg-paper dark:bg-[#120A05] shadow-ink"
            >
              {/* Header — image + name + scripts (مدمج على الموبايل، عمودان على الديسكتوب) */}
              <div className="grid gap-0 md:grid-cols-12">
                {/* الصورة — أصغر على الموبايل (16:10) علشان ما تاخدش الشاشة كلها */}
                <div className="relative md:col-span-5 aspect-[16/10] md:aspect-auto md:min-h-[420px] overflow-hidden">
                  <img src={teacher.image} alt={namePlain} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/20 to-transparent md:bg-gradient-to-l" />
                  <div className="absolute inset-x-5 bottom-5 md:hidden">
                    <p className="text-xs font-bold tracking-wider text-white/85">{prefix}</p>
                    <h2 className="mt-1 text-2xl font-extrabold text-white leading-tight">{namePlain}</h2>
                  </div>
                </div>

                <div className="relative md:col-span-7 p-7 sm:p-10">
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label={t('common.close')}
                    className="absolute end-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-ink-900/10 dark:border-ink-100/15 text-ink-700 dark:text-ink-200 hover:bg-flame-500 hover:text-white hover:border-transparent transition-colors"
                  >
                    <X size={18} />
                  </button>

                  <div className="hidden md:block">
                    <p className="text-sm font-semibold text-ink-500 dark:text-ink-300">{prefix}</p>
                    <h2 className="mt-1 text-4xl font-extrabold leading-tight text-ink-900 dark:text-ink-100">
                      {namePlain}
                    </h2>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {teacher.scripts.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-flame-500/40 bg-flame-500/10 px-3 py-1.5 text-sm font-bold text-flame-700 dark:text-flame-300"
                      >
                        {t(`scripts.${s}`)}
                      </span>
                    ))}
                  </div>

                  <Ornament className="mt-6 h-3 w-44 text-flame-500/70" />

                  {/* البيانات الشخصية — مكدّسة تحت بعض، كل صفّ بشريط ضوئى برتقالى وأيقونة */}
                  <dl className="mt-7 space-y-3">
                    <InfoStack icon={MapPin}         label={t('teachers.info.nationality')}   value={nationality} />
                    <InfoStack icon={Calendar}       label={t('teachers.info.dob')}            value={dob} />
                    <InfoStack icon={GraduationCap}  label={t('teachers.info.qualification')}  value={qualification} />
                  </dl>

                  {/* أساتذته — chips مذهّبة بأنيمشن ناعم */}
                  <div className="mt-7">
                    <div className="flex items-center gap-2.5 mb-3">
                      <Feather size={16} className="text-flame-500" />
                      <p className="text-xs font-extrabold tracking-[0.18em] uppercase text-flame-600 dark:text-flame-400">
                        {t('teachers.info.studentOf')}
                      </p>
                      <span aria-hidden className="flex-1 h-px bg-gradient-to-l rtl:bg-gradient-to-r from-flame-500/40 to-transparent" />
                    </div>
                    <ul className="flex flex-wrap gap-2">
                      {studentOf.map((s, i) => (
                        <motion.li
                          key={s}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 + i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="inline-flex items-center gap-2.5 rounded-full px-4 py-2
                            bg-gradient-to-br from-flame-500/15 via-flame-500/8 to-paper
                            dark:from-flame-500/25 dark:via-flame-500/12 dark:to-[#170D07]
                            border border-flame-500/40 shadow-sm
                            hover:shadow-flame hover:border-flame-500/70 hover:-translate-y-0.5
                            transition-all duration-300"
                        >
                          <span aria-hidden className="relative grid h-5 w-5 place-items-center">
                            <span className="absolute inset-0 rounded-full bg-flame-500/25 animate-pulse" />
                            <span className="relative h-2 w-2 rounded-full bg-flame-500 ring-2 ring-flame-500/30" />
                          </span>
                          <span className="font-extrabold text-ink-800 dark:text-ink-100">{s}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* الكارت الرئيسى — الجوائز والمشاركات بشكل بارز + الأساتذة فى الأسفل */}
              <div className="px-7 sm:px-10 mt-6">
                <div className="rounded-3xl border-2 border-flame-500/30 bg-gradient-to-br from-flame-500/8 via-flame-500/5 to-transparent dark:from-flame-500/15 dark:via-flame-500/10 p-6 sm:p-7 shadow-flame">
                  {/* العنوان مع أيقونة الجائزة */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-flame-500 to-flame-700 text-white shadow-flame">
                      <Trophy size={26} />
                    </span>
                    <div>
                      <h4 className="text-2xl font-extrabold text-ink-900 dark:text-ink-100 leading-tight">
                        {t('teachers.info.awards')}
                      </h4>
                    </div>
                  </div>

                  {/* قائمة الجوائز — كل جائزة فى بطاقة مستقلة برقم متسلسل */}
                  <ul className="grid gap-2.5">
                    {awards.map((a, i) => (
                      <li
                        key={a}
                        className="group flex gap-3.5 items-start rounded-2xl border border-flame-500/20 bg-paper/80 dark:bg-[#170D07]/80 px-4 py-3.5 hover:border-flame-500/60 hover:bg-flame-500/5 hover:-translate-x-0.5 rtl:hover:translate-x-0.5 transition-all"
                      >
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-flame-500 text-white text-xs font-extrabold shadow-sm">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-bold leading-relaxed text-ink-800 dark:text-ink-100 group-hover:text-ink-900 dark:group-hover:text-white transition-colors">
                          {a}
                        </span>
                      </li>
                    ))}
                  </ul>

                </div>
              </div>

              {/* Gallery */}
              <div className="px-7 sm:px-10 mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-extrabold text-ink-900 dark:text-ink-100">
                    {t('teachers.info.works')}
                  </h3>
                  <p className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-flame-600 dark:text-flame-400">
                    <ZoomIn size={14} />
                    {t('teachers.zoomHint')}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {(teacher.gallery || []).map((g, i) => {
                    // يدعم الشكلين: نص رابط مباشر، أو كائن { src, thumb }
                    const thumbSrc = typeof g === 'string' ? g : (g.thumb || g.src);
                    const key = typeof g === 'string' ? g : g.src;
                    return (
                      <motion.button
                        type="button"
                        key={key}
                        onClick={() => setLbIndex(i)}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative overflow-hidden rounded-2xl border border-ink-900/10 dark:border-ink-100/10 bg-gradient-to-br from-paper to-parchment dark:from-[#1a0e08] dark:to-[#0e0703] shadow-sm hover:shadow-flame transition-shadow"
                        aria-label={t('teachers.info.works')}
                      >
                        {/* الإطار يحافظ على نسبة 4/3 — والـ object-contain يُظهر اللوحة كاملةً بدون قصّ */}
                        <div className="aspect-[4/3] w-full grid place-items-center p-2">
                          <img
                            src={thumbSrc}
                            alt=""
                            loading="lazy"
                            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        {/* علامة تشير بوضوح إلى أنه قابل للنقر */}
                        <span className="absolute end-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-flame-500 text-white shadow-flame opacity-0 transition-opacity group-hover:opacity-100">
                          <ZoomIn size={16} />
                        </span>
                        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/85 to-transparent px-3 py-2 text-xs font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
                          {t('teachers.openWork')}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* شريط تنقّل بين الأساتذة — يعمل كـ sidebar أفقى:
                  - الأستاذ الحالى مخفى من القائمة (يظهر الباقون فقط)
                  - أسهم يمين/شمال للانتقال السريع للتالى/السابق فى الترتيب
                  - hover على أفاتار: الباقون يخفتون للتركيز عليه */}
              {(() => {
                const others = ALL_TEACHERS.filter((tt) => tt.id !== teacher.id);
                if (others.length === 0) return null;

                // ترتيب دائرى للأسهم: prev = السابق، next = التالى
                const currentIdx = ALL_TEACHERS.findIndex((tt) => tt.id === teacher.id);
                const prevTeacher = ALL_TEACHERS[(currentIdx - 1 + ALL_TEACHERS.length) % ALL_TEACHERS.length];
                const nextTeacher = ALL_TEACHERS[(currentIdx + 1) % ALL_TEACHERS.length];

                return (
                  <div className="px-7 sm:px-10 mt-10">
                    <div className="text-center mb-5">
                      <p className="text-sm font-extrabold tracking-[0.18em] uppercase text-flame-600 dark:text-flame-400">
                        {t('teachers.switchTeacher')}
                      </p>
                      <p className="mt-1.5 text-xs text-ink-600/80 dark:text-ink-300/80">
                        {t('teachers.switchHint')}
                      </p>
                    </div>

                    {/* الشريط: سهم + الأفاتارات + سهم */}
                    <div className="flex items-center justify-center gap-3 sm:gap-5">
                      {/* السهم الأيمن (RTL = السابق) */}
                      <button
                        type="button"
                        onClick={() => onSwitch?.(prevTeacher)}
                        aria-label={t('teachers.prevTeacher')}
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink-900/10 dark:border-ink-100/15 text-ink-700 dark:text-ink-200 hover:bg-flame-500 hover:text-white hover:border-transparent hover:shadow-flame transition-all"
                      >
                        <ChevronRight size={20} />
                      </button>

                      {/* الأفاتارات (الباقون فقط) — نفس الإطار التفاعلى (ستوري) بحالة seen */}
                      <div
                        className="flex flex-wrap items-start justify-center gap-5 sm:gap-7"
                        onMouseLeave={() => setHoveredId(null)}
                      >
                        {others.map((tt) => (
                          <TeacherAvatar
                            key={tt.id}
                            teacher={tt}
                            size="sm"
                            seen={seen?.has(tt.id)}
                            dim={hoveredId && hoveredId !== tt.id}
                            onClick={() => onSwitch?.(tt)}
                            onMouseEnter={() => setHoveredId(tt.id)}
                            onFocus={() => setHoveredId(tt.id)}
                            onBlur={() => setHoveredId(null)}
                          />
                        ))}
                      </div>

                      {/* السهم الأيسر (RTL = التالى) */}
                      <button
                        type="button"
                        onClick={() => onSwitch?.(nextTeacher)}
                        aria-label={t('teachers.nextTeacher')}
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink-900/10 dark:border-ink-100/15 text-ink-700 dark:text-ink-200 hover:bg-flame-500 hover:text-white hover:border-transparent hover:shadow-flame transition-all"
                      >
                        <ChevronLeft size={20} />
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* CTA */}
              <div className="sticky bottom-0 mt-10 border-t border-ink-900/10 dark:border-ink-100/10 bg-paper/95 dark:bg-[#120A05]/95 backdrop-blur-md px-7 sm:px-10 py-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="text-flame-500" size={18} />
                  <p className="font-bold text-ink-700 dark:text-ink-200">
                    {t('teachers.ctaPrompt')} {namePlain}؟
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onRegister?.(teacher);
                    onClose();
                  }}
                  className="btn-flame"
                >
                  {t('teachers.registerWith')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Lightbox
        open={lbIndex >= 0}
        index={lbIndex < 0 ? 0 : lbIndex}
        close={() => setLbIndex(-1)}
        slides={(teacher?.gallery || []).map((g) => (typeof g === 'string' ? { src: g } : { src: g.src }))}
        plugins={[Zoom, Counter]}
        // زوم عميق عالى الدقة لتفاصيل الحروف والاتصالات فى المخطوطات
        zoom={{
          maxZoomPixelRatio: 8,    // يصل لـ ٨× البكسل الأصلى
          zoomInMultiplier: 1.8,   // ضغطة واحدة تزوّم بسرعة أكبر
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: true,
        }}
        carousel={{ finite: false, preload: 2 }}
        animation={{ zoom: 350 }}
        controller={{ closeOnBackdropClick: true }}
        styles={{ container: { backgroundColor: 'rgba(10,5,2,0.95)' } }}
      />
    </>
  );
}

function InfoRow({ label, value }) {
  return (
    <div>
      <dt className="text-xs font-bold tracking-wider text-ink-500 dark:text-ink-300">{label}</dt>
      <dd className="mt-0.5 text-base font-bold text-ink-900 dark:text-ink-100">{value}</dd>
    </div>
  );
}

/**
 * صفّ بيانات أنيق — أيقونة دائرية + شريط ضوئى برتقالى على جانب البدء (RTL/LTR-safe)
 * + label صغير ذهبى + value بارز.
 */
function InfoStack({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 border-s-2 border-flame-500/30 ps-4 py-1">
      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-flame-500/15 to-flame-500/5 border border-flame-500/30 text-flame-600 dark:text-flame-400">
        <Icon size={16} strokeWidth={2.2} />
      </span>
      <div className="min-w-0 flex-1">
        <dt className="text-[11px] font-extrabold tracking-[0.18em] uppercase text-flame-600/80 dark:text-flame-400/80">
          {label}
        </dt>
        <dd className="mt-0.5 text-base sm:text-[17px] font-extrabold leading-snug text-ink-900 dark:text-ink-100">
          {value}
        </dd>
      </div>
    </div>
  );
}
