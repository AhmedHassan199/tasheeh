import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUpLeft } from 'lucide-react';

export function TeacherCard({ teacher, index, onOpen }) {
  const { t } = useTranslation();
  const namePlain = t(`teachers.list.${teacher.id}.namePlain`);
  const prefix = t('teachers.prefix');

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(teacher)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative w-full h-full text-start overflow-hidden rounded-3xl border border-ink-900/10 dark:border-ink-100/10 bg-paper/80 dark:bg-[#150B07]/70 transition-shadow duration-500 hover:shadow-ink"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={teacher.image}
          alt={namePlain}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/30 to-transparent" />

        <div className="absolute inset-x-4 top-4 flex flex-wrap gap-2">
          {teacher.scripts.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/30 bg-ink-900/40 px-3 py-1 text-xs font-bold text-white backdrop-blur-md"
            >
              {t(`scripts.${s}`)}
            </span>
          ))}
        </div>

        <span
          aria-hidden
          className="absolute bottom-4 start-4 grid h-11 w-11 place-items-center rounded-full bg-flame-500 text-white opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 rtl:translate-x-2 rtl:group-hover:translate-x-0"
        >
          <ArrowUpLeft size={18} />
        </span>
      </div>

      <div className="p-5">
        <p className="text-xs font-semibold tracking-wider text-ink-500 dark:text-ink-300">
          {prefix}
        </p>
        <h3 className="mt-1 text-2xl font-extrabold leading-tight text-ink-900 dark:text-ink-100">
          {namePlain}
        </h3>
      </div>

      <span
        aria-hidden
        className="absolute inset-x-5 bottom-0 h-px scale-x-0 origin-end bg-flame-500 transition-transform duration-500 group-hover:scale-x-100"
      />
    </motion.button>
  );
}
