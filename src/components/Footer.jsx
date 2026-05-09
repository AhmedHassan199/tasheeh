import { useTranslation } from 'react-i18next';
import { Mail, Facebook, Youtube, MessageCircle } from 'lucide-react';
import { Logo } from './Logo.jsx';
import { OrnamentBoth } from './Ornament.jsx';

const socials = [
  {
    icon: Facebook,
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1CTUb6rj5N/',
  },
  {
    icon: Youtube,
    label: 'YouTube',
    href: 'https://youtube.com/@tasheeh_academy?si=PaUAxKQZi8qlpZcP',
  },
  {
    // TikTok glyph (Lucide doesn't ship one, so we render a small SVG inline)
    icon: TikTokIcon,
    label: 'TikTok',
    href: 'https://www.tiktok.com/@tasheeh1?_r=1&_t=ZS-96CWgbfykBM',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    href: 'https://api.whatsapp.com/send?phone=201013727568',
  },
];

const EMAIL = 'tasheeh.online@gmail.com';

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="relative isolate overflow-hidden bg-ink-900 text-ink-100">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-12 md:items-start">
          {/* Brand — wordmark fully opaque per brief */}
          <div className="md:col-span-7">
            <Logo size={56} />
            <p className="mt-6 max-w-md leading-relaxed text-ink-100">{t('footer.tagline')}</p>
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
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ink-100/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-100">{t('footer.rights', { year: new Date().getFullYear() })}</p>
          <p className="text-sm text-ink-100/80">Tasheeh — Where letters become art.</p>
        </div>
      </div>
    </footer>
  );
}

function TikTokIcon({ size = 20 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.91a8.16 8.16 0 0 0 4.77 1.52V7a4.85 4.85 0 0 1-1.84-.31z" />
    </svg>
  );
}
