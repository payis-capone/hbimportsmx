import type { Metadata } from 'next';
import LegalShell from '../LegalShell';

export const metadata: Metadata = {
  title: 'Consumo Responsable | HB Imports MX',
  description: 'Mensaje de consumo responsable de HB Imports MX.',
};

const content = {
  es: {
    label: 'Legales',
    title: 'Consumo Responsable',
    updated: 'Evita el exceso.',
    intro:
      'En HB Imports MX creemos que el vino y los destilados se disfrutan mejor con moderación. Promovemos una cultura de consumo informado, responsable y exclusivo para adultos.',
    sections: [
      {
        h: 'Nuestro compromiso',
        body: [
          {
            list: [
              'La venta y el suministro de bebidas alcohólicas a menores de 18 años están estrictamente prohibidos.',
              'Disfruta con moderación: conoce tus límites y respétalos.',
              'No consumas alcohol si vas a conducir u operar maquinaria.',
              'Evita el consumo de alcohol durante el embarazo y la lactancia.',
              'Si decides no beber, respeta esa decisión y la de los demás.',
            ],
          },
        ],
      },
      {
        h: 'El abuso en el consumo de este producto es nocivo para la salud',
        body: [
          'Comparte estos principios con tu equipo, tus clientes y tu familia. Un buen vino se celebra mejor cuando se disfruta con responsabilidad.',
        ],
      },
    ],
  },
  en: {
    label: 'Legal',
    title: 'Responsible Drinking',
    updated: 'Drink responsibly.',
    intro:
      'At HB Imports MX we believe wine and spirits are best enjoyed in moderation. We promote an informed, responsible drinking culture, intended exclusively for adults.',
    sections: [
      {
        h: 'Our commitment',
        body: [
          {
            list: [
              'The sale and supply of alcoholic beverages to persons under 18 is strictly prohibited.',
              'Enjoy in moderation: know your limits and respect them.',
              'Never drink and drive or operate machinery.',
              'Avoid alcohol during pregnancy and breastfeeding.',
              'If you choose not to drink, respect that decision — yours and others’.',
            ],
          },
        ],
      },
      {
        h: 'Alcohol abuse is harmful to your health',
        body: [
          'Share these principles with your team, your customers and your family. A good wine is best celebrated when enjoyed responsibly.',
        ],
      },
    ],
  },
};

export default function Page() {
  return <LegalShell content={content} />;
}
