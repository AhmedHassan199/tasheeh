import { motion } from 'framer-motion';
import { Compass, BookOpenText, Award } from 'lucide-react';
import { Ornament } from './Ornament.jsx';

const pillars = [
  {
    icon: Compass,
    title: 'رؤية تتجاوز الحرف',
    body: 'ننقل للطالب خلاصة سنوات من الخبرة الاحترافية: من الجلسة الصحيحة ومسكة القلم، مرورًا بالتعامل مع الأوراق والأحبار، وصولًا إلى بناء الذاكرة البصرية وإتقان النقد الذاتي.',
  },
  {
    icon: BookOpenText,
    title: 'تعلّمٌ بلا حواجز',
    body: 'سخّرنا التعلم عن بُعد لكسر كافة الحواجز الجغرافية. هدفنا أن نوفّر على الطالب عناء البحث والسفر، وأن نُوجّه كلّ دقيقةٍ من وقته نحو التمرّن الفعلي.',
  },
  {
    icon: Award,
    title: 'الإتقان من أهله',
    body: 'يقتصر التدريس في «تصحيح» على نخبةٍ مختارةٍ من الأساتذة المتقنين، المشهود لهم بالكفاءة والحاصلين على جوائز عالمية، لضمان أعلى معايير الجودة.',
  },
];

const methodology = [
  { num: '٠١', label: 'دراسة الحروف المُفردات' },
  { num: '٠٢', label: 'سلّم الاتصالات' },
  { num: '٠٣', label: 'نظام السطر' },
  { num: '٠٤', label: 'كتابة النصوص الطويلة' },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-24 sm:py-32 bg-paper-texture"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="grid gap-10 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            <span className="eyebrow">من نحن</span>
            <h2 className="section-title mt-6">
              صرحٌ تعليميٌّ <span className="text-flame-gradient">متخصص</span>،
              <br />
              لفنون الخط العربي.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-ink-700/85 dark:text-ink-200/85">
              انطلقت أكاديمية «تصحيح» عام ٢٠٢٢ لتكون صرحًا متخصصًا يهدف إلى إرساء المنهجية
              الصحيحة والأصيلة لفنون الخط العربي. نحن لا نُقدّم مجرّد دورات عابرة، بل نتبنّى
              <span className="underline-ink"> منهجيةً أكاديميةً طويلة الأمد </span>
              غايتها صناعة خطّاطٍ متقنٍ ومؤهَّل.
            </p>
          </div>
        </motion.div>

        {/* Pillars grid */}
        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative rounded-3xl border border-ink-900/10 dark:border-ink-100/10 bg-paper/80 dark:bg-[#150B07]/70 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-flame-500/40 hover:shadow-flame"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-flame-500/10 text-flame-600 dark:text-flame-400 transition-colors group-hover:bg-flame-500 group-hover:text-white">
                    <Icon size={22} />
                  </span>
                  <span className="text-5xl font-black text-ink-900/10 dark:text-ink-100/10 transition-colors group-hover:text-flame-500/30">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-extrabold text-ink-800 dark:text-ink-100">
                  {p.title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-700/80 dark:text-ink-200/80">
                  {p.body}
                </p>
                <Ornament className="mt-6 h-3 w-32 text-flame-500/70" />
              </motion.article>
            );
          })}
        </div>

        {/* Methodology timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mt-24 rounded-[32px] border border-ink-900/10 dark:border-ink-100/10 bg-gradient-to-br from-flame-500/5 to-transparent p-8 sm:p-12"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow">منهجية التعلّم</span>
              <h3 className="section-title mt-4 !text-3xl sm:!text-4xl">
                التعلّم التدريجي بنظام <span className="text-flame-gradient">المَشْق</span>
              </h3>
            </div>
            <p className="max-w-md text-ink-700/80 dark:text-ink-200/80">
              منهجيتنا تعتمد على التكرار والإعادة. الانتقال للدرس التالي مرتبطٌ بمدى استيعاب
              الطالب، لا بعدد محدّد من الإعادات.
            </p>
          </div>

          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {methodology.map((m, i) => (
              <motion.li
                key={m.num}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative rounded-2xl border border-ink-900/10 dark:border-ink-100/10 bg-paper/70 dark:bg-[#150B07]/70 p-5"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-flame-600 dark:text-flame-400">
                    {m.num}
                  </span>
                  {i < methodology.length - 1 && (
                    <span aria-hidden className="hidden lg:block text-flame-500/50">
                      ←
                    </span>
                  )}
                </div>
                <p className="mt-3 text-lg font-bold text-ink-800 dark:text-ink-100">
                  {m.label}
                </p>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
