import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext.jsx';

export function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'الانتقال إلى الوضع الفاتح' : 'الانتقال إلى الوضع الداكن'}
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/10 dark:border-ink-100/15 bg-white/40 dark:bg-ink-900/40 backdrop-blur-md text-ink-800 dark:text-ink-100 transition-colors hover:text-flame-500 hover:border-flame-500/40 ${className}`}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="inline-flex"
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </motion.span>
    </button>
  );
}
