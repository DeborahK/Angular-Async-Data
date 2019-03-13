import { Supplier } from '../suppliers/supplier';

/* Defines the product entity */
export interface Product {
  id: number;
  productName: string;
  productCode: string;
  categoryId: number;
  categoryName?: string;
  tags?: string[];
  price: number;
  description: string;
  suppliers?: Supplier[];
}

export interface ProductResolved {
  product: Product;
  error?: any;
}
