import { Component, OnInit, OnDestroy } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Product List';
  errorMessage = '';
  products: Product[];
  private subscription: Subscription;

  constructor(private productService: ProductService) { }

  // Standard pattern
  // ngOnInit(): void {
  //   this.productService.getProducts().subscribe(
  //     products => {
  //       this.products = products;
  //       console.log(this.products);
  //     },
  //     error => this.errorMessage = <any>error
  //   );
  //   // This logs "undefined"
  //   // console.log(this.products);
  // }

  // Be sure to unsubscribe
  // Prevents processing the data if the user navigates away
  ngOnInit(): void {
    this.subscription = this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        console.log(this.products);
      },
      error => this.errorMessage = <any>error
    );
    // This logs "undefined"
    // console.log(this.products);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
