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
    name: 'Porsche 911 GT3 RS',
    brand: 'Inno64',
    scale: '1:64',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1503376712341-ea243c224b17?auto=format&fit=crop&q=80&w=800',
    description: 'Precision crafted Porsche 911 GT3 RS with authentic detailing and premium display base.',
    stock: 8,
    featured: true,
  },
  {
    id: '3',
    name: 'Ferrari F40',
    brand: 'Tarmac Works',
    scale: '1:64',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=800',
    description: 'Classic Ferrari F40 model featuring opening engine cover and detailed interior.',
    stock: 0,
    trending: true,
  },
  {
    id: '4',
    name: 'Lamborghini Aventador SVJ',
    brand: 'MiniGT',
    scale: '1:64',
    price: 1399,
    image: 'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?auto=format&fit=crop&q=80&w=800',
    description: 'Aggressive styling captured perfectly in this 1:64 scale Lamborghini Aventador SVJ.',
    stock: 12,
  },
  {
    id: '5',
    name: 'Toyota Supra (A80)',
    brand: 'Inno64',
    scale: '1:64',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&q=80&w=800',
    description: 'Legendary JDM sports car, the Toyota Supra A80, in pristine condition.',
    stock: 5,
    trending: true,
  },
  {
    id: '6',
    name: 'McLaren P1',
    brand: 'Tarmac Works',
    scale: '1:64',
    price: 1799,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&q=80&w=800',
    description: 'Hybrid hypercar McLaren P1 with stunning aerodynamic details.',
    stock: 3,
    featured: true,
  },
  {
    id: '7',
    name: 'Ford Mustang Shelby GT500',
    brand: 'MiniGT',
    scale: '1:64',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&q=80&w=800',
    description: 'American muscle at its finest, the Shelby GT500.',
    stock: 20,
  },
  {
    id: '8',
    name: 'Honda Civic Type R (FK8)',
    brand: 'Inno64',
    scale: '1:64',
    price: 1449,
    image: 'https://images.unsplash.com/photo-1606016159991-d17f65320184?auto=format&fit=crop&q=80&w=800',
    description: 'Track-ready Honda Civic Type R with aggressive aero package.',
    stock: 7,
    trending: true,
  },
  {
    id: '9',
    name: 'Nissan Skyline GT-R (BNR34)',
    brand: 'Hotwheels Mainline',
    scale: '1:64',
    price: 199,
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800',
    description: 'Classic Hotwheels Mainline Nissan Skyline GT-R (BNR34) in iconic blue.',
    stock: 50,
  },
  {
    id: '10',
    name: '1971 Datsun 510',
    brand: 'Hot wheels RLC',
    scale: '1:64',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800',
    description: 'Exclusive Red Line Club edition Datsun 510 with Spectraflame paint and Real Riders.',
    stock: 2,
    featured: true,
  },
  {
    id: '11',
    name: 'Mercedes-Benz 300 SL',
    brand: 'Elite64',
    scale: '1:64',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=800',
    description: 'Highly detailed Elite64 series Mercedes-Benz 300 SL with opening gull-wing doors.',
    stock: 5,
    trending: true,
  },
  {
    id: '12',
    name: 'Pagani Huayra BC',
    brand: 'CM models',
    scale: '1:64',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800',
    description: 'Exquisite CM models Pagani Huayra BC with full carbon fiber detailing and opening parts.',
    stock: 3,
    featured: true,
  }
];

export const brands = Array.from(new Set(products.map(p => p.brand)));
export const scales = Array.from(new Set(products.map(p => p.scale)));
