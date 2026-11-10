export interface CatalogProduct {
  id: string;
  name: string;
  price: string;
  priceNumber: number;
  category: 'Outerwear' | 'Dresses' | 'Tops' | 'Trousers' | 'Bags' | 'Accessories';
  image: string;
  runwayLook?: number;
  description: string;
  fabric: string;
  isNew?: boolean;
  isFeatured?: boolean;
  colors?: string[];
  sizes?: string[];
}

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  // Outerwear & Coats
  {
    id: 'coat-cocoon',
    name: 'Cashmere Cocoon Coat',
    price: '$3,400',
    priceNumber: 3400,
    category: 'Outerwear',
    image: '/products/coat-cocoon.jpg',
    runwayLook: 19,
    description: 'Double-faced Italian cashmere cut in an architectural curved silhouette with dropped shoulders and horn buttons.',
    fabric: '100% Cashmere, Cupro lining',
    isNew: true,
    isFeatured: true,
    colors: ['Oatmeal', 'Powder Blue', 'Black'],
    sizes: ['IT 36', 'IT 38', 'IT 40', 'IT 42'],
  },
  {
    id: 'coat-trench',
    name: 'Fluid Satin Trench Dress',
    price: '$2,350',
    priceNumber: 2350,
    category: 'Dresses',
    image: '/products/coat-trench.jpg',
    runwayLook: 17,
    description: 'A hybrid garment engineered to be styled as a structured lightweight duster or buttoned into a draped trench dress.',
    fabric: '72% Mulberry Silk, 28% Viscose',
    isFeatured: true,
    colors: ['Champagne', 'Bone White', 'Midnight'],
    sizes: ['IT 36', 'IT 38', 'IT 40', 'IT 42', 'IT 44'],
  },
  {
    id: 'coat-powder',
    name: 'Powder Long Coat',
    price: '$1,980',
    priceNumber: 1980,
    category: 'Outerwear',
    image: '/products/coat-powder.jpg',
    runwayLook: 19,
    description: 'Long tailored coat in ethereal powder ice shade with minimalist single-breasted closure and raw edge lapels.',
    fabric: '90% Virgin Wool, 10% Cashmere',
    isNew: true,
    colors: ['Powder Ice', 'Sand'],
    sizes: ['IT 38', 'IT 40', 'IT 42'],
  },
  {
    id: 'blazer-organza',
    name: 'Architectural Silk Blazer',
    price: '$2,150',
    priceNumber: 2150,
    category: 'Outerwear',
    image: '/products/blazer-organza.jpg',
    runwayLook: 15,
    description: 'Deconstructed blazer tailored from crisp heavy silk organza with sharp peak lapels and padded architectural shoulders.',
    fabric: '100% Silk Organza',
    isFeatured: true,
    colors: ['Alabaster', 'Smoked Quartz'],
    sizes: ['IT 36', 'IT 38', 'IT 40', 'IT 42'],
  },

  // Dresses & Gowns
  {
    id: 'dress-pleated',
    name: 'Sculpted Pleated Gown',
    price: '$3,600',
    priceNumber: 3600,
    category: 'Dresses',
    image: '/products/dress-pleated.jpg',
    runwayLook: 16,
    description: 'Floor-skimming evening gown featuring sunray accordion micro-pleating and an asymmetric draped neckline.',
    fabric: '100% Silk Georgette',
    isFeatured: true,
    colors: ['Pearl', 'Blush Mist', 'Onyx'],
    sizes: ['IT 36', 'IT 38', 'IT 40', 'IT 42'],
  },
  {
    id: 'dress-champagne',
    name: 'Champagne Column Dress',
    price: '$3,200',
    priceNumber: 3200,
    category: 'Dresses',
    image: '/products/dress-champagne.jpg',
    runwayLook: 20,
    description: 'Minimalist column silhouette in heavy champagne satin with delicate halter neckline and low sculptural back.',
    fabric: '100% Silk Satin',
    isNew: true,
    isFeatured: true,
    colors: ['Champagne Gilt', 'Silver Frost'],
    sizes: ['IT 36', 'IT 38', 'IT 40'],
  },
  {
    id: 'dress-silk-slip',
    name: 'Bias-Cut Silk Slip Dress',
    price: '$1,850',
    priceNumber: 1850,
    category: 'Dresses',
    image: '/products/dress-silk-slip.jpg',
    runwayLook: 16,
    description: 'Effortless bias-cut silhouette that drapes organically over curves, accented with micro-rouleau straps.',
    fabric: '100% Washed Mulberry Silk',
    colors: ['Ivory', 'Sage Grey', 'Black'],
    sizes: ['IT 36', 'IT 38', 'IT 40', 'IT 42'],
  },

  // Tops & Blouses
  {
    id: 'blouse-billow',
    name: 'Billow Sleeve Silk Blouse',
    price: '$860',
    priceNumber: 860,
    category: 'Tops',
    image: '/products/blouse-billow.jpg',
    runwayLook: 18,
    description: 'Voluminous peasant sleeves with extended French cuffs, mother-of-pearl buttons, and keyhole tie collar.',
    fabric: '100% Silk Crepe de Chine',
    colors: ['Cloud White', 'Ecru'],
    sizes: ['IT 36', 'IT 38', 'IT 40', 'IT 42', 'IT 44'],
  },
  {
    id: 'top-ruffle',
    name: 'Sculpted Ruffle Top',
    price: '$1,120',
    priceNumber: 1120,
    category: 'Tops',
    image: '/products/top-ruffle.jpg',
    runwayLook: 20,
    description: 'Hand-molded spiral ruffles along the décolletage crafted in lightweight silk faille with hidden side zipper.',
    fabric: '100% Silk Faille',
    isNew: true,
    colors: ['Pure White', 'Midnight Navy'],
    sizes: ['IT 36', 'IT 38', 'IT 40'],
  },

  // Trousers & Skirts
  {
    id: 'trousers-palazzo',
    name: 'Satin Wide Leg Palazzo Trousers',
    price: '$1,450',
    priceNumber: 1450,
    category: 'Trousers',
    image: '/products/trousers-palazzo.jpg',
    runwayLook: 15,
    description: 'High-waisted flowing trousers with double knife pleats that create fluid architectural movement while walking.',
    fabric: '100% Heavy Silk Satin',
    isFeatured: true,
    colors: ['Ice Silver', 'Bone', 'Charcoal'],
    sizes: ['IT 36', 'IT 38', 'IT 40', 'IT 42'],
  },
  {
    id: 'skirt-pleated',
    name: 'Pleated Maxi Skirt',
    price: '$1,340',
    priceNumber: 1340,
    category: 'Trousers',
    image: '/products/skirt-pleated.jpg',
    runwayLook: 20,
    description: 'Graduated permanent micro-pleats that cascade into a sweeping flared hemline with invisible waist facing.',
    fabric: '100% Technical Silk Chiffon',
    colors: ['Opaline', 'Taupe'],
    sizes: ['IT 36', 'IT 38', 'IT 40', 'IT 42'],
  },

  // Bags & Leather Goods
  {
    id: 'bag-sculpted',
    name: 'Sculpted Leather Bucket Bag',
    price: '$1,350',
    priceNumber: 1350,
    category: 'Bags',
    image: '/products/bag-sculpted.jpg',
    runwayLook: 18,
    description: 'Architectural cylinder bucket bag handcrafted in Florence from smooth calfskin with brushed palladium hardware.',
    fabric: '100% Italian Box Calf Leather',
    isNew: true,
    isFeatured: true,
    colors: ['Chalk White', 'Saddle Tan', 'Black'],
  },
  {
    id: 'bag-top-handle',
    name: 'Maison Top Handle Bag',
    price: '$1,650',
    priceNumber: 1650,
    category: 'Bags',
    image: '/products/bag-top-handle.jpg',
    runwayLook: 17,
    description: 'Structured trapezoid handbag with curved ergonomic top handle and detachable fine leather shoulder strap.',
    fabric: '100% Full-Grain Calfskin, Suede interior',
    colors: ['Bone White', 'Espresso'],
  },

  // Jewelry, Belts & Footwear
  {
    id: 'belt-gold',
    name: 'Sculptural Gold Waist Belt',
    price: '$520',
    priceNumber: 520,
    category: 'Accessories',
    image: '/products/belt-gold.jpg',
    runwayLook: 15,
    description: 'Hand-hammered brass belt dipped in 24-karat gold with invisible hinged rear closure, engineered to contour the waist.',
    fabric: '100% Brass, 24k Gold Electroplate',
    isFeatured: true,
    colors: ['Polished Gold', 'Brushed Champagne Gold'],
    sizes: ['Small (65-75cm)', 'Medium (75-85cm)'],
  },
  {
    id: 'jewelry-earrings',
    name: 'Molten Gilded Ear Cuffs',
    price: '$480',
    priceNumber: 480,
    category: 'Accessories',
    image: '/products/jewelry-earrings.jpg',
    runwayLook: 16,
    description: 'Sculptural asymmetric ear jewelry designed to hug the cartilage without piercing, featuring organic molten texture.',
    fabric: '24k Gold-plated Vermeil on Sterling Silver',
    isNew: true,
    colors: ['Yellow Gold'],
  },
  {
    id: 'shoes-mule',
    name: 'Minimalist Satin Mule 70mm',
    price: '$840',
    priceNumber: 840,
    category: 'Accessories',
    image: '/products/shoes-mule.jpg',
    runwayLook: 16,
    description: 'Sharp square-toe mule with sculpted inverted cone heel and padded silk satin insole.',
    fabric: 'Silk Satin upper, Italian Leather sole',
    colors: ['Champagne', 'Alabaster', 'Noir'],
    sizes: ['EU 36', 'EU 37', 'EU 38', 'EU 39', 'EU 40'],
  },
];

