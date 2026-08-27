"use client";

import { translations } from './translations';
import Icon from './Icon';

export default function SiteFooter({ lang }: { lang: 'es' | 'en' }) {
  const t = translations[lang];
  return (
    <footer className="bg-white text-secondary w-full pt-24 pb-12 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-16">
        <div className="md:col-span-5">
          <img
            alt="HB Imports México"
            className="h-24 w-auto object-contain mb-8"
            src="/logo.png"
          />
          <p className="font-body text-on-surface-variant leading-relaxed max-w-sm text-lg italic">
            {t.footer.desc}
          </p>
        </div>
        <div className="md:col-span-4 grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-6">
            <h5 className="text-primary font-bold text-[10px] uppercase tracking-[0.3em]">{t.footer.navTitle}</h5>
            <nav className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest">
              <a className="hover:text-primary transition-colors" href="/#marcas">{t.nav.brands}</a>
              <a className="hover:text-primary transition-colors" href="/#contacto">{t.nav.contact}</a>
              <a className="hover:text-primary transition-colors" href="/#historia">{t.nav.history}</a>
            </nav>
          </div>
          <div className="flex flex-col gap-6">
            <h5 className="text-primary font-bold text-[10px] uppercase tracking-[0.3em]">{t.footer.legalTitle}</h5>
            <nav className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest">
              <a className="hover:text-primary transition-colors" href="/aviso-de-privacidad">{t.footer.l1}</a>
              <a className="hover:text-primary transition-colors" href="/terminos-de-servicio">{t.footer.l2}</a>
              <a className="hover:text-primary transition-colors" href="/consumo-responsable">{t.footer.l3}</a>
            </nav>
          </div>
        </div>
        <div className="md:col-span-3">
          <h5 className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] mb-8">{t.footer.nlTitle}</h5>
          <div className="flex border-b-2 border-black pb-4">
            <input
              className="bg-transparent border-none focus:ring-0 w-full text-secondary placeholder-secondary/30 font-bold text-xs uppercase tracking-widest outline-none"
              placeholder={t.footer.nlPh}
              type="email"
            />
            <button className="text-primary font-bold" aria-label={lang === 'es' ? 'Suscribirse' : 'Subscribe'}><Icon name="east" /></button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 mt-24 pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-[0.2em]">
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {t.footer.copyright}
        </span>
        <div className="flex gap-10">
          <a
            href="https://www.instagram.com/hbimportsmx"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-secondary hover:text-primary transition-colors text-xl"
          >
            <Icon name="instagram" />
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 mt-10 flex justify-center items-center gap-3">
        <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-[0.2em]">{t.footer.createdBy}</span>
        <img
          src="/images/ladob-logo.png"
          alt="Lado B"
          className="h-6 w-auto object-contain"
          onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.removeAttribute('hidden'); }}
        />
        <span hidden className="text-secondary font-black text-[11px] tracking-[0.25em]">LADO B</span>
      </div>
    </footer>
  );
}
