export interface Product {
  id: string;
  name: string;
  brand: string;
  scale: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  featured?: boolean;
  trending?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'LB★WORKS Lamborghini Huracán GT GRAVITY',
    brand: 'MiniGT',
    scale: '1:64',
    price: 1799,
    image: 'https://minigt.tsm-models.com/upload/picfile_list/fadce92c69a51e570ab6f876e27136cf20251212045827743.JPG',
    description: 'Highly detailed 1:64 scale model of the iconic LB★WORKS Lamborghini Huracán GT GRAVITY',
    stock: 5,
    featured: true,
  },
  {
    id: '2',
    name: 'LB★WORKS Lamborghini Aventador Limited Edition Matte Black',
    brand: 'MiniGT',
    scale: '1:64',
    price: 1650,
    image: 'https://minigt.tsm-models.com/upload/picfile_list/4018f01581ac26d0f95ee2f5293753c820250729213752728.JPG',
    description: 'Precision crafted  Lamborghini Aventador with authentic detailing and premium display base.',
    stock: 3,
    trending: true,
  },
  {
    id: '3',
    name: 'Porsche 911 GT3 R #77 AO Racing 2024 IMSA Road America',
    brand: 'MiniGT',
    scale: '1:64',
    price: 1649,
    image: 'https://minigt.tsm-models.com/upload/picfile_list/7a866d7476fd3b25d6a1625008a1941220250703173419311.JPG',
    description: 'Classic Porsche 911 Rexy model featuring track racing and power',
    stock: 5,
    trending: true,
  },
  {
    id: '4',
    name: 'Hot Wheels 2020 Koenigsegg Jesko',
    brand: 'Hotwheels Mainline',
    scale: '1:64',
    price: 270,
    image: 'https://m.media-amazon.com/images/I/61D+3k8OXAL._SL1024_.jpg',
    description: 'The legendary Jesko in Hotwheels Mainline with a detailed design that recreates the aggressive aerodynamics of the real-life 1,600-horsepower hypercar.',
    stock: 1,
  },
];

export const brands = Array.from(new Set([...products.map(p => p.brand), 'PreOrder', 'Miscellaneous']));
export const scales = Array.from(new Set(products.map(p => p.scale)));
