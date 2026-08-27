import type { Metadata } from 'next';
import HomePage from '../HomePage';
import { catalogJsonLd } from '../seo';

export const metadata: Metadata = {
  title: 'Catálogo de Vinos y Destilados | HB Imports MX',
  description:
    'Explora el catálogo de HB Imports MX: vinos de España (Rioja, Ribera del Duero, Rueda), Argentina (Mendoza), Estados Unidos (California) y México, con fichas técnicas descargables.',
  alternates: { canonical: '/catalogo' },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd()) }}
      />
      <HomePage scrollTo="catalogo" />
    </>
  );
}
