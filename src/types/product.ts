export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'queijo' | 'variados' | 'doces';
  description?: string;
  weight?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
