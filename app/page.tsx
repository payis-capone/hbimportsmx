"use client";

import { useState, useRef, useEffect } from 'react';
import { translations } from './translations';
import winesData from './wines.json';
import GlobeMap from './GlobeMap';

const argWines = winesData.filter(w => w.badge === 'ARG');
const usaWines = winesData.filter(w => w.badge === 'USA');
const espWines = winesData.filter(w => w.badge === 'ESP');
const mexWines = winesData.filter(w => w.badge === 'MEX');

const argGroups = [
  { group: "Pascual Toso Estate", wines: argWines.filter(w => {
      const n = w.name.toUpperCase();
      return n.includes('PASCUAL TOSO') && !n.includes('RESERVE') && !n.includes('RESERVA') && !n.includes('ALTA') && !n.includes('PEDREGAL') && !n.includes('MAGDALENA');
  }) },
  { group: "Pascual Toso Reserva", wines: argWines.filter(w => {
      const n = w.name.toUpperCase();
      return n.includes('PASCUAL TOSO') && (n.includes('RESERVE') || n.includes('RESERVA')) && !n.includes('ALTA') && !n.includes('PEDREGAL') && !n.includes('MAGDALENA');
  }) },
  { group: "Pascual Toso Alta", wines: argWines.filter(w => {
      const n = w.name.toUpperCase();
      return n.includes('PASCUAL TOSO') && n.includes('ALTA') && !n.includes('PEDREGAL') && !n.includes('MAGDALENA');
  }) },
  { group: "Pascual Toso PREMIUM (Finca Pedregal y Magdalena Toso)", wines: argWines.filter(w => {
      const n = w.name.toUpperCase();
      return n.includes('PEDREGAL') || n.includes('MAGDALENA');
  }) },
  { group: "Don Aparo (Mendoza)", wines: argWines.filter(w => w.name.toUpperCase().includes('DON APARO')) },
  { group: "El Secreto (Kosher)", wines: argWines.filter(w => w.name.toUpperCase().includes('EL SECRETO')) },
].filter(g => g.wines.length > 0);

const espGroups = [
  { 
    group: "Rioja", 
    wines: espWines.filter(w => {
      const n = w.name.toUpperCase();
      return n.includes('CAMPO ALTO') || n.includes('VALDELAMILLO') || n.includes('VALDELACIERVA') || n.includes('CHALLAO') || n.includes('VIRNA') || n.includes('ANGELITA');
    }).sort((a, b) => {
      const nA = a.name.toUpperCase();
      const nB = b.name.toUpperCase();
      const getOrder = (n: string) => {
        let score = 0;
        if (n.includes('VALDELACIERVA')) score = 10;
        else if (n.includes('CAMPO ALTO')) score = 20;
        else if (n.includes('VALDELAMILLO')) score = 30;
        else if (n.includes('CHALLAO') || n.includes('VIRNA') || n.includes('ANGELITA')) score = 40;
        else score = 50;
        
        if (n.includes('CRIANZA')) score += 1;
        else if (n.includes('RESERVA') || n.includes('RESERVE')) score += 2;
        else score += 3;

        return score;
      };
      return getOrder(nA) - getOrder(nB);
    })
  },
  { 
    group: "Ribera del Duero", 
    wines: espWines.filter(w => {
      const n = w.name.toUpperCase();
      return n.includes('CATANIA') || n.includes('GORMAZ') || n.includes('LINAJES') || n.includes('LINAGES') || n.includes('ANIER');
    }).sort((a, b) => {
      const nA = a.name.toUpperCase();
      const nB = b.name.toUpperCase();
      const getOrder = (n: string) => {
        let score = 0;
        if (n.includes('CATANIA')) score = 10;
        else if (n.includes('GORMAZ')) score = 20;
        else if (n.includes('LINAJES') || n.includes('LINAGES')) score = 30;
        else if (n.includes('ANIER')) score = 40;
        else score = 50;

        if (n.includes('CRIANZA')) score += 1;
        else if (n.includes('RESERVA') || n.includes('RESERVE')) score += 2;
        else score += 3;

        return score;
      };
      return getOrder(nA) - getOrder(nB);
    })
  },
  { 
    group: "Rueda", 
    wines: espWines.filter(w => {
      const n = w.name.toUpperCase();
      return n.includes('GARCIGRANDE') || n.includes('RUEDA');
    }) 
  }
].filter(g => g.wines.length > 0);

const usaGroups = [
  { group: "Lapis Luna (Lodi, California)", wines: usaWines.filter(w => w.name.toUpperCase().includes('LAPIS LUNA')) },
  { group: "DNA VINEYARDS (Mendocino, California)", wines: usaWines.filter(w => w.name.toUpperCase().includes('DNA')) }
].filter(g => g.wines.length > 0);

const mexGroups = [
  { group: "Bacanora (Sonora)", wines: mexWines.filter(w => w.name.toUpperCase().includes('BACANORA')) },
  { group: "Décima", wines: mexWines.filter(w => !w.name.toUpperCase().includes('BACANORA')) }
].filter(g => g.wines.length > 0);

