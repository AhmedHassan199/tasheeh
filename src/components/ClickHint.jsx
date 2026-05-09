import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Hand } from 'lucide-react';

// Subtle attention-grabbing pill that reminds the user the cards below are
// interactive. Used once per interactive grid (Teachers, Mechanism, Reviews).
// Pulses gently and scales on entry — non-blocking, no dismissal logic.
export function ClickHint({ className = '' }) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: 0.2 }}
      className={`inline-flex items-center gap-2 rounded-full border border-flame-500/40 bg-flame-500/10 px-3 py-1.5 text-xs font-bold text-flame-700 dark:text-flame-300 ${className}`}
    >
      <motion.span
        animate={{ rotate: [-8, 8, -8] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className="inline-flex"
      >
        <Hand size={13} />
      </motion.span>
      <span>{t('common.clickHint')}</span>
      <motion.span
        aria-hidden
        animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        className="inline-block h-1.5 w-1.5 rounded-full bg-flame-500"
      />
    </motion.div>
  );
}
