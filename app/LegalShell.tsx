"use client";

import { useEffect, useState } from 'react';
import SiteFooter from './SiteFooter';

export type LegalSection = {
  h: string;
  body: (string | { list: string[] })[];
};

export type LegalContent = {
  label: string;
  title: string;
  updated: string;
  intro?: string;
  sections: LegalSection[];
};

export default function LegalShell({ content }: { content: { es: LegalContent; en: LegalContent } }) {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const t = content[lang];

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('hb_lang');
      if (saved === 'es' || saved === 'en') setLang(saved);
    } catch {}
  }, []);

  const switchLang = (l: 'es' | 'en') => {
    setLang(l);
    try { window.localStorage.setItem('hb_lang', l); } catch {}
  };

  return (
    <>
      {/* Barra superior compacta, mismo estilo pill del sitio */}
      <nav className="fixed top-2 left-2 right-2 md:top-4 md:left-4 md:right-4 z-50 bg-white/95 backdrop-blur-xl border border-gray-100/50 shadow-lg rounded-3xl max-w-7xl md:mx-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 h-20">
          <a href="/" className="flex items-center relative h-full w-[140px] lg:w-[160px] group outline-none">
            <img
              alt="HB Imports México"
              className="absolute left-0 top-1/2 -translate-y-1/2 w-full scale-[1.3] origin-left object-contain"
              src="/logo.png"
            />
          </a>
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="text-secondary hover:text-primary transition-colors font-bold text-[10px] uppercase tracking-[0.2em] hidden sm:block"
            >
              {lang === 'es' ? '← Volver al sitio' : '← Back to site'}
            </a>
            <div className="flex items-center bg-gray-100 rounded-full p-1">
              <button onClick={() => switchLang('es')} className={`text-[10px] font-bold font-label tracking-[0.2em] transition-colors duration-300 px-2 py-1 rounded-full cursor-pointer ${lang === 'es' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}>ES</button>
              <button onClick={() => switchLang('en')} className={`text-[10px] font-bold font-label tracking-[0.2em] transition-colors duration-300 px-2 py-1 rounded-full cursor-pointer ${lang === 'en' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}>EN</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="bg-surface min-h-screen pt-40 pb-24">
        <article className="max-w-3xl mx-auto px-8">
          <span className="font-label text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">{t.label}</span>
          <h1 className="font-headline font-bold text-4xl md:text-5xl italic text-secondary mb-4">{t.title}</h1>
          <p className="text-on-surface-variant/70 text-xs font-bold uppercase tracking-[0.2em] mb-12">{t.updated}</p>
          {t.intro && (
            <p className="font-body text-on-surface-variant leading-relaxed text-lg mb-12">{t.intro}</p>
          )}
          {t.sections.map((s, i) => (
            <section key={i} className="mb-10">
              <h2 className="font-headline font-bold text-2xl text-secondary mb-4">{s.h}</h2>
              {s.body.map((b, j) =>
                typeof b === 'string' ? (
                  <p key={j} className="font-body text-on-surface-variant leading-relaxed mb-4">{b}</p>
                ) : (
                  <ul key={j} className="list-disc pl-6 mb-4 flex flex-col gap-2">
                    {b.list.map((item, k) => (
                      <li key={k} className="font-body text-on-surface-variant leading-relaxed">{item}</li>
                    ))}
                  </ul>
                )
              )}
            </section>
          ))}
        </article>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
