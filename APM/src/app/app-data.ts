import { InMemoryDbService } from 'angular-in-memory-web-api';

import { ProductData } from './products/product-data';
import { ProductCategoryData } from './product-categories/product-category-data';

export class AppData implements InMemoryDbService {

  createDb() {
    const products = ProductData.products;
    const productCategories = ProductCategoryData.categories;
    return { products, productCategories };
  }
}
