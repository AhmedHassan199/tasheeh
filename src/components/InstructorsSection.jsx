import { useState } from 'react';
import { motion } from 'framer-motion';
import { teachers } from '../data/teachers.js';
import { TeacherCard } from './TeacherCard.jsx';
import { TeacherModal } from './TeacherModal.jsx';
import { Ornament } from './Ornament.jsx';

export function InstructorsSection({ onRegisterWithTeacher }) {
  const [active, setActive] = useState(null);

  return (
    <section
      id="instructors"
      className="relative overflow-hidden py-24 sm:py-32 bg-paper-texture"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="grid gap-8 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            <span className="eyebrow">الأساتذة</span>
            <h2 className="section-title mt-6">
              نخبةٌ مختارة <br />
              من <span className="text-flame-gradient">المتقنين</span>.
            </h2>
            <Ornament className="mt-6 h-3 w-56 text-flame-500/70" />
          </div>
          <div className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-ink-700/85 dark:text-ink-200/85">
              لأنّنا نؤمن بأنّ الفنّ الأصيل لا يُتلقّى إلا من مصادره الموثوقة، اقتصر التدريس
              في «تصحيح» على نخبةٍ من الأساتذة المشهود لهم بالكفاءة والحاصلين على جوائز
              عالمية. اضغط على أيّ بطاقة لاكتشاف الأستاذ.
            </p>
          </div>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teachers.map((t, i) => (
            <TeacherCard key={t.id} teacher={t} index={i} onOpen={setActive} />
          ))}
        </div>
      </div>

      <TeacherModal
        teacher={active}
        onClose={() => setActive(null)}
        onRegister={onRegisterWithTeacher}
      />
    </section>
  );
}
