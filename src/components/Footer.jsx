import { useTranslation } from 'react-i18next';
import { Instagram, Mail, Facebook, Youtube } from 'lucide-react';
import { Logo } from './Logo.jsx';
import { OrnamentBoth } from './Ornament.jsx';

const socials = [
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/tasheeh_academy/' },
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/tasheeh' },
  { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/@tasheeh' },
];

const EMAIL = 'tasheeh.online@gmail.com';

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="relative isolate overflow-hidden bg-ink-900 text-ink-100">
      {/* Logo as low-opacity watermark — no text watermark at all */}
      <img
        src="/logo.jpg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-20 w-[80vw] max-w-[900px] opacity-[0.06] mix-blend-screen rotate-[-8deg] select-none"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-12 md:items-start">
          {/* Brand */}
          <div className="md:col-span-7">
            <Logo size={56} />
            <p className="mt-6 max-w-md leading-relaxed text-ink-200/85">
              {t('footer.tagline')}
            </p>
            <OrnamentBoth className="mt-8 h-3 w-72 text-flame-500" />
          </div>

          {/* Contact + socials */}
          <div className="md:col-span-5 md:text-end">
            <h4 className="text-sm font-extrabold tracking-[0.25em] uppercase text-flame-300">
              {t('footer.contact')}
            </h4>

            <a
              href={`mailto:${EMAIL}`}
              className="group mt-4 inline-flex items-center gap-3 text-lg font-bold text-ink-100 hover:text-flame-300 transition-colors"
            >
              <Mail size={20} className="text-flame-500 transition-transform group-hover:-rotate-6" />
              <span dir="ltr" className="underline-offset-4 group-hover:underline">{EMAIL}</span>
            </a>

            <div className="mt-8 flex items-center gap-3 md:justify-end">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group relative grid h-12 w-12 place-items-center rounded-full border border-ink-100/15 text-ink-100 transition-all hover:bg-flame-500 hover:text-white hover:border-transparent hover:scale-110"
                  >
                    <Icon size={20} />
                    <span className="absolute inset-0 rounded-full bg-flame-500/0 transition-all group-hover:bg-flame-500/25 group-hover:scale-150 opacity-0 group-hover:opacity-0 -z-10" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ink-100/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-300/70">
            {t('footer.rights', { year: new Date().getFullYear() })}
          </p>
          <p className="text-sm text-ink-300/60">Tasheeh — Where letters become art.</p>
        </div>
      </div>
    </footer>
  );
}
