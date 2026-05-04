import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo.jsx';
import { ThemeToggle } from './ThemeToggle.jsx';

const links = [
  { href: '#home', label: 'الرئيسية' },
  { href: '#about', label: 'من نحن' },
  { href: '#instructors', label: 'الأساتذة' },
  { href: '#students', label: 'تطوّر الطلاب' },
  { href: '#register', label: 'التسجيل' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-xl bg-paper/70 dark:bg-ink-900/60 border-b border-ink-900/5 dark:border-ink-100/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#home" className="shrink-0">
          <Logo size={40} />
        </a>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative inline-flex items-center px-4 py-2 text-sm font-semibold text-ink-700 dark:text-ink-200 hover:text-flame-500 transition-colors"
              >
                {link.label}
                <span className="absolute inset-x-3 bottom-1 h-px scale-x-0 bg-flame-500 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <a href="#register" className="btn-flame !py-2.5 !px-5 text-sm">
            انضم الآن
          </a>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="القائمة"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/10 dark:border-ink-100/15 text-ink-800 dark:text-ink-100"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden border-t border-ink-900/5 dark:border-ink-100/10 bg-paper/95 dark:bg-ink-900/90 backdrop-blur-xl"
          >
            <ul className="flex flex-col gap-1 px-5 py-5">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-bold text-ink-700 dark:text-ink-200 hover:bg-flame-500/10 hover:text-flame-500"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href="#register"
                  onClick={() => setOpen(false)}
                  className="btn-flame w-full justify-center"
                >
                  انضم الآن
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
