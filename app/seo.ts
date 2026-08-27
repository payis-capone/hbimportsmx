import winesData from './wines.json';

const SITE = 'https://hbimports.mx';

const BRANDS: [string, string][] = [
  ['PASCUAL TOSO', 'Pascual Toso'],
  ['MAGDALENA TOSO', 'Pascual Toso'],
  ['DON APARO', 'Don Aparo'],
  ['LAPIS LUNA', 'Lapis Luna'],
  ['DNA', 'DNA Vineyards'],
  ['DÉCIMA', 'Décima'],
  ['DECIMA', 'Décima'],
  ['EL SECRETO', 'El Secreto'],
  ['VALDELACIERVA', 'Valdelacierva'],
  ['VALDELAMILLO', 'Valdelamillo'],
  ['CAMPO ALTO', 'Campo Alto'],
  ['CATANIA', 'Catania'],
  ['GORMAZ', 'Viña Gormaz'],
  ['LINAJES', '12 Linajes'],
  ['ANIER', 'Anier'],
  ['GARCIGRANDE', 'Garcigrande'],
  ['TOCHO', 'Tocho Norte'],
  ['PRIMERA PIEDRA', 'Primera Piedra'],
  ['BACANORA', 'Aguamiel'],
  ['VIRNA', 'Dominio del Challao'],
  ['ANGELITA', 'Dominio del Challao'],
];

const COUNTRY: Record<string, string> = {
  ARG: 'Argentina',
  USA: 'Estados Unidos',
  ESP: 'España',
  MEX: 'México',
};

function brandOf(name: string): string {
  const n = name.toUpperCase();
  for (const [match, brand] of BRANDS) {
    if (n.includes(match)) return brand;
  }
  return name.split(' ')[0];
}

// ItemList de Product para que Google entienda el catálogo completo
// aunque viva en una sola página.
export function catalogJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Catálogo de vinos y destilados — HB Imports MX',
    url: `${SITE}/catalogo`,
    numberOfItems: winesData.length,
    itemListElement: winesData.map((w, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: w.name,
        brand: { '@type': 'Brand', name: brandOf(w.name) },
        countryOfOrigin: COUNTRY[w.badge] || w.badge,
        category: w.type || 'Vino',
        ...(w.img ? { image: `${SITE}${encodeURI(w.img)}` } : {}),
        url: `${SITE}/catalogo`,
      },
    })),
  };
}
