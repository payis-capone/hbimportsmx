import type { Metadata } from 'next';
import LegalShell from '../LegalShell';

export const metadata: Metadata = {
  title: 'Aviso de Privacidad | HB Imports MX',
  description: 'Aviso de privacidad de HB Imports MX conforme a la LFPDPPP.',
};

const content = {
  es: {
    label: 'Legales',
    title: 'Aviso de Privacidad',
    updated: 'Última actualización: [PENDIENTE: dato legal — fecha de emisión]',
    intro:
      'En cumplimiento de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), su Reglamento y los Lineamientos del Aviso de Privacidad, ponemos a su disposición el presente aviso.',
    sections: [
      {
        h: '1. Responsable del tratamiento',
        body: [
          '[PENDIENTE: dato legal — razón social completa], conocida comercialmente como HB Imports MX (en adelante, el "Responsable"), con domicilio en [PENDIENTE: dato legal — domicilio completo del responsable], es responsable del tratamiento de sus datos personales conforme a este aviso.',
        ],
      },
      {
        h: '2. Datos personales que recopilamos',
        body: [
          'Recabamos únicamente los datos personales que usted nos proporciona de manera directa y voluntaria a través de este sitio web:',
          {
            list: [
              'Formulario de contacto para distribuidores: nombre completo, empresa, teléfono y correo electrónico, así como la información que usted decida incluir en su mensaje.',
              'Suscripción al boletín: correo electrónico.',
            ],
          },
          'No recabamos datos personales sensibles. Este sitio utiliza almacenamiento local del navegador (localStorage) únicamente para recordar su verificación de mayoría de edad y su preferencia de idioma; esta información no se transmite al Responsable ni permite identificarle.',
        ],
      },
      {
        h: '3. Finalidades del tratamiento',
        body: [
          'Sus datos personales serán utilizados para las siguientes finalidades primarias, necesarias para la relación que usted solicita:',
          {
            list: [
              'Atender su solicitud de información o de distribución de nuestros productos.',
              'Establecer contacto comercial y dar seguimiento a su solicitud.',
            ],
          },
          'De manera adicional, y solo si usted se suscribe, utilizaremos su correo electrónico para la siguiente finalidad secundaria:',
          {
            list: [
              'Envío de nuestro boletín con novedades, catálogo y comunicaciones comerciales.',
            ],
          },
          'Usted puede negarse al tratamiento para la finalidad secundaria, o darse de baja del boletín en cualquier momento, escribiendo al correo indicado en la sección 5.',
        ],
      },
      {
        h: '4. Transferencias de datos',
        body: [
          'Sus datos personales no serán transferidos a terceros sin su consentimiento, salvo las excepciones previstas en el artículo 37 de la LFPDPPP (por ejemplo, requerimientos de autoridad competente) y los encargados que prestan servicios al Responsable —como el proveedor de alojamiento de este sitio web y servicios de correo electrónico— quienes tratan los datos únicamente por cuenta y bajo las instrucciones del Responsable.',
        ],
      },
      {
        h: '5. Derechos ARCO y revocación del consentimiento',
        body: [
          'Usted tiene derecho a Acceder, Rectificar y Cancelar sus datos personales, así como a Oponerse a su tratamiento (derechos ARCO) y a revocar el consentimiento que nos haya otorgado.',
          'Para ejercer estos derechos, envíe una solicitud al correo [PENDIENTE: dato legal — correo para ejercer derechos ARCO], indicando: (i) su nombre completo y medio de contacto; (ii) los documentos que acrediten su identidad o representación; (iii) la descripción clara y precisa de los datos respecto de los que busca ejercer alguno de los derechos ARCO; y (iv) cualquier elemento que facilite la localización de los datos.',
          'El Responsable comunicará la determinación adoptada en un plazo máximo de veinte días hábiles contados desde la fecha en que se recibió la solicitud, conforme al artículo 32 de la LFPDPPP.',
          'Si considera que su derecho a la protección de datos ha sido vulnerado, puede acudir ante la autoridad competente en materia de protección de datos personales (www.inai.org.mx).',
        ],
      },
      {
        h: '6. Cambios al aviso de privacidad',
        body: [
          'El Responsable podrá modificar este aviso en cualquier momento para cumplir con actualizaciones legislativas o políticas internas. Cualquier cambio será publicado en esta misma página, indicando la fecha de última actualización.',
        ],
      },
    ],
  },
  en: {
    label: 'Legal',
    title: 'Privacy Notice',
    updated: 'Last updated: [PENDIENTE: dato legal — issue date]',
    intro:
      'In compliance with the Mexican Federal Law on the Protection of Personal Data Held by Private Parties (LFPDPPP), its Regulations and the Privacy Notice Guidelines, we make this notice available to you. This English version is provided for convenience; the Spanish version governs.',
    sections: [
      {
        h: '1. Data controller',
        body: [
          '[PENDIENTE: dato legal — full legal entity name], commercially known as HB Imports MX (the "Controller"), with registered address at [PENDIENTE: dato legal — full address], is responsible for the processing of your personal data under this notice.',
        ],
      },
      {
        h: '2. Personal data we collect',
        body: [
          'We only collect the personal data you provide directly and voluntarily through this website:',
          {
            list: [
              'Distributor contact form: full name, company, phone number and email address, plus any information you choose to include in your message.',
              'Newsletter subscription: email address.',
            ],
          },
          'We do not collect sensitive personal data. This site uses browser local storage only to remember your age verification and language preference; that information is not transmitted to the Controller and does not identify you.',
        ],
      },
      {
        h: '3. Purposes of processing',
        body: [
          'Your personal data will be used for the following primary purposes, necessary for the relationship you request:',
          {
            list: [
              'Responding to your information or distribution request.',
              'Establishing commercial contact and following up on your request.',
            ],
          },
          'Additionally, and only if you subscribe, we will use your email address for the following secondary purpose:',
          {
            list: [
              'Sending our newsletter with news, catalog updates and commercial communications.',
            ],
          },
          'You may object to the secondary purpose, or unsubscribe from the newsletter at any time, by writing to the email address indicated in section 5.',
        ],
      },
      {
        h: '4. Data transfers',
        body: [
          'Your personal data will not be transferred to third parties without your consent, except for the cases set forth in Article 37 of the LFPDPPP (for example, requests from a competent authority) and service providers acting on behalf of the Controller — such as the hosting provider of this website and email services — who process the data solely under the Controller’s instructions.',
        ],
      },
      {
        h: '5. ARCO rights and withdrawal of consent',
        body: [
          'You have the right to Access, Rectify and Cancel your personal data, as well as to Object to its processing (ARCO rights) and to withdraw any consent you have given us.',
          'To exercise these rights, send a request to [PENDIENTE: dato legal — correo para ejercer derechos ARCO], stating: (i) your full name and contact means; (ii) documents proving your identity or legal representation; (iii) a clear and precise description of the data concerned; and (iv) any element that helps locate the data.',
          'The Controller will communicate its decision within a maximum of twenty business days from receipt of the request, pursuant to Article 32 of the LFPDPPP.',
          'If you believe your data protection rights have been violated, you may file a complaint with the Mexican data protection authority (www.inai.org.mx).',
        ],
      },
      {
        h: '6. Changes to this privacy notice',
        body: [
          'The Controller may amend this notice at any time to reflect legislative updates or internal policies. Any change will be published on this page, indicating the date of last update.',
        ],
      },
    ],
  },
};

export default function Page() {
  return <LegalShell content={content} />;
}
