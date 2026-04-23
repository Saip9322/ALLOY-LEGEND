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
    name: 'BMW M4 GT3 #24 2022 IMSA Daytona 24 Hrs',
    brand: 'MiniGT',
    scale: '1:64',
    price: 1299,
    image: 'https://minigt.tsm-models.com/upload/mini_gt/products_gif/product_pic_big/1641236529_394251.JPG',
    description: 'Highly detailed 1:64 scale model of the iconic BMW M4 GT3 #24 BMW Team RLL 2022 IMSA Daytona 24 Hrs',
    stock: 15,
    featured: true,
    trending: true,
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
];

export const brands = Array.from(new Set([...products.map(p => p.brand), 'PreOrder', 'Miscellaneous']));
export const scales = Array.from(new Set(products.map(p => p.scale)));
