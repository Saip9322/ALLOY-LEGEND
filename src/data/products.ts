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
];

export const brands = Array.from(new Set([...products.map(p => p.brand), 'PreOrder', 'Miscellaneous']));
export const scales = Array.from(new Set(products.map(p => p.scale)));
