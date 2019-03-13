import { Component, OnInit } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './product-list-one.component.html'
})
export class ProductListOneAtATimeComponent implements OnInit {
  pageTitle = 'Product List';
  errorMessage = '';
  productIds = [1, 2, 5, 8, 10];
  product: Product;
  currentIndex: number;

  constructor(private productService: ProductService) { }

  // Common Pattern for Retrieving Data
  // But pressing Next in quick succession executes unnecessary get requests.
  // ngOnInit(): void {
  //   this.currentIndex = 0;
  //   this.retrieveProduct();
  // }

  // onNext(): void {
  //   this.currentIndex += 1;
  //   if (this.currentIndex >= this.productIds.length) {
  //     this.currentIndex = 0;
  //   }
  //   this.retrieveProduct();
  // }

  // retrieveProduct(): void {
  //   this.productService.getProduct(this.productIds[this.currentIndex]).subscribe(
  //     product => this.product = product,
  //     error => this.errorMessage = <any>error
  //   );
  // }

  // Cancels processing of prior request
  private product$: Subject<Product>;
  ngOnInit(): void {
    this.currentIndex = 0;

    // Create a Subject
    this.product$ = new Subject<Product>();

    // Define the switchMap
    this.product$.pipe(
      switchMap(() =>
        this.productService.getProduct(this.productIds[this.currentIndex])
      )).subscribe(
        product => {
          this.product = product;
        },
        error => this.errorMessage = <any>error
      );

    // Call Next to perform the first retrieve
    this.product$.next();
  }

  onNext(): void {
    this.currentIndex += 1;
    if (this.currentIndex >= this.productIds.length) {
      this.currentIndex = 0;
    }
    // On each click, switch to the next item
    this.product$.next();
  }

}
