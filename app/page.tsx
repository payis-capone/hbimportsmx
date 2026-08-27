import type { Metadata } from 'next';
import HomePage from './HomePage';
import { catalogJsonLd } from './seo';

export const metadata: Metadata = {
  title: 'HB Imports MX | Importador de Vinos en México — España, Argentina, USA',
  description:
    'Importador y distribuidor de vinos premium en México: Rioja, Ribera del Duero, Mendoza, California y Valle de Guadalupe. Más de 60 etiquetas con fichas técnicas y red nacional de distribuidores.',
  alternates: {
    canonical: '/',
    languages: {
      'es-MX': '/',
      en: '/en',
      'x-default': '/',
    },
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd()) }}
      />
      <HomePage />
    </>
  );
}
