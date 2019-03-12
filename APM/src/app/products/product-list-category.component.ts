import { Component, OnInit } from '@angular/core';

import { Product } from './product';
import { ProductService } from './product.service';
import { forkJoin } from 'rxjs';
import { ProductCategoryService } from '../product-categories/product-category.service';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './product-list-category.component.html'
})
export class ProductListCategoryComponent implements OnInit {
  pageTitle = 'Product List';
  errorMessage = '';
  products: Product[];

  constructor(private productService: ProductService,
    private productCategoryService: ProductCategoryService) { }

  ngOnInit(): void {
    // Get the product and product category data in parallel
    // Map the category Id to the category name
    const products$ = this.productService.getProducts();
    const categories$ = this.productCategoryService.getCategories();
    forkJoin([products$, categories$]).pipe(
      map(([products, categories]) => 
        products.map(p => Object.assign({}, p, {"categoryName": categories.find(c => p.categoryId === c.id).name}))
      )
    ).subscribe(result => {
      this.products = result;
    },
      error => this.errorMessage = <any>error
    );
  }

}
