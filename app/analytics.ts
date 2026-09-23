// Registro de eventos de analítica hacia GA4 (gtag.js, cargado por
// @next/third-parties en el layout). Si gtag.js aún no carga, se define
// el stub estándar que encola en dataLayer con el formato que GA4
// reproduce al iniciar, así no se pierden los eventos tempranos.
export function trackEvent(name: string, params: Record<string, string> = {}) {
  try {
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    if (typeof w.gtag !== 'function') {
      w.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        w.dataLayer.push(arguments);
      };
    }
    w.gtag('event', name, params);
  } catch {}
}
