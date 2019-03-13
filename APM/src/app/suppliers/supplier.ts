/* Defines the supplier entity */
export interface Supplier {
  id: number;
  name: string;
  supplierProducts: SupplierProducts[];
}

export interface SupplierProducts {
  productId: number;
  cost: number;
  minQuantity: number;
}
