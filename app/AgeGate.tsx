"use client";

import { useEffect, useRef, useState } from 'react';
import { translations } from './translations';

const STORAGE_KEY = 'hb_age_verified_at';
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 días

export default function AgeGate({ lang }: { lang: 'es' | 'en' }) {
  const t = translations[lang].ageGate;
  const [status, setStatus] = useState<'checking' | 'ask' | 'denied' | 'granted'>('checking');
  const dialogRef = useRef<HTMLDivElement>(null);
  const yesRef = useRef<HTMLButtonElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let verified = false;
    try {
      const ts = Number(window.localStorage.getItem(STORAGE_KEY));
      verified = !!ts && Date.now() - ts < MAX_AGE_MS;
    } catch {}
    setStatus(verified ? 'granted' : 'ask');
  }, []);

  // Bloquear el scroll del sitio y atrapar el foco mientras el gate está activo
  useEffect(() => {
    if (status === 'granted' || status === 'checking') return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    (status === 'ask' ? yesRef : backRef).current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        return;
      }
      if (e.key !== 'Tab') return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusables = Array.from(
        dialog.querySelectorAll<HTMLElement>('button, a[href]')
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (!active || !dialog.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown, true);
    };
  }, [status]);

  if (status === 'granted') return null;

  const accept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {}
    setStatus('granted');
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-[999] bg-surface flex flex-col items-center justify-center px-6 text-center"
    >
      {status !== 'checking' && (
        <div className="w-full max-w-md flex flex-col items-center">
          <img alt="HB Imports México" className="h-20 w-auto object-contain mb-6" src="/logo.png" />
          <span className="font-label text-[10px] text-primary font-bold tracking-[0.3em] uppercase mb-10">
            {t.brand}
          </span>

          {status === 'ask' ? (
            <>
              <h2 id="age-gate-title" className="font-headline font-bold text-4xl md:text-5xl italic mb-6 text-secondary">
                {t.title}
              </h2>
              <p className="font-body text-on-surface-variant leading-relaxed mb-10">{t.desc}</p>
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <button
                  ref={yesRef}
                  onClick={accept}
                  className="bg-[#B21F24] text-white font-bold tracking-widest uppercase text-xs px-8 py-4 rounded-full hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B21F24] cursor-pointer"
                >
                  {t.yes}
                </button>
                <button
                  onClick={() => setStatus('denied')}
                  className="border-2 border-black/10 text-secondary font-bold tracking-widest uppercase text-xs px-10 py-4 rounded-full hover:border-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary cursor-pointer"
                >
                  {t.no}
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 id="age-gate-title" className="font-headline font-bold text-4xl md:text-5xl italic mb-6 text-secondary">
                {t.deniedTitle}
              </h2>
              <p className="font-body text-on-surface-variant leading-relaxed mb-10">{t.deniedDesc}</p>
              <button
                ref={backRef}
                onClick={() => setStatus('ask')}
                className="text-secondary font-bold tracking-widest uppercase text-[10px] border-b-2 border-primary pb-1 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary cursor-pointer"
              >
                {t.back}
              </button>
            </>
          )}

          <p className="font-label text-[9px] text-on-surface-variant/60 font-bold tracking-[0.2em] uppercase mt-14">
            {t.legal}
          </p>
        </div>
      )}
    </div>
  );
}
