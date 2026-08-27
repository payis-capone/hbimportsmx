import type { Metadata } from 'next';
import HomePage from '../HomePage';
import { catalogJsonLd } from '../seo';

export const metadata: Metadata = {
  title: 'HB Imports MX | Premium Wine Importer in Mexico — Spain, Argentina, USA',
  description:
    'Premium wine importer and distributor in Mexico: Rioja, Ribera del Duero, Mendoza, California and Valle de Guadalupe. Over 60 labels with tech sheets and a nationwide distributor network.',
  alternates: {
    canonical: '/en',
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
      <HomePage initialLang="en" />
    </>
  );
}