const WineCarousel = ({ wines, tBuyBtn }: { wines: any[], tBuyBtn: string }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group/carousel">
      {/* Scrollable Container */}
      <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 custom-scrollbar scroll-smooth">
        {wines.map((wine: any, index: number) => (
          <div key={index} className="group flex flex-col h-full w-[180px] md:w-[220px] snap-start shrink-0">
            <a href={wine.techsheet || undefined} target={wine.techsheet ? "_blank" : undefined} rel="noopener noreferrer" className={`block aspect-[3/4] bg-white mb-4 flex items-center justify-center p-4 transition-all duration-500 relative border border-black/5 rounded-3xl group-hover:-translate-y-2 group-hover:shadow-xl ${wine.techsheet ? 'cursor-pointer' : 'cursor-default'}`}>
              <div className="absolute top-4 left-4 flex w-6 h-4 shadow-md border border-black/10 rounded-[1px] overflow-hidden bg-gray-100 z-10">
                <img src={getFlagUrl(wine.badge)} title={wine.badge} alt={wine.badge} className="w-full h-full object-cover" />
              </div>
              {wine.img ? <img className="max-h-full object-contain transition-transform duration-700 group-hover:scale-110" src={wine.img} alt={wine.name} /> : <div className="text-secondary/20 font-bold uppercase tracking-widest text-[10px] text-center">Ficha / Foto <br/>en Camino</div>}
            </a>
            <div className="flex items-center justify-between w-full gap-2 mb-2">
              <span className="font-label text-[9px] text-primary font-bold tracking-[0.3em] uppercase">{wine.country}</span>
              {wine.type && (
                <span className="bg-[#B21F24] text-white text-[8px] font-bold tracking-widest uppercase px-2 py-1 rounded-full whitespace-nowrap">
                  {wine.type}
                </span>
              )}
            </div>
            <a href={wine.techsheet || undefined} target={wine.techsheet ? "_blank" : undefined} rel="noopener noreferrer" className={wine.techsheet ? "cursor-pointer" : "cursor-default pointer-events-none"}>
              <h3 className={`font-headline font-bold text-lg mb-1 pr-2 leading-tight ${wine.techsheet ? 'group-hover:text-primary transition-colors' : 'text-secondary'}`}>{wine.name}</h3>
            </a>
            <p className="text-on-surface-variant font-light mb-3 leading-relaxed text-[11px] flex-1 line-clamp-2">{wine.desc}</p>
            <div className="flex items-center justify-between mt-auto relative">
              <a href={wine.techsheet || '#'} target="_blank" rel="noopener noreferrer" className={`text-secondary font-bold tracking-widest uppercase text-[10px] border-b-2 border-primary pb-1 transition-colors inline-flex items-center gap-2 ${wine.techsheet ? 'group-hover:text-primary' : 'opacity-30 cursor-not-allowed pointer-events-none'}`}>
                {tBuyBtn} <span className="material-symbols-outlined text-[12px]">download</span>
              </a>

              {wine.techsheets && wine.techsheets.length > 0 && (
                <div className="relative" onClick={(e) => { e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); }}>
                  <button 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      e.stopPropagation(); 
                      e.nativeEvent.stopImmediatePropagation(); 
                      setOpenDropdown(openDropdown === index ? null : index); 
                    }}
                    className="text-secondary hover:text-primary transition-colors flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100"
                    title="Ver más añadas y fichas técnicas"
                  >
                    <span className="material-symbols-outlined text-[18px]">more_horiz</span>
                  </button>
                  
                  {openDropdown === index && (
                    <div className="absolute bottom-full right-0 mb-2 w-56 bg-white border border-gray-100 shadow-2xl rounded-xl py-2 z-50 overflow-hidden flex flex-col transform origin-bottom-right transition-all">
                      <div className="px-4 py-3 border-b border-gray-50 text-[9px] font-bold tracking-[0.2em] text-gray-400 uppercase bg-gray-50/50">
                        Añadas Disponibles
                      </div>
                      <div className="max-h-48 overflow-y-auto custom-scrollbar">
                        {wine.techsheets.map((ts: string, i: number) => {
                          const filename = decodeURIComponent(ts.split('/').pop() || 'Ficha ' + (i+1)).replace('.pdf', '');
                          return (
                            <a 
                              key={i} 
                              href={ts} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="px-4 py-3 text-xs text-secondary hover:bg-primary/5 hover:text-primary transition-colors block border-b border-gray-50 last:border-0 leading-relaxed"
                            >
                              {filename}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={scrollLeft}
        aria-label="Scroll Left"
        className="absolute left-2 md:left-4 top-[35%] -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-black/5 flex items-center justify-center text-secondary hover:bg-primary hover:text-white hover:scale-110 transition-all opacity-0 group-hover/carousel:opacity-100 pointer-events-none group-hover/carousel:pointer-events-auto cursor-pointer"
      >
        <span className="material-symbols-outlined font-bold">chevron_left</span>
      </button>

      {wines.length > 2 && (
        <button 
          onClick={scrollRight}
          aria-label="Scroll Right"
          className="absolute right-2 md:right-4 top-[35%] -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-black/5 flex items-center justify-center text-primary bg-primary/5 hover:bg-primary hover:text-white hover:scale-110 transition-all opacity-70 group-hover/carousel:opacity-100 cursor-pointer animate-pulse-slow"
        >
          <span className="material-symbols-outlined font-bold">chevron_right</span>
        </button>
      )}
    </div>
  );
};


const getFlagUrl = (badge: string) => {
  switch (badge) {
    case 'ARG': return 'https://flagcdn.com/ar.svg';
    case 'USA': return 'https://flagcdn.com/us.svg';
    case 'ESP': return 'https://flagcdn.com/es.svg';
    case 'MEX': return 'https://flagcdn.com/mx.svg';
    default: return '';
  }
};
export default function Home() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [expandedCountries, setExpandedCountries] = useState<Record<string, boolean>>({});
  const t = translations[lang];

  const toggleCountry = (country: string) => {
    setExpandedCountries(prev => ({ ...prev, [country]: !prev[country] }));
  };

  const filterGroups = (groups: any[]) => {
    if (!searchQuery) return groups;
    const sq = searchQuery.toLowerCase();
    return groups.map(g => ({
      ...g,
      wines: g.wines.filter((w: any) => 
        w.name.toLowerCase().includes(sq) || 
        w.country.toLowerCase().includes(sq) || 
        (w.desc && w.desc.toLowerCase().includes(sq)) ||
        g.group.toLowerCase().includes(sq)
      )
    })).filter(g => g.wines.length > 0);
  };

  const currentArgGroups = filterGroups(argGroups);
  const currentEspGroups = filterGroups(espGroups);
  const currentUsaGroups = filterGroups(usaGroups);
  const currentMexGroups = filterGroups(mexGroups);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const subject = encodeURIComponent("NUEVA SOLICITUD DE DISTRIBUIDOR - HB WEB");
    const bodyText = `Nombre: ${data['Nombre'] || 'N/A'}
Empresa: ${data['Empresa'] || 'N/A'}
Ubicación: ${data['Ubicacion'] || 'N/A'}
Teléfono: ${data['Teléfono'] || 'N/A'}
Correo: ${data['Correo'] || 'N/A'}
Mensaje: ${data['Mensaje'] || 'N/A'}`;
    
    const body = encodeURIComponent(bodyText);
    
    // Fallback nativo ante la caída global de formsubmit.co
    window.location.href = `mailto:raulrivas@hbimports.mx?subject=${subject}&body=${body}`;
    
    setFormState('success');
    e.currentTarget.reset();
    setTimeout(() => setFormState('idle'), 5000);
  };

  return (
    <>
      {/* TopNavBar - Modern Floating Pill Style */}
      <nav className="fixed top-2 left-2 right-2 md:top-4 md:left-4 md:right-4 z-50 bg-white/95 backdrop-blur-xl border border-gray-100/50 shadow-lg rounded-3xl transition-all duration-500 max-w-7xl md:mx-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 h-20">
          
          {/* Logo Section */}
          <a href="#" className="flex items-center relative h-full w-[140px] lg:w-[160px] group outline-none">
            <img
              alt="HB Imports México"
              className="absolute left-0 top-1/2 -translate-y-1/2 w-full scale-[1.3] origin-left object-contain"
              src="/logo.png"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-10">
            {[
              { href: "#marcas", label: t.nav.brands },
              { href: "#catalogo", label: t.nav.catalog },
              { href: "#distribuidores", label: t.nav.distribution },
              { href: "#contacto", label: t.nav.contact },
              { href: "#historia", label: t.nav.history }
            ].map((link, i) => (
              <a key={i} className="relative text-[11px] font-bold font-nav tracking-[0.2em] text-secondary/60 hover:text-primary uppercase transition-colors duration-300 group py-1" href={link.href}>
                {link.label}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 lg:gap-5">
            <div className="hidden sm:flex items-center gap-[6px] bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
              <button onClick={() => setLang('es')} className={`text-[10px] font-bold font-label tracking-[0.2em] transition-colors duration-300 px-2 py-1 rounded-full ${lang === 'es' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}>ES</button>
              <button onClick={() => setLang('en')} className={`text-[10px] font-bold font-label tracking-[0.2em] transition-colors duration-300 px-2 py-1 rounded-full ${lang === 'en' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}>EN</button>
            </div>
            <div className="relative flex items-center">
              {isSearchOpen && (
                <input 
                  type="text" 
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery) {
                      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  placeholder="BUSCAR..." 
                  className="absolute right-12 w-48 md:w-64 bg-white border border-gray-200 rounded-full px-4 py-2 text-[16px] md:text-[10px] font-bold font-label tracking-[0.2em] uppercase text-secondary focus:outline-none focus:border-primary shadow-lg"
                />
              )}
              <button 
                onClick={() => {
                  if (isSearchOpen && !searchQuery) setIsSearchOpen(false);
                  else if (!isSearchOpen) setIsSearchOpen(true);
                  if (isSearchOpen && searchQuery) {
                    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }} 
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${isSearchOpen ? 'text-primary bg-primary/10' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <span className="material-symbols-outlined text-[20px]">{isSearchOpen && searchQuery ? 'arrow_forward' : 'search'}</span>
              </button>
              {isSearchOpen && (
                <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} className="absolute -bottom-8 right-2 text-[9px] text-gray-400 font-bold uppercase tracking-widest hover:text-primary">
                  Cerrar
                </button>
              )}
            </div>
            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-full transition-colors lg:hidden">
              <span className="material-symbols-outlined text-[24px]">{isMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </nav>

        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden fixed top-24 right-2 sm:right-4 w-[280px] bg-white/95 backdrop-blur-xl border border-black/5 shadow-2xl rounded-3xl flex flex-col items-start p-8 gap-6 z-40 animate-in fade-in zoom-in-95 duration-200">
            {[
              { href: "#marcas", label: t.nav.brands },
              { href: "#catalogo", label: t.nav.catalog },
              { href: "#distribuidores", label: t.nav.distribution },
              { href: "#contacto", label: t.nav.contact },
              { href: "#historia", label: t.nav.history }
            ].map((link, i) => (
              <a key={i} onClick={() => setIsMenuOpen(false)} className="font-nav font-bold text-sm text-secondary uppercase tracking-[0.15em] hover:text-primary transition-colors hover:translate-x-1 transform duration-300 w-full" href={link.href}>
                {link.label}
              </a>
            ))}
            
            {/* Mobile language switch */}
            <div className="sm:hidden flex items-center gap-4 font-label text-xs tracking-[0.2em] font-bold mt-2 pt-6 border-t border-black/10 w-full justify-start">
              <button 
                onClick={() => { setLang('es'); setIsMenuOpen(false); }} 
                className={`${lang === 'es' ? 'text-primary' : 'text-secondary hover:text-primary'} transition-colors`}
              >
                ES
              </button>
              <span className="text-secondary/50">|</span>
              <button 
                onClick={() => { setLang('en'); setIsMenuOpen(false); }} 
                className={`${lang === 'en' ? 'text-primary' : 'text-secondary hover:text-primary'} transition-colors`}
              >
                EN
              </button>
            </div>
          </div>
        )}

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[100svh] flex items-center overflow-hidden pt-32 pb-24">
          <div className="absolute inset-0 z-0">
            <img
               className="w-full h-full object-cover"
               data-alt="Viñedo principal HB Imports"
               src="/images/vineyard_hero_hd.png"
               alt="Hero Vineyard Mountains"
             />
            <div className="absolute inset-0 hero-gradient"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full">
            <div className="max-w-3xl">
              <span className="inline-block mb-4 md:mb-6 text-white font-label tracking-[0.4em] text-[10px] md:text-xs uppercase font-bold">{t.hero.label}</span>
              <h1 className="font-headline font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 md:mb-8 leading-[1.05] tracking-tight">{t.hero.title}</h1>
              <p className="text-white/90 text-base sm:text-lg md:text-xl mb-8 md:mb-12 max-w-lg leading-relaxed font-light">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-6">
                <a href="#catalogo" className="bg-primary text-white px-10 py-5 font-bold uppercase tracking-widest text-xs hover:bg-black transition-all inline-block">
                  {t.hero.btnCatalog}
                </a>
                <a href="#marcas" className="border border-white text-white px-10 py-5 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all backdrop-blur-sm inline-block">
                  {t.hero.btnBrands}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Marcas y Recursos Audiovisuales */}
        <section id="marcas" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-xl">
                <span className="font-label text-primary tracking-[0.3em] text-xs font-bold mb-6 block uppercase">Recursos Informativos</span>
                <h2 className="font-headline font-bold text-5xl text-secondary mb-6 italic">{t.brands.title}</h2>
                {t.brands.desc && <p className="text-on-surface-variant leading-relaxed text-lg">{t.brands.desc}</p>}
              </div>
              <a className="text-primary font-bold uppercase tracking-widest text-xs flex items-center gap-2 border-b-2 border-primary/20 pb-1 hover:border-primary transition-all" href="#">
                {t.brands.viewAll} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Brand 2: Hispano Bodegas (Now Extra Large & First) */}
              <a href={t.brands.b2Link} target="_blank" rel="noopener noreferrer" className="md:col-span-8 group relative h-[400px] md:h-[480px] overflow-hidden bg-[#0a0a0a] editorial-shadow block rounded-3xl shadow-2xl shadow-black/20 border border-black/5">
                <div className="absolute top-6 right-6 w-8 h-6 rounded-sm shadow-xl border border-black/10 overflow-hidden z-20">
                  <img src={getFlagUrl('ESP')} alt="Spain" className="w-full h-full object-cover opacity-90" />
                </div>
                <img
                  className="absolute left-0 top-0 w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105 [mask-image:linear-gradient(to_right,black_30%,transparent_70%)]"
                  src="/images/valdelacierva_card.jpg"
                  alt="Bodega Valdelacierva"
                />
                <img
                  className="w-full h-full object-contain object-right opacity-90 transition-transform duration-1000 group-hover:scale-105 relative z-10"
                  data-alt="12 Linajes IG Official Photo"
                  src="/images/12-linajes-ig.jpg"
                  alt="12 Linajes Hispano Bodegas Instagram Photo"
                />
                <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/95 via-black/80 to-transparent p-6 md:p-12 flex flex-col justify-center pointer-events-none">
                  <span className="flex items-center gap-2 text-primary font-bold text-[10px] tracking-[0.3em] mb-2 uppercase"><span className="material-symbols-outlined text-xs">open_in_new</span> {t.brands.b2Country}</span>
                  <h3 className="text-white font-headline font-bold text-4xl md:text-5xl mb-4 group-hover:text-primary transition-colors leading-tight break-words" style={{ textShadow: '0px 4px 16px rgba(0,0,0,0.9)' }}>{t.brands.b2Brand}</h3>
                  {t.brands.b2Desc && <p className="text-white/80 max-w-sm leading-relaxed text-lg italic opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">{t.brands.b2Desc}</p>}
                </div>
              </a>

              {/* Brand 3: DNA Vineyards */}
              <a href={t.brands.b3Link} target="_blank" rel="noopener noreferrer" className="md:col-span-4 group relative h-[400px] md:h-[480px] overflow-hidden bg-[#0a0a0a] editorial-shadow block rounded-3xl shadow-2xl shadow-black/20 border border-black/5">
                <div className="absolute top-6 right-6 w-8 h-6 rounded-sm shadow-xl border border-black/10 overflow-hidden z-20">
                  <img src={getFlagUrl('USA')} alt="USA" className="w-full h-full object-cover opacity-90" />
                </div>
                <img
                  className="absolute left-0 top-0 w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
                  src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                  alt="DNA Vineyards Mendocino Lifestyle"
                />
                <img
                  className="absolute bottom-0 right-[-10%] w-[80%] h-[95%] object-contain object-bottom transition-transform duration-1000 group-hover:scale-105 z-10 drop-shadow-2xl"
                  src="/images/dna_cabernet_sauvignon.webp"
                  alt="DNA Vineyards Cabernet Sauvignon Bottle"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 to-transparent p-10 flex flex-col justify-end">
                  <span className="flex items-center gap-2 text-primary font-bold text-[10px] tracking-[0.3em] mb-2 uppercase"><span className="material-symbols-outlined text-xs">open_in_new</span> {t.brands.b3Country}</span>
                  <h3 className="text-white font-headline font-bold text-3xl group-hover:text-primary transition-colors">{t.brands.b3Brand}</h3>
                </div>
              </a>

              {/* Brand 4: Lapis Luna */}
              <a href={t.brands.b4Link} target="_blank" rel="noopener noreferrer" className="md:col-span-4 group relative h-[400px] md:h-[480px] overflow-hidden bg-secondary editorial-shadow block rounded-3xl shadow-2xl shadow-black/20 border border-black/5">
                <div className="absolute top-6 right-6 w-8 h-6 rounded-sm shadow-xl border border-black/10 overflow-hidden z-20">
                  <img src={getFlagUrl('USA')} alt="USA" className="w-full h-full object-cover opacity-90" />
                </div>
                <img
                  className="w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
                  data-alt="Lapis Luna Wine Bottles Artwork"
                  src="https://static.wixstatic.com/media/1b2937_3274ff7275bd4d2585233723ec520a9a~mv2.jpeg/v1/fill/w_1920,h_1080,q_90/1b2937_3274ff7275bd4d2585233723ec520a9a~mv2.jpeg"
                  alt="Lapis Luna Beautiful Artwork"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 to-transparent p-10 flex flex-col justify-end">
                  <span className="flex items-center gap-2 text-primary font-bold text-[10px] tracking-[0.3em] mb-2 uppercase"><span className="material-symbols-outlined text-xs">open_in_new</span> {t.brands.b4Country}</span>
                  <h3 className="text-white font-headline font-bold text-3xl group-hover:text-primary transition-colors">{t.brands.b4Brand}</h3>
                </div>
              </a>

              {/* Brand 1: Pascual Toso */}
              <a href={t.brands.b1Link} target="_blank" rel="noopener noreferrer" className="md:col-span-8 group relative h-[400px] md:h-[480px] overflow-hidden bg-secondary editorial-shadow block rounded-3xl shadow-2xl shadow-black/20 border border-black/5">
                <div className="absolute top-6 right-6 w-8 h-6 rounded-sm shadow-xl border border-black/10 overflow-hidden z-20">
                  <img src={getFlagUrl('ARG')} alt="Argentina" className="w-full h-full object-cover opacity-90" />
                </div>
                <img
                   className="w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
                   data-alt="Pascual Toso Lifestyle Bottle Shot"
                   src="https://www.quintessentialwines.com/wp-content/uploads/2024/12/pascual-toso-reserva-malbec-nv-beauty-food-landscape-scaled.jpg"
                   alt="Pascual Toso Mendoza Vineyard"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-10 flex flex-col justify-end">
                  <span className="flex items-center gap-2 text-primary font-bold text-[10px] tracking-[0.3em] mb-2 uppercase"><span className="material-symbols-outlined text-xs">open_in_new</span> {t.brands.b1Country}</span>
                  <h3 className="text-white font-headline font-bold text-3xl mb-2 flex items-center gap-2 group-hover:text-primary transition-colors">{t.brands.b1Brand}</h3>
                  {t.brands.b1Desc && <p className="text-white/80 max-w-md text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">{t.brands.b1Desc}</p>}
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Mapa 3D */}
        <section className="py-24 bg-surface border-y border-black/5 relative z-10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 relative">
            <div className="text-center mb-16">
              <span className="font-label text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">{lang === 'es' ? 'Presencia Global' : 'Global Presence'}</span>
              <h2 className="font-headline font-bold text-5xl mb-6 italic">{lang === 'es' ? 'Nuestros Orígenes' : 'Our Origins'}</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">{lang === 'es' ? 'Explora en el globo terráqueo interactivo los diferentes países desde donde seleccionamos y traemos nuestros vinos a México.' : 'Explore on the interactive globe the different countries from where we select and bring our wines to Mexico.'}</p>
            </div>
            
            <div className="relative shadow-2xl rounded-2xl overflow-hidden border border-black/10 bg-[#000508] transform transition-all duration-700 hover:shadow-primary/10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0)_80%)] pointer-events-none"></div>
              <GlobeMap />
            </div>
          </div>
        </section>

        {/* Catálogo de Productos */}
        <section id="catalogo" className="py-32 bg-surface">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-24">
              <h2 className="font-headline font-bold text-6xl mb-6 italic">{t.wines.title}</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
              <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">{t.wines.desc}</p>
            </div>
            
            {/* ARGENTINA */}
            {currentArgGroups.length > 0 && (
              <div className="mb-8 border-b border-black/5 pb-4">
                <button 
                  onClick={() => toggleCountry('AR')}
                  className="group flex items-center gap-4 w-full text-left font-headline font-bold text-4xl py-6 hover:text-primary transition-all duration-300"
                >
                  <span className="font-label text-xl tracking-[0.2em] text-primary transition-colors">AR</span> 
                  Argentina 
                  <span className="text-secondary/30 text-2xl font-light">({currentArgGroups.reduce((acc, g) => acc + g.wines.length, 0)})</span>
                  <span className={`material-symbols-outlined ml-auto text-3xl transition-transform duration-500 text-secondary/40 group-hover:text-primary ${expandedCountries['AR'] ? 'rotate-180' : ''}`}>expand_more</span>
                </button>
                <div className={`transition-all duration-700 ease-in-out overflow-hidden ${expandedCountries['AR'] ? 'max-h-[10000px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
                  {currentArgGroups.map(g => (
                    <div key={g.group} className="mb-16">
                      <span className="font-label text-primary tracking-[0.2em] text-xs font-bold mb-4 block uppercase">— {g.group}</span>
                      <WineCarousel wines={g.wines} tBuyBtn={t.wines.btnBuy} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ESPAÑA */}
            {currentEspGroups.length > 0 && (
              <div className="mb-8 border-b border-black/5 pb-4">
                <button 
                  onClick={() => toggleCountry('ES')}
                  className="group flex items-center gap-4 w-full text-left font-headline font-bold text-4xl py-6 hover:text-primary transition-all duration-300"
                >
                  <span className="font-label text-xl tracking-[0.2em] text-primary transition-colors">ESP</span> 
                  España 
                  <span className="text-secondary/30 text-2xl font-light">({currentEspGroups.reduce((acc, g) => acc + g.wines.length, 0)})</span>
                  <span className={`material-symbols-outlined ml-auto text-3xl transition-transform duration-500 text-secondary/40 group-hover:text-primary ${expandedCountries['ES'] ? 'rotate-180' : ''}`}>expand_more</span>
                </button>
                <div className={`transition-all duration-700 ease-in-out overflow-hidden ${expandedCountries['ES'] ? 'max-h-[10000px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
                  {currentEspGroups.map(g => (
                    <div key={g.group} className="mb-16">
                      <span className="font-label text-primary tracking-[0.2em] text-xs font-bold mb-4 block uppercase">— {g.group}</span>
                      <WineCarousel wines={g.wines} tBuyBtn={t.wines.btnBuy} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ESTADOS UNIDOS */}
            {currentUsaGroups.length > 0 && (
              <div className="mb-8 border-b border-black/5 pb-4">
                <button 
                  onClick={() => toggleCountry('US')}
                  className="group flex items-center gap-4 w-full text-left font-headline font-bold text-4xl py-6 hover:text-primary transition-all duration-300"
                >
                  <span className="font-label text-xl tracking-[0.2em] text-primary transition-colors">USA</span> 
                  Estados Unidos 
                  <span className="text-secondary/30 text-2xl font-light">({currentUsaGroups.reduce((acc, g) => acc + g.wines.length, 0)})</span>
                  <span className={`material-symbols-outlined ml-auto text-3xl transition-transform duration-500 text-secondary/40 group-hover:text-primary ${expandedCountries['US'] ? 'rotate-180' : ''}`}>expand_more</span>
                </button>
                <div className={`transition-all duration-700 ease-in-out overflow-hidden ${expandedCountries['US'] ? 'max-h-[10000px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
                  {currentUsaGroups.map(g => (
                    <div key={g.group} className="mb-16">
                      <span className="font-label text-primary tracking-[0.2em] text-xs font-bold mb-4 block uppercase">— {g.group}</span>
                      <WineCarousel wines={g.wines} tBuyBtn={t.wines.btnBuy} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MEXICO */}
            {currentMexGroups.length > 0 && (
              <div className="mb-8 border-b border-black/5 pb-4">
                <button 
                  onClick={() => toggleCountry('MX')}
                  className="group flex items-center gap-4 w-full text-left font-headline font-bold text-4xl py-6 hover:text-primary transition-all duration-300"
                >
                  <span className="font-label text-xl tracking-[0.2em] text-primary transition-colors">MEX</span> 
                  México 
                  <span className="text-secondary/30 text-2xl font-light">({currentMexGroups.reduce((acc, g) => acc + g.wines.length, 0)})</span>
                  <span className={`material-symbols-outlined ml-auto text-3xl transition-transform duration-500 text-secondary/40 group-hover:text-primary ${expandedCountries['MX'] ? 'rotate-180' : ''}`}>expand_more</span>
                </button>
                <div className={`transition-all duration-700 ease-in-out overflow-hidden ${expandedCountries['MX'] ? 'max-h-[10000px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
                  {currentMexGroups.map(g => (
                    <div key={g.group} className="mb-16">
                      <span className="font-label text-primary tracking-[0.2em] text-xs font-bold mb-4 block uppercase">— {g.group}</span>
                      <WineCarousel wines={g.wines} tBuyBtn={t.wines.btnBuy} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Presentación: Historia y Estadísticas */}
        {/* Nuestros Distribuidores Oficiales */}
        <section id="distribuidores" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-20">
              <span className="font-label text-primary tracking-[0.3em] text-[10px] font-bold mb-6 block uppercase">Red Comercial</span>
              <h2 className="font-headline font-bold text-5xl text-secondary mb-6 italic">{t.distribuidores.title}</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">{t.distribuidores.desc}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.distribuidores.list.map((dist: any, index: number) => (
                <a 
                  key={index}
                  href={dist.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border border-black/5 p-8 hover:border-primary hover:shadow-2xl transition-all bg-surface relative overflow-hidden"
                >
                  {/* Decorator */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 group-hover:bg-primary/10 transition-colors"></div>
                  
                  {dist.logo ? (
                    <div className="w-14 h-14 bg-white border border-black/5 flex items-center justify-center rounded-full mb-8 shadow-sm group-hover:-translate-y-1 transition-all overflow-hidden p-[8px]">
                      <img 
                        src={dist.logo} 
                        alt={dist.name} 
                        className="w-full h-full object-contain mix-blend-multiply"
                        onError={(e) => { e.currentTarget.parentElement!.style.display = 'none'; }}
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 mb-8 hidden sm:block"></div>
                  )}
                  
                  <h3 className="font-headline font-bold text-2xl mb-3 text-secondary group-hover:text-primary transition-colors leading-tight">{dist.name}</h3>
                  <p className="text-on-surface-variant text-sm mb-10 font-light leading-relaxed">{dist.desc}</p>
                  
                  <span className="text-secondary font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 border-b-2 border-primary pb-1 w-fit group-hover:text-primary transition-colors">
                    {t.distribuidores.visitBtn} <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Landing Page Contacto Inbound & Distribuidores */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="bg-white grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden shadow-2xl" id="contacto">
              {/* Información Distribuidores */}
              <div className="p-10 md:p-20 bg-primary flex flex-col justify-center min-h-[350px]">
                <span className="material-symbols-outlined text-white/50 text-5xl mb-8">handshake</span>
                <h4 className="font-headline font-bold text-4xl md:text-5xl text-white mb-6 leading-tight italic">{t.cta.c2Title}</h4>
                <p className="text-white/90 text-lg md:text-xl max-w-md leading-relaxed">{t.cta.c2Desc}</p>
              </div>

              {/* Formulario */}
              <div className="p-10 md:p-20 bg-white flex flex-col justify-center relative">
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-secondary font-bold tracking-widest uppercase text-[10px] mb-2">{t.cta.fContactName} <span className="text-primary">*</span></label>
                      <input type="text" name="Nombre" className="w-full border-b border-black/20 pb-3 focus:outline-none focus:border-primary transition-colors bg-transparent text-secondary placeholder-black/20" placeholder="Ej. Juan Pérez" required />
                    </div>
                    <div>
                      <label className="block text-secondary font-bold tracking-widest uppercase text-[10px] mb-2">{t.cta.fCompany}</label>
                      <input type="text" name="Empresa" className="w-full border-b border-black/20 pb-3 focus:outline-none focus:border-primary transition-colors bg-transparent text-secondary placeholder-black/20" placeholder="Ej. Vinos S.A. de C.V." />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-secondary font-bold tracking-widest uppercase text-[10px] mb-2">{t.cta.fLocation}</label>
                      <input type="text" name="Ubicacion" className="w-full border-b border-black/20 pb-3 focus:outline-none focus:border-primary transition-colors bg-transparent text-secondary placeholder-black/20" placeholder="Ej. Monterrey, NL" />
                    </div>
                    <div>
                      <label className="block text-secondary font-bold tracking-widest uppercase text-[10px] mb-2">{t.cta.fPhone} <span className="text-primary">*</span></label>
                      <input type="tel" name="Teléfono" className="w-full border-b border-black/20 pb-3 focus:outline-none focus:border-primary transition-colors bg-transparent text-secondary placeholder-black/20" placeholder="Ej. 55 1234 5678" required />
                    </div>
                  </div>

                  <div>
                    <label className="block text-secondary font-bold tracking-widest uppercase text-[10px] mb-2">{t.cta.fEmail} <span className="text-primary">*</span></label>
                    <input type="email" name="Correo" className="w-full border-b border-black/20 pb-3 focus:outline-none focus:border-primary transition-colors bg-transparent text-secondary placeholder-black/20" placeholder="contacto@tuempresa.com" required />
                  </div>
                  
                  <div>
                    <label className="block text-secondary font-bold tracking-widest uppercase text-[10px] mb-2">{t.cta.fMsg}</label>
                    <textarea name="Mensaje" rows={2} className="w-full border-b border-black/20 pb-3 focus:outline-none focus:border-primary transition-colors bg-transparent text-secondary resize-none placeholder-black/20" placeholder="Háblanos sobre tu capacidad de distribución y zonas de interés..."></textarea>
                  </div>
                  
                  <button type="submit" disabled={formState === 'loading' || formState === 'success'} className="bg-black text-white px-8 py-5 mt-2 font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-primary transition-all w-fit flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
                    {formState === 'loading' ? 'Enviando...' : formState === 'success' ? '¡Enviado!' : t.cta.c2Btn}
                    {formState === 'idle' && <span className="material-symbols-outlined text-sm">send</span>}
                    {formState === 'success' && <span className="material-symbols-outlined text-sm">check_circle</span>}
                  </button>

                  {formState === 'error' && (
                    <span className="text-primary text-xs font-bold mt-2 font-label uppercase">Hubo un error, por favor intenta nuevamente.</span>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        <section id="historia" className="py-32 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
              <div className="relative mx-auto max-w-sm md:max-w-none">
                <div className="aspect-[4/5] bg-surface-container-high overflow-hidden shadow-2xl">
                  <img
                    className="w-full h-full object-cover"
                    src="https://www.hispanobodegas.com/wp-content/uploads/2019/06/Home_Gormaz.jpg"
                    alt="Viñedo Hispano Bodegas"
                  />
                </div>
                <div className="absolute -bottom-12 -right-12 w-48 md:w-64 aspect-square bg-primary p-6 md:p-8 flex flex-col justify-center text-center hidden md:flex">
                  <span className="text-white text-4xl md:text-5xl font-headline font-bold mb-2">{t.story.yearsNum}</span>
                  <span className="text-white/90 font-label text-[10px] tracking-[0.3em] uppercase font-bold">{t.story.yearsLbl}</span>
                </div>
              </div>
              <div>
                <span className="font-label text-primary tracking-[0.3em] text-xs font-bold mb-6 block uppercase">{t.story.bridge}</span>
                <h2 className="font-headline font-bold text-5xl text-secondary mb-8 leading-tight italic">{t.story.title}</h2>
                <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
                  {t.story.desc}
                </p>
                <ul className="space-y-6 mb-12">
                  <li className="flex items-center gap-5 text-secondary">
                    <span className="material-symbols-outlined text-primary font-bold">verified</span>
                    <span className="font-bold tracking-tight uppercase text-xs">{t.story.f1}</span>
                  </li>
                  <li className="flex items-center gap-5 text-secondary">
                    <span className="material-symbols-outlined text-primary font-bold">thermostat</span>
                    <span className="font-bold tracking-tight uppercase text-xs">{t.story.f2}</span>
                  </li>
                  <li className="flex items-center gap-5 text-secondary">
                    <span className="material-symbols-outlined text-primary font-bold">handshake</span>
                    <span className="font-bold tracking-tight uppercase text-xs">{t.story.f3}</span>
                  </li>
                </ul>
                <button className="bg-secondary text-white px-10 py-5 font-bold uppercase tracking-widest text-xs hover:bg-primary transition-all">
                  {t.story.btn}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
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
                <a className="hover:text-primary transition-colors" href="#marcas">{t.nav.brands}</a>
                <a className="hover:text-primary transition-colors" href="#contacto">{t.nav.contact}</a>
                <a className="hover:text-primary transition-colors" href="#historia">{t.nav.history}</a>
              </nav>
            </div>
            <div className="flex flex-col gap-6">
              <h5 className="text-primary font-bold text-[10px] uppercase tracking-[0.3em]">{t.footer.legalTitle}</h5>
              <nav className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest">
                <a className="hover:text-primary transition-colors" href="#">{t.footer.l1}</a>
                <a className="hover:text-primary transition-colors" href="#">{t.footer.l2}</a>
                <a className="hover:text-primary transition-colors" href="#">{t.footer.l3}</a>
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
              <button className="material-symbols-outlined text-primary font-bold">east</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 mt-24 pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-[0.2em]">{t.footer.copyright}</span>
          <div className="flex gap-10">
            <span className="material-symbols-outlined text-secondary hover:text-primary transition-colors cursor-pointer">brand_awareness</span>
            <span className="material-symbols-outlined text-secondary hover:text-primary transition-colors cursor-pointer">social_distance</span>
          </div>
        </div>
      </footer>
    </>
  );
}
