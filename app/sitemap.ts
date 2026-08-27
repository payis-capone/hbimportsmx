import type { MetadataRoute } from 'next';

const SITE = 'https://hbimports.mx';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE}/en`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/catalogo`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/distribuidores`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/contacto`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/aviso-de-privacidad`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE}/terminos-de-servicio`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE}/consumo-responsable`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
