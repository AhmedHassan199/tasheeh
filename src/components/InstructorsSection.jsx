import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { teachers } from '../data/teachers.js';
import { TeacherCard } from './TeacherCard.jsx';
import { TeacherModal } from './TeacherModal.jsx';
import { Ornament } from './Ornament.jsx';
import { RichText } from './RichText.jsx';
import { ClickHint } from './ClickHint.jsx';

export function InstructorsSection({ onRegisterWithTeacher }) {
  const { t } = useTranslation();
  const [active, setActive] = useState(null);

  return (
    <section id="teachers" className="relative overflow-hidden py-24 sm:py-32 bg-paper-texture">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="grid gap-8 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            <span className="eyebrow">{t('teachers.eyebrow')}</span>
            <h2 className="section-title mt-6 text-balance">
              <RichText text={t('teachers.title')} />
            </h2>
            <Ornament className="mt-6 h-3 w-56 text-flame-500/70" />
          </div>
          <div className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-ink-700/85 dark:text-ink-200/85">
              {t('teachers.subtitle')}
            </p>
            <ClickHint className="mt-4" />
          </div>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teachers.map((teacher, i) => (
            <TeacherCard key={teacher.id} teacher={teacher} index={i} onOpen={setActive} />
          ))}
        </div>
      </div>

      <TeacherModal teacher={active} onClose={() => setActive(null)} onRegister={onRegisterWithTeacher} />
    </section>
  );
}
