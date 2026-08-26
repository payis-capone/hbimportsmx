import type { Metadata } from 'next';
import LegalShell from '../LegalShell';

export const metadata: Metadata = {
  title: 'Términos de Servicio | HB Imports MX',
  description: 'Términos y condiciones de uso del sitio web de HB Imports MX.',
};

const content = {
  es: {
    label: 'Legales',
    title: 'Términos de Servicio',
    updated: 'Última actualización: [PENDIENTE: dato legal — fecha de emisión]',
    intro:
      'Estos términos regulan el acceso y uso del sitio web de HB Imports MX. Al navegar en este sitio usted acepta estos términos. Si no está de acuerdo con ellos, le pedimos no utilizar el sitio.',
    sections: [
      {
        h: '1. Naturaleza del sitio',
        body: [
          'Este sitio tiene una finalidad exclusivamente informativa: presenta el catálogo de vinos y destilados que [PENDIENTE: dato legal — razón social completa] ("HB Imports MX") importa y distribuye en México, dirigido principalmente a distribuidores, restaurantes, hoteles y otros compradores mayoristas (B2B).',
          'El contenido del sitio no constituye una oferta de venta al público ni una promesa contractual. Los precios, disponibilidad, añadas y condiciones comerciales se pactan directamente con nuestro equipo y pueden cambiar sin previo aviso.',
        ],
      },
      {
        h: '2. Mayoría de edad',
        body: [
          'Este sitio presenta bebidas alcohólicas y está dirigido exclusivamente a personas mayores de 18 años. Al utilizarlo, usted declara ser mayor de edad conforme a la legislación aplicable. La venta de bebidas alcohólicas a menores de edad está prohibida.',
        ],
      },
      {
        h: '3. Propiedad intelectual',
        body: [
          'Los contenidos de este sitio (textos, diseño, logotipos e imágenes propias) pertenecen a HB Imports MX o se utilizan con autorización de sus titulares. Las marcas, etiquetas y fichas técnicas de los productos exhibidos pertenecen a sus respectivas bodegas y productores.',
          'Queda prohibida la reproducción total o parcial del contenido con fines comerciales sin autorización previa y por escrito.',
        ],
      },
      {
        h: '4. Exactitud de la información',
        body: [
          'Procuramos mantener la información del catálogo actualizada y precisa; sin embargo, las fichas técnicas, añadas, presentaciones e imágenes son de carácter ilustrativo y pueden variar sin previo aviso. HB Imports MX no garantiza la ausencia de errores u omisiones en el contenido.',
        ],
      },
      {
        h: '5. Enlaces a terceros',
        body: [
          'El sitio puede contener enlaces a páginas de terceros (por ejemplo, sitios de bodegas o tiendas de nuestros socios comerciales). HB Imports MX no controla ni se hace responsable del contenido, políticas o prácticas de dichos sitios.',
        ],
      },
      {
        h: '6. Limitación de responsabilidad',
        body: [
          'El uso del sitio es bajo su propia responsabilidad. En la máxima medida permitida por la ley, HB Imports MX no será responsable por daños derivados del uso o imposibilidad de uso del sitio, interrupciones, virus u otros elementos dañinos, ni por decisiones tomadas con base en la información aquí publicada.',
        ],
      },
      {
        h: '7. Modificaciones',
        body: [
          'HB Imports MX puede actualizar estos términos en cualquier momento. Las modificaciones surtirán efecto desde su publicación en esta página. El uso continuado del sitio implica la aceptación de los términos vigentes.',
        ],
      },
      {
        h: '8. Legislación aplicable y jurisdicción',
        body: [
          'Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Para cualquier controversia, las partes se someten a los tribunales competentes de [PENDIENTE: dato legal — ciudad y entidad federativa de jurisdicción], renunciando a cualquier otro fuero que pudiera corresponderles.',
        ],
      },
      {
        h: '9. Contacto',
        body: [
          'Para cualquier duda sobre estos términos, escríbanos a [PENDIENTE: dato legal — correo de contacto legal].',
        ],
      },
    ],
  },
  en: {
    label: 'Legal',
    title: 'Terms of Service',
    updated: 'Last updated: [PENDIENTE: dato legal — issue date]',
    intro:
      'These terms govern access to and use of the HB Imports MX website. By browsing this site you accept these terms. If you do not agree with them, please do not use the site. This English version is provided for convenience; the Spanish version governs.',
    sections: [
      {
        h: '1. Nature of this site',
        body: [
          'This site is for information purposes only: it showcases the catalog of wines and spirits that [PENDIENTE: dato legal — full legal entity name] ("HB Imports MX") imports and distributes in Mexico, aimed primarily at distributors, restaurants, hotels and other wholesale buyers (B2B).',
          'The content of this site does not constitute an offer to sell to the public nor a contractual promise. Prices, availability, vintages and commercial conditions are agreed directly with our team and may change without notice.',
        ],
      },
      {
        h: '2. Legal drinking age',
        body: [
          'This site features alcoholic beverages and is intended exclusively for persons over 18 years of age. By using it, you represent that you are of legal age under applicable law. The sale of alcoholic beverages to minors is prohibited.',
        ],
      },
      {
        h: '3. Intellectual property',
        body: [
          'The contents of this site (texts, design, logos and our own images) belong to HB Imports MX or are used with their owners’ authorization. The brands, labels and technical sheets of the products displayed belong to their respective wineries and producers.',
          'Total or partial reproduction of the content for commercial purposes without prior written authorization is prohibited.',
        ],
      },
      {
        h: '4. Accuracy of information',
        body: [
          'We strive to keep the catalog information up to date and accurate; however, technical sheets, vintages, presentations and images are illustrative and may vary without notice. HB Imports MX does not guarantee the absence of errors or omissions in the content.',
        ],
      },
      {
        h: '5. Third-party links',
        body: [
          'The site may contain links to third-party pages (for example, winery sites or our commercial partners’ stores). HB Imports MX does not control and is not responsible for the content, policies or practices of those sites.',
        ],
      },
      {
        h: '6. Limitation of liability',
        body: [
          'Use of the site is at your own risk. To the maximum extent permitted by law, HB Imports MX shall not be liable for damages arising from the use or inability to use the site, interruptions, viruses or other harmful elements, nor for decisions made based on the information published here.',
        ],
      },
      {
        h: '7. Changes',
        body: [
          'HB Imports MX may update these terms at any time. Changes take effect upon publication on this page. Continued use of the site implies acceptance of the terms then in force.',
        ],
      },
      {
        h: '8. Governing law and jurisdiction',
        body: [
          'These terms are governed by the laws of the United Mexican States. For any dispute, the parties submit to the competent courts of [PENDIENTE: dato legal — ciudad y entidad federativa de jurisdicción], waiving any other forum to which they may be entitled.',
        ],
      },
      {
        h: '9. Contact',
        body: [
          'For any questions about these terms, write to [PENDIENTE: dato legal — correo de contacto legal].',
        ],
      },
    ],
  },
};

export default function Page() {
  return <LegalShell content={content} />;
}
