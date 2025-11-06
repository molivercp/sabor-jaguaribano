export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'queijo' | 'variados' | 'doces';
  description?: string;
  weight?: string;
  image?: string;
  available?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
