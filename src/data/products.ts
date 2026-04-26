export interface Product {
  id: string;
  name: string;
  brand: string;
  scale: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  stock: number;
  featured?: boolean;
  trending?: boolean;
  newArrival?: boolean;
  hidden?: boolean;
}

const rawProducts: Omit<Product, 'id'>[] = [
  {
    name: 'LB★WORKS Lamborghini Huracán GT GRAVITY',
    brand: 'MiniGT',
    scale: '1:64',
    price: 1799,
    image: 'https://minigt.tsm-models.com/upload/picfile_list/fadce92c69a51e570ab6f876e27136cf20251212045827743.JPG',
    images: [
      'https://minigt.tsm-models.com/upload/picfile_list/fadce92c69a51e570ab6f876e27136cf20251212045827743.JPG',
      'https://minigt.tsm-models.com/upload/picfile_list/fadce92c69a51e570ab6f876e27136cf20251212045827743.JPG',
      'https://minigt.tsm-models.com/upload/picfile_list/fadce92c69a51e570ab6f876e27136cf20251212045827743.JPG',
      'https://minigt.tsm-models.com/upload/picfile_list/fadce92c69a51e570ab6f876e27136cf20251212045827743.JPG'
    ],
    description: 'Highly detailed 1:64 scale model of the iconic LB★WORKS Lamborghini Huracán GT GRAVITY',
    stock: 5,
    featured: true,
    newArrival: true,
  },
  {
    name: 'LB★WORKS Lamborghini Aventador Limited Edition Matte Black',
    brand: 'MiniGT',
    scale: '1:64',
    price: 1650,
    image: 'https://www.toycollectorsindia.com/cdn/shop/files/rn-image_picker_lib_temp_fb97d18c-99a4-4a4e-bafa-0728c9c3887d.png?v=1775565032',
    images: [
      'https://www.toycollectorsindia.com/cdn/shop/files/rn-image_picker_lib_temp_fb97d18c-99a4-4a4e-bafa-0728c9c3887d.png?v=1775565032',
      'https://minigt.tsm-models.com/upload/picfile_list/4018f01581ac26d0f95ee2f5293753c820250729213752728.JPG',
      'https://minigt.tsm-models.com/upload/picfile_list/af04a7ebde2cf05e3e9cd4f4984039e720250729213752729.JPG',
      'https://minigt.tsm-models.com/upload/picfile_list/83282a1093cbaef8bf40c6995e3c755320250729213752731.JPG'
    ],
    description: 'Precision crafted  Lamborghini Aventador with authentic detailing and premium display base.',
    stock: 3,
    trending: true,
    newArrival: true,
  },
  {
    name: 'Porsche 911 GT3 R #77 AO Racing 2024 IMSA Road America',
    brand: 'MiniGT',
    scale: '1:64',
    price: 1649,
    image: 'https://minigt.tsm-models.com/upload/picfile_list/7a866d7476fd3b25d6a1625008a1941220250703173419311.JPG',
    images: [
      'https://minigt.tsm-models.com/upload/picfile_list/7a866d7476fd3b25d6a1625008a1941220250703173419311.JPG',
      'https://minigt.tsm-models.com/upload/picfile_list/7a866d7476fd3b25d6a1625008a1941220250703173419311.JPG',
      'https://minigt.tsm-models.com/upload/picfile_list/7a866d7476fd3b25d6a1625008a1941220250703173419311.JPG',
      'https://minigt.tsm-models.com/upload/picfile_list/7a866d7476fd3b25d6a1625008a1941220250703173419311.JPG'
    ],
    description: 'Classic Porsche 911 Rexy model featuring track racing and power',
    stock: 5,
    trending: true,
    newArrival: true,
  },
  {
    name: 'Lamborghini Urus Performante Grigio Nimbus-Blister Pack',
    brand: 'MiniGT',
    scale: '1:64',
    price: 1899,
    image: 'https://media.karousell.com/media/photos/products/2025/6/4/mini_gt_747_04062025_lamborghi_1749015948_4829a0aa_progressive.jpg',
    images: [
      'https://media.karousell.com/media/photos/products/2025/6/4/mini_gt_747_04062025_lamborghi_1749015948_4829a0aa_progressive.jpg',
      'https://minigt.tsm-models.com/upload/picfile_list/2fb92041d2a83f174b7f446477272a7020240908001204557.jpg',
      'https://minigt.tsm-models.com/upload/picfile_list/36064b21adb07013e6655e563b17bc5520240408205602637.JPG',
      'https://minigt.tsm-models.com/upload/picfile_list/bd5e974dc1e895645b9923ac8217c5af20240408205602638.JPG',
      'https://minigt.tsm-models.com/upload/picfile_list/10e4f4d1ddadbe398bd5d10d3ce0145320240408205602639.JPG'
    ],
    description: 'Classic SUV with beauty and power',
    stock: 1,
    newArrival: true,
  },
  {
    name: 'Lamborghini LB-Silhouette WORKS MURCIELAGO GT Evo Yellow-Blister Pack',
    brand: 'MiniGT',
    scale: '1:64',
    price: 1449,
    image: 'https://i.ebayimg.com/images/g/wWUAAeSw5RBpweiU/s-l1600.webp',
    images: [
      'https://i.ebayimg.com/images/g/wWUAAeSw5RBpweiU/s-l1600.webp',
      'https://minigt.tsm-models.com/upload/picfile_list/5c027271432aaa40447ea4ed283cac9120260114054632983.JPG',
      'https://minigt.tsm-models.com/upload/picfile_list/a667ad6127a90506e24b08beb8f33bb120251015044036090.JPG',
      'https://minigt.tsm-models.com/upload/picfile_list/38b9f430e37125868cb2a90f41c2a95820251015044036092.JPG',
      'https://minigt.tsm-models.com/upload/picfile_list/c21851ad70c2be7ce0f190a138aebeae20251015044036097.JPG'
    ],
    description: 'Captures the aggressive, widebody Liberty Walk aesthetic with a vibrant yellow finish, detailed aerodynamics, and realistic rubber tires.',
    stock: 2,
    newArrival: true,
  },
  {
    name: 'Hot Wheels 2020 Koenigsegg Jesko',
    brand: 'Hotwheels Mainline',
    scale: '1:64',
    price: 270,
    image: 'https://m.media-amazon.com/images/I/61D+3k8OXAL._SL1024_.jpg',
    images: [
      'https://m.media-amazon.com/images/I/61D+3k8OXAL._SL1024_.jpg',
      'https://m.media-amazon.com/images/I/61D+3k8OXAL._SL1024_.jpg',
      'https://m.media-amazon.com/images/I/61D+3k8OXAL._SL1024_.jpg',
      'https://m.media-amazon.com/images/I/61D+3k8OXAL._SL1024_.jpg'
    ],
    description: 'The legendary Jesko in Hotwheels Mainline with a detailed design that recreates the aggressive aerodynamics of the real-life 1,600-horsepower hypercar.',
    stock: 12,
    featured: true,
  },
  {
    name: 'Nissan Skyline GT-R (R34) R-Tune Silver',
    brand: 'Inno64',
    scale: '1:64',
    price: 1850,
    image: 'https://cdn.shopify.com/s/files/1/0610/0117/1163/products/IN64-R34RT-SLV_1_1024x1024.jpg?v=1645000000',
    images: [
      'https://cdn.shopify.com/s/files/1/0610/0117/1163/products/IN64-R34RT-SLV_1_1024x1024.jpg?v=1645000000',
      'https://cdn.shopify.com/s/files/1/0610/0117/1163/products/IN64-R34RT-SLV_2_1024x1024.jpg?v=1645000000'
    ],
    description: 'Inno64 Nissan Skyline GT-R R34 R-Tune in stunning silver. Incredible detail and accuracy.',
    stock: 4,
    newArrival: true,
  },
  {
    name: 'Porsche 911 GT3 R Grello',
    brand: 'Tarmac Works',
    scale: '1:64',
    price: 1950,
    image: 'https://cdn.shopify.com/s/files/1/0610/0117/1163/products/T64-043-GR_1_1024x1024.jpg?v=1645000000',
    images: [
      'https://cdn.shopify.com/s/files/1/0610/0117/1163/products/T64-043-GR_1_1024x1024.jpg?v=1645000000'
    ],
    description: 'Tarmac Works Porsche 911 GT3 R #911 Manthey Racing "Grello" Nurburgring 24h 2021.',
    stock: 2,
    featured: true,
  },
  {
    name: 'HKS Nissan Skyline GT-R R32',
    brand: 'Pop Race',
    scale: '1:64',
    price: 1750,
    image: 'https://cdn.shopify.com/s/files/1/0610/0117/1163/products/PR64-R32-HKS_1_1024x1024.jpg?v=1645000000',
    images: [
      'https://cdn.shopify.com/s/files/1/0610/0117/1163/products/PR64-R32-HKS_1_1024x1024.jpg?v=1645000000'
    ],
    description: 'Pop Race Nissan Skyline R32 GT-R Group A HKS Livery. opening hood and detailed engine.',
    stock: 6,
    trending: true,
  },
  {
    name: 'Datsun 510 Pro Street OG Green',
    brand: 'Kaido House',
    scale: '1:64',
    price: 1999,
    image: 'https://cdn.shopify.com/s/files/1/0610/0117/1163/products/KHMG001_1_1024x1024.jpg?v=1645000000',
    images: [
      'https://cdn.shopify.com/s/files/1/0610/0117/1163/products/KHMG001_1_1024x1024.jpg?v=1645000000'
    ],
    description: 'Kaido House x Mini GT Datsun 510 Pro Street in OG Green. Designed by Jun Imai.',
    stock: 2,
    featured: true,
  },
  {
    name: 'BMW M8 GTE Team MTEK 2019',
    brand: 'Para64',
    scale: '1:64',
    price: 1450,
    image: 'https://cdn.shopify.com/s/files/1/0610/0117/1163/products/PA-64123_1_1024x1024.jpg?v=1645000000',
    images: [
      'https://cdn.shopify.com/s/files/1/0610/0117/1163/products/PA-64123_1_1024x1024.jpg?v=1645000000'
    ],
    description: 'Para64 BMW M8 GTE. Officially licensed model with high quality rolling wheels.',
    stock: 5,
    newArrival: true,
    hidden: true,
  },
  {
    name: 'Mega Gear Roxy Hauler-Unsealed',
    brand: 'Miscellaneous',
    scale: '1:64',
    price: 3499,
    image: 'https://diecastchennai396.in/cdn/shop/files/8633.png?v=1776433910&width=1346',
    images: [
      'https://diecastchennai396.in/cdn/shop/files/8633.png?v=1776433910&width=1346'
    ],
    description: 'Detailed Mega Gear Roxy Hauler, a perfect addition for transport dioramas and collections.',
    stock: 1,
    newArrival: true,
  }
];

export const products: Product[] = rawProducts.map((p, index) => ({
  ...p,
  id: (index + 1).toString()
}));

export const brands = Array.from(new Set([...products.map(p => p.brand), 'Tarmac Works', 'Inno64', 'Pop Race', 'Kaido House', 'Para64', 'Miscellaneous', 'PreOrder']));
export const scales = [];