export interface RunwayLookDetails {
  lookNumber: number;
  title: string;
  subtitle: string;
  ensembleIds: string[];
  totalPrice: string;
  theme: string;
}

export const RUNWAY_LOOKS_DETAILED: RunwayLookDetails[] = [
  {
    lookNumber: 15,
    title: 'Look 15 — The Architectural Silhouette',
    subtitle: 'Deconstructed silk tailoring paired with fluid wide-leg drapery and hammered gold accent.',
    ensembleIds: ['blazer-organza', 'trousers-palazzo', 'belt-gold'],
    totalPrice: '$4,120',
    theme: 'Sharp tailoring contrasted with gossamer movement',
  },
  {
    lookNumber: 16,
    title: 'Look 16 — Ethereal Pleats in Sunray',
    subtitle: 'Sunray micro-pleated evening gown with molten gold ear adornments and sculpted satin mules.',
    ensembleIds: ['dress-pleated', 'jewelry-earrings', 'shoes-mule'],
    totalPrice: '$4,920',
    theme: 'Pure lightness and tactile micro-geometries',
  },
  {
    lookNumber: 17,
    title: 'Look 17 — The Urban Trench Duster',
    subtitle: 'Fluid satin trench dress belted at the natural waist with minimal structured top handle bag.',
    ensembleIds: ['coat-trench', 'bag-top-handle', 'belt-gold'],
    totalPrice: '$4,520',
    theme: 'Monochromatic utilitarian luxury',
  },
  {
    lookNumber: 18,
    title: 'Look 18 — Romantic Volume & Sculpted Leather',
    subtitle: 'Billow sleeve French cuff silk blouse contrasted with fluid tailored trousers and bucket bag.',
    ensembleIds: ['blouse-billow', 'trousers-palazzo', 'bag-sculpted'],
    totalPrice: '$3,660',
    theme: 'Poetic volumes meeting Florentine leathercraft',
  },
  {
    lookNumber: 19,
    title: 'Look 19 — The Powder Ice Cocoon',
    subtitle: 'Double-faced virgin wool and cashmere cocoon outerwear over streamlined ivory tailoring.',
    ensembleIds: ['coat-powder', 'coat-cocoon', 'blazer-organza'],
    totalPrice: '$7,530',
    theme: 'Sculptural warmth and minimalist winter palette',
  },
  {
    lookNumber: 20,
    title: 'Look 20 — The Sculpted Finale Gown',
    subtitle: 'Spiral décolletage ruffle bodice layered with sweeping permanent pleated silk maxi skirt.',
    ensembleIds: ['top-ruffle', 'skirt-pleated', 'dress-champagne'],
    totalPrice: '$5,660',
    theme: 'The grand runway finale of pure couture artistry',
  },
];
