// Registro de eventos de analítica. GA4 se conectará después (gtag.js);
// mientras tanto los eventos se acumulan en dataLayer, que GA4/GTM
// reproduce al cargar, así no se pierde nada de lo emitido antes.
export function trackEvent(name: string, params: Record<string, string> = {}) {
  try {
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: name, ...params });
    if (typeof w.gtag === 'function') {
      w.gtag('event', name, params);
    }
  } catch {}
}
