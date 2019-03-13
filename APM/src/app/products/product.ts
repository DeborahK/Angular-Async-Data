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
  supplierIds?: number[];
}

export interface ProductResolved {
  product: Product;
  error?: any;
}
