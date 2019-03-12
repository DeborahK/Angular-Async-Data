import { Component, OnInit } from '@angular/core';

import { Product } from './product';
import { ProductService } from './product.service';
import { forkJoin } from 'rxjs';
import { ProductCategoryService } from '../product-categories/product-category.service';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  errorMessage = '';
  products: Product[];

  constructor(private productService: ProductService,
    private productCategoryService: ProductCategoryService) { }

  ngOnInit(): void {
    // this.productService.getProducts().subscribe(
    //   products => {
    //     this.products = products;
    //     console.log(this.products);
    //   },
    //   error => this.errorMessage = <any>error
    // );
    // This logs "undefined"
    // console.log(this.products);

    // get the product and product category data in parallel
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
