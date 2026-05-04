import { Instagram, Mail, Link2, ExternalLink } from 'lucide-react';
import { Logo } from './Logo.jsx';
import { OrnamentBoth } from './Ornament.jsx';

const socials = [
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/tasheeh_academy/' },
  { icon: Mail, label: 'البريد', href: 'mailto:tasheeh.online@gmail.com' },
  { icon: Link2, label: 'Linktree', href: 'https://linktr.ee/tasheeh' },
];

const cols = [
  {
    title: 'الأكاديمية',
    items: [
      { label: 'من نحن', href: '#about' },
      { label: 'منهجية التعلّم', href: '#about' },
      { label: 'الأساتذة', href: '#instructors' },
      { label: 'تطوّر الطلاب', href: '#students' },
    ],
  },
  {
    title: 'الطالب',
    items: [
      { label: 'دليل الطالب', href: '#about' },
      { label: 'باقات الاشتراك', href: '#register' },
      { label: 'سياسة التسجيل', href: '#register' },
    ],
  },
  {
    title: 'التواصل',
    items: [
      { label: 'tasheeh.online@gmail.com', href: 'mailto:tasheeh.online@gmail.com' },
      { label: 'instagram.com/tasheeh_academy', href: 'https://www.instagram.com/tasheeh_academy/' },
      { label: 'linktr.ee/tasheeh', href: 'https://linktr.ee/tasheeh' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-ink-900 text-ink-100">
      {/* Brand watermark */}
      <img
        src="/logo.jpg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-20 w-[80vw] max-w-[900px] opacity-[0.08] mix-blend-screen rotate-[-8deg] select-none"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Logo size={48} />
            <p className="mt-6 max-w-md leading-relaxed text-ink-200/85">
              صرحٌ تعليميٌّ متخصّص لفنون الخط العربي. منذ ٢٠٢٢، نُرسي المنهجية الأصيلة وننقل
              أسرار الحرف إلى عُشّاقه أينما كانوا.
            </p>

            <OrnamentBoth className="mt-8 h-3 w-72 text-flame-500" />

            <div className="mt-8 flex items-center gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-ink-100/15 text-ink-100 transition-all hover:bg-flame-500 hover:text-white hover:border-transparent"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-10">
            {cols.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-extrabold tracking-[0.25em] uppercase text-flame-300">
                  {col.title}
                </h4>
                <ul className="mt-5 space-y-3">
                  {col.items.map((it) => (
                    <li key={it.label}>
                      <a
                        href={it.href}
                        target={it.href.startsWith('#') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-ink-200/90 hover:text-flame-300 transition-colors"
                      >
                        <span>{it.label}</span>
                        {!it.href.startsWith('#') && (
                          <ExternalLink size={12} className="opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ink-100/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-300/70">
            © {new Date().getFullYear()} أكاديمية تصحيح. جميع الحقوق محفوظة.
          </p>
          <p className="text-sm text-ink-300/60">
            Tasheeh — Where letters become art.
          </p>
        </div>
      </div>
    </footer>
  );
}
