import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Logo } from './Logo.jsx';
import { ThemeToggle } from './ThemeToggle.jsx';
import { LanguageToggle } from './LanguageToggle.jsx';

const linkKeys = [
  { href: '#home', key: 'home' },
  { href: '#teachers', key: 'teachers' },
  { href: '#about', key: 'about' },
  { href: '#mechanism', key: 'mechanism' },
  { href: '#students', key: 'students' },
  { href: '#reviews', key: 'reviews' },
  { href: '#register', key: 'register' },
];

export function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track which section is in view to highlight the right pill
  useEffect(() => {
    const ids = linkKeys.map((l) => l.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return undefined;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-xl bg-paper/75 dark:bg-ink-900/65 border-b border-ink-900/5 dark:border-ink-100/10'
          : 'bg-transparent'
      }`}
    >
      {/* Top row */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-8 sm:py-4">
        <a href="#home" className="shrink-0">
          <Logo size={40} withWordmark={false} className="sm:[&>span]:inline" />
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1">
          {linkKeys.map((link) => {
            const id = link.href.slice(1);
            const active = activeId === id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`group relative inline-flex items-center px-4 py-2 text-sm font-bold transition-colors ${
                    active
                      ? 'text-flame-600 dark:text-flame-400'
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
          <a href="#register" className="btn-flame !py-2.5 !px-4 sm:!px-5 text-sm whitespace-nowrap">
            {t('nav.joinNow')}
          </a>
        </div>
      </nav>

      {/* Mobile pill rail — always visible, no hamburger */}
      <div className="lg:hidden border-t border-ink-900/5 dark:border-ink-100/10">
        <div className="mx-auto max-w-7xl">
          <div className="flex gap-2 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {linkKeys.map((link) => {
              const id = link.href.slice(1);
              const active = activeId === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all ${
                    active
                      ? 'border-flame-500 bg-flame-500 text-white shadow-flame'
                      : 'border-ink-900/10 dark:border-ink-100/15 text-ink-700 dark:text-ink-200 hover:border-flame-500/40'
                  }`}
                >
                  {t(`nav.${link.key}`)}
                </a>
              );
            })}
            <LanguageToggle className="shrink-0 sm:hidden !h-7 !px-2.5 !text-[11px]" />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
