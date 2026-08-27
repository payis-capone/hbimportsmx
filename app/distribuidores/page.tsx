import type { Metadata } from 'next';
import HomePage from '../HomePage';

export const metadata: Metadata = {
  title: 'Red de Distribuidores | HB Imports MX',
  description:
    'Conoce la red oficial de distribuidores de HB Imports MX en todo México y únete como aliado comercial para distribuir nuestro portafolio de vinos premium.',
  alternates: { canonical: '/distribuidores' },
};

export default function Page() {
  return <HomePage scrollTo="distribuidores" />;
}
