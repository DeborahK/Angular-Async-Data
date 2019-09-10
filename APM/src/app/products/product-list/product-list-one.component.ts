import { Component, OnInit } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { switchMap } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

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
  // But pressing Next in quick succession processes unnecessary get requests.
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
  //   this.productService.getProduct(this.productIds[this.currentIndex]).subscribe({
  //     next: product => this.product = product,
  //     error: err => this.errorMessage = err
  //   });
  // }

  // Unsubscribe to stop processing of prior request
  private sub: Subscription;
  ngOnInit(): void {
    this.currentIndex = 0;
    this.retrieveProduct();
  }

  onNext(): void {
    this.sub.unsubscribe();
    this.currentIndex += 1;
    if (this.currentIndex >= this.productIds.length) {
      this.currentIndex = 0;
    }
    this.retrieveProduct();
  }

  retrieveProduct(): void {
    this.sub = this.productService.getProduct(this.productIds[this.currentIndex]).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });
  }

  // Cancels processing of prior request with switchMap
  // private product$: Subject<Product>;
  // ngOnInit(): void {
  //   this.currentIndex = 0;

  //   // Create a Subject
  //   this.product$ = new Subject<Product>();

  //   // Define the switchMap
  //   this.product$.pipe(
  //     switchMap(() =>
  //       this.productService.getProduct(this.productIds[this.currentIndex])
  //     )).subscribe({
  //       next: product => {
  //         this.product = product;
  //       },
  //       error: err => this.errorMessage = err
  //     });

  //   // Call Next to perform the first retrieve
  //   this.product$.next();
  // }

  // onNext(): void {
  //   this.currentIndex += 1;
  //   if (this.currentIndex >= this.productIds.length) {
  //     this.currentIndex = 0;
  //   }
  //   // On each click, switch to the next item
  //   this.product$.next();
  // }

}
