import type { Metadata } from 'next';
import HomePage from '../HomePage';

export const metadata: Metadata = {
  title: 'Contacto | HB Imports MX',
  description:
    'Contacta a HB Imports MX para distribución de vinos premium en México. Solicita asesoría o únete a nuestra red de distribuidores.',
  alternates: { canonical: '/contacto' },
};

export default function Page() {
  return <HomePage scrollTo="contacto" />;
}
