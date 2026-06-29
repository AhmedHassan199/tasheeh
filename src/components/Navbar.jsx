import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo.jsx';
import { ThemeToggle } from './ThemeToggle.jsx';
import { LanguageToggle } from './LanguageToggle.jsx';

const linkKeys = [
  { href: '#home',      key: 'home' },
  { href: '#teachers',  key: 'teachers' },
  { href: '#about',     key: 'about' },
  { href: '#features',  key: 'features' },
  { href: '#students',  key: 'students' },
  { href: '#reviews',   key: 'reviews' },
  { href: '#mechanism', key: 'mechanism' },
  { href: '#register',  key: 'register' },
];

export function Navbar() {
  const { t, i18n } = useTranslation();
  const isRtl = (i18n.language || 'ar').startsWith('ar');
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = linkKeys.map((l) => l.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return undefined;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); }),
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // اقفل التمرير الرأسى للصفحة لمّا الـ drawer مفتوح
  useEffect(() => {
    if (!drawerOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [drawerOpen]);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-xl bg-paper/85 dark:bg-ink-900/75 border-b border-ink-900/5 dark:border-ink-100/10 shadow-soft'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-8 sm:py-4">
          {/* زرّ الـ Hamburger — يظهر على الموبايل/التابلت فقط */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label={t('nav.menu')}
            aria-expanded={drawerOpen}
            className="lg:hidden grid h-11 w-11 place-items-center rounded-full border border-ink-900/10 dark:border-ink-100/15 bg-paper/80 dark:bg-ink-900/60 text-ink-700 dark:text-ink-200 hover:border-flame-500 hover:text-flame-500 active:scale-tap transition-all"
          >
            <Menu size={20} />
          </button>

          <a href="#home" className="flex items-center gap-2 shrink-0">
            <Logo size={36} withWordmark={false} />
          </a>

          {/* روابط الديسكتوب — مخفية تحت lg */}
          <ul className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {linkKeys.map((link) => {
              const id = link.href.slice(1);
              const active = activeId === id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`group relative inline-flex items-center px-4 py-2 text-sm font-bold transition-colors ${
                      active ? 'text-flame-600 dark:text-flame-400'
                             : 'text-ink-700 dark:text-ink-200 hover:text-flame-500'
                    }`}
                  >
                    {t(`nav.${link.key}`)}
                    <span
                      className={`absolute inset-x-3 bottom-1 h-px bg-flame-500 transition-transform duration-300 ${
                        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <LanguageToggle className="hidden sm:inline-flex" />
            <ThemeToggle />
            <a
              href="#register"
              className="btn-flame !min-h-[2.5rem] !py-2 !px-4 sm:!px-5 !text-sm whitespace-nowrap"
            >
              {t('nav.joinNow')}
            </a>
          </div>
        </nav>
      </motion.header>

      {/* ═══════ Mobile Drawer ═══════ */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* خلفية شفّافة — اضغطها لقفل الـ drawer */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeDrawer}
              className="lg:hidden fixed inset-0 z-[55] bg-ink-900/70 backdrop-blur-sm"
            />

            {/* اللوحة الجانبية — تنزلق من جانب البدء (يمين فى RTL، يسار فى LTR) */}
            <motion.aside
              key="drawer"
              initial={{ x: isRtl ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '100%' : '-100%' }}
              transition={{ type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
              className={`lg:hidden fixed top-0 bottom-0 z-[56] w-[82%] max-w-sm bg-paper dark:bg-[#120A05] shadow-ink overflow-y-auto
                ${isRtl ? 'right-0 rounded-l-3xl' : 'left-0 rounded-r-3xl'}
                border-ink-900/10 dark:border-ink-100/10`}
              role="dialog"
              aria-modal="true"
              aria-label={t('nav.menu')}
            >
              {/* رأس الـ drawer */}
              <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-5 py-4 bg-paper/95 dark:bg-[#120A05]/95 backdrop-blur-md border-b border-ink-900/10 dark:border-ink-100/10">
                <Logo size={32} withWordmark={false} />
                <button
                  type="button"
                  onClick={closeDrawer}
                  aria-label={t('common.close')}
                  className="grid h-10 w-10 place-items-center rounded-full border border-ink-900/10 dark:border-ink-100/15 text-ink-700 dark:text-ink-200 hover:bg-flame-500 hover:text-white hover:border-transparent active:scale-tap transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* روابط رأسية كبيرة وسهلة اللمس */}
              <nav className="px-3 py-4">
                <ul className="space-y-1">
                  {linkKeys.map((link) => {
                    const id = link.href.slice(1);
                    const active = activeId === id;
                    return (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          onClick={closeDrawer}
                          className={`flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-base font-extrabold transition-all active:scale-tap ${
                            active
                              ? 'bg-flame-500 text-white shadow-flame'
                              : 'text-ink-800 dark:text-ink-100 hover:bg-flame-500/10'
                          }`}
                        >
                          {t(`nav.${link.key}`)}
                          {active && <span aria-hidden className="text-xs">●</span>}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* أدوات سفلية */}
              <div className="mt-2 px-5 pb-6 pt-3 border-t border-ink-900/10 dark:border-ink-100/10 flex items-center justify-between gap-3">
                <LanguageToggle />
                <a
                  href="#register"
                  onClick={closeDrawer}
                  className="btn-flame !py-2.5 !px-5 !text-sm"
                >
                  {t('nav.joinNow')}
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
